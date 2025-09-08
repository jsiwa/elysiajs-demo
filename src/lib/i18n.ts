import i18next from 'i18next'
import Backend from 'i18next-fs-backend'

export const supportedLanguages = ['en', 'ja', 'zh'] as const
export type SupportedLanguage = typeof supportedLanguages[number]

export const defaultLanguage: SupportedLanguage = 'en'

export async function initI18n() {
  await i18next
    .use(Backend)
    .init({
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      supportedLngs: supportedLanguages,
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json'
      },
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false
      }
    })
  
  return i18next
}

export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage)
}

export { i18next }