"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { categories } from "@/data/categories"
import Link from "next/link"

function DengarPilihContent() {
  const searchParams = useSearchParams()
  const kategori = searchParams.get("kategori")
  const category = categories.find((c) => c.slug === kategori)

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-6">👂</span>
      <h1 className="text-2xl font-bold text-text mb-2">Dengar &amp; Pilih</h1>
      {category && (
        <p className="text-text-muted mb-6">Kategori: {category.name}</p>
      )}
      <div className="bg-primary/5 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
        🚧 Coming Soon
      </div>
      <p className="text-text-muted text-sm max-w-sm mb-8">
        Game ini sedang dalam pengembangan. Fitur audio Arabic akan tersedia setelah integrasi Text-to-Speech.
      </p>
      <Link
        href={`/belajar?kategori=${kategori || ""}`}
        className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all"
      >
        Pilih Game Lain
      </Link>
    </div>
  )
}

export default function DengarPilihPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <DengarPilihContent />
    </Suspense>
  )
}
