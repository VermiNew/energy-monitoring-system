import { useState, useEffect } from 'react'

/**
 * Custom hook for smooth easing animations
 * @param targetValue - The value to animate towards
 * @param duration - Duration of the animation in milliseconds (default: 300ms)
 * @returns Current eased value
 */
export function useEasing(targetValue: number, duration: number = 300): number {
  const [displayValue, setDisplayValue] = useState(targetValue)

  useEffect(() => {
    if (displayValue === targetValue) {
      return
    }

    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const newValue = startValue + (targetValue - startValue) * easeProgress

      setDisplayValue(Math.round(newValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [targetValue, duration])

  return displayValue
}
