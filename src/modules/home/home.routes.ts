import { Elysia } from 'elysia'
import { HomePage } from './home.views'
import { createTranslator } from '../../lib/translate'

export const homeRoutes = new Elysia({ prefix: '' })
  .get('/', ({ request }) => {
    const lang = 'en'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return HomePage({ lang, t, currentPath })
  })
  .get('/ja', ({ request }) => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return HomePage({ lang, t, currentPath })
  })
  .get('/zh', ({ request }) => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return HomePage({ lang, t, currentPath })
  })