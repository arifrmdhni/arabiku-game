"use client"

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-6">⚠️</span>
      <h1 className="text-2xl font-bold text-text mb-2">Terjadi Kesalahan</h1>
      <p className="text-text-muted text-sm max-w-sm mb-8">
        Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all"
      >
        Coba Lagi
      </button>
    </div>
  )
}
