import './App.css'
import { BatterySection } from './components/BatterySection'

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

        {/* Input Section */}
        <section className="input-section">
          {/* Input Power Display */}
          <div className="power-display"></div>

          {/* Sources Grid */}
          <div className="sources-grid"></div>
        </section>

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
