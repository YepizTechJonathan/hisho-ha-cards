// hisho-needs-you-card: Hisho's needs-you list, most urgent first, with Claude's finding and the answers
// Hisho's dashboard gives: acknowledge, snooze, investigate, send to the phone again.
import { html, type PropertyValues } from "lit";
import { HishoCard } from "../base";
import { allowed, entity, entityId, hub } from "../model";
import { runAction } from "../actions";
import { stateClass } from "../styles";

interface TodoItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
  description?: string;
}

const SEVERITY_CLASS: Record<string, string> = { critical: "bad", decision: "decide", warn: "warn", info: "off" };

export class HishoNeedsYouCard extends HishoCard {
  static properties = { ...HishoCard.properties, items: { state: true }, showDone: { state: true },
    expanded: { state: true }, showAll: { state: true } };
  declare items: TodoItem[];
  declare showDone: boolean;
  declare expanded: Set<string>;
  declare showAll: boolean;
  private seen?: string;

  static getStubConfig() {
    return { type: "custom:hisho-needs-you-card" };
  }

  constructor() {
    super();
    this.items = [];
    this.showDone = false;
    this.expanded = new Set();
    this.showAll = false;
  }

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    const todo = entityId(hub(this.hass), "needs_you");
    const stamp = todo ? this.hass.states[todo]?.last_changed + "|" + this.hass.states[todo]?.state : undefined;
    if (todo && stamp !== this.seen) {
      this.seen = stamp;
      this.hass
        .callWS<{ items: TodoItem[] }>({ type: "todo/item/list", entity_id: todo })
        .then((r) => (this.items = r.items ?? []))
        .catch(() => (this.items = []));
    }
  }

  protected body() {
    const hass = this.hass;
    const h = hub(hass);
    const open: any[] = entity(hass, h, "needs_you_count")?.attributes.alerts ?? [];
    const severity = new Map(open.map((a) => [a.id, a.severity]));
    const pairing = open.filter((a) => a.severity === "decision" && /asks to connect/.test(a.title));
    const todo = this.items.filter((i) => this.showDone || i.status === "needs_action");
    const done = this.items.filter((i) => i.status === "completed").length;
    const limit: number = this.config.limit ?? 50;
    const shown = this.showAll ? todo : todo.slice(0, limit);
    const can = allowed(hass);
    return this.frame(html`
      <div class="head">${this.heading("Needs you")}
        <span class="row">${todo.length ? html`<span class="chip ${open.some((a) => a.severity === "critical") ? "bad" : "warn"} num">${
          todo.filter((i) => i.status === "needs_action").length} open</span>` : ""}
        ${done ? html`<button class="act" @click=${() => (this.showDone = !this.showDone)}>
          ${this.showDone ? "Hide" : "Show"} ${done} acknowledged</button>` : ""}</span></div>
      ${pairing.map((p) => html`<div class="tile decide" style="margin-bottom:8px"><span class="row"><span class="chip decide">decide</span>
        <span>${p.title}</span></span><span class="muted">Approve it in Hisho's own Needs you (or the phone notification).</span></div>`)}
      ${todo.length ? "" : html`<div class="empty">Nothing needs you right now.</div>`}
      <ul class="list">${shown.map((i) => {
        const sev = severity.get(i.uid) ?? (i.description?.split(":")[0] || "").toLowerCase();
        const acked = i.status === "completed";
        const isOpen = !this.config.compact || this.expanded.has(i.uid);
        return html`<li class="item ${acked ? "off" : stateClass(sev === "warn" ? "warn" : sev)}">
          <div class="row spread" style="cursor:${this.config.compact ? "pointer" : "default"}" @click=${() => this.flip(i.uid)}>
            <span class="row grow" style="flex-wrap:nowrap"><span class="chip ${acked ? "off" : SEVERITY_CLASS[sev] ?? stateClass(sev)}">${acked ? "acknowledged" : sev || "alert"}</span>
              <span class=${this.config.compact && !isOpen ? "ellipsis" : ""}>${i.summary}</span></span>
            ${this.config.compact ? html`<span class="chev ${isOpen ? "open" : ""}">▶</span>` : ""}</div>
          ${isOpen && i.description ? html`<div class="detail">${i.description.replace(/^[A-Z]+:\s*/, "")}</div>` : ""}
          ${isOpen && can.has("alert.ack") ? html`<div class="row">
            ${acked
              ? html`<button class="act" @click=${() => this.alert(i.uid, "unack")}>Un-acknowledge</button>`
              : html`<button class="act" @click=${() => this.alert(i.uid, "ack")}>Acknowledge</button>
                     <button class="act" @click=${() => this.alert(i.uid, "snooze")}>Snooze 1 h</button>`}
            <button class="act" @click=${() => this.alert(i.uid, "investigate")}>Investigate</button>
            <button class="act" @click=${() => this.alert(i.uid, "notify")}>Send to phone</button>
          </div>` : ""}
        </li>`;
      })}</ul>
      ${todo.length > shown.length || this.showAll ? html`<button class="link" style="margin-top:6px;font-size:0.86em"
        @click=${() => (this.showAll = !this.showAll)}>${this.showAll ? "Show fewer" : `Show all ${todo.length}`}</button>` : ""}
    `);
  }

  private flip(uid: string) {
    if (!this.config.compact) return;
    const next = new Set(this.expanded);
    if (!next.delete(uid)) next.add(uid);
    this.expanded = next;
  }

  private alert(id: string, verb: string) {
    return runAction(this, this.hass, `alert.${verb}`, id, verb === "snooze" ? { hours: 1 } : {});
  }
}
