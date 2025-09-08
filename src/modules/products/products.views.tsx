import { MainLayout } from '../../layouts/MainLayout'
import { generateSEOTags } from '../../lib/seo'
import type { SupportedLanguage } from '../../lib/i18n'

interface ProductsPageProps {
  lang: SupportedLanguage
  t: (key: string) => string
  currentPath?: string
}

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  rating: number
  reviews: number
}

const mockProducts: Product[] = [
  { 
    id: 1, 
    name: 'Premium Headphones', 
    price: 299.99, 
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 124
  },
  { 
    id: 2, 
    name: 'Smart Watch', 
    price: 399.99, 
    description: 'Advanced smartwatch with health monitoring, GPS, and long battery life.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Wearables',
    rating: 4.6,
    reviews: 89
  },
  { 
    id: 3, 
    name: 'Laptop Stand', 
    price: 79.99, 
    description: 'Ergonomic aluminum laptop stand with adjustable height and cooling design.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.7,
    reviews: 156
  },
  { 
    id: 4, 
    name: 'Wireless Mouse', 
    price: 59.99, 
    description: 'Precision wireless mouse with ergonomic design and long battery life.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.5,
    reviews: 203
  },
  { 
    id: 5, 
    name: 'Bluetooth Speaker', 
    price: 149.99, 
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    category: 'Audio',
    rating: 4.9,
    reviews: 78
  },
  { 
    id: 6, 
    name: 'USB-C Hub', 
    price: 89.99, 
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and fast charging support.',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.4,
    reviews: 92
  }
]

export function ProductsPage({ lang, t, currentPath }: ProductsPageProps): string {
  const seoTags = generateSEOTags({
    title: t('products.title'),
    description: t('products.description'),
    keywords: t('products.keywords'),
    ogTitle: t('products.title'),
    ogDescription: t('products.description')
  }, lang)

  const categories = [...new Set(mockProducts.map(p => p.category))]

  const productsHtml = mockProducts.map((product) => `
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div class="relative overflow-hidden">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute top-4 left-4">
          <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            ${product.category}
          </span>
        </div>
        <div class="absolute top-4 right-4">
          <button class="bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 p-2 rounded-full transition-colors duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          ${product.name}
        </h3>
        <p class="text-gray-600 mb-4 text-sm leading-relaxed">
          ${product.description}
        </p>
        
        <!-- Rating -->
        <div class="flex items-center mb-4">
          <div class="flex items-center">
            ${Array.from({ length: 5 }, (_, i) => `
              <svg class="w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            `).join('')}
          </div>
          <span class="ml-2 text-sm text-gray-600">${product.rating} (${product.reviews} ${t('products.reviews')})</span>
        </div>
        
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <span class="text-2xl font-bold text-gray-900">
              $${product.price.toFixed(2)}
            </span>
          </div>
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            ${t('products.addToCart')}
          </button>
        </div>
      </div>
    </div>
  `).join('')

  const content = `
    <div class="py-8">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ${t('products.title')}
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            ${t('products.subtitle')}
          </p>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div class="flex flex-wrap gap-4 justify-center">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            ${t('products.allCategories')}
          </button>
          ${categories.map(category => `
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              ${category}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Products Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${productsHtml}
        </div>
      </div>

      <!-- Load More Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
          ${t('products.loadMore')}
        </button>
      </div>
    </div>

    <script>
      // Add to cart functionality
      document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('${t('products.addToCart')}')) {
          button.addEventListener('click', function() {
            // Add animation
            this.innerHTML = '<svg class="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
            
            setTimeout(() => {
              this.innerHTML = '✓ ${t('products.added')}';
              this.classList.remove('from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
              this.classList.add('bg-green-500', 'hover:bg-green-600');
              
              setTimeout(() => {
                this.innerHTML = '${t('products.addToCart')}';
                this.classList.remove('bg-green-500', 'hover:bg-green-600');
                this.classList.add('from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
              }, 2000);
            }, 1000);
          });
        }
      });

      // Category filter functionality
      document.querySelectorAll('button').forEach(button => {
        if (button.textContent !== '${t('products.addToCart')}' && button.textContent !== '${t('products.loadMore')}' && !button.textContent.includes('✓')) {
          button.addEventListener('click', function() {
            // Remove active class from all category buttons
            document.querySelectorAll('button').forEach(btn => {
              if (btn.textContent !== '${t('products.addToCart')}' && btn.textContent !== '${t('products.loadMore')}') {
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
    title: t('products.title'), 
    lang, 
    seoTags,
    t,
    currentPath: currentPath || (lang === 'en' ? '/products' : `/${lang}/products`)
  })
}