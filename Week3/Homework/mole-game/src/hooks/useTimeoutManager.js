import { useCallback, useEffect, useRef } from 'react'

export function useTimeoutManager() {
  const timeoutIdsRef = useRef([])

  const clearTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutIdsRef.current = []
  }, [])

  const scheduleTimeout = useCallback((callback, delay) => {
    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId)
      callback()
    }, delay)

    timeoutIdsRef.current.push(timeoutId)
    return timeoutId
  }, [])

  useEffect(() => clearTimeouts, [clearTimeouts])

  return {
    scheduleTimeout,
    clearTimeouts,
  }
}
