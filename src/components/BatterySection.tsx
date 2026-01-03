interface BatterySectionProps {
  batteryLevel: number
  availableDays: number
  availableHours: number
  onShowSystem?: () => void
}

export function BatterySection({ batteryLevel, availableDays, availableHours, onShowSystem }: BatterySectionProps) {

  const getBatteryColor = () => {
    if (batteryLevel > 25) return '#10b981'
    if (batteryLevel > 15) return '#fbbf24'
    if (batteryLevel > 10) return '#ff6b00'
    return '#ef4444'
  }

  return (
    <section 
      onClick={onShowSystem}
      className="rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all hover:border-blue-400"
      style={{
        background: 'linear-gradient(145deg, #1e3a5f 0%, #0f2744 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}
    >
      <div className="absolute -top-1/2 -right-1/5 w-48 h-48 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
      }} />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <h2 className="text-sm font-semibold text-slate-400 tracking-widest uppercase m-0">System</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{
            background: '#10b981',
            boxShadow: '0 0 12px #10b981'
          }} />
          <span className="text-slate-400 text-lg">→</span>
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <p className="text-xs text-slate-500 font-medium mb-2">Available Time</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold leading-none" style={{
            color: batteryLevel === 0 ? '#ef4444' : '#10b981',
            fontFamily: '"Orbitron"'
          }}>
            {availableDays}
          </span>
          <span className="text-xl font-semibold" style={{
            color: batteryLevel === 0 ? '#ef4444' : '#10b981'
          }}>D</span>
          <span className="text-5xl font-bold leading-none" style={{
            color: batteryLevel === 0 ? '#ef4444' : '#10b981',
            fontFamily: '"Orbitron"'
          }}>
            {availableHours}
          </span>
          <span className="text-xl font-semibold" style={{
            color: batteryLevel === 0 ? '#ef4444' : '#10b981'
          }}>H</span>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-slate-500 font-medium">Battery Level</span>
          <span className="text-3xl font-bold text-white" style={{fontFamily: '"Orbitron"'}}>
            {batteryLevel}%
          </span>
        </div>
        
        <div className="w-full h-32 rounded-lg overflow-hidden relative flex items-end" style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div className="w-full relative overflow-hidden" style={{
            height: `${batteryLevel}%`,
            background: batteryLevel > 25 
              ? 'linear-gradient(0deg, #10b981 0%, #34d399 100%)'
              : batteryLevel > 15
              ? 'linear-gradient(0deg, #fbbf24 0%, #fcd34d 100%)'
              : batteryLevel > 10
              ? 'linear-gradient(0deg, #ff6b00 0%, #ff8a33 100%)'
              : 'linear-gradient(0deg, #ef4444 0%, #f87171 100%)',
            boxShadow: batteryLevel > 25 
              ? '0 0 20px rgba(16, 185, 129, 0.6)'
              : batteryLevel > 15
              ? '0 0 20px rgba(251, 191, 36, 0.6)'
              : batteryLevel > 10
              ? '0 0 20px rgba(255, 107, 0, 0.6)'
              : '0 0 20px rgba(239, 68, 68, 0.6)',
            transition: 'background 0.4s ease, box-shadow 0.4s ease, height 0.5s ease'
          }}>
            <div className="absolute inset-0 shimmer-animation" style={{
              background: 'linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '100% 200%'
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
