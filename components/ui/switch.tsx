'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
        'border border-[#E5D9C7]/40 shadow-[0_1px_3px_rgba(139,115,85,0.08)]',
        'data-[state=checked]:bg-[#C9A876] data-[state=checked]:border-[#C9A876]/60',
        'data-[state=unchecked]:bg-[#E9E2D7]/50 data-[state=unchecked]:border-[#D5C8BA]/40',
        'focus-visible:ring-2 focus-visible:ring-[#D8C8A8]/30 focus-visible:ring-offset-1',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block size-4 rounded-full transition-transform',
          'bg-white shadow-[0_2px_4px_rgba(139,115,85,0.15)]',
          'data-[state=checked]:translate-x-[calc(100%-2px)]',
          'data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
