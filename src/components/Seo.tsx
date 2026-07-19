import { useEffect } from 'react'

const SITE_NAME = 'Cuppet'
const SITE_URL = 'https://cuppet-app.shatslabs.chatgpt.site'

type SeoProps = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  published?: string
  jsonLd?: Record<string, unknown>
  noIndex?: boolean
}

function setMeta(selector: string, attribute: 'name' | 'property', value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }
  element.content = content
}

export default function Seo({
  title,
  description,
  path,
  type = 'website',
  published,
  jsonLd,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
    const canonical = `${SITE_URL}${path}`
    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow',
    )

    if (published) {
      setMeta(
        'meta[property="article:published_time"]',
        'property',
        'article:published_time',
        published,
      )
    }

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical

    document.head.querySelector('script[data-cuppet-seo]')?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.cuppetSeo = 'true'
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.head.querySelector('script[data-cuppet-seo]')?.remove()
      document.head.querySelector('meta[property="article:published_time"]')?.remove()
    }
  }, [description, jsonLd, noIndex, path, published, title, type])

  return null
}
