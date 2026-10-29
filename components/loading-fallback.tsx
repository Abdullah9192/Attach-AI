'use client'

interface LoadingFallbackProps {
  message?: string
  fullPage?: boolean
}

export function LoadingFallback({
  message = 'A Moment of Stillness',
  fullPage = false,
}: LoadingFallbackProps) {
  const containerClass = fullPage
    ? 'flex min-h-screen w-full items-center justify-center'
    : 'flex min-h-[400px] w-full items-center justify-center p-8'

  return (
    <div className={containerClass}>
      <div className="text-center space-y-4">
        {/* Elegant loading indicator */}
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-[#D8C8A8] border-t-transparent animate-spin" />
        </div>
        
        {/* Message in ATTACHAI style */}
        <p className="font-serif text-[14px] uppercase tracking-[0.08em] text-[#8B7355]">
          {message}
        </p>
        
        <p className="font-sans text-[12px] font-light text-[#A08968]">
          Please wait...
        </p>
      </div>
    </div>
  )
}
