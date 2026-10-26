// hisho-jobs-card and hisho-projects-card: Hisho's jobs and projects, with what the dashboard lets you do.
import { html } from "lit";
import { HishoCard } from "../base";
import { allowed, entity, hub } from "../model";
import { runAction } from "../actions";
import { stateClass } from "../styles";
import { icon } from "../ui";
import { mdiAlertCircleOutline, mdiCheckCircleOutline, mdiCogOutline, mdiCogSyncOutline, mdiTimerSandEmpty } from "@mdi/js";

const JOB_ICON: Record<string, string> = {
  running: mdiCogSyncOutline, queued: mdiTimerSandEmpty, routed: mdiTimerSandEmpty, failed: mdiAlertCircleOutline,
  done: mdiCheckCircleOutline,
};

export class HishoJobsCard extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-jobs-card" };
  }

  protected body() {
    const hass = this.hass;
    const jobs: any[] = entity(hass, hub(hass), "jobs_active")?.attributes.jobs ?? [];
    const can = allowed(hass);
    const limit = this.config.limit ?? 10;
    return this.frame(html`
      <div class="head">${this.heading("Jobs")}
        ${can.has("jobs.reap") ? html`<button class="act" @click=${() => runAction(this, hass, "jobs.reap")}>Fail stuck jobs</button>` : ""}</div>
      ${jobs.length ? "" : html`<div class="empty">${icon(mdiCheckCircleOutline, "")}No jobs.</div>`}
      <ul class="list">${jobs.slice(0, limit).map((j) => {
        const live = ["queued", "routed", "running"].includes(j.status);
        const tone = stateClass(j.status);
        return html`<li class="item bubbled ${tone}">
          <span class="bubble sm ${tone === "ok" ? "accent" : tone}">${icon(JOB_ICON[j.status] ?? mdiCogOutline, "")}</span>
          <div class="bodycol">
          <div class="row spread"><span class="ellipsis">${j.kind}${j.worker ? html` <span class="muted">on ${j.worker}</span>` : ""}</span>
            <span class="row" style="flex-wrap:nowrap">
            ${live && can.has("job.cancel") ? html`<button class="act danger" @click=${() =>
              runAction(this, hass, "job.cancel", j.id, {}, `Cancel this ${j.kind} job?`)}>Cancel</button>` : ""}
            ${j.status === "failed" && can.has("job.retry") ? html`<button class="act" @click=${() =>
              runAction(this, hass, "job.retry", j.id)}>Retry</button>` : ""}
            ${!live && can.has("job.clear") ? html`<button class="act" @click=${() =>
              runAction(this, hass, "job.clear", j.id)}>Clear</button>` : ""}
            <span class="chip ${stateClass(j.status)}">${j.status}</span></span></div>
          ${j.reason ? html`<div class="detail">${j.reason}</div>` : ""}
          </div>
        </li>`;
      })}</ul>
      ${jobs.length > limit ? html`<div class="muted" style="margin-top:6px">${jobs.length - limit} more on the Projects page</div>` : ""}
    `);
  }
}

export class HishoProjectsCard extends HishoCard {
  static getStubConfig() {
    return { type: "custom:hisho-projects-card" };
  }

  protected body() {
    const hass = this.hass;
    const all: any[] = entity(hass, hub(hass), "projects_active")?.attributes.projects ?? [];
    const can = allowed(hass);
    const waiting = (p: any) => !!(p.asks?.length) || !["", "claude", "hisho"].includes(String(p.waiting_on ?? "").toLowerCase());
    const shown = all.filter((p) => p.status === "active").sort((a, b) => Number(waiting(b)) - Number(waiting(a)));
    return this.frame(html`
      <div class="head">${this.heading("Projects")}<span class="muted">${shown.length} active</span></div>
      <ul class="list">${shown.slice(0, this.config.limit ?? 20).map((p) => html`<li>
        <div class="row spread"><span class="ellipsis">${p.title}${p.company ? html` <span class="muted">${p.company}</span>` : ""}</span>
          ${waiting(p) ? html`<span class="chip warn">waiting on you</span>` : ""}</div>
        ${p.asks?.length ? html`<div class="detail">${p.asks.join("\n")}</div>` : p.next ? html`<div class="detail">Next: ${p.next}</div>` : ""}
        <div class="row">
          ${can.has("project.open") ? html`<button class="act" @click=${() => runAction(this, hass, "project.open", p.name)}>Open</button>` : ""}
          ${can.has("project.archive") ? html`<button class="act danger" @click=${() =>
            runAction(this, hass, "project.archive", p.name, {}, `Archive ${p.title}? Nothing is deleted; it can be restored.`)}>Archive</button>` : ""}
        </div>
      </li>`)}</ul>
    `);
  }
}
