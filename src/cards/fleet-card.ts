// hisho-fleet-card: every machine at a glance, with wake / park and maintenance. Its tile is also the Control
// Center's: the machine in a coloured circle, its readings as rings, power buttons, and its last day as a sparkline.
import { css, html, type CSSResultGroup, type TemplateResult } from "lit";
import { HishoCard } from "../base";
import { allowed, available, byKind, entities, entity, entityId, hub, type HishoDevice } from "../model";
import { moreInfo, runAction, toggle } from "../actions";
import { cardStyles, pct, stateClass } from "../styles";
import type { HomeAssistant } from "../hass";
import { icon, ring } from "../ui";
import "../spark";
import {
  mdiChevronRight, mdiDesktopTowerMonitor, mdiExpansionCardVariant, mdiPower, mdiPowerSleep, mdiServer, mdiServerNetwork,
  mdiWrenchOutline,
} from "@mdi/js";

/** Cards that show machine tiles: which tiles are open. */
export interface TileHost extends HishoCard {
  expanded: Set<string>;
  flip(id: string): void;
}

const MACHINE_ICONS: [RegExp, string][] = [
  [/gpu/i, mdiExpansionCardVariant], [/workstation|desktop/i, mdiDesktopTowerMonitor],
  [/control|core/i, mdiServerNetwork], [/tools|nas|storage/i, mdiServer],
];

export function machineIcon(m: HishoDevice): string {
  return MACHINE_ICONS.find(([re]) => re.test(m.model))?.[1] ?? mdiServer;
}

/** The reading whose last 24 hours a machine tile draws: the GPU on a GPU box, else memory. */
export function sparkReading(m: HishoDevice): [string, string] | undefined {
  const gpu = entityId(m, "gpu_usage"), mem = entityId(m, "memory_usage");
  return /gpu/i.test(m.model) && gpu ? [gpu, "GPU"] : mem ? [mem, "Memory"] : gpu ? [gpu, "GPU"] : undefined;
}

/** The machine tile shared by the fleet card and the Control Center: who it is and how it is, its readings as
 *  rings, its power buttons, and its last 24 hours along the bottom. Tap the head for the details. */
