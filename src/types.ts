/**
 * @file Defines the core types for the avatar generator.
 */

export interface ColorPalette {
  name: string;
  colors: string[];
}

export interface AvatarOptions {
  seed?: string;
  size?: number;
  palette: ColorPalette;
  variant?: 'light' | 'dark';
  displayName?: string;
}

export interface AvatarStyle {
  name: string;
  generate: (
    hash: number,
    options: AvatarOptions
  ) => string;
}
