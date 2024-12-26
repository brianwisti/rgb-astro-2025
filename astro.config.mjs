// @ts-check
import { defineConfig } from "astro/config";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc({ allowHTML: true })],
  site: "https://randomgeekery.org",
});
