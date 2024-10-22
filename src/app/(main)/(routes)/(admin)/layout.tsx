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
import { Navbar } from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'

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

          <Navbar/>
            {children}
          <Footer/>
      </div>
    </>
  )
}
