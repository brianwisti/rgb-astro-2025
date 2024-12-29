import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    fence: {
      attributes: {
        ...nodes.fence.attributes,
        title: {
          type: String,
          render: "title",
        },
      },
      render: component("./src/components/MarkdocCodeBlock.astro"),
    },
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
