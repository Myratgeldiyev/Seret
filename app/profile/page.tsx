"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { User, CreditCard, LogOut, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { useWatchlist } from "@/lib/watchlist-context"

export default function ProfilePage() {
  const { t } = useI18n()
  const { user, logout, isAuthenticated } = useAuth()
  const { watchlist } = useWatchlist()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const subscriptionTiers = {
    none: { name: "No Subscription", color: "text-muted-foreground" },
    basic: { name: t("subscription.basic"), color: "text-primary" },
    standard: { name: t("subscription.standard"), color: "text-primary" },
    premium: { name: t("subscription.premium"), color: "text-accent" },
  }

  const currentTier = subscriptionTiers[user.subscription]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">{t("nav.profile")}</h1>

        <div className="grid gap-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account ID</p>
                <p className="text-lg font-mono">{user.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                <CardTitle>Subscription Status</CardTitle>
              </div>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className={`text-xl font-semibold ${currentTier.color}`}>{currentTier.name}</p>
              </div>

              <Link href="/subscription">
                <Button>{user.subscription === "none" ? t("subscription.subscribe") : "Manage Subscription"}</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Watchlist Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Film className="w-6 h-6 text-primary" />
                <CardTitle>Watchlist</CardTitle>
              </div>
              <CardDescription>Your saved movies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Movies</p>
                <p className="text-2xl font-bold">{watchlist.length}</p>
              </div>

              <Link href="/watchlist">
                <Button variant="outline">{t("nav.watchlist")}</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card>
            <CardContent className="pt-6">
              <Button variant="destructive" className="w-full gap-2" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                {t("nav.logout")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
