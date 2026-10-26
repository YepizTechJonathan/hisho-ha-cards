// hisho-control-center-card: Hisho's Overview in one card, made for a full-width (panel) view: the most important
// things first, details one tap away. It sits straight on the dashboard's picture; its panels are dark glass.
//   a greeting with the day, the time and one sentence on how things are
//   status badges (Core, sync, projects waiting, fleet maintenance)
//   four live tiles (machines online, needs you, jobs, sync conflicts) with their last 24 hours
//   machines as tiles | needs you and jobs beside them (above them on a phone)
import { css, html, type CSSResultGroup, type TemplateResult } from "lit";
import {
  mdiAccountClockOutline, mdiCheckDecagramOutline, mdiArrowRight, mdiBellRingOutline, mdiCogSyncOutline, mdiServerNetwork,
  mdiSync, mdiSyncAlert, mdiWrenchOutline, mdiCloudCheckOutline, mdiCloudOffOutline, mdiFileAlertOutline,
} from "@mdi/js";
import { HishoCard } from "../base";
import { available, byKind, entity, entityId, hub } from "../model";
import { moreInfo, toggle } from "../actions";
import { cardStyles } from "../styles";
import { greeting, icon, localParts, navigate } from "../ui";
import { machineTile, type TileHost } from "./fleet-card";
import { KANJI } from "../icons";
import "../spark";

export class HishoControlCenterCard extends HishoCard implements TileHost {
  static properties = { ...HishoCard.properties, expanded: { state: true } };
  declare expanded: Set<string>;
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

