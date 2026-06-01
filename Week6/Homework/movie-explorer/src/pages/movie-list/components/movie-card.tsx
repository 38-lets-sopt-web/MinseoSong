import { tmdbImageUrl } from '@shared/utils/tmdb-image-url'
import type { MovieSummary } from '@shared/types/tmdb'
import { formatDate } from '@shared/utils/format'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface MovieCardProps {
  movie: MovieSummary
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card to={`/movies/${movie.id}`}>
      <Poster
        src={tmdbImageUrl(movie.poster_path, 'w500')}
        alt={`${movie.title} 포스터`}
      />
      <Content>
        <Title>{movie.title}</Title>
        <ReleaseDate>{formatDate(movie.release_date)}</ReleaseDate>
        <Overview>{movie.overview || '등록된 줄거리가 없습니다.'}</Overview>
      </Content>
    </Card>
  )
}

const Card = styled(Link)`
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0 rgba(17, 24, 39, 0);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease;

  &:hover {
    transform: translateY(-6px) scale(1.01);
    border-color: ${({ theme }) => theme.colors.strongBorder};
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }

  &:focus-visible {
    outline: 3px solid rgba(17, 24, 39, 0.24);
    outline-offset: 3px;
  }
`

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.border};
`

const Content = styled.div`
  display: flex;
  min-height: 180px;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
`

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 800;
  line-height: 1.35;
`

const ReleaseDate = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 15px;
  font-weight: 700;
`

const Overview = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: #4b5563;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`
