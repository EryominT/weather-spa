import type { ParamsRequest } from '@/entities/weather/model/types.ts';

const BASE_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const BASE_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Общая функция для получения координат города
async function getCityCoordinates(cityName: string) {
  const response = await fetch(`${BASE_GEOCODING_URL}?name=${cityName}&count=1`);
  const data = await response.json();
  return data.results[0];
}

// Общая функция для создания weather URL
function createWeatherUrl(latitude: number, longitude: number, params: string[]) {
  const url = new URL(BASE_WEATHER_URL);
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('timezone', 'auto');
  url.searchParams.append('temperature_unit', 'celsius');

  params.forEach((param) => {
    url.searchParams.append(param.split('=')[0], param.split('=')[1]);
  });

  return url;
}

// Общая функция для выполнения запроса
async function fetchWeatherData(options: ParamsRequest, params: string[]) {
  const city = await getCityCoordinates(options.city);
  const url = createWeatherUrl(Number(city.latitude), Number(city.longitude), params);

  const response = await fetch(url);
  const result = await response.json();

  return {
    city,
    ...result,
  };
}

export function useWeatherApi() {
  async function getWeakWeather(options: ParamsRequest) {
    return fetchWeatherData(options, [
      'daily=weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min,wind_speed_10m_max,precipitation_probability_max,sunrise,sunset',
      'forecast_days=7',
    ]);
  }

  async function getDayWeather(options: ParamsRequest) {
    return fetchWeatherData(options, [
      'hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    ]);
  }

  async function getCurrentWeather(options: ParamsRequest) {
    return fetchWeatherData(options, [
      'current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    ]);
  }

  async function getWeatherPopularCites(cities: string[]) {
    const promises = cities.map(async city => getCurrentWeather({ city }));
    const results = await Promise.allSettled(promises);

    return results.map((result) => {
      if (result.status === 'fulfilled') {
        return {
          status: 'success',
          data: result.value,
        };
      } else {
        return {
          status: 'error',
          error: result.reason,
        };
      }
    });
  }

  return {
    getWeakWeather,
    getDayWeather,
    getCurrentWeather,
    getWeatherPopularCites,
  };
}
