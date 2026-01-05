const TIME_FORMAT_PADDING = 2
const TIME_UPDATE_INTERVAL = 1000

/**
 * Format current time as HH:MM string
 * @returns Current time formatted as HH:MM (24-hour format)
 */
export const formatCurrentTime = (): string => {
  try {
    const now = new Date()
    const hours = String(now.getHours()).padStart(TIME_FORMAT_PADDING, '0')
    const minutes = String(now.getMinutes()).padStart(TIME_FORMAT_PADDING, '0')
    return `${hours}:${minutes}`
  } catch (error) {
    console.error('Error formatting time:', error)
    return '00:00'
  }
}

/**
 * Set up interval for updating time
 * @param callback Function to call with formatted time on each update
 * @param intervalDuration Update interval in milliseconds, default 1000
 * @returns Cleanup function to clear the interval
 */
export const setupTimeInterval = (
  callback: (time: string) => void,
  intervalDuration: number = TIME_UPDATE_INTERVAL
): (() => void) => {
  try {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    if (!Number.isInteger(intervalDuration) || intervalDuration <= 0) {
      throw new Error('Interval duration must be a positive integer')
    }
    
    callback(formatCurrentTime())
    const interval = setInterval(() => {
      try {
        callback(formatCurrentTime())
      } catch (error) {
        console.error('Error in time update callback:', error)
      }
    }, intervalDuration)
    
    return () => clearInterval(interval)
  } catch (error) {
    console.error('Error setting up time interval:', error)
    return () => {}
  }
}
