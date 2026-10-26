// hisho-fleet-card: every machine at a glance, with wake / park and maintenance. Its compact tile is also the
// Control Center's: a status stripe, three slim meters, the power buttons inline; tap the name for the details.
import { html, type TemplateResult } from "lit";
import { HishoCard } from "../base";
import { allowed, available, byKind, entities, entity, entityId, hub, type HishoDevice } from "../model";
import { moreInfo, runAction, toggle } from "../actions";
import { pct, stateClass } from "../styles";
import type { HomeAssistant } from "../hass";

export function meter(label: string, value: string | undefined): TemplateResult {
  const n = pct(value);
  if (n === undefined) return html``;
  return html`<div class="meter"><div class="mlabel"><span>${label}</span><b>${Math.round(n)}%</b></div>
    <div class="bar ${n >= 95 ? "full" : n >= 85 ? "high" : ""}"><span style="width:${n}%"></span></div></div>`;
}

export function meters(hass: HomeAssistant, m: HishoDevice): TemplateResult {
  const parts = [["Mem", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]]
    .filter(([, key]) => pct(entity(hass, m, key)?.state) !== undefined);
  return parts.length ? html`<div class="meters">${parts.map(([label, key]) => meter(label, entity(hass, m, key)?.state))}</div>` : html``;
}

/** Cards that show machine tiles: which tiles are open. */
export interface TileHost extends HishoCard {
  expanded: Set<string>;
  flip(id: string): void;
}

/** The machine tile shared by the fleet card and the Control Center. */
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
  const sub = available(parking) ? parking.state
    : state?.attributes.reason && online?.state !== "on" ? String(state.attributes.reason) : state?.attributes.role ?? "";
  const tone = inMaint ? "decide" : stateClass(state?.state);
  const kv = (key: string, label: string) => {
    const s = entity(hass, m, key);
    return available(s) ? html`<span>${label}</span><span>${s.state}${s.attributes.unit_of_measurement ? " " + s.attributes.unit_of_measurement : ""}</span>` : "";
  };
  const services = entities(hass, m, "service");
  const down = services.filter((s) => s.state !== "on").length;
  return html`<div class="tile ${tone}">
    <div class="row spread" style="cursor:pointer" @click=${() => card.flip(m.id)}>
      <span class="row grow" style="flex-wrap:nowrap"><span class="dot ${online?.state === "on" ? "on" : "offline"}"></span>
        <span class="name">${m.name}</span></span>
      <span class="row" style="flex-wrap:nowrap"><span class="chip ${tone}">${inMaint ? "maintenance" : state?.state ?? "unknown"}</span>
        <span class="chev ${isOpen ? "open" : ""}">▶</span></span>
    </div>
    ${sub ? html`<span class="muted ellipsis">${sub}</span>` : ""}
    ${meters(hass, m)}
    ${isOpen ? html`<div class="kv">
        ${kv("jobs_running", "Jobs running")} ${kv("jobs_queued", "Jobs queued")}
        ${kv("containers_running", "Containers")} ${kv("sync_connected", "Sync")}
        ${services.length ? html`<span>Services</span><span>${services.length - down} of ${services.length} running</span>` : ""}
      </div>` : ""}
    <div class="row">
      ${power.includes("wake") && can.has("machine.wake")
        ? html`<button class="act" @click=${() => runAction(card, hass, "machine.wake", target)}>Wake</button>` : ""}
      ${power.includes("park") && can.has("machine.park")
        ? html`<button class="act danger" @click=${() => runAction(card, hass, "machine.park", target, {},
            `Park ${m.name}? It powers off until something needs it.`)}>Park</button>` : ""}
      ${maint ? html`<button class="act ${inMaint ? "on" : ""}" title="Maintenance holds its alerts and auto-park"
          @click=${() => toggle(card, hass, maint, !inMaint, inMaint ? undefined
            : `Put ${m.name} in maintenance? Its alerts are held and its VM shuts down.`)}>${inMaint ? "End maintenance" : "Maintenance"}</button>` : ""}
      ${isOpen && state ? html`<button class="link" style="margin-left:auto;font-size:0.82em"
          @click=${() => moreInfo(card, state.entity_id)}>History…</button>` : ""}
    </div>
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
