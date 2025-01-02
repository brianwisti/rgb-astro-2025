// @ts-check
import { defineConfig } from "astro/config"

import astroExpressiveCode from "astro-expressive-code"
import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx"
import mdxDirective from "astro-mdx-directive"
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list"
import smartypants from "remark-smartypants"

/** @type {import("astro-mdx-directive").DirectiveComponentList} */
const directives = {
  container: [
    {
      name: "note",
      path: "src/components/Note.astro",
    },
    {
      name: "quote",
      path: "src/components/quote.astro",
    },
  ],
  leaf: [],
  text: [],
};

export default defineConfig({
  integrations: [
    astroExpressiveCode(),
    mdxDirective({ directives }),
    mdx(),
    markdoc({ allowHTML: true }),
  ],
  markdown: {
    remarkPlugins: [remarkDefinitionList, smartypants],
    remarkRehype: { handlers: defListHastHandlers },
  },
  site: "https://randomgeekery.org",
})
