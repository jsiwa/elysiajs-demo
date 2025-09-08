import { Elysia } from 'elysia'
import { initI18n, isValidLanguage, defaultLanguage, type SupportedLanguage } from '../lib/i18n'
import { extractLanguageFromPath } from '../lib/path'

export const i18nPlugin = new Elysia({ name: 'i18n' })
  .onStart(async () => {
    await initI18n()
  })
  .derive(({ request }) => {
    const url = new URL(request.url)
    const { lang, cleanPath } = extractLanguageFromPath(url.pathname)
    
    return {
      lang,
      cleanPath,
      t: (key: string, options?: any) => {
        const i18n = require('i18next').default
        return i18n.getFixedT(lang)(key, options)
      }
    }
  })