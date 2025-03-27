import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap' 
})

export const metadata: Metadata = {
  title: 'Tinevimbo Musingadi | Personal Portfolio',
  description: 'Tinevimbo Musingadi - Computer Science student at Harare Institute of Technology, ML Engineer, and Inventor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
