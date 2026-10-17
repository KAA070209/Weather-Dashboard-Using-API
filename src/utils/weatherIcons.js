const weatherIcons = {
  200: '⛈️', 201: '⛈️', 202: '⛈️', 210: '🌩️', 211: '🌩️', 212: '🌩️',
  221: '🌩️', 230: '⛈️', 231: '⛈️', 232: '⛈️',
  300: '🌦️', 301: '🌦️', 302: '🌧️', 310: '🌦️', 311: '🌧️', 312: '🌧️',
  313: '🌦️', 314: '🌧️', 321: '🌦️',
  500: '🌧️', 501: '🌧️', 502: '🌧️', 503: '🌧️', 504: '🌧️',
  511: '🧊', 520: '🌧️', 521: '🌧️', 522: '🌧️', 531: '🌧️',
  600: '🌨️', 601: '🌨️', 602: '🌨️', 611: '🌨️', 612: '🌨️',
  613: '🌨️', 615: '🌨️', 616: '🌨️', 620: '🌨️', 621: '🌨️', 622: '🌨️',
  701: '🌫️', 711: '💨', 721: '🌫️', 731: '🌫️', 741: '🌫️',
  751: '🌫️', 761: '🌫️', 762: '🌫️', 771: '💨', 781: '🌪️',
  800: '☀️',
  801: '🌤️', 802: '⛅', 803: '☁️', 804: '☁️',
}

const weatherDescriptions = {
  200: 'Badai Petir', 201: 'Badai Petir', 202: 'Badai Petir',
  300: 'Hujan Ringan', 301: 'Hujan', 302: 'Hujan Lebat',
  500: 'Hujan Ringan', 501: 'Hujan', 502: 'Hujan Lebat',
  511: 'Hujan Es', 520: 'Hujan Ringan', 521: 'Hujan', 522: 'Hujan Lebat',
  600: 'Salju Ringan', 601: 'Salju', 602: 'Salju Lebat',
  701: 'Kabut', 721: 'Berkabut', 741: 'Kabut Tebal',
  800: 'Cerah', 801: 'Cerah Berawan', 802: 'Berawan',
  803: 'Berawan Tebal', 804: 'Mendung',
}

export const getWeatherIcon = (id) => weatherIcons[id] || '🌤️'
export const getWeatherDescription = (id) => weatherDescriptions[id] || 'Cuaca'
