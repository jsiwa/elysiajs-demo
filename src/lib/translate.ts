import type { SupportedLanguage } from './i18n'

// Import translation files directly
const enTranslations = require('../../locales/en/common.json')
const jaTranslations = require('../../locales/ja/common.json')
const zhTranslations = require('../../locales/zh/common.json')

const translations = {
  en: enTranslations,
  ja: jaTranslations,
  zh: zhTranslations
}

export function createTranslator(lang: SupportedLanguage) {
  return function t(key: string): string {
    const keys = key.split('.')
    let value: any = translations[lang]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }
}