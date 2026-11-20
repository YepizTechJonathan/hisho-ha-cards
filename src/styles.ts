// One look for every Hisho card, the secretary's brief (Hisho's own dashboard): warm black, crimson, Shippori Mincho
// headings, Inter Tight text, IBM Plex Mono for machine names and numbers, hairline rules instead of boxes, text links
// instead of buttons. The fonts and the matching Home Assistant theme ("Hisho") come with the hisho integration; a
// theme or card-mod can still change the accent through the --hisho-theme-* variables.
import { css, type CSSResultGroup } from "lit";

/** The Hisho dashboard's background (the strategy sets it on every view): the brief's warm black. A picture can
 *  still be given ("/local/my-photo.jpg"); "" or nothing means the plain black. */
export function viewBackground(picture = ""): string {
  return picture ? `linear-gradient(rgba(11, 10, 9, 0.6), rgba(11, 10, 9, 0.85)), url("${picture}") center / cover no-repeat fixed, #0B0A09`
    : "#0B0A09";
}

/** Home Assistant's own cards on the Hisho dashboard in the same look when card-mod is installed (the Hisho theme
 *  does this for every dashboard; this is for a Home Assistant without the theme selected). */
export const HA_CARD_GLASS =
  "ha-card { background: transparent; border: none; border-top: 1px solid #26231F; border-radius: 0; box-shadow: none; " +
  "--primary-text-color: #ECE6DC; --secondary-text-color: #8C857B; --divider-color: #26231F; --primary-color: #DC143C; " +
  "--card-background-color: transparent; --ha-card-background: transparent; }";

const baseStyles = css`
  :host {
    display: block;
    --hisho-accent: var(--hisho-theme-accent, #DC143C);
    --hisho-accent-text: var(--hisho-theme-accent-text, #DC143C);
    --hisho-brown: var(--hisho-theme-brown, #8C857B);
    --hisho-brown-text: var(--hisho-theme-brown-text, #8C857B);
    --hisho-accent-2: var(--hisho-brown);
    --hisho-ok: #3FB97A;
    --hisho-warn: #E0A030;
    --hisho-crit: #E8364F;
    --hisho-decide: #DC143C;
    --hisho-off: #4A4640;
    --hisho-glass: var(--hisho-theme-glass, transparent);
    --hisho-inset: transparent;
    --hisho-inset-hi: rgba(236, 230, 220, 0.04);
    --hisho-edge: #26231F;
    --hisho-line: #26231F;
    --hisho-soft: transparent;
    --hisho-text: #ECE6DC;
    --hisho-text-2: #8C857B;
    --hisho-faint: #4A4640;
    --hisho-radius: 0;
    --hisho-radius-lg: 0;
    --hisho-serif: "Shippori Mincho", "Noto Serif JP", Georgia, serif;
    --hisho-ui: "Inter Tight", system-ui, sans-serif;
    --hisho-mono: "IBM Plex Mono", ui-monospace, monospace;
    color: var(--hisho-text);
    font-family: var(--hisho-ui);
    /* HA's own elements inside a card (dialogs aside) read these. */
    --primary-text-color: var(--hisho-text);
    --secondary-text-color: var(--hisho-text-2);
  }
  ha-card {
    padding: 4px 0 8px; container-type: inline-size; color: var(--hisho-text);
    background: transparent; border: none; border-radius: 0; box-shadow: none;
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

/** The brief's flat look over the shared pieces above: rows on hairlines instead of boxes, plain words in their colour
 *  instead of chips, text links instead of buttons, numbers in the mono face. */
const briefStyles = css`
  .title, .eyebrow { font-family: var(--hisho-ui); font-size: 0.78em; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--hisho-faint); }
  .head { margin-bottom: 6px; }
  .num, .kv > span:nth-child(even) { font-family: var(--hisho-mono); }
  .tile { background: none; border: none; border-top: 1px solid var(--hisho-line); border-radius: 0; padding: 12px 0; }
  .tile::before { display: none; }
  .tile:hover { background: none; }
  ul.list { gap: 0; }
  ul.list > li { background: none; border: none; border-top: 1px solid var(--hisho-line); border-radius: 0; padding: 14px 0; }
  ul.list > li.item::before { display: none; }
  ul.list > li.item, ul.list > li.bubbled { padding-left: 0; }
  .chip { background: none; padding: 0; font-weight: 500; letter-spacing: 0; color: var(--c); }
  .chip.off { color: var(--hisho-text-2); }
  .chip::before { width: 8px; height: 8px; }
  .chip.plain { color: var(--hisho-text-2); }
  .bubble { background: none; width: 26px; height: 26px; }
  .bubble.pulse { animation: none; }
  .dot.on { box-shadow: none; }
  button.act, button.more { background: none; border: none; border-radius: 0; box-shadow: none; padding: 6px 0; margin-right: 22px;
    font-size: 1em; font-weight: 400; color: var(--hisho-text-2); }
  button.act svg, button.more svg { display: none; }
  button.act:hover, button.more:hover { background: none; border: none; color: var(--hisho-text); }
  button.act.on, button.act.primary { background: none; box-shadow: none; color: var(--hisho-accent); font-weight: 500; }
  button.act.danger { color: var(--hisho-crit); }
  button.act.brown { background: none; color: var(--hisho-warn); }
  button.link { color: var(--hisho-text-2); }
  button.link:hover { color: var(--hisho-text); }
  form.addrow input, form.ask input { background: none; border: none; border-bottom: 1px solid var(--hisho-faint); border-radius: 0;
    padding: 10px 0; }
  form.ask .bubble { display: none; }
  form.ask input { font-family: var(--hisho-serif); font-size: 1.35em; }
  form.ask input::placeholder { color: var(--hisho-faint); }
  button.send { background: none; color: var(--hisho-text-2); }
  .answer .q { background: none; border-right: 2px solid var(--hisho-accent); border-radius: 0; }
  .answer .a { background: none; border-left: 1px solid var(--hisho-line); border-radius: 0; font-family: var(--hisho-serif); font-size: 1.05em; }
  button.tick { border-color: var(--hisho-text-2); border-radius: 3px; width: 18px; height: 18px; }
  button.tick:hover { background: none; border-color: var(--hisho-accent); }
  ul.dues .when { color: var(--hisho-text-2); font-family: var(--hisho-mono); }
  .ring .track { stroke: var(--hisho-line); }
  .ring .val { filter: none; }
  .ring .rv { font-family: var(--hisho-mono); font-size: 0.9em; }
  .empty svg { fill: var(--hisho-ok); }
`;

/** Every Hisho card's styles: the shared pieces, then the brief's flat look over them. */
export const cardStyles: CSSResultGroup = [baseStyles, briefStyles];
