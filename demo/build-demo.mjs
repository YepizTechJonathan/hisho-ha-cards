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
    add("sensor.souko_mem", "souko", "memory_usage", "11"); add("sensor.souko_disk", "souko", "disk_usage", "4");
    add("sensor.souko_gpu", "souko", "gpu_usage", "6"); add("switch.souko_maint", "souko", "maintenance", "off");
    hass.states["sensor.hisho_machines_online"].state = "3";
    hass.states["sensor.hisho_needs_you"].state = "4";
    hass.states["sensor.hisho_needs_you"].attributes.alerts = [
      { id: "a1", severity: "critical", title: "TrueNAS: pool Potter is unhealthy" },
      { id: "a3", severity: "decision", title: "Rotate the reused password everywhere it was used" },
      { id: "a4", severity: "warn", title: "Semaphore: Authorized Keys - Manual Guarded failed" },
      { id: "a5", severity: "warn", title: "PatriotPoint: SAM.gov renewal due October 29" }];
    hass.callWS = async () => ({ items: [
      { uid: "a1", summary: "TrueNAS: pool Potter is unhealthy", status: "needs_action",
        description: "CRITICAL: Pool Potter is online but ZFS reports 224 data errors from the last scrub.\\n\\nClaude: disk sdh, or its cable; the disks also run hot (57 °C)." },
      { uid: "a3", summary: "Rotate the reused password everywhere it was used", status: "needs_action", description: "DECISION: Security follow-ups" },
      { uid: "a4", summary: "Semaphore: Authorized Keys - Manual Guarded failed", status: "needs_action", description: "WARN: failed on October 25" },
      { uid: "a5", summary: "PatriotPoint: SAM.gov renewal due October 29", status: "needs_action", description: "WARN: confirm it was approved" }] });
    const el = document.createElement("hisho-control-center-card");
    el.setConfig({ type: "custom:hisho-control-center-card" }); el.hass = hass;
    document.getElementById("panel").appendChild(el);` } });
