import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'

import { i18nPlugin } from './plugins/i18n'
import { homeRoutes } from './modules/home/home.routes'
import { productsRoutes } from './modules/products/products.routes'
import { blogRoutes } from './modules/blog/blog.routes'
import { authRoutes } from './modules/auth/auth.routes'

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: 'public',
    prefix: '/public'
  }))
  .use(cookie())
  .use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  }))
  .derive(() => ({
    user: null,
    session: null,
    isAuthenticated: false
  }))
  .use(i18nPlugin)
  .use(homeRoutes)
  .use(productsRoutes)
  .use(blogRoutes)
  .use(authRoutes)
  // Test route
  .get('/test', () => 'Test route works!')
  .listen(3000)

console.log(`🦊 Elysia is running at http://localhost:3000`)
console.log('📍 Available routes:')
console.log('  - / (Home)')
console.log('  - /ja (Home Japanese)')
console.log('  - /zh (Home Chinese)')
console.log('  - /products (Products)')
console.log('  - /ja/products (Products Japanese)')
console.log('  - /zh/products (Products Chinese)')
console.log('  - /blog (Blog)')
console.log('  - /ja/blog (Blog Japanese)')
console.log('  - /zh/blog (Blog Chinese)')
console.log('  - /blog/:slug (Blog Post)')
console.log('  - /login (Google Login)')
console.log('  - /register (Google Login)')
console.log('  - /profile (Profile)')
console.log('  - /test (Test route)')

export type App = typeof app