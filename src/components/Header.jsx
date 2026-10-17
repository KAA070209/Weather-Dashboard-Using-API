import Notifications from './Notifications'

const Header = ({ city, unit, currentTime, weather, forecast, onToggleUnit, onOpenMenu }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onOpenMenu}>☰</button>
        <div className="location-display">
          <span className="location-pin">📍</span>
          <div>
            <span className="location-city">{city}</span>
            <span className="location-country">Indonesia</span>
          </div>
          <span className="location-chevron">▾</span>
        </div>
      </div>

      <div className="header-right">
        <div className="unit-toggle">
          <button
            className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
            onClick={onToggleUnit}
          >
            °C
          </button>
          <button
            className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={onToggleUnit}
          >
            °F
          </button>
        </div>

        <div className="header-time">
          <span className="time-icon">🕐</span>
          <span>{formatTime(currentTime)} WIB</span>
        </div>

        <div className="header-live">
          <span className="live-dot"></span>
          <span>Live</span>
        </div>

        <Notifications weather={weather} forecast={forecast} />

        <div className="header-user">
          <div className="user-avatar">MSN</div>
          <div className="user-info">
            <span className="user-role">Muhammad Azka Sa'adi Nabhan</span>
            <span className="user-id">Observer 04</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
