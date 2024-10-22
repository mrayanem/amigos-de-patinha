import { apiServer } from '@/client/server'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

type TAuth = {
  id: string
  email: string
  password: string
  role: string
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
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'seu-email@example.com',
        },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as TAuth

        try {
          const response = await apiServer.post<TAuthResponse>('/auth', {
            email,
            password,
          })
          const user = response.data.data

          if (!user) {
            return null
          }

          return user
        } catch (err) {
          console.error('Erro na autenticação:', err)
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
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as TAuth
      session.expires = token.exp as string
      return session
    },
  },
}
