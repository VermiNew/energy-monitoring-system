import { useState } from 'react'

export function BatterySection() {
  const [batteryLevel] = useState(0)
  const [availableDays] = useState(0)
  const [availableHours] = useState(0)

  return (
    <section className="battery-section">
      <div className="battery-container">
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
