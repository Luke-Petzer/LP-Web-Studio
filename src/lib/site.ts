/**
 * Single source of truth for the site's canonical domain.
 *
 * The live site permanently redirects the bare apex (lpwebstudio.co.za) to
 * https://www.lpwebstudio.co.za with a 308 — so `www` is canonical. Every
 * metadataBase, canonical tag, OpenGraph URL, JSON-LD url/@id, sitemap entry,
 * and the robots.ts Sitemap: directive should import this constant instead of
 * hardcoding the domain, so the two can never drift out of sync again.
 */
export const SITE_URL = "https://www.lpwebstudio.co.za";
