import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { deleteMovieRating, rateMovie } from '../api/movie-detail'

interface RatingFormProps {
  movieId: string
}

const ratingStorageKey = (movieId: string) => `movie-explorer-rating-${movieId}`

export function RatingForm({ movieId }: RatingFormProps) {
  const [rating, setRating] = useState(
    () => localStorage.getItem(ratingStorageKey(movieId)) ?? '',
  )
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const saveMutation = useMutation({
    mutationFn: rateMovie,
    onSuccess: (_, variables) => {
      localStorage.setItem(ratingStorageKey(movieId), String(variables.rating))
      setMessage('Success.')
      setErrorMessage('')
    },
    onError: () => {
      setMessage('')
      setErrorMessage('별점 저장에 실패했습니다.')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMovieRating,
    onSuccess: () => {
      localStorage.removeItem(ratingStorageKey(movieId))
      setRating('')
      setMessage('Success.')
      setErrorMessage('')
    },
    onError: () => {
      setMessage('')
      setErrorMessage('별점 삭제에 실패했습니다.')
    },
  })

  const handleSave = () => {
    const nextRating = Number(rating)
    const isValidRating =
      Number.isFinite(nextRating) && nextRating >= 0.5 && nextRating <= 10

    if (!isValidRating) {
      setMessage('')
      setErrorMessage('0.5부터 10.0 사이의 숫자만 저장할 수 있습니다.')
      return
    }

    saveMutation.mutate({ movieId, rating: nextRating })
  }

  const isPending = saveMutation.isPending || deleteMutation.isPending

  return (
    <Panel>
      <SectionTitle>별점 남기기</SectionTitle>
      <Guide>0.5 ~ 10.0</Guide>
      <Input
        type="number"
        min="0.5"
        max="10"
        step="0.5"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        aria-label="별점"
      />
      <ButtonRow>
        <PrimaryButton type="button" onClick={handleSave} disabled={isPending}>
          별점 저장
        </PrimaryButton>
        <SecondaryButton
          type="button"
          onClick={() => deleteMutation.mutate(movieId)}
          disabled={isPending}
        >
          별점 삭제하기
        </SecondaryButton>
      </ButtonRow>
      {message && <Message>{message}</Message>}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Panel>
  )
}

const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme }) => theme.colors.surface};
  padding: 28px;
`

const SectionTitle = styled.h2`
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 800;
`

const Guide = styled.p`
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 800;
`

const Input = styled.input`
  width: 100%;
  height: 52px;
  margin-bottom: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const BaseButton = styled.button`
  min-height: 48px;
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 0 18px;
  font-size: 15px;
  font-weight: 800;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

const PrimaryButton = styled(BaseButton)`
  border: 0;
  color: #ffffff;
  background: ${({ theme }) => theme.colors.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

const SecondaryButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.mutedText};
  background: ${({ theme }) => theme.colors.surface};
`

const Message = styled.p`
  margin: 18px 0 0;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 15px;
  font-weight: 700;
`

const ErrorText = styled(Message)`
  color: ${({ theme }) => theme.colors.danger};
`
