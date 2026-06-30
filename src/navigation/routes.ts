export const SCREENS = {
  HOME: 'Home',
} as const;

export type ScreenName = (typeof SCREENS)[keyof typeof SCREENS];
