import './globals.css'
import { Metadata } from 'next'
import '@fontsource/poppins'
import { NextAuthSessionProvider, ReactQueryProvider } from '../../providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'

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
        <body style={{ fontFamily: 'Poppins, sans-serif' }}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <NextAuthSessionProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthSessionProvider>
          <ToastContainer />
        </body>
      </html>
    </>
  )
}
