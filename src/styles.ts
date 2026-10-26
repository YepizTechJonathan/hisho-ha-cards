// One look for every Hisho card: dark glass over a forest picture, forest green and warm brown accents, big thin
// numbers, calm state colours. It is Hisho's own look, so it does not follow the HA theme's colours; a theme or
// card-mod can still change it through the --hisho-theme-* variables (accent, brown, glass).
import { css } from "lit";

/** Where the hisho integration serves the dashboard's picture (a misty pine forest at dusk, art/forest.mjs). */
export const DEFAULT_PICTURE = "/hisho_static/forest.jpg";

/** The Hisho dashboard's background (the strategy sets it on every view): the picture, darkened a little so glass
 *  cards read on it, over the same colours as a gradient (what shows if the picture is missing). */
export function viewBackground(picture: string = DEFAULT_PICTURE): string {
  const pic = picture ? `linear-gradient(rgba(6, 10, 7, 0.22), rgba(6, 10, 7, 0.5)), url("${picture}") center / cover no-repeat, ` : "";
  return `${pic}linear-gradient(180deg, #0a110d 0%, #1b2219 45%, #4a3a27 62%, #121a13 80%, #0a100b 100%) fixed`;
}

/** The same glass for Home Assistant's own cards on the Hisho dashboard (applied with card-mod, when installed). */
export const HA_CARD_GLASS =
  "ha-card { background: rgba(14, 20, 16, 0.6); backdrop-filter: blur(20px) saturate(140%); " +
  "-webkit-backdrop-filter: blur(20px) saturate(140%); border: 1px solid rgba(255, 255, 255, 0.09); " +
  "border-radius: 22px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35); --primary-text-color: #eef0ea; " +
  "--secondary-text-color: #a7ae9f; --divider-color: rgba(255, 255, 255, 0.08); --primary-color: #5f9e74; " +
  "--card-background-color: transparent; --ha-card-background: transparent; }";

