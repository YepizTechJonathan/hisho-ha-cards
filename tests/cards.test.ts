import { describe, expect, it } from "vitest";
import "../src/index";
import { fakeHass } from "./fake-hass";
import { hishoDevices } from "../src/model";
import { generateDashboard } from "../src/strategy";
import { HA_CARD_GLASS, viewBackground } from "../src/styles";

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

describe("icons", () => {
  it("offers hisho:kanji to Home Assistant (the app's 秘)", async () => {
    const set = (window as any).customIcons.hisho;
    expect(await set.getIconList()).toEqual([{ name: "kanji" }]);
    const icon = await set.getIcon("kanji");
    expect(icon.viewBox).toBe("0 0 24 24");
    expect(icon.path.length).toBeGreaterThan(500);
  });

  it("makes a hisho: icon drawn before the set existed (the sidebar) look again", async () => {
    const { refreshIcons } = await import("../src/icons");
    const host = document.createElement("div");
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const stale: any = document.createElement("ha-icon");
    Object.assign(stale, { icon: "hisho:kanji", _legacy: true, updateComplete: Promise.resolve(true) });
    const other: any = document.createElement("ha-icon");
    Object.assign(other, { icon: "mdi:home", _legacy: true });
    shadow.append(stale, other);
    expect(await refreshIcons()).toBe(1);
    expect(stale).toMatchObject({ icon: "hisho:kanji", _legacy: false });
    expect(other._legacy).toBe(true); // not ours: left alone
  });
});

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
    expect(dash.views.map((v) => v.path)).toEqual(["overview", "machines", "devices", "addons", "today", "projects", "conversations", "phone"]);
    // the Overview is the Control Center, full width; the rest are sections views (columns that fill the screen)
    expect(dash.views[0]).toMatchObject({ type: "panel", cards: [{ type: "custom:hisho-control-center-card" }] });
    expect(dash.views.slice(1).every((v) => v.type === "sections" && v.max_columns === 4)).toBe(true);
    const cards = (i: number) => dash.views[i].sections!.map((s) => s.cards);
    expect(cards(1)[0]).toEqual([{ type: "custom:hisho-pulse-card", grid_options: { columns: "full" } }]); // the pulse first
    expect(cards(1).slice(1).map((c) => c[0].machine)).toEqual(["Hashira Ren", "Souko"]);
    expect(cards(2).map((c) => c.map((x) => x.heading ?? x.device))).toEqual([["Servers", "ionos"], ["Storage", "truenas"]]);
    const full = { grid_options: { columns: "full" } };
    expect(cards(3)).toEqual([[{ type: "custom:hisho-store-card", ...full }], [{ type: "custom:hisho-device-card", device: "Web Factory" }]]);
    // Home Assistant's own cards wear the same dark glass (card-mod)
    const glass = { card_mod: { style: HA_CARD_GLASS } };
    expect(cards(4)).toEqual([[{ type: "todo-list", entity: "todo.hisho_today", title: "Today", ...glass }],
      [{ type: "calendar", entities: ["calendar.hisho_due_dates"], initial_view: "dayGridMonth", title: "Due dates", ...full, ...glass }]]);
    expect(dash.views[2].sections!.map((s) => s.column_span)).toEqual([1, 1]); // as wide as their devices
  });

  it("puts every view on the forest picture, or on a picture of your own", () => {
    const own = generateDashboard(fakeHass(), { background: "/local/lake.jpg" });
    expect(new Set(generateDashboard(fakeHass()).views.map((v) => v.background))).toEqual(new Set([viewBackground()]));
    expect(viewBackground()).toContain('url("/hisho_static/forest.jpg")');
    expect(own.views[3].background).toContain('url("/local/lake.jpg")');
    expect(generateDashboard(fakeHass(), { background: "" }).views[0].background).not.toContain("url(");
  });

  it("has a Conversations view with the conversations card across it", () => {
    const view = generateDashboard(fakeHass()).views.find((v) => v.path === "conversations")!;
    expect(view.sections).toEqual([{ type: "grid", column_span: 3,
      cards: [{ type: "custom:hisho-conversations-card", grid_options: { columns: "full" } }] }]);
  });

  it("says how to set Hisho up when it is not there", () => {
    const dash = generateDashboard(fakeHass({ noHisho: true }));
    expect(dash.views[0].cards![0].content).toContain("Add integration");
  });
});

