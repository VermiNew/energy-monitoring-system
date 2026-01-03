interface StorageDevice {
  id: number
  capacity: string
  temperature: number | null
  voltage: string | null
  level: number
  current: string | null
  error?: boolean
}

export function StorageSection() {
  const storages: StorageDevice[] = [
    {
      id: 1,
      capacity: '3kWh',
      temperature: 15,
      voltage: '52.30V',
      level: 30,
      current: '-0.11A'
    },
    {
      id: 2,
      capacity: '3kWh',
      temperature: 16,
      voltage: '52.30V',
      level: 28,
      current: '-0.16A'
    },
    {
      id: 3,
      capacity: 'DC',
      temperature: null,
      voltage: null,
      level: 0,
      current: null,
      error: true
    }
  ]

  return (
    <section className="storage-section">
      <h3 className="storage-title">Storage and Conversion</h3>
      <div className="storage-grid">
        {storages.map((storage) => (
          <div
            key={storage.id}
            className={`storage-card ${storage.error ? 'error' : ''}`}
          >
            {!storage.error ? (
              <>
                <div className="storage-header">
                  <div className="storage-id">{storage.id}</div>
                  <div className="storage-capacity">{storage.capacity}</div>
                </div>
                <div className="storage-info">
                  <div className="info-row">
                    <span className="info-label">🌡️</span>
                    <span className="info-value">{storage.temperature}°C</span>
                  </div>
                  <div className="info-row">
                    <span className="info-value voltage">{storage.voltage}</span>
                  </div>
                </div>
                <div className="storage-level">
                  <div className="level-percentage">{storage.level}%</div>
                  <div className="level-current">{storage.current}</div>
                </div>
              </>
            ) : (
              <div className="error-content">
                <div className="error-label">DC</div>
                <button className="error-button">✕</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
