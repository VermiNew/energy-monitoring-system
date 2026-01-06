import { useState, useEffect } from 'react'
import { HeaderSection } from './components/HeaderSection'
import { BatterySection } from './components/BatterySection'
import { InputSection } from './components/InputSection'
import { OutputSection } from './components/OutputSection'
import { SystemDetailView } from './components/SystemDetailView'
import type { StorageUnit } from './types'
import { calculateNetPower } from './utils/calculations'
import { isValidSourceName, validateSourceName } from './utils/validators'
import { fetchBattery, fetchPower, fetchSources, fetchStorage, fetchOutput, updateSource, updateBattery, updatePower, updateOutput } from './api/client'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const [showSystemDetail, setShowSystemDetail] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(0)
  const [availableDays, setAvailableDays] = useState(0)
  const [availableHours, setAvailableHours] = useState(0)
  const [inputPower, setInputPower] = useState(0)
  const [outputPower, setOutputPower] = useState(0)
  const [acEnabled, setAcEnabled] = useState(false)
  const [dcEnabled, setDcEnabled] = useState(false)
  const [acPower, setAcPower] = useState(0)
  const [dcPower, setDcPower] = useState(0)
  const [sourceNames, setSourceNames] = useState<Array<{ id: number; name: string; status: boolean; power: number }>>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([])

  // Fetch data on mount and poll for updates
  useEffect(() => {
    const loadData = async () => {
      try {
        const [battery, power, sources, storage, output] = await Promise.all([
          fetchBattery(),
          fetchPower(),
          fetchSources(),
          fetchStorage(),
          fetchOutput(),
        ])
        
        setBatteryLevel(battery.level)
        setAvailableDays(battery.availableDays)
        setAvailableHours(battery.availableHours)
        setInputPower(power.inputPower)
        setOutputPower(power.outputPower)
        setSourceNames(sources)
        setStorageUnits(storage)
        setAcEnabled(output.acEnabled)
        setDcEnabled(output.dcEnabled)
        setAcPower(output.acPower)
        setDcPower(output.dcPower)
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
    }

    loadData()

    // Poll for updates every 500ms
    const interval = setInterval(loadData, 500)

    return () => clearInterval(interval)
  }, [])

  // Check for ?demo parameter in URL
  const showDemo = typeof window !== 'undefined' && window.location.search.includes('demo')

  // Calculate net power
  const netPower = calculateNetPower(inputPower, outputPower)

  const handleDoubleClick = (index: number): void => {
    setEditingIndex(index)
    setEditValue(sourceNames[index].name)
  }

  const handleNameChange = (value: string): void => {
    try {
      if (typeof value !== 'string') {
        throw new TypeError('Name change value must be a string')
      }
      setEditValue(value)
    } catch (error) {
      console.error('Error handling name change:', error)
    }
  }

  const handleNameSave = async (index: number): Promise<void> => {
    try {
      if (!Number.isInteger(index) || index < 0) {
        throw new Error('Invalid source index')
      }
      if (isValidSourceName(editValue)) {
        const source = sourceNames[index]
        const cleanName = validateSourceName(editValue)
        await updateSource(source.id, cleanName)
        const newNames = [...sourceNames]
        newNames[index] = { ...source, name: cleanName }
        setSourceNames(newNames)
      }
    } catch (error) {
      console.error('Error saving source name:', error)
    } finally {
      setEditingIndex(null)
      setEditValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number): void => {
    try {
      if (!e) {
        throw new Error('Keyboard event is missing')
      }
      if (e.key === 'Enter') {
        handleNameSave(index)
      } else if (e.key === 'Escape') {
        setEditingIndex(null)
        setEditValue('')
      }
    } catch (error) {
      console.error('Error handling keyboard input:', error)
    }
  }

  // Debounced update functions for sliders
  const debouncedUpdateBattery = useDebounce((level: number) => {
    updateBattery({ level }).catch(err => console.error('Failed to update battery:', err))
  }, 300)

  const debouncedUpdateInputPower = useDebounce((power: number) => {
    updatePower({ inputPower: power }).catch(err => console.error('Failed to update power:', err))
  }, 300)

  const debouncedUpdateOutputPower = useDebounce((power: number) => {
    updatePower({ outputPower: power }).catch(err => console.error('Failed to update power:', err))
  }, 300)

  if (showSystemDetail) {
    return (
      <SystemDetailView 
        onBack={() => setShowSystemDetail(false)}
        batteryLevel={batteryLevel}
        availableDays={availableDays}
        availableHours={availableHours}
        showDemo={showDemo}
        setBatteryLevel={setBatteryLevel}
        setAvailableDays={setAvailableDays}
        setAvailableHours={setAvailableHours}
        setInputPower={setInputPower}
        setOutputPower={setOutputPower}
        inputPower={inputPower}
        outputPower={outputPower}
        storageUnits={storageUnits}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: 'var(--font-interface)'
    }}>
      <div className="w-full max-w-7xl rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl" style={{
        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <HeaderSection 
          inputPower={inputPower} 
          outputPower={outputPower}
          netPower={netPower}
        />

        {/* Main Grid */}
        <main className="mt-4 md:mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <BatterySection 
              batteryLevel={batteryLevel}
              availableDays={availableDays}
              availableHours={availableHours}
              onShowSystem={() => setShowSystemDetail(true)}
            />
            <InputSection 
              inputPower={inputPower}
              sourceNames={sourceNames}
              editingIndex={editingIndex}
              editValue={editValue}
              onDoubleClick={handleDoubleClick}
              onNameChange={handleNameChange}
              onNameSave={handleNameSave}
              onKeyDown={handleKeyDown}
            />
            <OutputSection 
              outputPower={outputPower}
              acEnabled={acEnabled}
              dcEnabled={dcEnabled}
              acPower={acPower}
              dcPower={dcPower}
              onAcToggle={() => updateOutput({ acEnabled: !acEnabled }).catch(err => console.error('Failed to update AC:', err))}
              onDcToggle={() => updateOutput({ dcEnabled: !dcEnabled }).catch(err => console.error('Failed to update DC:', err))}
            />
          </div>
        </main>

        {showDemo && (
          <div className="mt-8 p-5 rounded-xl" style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <h3 className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-4 m-0">Demo Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-2 font-semibold">
                  Battery Level: {batteryLevel}%
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={batteryLevel}
                    onChange={(e) => {
                      const level = parseInt(e.target.value)
                      debouncedUpdateBattery(level)
                    }}
                    className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${batteryLevel}%, #1e293b ${batteryLevel}%, #1e293b 100%)`
                    }}
                  />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-2 font-semibold">
                  Input Power: {inputPower}W
                </label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    value={inputPower}
                    onChange={(e) => {
                      const power = parseInt(e.target.value)
                      debouncedUpdateInputPower(power)
                    }}
                    className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${inputPower/10}%, #1e293b ${inputPower/10}%, #1e293b 100%)`
                    }}
                  />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-2 font-semibold">
                  Output Power: {outputPower}W
                </label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    value={outputPower}
                    onChange={(e) => {
                      const power = parseInt(e.target.value)
                      debouncedUpdateOutputPower(power)
                    }}
                    className="w-full h-1.5 rounded-full outline-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${outputPower/10}%, #1e293b ${outputPower/10}%, #1e293b 100%)`
                    }}
                  />
              </div>
            </div>
          </div>
        )}

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@400;500;600;700&display=swap');
          
          @keyframes shimmer {
            0% {
              background-position: 0% 0%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            40% {
              background-position: 0% 100%;
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 0;
              background-position: 0% 0%;
            }
          }
          
          .shimmer-animation {
            animation: shimmer 4s ease-in-out infinite;
          }
          
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
          }
          
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
            border: 2px solid #3b82f6;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
            border: 2px solid #3b82f6;
          }
        `}</style>
      </div>
    </div>
  )
}

export default App
