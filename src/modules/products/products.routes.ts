import { Elysia } from 'elysia'
import { ProductsPage } from './products.views'
import { createTranslator } from '../../lib/translate'

export const productsRoutes = new Elysia({ prefix: '' })
  .get('/products', ({ lang, t }) => {
    return ProductsPage({ lang, t })
  })
  .get('/ja/products', () => {
    const lang = 'ja'
    const t = createTranslator(lang)
    return ProductsPage({ lang, t })
  })
  .get('/zh/products', () => {
    const lang = 'zh'
    const t = createTranslator(lang)
    return ProductsPage({ lang, t })
  })