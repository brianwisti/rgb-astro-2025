// @ts-check
import fs from "node:fs"

import { defineConfig } from "astro/config"

import astroExpressiveCode from "astro-expressive-code"
import hyperscript from "astro-hyperscript"
import markdoc from "@astrojs/markdoc"
import mdx from "@astrojs/mdx"
import mdxDirective from "astro-mdx-directive"
import pagefind from "astro-pagefind"
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list"
import smartypants from "remark-smartypants"

import sitemap from "@astrojs/sitemap"

import tailwindcss from "@tailwindcss/vite"

import icon from "astro-icon"

/** @type {import("astro-mdx-directive").DirectiveComponentList} */
const directives = {
  container: [
    {
      name: "note",
      path: "src/components/Note.astro",
    },
    {
      name: "quote",
      path: "src/components/Quote.astro",
    },
  ],
  leaf: [],
  text: [],
};

export default defineConfig({
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [astroExpressiveCode({
    shiki: {
      langs: [
        JSON.parse(fs.readFileSync("./etc/grammars/mako.tmLanguage.json", "utf-8")),
        JSON.parse(fs.readFileSync("./etc/grammars/org.tmLanguage.json", "utf-8")),
      ],
    },
  }),
  mdxDirective({ directives }),
  mdx(),
  markdoc({ allowHTML: true }),
  sitemap(),
  icon(),
  pagefind(),
  hyperscript(),
  ],
  markdown: {
    remarkPlugins: [remarkDefinitionList, smartypants],
    remarkRehype: { handlers: defListHastHandlers },
  },
  site: "https://randomgeekery.org",
})
