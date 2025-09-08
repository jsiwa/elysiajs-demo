import { Elysia } from 'elysia'
import { ProductsPage } from './products.views'
import { createTranslator } from '../../lib/translate'

export const productsRoutes = new Elysia({ prefix: '' })
  .get('/products', ({ request }) => {
    const lang = 'en'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return ProductsPage({ lang, t, currentPath })
  })
  .get('/ja/products', ({ request }) => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return ProductsPage({ lang, t, currentPath })
  })
  .get('/zh/products', ({ request }) => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return ProductsPage({ lang, t, currentPath })
  })