describe("control center", () => {
  it("leads with your day: a greeting, one sentence, decisions, what Hisho is doing", async () => {
    const { root } = await mount("hisho-control-center-card", {});
    expect(root.querySelector("h1")!.textContent).toMatch(/^Good (morning|afternoon|evening|night)\.$/);
    expect(root.querySelector(".hello .summary")!.textContent).toBe(
      "1 urgent thing needs you, 1 project waiting on you, 1 to-do left today. Hisho is working on 1 thing for you.");
    expect(root.textContent).toContain("Transcribing on Souko"); // working on, in plain words
    expect(root.textContent).toContain("Security follow-ups"); // a project waiting on you
    const needs = root.querySelector("hisho-needs-you-card") as any;
    await needs.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await needs.updateComplete;
    expect(needs.shadowRoot.querySelector("ha-card")).toBeNull(); // embedded: no card inside a card
    expect(needs.shadowRoot.querySelector(".title")!.textContent).toBe("Needs your decision");
    expect(needs.shadowRoot.textContent).toContain("TrueNAS: pool Potter is unhealthy");
    expect(needs.shadowRoot.textContent).not.toContain("ZFS reports errors"); // compact: the finding opens on a tap
  });

  it("shows every part of the system as a status pill, and opens one in full on a tap", async () => {
    const { el, root } = await mount("hisho-control-center-card", {});
    expect(root.querySelector(".sysline")!.textContent!.replace(/\s+/g, " ").trim())
      .toBe("2 of 2 machines up · Sync OK · 1 needs a look · 1 job running");
    const pills = [...root.querySelectorAll("button.pill")].map((p) => `${p.querySelector(".pn")!.textContent} ${p.querySelector(".ps")!.textContent}`);
    expect(pills).toEqual(["Hashira Ren up", "Souko up", "ionos on", "truenas problem", "Web Factory ok"]);
    expect(root.querySelector(".drawer")).toBeNull();
    (root.querySelectorAll("button.pill")[3] as HTMLElement).click();
    await el.updateComplete;
    const card = root.querySelector(".drawer hisho-device-card") as any;
    expect(card.config).toMatchObject({ device: "truenas", embedded: true });
    (root.querySelectorAll("button.pill")[0] as HTMLElement).click();
    await el.updateComplete;
    expect(root.querySelector(".drawer hisho-machine-card")).not.toBeNull();
    (root.querySelector(".drawer .close") as HTMLElement).click();
    await el.updateComplete;
    expect(root.querySelector(".drawer")).toBeNull();
  });

  it("lists what Hisho did for you: Core's feed when there is one, else the jobs it finished", async () => {
    const { doneForYou } = await import("../src/cards/assistant");
    const hass = fakeHass();
    const now = Date.parse("2026-10-26T10:00:00Z");
    hass.states["sensor.hisho_jobs_active"].attributes.jobs = [
      { id: "j", kind: "install", status: "done", worker: "hashira-ren", updated_at: "2026-10-26T08:00:00Z" },
      { id: "k", kind: "transcribe", status: "done", worker: "souko", updated_at: "2026-10-24T08:00:00Z" }]; // too old
    expect(doneForYou(hass, now)).toEqual([{ what: "Installed on Hashira Ren", when: "2 h ago" }]);
    hass.states["sensor.hisho_done"] = { entity_id: "sensor.hisho_done", state: "1", attributes: { items: [
      { at: "2026-10-26T09:30:00Z", event: "host-sleep", text: "Parked Proxmox3 while nothing needed it" }] } };
    hass.entities["sensor.hisho_done"] = { entity_id: "sensor.hisho_done", device_id: "hub", platform: "hisho",
      translation_key: "done_for_you" };
    hass.entities = { ...hass.entities }; // a new registry: Hisho's devices are indexed again
    expect(doneForYou(hass, now)).toEqual([{ what: "Parked Proxmox3 while nothing needed it", when: "30 min ago" }]);
  });

  it("asks Hisho through Home Assistant's conversation agent and shows the answer", async () => {
    const hass = fakeHass();
    hass.states["conversation.hisho"] = { entity_id: "conversation.hisho", state: "x", attributes: {} };
    hass.entities["conversation.hisho"] = { entity_id: "conversation.hisho", device_id: "hub", platform: "hisho",
      translation_key: "assistant" };
    const { root } = await mount("hisho-control-center-card", {}, hass);
    const ask = root.querySelector("hisho-ask") as any;
    await ask.updateComplete;
    hass.callWS.mockResolvedValueOnce({ conversation_id: "c1", response: { speech: { plain: { speech: "Potter has 224 errors." } } } });
    ask.shadowRoot.querySelector("input").value = "How is Potter?";
    ask.shadowRoot.querySelector("form").dispatchEvent(new Event("submit", { cancelable: true }));
    await new Promise((r) => setTimeout(r, 0));
    await ask.updateComplete;
    expect(hass.callWS).toHaveBeenCalledWith({ type: "conversation/process", text: "How is Potter?",
      agent_id: "conversation.hisho", conversation_id: undefined, language: "en" });
    expect(ask.shadowRoot.querySelector(".answer .a").textContent).toBe("Potter has 224 errors.");
  });

  it("ticks off one of today's to-dos", async () => {
    const hass = fakeHass();
    hass.callWS.mockImplementation(async (msg: any) => msg.entity_id === "todo.hisho_today"
      ? { items: [{ uid: "t1", summary: "Swap the disk", status: "needs_action" }] } : { items: [] });
    const { root } = await mount("hisho-control-center-card", {}, hass);
    const day = root.querySelector("hisho-day") as any;
    await new Promise((r) => setTimeout(r, 0));
    await day.updateComplete;
    expect(day.shadowRoot.textContent).toContain("Swap the disk");
    (day.shadowRoot.querySelector("button.tick") as HTMLElement).click();
    expect(hass.callService).toHaveBeenCalledWith("todo", "update_item", { item: "t1", status: "completed" },
      { entity_id: "todo.hisho_today" });
  });
});

