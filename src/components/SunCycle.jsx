import { getWeatherIcon } from '../utils/weatherIcons'

const SunCycle = ({ weather, currentTime }) => {
  if (!weather || !weather.sys) return null

  const sunrise = new Date(weather.sys.sunrise * 1000)
  const sunset = new Date(weather.sys.sunset * 1000)

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const now = currentTime
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const sunriseMinutes = sunrise.getHours() * 60 + sunrise.getMinutes()
  const sunsetMinutes = sunset.getHours() * 60 + sunset.getMinutes()

  const isDaytime = nowMinutes >= sunriseMinutes && nowMinutes <= sunsetMinutes
  const remainingDay = Math.max(0, sunsetMinutes - nowMinutes)
  const remainingHours = Math.floor(remainingDay / 60)
  const remainingMins = remainingDay % 60

  const progress = isDaytime
    ? (nowMinutes - sunriseMinutes) / (sunsetMinutes - sunriseMinutes)
    : 0

  const arcRadius = 90
  const arcCx = 110
  const arcCy = 100
  const startAngle = 180
  const endAngle = 0
  const currentAngle = startAngle - progress * (startAngle - endAngle)

  const sunX = arcCx + arcRadius * Math.cos((currentAngle * Math.PI) / 180)
  const sunY = arcCy - arcRadius * Math.sin((currentAngle * Math.PI) / 180)

  const arcPath = `M ${arcCx - arcRadius} ${arcCy} A ${arcRadius} ${arcRadius} 0 0 1 ${arcCx + arcRadius} ${arcCy}`
  const filledPath = progress > 0
    ? `M ${arcCx - arcRadius} ${arcCy} A ${arcRadius} ${arcRadius} 0 ${progress > 0.5 ? 1 : 0} 1 ${sunX} ${sunY}`
    : ''

  return (
    <section className="sun-cycle">
      <div className="section-header">
        <h3><span className="section-icon">🌅</span> Siklus Matahari & Bulan</h3>
        <span className="section-timezone">WIB (UTC+7)</span>
      </div>

      <div className="sun-arc-container">
        <svg viewBox="0 0 220 120" className="sun-arc-svg">
          <path
            d={arcPath}
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {progress > 0 && (
            <path
              d={filledPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}
          <circle cx={arcCx - arcRadius} cy={arcCy} r="3" fill="#64748b" />
          <circle cx={arcCx + arcRadius} cy={arcCy} r="3" fill="#64748b" />
          {isDaytime && (
            <g>
              <circle cx={sunX} cy={sunY} r="10" fill="#f59e0b" opacity="0.2" />
              <circle cx={sunX} cy={sunY} r="6" fill="#f59e0b" />
            </g>
          )}
          {!isDaytime && (
            <g>
              <circle cx={arcCx} cy={arcCy - arcRadius + 5} r="8" fill="#e2e8f0" opacity="0.2" />
              <circle cx={arcCx} cy={arcCy - arcRadius + 5} r="5" fill="#e2e8f0" />
            </g>
          )}
        </svg>

        <div className="sun-times">
          <div className="sun-time">
            <span className="sun-label">Terbit</span>
            <span className="sun-value">{formatTime(sunrise)}</span>
          </div>
          <div className="sun-position-label">
            {isDaytime ? '☀️ Siang' : '🌙 Malam'}
          </div>
          <div className="sun-time">
            <span className="sun-label">Terbenam</span>
            <span className="sun-value">{formatTime(sunset)}</span>
          </div>
        </div>
      </div>

      {isDaytime ? (
        <div className="sun-remaining">
          <span className="sun-remaining-icon">⏳</span>
          <span>Sisa waktu siang:</span>
          <span className="sun-remaining-value">{remainingHours} jam {remainingMins} menit</span>
        </div>
      ) : (
        <div className="sun-remaining">
          <span className="sun-remaining-icon">🌙</span>
          <span>Status:</span>
          <span className="sun-remaining-value">Malam hari</span>
        </div>
      )}

      <div className="moon-phase">
        <div className="moon-icon">🌙</div>
        <div className="moon-info">
          <span className="moon-label">FASE BULAN</span>
          <span className="moon-name">Bulan Sabit</span>
        </div>
        <span className="moon-illumination">~25% Terang</span>
      </div>
    </section>
  )
}

export default SunCycle
