import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import {
  GAME_MESSAGES,
  GAME_TIMING,
  LEVELS,
  TARGET_STATUS,
  TARGET_TYPES,
} from '../constants/game'
import { createCells, createGameResult, createTarget, getCellCount } from '../utils/game'
import { useTimeoutManager } from './useTimeoutManager'

const ACTIONS = {
  CHANGE_LEVEL: 'changeLevel',
  START_GAME: 'startGame',
  RESET_GAME: 'resetGame',
  SET_TARGET: 'setTarget',
  CLEAR_HIT_TARGET: 'clearHitTarget',
  HIT_MOLE: 'hitMole',
  HIT_BOMB: 'hitBomb',
  TICK: 'tick',
  FINISH_GAME: 'finishGame',
  CLOSE_RESULT: 'closeResult',
}

const createInitialState = () => ({
  selectedLevel: 1,
  isPlaying: false,
  timeLeft: LEVELS[1].duration,
  score: 0,
  successCount: 0,
  failCount: 0,
  message: GAME_MESSAGES.READY,
  activeTarget: null,
  result: null,
})

const getResetState = (level, result = null) => ({
  selectedLevel: level,
  isPlaying: false,
  timeLeft: LEVELS[level].duration,
  score: 0,
  successCount: 0,
  failCount: 0,
  message: GAME_MESSAGES.READY,
  activeTarget: null,
  result,
})

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_LEVEL:
      return state.isPlaying ? state : getResetState(action.level, null)

    case ACTIONS.START_GAME:
      return {
        ...getResetState(state.selectedLevel, null),
        isPlaying: true,
        message: GAME_MESSAGES.PLAYING,
        activeTarget: action.target,
      }

    case ACTIONS.RESET_GAME:
      return getResetState(action.level ?? state.selectedLevel, action.result ?? null)

    case ACTIONS.SET_TARGET:
      return {
        ...state,
        activeTarget:
          state.activeTarget?.status === TARGET_STATUS.HIT ? state.activeTarget : action.target,
      }

    case ACTIONS.CLEAR_HIT_TARGET:
      if (
        state.activeTarget?.index !== action.index ||
        state.activeTarget.status !== TARGET_STATUS.HIT
      ) {
        return state
      }

      return {
        ...state,
        activeTarget: null,
      }

    case ACTIONS.HIT_MOLE:
      return {
        ...state,
        score: state.score + 1,
        successCount: state.successCount + 1,
        message: GAME_MESSAGES.MOLE_HIT,
        activeTarget: {
          ...state.activeTarget,
          status: TARGET_STATUS.HIT,
        },
      }

    case ACTIONS.HIT_BOMB:
      return {
        ...state,
        score: state.score - 1,
        failCount: state.failCount + 1,
        message: GAME_MESSAGES.BOMB_HIT,
        activeTarget: null,
      }

    case ACTIONS.TICK:
      return {
        ...state,
        timeLeft: Math.max(0, Number((state.timeLeft - GAME_TIMING.TICK_SECONDS).toFixed(1))),
      }

    case ACTIONS.FINISH_GAME:
      return {
        ...state,
        isPlaying: false,
        activeTarget: null,
        result: action.result,
        message: action.result.isCleared ? GAME_MESSAGES.SAVED : GAME_MESSAGES.NOT_SAVED,
      }

    case ACTIONS.CLOSE_RESULT:
      return {
        ...state,
        result: null,
      }

    default:
      return state
  }
}

