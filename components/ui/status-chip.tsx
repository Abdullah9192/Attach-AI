'use client'

import { cn } from '@/lib/utils'

type ChipVariant = 'sage' | 'champagne' | 'bronze' | 'neutral' | 'urgent'

interface StatusChipProps {
  children: React.ReactNode
  variant?: ChipVariant
  className?: string
}

const variantStyles: Record<ChipVariant, string> = {
  sage: 'bg-[#8B9D83]/15 text-[#6E5A4F] border-[#8B9D83]/20',
  champagne: 'bg-[#D8C8A8]/20 text-[#6E5A4F] border-[#D8C8A8]/25',
  bronze: 'bg-[#C9A876]/15 text-[#6E5A4F] border-[#C9A876]/20',
  neutral: 'bg-[#B8A896]/10 text-[#8B7355] border-[#B8A896]/15',
  urgent: 'bg-[#D4A574]/15 text-[#B08A64] border-[#D4A574]/20'
}

export function StatusChip({ children, variant = 'neutral', className }: StatusChipProps) {
  return (
    <span
      className={cn(
        // Base styles - Basis Grotesque body font, consistent sizing
        'inline-flex items-center justify-center font-sans',
        'text-[11px] md:text-xs font-normal tracking-wide',
        // Consistent padding and corner radius
        'px-2.5 py-0.5 rounded-full border',
        // Variant colors
        variantStyles[variant],
        // Custom overrides
        className
      )}
    >
      {children}
    </span>
  )
}
