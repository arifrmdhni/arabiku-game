import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Word } from "@/types"

interface GameState {
  currentWords: Word[]
  currentIndex: number
  score: number
  totalQuestions: number
  isPlaying: boolean
  isFinished: boolean
  xpEarned: number
  correctCount: number
  startTime: number | null

  totalXp: number
  totalSessions: number
  totalCorrect: number
  totalQuestionsAll: number

  startGame: (words: Word[]) => void
  answerQuestion: (correct: boolean) => void
  nextQuestion: () => void
  endGame: () => void
  reset: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentWords: [],
      currentIndex: 0,
      score: 0,
      totalQuestions: 0,
      isPlaying: false,
      isFinished: false,
      xpEarned: 0,
      correctCount: 0,
      startTime: null,

      totalXp: 0,
      totalSessions: 0,
      totalCorrect: 0,
      totalQuestionsAll: 0,

      startGame: (words) =>
        set({
          currentWords: words,
          currentIndex: 0,
          score: 0,
          totalQuestions: words.length,
          isPlaying: true,
          isFinished: false,
          xpEarned: 0,
          correctCount: 0,
          startTime: Date.now(),
        }),

      answerQuestion: (correct) =>
        set((state) => ({
          correctCount: state.correctCount + (correct ? 1 : 0),
          score: state.score + (correct ? 10 : 0),
        })),

      nextQuestion: () =>
        set((state) => {
          const nextIndex = state.currentIndex + 1
          if (nextIndex >= state.totalQuestions) {
            const timeSpent = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0
            const baseXp = state.score
            const bonusXp = state.correctCount === state.totalQuestions ? 20 : 0
            const timeBonus = timeSpent < 60 ? 10 : 0
            return {
              currentIndex: nextIndex,
              isPlaying: false,
              isFinished: true,
              xpEarned: baseXp + bonusXp + timeBonus,
              totalXp: state.totalXp + baseXp + bonusXp + timeBonus,
              totalSessions: state.totalSessions + 1,
              totalCorrect: state.totalCorrect + state.correctCount,
              totalQuestionsAll: state.totalQuestionsAll + state.totalQuestions,
            }
          }
          return { currentIndex: nextIndex }
        }),

      endGame: () =>
        set((state) => ({
          isPlaying: false,
          isFinished: true,
          xpEarned: state.xpEarned || state.score,
          totalXp: state.totalXp + (state.xpEarned || state.score),
        })),

      reset: () =>
        set({
          currentWords: [],
          currentIndex: 0,
          score: 0,
          totalQuestions: 0,
          isPlaying: false,
          isFinished: false,
          xpEarned: 0,
          correctCount: 0,
          startTime: null,
        }),
    }),
    { name: "arabiku-game-storage" }
  )
)
