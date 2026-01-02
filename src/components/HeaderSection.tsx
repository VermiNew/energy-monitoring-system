import { useState, useEffect } from 'react'

export function HeaderSection() {
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

  return (
    <header className="gui-header">
      <h1 className="gui-title">Power Station</h1>
      <div className="gui-time">{time}</div>
    </header>
  )
}
