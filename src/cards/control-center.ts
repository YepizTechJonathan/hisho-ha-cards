// hisho-control-center-card: Hisho's Overview in one card, made for a full-width (panel) view. It leads with what
// Hisho does for you, not with the machines: it sits straight on the dashboard's picture; its panels are dark glass.
//   a greeting with the day and one sentence about your day | Ask Hisho
//   your day (Today's to-dos, what's coming due)   | needs your decision, projects waiting on you
//   what Hisho is working on, what it did for you  |   (on a phone: decisions first)
//   the system as one line: machines, sync, fleet maintenance, a link to the Machines page
import { css, html, type CSSResultGroup, type TemplateResult } from "lit";
import {
  mdiArrowRight, mdiCheck, mdiClose, mdiCoffeeOutline, mdiFolderAccountOutline, mdiShieldAlertOutline, mdiShieldCheckOutline,
  mdiWrenchOutline,
} from "@mdi/js";
import { HishoCard } from "../base";
import { available, byKind, entity, entityId, hub, type HishoDevice } from "../model";
import { toggle } from "../actions";
import { cardStyles, stateClass } from "../styles";
import { greeting, icon, localParts, navigate } from "../ui";
import { doneForYou, waitingOnYou, workingOn } from "./assistant";

export class HishoControlCenterCard extends HishoCard {
  static properties = { ...HishoCard.properties, selected: { state: true } };
  declare selected?: string;
  private clock?: number;

