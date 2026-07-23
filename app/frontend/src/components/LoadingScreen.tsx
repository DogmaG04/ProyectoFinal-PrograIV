import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center gap-5 animate-fadeOut" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
        <rect x="10" y="8" width="44" height="48" rx="6" fill="#1a1a24" stroke="#4d7cfe" strokeWidth="2"/>
        <rect x="22" y="4" width="20" height="8" rx="3" fill="#4d7cfe"/>
        <circle cx="32" cy="34" r="10" fill="#121218" stroke="#34d399" strokeWidth="2"/>
        <circle cx="32" cy="34" r="4" fill="#34d399"/>
        <path d="M32 44 V52" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <rect x="24" y="50" width="16" height="4" rx="2" fill="#fbbf24"/>
      </svg>
      <span className="text-lg font-bold text-text tracking-wide">CeleronPFB</span>
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 rounded-full bg-success animate-bounce" style={{ animationDelay: '0.15s' }} />
        <span className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  )
}
