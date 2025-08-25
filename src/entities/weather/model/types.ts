import { z } from 'zod';
import { IconNameSchema } from '@/shared/ui/AppIcon/model/types';

export interface ParamsRequest {
  city: string;
}

export const WeatherApiResponseSchema = z.object({
  city: z.object({
    name: z.string(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    relative_humidity_2m_max: z.array(z.number()),
    wind_speed_10m_max: z.array(z.number()),
  }),
});
export type WeatherApiResponse = z.infer<typeof WeatherApiResponseSchema>;

export const WeakWeatherSchema = z.object({
  cityName: z.string().optional(),
  currentData: z.string(),
  currentTemp: z.string(),
  description: z.string(),
  humidity: z.string(),
  icon: IconNameSchema,
  index: z.number(),
  label: z.string(),
  windSpeed: z.string(),
});
export type WeakWeather = z.infer<typeof WeakWeatherSchema>;

export const CitySchema = z.object({
  name: z.string(),
});

export const CurrentWeatherSchema = z.object({
  time: z.string(),
  weather_code: z.number(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  wind_speed_10m: z.number(),
});

export const HourlyWeatherSchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
  temperature_2m: z.array(z.number()),
  relative_humidity_2m: z.array(z.number()),
  wind_speed_10m: z.array(z.number()),
});

export const DayWeatherResponseSchema = z.object({
  city: CitySchema,
  hourly: HourlyWeatherSchema,
});
export type DayWeatherResponse = z.infer<typeof DayWeatherResponseSchema>;

export const CurrentWeatherResponseSchema = z.object({
  city: CitySchema,
  current: CurrentWeatherSchema,
});
export type CurrentWeatherResponse = z.infer<typeof CurrentWeatherResponseSchema>;

export const PopularCityWeatherSchema = z.object({
  data: z.object({
    city: CitySchema,
    current: CurrentWeatherSchema,
  }),
});

export const PopularCitiesResponseSchema = z.array(PopularCityWeatherSchema);
export type PopularCitiesResponse = z.infer<typeof PopularCitiesResponseSchema>;

export const WeatherResultSchema = z.object({
  id: z.string(),
  cityName: z.string().optional(),
  currentData: z.string(),
  currentTemp: z.string(),
  description: z.string(),
  humidity: z.string(),
  icon: IconNameSchema,
  index: z.number().optional(),
  time: z.any().optional(),
  windSpeed: z.string(),
});

export type WeatherResult = z.infer<typeof WeatherResultSchema>;
