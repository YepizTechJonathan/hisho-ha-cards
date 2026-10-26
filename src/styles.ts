// One look for every Hisho card, built on Home Assistant's theme variables so any theme (and dark mode) applies.
import { css } from "lit";

export const cardStyles = css`
  :host { display: block; }
  ha-card { padding: 16px; }
  .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; }
  .title { font-size: 1.15em; font-weight: 500; color: var(--primary-text-color); }
  .muted { color: var(--secondary-text-color); font-size: 0.9em; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .tile {
    border: 1px solid var(--divider-color); border-radius: calc(var(--ha-card-border-radius, 12px) - 4px);
    padding: 12px; display: flex; flex-direction: column; gap: 8px; min-width: 0;
  }
  .tile .name { font-weight: 500; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .spread { justify-content: space-between; }
  .chip {
    display: inline-flex; align-items: center; gap: 4px; border-radius: 10px; padding: 1px 8px; font-size: 0.8em;
    background: var(--secondary-background-color); color: var(--primary-text-color); white-space: nowrap;
  }
  .ok { background: color-mix(in srgb, var(--success-color, #43a047) 22%, transparent); }
  .warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 25%, transparent); }
  .bad { background: color-mix(in srgb, var(--error-color, #db4437) 25%, transparent); }
  .off { background: var(--secondary-background-color); color: var(--secondary-text-color); }
  .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex: none; }
  .dot.on { background: var(--success-color, #43a047); }
  .dot.offline { background: var(--disabled-text-color, #9e9e9e); }
  .bar { height: 6px; border-radius: 3px; background: var(--secondary-background-color); overflow: hidden; flex: 1; }
  .bar > span { display: block; height: 100%; background: var(--primary-color); }
  .bar.high > span { background: var(--warning-color, #ffa600); }
  .meter { display: grid; grid-template-columns: 44px 1fr 38px; align-items: center; gap: 6px; font-size: 0.85em; }
  button.act {
    font: inherit; font-size: 0.85em; border: 1px solid var(--divider-color); background: transparent;
    color: var(--primary-color); border-radius: 14px; padding: 3px 10px; cursor: pointer;
  }
  button.act:hover { background: var(--secondary-background-color); }
  button.act.danger { color: var(--error-color, #db4437); }
  button.act[disabled] { opacity: 0.5; cursor: default; }
  ul.list { list-style: none; margin: 0; padding: 0; }
  ul.list > li { padding: 10px 0; border-top: 1px solid var(--divider-color); display: flex; flex-direction: column; gap: 6px; }
  ul.list > li:first-child { border-top: none; padding-top: 0; }
  .detail { color: var(--secondary-text-color); font-size: 0.9em; white-space: pre-wrap; }
  .empty { color: var(--secondary-text-color); padding: 8px 0; }
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.9em; }
`;

export function stateClass(state: string | undefined): string {
  switch (state) {
    case "up": case "on": case "ok": case "running": case "active": return "ok";
    case "warn": case "maintenance": case "away": case "needs_setup": case "blocked": return "warn";
    case "faulted": case "unreachable": case "problem": case "down": case "error": case "failed": return "bad";
    default: return "off";
  }
}

export function pct(value: string | undefined): number | undefined {
  const n = value === undefined ? NaN : parseFloat(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : undefined;
}
