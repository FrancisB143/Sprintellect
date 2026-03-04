import { useState, useCallback } from 'react'

const STORAGE_KEY = 'sprintellect_completions'

function getCompletions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function computeStreak(dates) {
  if (!dates.length) return 0
  const sorted = [...new Set(dates)].sort((a, b) => (a > b ? -1 : 1))
  const today = todayStr()
  if (sorted[0] !== today) return 0
  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diff = (prev - curr) / (1000 * 60 * 60 * 24)
    if (diff === 1) streak++
    else break
  }
  return streak
}

function computeLongest(dates) {
  if (!dates.length) return 0
  const sorted = [...new Set(dates)].sort()
  let longest = 1
  let current = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diff = (curr - prev) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      current++
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }
  return longest
}

function computeConsistency(dates) {
  if (!dates.length) return 0
  const today = new Date()
  let completed = 0
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (dates.includes(d.toISOString().slice(0, 10))) completed++
  }
  return Math.round((completed / 7) * 100)
}

export function useStudyData() {
  const [completions, setCompletions] = useState(getCompletions)

  const completedToday = completions.includes(todayStr())

  const markToday = useCallback(() => {
    const today = todayStr()
    if (!completions.includes(today)) {
      const updated = [...completions, today]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setCompletions(updated)
    }
  }, [completions])

  return {
    completions,
    completedToday,
    markToday,
    currentStreak: computeStreak(completions),
    longestStreak: computeLongest(completions),
    consistencyRate: computeConsistency(completions),
    todayStr: todayStr(),
  }
}
