import { BaseHtml } from './BaseHtml'
import { Header } from '../components/Header'
import type { SupportedLanguage } from '../lib/i18n'

interface MainLayoutProps {
  children: string
  title?: string
  lang: SupportedLanguage
  seoTags?: string
}

export function MainLayout({ children, title, lang, seoTags }: MainLayoutProps): string {
  const headerHtml = Header({ lang })
  
  const bodyContent = `
    <div class="min-h-screen bg-gray-50">
      ${headerHtml}
      <main class="container mx-auto px-4 py-8">
        ${children}
      </main>
    </div>
  `

  return BaseHtml({ 
    children: bodyContent, 
    title, 
    lang, 
    seoTags 
  })
}