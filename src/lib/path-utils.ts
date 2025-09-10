import type { SupportedLanguage } from './i18n'

/**
 * 根据语言生成正确的路径
 * @param path 基础路径，如 '/products', '/blog/hello-world'
 * @param lang 语言代码
 * @returns 带语言前缀的完整路径
 */
export function getLocalizedPath(path: string, lang: SupportedLanguage): string {
  // 确保路径以 / 开头
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  
  // 英语不需要前缀
  if (lang === 'en') {
    return path
  }
  
  // 其他语言添加前缀
  return `/${lang}${path}`
}

/**
 * 从路径中移除语言前缀
 * @param path 完整路径
 * @returns 不带语言前缀的基础路径
 */
export function removeLanguagePrefix(path: string): string {
  return path.replace(/^\/(ja|zh)/, '') || '/'
}

/**
 * 从路径中提取语言代码
 * @param path 完整路径
 * @returns 语言代码
 */
export function getLanguageFromPath(path: string): SupportedLanguage {
  if (path.startsWith('/ja')) return 'ja'
  if (path.startsWith('/zh')) return 'zh'
  return 'en'
}

/**
 * 生成所有语言版本的路径
 * @param basePath 基础路径
 * @returns 所有语言的路径对象
 */
export function getAllLanguagePaths(basePath: string) {
  return {
    en: getLocalizedPath(basePath, 'en'),
    ja: getLocalizedPath(basePath, 'ja'),
    zh: getLocalizedPath(basePath, 'zh'),
  }
}

/**
 * 根据当前路径生成语言切换链接
 * @param currentPath 当前完整路径
 * @returns 语言切换链接对象
 */
export function getLanguageSwitchPaths(currentPath: string) {
  const basePath = removeLanguagePrefix(currentPath)
  return getAllLanguagePaths(basePath)
}

/**
 * 路径工具类 - 提供便捷的路径操作方法
 */
export class PathUtils {
  constructor(private lang: SupportedLanguage) {}
  
  /**
   * 生成本地化路径
   * @param path 基础路径
   * @returns 带语言前缀的路径
   */
  to(path: string): string {
    return getLocalizedPath(path, this.lang)
  }
  
  /**
   * 生成带查询参数的路径
   * @param path 基础路径
   * @param query 查询参数对象
   * @returns 完整的路径
   */
  toWithQuery(path: string, query: Record<string, string>): string {
    const localizedPath = this.to(path)
    const queryString = new URLSearchParams(query).toString()
    return queryString ? `${localizedPath}?${queryString}` : localizedPath
  }
  
  /**
   * 生成带锚点的路径
   * @param path 基础路径
   * @param hash 锚点
   * @returns 带锚点的路径
   */
  toWithHash(path: string, hash: string): string {
    const localizedPath = this.to(path)
    return `${localizedPath}#${hash}`
  }
  
  /**
   * 检查路径是否匹配
   * @param currentPath 当前路径
   * @param targetPath 目标路径
   * @returns 是否匹配
   */
  matches(currentPath: string, targetPath: string): boolean {
    const normalizedCurrent = removeLanguagePrefix(currentPath)
    const normalizedTarget = removeLanguagePrefix(targetPath)
    return normalizedCurrent === normalizedTarget
  }
  
  /**
   * 检查路径是否以指定路径开头
   * @param currentPath 当前路径
   * @param prefix 前缀路径
   * @returns 是否匹配
   */
  startsWith(currentPath: string, prefix: string): boolean {
    const normalizedCurrent = removeLanguagePrefix(currentPath)
    const normalizedPrefix = removeLanguagePrefix(prefix)
    return normalizedCurrent.startsWith(normalizedPrefix)
  }
}

/**
 * 创建路径工具实例
 * @param lang 语言代码
 * @returns PathUtils 实例
 */
export function createPathUtils(lang: SupportedLanguage): PathUtils {
  return new PathUtils(lang)
}

/**
 * 路径模板函数 - 支持参数替换
 * @param template 路径模板，如 '/user/:id/posts/:postId'
 * @param params 参数对象
 * @param lang 语言代码
 * @returns 完整的本地化路径
 */
export function pathTemplate(
  template: string, 
  params: Record<string, string>, 
  lang: SupportedLanguage
): string {
  let path = template
  
  // 替换参数
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`:${key}`, encodeURIComponent(value))
  }
  
  return getLocalizedPath(path, lang)
}

/**
 * 批量生成路径的辅助函数
 * @param paths 路径数组
 * @param lang 语言代码
 * @returns 本地化路径数组
 */
export function localizePaths(paths: string[], lang: SupportedLanguage): string[] {
  return paths.map(path => getLocalizedPath(path, lang))
}

/**
 * URL 构建器 - 链式调用构建复杂 URL
 */
export class URLBuilder {
  private basePath: string
  private queryParams: Record<string, string> = {}
  private hashValue: string = ''
  
  constructor(private lang: SupportedLanguage, basePath: string) {
    this.basePath = basePath
  }
  
  /**
   * 添加查询参数
   */
  query(key: string, value: string): URLBuilder {
    this.queryParams[key] = value
    return this
  }
  
  /**
   * 批量添加查询参数
   */
  queries(params: Record<string, string>): URLBuilder {
    Object.assign(this.queryParams, params)
    return this
  }
  
  /**
   * 设置锚点
   */
  hash(value: string): URLBuilder {
    this.hashValue = value
    return this
  }
  
  /**
   * 构建最终 URL
   */
  build(): string {
    let url = getLocalizedPath(this.basePath, this.lang)
    
    // 添加查询参数
    const queryString = new URLSearchParams(this.queryParams).toString()
    if (queryString) {
      url += `?${queryString}`
    }
    
    // 添加锚点
    if (this.hashValue) {
      url += `#${this.hashValue}`
    }
    
    return url
  }
  
  /**
   * 转换为字符串
   */
  toString(): string {
    return this.build()
  }
}

/**
 * 创建 URL 构建器
 * @param lang 语言代码
 * @param basePath 基础路径
 * @returns URLBuilder 实例
 */
export function createURL(lang: SupportedLanguage, basePath: string): URLBuilder {
  return new URLBuilder(lang, basePath)
}

/**
 * 常用路径常量 - 可选使用
 */
export const COMMON_PATHS = {
  HOME: '/',
  PRODUCTS: '/products',
  BLOG: '/blog',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_FILES: '/admin/files',
} as const

/**
 * 路径验证工具
 */
export class PathValidator {
  /**
   * 验证路径格式是否正确
   */
  static isValidPath(path: string): boolean {
    return typeof path === 'string' && path.length > 0
  }
  
  /**
   * 验证是否为绝对路径
   */
  static isAbsolutePath(path: string): boolean {
    return path.startsWith('/')
  }
  
  /**
   * 验证是否为相对路径
   */
  static isRelativePath(path: string): boolean {
    return !path.startsWith('/') && !path.includes('://')
  }
  
  /**
   * 验证是否为外部链接
   */
  static isExternalLink(path: string): boolean {
    return path.includes('://') || path.startsWith('//')
  }
  
  /**
   * 标准化路径
   */
  static normalizePath(path: string): string {
    // 移除多余的斜杠
    path = path.replace(/\/+/g, '/')
    
    // 确保以 / 开头（如果不是外部链接）
    if (!this.isExternalLink(path) && !path.startsWith('/')) {
      path = '/' + path
    }
    
    // 移除末尾的斜杠（除非是根路径）
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1)
    }
    
    return path
  }
}