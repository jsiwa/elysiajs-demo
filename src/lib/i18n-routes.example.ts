// 多语言路由使用示例

import { Elysia } from 'elysia'
import { createI18nRoutes, addI18nRoute, createI18nCrudRoutes } from './i18n-routes'

// 示例1: 简单的多语言路由
const simpleRoutes = createI18nRoutes(new Elysia(), [
  {
    path: '/about',
    handler: ({ lang, t, currentPath }) => {
      return `<h1>${t('about.title')}</h1>`
    }
  },
  {
    path: '/contact',
    handler: ({ lang, t, currentPath }) => {
      return `<h1>${t('contact.title')}</h1>`
    }
  }
])

// 示例2: 带参数的路由
const paramRoutes = createI18nRoutes(new Elysia(), [
  {
    path: '/user/:id',
    handler: ({ lang, t, params }) => {
      return `<h1>${t('user.profile')}: ${params.id}</h1>`
    }
  }
])

// 示例3: 不同HTTP方法的路由
const apiRoutes = createI18nRoutes(new Elysia(), [
  {
    path: '/api/posts',
    method: 'GET',
    handler: ({ lang, t }) => {
      return { message: t('api.posts.list') }
    }
  },
  {
    path: '/api/posts',
    method: 'POST',
    handler: ({ lang, t, body }) => {
      return { message: t('api.posts.created') }
    }
  }
])

// 示例4: 单个路由添加
const singleRoute = addI18nRoute(
  new Elysia(),
  '/help',
  ({ lang, t }) => `<h1>${t('help.title')}</h1>`
)

// 示例5: CRUD路由批量创建
const crudRoutes = createI18nCrudRoutes(new Elysia(), '/api/products', {
  list: ({ lang, t }) => ({ message: t('products.list') }),
  create: ({ lang, t, body }) => ({ message: t('products.created') }),
  read: ({ lang, t, params }) => ({ message: t('products.detail'), id: params.id }),
  update: ({ lang, t, params, body }) => ({ message: t('products.updated'), id: params.id }),
  delete: ({ lang, t, params }) => ({ message: t('products.deleted'), id: params.id })
})

// 示例6: 复杂的业务逻辑路由
const complexRoutes = createI18nRoutes(new Elysia(), [
  {
    path: '/dashboard',
    handler: async ({ lang, t, currentPath, user, set, request }) => {
      // 权限检查
      if (!user) {
        set.redirect = `/login?redirect=${encodeURIComponent(currentPath)}`
        return
      }
      
      // 业务逻辑
      const data = await fetchDashboardData(user.id)
      
      return renderDashboard({ lang, t, data, user })
    }
  }
])

// 辅助函数示例
async function fetchDashboardData(userId: string) {
  // 模拟数据获取
  return { stats: { users: 100, posts: 50 } }
}

function renderDashboard({ lang, t, data, user }: any) {
  return `
    <html>
      <head><title>${t('dashboard.title')}</title></head>
      <body>
        <h1>${t('dashboard.welcome', { name: user.name })}</h1>
        <p>${t('dashboard.stats.users')}: ${data.stats.users}</p>
        <p>${t('dashboard.stats.posts')}: ${data.stats.posts}</p>
      </body>
    </html>
  `
}

// 如何添加新语言支持：
// 1. 在 SUPPORTED_LANGUAGES 数组中添加新语言代码
// 2. 在 locales 目录下添加对应的翻译文件
// 3. 所有现有路由自动支持新语言，无需修改代码！

// 例如，要添加法语支持：
// 1. 修改 i18n-routes.ts: SUPPORTED_LANGUAGES = ['en', 'ja', 'zh', 'fr']
// 2. 创建 locales/fr/common.json
// 3. 所有路由自动生成 /fr/* 版本

export {
  simpleRoutes,
  paramRoutes,
  apiRoutes,
  singleRoute,
  crudRoutes,
  complexRoutes
}