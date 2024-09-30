import { Metadata } from 'next'
import '@fontsource/poppins'

import {
  NextAuthSessionProvider,
  ReactQueryProvider,
} from '../../../../../providers'
import { Sidebar } from '@/components/Sidebar'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/authOptions'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Amigos de Patinha',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    return redirect('/login')
  }
  if (session.user.role !== 'admin') {
    return redirect('/')
  }
  return (
    <>
      <div
        className="bg-[#F4F9FF]"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="grid-app grid min-h-screen">
          <Sidebar />
          <NextAuthSessionProvider>
            <ReactQueryProvider>
              <main className="">{children}</main>
            </ReactQueryProvider>
          </NextAuthSessionProvider>
        </div>
      </div>
    </>
  )
}
