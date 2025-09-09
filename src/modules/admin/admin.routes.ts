import { Elysia } from 'elysia'
import { AdminDashboardPage, FileManagerPage } from './admin.views'
import { createTranslator } from '../../lib/translate'
import { R2Manager } from '../../lib/r2'
import { sessions } from '../auth/simple-auth.routes'

export const adminRoutes = new Elysia({ prefix: '' })
  // 添加用户信息到上下文
  .derive(({ cookie }) => {
    // 安全地访问session cookie
    const session = cookie?.session
    const sessionId = session?.value
    
    // 从会话存储中获取用户信息
    const user = sessionId ? sessions.get(sessionId) : null
    
    return {
      user,
      sessionId
    }
  })

  // 管理员权限检查中间件
  .guard({
    beforeHandle({ user, set, request }) {
      if (!user) {
        // 未登录，重定向到登录页面
        const url = new URL(request.url)
        const redirectPath = url.pathname
        set.redirect = `/login?redirect=${encodeURIComponent(redirectPath)}`
        return
      }
      
      if (user.role !== 'admin') {
        // 非管理员用户，返回403
        set.status = 403
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Access Denied</title>
              <link rel="stylesheet" href="/public/css/main.css" />
            </head>
            <body class="bg-gray-50">
              <div class="min-h-screen flex items-center justify-center">
                <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                  <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h1 class="text-2xl font-bold text-gray-900 mb-2">访问被拒绝</h1>
                  <p class="text-gray-600 mb-6">您没有权限访问管理后台</p>
                  <a href="/" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    返回首页
                  </a>
                </div>
              </div>
            </body>
          </html>
        `
      }
    }
  }, (app) => app
    // Admin dashboard routes
    .get('/admin', ({ request, user }) => {
      const lang = 'en'
      const t = createTranslator(lang)
      const currentPath = new URL(request.url).pathname
      return AdminDashboardPage({ lang, t, currentPath, user })
    })
    .get('/ja/admin', ({ request, user }) => {
      const lang = 'ja'
      const t = createTranslator(lang)
      const currentPath = new URL(request.url).pathname
      return AdminDashboardPage({ lang, t, currentPath, user })
    })
    .get('/zh/admin', ({ request, user }) => {
      const lang = 'zh'
      const t = createTranslator(lang)
      const currentPath = new URL(request.url).pathname
      return AdminDashboardPage({ lang, t, currentPath, user })
    })
  )

  // File manager routes (也需要管理员权限)
  .guard({
    beforeHandle({ user, set, request }) {
      if (!user) {
        const url = new URL(request.url)
        const redirectPath = url.pathname
        set.redirect = `/login?redirect=${encodeURIComponent(redirectPath)}`
        return
      }
      
      if (user.role !== 'admin') {
        set.status = 403
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Access Denied</title>
              <link rel="stylesheet" href="/public/css/main.css" />
            </head>
            <body class="bg-gray-50">
              <div class="min-h-screen flex items-center justify-center">
                <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                  <h1 class="text-2xl font-bold text-gray-900 mb-2">访问被拒绝</h1>
                  <p class="text-gray-600 mb-6">您没有权限访问文件管理器</p>
                  <a href="/" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    返回首页
                  </a>
                </div>
              </div>
            </body>
          </html>
        `
      }
    }
  }, (app) => app
    .get('/admin/files', async ({ request, query, user }) => {
      const lang = 'en'
      const t = createTranslator(lang)
      const currentPath = new URL(request.url).pathname
      
      try {
        const files = await R2Manager.listFiles(query.folder as string)
        return FileManagerPage({ lang, t, files, currentFolder: query.folder as string || '', currentPath, user })
      } catch (error) {
        console.error('Failed to load files:', error)
        return FileManagerPage({ lang, t, files: [], currentFolder: '', currentPath, user })
      }
    })
    .get('/ja/admin/files', async ({ request, query, user }) => {
      const lang = 'ja'
      const t = createTranslator(lang)
      const currentPath = new URL(request.url).pathname
      
      try {
        const files = await R2Manager.listFiles(query.folder as string)
        return FileManagerPage({ lang, t, files, currentFolder: query.folder as string || '', currentPath, user })
      } catch (error) {
        console.error('Failed to load files:', error)
        return FileManagerPage({ lang, t, files: [], currentFolder: '', currentPath, user })
      }
    })
    .get('/zh/admin/files', async ({ request, query, user }) => {
      const lang = 'zh'
      const t = createTranslator(lang)
      const currentPath = new URL(request.url).pathname
      
      try {
        const files = await R2Manager.listFiles(query.folder as string)
        return FileManagerPage({ lang, t, files, currentFolder: query.folder as string || '', currentPath, user })
      } catch (error) {
        console.error('Failed to load files:', error)
        return FileManagerPage({ lang, t, files: [], currentFolder: '', currentPath, user })
      }
    })
  )

  // API routes for file operations
  .group('/api/admin', (app) =>
    app
      // Get stats
      .get('/stats', async () => {
        try {
          const files = await R2Manager.listFiles()
          
          const totalFiles = files.length
          const totalSize = files.reduce((sum, file) => sum + file.size, 0)
          const imageCount = files.filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase()
            return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')
          }).length
          const documentCount = files.filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase()
            return ['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext || '')
          }).length

          return {
            totalFiles,
            storageUsed: R2Manager.formatFileSize(totalSize),
            imageCount,
            documentCount
          }
        } catch (error) {
          console.error('Failed to get stats:', error)
          return {
            totalFiles: 0,
            storageUsed: '0 MB',
            imageCount: 0,
            documentCount: 0
          }
        }
      })

      // Upload file
      .post('/upload', async ({ body }) => {
        try {
          const formData = body as FormData
          const file = formData.get('file') as File
          
          if (!file) {
            return { success: false, error: 'No file provided' }
          }

          // Generate unique key
          const key = R2Manager.generateUniqueKey(file.name, 'uploads')
          
          // Upload to R2
          const result = await R2Manager.uploadFile(key, file, file.type)
          
          return result
        } catch (error) {
          console.error('Upload failed:', error)
          return { success: false, error: 'Upload failed' }
        }
      })

      // Delete file
      .delete('/files/:key', async ({ params }) => {
        try {
          const key = decodeURIComponent(params.key)
          const success = await R2Manager.deleteFile(key)
          
          return { success }
        } catch (error) {
          console.error('Delete failed:', error)
          return { success: false, error: 'Delete failed' }
        }
      })

      // Rename file
      .post('/files/rename', async ({ body }) => {
        try {
          const { oldKey, newKey } = body as { oldKey: string; newKey: string }
          
          if (!oldKey || !newKey) {
            return { success: false, error: 'Missing keys' }
          }

          const success = await R2Manager.renameFile(oldKey, newKey)
          
          return { success }
        } catch (error) {
          console.error('Rename failed:', error)
          return { success: false, error: 'Rename failed' }
        }
      })

      // Get file info
      .get('/files/:key/info', async ({ params }) => {
        try {
          const key = decodeURIComponent(params.key)
          const fileInfo = await R2Manager.getFileInfo(key)
          
          return { success: true, file: fileInfo }
        } catch (error) {
          console.error('Get file info failed:', error)
          return { success: false, error: 'Failed to get file info' }
        }
      })

      // Generate upload URL
      .post('/upload-url', async ({ body }) => {
        try {
          const { filename, contentType } = body as { filename: string; contentType?: string }
          
          if (!filename) {
            return { success: false, error: 'Filename required' }
          }

          const key = R2Manager.generateUniqueKey(filename, 'uploads')
          const uploadUrl = await R2Manager.getUploadUrl(key, contentType)
          
          return { success: true, uploadUrl, key }
        } catch (error) {
          console.error('Generate upload URL failed:', error)
          return { success: false, error: 'Failed to generate upload URL' }
        }
      })
  )