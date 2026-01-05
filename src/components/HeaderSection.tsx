import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import type { HeaderSectionProps } from '../types'
import { setupTimeInterval } from '../utils/time'
import { getNetPowerColor } from '../utils/colors'

export function HeaderSection({ netPower = 0 }: HeaderSectionProps) {
  const [time, setTime] = useState<string>('')
  const netPowerColor = getNetPowerColor(netPower)

  useEffect(() => {
    const cleanup = setupTimeInterval(setTime)
    return cleanup
  }, [])

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-5" style={{
      borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
    }}>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
        }}>
          <Zap size={20} className="md:w-7 md:h-7" color="#fff" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide m-0 truncate" style={{fontFamily: 'var(--font-interface)'}}>POWER STATION</h1>
          <p className="text-xs text-slate-500 font-medium m-0 hidden md:block">Energy Management System</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-semibold" style={{
          background: netPowerColor.bg,
          border: `1px solid ${netPowerColor.border}`,
          color: netPowerColor.text
        }}>
          <div className="number-display text-sm md:text-base">{netPower > 0 ? '+' : ''}{netPower}W</div>
          <div className="text-xs opacity-70 hidden md:block">
            {netPower === 0 ? 'Balanced' : netPower > 0 ? 'Charging' : 'Discharging'}
          </div>
        </div>
        <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-semibold number-display" style={{
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
