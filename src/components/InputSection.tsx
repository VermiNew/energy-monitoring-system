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
    <section className="input-section">
      <div className="power-display">
        <span className="power-value">{inputPower}</span>
        <span className="power-unit">W</span>
      </div>

      <div className="sources-grid">
        {sourceNames.map((source, index) => (
          <div 
            key={index} 
            className="source-item"
            onDoubleClick={() => onDoubleClick(index)}
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
                className="source-input"
                style={{fontFamily: 'inherit'}}
              />
            ) : (
              <div className="source-name">{source}</div>
            )}
            <div className="source-power">0W</div>
          </div>
        ))}
      </div>
      <div className="edit-hint">💡 Double click to rename sources</div>
    </section>
  )
}
