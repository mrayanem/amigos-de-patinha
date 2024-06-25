import './globals.css'
import { Metadata } from 'next'
import '@fontsource/poppins'
import { Toaster } from '@/components/ui/sonner'

import { NextAuthSessionProvider, ReactQueryProvider } from '../../providers'

export const metadata: Metadata = {
  title: 'Amigos de Patinha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body style={{ fontFamily: 'Poppins, sans-serif' }}>
        <NextAuthSessionProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
