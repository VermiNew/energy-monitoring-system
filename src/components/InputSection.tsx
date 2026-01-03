interface InputSectionProps {
  inputPower: number
  sourceNames: string[]
  editingIndex: number | null
  editValue: string
  onDoubleClick: (index: number) => void
  onNameChange: (value: string) => void
  onNameSave: (index: number) => void
  onKeyDown: (e: React.KeyboardEvent, index: number) => void
}

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
  return (
    <section className="rounded-2xl p-6 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #1e3a5f 0%, #0f2744 100%)',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }}>
      <div className="absolute -top-1/2 -right-1/5 w-48 h-48 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
      }} />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <h2 className="text-sm font-semibold text-slate-400 tracking-widest uppercase m-0">Input</h2>
        <div className="w-2 h-2 rounded-full" style={{
          background: inputPower > 0 ? '#10b981' : '#64748b',
          boxShadow: inputPower > 0 ? '0 0 12px #10b981' : 'none'
        }} />
      </div>

      <div className="mb-6 relative z-10">
        <div className="flex items-baseline gap-2">
          <span className="text-7xl font-bold text-white leading-none test-font-numbers">
            {inputPower}
          </span>
          <span className="text-3xl text-slate-500 mb-2" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>W</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 relative z-10">
        {sourceNames.map((source, index) => (
          <div 
            key={index}
            onDoubleClick={() => onDoubleClick(index)}
            className="rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-blue-500/20 hover:border-blue-500/50" 
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
            title="Double click to edit"
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
               <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide" style={{fontFamily: '"Orbitron", -apple-system, sans-serif'}}>{source}</div>
             )}
             <div className="text-base text-white font-bold mt-1 test-font-numbers">0W</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-500 text-center mt-2 relative z-10">
        💡 Double click to rename sources
      </div>
    </section>
  )
}
