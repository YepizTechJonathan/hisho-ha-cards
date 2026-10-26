import { describe, expect, it } from "vitest";
import "../src/index";
import { fakeHass } from "./fake-hass";
import { hishoDevices } from "../src/model";
import { generateDashboard } from "../src/strategy";

async function mount(tag: string, config: Record<string, any>, hass = fakeHass()) {
  const el = document.createElement(tag) as any;
  el.setConfig({ type: `custom:${tag}`, ...config });
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return { el, hass, root: el.shadowRoot as ShadowRoot };
}

function button(root: ShadowRoot, text: string): HTMLButtonElement {
  const found = [...root.querySelectorAll("button")].find((b) => b.textContent?.trim() === text);
  if (!found) throw new Error(`no button "${text}" in ${root.innerHTML.slice(0, 400)}`);
  return found as HTMLButtonElement;
}

async function answer(root: ShadowRoot, yes: boolean) {
  await new Promise((r) => setTimeout(r, 0));
  const dialog = root.querySelector("hisho-confirm") as any;
  expect(dialog?.open).toBe(true);
  await dialog.updateComplete;
  const pick = [...dialog.shadowRoot.querySelectorAll("button")].find((b: any) => b.textContent === (yes ? "Yes" : "Cancel"));
  (pick as HTMLButtonElement).click();
  await new Promise((r) => setTimeout(r, 0));
}

const runs = (hass: any) => hass.callService.mock.calls.filter((c: any[]) => c[0] === "hisho" && c[1] === "run_action").map((c: any[]) => c[2]);

describe("finding Hisho", () => {
  it("sorts the integration's devices into hub, machines, boxes and add-ons", () => {
    const kinds = Object.fromEntries(hishoDevices(fakeHass()).map((d) => [d.name, d.kind]));
    expect(kinds).toEqual({ Hisho: "hub", "Hashira Ren": "machine", Souko: "machine", truenas: "box",
      ionos: "box", "Web Factory": "addon" });
  });
});

describe("the Hisho dashboard strategy", () => {
  it("builds a view per area from what the integration reports", () => {
    const dash = generateDashboard(fakeHass());
    expect(dash.views.map((v) => v.path)).toEqual(["overview", "machines", "devices", "addons", "today", "projects", "phone"]);
    // the Overview is the Control Center, full width; the rest are sections views (columns that fill the screen)
    expect(dash.views[0]).toMatchObject({ type: "panel", cards: [{ type: "custom:hisho-control-center-card" }] });
    expect(dash.views.slice(1).every((v) => v.type === "sections" && v.max_columns === 4)).toBe(true);
    const cards = (i: number) => dash.views[i].sections!.map((s) => s.cards);
    expect(cards(1).map((c) => c[0].machine)).toEqual(["Hashira Ren", "Souko"]);
    expect(cards(2).map((c) => c.map((x) => x.heading ?? x.device))).toEqual([["Servers", "ionos"], ["Storage", "truenas"]]);
    const full = { grid_options: { columns: "full" } };
    expect(cards(3)).toEqual([[{ type: "custom:hisho-store-card", ...full }], [{ type: "custom:hisho-device-card", device: "Web Factory" }]]);
    expect(cards(4)).toEqual([[{ type: "todo-list", entity: "todo.hisho_today", title: "Today" }],
      [{ type: "calendar", entities: ["calendar.hisho_due_dates"], initial_view: "dayGridMonth", title: "Due dates", ...full }]]);
    expect(dash.views[2].sections!.map((s) => s.column_span)).toEqual([1, 1]); // as wide as their devices
  });

  it("says how to set Hisho up when it is not there", () => {
    const dash = generateDashboard(fakeHass({ noHisho: true }));
    expect(dash.views[0].cards![0].content).toContain("Add integration");
  });
});

