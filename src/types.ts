/**
 * @file Defines the core types and interfaces for the avatar generator package.
 */

/**
 * Defines the shape for a color palette.
 * Each palette must provide arrays for low and high contrast modes.
 */
export interface ColorPalette {
  name: string;
  low: string[];
  high: string[];
}

/**
 * Defines the options that can be passed to the main generateAvatar function.
 */
export interface AvatarOptions {
  type?: string;
  size?: number;
  palette?: string;
  contrast?: 'low' | 'high';
  displayName?: string; // Optional display name for styles like 'initials'
}

/**
 * Defines the shape that every avatar style must adhere to.
 */
export interface AvatarStyle {
  name: string;
  // The generate function now receives the full options object
  generate: (hash: number, palette: string[], options: AvatarOptions) => string;
}
