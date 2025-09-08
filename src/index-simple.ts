import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'

import { i18nPlugin } from './plugins/i18n'
import { homeRoutes } from './modules/home/home.routes'
import { productsRoutes } from './modules/products/products.routes'

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
  .listen(3000)

console.log(`🦊 Elysia is running at http://localhost:3000`)

export type App = typeof app