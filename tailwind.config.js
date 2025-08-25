import { breakpoints } from './src/shared/config/breakpoints';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
  ],
  theme: {
    screens: {
      'xs': `${breakpoints.xs}px`,
      'sm': `${breakpoints.sm}px`,
      'md': `${breakpoints.md}px`,
      'lg': `${breakpoints.lg}px`,
      'xl': `${breakpoints.xl}px`,
      '2xl': `${breakpoints['2xl']}px`,
    },
    extend: {
      colors: {
        'primary-50': '#eef4ff',
        'primary-100': '#d9e6ff',
        'primary-200': '#bcd0ff',
        'primary-300': '#8eb0ff',
        'primary-400': '#5e85ff',
        'primary-500': 'rgba(233, 233, 243, 0.1)',
        'primary-600': 'rgba(233, 233, 243, 0.3)',
        'primary-700': 'rgba(233, 233, 243, 0.4)',
        'primary-800': 'rgba(233, 233, 243, 0.5)',
        'primary-900': 'rgba(233, 233, 243, 0.6)',
        'primary-950': 'rgba(233, 233, 243, 0.7)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(238,237,237,0.1))',
      },
    },
  },
};
