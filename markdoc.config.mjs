import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config"

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component("./src/components/MarkdocCodeBlock.astro"),
      attributes: {
        content: {
          type: String,
          required: true,
        },
        language: {
          type: String,
        },
        title: {
          type: String,
          render: "title",
        },
        frame: {
          type: String,
          matches: ["auto", "none", "code", "terminal"]
        },
        process: {
          type: Boolean,
          render: false,
          default: true,
        },
      },
    },
    image: {
        attributes: {
          ...nodes.image.attributes,
        },
        render: component("./src/components/MarkdocImage.astro"),
    },
  },
  tags: {
    note: {
      render: component("./src/components/Note.astro"),
      attributes: {
        title: "string",
      },
    },
  },
})
