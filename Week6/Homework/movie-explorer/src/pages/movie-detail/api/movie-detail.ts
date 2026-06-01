import { http } from '@shared/api/http'
import type { GuestSessionResponse, MovieDetail } from '@shared/types/tmdb'

const guestSessionStorageKey = 'movie-explorer-guest-session-id'

export const getMovieDetail = (movieId: string) => {
  return http.get<MovieDetail>(`/movie/${movieId}`)
}

const getGuestSessionId = async () => {
  const storedSessionId = localStorage.getItem(guestSessionStorageKey)

  if (storedSessionId) {
    return storedSessionId
  }

  const response = await http.get<GuestSessionResponse>(
    '/authentication/guest_session/new',
  )
  localStorage.setItem(guestSessionStorageKey, response.guest_session_id)

  return response.guest_session_id
}

export const rateMovie = async ({
  movieId,
  rating,
}: {
  movieId: string
  rating: number
}) => {
  const guestSessionId = await getGuestSessionId()

  await http.post<unknown, { value: number }>(
    `/movie/${movieId}/rating`,
    { value: rating },
    {
      params: {
        guest_session_id: guestSessionId,
      },
    },
  )
}

export const deleteMovieRating = async (movieId: string) => {
  const guestSessionId = await getGuestSessionId()

  await http.delete<unknown>(`/movie/${movieId}/rating`, {
    params: {
      guest_session_id: guestSessionId,
    },
  })
}
