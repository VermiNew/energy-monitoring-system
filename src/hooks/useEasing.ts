import { useState, useEffect, useRef } from 'react'

/**
 * Optimized hook for smooth easing animations
 * @param targetValue - Target animation value
 * @param duration - Animation duration in milliseconds (default: 300ms)
 * @returns Current animation value
 */
export function useEasing(targetValue: number, duration: number = 300): number {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const animationRef = useRef<number | null>(null)
  const startValueRef = useRef(targetValue)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // If target value hasn't changed, do nothing
    if (displayValue === targetValue) {
      return
    }

    // Save initial value and start time
    startValueRef.current = displayValue
    startTimeRef.current = performance.now()

    // Animation function
    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) return

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const newValue = startValueRef.current + (targetValue - startValueRef.current) * easeProgress

      setDisplayValue(newValue)

      // Continue animation if not finished
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(targetValue) // Ensure final value is exact
        animationRef.current = null
        startTimeRef.current = null
      }
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup: cancel animation on unmount or targetValue change
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [targetValue, duration])

  return Math.round(displayValue)
}