describe("pulse card", () => {
  it("shows the fleet's numbers with their last day", async () => {
    const { root } = await mount("hisho-pulse-card", {});
    const live = [...root.querySelectorAll(".lt")].map((t) =>
      [".lv", ".ll", ".ls"].map((c) => t.querySelector(c)!.textContent!.trim()).join(" | "));
    expect(live.slice(0, 2)).toEqual(["2/2 | Machines online | All up", "1 | Needs you | 1 critical"]);
    expect(root.querySelectorAll("hisho-spark").length).toBe(3); // no sync-conflicts entity in this fleet
  });
});

describe("machine tiles", () => {
  it("opens a machine tile for its details on a tap", async () => {
    const { el, root } = await mount("hisho-fleet-card", {});
    expect(root.querySelector(".kv")).toBeNull();
    (root.querySelector(".tile .mhead") as HTMLElement).click();
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
  it("treats an add-on with no settings (null from Hisho) as having none, without throwing", async () => {
    const { fields } = await import("../src/cards/settings");
    expect(fields(null, null)).toEqual([]);
    expect(fields({ token: "password?" }, null)[0]).toMatchObject({ key: "token", type: "password", optional: true });
    const hass = fakeHass();
    hass.states["sensor.web_factory_status"].attributes.settings = { schema: null, options: null, entry_schema: null, entry_form: null };
    const { root } = await mount("hisho-device-card", { device: "Web Factory" }, hass);
    expect(root.textContent).toContain("Deploy dev now");
  });

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


describe("sparklines", () => {
  it("buckets history, carrying the last value forward", async () => {
    const { bucket } = await import("../src/spark");
    expect(bucket([[0, 10], [30, 20], [80, 5]], 0, 100, 4)).toEqual([10, 20, 20, 5]);
    expect(bucket([], 0, 100, 4)).toEqual([]);
  });

  it("asks the recorder for a day of one entity, once for every card", async () => {
    const { series } = await import("../src/spark");
    const hass = fakeHass();
    const now = Date.parse("2026-10-26T10:00:00Z");
    hass.callWS.mockResolvedValue({ "sensor.x": [{ s: "40", lu: (now - 20 * 3600_000) / 1000 }, { s: "unavailable", lu: (now - 3600_000) / 1000 }] });
    const points = await series(hass, "sensor.x", 24, 4, now);
    await series(hass, "sensor.x", 24, 4, now + 1000);
    expect(points).toEqual([40, 40, 40, 40]);
    expect(hass.callWS).toHaveBeenCalledTimes(1);
    expect(hass.callWS.mock.calls[0][0]).toMatchObject({ type: "history/history_during_period", entity_ids: ["sensor.x"],
      minimal_response: true, no_attributes: true, start_time: "2026-10-25T10:00:00.000Z" });
  });
});

describe("conversations card", () => {
  const LIST = { timezone: "America/Los_Angeles", keep_days: 30, conversations: [
    { session_id: "c1", title: "how warm is it?", person: "Ana", area: "Kitchen", updated: "2026-10-28T21:10:00+00:00", messages: 2 },
    { session_id: "c2", title: "status?", person: "Home Assistant", via: "service", updated: "2026-10-28T03:05:00+00:00", messages: 4 }] };
  const TRANSCRIPT = { session_id: "c1", messages: [
    { role: "user", text: "how warm is it?", at: "2026-10-28T21:10:00+00:00", area: "Kitchen" },
    { role: "assistant", text: "It's 72 degrees.", ok: true, model: "haiku", seconds: 4.2 }] };
  function hassWith(fail?: Record<string, any>) {
    const hass = fakeHass();
    hass.callWS.mockImplementation(async (msg: any) => {
      if (fail?.[msg.type]) throw fail[msg.type];
      if (msg.type === "hisho/conversations/list") return structuredClone(LIST);
      if (msg.type === "hisho/conversations/get") return TRANSCRIPT;
      if (msg.type === "hisho/conversations/delete") return { ok: true };
      return {};
    });
    return hass;
  }
  const settle = async (el: any) => { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; };

  it("lists who, where and when in Hisho's owner time zone, and opens a transcript on a tap", async () => {
    const { el, root, hass } = await mount("hisho-conversations-card", {}, hassWith());
    await settle(el);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "hisho/conversations/list", limit: 200 });
    const rows = [...root.querySelectorAll("ul.list > li")].map((li) => li.textContent!.replace(/\s+/g, " ").trim());
    expect(rows[0]).toContain("how warm is it?");
    expect(rows[0]).toContain("Oct 28, 2:10 PM PDT");   // 21:10 UTC is 2:10 PM in Los Angeles
    expect(rows[0]).toContain("Ana · Kitchen · 1 Q");
    expect(rows[1]).toContain("Oct 27, 8:05 PM PDT");   // the evening before, there
    expect(rows[1]).toContain("Home Assistant (automation) · 2 Q");
    (root.querySelector("li .open") as HTMLElement).click();
    await settle(el);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "hisho/conversations/get", conversation_id: "c1" });
    expect(root.querySelector(".talk")!.textContent).toContain("It's 72 degrees.");
    expect(root.querySelector(".talk")!.textContent).toContain("haiku · 4.2 s");
  });

  it("filters by person", async () => {
    const { el, root } = await mount("hisho-conversations-card", {}, hassWith());
    await settle(el);
    const select = root.querySelector("select") as HTMLSelectElement;
    select.value = "Ana";
    select.dispatchEvent(new Event("change"));
    await settle(el);
    expect(root.querySelectorAll("ul.list > li").length).toBe(1);
  });

  it("deletes only after asking", async () => {
    const { el, root, hass } = await mount("hisho-conversations-card", {}, hassWith());
    await settle(el);
    const deletes = () => hass.callWS.mock.calls.filter((c: any[]) => c[0].type === "hisho/conversations/delete");
    button(root, "Delete").click();
    await answer(root, false);
    expect(deletes()).toEqual([]);
    button(root, "Delete").click();
    await answer(root, true);
    await settle(el);
    expect(deletes()).toEqual([[{ type: "hisho/conversations/delete", conversation_id: "c1" }]]);
    expect(root.querySelectorAll("ul.list > li").length).toBe(1);
  });

  it("says so when Home Assistant refuses (not an admin) and asks nothing for a non-admin", async () => {
    const { el, root } = await mount("hisho-conversations-card", {},
      hassWith({ "hisho/conversations/list": { code: "unauthorized", message: "Unauthorized" } }));
    await settle(el);
    expect(root.textContent).toContain("Only Home Assistant administrators can see these.");
    const hass = hassWith();
    hass.user = { id: "u", name: "Ben", is_admin: false };
    const other = await mount("hisho-conversations-card", {}, hass);
    expect(other.root.textContent).toContain("Hisho is for Home Assistant administrators.");
    expect(hass.callWS).not.toHaveBeenCalled();
  });
});
