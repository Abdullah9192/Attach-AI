"use client"

export function PublicFooter() {
  return (
    <footer className="absolute bottom-4 sm:bottom-6 md:bottom-7 lg:bottom-8 left-0 right-0 z-10 text-center px-4">
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <p className="font-serif text-xs sm:text-[13px] font-light text-[#B8A896] italic tracking-wide">
          Intelligent by Nature. Intimate by Design.
        </p>
        <p className="font-serif text-[10px] sm:text-[11px] font-light text-[#B8A896] tracking-widest uppercase">
          COPYRIGHT ATTACHAI 2025
        </p>
      </div>
    </footer>
  )
}
