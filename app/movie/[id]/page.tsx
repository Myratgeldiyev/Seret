'use client'

import { MovieRow } from '@/components/movie-row'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useI18n } from '@/lib/i18n'
import { getMovieById, getMoviesByCategory } from '@/lib/movies'
import { useWatchlist } from '@/lib/watchlist-context'
import { ArrowLeft, Check, Play, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function MovieDetailsPage() {
	const params = useParams()
	const { t, language } = useI18n()
	const { isAuthenticated, user } = useAuth()
	const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

	const movie = getMovieById(params.id as string)

	if (!movie) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center space-y-4'>
					<h1 className='text-2xl font-bold'>{t('search.noResults')}</h1>
					<Link href='/'>
						<Button>{t('nav.home')}</Button>
					</Link>
				</div>
			</div>
		)
	}

	const inWatchlist = isInWatchlist(movie.id)
	const relatedMovies = getMoviesByCategory(movie.category).filter(
		m => m.id !== movie.id
	)

	const handleWatchlistToggle = () => {
		if (inWatchlist) {
			removeFromWatchlist(movie.id)
		} else {
			addToWatchlist(movie.id)
		}
	}

	const canWatch = !isAuthenticated || user?.subscription !== 'none'

	return (
		<div className='min-h-screen'>
			<div className='relative h-[70vh] w-full overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10' />
				<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10' />

				<img
					src={movie.hero || '/placeholder.svg'}
					alt={movie.title[language]}
					className='absolute inset-0 w-full h-full object-cover'
				/>

				<div className='relative z-20 h-full flex flex-col justify-end'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12'>
						<Link href='/'>
							<Button variant='ghost' className='mb-4 gap-2'>
								<ArrowLeft className='w-4 h-4' />
								{t('nav.home')}
							</Button>
						</Link>

						<div className='max-w-3xl space-y-4'>
							<h1 className='text-4xl sm:text-5xl font-bold text-balance'>
								{movie.title[language]}
							</h1>

							<div className='flex items-center gap-4 text-sm'>
								<span className='px-3 py-1 bg-primary/20 text-primary rounded-md font-medium'>
									{movie.rating}
								</span>
								<span className='text-muted-foreground'>{movie.year}</span>
								<span className='text-muted-foreground'>{movie.duration}</span>
								<span className='text-muted-foreground capitalize'>
									{t(`category.${movie.category}`)}
								</span>
							</div>

							<p className='text-lg text-muted-foreground text-pretty'>
								{movie.description[language]}
							</p>

							<div className='flex items-center gap-3 pt-2'>
								{canWatch ? (
									<Link href={`/watch/${movie.id}`}>
										<Button size='lg' className='gap-2'>
											<Play className='w-5 h-5 fill-current' />
											{t('movie.play')}
										</Button>
									</Link>
								) : (
									<Link href='/subscription'>
										<Button size='lg' className='gap-2'>
											{t('subscription.subscribe')}
										</Button>
									</Link>
								)}

								{isAuthenticated && (
									<Button
										size='lg'
										variant='outline'
										className='gap-2 bg-transparent'
										onClick={handleWatchlistToggle}
									>
										{inWatchlist ? (
											<Check className='w-5 h-5' />
										) : (
											<Plus className='w-5 h-5' />
										)}
										{inWatchlist
											? t('movie.removeWatchlist')
											: t('movie.addWatchlist')}
									</Button>
								)}
							</div>

							{!canWatch && (
								<div className='mt-4 p-4 bg-accent/20 border border-accent rounded-lg'>
									<p className='text-sm text-accent-foreground'>
										{t('subscription.locked')}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{relatedMovies.length > 0 && (
				<div className='py-12'>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<MovieRow
							title={t(`category.${movie.category}`)}
							movies={relatedMovies}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