describe("control center", () => {
  it("shows the stats strip, machine tiles and needs you side by side", async () => {
    const { root } = await mount("hisho-control-center-card", {});
    const stats = [...root.querySelectorAll(".stat")].map((s) =>
      [...s.querySelectorAll("span")].map((x) => x.textContent!.trim()).join(" | "));
    expect(stats[0]).toBe("Hisho Core | Up | Answering");
    expect(stats[1]).toBe("Machines online | 2/2 | All up");
    expect(stats[2]).toBe("Needs you | 1 | 1 critical");
    expect(root.querySelectorAll(".machines .tile").length).toBe(2);
    const needs = root.querySelector("hisho-needs-you-card") as any;
    await needs.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await needs.updateComplete;
    expect(needs.shadowRoot.querySelector("ha-card")).toBeNull(); // embedded: no card inside a card
    expect(needs.shadowRoot.textContent).toContain("TrueNAS: pool Potter is unhealthy");
    expect(needs.shadowRoot.textContent).not.toContain("ZFS reports errors"); // compact: the finding opens on a tap
  });

  it("opens a machine tile for its details on a tap", async () => {
    const { el, root } = await mount("hisho-control-center-card", {});
    expect(root.querySelector(".kv")).toBeNull();
    (root.querySelector(".tile .row.spread") as HTMLElement).click();
    await el.updateComplete;
    expect(root.querySelector(".tile .kv")).not.toBeNull();
  });
});

describe("fleet card", () => {
  it("shows machines and wakes without asking", async () => {
    const { root, hass } = await mount("hisho-fleet-card", {});
    expect(root.textContent).toContain("Hashira Ren");
    expect(root.textContent).toContain("parks in 16m");
    button(root, "Wake").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass)).toEqual([{ action: "machine.wake", target: "hashira-ren", args: {}, confirm: false }]);
  });

  it("asks before parking; Cancel sends nothing, Yes sends it confirmed", async () => {
    const { root, hass } = await mount("hisho-fleet-card", {});
    button(root, "Park").click();
    await answer(root, false);
    expect(runs(hass)).toEqual([]);
    button(root, "Park").click();
    await answer(root, true);
    expect(runs(hass)).toEqual([{ action: "machine.park", target: "hashira-ren", args: {}, confirm: true }]);
  });

  it("offers only what Hisho allows this Home Assistant", async () => {
    const { root } = await mount("hisho-fleet-card", {}, fakeHass({ allowed: [] }));
    expect([...root.querySelectorAll("button")].map((b) => b.textContent?.trim())).not.toContain("Wake");
  });

  it("shows nothing but a notice to a non-admin user", async () => {
    const hass = fakeHass();
    (hass as any).user = { id: "u", name: "Kid", is_admin: false };
    const { root } = await mount("hisho-fleet-card", {}, hass);
    expect(root.textContent).toContain("for Home Assistant administrators");
    expect(root.querySelectorAll("button").length).toBe(0);
  });

  it("explains when the integration is missing", async () => {
    const { root } = await mount("hisho-fleet-card", {}, fakeHass({ noHisho: true }));
    expect(root.textContent).toContain("Add integration");
  });
});

describe("needs-you card", () => {
  it("lists open items with Claude's finding and acknowledges", async () => {
    const { root, hass } = await mount("hisho-needs-you-card", {});
    expect(hass.callWS).toHaveBeenCalledWith({ type: "todo/item/list", entity_id: "todo.hisho_needs_you" });
    expect(root.textContent).toContain("pool Potter is unhealthy");
    expect(root.textContent).toContain("Claude: Disk sdh");
    expect(root.textContent).not.toContain("IONOS: updates");
    button(root, "Acknowledge").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass)).toEqual([{ action: "alert.ack", target: "a1", args: {}, confirm: false }]);
  });
});

describe("device card", () => {
  it("shows a box's items and confirms its risky buttons", async () => {
    const { root, hass } = await mount("hisho-device-card", { device: "truenas" });
    expect(root.textContent).toContain("TruenasCE");
    button(root, "shut down").click();
    await answer(root, true);
    expect(runs(hass)).toEqual([{ action: "device.press", target: "proxmox",
      args: { entry: "PVE", item: "521", action: "shutdown" }, confirm: true }]);
  });

  it("runs an add-on's action", async () => {
    const { root, hass } = await mount("hisho-device-card", { device: "Web Factory" });
    button(root, "Deploy dev now").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass)).toEqual([{ action: "addon.run", target: "web-factory", args: { action: "deploy-dev" }, confirm: false }]);
  });
});

