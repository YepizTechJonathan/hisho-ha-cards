// Small pieces of the Hisho look shared by the cards: icons, ring gauges, the greeting, moving between views.
import { html, svg, type TemplateResult } from "lit";
import type { HomeAssistant } from "./hass";

/** An mdi icon from its path (@mdi/js), drawn inline so it needs nothing from Home Assistant. */
export function icon(path: string, cls = "i"): TemplateResult {
  return html`<svg class=${cls} viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${path}></path>`}</svg>`;
}

/** A 270° ring gauge for a percentage, green, then amber and red as it fills. */
export function ring(label: string, value: number): TemplateResult {
  const r = 22, c = 2 * Math.PI * r, arc = c * 0.75;
  const tone = value >= 95 ? "var(--hisho-crit)" : value >= 85 ? "var(--hisho-warn)" : "var(--hisho-accent-text)";
  return html`<div class="ring" title="${label} ${Math.round(value)}%">
    <svg viewBox="0 0 56 56">${svg`
      <circle class="track" cx="28" cy="28" r=${r} fill="none" stroke-width="4.5" stroke-linecap="round"
        stroke-dasharray="${arc} ${c}" transform="rotate(135 28 28)"></circle>
      <circle class="val" cx="28" cy="28" r=${r} fill="none" stroke-width="4.5" stroke-linecap="round" style="color:${tone}"
        stroke=${tone} stroke-dasharray="${arc} ${c}" stroke-dashoffset=${arc * (1 - value / 100)}
        transform="rotate(135 28 28)"></circle>`}
    </svg>
    <span class="rv">${Math.round(value)}<small>%</small></span><span class="rl">${label}</span>
  </div>`;
}

/** The hour of the day where Home Assistant is (its time zone, so Pacific for Jonathan's house). */
export function localParts(hass: HomeAssistant, now = new Date()) {
  const tz = hass.config?.time_zone;
  const opt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...o, timeZone: tz }).format(now);
  return {
    hour: Number(opt({ hour: "numeric", hourCycle: "h23" })) % 24,
    time: opt({ hour: "numeric", minute: "2-digit" }),
    date: opt({ weekday: "long", month: "long", day: "numeric" }),
  };
}

export function greeting(hass: HomeAssistant, now = new Date()): string {
  const { hour } = localParts(hass, now);
  const part = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : hour < 22 ? "Good evening" : "Good night";
  const name = hass.user?.name?.split(" ")[0];
  return name ? `${part}, ${name}.` : `${part}.`;
}

/** Go to another view of the dashboard this card is on ("machines" -> /<dashboard>/machines). */
export function navigate(view: string) {
  const base = window.location.pathname.split("/")[1] ?? "";
  window.history.pushState(null, "", `/${base}/${view}`);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
}
