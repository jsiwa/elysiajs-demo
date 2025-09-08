// Simplified auth types for development
export interface User {
  id: string
  email: string
  name?: string
  role?: string
  createdAt: Date
}

export interface Session {
  id: string
  userId: string
  expiresAt: Date
  token: string
}

// Mock auth functions for development
export const auth = {
  // Mock functions - replace with Better Auth when ready
  async signIn(email: string, password: string): Promise<{ user: User; session: Session } | null> {
    // Mock implementation
    return null
  },
  
  async signUp(email: string, password: string, name?: string): Promise<{ user: User; session: Session } | null> {
    // Mock implementation
    return null
  },
  
  async signOut(): Promise<void> {
    // Mock implementation
  },
  
  async getSession(headers: Record<string, string>): Promise<{ user: User; session: Session } | null> {
    // Mock implementation
    return null
  }
}