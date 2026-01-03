import { useState, useEffect } from 'react'
import { Zap, ArrowRight } from 'lucide-react'

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
    <header className="flex items-center justify-between pb-5" style={{
      borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
    }}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
        }}>
          <Zap size={28} color="#fff" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide m-0" style={{fontFamily: 'var(--font-interface)'}}>POWER STATION</h1>
          <p className="text-xs text-slate-500 font-medium m-0">Energy Management System</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{
          background: '#10b981',
          boxShadow: '0 0 12px #10b981'
        }} />
        <ArrowRight size={18} color="#94a3b8" />
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-lg text-sm font-semibold" style={{
          background: netPower === 0 
            ? 'rgba(100, 116, 139, 0.1)' 
            : netPower > 0 
            ? 'rgba(16, 185, 129, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${netPower === 0 
            ? 'rgba(100, 116, 139, 0.3)' 
            : netPower > 0 
            ? 'rgba(16, 185, 129, 0.3)' 
            : 'rgba(239, 68, 68, 0.3)'}`,
          color: netPower === 0 
            ? '#94a3b8' 
            : netPower > 0 
            ? '#10b981' 
            : '#ef4444'
        }}>
          <div className="number-display">{netPower > 0 ? '+' : ''}{netPower}W</div>
          <div className="text-xs opacity-70">
            {netPower === 0 ? 'Balanced' : netPower > 0 ? 'Charging' : 'Discharging'}
          </div>
        </div>
        <div className="px-4 py-2 rounded-lg text-sm font-semibold number-display" style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#60a5fa'
        }}>
          {time}
        </div>
      </div>
    </header>
  )
}
