import { type DefaultSession, type DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      role?: string | null
      token?: accessToken
    }
  }
  interface User extends DefaultUser {
    id: string
    name?: string | null
    email?: string | null
  }
}
