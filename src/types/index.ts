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
 * Real-time energy metrics
 */
export interface EnergyMetrics {
  inputPower: number
  outputPower: number
  netPower: number
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
 * AC/DC output configuration and power
 */
export interface OutputStatus {
  acEnabled: boolean
  dcEnabled: boolean
  power: number
}

/**
 * Header component props with power metrics
 */
export interface HeaderSectionProps {
  inputPower?: number
  outputPower?: number
  netPower?: number
  onShowSystem?: () => void
}

/**
 * Battery status display component props
 */
export interface BatterySectionProps {
  batteryLevel: number
  availableDays: number
  availableHours: number
  onShowSystem?: () => void
}

/**
 * Power source with id, name, connection status and power
 */
export interface PowerSource {
  id: number
  name: string
  status: boolean
  power: number
}

/**
 * Power input sources component props with inline editing
 */
export interface InputSectionProps {
  inputPower: number
  sourceNames: PowerSource[]
  editingIndex: number | null
  editValue: string
  onDoubleClick: (index: number) => void
  onNameChange: (value: string) => void
  onNameSave: (index: number) => void
  onKeyDown: (e: React.KeyboardEvent, index: number) => void
}

/**
 * Power output toggles component props
 */
export interface OutputSectionProps {
  outputPower: number
  acEnabled: boolean
  dcEnabled: boolean
  acPower: number
  dcPower: number
  onAcToggle: () => void
  onDcToggle: () => void
}

/**
 * Detailed system view component props
 */
export interface SystemDetailViewProps {
  onBack: () => void
  batteryLevel: number
  availableDays: number
  availableHours: number
  showDemo: boolean
  setBatteryLevel: (level: number) => void
  setAvailableDays: (days: number) => void
  setAvailableHours: (hours: number) => void
  setInputPower: (power: number) => void
  setOutputPower: (power: number) => void
  inputPower: number
  outputPower: number
  storageUnits?: StorageUnit[]
}
