export const RANKING_STORAGE_KEY = 'mole-game-rankings'

export const GAME_MESSAGES = {
  READY: '시작 버튼을 누르면 게임이 시작돼요.',
  PLAYING: '나온 대상을 빠르게 클릭해 주세요!',
  MOLE_HIT: '성공! 두더지를 잡았어요.',
  BOMB_HIT: '실패! 폭탄을 눌렀어요.',
  SAVED: '클리어 기록이 랭킹에 저장됐어요.',
  NOT_SAVED: '점수가 1점 이상이어야 랭킹에 저장돼요.',
}

export const GAME_TIMING = {
  TICK_MS: 100,
  TICK_SECONDS: 0.1,
  HIT_VISIBLE_MS: 700,
  AUTO_RESET_MS: 3000,
}

export const TARGET_TYPES = {
  MOLE: 'mole',
  BOMB: 'bomb',
}

export const TARGET_STATUS = {
  OPEN: 'open',
  HIT: 'hit',
}

export const LEVELS = {
  1: { label: 'Level 1', size: 2, duration: 15, popDelay: 1100 },
  2: { label: 'Level 2', size: 3, duration: 20, popDelay: 900 },
  3: { label: 'Level 3', size: 4, duration: 30, popDelay: 720 },
}

export const LEVEL_OPTIONS = Object.entries(LEVELS).map(([value, info]) => ({
  value: Number(value),
  ...info,
}))

export const TABS = {
  GAME: 'game',
  RANKING: 'ranking',
}
