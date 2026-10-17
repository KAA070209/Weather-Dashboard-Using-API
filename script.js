const weatherCard = document.querySelector('.weather-card');
const errorMessage = document.querySelector('#errorMessage');
const searchBtn = document.querySelector('#searchBtn');
const cityInput = document.querySelector('#cityInput');

const apiKey = 'c99b15fa19725c13a670a1d89c661a33'; // Ganti dengan API key OpenWeather

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Masukkan nama kota');
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  showLoading(true);
  errorMessage.style.display = 'none';
  weatherCard.style.display = 'none';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=id`
    );

    if (!response.ok) {
      throw new Error('Kota tidak ditemukan atau API error');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

function displayWeather(data) {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ description, id }],
    wind: { speed }
  } = data;

  weatherCard.style.display = 'block';

  document.querySelector('#cityName').textContent = name;
  document.querySelector('#temperature').textContent = `${Math.round(temp)}°C`;
  document.querySelector('#humidity').textContent = `${humidity}%`;
  document.querySelector('#windSpeed').textContent = `${speed} m/s`;
  document.querySelector('#feelsLike').textContent = `${Math.round(feels_like)}°C`;
  document.querySelector('#pressure').textContent = `${pressure} hPa`;

  setWeatherIcon(id, description);

  showForecast(data);
  hideError();
}

function setWeatherIcon(iconId, description) {
  const weatherIcon = document.querySelector('#weatherIcon');

  const clearSky = [800];
  const cloudy = [801, 802, 803, 804];
  const rainy = [200, 201, 202, 230, 231, 232];
  const stormy = [951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962];
  const snowy = [600, 601, 602, 611, 612, 613, 615, 616, 617, 620, 621, 622];
  const misty = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];

  let iconSrc;

  if (clearSky.includes(iconId)) {
    iconSrc = '☀️';
  } else if (cloudy.includes(iconId)) {
    iconSrc = '☁️';
  } else if (rainy.includes(iconId)) {
    iconSrc = '🌧️';
  } else if (stormy.includes(iconId)) {
    iconSrc = '⛈️';
  } else if (snowy.includes(iconId)) {
    iconSrc = '🌨️';
  } else if (misty.includes(iconId)) {
    iconSrc = '🌫️';
  } else {
    iconSrc = '🌤️';
  }

  weatherIcon.textContent = iconSrc;
}

function showForecast(data) {
  const forecastContainer = document.querySelector('#forecast');
  forecastContainer.innerHTML = '';

  // Simple 5-day forecast using list from API
  const forecastList = data.list?.slice(0, 5) || [];

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('id-ID', { weekday: 'short' });
    const temp = Math.round(item.main.temp);
    const weatherIcon = getWeatherIcon(item.weather[0].id);

    const div = document.createElement('div');
    div.className = 'forecast-day';
    div.textContent = `${day}: ${weatherIcon} ${temp}°C`;
    forecastContainer.appendChild(div);
  });
}

function getWeatherIcon(iconId) {
  if (iconId === 800) return '☀️';
  if (iconId < 300) return '⛈️';
  if (iconId < 500) return '🌧️';
  if (iconId < 600) return '🌦️';
  if (iconId < 700) return '🧊';
  if (iconId < 800) return '🌫️';
  return '☀️';
}

function showError(message) {
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
}

function showLoading(isLoading) {
  searchBtn.disabled = isLoading;
  searchBtn.textContent = isLoading ? 'Loading...' : 'Search';
}

function hideError() {
  errorMessage.style.display = 'none';
}