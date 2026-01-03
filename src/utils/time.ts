const TIME_FORMAT_PADDING = 2
const TIME_UPDATE_INTERVAL = 1000

/**
 * Format current time as HH:MM string
 * @returns Current time formatted as HH:MM (24-hour format)
 */
export const formatCurrentTime = (): string => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(TIME_FORMAT_PADDING, '0')
  const minutes = String(now.getMinutes()).padStart(TIME_FORMAT_PADDING, '0')
  return `${hours}:${minutes}`
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
  callback(formatCurrentTime())
  const interval = setInterval(() => {
    callback(formatCurrentTime())
  }, intervalDuration)
  
  return () => clearInterval(interval)
}
