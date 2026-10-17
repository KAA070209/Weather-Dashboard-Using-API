const MetricsGrid = ({ weather, unit }) => {
  if (!weather) return null

  const windSpeed = unit === 'metric'
    ? `${weather.wind.speed} km/j`
    : `${weather.wind.speed} mph`
  const visibility = weather.visibility
    ? (weather.visibility / 1000).toFixed(1)
    : '—'

  const getWindDirection = (deg) => {
    const dirs = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL']
    const index = Math.round(deg / 45) % 8
    return dirs[index]
  }

  const getWindArrow = (deg) => {
    return `↑`
  }

  const humidity = weather.main.humidity
  const getHumidityLabel = (h) => {
    if (h >= 80) return { text: 'Lembap', color: '#06b6d4' }
    if (h >= 60) return { text: 'Normal', color: '#10b981' }
    if (h >= 40) return { text: 'Kering', color: '#f59e0b' }
    return { text: 'Sangat Kering', color: '#ef4444' }
  }

  const humidityInfo = getHumidityLabel(humidity)

  const pressure = weather.main.pressure
  const getPressureLabel = (p) => {
    if (p >= 1020) return { text: 'Tinggi', color: '#3b82f6' }
    if (p >= 1000) return { text: 'Normal', color: '#10b981' }
    return { text: 'Rendah', color: '#f59e0b' }
  }
  const pressureInfo = getPressureLabel(pressure)

  const getVisibilityLabel = (v) => {
    const vNum = parseFloat(v)
    if (vNum >= 10) return { text: 'Jernih', color: '#10b981' }
    if (vNum >= 5) return { text: 'Sedang', color: '#f59e0b' }
    return { text: 'Kabut', color: '#ef4444' }
  }
  const visInfo = getVisibilityLabel(visibility)

  return (
    <section className="metrics-section">
      <div className="section-header">
        <h3><span className="section-icon">📊</span> Metrik Cuaca Mendalam</h3>
        <span className="section-subtitle">Data Sensor Terintegrasi</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">KELEMBAPAN RELATIF</span>
            <span className="metric-card-icon">💧</span>
          </div>
          <div className="metric-card-value">
            {humidity}%
            <span className="metric-badge" style={{ background: humidityInfo.color + '22', color: humidityInfo.color }}>
              {humidityInfo.text}
            </span>
          </div>
          <div className="metric-bar-track">
            <div
              className="metric-bar-fill"
              style={{ width: `${humidity}%`, background: humidityInfo.color }}
            ></div>
          </div>
          <p className="metric-card-note">Titik embun saat ini: {weather.main.temp}°C</p>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">TEKANAN UDARA</span>
            <span className="metric-card-icon">◈</span>
          </div>
          <div className="metric-card-value">
            {pressure}<small className="metric-unit"> hPa</small>
            <span className="metric-badge" style={{ background: pressureInfo.color + '22', color: pressureInfo.color }}>
              {pressureInfo.text}
            </span>
          </div>
          <div className="metric-bar-track">
            <div
              className="metric-bar-fill"
              style={{
                width: `${Math.min(100, Math.max(0, ((pressure - 980) / 60) * 100))}%`,
                background: pressureInfo.color,
              }}
            ></div>
          </div>
          <p className="metric-card-note">Tren 6 jam terakhir stabil</p>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">JARAK PANDANG</span>
            <span className="metric-card-icon">👁</span>
          </div>
          <div className="metric-card-value">
            {visibility}<small className="metric-unit"> km</small>
            <span className="metric-badge" style={{ background: visInfo.color + '22', color: visInfo.color }}>
              {visInfo.text}
            </span>
          </div>
          <div className="metric-bar-track">
            <div
              className="metric-bar-fill"
              style={{ width: `${Math.min(100, (parseFloat(visibility) / 20) * 100)}%`, background: visInfo.color }}
            ></div>
          </div>
          <p className="metric-card-note">{visibility === '—' ? 'Data tidak tersedia' : `Jarak pandang ${visibility} km`}</p>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">ANGIN & KOMPAS</span>
            <span className="metric-card-icon">🧭</span>
          </div>
          <div className="metric-card-value">
            {weather.wind.speed}
            <small className="metric-unit"> {unit === 'metric' ? 'm/s' : 'mph'}</small>
          </div>
          <div className="wind-compass">
            <div className="compass-circle">
              <span className="compass-direction">
                {weather.wind.deg !== undefined ? getWindDirection(weather.wind.deg) : '—'}
              </span>
              <span className="compass-arrow">
                {weather.wind.deg !== undefined ? `↑${weather.wind.deg}°` : '—'}
              </span>
            </div>
          </div>
          <p className="metric-card-note">Arah: {weather.wind.deg !== undefined ? `${weather.wind.deg}°` : '—'}</p>
        </div>

        <div className="metric-card metric-placeholder">
          <div className="metric-card-header">
            <span className="metric-card-label">INDEKS UV</span>
            <span className="metric-card-icon">☀</span>
          </div>
          <div className="metric-card-value">
            <span className="metric-coming-soon">—</span>
            <span className="metric-badge" style={{ background: '#64748b22', color: '#94a3b8' }}>
              Data Tidak Tersedia
            </span>
          </div>
          <p className="metric-card-note">Indeks UV memerlukan langganan premium</p>
        </div>

        <div className="metric-card metric-placeholder">
          <div className="metric-card-header">
            <span className="metric-card-label">KUALITAS UDARA (AQI)</span>
            <span className="metric-card-icon">🍃</span>
          </div>
          <div className="metric-card-value">
            <span className="metric-coming-soon">—</span>
            <span className="metric-badge" style={{ background: '#64748b22', color: '#94a3b8' }}>
              Data Tidak Tersedia
            </span>
          </div>
          <p className="metric-card-note">AQI memerlukan langganan premium</p>
        </div>
      </div>
    </section>
  )
}

export default MetricsGrid
