import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
    tags: {
        note: {
            render: component("./src/components/Note.astro"),
            attributes: {
                title: "string",
            },
        },
    },
})