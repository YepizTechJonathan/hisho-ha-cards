// Pressing Hisho's controls, always through Home Assistant's `hisho` services (never Hisho directly:
// no Hisho key ever reaches a browser). Risky ones ask first, like Hisho's own dashboard.
import type { HomeAssistant } from "./hass";
import { confirmDialog } from "./confirm";

export async function runAction(
  host: HTMLElement,
  hass: HomeAssistant,
  action: string,
  target = "",
  args: Record<string, any> = {},
  ask?: string,
): Promise<boolean> {
  if (ask && !(await confirmDialog(host, ask))) return false;
  await hass.callService("hisho", "run_action", { action, target, args, confirm: !!ask });
  return true;
}

export async function toggle(host: HTMLElement, hass: HomeAssistant, entityId: string, on: boolean, ask?: string) {
  if (ask && !(await confirmDialog(host, ask))) return false;
  await hass.callService("switch", on ? "turn_on" : "turn_off", {}, { entity_id: entityId });
  return true;
}

export async function press(host: HTMLElement, hass: HomeAssistant, entityId: string, ask?: string) {
  if (ask && !(await confirmDialog(host, ask))) return false;
  await hass.callService("button", "press", {}, { entity_id: entityId });
  return true;
}

export function moreInfo(host: HTMLElement, entityId: string) {
  host.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
}
