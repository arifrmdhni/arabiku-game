"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { categories } from "@/data/categories"

const games = [
  { slug: "tebak-gambar", icon: "🖼️", name: "Tebak Gambar", desc: "Pilih gambar yang sesuai dengan kata Arab" },
  { slug: "dengar-pilih", icon: "👂", name: "Dengar & Pilih", desc: "Dengar audio, pilih gambar yang benar", comingSoon: true },
  { slug: "susun-huruf", icon: "✍️", name: "Susun Huruf", desc: "Susun huruf acak menjadi kata yang benar" },
]

function BelajarContent() {
  const searchParams = useSearchParams()
  const kategori = searchParams.get("kategori")
  const category = categories.find((c) => c.slug === kategori)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/kategori" className="text-sm text-text-muted hover:text-primary mb-2 inline-block">&larr; Kembali</Link>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          {category ? category.name : "Pilih Game"}
        </h1>
        <p className="text-text-muted mt-1">
          {category ? category.description : "Pilih game yang ingin kamu mainkan"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {games.map((g) => (
          <Link
            key={g.slug}
            href={`/belajar/${g.slug}${kategori ? `?kategori=${kategori}` : ""}`}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center relative"
          >
            {g.comingSoon && (
              <span className="absolute top-3 right-3 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                🚧
              </span>
            )}
            <span className="text-5xl block mb-4">{g.icon}</span>
            <h3 className="font-heading font-bold text-text-primary mb-2">{g.name}</h3>
            <p className="text-sm text-text-muted">{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function BelajarPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <BelajarContent />
    </Suspense>
  )
}
