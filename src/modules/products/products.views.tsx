import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import { getLocalizedPath } from '../../lib/path'
import type { SupportedLanguage } from '../../lib/i18n'

interface ProductsPageProps {
  lang: SupportedLanguage
  t: (key: string) => string
}

interface Product {
  id: number
  name: string
  price: number
  description: string
}

const mockProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 99.99, description: 'Amazing product description' },
  { id: 2, name: 'Product 2', price: 149.99, description: 'Another great product' },
  { id: 3, name: 'Product 3', price: 79.99, description: 'Fantastic product features' }
]

export function ProductsPage({ lang, t }: ProductsPageProps): string {
  const seoTags = generateSEOTags({
    title: t('products.title'),
    description: t('products.description'),
    keywords: t('products.keywords')
  }, lang)

  const productsHtml = mockProducts.map((product) => `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
      <p class="text-gray-600 mb-4">${product.description}</p>
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-blue-600">
          $${product.price}
        </span>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          ${t('products.addToCart')}
        </button>
      </div>
    </div>
  `).join('')

  const content = `
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        ${t('products.title')}
      </h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${productsHtml}
      </div>
    </div>
  `

  return MainLayout({ 
    children: content, 
    title: t('products.title'), 
    lang, 
    seoTags 
  })
}