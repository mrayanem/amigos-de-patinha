import { api } from '@/client'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type TAuth = {
  id: number
  email: string
  password: string
}

type TAuthResponse = {
  success: boolean
  data: TAuth | null
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as TAuth

        try {
          const user = await api
            .post<TAuthResponse>('/auth', { email, password })
            .then(({ data }) => data.data)

          return user || null
        } catch (err) {
          console.log(err)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session = {
        user: token.user as TAuth,
        expires: session.expires,
      }

      return session
    },
  },
}
