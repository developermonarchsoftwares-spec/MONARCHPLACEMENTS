import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.monarchplacements.in'

// Public, indexable routes. /privacy and /terms are redirects, and /api/* is not a page,
// so none of those are listed.
const ROUTES = [
  '',
  '/internships',
  '/training',
  '/college-partnerships',
  '/placements',
  '/it-staffing',
  '/roadmap',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }))
}
