import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import type { SupportedLanguage } from '../../lib/i18n'
import type { R2File } from '../../lib/r2'

interface AdminPageProps {
  lang: SupportedLanguage
  t: (key: string) => string
  currentPath?: string
}

interface FileManagerProps extends AdminPageProps {
  files?: R2File[]
  currentFolder?: string
}

export function AdminDashboardPage({ lang, t, currentPath }: AdminPageProps): string {
  const seoTags = generateSEOTags({
    title: t('admin.dashboard.title'),
    description: t('admin.dashboard.description'),
    keywords: t('admin.dashboard.keywords')
  }, lang)

  const fileManagerLink = lang === 'en' ? '/admin/files' : `/${lang}/admin/files`

  const content = `
    <div class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">${t('admin.dashboard.title')}</h1>
          <p class="mt-2 text-gray-600">${t('admin.dashboard.subtitle')}</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">${t('admin.stats.totalFiles')}</p>
                <p class="text-2xl font-semibold text-gray-900" id="totalFiles">-</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">${t('admin.stats.storageUsed')}</p>
                <p class="text-2xl font-semibold text-gray-900" id="storageUsed">-</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">${t('admin.stats.images')}</p>
                <p class="text-2xl font-semibold text-gray-900" id="imageCount">-</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">${t('admin.stats.documents')}</p>
                <p class="text-2xl font-semibold text-gray-900" id="documentCount">-</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">${t('admin.actions.fileManager')}</h3>
            </div>
            <p class="text-gray-600 mb-4">${t('admin.actions.fileManagerDesc')}</p>
            <a 
              href="${fileManagerLink}" 
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              ${t('admin.actions.openFileManager')}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">${t('admin.actions.quickUpload')}</h3>
            </div>
            <p class="text-gray-600 mb-4">${t('admin.actions.quickUploadDesc')}</p>
            <button 
              id="quickUploadBtn"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              ${t('admin.actions.uploadFiles')}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">${t('admin.actions.analytics')}</h3>
            </div>
            <p class="text-gray-600 mb-4">${t('admin.actions.analyticsDesc')}</p>
            <button 
              id="refreshStatsBtn"
              class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              ${t('admin.actions.refreshStats')}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Upload Modal -->
    <div id="uploadModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">${t('admin.upload.title')}</h3>
            <button id="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" id="fileInput" multiple class="hidden" />
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="mt-4">
              <label for="fileInput" class="cursor-pointer">
                <span class="mt-2 block text-sm font-medium text-gray-900">
                  ${t('admin.upload.dragDrop')}
                </span>
                <span class="mt-2 block text-sm text-gray-500">
                  ${t('admin.upload.orClickToSelect')}
                </span>
              </label>
            </div>
          </div>
          
          <div id="uploadProgress" class="hidden mt-4">
            <div class="bg-gray-200 rounded-full h-2">
              <div id="progressBar" class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="progressText" class="text-sm text-gray-600 mt-2">Uploading...</p>
          </div>
          
          <div class="flex justify-end mt-6 space-x-3">
            <button id="cancelUpload" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200">
              ${t('common.cancel')}
            </button>
            <button id="startUpload" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50" disabled>
              ${t('admin.upload.start')}
            </button>
          </div>
        </div>
      </div>
    </div>

    <script>
      // Load dashboard stats
      async function loadStats() {
        try {
          const response = await fetch('/api/admin/stats');
          const stats = await response.json();
          
          document.getElementById('totalFiles').textContent = stats.totalFiles || '0';
          document.getElementById('storageUsed').textContent = stats.storageUsed || '0 MB';
          document.getElementById('imageCount').textContent = stats.imageCount || '0';
          document.getElementById('documentCount').textContent = stats.documentCount || '0';
        } catch (error) {
          console.error('Failed to load stats:', error);
        }
      }

      // Quick upload functionality
      const uploadModal = document.getElementById('uploadModal');
      const fileInput = document.getElementById('fileInput');
      const startUploadBtn = document.getElementById('startUpload');
      const uploadProgress = document.getElementById('uploadProgress');
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');

      document.getElementById('quickUploadBtn').addEventListener('click', () => {
        uploadModal.classList.remove('hidden');
      });

      document.getElementById('closeModal').addEventListener('click', () => {
        uploadModal.classList.add('hidden');
        fileInput.value = '';
        startUploadBtn.disabled = true;
      });

      document.getElementById('cancelUpload').addEventListener('click', () => {
        uploadModal.classList.add('hidden');
        fileInput.value = '';
        startUploadBtn.disabled = true;
      });

      fileInput.addEventListener('change', (e) => {
        startUploadBtn.disabled = e.target.files.length === 0;
      });

      document.getElementById('startUpload').addEventListener('click', async () => {
        const files = fileInput.files;
        if (files.length === 0) return;

        uploadProgress.classList.remove('hidden');
        startUploadBtn.disabled = true;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const progress = ((i + 1) / files.length) * 100;
          
          progressBar.style.width = progress + '%';
          progressText.textContent = \`Uploading \${file.name} (\${i + 1}/\${files.length})\`;

          try {
            const formData = new FormData();
            formData.append('file', file);
            
            await fetch('/api/admin/upload', {
              method: 'POST',
              body: formData
            });
          } catch (error) {
            console.error('Upload failed:', error);
          }
        }

        uploadProgress.classList.add('hidden');
        uploadModal.classList.add('hidden');
        fileInput.value = '';
        loadStats(); // Refresh stats
      });

      document.getElementById('refreshStatsBtn').addEventListener('click', loadStats);

      // Load initial stats
      loadStats();
    </script>
  `

  return MainLayout({
    children: content,
    title: t('admin.dashboard.title'),
    lang,
    seoTags,
    t,
    currentPath: currentPath || (lang === 'en' ? '/admin' : `/${lang}/admin`)
  })
}

