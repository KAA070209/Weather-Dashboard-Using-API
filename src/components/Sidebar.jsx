const Sidebar = ({ activePage, onNavigate, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'radar', label: 'Radar & Peta', icon: '⊙' },
    { id: 'forecast', label: 'Prakiraan Jam & 7 Hari', icon: '☰' },
    { id: 'airquality', label: 'Kualitas Udara & Kesehatan', icon: '≋' },
    { id: 'analytics', label: 'Analitik', icon: '⊞' },
    { id: 'settings', label: 'Pengaturan', icon: '⚙' },
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0ea5e9" opacity="0.2" />
              <circle cx="16" cy="16" r="8" stroke="#06b6d4" strokeWidth="2" fill="none" />
              <circle cx="16" cy="16" r="4" fill="#06b6d4" />
              <line x1="16" y1="2" x2="16" y2="8" stroke="#06b6d4" strokeWidth="2" />
              <line x1="16" y1="24" x2="16" y2="30" stroke="#06b6d4" strokeWidth="2" />
              <line x1="2" y1="16" x2="8" y2="16" stroke="#06b6d4" strokeWidth="2" />
              <line x1="24" y1="16" x2="30" y2="16" stroke="#06b6d4" strokeWidth="2" />
            </svg>
          </div>
          <span className="logo-text">SkyPulse</span>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => { onNavigate(item.id); onClose() }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="station-live">
            <span className="live-dot"></span>
            <div>
              <span className="station-label">STATION LIVE</span>
              <span className="station-version">v2.4.0</span>
            </div>
          </div>
          <p className="station-desc">Doppler Echo Mesh Online</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
