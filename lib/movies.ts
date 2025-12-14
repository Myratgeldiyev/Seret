import moviesData from "@/data/movies.json"
import type { Movie } from "./types"

export function getMovies(): Movie[] {
  return moviesData as Movie[]
}

export function getMovieById(id: string): Movie | undefined {
  return moviesData.find((movie) => movie.id === id) as Movie | undefined
}

export function getMoviesByCategory(category: string): Movie[] {
  return moviesData.filter((movie) => movie.category === category) as Movie[]
}

export function searchMovies(query: string, language: "en" | "ru" | "tm"): Movie[] {
  const lowerQuery = query.toLowerCase()
  return moviesData.filter((movie) => {
    const title = (movie.title as any)[language].toLowerCase()
    const description = (movie.description as any)[language].toLowerCase()
    return title.includes(lowerQuery) || description.includes(lowerQuery)
  }) as Movie[]
}

export function filterMovies(
  movies: Movie[],
  filters: { category?: string; year?: number; minRating?: number },
): Movie[] {
  return movies.filter((movie) => {
    if (filters.category && movie.category !== filters.category) return false
    if (filters.year && movie.year !== filters.year) return false
    if (filters.minRating && movie.rating < filters.minRating) return false
    return true
  })
}

export function getFeaturedMovie(): Movie {
  return moviesData[0] as Movie
}
