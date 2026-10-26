// Builds the demo pages: the real bundle with a fake hass, for screenshots. node demo/build-demo.mjs
//   demo/index.html     every card in a grid
//   demo/overview.html  the Control Center full width (the strategy's Overview), with a fuller fleet
import { build } from "esbuild";
const common = { bundle: true, format: "esm", alias: { vitest: "./demo/vitest-shim.js" } };
await build({ ...common, outfile: "demo/demo.js", stdin: { resolveDir: "demo", loader: "ts", contents: `
    import "../src/index";
    import { fakeHass } from "../tests/fake-hass";
    const hass = fakeHass();
    const cards = [["hisho-fleet-card", {}], ["hisho-needs-you-card", {}], ["hisho-machine-card", {machine: "Souko"}],
                   ["hisho-device-card", {device: "truenas"}], ["hisho-jobs-card", {}], ["hisho-projects-card", {}]];
    for (const [tag, cfg] of cards) {
      const el = document.createElement(tag); el.setConfig({type: "custom:" + tag, ...cfg}); el.hass = hass;
      document.getElementById("grid").appendChild(el);
    }` } });
await build({ ...common, outfile: "demo/overview.js", stdin: { resolveDir: "demo", loader: "ts", contents: `
    import "../src/index";
    import { fakeHass } from "../tests/fake-hass";
    const hass = fakeHass();
    const add = (id, device, key, state, attributes = {}) => {
      hass.states[id] = { entity_id: id, state, attributes, last_changed: "2026-10-25T00:00:00Z" };
      hass.entities[id] = { entity_id: id, device_id: device, platform: "hisho", translation_key: key };
    };
    hass.devices.kihon = { id: "kihon", name: "Kihon", model: "control plane", via_device_id: "hub" };
    hass.devices.ten = { id: "ten", name: "Hashira Ten", model: "hashira-tools", via_device_id: "hub" };
    add("sensor.kihon_state", "kihon", "machine_state", "up", { machine: "kihon", power: [], role: "Hisho Core + dashboard" });
    add("binary_sensor.kihon_online", "kihon", "online", "on");
    add("sensor.kihon_memory", "kihon", "memory_usage", "21"); add("sensor.kihon_disk", "kihon", "disk_usage", "15");
    add("switch.kihon_maint", "kihon", "maintenance", "off"); add("sensor.kihon_containers", "kihon", "containers_running", "14");
    add("sensor.ten_state", "ten", "machine_state", "parked", { machine: "hashira-ten", power: ["wake"], reason: "parked: idle 30 min" });
    add("binary_sensor.ten_online", "ten", "online", "off"); add("switch.ten_maint", "ten", "maintenance", "off");
    add("sensor.ren_disk", "ren", "disk_usage", "35"); add("sensor.ren_gpu", "ren", "gpu_usage", "62");
    add("sensor.ten_mem", "ten", "memory_usage", "9"); add("sensor.ten_disk", "ten", "disk_usage", "41");
    add("sensor.souko_mem", "souko", "memory_usage", "11"); add("sensor.souko_disk", "souko", "disk_usage", "4");
    add("sensor.souko_gpu", "souko", "gpu_usage", "6"); add("switch.souko_maint", "souko", "maintenance", "off");
    hass.states["sensor.hisho_machines_online"].state = "3";
    hass.states["sensor.hisho_needs_you"].state = "4";
    hass.states["sensor.hisho_needs_you"].attributes.alerts = [
      { id: "a1", severity: "critical", title: "TrueNAS: pool Potter is unhealthy" },
      { id: "a3", severity: "decision", title: "Rotate the reused password everywhere it was used" },
      { id: "a4", severity: "warn", title: "Semaphore: Authorized Keys - Manual Guarded failed" },
      { id: "a5", severity: "warn", title: "PatriotPoint: SAM.gov renewal due October 29" }];
    hass.user = { id: "u", name: "Jonathan Yepiz", is_admin: true };
    hass.config = { time_zone: "America/Los_Angeles" };
    add("binary_sensor.hisho_sync_problem", "hub", "sync_problem", "off");
    add("sensor.hisho_sync_conflicts", "hub", "sync_conflicts", "0");
    add("sensor.hisho_projects_waiting", "hub", "projects_waiting", "2");
    const todo = { items: [
      { uid: "a1", summary: "TrueNAS: pool Potter is unhealthy", status: "needs_action",
        description: "CRITICAL: Pool Potter is online but ZFS reports 224 data errors from the last scrub.\\n\\nClaude: disk sdh, or its cable; the disks also run hot (57 °C)." },
      { uid: "a3", summary: "Rotate the reused password everywhere it was used", status: "needs_action", description: "DECISION: Security follow-ups" },
      { uid: "a4", summary: "Semaphore: Authorized Keys - Manual Guarded failed", status: "needs_action", description: "WARN: failed on October 25" },
      { uid: "a5", summary: "PatriotPoint: SAM.gov renewal due October 29", status: "needs_action", description: "WARN: confirm it was approved" }] };
    // A made-up day of history for the sparklines: a smooth wander around today's value, steps for counts.
    const day = (id) => {
      const now = Date.now() / 1000, cur = parseFloat(hass.states[id]?.state ?? "0") || 0;
      let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 9973;
      const count = /online|needs|jobs|conflicts/.test(id);
      return Array.from({ length: 49 }, (_, i) => {
        const t = i / 48, w = Math.sin(t * 9 + h) * 0.5 + Math.sin(t * 23 + h * 2) * 0.3 + Math.sin(t * 3 + h) * 0.6;
        const v = count ? Math.max(0, Math.round(cur + w * 1.3 * (i < 46 ? 1 : 0)))
          : Math.max(0, Math.min(100, cur + w * Math.max(4, cur * 0.35) * (i < 48 ? 1 : 0)));
        return { s: String(v), lu: now - (48 - i) * 1800 };
      });
    };
    hass.callWS = async (msg) => msg.type === "history/history_during_period"
      ? Object.fromEntries(msg.entity_ids.map((id) => [id, day(id)])) : todo;
    const el = document.createElement("hisho-control-center-card");
    el.setConfig({ type: "custom:hisho-control-center-card" }); el.hass = hass;
    document.getElementById("panel").appendChild(el);` } });
