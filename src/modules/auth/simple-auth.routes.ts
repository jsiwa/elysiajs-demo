import { Elysia } from 'elysia'

export const simpleAuthRoutes = new Elysia({ prefix: '' })
  .get('/login', () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login</title>
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
          <title>Register</title>
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