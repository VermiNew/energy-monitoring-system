import { useState, useEffect } from 'react'

interface HeaderSectionProps {
  inputPower?: number
  outputPower?: number
  netPower?: number
  onShowSystem?: () => void
}

export function HeaderSection({ inputPower = 0, outputPower = 0, netPower = 0, onShowSystem }: HeaderSectionProps) {
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
    <header className="flex items-center justify-between pb-5 border-b border-blue-500/20">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide font-orbitron m-0">Power Station</h1>
        <p className="text-sm text-slate-400 m-0 font-normal">Energy Management System</p>
      </div>
      <div className="flex gap-6 items-center">
        <div className="px-4 py-2 rounded-lg text-sm font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-400 font-orbitron">
          {time}
        </div>
        <div className={`px-4 py-2 rounded-lg text-sm font-semibold border font-rajdhani ${
          netPower > 0 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : netPower < 0 
            ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
            : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
        }`}>
          {netPower > 0 ? '+' : netPower < 0 ? '' : '±'} {Math.abs(netPower)}W
        </div>
        {onShowSystem && (
          <button 
            onClick={onShowSystem}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all border border-blue-500/50"
          >
            System
          </button>
        )}
      </div>
    </header>
  )
}
