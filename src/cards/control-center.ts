// hisho-control-center-card: Hisho's Overview in one card, made for a full-width (panel) view, the way
// Hisho's own dashboard does it: the most important things first, details one tap away.
//   a strip of stats (Core, machines, needs you, jobs, sync, fleet maintenance)
//   machines as compact tiles in a grid | needs you and jobs beside them (above them on a phone)
import { css, html, type CSSResultGroup } from "lit";
import { HishoCard } from "../base";
import { available, byKind, entity, entityId, hub } from "../model";
import { moreInfo } from "../actions";
import { cardStyles } from "../styles";
import { fleetMaintSwitch, machineTile, type TileHost } from "./fleet-card";

export class HishoControlCenterCard extends HishoCard implements TileHost {
  static properties = { ...HishoCard.properties, expanded: { state: true } };
  declare expanded: Set<string>;

  static styles: CSSResultGroup = [cardStyles, css`
    ha-card { padding: 14px 16px 16px; }
    .brand { font-size: 1.3em; font-weight: 700; letter-spacing: 0.01em; }
    .brand .kanji { font-weight: 600; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(104px, 1fr)); gap: 8px; margin-bottom: 14px; }
    .stat {
      border: 1px solid var(--hisho-line); border-radius: var(--hisho-radius); padding: 8px 10px; min-width: 0;
      display: flex; flex-direction: column; gap: 2px; cursor: pointer; border-top: 3px solid var(--stripe, var(--hisho-line));
    }
    .stat.ok { --stripe: var(--hisho-ok); } .stat.warn { --stripe: var(--hisho-warn); }
    .stat.bad { --stripe: var(--hisho-crit); } .stat.decide { --stripe: var(--hisho-decide); }
    .stat .v { font-size: 1.35em; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.2; }
    .stat .l { font-size: 0.74em; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.06em; }
    .stat .s { font-size: 0.8em; color: var(--secondary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .body { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(320px, 1fr); gap: 16px; align-items: start; }
    .side { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
    .side > * { border: 1px solid var(--hisho-line); border-radius: var(--hisho-radius); padding: 10px 12px; }
    .machines .grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
    @container (max-width: 820px) {
      .body { grid-template-columns: 1fr; }
      .side { order: -1; }
    }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-control-center-card" };
  }

  constructor() {
    super();
    this.expanded = new Set();
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
    const jobs: any[] = entity(hass, h, "jobs_active")?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const syncProblem = entity(hass, h, "sync_problem");
    const conflicts = entity(hass, h, "sync_conflicts");
    const fleetMaint = entityId(h, "fleet_maintenance");
    const maintOn = fleetMaint ? hass.states[fleetMaint]?.state === "on" : false;
    const nOnline = available(online) ? Number(online.state) : undefined;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const stat = (tone: string, value: unknown, label: string, sub: string, id?: string) => html`
      <div class="stat ${tone}" @click=${() => id && moreInfo(this, id)}>
        <span class="l">${label}</span><span class="v">${value}</span><span class="s">${sub}</span></div>`;
    const open = alerts.length;
    return this.frame(html`
      <div class="head">
        <div class="brand">${this.config.title ?? html`<span class="kanji">秘書</span> Hisho`}</div>
        <div class="row">${maintOn ? html`<span class="chip decide">fleet in maintenance</span>` : ""}
          ${fleetMaint ? fleetMaintSwitch(this, fleetMaint) : ""}</div>
      </div>
      <div class="stats">
        ${stat(reach?.state === "off" ? "bad" : "ok", reach?.state === "off" ? "Down" : "Up", "Hisho Core",
          reach?.state === "off" ? "Unreachable from Home Assistant" : "Answering", reach?.entity_id)}
        ${stat(nFaulted ? "bad" : nOnline === machines.length ? "ok" : "", nOnline !== undefined ? `${nOnline}/${machines.length}` : "–",
          "Machines online", nFaulted ? `${nFaulted} faulted` : machines.length - (nOnline ?? 0) ? `${machines.length - (nOnline ?? 0)} parked or off` : "All up", online?.entity_id)}
        ${stat(critical ? "bad" : open ? "warn" : "ok", open, "Needs you",
          critical ? `${critical} critical` : decide ? `${decide} to decide` : open ? "Nothing critical" : "All clear", needs?.entity_id)}
        ${stat(failed ? "bad" : running ? "decide" : "ok", running, "Jobs running", failed ? `${failed} failed` : `${jobs.length} recent`,
          entityId(h, "jobs_active"))}
        ${stat(syncProblem?.state === "on" ? "bad" : "ok", syncProblem?.state === "on" ? "Problem" : "OK", "Sync",
          available(conflicts) && Number(conflicts.state) ? `${conflicts.state} conflict files` : "In sync", syncProblem?.entity_id)}
      </div>
      <div class="body">
        <div class="machines">
          <div class="eyebrow">Machines</div>
          <div class="grid">${machines.map((m) => machineTile(this, m))}</div>
        </div>
        <div class="side">
          <hisho-needs-you-card .hass=${hass} .config=${{ type: "custom:hisho-needs-you-card", embedded: true, compact: true,
            limit: this.config.needs_you_limit ?? 6 }}></hisho-needs-you-card>
          <hisho-jobs-card .hass=${hass} .config=${{ type: "custom:hisho-jobs-card", embedded: true,
            limit: this.config.jobs_limit ?? 5 }}></hisho-jobs-card>
        </div>
      </div>
    `);
  }
}
