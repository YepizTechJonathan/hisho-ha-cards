// An add-on's settings and entries, as forms built from the add-on's own schema (str, int, port, url, bool,
// list(a|b), password / secret). Password fields take a secret's NAME here, never a value: a value would pass
// through Home Assistant; paste values in Hisho's own dashboard.
import { html, type TemplateResult } from "lit";

export interface Field {
  key: string;
  type: string; // base type
  optional: boolean;
  choices: string[];
  label: string;
}

/** Hisho sends null (not a missing key) for an add-on without settings or entries: both mean "none". */
export function fields(schema?: Record<string, string> | null, labels?: Record<string, string> | null): Field[] {
  const names = labels ?? {};
  return Object.entries(schema ?? {}).map(([key, raw]) => {
    const optional = raw.endsWith("?");
    const base = raw.replace(/\?$/, "");
    const list = /^list\((.*)\)$/.exec(base);
    return {
      key,
      type: list ? "list" : base,
      optional,
      choices: list ? list[1].split("|").map((c) => c.trim()).filter(Boolean) : [],
      label: names[key] ?? key.replace(/_/g, " "),
    };
  });
}

export const isSecret = (f: Field) => f.type === "password" || f.type === "secret";
export const SECRET_NAME = /^[A-Z][A-Z0-9_]{2,127}$/;

export function fieldInput(f: Field, value: any): TemplateResult {
  const name = f.key;
  if (f.type === "bool") return html`<input type="checkbox" name=${name} .checked=${!!value} />`;
  if (f.type === "list") {
    return html`<select name=${name}>${f.choices.map((c) => html`<option value=${c} ?selected=${c === value}>${c}</option>`)}</select>`;
  }
  const type = f.type === "int" || f.type === "port" ? "number" : f.type === "url" ? "url" : "text";
  const hint = isSecret(f) ? "secret's name, e.g. CLOUDFLARE_EXAMPLE_TOKEN" : f.optional ? "optional" : "";
  return html`<input type=${type} name=${name} .value=${value ?? ""} placeholder=${hint}
    pattern=${isSecret(f) ? "[A-Z][A-Z0-9_]{2,127}" : ".*"} />`;
}

/** The changed values in a form, typed; an error message if a secret field holds something that isn't a name. */
export function readForm(form: HTMLFormElement, list: Field[], before: Record<string, any> = {}):
    { values: Record<string, any>; error?: string } {
  const values: Record<string, any> = {};
  for (const f of list) {
    const el = form.elements.namedItem(f.key) as HTMLInputElement | HTMLSelectElement | null;
    if (!el) continue;
    let v: any = el instanceof HTMLInputElement && el.type === "checkbox" ? el.checked : el.value.trim();
    if ((f.type === "int" || f.type === "port") && v !== "") v = Number(v);
    if (isSecret(f) && v && !SECRET_NAME.test(v)) {
      return { values, error: `${f.label}: give the secret's name, not its value (paste values in Hisho's dashboard).` };
    }
    if (v !== (before[f.key] ?? (f.type === "bool" ? false : ""))) values[f.key] = v;
  }
  return { values };
}

export const formStyles = `
  form.settings { display: grid; grid-template-columns: minmax(110px, 38%) 1fr; gap: 6px 10px; align-items: center; margin: 8px 0; }
  form.settings label { color: var(--secondary-text-color); font-size: 0.9em; overflow-wrap: anywhere; }
  form.settings input, form.settings select {
    font: inherit; padding: 4px 6px; border-radius: 6px; border: 1px solid var(--divider-color);
    background: var(--card-background-color); color: var(--primary-text-color); min-width: 0;
  }
  form.settings input[type=checkbox] { justify-self: start; }
  form.settings .full { grid-column: 1 / -1; display: flex; gap: 8px; justify-content: flex-end; }
  .error { color: var(--error-color, #db4437); font-size: 0.9em; }
`;
