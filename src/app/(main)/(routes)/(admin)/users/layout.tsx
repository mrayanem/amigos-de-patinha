import '@fontsource/poppins'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextAuthOptions } from '@/app/api/auth/authOptions'
import { Sidebar } from '@/components/Sidebar'

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

  if (session.user.role !== 'admin') {
    redirect('/')
    return null
  }

  return (
    <div className="bg-[#F4F9FF]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="grid-app grid min-h-screen">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  )
}
