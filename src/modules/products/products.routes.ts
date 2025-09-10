import { Elysia } from 'elysia'
import { ProductsPage } from './products.views'
import { createI18nRoutes } from '../../lib/i18n-routes'

export const productsRoutes = createI18nRoutes(new Elysia({ prefix: '' }), [
  {
    path: '/products',
    handler: ({ lang, t, currentPath }) => {
      return ProductsPage({ lang, t, currentPath })
    }
  }
])