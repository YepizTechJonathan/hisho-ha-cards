// hisho-spark: a reading's last hours as a soft area line along the bottom of a tile, from Home Assistant's
// recorder (history/history_during_period). One fetch per entity every few minutes, shared by every card.
import { LitElement, css, html, svg, type PropertyValues } from "lit";
import type { HomeAssistant } from "./hass";

const TTL = 5 * 60_000;
const cache = new Map<string, { at: number; points: Promise<number[]> }>();

/** The reading every `hours / buckets` hours, the last known value carried forward (empty when there's no history). */
export function series(hass: HomeAssistant, entityId: string, hours = 24, buckets = 48, now = Date.now()): Promise<number[]> {
  const key = `${entityId}|${hours}|${buckets}`;
  const hit = cache.get(key);
  if (hit && now - hit.at < TTL) return hit.points;
  const start = now - hours * 3600_000;
  const points = hass
    .callWS<Record<string, { s: string; lu: number }[]>>({
      type: "history/history_during_period", start_time: new Date(start).toISOString(), end_time: new Date(now).toISOString(),
      entity_ids: [entityId], minimal_response: true, no_attributes: true, significant_changes_only: false,
    })
    .then((r) => bucket((r?.[entityId] ?? []).map((p) => [p.lu * 1000, parseFloat(p.s)] as [number, number])
      .filter(([, v]) => Number.isFinite(v)), start, now, buckets))
    .catch(() => []);
  cache.set(key, { at: now, points });
  return points;
}

export function bucket(changes: [number, number][], start: number, end: number, buckets: number): number[] {
  if (!changes.length) return [];
  const out: number[] = [];
  let i = 0, last = changes[0][1];
  for (let b = 1; b <= buckets; b++) {
    const until = start + ((end - start) * b) / buckets;
    while (i < changes.length && changes[i][0] <= until) last = changes[i++][1];
    out.push(last);
  }
  return out;
}

/** A smooth path through the points (Catmull-Rom as cubic Béziers), in a 100 x 30 box, top 4 left free. */
export function sparkPath(points: number[], min?: number, max?: number): { line: string; area: string } {
  const lo = min ?? Math.min(...points), hi = max ?? Math.max(...points);
  const span = hi - lo || 1;
  const xy = points.map((v, i) => [(i / Math.max(1, points.length - 1)) * 100, 30 - ((v - lo) / span) * 24 - 2] as const);
  let line = `M${xy[0][0]},${xy[0][1]}`;
  for (let i = 0; i < xy.length - 1; i++) {
    const p0 = xy[i - 1] ?? xy[i], p1 = xy[i], p2 = xy[i + 1], p3 = xy[i + 2] ?? p2;
    line += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return { line, area: `${line} L100,30 L0,30 Z` };
}

let uid = 0;

export class HishoSpark extends LitElement {
  static properties = { hass: { attribute: false }, entity: {}, hours: { type: Number }, tone: {}, min: { type: Number },
    max: { type: Number }, points: { state: true } };
  declare hass: HomeAssistant;
  declare entity: string;
  declare hours: number;
  declare tone: string;
  declare min?: number;
  declare max?: number;
  declare points: number[];
  private gradId = `hs${++uid}`;
  private fetched = 0;

  static styles = css`
    :host { display: block; height: 46px; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block; }
  `;

  constructor() {
    super();
    this.hours = 24;
    this.points = [];
    this.tone = "var(--hisho-accent-text, #8cc7a1)";
  }

  protected willUpdate(changed: PropertyValues) {
    if (this.hass && this.entity && (changed.has("entity") || Date.now() - this.fetched > TTL)) {
      this.fetched = Date.now();
      void series(this.hass, this.entity, this.hours).then((p) => (this.points = p));
    }
  }

  render() {
    if (this.points.length < 2) return html``;
    const { line, area } = sparkPath(this.points, this.min, this.max);
    return html`<svg viewBox="0 0 100 30" preserveAspectRatio="none">${svg`
      <defs><linearGradient id=${this.gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.tone} stop-opacity="0.32"></stop>
        <stop offset="1" stop-color=${this.tone} stop-opacity="0"></stop></linearGradient></defs>
      <path d=${area} fill="url(#${this.gradId})"></path>
      <path d=${line} fill="none" stroke=${this.tone} stroke-width="1.6" vector-effect="non-scaling-stroke"
        stroke-linejoin="round" stroke-linecap="round"></path>`}</svg>`;
  }
}

if (!customElements.get("hisho-spark")) customElements.define("hisho-spark", HishoSpark);
