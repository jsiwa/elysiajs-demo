import { Elysia } from 'elysia'
import { HomePage } from './home.views'

export const homeRoutes = new Elysia({ prefix: '' })
  .get('/', ({ lang, t, html }) => {
    return html(HomePage({ lang, t }))
  })
  .get('/:lang', ({ params: { lang }, t, html }) => {
    // Handle localized home routes like /ja, /zh
    return html(HomePage({ lang, t }))
  })