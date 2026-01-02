import './App.css'
import { useState } from 'react'
import { HeaderSection } from './components/HeaderSection'
import { BatterySection } from './components/BatterySection'
import { InputSection } from './components/InputSection'
import { OutputSection } from './components/OutputSection'
import { StorageSection } from './components/StorageSection'
import { SystemDetailView } from './components/SystemDetailView'

function App() {
  const [showSystemDetail, setShowSystemDetail] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(29)
  const [availableDays, setAvailableDays] = useState(99)
  const [availableHours, setAvailableHours] = useState(23)
  const [inputPower, setInputPower] = useState(0)
  const [outputPower, setOutputPower] = useState(0)
  const [acEnabled, setAcEnabled] = useState(false)
  const [dcEnabled, setDcEnabled] = useState(false)
  const [sourceNames, setSourceNames] = useState(['Solar', 'Grid', 'Car', 'Wind'])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  // Check for ?demo parameter in URL
  const showDemo = typeof window !== 'undefined' && window.location.search.includes('demo')

  // Calculate net power
  const netPower = inputPower - outputPower

  const handleDoubleClick = (index: number) => {
    setEditingIndex(index)
    setEditValue(sourceNames[index])
  }

  const handleNameChange = (value: string) => {
    setEditValue(value)
  }

  const handleNameSave = (index: number) => {
    if (editValue.trim()) {
      const newNames = [...sourceNames]
      newNames[index] = editValue.trim()
      setSourceNames(newNames)
    }
    setEditingIndex(null)
    setEditValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleNameSave(index)
    } else if (e.key === 'Escape') {
      setEditingIndex(null)
      setEditValue('')
    }
  }

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
      />
    )
  }

  return (
    <div className="power-station-gui">
      <HeaderSection 
        inputPower={inputPower} 
        outputPower={outputPower}
        netPower={netPower}
        onShowSystem={() => setShowSystemDetail(true)}
      />

      {/* Main Grid */}
      <main className="gui-main">
        <BatterySection 
          batteryLevel={batteryLevel}
          availableDays={availableDays}
          availableHours={availableHours}
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
          onAcToggle={() => setAcEnabled(!acEnabled)}
          onDcToggle={() => setDcEnabled(!dcEnabled)}
        />
        <StorageSection />
      </main>
    </div>
  )
}

export default App
