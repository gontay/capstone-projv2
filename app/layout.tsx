import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        <Toaster/>
        <Navbar/>
        {children}
      </body>
      </Provider>
     
    </html>
    </SessionProvider>

  )
}
