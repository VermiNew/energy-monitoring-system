/**
 * Storage unit with battery/conversion specifications
 */
export interface StorageUnit {
  id: number
  capacity: string
  temperature: string
  voltage: string
  level: string
  current: string
}

/**
 * Battery status information
 */
export interface BatteryStatus {
  level: number
  availableDays: number
  availableHours: number
}

/**
 * Real-time energy metrics
 */
export interface EnergyMetrics {
  inputPower: number
  outputPower: number
}

/**
 * AC/DC output configuration
 */
export interface OutputStatus {
  acEnabled: boolean
  dcEnabled: boolean
}

/**
 * Power source
 */
export interface PowerSource {
  id: number
  name: string
}
