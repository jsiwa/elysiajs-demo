import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

// Simplified auth plugin without Better Auth for now
export const authPlugin = new Elysia({ name: 'auth' })
  .use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  }))
  .derive(() => {
    // Mock user data for development
    return {
      user: null,
      session: null,
      isAuthenticated: false
    }
  })
  // Mock auth API endpoints
  .post('/api/auth/sign-in/email', ({ body }) => {
    return { success: true, message: 'Login successful' }
  })
  .post('/api/auth/sign-up/email', ({ body }) => {
    return { success: true, message: 'Registration successful' }
  })
  .post('/api/auth/sign-out', () => {
    return { success: true, message: 'Logout successful' }
  })
  .get('/api/auth/sign-in/github', () => {
    return Response.redirect('/')
  })