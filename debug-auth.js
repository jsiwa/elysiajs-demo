// 调试认证功能的脚本
console.log('🔍 调试认证功能...')

async function debugAuth() {
  const baseUrl = 'http://localhost:3000'
  
  try {
    console.log('1️⃣ 测试登录API...')
    
    // 测试登录
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      }),
      credentials: 'include'
    })
    
    const loginResult = await loginResponse.json()
    console.log('登录响应:', loginResponse.status, loginResult)
    
    if (loginResponse.ok) {
      console.log('✅ 登录成功')
      
      // 获取cookie
      const cookies = loginResponse.headers.get('set-cookie')
      console.log('Cookie:', cookies)
      
      console.log('2️⃣ 测试用户信息API...')
      
      // 测试获取用户信息
      const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
        credentials: 'include'
      })
      
      const meResult = await meResponse.json()
      console.log('用户信息响应:', meResponse.status, meResult)
      
      if (meResponse.ok) {
        console.log('✅ 用户信息获取成功')
        
        console.log('3️⃣ 测试管理后台访问...')
        
        // 测试管理后台
        const adminResponse = await fetch(`${baseUrl}/admin`, {
          credentials: 'include'
        })
        
        console.log('管理后台响应:', adminResponse.status)
        
        if (adminResponse.ok) {
          console.log('✅ 管理后台访问成功')
        } else {
          console.log('❌ 管理后台访问失败')
        }
        
      } else {
        console.log('❌ 用户信息获取失败')
      }
      
    } else {
      console.log('❌ 登录失败:', loginResult.error)
    }
    
  } catch (error) {
    console.error('❌ 调试过程中出错:', error.message)
    console.log('💡 请确保服务器正在运行: bun dev')
  }
}

// 等待服务器启动
setTimeout(debugAuth, 1000)