"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Play, Info, Plus, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { useWatchlist } from "@/lib/watchlist-context"
import Link from "next/link"
import type { Movie } from "@/lib/types"

interface HeroProps {
  movie: Movie
}

export function Hero({ movie }: HeroProps) {
  const { t, language } = useI18n()
  const { isAuthenticated } = useAuth()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const inWatchlist = mounted && isInWatchlist(movie.id)

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie.id)
    }
  }

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

      <img
        src={movie.hero || "/placeholder.svg"}
        alt={movie.title[language]}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">{movie.title[language]}</h1>

            <p className="text-lg text-muted-foreground text-pretty max-w-xl">{movie.description[language]}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-md font-medium">{movie.rating}</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="capitalize">{t(`category.${movie.category}`)}</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link href={`/watch/${movie.id}`}>
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5 fill-current" />
                  {t("hero.play")}
                </Button>
              </Link>

              <Link href={`/movie/${movie.id}`}>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Info className="w-5 h-5" />
                  {t("hero.moreInfo")}
                </Button>
              </Link>

              {isAuthenticated && (
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" onClick={handleWatchlistToggle}>
                  {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {t("hero.addToWatchlist")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
