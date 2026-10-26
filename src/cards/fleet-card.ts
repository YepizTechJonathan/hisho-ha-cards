// hisho-fleet-card: every machine at a glance, with wake / park and maintenance. Its tile is also the Control
// Center's: the machine in a coloured circle, its readings as rings, power buttons, and its last day as a sparkline.
import { html, type TemplateResult } from "lit";
import { HishoCard } from "../base";
import { allowed, available, byKind, entities, entity, entityId, hub, type HishoDevice } from "../model";
import { moreInfo, runAction, toggle } from "../actions";
import { pct, stateClass } from "../styles";
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
function sparkReading(m: HishoDevice): [string, string] | undefined {
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

export class HishoFleetCard extends HishoCard implements TileHost {
  static properties = { ...HishoCard.properties, expanded: { state: true } };
  declare expanded: Set<string>;

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
    const machines = byKind(this.hass, "machine");
    const h = hub(this.hass);
    const online = entity(this.hass, h, "machines_online");
    const fleetMaint = entityId(h, "fleet_maintenance");
    const reachable = entity(this.hass, h, "core_reachable");
    return this.frame(html`
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${reachable?.state === "off" ? html`<span class="chip bad">Hisho Core unreachable</span>` : ""}
          ${online ? html`<span class="chip num">${online.state} of ${machines.length} online</span>` : ""}
          ${fleetMaint ? fleetMaintSwitch(this, fleetMaint) : ""}
        </div>
      </div>
      <div class="grid">${machines.map((m) => machineTile(this, m))}</div>
    `);
  }
}
