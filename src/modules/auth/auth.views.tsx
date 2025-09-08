import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import type { SupportedLanguage } from '../../lib/i18n'
import type { User } from '../../lib/auth'

interface AuthPageProps {
  lang: SupportedLanguage
  t: (key: string) => string
}

interface ProfilePageProps extends AuthPageProps {
  user: User
}

export function LoginPage({ lang, t }: AuthPageProps): string {
  const seoTags = generateSEOTags({
    title: t('auth.login.title'),
    description: t('auth.login.description'),
    keywords: t('auth.login.keywords')
  }, lang)

  let registerLink = '/register'
  let homeLink = '/'
  if (lang === 'ja') {
    registerLink = '/ja/register'
    homeLink = '/ja'
  }
  if (lang === 'zh') {
    registerLink = '/zh/register'
    homeLink = '/zh'
  }

  const content = `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ${t('auth.login.title')}
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            ${t('auth.login.subtitle')}
          </p>
        </div>
        
        <div class="bg-white py-8 px-6 shadow-xl rounded-lg">
          <div id="errorMessage" class="hidden mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"></div>
          <div id="successMessage" class="hidden mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"></div>
          
          <form id="loginForm" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                ${t('auth.email')}
              </label>
              <div class="mt-1 relative">
                <input 
                  id="email"
                  name="email" 
                  type="email" 
                  autocomplete="email"
                  required 
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="${t('auth.emailPlaceholder')}"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                ${t('auth.password')}
              </label>
              <div class="mt-1 relative">
                <input 
                  id="password"
                  name="password" 
                  type="password" 
                  autocomplete="current-password"
                  required 
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="${t('auth.passwordPlaceholder')}"
                />
                <button type="button" id="togglePassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg id="eyeIcon" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  ${t('auth.rememberMe')}
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                  ${t('auth.forgotPassword')}
                </a>
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                id="loginButton"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span id="loginButtonText">${t('auth.login.submit')}</span>
                <svg id="loginSpinner" class="hidden animate-spin -mr-1 ml-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </form>
          
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">${t('auth.orContinueWith')}</span>
              </div>
            </div>

            <div class="mt-6">
              <button 
                id="githubLogin" 
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                </svg>
                ${t('auth.loginWithGithub')}
              </button>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              ${t('auth.login.noAccount')} 
              <a href="${registerLink}" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                ${t('auth.register.title')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Toggle password visibility
      document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />';
        } else {
          passwordInput.type = 'password';
          eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
        }
      });

      // Form submission
      document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loginButton = document.getElementById('loginButton');
        const loginButtonText = document.getElementById('loginButtonText');
        const loginSpinner = document.getElementById('loginSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        
        // Hide previous messages
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
        
        // Show loading state
        loginButton.disabled = true;
        loginButtonText.textContent = '${t('auth.signingIn')}';
        loginSpinner.classList.remove('hidden');
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Basic validation
        if (!email || !password) {
          showError('${t('auth.fillAllFields')}');
          resetButton();
          return;
        }
        
        try {
          // Simulate API call (replace with actual authentication)
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock successful login
          showSuccess('${t('auth.loginSuccess')}');
          
          setTimeout(() => {
            window.location.href = '${homeLink}';
          }, 1000);
          
        } catch (error) {
          showError('${t('auth.loginFailed')}');
          resetButton();
        }
        
        function showError(message) {
          errorMessage.textContent = message;
          errorMessage.classList.remove('hidden');
        }
        
        function showSuccess(message) {
          successMessage.textContent = message;
          successMessage.classList.remove('hidden');
        }
        
        function resetButton() {
          loginButton.disabled = false;
          loginButtonText.textContent = '${t('auth.login.submit')}';
          loginSpinner.classList.add('hidden');
        }
      });
      
      // GitHub login
      document.getElementById('githubLogin').addEventListener('click', () => {
        // Simulate GitHub OAuth redirect
        alert('${t('auth.githubRedirect')}');
      });
    </script>
  `

  return MainLayout({
    children: content,
    title: t('auth.login.title'),
    lang,
    seoTags,
    t
  })
}

