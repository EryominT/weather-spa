import { z } from 'zod';
import { iconComponent } from './iconComponent';

export type IconName = keyof typeof iconComponent;

export const IconNameSchema = z.enum(
  Object.keys(iconComponent) as [keyof typeof iconComponent, ...(keyof typeof iconComponent)[]],
);
