import fs from "fs"
import { URL } from "node:url"

import glob from "fast-glob"
import { parse, HTMLElement } from "node-html-parser"
import RobotsParser from "robots-parser"

const SAVED_REPORT_PATH = "src/data/link_check_report.json"
const SITE_URL = "https://randomgeekery.org"
// Let's try a month for the interval
const CACHE_LIFETIME = 30 * 24 * 60 * 60 * 1000
const REQUEST_TIMEOUT = 10 * 1000
const HTML_GLOB_PATTERN = "dist/**/*.html"

type Page = {
    path: string
    permalink: string
    parsed: HTMLElement
    links: HTMLElement[]
}

function LoadPageFromPath(path: string): Page {
    const parsed = parse(fs.readFileSync(path).toString())
    const permalink = path.replace(/^dist\//, "/").replace(/index\.html$/, "")
    // note: at some point we need to account for links to images and other media
    const links = parsed.querySelectorAll("a[href]")

    return { path, permalink, parsed, links }
}

export function LoadPages(): Page[] {
    return glob.sync(HTML_GLOB_PATTERN).map(LoadPageFromPath)
}

export type LinkInfo = {
    to: URL
    from: string[]
}

function collectSiteLinks(pages: Page[]): LinkInfo[] {
    const siteLinks: LinkInfo[] = []
    const hasSchemePattern = /^[a-z]+?:\/\//

    pages.forEach(({ permalink, links }) => {
        links.forEach((link: HTMLElement) => {
            const href = link.getAttribute("href")

            // we got this from querySelectorAll, so no href is an error.
            if (!href) {
                throw new Error("link element has no href attribute")
            }

            const url = hasSchemePattern.exec(href)
                ? new URL(href)
                : new URL(href, SITE_URL)

            // Skip non-HTTP(S) links
            if (!url.protocol.startsWith("http")) {
                return
            }

            // We are not evaluating link fragments, so ensure there is none.
            url.hash = ""

            // find if there is an existing entry for this URL
            const existing = siteLinks.find((entry) => entry.to.href === url.href)

            if (existing) {
                existing.from.push(permalink)
                return
            }

            siteLinks.push({ to: url, from: [permalink] })
        })
    })

    return siteLinks
}

type CheckedLink = {
    link: LinkInfo
    lastChecked: number
    result: number
    error?: string
}

function checkLocalLink(link: LinkInfo): CheckedLink {
    const asFile = link.to.pathname.replace(/^\//, "").replace(/\/$/, "/index.html")
    const localPath = "dist/" + asFile

    return {
        lastChecked: Date.now(),
        result: fs.existsSync(localPath) ? 200 : 404,
        link,
    }
}

async function checkExternalLink(link: LinkInfo): Promise<CheckedLink> {
    const result: CheckedLink = {
        lastChecked: 0,
        result: 0,
        link: link
    }

    const timeoutHandler = AbortSignal.timeout(REQUEST_TIMEOUT)
    try {
        const req = await fetch(link.to.href, { method: "HEAD", signal: timeoutHandler })

        if (req.status == 405) {
            // Some servers don't like HEAD requests, so let's try GET
            const getReq = await fetch(link.to.href, { method: "GET", signal: timeoutHandler })
            result.result = getReq.status
        } else {
            result.result = req.status
        }
    } catch (err) {
        console.error(`Error checking ${link.to.href}: ${err}`)
        result.result = 0
        result.error = `${err}`
    }

    result.lastChecked = Date.now()
    console.log(`Checking ${link.to.href}... ${result.result}`)

    return result
}


export type LinkCheckReport = {
    lastChecked: number
    results: CheckedLink[]
}

function EmptyLinkCheckReport(): LinkCheckReport {
    return {
        lastChecked: 0,
        results: []
    }
}

function findLinkInReport(report: LinkCheckReport, link: LinkInfo): CheckedLink | undefined {
    return report.results.find((entry) => entry.link.to.href === link.to.href)
}

function loadReport(): LinkCheckReport {
    const reviver = (key: string, value: any) => {
        if (key === "link") {
            return {
                to: new URL(value.to),
                from: value.from
            }
        }

        return value
    }
    return fs.existsSync(SAVED_REPORT_PATH)
        ? JSON.parse(fs.readFileSync(SAVED_REPORT_PATH, "utf8"), reviver)
        : EmptyLinkCheckReport()
}

export function partitionLinks(report: LinkCheckReport): [CheckedLink[], CheckedLink[]] {
    return report.results.reduce<[CheckedLink[], CheckedLink[]]>(([local, external], entry) => {
        if (entry.link.to.origin === SITE_URL) {
            local.push(entry)
        } else {
            external.push(entry)
        }

        return [local, external]
    }, [[], []])
}

function saveReport(report: LinkCheckReport) {
    const replacer = (key: string, value: any) => {
        if (key === "link") {
            return {
                to: value.to.href,
                from: value.from
            }
        }

        return value
    }

    const serialized = JSON.stringify(report, replacer, 2)
    fs.writeFileSync(SAVED_REPORT_PATH, serialized)
}

export async function GenerateLinkCheckReport(pages: Page[]): Promise<LinkCheckReport> {
    const cacheLimit = Date.now() - CACHE_LIFETIME
    const lastReport = loadReport()
    const currentReport = EmptyLinkCheckReport()
    const links = collectSiteLinks(pages)
    const domains = new Set(links.map((link) => link.to.origin))

    const domainRules = await Promise.all(
        Array.from(domains).map(async (domain) => {
            const getReq = await fetch(`${domain}/robots.txt`, { method: "GET", signal: AbortSignal.timeout(REQUEST_TIMEOUT) })

            if (!getReq.ok) {
                console.error(`Error fetching ${domain}/robots.txt: ${getReq.status}`)
                return { domain, robots: RobotsParser(`${domain}/robots.txt`, "") }
            }

            const body = await getReq.text()

            const robots = RobotsParser(`${domain}/robots.txt`, body)
            return { domain, robots }
        }))

    const results = await Promise.all(links.map(async (link) => {
        if (link.to.origin === SITE_URL) {
            return checkLocalLink(link)
        }

        const cached = findLinkInReport(lastReport, link)

        if (cached && cached.lastChecked > cacheLimit) {
            console.log(`Using cached result for ${link.to.href}`)
            return cached
        }

        const domainRulesForLink = domainRules.find((entry) => entry.domain === link.to.origin)
        if (domainRulesForLink) {
            if (domainRulesForLink.robots.isDisallowed(link.to.href, "node-fetch/1.0")) {
                return {
                    lastChecked: Date.now(),
                    result: 403,
                    error: "disallowed by robots.txt",
                    link
                }
            }
        }

        return await checkExternalLink(link)
    }))

    currentReport.results = results
    currentReport.lastChecked = Date.now()
    saveReport(currentReport)

    return currentReport
}
