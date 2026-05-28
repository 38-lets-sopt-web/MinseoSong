import { RANKING_STORAGE_KEY } from '../constants/game'

export const createRankingRecord = ({ level, score, successTime }) => ({
  level,
  score,
  successTime,
})

export const sortRankings = (rankings) =>
  [...rankings].sort((a, b) => b.level - a.level || b.score - a.score)

const normalizeRankings = (rankings) =>
  rankings
    .filter((ranking) => ranking.level && Number.isFinite(ranking.score) && ranking.successTime)
    .map(createRankingRecord)

export const readRankings = () => {
  try {
    return sortRankings(normalizeRankings(JSON.parse(localStorage.getItem(RANKING_STORAGE_KEY)) ?? []))
  } catch {
    return []
  }
}

export const saveRankings = (rankings) => {
  localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(sortRankings(normalizeRankings(rankings))))
}

export const removeRankings = () => {
  localStorage.removeItem(RANKING_STORAGE_KEY)
}
