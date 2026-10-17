import { useState, useEffect, useRef } from 'react'

const Notifications = ({ weather, forecast }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!weather) return

    const newNotifs = []
    const now = new Date()

    newNotifs.push({
      id: 1,
      type: 'info',
      icon: '🔄',
      title: 'Stasiun Aktif',
      message: `Data cuaca ${weather.name} berhasil diperbarui.`,
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
      read: false,
    })

    if (weather.main.temp >= 35) {
      newNotifs.push({
        id: 2,
        type: 'warning',
        icon: '🌡️',
        title: 'Suhu Tinggi',
        message: `Suhu di ${weather.name} mencapai ${Math.round(weather.main.temp)}°C. Waspadai dehidrasi.`,
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
        read: false,
      })
    }

    if (weather.wind.speed >= 10) {
      newNotifs.push({
        id: 3,
        type: 'warning',
        icon: '💨',
        title: 'Angin Kencang',
        message: `Kecepatan angin ${weather.name} ${weather.wind.speed} m/s. Hati-hati di luar ruangan.`,
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
        read: false,
      })
    }

    if (weather.main.humidity >= 80) {
      newNotifs.push({
        id: 4,
        type: 'info',
        icon: '💧',
        title: 'Kelembapan Tinggi',
        message: `Kelembapan udara ${weather.name} ${weather.main.humidity}%.`,
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
        read: true,
      })
    }

    if (weather.visibility && weather.visibility < 5000) {
      newNotifs.push({
        id: 5,
        type: 'warning',
        icon: '🌫️',
        title: 'Jarak Pandang Rendah',
        message: `Jarak pandang ${weather.name} hanya ${(weather.visibility / 1000).toFixed(1)} km. Hati-hati berkendara.`,
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
        read: false,
      })
    }

    if (forecast && forecast.list) {
      const rainItems = forecast.list.slice(0, 8).filter(i => i.pop >= 0.5)
      if (rainItems.length > 0) {
        newNotifs.push({
          id: 6,
          type: 'info',
          icon: '🌧️',
          title: 'Prakiraan Hujan',
          message: `Hujan diperkirakan dalam beberapa jam ke depan di ${weather.name}.`,
          time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
          read: false,
        })
      }
    }

    newNotifs.push({
      id: 7,
      type: 'success',
      icon: '✅',
      title: 'Sistem Terhubung',
      message: 'Jaringan telemetri cuaca terhubung. Semua sensor berfungsi normal.',
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
      read: true,
    })

    setNotifications(newNotifs)
    setUnreadCount(newNotifs.filter(n => !n.read).length)
  }, [weather, forecast])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const clearAll = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  const getTypeClass = (type) => {
    switch (type) {
      case 'warning': return 'notif-warning'
      case 'error': return 'notif-error'
      case 'success': return 'notif-success'
      default: return 'notif-info'
    }
  }

  return (
    <div className="notifications-wrapper" ref={panelRef}>
      <button
        className={`header-bell ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🔔</span>
        {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notif-panel">
          <div className="notif-header">
            <h4>Notifikasi</h4>
            <div className="notif-actions">
              <button onClick={markAllAsRead} className="notif-action-btn">
                Tandai semua dibaca
              </button>
              <button onClick={clearAll} className="notif-action-btn danger">
                Hapus semua
              </button>
            </div>
          </div>

          <div className="notif-list">
            {notifications.length === 0 ? (
              <div className="notif-empty">
                <span className="notif-empty-icon">🔕</span>
                <p>Tidak ada notifikasi</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-item ${notif.read ? 'read' : 'unread'} ${getTypeClass(notif.type)}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notif-item-icon">{notif.icon}</div>
                  <div className="notif-item-content">
                    <div className="notif-item-header">
                      <span className="notif-item-title">{notif.title}</span>
                      <span className="notif-item-time">{notif.time}</span>
                    </div>
                    <p className="notif-item-message">{notif.message}</p>
                  </div>
                  {!notif.read && <div className="notif-unread-dot"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
