const Footer = ({ weather }) => {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <span className="footer-dot"></span>
        <span>Jaringan Telemetri Cuaca Terhubung</span>
      </div>
      <div className="footer-center">
        <span>Protokol MQTT v3.1 Aktif</span>
      </div>
      <div className="footer-right">
        <span>
          Kalibrasi Sensor:{' '}
          {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })} WIB
        </span>
      </div>
    </footer>
  )
}

export default Footer
