const AlertBanner = ({ type = 'warning', title, message }) => {
  return (
    <div className={`alert-banner ${type}`}>
      <div className="alert-icon">
        {type === 'error' ? '⚠' : '⚠'}
      </div>
      <div className="alert-content">
        <span className="alert-title">{title}</span>
        <span className="alert-message">{message}</span>
      </div>
      <button className="alert-action">Detail →</button>
    </div>
  )
}

export default AlertBanner
