import '@fontsource/poppins'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextAuthOptions } from '@/app/api/auth/authOptions'
import { NavProfile } from '../../../../../components/profile/SidebarProfile'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/login')
    return null
  }

  if (session.user.role !== 'client' && session.user.role !== 'admin') {
    redirect('/')
    return null
  }

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="grid-user grid min-h-screen">
        <NavProfile />
        <main>{children}</main>
      </div>
    </div>
  )
}
