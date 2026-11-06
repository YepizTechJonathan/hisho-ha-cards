// hisho-calendar-card: the owner's calendar (the hisho integration's "My calendar", read only) as an agenda: every
// company's events and Hisho's due dates in one list, each in its company's colour, with a legend. HA's own calendar
// card can colour a whole calendar, not one event, so this card reads the company from each event (its description's
// "Company: X", or the "<square> X:" its title starts with) and the colours from the entity's `companies`.
import { css, html, type CSSResultGroup, type PropertyValues } from "lit";
import { HishoCard } from "../base";
import { entity, entityId, hub } from "../model";
import { moreInfo } from "../actions";
import { cardStyles } from "../styles";

interface CalEvent {
  summary: string;
  description?: string | null;
  location?: string | null;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
}

export interface AgendaItem { day: string; time: string; title: string; company: string; color: string; due: boolean;
  place: string }

const DAY = 86_400_000;
const GREY = "#8a8f98";

/** One event as the card shows it: the company taken off the title, its colour, its day and time. */
export function agendaItem(e: CalEvent, colors: Record<string, string>, locale?: string): AgendaItem {
  const fromDesc = /(?:^|\n)Company: (.+)/.exec(e.description ?? "")?.[1]?.trim() ?? "";
  const m = /^\S+\s+([^:]+):\s+(.*)$/u.exec(e.summary);
  const company = fromDesc || (m && m[1] in colors ? m[1] : "");
  const title = m && m[1] === company ? m[2] : e.summary;
  const allDay = !!e.start.date;
  const start = allDay ? new Date(`${e.start.date}T12:00:00`) : new Date(e.start.dateTime ?? "");
  const day = allDay ? e.start.date! : start.toLocaleDateString("en-CA");
  const time = allDay ? "all day" : start.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
  return { day, time, title, company, color: colors[company] ?? GREY, due: /Hisho due date/.test(e.description ?? ""),
    place: e.location ?? "" };
}

export class HishoCalendarCard extends HishoCard {
  static properties = { ...HishoCard.properties, events: { state: true } };
  declare events: CalEvent[] | null;
  private seen?: string;

  static styles: CSSResultGroup = [cardStyles, css`
    .legend { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 2px 0 10px; font-size: 0.82em; color: var(--hisho-text-2); }
    .legend span { display: inline-flex; align-items: center; gap: 6px; }
    .sw { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
    .day { margin: 12px 0 4px; font-size: 0.78em; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
      color: var(--hisho-text-2); }
    .ev { display: grid; grid-template-columns: 4px 72px 1fr; gap: 10px; align-items: center; padding: 6px 0; cursor: pointer; }
    .bar { align-self: stretch; border-radius: 2px; }
    .t { font-size: 0.86em; color: var(--hisho-text-2); font-variant-numeric: tabular-nums; }
    .what { min-width: 0; }
    .what .n { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .what .s { font-size: 0.78em; color: var(--hisho-text-2); }
    .warn { color: var(--hisho-warn, #f0a020); font-size: 0.86em; margin: 4px 0; }
  `];

  constructor() {
    super();
    this.events = null;
  }

  static getStubConfig() {
    return { type: "custom:hisho-calendar-card" };
  }

  private calId(): string | undefined {
    return this.config.entity ?? entityId(hub(this.hass), "my_calendar");
  }

  protected updated(changed: PropertyValues) {
    super.updated?.(changed);
    const id = this.calId();
    if (!this.hass || !id || !this.hass.callApi) return;
    const s = this.hass.states[id];
    const stamp = `${id}|${s?.last_changed}|${s?.state}|${JSON.stringify(s?.attributes?.companies ?? {})}`;
    if (stamp === this.seen) return;
    this.seen = stamp;
    const days = Number(this.config.days ?? 14);
    const start = new Date(new Date().setHours(0, 0, 0, 0)), end = new Date(start.getTime() + days * DAY);
    this.hass.callApi<CalEvent[]>("GET", `calendars/${id}?start=${start.toISOString()}&end=${end.toISOString()}`)
      .then((r) => (this.events = r ?? [])).catch(() => (this.events = []));
  }

  protected body() {
    const id = this.calId();
    const cal = id ? this.hass.states[id] : entity(this.hass, hub(this.hass), "my_calendar");
    if (!id || !cal) {
      return this.frame(html`${this.heading("My calendar")}<div class="empty">No calendar yet: Hisho's
        System/Config/Calendar.yaml lists your accounts.</div>`);
    }
    const colors: Record<string, string> = cal.attributes.companies ?? {};
    const problems: string[] = cal.attributes.problems ?? [];
    const items = (this.events ?? []).map((e) => agendaItem(e, colors, this.hass.locale?.language));
    const today = new Date().toLocaleDateString("en-CA");
    const label = (d: string) => d <= today ? "Today"
      : new Date(`${d}T12:00:00`).toLocaleDateString(this.hass.locale?.language, { weekday: "long", month: "short", day: "numeric" });
    const days: [string, AgendaItem[]][] = [];
    for (const it of items) {
      const d = it.day < today ? today : it.day;
      const last = days[days.length - 1];
      if (last && last[0] === d) last[1].push(it); else days.push([d, [it]]);
    }
    return this.frame(html`${this.heading("My calendar")}
      <div class="legend">${Object.entries(colors).map(([name, c]) => html`<span><i class="sw" style="background:${c}"></i>${name}</span>`)}</div>
      ${problems.map((p) => html`<div class="warn">⚠ Can't read ${p}</div>`)}
      ${this.events === null ? html`<div class="empty">Loading…</div>`
        : days.length ? days.map(([d, list]) => html`<div class="day">${label(d)}</div>
          ${list.map((it) => html`<div class="ev" @click=${() => moreInfo(this, id)}>
            <span class="bar" style="background:${it.color}"></span><span class="t">${it.time}</span>
            <div class="what"><div class="n">${it.title}</div>
              <div class="s">${[it.company, it.due ? "Hisho due date" : "", it.place].filter(Boolean).join(" · ")}</div></div>
          </div>`)}`)
        : html`<div class="empty">Nothing on your calendar in the next ${this.config.days ?? 14} days.</div>`}`);
  }
}
