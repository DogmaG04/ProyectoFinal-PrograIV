import { useSpeech } from '../hooks/useSpeech'

interface VoiceButtonProps {
  text: string
  label?: string
  variant?: 'sm' | 'md'
  className?: string
  onStop?: () => void
}

export default function VoiceButton({
  text,
  label = 'Leer',
  variant = 'sm',
  className = '',
  onStop,
}: VoiceButtonProps) {
  const { speak, stop, speaking, supported } = useSpeech()

  if (!supported) return null

  const handleClick = () => {
    if (speaking) {
      stop()
      onStop?.()
    } else {
      speak(text)
    }
  }

  const sizeClasses = variant === 'sm'
    ? 'px-2.5 py-1.5 text-[11px]'
    : 'px-3 py-2 text-xs'

  return (
    <button
      onClick={handleClick}
      title={speaking ? 'Detener lectura' : label}
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-all ${
        speaking
          ? 'bg-danger/10 text-danger hover:bg-danger/20 animate-pulse'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      } ${sizeClasses} ${className}`}
    >
      {speaking ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
      )}
      {speaking ? 'Detener' : label}
    </button>
  )
}
