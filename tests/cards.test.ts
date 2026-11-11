import { describe, expect, it, vi } from "vitest";
import "../src/index";
import { fakeHass } from "./fake-hass";
import { hishoDevices } from "../src/model";
import { generateDashboard } from "../src/strategy";
import { HA_CARD_GLASS, viewBackground } from "../src/styles";
import { trustBy, trustDetail } from "../src/cards/setup-card";

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

  it("has a Kids' PCs view: each kid's PC with its readings and buttons, then the game cache", () => {
    const hass = fakeHass() as any;
    hass.devices.kid = { id: "kid", name: "Hashira Kocho Pat", model: "hashira-gaming", via_device_id: "hub" };
    const add = (id: string, device: string, key: string, state: string, attrs: Record<string, any> = {}, enabled = true) => {
      hass.entities[id] = { entity_id: id, device_id: device, platform: "hisho", translation_key: key };
      if (enabled) hass.states[id] = { entity_id: id, state, attributes: attrs, last_changed: "2026-11-07T00:00:00Z" };
    };
    add("sensor.kid_state", "kid", "machine_state", "up", { machine: "hashira-kocho-pat", power: [], items: [] });
    add("sensor.kid_time_left", "kid", "parental_time_left", "29");
    add("sensor.kid_played", "kid", "parental_played_today", "65");
    add("binary_sensor.kid_signed_in", "kid", "parental_signed_in", "on");
    add("button.kid_lock", "kid", "parental_lock", "unknown");
    add("button.kid_more", "kid", "parental_more", "unknown");
    add("button.kid_stop", "kid", "parental_stop", "unknown");
    add("button.kid_off", "kid", "parental_off", "unknown", {}, false);       // still disabled in HA: left out
    add("sensor.hisho_game_cache_used", "hub", "game_cache_used", "3.6", { last_download: null });
    add("sensor.hisho_game_cache_share", "hub", "game_cache_share_24h", "50");
    const view = generateDashboard(hass).views.find((v) => v.path === "kids")!;
    expect(view.title).toBe("Kids' PCs");
    const [pc, cache] = view.sections!.map((s) => s.cards);
    expect(pc.map((c) => c.heading ?? c.name)).toEqual(["Pat's PC", "Time left today", "Played today", "Signed in",
      "Lock screen", "30 more minutes", "Time's up for today"]);
    const stop = pc.find((c) => c.name === "Time's up for today")!;
    expect(stop.tap_action).toMatchObject({ action: "perform-action", perform_action: "button.press",
      target: { entity_id: "button.kid_stop" }, confirmation: { text: "End Pat's play for today?" } });
    expect(pc.find((c) => c.name === "Lock screen")!.tap_action.confirmation).toBeUndefined();
    expect(cache.map((c) => c.heading ?? c.name ?? c.type)).toEqual(["Game cache", "Used", "From the cache, last 24 h", "markdown"]);
    expect(cache[3].content).toContain("state_attr('sensor.hisho_game_cache_used', 'last_download')");
    // no kids' PCs and no cache: no view
    expect(generateDashboard(fakeHass()).views.some((v) => v.path === "kids")).toBe(false);
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

describe("machine card services", () => {
  const withServices = () => {
    const hass: any = fakeHass();
    hass.config = { time_zone: "America/Los_Angeles" };
    const add = (id: string, state: string, attributes: Record<string, any>) => {
      hass.states[id] = { entity_id: id, state, attributes: { friendly_name: id.split(".")[1], ...attributes },
                          last_changed: "2026-11-01T00:00:00Z" };
      hass.entities[id] = { entity_id: id, device_id: "ren", platform: "hisho", translation_key: "service" };
    };
    add("binary_sensor.ren_mirrors", "on", { kind: "scheduled", state: "success", last_run: "2026-11-01T04:10:12+00:00" });
    add("binary_sensor.ren_backup", "off", { kind: "scheduled", state: "missed its 9:10 PM run (last ok Oct 30 9:10 PM)" });
    add("binary_sensor.ren_copy", "off", { kind: "scheduled", state: "last run failed (Oct 31 9:10 PM)" });
    add("binary_sensor.ren_gone", "unavailable", {});
    add("binary_sensor.ren_asking", "off", { kind: "scheduled", state: "probe-error" });
    add("binary_sensor.ren_core", "on", { state: "active" });
    add("binary_sensor.ren_agent", "off", { state: "inactive" });
    return hass;
  };
  const chips = (root: ShadowRoot) => Object.fromEntries([...root.querySelectorAll(".mright li")].map((li) =>
    [li.querySelector("span")!.textContent!.trim(), li.querySelector(".chip")!] as const));

  it("shows a job Semaphore runs by its last run, and no data in grey instead of a red stopped", async () => {
    const { root } = await mount("hisho-machine-card", { machine: "Hashira Ren" }, withServices());
    const c = chips(root);
    const say = (k: string) => [c[k].textContent!.trim(), c[k].className.replace("chip ", "")];
    expect(say("ren_mirrors")).toEqual(["ok · ran 9:10 PM", "ok"]);     // 04:10 UTC = 9:10 PM Pacific
    expect(say("ren_backup")).toEqual(["missed", "bad"]);
    expect(say("ren_copy")).toEqual(["failed", "bad"]);
    expect(say("ren_gone")).toEqual(["no data", "off"]);
    expect(say("ren_asking")).toEqual(["no data", "off"]);
    expect(say("ren_core")).toEqual(["running", "ok"]);
    expect(say("ren_agent")).toEqual(["inactive", "bad"]);
    expect(c["ren_backup"].getAttribute("title")).toContain("last ok Oct 30");
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
    // only the words keep their line breaks, not the bubble's own markup (0.5/0.6.0 bubbles had blank lines)
    expect([...root.querySelectorAll(".talk .text")].map((t) => t.textContent)).toEqual(["how warm is it?", "It's 72 degrees."]);
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

describe("setup card", () => {
  it("shows Check my Souko, backup, approvals, vault and the trust window, with Check now and End now", async () => {
    const hass = fakeHass();
    const add = (id: string, key: string, state: string, attributes: Record<string, any> = {}) => {
      hass.states[id] = { entity_id: id, state, attributes, last_changed: "2026-11-01T00:00:00Z" };
      hass.entities![id] = { entity_id: id, device_id: "hub", platform: "hisho", translation_key: key };
    };
    add("sensor.hisho_check_my_souko", "souko_check", "problems",
      { checks: [{ name: "Logins in your password vault", ok: false }, { name: "Keyboard", ok: true }] });
    add("button.hisho_check_my_souko", "check_souko", "unknown");
    add("sensor.hisho_last_good_backup", "backup_last_good", new Date(Date.now() - 3 * 3600000).toISOString(), { ok: true });
    add("sensor.hisho_approvals_waiting", "approvals_waiting", "2", { approvals: [{ title: "Reply to Randy" }, { title: "x" }] });
    add("sensor.hisho_logins_not_in_vault", "logins_not_in_vault", "1",
      { logins: [{ title: "Forgejo", waiting: ["vaultwarden"] }, { title: "Semaphore", waiting: [] }] });
    add("binary_sensor.hisho_trust_window", "trust_window", "on", { until: "2026-11-01T03:30:00Z",
      open_on: { souko: { until: "2026-11-01T03:30:00Z", by: "Home Assistant user Jonathan" } } });
    add("button.hisho_end_trust_window", "trust_end", "unknown");
    const { root } = await mount("hisho-setup-card", {}, hass);
    const tiles = [...root.querySelectorAll(".lt")].map((t) => t.querySelector(".ll")!.textContent!.trim() + ": " +
      t.querySelector(".lv")!.textContent!.trim());
    expect(tiles).toEqual(["Check my Souko: 1 to look at", "Last good backup: 3 h ago", "Approvals waiting: 2",
      "Logins not in the vault: 1", "Trust window: Open"]);
    expect(root.textContent).toContain("Reply to Randy and 1 more");
    expect(root.textContent).toContain("opened by Home Assistant user Jonathan on souko");      // who turned it on
    button(root, "Check now").click();
    button(root, "End now").click();
    await new Promise((r) => setTimeout(r, 0));
    expect(hass.callService).toHaveBeenCalledWith("button", "press", {}, { entity_id: "button.hisho_check_my_souko" });
    expect(hass.callService).toHaveBeenCalledWith("button", "press", {}, { entity_id: "button.hisho_end_trust_window" });
    const dash = generateDashboard(hass);
    expect(dash.views[1].sections![1].cards).toEqual([{ type: "custom:hisho-setup-card", grid_options: { columns: "full" } }]);
  });

  it("says the last window when closed: where, who opened it, how many tools Claude ran", () => {
    const hass = fakeHass();
    const started = new Date(Date.now() - 2 * 3600000).toISOString();
    expect(trustDetail(hass, { recent: [{ machine: "Souko", by: "dashboard", started, commands_total: 4 }] }))
      .toBe("Claude asks first. Last window: Souko, 2 h ago by the dashboard, 4 tools run (listed on Hisho's dashboard)");
    expect(trustDetail(hass, { recent: [] })).toBe("Claude asks first");
    expect(trustBy(undefined)).toBe("something Hisho didn't record");
  });

  it("is left out for an older integration", async () => {
    const { root } = await mount("hisho-setup-card", {});
    expect(root.querySelector(".lt")).toBeNull();
    expect(generateDashboard(fakeHass()).views[1].sections![1].cards[0].type).toBe("custom:hisho-machine-card");
  });
});

describe("conversations card: picking one up again", () => {
  const LIST = { timezone: "America/Los_Angeles", keep_days: 30, conversations: [
    { session_id: "mine", title: "set up the garage code", person: "Jonathan", person_id: "me", updated: "2026-11-01T19:00:00+00:00", messages: 2 },
    { session_id: "hers", title: "play music", person: "Ana", person_id: "ana", updated: "2026-11-01T18:00:00+00:00", messages: 2 }] };
  let asked = [{ role: "user", text: "set up the garage code" }, { role: "assistant", text: "What's the code?", ok: true }];
  function hassFor() {
    const hass = fakeHass();
    hass.user = { id: "me", name: "Jonathan", is_admin: true };
    hass.callWS.mockImplementation(async (msg: any) => {
      if (msg.type === "hisho/conversations/list") return structuredClone(LIST);
      if (msg.type === "hisho/conversations/get") return { session_id: msg.conversation_id, messages: asked };
      if (msg.type === "hisho/conversations/continue") {
        asked = [...asked, { role: "user", text: msg.text }, { role: "assistant", text: "Saved: 4417.", ok: true }];
        return { ok: true, reply: "Saved: 4417." };
      }
      return {};
    });
    return hass;
  }
  const settle = async (el: any) => { for (let i = 0; i < 3; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; } };

  it("continues your own conversation in the same thread", async () => {
    const { el, root, hass } = await mount("hisho-conversations-card", {}, hassFor());
    await settle(el);
    (root.querySelectorAll("li .open")[0] as HTMLElement).click();
    await settle(el);
    const box = root.querySelector(".go-on textarea") as HTMLTextAreaElement;
    expect(box.placeholder).toBe("Hisho asked you something: answer it here");
    box.value = "the code is 4417";
    (root.querySelector(".go-on") as HTMLFormElement).dispatchEvent(new Event("submit", { cancelable: true }));
    await settle(el);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "hisho/conversations/continue", conversation_id: "mine",
      text: "the code is 4417" });
    expect(root.querySelector(".talk")!.textContent).toContain("Saved: 4417.");
    expect((root.querySelector(".go-on textarea") as HTMLTextAreaElement).value).toBe("");
  });

  it("shows someone else's conversation read-only", async () => {
    const { el, root, hass } = await mount("hisho-conversations-card", {}, hassFor());
    await settle(el);
    (root.querySelectorAll("li .open")[1] as HTMLElement).click();
    await settle(el);
    expect(root.querySelector(".go-on")).toBeNull();
    expect(root.textContent).toContain("Only Ana can continue this conversation.");
    expect(hass.callWS.mock.calls.some((c: any[]) => c[0].type === "hisho/conversations/continue")).toBe(false);
  });
});

describe("hisho-calendar-card", () => {
  const withCalendar = () => {
    const hass = fakeHass() as any;
    const id = "calendar.hisho_my_calendar";
    hass.states[id] = { entity_id: id, state: "off", last_changed: "2026-10-25T00:00:00Z",
      attributes: { companies: { PatriotPoint: "#2f80ed", YepizTech: "#e5484d" }, problems: ["PatriotPoint: refused the login"] } };
    hass.entities[id] = { entity_id: id, device_id: "hub", platform: "hisho", translation_key: "my_calendar" };
    const day = (n: number) => new Date(Date.now() + n * 86_400_000).toLocaleDateString("en-CA");
    hass.callApi = vi.fn().mockResolvedValue([
      { summary: "🟥 YepizTech: Client call", description: "Company: YepizTech", location: "Zoom",
        start: { dateTime: `${day(1)}T10:00:00` }, end: { dateTime: `${day(1)}T10:30:00` } },
      { summary: "🟦 PatriotPoint: SAM.gov check", description: "Company: PatriotPoint\nHisho due date",
        start: { date: day(1) }, end: { date: day(2) } },
      { summary: "Someone's own title: with a colon", start: { date: day(3) }, end: { date: day(4) } }]);
    return hass;
  };

  it("lists your one calendar, each event in its company's colour, with a legend and what can't be read", async () => {
    const { root, hass } = await mount("hisho-calendar-card", {}, withCalendar());
    await new Promise((r) => setTimeout(r, 0));
    await (root.host as any).updateComplete;
    expect((hass.callApi as any).mock.calls[0][1]).toMatch(/^calendars\/calendar\.hisho_my_calendar\?start=/);
    const legend = [...root.querySelectorAll(".legend span")].map((s) => s.textContent?.trim());
    expect(legend).toEqual(["PatriotPoint", "YepizTech"]);
    const rows = [...root.querySelectorAll(".ev")].map((r) => ({
      title: r.querySelector(".n")?.textContent, sub: r.querySelector(".s")?.textContent,
      color: (r.querySelector(".bar") as HTMLElement).style.background }));
    expect(rows[0]).toEqual({ title: "Client call", sub: "YepizTech · Zoom", color: "#e5484d" });
    expect(rows[1]).toEqual({ title: "SAM.gov check", sub: "PatriotPoint · Hisho due date", color: "#2f80ed" });
    expect(rows[2].title).toBe("Someone's own title: with a colon");   // not a company: the title stays whole
    expect(root.querySelector(".warn")?.textContent).toContain("PatriotPoint: refused the login");
  });

  it("goes on the Today view in place of the due-dates month when you have a calendar", () => {
    const views = generateDashboard(withCalendar()).views as any[];
    const today = JSON.stringify(views.find((v) => v.path === "today"));
    expect(today).toContain("custom:hisho-calendar-card");
    expect(today).not.toContain('"initial_view"');
  });
});

describe("add-on cards", () => {
  const withCard = () => {
    const hass = fakeHass();
    (hass.devices.hub as any).configuration_url = "https://hisho.example.ts.net/";
    hass.states["sensor.web_factory_status"].attributes.card = { title: "Gov bids", rows: [
      { label: "Open matches", value: "25", detail: "0 strong · 3 new", state: "ok", indent: false, url: "#/addons/gov-bids" },
      { label: "Best match", value: "68", detail: "VA tools · due Tue Nov 17", state: "", indent: true,
        url: "https://sam.gov/opp/a/view" },
      { label: "Quiet", value: "1", detail: "", state: "warn", indent: false, url: "javascript:alert(1)" }] };
    return hass;
  };

  it("shows an add-on's own card, its rows linking to Hisho's pages or the outside page", async () => {
    const { root } = await mount("hisho-addon-card", { addon: "web-factory" }, withCard());
    expect(root.querySelector(".title")!.textContent).toBe("Gov bids");
    const rows = [...root.querySelectorAll(".arow")];
    expect(rows.map((r) => r.querySelector(".avalue")!.textContent)).toEqual(["25", "68", "1"]);
    expect(rows[0].querySelector("a")!.getAttribute("href")).toBe("https://hisho.example.ts.net/#/addons/gov-bids");
    expect(rows[1].querySelector("a")!.getAttribute("href")).toBe("https://sam.gov/opp/a/view");
    expect(rows[1].classList.contains("indent")).toBe(true);
    expect(rows[2].querySelector("a")).toBeNull();   // not http(s) or a Hisho page: no link
    expect(rows[2].querySelector(".dot")!.classList.contains("warn")).toBe(true);
  });

  it("finds the add-on by its title too, and says when it has no card", async () => {
    expect((await mount("hisho-addon-card", { addon: "Web Factory" }, withCard())).root.textContent).toContain("Open matches");
    expect((await mount("hisho-addon-card", { addon: "web-factory" })).root.textContent).toContain("has no overview card");
    expect((await mount("hisho-addon-card", { addon: "nope" })).root.textContent).toContain("No Hisho add-on named nope");
  });

  it("puts every add-on's card on the control center, and none when no add-on has one", async () => {
    const { root } = await mount("hisho-control-center-card", {}, withCard());
    expect(root.querySelector(".addoncards .title")!.textContent).toBe("Gov bids");
    expect((await mount("hisho-control-center-card", {})).root.querySelector(".addoncards")).toBeNull();
  });
});
