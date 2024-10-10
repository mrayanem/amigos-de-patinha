import './globals.css'
import { Metadata } from 'next'
import '@fontsource/poppins'
import { NextAuthSessionProvider, ReactQueryProvider } from '../../providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
          <NextAuthSessionProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthSessionProvider>
          <ToastContainer />
        </body>
      </html>
    </>
  )
}
