import { Zap } from 'lucide-react'

interface OutputSectionProps {
  outputPower: number
  acEnabled: boolean
  dcEnabled: boolean
  onAcToggle: () => void
  onDcToggle: () => void
}

export function OutputSection({
  outputPower,
  acEnabled,
  dcEnabled,
  onAcToggle,
  onDcToggle
}: OutputSectionProps) {
  return (
    <section className="output-section">
      <div className="power-display">
        <span className="power-value">{outputPower}</span>
        <span className="power-unit">W</span>
      </div>

      <div className="toggle-container">
        <div className="toggle-item">
          <div className="toggle-label-with-icon">
            <Zap size={18} />
            <span>AC</span>
          </div>
          <button
            className={`toggle-button ${acEnabled ? 'enabled' : ''}`}
            onClick={onAcToggle}
          >
            {acEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="toggle-container">
        <div className="toggle-item">
          <div className="toggle-label-with-icon">
            <Zap size={18} />
            <span>DC</span>
          </div>
          <button
            className={`toggle-button ${dcEnabled ? 'enabled' : ''}`}
            onClick={onDcToggle}
          >
            {dcEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </section>
  )
}
