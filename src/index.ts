import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'

import { i18nPlugin } from './plugins/i18n'
import { homeRoutes } from './modules/home/home.routes'
import { productsRoutes } from './modules/products/products.routes'
import { blogRoutes } from './modules/blog/blog.routes'
import { adminRoutes } from './modules/admin/admin.routes'
import { authRoutes } from './modules/auth/auth.routes'
import { simpleAuthRoutes } from './modules/auth/simple-auth.routes'

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
  .derive(({ cookie }) => {
    // 安全地访问session cookie
    const session = cookie?.session
    return {
      user: null,
      session: session?.value || null,
      isAuthenticated: false
    }
  })
  .use(i18nPlugin)
  .use(simpleAuthRoutes)
  .use(homeRoutes)
  .use(productsRoutes)
  .use(blogRoutes)
  .use(adminRoutes)
  .use(authRoutes)
  // Test routes
  .get('/test', () => 'Test route works!')
  .get('/test-login', () => Bun.file('test-login.html').text())
  .get('/test-admin', () => Bun.file('test-admin.html').text())
  .get('/test-i18n', () => Bun.file('test-i18n.html').text())
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
console.log('  - /admin (Admin Dashboard)')
console.log('  - /admin/files (File Manager)')
console.log('  - /login (Simple Login)')
console.log('  - /register (Simple Register)')
console.log('  - /profile (Profile)')
console.log('  - /test (Test route)')
console.log('  - /test-login (Login Test Page)')
console.log('  - /test-admin (Admin Test Page)')
console.log('  - /test-i18n (I18n Test Page)')
console.log('')
console.log('🔐 Demo accounts:')
console.log('  - Admin: admin@example.com / admin123')
console.log('  - Demo: demo@example.com / demo123')
console.log('  - User: user@example.com / user123')
console.log('')
console.log('🧪 Quick tests:')
console.log('  - Login: http://localhost:3000/test-login')
console.log('  - Admin: http://localhost:3000/test-admin')
console.log('  - I18n: http://localhost:3000/test-i18n')

export type App = typeof app