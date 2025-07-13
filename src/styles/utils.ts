/**
 * @file src/styles/utils.ts
 * @description This file contains helper functions for the avatar styles.
 */

/**
 * A helper function to get the luminance of a hex color.
 * This helps in finding the lightest and darkest colors in a palette.
 * @param hex The hex color string (e.g., "#RRGGBB").
 * @returns A number from 0 (darkest) to 255 (lightest).
 */
export const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  // Formula for perceived brightness
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
