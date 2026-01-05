const PERCENTAGE_MAX = 100
const PERCENTAGE_MIN = 0
const SVG_CIRCLE_CIRCUMFERENCE = 314

/**
 * Calculate net power (input - output)
 * @param inputPower Power input in watts
 * @param outputPower Power output in watts
 * @returns Net power (positive = charging, negative = discharging)
 */
export const calculateNetPower = (inputPower: number, outputPower: number): number => {
  try {
    if (!Number.isFinite(inputPower) || !Number.isFinite(outputPower)) {
      throw new Error('Input and output power must be finite numbers')
    }
    return inputPower - outputPower
  } catch (error) {
    console.error('Error calculating net power:', error)
    return 0
  }
}

/**
 * Calculate battery percentage for visualization (0-100)
 * @param currentLevel Current battery level
 * @param maxLevel Maximum battery level, default 100
 * @returns Normalized percentage (0-100)
 */
export const calculateBatteryPercentage = (currentLevel: number, maxLevel: number = PERCENTAGE_MAX): number => {
  return Math.min(Math.max((currentLevel / maxLevel) * PERCENTAGE_MAX, PERCENTAGE_MIN), PERCENTAGE_MAX)
}

/**
 * Calculate SVG stroke dash offset for circular battery indicator
 * @param batteryLevel Battery level in percent (0-100)
 * @param totalDashArray SVG circle circumference, default 314 (2πr where r=50)
 * @returns Stroke dash array offset value
 */
export const calculateBatteryDashOffset = (batteryLevel: number, totalDashArray: number = SVG_CIRCLE_CIRCUMFERENCE): number => {
  return (batteryLevel / PERCENTAGE_MAX) * totalDashArray
}

/**
 * Calculate power percentage for slider visualization
 * @param power Current power value
 * @param maxPower Maximum power value, default 100
 * @returns Normalized percentage (0-100)
 */
export const calculatePowerPercentage = (power: number, maxPower: number = PERCENTAGE_MAX): number => {
  return Math.min((power / maxPower) * PERCENTAGE_MAX, PERCENTAGE_MAX)
}

/**
 * Get power status label based on net power
 * @param netPower Net power value (positive = charging, negative = discharging, 0 = balanced)
 * @returns Status label: "Charging", "Discharging", or "Balanced"
 */
export const getPowerStatusLabel = (netPower: number): string => {
  if (netPower === 0) return 'Balanced'
  if (netPower > 0) return 'Charging'
  return 'Discharging'
}