export function useMoleGame({ onGameFinish }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState)
  const { scheduleTimeout, clearTimeouts } = useTimeoutManager()
  const stateRef = useRef(state)
  const isFinishedRef = useRef(false)

  const currentLevel = LEVELS[state.selectedLevel]
  const cellCount = getCellCount(currentLevel)
  const cells = useMemo(() => createCells(cellCount), [cellCount])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const dispatchGame = useCallback((action) => {
    stateRef.current = gameReducer(stateRef.current, action)
    dispatch(action)
  }, [])

  const resetGame = useCallback(
    (level = stateRef.current.selectedLevel, result = null) => {
      clearTimeouts()
      isFinishedRef.current = false
      dispatchGame({ type: ACTIONS.RESET_GAME, level, result })
    },
    [clearTimeouts, dispatchGame],
  )

  const finishGame = useCallback(() => {
    if (isFinishedRef.current) return
    isFinishedRef.current = true

    const snapshot = stateRef.current
    const result = createGameResult({
      level: snapshot.selectedLevel,
      score: snapshot.score,
      successCount: snapshot.successCount,
      failCount: snapshot.failCount,
    })

    dispatchGame({ type: ACTIONS.FINISH_GAME, result })
    onGameFinish(result)

    scheduleTimeout(() => {
      resetGame(snapshot.selectedLevel)
    }, GAME_TIMING.AUTO_RESET_MS)
  }, [dispatchGame, onGameFinish, resetGame, scheduleTimeout])

  const startGame = useCallback(() => {
    clearTimeouts()
    isFinishedRef.current = false
    dispatchGame({
      type: ACTIONS.START_GAME,
      target: createTarget(cellCount),
    })
  }, [cellCount, clearTimeouts, dispatchGame])

  const stopGame = useCallback(() => {
    resetGame(stateRef.current.selectedLevel)
  }, [resetGame])

  const changeLevel = useCallback(
    (level) => {
      if (stateRef.current.isPlaying) return

      clearTimeouts()
      isFinishedRef.current = false
      dispatchGame({ type: ACTIONS.CHANGE_LEVEL, level })
    },
    [clearTimeouts, dispatchGame],
  )

  const handleCellClick = useCallback(
    (index) => {
      const currentState = stateRef.current
      const target = currentState.activeTarget

      if (
        !currentState.isPlaying ||
        target?.index !== index ||
        target.status !== TARGET_STATUS.OPEN
      ) {
        return
      }

      if (target.type === TARGET_TYPES.MOLE) {
        dispatchGame({ type: ACTIONS.HIT_MOLE })
        scheduleTimeout(() => {
          dispatchGame({ type: ACTIONS.CLEAR_HIT_TARGET, index })
        }, GAME_TIMING.HIT_VISIBLE_MS)
        return
      }

      dispatchGame({ type: ACTIONS.HIT_BOMB })
    },
    [dispatchGame, scheduleTimeout],
  )

  useEffect(() => {
    if (!state.isPlaying) return undefined

    const timerId = window.setInterval(() => {
      const currentState = stateRef.current
      const nextTime = Math.max(
        0,
        Number((currentState.timeLeft - GAME_TIMING.TICK_SECONDS).toFixed(1)),
      )

      dispatchGame({ type: ACTIONS.TICK })

      if (nextTime === 0 && currentState.timeLeft > 0) {
        scheduleTimeout(finishGame, 0)
      }
    }, GAME_TIMING.TICK_MS)

    return () => window.clearInterval(timerId)
  }, [dispatchGame, finishGame, scheduleTimeout, state.isPlaying])

  useEffect(() => {
    if (!state.isPlaying) return undefined

    const targetId = window.setInterval(() => {
      dispatchGame({ type: ACTIONS.SET_TARGET, target: createTarget(cellCount) })
    }, currentLevel.popDelay)

    return () => window.clearInterval(targetId)
  }, [cellCount, currentLevel.popDelay, dispatchGame, state.isPlaying])

  return {
    selectedLevel: state.selectedLevel,
    currentLevel,
    isPlaying: state.isPlaying,
    timeLeft: state.timeLeft,
    score: state.score,
    successCount: state.successCount,
    failCount: state.failCount,
    message: state.message,
    activeTarget: state.activeTarget,
    result: state.result,
    cells,
    startGame,
    stopGame,
    changeLevel,
    handleCellClick,
    closeResult: () => dispatchGame({ type: ACTIONS.CLOSE_RESULT }),
  }
}
