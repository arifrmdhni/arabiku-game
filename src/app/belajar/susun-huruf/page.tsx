"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useGameStore } from "@/store/game"
import { words } from "@/data/words"
import { categories } from "@/data/categories"
import { ProgressBar } from "@/components/games/ProgressBar"
import { GameSummary } from "@/components/games/GameSummary"

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function SusunHurufContent() {
  const searchParams = useSearchParams()
  const kategori = searchParams.get("kategori")
  const category = categories.find((c) => c.slug === kategori)

  const {
    currentWords, currentIndex, score, correctCount, totalQuestions,
    isFinished, xpEarned, startGame, answerQuestion, nextQuestion,
  } = useGameStore()

  const [selectedTiles, setSelectedTiles] = useState<string[]>([])
  const [availableTiles, setAvailableTiles] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null)

  const currentWord = currentWords[currentIndex]

  const letters = useMemo(() => {
    if (!currentWord) return []
    return Array.from(currentWord.arabicText).filter((ch) => ch.trim())
  }, [currentWord])

  useEffect(() => {
    const catId = category?.id || "cat-1"
    const catWords = words.filter((w) => w.categoryId === catId)
    const shuffled = catWords.sort(() => Math.random() - 0.5).slice(0, 10)
    startGame(shuffled)
  }, [category, startGame])

  useEffect(() => {
    if (currentWord) {
      setSelectedTiles([])
      setAvailableTiles(shuffleArray(letters))
      setRevealed(false)
      setIsCorrectAnswer(null)
    }
  }, [currentWord, letters])

  const handleTileClick = (ch: string, idx: number) => {
    if (revealed || isCorrectAnswer !== null) return
    const newAvailable = [...availableTiles]
    newAvailable.splice(idx, 1)
    setAvailableTiles(newAvailable)
    setSelectedTiles([...selectedTiles, ch])
  }

  const handleUndo = () => {
    if (revealed || isCorrectAnswer !== null) return
    if (selectedTiles.length === 0) return
    const last = selectedTiles[selectedTiles.length - 1]
    setSelectedTiles(selectedTiles.slice(0, -1))
    setAvailableTiles([...availableTiles, last])
  }

  const handleSubmit = () => {
    if (!currentWord) return
    const answer = selectedTiles.join("")
    const correct = answer === currentWord.arabicText
    setIsCorrectAnswer(correct)
    setRevealed(true)
    answerQuestion(correct)
    setTimeout(() => nextQuestion(), 1500)
  }

  if (currentWords.length === 0) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  }

  if (isFinished) {
    return <GameSummary score={score} correctCount={correctCount} totalQuestions={totalQuestions} xpEarned={xpEarned} />
  }

  if (!currentWord) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <Link href="/kategori" className="text-primary">Kembali ke kategori</Link>
    </div>
  }

  return (
    <div className="min-h-[80vh] flex flex-col">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-muted">{currentIndex + 1} / {totalQuestions}</span>
          <span className="text-sm font-medium text-accent">+{score} XP</span>
        </div>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-lg text-center"
          >
            <div className="mb-6">
              <span className="text-5xl block mb-2">{currentWord.emoji}</span>
              <p className="text-text-muted text-sm">Susun huruf menjadi kata yang benar</p>
            </div>
            <div className="mb-2">
              <p className="text-xs text-text-muted mb-1">Petunjuk:</p>
              <p className="text-sm font-medium text-text-primary bg-white rounded-xl px-4 py-2 border border-gray-100 inline-block">
                {currentWord.translationId}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4 min-h-[60px] flex items-center justify-center">
              {selectedTiles.length === 0 ? (
                <span className="text-text-muted text-sm">Tap huruf di bawah untuk menyusun...</span>
              ) : (
                <div className="flex gap-1.5 flex-wrap justify-center" dir="rtl">
                  {selectedTiles.map((ch, i) => (
                    <motion.span
                      key={`${ch}-${i}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`font-arabic text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${
                        revealed
                          ? isCorrectAnswer
                            ? "bg-secondary/20 text-secondary"
                            : ch === currentWord.arabicText[i]
                              ? "bg-secondary/20 text-secondary"
                              : "bg-danger/20 text-danger"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-1.5 flex-wrap justify-center mb-6">
              {availableTiles.map((ch, i) => (
                <motion.button
                  key={`avail-${ch}-${i}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleTileClick(ch, i)}
                  className="font-arabic text-2xl w-12 h-12 flex items-center justify-center bg-white border-2 border-primary/20 text-primary rounded-xl hover:bg-primary/5 active:scale-95 transition-all"
                >
                  {ch}
                </motion.button>
              ))}
            </div>
            {revealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
                  isCorrectAnswer
                    ? "bg-secondary/10 text-secondary"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {isCorrectAnswer
                  ? "✅ Benar!"
                  : `❌ Jawaban: ${currentWord.arabicText}`
                }
              </motion.div>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleUndo}
                disabled={selectedTiles.length === 0 || revealed}
                className="px-5 py-2.5 border-2 border-gray-200 text-text-muted rounded-full text-sm font-medium hover:bg-gray-50 disabled:opacity-30 transition-all"
              >
                ↩ Hapus
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedTiles.length !== letters.length || revealed}
                className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 disabled:opacity-30 transition-all"
              >
                Cek Jawaban
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function SusunHurufPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <SusunHurufContent />
    </Suspense>
  )
}
