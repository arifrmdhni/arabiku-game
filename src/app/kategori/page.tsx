import Link from "next/link"
import { categories } from "@/data/categories"

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Pilih Kategori</h1>
        <p className="text-text-muted">Pilih kategori kosakata yang ingin kamu pelajari</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/belajar?kategori=${cat.slug}`}
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl" style={{ filter: `drop-shadow(0 2px 4px ${cat.color}20)` }}>
                {cat.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-text-primary group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-text-muted mt-1 line-clamp-2">{cat.description}</p>
                <span className="inline-block mt-3 text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                  {cat.wordCount} kata
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
