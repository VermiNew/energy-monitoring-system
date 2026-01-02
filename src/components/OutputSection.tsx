import { useState } from 'react'

export function OutputSection() {
  const [outputPower] = useState(0)
  const [acEnabled, setAcEnabled] = useState(false)
  const [dcEnabled, setDcEnabled] = useState(false)

  return (
    <section className="output-section">
      <div className="power-display">
        <span className="power-value">{outputPower}</span>
        <span className="power-unit">W</span>
      </div>

      <div className="toggle-container">
        <div className="toggle-item">
          <div className="toggle-label">AC</div>
          <button
            className={`toggle-button ${acEnabled ? 'enabled' : ''}`}
            onClick={() => setAcEnabled(!acEnabled)}
          >
            {acEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="toggle-container">
        <div className="toggle-item">
          <div className="toggle-label">DC</div>
          <button
            className={`toggle-button ${dcEnabled ? 'enabled' : ''}`}
            onClick={() => setDcEnabled(!dcEnabled)}
          >
            {dcEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </section>
  )
}
