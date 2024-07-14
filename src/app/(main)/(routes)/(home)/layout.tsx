import { Navbar } from '@/components/navbar/Navbar'
import '@fontsource/poppins'
import Footer from '@/components/footer/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log('oi')
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
