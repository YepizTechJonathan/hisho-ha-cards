// hisho-device-card: a box Hisho's add-ons know (TrueNAS, a Proxmox host, IONOS...) or an add-on itself:
// power and health, each thing watched, and the add-on's buttons (risky ones ask first).
import { html } from "lit";
import { HishoCard } from "../base";
import { allowed, available, entities, entity, entityId, findDevice, friendly, type HishoDevice } from "../model";
import { moreInfo, runAction, toggle } from "../actions";
import { stateClass } from "../styles";

export class HishoDeviceCard extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-device-card", device: "" };
  }

  setConfig(config: any) {
    if (!config?.device) throw new Error("Say which device: device: <name>");
    super.setConfig(config);
  }

  protected body() {
    const dev = findDevice(this.hass, this.config.device, "box") ?? findDevice(this.hass, this.config.device, "addon");
    if (!dev) return html`<ha-card><div class="empty">No Hisho device named ${this.config.device}.</div></ha-card>`;
    return dev.kind === "addon" ? this.addon(dev) : this.box(dev);
  }

  private maintenance(dev: HishoDevice, what: string) {
    const id = entityId(dev, "maintenance");
    if (!id) return "";
    const on = this.hass.states[id]?.state === "on";
    return html`<button class="act ${on ? "" : "danger"}" @click=${() =>
      toggle(this, this.hass, id, !on, on ? undefined : `Put ${what} in maintenance? Its alerts are held.`)}>
      ${on ? "End maintenance" : "Maintenance"}</button>`;
  }

  private box(dev: HishoDevice) {
    const hass = this.hass;
    const power = entity(hass, dev, "box_state");
    const health = entity(hass, dev, "box_health");
    const can = allowed(hass);
    return html`<ha-card>
      <div class="head"><div class="title">${this.config.title ?? dev.name}</div>
        <span class="row"><span class="chip ${stateClass(power?.state)}">${power?.state ?? "unknown"}</span>
          <span class="chip ${stateClass(health?.state)}">${health?.state ?? "unknown"}</span></span></div>
      ${health?.attributes.summary ? html`<div class="detail">${health.attributes.summary}</div>` : ""}
      <ul class="list" style="margin-top:10px">${entities(hass, dev, "box_item").map((it) => {
        const a = it.attributes;
        return html`<li>
          <div class="row spread"><span class="name" @click=${() => moreInfo(this, it.entity_id)}>${friendly(it, dev)}</span>
            <span class="chip ${stateClass(it.state)}">${available(it) ? it.state : "unavailable"}</span></div>
          ${a.facts?.length ? html`<div class="detail">${a.facts.join(" · ")}</div>` : ""}
          ${can.has("device.press") && a.actions?.length ? html`<div class="row">${a.actions.map((act: any) => html`
            <button class="act ${act.danger ? "danger" : ""}" @click=${() => runAction(this, hass, "device.press", a.addon,
              { entry: a.entry, item: a.item_id, action: act.id },
              act.danger ? `${act.label}: ${friendly(it, dev)} on ${dev.name}?` : undefined)}>${act.label}</button>`)}</div>` : ""}
        </li>`;
      })}</ul>
      <div class="row" style="margin-top:8px">${this.maintenance(dev, dev.name)}</div>
    </ha-card>`;
  }

  private addon(dev: HishoDevice) {
    const hass = this.hass;
    const status = entity(hass, dev, "addon_status");
    const enabled = entityId(dev, "addon_enabled");
    const a = status?.attributes ?? {};
    const can = allowed(hass);
    return html`<ha-card>
      <div class="head"><div class="title">${this.config.title ?? dev.name}</div>
        <span class="chip ${stateClass(status?.state)}">${status?.state ?? "unknown"}</span></div>
      <div class="muted">${[a.kind, a.version && "v" + a.version, a.host && "on " + a.host].filter(Boolean).join(" · ")}</div>
      ${a.problems?.length ? html`<ul class="list" style="margin-top:8px">${a.problems.map((p: string) =>
        html`<li><span class="detail">${p}</span></li>`)}</ul>` : ""}
      <div class="row" style="margin-top:10px">
        ${can.has("addon.run") ? (a.actions ?? []).map((act: any) => html`<button class="act ${act.danger ? "danger" : ""}"
          @click=${() => runAction(this, hass, "addon.run", a.addon, { action: act.id },
            act.danger ? `${act.label} (${dev.name})?` : undefined)}>${act.label}</button>`) : ""}
        ${this.maintenance(dev, dev.name)}
        ${enabled ? html`<button class="act ${hass.states[enabled]?.state === "on" ? "danger" : ""}" @click=${() => {
          const on = hass.states[enabled]?.state === "on";
          toggle(this, hass, enabled, !on, on ? `Turn ${dev.name} off? Hisho stops running it.` : undefined);
        }}>${hass.states[enabled]?.state === "on" ? "Turn off" : "Turn on"}</button>` : ""}
      </div>
    </ha-card>`;
  }
}
