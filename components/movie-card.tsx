"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Play, Plus, Check, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { useWatchlist } from "@/lib/watchlist-context"
import { Button } from "./ui/button"
import type { Movie } from "@/lib/types"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { language } = useI18n()
  const { isAuthenticated } = useAuth()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const inWatchlist = isInWatchlist(movie.id)

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie.id)
    }
  }

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/watch/${movie.id}`)
  }

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/movie/${movie.id}`)
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-card cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title[language]}
          className="w-full h-full object-cover"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 className="font-semibold text-sm line-clamp-1">{movie.title[language]}</h3>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 bg-primary/20 text-primary rounded">{movie.rating}</span>
              <span>{movie.year}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 w-8 p-0" onClick={handlePlayClick}>
                <Play className="w-4 h-4 fill-current" />
              </Button>

              {isAuthenticated && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={handleWatchlistToggle}
                >
                  {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
              )}

              <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={handleInfoClick}>
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
