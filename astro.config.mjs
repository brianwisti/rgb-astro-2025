// @ts-check
import { defineConfig } from "astro/config";

import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc({ allowHTML: true }), mdx()],
  site: "https://randomgeekery.org",
});