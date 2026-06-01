export const queryKeys = {
  movies: (rating: number | null) => ['movies', rating] as const,
  movieDetail: (movieId: string) => ['movie', movieId] as const,
}
