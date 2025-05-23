import '@fontsource/poppins'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextAuthOptions } from '@/app/api/auth/authOptions'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Obtém a sessão do usuário
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    // Redireciona para a página de login se não estiver autenticado
    redirect('/login')
    return null
  }

  // Verifica se o papel do usuário não é 'client' nem 'admin'
  if (session.user.role !== 'client' && session.user.role !== 'admin') {
    redirect('/')
    return null
  }

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <main>{children}</main>
    </div>
  )
}
