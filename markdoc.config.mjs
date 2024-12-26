import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: "github-dark",
    }),
  ],
  nodes: {
    image: {
      attributes: {
        caption: {
          type: String,
        },
        ...nodes.image.attributes,
      },
      render: component("./src/components/MarkdocImage.astro"),
    },
  },
  tags: {
    bookmark: {
      render: component("./src/components/Bookmark.astro"),
      attributes: {
        href: "string",
        title: "string",
      },
    },
    note: {
      render: component("./src/components/Note.astro"),
      attributes: {
        title: "string",
      },
    },
    quote: {
      render: component("./src/components/Quote.astro"),
      attributes: {
        from: "string",
        cite: "string",
        title: "string",
      },
    },
    tag: {
      render: component("./src/components/TagLink.astro"),
      attributes: {
        tag: "string",
      },
    },
    video: {
      render: component("./src/components/Video.astro"),
      attributes: {
        id: "string",
      },
    },
  },
});
