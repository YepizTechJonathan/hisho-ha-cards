// hisho-addon-card: an add-on's own overview card (Invoicing's Money, Gov bids), as Hisho's dashboard shows it:
// a title and rows of label, value and a line of detail. The rows come from the add-on (the `card` attribute of its
// Status sensor, hisho integration 1.19.0+); Hisho never sends a private add-on's. A row's link opens the page it
// names: an outside page in a new tab, a Hisho page (#/...) on Hisho's dashboard.
//   type: custom:hisho-addon-card
//   addon: gov-bids          # the add-on's name or title
import { css, html, type CSSResultGroup, type TemplateResult } from "lit";
import { HishoCard } from "../base";
import type { HomeAssistant } from "../hass";
import { byKind, entity, hub, type HishoDevice } from "../model";
import { cardStyles, stateClass } from "../styles";

export interface AddonCardRow { label: string; value: string; detail: string; state: string; indent: boolean; url: string }
export interface AddonCardData { title: string; rows: AddonCardRow[] }

/** The add-on's card, or undefined when it has none (or Hisho sent none). */
export function addonCard(hass: HomeAssistant, dev: HishoDevice): AddonCardData | undefined {
  const card = entity(hass, dev, "addon_status")?.attributes.card;
  return card && Array.isArray(card.rows) && card.rows.length ? card : undefined;
}

/** Every add-on that has a card, in the order Home Assistant lists them. */
export function addonsWithCards(hass: HomeAssistant): [HishoDevice, AddonCardData][] {
  return byKind(hass, "addon").flatMap((d) => {
    const c = addonCard(hass, d);
    return c ? [[d, c] as [HishoDevice, AddonCardData]] : [];
  });
}

/** Where a row's link goes: an outside page as it is, a Hisho page on Hisho's dashboard ('' = no link). */
export function rowHref(hass: HomeAssistant, url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("#/")) {
    const h = hub(hass);
    const base = (h && (hass.devices?.[h.id] as any)?.configuration_url) || "";
    return /^https?:\/\//.test(base) ? base.replace(/\/+$/, "") + "/" + url : "";
  }
  return "";
}

export function addonCardBody(hass: HomeAssistant, dev: HishoDevice, card: AddonCardData): TemplateResult {
  return html`<div class="acard">
    <div class="head"><span class="title">${card.title || dev.name}</span></div>
    <ul class="arows">${card.rows.map((r) => {
      const href = rowHref(hass, r.url);
      const label = href ? html`<a href=${href} target="_blank" rel="noopener">${r.label}</a>` : r.label;
      return html`<li class="arow ${r.indent ? "indent" : ""}">
        <span class="dot ${r.state ? stateClass(r.state) : "none"}"></span>
        <div class="acol"><span class="alabel">${label}</span>${r.detail ? html`<span class="muted">${r.detail}</span>` : ""}</div>
        <span class="avalue">${r.value}</span></li>`;
    })}</ul></div>`;
}

export const addonCardStyles = css`
  .acard .head { display: flex; align-items: center; margin-bottom: 8px; }
  .arows { list-style: none; margin: 0; padding: 0; }
  .arow { display: flex; align-items: flex-start; gap: 10px; padding: 7px 0; border-top: 1px solid var(--hisho-line, rgba(255,255,255,0.08)); }
  .arow:first-child { border-top: 0; }
  .arow.indent { padding-left: 18px; }
  .arow .dot { margin-top: 6px; flex: none; }
  .arow .dot.none { visibility: hidden; }
  .arow .dot.ok { background: var(--hisho-ok); } .arow .dot.warn { background: var(--hisho-warn); }
  .arow .dot.bad { background: var(--hisho-crit); }
  .acol { display: flex; flex-direction: column; min-width: 0; flex: 1; }
  .alabel a { color: inherit; text-decoration: none; border-bottom: 1px dotted currentColor; }
  .acol .muted { font-size: 0.82em; overflow-wrap: anywhere; }
  .avalue { font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
`;

export class HishoAddonCard extends HishoCard {
  static styles: CSSResultGroup = [cardStyles, addonCardStyles];

  static getStubConfig() {
    return { type: "custom:hisho-addon-card", addon: "gov-bids" };
  }

  protected body(): TemplateResult {
    const hass = this.hass;
    const wanted = String(this.config.addon ?? "").toLowerCase();
    const dev = byKind(hass, "addon").find((d) => {
      const name = entity(hass, d, "addon_status")?.attributes.addon;
      return String(name ?? "").toLowerCase() === wanted || d.name.toLowerCase() === wanted;
    });
    if (!dev) return this.frame(html`<div class="empty">No Hisho add-on named ${this.config.addon ?? "(addon: not set)"}.</div>`);
    const card = addonCard(hass, dev);
    return this.frame(card ? addonCardBody(hass, dev, card)
      : html`<div class="empty">${dev.name} has no overview card (or needs Hisho integration 1.19.0).</div>`);
  }
}
