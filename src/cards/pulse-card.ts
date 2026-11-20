// hisho-pulse-card: the fleet's pulse for the Machines page: machines online, needs you, jobs and sync conflicts,
// each a big number with its last 24 hours drawn under it (HA's recorder).
import { css, html, type CSSResultGroup } from "lit";
import { mdiBellRingOutline, mdiCheckDecagramOutline, mdiCogSyncOutline, mdiFileAlertOutline, mdiServerNetwork } from "@mdi/js";
import { HishoCard } from "../base";
import { available, byKind, entity, entityId, hub, type HishoDevice } from "../model";
import { moreInfo } from "../actions";
import { cardStyles, pct } from "../styles";
import { shortName } from "./fleet-card";
import { icon } from "../ui";
import "../spark";

export class HishoPulseCard extends HishoCard {
  static styles: CSSResultGroup = [cardStyles, css`
    ha-card { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0; }
    .live { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    .lt { position: relative; overflow: hidden; padding: 16px 18px 0; cursor: pointer; display: flex; flex-direction: column;
      min-height: 132px; transition: transform 0.15s, border-color 0.15s;
      background: var(--hisho-glass); border: none; border-top: 1px solid var(--hisho-line); border-radius: 0;
      backdrop-filter: none;
      box-shadow: none; }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-family: var(--hisho-serif); font-size: 2.6em; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
    .lt .lv small { font-size: 0.42em; color: var(--hisho-text-2); margin-left: 3px; font-weight: 400; }
    .lt .ll { margin-top: 6px; font-size: 0.86em; font-weight: 500; }
    .lt .ls { font-size: 0.76em; color: var(--hisho-text-2); }
    .lt .bubble { width: 34px; height: 34px; } .lt .bubble svg { width: 19px; height: 19px; }
    .lt hisho-spark { margin: auto -18px 0; height: 44px; }
    .lt.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }
    @container (max-width: 760px) { .live { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-pulse-card" };
  }

  getGridOptions(): { columns: number | "full"; min_columns: number } {
    return { columns: "full", min_columns: 6 };
  }

  protected body() {
    const hass = this.hass;
    const h = hub(hass);
    const machines = byKind(hass, "machine");
    const online = entity(hass, h, "machines_online");
    const faulted = entity(hass, h, "machines_faulted");
    const needs = entity(hass, h, "needs_you_count");
    const alerts: any[] = needs?.attributes.alerts ?? [];
    const critical = alerts.filter((a) => a.severity === "critical").length;
    const jobs: any[] = entity(hass, h, "jobs_active")?.attributes.jobs ?? [];
    const running = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).length;
    const failed = jobs.filter((j) => j.status === "failed").length;
    const conflicts = entity(hass, h, "sync_conflicts");
    const nOnline = available(online) ? Number(online.state) : undefined;
    const nFaulted = available(faulted) ? Number(faulted.state) : 0;
    const nConflicts = available(conflicts) ? Number(conflicts.state) || 0 : undefined;
    const tile = (tone: string, value: unknown, of: string, label: string, sub: string, path: string, id?: string,
                  spark = "var(--hisho-accent-text)", max?: number) => html`
      <div class="lt ${tone}" @click=${() => id && moreInfo(this, id)}>
        <div class="top"><div><div class="lv">${value}${of ? html`<small>${of}</small>` : ""}</div>
          <div class="ll">${label}</div><div class="ls">${sub}</div></div>
          <span class="bubble ${tone === "ok" ? "accent" : tone || "brown"}">${icon(path, "")}</span></div>
        ${id ? html`<hisho-spark .hass=${hass} .entity=${id} .min=${0} .max=${max}
          .tone=${tone === "bad" ? "var(--hisho-crit)" : spark}></hisho-spark>` : ""}
      </div>`;
    return this.frame(html`<div class="live">
      ${tile(nFaulted ? "bad" : nOnline === machines.length ? "ok" : "", nOnline ?? "–", `/${machines.length}`, "Machines online",
        nFaulted ? `${nFaulted} faulted` : machines.length - (nOnline ?? 0) ? `${machines.length - (nOnline ?? 0)} parked or off` : "All up",
        mdiServerNetwork, online?.entity_id, undefined, machines.length)}
      ${tile(critical ? "bad" : alerts.length ? "warn" : "ok", alerts.length, "", "Needs you",
        critical ? `${critical} critical` : alerts.length ? "Nothing critical" : "All clear",
        mdiBellRingOutline, needs?.entity_id, "var(--hisho-brown-text)")}
      ${tile(failed ? "warn" : "ok", running, "", "Jobs running", failed ? `${failed} failed` : `${jobs.length} recent`,
        mdiCogSyncOutline, entityId(h, "jobs_active"))}
      ${tile(nConflicts ? "warn" : "ok", nConflicts ?? "–", "", "Sync conflicts", nConflicts ? "Files to sort out" : "None",
        nConflicts ? mdiFileAlertOutline : mdiCheckDecagramOutline, conflicts?.entity_id, "var(--hisho-brown-text)")}
    </div>`);
  }
}

/** hisho-load-card: how loaded the running machines are, as the brief's thin lines: a label, the number, a hairline
 *  filled to it (amber from 80%, red from 95%). The GPU on a GPU machine, else memory; the busiest first.
 *    type: custom:hisho-load-card
 *    limit: 4            # lines shown (default 4) */
export class HishoLoadCard extends HishoCard {
  static styles: CSSResultGroup = [cardStyles, css`
    .ln { padding: 7px 0 0; cursor: pointer; }
    .ln .top { display: flex; justify-content: space-between; gap: 10px; font-size: 0.95em; color: var(--hisho-text-2); }
    .ln .v { font-family: var(--hisho-mono); color: var(--hisho-text); }
    .ln .bar { position: relative; height: 1px; margin: 8px 0 6px; background: var(--hisho-line); }
    .ln .bar span { position: absolute; left: 0; top: -1px; height: 2px; background: var(--hisho-text); }
    .ln.warn .bar span { background: var(--hisho-warn); } .ln.bad .bar span { background: var(--hisho-crit); }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-load-card" };
  }

  protected body() {
    const hass = this.hass;
    const lines: [HishoDevice, string, number, string][] = [];
    for (const m of byKind(hass, "machine")) {
      if (entity(hass, m, "online")?.state !== "on") continue;
      for (const [key, label] of (/gpu/i.test(m.model) ? [["gpu_usage", "GPU"], ["memory_usage", "memory"]] : [["memory_usage", "memory"]])) {
        const s = entity(hass, m, key), v = pct(s?.state);
        if (s && v !== undefined) { lines.push([m, label, v, s.entity_id]); break; }
      }
    }
    lines.sort((a, b) => b[2] - a[2]);
    const shown = lines.slice(0, this.config.limit ?? 4);
    return this.frame(html`${this.heading("Load")}
      ${shown.length ? shown.map(([m, label, v, id]) => html`<div class="ln ${v >= 95 ? "bad" : v >= 80 ? "warn" : ""}"
          @click=${() => moreInfo(this, id)}>
        <div class="top"><span>${shortName(m.name)} ${label}</span><span class="v">${Math.round(v)}%</span></div>
        <div class="bar"><span style="width:${v}%"></span></div></div>`)
      : html`<div class="empty">No running machine reports its load.</div>`}`);
  }
}
