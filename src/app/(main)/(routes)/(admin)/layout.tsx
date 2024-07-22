import { Metadata } from 'next'
import '@fontsource/poppins'

import {
  NextAuthSessionProvider,
  ReactQueryProvider,
} from '../../../../../providers'
import { Toaster } from 'sonner'
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
      <html lang="pt-br" className="scroll-smooth">
        <body
          className="bg-[#F4F9FF]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <div className="grid-app grid min-h-screen">
            <Sidebar />
            <NextAuthSessionProvider>
              <ReactQueryProvider>
                <main className="">
                  {children}
                  <Toaster
                    toastOptions={{
                      style: { background: 'white' },
                    }}
                  />
                </main>
              </ReactQueryProvider>
            </NextAuthSessionProvider>
          </div>
        </body>
      </html>
    </>
  )
}
