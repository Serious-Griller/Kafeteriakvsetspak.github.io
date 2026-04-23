import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const _inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: 'Kafeteria KV Setapak — Where the Night Gets Delicious',
  description: 'Order makanan malam hari dari Kafeteria KV Setapak. Chicken Chop, Crispy Fried Chicken, Crispy Chicken Burger. Last order 8:30 PM, pickup 9:00 PM.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ms" className="bg-[#0f0f0f]">
      <body className={`${_bebasNeue.variable} ${_inter.variable} font-body antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
