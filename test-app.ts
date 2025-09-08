import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: 'public',
    prefix: '/public'
  }))
  .get('/', () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Elysia Test App</title>
          <link rel="stylesheet" href="/public/css/main.css" />
        </head>
        <body>
          <div class="min-h-screen bg-gray-50">
            <header class="bg-white shadow-sm border-b">
              <nav class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                  <a href="/" class="text-xl font-bold text-gray-900">Elysia App</a>
                  <div class="flex space-x-4">
                    <a href="/login" class="text-gray-600 hover:text-gray-900">Login</a>
                    <a href="/register" class="btn btn-primary">Register</a>
                  </div>
                </div>
              </nav>
            </header>
            <main class="container mx-auto px-4 py-8">
              <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-900 mb-6">Welcome to Elysia App</h1>
                <p class="text-xl text-gray-600 mb-8">A modern fullstack application</p>
                <a href="/products" class="btn btn-primary">View Products</a>
              </div>
            </main>
          </div>
        </body>
      </html>
    `
  })
  .get('/products', () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Products - Elysia App</title>
          <link rel="stylesheet" href="/public/css/main.css" />
        </head>
        <body>
          <div class="min-h-screen bg-gray-50">
            <header class="bg-white shadow-sm border-b">
              <nav class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                  <a href="/" class="text-xl font-bold text-gray-900">Elysia App</a>
                  <div class="flex space-x-4">
                    <a href="/login" class="text-gray-600 hover:text-gray-900">Login</a>
                    <a href="/register" class="btn btn-primary">Register</a>
                  </div>
                </div>
              </nav>
            </header>
            <main class="container mx-auto px-4 py-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-8">Products</h1>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h3 class="text-xl font-semibold mb-2">Product 1</h3>
                  <p class="text-gray-600 mb-4">Amazing product description</p>
                  <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-blue-600">$99.99</span>
                    <button class="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </body>
      </html>
    `
  })
  .get('/login', () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login - Elysia App</title>
          <link rel="stylesheet" href="/public/css/main.css" />
        </head>
        <body>
          <div class="min-h-screen bg-gray-50 flex items-center justify-center">
            <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
              <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
              <form class="space-y-4">
                <div>
                  <label class="form-label">Email</label>
                  <input type="email" class="form-input" placeholder="Enter your email" />
                </div>
                <div>
                  <label class="form-label">Password</label>
                  <input type="password" class="form-input" placeholder="Enter your password" />
                </div>
                <button type="submit" class="w-full btn btn-primary">Login</button>
              </form>
              <div class="mt-6 text-center">
                <p class="text-gray-600">
                  Don't have an account? 
                  <a href="/register" class="text-blue-600 hover:underline">Register</a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  })
  .get('/register', () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Register - Elysia App</title>
          <link rel="stylesheet" href="/public/css/main.css" />
        </head>
        <body>
          <div class="min-h-screen bg-gray-50 flex items-center justify-center">
            <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
              <h1 class="text-2xl font-bold text-center mb-6">Register</h1>
              <form class="space-y-4">
                <div>
                  <label class="form-label">Name</label>
                  <input type="text" class="form-input" placeholder="Enter your name" />
                </div>
                <div>
                  <label class="form-label">Email</label>
                  <input type="email" class="form-input" placeholder="Enter your email" />
                </div>
                <div>
                  <label class="form-label">Password</label>
                  <input type="password" class="form-input" placeholder="Enter your password" />
                </div>
                <button type="submit" class="w-full btn btn-primary">Register</button>
              </form>
              <div class="mt-6 text-center">
                <p class="text-gray-600">
                  Already have an account? 
                  <a href="/login" class="text-blue-600 hover:underline">Login</a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  })
  .listen(3000)

console.log(`🦊 Test Elysia app is running at http://localhost:3000`)
console.log('Available routes: /, /products, /login, /register')