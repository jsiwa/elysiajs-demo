# Elysia Fullstack App with Better Auth

A modern fullstack application built with Elysia, featuring internationalization (i18n), Better Auth authentication, and TypeScript.

## 🚀 Features

- **Multi-language Support**: English, Japanese, Chinese
- **Authentication**: Better Auth with email/password and GitHub OAuth
- **Server-side Rendering**: HTML generation with SEO optimization
- **Type Safety**: Full TypeScript support
- **Modern UI**: Tailwind CSS styling
- **Modular Architecture**: Clean separation of concerns

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database and OAuth credentials.

4. Set up the database:
   ```bash
   # Create PostgreSQL database
   createdb elysia_app
   
   # Run the initialization script (optional - Better Auth will create tables automatically)
   psql elysia_app < scripts/init-db.sql
   ```

## 🔧 Configuration

### Database Setup

Better Auth supports multiple databases. For PostgreSQL:

```typescript
// src/lib/auth.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
```

For SQLite (development):
```typescript
// Alternative for development
database: './database.sqlite'
```

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Add the Client ID and Secret to your `.env` file

## 🌐 Routes

### Public Routes
- `/` - Home (English)
- `/ja` - Home (Japanese)  
- `/zh` - Home (Chinese)
- `/products` - Products (English)
- `/ja/products` - Products (Japanese)
- `/zh/products` - Products (Chinese)

### Authentication Routes
- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile (protected)

### API Routes
- `/api/auth/*` - Better Auth endpoints
- `/api/auth/sign-in/email` - Email/password login
- `/api/auth/sign-up/email` - Email/password registration
- `/api/auth/sign-in/github` - GitHub OAuth
- `/api/auth/sign-out` - Logout

## 🛠 Development

Start the development server:
```bash
bun run dev
```

The app will be available at:
- Main app: http://localhost:3000
- Better Auth: http://localhost:3000/api/auth

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.tsx      # Navigation header with auth
├── layouts/            # Page layouts
│   ├── BaseHtml.tsx   # Base HTML structure
│   └── MainLayout.tsx # Main page layout
├── lib/               # Utility libraries
│   ├── auth.ts        # Better Auth configuration
│   ├── i18n.ts        # Internationalization
│   ├── seo.ts         # SEO utilities
│   └── translate.ts   # Translation helpers
├── modules/           # Feature modules
│   ├── auth/          # Authentication pages
│   ├── home/          # Home page
│   └── products/      # Products pages
├── plugins/           # Elysia plugins
│   ├── auth.ts        # Better Auth plugin
│   └── i18n.ts        # i18n plugin
└── index.ts           # Main application
```

## 🔐 Authentication Features

- **Email/Password**: Traditional authentication
- **GitHub OAuth**: Social login
- **Session Management**: Secure session handling
- **Protected Routes**: Route-level authentication
- **Multi-language Auth**: Localized auth pages
- **User Profiles**: User information management

## 🌍 Internationalization

The app supports path-based language routing:
- English: `/` (default)
- Japanese: `/ja/*`
- Chinese: `/zh/*`

Translation files are located in `locales/[lang]/common.json`.

## 📱 Usage Examples

### Protecting Routes
```typescript
.get('/profile', ({ user }) => {
  if (!user) {
    return redirect('/login')
  }
  return ProfilePage({ user })
}, { auth: true })
```

### Using Translations
```typescript
const t = createTranslator('ja')
const welcomeMessage = t('home.welcome') // "Elysiaアプリへようこそ"
```

### Accessing User Data
```typescript
.get('/dashboard', ({ user, session }) => {
  return `Welcome ${user.name}! Session expires: ${session.expiresAt}`
}, { auth: true })
```

## 🚀 Production Deployment

1. Set up a production database
2. Configure environment variables
3. Build the application:
   ```bash
   bun run build
   ```
4. Start the production server:
   ```bash
   bun start
   ```

## 📄 License

MIT License