import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const API_KEY = 'c99b15fa19725c13a670a1d89c661a33'
const CARTO_KEY = 'cb1_4k2g_1_0679415a9e0ebc0d3ece9e09'

const weatherLayers = [
  { id: 'precipitation', name: 'Hujan & Presipitasi', url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`, color: '#3b82f6' },
  { id: 'clouds', name: 'Awan', url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, color: '#94a3b8' },
  { id: 'wind', name: 'Angin', url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`, color: '#10b981' },
  { id: 'temp', name: 'Suhu', url: `https://tile.openweathermap.org/map/temperature_new/{z}/{x}/{y}.png?appid=${API_KEY}`, color: '#ef4444' },
  { id: 'pressure', name: 'Tekanan', url: `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`, color: '#8b5cf6' },
]

const cityMarkers = [
  { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Bandung', lat: -6.9175, lon: 107.6191 },
  { name: 'Surabaya', lat: -7.2575, lon: 112.7521 },
  { name: 'Denpasar', lat: -8.6705, lon: 115.2126 },
  { name: 'Yogyakarta', lat: -7.7956, lon: 110.3695 },
  { name: 'Medan', lat: 3.5952, lon: 98.6722 },
  { name: 'Makassar', lat: -5.1477, lon: 119.4327 },
  { name: 'Palembang', lat: -2.9761, lon: 104.7754 },
]

const customIcon = L.divIcon({
  html: '<div style="background:#06b6d4;width:12px;height:12px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 10px rgba(6,182,212,0.5)"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  className: 'custom-marker',
})

const MapUpdater = ({ center }) => {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView(center, 10)
    }
  }, [center, map])
  return null
}

const RadarMap = ({ weather }) => {
  const [activeLayer, setActiveLayer] = useState('precipitation')
  const [searchInput, setSearchInput] = useState('')
  const [currentCenter, setCurrentCenter] = useState([-6.2088, 106.8456])
  const [showMarkers, setShowMarkers] = useState(true)

  useEffect(() => {
    if (weather && weather.coord) {
      setCurrentCenter([weather.coord.lat, weather.coord.lon])
    }
  }, [weather])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)}&limit=1&appid=${API_KEY}`
      )
      const data = await res.json()
      if (data.length > 0) {
        setCurrentCenter([data[0].lat, data[0].lon])
      }
    } catch {
      const found = cityMarkers.find(c =>
        c.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      if (found) setCurrentCenter([found.lat, found.lon])
    }
  }

  const activeLayerData = weatherLayers.find(l => l.id === activeLayer)

  return (
    <div className="radar-page">
      <div className="radar-header">
        <div className="radar-title">
          <h2>🎯 Radar Cuaca & Peta Interaktif</h2>
          <p>Pantau kondisi cuaca real-time di seluruh Indonesia</p>
        </div>

        <form className="radar-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari lokasi di peta..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Cari</button>
        </form>
      </div>

      <div className="radar-controls">
        <div className="radar-layer-tabs">
          {weatherLayers.map((layer) => (
            <button
              key={layer.id}
              className={`radar-layer-tab ${activeLayer === layer.id ? 'active' : ''}`}
              onClick={() => setActiveLayer(layer.id)}
            >
              <span
                className="layer-dot"
                style={{ background: layer.color }}
              ></span>
              {layer.name}
            </button>
          ))}
        </div>

        <div className="radar-options">
          <label className="radar-toggle">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={() => setShowMarkers(!showMarkers)}
            />
            <span>Tampilkan Kota</span>
          </label>
        </div>
      </div>

      <div className="radar-map-wrapper">
        <MapContainer
          center={currentCenter}
          zoom={6}
          className="radar-map"
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer
            url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />

          {activeLayerData && (
            <TileLayer
              url={activeLayerData.url}
              opacity={0.6}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}

          {showMarkers && cityMarkers.map((city, i) => (
            <Marker key={i} position={[city.lat, city.lon]} icon={customIcon}>
              <Popup>
                <div className="city-popup">
                  <strong>{city.name}</strong>
                  <p className="popup-coords">
                    {city.lat.toFixed(4)}°, {city.lon.toFixed(4)}°
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {weather && weather.coord && (
            <Marker position={[weather.coord.lat, weather.coord.lon]}>
              <Popup>
                <div className="city-popup">
                  <strong>📍 {weather.name}</strong>
                  <p>🌡️ {Math.round(weather.main.temp)}°C</p>
                  <p>🌤️ {weather.weather[0].description}</p>
                  <p>💧 {weather.main.humidity}%</p>
                </div>
              </Popup>
            </Marker>
          )}

          <MapUpdater center={currentCenter} />
        </MapContainer>

        <div className="radar-legend">
          <h4>Layer Aktif</h4>
          <div className="legend-item">
            <span className="legend-color" style={{ background: activeLayerData?.color }}></span>
            <span>{activeLayerData?.name}</span>
          </div>
          <div className="legend-info">
            <p>📍 Marker biru = lokasi kota</p>
            <p>🎯 Titik besar = kota aktif</p>
          </div>
        </div>
      </div>

      <div className="radar-quick-cities">
        <h4>Kota Populer</h4>
        <div className="quick-city-list">
          {cityMarkers.map((city, i) => (
            <button
              key={i}
              className="quick-city-btn"
              onClick={() => setCurrentCenter([city.lat, city.lon])}
            >
              📍 {city.name}
            </button>
          ))}
        </div>
      </div>

      <div className="radar-coords">
        <span>
          Posisi Peta: {currentCenter[0].toFixed(4)}°, {currentCenter[1].toFixed(4)}°
        </span>
        <span>Layer: {activeLayerData?.name} | Data: OpenWeatherMap</span>
      </div>
    </div>
  )
}

export default RadarMap
