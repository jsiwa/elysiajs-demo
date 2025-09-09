import { Elysia } from 'elysia'
import { GoogleLoginPage } from './google-auth.views'
import { ProfilePage } from './auth.views'
import { createTranslator } from '../../lib/translate'

export const authRoutes = new Elysia({ prefix: '' })
  // Login routes (Google only)
  .get('/login', ({ request }) => {
    const lang = 'en'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return GoogleLoginPage({ lang, t, currentPath })
  })
  .get('/ja/login', ({ request }) => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return GoogleLoginPage({ lang, t, currentPath })
  })
  .get('/zh/login', ({ request }) => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return GoogleLoginPage({ lang, t, currentPath })
  })
  
  // Register routes redirect to login (Google only)
  .get('/register', ({ request }) => {
    const lang = 'en'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return GoogleLoginPage({ lang, t, currentPath })
  })
  .get('/ja/register', ({ request }) => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return GoogleLoginPage({ lang, t, currentPath })
  })
  .get('/zh/register', ({ request }) => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return GoogleLoginPage({ lang, t, currentPath })
  })
  
  // Profile routes (mock protected)
  .get('/profile', () => {
    const lang = 'en'
    const t = createTranslator(lang)
    // Mock user for development
    const mockUser = {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user',
      createdAt: new Date()
    }
    return ProfilePage({ lang, t, user: mockUser })
  })
  .get('/ja/profile', () => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const mockUser = {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user',
      createdAt: new Date()
    }
    return ProfilePage({ lang, t, user: mockUser })
  })
  .get('/zh/profile', () => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const mockUser = {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user',
      createdAt: new Date()
    }
    return ProfilePage({ lang, t, user: mockUser })
  })