import './App.css'
import { HeaderSection } from './components/HeaderSection'
import { BatterySection } from './components/BatterySection'
import { InputSection } from './components/InputSection'
import { OutputSection } from './components/OutputSection'
import { StorageSection } from './components/StorageSection'

function App() {
  // TODO: Move to state management
  const inputPower = 0
  const outputPower = 0

  return (
    <div className="power-station-gui">
      <HeaderSection inputPower={inputPower} outputPower={outputPower} />

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
