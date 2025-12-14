"use client"

import { useState } from "react"
import { MovieCard } from "@/components/movie-card"
import { useI18n } from "@/lib/i18n"
import { getMovies } from "@/lib/movies"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MoviesPage() {
  const { t } = useI18n()
  const [sortBy, setSortBy] = useState("rating")
  const allMovies = getMovies()

  const sortedMovies = [...allMovies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "year":
        return b.year - a.year
      case "title":
        return a.title.en.localeCompare(b.title.en)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{t("nav.movies")}</h1>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">{t("movie.rating")}</SelectItem>
                <SelectItem value="year">{t("movie.year")}</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
