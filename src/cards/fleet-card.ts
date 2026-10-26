// hisho-fleet-card: every machine at a glance, with wake / park and maintenance.
import { html, type TemplateResult } from "lit";
import { HishoCard } from "../base";
import { allowed, available, byKind, entity, entityId, hub, type HishoDevice } from "../model";
import { moreInfo, runAction, toggle } from "../actions";
import { pct, stateClass } from "../styles";

export function meter(label: string, value: string | undefined): TemplateResult {
  const n = pct(value);
  if (n === undefined) return html``;
  return html`<div class="meter"><span class="muted">${label}</span>
    <div class="bar ${n >= 85 ? "high" : ""}"><span style="width:${n}%"></span></div>
    <span>${Math.round(n)}%</span></div>`;
}

export class HishoFleetCard extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-fleet-card" };
  }

  protected body() {
    const machines = byKind(this.hass, "machine");
    const h = hub(this.hass);
    const online = entity(this.hass, h, "machines_online");
    const fleetMaint = entityId(h, "fleet_maintenance");
    const reachable = entity(this.hass, h, "core_reachable");
    return html`<ha-card>
      <div class="head">
        ${this.heading("Fleet")}
        <div class="row">
          ${reachable?.state === "off" ? html`<span class="chip bad">Hisho Core unreachable</span>` : ""}
          ${online ? html`<span class="chip">${online.state} of ${machines.length} online</span>` : ""}
          ${fleetMaint ? this.maintSwitch(fleetMaint, "Fleet maintenance", "Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.") : ""}
        </div>
      </div>
      <div class="grid">${machines.map((m) => this.tile(m))}</div>
    </ha-card>`;
  }

  private maintSwitch(id: string, label: string, ask: string) {
    const on = this.hass.states[id]?.state === "on";
    return html`<label class="switch" title=${label}>
      <input type="checkbox" .checked=${on}
        @change=${(e: Event) => {
          const box = e.target as HTMLInputElement;
          toggle(this, this.hass, id, box.checked, box.checked ? ask : undefined).then((done) => {
            if (!done) box.checked = on;
          });
        }} />${label}</label>`;
  }

  private tile(m: HishoDevice): TemplateResult {
    const hass = this.hass;
    const state = entity(hass, m, "machine_state");
    const online = entity(hass, m, "online");
    const parking = entity(hass, m, "awake");
    const power: string[] = state?.attributes.power ?? [];
    const can = allowed(hass);
    const target: string = state?.attributes.machine ?? m.name;
    const maint = entityId(m, "maintenance");
    return html`<div class="tile">
      <div class="row spread">
        <span class="row"><span class="dot ${online?.state === "on" ? "on" : "offline"}"></span>
          <span class="name" @click=${() => state && moreInfo(this, state.entity_id)}>${m.name}</span></span>
        <span class="chip ${stateClass(state?.state)}">${state?.state ?? "unknown"}</span>
      </div>
      ${available(parking) ? html`<span class="muted">${parking.state}</span>` : ""}
      ${state?.attributes.reason && online?.state !== "on" ? html`<span class="muted">${state.attributes.reason}</span>` : ""}
      ${meter("Memory", entity(hass, m, "memory_usage")?.state)}
      ${meter("Disk", entity(hass, m, "disk_usage")?.state)}
      ${meter("GPU", entity(hass, m, "gpu_usage")?.state)}
      <div class="row">
        ${power.includes("wake") && can.has("machine.wake")
          ? html`<button class="act" @click=${() => runAction(this, hass, "machine.wake", target)}>Wake</button>` : ""}
        ${power.includes("park") && can.has("machine.park")
          ? html`<button class="act danger" @click=${() => runAction(this, hass, "machine.park", target, {},
              `Park ${m.name}? It powers off until something needs it.`)}>Park</button>` : ""}
        ${maint ? this.maintSwitch(maint, "Maintenance",
            `Put ${m.name} in maintenance? Its alerts are held and its VM shuts down.`) : ""}
      </div>
    </div>`;
  }
}