describe("machine card", () => {
  it("shows a machine's add-on items with their buttons", async () => {
    const { root, hass } = await mount("hisho-machine-card", { machine: "Souko" });
    expect(root.textContent).toContain("node_exporter");
    button(root, "Reinstall").click();
    await answer(root, true);
    expect(runs(hass)[0]).toMatchObject({ action: "device.press", target: "prometheus", confirm: true });
    button(root, "Start").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_on", {}, { entity_id: "switch.souko_ollama" });
  });
});

describe("jobs and projects cards", () => {
  it("cancels a running job only after asking, retries a failed one", async () => {
    const { root, hass } = await mount("hisho-jobs-card", {});
    button(root, "Cancel").click();
    await answer(root, true);
    button(root, "Retry").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass).map((r: any) => [r.action, r.target, r.confirm])).toEqual([
      ["job.cancel", "job-1", true], ["job.retry", "job-2", false]]);
  });

  it("puts projects waiting on you first", async () => {
    const { root } = await mount("hisho-projects-card", {});
    const titles = [...root.querySelectorAll("li")].map((li) => li.textContent ?? "");
    expect(titles[0]).toContain("Security follow-ups");
    expect(titles[0]).toContain("Rotate the password");
  });
});

describe("Hisho's setup (phase D)", () => {
  it("saves only changed settings and refuses a secret value", async () => {
    const { root, hass } = await mount("hisho-device-card", { device: "Web Factory" });
    const form = root.querySelector("form.settings") as HTMLFormElement;
    (form.elements.namedItem("builder_timeout") as HTMLInputElement).value = "900";
    (form.elements.namedItem("worker_token") as HTMLInputElement).value = "sk-live-secret-value";
    form.dispatchEvent(new Event("submit", { cancelable: true }));
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass)).toEqual([]);
    expect(root.textContent).toContain("give the secret's name");
    (form.elements.namedItem("worker_token") as HTMLInputElement).value = "WEBFACTORY_TOKEN";
    form.dispatchEvent(new Event("submit", { cancelable: true }));
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass)).toEqual([{ action: "addon.config", target: "web-factory", args: { settings: { builder_timeout: 900 } }, confirm: false }]);
  });

  it("removes an entry only after asking", async () => {
    const { root, hass } = await mount("hisho-device-card", { device: "Web Factory" });
    button(root, "Remove").click();
    await answer(root, true);
    expect(runs(hass)).toEqual([{ action: "addon.entry", target: "web-factory",
      args: { entry: "yepiz-tech", settings: { _remove: true } }, confirm: true }]);
  });

  it("store: updates, installs, asks before removing", async () => {
    const { root, hass } = await mount("hisho-store-card", {});
    expect(root.textContent).toContain("0.6.0 → 0.7.0");
    button(root, "Update").click();
    button(root, "Install").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(runs(hass).map((r: any) => [r.action, r.target])).toEqual([["store.update", "web-factory"], ["store.install", "vikunja"]]);
    [...root.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Remove" && b.closest("li")?.textContent?.includes("Web Factory"))!.click();
    await answer(root, true);
    expect(runs(hass).at(-1)).toMatchObject({ action: "store.remove", target: "web-factory", confirm: true });
  });
});

describe("performance", () => {
  it("does not re-render for state changes outside Hisho", async () => {
    const { el, hass } = await mount("hisho-fleet-card", {});
    let renders = 0;
    const original = el.render.bind(el);
    el.render = () => { renders += 1; return original(); };
    el.hass = { ...hass, states: { ...hass.states, "light.kitchen": { entity_id: "light.kitchen", state: "on", attributes: {} } } };
    await el.updateComplete;
    expect(renders).toBe(0);
    const ren = "sensor.hashira_ren_parking";
    el.hass = { ...el.hass, states: { ...el.hass.states, [ren]: { ...el.hass.states[ren], state: "parks in 1m" } } };
    await el.updateComplete;
    expect(renders).toBe(1);
    expect(el.shadowRoot.textContent).toContain("parks in 1m");
  });
});

