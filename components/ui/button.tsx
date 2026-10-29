import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-serif font-normal uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#D8C8A8]/30 focus-visible:ring-offset-1 rounded-full",
  {
    variants: {
      variant: {
        // Primary: Main action buttons with frosted champagne glass effect
        default:
          'backdrop-blur-xl bg-gradient-to-b from-white/70 to-white/50 text-[#6E5A4F] border border-[#E5D9C7]/50 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_2px_8px_rgba(139,115,85,0.12),0_0_0_0.5px_rgba(255,255,255,0.5)_inset] hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_4px_16px_rgba(139,115,85,0.16),0_0_0_0.5px_rgba(255,255,255,0.6)_inset,0_0_20px_rgba(229,217,199,0.2)] hover:bg-gradient-to-b hover:from-white/80 hover:to-white/60 hover:scale-[1.02] active:scale-[0.98] active:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_1px_4px_rgba(139,115,85,0.1)] transition-all duration-300',
        
        // Destructive: Soft rose-tinted glass for warnings/delete
        destructive:
          'backdrop-blur-xl bg-gradient-to-b from-[#F5E8E6]/70 to-[#F5E8E6]/50 text-[#8B5A55] border border-[#E5C8C4]/50 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_2px_8px_rgba(139,90,85,0.12),0_0_0_0.5px_rgba(255,255,255,0.5)_inset] hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_4px_16px_rgba(139,90,85,0.16),0_0_0_0.5px_rgba(255,255,255,0.6)_inset] hover:bg-gradient-to-b hover:from-[#F5E8E6]/80 hover:to-[#F5E8E6]/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300',
        
        // Outline: Subtle frosted border for secondary actions
        outline:
          'backdrop-blur-xl bg-white/30 text-[#8B7355] border border-[#D5C8BA]/40 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_1px_4px_rgba(139,115,85,0.08)] hover:bg-white/40 hover:border-[#D5C8BA]/60 hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_2px_8px_rgba(139,115,85,0.12)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300',
        
        // Secondary: Etched glass appearance for filters/tabs
        secondary:
          'backdrop-blur-md bg-white/20 text-[#8B7355] border border-white/30 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_3px_rgba(139,115,85,0.06)] hover:bg-white/30 hover:border-white/40 hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_2px_6px_rgba(139,115,85,0.08)] active:bg-white/40 transition-all duration-300',
        
        // Ghost: Nearly invisible, subtle hover state for low-hierarchy actions
        ghost:
          'text-[#8B7355] hover:backdrop-blur-md hover:bg-white/20 hover:shadow-[0_1px_3px_rgba(139,115,85,0.06)] hover:scale-[1.01] active:scale-[0.99] active:bg-white/30 transition-all duration-300',
        
        // Link: Text-only, no background
        link: 'text-[#C9A876] underline-offset-4 hover:underline hover:text-[#A08968] px-0',
      },
      size: {
        default: 'h-11 px-6 py-2.5 text-sm',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-14 px-8 py-3 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
