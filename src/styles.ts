// One look for every Hisho card, built on Home Assistant's theme variables so any theme (and dark mode) applies.
// Hisho's own colours (its dashboard's ok / warn / critical / decide) are the fallbacks, so it reads as Hisho.
import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    --hisho-ok: var(--success-color, #2f855a);
    --hisho-warn: var(--warning-color, #b7791f);
    --hisho-crit: var(--error-color, #c0392b);
    --hisho-decide: var(--info-color, #2d6cdf);
    --hisho-off: var(--disabled-text-color, #8a8a85);
    --hisho-line: var(--divider-color, rgba(127, 127, 127, 0.25));
    --hisho-soft: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    --hisho-radius: calc(var(--ha-card-border-radius, 12px) - 4px);
  }
  ha-card { padding: 12px 14px; container-type: inline-size; }
  .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; min-height: 28px; }
  /* Hisho's own dashboard labels its sections in spaced capitals ("NEEDS YOU", "MACHINES"): the same here. */
  .title { font-size: 0.86em; font-weight: 600; color: var(--primary-text-color); letter-spacing: 0.08em; text-transform: uppercase; }
  .eyebrow {
    font-size: 0.72em; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--secondary-text-color); margin: 0 0 6px;
  }
  .muted { color: var(--secondary-text-color); font-size: 0.88em; }
  .num { font-variant-numeric: tabular-nums; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; }
  .tile {
    --stripe: var(--hisho-off);
    border: 1px solid var(--hisho-line); border-left: 3px solid var(--stripe); border-radius: var(--hisho-radius);
    padding: 9px 10px; display: flex; flex-direction: column; gap: 6px; min-width: 0;
  }
  .tile.ok { --stripe: var(--hisho-ok); } .tile.warn { --stripe: var(--hisho-warn); }
  .tile.bad { --stripe: var(--hisho-crit); } .tile.decide { --stripe: var(--hisho-decide); }
  .tile.off { --stripe: var(--hisho-off); }
  .tile .name { font-weight: 600; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0; }
  .spread { justify-content: space-between; flex-wrap: nowrap; }
  .grow { flex: 1; min-width: 0; }
  .ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chip {
    display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 1px 8px; font-size: 0.76em;
    font-weight: 500; background: var(--hisho-soft); color: var(--primary-text-color); white-space: nowrap; flex: none;
  }
  .chip.ok { background: color-mix(in srgb, var(--hisho-ok) 20%, transparent); }
  .chip.warn { background: color-mix(in srgb, var(--hisho-warn) 24%, transparent); }
  .chip.bad { background: color-mix(in srgb, var(--hisho-crit) 24%, transparent); }
  .chip.decide { background: color-mix(in srgb, var(--hisho-decide) 22%, transparent); }
  .chip.off { color: var(--secondary-text-color); }
  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex: none; background: var(--hisho-off); }
  .dot.on { background: var(--hisho-ok); }
  .dot.offline { background: var(--hisho-off); }
  .meters { display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 4px 10px; }
  .meter { display: flex; flex-direction: column; gap: 3px; font-size: 0.78em; min-width: 0; }
  .meter .mlabel { display: flex; justify-content: space-between; color: var(--secondary-text-color); }
  .meter .mlabel b { font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
  .bar { height: 4px; border-radius: 2px; background: var(--hisho-soft); overflow: hidden; }
  .bar > span { display: block; height: 100%; background: var(--primary-color); }
  .bar.high > span { background: var(--hisho-warn); }
  .bar.full > span { background: var(--hisho-crit); }
  button.act {
    font: inherit; font-size: 0.8em; border: 1px solid var(--hisho-line); background: transparent;
    color: var(--primary-color); border-radius: 999px; padding: 2px 10px; cursor: pointer; line-height: 1.5;
  }
  button.act:hover { background: var(--hisho-soft); }
  button.act.danger { color: var(--hisho-crit); }
  button.act.on { background: color-mix(in srgb, var(--hisho-decide) 18%, transparent); color: var(--primary-text-color); }
  button.act[disabled] { opacity: 0.5; cursor: default; }
  button.link { font: inherit; border: none; background: none; color: var(--primary-color); cursor: pointer; padding: 0; }
  ul.list { list-style: none; margin: 0; padding: 0; }
  ul.list > li { padding: 8px 0; border-top: 1px solid var(--hisho-line); display: flex; flex-direction: column; gap: 5px; }
  ul.list > li:first-child { border-top: none; padding-top: 0; }
  ul.list > li.item { --stripe: transparent; border-left: 3px solid var(--stripe); padding-left: 9px; }
  ul.list > li.item.ok { --stripe: var(--hisho-ok); } ul.list > li.item.warn { --stripe: var(--hisho-warn); }
  ul.list > li.item.bad { --stripe: var(--hisho-crit); } ul.list > li.item.decide { --stripe: var(--hisho-decide); }
  ul.list > li.item.off { --stripe: var(--hisho-off); }
  .detail { color: var(--secondary-text-color); font-size: 0.86em; white-space: pre-wrap; }
  .empty { color: var(--secondary-text-color); padding: 6px 0; font-size: 0.92em; }
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.86em; }
  .kv { display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; font-size: 0.86em; }
  .kv > span:nth-child(odd) { color: var(--secondary-text-color); }
  .kv > span:nth-child(even) { text-align: right; font-variant-numeric: tabular-nums; }
  .chev { transition: transform 0.15s; color: var(--secondary-text-color); font-size: 0.8em; flex: none; }
  .chev.open { transform: rotate(90deg); }
`;

export function stateClass(state: string | undefined): string {
  switch (state) {
    case "up": case "on": case "ok": case "running": case "active": case "done": return "ok";
    case "warn": case "maintenance": case "away": case "needs_setup": case "blocked": case "queued": case "routed": return "warn";
    case "faulted": case "unreachable": case "problem": case "down": case "error": case "failed": case "critical": return "bad";
    case "decision": return "decide";
    default: return "off";
  }
}

export function pct(value: string | undefined): number | undefined {
  const n = value === undefined ? NaN : parseFloat(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : undefined;
}
