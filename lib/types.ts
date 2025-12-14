export interface Movie {
  id: string
  title: {
    en: string
    ru: string
    tm: string
  }
  description: {
    en: string
    ru: string
    tm: string
  }
  category: "action" | "drama" | "comedy" | "thriller" | "scifi"
  rating: number
  year: number
  duration: string
  videoUrl: string
  poster: string
  hero: string
}
