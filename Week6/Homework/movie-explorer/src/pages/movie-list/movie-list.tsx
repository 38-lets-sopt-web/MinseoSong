import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { MovieCard } from './components/movie-card'
import { useMovies } from './hooks/use-movies'

const ratingOptions = [
  { label: '전체 별점', value: 'all' },
  { label: '1점 대', value: '1' },
  { label: '2점 대', value: '2' },
  { label: '3점 대', value: '3' },
  { label: '4점 대', value: '4' },
  { label: '5점 대', value: '5' },
  { label: '6점 대', value: '6' },
  { label: '7점 대', value: '7' },
  { label: '8점 대', value: '8' },
  { label: '9점 대', value: '9' },
  { label: '10점 대', value: '10' },
] as const

export function MovieList() {
  const [selectedRating, setSelectedRating] = useState('all')
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const rating = selectedRating === 'all' ? null : Number(selectedRating)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useMovies(rating)

  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  )

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel || !hasNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage()
        }
      },
      { rootMargin: '520px 0px' },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <>
      <Title>Movie Explorer</Title>
      <FilterPanel>
        <RatingSelect
          value={selectedRating}
          onChange={(event) => setSelectedRating(event.target.value)}
          aria-label="별점 필터"
        >
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </RatingSelect>
      </FilterPanel>

      {isLoading && <StatusText>영화를 불러오는 중입니다.</StatusText>}
      {isError && (
        <StatusText>
          {error instanceof Error
            ? error.message
            : '영화 목록을 불러오지 못했습니다.'}
        </StatusText>
      )}

      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>

      <Sentinel ref={sentinelRef} />
      {isFetchingNextPage && <StatusText>다음 영화를 불러오는 중입니다.</StatusText>}
      {!isLoading && movies.length === 0 && (
        <StatusText>조건에 맞는 영화가 없습니다.</StatusText>
      )}
    </>
  )
}

const Title = styled.h1`
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(38px, 5vw, 52px);
  font-weight: 900;
  line-height: 1.1;
`

const FilterPanel = styled.section`
  margin-bottom: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme }) => theme.colors.surface};
  padding: 16px;
`

const RatingSelect = styled.select`
  width: min(100%, 180px);
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 15px;
  font-weight: 700;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const MovieGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Sentinel = styled.div`
  height: 1px;
`

const StatusText = styled.p`
  margin: 28px 0 0;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 16px;
  font-weight: 700;
`
