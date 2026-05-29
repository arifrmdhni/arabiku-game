"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface GameSummaryProps {
  score: number
  correctCount: number
  totalQuestions: number
  xpEarned: number
}

export function GameSummary({ score, correctCount, totalQuestions, xpEarned }: GameSummaryProps) {
  const percentage = Math.round((correctCount / totalQuestions) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto px-4 py-12 text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-6xl block mb-4"
      >
        {percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "💪"}
      </motion.span>

      <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
        {percentage >= 80 ? "Luar Biasa!" : percentage >= 50 ? "Bagus!" : "Terus Berlatih!"}
      </h2>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Skor</span>
          <span className="font-bold text-lg">{score}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Benar</span>
          <span className="font-bold text-lg text-secondary">{correctCount}/{totalQuestions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Ketepatan</span>
          <span className="font-bold text-lg">{percentage}%</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <span className="font-medium text-text-primary">XP Didapat</span>
          <span className="font-bold text-xl text-accent">+{xpEarned}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all"
        >
          Ulangi
        </button>
        <Link
          href="/kategori"
          className="px-6 py-3 border-2 border-primary/20 text-primary font-medium rounded-full hover:bg-primary/5 transition-all"
        >
          Kategori Lain
        </Link>
        <Link
          href="/dashboard"
          className="text-sm text-text-muted hover:text-primary transition-colors"
        >
          Ke Dashboard
        </Link>
      </div>
    </motion.div>
  )
}
