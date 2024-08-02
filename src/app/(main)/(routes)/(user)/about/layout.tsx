import { Navbar } from '@/components/navbar/Navbar'
import '@fontsource/poppins'
import Footer from '@/components/footer/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
