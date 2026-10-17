import { useState } from 'react'
import { getWeatherIcon } from '../utils/weatherIcons'

const FavoriteCities = ({ favorites, unit, onAddFavorite }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [newCity, setNewCity] = useState('')
  const tempUnit = unit === 'metric' ? '°C' : '°F'

  const handleAdd = (e) => {
    e.preventDefault()
    if (newCity.trim()) {
      onAddFavorite(newCity.trim())
      setNewCity('')
      setShowAdd(false)
    }
  }

  return (
    <section className="favorite-cities">
      <div className="section-header">
        <h3><span className="section-icon">⭐</span> Kota Pantauan Favorit</h3>
        <button className="fav-add-btn" onClick={() => setShowAdd(!showAdd)}>+</button>
      </div>

      {showAdd && (
        <form className="fav-add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Nama kota..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            autoFocus
          />
          <button type="submit">Tambah</button>
        </form>
      )}

      <div className="fav-list">
        {favorites.map((city, i) => {
          if (!city) return null
          return (
            <div key={i} className="fav-item">
              <div className="fav-info">
                <span className="fav-city">{city.name}</span>
                <span className="fav-condition">
                  {getWeatherIcon(city.weather[0].id)} {city.weather[0].description}
                </span>
              </div>
              <div className="fav-temp-section">
                <span className="fav-temp">{Math.round(city.main.temp)}{tempUnit}</span>
                <span className="fav-range">
                  {Math.round(city.main.temp_min)}° / {Math.round(city.main.temp_max)}°
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FavoriteCities
