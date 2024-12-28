import fs from "node:fs"
import * as matter from "gray-matter";
import { XMLParser } from "fast-xml-parser"
import { describe, expect, test } from "vitest"

describe("Site RSS feed", () => {
    const rssPath = "dist/index.xml"
    test("index.xml exists", () => {
        const feed = fs.readFileSync(rssPath, "utf8")
        expect(feed).toBeDefined()
    })
    
    test("feed.xml is valid XML", () => {
        const feed = fs.readFileSync(rssPath, "utf8")
        const options = {
        attributeNamePrefix: "",
        ignoreAttributes: false,
        ignoreNameSpace: true,
        allowBooleanAttributes: true,
        parseNodeValue: true,
        parseAttributeValue: true,
        trimValues: true,
        parseTrueNumberOnly: false,
        arrayMode: false,
        attrValueProcessor: (val: string) => val,
        tagValueProcessor: (val: string) => val,
        stopNodes: ["parse-me-as-string"]
        }
        const parsed = new XMLParser().parse(feed, options)
        expect(parsed).toBeDefined()
    })
})
