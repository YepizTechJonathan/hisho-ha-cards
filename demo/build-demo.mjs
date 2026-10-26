// Builds demo/index.html: the real bundle with a fake hass, for screenshots. node demo/build-demo.mjs
import { build } from "esbuild";
await build({
  stdin: { contents: `
    import "../src/index";
    import { fakeHass } from "../tests/fake-hass";
    const hass = fakeHass();
    const cards = [["hisho-fleet-card", {}], ["hisho-needs-you-card", {}], ["hisho-machine-card", {machine: "Souko"}],
                   ["hisho-device-card", {device: "truenas"}], ["hisho-jobs-card", {}], ["hisho-projects-card", {}]];
    for (const [tag, cfg] of cards) {
      const el = document.createElement(tag); el.setConfig({type: "custom:" + tag, ...cfg}); el.hass = hass;
      document.getElementById("grid").appendChild(el);
    }`, resolveDir: "demo", loader: "ts" },
  bundle: true, format: "esm", outfile: "demo/demo.js",
  alias: { vitest: "./demo/vitest-shim.js" },
});
