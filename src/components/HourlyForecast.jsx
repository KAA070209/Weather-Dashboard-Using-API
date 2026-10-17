import { getWeatherIcon } from '../utils/weatherIcons'

const HourlyForecast = ({ forecast, unit }) => {
  if (!forecast || !forecast.list) return null

  const hours = forecast.list.slice(0, 6)
  const tempUnit = unit === 'metric' ? '°C' : '°F'

  const isNow = (dt) => {
    const now = new Date()
    const then = new Date(dt * 1000)
    return now.getHours() === then.getHours() && now.getDate() === then.getDate()
  }

  const getHour = (dt) => {
    return new Date(dt * 1000).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const getRainProb = (item) => {
    if (item.pop !== undefined) return Math.round(item.pop * 100)
    return 0
  }

  const maxTemp = Math.max(...hours.map(h => h.main.temp))
  const minTemp = Math.min(...hours.map(h => h.main.temp))

  const getBarWidth = (temp) => {
    const range = maxTemp - minTemp || 1
    return ((temp - minTemp) / range) * 100
  }

  return (
    <section className="hourly-forecast">
      <div className="section-header">
        <h3><span className="section-icon">🕐</span> Prakiraan 24 Jam</h3>
        <span className="section-badge">REAL-TIME SPLINE</span>
      </div>

      <div className="hourly-cards">
        {hours.map((item, i) => {
          const now = isNow(item.dt)
          return (
            <div key={i} className={`hourly-card ${now ? 'now' : ''}`}>
              <span className="hourly-time">
                {now ? 'SEKARANG' : getHour(item.dt)}
              </span>
              <span className="hourly-icon">
                {getWeatherIcon(item.weather[0].id)}
              </span>
              <span className="hourly-temp">
                {Math.round(item.main.temp)}°
              </span>
              <div className="hourly-bar-container">
                <div
                  className="hourly-bar"
                  style={{ width: `${Math.max(15, getBarWidth(item.main.temp))}%` }}
                ></div>
              </div>
              <span className="hourly-rain">{getRainProb(item)}%</span>
            </div>
          )
        })}
      </div>

      <div className="hourly-chart">
        <svg viewBox="0 0 600 80" className="spline-chart" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={generateSplinePath(hours, maxTemp, minTemp)}
            fill="url(#chartFill)"
          />
          <path
            d={generateSplineLine(hours, maxTemp, minTemp)}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
          />
          {hours.map((item, i) => {
            const x = (i / (hours.length - 1)) * 580 + 10
            const y = 70 - ((item.main.temp - minTemp) / (maxTemp - minTemp || 1)) * 50
            return (
              <circle key={i} cx={x} cy={y} r="4" fill="#06b6d4" stroke="#0f172a" strokeWidth="2" />
            )
          })}
        </svg>
      </div>
    </section>
  )
}

function getPoints(hours, maxTemp, minTemp) {
  return hours.map((item, i) => ({
    x: (i / (hours.length - 1)) * 580 + 10,
    y: 70 - ((item.main.temp - minTemp) / (maxTemp - minTemp || 1)) * 50,
  }))
}

function generateSplineLine(hours, maxTemp, minTemp) {
  const pts = getPoints(hours, maxTemp, minTemp)
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cpx1 = prev.x + (curr.x - prev.x) / 3
    const cpx2 = prev.x + (curr.x - prev.x) * 2 / 3
    d += ` C ${cpx1} ${prev.y} ${cpx2} ${curr.y} ${curr.x} ${curr.y}`
  }
  return d
}

function generateSplinePath(hours, maxTemp, minTemp) {
  const line = generateSplineLine(hours, maxTemp, minTemp)
  if (!line) return ''
  const pts = getPoints(hours, maxTemp, minTemp)
  const last = pts[pts.length - 1]
  const first = pts[0]
  return `${line} L ${last.x} 80 L ${first.x} 80 Z`
}

export default HourlyForecast
