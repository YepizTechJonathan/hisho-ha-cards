# Hisho cards for Home Assistant

A dashboard for [Hisho](https://github.com/YepizTechJonathan/hisho-ha): cards with the controls of Hisho's
own Command Center, and a **Hisho dashboard** Home Assistant builds by itself from your fleet.

Needs the **Hisho** integration ([hisho-ha](https://github.com/YepizTechJonathan/hisho-ha), v1.2.0 or later),
paired with Hisho. The cards talk only to Home Assistant (its entities and the `hisho.*` services), never to
Hisho directly, so no Hisho key is ever in your browser. What they offer follows what Hisho lets this Home
Assistant do; risky actions (park, stop, shut down, archive...) ask first.

## The Hisho dashboard

Settings › Dashboards › **Add dashboard** › **Hisho** (on Home Assistant versions that list custom
dashboards there). Otherwise: Add dashboard › *New dashboard from scratch* › open it › ⋮ › *Edit dashboard* ›
⋮ › *Raw configuration editor*, and paste:

```yaml
strategy:
  type: custom:hisho
```

Views: **Overview** (fleet, needs you, jobs, Hisho's status), **Machines**, **Devices** (servers, VMs,
storage...), **Add-ons**, **Projects**, **Phone**. It follows your fleet: a new machine or box appears on its
own. To change it, ⋮ › *Take control* and edit it like any dashboard.

## Cards

| Card | Shows | Does |
|---|---|---|
| `custom:hisho-fleet-card` | every machine: state, readings, parking | wake, park, maintenance (machine and fleet) |
| `custom:hisho-machine-card` (`machine: Souko`) | one machine in full: readings, services, add-on items | wake/park, start/stop/restart services, add-on buttons, maintenance |
| `custom:hisho-needs-you-card` | Hisho's needs-you list with Claude's findings | acknowledge, snooze, investigate, send to phone |
| `custom:hisho-device-card` (`device: truenas`) | a box an add-on knows, or an add-on | its add-on buttons (VM start/shut down...), maintenance, add-on on/off |
| `custom:hisho-jobs-card` | jobs | cancel, retry, clear, fail stuck jobs |
| `custom:hisho-projects-card` | active projects, what waits on you | open, archive |

Every card takes `title:`; the jobs and projects cards take `limit:`.

## Install

HACS › ⋮ › **Custom repositories** › `https://github.com/YepizTechJonathan/hisho-ha-cards`, type
**Dashboard** › **Add**, then find **Hisho cards** › **Download**. HACS adds the resource; reload the browser.

By hand: copy `dist/hisho-ha-cards.js` to `config/www/`, then Settings › Dashboards › ⋮ › Resources ›
add `/local/hisho-ha-cards.js` as a JavaScript module.

## Development

```bash
npm ci
npm test            # vitest, cards against a fake hass shaped like the real integration
npm run typecheck
npm run build       # dist/hisho-ha-cards.js (commit it: HACS serves it)
node demo/build-demo.mjs && (cd demo && python3 -m http.server)   # every card with fake data
```
