"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export default function SubscriptionPage() {
  const { t } = useI18n()
  const { user, updateSubscription, isAuthenticated } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "standard" | "premium" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: "basic" as const,
      name: t("subscription.basic"),
      price: "$9.99",
      description: t("subscription.basicDesc"),
      features: ["Watch on 1 device", "SD quality", "Download on 1 device"],
      color: "border-primary/50",
    },
    {
      id: "standard" as const,
      name: t("subscription.standard"),
      price: "$14.99",
      description: t("subscription.standardDesc"),
      features: ["Watch on 2 devices", "HD quality", "Download on 2 devices", "Ad-free experience"],
      color: "border-primary",
      popular: true,
    },
    {
      id: "premium" as const,
      name: t("subscription.premium"),
      price: "$19.99",
      description: t("subscription.premiumDesc"),
      features: [
        "Watch on 4 devices",
        "4K + HDR quality",
        "Download on 4 devices",
        "Ad-free experience",
        "Early access to new releases",
      ],
      color: "border-accent",
    },
  ]

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      if (selectedPlan) {
        updateSubscription(selectedPlan)
        setIsProcessing(false)
        setSelectedPlan(null)
        router.push("/")
      }
    }, 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">{t("subscription.title")}</h1>
          <p className="text-muted-foreground">Please login to subscribe</p>
          <Link href="/login">
            <Button>{t("nav.login")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">{t("subscription.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("common.tagline")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.color} ${plan.popular ? "border-2 scale-105" : ""} transition-all hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Popular
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={user?.subscription === plan.id ? "secondary" : "default"}
                  disabled={user?.subscription === plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {user?.subscription === plan.id ? t("subscription.currentPlan") : t("subscription.selectPlan")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={selectedPlan !== null} onOpenChange={() => !isProcessing && setSelectedPlan(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              Subscribe to the {selectedPlan && t(`subscription.${selectedPlan}`)} plan
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" required disabled={isProcessing} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" required disabled={isProcessing} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required disabled={isProcessing} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" placeholder="John Doe" required disabled={isProcessing} />
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{selectedPlan && plans.find((p) => p.id === selectedPlan)?.price}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{selectedPlan && plans.find((p) => p.id === selectedPlan)?.price}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? t("common.loading") : t("subscription.subscribe")}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              This is a simulated payment. No actual charges will be made.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
