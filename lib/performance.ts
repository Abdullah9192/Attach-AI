import { useCallback, useMemo, useRef, useEffect } from 'react'


/**
 * Debounces a function to prevent excessive calls
 * Useful for search inputs, window resize handlers, etc.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Throttles a function to limit execution frequency
 * Useful for scroll handlers, API polling, etc.
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): T {
  const lastRun = useRef(Date.now())

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    }) as T,
    [callback, delay]
  )
}

/**
 * Intersection Observer hook for lazy loading and visibility detection
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}

/**
 * Memoized sort function for lists
 */
export function useMemoizedSort<T>(
  items: T[],
  sortFn: (a: T, b: T) => number
): T[] {
  return useMemo(() => [...items].sort(sortFn), [items, sortFn])
}

/**
 * Memoized filter function for lists
 */
export function useMemoizedFilter<T>(
  items: T[],
  filterFn: (item: T) => boolean
): T[] {
  return useMemo(() => items.filter(filterFn), [items, filterFn])
}
