import type { ParamsRequest, WeakWeather, WeatherResult } from './types.ts';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { timeRange } from '@/entities/weather/model/constants.ts';
import { allCities } from '@/shared/constants/cities.ts';
import { getWeatherIcon } from '@/shared/ui/AppIcon';
import { getWeatherLabel } from '@/shared/ui/AppIcon/model/weatherIconsMap.ts';
import { dateFromTimestamp, timeFromTimestamp } from '@/shared/utils/dateFromTimestamp.ts';
import { useWeatherApi } from './api.ts';
import {
  CurrentWeatherResponseSchema,
  DayWeatherResponseSchema,

  PopularCitiesResponseSchema,

  WeakWeatherSchema,
  WeatherApiResponseSchema,

  WeatherResultSchema,
} from './types.ts';

export const useWeather = defineStore('weather', () => {
  const currentWeather = ref<WeatherResult | null>(null);
  const currentWeatherLoading = ref(true);

  const weakWeather = ref<WeakWeather[]>([]);
  const weakWeatherLoading = ref(true);

  const allDayWeather = ref<WeatherResult[]>([]);
  const allDayWeatherLoading = ref(true);

  const weatherPopularCites = ref<WeatherResult[]>([]);
  const weatherPopularCitesLoading = ref(true);

  const toast = useToast();

  async function initWeakWeather(options: ParamsRequest) {
    const weatherApi = useWeatherApi();

    try {
      const rawResponse = await weatherApi.getWeakWeather(options);
      const weatherResponse = WeatherApiResponseSchema.parse(rawResponse);
      const result: WeakWeather[] = [];

      weatherResponse.daily.time.forEach((weakDate, idx) => {
        const weakWeatherItem = WeakWeatherSchema.parse({
          cityName: allCities.find(city =>
            city.id === weatherResponse.city.name.replace(/'/g, ''),
          )?.name.ru,
          index: idx,
          label: dateFromTimestamp(weakDate, { weekday: 'long' }),
          currentData: weakDate,
          icon: getWeatherIcon(weatherResponse.daily.weather_code[idx]),
          currentTemp: `${Math.floor(weatherResponse.daily.temperature_2m_max[idx])}°`,
          description: getWeatherIcon(weatherResponse.daily.weather_code[idx]),
          humidity: `${weatherResponse.daily.relative_humidity_2m_max[idx]} %`,
          windSpeed: `${weatherResponse.daily.wind_speed_10m_max[idx]} м/с`,
        });

        result.push(weakWeatherItem);
      });

      weakWeather.value = result;
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось загрузить прогноз погоды за неделю. Пожалуйста попробуйте позже',
        life: 5000,
      });
    } finally {
      weakWeatherLoading.value = false;
    }
  }

  async function initDayWeather(options: ParamsRequest) {
    const weatherApi = useWeatherApi();

    try {
      const rawResponse = await weatherApi.getDayWeather(options);
      const weatherResponse = DayWeatherResponseSchema.parse(rawResponse);
      const result: WeatherResult[] = [];

      for (let i = 0; i < weatherResponse.hourly.time.length; i++) {
        const item = weatherResponse.hourly.time[i];
        const time = timeFromTimestamp(item, { hour: '2-digit', minute: '2-digit' });

        if (dateFromTimestamp(new Date(), { day: 'numeric' }) !== dateFromTimestamp(item, { day: 'numeric' })) {
          continue;
        }

        const found = timeRange.find(obj => obj.time === time);

        if (found) {
          result.push({
            id: 'None',
            index: i,
            time: found,
            currentData: '',
            currentTemp: '',
            description: '',
            humidity: '',
            icon: 'noFound', // @todo: fix
            windSpeed: '',
          });
        }
      }

      result.forEach((item, index) => {
        const idx = item.index ?? index;

        const weatherItem = WeatherResultSchema.parse({
          id: weatherResponse.city.name.replace(/'/g, ''),
          cityName: weatherResponse.city.name,
          currentData: dateFromTimestamp(weatherResponse.hourly.time[idx]),
          icon: getWeatherIcon(weatherResponse.hourly.weather_code[idx]),
          currentTemp: `${Math.floor(weatherResponse.hourly.temperature_2m[idx])}°`,
          description: getWeatherLabel(weatherResponse.hourly.weather_code[idx]),
          humidity: `${weatherResponse.hourly.relative_humidity_2m[idx]}%`,
          windSpeed: `${weatherResponse.hourly.wind_speed_10m[idx]}м/с`,
          index: item.index,
          time: item.time,
        });

        Object.assign(item, weatherItem);
      });

      allDayWeather.value = result;
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось загрузить прогноз погоды на весь день. Пожалуйста попробуйте позже',
        life: 5000,
      });
    } finally {
      allDayWeatherLoading.value = false;
    }
  }

  async function initCurrentWeather(options: ParamsRequest) {
    const weatherApi = useWeatherApi();
    try {
      const rawResponse = await weatherApi.getCurrentWeather(options);
      const weatherResponse = CurrentWeatherResponseSchema.parse(rawResponse);

      currentWeather.value = WeatherResultSchema.parse({
        id: weatherResponse.city.name.replace(/'/g, ''),
        cityName: allCities.find(city =>
          city.id === weatherResponse.city.name.replace(/'/g, ''),
        )?.name.ru,
        currentData: dateFromTimestamp(weatherResponse.current.time),
        icon: getWeatherIcon(weatherResponse.current.weather_code),
        currentTemp: `${Math.floor(weatherResponse.current.temperature_2m)}°`,
        description: getWeatherLabel(weatherResponse.current.weather_code),
        humidity: `${weatherResponse.current.relative_humidity_2m} %`,
        windSpeed: `${weatherResponse.current.wind_speed_10m} м/с`,
      });
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось загрузить текущий прогноз погоды. Пожалуйста попробуйте позже',
        life: 5000,
      });
    } finally {
      currentWeatherLoading.value = false;
    }
  }

  async function initWeatherPopularCites(cityList: string[]) {
    const weatherApi = useWeatherApi();

    try {
      const rawResponse = await weatherApi.getWeatherPopularCites(cityList);
      const weatherResponse = PopularCitiesResponseSchema.parse(rawResponse);

      weatherPopularCites.value = weatherResponse.map((weatherCity): WeatherResult => {
        return WeatherResultSchema.parse({
          id: weatherCity.data.city.name.replace(/'/g, ''),
          cityName: allCities.find(city =>
            city.id === weatherCity.data.city.name.replace(/'/g, ''),
          )?.name.ru,
          currentData: dateFromTimestamp(weatherCity.data.current.time),
          icon: getWeatherIcon(weatherCity.data.current.weather_code),
          currentTemp: `${Math.floor(weatherCity.data.current.temperature_2m)}°`,
          description: getWeatherLabel(weatherCity.data.current.weather_code),
          humidity: `${weatherCity.data.current.relative_humidity_2m} %`,
          windSpeed: `${weatherCity.data.current.wind_speed_10m} м/с`,
        });
      });
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось загрузить прогноз погоды популярных городов. Пожалуйста попробуйте позже',
        life: 5000,
      });
    }
  }

  return {
    weakWeather,
    weakWeatherLoading,
    allDayWeather,
    allDayWeatherLoading,
    currentWeather,
    currentWeatherLoading,
    weatherPopularCites,
    weatherPopularCitesLoading,
    initWeakWeather,
    initDayWeather,
    initCurrentWeather,
    initWeatherPopularCites,
  };
});
