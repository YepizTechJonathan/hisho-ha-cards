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
    expect(dash.views.map((v) => v.path)).toEqual(["overview", "machines", "devices", "addons", "projects", "phone"]);
    expect(dash.views[1].cards.map((c) => c.machine)).toEqual(["Hashira Ren", "Souko"]);
    const devices = dash.views[2].cards.map((c) => c.heading ?? c.device);
    expect(devices).toEqual(["Servers", "ionos", "Storage", "truenas"]);
    expect(dash.views[3].cards).toEqual([{ type: "custom:hisho-device-card", device: "Web Factory" }]);
  });

  it("says how to set Hisho up when it is not there", () => {
    const dash = generateDashboard(fakeHass({ noHisho: true }));
    expect(dash.views[0].cards[0].content).toContain("Add integration");
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
