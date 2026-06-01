import { tmdbImageUrl } from '@shared/utils/tmdb-image-url'
import {
  formatDate,
  formatMoney,
  formatRating,
  formatRuntime,
} from '@shared/utils/format'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { RatingForm } from './components/rating-form'
import { useMovieDetail } from './hooks/use-movie-detail'

export function MovieDetail() {
  const { movieId } = useParams()

  const {
    data: movie,
    error,
    isError,
    isLoading,
  } = useMovieDetail(movieId)

  if (!movieId) {
    return (
      <>
        <BackLink to="/">← 목록으로 돌아가기</BackLink>
        <StatusText>영화 ID가 올바르지 않습니다.</StatusText>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <BackLink to="/">← 목록으로 돌아가기</BackLink>
        <StatusText>영화 정보를 불러오는 중입니다.</StatusText>
      </>
    )
  }

  if (isError || !movie) {
    return (
      <>
        <BackLink to="/">← 목록으로 돌아가기</BackLink>
        <StatusText>
          {error instanceof Error
            ? error.message
            : '영화 상세 정보를 불러오지 못했습니다.'}
        </StatusText>
      </>
    )
  }

  return (
    <>
      <BackLink to="/">← 목록으로 돌아가기</BackLink>
      <HeroCard>
        <Backdrop
          src={tmdbImageUrl(movie.backdrop_path ?? movie.poster_path, 'w1280')}
          alt={`${movie.title} 배경 이미지`}
        />
        <DetailSummary>
          <Poster
            src={tmdbImageUrl(movie.poster_path, 'w500')}
            alt={`${movie.title} 포스터`}
          />
          <SummaryContent>
            <ReleaseDate>{formatDate(movie.release_date)}</ReleaseDate>
            <Title>{movie.title}</Title>
            <GenreList>
              {movie.genres.map((genre) => (
                <GenreChip key={genre.id}>{genre.name}</GenreChip>
              ))}
            </GenreList>
            <MetricGrid>
              <MetricCard>
                <MetricLabel>평점</MetricLabel>
                <MetricValue>{formatRating(movie.vote_average)} / 10</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>투표 수</MetricLabel>
                <MetricValue>{movie.vote_count.toLocaleString('en-US')}</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>상영 시간</MetricLabel>
                <MetricValue>{formatRuntime(movie.runtime)}</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>상태</MetricLabel>
                <MetricValue>{movie.status}</MetricValue>
              </MetricCard>
            </MetricGrid>
          </SummaryContent>
        </DetailSummary>
      </HeroCard>

      <OverviewPanel>
        <SectionTitle>줄거리</SectionTitle>
        <OverviewText>{movie.overview || '등록된 줄거리가 없습니다.'}</OverviewText>
      </OverviewPanel>

      <BottomGrid>
        <InfoPanel>
          <SectionTitle>기본 정보</SectionTitle>
          <InfoTable>
            <tbody>
              <InfoRow label="원제" value={movie.original_title} />
              <InfoRow label="원어" value={movie.original_language} />
              <InfoRow
                label="제작 국가"
                value={movie.production_countries
                  .map((country) => country.name)
                  .join(', ')}
              />
              <InfoRow
                label="사용 언어"
                value={movie.spoken_languages
                  .map((language) => language.english_name)
                  .join(', ')}
              />
              <InfoRow label="예산" value={formatMoney(movie.budget)} />
              <InfoRow label="수익" value={formatMoney(movie.revenue)} />
            </tbody>
          </InfoTable>
        </InfoPanel>
        <RatingForm key={movieId} movieId={movieId} />
      </BottomGrid>
    </>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <InfoHeader>{label}</InfoHeader>
      <InfoValue>{value || '정보 없음'}</InfoValue>
    </tr>
  )
}

const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 800;
`

const HeroCard = styled.section`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme }) => theme.colors.surface};
`

const Backdrop = styled.img`
  width: 100%;
  height: clamp(230px, 35vw, 410px);
  object-fit: cover;
`

const DetailSummary = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 28px;
  padding: 28px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const Poster = styled.img`
  width: 100%;
  max-width: 280px;
  aspect-ratio: 2 / 3;
  border-radius: ${({ theme }) => theme.radii.medium};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: 760px) {
    max-width: 220px;
  }
`

const SummaryContent = styled.div`
  min-width: 0;
`

const ReleaseDate = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 17px;
  font-weight: 800;
`

const Title = styled.h1`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 900;
  line-height: 1.1;
`

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
`

const GenreChip = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  font-weight: 800;
`

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const MetricCard = styled.div`
  min-height: 86px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 18px;
`

const MetricLabel = styled.p`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
  font-weight: 800;
`

const MetricValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 900;
`

const OverviewPanel = styled.section`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme }) => theme.colors.surface};
  padding: 28px;
`

const SectionTitle = styled.h2`
  margin: 0 0 22px;
  font-size: 24px;
  font-weight: 900;
`

const OverviewText = styled.p`
  margin: 0;
  color: #374151;
  font-size: 16px;
  font-weight: 650;
  line-height: 1.8;
`

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const InfoPanel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme }) => theme.colors.surface};
  padding: 28px;
`

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const InfoHeader = styled.th`
  width: 28%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 14px 0;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 15px;
  font-weight: 900;
  text-align: left;
  vertical-align: top;
`

const InfoValue = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 14px 0 14px 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
`

const StatusText = styled.p`
  margin: 28px 0 0;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 16px;
  font-weight: 700;
`
