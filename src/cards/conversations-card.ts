// hisho-conversations-card: what people asked Hisho through Home Assistant (Assist, hisho.ask), newest first:
// who, the room, when (in Hisho's owner time zone), the first question. A tap opens the transcript; Delete asks
// first. Hisho keeps them 30 days. Read with the hisho integration's admin-only websocket commands (1.8.0).
import { html, type PropertyValues } from "lit";
import { HishoCard } from "../base";
import { hub } from "../model";
import { confirmDialog } from "../confirm";

interface Summary {
  session_id: string;
  title?: string;
  person?: string;
  area?: string;
  via?: string;
  admin?: boolean;
  updated?: string;
  started?: string;
  messages?: number;
}

interface Message {
  role: "user" | "assistant";
  text?: string;
  at?: string;
  area?: string;
  ok?: boolean;
  error?: string;
  model?: string;
  seconds?: number;
}

/** "Oct 28, 2:10 PM PDT" in the given zone (Hisho's owner's); the browser's own if the zone is unknown. */
export function when(iso: string | undefined, timeZone?: string | null): string {
  if (!iso) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    timeZoneName: "short" };
  try {
    return new Date(iso).toLocaleString("en-US", { ...opts, timeZone: timeZone || undefined });
  } catch {
    return new Date(iso).toLocaleString("en-US", opts);
  }
}

export class HishoConversationsCard extends HishoCard {
  static properties = { ...HishoCard.properties, list: { state: true }, open: { state: true },
    transcript: { state: true }, person: { state: true }, error: { state: true }, loading: { state: true } };
  declare list: Summary[];
  declare open: string | null;
  declare transcript: { session_id: string; messages: Message[] } | null;
  declare person: string;
  declare error: string;
  declare loading: boolean;
  private timezone: string | null = null;
  private keepDays = 30;
  private loaded = false;

  static getStubConfig() {
    return { type: "custom:hisho-conversations-card" };
  }