export function FileManagerPage({ lang, t, files = [], currentFolder = '', currentPath }: FileManagerProps): string {
  const seoTags = generateSEOTags({
    title: t('admin.fileManager.title'),
    description: t('admin.fileManager.description'),
    keywords: t('admin.fileManager.keywords')
  }, lang)

  const dashboardLink = lang === 'en' ? '/admin' : `/${lang}/admin`

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return `<svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>`
    }
    
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) {
      return `<svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`
    }
    
    return `<svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>`
  }

  const filesHtml = files.map(file => `
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 mr-4">
            ${getFileIcon(file.name)}
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">${file.name}</div>
            <div class="text-sm text-gray-500">${file.key}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${formatFileSize(file.size)}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${file.lastModified.toLocaleDateString()}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div class="flex items-center justify-end space-x-2">
          <button 
            onclick="previewFile('${file.key}', '${file.url || ''}')"
            class="text-blue-600 hover:text-blue-900 p-1 rounded"
            title="${t('admin.fileManager.preview')}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button 
            onclick="copyUrl('${file.url || ''}')"
            class="text-green-600 hover:text-green-900 p-1 rounded"
            title="${t('admin.fileManager.copyUrl')}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            onclick="renameFile('${file.key}', '${file.name}')"
            class="text-yellow-600 hover:text-yellow-900 p-1 rounded"
            title="${t('admin.fileManager.rename')}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onclick="deleteFile('${file.key}', '${file.name}')"
            class="text-red-600 hover:text-red-900 p-1 rounded"
            title="${t('admin.fileManager.delete')}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('')

  const content = `
    <div class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <a href="${dashboardLink}" class="hover:text-gray-700">${t('admin.dashboard.title')}</a>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-gray-900">${t('admin.fileManager.title')}</span>
            </nav>
            <h1 class="text-3xl font-bold text-gray-900">${t('admin.fileManager.title')}</h1>
            <p class="mt-2 text-gray-600">${t('admin.fileManager.subtitle')}</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              id="uploadBtn"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              ${t('admin.fileManager.upload')}
            </button>
            
            <button 
              id="refreshBtn"
              class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              ${t('admin.fileManager.refresh')}
            </button>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div class="flex-1 max-w-lg">
              <div class="relative">
                <input 
                  type="text" 
                  id="searchInput"
                  placeholder="${t('admin.fileManager.searchPlaceholder')}"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <select id="fileTypeFilter" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">${t('admin.fileManager.allTypes')}</option>
                <option value="image">${t('admin.fileManager.images')}</option>
                <option value="document">${t('admin.fileManager.documents')}</option>
                <option value="video">${t('admin.fileManager.videos')}</option>
                <option value="other">${t('admin.fileManager.other')}</option>
              </select>
              
              <select id="sortBy" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="name">${t('admin.fileManager.sortByName')}</option>
                <option value="size">${t('admin.fileManager.sortBySize')}</option>
                <option value="date">${t('admin.fileManager.sortByDate')}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Files Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${t('admin.fileManager.fileName')}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${t('admin.fileManager.size')}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${t('admin.fileManager.modified')}
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${t('admin.fileManager.actions')}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="filesTableBody">
                ${filesHtml || `
                  <tr>
                    <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <p class="mt-4 text-lg">${t('admin.fileManager.noFiles')}</p>
                      <p class="text-sm">${t('admin.fileManager.uploadFirst')}</p>
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div id="uploadModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">${t('admin.upload.title')}</h3>
            <button id="closeUploadModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center" id="dropZone">
            <input type="file" id="fileInput" multiple class="hidden" />
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="mt-4">
              <label for="fileInput" class="cursor-pointer">
                <span class="mt-2 block text-sm font-medium text-gray-900">
                  ${t('admin.upload.dragDrop')}
                </span>
                <span class="mt-2 block text-sm text-gray-500">
                  ${t('admin.upload.orClickToSelect')}
                </span>
              </label>
            </div>
          </div>
          
          <div id="uploadProgress" class="hidden mt-4">
            <div class="bg-gray-200 rounded-full h-2">
              <div id="progressBar" class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
            <p id="progressText" class="text-sm text-gray-600 mt-2">Uploading...</p>
          </div>
          
          <div class="flex justify-end mt-6 space-x-3">
            <button id="cancelUpload" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200">
              ${t('common.cancel')}
            </button>
            <button id="startUpload" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50" disabled>
              ${t('admin.upload.start')}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div id="previewModal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 id="previewTitle" class="text-lg font-medium text-gray-900"></h3>
          <button id="closePreviewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="previewContent" class="text-center">
          <!-- Preview content will be inserted here -->
        </div>
      </div>
    </div>

    <!-- Rename Modal -->
    <div id="renameModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">${t('admin.fileManager.renameFile')}</h3>
          <input 
            type="text" 
            id="newFileName" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="${t('admin.fileManager.newFileName')}"
          />
          <div class="flex justify-end mt-6 space-x-3">
            <button id="cancelRename" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200">
              ${t('common.cancel')}
            </button>
            <button id="confirmRename" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              ${t('admin.fileManager.rename')}
            </button>
          </div>
        </div>
      </div>
    </div>

    <script>
      let currentFileKey = '';
      let allFiles = ${JSON.stringify(files)};

      // File management functions
      function previewFile(key, url) {
        const modal = document.getElementById('previewModal');
        const title = document.getElementById('previewTitle');
        const content = document.getElementById('previewContent');
        
        title.textContent = key.split('/').pop();
        
        const ext = key.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
          content.innerHTML = \`<img src="\${url}" class="max-w-full max-h-96 mx-auto" alt="Preview" />\`;
        } else {
          content.innerHTML = \`
            <div class="text-center py-8">
              <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p class="mt-4 text-gray-600">${t('admin.fileManager.previewNotAvailable')}</p>
              <a href="\${url}" target="_blank" class="mt-2 inline-block text-blue-600 hover:text-blue-800">${t('admin.fileManager.openInNewTab')}</a>
            </div>
          \`;
        }
        
        modal.classList.remove('hidden');
      }

      function copyUrl(url) {
        navigator.clipboard.writeText(url).then(() => {
          // Show success message
          const toast = document.createElement('div');
          toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
          toast.textContent = '${t('admin.fileManager.urlCopied')}';
          document.body.appendChild(toast);
          
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 3000);
        });
      }

      function renameFile(key, currentName) {
        currentFileKey = key;
        document.getElementById('newFileName').value = currentName;
        document.getElementById('renameModal').classList.remove('hidden');
      }

      function deleteFile(key, name) {
        if (confirm(\`${t('admin.fileManager.confirmDelete')} "\${name}"?\`)) {
          fetch('/api/admin/files/' + encodeURIComponent(key), {
            method: 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              location.reload();
            } else {
              alert('${t('admin.fileManager.deleteFailed')}');
            }
          })
          .catch(error => {
            console.error('Delete failed:', error);
            alert('${t('admin.fileManager.deleteFailed')}');
          });
        }
      }

      // Modal event listeners
      document.getElementById('uploadBtn').addEventListener('click', () => {
        document.getElementById('uploadModal').classList.remove('hidden');
      });

      document.getElementById('closeUploadModal').addEventListener('click', () => {
        document.getElementById('uploadModal').classList.add('hidden');
      });

      document.getElementById('closePreviewModal').addEventListener('click', () => {
        document.getElementById('previewModal').classList.add('hidden');
      });

      document.getElementById('cancelRename').addEventListener('click', () => {
        document.getElementById('renameModal').classList.add('hidden');
      });

      document.getElementById('confirmRename').addEventListener('click', () => {
        const newName = document.getElementById('newFileName').value;
        if (newName && newName !== currentFileKey.split('/').pop()) {
          const newKey = currentFileKey.replace(/[^/]*$/, newName);
          
          fetch('/api/admin/files/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldKey: currentFileKey, newKey })
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              location.reload();
            } else {
              alert('${t('admin.fileManager.renameFailed')}');
            }
          })
          .catch(error => {
            console.error('Rename failed:', error);
            alert('${t('admin.fileManager.renameFailed')}');
          });
        }
        
        document.getElementById('renameModal').classList.add('hidden');
      });

      document.getElementById('refreshBtn').addEventListener('click', () => {
        location.reload();
      });

      // Search and filter functionality
      document.getElementById('searchInput').addEventListener('input', filterFiles);
      document.getElementById('fileTypeFilter').addEventListener('change', filterFiles);
      document.getElementById('sortBy').addEventListener('change', filterFiles);

      function filterFiles() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const typeFilter = document.getElementById('fileTypeFilter').value;
        const sortBy = document.getElementById('sortBy').value;
        
        let filteredFiles = allFiles.filter(file => {
          const matchesSearch = file.name.toLowerCase().includes(searchTerm);
          
          if (!typeFilter) return matchesSearch;
          
          const ext = file.name.split('.').pop().toLowerCase();
          let matchesType = false;
          
          switch (typeFilter) {
            case 'image':
              matchesType = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
              break;
            case 'document':
              matchesType = ['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext);
              break;
            case 'video':
              matchesType = ['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(ext);
              break;
            case 'other':
              matchesType = !['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'doc', 'docx', 'txt', 'rtf', 'mp4', 'avi', 'mov', 'wmv', 'flv'].includes(ext);
              break;
          }
          
          return matchesSearch && matchesType;
        });
        
        // Sort files
        filteredFiles.sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'size':
              return b.size - a.size;
            case 'date':
              return new Date(b.lastModified) - new Date(a.lastModified);
            default:
              return 0;
          }
        });
        
        // Update table
        updateFilesTable(filteredFiles);
      }

      function updateFilesTable(files) {
        const tbody = document.getElementById('filesTableBody');
        // Implementation would update the table with filtered files
        // For now, we'll just reload the page to keep it simple
      }

      // Upload functionality (similar to dashboard)
      const fileInput = document.getElementById('fileInput');
      const startUploadBtn = document.getElementById('startUpload');
      const uploadProgress = document.getElementById('uploadProgress');
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');

      fileInput.addEventListener('change', (e) => {
        startUploadBtn.disabled = e.target.files.length === 0;
      });

      document.getElementById('startUpload').addEventListener('click', async () => {
        const files = fileInput.files;
        if (files.length === 0) return;

        uploadProgress.classList.remove('hidden');
        startUploadBtn.disabled = true;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const progress = ((i + 1) / files.length) * 100;
          
          progressBar.style.width = progress + '%';
          progressText.textContent = \`Uploading \${file.name} (\${i + 1}/\${files.length})\`;

          try {
            const formData = new FormData();
            formData.append('file', file);
            
            await fetch('/api/admin/upload', {
              method: 'POST',
              body: formData
            });
          } catch (error) {
            console.error('Upload failed:', error);
          }
        }

        uploadProgress.classList.add('hidden');
        document.getElementById('uploadModal').classList.add('hidden');
        fileInput.value = '';
        location.reload(); // Refresh the file list
      });

      document.getElementById('cancelUpload').addEventListener('click', () => {
        document.getElementById('uploadModal').classList.add('hidden');
        fileInput.value = '';
        startUploadBtn.disabled = true;
      });

      // Drag and drop functionality
      const dropZone = document.getElementById('dropZone');

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500', 'bg-blue-50');
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          fileInput.files = files;
          startUploadBtn.disabled = false;
        }
      });
    </script>
  `

  return MainLayout({
    children: content,
    title: t('admin.fileManager.title'),
    lang,
    seoTags,
    t,
    currentPath: currentPath || (lang === 'en' ? '/admin/files' : `/${lang}/admin/files`)
  })
}