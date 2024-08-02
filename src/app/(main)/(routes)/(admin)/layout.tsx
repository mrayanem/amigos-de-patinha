import { Metadata } from 'next'
import '@fontsource/poppins'

import {
  NextAuthSessionProvider,
  ReactQueryProvider,
} from '../../../../../providers'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Amigos de Patinha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
