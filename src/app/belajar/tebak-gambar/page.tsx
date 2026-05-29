"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useGameStore } from "@/store/game"
import { words } from "@/data/words"
import { categories } from "@/data/categories"
import { Word } from "@/types"
import { ProgressBar } from "@/components/games/ProgressBar"
import { AudioButton } from "@/components/games/AudioButton"
import { GameSummary } from "@/components/games/GameSummary"

function TebakGambarContent() {
  const searchParams = useSearchParams()
  const kategori = searchParams.get("kategori")
  const category = categories.find((c) => c.slug === kategori)

  const {
    currentWords, currentIndex, score, correctCount, totalQuestions,
    isFinished, xpEarned, startGame, answerQuestion, nextQuestion,
  } = useGameStore()

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [choices, setChoices] = useState<Word[]>([])

  const currentWord = currentWords[currentIndex]

  const generateChoices = useCallback((correct: Word): Word[] => {
    const others = words.filter((w) => w.id !== correct.id)
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3)
    return [correct, ...shuffled].sort(() => Math.random() - 0.5)
  }, [])

  useEffect(() => {
    const catId = category?.id || "cat-1"
    const catWords = words.filter((w) => w.categoryId === catId)
    const shuffled = catWords.sort(() => Math.random() - 0.5).slice(0, 10)
    startGame(shuffled)
  }, [category, startGame])

  useEffect(() => {
    if (currentWord) {
      setChoices(generateChoices(currentWord))
      setSelectedAnswer(null)
      setIsCorrect(null)
    }
  }, [currentWord, generateChoices])

  const handleAnswer = (wordId: string) => {
    if (selectedAnswer) return
    setSelectedAnswer(wordId)
    const correct = wordId === currentWord?.id
    setIsCorrect(correct)
    answerQuestion(correct)
    setTimeout(() => nextQuestion(), 1000)
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
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-5xl">{currentWord.emoji}</span>
                <AudioButton text={currentWord.arabicText} />
              </div>
              <h2 className="font-arabic text-5xl md:text-6xl leading-relaxed mb-3" dir="rtl">
                {currentWord.arabicText}
              </h2>
              <p className="text-text-muted text-sm">{currentWord.transliteration}</p>
            </div>
            <h3 className="text-sm font-medium text-text-muted mb-3">Pilih gambar yang sesuai:</h3>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {choices.map((choice, i) => (
                <motion.button
                  key={choice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleAnswer(choice.id)}
                  className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all ${
                    selectedAnswer === choice.id
                      ? isCorrect
                        ? "border-secondary bg-secondary/10"
                        : "border-danger bg-danger/10"
                      : selectedAnswer && choice.id === currentWord.id
                        ? "border-secondary bg-secondary/10"
                        : "border-gray-100 bg-white hover:border-primary/30"
                  }`}
                >
                  <span className="text-5xl mb-2">{choice.emoji}</span>
                  <span className="text-xs font-medium text-text-muted">{choice.translationId}</span>
                </motion.button>
              ))}
            </div>
            {selectedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 px-4 py-3 rounded-xl text-sm font-medium ${
                  isCorrect ? "bg-secondary/10 text-secondary" : "bg-danger/10 text-danger"
                }`}
              >
                {isCorrect ? `✅ Benar!` : `❌ Jawaban: ${currentWord.emoji} ${currentWord.translationId}`}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function TebakGambarPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <TebakGambarContent />
    </Suspense>
  )
}
