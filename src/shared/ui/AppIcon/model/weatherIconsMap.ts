export type WeatherCode = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 61 | 63 | 65 | 80 | 81 | 82 | 95;

export interface WeatherInfo {
  iconName: string;
  label: string;
}

export const weatherInfoMap: Record<WeatherCode, WeatherInfo> = {
  0: {
    iconName: 'sunny',
    label: 'ясно',
  },
  1: {
    iconName: 'sunny',
    label: 'преимущественно ясно',
  },
  2: {
    iconName: 'cloudy',
    label: 'переменная облачность',
  },
  3: {
    iconName: 'cloudy',
    label: 'пасмурно',
  },
  45: {
    iconName: 'cloudy',
    label: 'туман',
  },
  48: {
    iconName: 'rainy',
    label: 'изморозь',
  },
  51: {
    iconName: 'rainy',
    label: 'легкая морось',
  },
  53: {
    iconName: 'rainy',
    label: 'умеренная морось',
  },
  55: {
    iconName: 'windy',
    label: 'сильная морось',
  },
  61: {
    iconName: 'rainy',
    label: 'небольшой дождь',
  },
  63: {
    iconName: 'rainy',
    label: 'умеренный дождь',
  },
  65: {
    iconName: 'windy',
    label: 'сильный дождь',
  },
  80: {
    iconName: 'rainy',
    label: 'ливень',
  },
  81: {
    iconName: 'rainy',
    label: 'сильный ливень',
  },
  82: {
    iconName: 'rainy',
    label: 'очень сильный ливень',
  },
  95: {
    iconName: 'rainy',
    label: 'гроза',
  },
} as const;

export function getWeatherInfo(code: number): WeatherInfo | null {
  return weatherInfoMap[code as WeatherCode] || null;
}

export function getWeatherIcon(code: number): string {
  return getWeatherInfo(code)?.iconName || '';
}

export function getWeatherLabel(code: number): string {
  return getWeatherInfo(code)?.label || '';
}
