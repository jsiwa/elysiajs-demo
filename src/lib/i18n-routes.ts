import { Elysia } from 'elysia'
import { createTranslator } from './translate'
import type { SupportedLanguage } from './i18n'

// 支持的语言列表
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'ja', 'zh']

// 路由处理函数类型
export type RouteHandler = (params: {
  lang: SupportedLanguage
  t: (key: string) => string
  currentPath: string
  request: Request
  [key: string]: any
}) => any

// 多语言路由配置
export interface I18nRouteConfig {
  path: string // 基础路径，如 '/products'
  handler: RouteHandler
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}

/**
 * 创建多语言路由的辅助函数
 * @param app Elysia 应用实例
 * @param configs 路由配置数组
 * @returns 配置了多语言路由的 Elysia 实例
 */
export function createI18nRoutes(app: Elysia, configs: I18nRouteConfig[]) {
  for (const config of configs) {
    const { path, handler, method = 'GET' } = config
    
    // 为每种语言创建路由
    for (const lang of SUPPORTED_LANGUAGES) {
      const routePath = lang === 'en' ? path : `/${lang}${path}`
      
      // 根据 HTTP 方法注册路由
      switch (method.toLowerCase()) {
        case 'get':
          app.get(routePath, (context) => {
            const { request, ...rest } = context
            const t = createTranslator(lang)
            const currentPath = new URL(request.url).pathname
            
            return handler({
              lang,
              t,
              currentPath,
              request,
              ...rest
            })
          })
          break
        case 'post':
          app.post(routePath, (context) => {
            const { request, ...rest } = context
            const t = createTranslator(lang)
            const currentPath = new URL(request.url).pathname
            
            return handler({
              lang,
              t,
              currentPath,
              request,
              ...rest
            })
          })
          break
        // 可以根据需要添加更多 HTTP 方法
        default:
          console.warn(`Unsupported HTTP method: ${method}`)
      }
    }
  }
  
  return app
}

/**
 * 创建单个多语言路由的简化函数
 * @param app Elysia 应用实例
 * @param path 路径
 * @param handler 处理函数
 * @param method HTTP 方法
 * @returns 配置了多语言路由的 Elysia 实例
 */
export function addI18nRoute(
  app: Elysia, 
  path: string, 
  handler: RouteHandler, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET'
) {
  return createI18nRoutes(app, [{ path, handler, method }])
}

/**
 * 生成所有语言的路径
 * @param basePath 基础路径
 * @returns 所有语言的路径数组
 */
export function generateI18nPaths(basePath: string): string[] {
  return SUPPORTED_LANGUAGES.map(lang => 
    lang === 'en' ? basePath : `/${lang}${basePath}`
  )
}

/**
 * 根据当前路径获取语言代码
 * @param path 当前路径
 * @returns 语言代码
 */
export function getLanguageFromPath(path: string): SupportedLanguage {
  if (path.startsWith('/ja')) return 'ja'
  if (path.startsWith('/zh')) return 'zh'
  return 'en'
}

/**
 * 生成语言切换链接
 * @param currentPath 当前路径
 * @returns 语言切换链接对象
 */
export function generateLanguageLinks(currentPath: string) {
  // 移除语言前缀
  const pathWithoutLang = currentPath.replace(/^\/(ja|zh)/, '') || '/'
  
  return {
    en: pathWithoutLang === '/' ? '/' : pathWithoutLang,
    ja: pathWithoutLang === '/' ? '/ja' : `/ja${pathWithoutLang}`,
    zh: pathWithoutLang === '/' ? '/zh' : `/zh${pathWithoutLang}`
  }
}

/**
 * 多语言路由装饰器（用于类方法）
 */
export function I18nRoute(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 存储路由信息，可以在类初始化时使用
    if (!target.constructor._i18nRoutes) {
      target.constructor._i18nRoutes = []
    }
    target.constructor._i18nRoutes.push({
      path,
      method,
      handler: descriptor.value
    })
  }
}

/**
 * 批量创建 CRUD 路由的辅助函数
 * @param app Elysia 应用实例
 * @param basePath 基础路径，如 '/api/products'
 * @param handlers CRUD 处理函数
 * @returns 配置了 CRUD 路由的 Elysia 实例
 */
export function createI18nCrudRoutes(
  app: Elysia,
  basePath: string,
  handlers: {
    list?: RouteHandler
    create?: RouteHandler
    read?: RouteHandler
    update?: RouteHandler
    delete?: RouteHandler
  }
) {
  const routes: I18nRouteConfig[] = []
  
  if (handlers.list) {
    routes.push({ path: basePath, handler: handlers.list, method: 'GET' })
  }
  
  if (handlers.create) {
    routes.push({ path: basePath, handler: handlers.create, method: 'POST' })
  }
  
  if (handlers.read) {
    routes.push({ path: `${basePath}/:id`, handler: handlers.read, method: 'GET' })
  }
  
  if (handlers.update) {
    routes.push({ path: `${basePath}/:id`, handler: handlers.update, method: 'PUT' })
  }
  
  if (handlers.delete) {
    routes.push({ path: `${basePath}/:id`, handler: handlers.delete, method: 'DELETE' })
  }
  
  return createI18nRoutes(app, routes)
}