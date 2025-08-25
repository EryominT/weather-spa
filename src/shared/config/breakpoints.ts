export const breakpoints = {
  'xs': 412,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type BreakpointValue = typeof breakpoints[Breakpoint];
