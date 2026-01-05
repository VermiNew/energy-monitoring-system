import { useRef } from 'react'
import { Lightbulb } from 'lucide-react'
import type { InputSectionProps } from '../types'
import { getStatusColor } from '../utils/colors'

export function InputSection({
  inputPower,
  sourceNames,
  editingIndex,
  editValue,
  onDoubleClick,
  onNameChange,
  onNameSave,
  onKeyDown
}: InputSectionProps) {
  const statusColor = getStatusColor(inputPower > 0)
  const lastTapRef = useRef<{ index: number; time: number } | null>(null)

  const handleTap = (index: number) => {
    const now = Date.now()
    const lastTap = lastTapRef.current

    if (lastTap && lastTap.index === index && now - lastTap.time < 300) {
      onDoubleClick(index)
      lastTapRef.current = null
    } else {
      lastTapRef.current = { index, time: now }
    }
  }
  return (
    <section className="rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #1e3a5f 0%, #0f2744 100%)',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }}>
      <div className="absolute -top-1/2 -right-1/5 w-48 h-48 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
      }} />

      <div className="flex items-center justify-between mb-5 relative z-10">
         <h2 className="text-sm font-semibold text-slate-400 tracking-widest uppercase m-0">Input</h2>
         <div className="w-2 h-2 rounded-full" style={{
           background: statusColor,
           boxShadow: inputPower > 0 ? `0 0 12px ${statusColor}` : 'none'
         }} />
       </div>

      <div className="mb-4 md:mb-6 relative z-10">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl md:text-7xl font-bold text-white leading-none number-display">
            {inputPower}
          </span>
          <span className="text-xl md:text-3xl text-slate-500 mb-2" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>W</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 relative z-10">
         {sourceNames.map((source, index) => (
           <div 
             key={source.id}
             onDoubleClick={() => onDoubleClick(index)}
             onTouchEnd={() => handleTap(index)}
             className="rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-blue-500/20 hover:border-blue-500/50" 
             style={{
               background: 'rgba(15, 23, 42, 0.6)',
               border: '1px solid rgba(59, 130, 246, 0.2)'
             }}
             title="Double click or double tap to edit"
           >
             {editingIndex === index ? (
               <input
                 type="text"
                 value={editValue}
                 onChange={(e) => onNameChange(e.target.value)}
                 onBlur={() => onNameSave(index)}
                 onKeyDown={(e) => onKeyDown(e, index)}
                 autoFocus
                 className="w-full bg-transparent text-xs text-blue-400 font-semibold uppercase tracking-wide text-center outline-none border-b border-blue-400"
                 style={{fontFamily: 'inherit'}}
               />
             ) : (
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>{source.name}</div>
              )}
              <div className="text-base text-white font-bold mt-1 test-font-numbers">0W</div>
           </div>
         ))}
       </div>
      <div className="text-xs text-slate-500 text-center mt-2 relative z-10 flex items-center justify-center gap-2">
        <Lightbulb size={14} />
        <span>Double click to rename sources</span>
      </div>
    </section>
  )
}
