"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { useI18n } from "@/lib/i18n"
import { getMoviesByCategory } from "@/lib/movies"

export default function CategoryPage() {
  const params = useParams()
  const { t } = useI18n()
  const category = params.category as string

  const movies = getMoviesByCategory(category)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/categories">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">{t(`category.${category}`)}</h1>
          </div>

          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">{t("search.noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
