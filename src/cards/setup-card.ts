// hisho-setup-card: is this Hisho set up right, as its dashboard says: Check my Souko, the last good backup, what
// waits in Approvals, logins not yet in the password vault, and the trust window (with End now). Read-only but for
// Check now and End now; Approvals are decided on Hisho's own dashboard.
import { css, html, type CSSResultGroup } from "lit";
import {
  mdiBackupRestore, mdiClipboardAlertOutline, mdiClipboardCheckOutline, mdiShieldKeyOutline, mdiShieldLockOpenOutline,
  mdiShieldLockOutline, mdiStamper,
} from "@mdi/js";
import { HishoCard } from "../base";
import { available, entity, entityId, hub } from "../model";
import { moreInfo, press } from "../actions";
import { cardStyles } from "../styles";
import { icon, localParts } from "../ui";
import type { HomeAssistant } from "../hass";

/** "12 min ago", "5 h ago", "3 days ago". */
export function ago(iso: string | undefined, now = Date.now()): string {
  const t = iso ? Date.parse(iso) : NaN;
  if (Number.isNaN(t)) return "";
  const min = Math.max(0, Math.round((now - t) / 60000));
  if (min < 60) return `${min} min ago`;
  if (min < 48 * 60) return `${Math.round(min / 60)} h ago`;
  return `${Math.round(min / 1440)} days ago`;
}

function until(hass: HomeAssistant, iso: string | undefined): string {
  return iso ? localParts(hass, new Date(iso)).time : "";
}

export class HishoSetupCard extends HishoCard {
  static styles: CSSResultGroup = [cardStyles, css`
    ha-card { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0; }
    .live { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .lt { position: relative; padding: 16px 18px; cursor: pointer; display: flex; flex-direction: column; gap: 4px;
      min-height: 112px; transition: transform 0.15s, border-color 0.15s;
      background: var(--hisho-glass); border: 1px solid var(--hisho-edge); border-radius: var(--hisho-radius-lg);
      backdrop-filter: blur(20px) saturate(130%); -webkit-backdrop-filter: blur(20px) saturate(130%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
    .lt:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.16); }
    .lt .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .lt .lv { font-size: 1.7em; font-weight: 300; line-height: 1.1; }
    .lt .ll { font-size: 0.86em; font-weight: 500; }
    .lt .ls { font-size: 0.76em; color: var(--hisho-text-2); }
    .lt .bubble { width: 34px; height: 34px; } .lt .bubble svg { width: 19px; height: 19px; }
    .lt .go { margin-top: auto; align-self: flex-start; }
    .lt.bad { border-color: color-mix(in srgb, var(--hisho-crit) 45%, transparent); }
    .lt.warn { border-color: color-mix(in srgb, var(--hisho-warn) 45%, transparent); }
  `];

  static getStubConfig() {
    return { type: "custom:hisho-setup-card" };
  }

  getGridOptions(): { columns: number | "full"; min_columns: number } {
    return { columns: "full", min_columns: 6 };
  }

  private async pressKey(e: Event, key: string) {
    e.stopPropagation();
    const id = entityId(hub(this.hass), key);
    if (id) await press(this, this.hass, id);
  }

  protected body() {
    const hass = this.hass;
    const h = hub(hass);
    const tile = (tone: string, value: unknown, label: string, sub: string, path: string, id?: string, action?: unknown) => html`
      <div class="lt ${tone}" @click=${() => id && moreInfo(this, id)}>
        <div class="top"><div><div class="lv">${value}</div><div class="ll">${label}</div></div>
          <span class="bubble ${tone === "ok" ? "accent" : tone || "brown"}">${icon(path, "")}</span></div>
        <div class="ls">${sub}</div>${action ?? ""}
      </div>`;
    const tiles = [];

    const check = entity(hass, h, "souko_check");
    if (check) {
      const failed: any[] = (check.attributes.checks ?? []).filter((c: any) => c.ok === false);
      const state = check.state;
      const checkBtn = entityId(h, "check_souko") ? html`<button class="go" ?disabled=${state === "running"}
        @click=${(e: Event) => this.pressKey(e, "check_souko")}>Check now</button>` : "";
      tiles.push(tile(state === "problems" ? "bad" : state === "passed" ? "ok" : "",
        state === "passed" ? "All passed" : state === "problems" ? `${failed.length} to look at` :
          state === "running" ? "Checking…" : "Not run",
        "Check my Souko",
        state === "problems" ? failed.map((c) => c.name).join(", ") : ago(check.attributes.at),
        state === "problems" ? mdiClipboardAlertOutline : mdiClipboardCheckOutline, check.entity_id, checkBtn));
    }

    const backup = entity(hass, h, "backup_last_good");
    if (backup) {
      const good = available(backup) ? backup.state : undefined;
      const hours = good ? (Date.now() - Date.parse(good)) / 3600000 : Infinity;
      tiles.push(tile(hours > 48 ? "bad" : hours > 26 ? "warn" : "ok", good ? ago(good) : "Never", "Last good backup",
        backup.attributes.ok === false ? `Last try failed: ${backup.attributes.error ?? "see Hisho"}` : "Hisho's state, nightly",
        mdiBackupRestore, backup.entity_id));
    }

    const approvals = entity(hass, h, "approvals_waiting");
    if (available(approvals)) {
      const n = Number(approvals.state) || 0;
      const first = (approvals.attributes.approvals ?? [])[0];
      tiles.push(tile(n ? "warn" : "ok", n, "Approvals waiting",
        n ? `${first?.title ?? ""}${n > 1 ? ` and ${n - 1} more` : ""} (decide on Hisho's dashboard)` : "Nothing to decide",
        mdiStamper, approvals.entity_id));
    }

    const vault = entity(hass, h, "logins_not_in_vault");
    if (available(vault)) {
      const n = Number(vault.state) || 0;
      const waiting = (vault.attributes.logins ?? []).filter((l: any) => (l.waiting ?? []).length);
      tiles.push(tile(n ? "warn" : "ok", n, "Logins not in the vault",
        n ? waiting.map((l: any) => l.title).join(", ") : "Every login is saved", mdiShieldKeyOutline, vault.entity_id));
    }

    const trust = entity(hass, h, "trust_window");
    if (trust) {
      const open = trust.state === "on";
      const endBtn = open && entityId(h, "trust_end")
        ? html`<button class="go" @click=${(e: Event) => this.pressKey(e, "trust_end")}>End now</button>` : "";
      tiles.push(tile(open ? "warn" : "ok", open ? "Open" : "Closed", "Trust window",
        open ? (trust.attributes.always ? "Until you end it" : `Claude acts without asking until ${until(hass, trust.attributes.until)}`)
          : "Claude asks first", open ? mdiShieldLockOpenOutline : mdiShieldLockOutline, trust.entity_id, endBtn));
    }

    return tiles.length ? this.frame(html`<div class="live">${tiles}</div>`) : html``;
  }
}
