// hisho-machine-card: one machine in full: readings, services, its add-on buttons, power, maintenance.
import { html } from "lit";
import { HishoCard } from "../base";
import { allowed, available, entities, entity, entityId, findDevice, friendly } from "../model";
import { moreInfo, press, runAction, toggle } from "../actions";
import { pct, stateClass } from "../styles";
import { machineIcon, sparkReading } from "./fleet-card";
import "../spark";
import { icon, ring } from "../ui";
import { mdiPower, mdiPowerSleep, mdiWrenchOutline } from "@mdi/js";

export class HishoMachineCard extends HishoCard {
  static getStubConfig(hass: any) {
    const first = hass ? Object.values(hass.devices ?? {}).find((d: any) => d.model && d.via_device_id) : undefined;
    return { type: "custom:hisho-machine-card", machine: (first as any)?.name ?? "" };
  }

  setConfig(config: any) {
    if (!config?.machine) throw new Error("Say which machine: machine: <name>");
    super.setConfig(config);
  }

  protected body() {
    const hass = this.hass;
    const m = findDevice(hass, this.config.machine, "machine");
    if (!m) return html`<ha-card><div class="empty">No Hisho machine named ${this.config.machine}.</div></ha-card>`;
    const state = entity(hass, m, "machine_state");
    const target: string = state?.attributes.machine ?? m.name;
    const can = allowed(hass);
    const power: string[] = state?.attributes.power ?? [];
    const items: any[] = state?.attributes.items ?? [];
    const units = entities(hass, m, "unit");
    const restarts = entities(hass, m, "restart_unit");
    const services = entities(hass, m, "service");
    const maint = entityId(m, "maintenance");
    const row = (key: string, label: string) => {
      const s = entity(hass, m, key);
      return available(s) ? html`<div class="row spread kvrow"><span class="muted">${label}</span>
        <span>${s.state}${s.attributes.unit_of_measurement ? " " + s.attributes.unit_of_measurement : ""}</span></div>` : "";
    };
    const isOn = entity(hass, m, "online")?.state === "on";
    const spark = sparkReading(m);
    const tone = stateClass(state?.state);
    const readings = [["Mem", "memory_usage"], ["Disk", "disk_usage"], ["GPU", "gpu_usage"]]
      .map(([label, key]) => [label, pct(entity(hass, m, key)?.state)] as const)
      .filter((r): r is readonly [string, number] => r[1] !== undefined);
    return this.frame(html`<div class="mcard"><div class="mleft">
      <div class="mhead" style="margin-bottom:14px">
        <span class="bubble ${isOn ? (tone === "ok" ? "accent" : tone) : "off"}">${icon(machineIcon(m), "")}</span>
        <span class="grow"><span class="name">${this.config.title ?? m.name}</span>
          ${state?.attributes.role ? html`<span class="muted ellipsis sub">${state.attributes.role}</span>` : ""}</span>
        <span class="chip ${tone}">${state?.state ?? "unknown"}</span>
      </div>
      ${readings.length ? html`<div class="rings" style="margin-bottom:12px;max-width:340px">${readings.map(([label, v]) => ring(label, v))}</div>` : ""}
      ${row("awake", "Parking")} ${row("jobs_running", "Jobs running")} ${row("jobs_queued", "Jobs queued")}
      ${row("containers_running", "Containers")} ${row("sync_connected", "Sync")}
      <div class="row" style="margin-top:8px">
        ${power.includes("wake") && can.has("machine.wake")
          ? html`<button class="act" @click=${() => runAction(this, hass, "machine.wake", target)}>${icon(mdiPower, "")}Wake</button>` : ""}
        ${power.includes("park") && can.has("machine.park")
          ? html`<button class="act danger" @click=${() => runAction(this, hass, "machine.park", target, {},
              `Park ${m.name}? It powers off until something needs it.`)}>${icon(mdiPowerSleep, "")}Park</button>` : ""}
        ${maint ? html`<button class="act ${hass.states[maint]?.state === "on" ? "brown" : ""}" @click=${() => {
            const on = hass.states[maint]?.state === "on";
            toggle(this, hass, maint, !on, on ? undefined : `Put ${m.name} in maintenance? Its alerts are held and its VM shuts down.`);
          }}>${icon(mdiWrenchOutline, "")}${hass.states[maint]?.state === "on" ? "End maintenance" : "Maintenance"}</button>` : ""}
      </div>
      ${spark ? html`<div class="eyebrow" style="margin-top:18px">${spark[1]} · last 24 hours</div>
        <hisho-spark .hass=${hass} .entity=${spark[0]} .min=${0} .max=${100} style="height:56px"></hisho-spark>` : ""}
      </div><div class="mright">
      ${services.length || units.length ? html`<div class="eyebrow">Services</div>` : ""}
      <ul class="list">
        ${services.map((s) => html`<li><div class="row spread"><span>${friendly(s, m)}</span>
          <span class="chip ${s.state === "on" ? "ok" : "bad"}">${s.state === "on" ? "running" : s.attributes.state ?? "stopped"}</span></div></li>`)}
        ${units.map((u) => {
          const label = friendly(u, m);
          const restart = restarts.find((r) => friendly(r, m) === `Restart ${label}`);
          const unitState = u.state;
          return html`<li><div class="row spread"><span>${label}</span><span class="row">
            ${available(u) ? html`<button class="act ${u.state === "on" ? "danger" : ""}" @click=${() =>
              toggle(this, hass, u.entity_id, u.state !== "on", u.state === "on" ? `Stop ${label} on ${m.name}?` : undefined)}>
              ${u.state === "on" ? "Stop" : "Start"}</button>` : html`<span class="muted">${unitState}</span>`}
            ${restart ? html`<button class="act" @click=${() => press(this, hass, restart.entity_id)}>Restart</button>` : ""}
          </span></div></li>`;
        })}
      </ul>
      ${items.length ? html`<div class="eyebrow" style="margin-top:18px">From add-ons</div>` : ""}
      <ul class="list">${items.map((it) => html`<li>
        <div class="row spread"><span>${it.name}</span><span class="chip ${stateClass(it.state)}">${it.state}</span></div>
        ${it.facts?.length ? html`<div class="detail">${it.facts.join(" · ")}</div>` : ""}
        ${can.has("device.press") && it.actions?.length ? html`<div class="row">${it.actions.map((a: any) => html`
          <button class="act ${a.danger ? "danger" : ""}" @click=${() => runAction(this, hass, "device.press", it.addon,
            { entry: it.entry, item: it.id, action: a.id }, a.danger ? `${a.label}: ${it.name} on ${m.name}?` : undefined)}>${a.label}</button>`)}</div>` : ""}
      </li>`)}</ul>
    </div></div>
      <button class="link" style="margin-top:12px;font-size:0.86em" @click=${() => state && moreInfo(this, state.entity_id)}>History…</button>`);
  }
}
