import { TARGET_STATUS, TARGET_TYPES } from '../constants/game'

export const createTarget = (cellCount) => ({
  index: Math.floor(Math.random() * cellCount),
  type: Math.random() > 0.28 ? TARGET_TYPES.MOLE : TARGET_TYPES.BOMB,
  status: TARGET_STATUS.OPEN,
})

const formatSuccessTime = (date) =>
  date
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })
    .replaceAll(' ', '')
    .replace(/(오전|오후)/, ' $1 ')
    .trim()

export const createGameResult = ({ level, score, successCount, failCount }) => {
  return {
    level,
    score,
    successTime: formatSuccessTime(new Date()),
    successCount,
    failCount,
    isCleared: score > 0,
  }
}

export const createCells = (cellCount) => Array.from({ length: cellCount }, (_, index) => index)

export const getCellCount = (level) => level.size * level.size
