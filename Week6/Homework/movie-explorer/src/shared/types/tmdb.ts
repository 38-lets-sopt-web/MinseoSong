export interface MovieSummary {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
}

export interface MovieListResponse {
  page: number
  results: MovieSummary[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieDetail extends MovieSummary {
  budget: number
  genres: Genre[]
  original_language: string
  original_title: string
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number | null
  spoken_languages: SpokenLanguage[]
  status: string
}

export interface GuestSessionResponse {
  success: boolean
  guest_session_id: string
  expires_at: string
}
