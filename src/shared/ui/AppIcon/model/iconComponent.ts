import { Cloudy, NoFound, Rainy, Sunny, Windy } from '../icons';

export const iconComponent = {
  cloudy: Cloudy,
  rainy: Rainy,
  windy: Windy,
  sunny: Sunny,
  noFound: NoFound,
} as const;

export type IconNameType = keyof typeof iconComponent;
