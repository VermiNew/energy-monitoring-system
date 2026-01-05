import Fastify from 'fastify'
import cors from '@fastify/cors'
import type { BatteryStatus, EnergyMetrics, OutputStatus, StorageUnit, PowerSource } from './types'

const app = Fastify({
  logger: true,
})

app.register(cors, {
  origin: true,
})

// Mock data
let batteryData: BatteryStatus = {
  level: 29,
  availableDays: 99,
  availableHours: 23,
}

let powerData: EnergyMetrics = {
  inputPower: 0,
  outputPower: 0,
}

let outputStatus: OutputStatus = {
  acEnabled: false,
  dcEnabled: false,
}

let sources: PowerSource[] = [
  { id: 1, name: 'Solar' },
  { id: 2, name: 'Grid' },
  { id: 3, name: 'Car' },
  { id: 4, name: 'Wind' },
]

let storage: StorageUnit[] = [
  {
    id: 1,
    capacity: '0kWh',
    temperature: '0°C',
    voltage: '0V',
    level: '0%',
    current: '0A',
  },
  {
    id: 2,
    capacity: '0kWh',
    temperature: '0°C',
    voltage: '0V',
    level: '0%',
    current: '0A',
  },
]

// Routes
app.get('/health', async () => {
  return { status: 'ok' }
})

app.get('/api/battery', async () => {
  return batteryData
})

app.put<{ Body: Partial<BatteryStatus> }>('/api/battery', async (request, reply) => {
  batteryData = { ...batteryData, ...request.body }
  reply.send(batteryData)
})

app.get('/api/power', async () => {
  return powerData
})

app.put<{ Body: Partial<EnergyMetrics> }>('/api/power', async (request, reply) => {
  powerData = { ...powerData, ...request.body }
  reply.send(powerData)
})

app.get('/api/sources', async () => {
  return sources
})

app.put<{ Params: { id: string }; Body: { name: string } }>('/api/sources/:id', async (request, reply) => {
  const sourceId = parseInt(request.params.id)
  const source = sources.find((s) => s.id === sourceId)
  if (!source) {
    reply.status(404).send({ error: 'Source not found' })
    return
  }
  source.name = request.body.name
  reply.send(source)
})

app.get('/api/storage', async () => {
  return storage
})

app.get('/api/output', async () => {
  return outputStatus
})

app.put<{ Body: Partial<OutputStatus> }>('/api/output', async (request, reply) => {
  outputStatus = { ...outputStatus, ...request.body }
  reply.send(outputStatus)
})

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Server listening on http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
