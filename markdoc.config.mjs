import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: "github-dark",
    }),
  ],
  tags: {
    note: {
      render: component("./src/components/Note.astro"),
      attributes: {
        title: "string",
      },
    },
    tag: {
      render: component("./src/components/TagLink.astro"),
      attributes: {
        tag: "string",
      },
    },
  },
});
