import { Elysia } from 'elysia'
import { isValidLanguage, type SupportedLanguage } from '../lib/i18n'
import { createTranslator } from '../lib/translate'

export const i18nPlugin = new Elysia({ name: 'i18n' })
  .derive(({ request }) => {
    const url = new URL(request.url)
    const pathSegments = url.pathname.split('/').filter(Boolean)

    // Default to English
    let lang: SupportedLanguage = 'en'

    // Check if first segment is a language code
    if (pathSegments.length > 0 && isValidLanguage(pathSegments[0])) {
      lang = pathSegments[0] as SupportedLanguage
    }

    return {
      lang,
      t: createTranslator(lang)
    }
  })