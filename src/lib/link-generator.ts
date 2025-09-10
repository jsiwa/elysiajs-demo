import type { SupportedLanguage } from './i18n'

// 路由定义接口
export interface RouteDefinition {
  path: string
  params?: Record<string, string>
  query?: Record<string, string>
}

// 预定义的路由映射
export const ROUTES = {
  // 基础页面
  home: '/',
  products: '/products',
  blog: '/blog',
  about: '/about',
  contact: '/contact',
  
  // 认证相关
  login: '/login',
  register: '/register',
  profile: '/profile',
  
  // 管理后台
  admin: '/admin',
  adminFiles: '/admin/files',
  
  // 博客相关
  blogPost: '/blog/:slug',
  
  // 用户相关
  userProfile: '/user/:id',
  
  // API 路由
  apiPosts: '/api/posts',
  apiUsers: '/api/users',
} as const

export type RouteName = keyof typeof ROUTES

/**
 * 生成多语言链接
 * @param routeName 路由名称
 * @param lang 语言代码
 * @param params 路径参数
 * @param query 查询参数
 * @returns 完整的链接
 */
export function generateLink(
  routeName: RouteName,
  lang: SupportedLanguage = 'en',
  params?: Record<string, string>,
  query?: Record<string, string>
): string {
  let path = ROUTES[routeName]
  
  // 替换路径参数
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, encodeURIComponent(value))
    }
  }
  
  // 添加语言前缀（英语除外）
  if (lang !== 'en') {
    path = `/${lang}${path}`
  }
  
  // 添加查询参数
  if (query && Object.keys(query).length > 0) {
    const queryString = new URLSearchParams(query).toString()
    path += `?${queryString}`
  }
  
  return path
}

/**
 * 批量生成多语言链接
 * @param routeName 路由名称
 * @param params 路径参数
 * @param query 查询参数
 * @returns 所有语言的链接对象
 */
export function generateAllLanguageLinks(
  routeName: RouteName,
  params?: Record<string, string>,
  query?: Record<string, string>
) {
  return {
    en: generateLink(routeName, 'en', params, query),
    ja: generateLink(routeName, 'ja', params, query),
    zh: generateLink(routeName, 'zh', params, query),
  }
}

/**
 * 根据当前路径生成语言切换链接
 * @param currentPath 当前路径
 * @returns 语言切换链接对象
 */
export function generateLanguageSwitchLinks(currentPath: string) {
  // 移除语言前缀，获取基础路径
  const pathWithoutLang = currentPath.replace(/^\/(ja|zh)/, '') || '/'
  
  return {
    en: pathWithoutLang === '/' ? '/' : pathWithoutLang,
    ja: pathWithoutLang === '/' ? '/ja' : `/ja${pathWithoutLang}`,
    zh: pathWithoutLang === '/' ? '/zh' : `/zh${pathWithoutLang}`,
  }
}

/**
 * 创建链接生成器类，用于特定语言的链接生成
 */
export class LinkGenerator {
  constructor(private lang: SupportedLanguage) {}
  
  /**
   * 生成指定路由的链接
   */
  to(routeName: RouteName, params?: Record<string, string>, query?: Record<string, string>): string {
    return generateLink(routeName, this.lang, params, query)
  }
  
  /**
   * 生成首页链接
   */
  home(): string {
    return this.to('home')
  }
  
  /**
   * 生成产品页面链接
   */
  products(): string {
    return this.to('products')
  }
  
  /**
   * 生成博客列表链接
   */
  blog(): string {
    return this.to('blog')
  }
  
  /**
   * 生成博客文章链接
   */
  blogPost(slug: string): string {
    return this.to('blogPost', { slug })
  }
  
  /**
   * 生成登录链接
   */
  login(redirectTo?: string): string {
    return this.to('login', undefined, redirectTo ? { redirect: redirectTo } : undefined)
  }
  
  /**
   * 生成注册链接
   */
  register(): string {
    return this.to('register')
  }
  
  /**
   * 生成个人资料链接
   */
  profile(): string {
    return this.to('profile')
  }
  
  /**
   * 生成管理后台链接
   */
  admin(): string {
    return this.to('admin')
  }
  
  /**
   * 生成文件管理器链接
   */
  adminFiles(): string {
    return this.to('adminFiles')
  }
  
  /**
   * 生成用户资料链接
   */
  userProfile(userId: string): string {
    return this.to('userProfile', { id: userId })
  }
}

/**
 * 创建链接生成器实例
 * @param lang 语言代码
 * @returns LinkGenerator 实例
 */
export function createLinkGenerator(lang: SupportedLanguage): LinkGenerator {
  return new LinkGenerator(lang)
}

/**
 * 验证路由参数是否完整
 * @param routeName 路由名称
 * @param params 提供的参数
 * @returns 是否有缺失的参数
 */
export function validateRouteParams(routeName: RouteName, params?: Record<string, string>): string[] {
  const route = ROUTES[routeName]
  const requiredParams = route.match(/:(\w+)/g)?.map(param => param.slice(1)) || []
  const providedParams = Object.keys(params || {})
  
  return requiredParams.filter(param => !providedParams.includes(param))
}

/**
 * 获取路由的所有参数
 * @param routeName 路由名称
 * @returns 参数名数组
 */
export function getRouteParams(routeName: RouteName): string[] {
  const route = ROUTES[routeName]
  return route.match(/:(\w+)/g)?.map(param => param.slice(1)) || []
}

/**
 * 检查路径是否匹配指定路由
 * @param path 当前路径
 * @param routeName 路由名称
 * @returns 是否匹配
 */
export function matchesRoute(path: string, routeName: RouteName): boolean {
  // 移除语言前缀
  const normalizedPath = path.replace(/^\/(ja|zh)/, '') || '/'
  const routePattern = ROUTES[routeName]
  
  // 将路由模式转换为正则表达式
  const regexPattern = routePattern.replace(/:(\w+)/g, '([^/]+)')
  const regex = new RegExp(`^${regexPattern}$`)
  
  return regex.test(normalizedPath)
}

/**
 * 从路径中提取参数
 * @param path 当前路径
 * @param routeName 路由名称
 * @returns 提取的参数对象
 */
export function extractRouteParams(path: string, routeName: RouteName): Record<string, string> {
  const normalizedPath = path.replace(/^\/(ja|zh)/, '') || '/'
  const routePattern = ROUTES[routeName]
  const paramNames = getRouteParams(routeName)
  
  if (paramNames.length === 0) {
    return {}
  }
  
  const regexPattern = routePattern.replace(/:(\w+)/g, '([^/]+)')
  const regex = new RegExp(`^${regexPattern}$`)
  const matches = normalizedPath.match(regex)
  
  if (!matches) {
    return {}
  }
  
  const params: Record<string, string> = {}
  paramNames.forEach((name, index) => {
    params[name] = decodeURIComponent(matches[index + 1])
  })
  
  return params
}