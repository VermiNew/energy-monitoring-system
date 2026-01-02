import { useState } from 'react'

export function BatterySection() {
  const [batteryLevel] = useState(0)
  const [availableDays] = useState(0)
  const [availableHours] = useState(0)

  const getBatteryColor = () => {
    if (batteryLevel > 50) return '#10b981'
    if (batteryLevel > 20) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <section className="battery-section">
      <div className="battery-container">
        <div className="battery-visual">
          <div
            className="battery-bar"
            style={{
              height: `${batteryLevel}%`,
              backgroundColor: getBatteryColor(),
              transition: 'all 0.3s ease'
            }}
          />
        </div>
        <div className="battery-display">
          <span className="battery-percentage">{batteryLevel}%</span>
        </div>
      </div>

      <div className="available-time">
        <div className="time-block">
          <div className="time-value">{availableDays}</div>
          <div className="time-label">Days</div>
        </div>
        <div className="time-block">
          <div className="time-value">{availableHours}</div>
          <div className="time-label">Hrs</div>
        </div>
      </div>
    </section>
  )
}
