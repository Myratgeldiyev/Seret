"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Search, User, Globe } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { t, language, setLanguage } = useI18n()
  const { user, logout, isAuthenticated } = useAuth()

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/movies", label: t("nav.movies") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/search", label: t("nav.search") },
  ]

  const languages = [
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "ru" as const, label: "Русский", flag: "🇷🇺" },
    { code: "tm" as const, label: "Türkmençe", flag: "🇹🇲" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/search">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">{user?.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("nav.profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/watchlist">{t("nav.watchlist")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>{t("nav.logout")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="sm">{t("nav.login")}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
