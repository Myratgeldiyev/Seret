"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { useWatchlist } from "@/lib/watchlist-context"
import { getMovieById } from "@/lib/movies"
import Link from "next/link"

export default function WatchlistPage() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const { watchlist, removeFromWatchlist } = useWatchlist()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const movies = watchlist.map((id) => getMovieById(id)).filter((movie) => movie !== undefined)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">{t("nav.watchlist")}</h1>
              <p className="text-muted-foreground mt-2">
                {movies.length} {movies.length === 1 ? "movie" : "movies"} in your watchlist
              </p>
            </div>

            {movies.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={() => {
                  if (confirm("Remove all movies from watchlist?")) {
                    movies.forEach((movie) => removeFromWatchlist(movie.id))
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>

          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="space-y-4">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Trash2 className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold">Your watchlist is empty</h2>
                <p className="text-muted-foreground">Start adding movies you want to watch later</p>
                <Link href="/">
                  <Button className="mt-4">{t("nav.home")}</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
