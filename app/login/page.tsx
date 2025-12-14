"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(email, password)
    if (success) {
      router.push("/")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("auth.login")}</CardTitle>
            <CardDescription>{t("common.tagline")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full">
                {t("auth.signIn")}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">{t("auth.noAccount")} </span>
              <Link href="/register" className="text-primary hover:underline">
                {t("auth.signUp")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
