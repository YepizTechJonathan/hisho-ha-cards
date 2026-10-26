// What every Hisho card shares: hass + config, HA's card contract, and a guard for "no Hisho here".
import { LitElement, html, type CSSResultGroup, type TemplateResult } from "lit";
import type { HomeAssistant, LovelaceCardConfig } from "./hass";
import { cardStyles } from "./styles";
import { hishoEntityIds, hub } from "./model";
import type { PropertyValues } from "lit";

export abstract class HishoCard extends LitElement {
  static properties = { hass: { attribute: false }, config: { attribute: false } };
  declare hass: HomeAssistant;
  declare config: LovelaceCardConfig;
  static styles: CSSResultGroup = cardStyles;

  setConfig(config: LovelaceCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    this.config = config;
  }

  /** Re-render only when one of Hisho's entities changed (or the config, the user, the registries). */
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!changed.has("hass") || changed.size > 1) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old || old.entities !== this.hass.entities || old.devices !== this.hass.devices || old.user !== this.hass.user) {
      return true;
    }
    return hishoEntityIds(this.hass).some((id) => old.states[id] !== this.hass.states[id]);
  }

  getCardSize(): number {
    return 4;
  }

  /** HA's sections view: a Hisho card takes its section's full width (sections are the columns). */
  getGridOptions(): { columns: number | "full"; min_columns: number } {
    return { columns: 12, min_columns: 6 };
  }

  /** The card's frame: an ha-card, or a plain block when the Control Center embeds it (no card in a card). */
  protected frame(inner: TemplateResult): TemplateResult {
    return this.config.embedded ? html`<div class="embedded">${inner}</div>` : html`<ha-card>${inner}</ha-card>`;
  }

  /** The card body; called only when the Hisho integration is set up. */
  protected abstract body(): TemplateResult;

  render() {
    if (!this.hass || !this.config) return html``;
    if (this.hass.user && !this.hass.user.is_admin) {
      return html`<ha-card><div class="empty">Hisho is for Home Assistant administrators.</div></ha-card>`;
    }
    if (!hub(this.hass)) {
      return html`<ha-card><div class="empty">
        The Hisho integration is not set up: Settings › Devices &amp; services › Add integration › Hisho.
      </div></ha-card>`;
    }
    return this.body();
  }

  protected heading(fallback: string): TemplateResult {
    const text = this.config.title ?? fallback;
    return text ? html`<div class="title">${text}</div>` : html``;
  }
}
