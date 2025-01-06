import fs from "node:fs"
import { describe, test, expect } from "vitest"

import { GenerateLinkCheckReport, LoadPages, partitionLinks } from "@lib/LinkChecker"

// Their robots.txt says they don't want to be scraped
const knownDisallowedHosts = [
  "https://commons.wikimedia.org",
  "https://github.com",
  "https://gitlab.com",
  "https://linkedin.com",
  "https://www.linkedin.com",
  "https://randomgeekery.threadless.com",
  "https://weblog.anniegreens.lol",
]

const pageFilter = /^\/([a-z]+\/)?$/
const postFilter = /^\/post\/202[45]\//

const pages = LoadPages()
    .filter((page) => pageFilter.exec(page.permalink) || postFilter.exec(page.permalink))

const lastReport = await GenerateLinkCheckReport(pages)
const [internalLinks, externalLinks] = partitionLinks(lastReport)
const allowedExternalLinks = externalLinks.filter((link) => !knownDisallowedHosts.includes(link.link.to.origin))

test("fixtures loaded", () => {
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

describe.each(allowedExternalLinks)("$link.to.href", ({ link, result, error }) => {
    test("link was requested without error", () => {
        expect(error).toBeUndefined()
    })

    test("response was OK", () => {
        expect(result).toBe(200)
    })
})

console.log(`Found ${internalLinks.length} internal links`)
console.log(`Found ${externalLinks.length} external links`)
