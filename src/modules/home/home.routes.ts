import { Elysia } from 'elysia'
import { HomePage } from './home.views'
import { createTranslator } from '../../lib/translate'

export const homeRoutes = new Elysia({ prefix: '' })
  .get('/', ({ lang, t }) => {
    return HomePage({ lang, t })
  })
  .get('/ja', () => {
    const lang = 'ja'
    const t = createTranslator(lang)
    return HomePage({ lang, t })
  })
  .get('/zh', () => {
    const lang = 'zh'
    const t = createTranslator(lang)
    return HomePage({ lang, t })
  })