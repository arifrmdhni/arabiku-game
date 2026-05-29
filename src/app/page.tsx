import Link from "next/link"

const features = [
  { icon: "🖼️", title: "Tebak Gambar", desc: "Cocokkan kata Arab dengan gambar yang tepat" },
  { icon: "👂", title: "Dengar & Pilih", desc: "Latih pendengaran dengan audio native speaker" },
  { icon: "✍️", title: "Susun Huruf", desc: "Susun huruf Arab acak menjadi kata yang benar" },
  { icon: "🔥", title: "Daily Streak", desc: "Jaga konsistensi belajar setiap hari" },
  { icon: "🏅", title: "Badge & XP", desc: "Dapatkan badge dan kumpulkan XP" },
  { icon: "📚", title: "200+ Kosakata", desc: "Kosakata tematik dari Al-Quran hingga percakapan" },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-surface">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
            Belajar Bahasa Arab Jadi Menyenangkan
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-primary leading-tight mb-6">
            Kuasai Bahasa Arab
            <br />
            <span className="text-primary">Sambil Bermain</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto mb-10">
            Platform interaktif untuk belajar kosakata bahasa Arab dengan game seru.
            Cocok untuk pemula hingga mahir.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kategori"
              className="px-8 py-3 bg-primary text-white font-medium rounded-full text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Mulai Belajar
            </Link>
            <Link
              href="/belajar/tebak-gambar"
              className="px-8 py-3 border-2 border-primary/20 text-primary font-medium rounded-full text-lg hover:bg-primary/5 transition-all"
            >
              Coba Game
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[200%] h-12 bg-surface rounded-[50%]" />
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">
              Cara Belajar
            </h2>
            <p className="text-text-muted max-w-lg mx-auto">
              Pilih game, jawab soal, kumpulkan XP, dan pantau progressmu
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-heading font-bold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">
            Siap Mulai Petualangan?
          </h2>
          <p className="text-text-muted max-w-lg mx-auto mb-8">
            Tidak perlu daftar untuk mencoba. Langsung mainkan game belajar bahasa Arab sekarang!
          </p>
          <Link
            href="/kategori"
            className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Mulai Sekarang
          </Link>
        </div>
      </section>
    </>
  )
}
