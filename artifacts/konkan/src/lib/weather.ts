// Open-Meteo API integration — completely free, no API key required
// Docs: https://open-meteo.com/en/docs

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  precipitation: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  timezone: string;
  location: { lat: number; lng: number };
}

// WMO Weather Codes → human readable + emoji
export const WMO_CODES: Record<number, { label: string; emoji: string; alert?: boolean }> = {
  0:  { label: 'Clear Sky',         emoji: '☀️' },
  1:  { label: 'Mainly Clear',      emoji: '🌤️' },
  2:  { label: 'Partly Cloudy',     emoji: '⛅' },
  3:  { label: 'Overcast',          emoji: '☁️' },
  45: { label: 'Foggy',             emoji: '🌫️' },
  48: { label: 'Icy Fog',           emoji: '🌫️' },
  51: { label: 'Light Drizzle',     emoji: '🌦️' },
  53: { label: 'Drizzle',           emoji: '🌦️' },
  55: { label: 'Heavy Drizzle',     emoji: '🌧️' },
  61: { label: 'Light Rain',        emoji: '🌧️' },
  63: { label: 'Rain',              emoji: '🌧️' },
  65: { label: 'Heavy Rain',        emoji: '🌧️',  alert: true },
  71: { label: 'Light Snow',        emoji: '🌨️' },
  73: { label: 'Snow',              emoji: '❄️' },
  75: { label: 'Heavy Snow',        emoji: '❄️' },
  80: { label: 'Rain Showers',      emoji: '🌦️' },
  81: { label: 'Showers',           emoji: '🌧️' },
  82: { label: 'Heavy Showers',     emoji: '🌧️',  alert: true },
  85: { label: 'Snow Showers',      emoji: '🌨️' },
  95: { label: 'Thunderstorm',      emoji: '⛈️',  alert: true },
  96: { label: 'Thunderstorm + Hail', emoji: '⛈️', alert: true },
  99: { label: 'Heavy Thunderstorm', emoji: '⛈️', alert: true },
};

export function getWeatherMeta(code: number) {
  return WMO_CODES[code] ?? { label: 'Unknown', emoji: '🌡️' };
}

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', lat.toString());
    url.searchParams.set('longitude', lng.toString());
    url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,is_day');
    url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max');
    url.searchParams.set('timezone', 'Asia/Kolkata');
    url.searchParams.set('forecast_days', '7');

    const res = await fetch(url.toString());
    if (!res.ok) return null;
    const data = await res.json();

    const current: CurrentWeather = {
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      weatherCode: data.current.weather_code,
      windSpeed: Math.round(data.current.wind_speed_10m),
      precipitation: data.current.precipitation,
      isDay: data.current.is_day === 1,
    };

    const daily: DailyForecast[] = (data.daily.time as string[]).map((date: string, i: number) => ({
      date,
      weatherCode: data.daily.weather_code[i],
      tempMax: Math.round(data.daily.temperature_2m_max[i]),
      tempMin: Math.round(data.daily.temperature_2m_min[i]),
      precipitationSum: data.daily.precipitation_sum[i],
      precipitationProbability: data.daily.precipitation_probability_max[i],
    }));

    return { current, daily, timezone: data.timezone, location: { lat, lng } };
  } catch {
    return null;
  }
}

// Monsoon season detection for Konkan (June–September)
export function isMonsoonSeason(): boolean {
  const month = new Date().getMonth() + 1; // 1-indexed
  return month >= 6 && month <= 9;
}

export function getMonsoonAlert(weather: WeatherData | null): string | null {
  if (!isMonsoonSeason()) return null;
  if (!weather) return 'Monsoon season active. Check local conditions before travel.';
  
  const { weatherCode, precipitation, windSpeed } = weather.current;
  const meta = getWeatherMeta(weatherCode);
  
  if (meta.alert) {
    return `Severe weather alert: ${meta.label}. Exercise caution when travelling in Konkan.`;
  }
  if (precipitation > 10) {
    return 'Heavy rainfall reported. Some routes and beaches may be inaccessible.';
  }
  if (windSpeed > 40) {
    return 'Strong winds reported. Ferry services may be disrupted.';
  }
  
  return 'Monsoon season active — lush scenery, but verify transport and trail conditions.';
}

// Key Konkan destination coordinates for weather
export const KONKAN_WEATHER_LOCATIONS = [
  { id: 'alibaug',      name: 'Alibaug',      lat: 18.6414, lng: 72.8722 },
  { id: 'ganpatipule',  name: 'Ganpatipule',  lat: 17.1507, lng: 73.2667 },
  { id: 'tarkarli',     name: 'Tarkarli',     lat: 16.0167, lng: 73.4667 },
  { id: 'malvan',       name: 'Malvan',       lat: 16.0601, lng: 73.4677 },
  { id: 'ratnagiri',    name: 'Ratnagiri',    lat: 16.9944, lng: 73.3001 },
  { id: 'murud',        name: 'Murud',        lat: 18.3242, lng: 72.9527 },
  { id: 'dapoli',       name: 'Dapoli',       lat: 17.7661, lng: 73.1869 },
  { id: 'guhagar',      name: 'Guhagar',      lat: 17.5177, lng: 73.2023 },
  { id: 'harihareshwar', name: 'Harihareshwar', lat: 17.9972, lng: 73.0030 },
  { id: 'vengurla',     name: 'Vengurla',     lat: 15.8596, lng: 73.6340 },
];
