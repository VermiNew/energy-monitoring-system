import { useState } from 'react'

export function InputSection() {
  const [inputPower] = useState(0)
  const sourceNames = ['SN1', 'SN2', 'SN3', 'SN4']

  return (
    <section className="input-section">
      <div className="power-display">
        <span className="power-value">{inputPower}</span>
        <span className="power-unit">W</span>
      </div>

      <div className="sources-grid">
        {sourceNames.map((source, index) => (
          <div key={index} className="source-item">
            <div className="source-name">{source}</div>
            <div className="source-power">0W</div>
          </div>
        ))}
      </div>
    </section>
  )
}
