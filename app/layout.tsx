import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'MediPredict-SL',
  description: 'Bilingual chronic disease health management prototype'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="container-page">
          {children}
        </main>
      </body>
    </html>
  )
}