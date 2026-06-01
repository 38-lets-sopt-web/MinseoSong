export const tmdbImageUrl = (
  path: string | null,
  size: 'w342' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500',
) => {
  if (!path) {
    return '/poster-placeholder.svg'
  }

  return `https://image.tmdb.org/t/p/${size}${path}`
}
