import type { SupportedLanguage } from './i18n'

export function getLocalizedPath(path: string, lang: SupportedLanguage): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // If it's the default language (en), don't prefix
  if (lang === 'en') {
    return `/${cleanPath}`
  }
  
  // For other languages, prefix with language code
  return `/${lang}/${cleanPath}`
}

export function extractLanguageFromPath(path: string): { lang: SupportedLanguage; cleanPath: string } {
  const segments = path.split('/').filter(Boolean)
  
  if (segments.length === 0) {
    return { lang: 'en', cleanPath: '/' }
  }
  
  const firstSegment = segments[0]
  
  // Check if first segment is a language code
  if (['ja', 'zh'].includes(firstSegment)) {
    const lang = firstSegment as SupportedLanguage
    const cleanPath = '/' + segments.slice(1).join('/')
    return { lang, cleanPath }
  }
  
  // Default to English
  return { lang: 'en', cleanPath: path }
}