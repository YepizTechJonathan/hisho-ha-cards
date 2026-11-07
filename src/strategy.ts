// The Hisho dashboard strategy: `strategy: {type: custom:hisho}` builds a whole dashboard from the hisho
// integration's devices, so it grows with the fleet. "Take control" turns it into a normal, editable one.
import type { HomeAssistant, LovelaceCardConfig } from "./hass";
import { byKind, entityId, hub, type HishoDevice } from "./model";
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

/** A button entity as a tile that presses it (with HA's own confirm for the ones that end a game or switch off). */
function pressTile(entity: string, name: string, icon: string, confirm?: string): LovelaceCardConfig {
  const press = { action: "perform-action", perform_action: "button.press", target: { entity_id: entity },
                  ...(confirm ? { confirmation: { text: confirm } } : {}) };
  return glass({ type: "tile", entity, name, icon, tap_action: press, icon_tap_action: press });
}

/** One kid's PC (Hisho's parental controls): time left and played today, signed in, then its buttons. Time's up and
 * Shut down are created disabled in Home Assistant; they show here once turned on, behind a confirm. */
function kidsPc(hass: HomeAssistant, pc: HishoDevice): Section {
  const id = (k: string) => entityId(pc, k);
  const on = (k: string) => { const e = id(k); return e && hass.states[e] ? e : undefined; };
  const cards: LovelaceCardConfig[] = [{ type: "heading", heading: pc.name.replace(/^Hashira Kocho /, "") + "'s PC" }];
  for (const [k, name] of [["parental_time_left", "Time left today"], ["parental_played_today", "Played today"],
                           ["parental_signed_in", "Signed in"]] as const) {
    const e = on(k);
    if (e) cards.push(glass({ type: "tile", entity: e, name }));
  }
  const lock = on("parental_lock"), more = on("parental_more"), stop = on("parental_stop"), off = on("parental_off");
  if (lock) cards.push(pressTile(lock, "Lock screen", "mdi:lock"));
  if (more) cards.push(pressTile(more, "30 more minutes", "mdi:timer-plus"));
  if (stop) cards.push(pressTile(stop, "Time's up for today", "mdi:timer-off", `End ${pc.name.replace(/^Hashira Kocho /, "")}'s play for today?`));
  if (off) cards.push(pressTile(off, "Shut down", "mdi:power", `Shut down ${pc.name}?`));
  return { type: "grid", cards };
}

/** The LAN game cache (Hisho reads it from the NAS): how full, how much the last day came from it, the newest download. */
function gameCache(h: HishoDevice): Section | undefined {
  const used = entityId(h, "game_cache_used"), share = entityId(h, "game_cache_share_24h");
  if (!used && !share) return undefined;
  const last = `{% set d = state_attr('${used ?? share}', 'last_download') %}` +
    "{% if d %}Newest download: **{{ d.pc }}**, {{ d.gb_from_cache }} GB from the cache and {{ d.gb_from_internet }} GB " +
    "from the internet ({{ d.percent_from_cache if d.percent_from_cache is not none else '–' }}% from the cache)." +
    "{% else %}No game has gone through the cache yet: the first PC to download a game fills it, every PC after " +
    "that gets it from here.{% endif %}";
  return { type: "grid", cards: [
    { type: "heading", heading: "Game cache" },
    ...(used ? [glass({ type: "tile", entity: used, name: "Used" })] : []),
    ...(share ? [glass({ type: "tile", entity: share, name: "From the cache, last 24 h" })] : []),
    glass({ type: "markdown", content: last }),
  ] };
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
  const myCalendar = entityId(h, "my_calendar");
  const phone = ["phone", "phone_alerts", "clear_phone", "hide_acked"].map((k) => entityId(h, k)).filter((id): id is string => !!id);

  const groups = new Map<string, string[]>();
  for (const b of boxes) {
    const kind = KIND_ORDER.includes(b.model) ? b.model : "Device";
    groups.set(kind, [...(groups.get(kind) ?? []), b.name]);
  }

  const kids = machines.filter((m) => entityId(m, "parental_time_left"));
  const cache = gameCache(h);
  const background = viewBackground(config.background);
  const views: View[] = [
      // The Control Center fills the screen: a panel view is one card, full width.
      { title: "Overview", path: "overview", icon: "mdi:view-dashboard", type: "panel",
        cards: [{ type: "custom:hisho-control-center-card" }] },
      // The system lives here, not on the Overview: the fleet's pulse across the top, then each machine.
      sections({ title: "Machines", path: "machines", icon: "mdi:server" }, [
        { type: "grid", column_span: 4, cards: [{ type: "custom:hisho-pulse-card", ...FULL }] },
        // How Hisho itself is set up (Core 2026-11-01+ / hisho 1.9.0); left out for an older integration.
        ...(["souko_check", "backup_last_good", "approvals_waiting", "logins_not_in_vault", "trust_window"]
          .some((k) => entityId(h, k))
          ? [{ type: "grid" as const, column_span: 4, cards: [{ type: "custom:hisho-setup-card", ...FULL }] }] : []),
        ...machines.map((m) => [{ type: "custom:hisho-machine-card", machine: m.name }]),
      ]),
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
      ...(todayList || dueDates || myCalendar ? [sections({ title: "Today", path: "today", icon: "mdi:calendar-today" }, [
        todayList ? [glass({ type: "todo-list", entity: todayList, title: "Today" })] : [],
        // your calendar (every company, each in its colour) when Hisho has one; else the due dates alone
        myCalendar ? { type: "grid" as const, column_span: 3, cards: [{ type: "custom:hisho-calendar-card", ...FULL }] }
        : dueDates ? { type: "grid" as const, column_span: 3, cards: [
          glass({ type: "calendar", entities: [dueDates], initial_view: "dayGridMonth", title: "Due dates", ...FULL })] } : [],
      ])] : []),
      // The kids' PCs (parental controls) and the game cache, when Hisho has them
      ...(kids.length || cache ? [sections({ title: "Kids' PCs", path: "kids", icon: "mdi:human-child" },
        [...kids.map((pc) => kidsPc(hass, pc)), ...(cache ? [cache] : [])])] : []),
      sections({ title: "Projects", path: "projects", icon: "mdi:folder-multiple" }, [
        { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-projects-card", ...FULL }] },
        { type: "grid", column_span: 2, cards: [{ type: "custom:hisho-jobs-card", title: "All jobs", limit: 50, ...FULL }] },
      ]),
      // What people asked Hisho through Assist (Hisho keeps it 30 days); the card says so to non-admins, like the rest.
      sections({ title: "Conversations", path: "conversations", icon: "mdi:message-text-clock" }, [
        { type: "grid", column_span: 3, cards: [{ type: "custom:hisho-conversations-card", ...FULL }] },
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
