"use client"

import { useEffect, useState } from "react"
import { speakArabic, initVoices } from "@/lib/speech"

interface AudioButtonProps {
  text?: string
}

export function AudioButton({ text }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    initVoices()
  }, [])

  const handlePlay = () => {
    if (!text || playing) return

    speakArabic(
      text,
      () => setPlaying(true),
      () => setPlaying(false),
      () => setPlaying(false)
    )
  }

  return (
    <button
      onClick={handlePlay}
      className="w-14 h-14 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-2xl transition-all active:scale-95"
      aria-label="Putar audio"
    >
      {playing ? (
        <span className="inline-block animate-pulse">🔊</span>
      ) : (
        <span>🔊</span>
      )}
    </button>
  )
}
