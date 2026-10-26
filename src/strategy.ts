// The Hisho dashboard strategy: `strategy: {type: custom:hisho}` builds a whole dashboard from the hisho
// integration's devices, so it grows with the fleet. "Take control" turns it into a normal, editable one.
import type { HomeAssistant, LovelaceCardConfig } from "./hass";
import { byKind, entityId, hub } from "./model";

interface View {
  title: string;
  path: string;
  icon: string;
  cards: LovelaceCardConfig[];
  type?: string;
}

const KIND_ORDER = ["Server", "Vm", "Storage", "Device", "Network"];
const KIND_TITLE: Record<string, string> = {
  Server: "Servers", Vm: "Virtual machines", Storage: "Storage", Device: "Devices", Network: "Network",
};

export function generateDashboard(hass: HomeAssistant): { title: string; views: View[] } {
  const h = hub(hass);
  if (!h) {
    return {
      title: "Hisho",
      views: [{ title: "Hisho", path: "hisho", icon: "mdi:server-network", cards: [{
        type: "markdown",
        content: "The **Hisho** integration is not set up yet: Settings › Devices & services › Add integration › Hisho.",
      }] }],
    };
  }
  const machines = byKind(hass, "machine");
  const boxes = byKind(hass, "box");
  const addons = byKind(hass, "addon");
  const hubEntities = ["core_reachable", "critical_alert", "needs_you_count", "machines_online", "machines_faulted",
    "jobs_active", "jobs_failed", "sync_problem", "sync_conflicts"]
    .map((k) => entityId(h, k)).filter((id): id is string => !!id);
  const todayList = entityId(h, "today");
  const dueDates = entityId(h, "due_dates");
  const phone = ["phone", "phone_alerts", "clear_phone", "hide_acked"].map((k) => entityId(h, k)).filter((id): id is string => !!id);

  const groups = new Map<string, string[]>();
  for (const b of boxes) {
    const kind = KIND_ORDER.includes(b.model) ? b.model : "Device";
    groups.set(kind, [...(groups.get(kind) ?? []), b.name]);
  }

  return {
    title: "Hisho",
    views: [
      {
        title: "Overview", path: "overview", icon: "mdi:view-dashboard",
        cards: [
          { type: "custom:hisho-fleet-card" },
          { type: "custom:hisho-needs-you-card" },
          { type: "custom:hisho-jobs-card", limit: 6 },
          { type: "entities", title: "Hisho", state_color: true, entities: hubEntities },
        ],
      },
      {
        title: "Machines", path: "machines", icon: "mdi:server",
        cards: machines.map((m) => ({ type: "custom:hisho-machine-card", machine: m.name })),
      },
      {
        title: "Devices", path: "devices", icon: "mdi:devices",
        cards: KIND_ORDER.filter((k) => groups.has(k)).flatMap((k) => [
          { type: "heading", heading: KIND_TITLE[k] },
          ...groups.get(k)!.map((name) => ({ type: "custom:hisho-device-card", device: name })),
        ]),
      },
      {
        title: "Add-ons", path: "addons", icon: "mdi:puzzle",
        cards: [
          ...(entityId(h, "addon_updates") ? [{ type: "custom:hisho-store-card" }] : []),
          ...addons.map((a) => ({ type: "custom:hisho-device-card", device: a.name })),
        ],
      },
      ...(todayList || dueDates ? [{
        title: "Today", path: "today", icon: "mdi:calendar-today",
        cards: [
          ...(todayList ? [{ type: "todo-list", entity: todayList, title: "Today" }] : []),
          ...(dueDates ? [{ type: "calendar", entities: [dueDates], initial_view: "dayGridMonth", title: "Due dates" }] : []),
        ],
      }] : []),
      {
        title: "Projects", path: "projects", icon: "mdi:folder-multiple",
        cards: [{ type: "custom:hisho-projects-card" }, { type: "custom:hisho-jobs-card", title: "All jobs", limit: 50 }],
      },
      {
        title: "Phone", path: "phone", icon: "mdi:cellphone-message",
        cards: [
          { type: "entities", title: "Hisho phone app", entities: phone },
          { type: "markdown", content: "Send a message to the Hisho phone app from an automation or script with " +
            "`notify.send_message` on the **Hisho Phone app** entity." },
        ],
      },
    ],
  };
}

export class HishoDashboardStrategy extends HTMLElement {
  static async generate(_config: Record<string, any>, hass: HomeAssistant) {
    return generateDashboard(hass);
  }
}
