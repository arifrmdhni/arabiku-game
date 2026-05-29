import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🌙</span>
              <span className="font-heading font-bold text-primary">ArabiKu</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Platform belajar bahasa Arab interaktif untuk Indonesia.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-text-primary mb-3">Belajar</h4>
            <div className="space-y-2">
              <Link href="/kategori" className="block text-xs text-text-muted hover:text-primary">Kategori</Link>
              <Link href="/belajar/tebak-gambar" className="block text-xs text-text-muted hover:text-primary">Tebak Gambar</Link>
              <Link href="/belajar/dengar-pilih" className="block text-xs text-text-muted hover:text-primary">Dengar & Pilih</Link>
              <Link href="/belajar/susun-huruf" className="block text-xs text-text-muted hover:text-primary">Susun Huruf</Link>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm text-text-primary mb-3">Lainnya</h4>
            <div className="space-y-2">
              <Link href="/perpustakaan" className="block text-xs text-text-muted hover:text-primary">Perpustakaan</Link>
              <Link href="/pengaturan" className="block text-xs text-text-muted hover:text-primary">Pengaturan</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} ArabiKu. Terinspirasi dari Ba Ba Dum.
          </p>
        </div>
      </div>
    </footer>
  )
}
