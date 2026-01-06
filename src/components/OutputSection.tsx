import type { OutputSectionProps } from '../types'
import { getStatusColor } from '../utils/colors'
import { useEasing } from '../hooks/useEasing'

export function OutputSection({
  outputPower,
  acEnabled,
  dcEnabled,
  acPower,
  dcPower,
  onAcToggle,
  onDcToggle
}: OutputSectionProps) {
  const statusColor = getStatusColor(acEnabled || dcEnabled)
  const easedOutputPower = useEasing(outputPower, 300)
  const easedAcPower = useEasing(acPower, 300)
  const easedDcPower = useEasing(dcPower, 300)
  
  return (
    <section className="rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #1e3a5f 0%, #0f2744 100%)',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }}>
      <div className="absolute -top-1/2 -right-1/5 w-48 h-48 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
      }} />

      <div className="flex items-center justify-between mb-5 relative z-10">
         <h2 className="text-sm font-semibold text-slate-400 tracking-widest uppercase m-0">Output</h2>
         <div className="w-2 h-2 rounded-full" style={{
           background: statusColor,
           boxShadow: (acEnabled || dcEnabled) ? `0 0 12px ${statusColor}` : 'none'
         }} />
       </div>

      <div className="mb-4 md:mb-8 relative z-10">
        <div className="flex items-baseline gap-2">
          <span 
            className="text-5xl md:text-7xl font-bold text-white leading-none test-font-numbers number-display"
            aria-label={`Total output power: ${easedOutputPower} watts`}
            role="status"
          >
            {easedOutputPower}
          </span>
          <span className="text-xl md:text-3xl text-slate-500 mb-2" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>W</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between rounded-xl p-4" style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div>
            <div className="text-lg font-bold text-white mb-1" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>AC</div>
            <div 
              className="text-sm text-slate-500 font-medium test-font-numbers number-display"
              aria-label={`AC output: ${easedAcPower} watts`}
              role="status"
            >
              {easedAcPower}W
            </div>
            </div>
            <div
             onClick={onAcToggle}
             onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault()
                 onAcToggle()
               }
             }}
             role="switch"
             aria-checked={acEnabled}
             aria-label={`AC output toggle, currently ${acEnabled ? 'enabled' : 'disabled'}`}
             tabIndex={0}
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
              <div 
                className="text-sm text-slate-500 font-medium test-font-numbers number-display"
                aria-label={`DC output: ${easedDcPower} watts`}
                role="status"
              >
                {easedDcPower}W
              </div>
            </div>
            <div
             onClick={onDcToggle}
             onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault()
                 onDcToggle()
               }
             }}
             role="switch"
             aria-checked={dcEnabled}
             aria-label={`DC output toggle, currently ${dcEnabled ? 'enabled' : 'disabled'}`}
             tabIndex={0}
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
