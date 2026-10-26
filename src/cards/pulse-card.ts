// hisho-pulse-card: the fleet's pulse for the Machines page: machines online, needs you, jobs and sync conflicts,
// each a big number with its last 24 hours drawn under it (HA's recorder).
import { css, html, type CSSResultGroup } from "lit";
import { mdiBellRingOutline, mdiCheckDecagramOutline, mdiCogSyncOutline, mdiFileAlertOutline, mdiServerNetwork } from "@mdi/js";
import { HishoCard } from "../base";
import { available, byKind, entity, entityId, hub } from "../model";
import { moreInfo } from "../actions";
import { cardStyles } from "../styles";
import { icon } from "../ui";
import "../spark";

export class HishoPulseCard extends HishoCard {
  static styles: CSSResultGroup = [cardStyles, css`
    ha-card { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0; }
    .live { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    .lt { position: relative; overflow: hidden; padding: 16px 18px 0; cursor: pointer; display: flex; flex-direction: column;
      min-height: 132px; transition: transform 0.15s, border-color 0.15s;
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-size: 2.6em; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
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
