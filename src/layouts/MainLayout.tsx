import { BaseHtml } from './BaseHtml'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import type { SupportedLanguage } from '../lib/i18n'
import type { User } from '../lib/auth'

interface MainLayoutProps {
  children: string
  title?: string
  lang: SupportedLanguage
  seoTags?: string
  user?: User | null
  t?: (key: string) => string
  currentPath?: string
}

export function MainLayout({ children, title, lang, seoTags, user, t, currentPath }: MainLayoutProps): string {
  // Provide a default translator function if none is provided
  const defaultT = (key: string) => key.split('.').pop() || key
  const translator = t || defaultT
  
  const headerHtml = Header({ lang, user, t: translator, currentPath })
  const footerHtml = Footer({ lang, t: translator })
  
  const bodyContent = `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      ${headerHtml}
      <main class="flex-1">
        ${children}
      </main>
      ${footerHtml}
    </div>
  `

  return BaseHtml({ 
    children: bodyContent, 
    title, 
    lang, 
    seoTags 
  })
}