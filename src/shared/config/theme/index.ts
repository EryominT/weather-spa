import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { CUSTOM_COLORS } from './tokens';

export function createCustomTheme() {
  return definePreset(Aura, {
    semantic: {
      primary: CUSTOM_COLORS.primary,
    },
  });
}
