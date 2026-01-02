import { useState, useEffect } from 'react'

interface SystemDetailViewProps {
  onBack: () => void
  batteryLevel: number
  availableDays: number
  availableHours: number
  showDemo: boolean
  setBatteryLevel: (level: number) => void
  setAvailableDays: (days: number) => void
  setAvailableHours: (hours: number) => void
  setInputPower: (power: number) => void
  setOutputPower: (power: number) => void
  inputPower: number
  outputPower: number
}

export function SystemDetailView({
  onBack,
  batteryLevel,
  availableDays,
  availableHours,
  showDemo,
  setBatteryLevel,
  setAvailableDays,
  setAvailableHours,
  setInputPower,
  setOutputPower,
  inputPower,
  outputPower
}: SystemDetailViewProps) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const getBatteryColor = () => {
    if (batteryLevel > 50) return '#10b981'
    if (batteryLevel > 20) return '#f59e0b'
    return '#ef4444'
  }

  const dashOffset = (batteryLevel / 100) * 314

  return (
    <div className="system-detail-view">
      <div className="system-header">
        <div className="system-header-left">
          <button className="back-button" onClick={onBack}>
            ←
          </button>
          <h1 className="system-title">System</h1>
        </div>
        <div className="system-time">{time}</div>
      </div>

      <div className="system-content">
        <div className="system-column">
          <div className="available-section">
            <p className="section-label">Available Time</p>
            <div className="time-display">
              <div className="time-item">
                <div className="time-number">{availableDays}</div>
                <div className="time-unit">Days</div>
              </div>
              <div className="time-item">
                <div className="time-number">{availableHours}</div>
                <div className="time-unit">Hrs</div>
              </div>
            </div>
          </div>

          <div className="battery-arc-section">
            <svg viewBox="0 0 240 120" className="battery-arc">
              <path
                className="battery-arc-bg"
                d="M 20 120 A 100 100 0 0 1 220 120"
              />
              <path
                className="battery-arc-fill"
                d="M 20 120 A 100 100 0 0 1 220 120"
                style={{
                  stroke: getBatteryColor(),
                  strokeDasharray: `${dashOffset} 314`,
                  transition: 'stroke-dasharray 0.5s ease'
                }}
              />
            </svg>
            <div className="battery-arc-value">{batteryLevel}%</div>
            <div className="battery-arc-labels">
              <span className="battery-arc-min">10%</span>
              <span className="battery-arc-max">100%</span>
            </div>
          </div>

          <div className="battery-heating">
            <span className="heating-label">Battery Heating</span>
            <div className="help-icon">?</div>
          </div>
        </div>

        <div className="system-column">
          <h3 className="storage-heading">Storage and Conversion</h3>
          <div className="storage-list">
            <div className="storage-item">
              <div className="storage-item-left">
                <div className="storage-num">1</div>
                <div className="storage-capacity">3kWh</div>
              </div>
              <div className="storage-item-data">
                <div className="storage-temp">🌡️ 15°C</div>
                <div className="storage-voltage">52.30V</div>
              </div>
              <div className="storage-item-right">
                <div className="storage-level">30%</div>
                <div className="storage-current">-0.11A</div>
              </div>
            </div>

            <div className="storage-item">
              <div className="storage-item-left">
                <div className="storage-num">2</div>
                <div className="storage-capacity">3kWh</div>
              </div>
              <div className="storage-item-data">
                <div className="storage-temp">🌡️ 16°C</div>
                <div className="storage-voltage">52.30V</div>
              </div>
              <div className="storage-item-right">
                <div className="storage-level">28%</div>
                <div className="storage-current">-0.16A</div>
              </div>
            </div>

            <div className="storage-item error">
              <div className="error-content">
                <div className="error-label">DC</div>
                <button className="remove-button">✕</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDemo && (
        <div className="demo-controls">
          <h3 className="demo-title">Demo Controls</h3>
          <div className="demo-grid">
            <div className="demo-control">
              <label className="demo-label">
                Battery Level: {batteryLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={batteryLevel}
                onChange={(e) => {
                  const level = parseInt(e.target.value)
                  setBatteryLevel(level)
                  if (level === 0) {
                    setAvailableDays(0)
                    setAvailableHours(0)
                  } else {
                    setAvailableDays(99)
                    setAvailableHours(23)
                  }
                }}
                className="demo-slider"
              />
            </div>
            <div className="demo-control">
              <label className="demo-label">
                Input Power: {inputPower}W
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={inputPower}
                onChange={(e) => setInputPower(parseInt(e.target.value))}
                className="demo-slider"
              />
            </div>
            <div className="demo-control">
              <label className="demo-label">
                Output Power: {outputPower}W
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={outputPower}
                onChange={(e) => setOutputPower(parseInt(e.target.value))}
                className="demo-slider"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
