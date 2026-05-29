let voicesLoaded = false
let arabicVoice: SpeechSynthesisVoice | null = null
let fallbackVoice: SpeechSynthesisVoice | null = null

function loadVoices(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return

  voicesLoaded = true
  arabicVoice = voices.find((v) => v.lang.startsWith("ar")) || null
  fallbackVoice =
    voices.find((v) => v.lang.startsWith("en")) ||
    voices.find((v) => v.lang.startsWith("id")) ||
    voices[0] ||
    null
}

export function initVoices(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export function speakArabic(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onError?.()
    return
  }

  if (!voicesLoaded) {
    loadVoices()
  }

  window.speechSynthesis.cancel()

  const voice = arabicVoice || fallbackVoice
  const utterance = new SpeechSynthesisUtterance(text)
  if (voice) {
    utterance.voice = voice
    utterance.lang = voice.lang
  }
  utterance.rate = 0.85
  utterance.onstart = () => onStart?.()
  utterance.onend = () => onEnd?.()
  utterance.onerror = () => onError?.()

  window.speechSynthesis.speak(utterance)
}
