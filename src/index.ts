// Registers the Hisho cards and the Hisho dashboard strategy with Home Assistant's frontend.
import { HishoFleetCard } from "./cards/fleet-card";
import { HishoMachineCard } from "./cards/machine-card";
import { HishoNeedsYouCard } from "./cards/needs-you-card";
import { HishoDeviceCard } from "./cards/device-card";
import { HishoJobsCard, HishoProjectsCard } from "./cards/lists";
import { HishoStoreCard } from "./cards/store-card";
import { HishoDashboardStrategy } from "./strategy";

export const VERSION = "0.3.2";

const CARDS: [string, CustomElementConstructor, string, string][] = [
  ["hisho-fleet-card", HishoFleetCard, "Hisho fleet", "Every machine: state, readings, wake / park, maintenance."],
  ["hisho-machine-card", HishoMachineCard, "Hisho machine", "One machine in full: readings, services, its add-on buttons."],
  ["hisho-needs-you-card", HishoNeedsYouCard, "Hisho needs you", "Hisho's needs-you list: acknowledge, snooze, investigate."],
  ["hisho-device-card", HishoDeviceCard, "Hisho device", "A box an add-on knows (TrueNAS, a Proxmox host...) or an add-on."],
  ["hisho-jobs-card", HishoJobsCard, "Hisho jobs", "Hisho's jobs: cancel, retry, clear."],
  ["hisho-projects-card", HishoProjectsCard, "Hisho projects", "Active projects, what waits on you, open or archive."],
  ["hisho-store-card", HishoStoreCard, "Hisho add-on store", "Install, update, roll back or remove add-ons; repositories."],
];

for (const [tag, cls] of CARDS) {
  if (!customElements.get(tag)) customElements.define(tag, cls);
}
if (!customElements.get("ll-strategy-dashboard-hisho")) {
  customElements.define("ll-strategy-dashboard-hisho", HishoDashboardStrategy);
}

const w = window as any;
w.customCards = w.customCards || [];
for (const [tag, , name, description] of CARDS) {
  if (!w.customCards.some((c: any) => c.type === tag)) {
    w.customCards.push({ type: tag, name, description, preview: false, documentationURL:
      "https://github.com/YepizTechJonathan/hisho-ha-cards" });
  }
}
// Lists the strategy in Settings › Dashboards › Add dashboard (HA versions that support custom strategies there).
w.customStrategies = w.customStrategies || [];
if (!w.customStrategies.some((s: any) => s.type === "hisho")) {
  w.customStrategies.push({ type: "hisho", strategyType: "dashboard", name: "Hisho",
    description: "A full Hisho dashboard: fleet, needs you, machines, devices, add-ons, projects." });
}

console.info(`%c HISHO-HA-CARDS %c ${VERSION} `, "background:#151515;color:#eee", "background:#444;color:#fff");
