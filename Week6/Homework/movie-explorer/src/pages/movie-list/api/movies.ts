import { http } from '@shared/api/http'
import type { MovieListResponse } from '@shared/types/tmdb'

export const getMovies = ({
  page,
  rating,
}: {
  page: number
  rating: number | null
}) => {
  return http.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      include_adult: false,
      include_video: false,
      sort_by: 'popularity.desc',
      'vote_average.gte': rating,
      'vote_average.lte': rating === null ? null : Math.min(rating + 0.99, 10),
      'vote_count.gte': 20,
    },
  })
}
