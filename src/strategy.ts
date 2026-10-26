// The Hisho dashboard strategy: `strategy: {type: custom:hisho}` builds a whole dashboard from the hisho
// integration's devices, so it grows with the fleet. "Take control" turns it into a normal, editable one.
import type { HomeAssistant, LovelaceCardConfig } from "./hass";
import { byKind, entityId, hub } from "./model";
import { HA_CARD_GLASS, viewBackground } from "./styles";

interface Section {
  type: "grid";
  cards: LovelaceCardConfig[];
  column_span?: number;
}

interface View {
  title: string;
  path: string;
  icon: string;
  type?: string;
  cards?: LovelaceCardConfig[];
  sections?: Section[];
  max_columns?: number;
  dense_section_placement?: boolean;
  background?: string;
}

export interface StrategyConfig {
  /** The dashboard's picture: a URL ("/local/my-photo.jpg"), or "" for none (just the colours). */
  background?: string;
}

/** Home Assistant's own cards in Hisho's dark glass, when card-mod is installed (without it they keep the theme). */
function glass(card: LovelaceCardConfig): LovelaceCardConfig {
  return { ...card, card_mod: { style: HA_CARD_GLASS } };
}

/** A card that fills a wide section (otherwise a card takes one column of it). */
const FULL = { grid_options: { columns: "full" } };

/** HA's sections view: its sections are columns that fill a wide screen (up to four here) and stack on a phone. */
function sections(view: Omit<View, "type" | "sections">, groups: (LovelaceCardConfig[] | Section)[]): View {
  return {
    ...view, type: "sections", max_columns: 4, dense_section_placement: true,
    sections: groups.filter((g) => (Array.isArray(g) ? g : g.cards).length)
      .map((g) => (Array.isArray(g) ? { type: "grid", cards: g } : g)),
  };
}

const KIND_ORDER = ["Server", "Vm", "Storage", "Device", "Network"];
const KIND_TITLE: Record<string, string> = {
  Server: "Servers", Vm: "Virtual machines", Storage: "Storage", Device: "Devices", Network: "Network",
};

export function generateDashboard(hass: HomeAssistant, config: StrategyConfig = {}): { title: string; views: View[] } {
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
  const todayList = entityId(h, "today");
  const dueDates = entityId(h, "due_dates");
  const phone = ["phone", "phone_alerts", "clear_phone", "hide_acked"].map((k) => entityId(h, k)).filter((id): id is string => !!id);

  const groups = new Map<string, string[]>();
  for (const b of boxes) {
    const kind = KIND_ORDER.includes(b.model) ? b.model : "Device";
    groups.set(kind, [...(groups.get(kind) ?? []), b.name]);
  }

  const background = viewBackground(config.background);
  const views: View[] = [
      // The Control Center fills the screen: a panel view is one card, full width.
      { title: "Overview", path: "overview", icon: "mdi:view-dashboard", type: "panel",
        cards: [{ type: "custom:hisho-control-center-card" }] },
      sections({ title: "Machines", path: "machines", icon: "mdi:server" },
        machines.map((m) => [{ type: "custom:hisho-machine-card", machine: m.name }])),
      // A group as wide as its devices (up to the four columns), its cards side by side inside it.
      sections({ title: "Devices", path: "devices", icon: "mdi:devices" },
        KIND_ORDER.filter((k) => groups.has(k)).map((k) => ({
          type: "grid" as const, column_span: Math.min(4, groups.get(k)!.length), cards: [
            { type: "heading", heading: KIND_TITLE[k] },
            ...groups.get(k)!.map((name) => ({ type: "custom:hisho-device-card", device: name })),
          ] }))),
      sections({ title: "Add-ons", path: "addons", icon: "mdi:puzzle" }, [
        ...(entityId(h, "addon_updates") ? [{ type: "grid" as const, column_span: 2, cards: [{ type: "custom:hisho-store-card", ...FULL }] }] : []),
        ...addons.map((a) => [{ type: "custom:hisho-device-card", device: a.name }]),
      ]),
      ...(todayList || dueDates ? [sections({ title: "Today", path: "today", icon: "mdi:calendar-today" }, [
        todayList ? [glass({ type: "todo-list", entity: todayList, title: "Today" })] : [],
        dueDates ? { type: "grid" as const, column_span: 3, cards: [
          glass({ type: "calendar", entities: [dueDates], initial_view: "dayGridMonth", title: "Due dates", ...FULL })] } : [],
      ])] : []),
      sections({ title: "Projects", path: "projects", icon: "mdi:folder-multiple" }, [
        { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-projects-card", ...FULL }] },
        { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-jobs-card", title: "All jobs", limit: 50, ...FULL }] },
      ]),
      sections({ title: "Phone", path: "phone", icon: "mdi:cellphone-message" }, [[
        glass({ type: "entities", title: "Hisho phone app", entities: phone }),
        glass({ type: "markdown", content: "Send a message to the Hisho phone app from an automation or script with " +
          "`notify.send_message` on the **Hisho Phone app** entity." }),
      ]]),
  ];
  // Every view on the same picture, so moving between them feels like one place.
  return { title: "Hisho", views: views.map((v) => ({ ...v, background })) };
}

export class HishoDashboardStrategy extends HTMLElement {
  static async generate(config: StrategyConfig & Record<string, any>, hass: HomeAssistant) {
    return generateDashboard(hass, config);
  }
}
