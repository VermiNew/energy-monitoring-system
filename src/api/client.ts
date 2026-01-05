import type { BatteryStatus, EnergyMetrics, OutputStatus, StorageUnit, PowerSource } from '../../server/src/types'

const API_BASE = 'http://localhost:3000/api'

/**
 * Fetch battery status
 */
export const fetchBattery = async (): Promise<BatteryStatus> => {
  const response = await fetch(`${API_BASE}/battery`)
  if (!response.ok) throw new Error('Failed to fetch battery')
  return response.json()
}

/**
 * Update battery status
 */
export const updateBattery = async (data: Partial<BatteryStatus>): Promise<BatteryStatus> => {
  const response = await fetch(`${API_BASE}/battery`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update battery')
  return response.json()
}

/**
 * Fetch power metrics
 */
export const fetchPower = async (): Promise<EnergyMetrics> => {
  const response = await fetch(`${API_BASE}/power`)
  if (!response.ok) throw new Error('Failed to fetch power')
  return response.json()
}

/**
 * Update power metrics
 */
export const updatePower = async (data: Partial<EnergyMetrics>): Promise<EnergyMetrics> => {
  const response = await fetch(`${API_BASE}/power`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update power')
  return response.json()
}

/**
 * Fetch power sources
 */
export const fetchSources = async (): Promise<PowerSource[]> => {
  const response = await fetch(`${API_BASE}/sources`)
  if (!response.ok) throw new Error('Failed to fetch sources')
  return response.json()
}

/**
 * Update power source name
 */
export const updateSource = async (id: number, name: string): Promise<PowerSource> => {
  const response = await fetch(`${API_BASE}/sources/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  if (!response.ok) throw new Error('Failed to update source')
  return response.json()
}

/**
 * Fetch storage units
 */
export const fetchStorage = async (): Promise<StorageUnit[]> => {
  const response = await fetch(`${API_BASE}/storage`)
  if (!response.ok) throw new Error('Failed to fetch storage')
  return response.json()
}

/**
 * Fetch output status
 */
export const fetchOutput = async (): Promise<OutputStatus> => {
  const response = await fetch(`${API_BASE}/output`)
  if (!response.ok) throw new Error('Failed to fetch output')
  return response.json()
}

/**
 * Update output status
 */
export const updateOutput = async (data: Partial<OutputStatus>): Promise<OutputStatus> => {
  const response = await fetch(`${API_BASE}/output`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update output')
  return response.json()
}
