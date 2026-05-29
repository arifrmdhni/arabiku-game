import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-6">🔍</span>
      <h1 className="text-2xl font-bold text-text mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-text-muted text-sm max-w-sm mb-8">
        Halaman yang kamu cari tidak ada atau sudah dipindah.
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
