'use client'
import { SessionProvider } from 'next-auth/react'

interface NextAuthSessionProviderProps {
  children: React.ReactNode
}

export function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
