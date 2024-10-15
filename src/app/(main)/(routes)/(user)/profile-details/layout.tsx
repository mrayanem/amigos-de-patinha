import '@fontsource/poppins'
import React from 'react'
import { redirect } from 'next/navigation'
import { NavProfile } from '../../../../../components/profile/SidebarProfile'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  //Obtém a sessão do usuário
  //const session = await getSession()

  // if (!session) {
  //   // Redireciona para a página de login se não estiver autenticado
  //   redirect('/login')
  //   return null
  // }

  // // Verifica se o papel do usuário não é 'client' nem 'admin'
  // if (session.user.role !== 'client' && session.user.role !== 'admin') {
  //   redirect('/')
  //   return null
  // }

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="grid-user grid min-h-screen">
        <NavProfile />
        <main>{children}</main>
      </div>
    </div>
  )
}
