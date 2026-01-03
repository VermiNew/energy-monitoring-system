export const BatteryColors = {
  CRITICAL: '#ef4444',    // Red - battery < 10%
  LOW: '#ff6b00',         // Orange - battery < 15%
  MEDIUM: '#fbbf24',      // Yellow - battery < 25%
  GOOD: '#10b981',        // Green - battery > 25%
} as const

export const StatusColors = {
  ACTIVE: '#10b981',      // Green
  INACTIVE: '#64748b',    // Gray
  NEUTRAL: '#94a3b8',     // Slate
  CHARGING: '#10b981',    // Green
  DISCHARGING: '#ef4444', // Red
  BALANCED: '#94a3b8',    // Gray
} as const

export const UIColors = {
  PRIMARY: '#3b82f6',
  PRIMARY_DARK: '#1d4ed8',
  PRIMARY_LIGHT: '#60a5fa',
  SECONDARY: '#0f172a',
  BACKGROUND: '#1e293b',
} as const

/**
 * Get battery color based on battery level percentage
 * @param batteryLevel Battery level in percent (0-100)
 * @returns Hex color code for battery visualization
 */
export const getBatteryColor = (batteryLevel: number): string => {
  if (batteryLevel > 25) return BatteryColors.GOOD
  if (batteryLevel > 15) return BatteryColors.MEDIUM
  if (batteryLevel > 10) return BatteryColors.LOW
  return BatteryColors.CRITICAL
}

/**
 * Get status indicator color
 * @param isActive Whether the status is active/enabled
 * @returns Hex color code for status indicator
 */
export const getStatusColor = (isActive: boolean): string => {
  return isActive ? StatusColors.ACTIVE : StatusColors.INACTIVE
}

/**
 * Get net power color and styles based on power direction
 * @param netPower Net power value (positive = charging, negative = discharging, 0 = balanced)
 * @returns Object with background, border, and text color values
 */
export const getNetPowerColor = (netPower: number): { bg: string; border: string; text: string } => {
  if (netPower === 0) {
    return {
      bg: 'rgba(100, 116, 139, 0.1)',
      border: 'rgba(100, 116, 139, 0.3)',
      text: '#94a3b8'
    }
  }
  if (netPower > 0) {
    return {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      text: '#10b981'
    }
  }
  return {
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    text: '#ef4444'
  }
}

/**
 * Get CSS gradient for battery level visualization
 * @param batteryLevel Battery level in percent (0-100)
 * @returns CSS linear-gradient string
 */
export const getBatteryGradient = (batteryLevel: number): string => {
  if (batteryLevel > 25) return 'linear-gradient(0deg, #10b981 0%, #34d399 100%)'
  if (batteryLevel > 15) return 'linear-gradient(0deg, #fbbf24 0%, #fcd34d 100%)'
  if (batteryLevel > 10) return 'linear-gradient(0deg, #ff6b00 0%, #ff8a33 100%)'
  return 'linear-gradient(0deg, #ef4444 0%, #f87171 100%)'
}

/**
 * Get CSS box-shadow for battery level
 * @param batteryLevel Battery level in percent (0-100)
 * @returns CSS box-shadow string with appropriate glow
 */
export const getBatteryShadow = (batteryLevel: number): string => {
  if (batteryLevel > 25) return '0 0 20px rgba(16, 185, 129, 0.6)'
  if (batteryLevel > 15) return '0 0 20px rgba(251, 191, 36, 0.6)'
  if (batteryLevel > 10) return '0 0 20px rgba(255, 107, 0, 0.6)'
  return '0 0 20px rgba(239, 68, 68, 0.6)'
}
