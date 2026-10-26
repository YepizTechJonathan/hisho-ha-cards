// hisho-device-card: a box Hisho's add-ons know (TrueNAS, a Proxmox host, IONOS...) or an add-on itself:
// power and health, each thing watched, and the add-on's buttons (risky ones ask first).
import { css, html, unsafeCSS } from "lit";
import { HishoCard } from "../base";
import { cardStyles } from "../styles";
import { fieldInput, fields, formStyles, readForm } from "./settings";
import { allowed, available, entities, entity, entityId, findDevice, friendly, type HishoDevice } from "../model";
import type { HomeAssistant } from "../hass";

const can = (hass: HomeAssistant, action: string) => allowed(hass).has(action);
import { moreInfo, runAction, toggle } from "../actions";
import { stateClass } from "../styles";

export class HishoDeviceCard extends HishoCard {
  static properties = { ...HishoCard.properties, error: { state: true } };
  static styles = [cardStyles, css`${unsafeCSS(formStyles)}`];
  declare error: string;

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
    return this.frame(html`
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
    `);
  }

  private addon(dev: HishoDevice) {
    const hass = this.hass;
    const status = entity(hass, dev, "addon_status");
    const enabled = entityId(dev, "addon_enabled");
    const a = status?.attributes ?? {};
    const allowedNow = allowed(hass);
    return this.frame(html`
      <div class="head"><div class="title">${this.config.title ?? dev.name}</div>
        <span class="chip ${stateClass(status?.state)}">${status?.state ?? "unknown"}</span></div>
      <div class="muted">${[a.kind, a.version && "v" + a.version, a.host && "on " + a.host].filter(Boolean).join(" · ")}</div>
      ${a.problems?.length ? html`<ul class="list" style="margin-top:8px">${a.problems.map((p: string) =>
        html`<li><span class="detail">${p}</span></li>`)}</ul>` : ""}
      <div class="row" style="margin-top:10px">
        ${allowedNow.has("addon.run") ? (a.actions ?? []).map((act: any) => html`<button class="act ${act.danger ? "danger" : ""}"
          @click=${() => runAction(this, hass, "addon.run", a.addon, { action: act.id },
            act.danger ? `${act.label} (${dev.name})?` : undefined)}>${act.label}</button>`) : ""}
        ${this.maintenance(dev, dev.name)}
        ${enabled ? html`<button class="act ${hass.states[enabled]?.state === "on" ? "danger" : ""}" @click=${() => {
          const on = hass.states[enabled]?.state === "on";
          toggle(this, hass, enabled, !on, on ? `Turn ${dev.name} off? Hisho stops running it.` : undefined);
        }}>${hass.states[enabled]?.state === "on" ? "Turn off" : "Turn on"}</button>` : ""}
      </div>
      ${allowedNow.has("addon.config") ? this.settings(a) : ""}
    `);
  }

  private settings(a: Record<string, any>) {
    const hass = this.hass;
    const s = a.settings ?? {};
    const list = fields(s.schema, {});
    const entryFields = fields(s.entry_schema, s.entry_form);
    const entries: string[] = s.entries ?? [];
    if (!list.length && !entryFields.length) return "";
    const save = async (e: Event) => {
      e.preventDefault();
      const { values, error } = readForm(e.target as HTMLFormElement, list, s.options ?? {});
      this.error = error ?? "";
      if (error || !Object.keys(values).length) return;
      await runAction(this, hass, "addon.config", a.addon, { settings: values });
    };
    const addEntry = async (e: Event, test: boolean) => {
      e.preventDefault();
      const form = (e.target as HTMLElement).closest("form") as HTMLFormElement;
      const name = (form.elements.namedItem("__entry") as HTMLInputElement).value.trim();
      const { values, error } = readForm(form, entryFields);
      this.error = error ?? (name ? "" : "Give the entry a name.");
      if (this.error) return;
      await runAction(this, hass, test ? "addon.test" : "addon.entry", a.addon, { entry: name, settings: values });
    };
    return html`<details style="margin-top:12px"><summary class="muted">Settings</summary>
      ${this.error ? html`<div class="error">${this.error}</div>` : ""}
      ${list.length ? html`<form class="settings" @submit=${save}>
        ${list.map((f) => html`<label>${f.label}</label>${fieldInput(f, (s.options ?? {})[f.key])}`)}
        <div class="full"><button class="act" type="submit">Save</button>
          ${can(hass, "addon.apply") ? html`<button class="act" type="button" @click=${() =>
            runAction(this, hass, "addon.apply", a.addon)}>Apply on its machine</button>` : ""}</div>
      </form>` : ""}
      ${entryFields.length ? html`<div class="muted" style="margin-top:8px">${s.entry_label ?? "Entries"}</div>
        <ul class="list">${entries.map((name) => html`<li><div class="row spread"><span>${name}</span>
          <button class="act danger" @click=${() => runAction(this, hass, "addon.entry", a.addon,
            { entry: name, settings: { _remove: true } }, `Remove ${name} from ${a.addon}?`)}>Remove</button></div></li>`)}</ul>
        <form class="settings" @submit=${(e: Event) => addEntry(e, false)}>
          <label>Name</label><input name="__entry" placeholder="a short name" />
          ${entryFields.map((f) => html`<label>${f.label}</label>${fieldInput(f, undefined)}`)}
          <div class="full"><button class="act" type="button" @click=${(e: Event) => addEntry(e, true)}>Test</button>
            <button class="act" type="submit">Add or replace</button></div>
        </form>` : ""}
    </details>`;
  }
}