export function machineTile(card: TileHost, m: HishoDevice): TemplateResult {
  const hass = card.hass;
  const state = entity(hass, m, "machine_state");
  const online = entity(hass, m, "online");
  const parking = entity(hass, m, "awake");
  const power: string[] = state?.attributes.power ?? [];
  const can = allowed(hass);
  const target: string = state?.attributes.machine ?? m.name;
  const maint = entityId(m, "maintenance");
  const inMaint = maint ? hass.states[maint]?.state === "on" : false;
  const isOpen = card.expanded.has(m.id);
  const isOn = online?.state === "on";
  const sub = available(parking) ? parking.state
    : state?.attributes.reason && !isOn ? String(state.attributes.reason) : state?.attributes.role ?? "";
  const tone = inMaint ? "brown" : stateClass(state?.state);
  const kv = (key: string, label: string) => {
    const s = entity(hass, m, key);
    return available(s) ? html`<span>${label}</span><span>${s.state}${s.attributes.unit_of_measurement ? " " + s.attributes.unit_of_measurement : ""}</span>` : "";
  };
  const services = entities(hass, m, "service");
  const down = services.filter((s) => s.state !== "on").length;
  const readings = [["Mem", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]]
    .map(([label, key]) => [label, pct(entity(hass, m, key)?.state)] as const)
    .filter((r): r is readonly [string, number] => r[1] !== undefined);
  const spark = sparkReading(m);
  return html`<div class="tile mtile ${tone} ${isOn ? "" : "asleep"}">
    <div class="mhead" @click=${() => card.flip(m.id)}>
      <span class="bubble ${isOn ? (tone === "ok" ? "accent" : tone) : "off"}">${icon(machineIcon(m), "")}</span>
      <span class="grow"><span class="name">${m.name}</span>${sub ? html`<span class="muted ellipsis sub">${sub}</span>` : ""}</span>
      <span class="chip ${tone}">${inMaint ? "maintenance" : state?.state ?? "unknown"}</span>
      <span class="chev ${isOpen ? "open" : ""}">${icon(mdiChevronRight, "")}</span>
    </div>
    ${readings.length ? html`<div class="rings">${readings.map(([label, v]) => ring(label, v))}</div>` : ""}
    ${isOpen ? html`<div class="kv">
        ${kv("jobs_running", "Jobs running")} ${kv("jobs_queued", "Jobs queued")}
        ${kv("containers_running", "Containers")} ${kv("sync_connected", "Sync")}
        ${services.length ? html`<span>Services</span><span>${services.length - down} of ${services.length} running</span>` : ""}
      </div>` : ""}
    <div class="row acts">
      ${power.includes("wake") && can.has("machine.wake")
        ? html`<button class="act" @click=${() => runAction(card, hass, "machine.wake", target)}>${icon(mdiPower, "")}Wake</button>` : ""}
      ${power.includes("park") && can.has("machine.park")
        ? html`<button class="act danger" @click=${() => runAction(card, hass, "machine.park", target, {},
            `Park ${m.name}? It powers off until something needs it.`)}>${icon(mdiPowerSleep, "")}Park</button>` : ""}
      ${maint ? html`<button class="act ${inMaint ? "brown" : ""}" title="Maintenance holds its alerts and auto-park"
          @click=${() => toggle(card, hass, maint, !inMaint, inMaint ? undefined
            : `Put ${m.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${icon(mdiWrenchOutline, "")}${inMaint ? "End maintenance" : "Maintenance"}</button>` : ""}
      ${isOpen && state ? html`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${() => moreInfo(card, state.entity_id)}>History…</button>` : ""}
    </div>
    ${spark ? html`<div class="sparkwrap"><span class="sparkl">${spark[1]} · 24 h</span>
      <hisho-spark .hass=${hass} .entity=${spark[0]} .min=${0} .max=${100}
        .tone=${tone === "bad" ? "var(--hisho-crit)" : "var(--hisho-accent-text)"}></hisho-spark></div>` : ""}
  </div>`;
}

export function fleetMaintSwitch(card: HishoCard, id: string): TemplateResult {
  const on = card.hass.states[id]?.state === "on";
  return html`<label class="switch" title="Fleet maintenance">
    <input type="checkbox" .checked=${on}
      @change=${(e: Event) => {
        const box = e.target as HTMLInputElement;
        toggle(card, card.hass, id, box.checked, box.checked
          ? "Put the whole fleet in maintenance? Alerts, auto-park and jobs are held." : undefined).then((done) => {
          if (!done) box.checked = on;
        });
      }} />Fleet maintenance</label>`;
}

/** A machine's name as the brief writes it: "Hashira Tokito" is Tokito, "Hashira Kocho Oli" is Oli. */
export function shortName(name: string): string {
  return name.replace(/^Hashira (Kocho )?/, "");
}

/** What a rack row says after the name: why it's off, its parking, else its role. */
function rackNote(hass: HomeAssistant, m: HishoDevice): string {
  const state = entity(hass, m, "machine_state");
  const parking = entity(hass, m, "awake");
  const isOn = entity(hass, m, "online")?.state === "on";
  if (!isOn) return available(parking) ? parking.state : String(state?.attributes.reason ?? state?.state ?? "off");
  const mem = pct(entity(hass, m, "memory_usage")?.state);
  const role = available(parking) ? parking.state : state?.attributes.role ?? m.model ?? "";
  return [role, mem !== undefined ? `${Math.round(mem)}% memory` : ""].filter(Boolean).join(" · ");
}

export class HishoFleetCard extends HishoCard implements TileHost {
  static properties = { ...HishoCard.properties, expanded: { state: true } };
  declare expanded: Set<string>;
  static styles: CSSResultGroup = [cardStyles, css`
    .group { font-family: var(--hisho-serif); font-size: 1.05em; color: var(--hisho-text-2); margin: 14px 0 4px; }
    .group:first-of-type { margin-top: 2px; }
    .rack { display: grid; grid-template-columns: 14px minmax(110px, auto) 1fr; column-gap: 10px; align-items: baseline;
      padding: 6px 0; cursor: pointer; }
    .rack .dot { width: 9px; height: 9px; align-self: center; }
    .rack .dot.ok { background: var(--hisho-ok); } .rack .dot.bad { background: var(--hisho-crit); }
    .rack .dot.warn, .rack .dot.brown { background: var(--hisho-warn); }
    .rack .n { font-family: var(--hisho-mono); font-size: 1em; white-space: nowrap; }
    .rack.asleep .n { color: var(--hisho-text-2); }
    .rack .s { font-size: 0.92em; color: var(--hisho-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .rack .s.bad { color: var(--hisho-crit); }
    .open { padding: 2px 0 10px 24px; }
    .open .kv { max-width: 360px; margin-bottom: 4px; }
    .lights { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 2px 16px; }
    .lights .rack { grid-template-columns: 14px 1fr; }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-fleet-card" };
  }

  constructor() {
    super();
    this.expanded = new Set();
  }

  flip(id: string) {
    const next = new Set(this.expanded);
    if (!next.delete(id)) next.add(id);
    this.expanded = next;
  }

  protected body() {
    const hass = this.hass;
    const machines = byKind(hass, "machine");
    const h = hub(hass);
    const online = entity(hass, h, "machines_online");
    const fleetMaint = entityId(h, "fleet_maintenance");
    const reachable = entity(hass, h, "core_reachable");
    // The rack: machines grouped by their Home Assistant area (garage rack, office...), the running ones first.
    const groups = new Map<string, HishoDevice[]>();
    for (const m of machines) {
      const area = hass.devices?.[m.id]?.area_id;
      const name = (area && hass.areas?.[area]?.name) || "Machines";
      groups.set(name, [...(groups.get(name) ?? []), m]);
    }
    const isOn = (m: HishoDevice) => entity(hass, m, "online")?.state === "on";
    const lights = this.config.look === "lights";
    return this.frame(html`
      <div class="head">
        ${this.heading("Machines")}
        <div class="row">
          ${reachable?.state === "off" ? html`<span class="chip bad">Hisho Core unreachable</span>` : ""}
          ${online && !lights ? html`<span class="muted num">${online.state} of ${machines.length} up</span>` : ""}
        </div>
      </div>
      ${lights ? html`<div class="lights">${[...machines].sort((a, b) => Number(isOn(b)) - Number(isOn(a)))
        .map((m) => this.row(m, false))}</div>`
      : [...groups].map(([name, list]) => html`${groups.size > 1 ? html`<div class="group">${name}</div>` : ""}
        ${[...list].sort((a, b) => Number(isOn(b)) - Number(isOn(a))).map((m) => this.row(m, true))}`)}
      ${fleetMaint && !lights ? html`<div style="margin-top:10px">${fleetMaintSwitch(this, fleetMaint)}</div>` : ""}
    `);
  }

  /** One machine as a rack row: its light, its name, what it's doing. A tap opens its readings and power links. */
  private row(m: HishoDevice, note: boolean): TemplateResult {
    const hass = this.hass;
    const state = entity(hass, m, "machine_state");
    const maint = entityId(m, "maintenance");
    const inMaint = maint ? hass.states[maint]?.state === "on" : false;
    const on = entity(hass, m, "online")?.state === "on";
    const tone = inMaint ? "warn" : on ? stateClass(state?.state) : stateClass(state?.state) === "bad" ? "bad" : "off";
    const open = this.expanded.has(m.id);
    return html`<div class="rack ${on ? "" : "asleep"}" @click=${() => this.flip(m.id)}>
        <span class="dot ${tone}"></span><span class="n">${shortName(m.name)}</span>
        ${note ? html`<span class="s ${tone === "bad" ? "bad" : ""}">${inMaint ? "maintenance" : rackNote(hass, m)}</span>` : ""}
      </div>
      ${open ? html`<div class="open">${this.details(m)}</div>` : ""}`;
  }

  /** The open row: its readings and its power and maintenance links (the same actions as the machine tile). */
  private details(m: HishoDevice): TemplateResult {
    const hass = this.hass;
    const state = entity(hass, m, "machine_state");
    const power: string[] = state?.attributes.power ?? [];
    const can = allowed(hass);
    const target: string = state?.attributes.machine ?? m.name;
    const maint = entityId(m, "maintenance");
    const inMaint = maint ? hass.states[maint]?.state === "on" : false;
    const readings = [["Memory", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]]
      .map(([label, key]) => [label, pct(entity(hass, m, key)?.state)] as const)
      .filter((r): r is readonly [string, number] => r[1] !== undefined);
    return html`${readings.length ? html`<div class="kv">${readings.map(([l, v]) => html`<span>${l}</span><span>${Math.round(v)}%</span>`)}</div>` : ""}
      <div class="row">
        ${power.includes("wake") && can.has("machine.wake")
          ? html`<button class="act primary" @click=${() => runAction(this, hass, "machine.wake", target)}>Wake</button>` : ""}
        ${power.includes("park") && can.has("machine.park")
          ? html`<button class="act" @click=${() => runAction(this, hass, "machine.park", target, {},
              `Park ${m.name}? It powers off until something needs it.`)}>Park</button>` : ""}
        ${maint ? html`<button class="act" @click=${() => toggle(this, hass, maint, !inMaint, inMaint ? undefined
            : `Put ${m.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${inMaint ? "End maintenance" : "Maintenance"}</button>` : ""}
        ${state ? html`<button class="act" @click=${() => moreInfo(this, state.entity_id)}>History</button>` : ""}
      </div>`;
  }
}
