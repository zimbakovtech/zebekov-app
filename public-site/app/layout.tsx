import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}