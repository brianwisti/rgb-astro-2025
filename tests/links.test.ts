import fs from "node:fs"
import { describe, test, expect } from "vitest"

import { GenerateLinkCheckReport, LoadPages, partitionLinks } from "@lib/LinkChecker"

const pages = LoadPages()
    .filter((page) => page.permalink == "/")

const lastReport = await GenerateLinkCheckReport(pages)
const [internalLinks, externalLinks] = partitionLinks(lastReport)

test("fixtures loaded", () => {
    expect(pages.length).toBe(1)
    expect(internalLinks.length).toBeGreaterThan(0)
    expect(externalLinks.length).toBeGreaterThan(0)
})

describe.each(internalLinks)("$link.to.pathname", ({ link, result }) => {
    test("link is formatted correctly", () => {
        const linkPath = link.to.pathname
        expect(linkPath.startsWith("/")).toBe(true)
    })

    test("internal link target exists", () => {
        expect(result).toBe(200)
    })
})

describe.each(externalLinks)("$link.to.href", ({ link, result, error }) => {
    test("link was requested without error", () => {
        expect(error).toBeUndefined()
    })

    test("response was OK", () => {
        expect(result).toBe(200)
    })
})

console.log(`Found ${internalLinks.length} internal links`)
console.log(`Found ${externalLinks.length} external links`)