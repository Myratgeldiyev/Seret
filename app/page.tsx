'use client'

import { Hero } from '@/components/hero'
import { MovieRow } from '@/components/movie-row'
import { useI18n } from '@/lib/i18n'
import { getFeaturedMovie, getMovies, getMoviesByCategory } from '@/lib/movies'

export default function HomePage() {
	const { t } = useI18n()
	const featuredMovie = getFeaturedMovie()
	const allMovies = getMovies()

	const categories = [
		{ key: 'trending', movies: allMovies.slice(0, 6) },
		{ key: 'action', movies: getMoviesByCategory('action') },
		{ key: 'drama', movies: getMoviesByCategory('drama') },
		{ key: 'scifi', movies: getMoviesByCategory('scifi') },
		{ key: 'thriller', movies: getMoviesByCategory('thriller') },
		{ key: 'comedy', movies: getMoviesByCategory('comedy') },
	]

	return (
		<div className='min-h-screen'>
			<Hero movie={featuredMovie} />

			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 pb-12 -mt-32 relative z-20'>
				{categories.map(category => (
					<MovieRow
						key={category.key}
						title={t(`category.${category.key}`)}
						movies={category.movies}
					/>
				))}
			</div>
		</div>
	)
}
