// hisho-store-card: Hisho's add-on store and the repositories it reads: install, update, roll back, remove,
// add or update a repository. Changes Hisho's setup, so it shows only when Hisho allows that (admin scope).
import { html } from "lit";
import { HishoCard } from "../base";
import { allowed, entity, hub } from "../model";
import { runAction } from "../actions";
import { stateClass } from "../styles";

export class HishoStoreCard extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-store-card" };
  }

  protected body() {
    const hass = this.hass;
    const sensor = entity(hass, hub(hass), "addon_updates");
    const store: any[] = sensor?.attributes.store ?? [];
    const repos: any[] = sensor?.attributes.repositories ?? [];
    const can = allowed(hass);
    if (!can.has("store.install") && !can.has("store.update")) {
      return html`<ha-card><div class="head">${this.heading("Add-on store")}</div>
        <div class="empty">Hisho does not let this Home Assistant change its add-ons.</div></ha-card>`;
    }
    const sorted = [...store].sort((a, b) =>
      Number(!!b.update_available) - Number(!!a.update_available) || Number(!!b.installed) - Number(!!a.installed)
      || String(a.title).localeCompare(String(b.title)));
    return html`<ha-card>
      <div class="head">${this.heading("Add-on store")}<span class="muted">${store.filter((a) => a.installed).length} installed</span></div>
      <ul class="list">${sorted.map((a) => html`<li>
        <div class="row spread"><span>${a.title}</span>
          <span class="chip ${a.update_available ? "warn" : a.installed ? "ok" : "off"}">${a.update_available
            ? `${a.installed_version} → ${a.version}` : a.installed ? `v${a.installed_version}` : `v${a.version}`}</span></div>
        ${a.description ? html`<div class="detail">${a.description}</div>` : ""}
        <div class="row">
          ${!a.installed && can.has("store.install") ? html`<button class="act" @click=${() =>
            runAction(this, hass, "store.install", a.name)}>Install</button>` : ""}
          ${a.update_available && can.has("store.update") ? html`<button class="act" @click=${() =>
            runAction(this, hass, "store.update", a.name, { host: a.host ?? "" })}>Update</button>` : ""}
          ${a.installed && a.previous && can.has("store.rollback") ? html`<button class="act danger" @click=${() =>
            runAction(this, hass, "store.rollback", a.name, { host: a.host ?? "" },
              `Roll ${a.title} back to the version before? Its settings are kept.`)}>Roll back</button>` : ""}
          ${a.installed && can.has("store.remove") ? html`<button class="act danger" @click=${() =>
            runAction(this, hass, "store.remove", a.name, { host: a.host ?? "" },
              `Remove ${a.title}? Its settings are kept; install it again any time.`)}>Remove</button>` : ""}
        </div></li>`)}</ul>
      <div class="title" style="margin-top:14px;font-size:1em">Repositories</div>
      <ul class="list">${repos.map((r) => html`<li><div class="row spread">
        <span>${r.name}${r.listed === "store" ? html` <span class="muted">store</span>` : ""}</span>
        <span class="row">
          ${can.has("repository.update") ? html`<button class="act" @click=${() =>
            runAction(this, hass, "repository.update", r.url)}>Update</button>` : ""}
          ${r.listed !== "store" && can.has("repository.remove") ? html`<button class="act danger" @click=${() =>
            runAction(this, hass, "repository.remove", r.url, {}, `Remove the repository ${r.name}?`)}>Remove</button>` : ""}
        </span></div></li>`)}</ul>
      ${can.has("repository.add") ? html`<form class="row" style="margin-top:8px" @submit=${(e: Event) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).elements.namedItem("url") as HTMLInputElement;
        if (input.value.trim()) runAction(this, hass, "repository.add", input.value.trim()).then(() => (input.value = ""));
      }}><input name="url" placeholder="https://github.com/you/hisho-addon-name" style="flex:1;font:inherit;padding:4px 6px;
        border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)" />
        <button class="act" type="submit">Add repository</button></form>` : ""}
    </ha-card>`;
  }
}
