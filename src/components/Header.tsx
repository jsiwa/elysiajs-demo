import type { SupportedLanguage } from '../lib/i18n'
import type { User } from '../lib/auth'
import { createPathUtils, getLanguageSwitchPaths } from '../lib/path-utils'

interface HeaderProps {
  lang: SupportedLanguage
  user?: User | null
  t?: (key: string) => string
  currentPath?: string
}

export function Header({ lang, user, t, currentPath = '' }: HeaderProps): string {
  // 创建路径工具
  const path = createPathUtils(lang)
  
  // 生成语言切换链接
  const languageLinks = getLanguageSwitchPaths(currentPath)
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', link: languageLinks.en },
    { code: 'ja', name: '日本語', flag: '🇯🇵', link: languageLinks.ja },
    { code: 'zh', name: '中文', flag: '🇨🇳', link: languageLinks.zh }
  ]
  
  return `
    <header class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and main navigation -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a href="${path.to('/')}" class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span class="text-xl font-bold text-gray-900">Elysia</span>
              </a>
            </div>
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8 items-center">
              <a href="${path.to('/')}" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${path.matches(currentPath, '/') ? 'border-blue-600 text-blue-600' : 'border-transparent'}">
                ${t ? t('navigation.home') : 'Home'}
              </a>
              <a href="${path.to('/products')}" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${path.startsWith(currentPath, '/products') ? 'border-blue-600 text-blue-600' : 'border-transparent'}">
                ${t ? t('navigation.products') : 'Products'}
              </a>
              <a href="${path.to('/blog')}" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${path.startsWith(currentPath, '/blog') ? 'border-blue-600 text-blue-600' : 'border-transparent'}">
                ${t ? t('navigation.blog') : 'Blog'}
              </a>
              <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent">
                ${t ? t('navigation.about') : 'About'}
              </a>
              <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent">
                ${t ? t('navigation.contact') : 'Contact'}
              </a>
            </div>
          </div>

          <!-- Right side: Language switcher and auth buttons -->
          <div class="flex items-center space-x-4">
            <!-- Language Switcher -->
            <div class="relative">
              <button id="languageButton" class="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <span>${languages.find(l => l.code === lang)?.flag}</span>
                <span class="hidden sm:block">${languages.find(l => l.code === lang)?.name}</span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="languageDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                ${languages.map(language => `
                  <a href="${language.link}" class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${language.code === lang ? 'bg-blue-50 text-blue-600' : ''}">
                    <span class="text-lg">${language.flag}</span>
                    <span>${language.name}</span>
                    ${language.code === lang ? '<svg class="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>' : ''}
                  </a>
                `).join('')}
              </div>
            </div>

            <!-- Authentication section -->
            ${user ? `
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <button id="userMenuButton" class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-gray-100">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-medium">${(user.name || user.email).charAt(0).toUpperCase()}</span>
                    </div>
                    <span class="hidden sm:block">${user.name || user.email}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="userDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <a href="${path.to('/profile')}" class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>${t ? t('navigation.profile') : 'Profile'}</span>
                    </a>
                    ${user && (user.role === 'admin' || user.email === 'admin@example.com') ? `
                      <div class="border-t border-gray-200 my-1"></div>
                      <a href="${path.to('/admin')}" class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>${t ? t('navigation.admin') : 'Admin'}</span>
                      </a>
                    ` : ''}
                    <div class="border-t border-gray-200 my-1"></div>
                    <button id="logoutBtn" class="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-left">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>${t ? t('navigation.logout') : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ` : `
              <div class="flex items-center space-x-3">
                <a href="${path.to('/login')}" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  ${t ? t('navigation.login') : 'Login'}
                </a>
                <a href="${path.to('/register')}" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                  ${t ? t('navigation.register') : 'Register'}
                </a>
              </div>
            `}

            <!-- Mobile menu button -->
            <div class="sm:hidden">
              <button id="mobileMenuButton" class="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu -->
        <div id="mobileMenu" class="hidden sm:hidden">
          <div class="pt-2 pb-3 space-y-1 border-t border-gray-200">
            <a href="${path.to('/')}" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
              ${t ? t('navigation.home') : 'Home'}
            </a>
            <a href="${path.to('/products')}" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
              ${t ? t('navigation.products') : 'Products'}
            </a>
            <a href="${path.to('/blog')}" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
              ${t ? t('navigation.blog') : 'Blog'}
            </a>
            <a href="#" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
              ${t ? t('navigation.about') : 'About'}
            </a>
            <a href="#" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
              ${t ? t('navigation.contact') : 'Contact'}
            </a>
            ${!user ? `
              <div class="border-t border-gray-200 pt-3 mt-3">
                <a href="${path.to('/login')}" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
                  ${t ? t('navigation.login') : 'Login'}
                </a>
                <a href="${path.to('/register')}" class="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg">
                  ${t ? t('navigation.register') : 'Register'}
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </nav>
    </header>

    <script>
      // Language dropdown toggle
      document.getElementById('languageButton')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.getElementById('languageDropdown');
        dropdown?.classList.toggle('hidden');
        // Close user dropdown if open
        document.getElementById('userDropdown')?.classList.add('hidden');
      });

      // User dropdown toggle
      document.getElementById('userMenuButton')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.getElementById('userDropdown');
        dropdown?.classList.toggle('hidden');
        // Close language dropdown if open
        document.getElementById('languageDropdown')?.classList.add('hidden');
      });

      // Mobile menu toggle
      document.getElementById('mobileMenuButton')?.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu?.classList.toggle('hidden');
      });

      // Close dropdowns when clicking outside
      document.addEventListener('click', function() {
        document.getElementById('languageDropdown')?.classList.add('hidden');
        document.getElementById('userDropdown')?.classList.add('hidden');
      });

      // Prevent dropdowns from closing when clicking inside them
      document.getElementById('languageDropdown')?.addEventListener('click', function(e) {
        e.stopPropagation();
      });
      
      document.getElementById('userDropdown')?.addEventListener('click', function(e) {
        e.stopPropagation();
      });

      // Logout functionality
      document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        try {
          const response = await fetch('/api/auth/sign-out', { 
            method: 'POST', 
            credentials: 'include' 
          });
          if (response.ok) {
            window.location.href = '${path.to('/')}';
          }
        } catch (error) {
          console.error('Logout error:', error);
          alert('${t ? t('auth.logoutError') : 'Logout failed'}');
        }
      });
    </script>
  `
}