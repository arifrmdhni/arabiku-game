"use client"

import { useState } from "react"
import { words } from "@/data/words"
import { categories } from "@/data/categories"

export default function PerpustakaanPage() {
  const [search, setSearch] = useState("")
  const [catFilter, setCatFilter] = useState("all")

  const filtered = words.filter((w) => {
    const matchSearch = search === "" ||
      w.arabicText.includes(search) ||
      w.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      w.translationId.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === "all" || w.categoryId === catFilter
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Perpustakaan Kata</h1>
        <p className="text-text-muted">Jelajahi semua kosakata Arab</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kata Arab, latin, atau artinya..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm bg-white"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((w) => (
          <div key={w.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
            <span className="text-3xl w-10 h-10 flex items-center justify-center bg-primary/5 rounded-lg">
              {w.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-arabic text-xl leading-relaxed" dir="rtl">{w.arabicText}</p>
              <p className="text-xs text-text-muted">{w.transliteration}</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">{w.translationId}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="text-text-muted">Kata tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}