export const cardStyles = css`
  :host {
    display: block;
    /* Forest green and warm brown; the state colours sit in the same earthy family. */
    --hisho-accent: var(--hisho-theme-accent, #3f7d58);
    --hisho-accent-text: var(--hisho-theme-accent-text, #8cc7a1);
    --hisho-brown: var(--hisho-theme-brown, #9c7148);
    --hisho-brown-text: var(--hisho-theme-brown-text, #d4ab7c);
    --hisho-accent-2: var(--hisho-brown);
    --hisho-ok: #6fbf8a;
    --hisho-warn: #dba64b;
    --hisho-crit: #e06a5f;
    --hisho-decide: #93aed0;
    --hisho-off: #848b7e;
    --hisho-glass: var(--hisho-theme-glass, rgba(14, 20, 16, 0.6));
    --hisho-inset: rgba(255, 255, 255, 0.045);
    --hisho-inset-hi: rgba(255, 255, 255, 0.085);
    --hisho-edge: rgba(255, 255, 255, 0.09);
    --hisho-line: rgba(255, 255, 255, 0.07);
    --hisho-soft: rgba(255, 255, 255, 0.06);
    --hisho-text: #eef0ea;
    --hisho-text-2: #a7ae9f;
    --hisho-radius: 16px;
    --hisho-radius-lg: 22px;
    color: var(--hisho-text);
    font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif));
    /* HA's own elements inside a card (dialogs aside) read these. */
    --primary-text-color: var(--hisho-text);
    --secondary-text-color: var(--hisho-text-2);
  }
  ha-card {
    padding: 16px 18px; container-type: inline-size; color: var(--hisho-text);
    background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
    backdrop-filter: blur(20px) saturate(140%); -webkit-backdrop-filter: blur(20px) saturate(140%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .embedded { container-type: inline-size; }
  /* One machine in full: side by side when there's room (readings | services), stacked when not. */
  .mcard { display: grid; grid-template-columns: 1fr; gap: 18px; }
  .mright:empty { display: none; }
  .kvrow { font-size: 0.9em; padding: 3px 0; max-width: 420px; }
  @container (min-width: 760px) { .mcard { grid-template-columns: minmax(300px, 420px) 1fr; gap: 28px; } }
  @container (max-width: 400px) { ul.list .row.spread { flex-wrap: wrap; } }
  .head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; min-height: 28px; }
  .title { font-size: 0.8em; font-weight: 600; color: var(--hisho-brown-text); letter-spacing: 0.12em; text-transform: uppercase; }
  .eyebrow {
    font-size: 0.74em; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--hisho-text-2); margin: 0 0 10px;
  }
  .muted { color: var(--hisho-text-2); font-size: 0.88em; }
  .num { font-variant-numeric: tabular-nums; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; }

  /* An inset panel inside a card: a machine, a box, a store entry. A thin gradient along its top says its state. */
  .tile {
    --stripe: var(--hisho-off);
    position: relative; overflow: hidden; background: var(--hisho-inset); border: 1px solid var(--hisho-line);
    border-radius: var(--hisho-radius); padding: 12px 13px; display: flex; flex-direction: column; gap: 8px; min-width: 0;
    transition: background 0.2s, border-color 0.2s;
  }
  .tile::before {
    content: ""; position: absolute; inset: 0 0 auto 0; height: 2px;
    background: linear-gradient(90deg, var(--stripe), transparent 75%); opacity: 0.9;
  }
  .tile:hover { background: var(--hisho-inset-hi); }
  .tile.ok { --stripe: var(--hisho-ok); } .tile.warn { --stripe: var(--hisho-warn); }
  .tile.bad { --stripe: var(--hisho-crit); } .tile.decide { --stripe: var(--hisho-decide); }
  .tile.off { --stripe: var(--hisho-off); } .tile.brown { --stripe: var(--hisho-brown-text); }
  .tile.mtile { padding-bottom: 0; gap: 10px; }
  .tile.mtile.asleep .rings { opacity: 0.45; }
  .mhead { display: flex; align-items: center; gap: 10px; cursor: pointer; min-width: 0; }
  .mhead .grow { display: flex; flex-direction: column; gap: 1px; }
  .mhead .name { font-size: 1.02em; font-weight: 600; }
  .mhead .sub { font-size: 0.8em; }
  .tile .acts:empty { display: none; }
  .sparkwrap { position: relative; margin: 0 -13px; height: 46px; }
  .sparkwrap .sparkl { position: absolute; right: 13px; top: 0; font-size: 0.66em; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--hisho-text-2); z-index: 1; }
  .tile.mtile > .acts:last-child { padding-bottom: 12px; }
  .tile .name { font-weight: 600; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0; }
  .spread { justify-content: space-between; flex-wrap: nowrap; }
  .grow { flex: 1; min-width: 0; }
  .ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* A state word in its colour, with a dot. */
  .chip {
    --c: var(--hisho-off);
    display: inline-flex; align-items: center; gap: 5px; border-radius: 999px; padding: 2px 9px 2px 8px;
    font-size: 0.74em; font-weight: 600; letter-spacing: 0.02em; white-space: nowrap; flex: none;
    color: color-mix(in srgb, var(--c) 85%, white); background: color-mix(in srgb, var(--c) 16%, transparent);
  }
  .chip::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--c); flex: none; }
  .chip.ok { --c: var(--hisho-ok); } .chip.warn { --c: var(--hisho-warn); } .chip.bad { --c: var(--hisho-crit); }
  .chip.decide { --c: var(--hisho-decide); } .chip.off { --c: var(--hisho-off); color: var(--hisho-text-2); }
  .chip.brown { --c: var(--hisho-brown-text); }
  .chip.plain::before { display: none; }

  /* A round icon in a soft circle of its state's colour (examples: the machine, a needs-you severity). */
  .bubble {
    --c: var(--hisho-off);
    width: 38px; height: 38px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
    flex: none; color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent);
  }
  .bubble svg { width: 21px; height: 21px; fill: currentColor; }
  .bubble.sm { width: 30px; height: 30px; } .bubble.sm svg { width: 17px; height: 17px; }
  .bubble.ok { --c: var(--hisho-ok); } .bubble.warn { --c: var(--hisho-warn); } .bubble.bad { --c: var(--hisho-crit); }
  .bubble.decide { --c: var(--hisho-decide); } .bubble.accent { --c: var(--hisho-accent-text); }
  .bubble.brown { --c: var(--hisho-brown-text); } .bubble.off { --c: var(--hisho-off); }
  .bubble.pulse { animation: hisho-pulse 2.4s ease-in-out infinite; }
  @keyframes hisho-pulse {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 45%, transparent); }
    50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--c) 0%, transparent); }
  }
  svg.i { width: 16px; height: 16px; fill: currentColor; flex: none; }

  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex: none; background: var(--hisho-off); }
  .dot.on { background: var(--hisho-ok); box-shadow: 0 0 8px var(--hisho-ok); }
  .dot.offline { background: var(--hisho-off); }

  /* Readings as rings. */
  .rings { display: flex; gap: 6px; justify-content: space-between; }
  .ring { position: relative; width: 62px; height: 56px; flex: 1; display: flex; justify-content: center; }
  .ring svg { width: 62px; height: 56px; overflow: visible; }
  .ring .track { stroke: rgba(255, 255, 255, 0.08); }
  .ring .val { transition: stroke-dashoffset 0.8s ease; filter: drop-shadow(0 0 3px color-mix(in srgb, currentColor 60%, transparent)); }
  .ring .rv { position: absolute; top: 17px; left: 0; right: 0; text-align: center; font-size: 1em; font-weight: 300;
    font-variant-numeric: tabular-nums; line-height: 1; }
  .ring .rv small { font-size: 0.6em; color: var(--hisho-text-2); }
  .ring .rl { position: absolute; bottom: -2px; left: 0; right: 0; text-align: center; font-size: 0.66em; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--hisho-text-2); }

  /* Buttons: glass pills; the risky ones in red, an active toggle in the accent. */
  button.act {
    font: inherit; font-size: 0.8em; font-weight: 500; border: 1px solid var(--hisho-edge); background: var(--hisho-soft);
    color: var(--hisho-text); border-radius: 999px; padding: 4px 12px; cursor: pointer; line-height: 1.5;
    display: inline-flex; align-items: center; gap: 5px; transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }
  button.act svg { width: 14px; height: 14px; fill: currentColor; }
  button.act:hover { background: var(--hisho-inset-hi); border-color: rgba(255, 255, 255, 0.16); }
  button.act:active { transform: scale(0.97); }
  button.act.danger { color: #f0968c; }
  button.act.brown { background: color-mix(in srgb, var(--hisho-brown) 55%, transparent); border-color: transparent; }
  button.act.on, button.act.primary { background: var(--hisho-accent); border-color: transparent; color: #fff;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--hisho-accent) 40%, transparent); }
  button.act[disabled] { opacity: 0.5; cursor: default; }
  button.link { font: inherit; border: none; background: none; color: var(--hisho-accent-text); cursor: pointer; padding: 0; }
  /* "All machines →" beside a section's name, like a tile dashboard's "More". */
  button.more {
    font: inherit; font-size: 0.74em; font-weight: 500; border: none; border-radius: 8px; padding: 4px 9px; cursor: pointer;
    background: var(--hisho-soft); color: var(--hisho-text); display: inline-flex; align-items: center; gap: 4px;
  }
  button.more:hover { background: var(--hisho-inset-hi); }
  button.more svg { width: 14px; height: 14px; fill: currentColor; }

  ul.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  ul.list > li {
    padding: 10px 12px; border-radius: 14px; background: var(--hisho-inset); border: 1px solid var(--hisho-line);
    display: flex; flex-direction: column; gap: 7px; position: relative;
  }
  ul.list > li.item { --stripe: transparent; padding-left: 16px; }
  ul.list > li.item::before {
    content: ""; position: absolute; left: 6px; top: 10px; bottom: 10px; width: 3px; border-radius: 2px; background: var(--stripe);
  }
  ul.list > li.item.ok { --stripe: var(--hisho-ok); } ul.list > li.item.warn { --stripe: var(--hisho-warn); }
  ul.list > li.item.bad { --stripe: var(--hisho-crit); } ul.list > li.item.decide { --stripe: var(--hisho-decide); }
  ul.list > li.item.off { --stripe: var(--hisho-off); }
  ul.list > li.bubbled { padding-left: 12px; flex-direction: row; align-items: flex-start; gap: 11px; }
  ul.list > li.bubbled::before { display: none; }
  ul.list > li.bubbled > .bodycol { display: flex; flex-direction: column; gap: 7px; flex: 1; min-width: 0; }
  li .summary { font-weight: 500; line-height: 1.35; margin-right: 6px; }
  li .summary.ellipsis { display: block; }
  li .sev { margin-top: 4px; padding-left: 0; background: none; font-size: 0.68em; text-transform: uppercase; letter-spacing: 0.1em; }
  .detail { color: var(--hisho-text-2); font-size: 0.86em; white-space: pre-wrap; line-height: 1.45; }
  .empty { color: var(--hisho-text-2); padding: 10px 2px; font-size: 0.92em; display: flex; align-items: center; gap: 8px; }
  .empty svg { width: 18px; height: 18px; fill: var(--hisho-ok); }
  /* Your day: to-dos with a round tick, and dates coming due. */
  ul.todos, ul.dues { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  ul.todos li { display: flex; align-items: flex-start; gap: 11px; padding: 9px 2px; border-top: 1px solid var(--hisho-line); line-height: 1.4; }
  ul.todos li:first-child { border-top: none; }
  button.tick { flex: none; width: 20px; height: 20px; margin-top: 1px; border-radius: 50%; cursor: pointer; padding: 0;
    border: 1.5px solid var(--hisho-accent-text); background: transparent; transition: background 0.15s; }
  button.tick:hover { background: color-mix(in srgb, var(--hisho-accent) 45%, transparent); }
  ul.dues li { display: flex; align-items: center; gap: 10px; padding: 6px 0; min-width: 0; }
  ul.dues .when { font-size: 0.8em; color: var(--hisho-brown-text); white-space: nowrap; font-weight: 500; }
  form.addrow { display: flex; gap: 8px; margin-bottom: 10px; }
  form.addrow input, form.ask input {
    flex: 1; min-width: 0; font: inherit; color: var(--hisho-text); background: var(--hisho-inset); border: 1px solid var(--hisho-edge);
    border-radius: 999px; padding: 8px 14px; outline: none;
  }
  form.addrow input:focus, form.ask input:focus { border-color: color-mix(in srgb, var(--hisho-accent-text) 60%, transparent); }
  /* Ask Hisho: one line to type in, the answer under it. */
  form.ask { display: flex; align-items: center; gap: 10px; }
  form.ask input { padding: 11px 16px; font-size: 1em; background: rgba(0, 0, 0, 0.25); }
  form.ask input::placeholder, form.addrow input::placeholder { color: var(--hisho-text-2); }
  button.send { flex: none; width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; color: #fff;
    background: var(--hisho-accent); display: inline-flex; align-items: center; justify-content: center; }
  button.send svg { width: 20px; height: 20px; fill: currentColor; }
  button.send[disabled] { opacity: 0.5; }
  .answer { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
  .answer .q { align-self: flex-end; background: color-mix(in srgb, var(--hisho-accent) 35%, transparent); padding: 6px 12px;
    border-radius: 14px 14px 4px 14px; font-size: 0.9em; max-width: 85%; }
  .answer .a { background: var(--hisho-inset); padding: 9px 13px; border-radius: 14px 14px 14px 4px; font-size: 0.92em;
    line-height: 1.45; white-space: pre-wrap; max-width: 92%; }
  .thinking { display: inline-flex; align-items: center; gap: 6px; color: var(--hisho-text-2); }
  .thinking svg { width: 16px; height: 16px; fill: currentColor; animation: hisho-spin 1.4s linear infinite; }
  @keyframes hisho-spin { to { transform: rotate(360deg); } }
  .switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.86em; }
  .switch input { accent-color: var(--hisho-accent); width: 15px; height: 15px; }
  .kv { display: grid; grid-template-columns: auto 1fr; gap: 3px 12px; font-size: 0.84em; }
  .kv > span:nth-child(odd) { color: var(--hisho-text-2); }
  .kv > span:nth-child(even) { text-align: right; font-variant-numeric: tabular-nums; }
  .chev { transition: transform 0.2s; color: var(--hisho-text-2); flex: none; display: inline-flex; }
  .chev svg { width: 18px; height: 18px; fill: currentColor; }
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
