// Finding Hisho in Home Assistant: its devices and entities, by the `hisho` integration's
// translation keys (stable across languages and renames). The cards read only these.
import type { HassEntity, HomeAssistant } from "./hass";

export type Kind = "hub" | "machine" | "box" | "addon";

export interface HishoDevice {
  id: string;
  name: string;
  kind: Kind;
  model: string;
  entities: Record<string, string[]>; // translation_key -> entity ids (several for per-item keys)
}

const KIND_BY_KEY: [string, Kind][] = [
  ["machines_online", "hub"],
  ["machine_state", "machine"],
  ["box_state", "box"],
  ["addon_status", "addon"],
];

export function hishoDevices(hass: HomeAssistant): HishoDevice[] {
  const byDevice = new Map<string, Record<string, string[]>>();
  for (const entry of Object.values(hass.entities || {})) {
    if (entry.platform !== "hisho" || !entry.device_id || !entry.translation_key) continue;
    const keys = byDevice.get(entry.device_id) ?? {};
    (keys[entry.translation_key] ??= []).push(entry.entity_id);
    byDevice.set(entry.device_id, keys);
  }
  const out: HishoDevice[] = [];
  for (const [id, entities] of byDevice) {
    const kind = KIND_BY_KEY.find(([key]) => key in entities)?.[1];
    if (!kind) continue;
    const dev = hass.devices?.[id];
    out.push({
      id,
      name: dev?.name_by_user || dev?.name || id,
      kind,
      model: dev?.model || "",
      entities,
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export function byKind(hass: HomeAssistant, kind: Kind): HishoDevice[] {
  return hishoDevices(hass).filter((d) => d.kind === kind);
}

export function hub(hass: HomeAssistant): HishoDevice | undefined {
  return byKind(hass, "hub")[0];
}

/** A device by device id or by its (case-insensitive) name. */
export function findDevice(hass: HomeAssistant, ref: string | undefined, kind?: Kind): HishoDevice | undefined {
  if (!ref) return undefined;
  const wanted = ref.toLowerCase();
  return hishoDevices(hass).find(
    (d) => (!kind || d.kind === kind) && (d.id === ref || d.name.toLowerCase() === wanted),
  );
}

export function entityId(dev: HishoDevice | undefined, key: string): string | undefined {
  return dev?.entities[key]?.[0];
}

export function entity(hass: HomeAssistant, dev: HishoDevice | undefined, key: string): HassEntity | undefined {
  const id = entityId(dev, key);
  return id ? hass.states[id] : undefined;
}

export function entities(hass: HomeAssistant, dev: HishoDevice | undefined, key: string): HassEntity[] {
  return (dev?.entities[key] ?? []).map((id) => hass.states[id]).filter((s): s is HassEntity => !!s);
}

export function available(s: HassEntity | undefined): s is HassEntity {
  return !!s && s.state !== "unavailable" && s.state !== "unknown";
}

/** Which of Hisho's actions this Home Assistant may call (Hisho decides; the hub lists them). */
export function allowed(hass: HomeAssistant): Set<string> {
  const s = entity(hass, hub(hass), "actions_allowed");
  return new Set<string>(s?.attributes.allowed ?? []);
}

export function friendly(s: HassEntity | undefined, device: HishoDevice | undefined): string {
  const name: string = s?.attributes.friendly_name ?? "";
  const prefix = device ? device.name + " " : "";
  return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}
