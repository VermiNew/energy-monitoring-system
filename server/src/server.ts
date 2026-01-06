import Fastify from 'fastify'
import cors from '@fastify/cors'
import type { BatteryStatus, EnergyMetrics, OutputStatus, StorageUnit, PowerSource } from './types'

const app = Fastify({
  logger: false,
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

// Mock data
let batteryData: BatteryStatus = {
  level: 0,
  availableDays: 0,
  availableHours: 0,
}

let powerData: EnergyMetrics = {
  inputPower: 0,
  outputPower: 0,
}

let outputStatus: OutputStatus = {
  acEnabled: false,
  dcEnabled: false,
  acPower: 0,
  dcPower: 0,
}

let sources: PowerSource[] = [
  { id: 1, name: 'Solar', status: false, power: 0 },
  { id: 2, name: 'Grid', status: false, power: 0 },
  { id: 3, name: 'Generator', status: false, power: 0 },
  { id: 4, name: 'Wind', status: false, power: 0 },
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

app.put<{ Body: { node: number; status?: boolean; name?: string; power?: number } }>('/api/sources', async (request, reply) => {
  const source = sources[request.body.node]
  if (!source) {
    reply.status(404).send({ error: 'Source not found' })
    return
  }
  if (request.body.status !== undefined) {
    source.status = request.body.status
  }
  if (request.body.name !== undefined) {
    source.name = request.body.name
  }
  if (request.body.power !== undefined && source.status) {
    source.power = request.body.power
    powerData.inputPower = sources.reduce((sum, s) => sum + (s.status ? s.power : 0), 0)
  }
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
  powerData.outputPower = outputStatus.acPower + outputStatus.dcPower
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
