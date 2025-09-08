#!/usr/bin/env node

console.log('🚀 Starting Elysia fullstack app...')
console.log('📁 Project structure:')
console.log('  ├── English: http://localhost:3000/')
console.log('  ├── Japanese: http://localhost:3000/ja')
console.log('  ├── Chinese: http://localhost:3000/zh')
console.log('  ├── Products (EN): http://localhost:3000/products')
console.log('  ├── Products (JA): http://localhost:3000/ja/products')
console.log('  └── Products (ZH): http://localhost:3000/zh/products')
console.log('')
console.log('🌐 Language switching should work by clicking the language buttons in the header')
console.log('')

// Import and start the app
require('./src/index.ts')