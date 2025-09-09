import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import type { SupportedLanguage } from '../../lib/i18n'

interface BlogPageProps {
  lang: SupportedLanguage
  t: (key: string) => string
  currentPath?: string
}

interface BlogPostProps extends BlogPageProps {
  slug: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: number
  tags: string[]
  image: string
  category: string
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-elysia',
    title: 'Getting Started with Elysia: A Modern Web Framework',
    excerpt: 'Learn how to build fast and efficient web applications using Elysia, the modern TypeScript web framework built on Bun.',
    content: `
      <p>Elysia is a modern web framework for TypeScript that runs on Bun runtime. It's designed to be fast, lightweight, and developer-friendly.</p>
      
      <h2>Why Choose Elysia?</h2>
      <p>Elysia offers several advantages over traditional web frameworks:</p>
      <ul>
        <li><strong>Performance:</strong> Built on Bun runtime for exceptional speed</li>
        <li><strong>Type Safety:</strong> Full TypeScript support with excellent type inference</li>
        <li><strong>Developer Experience:</strong> Intuitive API and great tooling</li>
        <li><strong>Modern Features:</strong> Built-in support for modern web standards</li>
      </ul>
      
      <h2>Installation</h2>
      <pre><code>bun create elysia my-app
cd my-app
bun dev</code></pre>
      
      <p>That's it! You now have a running Elysia application.</p>
    `,
    author: 'John Doe',
    publishedAt: '2024-01-15',
    readTime: 5,
    tags: ['elysia', 'typescript', 'web-framework'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    category: 'Tutorial'
  },
  {
    id: '2',
    slug: 'building-apis-with-elysia',
    title: 'Building RESTful APIs with Elysia',
    excerpt: 'A comprehensive guide to creating robust and scalable REST APIs using Elysia framework with best practices.',
    content: `
      <p>Building APIs with Elysia is straightforward and enjoyable. Let's explore how to create a robust REST API.</p>
      
      <h2>Setting up Routes</h2>
      <p>Elysia makes it easy to define routes with a clean and intuitive syntax:</p>
      
      <pre><code>import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/users', () => ({ users: [] }))
  .post('/users', ({ body }) => ({ created: body }))
  .listen(3000)</code></pre>
      
      <h2>Validation and Type Safety</h2>
      <p>One of Elysia's strengths is its built-in validation and type safety features.</p>
    `,
    author: 'Jane Smith',
    publishedAt: '2024-01-10',
    readTime: 8,
    tags: ['api', 'rest', 'backend'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    category: 'Development'
  },
  {
    id: '3',
    slug: 'elysia-performance-tips',
    title: 'Performance Optimization Tips for Elysia Applications',
    excerpt: 'Discover advanced techniques to optimize your Elysia applications for maximum performance and scalability.',
    content: `
      <p>Performance is crucial for modern web applications. Here are some tips to optimize your Elysia apps.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implement effective caching to reduce response times and server load.</p>
      
      <h2>Database Optimization</h2>
      <p>Optimize your database queries and connections for better performance.</p>
    `,
    author: 'Mike Johnson',
    publishedAt: '2024-01-05',
    readTime: 12,
    tags: ['performance', 'optimization', 'scaling'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    category: 'Performance'
  }
]

export function BlogListPage({ lang, t, currentPath }: BlogPageProps): string {
  const seoTags = generateSEOTags({
    title: t('blog.title'),
    description: t('blog.description'),
    keywords: t('blog.keywords')
  }, lang)

  const categories = [...new Set(mockBlogPosts.map(post => post.category))]

  const postsHtml = mockBlogPosts.map(post => {
    const blogPostLink = lang === 'en' ? `/blog/${post.slug}` : `/${lang}/blog/${post.slug}`
    
    return `
      <article class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <div class="relative overflow-hidden">
          <img 
            src="${post.image}" 
            alt="${post.title}"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div class="absolute top-4 left-4">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              ${post.category}
            </span>
          </div>
        </div>
        
        <div class="p-6">
          <div class="flex items-center text-sm text-gray-500 mb-3">
            <span>${post.author}</span>
            <span class="mx-2">•</span>
            <time datetime="${post.publishedAt}">${new Date(post.publishedAt).toLocaleDateString()}</time>
            <span class="mx-2">•</span>
            <span>${post.readTime} ${t('blog.minRead')}</span>
          </div>
          
          <h2 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            <a href="${blogPostLink}" class="hover:underline">
              ${post.title}
            </a>
          </h2>
          
          <p class="text-gray-600 mb-4 leading-relaxed">
            ${post.excerpt}
          </p>
          
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-2">
              ${post.tags.slice(0, 3).map(tag => `
                <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  #${tag}
                </span>
              `).join('')}
            </div>
            
            <a 
              href="${blogPostLink}" 
              class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
            >
              ${t('blog.readMore')}
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    `
  }).join('')

  const content = `
    <div class="py-8">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ${t('blog.title')}
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            ${t('blog.subtitle')}
          </p>
        </div>
      </div>

      <!-- Categories Filter -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div class="flex flex-wrap gap-4 justify-center">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            ${t('blog.allCategories')}
          </button>
          ${categories.map(category => `
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              ${category}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${postsHtml}
        </div>
      </div>

      <!-- Load More Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
          ${t('blog.loadMore')}
        </button>
      </div>
    </div>

    <script>
      // Category filter functionality
      document.querySelectorAll('button').forEach(button => {
        if (button.textContent !== '${t('blog.loadMore')}') {
          button.addEventListener('click', function() {
            // Remove active class from all category buttons
            document.querySelectorAll('button').forEach(btn => {
              if (btn.textContent !== '${t('blog.loadMore')}') {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
              }
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-gray-100', 'text-gray-700');
            this.classList.add('bg-blue-600', 'text-white');
          });
        }
      });
    </script>
  `

  return MainLayout({
    children: content,
    title: t('blog.title'),
    lang,
    seoTags,
    t,
    currentPath: currentPath || (lang === 'en' ? '/blog' : `/${lang}/blog`)
  })
}

export function BlogPostPage({ lang, t, slug, currentPath }: BlogPostProps): string {
  const post = mockBlogPosts.find(p => p.slug === slug)
  
  if (!post) {
    return `<div class="text-center py-20">
      <h1 class="text-2xl font-bold text-gray-900">${t('blog.postNotFound')}</h1>
      <p class="text-gray-600 mt-2">${t('blog.postNotFoundDescription')}</p>
    </div>`
  }

  const seoTags = generateSEOTags({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', ')
  }, lang)

  const blogListLink = lang === 'en' ? '/blog' : `/${lang}/blog`

  const content = `
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back to Blog -->
      <div class="mb-8">
        <a 
          href="${blogListLink}" 
          class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          ${t('blog.backToBlog')}
        </a>
      </div>

      <!-- Article Header -->
      <header class="mb-8">
        <div class="mb-4">
          <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            ${post.category}
          </span>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          ${post.title}
        </h1>
        
        <div class="flex items-center text-gray-600 mb-6">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span class="text-white font-medium">${post.author.charAt(0)}</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">${post.author}</p>
              <div class="flex items-center text-sm">
                <time datetime="${post.publishedAt}">${new Date(post.publishedAt).toLocaleDateString()}</time>
                <span class="mx-2">•</span>
                <span>${post.readTime} ${t('blog.minRead')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <img 
          src="${post.image}" 
          alt="${post.title}"
          class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </header>

      <!-- Article Content -->
      <div class="prose prose-lg max-w-none">
        ${post.content}
      </div>

      <!-- Tags -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <div class="flex flex-wrap gap-2">
          ${post.tags.map(tag => `
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              #${tag}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Share Buttons -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">${t('blog.shareArticle')}</h3>
        <div class="flex space-x-4">
          <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            Twitter
          </button>
          <button class="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors duration-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
            </svg>
            Facebook
          </button>
          <button class="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </button>
        </div>
      </div>
    </article>

    <!-- Related Posts -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">${t('blog.relatedPosts')}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${mockBlogPosts.filter(p => p.id !== post.id).slice(0, 3).map(relatedPost => {
          const relatedPostLink = lang === 'en' ? `/blog/${relatedPost.slug}` : `/${lang}/blog/${relatedPost.slug}`
          return `
            <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <img 
                src="${relatedPost.image}" 
                alt="${relatedPost.title}"
                class="w-full h-32 object-cover rounded-t-lg"
              />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 hover:text-blue-600">
                  <a href="${relatedPostLink}">${relatedPost.title}</a>
                </h3>
                <p class="text-sm text-gray-600">${relatedPost.excerpt.substring(0, 100)}...</p>
              </div>
            </article>
          `
        }).join('')}
      </div>
    </section>
  `

  return MainLayout({
    children: content,
    title: post.title,
    lang,
    seoTags,
    t,
    currentPath: currentPath || (lang === 'en' ? `/blog/${slug}` : `/${lang}/blog/${slug}`)
  })
}