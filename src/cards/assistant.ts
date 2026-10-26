// What Hisho does for you, for the Overview: your day (Today's to-dos and what's coming due), what Hisho is working
// on, what it finished for you, and a box to ask it anything. The system itself is secondary (a line at the bottom).
import { LitElement, html, type PropertyValues, type TemplateResult } from "lit";
import {
  mdiArrowUp, mdiCalendarClock, mdiCheckCircleOutline, mdiCogSyncOutline, mdiFolderAccountOutline, mdiPlus,
  mdiProgressClock, mdiTimerSandEmpty,
} from "@mdi/js";
import type { HomeAssistant } from "../hass";
import { byKind, entity, entityId, hub } from "../model";
import { cardStyles } from "../styles";
import { icon } from "../ui";
import { KANJI } from "../icons";

interface TodoItem { uid: string; summary: string; status: "needs_action" | "completed" }
interface DueEvent { summary: string; start: { date?: string; dateTime?: string }; description?: string }

const VERB: Record<string, string> = {
  transcribe: "Transcribing", install: "Installing", build: "Building", deploy: "Deploying", investigate: "Looking into",
  backup: "Backing up", sync: "Syncing", test: "Testing", update: "Updating", upgrade: "Upgrading",
};

const DONE: Record<string, string> = {
  transcribe: "Transcribed", install: "Installed", build: "Built", deploy: "Deployed", investigate: "Looked into",
  backup: "Backed up", sync: "Synced", test: "Tested", update: "Updated", upgrade: "Upgraded",
};

/** A worker's name as HA shows the machine ("hashira-ren" -> "Hashira Ren"). */
function workerName(hass: HomeAssistant | undefined, worker: string): string {
  const m = hass ? byKind(hass, "machine").find((d) => entity(hass, d, "machine_state")?.attributes.machine === worker
    || d.name.toLowerCase() === worker.toLowerCase()) : undefined;
  return m?.name ?? worker.replace(/(^|-)(\w)/g, (_, dash, c) => (dash ? " " : "") + c.toUpperCase());
}

/** A job in plain words: "Transcribing on Souko" (or, done: "Transcribed on Souko"). */
export function jobWords(j: any, done = false, hass?: HomeAssistant): string {
  const kind = String(j.kind ?? "job");
  const verb = (done ? DONE[kind] ?? `Finished ${kind}` : VERB[kind]) ?? kind.replace(/^\w/, (c) => c.toUpperCase());
  return j.worker ? `${verb} on ${workerName(hass, String(j.worker))}` : verb;
}

/** "2 h ago", "just now": how long ago an ISO time was. */
export function ago(iso: string | undefined, now = Date.now()): string {
  const t = iso ? Date.parse(iso) : NaN;
  if (!Number.isFinite(t)) return "";
  const min = Math.round((now - t) / 60_000);
  if (min < 2) return "just now";
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  return h < 24 ? `${h} h ago` : `${Math.round(h / 24)} d ago`;
}

