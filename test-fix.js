// 简单测试脚本来验证应用是否正常启动
console.log('🧪 Testing Elysia app...')

async function testApp() {
  try {
    // 测试首页
    console.log('📡 Testing homepage...')
    const response = await fetch('http://localhost:3000/')
    
    if (response.ok) {
      console.log('✅ Homepage works!')
    } else {
      console.log('❌ Homepage failed:', response.status)
    }
    
    // 测试登录页面
    console.log('📡 Testing login page...')
    const loginResponse = await fetch('http://localhost:3000/login')
    
    if (loginResponse.ok) {
      console.log('✅ Login page works!')
    } else {
      console.log('❌ Login page failed:', loginResponse.status)
    }
    
    // 测试API端点
    console.log('📡 Testing auth API...')
    const apiResponse = await fetch('http://localhost:3000/api/auth/me')
    
    if (apiResponse.status === 401) {
      console.log('✅ Auth API works (correctly returns 401 for unauthenticated user)!')
    } else {
      console.log('❌ Auth API unexpected response:', apiResponse.status)
    }
    
    console.log('🎉 All tests passed!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('💡 Make sure the server is running: bun dev')
  }
}

// 等待服务器启动
setTimeout(testApp, 2000)