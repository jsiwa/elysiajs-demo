import { Elysia } from 'elysia'
import { LoginPage, RegisterPage, ProfilePage } from './auth.views'
import { createTranslator } from '../../lib/translate'

export const authRoutes = new Elysia({ prefix: '' })
  // Login routes
  .get('/login', () => {
    const lang = 'en'
    const t = createTranslator(lang)
    return LoginPage({ lang, t })
  })
  .get('/ja/login', () => {
    const lang = 'ja'
    const t = createTranslator(lang)
    return LoginPage({ lang, t })
  })
  .get('/zh/login', () => {
    const lang = 'zh'
    const t = createTranslator(lang)
    return LoginPage({ lang, t })
  })
  
  // Register routes
  .get('/register', () => {
    const lang = 'en'
    const t = createTranslator(lang)
    return RegisterPage({ lang, t })
  })
  .get('/ja/register', () => {
    const lang = 'ja'
    const t = createTranslator(lang)
    return RegisterPage({ lang, t })
  })
  .get('/zh/register', () => {
    const lang = 'zh'
    const t = createTranslator(lang)
    return RegisterPage({ lang, t })
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