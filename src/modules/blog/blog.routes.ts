import { Elysia } from 'elysia'
import { BlogListPage, BlogPostPage } from './blog.views'
import { createTranslator } from '../../lib/translate'

export const blogRoutes = new Elysia({ prefix: '' })
  // Blog list routes
  .get('/blog', ({ request }) => {
    const lang = 'en'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return BlogListPage({ lang, t, currentPath })
  })
  .get('/ja/blog', ({ request }) => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return BlogListPage({ lang, t, currentPath })
  })
  .get('/zh/blog', ({ request }) => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return BlogListPage({ lang, t, currentPath })
  })
  
  // Blog post routes
  .get('/blog/:slug', ({ params, request }) => {
    const lang = 'en'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return BlogPostPage({ lang, t, slug: params.slug, currentPath })
  })
  .get('/ja/blog/:slug', ({ params, request }) => {
    const lang = 'ja'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return BlogPostPage({ lang, t, slug: params.slug, currentPath })
  })
  .get('/zh/blog/:slug', ({ params, request }) => {
    const lang = 'zh'
    const t = createTranslator(lang)
    const currentPath = new URL(request.url).pathname
    return BlogPostPage({ lang, t, slug: params.slug, currentPath })
  })