"use client"

import { useState, useEffect } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MovieCard } from "@/components/movie-card"
import { useI18n } from "@/lib/i18n"
import { searchMovies, filterMovies, getMovies } from "@/lib/movies"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const { t, language } = useI18n()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [year, setYear] = useState("all")
  const [results, setResults] = useState(getMovies())

  useEffect(() => {
    let filtered = query ? searchMovies(query, language) : getMovies()

    // Apply filters
    const filters: any = {}
    if (category !== "all") filters.category = category
    if (year !== "all") filters.year = Number.parseInt(year)

    if (Object.keys(filters).length > 0) {
      filtered = filterMovies(filtered, filters)
    }

    setResults(filtered)
  }, [query, category, year, language])

  const categories = [
    { value: "all", label: t("search.allCategories") },
    { value: "action", label: t("category.action") },
    { value: "drama", label: t("category.drama") },
    { value: "comedy", label: t("category.comedy") },
    { value: "thriller", label: t("category.thriller") },
    { value: "scifi", label: t("category.scifi") },
  ]

  const years = [
    { value: "all", label: t("search.filterByYear") },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Search Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{t("nav.search")}</h1>

            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
                autoFocus
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((yr) => (
                    <SelectItem key={yr.value} value={yr.value}>
                      {yr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              {query ? t("search.results") : t("category.popular")} ({results.length})
            </h2>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((movie) => (
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
    </div>
  )
}
