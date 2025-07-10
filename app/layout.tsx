import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chronix - AI-Powered News',
  description: 'Stay informed with AI-curated news from around the world. Filter by category and mood to get the news that matters to you.',
  keywords: 'news, AI, technology, world news, finance, sports, politics, health',
  authors: [{ name: 'Chronix Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Chronix - AI-Powered News',
    description: 'Stay informed with AI-curated news from around the world.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronix - AI-Powered News',
    description: 'Stay informed with AI-curated news from around the world.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-chronix-bg text-chronix-text min-h-screen`}>
        {children}
      </body>
    </html>
  )
} 