    .hero { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin: 4px 0 22px; }
    .when { font-size: 0.8em; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hisho-brown-text); font-weight: 600; }
    h1 { margin: 6px 0 6px; font-size: clamp(1.7em, 4.2vw, 2.9em); font-weight: 300; letter-spacing: -0.01em; line-height: 1.1;
      text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45); }
    .summary { margin: 0; color: var(--hisho-text); opacity: 0.86; font-size: 1.02em; max-width: 60ch; line-height: 1.45; }
    .seal { display: flex; align-items: center; gap: 12px; padding: 10px 16px 10px 10px; flex: none; }
    .seal .bubble { width: 46px; height: 46px; }
    .seal .bubble svg { width: 26px; height: 26px; }
    .seal b { display: block; font-size: 1.05em; }
    .seal small { color: var(--hisho-text-2); font-size: 0.82em; }

    .badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
    .badge {
      font: inherit; color: inherit; display: inline-flex; align-items: center; gap: 9px; padding: 6px 14px 6px 6px;
      border-radius: 999px; cursor: pointer; text-align: left;
    }
    .badge:hover { background: rgba(30, 40, 32, 0.75); }
    .badge b { display: block; font-size: 0.8em; font-weight: 600; }
    .badge small { display: block; font-size: 0.74em; color: var(--hisho-text-2); }
    .badge.on { border-color: color-mix(in srgb, var(--hisho-brown-text) 60%, transparent); }

    .live { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 18px; }
    .lt { position: relative; overflow: hidden; padding: 16px 18px 0; cursor: pointer; display: flex; flex-direction: column;
      min-height: 132px; transition: transform 0.15s, border-color 0.15s; }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-size: 2.6em; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
    .lt .lv small { font-size: 0.42em; color: var(--hisho-text-2); margin-left: 3px; font-weight: 400; }
    .lt .ll { margin-top: 6px; font-size: 0.86em; font-weight: 500; }
    .lt .ls { font-size: 0.76em; color: var(--hisho-text-2); }
    .lt .bubble { width: 34px; height: 34px; } .lt .bubble svg { width: 19px; height: 19px; }
    .lt hisho-spark { margin: auto -18px 0; height: 44px; }
    .lt.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }

    .body { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(330px, 1fr); gap: 18px; align-items: start; }
    .panel { padding: 16px 18px 18px; min-width: 0; }
    .side { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
    .machines .grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px; }

    @container (max-width: 980px) { .live { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @container (max-width: 860px) {
      .body { grid-template-columns: 1fr; }
      .side { order: -1; }
      .seal { display: none; }
    }
    @container (max-width: 420px) { .lt .lv { font-size: 2.1em; } .badge small { display: none; } }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-control-center-card" };
  }

  constructor() {
    super();
    this.expanded = new Set();
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

  flip(id: string) {
    const next = new Set(this.expanded);
    if (!next.delete(id)) next.add(id);
    this.expanded = next;
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
    const decide = alerts.filter((a) => a.severity === "decision").length;
    const jobsEnt = entity(hass, h, "jobs_active");
    const jobs: any[] = jobsEnt?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const syncProblem = entity(hass, h, "sync_problem");
    const conflicts = entity(hass, h, "sync_conflicts");
    const waiting = entity(hass, h, "projects_waiting");
    const fleetMaint = entityId(h, "fleet_maintenance");
    const maintOn = fleetMaint ? hass.states[fleetMaint]?.state === "on" : false;
    const coreDown = reach?.state === "off";
    const nOnline = available(online) ? Number(online.state) : undefined;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const nConflicts = available(conflicts) ? Number(conflicts.state) || 0 : undefined;
    const open = alerts.length;
    const syncBad = syncProblem?.state === "on";
    const { time, date } = localParts(hass);

    const live = (tone: string, value: unknown, of: string, label: string, sub: string, path: string, id?: string,
                  spark = "var(--hisho-accent-text)", max?: number) => html`
      <div class="lt glass ${tone}" @click=${() => id && moreInfo(this, id)}>
        <div class="top"><div><div class="lv">${value}${of ? html`<small>${of}</small>` : ""}</div>
          <div class="ll">${label}</div><div class="ls">${sub}</div></div>
          <span class="bubble ${tone === "ok" ? "accent" : tone || "brown"}">${icon(path, "")}</span></div>
        ${id ? html`<hisho-spark .hass=${hass} .entity=${id} .min=${0} .max=${max} .tone=${tone === "bad" ? "var(--hisho-crit)" : spark}></hisho-spark>` : ""}
      </div>`;
    const badge = (tone: string, path: string, label: string, sub: string, click: () => void, extra = "") => html`
      <button class="badge glass ${extra}" @click=${click}>
        <span class="bubble sm ${tone}">${icon(path, "")}</span><span><b>${label}</b><small>${sub}</small></span></button>`;

    return this.frame(html`
      <div class="hero">
        <div>
          <div class="when">${date} · ${time}</div>
          <h1>${this.config.title ?? greeting(hass)}</h1>
          <p class="summary">${this.summary(coreDown, nOnline, machines.length, nFaulted, open, critical, running, failed, syncBad)}</p>
        </div>
        <div class="seal glass">
          <span class="bubble ${coreDown ? "bad" : "accent"}">${icon(KANJI, "")}</span>
          <span><b>Hisho</b><small>${coreDown ? "Core unreachable" : "Core answering"}</small></span>
        </div>
      </div>

      <div class="badges">
        ${badge(coreDown ? "bad" : "accent", coreDown ? mdiCloudOffOutline : mdiCloudCheckOutline, "Hisho Core",
          coreDown ? "Unreachable" : "Up", () => reach && moreInfo(this, reach.entity_id))}
        ${badge(syncBad ? "bad" : "accent", syncBad ? mdiSyncAlert : mdiSync, "Sync",
          syncBad ? "Problem" : "In sync", () => syncProblem && moreInfo(this, syncProblem.entity_id))}
        ${available(waiting) ? badge(Number(waiting.state) ? "brown" : "accent", mdiAccountClockOutline, "Projects",
          Number(waiting.state) ? `${waiting.state} waiting on you` : "Nothing waiting", () => navigate("projects")) : ""}
        ${fleetMaint ? badge(maintOn ? "brown" : "off", mdiWrenchOutline, "Fleet maintenance", maintOn ? "On: alerts held" : "Off",
          () => toggle(this, hass, fleetMaint, !maintOn, maintOn ? undefined
            : "Put the whole fleet in maintenance? Alerts, auto-park and jobs are held."), maintOn ? "on" : "") : ""}
      </div>

      <div class="live">
        ${live(nFaulted ? "bad" : nOnline === machines.length ? "ok" : "", nOnline ?? "–", `/${machines.length}`, "Machines online",
          nFaulted ? `${nFaulted} faulted` : machines.length - (nOnline ?? 0) ? `${machines.length - (nOnline ?? 0)} parked or off` : "All up",
          mdiServerNetwork, online?.entity_id, undefined, machines.length)}
        ${live(critical ? "bad" : open ? "warn" : "ok", open, "", "Needs you",
          critical ? `${critical} critical` : decide ? `${decide} to decide` : open ? "Nothing critical" : "All clear",
          mdiBellRingOutline, needs?.entity_id, "var(--hisho-brown-text)")}
        ${live(failed ? "warn" : "ok", running, "", "Jobs running", failed ? `${failed} failed` : `${jobs.length} recent`,
          mdiCogSyncOutline, jobsEnt?.entity_id)}
        ${live(nConflicts ? "warn" : "ok", nConflicts ?? "–", "", "Sync conflicts", nConflicts ? "Files to sort out" : "None",
          nConflicts ? mdiFileAlertOutline : mdiCheckDecagramOutline, conflicts?.entity_id, "var(--hisho-brown-text)")}
      </div>

      <div class="body">
        <section class="panel glass machines">
          <div class="head"><span class="title">Machines</span>
            <button class="more" @click=${() => navigate("machines")}>All machines ${icon(mdiArrowRight, "")}</button></div>
          <div class="grid">${machines.map((m) => machineTile(this, m))}</div>
        </section>
        <div class="side">
          <section class="panel glass">
            <hisho-needs-you-card .hass=${hass} .config=${{ type: "custom:hisho-needs-you-card", embedded: true, compact: true,
              limit: this.config.needs_you_limit ?? 6 }}></hisho-needs-you-card>
          </section>
          <section class="panel glass">
            <hisho-jobs-card .hass=${hass} .config=${{ type: "custom:hisho-jobs-card", embedded: true,
              limit: this.config.jobs_limit ?? 5 }}></hisho-jobs-card>
          </section>
        </div>
      </div>
    `);
  }

  /** One plain sentence on how things are, most important first. */
  private summary(coreDown: boolean, up: number | undefined, total: number, faulted: number, open: number, critical: number,
                  running: number, failed: number, syncBad: boolean): TemplateResult | string {
    if (coreDown) return "Hisho Core isn't answering Home Assistant, so what you see here may be out of date.";
    const parts: string[] = [];
    if (up !== undefined) parts.push(faulted ? `${faulted} machine${faulted > 1 ? "s" : ""} faulted` : `${up} of ${total} machines are up`);
    parts.push(critical ? `${open} thing${open > 1 ? "s" : ""} need${open > 1 ? "" : "s"} you (${critical} critical)`
      : open ? `${open} thing${open > 1 ? "s" : ""} need${open > 1 ? "" : "s"} you` : "nothing needs you");
    if (running) parts.push(`${running} job${running > 1 ? "s" : ""} running`);
    if (failed) parts.push(`${failed} failed`);
    if (syncBad) parts.push("sync has a problem");
    const text = parts.join(", ");
    return text.charAt(0).toUpperCase() + text.slice(1) + ".";
  }
}