  static styles: CSSResultGroup = [cardStyles, css`
    ha-card {
      background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none;
      padding: clamp(14px, 3vw, 36px) clamp(12px, 3vw, 40px) 32px; max-width: 1680px; margin: 0 auto;
    }
    .glass {
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .hero { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 1fr); align-items: end; gap: 24px; margin: 4px 0 22px; }
    .when { font-size: 0.8em; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hisho-brown-text); font-weight: 600; }
    h1 { margin: 6px 0 8px; font-size: clamp(1.7em, 4.2vw, 2.9em); font-weight: 300; letter-spacing: -0.01em; line-height: 1.1;
      text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45); }
    .summary { margin: 0; color: var(--hisho-text); opacity: 0.9; font-size: 1.05em; max-width: 62ch; line-height: 1.5; }
    .askwrap { padding: 12px; }

    .body { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; align-items: start; }
    .col { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
    .panel { padding: 16px 18px 18px; min-width: 0; }
    ul.dones { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
    ul.dones li { display: flex; align-items: center; gap: 9px; padding: 5px 0; font-size: 0.92em; }
    ul.dones li > svg { width: 16px; height: 16px; fill: var(--hisho-accent-text); flex: none; }

    /* The system: one line, every part as a status pill, the full card of one a tap away. */
    .system { margin-bottom: 18px; padding: 12px 16px 14px; }
    .sysbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .sysline { font-size: 0.92em; color: var(--hisho-text); }
    .sysline b { font-weight: 600; } .sysline b.bad { color: var(--hisho-crit); } .sysline b.warnc { color: var(--hisho-warn); }
    .sysgrid { display: flex; flex-wrap: wrap; gap: 6px 26px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--hisho-line); }
    .sysgroup .eyebrow { margin-bottom: 7px; font-size: 0.68em; }
    .pills { display: flex; flex-wrap: wrap; gap: 6px; }
    button.pill {
      font: inherit; color: var(--hisho-text); display: inline-flex; align-items: center; gap: 7px; cursor: pointer;
      background: var(--hisho-inset); border: 1px solid var(--hisho-line); border-radius: 10px; padding: 5px 10px 5px 9px;
      transition: background 0.15s, border-color 0.15s;
    }
    button.pill:hover { background: var(--hisho-inset-hi); }
    button.pill.sel { border-color: color-mix(in srgb, var(--hisho-accent-text) 70%, transparent); background: var(--hisho-inset-hi); }
    button.pill.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }
    button.pill.warn { border-color: color-mix(in srgb, var(--hisho-warn) 40%, transparent); }
    .pill .pn { font-size: 0.86em; font-weight: 500; white-space: nowrap; }
    .pill .ps { font-size: 0.72em; color: var(--hisho-text-2); white-space: nowrap; }
    .dot.ok { background: var(--hisho-ok); box-shadow: 0 0 7px var(--hisho-ok); } .dot.warn { background: var(--hisho-warn); }
    .dot.bad { background: var(--hisho-crit); box-shadow: 0 0 7px var(--hisho-crit); } .dot.decide { background: var(--hisho-decide); }
    .dot.brown { background: var(--hisho-brown-text); }
    .drawer { position: relative; margin-top: 14px; padding: 14px 52px 14px 16px; border-radius: var(--hisho-radius);
      background: var(--hisho-inset); border: 1px solid var(--hisho-line); animation: hisho-open 0.18s ease-out; }
    @keyframes hisho-open { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
    .drawer .close { position: absolute; top: 10px; right: 10px; border: none; background: var(--hisho-soft); color: var(--hisho-text);
      width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; z-index: 1; }
    .drawer .close svg { width: 16px; height: 16px; fill: currentColor; }

    @container (max-width: 860px) {
      .hero { grid-template-columns: 1fr; }
      .body { grid-template-columns: 1fr; }
      .body > .col:last-child { order: -1; }
    }
    @container (max-width: 560px) {
      .sysline { flex: 1 1 calc(100% - 52px); }
      .sysbar > button { flex: 1 1 auto; justify-content: center; }
    }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-control-center-card" };
  }

  connectedCallback() {
    super.connectedCallback();
    this.clock = window.setInterval(() => this.requestUpdate(), 30_000); // the greeting's clock
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.clock);
  }

  getGridOptions(): { columns: number | "full"; min_columns: number } {
    return { columns: "full", min_columns: 12 };
  }

  getCardSize(): number {
    return 12;
  }

  protected body() {
    const hass = this.hass;
    const h = hub(hass);
    const machines = byKind(hass, "machine");
    const reach = entity(hass, h, "core_reachable");
    const online = entity(hass, h, "machines_online");
    const faulted = entity(hass, h, "machines_faulted");
    const needs = entity(hass, h, "needs_you_count");
    const alerts: any[] = needs?.attributes.alerts ?? [];
    const critical = alerts.filter((a) => a.severity === "critical").length;
    const jobsEnt = entity(hass, h, "jobs_active");
    const jobs: any[] = jobsEnt?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const syncProblem = entity(hass, h, "sync_problem");
    const conflicts = entity(hass, h, "sync_conflicts");
    const fleetMaint = entityId(h, "fleet_maintenance");
    const maintOn = fleetMaint ? hass.states[fleetMaint]?.state === "on" : false;
    const coreDown = reach?.state === "off";
    const nOnline = available(online) ? Number(online.state) : undefined;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const nConflicts = available(conflicts) ? Number(conflicts.state) || 0 : undefined;
    const open = alerts.length;
    const syncBad = syncProblem?.state === "on";
    const { time, date } = localParts(hass);

    const working = workingOn(hass);
    const done = doneForYou(hass);
    const projectsWaiting = waitingOnYou(hass);
    const todayOpen = Number(entity(hass, h, "today")?.state) || 0;
    return this.frame(html`
      <div class="hero">
        <div class="hello">
          <div class="when">${date} · ${time}</div>
          <h1>${this.config.title ?? greeting(hass)}</h1>
          <p class="summary">${this.summary(coreDown, open, critical, todayOpen, working.length, projectsWaiting.length)}</p>
        </div>
        <div class="askwrap glass"><hisho-ask .hass=${hass}></hisho-ask></div>
      </div>

      ${this.system(machines.length, nOnline, nFaulted, coreDown, syncBad, nConflicts, running, fleetMaint, maintOn)}

      <div class="body">
        <div class="col">
          <section class="panel glass"><hisho-day .hass=${hass}></hisho-day></section>
          <section class="panel glass">
            <div class="head"><span class="title">Hisho is working on</span>
              ${failed ? html`<span class="chip warn">${failed} failed</span>` : ""}</div>
            ${working.length ? html`<ul class="list">${working.map((w) => html`<li class="item bubbled">
                <span class="bubble sm ${w.tone}">${icon(w.path, "")}</span>
                <div class="bodycol"><span class="summary">${w.what}</span><span class="muted">${w.sub}</span></div></li>`)}</ul>`
              : html`<div class="empty">${icon(mdiCoffeeOutline, "")}Nothing running right now. Ask Hisho for something.</div>`}
            ${done.length ? html`<div class="eyebrow" style="margin-top:16px">Done for you · last 24 hours</div>
              <ul class="dones">${done.slice(0, 6).map((d) => html`<li>${icon(mdiCheck, "")}<span class="grow">${d.what}</span>
                <span class="muted">${d.when}</span></li>`)}</ul>` : ""}
          </section>
        </div>
        <div class="col">
          <section class="panel glass">
            <hisho-needs-you-card .hass=${hass} .config=${{ type: "custom:hisho-needs-you-card", embedded: true, compact: true,
              title: "Needs your decision", limit: this.config.needs_you_limit ?? 6 }}></hisho-needs-you-card>
            ${projectsWaiting.length ? html`<div class="eyebrow" style="margin-top:16px">Projects waiting on you</div>
              <ul class="list">${projectsWaiting.slice(0, 4).map((p) => html`<li class="item bubbled">
                <span class="bubble sm brown">${icon(mdiFolderAccountOutline, "")}</span>
                <div class="bodycol"><span class="summary">${p.title}</span>
                  ${p.asks?.length ? html`<span class="muted">${p.asks[0]}</span>` : p.next ? html`<span class="muted">Next: ${p.next}</span>` : ""}</div>
              </li>`)}</ul>` : ""}
          </section>
        </div>
      </div>

    `);
  }

  /** The system, compact but all there: one line, then every machine, device and add-on as a status pill. Tap one
   *  to open its full card (readings, services, buttons) right here. */
  private system(total: number, up: number | undefined, faulted: number, coreDown: boolean, syncBad: boolean,
                 conflicts: number | undefined, running: number, fleetMaint: string | undefined, maintOn: boolean) {
    const hass = this.hass;
    const asleep = total - (up ?? 0);
    const machines = byKind(hass, "machine"), boxes = byKind(hass, "box"), addons = byKind(hass, "addon");
    const tone = (d: HishoDevice): [string, string] => {
      const maint = entityId(d, "maintenance");
      if (maint && hass.states[maint]?.state === "on") return ["brown", "maintenance"];
      if (d.kind === "machine") {
        const st = entity(hass, d, "machine_state")?.state ?? "unknown";
        return [stateClass(st), st];
      }
      if (d.kind === "addon") {
        const st = entity(hass, d, "addon_status")?.state ?? "unknown";
        return [stateClass(st), st];
      }
      const health = entity(hass, d, "box_health")?.state, power = entity(hass, d, "box_state")?.state;
      return health && stateClass(health) !== "ok" && stateClass(health) !== "off" ? [stateClass(health), health]
        : [stateClass(power ?? health), power ?? health ?? "unknown"];
    };
    const problems = [...machines, ...boxes, ...addons].filter((d) => ["bad", "warn"].includes(tone(d)[0])).length;
    const healthy = !coreDown && !faulted && !syncBad && !problems;
    const pill = (d: HishoDevice) => {
      const [t, word] = tone(d);
      return html`<button class="pill ${t} ${this.selected === d.id ? "sel" : ""}"
        @click=${() => (this.selected = this.selected === d.id ? undefined : d.id)}>
        <span class="dot ${t}"></span><span class="pn">${d.name}</span><span class="ps">${word}</span></button>`;
    };
    const chosen = [...machines, ...boxes, ...addons].find((d) => d.id === this.selected);
    const group = (label: string, list: HishoDevice[]) => list.length
      ? html`<div class="sysgroup"><div class="eyebrow">${label}</div><div class="pills">${list.map(pill)}</div></div>` : "";
    return html`<section class="system glass">
      <div class="sysbar">
        <span class="bubble sm ${healthy ? "accent" : "bad"}">${icon(healthy ? mdiShieldCheckOutline : mdiShieldAlertOutline, "")}</span>
        <span class="grow sysline">${coreDown ? html`<b class="bad">Hisho Core isn't answering</b>` : html`<b>${up ?? "–"} of ${total}</b> machines up${
          asleep ? html` <span class="muted">(${asleep} parked)</span>` : ""}${faulted ? html`, <b class="bad">${faulted} faulted</b>` : ""} ·
          Sync ${syncBad ? html`<b class="bad">has a problem</b>` : "OK"}${conflicts ? ` · ${conflicts} conflict files` : ""}${
          problems ? html` · <b class="warnc">${problems} need${problems === 1 ? "s" : ""} a look</b>` : ""}${
          running ? ` · ${running} job${running > 1 ? "s" : ""} running` : ""}`}</span>
        ${fleetMaint ? html`<button class="act ${maintOn ? "brown" : ""}" @click=${() => toggle(this, hass, fleetMaint, !maintOn, maintOn ? undefined
          : "Put the whole fleet in maintenance? Alerts, auto-park and jobs are held.")}>${icon(mdiWrenchOutline, "")}${
          maintOn ? "End fleet maintenance" : "Fleet maintenance"}</button>` : ""}
        <button class="more" @click=${() => navigate("machines")}>Machines ${icon(mdiArrowRight, "")}</button>
      </div>
      <div class="sysgrid">${group("Machines", machines)}${group("Devices", boxes)}${group("Add-ons", addons)}</div>
      ${chosen ? html`<div class="drawer">
        <button class="close" title="Close" @click=${() => (this.selected = undefined)}>${icon(mdiClose, "")}</button>
        ${chosen.kind === "machine"
          ? html`<hisho-machine-card .hass=${hass} .config=${{ type: "custom:hisho-machine-card", machine: chosen.name, embedded: true }}></hisho-machine-card>`
          : html`<hisho-device-card .hass=${hass} .config=${{ type: "custom:hisho-device-card", device: chosen.name, embedded: true }}></hisho-device-card>`}
      </div>` : ""}
    </section>`;
  }

  /** One plain sentence about your day, most important first. */
  private summary(coreDown: boolean, open: number, critical: number, todo: number, working: number, projects: number): string {
    if (coreDown) return "Hisho Core isn't answering Home Assistant, so what you see here may be out of date.";
    const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`;
    const parts: string[] = [];
    const rest = open - critical;
    if (critical) parts.push(rest ? `${plural(critical, "urgent thing")} and ${rest} more need you` : `${plural(critical, "urgent thing")} needs you`);
    else if (open) parts.push(`${plural(open, "thing")} need${open === 1 ? "s" : ""} your answer`);
    if (projects) parts.push(`${plural(projects, "project")} waiting on you`);
    if (todo) parts.push(`${plural(todo, "to-do")} left today`);
    const lead = parts.length ? parts.join(", ").replace(/^\w/, (c) => c.toUpperCase()) + "." : "Nothing needs you right now.";
    return working ? `${lead} Hisho is working on ${plural(working, "thing")} for you.` : lead;
  }
}

