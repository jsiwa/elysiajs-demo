import { Elysia } from 'elysia'

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: '2', 
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    password: 'user123'
  },
  {
    id: '3',
    email: 'demo@example.com', 
    name: 'Demo User',
    role: 'admin',
    password: 'demo123'
  }
]

// 简单的会话存储 - 导出以便其他模块使用
export const sessions = new Map<string, any>()

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const simpleAuthRoutes = new Elysia({ prefix: '' })
  // 登录页面
  .get('/login', ({ query }) => {
    const message = query.message || ''
    const error = query.error || ''
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login - Elysia Admin</title>
          <link rel="stylesheet" href="/public/css/main.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body class="bg-gradient-to-br from-blue-50 to-indigo-100">
          <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
              <div>
                <div class="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  登录到管理后台
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                  使用演示账号快速体验
                </p>
              </div>
              
              ${error ? `
                <div class="bg-red-50 border border-red-200 rounded-md p-4">
                  <div class="flex">
                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    <div class="ml-3">
                      <p class="text-sm text-red-800">${error}</p>
                    </div>
                  </div>
                </div>
              ` : ''}
              
              ${message ? `
                <div class="bg-green-50 border border-green-200 rounded-md p-4">
                  <div class="flex">
                    <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <div class="ml-3">
                      <p class="text-sm text-green-800">${message}</p>
                    </div>
                  </div>
                </div>
              ` : ''}

              <form id="loginForm" class="mt-8 space-y-6" action="/api/auth/login" method="POST">
                <div class="rounded-md shadow-sm space-y-4">
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
                    <input id="email" name="email" type="email" required 
                           class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                           placeholder="输入邮箱地址" value="admin@example.com">
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                    <input id="password" name="password" type="password" required 
                           class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                           placeholder="输入密码" value="admin123">
                  </div>
                </div>

                <div>
                  <button type="submit" 
                          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    登录
                  </button>
                </div>

                <div class="mt-6">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-2 bg-gray-50 text-gray-500">演示账号</span>
                    </div>
                  </div>

                  <div class="mt-6 grid grid-cols-1 gap-3">
                    <button type="button" onclick="quickLogin('admin@example.com', 'admin123')"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                      <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                      管理员账号 (admin@example.com)
                    </button>
                    
                    <button type="button" onclick="quickLogin('demo@example.com', 'demo123')"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                      <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                      </svg>
                      演示账号 (demo@example.com)
                    </button>
                    
                    <button type="button" onclick="quickLogin('user@example.com', 'user123')"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                      <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                      普通用户 (user@example.com)
                    </button>
                  </div>
                </div>
              </form>

              <div class="text-center">
                <p class="text-sm text-gray-600">
                  没有账号? 
                  <a href="/register" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                    立即注册
                  </a>
                </p>
              </div>
            </div>
          </div>

          <script>
            function quickLogin(email, password) {
              document.getElementById('email').value = email;
              document.getElementById('password').value = password;
              document.getElementById('loginForm').submit();
            }

            // 处理表单提交
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
              e.preventDefault();
              
              const formData = new FormData(e.target);
              const email = formData.get('email');
              const password = formData.get('password');
              
              try {
                const response = await fetch('/api/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password }),
                  credentials: 'include'
                });
                
                const result = await response.json();
                
                if (response.ok) {
                  // 登录成功，检查是否有重定向地址
                  const urlParams = new URLSearchParams(window.location.search);
                  const redirectTo = urlParams.get('redirect');
                  
                  if (redirectTo) {
                    // 有重定向地址，跳转到指定页面
                    window.location.href = redirectTo;
                  } else if (result.user.role === 'admin') {
                    // 管理员默认跳转到管理后台
                    window.location.href = '/admin';
                  } else {
                    // 普通用户跳转到首页
                    window.location.href = '/';
                  }
                } else {
                  // 显示错误信息
                  window.location.href = '/login?error=' + encodeURIComponent(result.error || '登录失败');
                }
              } catch (error) {
                console.error('Login error:', error);
                window.location.href = '/login?error=' + encodeURIComponent('网络错误，请重试');
              }
            });
          </script>
        </body>
      </html>
    `
  })
  
  // 注册页面
  .get('/register', ({ query }) => {
    const message = query.message || ''
    const error = query.error || ''
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Register - Elysia Admin</title>
          <link rel="stylesheet" href="/public/css/main.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body class="bg-gradient-to-br from-blue-50 to-indigo-100">
          <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
              <div>
                <div class="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  创建新账号
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                  注册后即可使用所有功能
                </p>
              </div>
              
              ${error ? `
                <div class="bg-red-50 border border-red-200 rounded-md p-4">
                  <div class="flex">
                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    <div class="ml-3">
                      <p class="text-sm text-red-800">${error}</p>
                    </div>
                  </div>
                </div>
              ` : ''}
              
              ${message ? `
                <div class="bg-green-50 border border-green-200 rounded-md p-4">
                  <div class="flex">
                    <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <div class="ml-3">
                      <p class="text-sm text-green-800">${message}</p>
                    </div>
                  </div>
                </div>
              ` : ''}

              <form id="registerForm" class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                    <input id="name" name="name" type="text" required 
                           class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                           placeholder="输入您的姓名">
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
                    <input id="email" name="email" type="email" required 
                           class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                           placeholder="输入邮箱地址">
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                    <input id="password" name="password" type="password" required 
                           class="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                           placeholder="输入密码 (至少6位)">
                  </div>
                </div>

                <div>
                  <button type="submit" 
                          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                      </svg>
                    </span>
                    注册账号
                  </button>
                </div>
              </form>

              <div class="text-center">
                <p class="text-sm text-gray-600">
                  已有账号? 
                  <a href="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                    立即登录
                  </a>
                </p>
              </div>
            </div>
          </div>

          <script>
            document.getElementById('registerForm').addEventListener('submit', async (e) => {
              e.preventDefault();
              
              const formData = new FormData(e.target);
              const name = formData.get('name');
              const email = formData.get('email');
              const password = formData.get('password');
              
              if (password.length < 6) {
                window.location.href = '/register?error=' + encodeURIComponent('密码至少需要6位字符');
                return;
              }
              
              try {
                const response = await fetch('/api/auth/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name, email, password }),
                  credentials: 'include'
                });
                
                const result = await response.json();
                
                if (response.ok) {
                  window.location.href = '/login?message=' + encodeURIComponent('注册成功！请登录您的账号');
                } else {
                  window.location.href = '/register?error=' + encodeURIComponent(result.error || '注册失败');
                }
              } catch (error) {
                console.error('Register error:', error);
                window.location.href = '/register?error=' + encodeURIComponent('网络错误，请重试');
              }
            });
          </script>
        </body>
      </html>
    `
  })

  // 登录API
  .post('/api/auth/login', async ({ body, set, cookie }) => {
    try {
      const { email, password } = body as { email: string; password: string }
      
      // 查找用户
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (!user) {
        set.status = 401
        return { error: '邮箱或密码错误' }
      }
      
      // 创建会话
      const sessionId = generateSessionId()
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
      
      sessions.set(sessionId, userData)
      
      // 设置cookie
      if (cookie.session) {
        cookie.session.set({
          value: sessionId,
          httpOnly: true,
          secure: false, // 开发环境设为false
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 // 7天
        })
      }
      
      return { 
        success: true, 
        user: userData,
        message: '登录成功'
      }
    } catch (error) {
      console.error('Login error:', error)
      set.status = 500
      return { error: '服务器错误' }
    }
  })

  // 注册API
  .post('/api/auth/register', async ({ body, set }) => {
    try {
      const { name, email, password } = body as { name: string; email: string; password: string }
      
      // 检查邮箱是否已存在
      const existingUser = mockUsers.find(u => u.email === email)
      if (existingUser) {
        set.status = 400
        return { error: '该邮箱已被注册' }
      }
      
      // 验证密码长度
      if (password.length < 6) {
        set.status = 400
        return { error: '密码至少需要6位字符' }
      }
      
      // 创建新用户
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        role: 'user', // 默认为普通用户
        password
      }
      
      mockUsers.push(newUser)
      
      return { 
        success: true,
        message: '注册成功'
      }
    } catch (error) {
      console.error('Register error:', error)
      set.status = 500
      return { error: '服务器错误' }
    }
  })

  // 登出API
  .post('/api/auth/sign-out', ({ cookie, set }) => {
    try {
      const session = cookie?.session
      const sessionId = session?.value
      if (sessionId) {
        sessions.delete(sessionId)
      }
      
      session?.remove()
      
      return { success: true, message: '登出成功' }
    } catch (error) {
      console.error('Logout error:', error)
      set.status = 500
      return { error: '登出失败' }
    }
  })

  // 获取当前用户信息API
  .get('/api/auth/me', ({ cookie, set }) => {
    try {
      const session = cookie?.session
      const sessionId = session?.value
      if (!sessionId) {
        set.status = 401
        return { error: '未登录' }
      }
      
      const user = sessions.get(sessionId)
      if (!user) {
        set.status = 401
        return { error: '会话已过期' }
      }
      
      return { user }
    } catch (error) {
      console.error('Get user error:', error)
      set.status = 500
      return { error: '服务器错误' }
    }
  })

  // 中间件：获取当前用户
  .derive(({ cookie }) => {
    // 安全地访问session cookie
    const session = cookie?.session
    const sessionId = session?.value
    const user = sessionId ? sessions.get(sessionId) : null
    
    return {
      user,
      sessionId
    }
  })