export function RegisterPage({ lang, t }: AuthPageProps): string {
  const seoTags = generateSEOTags({
    title: t('auth.register.title'),
    description: t('auth.register.description'),
    keywords: t('auth.register.keywords')
  }, lang)

  let loginLink = '/login'
  let homeLink = '/'
  if (lang === 'ja') {
    loginLink = '/ja/login'
    homeLink = '/ja'
  }
  if (lang === 'zh') {
    loginLink = '/zh/login'
    homeLink = '/zh'
  }

  const content = `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ${t('auth.register.title')}
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            ${t('auth.register.subtitle')}
          </p>
        </div>
        
        <div class="bg-white py-8 px-6 shadow-xl rounded-lg">
          <div id="errorMessage" class="hidden mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"></div>
          <div id="successMessage" class="hidden mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"></div>
          
          <form id="registerForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                ${t('auth.name')}
              </label>
              <div class="mt-1 relative">
                <input 
                  id="name"
                  name="name" 
                  type="text" 
                  autocomplete="name"
                  required 
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="${t('auth.namePlaceholder')}"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div id="nameError" class="hidden mt-1 text-sm text-red-600"></div>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                ${t('auth.email')}
              </label>
              <div class="mt-1 relative">
                <input 
                  id="email"
                  name="email" 
                  type="email" 
                  autocomplete="email"
                  required 
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="${t('auth.emailPlaceholder')}"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              <div id="emailError" class="hidden mt-1 text-sm text-red-600"></div>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                ${t('auth.password')}
              </label>
              <div class="mt-1 relative">
                <input 
                  id="password"
                  name="password" 
                  type="password" 
                  autocomplete="new-password"
                  required 
                  minlength="8"
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="${t('auth.passwordPlaceholder')}"
                />
                <button type="button" id="togglePassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg id="eyeIcon" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div id="passwordError" class="hidden mt-1 text-sm text-red-600"></div>
              <div class="mt-2">
                <div class="text-xs text-gray-500 mb-1">${t('auth.passwordStrength')}:</div>
                <div class="flex space-x-1">
                  <div id="strength1" class="h-1 w-1/4 bg-gray-200 rounded"></div>
                  <div id="strength2" class="h-1 w-1/4 bg-gray-200 rounded"></div>
                  <div id="strength3" class="h-1 w-1/4 bg-gray-200 rounded"></div>
                  <div id="strength4" class="h-1 w-1/4 bg-gray-200 rounded"></div>
                </div>
                <div id="strengthText" class="text-xs text-gray-500 mt-1">${t('auth.passwordWeak')}</div>
              </div>
            </div>
            
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                ${t('auth.confirmPassword')}
              </label>
              <div class="mt-1 relative">
                <input 
                  id="confirmPassword"
                  name="confirmPassword" 
                  type="password" 
                  autocomplete="new-password"
                  required 
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="${t('auth.confirmPasswordPlaceholder')}"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg id="confirmIcon" class="h-5 w-5 text-gray-400 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div id="confirmPasswordError" class="hidden mt-1 text-sm text-red-600"></div>
            </div>

            <div class="flex items-center">
              <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="terms" class="ml-2 block text-sm text-gray-900">
                ${t('auth.agreeToTerms')} 
                <a href="#" class="text-green-600 hover:text-green-500 font-medium">${t('auth.termsOfService')}</a>
                ${t('auth.and')} 
                <a href="#" class="text-green-600 hover:text-green-500 font-medium">${t('auth.privacyPolicy')}</a>
              </label>
            </div>
            
            <div>
              <button 
                type="submit" 
                id="registerButton"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span id="registerButtonText">${t('auth.register.submit')}</span>
                <svg id="registerSpinner" class="hidden animate-spin -mr-1 ml-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </form>
          
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">${t('auth.orContinueWith')}</span>
              </div>
            </div>

            <div class="mt-6">
              <button 
                id="githubRegister" 
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                </svg>
                ${t('auth.registerWithGithub')}
              </button>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              ${t('auth.register.hasAccount')} 
              <a href="${loginLink}" class="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                ${t('auth.login.title')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Password strength checker
      function checkPasswordStrength(password) {
        let strength = 0;
        const checks = {
          length: password.length >= 8,
          lowercase: /[a-z]/.test(password),
          uppercase: /[A-Z]/.test(password),
          numbers: /\\d/.test(password),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        strength = Object.values(checks).filter(Boolean).length;
        
        const strengthBars = ['strength1', 'strength2', 'strength3', 'strength4'];
        const strengthText = document.getElementById('strengthText');
        
        // Reset all bars
        strengthBars.forEach(bar => {
          document.getElementById(bar).className = 'h-1 w-1/4 bg-gray-200 rounded';
        });
        
        if (strength === 0) {
          strengthText.textContent = '${t('auth.passwordWeak')}';
          strengthText.className = 'text-xs text-gray-500 mt-1';
        } else if (strength <= 2) {
          strengthBars.slice(0, 1).forEach(bar => {
            document.getElementById(bar).className = 'h-1 w-1/4 bg-red-400 rounded';
          });
          strengthText.textContent = '${t('auth.passwordWeak')}';
          strengthText.className = 'text-xs text-red-500 mt-1';
        } else if (strength <= 3) {
          strengthBars.slice(0, 2).forEach(bar => {
            document.getElementById(bar).className = 'h-1 w-1/4 bg-yellow-400 rounded';
          });
          strengthText.textContent = '${t('auth.passwordMedium')}';
          strengthText.className = 'text-xs text-yellow-600 mt-1';
        } else if (strength <= 4) {
          strengthBars.slice(0, 3).forEach(bar => {
            document.getElementById(bar).className = 'h-1 w-1/4 bg-blue-400 rounded';
          });
          strengthText.textContent = '${t('auth.passwordGood')}';
          strengthText.className = 'text-xs text-blue-600 mt-1';
        } else {
          strengthBars.forEach(bar => {
            document.getElementById(bar).className = 'h-1 w-1/4 bg-green-400 rounded';
          });
          strengthText.textContent = '${t('auth.passwordStrong')}';
          strengthText.className = 'text-xs text-green-600 mt-1';
        }
        
        return strength;
      }
      
      // Password input event listener
      document.getElementById('password').addEventListener('input', function(e) {
        checkPasswordStrength(e.target.value);
        validatePasswordMatch();
      });
      
      // Confirm password validation
      function validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmIcon = document.getElementById('confirmIcon');
        const confirmError = document.getElementById('confirmPasswordError');
        
        if (confirmPassword && password !== confirmPassword) {
          confirmError.textContent = '${t('auth.passwordMismatch')}';
          confirmError.classList.remove('hidden');
          confirmIcon.classList.add('hidden');
          return false;
        } else if (confirmPassword && password === confirmPassword) {
          confirmError.classList.add('hidden');
          confirmIcon.classList.remove('hidden');
          confirmIcon.className = 'h-5 w-5 text-green-500';
          return true;
        } else {
          confirmError.classList.add('hidden');
          confirmIcon.classList.add('hidden');
          return false;
        }
      }
      
      document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);
      
      // Toggle password visibility
      document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />';
        } else {
          passwordInput.type = 'password';
          eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
        }
      });

      // Form validation
      function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        let isValid = true;
        
        // Name validation
        if (!name || name.length < 2) {
          showFieldError('nameError', '${t('auth.nameRequired')}');
          isValid = false;
        } else {
          hideFieldError('nameError');
        }
        
        // Email validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          showFieldError('emailError', '${t('auth.emailInvalid')}');
          isValid = false;
        } else {
          hideFieldError('emailError');
        }
        
        // Password validation
        if (!password || password.length < 8) {
          showFieldError('passwordError', '${t('auth.passwordTooShort')}');
          isValid = false;
        } else {
          hideFieldError('passwordError');
        }
        
        // Confirm password validation
        if (!validatePasswordMatch()) {
          isValid = false;
        }
        
        // Terms validation
        if (!terms) {
          showError('${t('auth.termsRequired')}');
          isValid = false;
        }
        
        return isValid;
      }
      
      function showFieldError(elementId, message) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.classList.remove('hidden');
      }
      
      function hideFieldError(elementId) {
        document.getElementById(elementId).classList.add('hidden');
      }

      // Form submission
      document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
          return;
        }
        
        const registerButton = document.getElementById('registerButton');
        const registerButtonText = document.getElementById('registerButtonText');
        const registerSpinner = document.getElementById('registerSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        
        // Hide previous messages
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
        
        // Show loading state
        registerButton.disabled = true;
        registerButtonText.textContent = '${t('auth.creatingAccount')}';
        registerSpinner.classList.remove('hidden');
        
        const formData = new FormData(e.target);
        const userData = {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password')
        };
        
        try {
          // Simulate API call (replace with actual registration)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Mock successful registration
          showSuccess('${t('auth.registerSuccess')}');
          
          setTimeout(() => {
            window.location.href = '${homeLink}';
          }, 1500);
          
        } catch (error) {
          showError('${t('auth.registerFailed')}');
          resetButton();
        }
        
        function showError(message) {
          errorMessage.textContent = message;
          errorMessage.classList.remove('hidden');
        }
        
        function showSuccess(message) {
          successMessage.textContent = message;
          successMessage.classList.remove('hidden');
        }
        
        function resetButton() {
          registerButton.disabled = false;
          registerButtonText.textContent = '${t('auth.register.submit')}';
          registerSpinner.classList.add('hidden');
        }
      });
      
      // GitHub registration
      document.getElementById('githubRegister').addEventListener('click', () => {
        // Simulate GitHub OAuth redirect
        alert('${t('auth.githubRedirect')}');
      });
    </script>
  `

  return MainLayout({
    children: content,
    title: t('auth.register.title'),
    lang,
    seoTags,
    t
  })
}

