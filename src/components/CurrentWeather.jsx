import { getWeatherIcon, getWeatherDescription } from '../utils/weatherIcons'

const CurrentWeather = ({ weather, unit }) => {
  if (!weather) return null

  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph'
  const icon = getWeatherIcon(weather.weather[0].id)
  const desc = weather.weather[0].description
  const descId = weather.weather[0].main

  const now = new Date()
  const sunrise = new Date(weather.sys.sunrise * 1000)
  const sunset = new Date(weather.sys.sunset * 1000)

  const formatCoord = (val, positive, negative) => {
    return `${Math.abs(val).toFixed(4)}° ${val >= 0 ? positive : negative}`
  }

  return (
    <section className="current-weather">
      <div className="cw-left">
        <div className="cw-location">
          <h2>
            <span className="cw-pin">◉</span> {weather.name}, {weather.sys.country}
          </h2>
          <p className="cw-coords">
            {formatCoord(weather.coord.lat, 'N', 'S')}, {formatCoord(weather.coord.lon, 'E', 'W')}
          </p>
          <p className="cw-station">Stasiun Aktif (Auto)</p>
          <p className="cw-updated">
            Terakhir diperbarui: {now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })},{' '}
            {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })} WIB · Stasiun Aktif
          </p>
        </div>

        <div className="cw-temp-section">
          <span className="cw-temp">{Math.round(weather.main.temp)}{tempUnit}</span>
          <div className="cw-condition">
            <span className="cw-condition-icon">{icon}</span>
            <span className="cw-condition-text">{desc}</span>
          </div>
          <div className="cw-feels">
            <span>Terasa seperti {Math.round(weather.main.feels_like)}{tempUnit}</span>
            <span className="cw-range">
              ↑{Math.round(weather.main.temp_max)}° ↓{Math.round(weather.main.temp_min)}°
            </span>
          </div>
        </div>

        <div className="cw-description">
          <p>
            <span className="cw-desc-icon">ⓘ</span>{' '}
            {descId} — suhu terasa {Math.round(weather.main.feels_like)}
            {tempUnit}, kelembapan {weather.main.humidity}%, angin{' '}
            {weather.wind.speed} {speedUnit}.
          </p>
        </div>
      </div>

      <div className="cw-right">
        <div className="cw-illustration">
          <span className="cw-illustration-icon">{icon}</span>
        </div>

        <div className="cw-metrics">
          <div className="cw-metric">
            <span className="cw-metric-label">TEKANAN</span>
            <span className="cw-metric-value">{weather.main.pressure}<small> hPa</small></span>
          </div>
          <div className="cw-metric">
            <span className="cw-metric-label">KELEMBAPAN</span>
            <span className="cw-metric-value">{weather.main.humidity}<small>%</small></span>
          </div>
          <div className="cw-metric">
            <span className="cw-metric-label">JARAK PANDANG</span>
            <span className="cw-metric-value">
              {weather.visibility ? (weather.visibility / 1000).toFixed(1) : '—'}
              <small> km</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather
