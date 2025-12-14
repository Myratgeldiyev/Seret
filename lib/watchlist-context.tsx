"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface WatchlistContextType {
  watchlist: string[]
  addToWatchlist: (movieId: string) => void
  removeFromWatchlist: (movieId: string) => void
  isInWatchlist: (movieId: string) => boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const savedWatchlist = localStorage.getItem(`seret_watchlist_${user.id}`)
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist))
      }
    } else {
      setWatchlist([])
    }
  }, [user])

  const addToWatchlist = (movieId: string) => {
    if (user && !watchlist.includes(movieId)) {
      const updated = [...watchlist, movieId]
      setWatchlist(updated)
      localStorage.setItem(`seret_watchlist_${user.id}`, JSON.stringify(updated))
    }
  }

  const removeFromWatchlist = (movieId: string) => {
    if (user) {
      const updated = watchlist.filter((id) => id !== movieId)
      setWatchlist(updated)
      localStorage.setItem(`seret_watchlist_${user.id}`, JSON.stringify(updated))
    }
  }

  const isInWatchlist = (movieId: string): boolean => {
    return watchlist.includes(movieId)
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider")
  }
  return context
}
