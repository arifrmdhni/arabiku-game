import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-6">🔐</span>
      <h1 className="text-2xl font-bold text-text mb-2">Masuk</h1>
      <div className="bg-primary/5 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8">
        🚧 Coming Soon
      </div>
      <p className="text-text-muted text-sm max-w-sm mb-8">
        Fitur login membutuhkan database. Akan tersedia setelah integrasi database production.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}
