import { Elysia } from 'elysia'
import { BlogListPage, BlogPostPage } from './blog.views'
import { createI18nRoutes } from '../../lib/i18n-routes'

export const blogRoutes = createI18nRoutes(new Elysia({ prefix: '' }), [
  {
    path: '/blog',
    handler: ({ lang, t, currentPath }) => {
      return BlogListPage({ lang, t, currentPath })
    }
  },
  {
    path: '/blog/:slug',
    handler: ({ lang, t, currentPath, params }) => {
      return BlogPostPage({ lang, t, slug: params.slug, currentPath })
    }
  }
])