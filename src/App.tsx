import './App.css'
import { BatterySection } from './components/BatterySection'
import { InputSection } from './components/InputSection'

function App() {
  return (
    <div className="power-station-gui">
      {/* Header */}
      <header className="gui-header">
        {/* Time display */}
      </header>

      {/* Main Grid */}
      <main className="gui-main">
        <BatterySection />
        <InputSection />

        {/* Output Section */}
        <section className="output-section">
          {/* Output Power Display */}
          <div className="power-display"></div>

          {/* AC Toggle */}
          <div className="toggle-container"></div>

          {/* DC Toggle */}
          <div className="toggle-container"></div>
        </section>
      </main>
    </div>
  )
}

export default App
