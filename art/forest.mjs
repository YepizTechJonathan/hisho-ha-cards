// Draws the Hisho dashboard's background: a misty pine forest at dusk, forest green and warm brown.
// Original artwork (generated here, no photo licence): node art/forest.mjs out.jpg [width] [height]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright"); // run with NODE_PATH=$(npm root -g)

const [out = "forest.jpg", W = "2560", H = "1440"] = process.argv.slice(2);
const w = Number(W), h = Number(H);

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

/** A ridge line: a few summed sines, so it rolls like hills. */
function ridge(base, amp, phase) {
  const pts = [];
  for (let x = -20; x <= w + 20; x += 8) {
    const y = base + amp * (0.55 * Math.sin(x / 410 + phase) + 0.3 * Math.sin(x / 170 + phase * 2.1) + 0.15 * Math.sin(x / 63 + phase * 3.7));
    pts.push([x, y]);
  }
  return pts;
}
const yAt = (pts, x) => pts[Math.max(0, Math.min(pts.length - 1, Math.round((x + 20) / 8)))][1];

/** One pine: tiers of drooping triangles on a thin trunk. */
function pine(x, y, ht) {
  const tiers = 5 + Math.floor(rnd() * 4), wd = ht * (0.26 + rnd() * 0.08);
  let d = `M${x - ht * 0.012},${y} L${x - ht * 0.012},${y - ht * 0.12} L${x + ht * 0.012},${y - ht * 0.12} L${x + ht * 0.012},${y} Z`;
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers, top = y - ht * (0.22 + t * 0.78) - ht * 0.12, bot = y - ht * 0.08 - t * ht * 0.74;
    const half = wd * (1 - t * 0.82) * (0.9 + rnd() * 0.2);
    d += ` M${x},${top} Q${x + half * 0.35},${(top + bot) / 2} ${x + half},${bot} Q${x},${bot - ht * 0.03} ${x - half},${bot} Q${x - half * 0.35},${(top + bot) / 2} ${x},${top} Z`;
  }
  return d;
}

function layer(base, amp, phase, treeH, density, color, fog) {
  const pts = ridge(base, amp, phase);
  let d = `M-20,${h} ` + pts.map(([x, y]) => `L${x},${y}`).join(" ") + ` L${w + 20},${h} Z`;
  for (let x = -30; x < w + 30; x += density * (0.5 + rnd())) {
    const ht = treeH * (0.55 + rnd() * 0.75);
    d += " " + pine(x, yAt(pts, x) + ht * 0.08, ht);
  }
  return `<path d="${d}" fill="${color}"/>` +
    (fog ? `<rect x="0" y="${base - amp - treeH * 0.4}" width="${w}" height="${treeH * 2.2}" fill="url(#fog)" opacity="${fog}"/>` : "");
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0a110d"/><stop offset="0.22" stop-color="#15201a"/><stop offset="0.4" stop-color="#2c3326"/>
    <stop offset="0.52" stop-color="#5a4630"/><stop offset="0.6" stop-color="#6b5236"/><stop offset="0.75" stop-color="#2a2a1d"/>
    <stop offset="1" stop-color="#121510"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.7" cy="0.5" r="0.45">
    <stop offset="0" stop-color="#d9a466" stop-opacity="0.5"/><stop offset="0.5" stop-color="#8a6238" stop-opacity="0.12"/>
    <stop offset="1" stop-color="#000" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#b9b39a" stop-opacity="0"/><stop offset="0.5" stop-color="#b9b39a" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#b9b39a" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="vig" cx="0.5" cy="0.45" r="0.75">
    <stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.6"/>
  </radialGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="softer"><feGaussianBlur stdDeviation="1.4"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
    <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.45  0 0 0 0.05 0"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#sky)"/>
<rect width="${w}" height="${h}" fill="url(#glow)"/>
${Array.from({ length: 70 }, () => `<circle cx="${rnd() * w}" cy="${rnd() * h * 0.36}" r="${0.5 + rnd() * 1.1}" fill="#f3ead8" opacity="${0.15 + rnd() * 0.45}"/>`).join("")}
<circle cx="${w * 0.7}" cy="${h * 0.47}" r="${h * 0.03}" fill="#f2d3a0" opacity="0.8" filter="url(#soft)"/>
<path d="${(() => { const p = ridge(h * 0.5, h * 0.09, 0.9); return `M-20,${h} ` + p.map(([x, y]) => `L${x},${y}`).join(" ") + ` L${w + 20},${h} Z`; })()}" fill="#4b4232" opacity="0.75" filter="url(#soft)"/>
<g filter="url(#soft)">${layer(h * 0.58, h * 0.04, 0.4, h * 0.06, 18, "#3d4636", 0.5)}</g>
<g filter="url(#softer)">${layer(h * 0.66, h * 0.05, 1.7, h * 0.09, 24, "#2b3a2d", 0.4)}</g>
${layer(h * 0.75, h * 0.05, 2.9, h * 0.13, 34, "#1c2a1f", 0.3)}
${layer(h * 0.86, h * 0.04, 4.2, h * 0.19, 52, "#121c14", 0.14)}
${layer(h * 0.99, h * 0.03, 5.6, h * 0.3, 110, "#0a100b", 0)}
<rect width="${w}" height="${h}" fill="url(#vig)"/>
<rect width="${w}" height="${h}" filter="url(#grain)"/>
</svg>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
await page.screenshot({ path: out, type: "jpeg", quality: 84 });
await browser.close();
console.log(out);
