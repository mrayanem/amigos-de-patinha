import { type DefaultSession, type DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: number
    }
  }
  interface User extends DefaultUser {
    id: number
    name?: string | null
    email?: string | null
  }
}
