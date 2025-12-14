"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { MovieCard } from "./movie-card"
import type { Movie } from "@/lib/types"

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-4 group/row">
      <h2 className="text-2xl font-bold px-4 sm:px-6 lg:px-8">{title}</h2>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 rounded-none bg-background/80 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-background/90"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 rounded-none bg-background/80 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-background/90"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  )
}