export function ProfilePage({ lang, t, user }: ProfilePageProps): string {
  const seoTags = generateSEOTags({
    title: t('auth.profile.title'),
    description: t('auth.profile.description'),
    keywords: t('auth.profile.keywords')
  }, lang)

  const content = `
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6">${t('auth.profile.title')}</h1>
        
        <div class="space-y-4">
          <div>
            <label class="form-label">${t('auth.name')}</label>
            <p class="text-gray-900">${user.name || t('auth.profile.noName')}</p>
          </div>
          
          <div>
            <label class="form-label">${t('auth.email')}</label>
            <p class="text-gray-900">${user.email}</p>
          </div>
          
          <div>
            <label class="form-label">${t('auth.profile.role')}</label>
            <p class="text-gray-900">${user.role || 'user'}</p>
          </div>
          
          <div>
            <label class="form-label">${t('auth.profile.joinedAt')}</label>
            <p class="text-gray-900">${new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div class="mt-8 flex space-x-4">
          <button id="logoutBtn" class="btn btn-secondary">
            ${t('auth.logout')}
          </button>
        </div>
      </div>
    </div>
    
    <script>
      document.getElementById('logoutBtn').addEventListener('click', async () => {
        try {
          const response = await fetch('/api/auth/sign-out', {
            method: 'POST',
            credentials: 'include'
          })
          
          if (response.ok) {
            window.location.href = '${lang === 'en' ? '/' : '/' + lang}'
          }
        } catch (error) {
          alert('${t('auth.logoutError')}')
        }
      })
    </script>
  `

  return MainLayout({
    children: content,
    title: t('auth.profile.title'),
    lang,
    seoTags
  })
}