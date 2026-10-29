"use client"

export function AppFooter() {
  return (
    <footer className="px-4 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-6 md:py-5 lg:py-6 mt-8">
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3">
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center">
          <p className="text-[11px] sm:text-[12px] font-light text-[#B8A896] italic tracking-wide font-serif">
            Intelligent by Nature. Intimate by Design.
          </p>
          <p className="text-[9px] sm:text-[10px] font-light text-[#8B7355]/70 tracking-[0.08em] uppercase font-serif">
            GDPR Compliant. ISO-Aligned Architecture.
          </p>
          <p className="text-[9px] sm:text-[10px] font-light text-[#8B7355]/60 tracking-widest uppercase font-serif mt-0.5">
            COPYRIGHT ATTACHAI 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
