import { Elysia } from 'elysia'
import { ProductsPage } from './products.views'

export const productsRoutes = new Elysia({ prefix: '' })
  .get('/products', ({ lang, t, html }) => {
    return html(ProductsPage({ lang, t }))
  })
  .get('/:lang/products', ({ params: { lang }, t, html }) => {
    // Handle localized product routes like /ja/products, /zh/products
    return html(ProductsPage({ lang, t }))
  })