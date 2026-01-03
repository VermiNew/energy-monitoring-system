interface OutputSectionProps {
  outputPower: number
  acEnabled: boolean
  dcEnabled: boolean
  onAcToggle: () => void
  onDcToggle: () => void
}

export function OutputSection({
  outputPower,
  acEnabled,
  dcEnabled,
  onAcToggle,
  onDcToggle
}: OutputSectionProps) {
  return (
    <section className="rounded-2xl p-6 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #1e3a5f 0%, #0f2744 100%)',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }}>
      <div className="absolute -top-1/2 -right-1/5 w-48 h-48 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
      }} />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <h2 className="text-sm font-semibold text-slate-400 tracking-widest uppercase m-0">Output</h2>
        <div className="w-2 h-2 rounded-full" style={{
          background: (acEnabled || dcEnabled) ? '#10b981' : '#64748b',
          boxShadow: (acEnabled || dcEnabled) ? '0 0 12px #10b981' : 'none'
        }} />
      </div>

      <div className="mb-8 relative z-10">
        <div className="flex items-baseline gap-2">
          <span className="text-7xl font-bold text-white leading-none test-font-numbers">
            {outputPower}
          </span>
          <span className="text-3xl text-slate-500 mb-2" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>W</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between rounded-xl p-4" style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div>
            <div className="text-lg font-bold text-white mb-1" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>AC</div>
            <div className="text-sm text-slate-500 font-medium test-font-numbers">0W</div>
            </div>
            <div
             onClick={onAcToggle}
             className="w-14 h-8 rounded-full relative cursor-pointer transition-all border-2"
             style={{
               background: acEnabled 
                 ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)'
                 : 'rgba(15, 23, 42, 0.8)',
               borderColor: acEnabled ? '#60a5fa' : '#334155',
               boxShadow: acEnabled ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none'
             }}
            >
             <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 transition-all shadow-md" style={{
               left: acEnabled ? 'calc(100% - 26px)' : '2px'
             }} />
            </div>
            </div>

            <div className="flex items-center justify-between rounded-xl p-4" style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
            <div>
             <div className="text-lg font-bold text-white mb-1" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>DC</div>
             <div className="text-sm text-slate-500 font-medium test-font-numbers">0W</div>
          </div>
          <div
            onClick={onDcToggle}
            className="w-14 h-8 rounded-full relative cursor-pointer transition-all border-2"
            style={{
              background: dcEnabled 
                ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)'
                : 'rgba(15, 23, 42, 0.8)',
              borderColor: dcEnabled ? '#60a5fa' : '#334155',
              boxShadow: dcEnabled ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none'
            }}
          >
            <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 transition-all shadow-md" style={{
              left: dcEnabled ? 'calc(100% - 26px)' : '2px'
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
