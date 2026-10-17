import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AlertBanner from './components/AlertBanner'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import SunCycle from './components/SunCycle'
import DailyForecast from './components/DailyForecast'
import MetricsGrid from './components/MetricsGrid'
import FavoriteCities from './components/FavoriteCities'
import Footer from './components/Footer'
import RadarMap from './components/RadarMap'

const API_KEY = 'c99b15fa19725c13a670a1d89c661a33'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const App = () => {
  const [activePage, setActivePage] = useState('dashboard')
  const [city, setCity] = useState('Jakarta')
  const [unit, setUnit] = useState('metric')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState([
    'Bandung', 'Surabaya', 'Denpasar', 'Yogyakarta'
  ])
  const [favoriteWeathers, setFavoriteWeathers] = useState([])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName.trim()) {
      setError('Masukkan nama kota terlebih dahulu.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      )
      if (!weatherRes.ok) {
        if (weatherRes.status === 404) throw new Error(`Kota "${cityName}" tidak ditemukan. Coba periksa ejaannya.`)
        if (weatherRes.status === 401) throw new Error('Kunci API tidak valid. Tunggu aktivasi beberapa jam.')
        throw new Error('Gagal mengambil data cuaca. Coba lagi nanti.')
      }
      const weatherData = await weatherRes.json()

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      )
      let forecastData = null
      if (forecastRes.ok) {
        forecastData = await forecastRes.json()
      }

      setCurrentWeather(weatherData)
      setForecast(forecastData)
    } catch (err) {
      setError(err.message)
      setCurrentWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeather(city)
  }, [fetchWeather, city])

  useEffect(() => {
    const fetchFavorites = async () => {
      const results = await Promise.allSettled(
        favorites.map(async (fCity) => {
          const res = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(fCity)}&appid=${API_KEY}&units=metric`
          )
          if (!res.ok) return null
          return res.json()
        })
      )
      setFavoriteWeathers(results.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean))
    }
    fetchFavorites()
  }, [favorites])

  const handleSearch = (searchCity) => {
    setCity(searchCity)
  }

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')
  }

  const addFavorite = (favCity) => {
    if (!favorites.includes(favCity)) {
      setFavorites(prev => [...prev, favCity])
    }
  }

  const renderDashboard = () => (
    <>
      {error && (
        <AlertBanner type="error" title="ERROR" message={error} />
      )}

      {!error && currentWeather && (
        <>
          <CurrentWeather weather={currentWeather} unit={unit} />
          <div className="middle-grid">
            <div className="middle-left">
              <HourlyForecast forecast={forecast} unit={unit} />
            </div>
            <div className="middle-right">
              <SunCycle weather={currentWeather} currentTime={currentTime} />
            </div>
          </div>
          <div className="bottom-grid">
            <div className="bottom-left">
              <MetricsGrid weather={currentWeather} unit={unit} />
            </div>
            <div className="bottom-right">
              <DailyForecast forecast={forecast} unit={unit} />
              <FavoriteCities
                favorites={favoriteWeathers}
                unit={unit}
                onAddFavorite={addFavorite}
              />
            </div>
          </div>
        </>
      )}
    </>
  )

  const renderForecastPage = () => (
    <>
      {error && (
        <AlertBanner type="error" title="ERROR" message={error} />
      )}
      {!error && currentWeather && (
        <>
          <CurrentWeather weather={currentWeather} unit={unit} />
          <HourlyForecast forecast={forecast} unit={unit} />
          <DailyForecast forecast={forecast} unit={unit} />
        </>
      )}
    </>
  )

  const renderRadarPage = () => (
    <RadarMap weather={currentWeather} />
  )

  const renderAirQualityPage = () => (
    <div className="placeholder-page">
      <h2>🍃 Kualitas Udara & Kesehatan</h2>
      <p>Halaman ini memerlukan API langganan premium (OpenWeather Air Pollution).</p>
      <p className="placeholder-note">
        Upgrade ke plan Berbayar untuk mengakses data kualitas udara, indeks UV, dan rekomendasi kesehatan.
      </p>
      {currentWeather && (
        <div className="placeholder-info">
          <h3>Data Cuaca Terkait ({currentWeather.name})</h3>
          <div className="placeholder-cards">
            <div className="placeholder-card">
              <span>💧 Kelembapan</span>
              <strong>{currentWeather.main.humidity}%</strong>
              <p>Kelembapan tinggi dapat memicu pertumbuhan jamur dan bakteri.</p>
            </div>
            <div className="placeholder-card">
              <span>👁 Jarak Pandang</span>
              <strong>{currentWeather.visibility ? (currentWeather.visibility / 1000).toFixed(1) : '—'} km</strong>
              <p>Jarak pandang rendah menandakan kabut atau polusi tinggi.</p>
            </div>
            <div className="placeholder-card">
              <span>🌡️ Suhu</span>
              <strong>{Math.round(currentWeather.main.temp)}°C</strong>
              <p>Suhu ekstrem dapat berdampak pada kesehatan pernapasan.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderAnalyticsPage = () => (
    <div className="placeholder-page">
      <h2>📊 Analitik Cuaca</h2>
      <p>Halaman analitik mendalam memerlukan data historis (langganan premium).</p>
      {currentWeather && forecast && (
        <div className="analytics-preview">
          <h3>Ringkasan {currentWeather.name}</h3>
          <div className="analytics-cards">
            <div className="analytics-card">
              <span className="analytics-label">Suhu Saat Ini</span>
              <span className="analytics-value">{Math.round(currentWeather.main.temp)}°C</span>
            </div>
            <div className="analytics-card">
              <span className="analytics-label">Rata-rata 5 Hari</span>
              <span className="analytics-value">
                {forecast?.list ? Math.round(forecast.list.reduce((a, b) => a + b.main.temp, 0) / forecast.list.length) : '—'}°C
              </span>
            </div>
            <div className="analytics-card">
              <span className="analytics-label">Rata-rata Kelembapan</span>
              <span className="analytics-value">
                {forecast?.list ? Math.round(forecast.list.reduce((a, b) => a + b.main.humidity, 0) / forecast.list.length) : '—'}%
              </span>
            </div>
            <div className="analytics-card">
              <span className="analytics-label">Rata-rata Angin</span>
              <span className="analytics-value">
                {forecast?.list ? (forecast.list.reduce((a, b) => a + b.wind.speed, 0) / forecast.list.length).toFixed(1) : '—'} m/s
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderSettingsPage = () => (
    <div className="placeholder-page">
      <h2>⚙️ Pengaturan</h2>
      <div className="settings-section">
        <h3>Unit Tampilan</h3>
        <div className="setting-row">
          <span>Suhu</span>
          <div className="setting-toggle-group">
            <button
              className={`setting-toggle ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => setUnit('metric')}
            >°C</button>
            <button
              className={`setting-toggle ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => setUnit('imperial')}
            >°F</button>
          </div>
        </div>
      </div>
      <div className="settings-section">
        <h3>Kota Favorit</h3>
        <div className="settings-favorites">
          {favorites.map((fav, i) => (
            <span key={i} className="settings-fav-tag">{fav}</span>
          ))}
        </div>
      </div>
      <div className="settings-section">
        <h3>Informasi Sistem</h3>
        <div className="settings-info">
          <p>versi aplikasi: SkyPulse v2.4.0</p>
          <p>API: OpenWeatherMap Free</p>
          <p>Protokol: MQTT v3.1</p>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (activePage) {
      case 'radar': return renderRadarPage()
      case 'forecast': return renderForecastPage()
      case 'airquality': return renderAirQualityPage()
      case 'analytics': return renderAnalyticsPage()
      case 'settings': return renderSettingsPage()
      default: return renderDashboard()
    }
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-area">
        <Header
          city={city}
          unit={unit}
          currentTime={currentTime}
          weather={currentWeather}
          forecast={forecast}
          onToggleUnit={toggleUnit}
          onOpenMenu={() => setSidebarOpen(true)}
        />
        <main className="content">
          <HeaderSearchBar onSearch={handleSearch} loading={loading} />

          {loading && (
            <div className="loading-overlay">
              <div className="loader"></div>
              <p>Mengambil data cuaca...</p>
            </div>
          )}

          {!loading && renderPage()}
        </main>
        <Footer weather={currentWeather} />
      </div>
    </div>
  )
}

const HeaderSearchBar = ({ onSearch, loading }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  return (
    <form className="header-search" onSubmit={handleSubmit}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Cari kota global atau koordinat..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      {input && (
        <button type="submit" className="search-go" disabled={loading}>
          Cari
        </button>
      )}
    </form>
  )
}

export default App
