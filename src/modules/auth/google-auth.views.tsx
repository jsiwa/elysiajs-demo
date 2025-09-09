import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import type { SupportedLanguage } from '../../lib/i18n'

interface GoogleAuthPageProps {
  lang: SupportedLanguage
  t: (key: string) => string
  currentPath?: string
}

export function GoogleLoginPage({ lang, t, currentPath }: GoogleAuthPageProps): string {
  const seoTags = generateSEOTags({
    title: t('auth.login.title'),
    description: t('auth.login.description'),
    keywords: t('auth.login.keywords')
  }, lang)

  let homeLink = '/'
  if (lang === 'ja') homeLink = '/ja'
  if (lang === 'zh') homeLink = '/zh'

  const content = `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            ${t('auth.login.title')}
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            ${t('auth.login.subtitle')}
          </p>
        </div>
        
        <div class="bg-white py-8 px-6 shadow-xl rounded-lg">
          <div id="errorMessage" class="hidden mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"></div>
          <div id="successMessage" class="hidden mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"></div>
          
          <!-- Google Login Button -->
          <div class="space-y-4">
            <button 
              id="googleLoginBtn" 
              class="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span id="googleLoginText" class="text-base font-medium">${t('auth.loginWithGoogle')}</span>
              <svg id="googleLoginSpinner" class="hidden animate-spin ml-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
            
            <div class="text-center">
              <p class="text-sm text-gray-500">
                ${t('auth.googleLogin.description')}
              </p>
            </div>
          </div>



          <!-- Terms and Privacy -->
          <div class="mt-6 text-center">
            <p class="text-xs text-gray-500">
              ${t('auth.bySigningIn')} 
              <a href="#" class="text-blue-600 hover:text-blue-500 underline">${t('auth.termsOfService')}</a>
              ${t('auth.and')} 
              <a href="#" class="text-blue-600 hover:text-blue-500 underline">${t('auth.privacyPolicy')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Google Login
      document.getElementById('googleLoginBtn').addEventListener('click', async function() {
        const button = this;
        const text = document.getElementById('googleLoginText');
        const spinner = document.getElementById('googleLoginSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        
        // Hide previous messages
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
        
        // Show loading state
        button.disabled = true;
        text.textContent = '${t('auth.signingIn')}';
        spinner.classList.remove('hidden');
        
        try {
          // Simulate Google OAuth flow
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Mock successful login
          successMessage.textContent = '${t('auth.loginSuccess')}';
          successMessage.classList.remove('hidden');
          
          setTimeout(() => {
            window.location.href = '${homeLink}';
          }, 1500);
          
        } catch (error) {
          errorMessage.textContent = '${t('auth.loginFailed')}';
          errorMessage.classList.remove('hidden');
          
          // Reset button
          button.disabled = false;
          text.textContent = '${t('auth.loginWithGoogle')}';
          spinner.classList.add('hidden');
        }
      });
    </script>
  `

  return MainLayout({
    children: content,
    title: t('auth.login.title'),
    lang,
    seoTags,
    t,
    currentPath: currentPath || (lang === 'en' ? '/login' : `/${lang}/login`)
  })
}