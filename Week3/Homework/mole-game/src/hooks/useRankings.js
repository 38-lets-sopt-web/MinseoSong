import { useCallback, useState } from 'react'
import {
  createRankingRecord,
  readRankings,
  removeRankings,
  saveRankings,
  sortRankings,
} from '../utils/rankingStorage'

export function useRankings() {
  const [rankings, setRankings] = useState(() => readRankings())

  const addRanking = useCallback((result) => {
    if (!result.isCleared) return

    setRankings((prevRankings) => {
      const nextRankings = sortRankings([...prevRankings, createRankingRecord(result)])
      saveRankings(nextRankings)
      return nextRankings
    })
  }, [])

  const clearRankings = useCallback(() => {
    if (!window.confirm('랭킹 기록을 모두 초기화할까요?')) return

    setRankings([])
    removeRankings()
  }, [])

  return {
    rankings,
    addRanking,
    clearRankings,
  }
}
