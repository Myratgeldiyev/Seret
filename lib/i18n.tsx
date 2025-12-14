"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "ru" | "tm"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.movies": "Movies",
    "nav.categories": "Categories",
    "nav.search": "Search",
    "nav.profile": "Profile",
    "nav.watchlist": "My Watchlist",
    "nav.logout": "Logout",
    "nav.login": "Login",

    // Hero
    "hero.play": "Play",
    "hero.moreInfo": "More Info",
    "hero.addToWatchlist": "Add to Watchlist",

    // Categories
    "category.action": "Action",
    "category.drama": "Drama",
    "category.comedy": "Comedy",
    "category.thriller": "Thriller",
    "category.scifi": "Sci-Fi",
    "category.trending": "Trending Now",
    "category.popular": "Popular",
    "category.newReleases": "New Releases",

    // Movie Details
    "movie.duration": "Duration",
    "movie.rating": "Rating",
    "movie.year": "Year",
    "movie.category": "Category",
    "movie.play": "Play",
    "movie.addWatchlist": "Add to Watchlist",
    "movie.removeWatchlist": "Remove from Watchlist",

    // Search
    "search.placeholder": "Search movies...",
    "search.results": "Search Results",
    "search.noResults": "No movies found",
    "search.filterByCategory": "Filter by Category",
    "search.filterByYear": "Filter by Year",
    "search.allCategories": "All Categories",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.hasAccount": "Already have an account?",
    "auth.noAccount": "Don't have an account?",
    "auth.signUp": "Sign Up",
    "auth.signIn": "Sign In",

    // Subscription
    "subscription.title": "Choose Your Plan",
    "subscription.basic": "Basic",
    "subscription.standard": "Standard",
    "subscription.premium": "Premium",
    "subscription.basicDesc": "Watch on 1 device in SD quality",
    "subscription.standardDesc": "Watch on 2 devices in HD quality",
    "subscription.premiumDesc": "Watch on 4 devices in 4K quality",
    "subscription.selectPlan": "Select Plan",
    "subscription.currentPlan": "Current Plan",
    "subscription.subscribe": "Subscribe",
    "subscription.locked": "Subscribe to watch this content",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.tagline": "Watch. Discover. Stream.",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.movies": "Фильмы",
    "nav.categories": "Категории",
    "nav.search": "Поиск",
    "nav.profile": "Профиль",
    "nav.watchlist": "Мой список",
    "nav.logout": "Выйти",
    "nav.login": "Войти",

    // Hero
    "hero.play": "Воспроизвести",
    "hero.moreInfo": "Подробнее",
    "hero.addToWatchlist": "Добавить в список",

    // Categories
    "category.action": "Боевики",
    "category.drama": "Драмы",
    "category.comedy": "Комедии",
    "category.thriller": "Триллеры",
    "category.scifi": "Фантастика",
    "category.trending": "В тренде",
    "category.popular": "Популярное",
    "category.newReleases": "Новинки",

    // Movie Details
    "movie.duration": "Длительность",
    "movie.rating": "Рейтинг",
    "movie.year": "Год",
    "movie.category": "Категория",
    "movie.play": "Смотреть",
    "movie.addWatchlist": "Добавить в список",
    "movie.removeWatchlist": "Удалить из списка",

    // Search
    "search.placeholder": "Поиск фильмов...",
    "search.results": "Результаты поиска",
    "search.noResults": "Фильмы не найдены",
    "search.filterByCategory": "Фильтр по категории",
    "search.filterByYear": "Фильтр по году",
    "search.allCategories": "Все категории",

    // Auth
    "auth.login": "Вход",
    "auth.register": "Регистрация",
    "auth.email": "Электронная почта",
    "auth.password": "Пароль",
    "auth.confirmPassword": "Подтвердите пароль",
    "auth.hasAccount": "Уже есть аккаунт?",
    "auth.noAccount": "Нет аккаунта?",
    "auth.signUp": "Зарегистрироваться",
    "auth.signIn": "Войти",

    // Subscription
    "subscription.title": "Выберите план",
    "subscription.basic": "Базовый",
    "subscription.standard": "Стандартный",
    "subscription.premium": "Премиум",
    "subscription.basicDesc": "Просмотр на 1 устройстве в SD качестве",
    "subscription.standardDesc": "Просмотр на 2 устройствах в HD качестве",
    "subscription.premiumDesc": "Просмотр на 4 устройствах в 4K качестве",
    "subscription.selectPlan": "Выбрать план",
    "subscription.currentPlan": "Текущий план",
    "subscription.subscribe": "Подписаться",
    "subscription.locked": "Подпишитесь, чтобы смотреть этот контент",

    // Common
    "common.loading": "Загрузка...",
    "common.error": "Что-то пошло не так",
    "common.close": "Закрыть",
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.confirm": "Подтвердить",
    "common.tagline": "Смотри. Открывай. Стримь.",
  },
  tm: {
    // Navigation
    "nav.home": "Baş sahypa",
    "nav.movies": "Filmler",
    "nav.categories": "Kategoriýalar",
    "nav.search": "Gözleg",
    "nav.profile": "Profil",
    "nav.watchlist": "Meniň sanawym",
    "nav.logout": "Çykmak",
    "nav.login": "Girmek",

    // Hero
    "hero.play": "Oýnamak",
    "hero.moreInfo": "Giňişleýin",
    "hero.addToWatchlist": "Sanawa goşmak",

    // Categories
    "category.action": "Hereket",
    "category.drama": "Drama",
    "category.comedy": "Komediýa",
    "category.thriller": "Triller",
    "category.scifi": "Ylmy fantastika",
    "category.trending": "Meşhur",
    "category.popular": "Meşhur",
    "category.newReleases": "Täze çykanlar",

    // Movie Details
    "movie.duration": "Dowamlylygy",
    "movie.rating": "Reýting",
    "movie.year": "Ýyl",
    "movie.category": "Kategoriýa",
    "movie.play": "Synlamak",
    "movie.addWatchlist": "Sanawa goşmak",
    "movie.removeWatchlist": "Sanawdan aýyrmak",

    // Search
    "search.placeholder": "Filmleri gözläň...",
    "search.results": "Gözleg netijeleri",
    "search.noResults": "Film tapylmady",
    "search.filterByCategory": "Kategoriýa boýunça süzmek",
    "search.filterByYear": "Ýyl boýunça süzmek",
    "search.allCategories": "Ähli kategoriýalar",

    // Auth
    "auth.login": "Girmek",
    "auth.register": "Hasaba almak",
    "auth.email": "E-poçta",
    "auth.password": "Parol",
    "auth.confirmPassword": "Paroly tassyklaň",
    "auth.hasAccount": "Hasabyňyz barmy?",
    "auth.noAccount": "Hasabyňyz ýokmy?",
    "auth.signUp": "Hasaba alyň",
    "auth.signIn": "Giriň",

    // Subscription
    "subscription.title": "Meýilnamaňyzy saýlaň",
    "subscription.basic": "Esasy",
    "subscription.standard": "Adaty",
    "subscription.premium": "Premium",
    "subscription.basicDesc": "1 enjamda SD hilli synlamak",
    "subscription.standardDesc": "2 enjamda HD hilli synlamak",
    "subscription.premiumDesc": "4 enjamda 4K hilli synlamak",
    "subscription.selectPlan": "Meýilnama saýlaň",
    "subscription.currentPlan": "Häzirki meýilnama",
    "subscription.subscribe": "Ýazylmak",
    "subscription.locked": "Bu mazmuny synlamak üçin ýazylyň",

    // Common
    "common.loading": "Ýüklenýär...",
    "common.error": "Näsazlyk ýüze çykdy",
    "common.close": "Ýapmak",
    "common.save": "Ýatda saklamak",
    "common.cancel": "Ýatyr",
    "common.confirm": "Tassyklamak",
    "common.tagline": "Synla. Açyň. Akym.",
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
