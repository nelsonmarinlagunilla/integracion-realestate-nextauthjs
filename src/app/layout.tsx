import Navbar from '@/components/Navbar'
import './globals.css'
import Providers from './Providers'

export const metadata = {
  title: 'Login and register with next auth js',
  description: 'Description of Login and register with next auth js ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
        </body>
    </html>
  )
}
