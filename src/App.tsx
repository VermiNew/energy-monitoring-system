import './App.css'
import { HeaderSection } from './components/HeaderSection'
import { BatterySection } from './components/BatterySection'
import { InputSection } from './components/InputSection'
import { OutputSection } from './components/OutputSection'

function App() {
  return (
    <div className="power-station-gui">
      <HeaderSection />

      {/* Main Grid */}
      <main className="gui-main">
        <BatterySection />
        <InputSection />
        <OutputSection />
      </main>
    </div>
  )
}

export default App
