import { useState, useEffect } from 'react'
import { Zap, ArrowRight } from 'lucide-react'
import type { HeaderSectionProps } from '../types'
import { setupTimeInterval } from '../utils/time'
import { getNetPowerColor } from '../utils/colors'

export function HeaderSection({ inputPower = 0, outputPower = 0, netPower = 0 }: HeaderSectionProps) {
  const [time, setTime] = useState<string>('')
  const netPowerColor = getNetPowerColor(netPower)

  useEffect(() => {
    const cleanup = setupTimeInterval(setTime)
    return cleanup
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
          background: netPowerColor.bg,
          border: `1px solid ${netPowerColor.border}`,
          color: netPowerColor.text
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
