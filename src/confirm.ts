// A small confirm dialog in Home Assistant's look (its own theme variables), for risky actions.
import { LitElement, css, html } from "lit";

export class HishoConfirm extends LitElement {
  static properties = { text: {}, open: { type: Boolean, reflect: true } };
  declare text: string;
  declare open: boolean;
  private resolve?: (ok: boolean) => void;

  static styles = css`
    :host { display: none; }
    :host([open]) {
      display: flex; position: fixed; inset: 0; z-index: 1000; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.45);
    }
    .box {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color); border-radius: var(--ha-card-border-radius, 12px);
      padding: 20px 24px 12px; max-width: min(420px, 90vw); box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
    }
    p { margin: 0 0 16px; line-height: 1.45; }
    .row { display: flex; justify-content: flex-end; gap: 8px; }
    button {
      font: inherit; border: none; border-radius: 18px; padding: 8px 16px; cursor: pointer;
      background: transparent; color: var(--primary-color);
    }
    button.yes { background: var(--error-color, #db4437); color: var(--text-primary-color, #fff); }
  `;

  ask(text: string): Promise<boolean> {
    this.text = text;
    this.open = true;
    return new Promise((resolve) => (this.resolve = resolve));
  }

  private done(ok: boolean) {
    this.open = false;
    this.resolve?.(ok);
    this.resolve = undefined;
  }

  render() {
    return html`<div class="box" role="alertdialog" aria-modal="true">
      <p>${this.text}</p>
      <div class="row">
        <button @click=${() => this.done(false)}>Cancel</button>
        <button class="yes" @click=${() => this.done(true)}>Yes</button>
      </div>
    </div>`;
  }
}

if (!customElements.get("hisho-confirm")) customElements.define("hisho-confirm", HishoConfirm);

/** Ask inside the card's own shadow root, so it works on any dashboard. */
export function confirmDialog(host: HTMLElement, text: string): Promise<boolean> {
  const root = host.shadowRoot ?? host;
  let dialog = root.querySelector("hisho-confirm") as HishoConfirm | null;
  if (!dialog) {
    dialog = document.createElement("hisho-confirm") as HishoConfirm;
    root.appendChild(dialog);
  }
  return dialog.ask(text);
}
