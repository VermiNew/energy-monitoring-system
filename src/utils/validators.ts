const MIN_STRING_LENGTH = 1

/**
 * Validate and clean source name input
 * @param value Input string to validate
 * @returns Trimmed string without whitespace
 * @throws Error if input is not a string
 */
export const validateSourceName = (value: string): string => {
  try {
    if (typeof value !== 'string') {
      throw new TypeError('Source name must be a string')
    }
    return value.trim()
  } catch (error) {
    console.error('Error validating source name:', error)
    throw error
  }
}

/**
 * Check if source name is valid (non-empty after trim)
 * @param value Input string to check
 * @returns True if name is non-empty after trimming
 */
export const isValidSourceName = (value: string): boolean => {
  try {
    if (typeof value !== 'string') {
      return false
    }
    return validateSourceName(value).length >= MIN_STRING_LENGTH
  } catch (error) {
    console.error('Error checking source name validity:', error)
    return false
  }
}

/**
 * Validate power value is within acceptable range
 * @param value Power value to validate
 * @param min Minimum acceptable value, default 0
 * @param max Maximum acceptable value, default 10000
 * @returns True if value is valid number within range
 */
export const validatePowerValue = (value: number, min: number = 0, max: number = 10000): boolean => {
  return !isNaN(value) && value >= min && value <= max
}

/**
 * Validate battery level (0-100 percent)
 * @param level Battery level to validate
 * @returns True if level is integer between 0 and 100
 */
export const validateBatteryLevel = (level: number): boolean => {
  return Number.isInteger(level) && level >= 0 && level <= 100
}

/**
 * Validate days/hours available time
 * @param value Time value to validate
 * @returns True if value is non-negative integer
 */
export const validateTimeValue = (value: number): boolean => {
  return Number.isInteger(value) && value >= 0
}
