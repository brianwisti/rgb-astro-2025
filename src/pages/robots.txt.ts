import type { APIRoute } from "astro"

const generateRobotsText = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site)
  return new Response(generateRobotsText(sitemapURL))
}
