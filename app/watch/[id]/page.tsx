"use client"

import { useParams, useRouter } from "next/navigation"
import { VideoPlayer } from "@/components/video-player"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import { getMovieById } from "@/lib/movies"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { language, t } = useI18n()

  const movie = getMovieById(params.id as string)

  useEffect(() => {
    // Check if user can watch (must be authenticated and have subscription)
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.subscription === "none") {
      router.push("/subscription")
    }
  }, [isAuthenticated, user, router])

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">{t("search.noResults")}</h1>
          <Link href="/">
            <Button>{t("nav.home")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Don't render player if user doesn't have access
  if (!isAuthenticated || user?.subscription === "none") {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <VideoPlayer
        movieId={movie.id}
        movieTitle={movie.title[language]}
        videoUrl={movie.videoUrl}
        onBack={() => router.back()}
      />
    </div>
  )
}
