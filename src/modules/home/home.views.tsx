import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import { getLocalizedPath } from '../../lib/path'
import type { SupportedLanguage } from '../../lib/i18n'

interface HomePageProps {
  lang: SupportedLanguage
  t: (key: string) => string
}

export function HomePage({ lang, t }: HomePageProps): string {
  const seoTags = generateSEOTags({
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('home.keywords')
  }, lang)

  const productsLink = getLocalizedPath('/products', lang)

  const content = `
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-6">
        ${t('home.welcome')}
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        ${t('home.subtitle')}
      </p>
      <div class="space-y-4">
        <a 
          href="${productsLink}" 
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ${t('home.viewProducts')}
        </a>
      </div>
    </div>
  `

  return MainLayout({ 
    children: content, 
    title: t('home.title'), 
    lang, 
    seoTags 
  })
}