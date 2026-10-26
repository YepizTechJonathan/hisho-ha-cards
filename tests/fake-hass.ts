// A Home Assistant `hass` object shaped like the hisho integration's real entities (v1.2.0).
import { vi } from "vitest";
import type { HomeAssistant, HassEntity } from "../src/hass";

type Ent = [string, string, string, string, Record<string, any>?]; // entity_id, device, translation_key, state, attrs

export function fakeHass(overrides: Partial<{ allowed: string[]; noHisho: boolean }> = {}): HomeAssistant & {
  callService: ReturnType<typeof vi.fn>; callWS: ReturnType<typeof vi.fn>;
} {
  const allowed = overrides.allowed ?? ["machine.wake", "machine.park", "alert.ack", "alert.unack", "alert.snooze",
    "alert.investigate", "alert.notify", "device.press", "addon.run", "job.cancel", "job.retry", "job.clear",
    "jobs.reap", "project.open", "project.archive", "unit.start", "unit.stop", "unit.restart",
    "maintenance.on", "maintenance.off", "addon.enable", "addon.disable"];
  const devices: HomeAssistant["devices"] = {
    hub: { id: "hub", name: "Hisho", model: "Control plane", entry_type: "service" },
    ren: { id: "ren", name: "Hashira Ren", model: "hashira-gpu", via_device_id: "hub" },
    souko: { id: "souko", name: "Souko", model: "Souko workstation", via_device_id: "hub" },
    truenas: { id: "truenas", name: "truenas", model: "Storage", via_device_id: "hub" },
    ionos: { id: "ionos", name: "ionos", model: "Server", via_device_id: "hub" },
    wf: { id: "wf", name: "Web Factory", model: "Add-on", via_device_id: "hub", entry_type: "service" },
  };
  const ents: Ent[] = [
    ["sensor.hisho_machines_online", "hub", "machines_online", "2"],
    ["binary_sensor.hisho_core_reachable", "hub", "core_reachable", "on"],
    ["sensor.hisho_actions_allowed", "hub", "actions_allowed", String(allowed.length), { allowed }],
    ["sensor.hisho_needs_you", "hub", "needs_you_count", "1", { alerts: [
      { id: "a1", severity: "critical", title: "TrueNAS: pool Potter is unhealthy" }] }],
    ["todo.hisho_needs_you", "hub", "needs_you", "1"],
    ["switch.hisho_fleet_maintenance", "hub", "fleet_maintenance", "off"],
    ["sensor.hisho_jobs_active", "hub", "jobs_active", "1", { jobs: [
      { id: "job-1", kind: "transcribe", status: "running", worker: "souko" },
      { id: "job-2", kind: "transcribe", status: "failed", worker: "souko", reason: "no input" }] }],
    ["sensor.hisho_projects_active", "hub", "projects_active", "2", { projects: [
      { name: "AMP", title: "AMP", status: "active", asks: [] },
      { name: "Security follow-ups", title: "Security follow-ups", status: "active", waiting_on: "jonathan",
        asks: ["Rotate the password"] }] }],
    ["sensor.hashira_ren_state", "ren", "machine_state", "up", { machine: "hashira-ren", power: ["park", "wake"], items: [] }],
    ["binary_sensor.hashira_ren_online", "ren", "online", "on"],
    ["sensor.hashira_ren_memory_usage", "ren", "memory_usage", "2.0"],
    ["sensor.hashira_ren_parking", "ren", "awake", "parks in 16m"],
    ["switch.hashira_ren_maintenance", "ren", "maintenance", "off"],
    ["sensor.souko_state", "souko", "machine_state", "up", { machine: "souko", power: [], items: [
      { addon: "prometheus", entry: "souko", id: "exporter", name: "node_exporter", state: "up", facts: [],
        actions: [{ id: "install", label: "Reinstall", danger: true }] }] }],
    ["binary_sensor.souko_online", "souko", "online", "on"],
    ["switch.souko_ollama", "souko", "unit", "off", { friendly_name: "Souko Ollama" }],
    ["sensor.truenas_power", "truenas", "box_state", "on"],
    ["sensor.truenas_health", "truenas", "box_health", "problem", { summary: "Pool Potter not ok" }],
    ["sensor.truenas_truenasce", "truenas", "box_item", "up", { friendly_name: "truenas TruenasCE", addon: "proxmox",
      entry: "PVE", item_id: "521", facts: ["VM 521 on pve"], actions: [{ id: "shutdown", label: "shut down", danger: true }] }],
    ["sensor.ionos_power", "ionos", "box_state", "on"],
    ["sensor.web_factory_status", "wf", "addon_status", "ok", { addon: "web-factory", kind: "integration", version: "0.6.0",
      problems: [], actions: [{ id: "deploy-dev", label: "Deploy dev now", danger: false }] }],
  ];
  const states: Record<string, HassEntity> = {};
  const entities: HomeAssistant["entities"] = {};
  for (const [id, device, key, state, attrs] of ents) {
    if (overrides.noHisho) break;
    states[id] = { entity_id: id, state, attributes: attrs ?? {}, last_changed: "2026-10-25T00:00:00Z" };
    entities[id] = { entity_id: id, device_id: device, platform: "hisho", translation_key: key };
  }
  return {
    states, entities, devices,
    callService: vi.fn().mockResolvedValue({}),
    callWS: vi.fn().mockResolvedValue({ items: [
      { uid: "a1", summary: "TrueNAS: pool Potter is unhealthy", status: "needs_action",
        description: "CRITICAL: Pool Potter is online but ZFS reports errors.\n\nClaude: Disk sdh, or its cable." },
      { uid: "a2", summary: "IONOS: updates", status: "completed", description: "WARN: 21 pending" }] }),
  } as any;
}
