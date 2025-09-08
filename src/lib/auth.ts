import { betterAuth } from 'better-auth'

// Placeholder for Better Auth configuration
export const auth = betterAuth({
  database: {
    // Configure your database connection here
    // Example: SQLite, PostgreSQL, MySQL, etc.
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Configure social providers here
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.User