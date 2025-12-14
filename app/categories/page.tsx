"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { getMoviesByCategory } from "@/lib/movies"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  const { t } = useI18n()

  const categories = [
    { key: "action", color: "from-red-600 to-orange-600" },
    { key: "drama", color: "from-blue-600 to-purple-600" },
    { key: "comedy", color: "from-yellow-600 to-pink-600" },
    { key: "thriller", color: "from-gray-600 to-slate-800" },
    { key: "scifi", color: "from-cyan-600 to-blue-600" },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">{t("nav.categories")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const movies = getMoviesByCategory(category.key)
            return (
              <Link key={category.key} href={`/category/${category.key}`}>
                <div
                  className={`relative h-48 rounded-lg overflow-hidden bg-gradient-to-br ${category.color} group cursor-pointer transition-transform hover:scale-105`}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                    <h2 className="text-3xl font-bold text-white">{t(`category.${category.key}`)}</h2>
                    <p className="text-white/80">
                      {movies.length} {movies.length === 1 ? "movie" : "movies"}
                    </p>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Browse
                    </Button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
