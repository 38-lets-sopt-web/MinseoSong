import { queryKeys } from '@shared/api/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMovies } from '../api/movies'

export const useMovies = (rating: number | null) => {
  return useInfiniteQuery({
    queryKey: queryKeys.movies(rating),
    queryFn: ({ pageParam }) => getMovies({ page: pageParam, rating }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined
      }

      return lastPage.page + 1
    },
  })
}
