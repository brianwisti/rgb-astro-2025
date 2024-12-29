// @ts-check
import { defineConfig } from "astro/config";

import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

import astroExpressiveCode from "astro-expressive-code";

export default defineConfig({
  integrations: [
    astroExpressiveCode(),
    markdoc({ allowHTML: true }),
    mdx()
  ],
  site: "https://randomgeekery.org",
});