/** "Today", "Tomorrow", "Thu Oct 29": a due date, the way you'd say it. */
export function dueWords(day: string, now = new Date()): string {
  const [y, m, d] = day.slice(0, 10).split("-").map(Number);
  const due = new Date(y, m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((due.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return days === -1 ? "Yesterday" : `${-days} days late`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return due.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/** What Hisho is doing right now: live jobs, and projects where the next move is Hisho's (or Claude's). */
export function workingOn(hass: HomeAssistant): { what: string; sub: string; path: string; tone: string }[] {
  const h = hub(hass);
  const jobs: any[] = entity(hass, h, "jobs_active")?.attributes.jobs ?? [];
  const projects: any[] = entity(hass, h, "projects_active")?.attributes.projects ?? [];
  const live = jobs.filter((j) => ["queued", "routed", "running"].includes(j.status)).map((j) => ({
    what: jobWords(j, false, hass), sub: j.status === "running" ? `started ${ago(j.updated_at)}`.trim() : "waiting its turn",
    path: j.status === "running" ? mdiCogSyncOutline : mdiTimerSandEmpty, tone: j.status === "running" ? "accent" : "off",
  }));
  const mine = projects.filter((p) => p.status === "active" && ["claude", "hisho"].includes(String(p.waiting_on ?? "").toLowerCase()))
    .map((p) => ({ what: p.title, sub: p.next ? `Next: ${p.next}` : "In progress", path: mdiFolderAccountOutline, tone: "brown" }));
  return [...live, ...mine];
}

/** What Hisho did for you in the last day: Core's feed (hisho-ha 1.7+), or else just the jobs it finished. */
export function doneForYou(hass: HomeAssistant, now = Date.now()): { what: string; when: string }[] {
  const feed = entity(hass, hub(hass), "done_for_you");
  if (feed && Array.isArray(feed.attributes.items)) {
    return feed.attributes.items.map((i: any) => ({ what: String(i.text), when: ago(i.at, now) }));
  }
  const jobs: any[] = entity(hass, hub(hass), "jobs_active")?.attributes.jobs ?? [];
  return jobs.filter((j) => j.status === "done" && now - Date.parse(j.updated_at ?? "") < 86_400_000)
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
    .map((j) => ({ what: jobWords(j, true, hass), when: ago(j.updated_at, now) }));
}

/** Projects whose next move is yours, with what they ask. */
export function waitingOnYou(hass: HomeAssistant): any[] {
  const projects: any[] = entity(hass, hub(hass), "projects_active")?.attributes.projects ?? [];
  return projects.filter((p) => p.status === "active" && (p.asks?.length
    || !["", "claude", "hisho"].includes(String(p.waiting_on ?? "").toLowerCase())));
}

/** hisho-day: Today's to-dos (tick them off, add one) and what's coming due in the next two weeks. */
export class HishoDay extends LitElement {
  static properties = { hass: { attribute: false }, items: { state: true }, due: { state: true }, adding: { state: true } };
  declare hass: HomeAssistant;
  declare items: TodoItem[];
  declare due: DueEvent[];
  declare adding: boolean;
  private seen?: string;
  static styles = cardStyles;

  constructor() {
    super();
    this.items = [];
    this.due = [];
    this.adding = false;
  }

  private ids() {
    const h = hub(this.hass);
    return { todo: entityId(h, "today"), cal: entityId(h, "due_dates") };
  }

  protected updated(changed: PropertyValues) {
    if (!changed.has("hass") || !this.hass) return;
    const { todo, cal } = this.ids();
    const stamp = [todo, cal].map((id) => (id ? `${this.hass.states[id]?.last_changed}|${this.hass.states[id]?.state}` : "")).join(";");
    if (stamp === this.seen) return;
    this.seen = stamp;
    if (todo) {
      this.hass.callWS<{ items: TodoItem[] }>({ type: "todo/item/list", entity_id: todo })
        .then((r) => (this.items = r.items ?? [])).catch(() => (this.items = []));
    }
    if (cal && this.hass.callApi) {
      const start = new Date(), end = new Date(Date.now() + 14 * 86_400_000);
      this.hass.callApi<DueEvent[]>("GET", `calendars/${cal}?start=${start.toISOString()}&end=${end.toISOString()}`)
        .then((r) => (this.due = r ?? [])).catch(() => (this.due = []));
    }
  }

  private tick(item: TodoItem) {
    const { todo } = this.ids();
    if (todo) void this.hass.callService("todo", "update_item", { item: item.uid, status: "completed" }, { entity_id: todo });
  }

  private add(e: Event) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input")!;
    const { todo } = this.ids();
    if (todo && input.value.trim()) void this.hass.callService("todo", "add_item", { item: input.value.trim() }, { entity_id: todo });
    input.value = "";
    this.adding = false;
  }

  render() {
    const open = this.items.filter((i) => i.status === "needs_action");
    const { todo } = this.ids();
    return html`
      <div class="head"><span class="title">Your day</span>
        ${todo ? html`<button class="more" @click=${() => (this.adding = !this.adding)}>${icon(mdiPlus, "")}Add</button>` : ""}</div>
      ${this.adding ? html`<form class="addrow" @submit=${this.add}><input placeholder="A new to-do for Today" autofocus />
        <button class="act primary" type="submit">Add</button></form>` : ""}
      ${open.length ? html`<ul class="todos">${open.map((i) => html`<li>
          <button class="tick" title="Done" @click=${() => this.tick(i)}></button><span>${i.summary}</span></li>`)}</ul>`
        : html`<div class="empty">${icon(mdiCheckCircleOutline, "")}Nothing left on today's list.</div>`}
      ${this.due.length ? html`<div class="eyebrow" style="margin-top:16px">Coming due</div>
        <ul class="dues">${this.due.slice(0, 4).map((d) => {
          const when = dueWords(d.start.date ?? d.start.dateTime ?? "");
          return html`<li><span class="bubble sm ${/late|Today/.test(when) ? "warn" : "brown"}">${icon(mdiCalendarClock, "")}</span>
            <span class="grow ellipsis">${d.summary}</span><span class="when">${when}</span></li>`;
        })}</ul>` : ""}`;
  }
}

/** hisho-ask: ask Hisho anything, right on the dashboard (the same Hisho as HA's Assist). */
export class HishoAsk extends LitElement {
  static properties = { hass: { attribute: false }, asked: { state: true }, answer: { state: true }, busy: { state: true } };
  declare hass: HomeAssistant;
  declare asked: string;
  declare answer: string;
  declare busy: boolean;
  private conversation?: string;
  static styles = cardStyles;

  constructor() {
    super();
    this.asked = "";
    this.answer = "";
    this.busy = false;
  }

  private async ask(e: Event) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input")!;
    const text = input.value.trim();
    const agent = entityId(hub(this.hass), "assistant");
    if (!text || !agent || this.busy) return;
    input.value = "";
    this.asked = text;
    this.answer = "";
    this.busy = true;
    try {
      const r = await this.hass.callWS<any>({ type: "conversation/process", text, agent_id: agent,
        conversation_id: this.conversation, language: "en" });
      this.conversation = r?.conversation_id ?? this.conversation;
      this.answer = r?.response?.speech?.plain?.speech ?? "Hisho didn't answer.";
    } catch (err: any) {
      this.answer = `I couldn't reach Hisho (${err?.message ?? "error"}).`;
    } finally {
      this.busy = false;
    }
  }

  render(): TemplateResult {
    if (!entityId(hub(this.hass), "assistant")) return html``;
    return html`
      <form class="ask" @submit=${this.ask}>
        <span class="bubble sm accent">${icon(KANJI, "")}</span>
        <input placeholder="Ask Hisho anything…" aria-label="Ask Hisho" />
        <button class="send" type="submit" title="Ask" ?disabled=${this.busy}>${icon(mdiArrowUp, "")}</button>
      </form>
      ${this.asked ? html`<div class="answer"><div class="q">${this.asked}</div>
        <div class="a">${this.busy ? html`<span class="thinking">${icon(mdiProgressClock, "")}Thinking…</span>` : this.answer}</div></div>` : ""}`;
  }
}

for (const [tag, cls] of [["hisho-day", HishoDay], ["hisho-ask", HishoAsk]] as const) {
  if (!customElements.get(tag)) customElements.define(tag, cls);
}
