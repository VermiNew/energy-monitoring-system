import './App.css'
import { useState } from 'react'
import { HeaderSection } from './components/HeaderSection'
import { BatterySection } from './components/BatterySection'
import { InputSection } from './components/InputSection'
import { OutputSection } from './components/OutputSection'
import { StorageSection } from './components/StorageSection'
import { SystemDetailView } from './components/SystemDetailView'

function App() {
  // TODO: Move to state management
  const [showSystemDetail, setShowSystemDetail] = useState(false)
  const inputPower = 0
  const outputPower = 0

  if (showSystemDetail) {
    return <SystemDetailView onBack={() => setShowSystemDetail(false)} />
  }

  return (
    <div className="power-station-gui">
      <HeaderSection 
        inputPower={inputPower} 
        outputPower={outputPower}
        onShowSystem={() => setShowSystemDetail(true)}
      />

      {/* Main Grid */}
      <main className="gui-main">
        <BatterySection />
        <InputSection />
        <OutputSection />
        <StorageSection />
      </main>
    </div>
  )
}

export default App
