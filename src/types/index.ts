export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  wordCount: number
  color: string
}

export interface Word {
  id: string
  arabicText: string
  transliteration: string
  translationId: string
  translationEn?: string
  categoryId: string
  difficulty: number
  emoji: string
  audioUrl?: string
  imageUrl?: string
  isPublished?: boolean
}

export interface WordProgress {
  id: string
  userId: string
  wordId: string
  timesSeen: number
  timesCorrect: number
  easiness: number
  interval: number
  nextReview?: string
  lastReviewed?: string
}

export interface GameSession {
  id: string
  userId: string
  gameType: string
  categoryId: string
  wordsShown: number
  correctCount: number
  xpEarned: number
  durationSec: number
  completedAt: string
}

export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  level: number
  totalXp: number
  streakCount: number
  lastActive?: string
  createdAt: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  unlocked?: boolean
  unlockedAt?: string
}
