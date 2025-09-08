import { getLocalizedPath } from '../lib/path'
import type { SupportedLanguage } from '../lib/i18n'

interface HeaderProps {
  lang: SupportedLanguage
}

export function Header({ lang }: HeaderProps): string {
  const homeLink = getLocalizedPath('/', lang)
  const productsLink = getLocalizedPath('/products', lang)
  
  const languageSwitcher = LanguageSwitcher({ currentLang: lang })
  
  return `
    <header class="bg-white shadow-sm border-b">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <a href="${homeLink}" class="text-xl font-bold text-gray-900">
              Elysia App
            </a>
            <div class="flex space-x-6">
              <a href="${homeLink}" class="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="${productsLink}" class="text-gray-600 hover:text-gray-900">
                Products
              </a>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            ${languageSwitcher}
          </div>
        </div>
      </nav>
    </header>
  `
}

function LanguageSwitcher({ currentLang }: { currentLang: SupportedLanguage }): string {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' }
  ]
  
  const languageLinks = languages.map(({ code, name }) => {
    const isActive = currentLang === code
    const className = isActive 
      ? 'px-2 py-1 text-sm rounded bg-blue-100 text-blue-800'
      : 'px-2 py-1 text-sm rounded text-gray-600 hover:text-gray-900'
    
    return `
      <a href="/${code === 'en' ? '' : code}" class="${className}">
        ${name}
      </a>
    `
  }).join('')
  
  return `
    <div class="flex space-x-2">
      ${languageLinks}
    </div>
  `
}