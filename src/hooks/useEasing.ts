import { useState, useEffect } from 'react'

/**
 * Custom hook for smooth easing animations
 * @param targetValue - The value to animate towards
 * @param duration - Duration of the animation in milliseconds (default: 300ms)
 * @returns Current eased value
 */
export function useEasing(targetValue: number, duration: number = 300): number {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const [animationStartTime, setAnimationStartTime] = useState<number | null>(null)
  const [startValue, setStartValue] = useState(targetValue)

  useEffect(() => {
    if (displayValue === targetValue) {
      return
    }

    setAnimationStartTime(Date.now())
    setStartValue(displayValue)
  }, [targetValue, displayValue])

  useEffect(() => {
    if (animationStartTime === null) return

    const animationFrame = requestAnimationFrame(() => {
      const elapsed = Date.now() - animationStartTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const newValue = startValue + (targetValue - startValue) * easeProgress

      if (progress === 1) {
        setDisplayValue(targetValue)
        setAnimationStartTime(null)
      } else {
        setDisplayValue(newValue)
      }
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [animationStartTime, duration, startValue, targetValue])

  return Math.round(displayValue)
}
