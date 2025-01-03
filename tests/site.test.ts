import fs from "node:fs"

import glob from "fast-glob"
import { parse, HTMLElement } from "node-html-parser"
import { describe, test, expect } from "vitest"

type Page = {
    path: string
    parsed: HTMLElement
}

type LinkInfo = {
    to: string
    from: string[]
}
type FoundLinks = Map<string, string[]>

const buildPaths = glob.sync("dist/**/*")
const pages: Page[] = buildPaths
    .filter((path: string) => path.endsWith(".html"))
    .map((path: string) => {
        return { path: path, parsed: parse(fs.readFileSync(path).toString()) }
    })

const foundLinks: FoundLinks = new Map()

pages.forEach(({ path, parsed }) => {
    const permalink = path.replace(/^dist\//, "/").replace(/index\.html$/, "")
    const links = parsed.querySelectorAll("a[href]")

    links.forEach((link) => {
        const href = link.getAttribute("href")
        if (!href) return

        if (!foundLinks.has(href)) {
            foundLinks.set(href, [])
        }

        foundLinks.get(href)?.push(permalink)
    })
})

const siteURI = "https://randomgeekery.org"
const internalLinks: LinkInfo[] = []
const externalLinks: LinkInfo[] = []

foundLinks.forEach((from, to) => {
    const linkInfo = { to, from }

    if (/^((tel|mailto|sms):)|#/.exec(to)) {
        return
    }
    if (to.startsWith('http')) {
        externalLinks.push(linkInfo)
    } else {
        internalLinks.push(linkInfo)
    }
})

test("fixtures loaded", () => {
    expect(pages.length).toBeGreaterThan(0)
    expect(internalLinks.length).toBeGreaterThan(0)
    expect(externalLinks.length).toBeGreaterThan(0)
})

describe.each(internalLinks)("%o", ({ to, from }) => {
    test("link is formatted correctly", () => {
        expect(to.startsWith("/") || to.startsWith(siteURI)).toBe(true)
    })
})

const httpAllowed = [
    "http://delsdoodles.com/",
    "http://literateprogramming.com",
    "http://live-aacplus-64.kexp.org/",
    "http://microformats.org",
    "http://www.stdutility.com/",
]

describe.each(externalLinks)("%o", ({ to, from }) => {
    test.skip("external links are HTTPS", () => {
        const inHttpAllowed = httpAllowed.some((url) => to.startsWith(url))
        expect(to.startsWith("https://") || inHttpAllowed).toBe(true)
    })
})
console.log(`Found ${internalLinks.length} internal links`)
console.log(`Found ${externalLinks.length} external links`)