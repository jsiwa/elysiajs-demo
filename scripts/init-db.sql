-- Better Auth database schema
-- This will be automatically created by Better Auth, but you can run this manually if needed

-- Users table
CREATE TABLE IF NOT EXISTS "user" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "emailVerified" BOOLEAN DEFAULT FALSE,
    "name" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT DEFAULT 'user'
);

-- Sessions table
CREATE TABLE IF NOT EXISTS "session" (
    "id" TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

-- Accounts table (for OAuth providers)
CREATE TABLE IF NOT EXISTS "account" (
    "id" TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verification table
CREATE TABLE IF NOT EXISTS "verification" (
    "id" TEXT PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "user"("email");
CREATE INDEX IF NOT EXISTS "session_token_idx" ON "session"("token");
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session"("userId");
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"("userId");
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification"("identifier");