import type { SupportedLanguage } from './i18n'

export interface SEOData {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
}

export function generateSEOTags(data: SEOData, lang: SupportedLanguage): string {
  const {
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonical
  } = data

  return `
    <meta name="description" content="${description}" />
    ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
    ${ogTitle ? `<meta property="og:title" content="${ogTitle}" />` : ''}
    ${ogDescription ? `<meta property="og:description" content="${ogDescription}" />` : ''}
    <meta property="og:type" content="website" />
    ${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    ${ogTitle ? `<meta name="twitter:title" content="${ogTitle}" />` : ''}
    ${ogDescription ? `<meta name="twitter:description" content="${ogDescription}" />` : ''}
    ${ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : ''}
    ${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}
    <meta name="language" content="${lang}" />
  `.trim()
}