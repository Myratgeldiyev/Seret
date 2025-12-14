import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/lib/auth-context'
import { I18nProvider } from '@/lib/i18n'
import { WatchlistProvider } from '@/lib/watchlist-context'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Seret - Watch. Discover. Stream.',
	description: 'Stream your favorite movies and discover new content on Seret',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<body className={`font-sans antialiased`}>
				<I18nProvider>
					<AuthProvider>
						<WatchlistProvider>
							<Navbar />
							<main className='pt-16'>{children}</main>
						</WatchlistProvider>
					</AuthProvider>
				</I18nProvider>
				<Analytics />
			</body>
		</html>
	)
}
