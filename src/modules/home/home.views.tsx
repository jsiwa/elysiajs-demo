import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import type { SupportedLanguage } from '../../lib/i18n'
import type { User } from '../../lib/auth'

interface HomePageProps {
  lang: SupportedLanguage
  t: (key: string) => string
  user?: User | null
  currentPath?: string
}

export function HomePage({ lang, t, user, currentPath }: HomePageProps): string {
  const seoTags = generateSEOTags({
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('home.keywords'),
    ogTitle: t('home.title'),
    ogDescription: t('home.description')
  }, lang)

  // Generate correct links based on language
  let productsLink = '/products'
  let loginLink = '/login'
  let registerLink = '/register'
  
  if (lang === 'ja') {
    productsLink = '/ja/products'
    loginLink = '/ja/login'
    registerLink = '/ja/register'
  } else if (lang === 'zh') {
    productsLink = '/zh/products'
    loginLink = '/zh/login'
    registerLink = '/zh/register'
  }

  const content = `
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <div class="mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ${t('home.welcome')}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            ${t('home.subtitle')}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="${productsLink}" 
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ${t('home.viewProducts')}
            </a>
            ${!user ? `
              <a 
                href="${registerLink}" 
                class="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-blue-50"
              >
                ${t('home.getStarted')}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ${t('home.features.title')}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            ${t('home.features.subtitle')}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">${t('home.features.fast.title')}</h3>
            <p class="text-gray-600">${t('home.features.fast.description')}</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">${t('home.features.secure.title')}</h3>
            <p class="text-gray-600">${t('home.features.secure.description')}</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">${t('home.features.global.title')}</h3>
            <p class="text-gray-600">${t('home.features.global.description')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div class="text-gray-600">${t('home.stats.users')}</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-green-600 mb-2">99.9%</div>
            <div class="text-gray-600">${t('home.stats.uptime')}</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div class="text-gray-600">${t('home.stats.countries')}</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div class="text-gray-600">${t('home.stats.support')}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          ${t('home.cta.title')}
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          ${t('home.cta.subtitle')}
        </p>
        ${!user ? `
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="${registerLink}" 
              class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ${t('home.cta.getStarted')}
            </a>
            <a 
              href="${loginLink}" 
              class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              ${t('home.cta.signIn')}
            </a>
          </div>
        ` : `
          <a 
            href="${productsLink}" 
            class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            ${t('home.viewProducts')}
          </a>
        `}
      </div>
    </section>
  `

  return MainLayout({
    children: content,
    title: t('home.title'),
    lang,
    seoTags,
    user,
    t,
    currentPath: currentPath || (lang === 'en' ? '/' : `/${lang}`)
  })
}