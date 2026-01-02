import { useState, useEffect } from 'react'

interface HeaderSectionProps {
  inputPower?: number
  outputPower?: number
  onShowSystem?: () => void
}

export function HeaderSection({ inputPower = 0, outputPower = 0, onShowSystem }: HeaderSectionProps) {
  const [time, setTime] = useState<string>('')
  const netPower = inputPower - outputPower

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

  return (
    <header className="gui-header">
      <div>
        <h1 className="gui-title">Power Station</h1>
        <p className="gui-subtitle">Energy Management System</p>
      </div>
      <div className="gui-time-container">
        <div className="gui-time">{time}</div>
        <div className={`net-power ${netPower > 0 ? 'charging' : netPower < 0 ? 'discharging' : 'neutral'}`}>
          {netPower > 0 ? '+' : netPower < 0 ? '' : '±'} {Math.abs(netPower)}W
        </div>
        {onShowSystem && (
          <button className="system-button" onClick={onShowSystem}>
            System
          </button>
        )}
      </div>
    </header>
  )
}
