import { useState, useCallback, useEffect, useRef } from 'react'

interface UseSpeechOptions {
  lang?: string
  rate?: number
  pitch?: number
  volume?: number
}

interface UseSpeechReturn {
  speak: (text: string) => void
  stop: () => void
  speaking: boolean
  supported: boolean
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void
}

const STORAGE_KEY = 'speech_settings'

export function useSpeech(options: UseSpeechOptions = {}): UseSpeechReturn {
  const {
    lang = 'es-ES',
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
  } = options

  const [speaking, setSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoiceState] = useState<SpeechSynthesisVoice | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    if (!supported) return

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)

      if (!selectedVoice && availableVoices.length > 0) {
        const savedVoiceName = localStorage.getItem(STORAGE_KEY)
        const savedVoice = availableVoices.find(v => v.name === savedVoiceName)
        if (savedVoice) {
          setSelectedVoiceState(savedVoice)
        } else {
          const defaultVoice = availableVoices.find(v => v.lang.startsWith(lang)) || availableVoices[0]
          setSelectedVoiceState(defaultVoice)
        }
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [supported, lang])

  const setSelectedVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setSelectedVoiceState(voice)
    localStorage.setItem(STORAGE_KEY, voice.name)
  }, [])

  const speak = useCallback((text: string) => {
    if (!supported || !text) return

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [supported, lang, rate, pitch, volume, selectedVoice])

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
    utteranceRef.current = null
  }, [supported])

  useEffect(() => {
    return () => {
      if (supported && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
    }
  }, [supported])

  return {
    speak,
    stop,
    speaking,
    supported,
    voices,
    selectedVoice,
    setSelectedVoice,
  }
}
