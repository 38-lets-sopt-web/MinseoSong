import { queryKeys } from '@shared/api/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { getMovieDetail } from '../api/movie-detail'

export const useMovieDetail = (movieId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.movieDetail(movieId ?? ''),
    queryFn: () => getMovieDetail(movieId ?? ''),
    enabled: Boolean(movieId),
  })
}
