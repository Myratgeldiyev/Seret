import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"
import { AuthProvider } from "@/lib/auth-context"
import { WatchlistProvider } from "@/lib/watchlist-context"
import { Navbar } from "@/components/navbar"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Seret - Watch. Discover. Stream.",
  description: "Stream your favorite movies and discover new content on Seret",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <I18nProvider>
          <AuthProvider>
            <WatchlistProvider>
              <Navbar />
              <main className="pt-16">{children}</main>
            </WatchlistProvider>
          </AuthProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
