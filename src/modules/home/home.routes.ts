import { Elysia } from 'elysia'
import { HomePage } from './home.views'
import { createI18nRoutes } from '../../lib/i18n-routes'

export const homeRoutes = createI18nRoutes(new Elysia({ prefix: '' }), [
  {
    path: '/',
    handler: ({ lang, t, currentPath }) => {
      return HomePage({ lang, t, currentPath })
    }
  }
])