  constructor() {
    super();
    this.list = [];
    this.open = null;
    this.transcript = null;
    this.person = "";
    this.error = "";
    this.loading = false;
  }

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    // Once, when the card first has a Hisho to ask (no polling: Refresh asks again).
    if (!this.loaded && this.hass && hub(this.hass) && this.hass.user?.is_admin !== false) {
      this.loaded = true;
      this.load();
    }
  }

  private ws<T>(msg: Record<string, any>): Promise<T> {
    const entry = this.config.config_entry_id ? { config_entry_id: this.config.config_entry_id } : {};
    return this.hass.callWS<T>({ ...msg, ...entry });
  }

  async load() {
    this.loading = true;
    try {
      const r = await this.ws<{ conversations: Summary[]; timezone?: string | null; keep_days?: number }>(
        { type: "hisho/conversations/list", limit: this.config.limit ?? 200 });
      this.list = r.conversations ?? [];
      this.timezone = r.timezone ?? null;
      this.keepDays = r.keep_days ?? 30;
      this.error = "";
    } catch (err: any) {
      this.error = err?.code === "unauthorized" ? "Only Home Assistant administrators can see these."
        : `Couldn't load them: ${err?.message ?? err}`;
    } finally {
      this.loading = false;
    }
  }

  private async toggle(id: string) {
    if (this.open === id) {
      this.open = null;
      return;
    }
    this.open = id;
    this.transcript = null;
    try {
      this.transcript = await this.ws({ type: "hisho/conversations/get", conversation_id: id });
    } catch (err: any) {
      this.open = null;
      this.error = `Couldn't open it: ${err?.message ?? err}`;
    }
  }

  private async forget(c: Summary) {
    const who = c.person ? `${c.person}'s` : "this";
    if (!(await confirmDialog(this, `Delete ${who} conversation "${c.title ?? ""}"? It can't be brought back.`))) return;
    try {
      await this.ws({ type: "hisho/conversations/delete", conversation_id: c.session_id });
      this.list = this.list.filter((x) => x.session_id !== c.session_id);
      if (this.open === c.session_id) this.open = null;
    } catch (err: any) {
      this.error = `Couldn't delete it: ${err?.message ?? err}`;
    }
  }

  private source(c: { person?: string; area?: string; via?: string }): string {
    return [c.person ?? "someone", c.area].filter(Boolean).join(" · ") + (c.via === "service" ? " (automation)" : "");
  }

  private messages() {
    const t = this.transcript;
    if (!t) return html`<div class="empty">Loading…</div>`;
    return html`<div class="talk">${(t.messages ?? []).map((m) => m.role === "user"
      ? html`<div class="q"><span class="muted">${when(m.at, this.timezone)}${m.area ? ` · ${m.area}` : ""}</span>
          <div class="text">${m.text}</div></div>`
      : html`<div class="a ${m.ok === false ? "failed" : ""}"><div class="text">${m.text || m.error || "(no answer)"}</div>
          <span class="muted">${[m.model, m.seconds !== undefined ? `${m.seconds} s` : "",
            m.ok === false && m.error ? m.error : ""].filter(Boolean).join(" · ")}</span></div>`)}</div>`;
  }

  protected body() {
    const people = [...new Set(this.list.map((c) => c.person ?? "someone"))].sort();
    const shown = this.person ? this.list.filter((c) => (c.person ?? "someone") === this.person) : this.list;
    return this.frame(html`
      <style>
        .talk { display: flex; flex-direction: column; gap: 6px; padding: 4px 0 2px; }
        .talk .q, .talk .a { border-radius: var(--hisho-radius); padding: 6px 9px; max-width: 85%; }
        .talk .text { white-space: pre-wrap; }
        .talk .q { align-self: flex-end; background: color-mix(in srgb, var(--hisho-decide) 14%, transparent); }
        .talk .a { align-self: flex-start; background: var(--hisho-soft); }
        .talk .a.failed { border-left: 3px solid var(--hisho-crit); }
        .talk .muted { display: block; font-size: 0.76em; margin-top: 2px; }
        select { font: inherit; font-size: 0.86em; padding: 2px 6px; border-radius: 6px; border: 1px solid var(--hisho-line);
          background: var(--hisho-glass, transparent); color: var(--primary-text-color); }
        li .open { cursor: pointer; }
      </style>
      <div class="head">${this.heading("Conversations")}
        <span class="row" style="flex-wrap:nowrap">
          ${people.length > 1 ? html`<select aria-label="Person" @change=${(e: Event) =>
            (this.person = (e.target as HTMLSelectElement).value)}>
            <option value="">Everyone</option>
            ${people.map((p) => html`<option value=${p} ?selected=${p === this.person}>${p}</option>`)}</select>` : ""}
          <button class="act" ?disabled=${this.loading} @click=${() => this.load()}>Refresh</button></span></div>
      ${this.error ? html`<div class="detail" style="color:var(--hisho-crit)">${this.error}</div>` : ""}
      ${!shown.length && !this.loading && !this.error ? html`<div class="empty">
        No conversations with Hisho in the last ${this.keepDays} days.</div>` : ""}
      <ul class="list">${shown.map((c) => html`<li>
        <div class="row spread open" @click=${() => this.toggle(c.session_id)}>
          <span class="grow ellipsis"><span class="chev ${this.open === c.session_id ? "open" : ""}">▶</span>
            ${c.title || "(no question)"}</span>
          <span class="muted num" style="flex:none">${when(c.updated, this.timezone)}</span></div>
        <div class="row spread"><span class="muted ellipsis">${this.source(c)} · ${(c.messages ?? 0) / 2 | 0} Q</span>
          <button class="act danger" @click=${() => this.forget(c)}>Delete</button></div>
        ${this.open === c.session_id ? this.messages() : ""}
      </li>`)}</ul>
      <div class="muted" style="margin-top:8px">Everything people asked Hisho through Home Assistant, kept
        ${this.keepDays} days${this.timezone ? html`; times in ${this.timezone.replace(/_/g, " ")}` : ""}.</div>
    `);
  }
}
