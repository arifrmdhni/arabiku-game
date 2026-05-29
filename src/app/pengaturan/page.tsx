"use client"

import { useState, useEffect } from "react"

function loadSetting<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveSetting(key: string, value: unknown) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

export default function PengaturanPage() {
  const [darkMode, setDarkMode] = useState(() => loadSetting("arabiku-darkMode", false))
  const [fontSize, setFontSize] = useState(() => loadSetting("arabiku-fontSize", "m"))

  useEffect(() => { saveSetting("arabiku-darkMode", darkMode) }, [darkMode])
  useEffect(() => { saveSetting("arabiku-fontSize", fontSize) }, [fontSize])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Pengaturan</h1>
        <p className="text-text-muted">Sesuaikan pengalaman belajarmu</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50">
          <h2 className="font-heading font-bold text-text-primary">Tampilan</h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Mode Gelap</p>
              <p className="text-xs text-text-muted">Gunakan tema gelap</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Ukuran Font Arab</p>
            <div className="flex gap-2">
              {[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
                { value: "xl", label: "XL" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFontSize(opt.value)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all ${
                    fontSize === opt.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-text-muted border-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
