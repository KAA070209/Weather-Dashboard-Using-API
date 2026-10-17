import { getWeatherIcon, getWeatherDescription } from '../utils/weatherIcons'

const DailyForecast = ({ forecast, unit }) => {
  if (!forecast || !forecast.list) return null

  const tempUnit = unit === 'metric' ? '°C' : '°F'

  const dailyMap = {}
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const key = date.toISOString().split('T')[0]
    if (!dailyMap[key]) {
      dailyMap[key] = {
        date,
        temps: [],
        icons: [],
        descs: [],
        pops: [],
      }
    }
    dailyMap[key].temps.push(item.main.temp)
    dailyMap[key].icons.push(item.weather[0].id)
    dailyMap[key].descs.push(item.weather[0].description)
    if (item.pop !== undefined) dailyMap[key].pops.push(item.pop)
  })

  const daily = Object.entries(dailyMap).slice(0, 7).map(([key, val]) => {
    const maxTemp = Math.max(...val.temps)
    const minTemp = Math.min(...val.temps)
    const midIcon = val.icons[Math.floor(val.icons.length / 2)]
    const midDesc = val.descs[Math.floor(val.descs.length / 2)]
    const avgPop = val.pops.length > 0
      ? Math.round(val.pops.reduce((a, b) => a + b, 0) / val.pops.length * 100)
      : 0
    return { date: val.date, maxTemp, minTemp, icon: midIcon, desc: midDesc, pop: avgPop }
  })

  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

  const getDayLabel = (date, index) => {
    if (index === 0) return 'Hari Ini'
    if (index === 1) return 'Besok'
    return dayNames[date.getDay()]
  }

  const getTempColor = (temp) => {
    if (temp >= 33) return '#ef4444'
    if (temp >= 28) return '#f59e0b'
    if (temp >= 22) return '#10b981'
    return '#3b82f6'
  }

  return (
    <section className="daily-forecast">
      <div className="section-header">
        <h3><span className="section-icon">📅</span> Prakiraan 7 Hari</h3>
        <span className="section-badge-sm">MINGGU INI</span>
      </div>

      <div className="daily-list">
        {daily.map((day, i) => (
          <div key={i} className={`daily-item ${i === 0 ? 'today' : ''}`}>
            <div className="daily-date">
              <span className="daily-day-name">{getDayLabel(day.date, i)}</span>
              <span className="daily-day-num">
                {day.date.getDate()} {monthNames[day.date.getMonth()]}
              </span>
            </div>
            <span className="daily-icon">{getWeatherIcon(day.icon)}</span>
            <span className="daily-desc">{day.desc}</span>
            <div className="daily-temps">
              <span className="daily-min">{Math.round(day.minTemp)}°</span>
              <div className="daily-bar">
                <div
                  className="daily-bar-fill"
                  style={{
                    background: `linear-gradient(90deg, #3b82f6, ${getTempColor(day.maxTemp)})`,
                  }}
                ></div>
              </div>
              <span className="daily-max">{Math.round(day.maxTemp)}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DailyForecast
