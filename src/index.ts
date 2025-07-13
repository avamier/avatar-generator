/**
 * @file A simple, deterministic, and extensible identicon/avatar generator.
 * @description This package generates unique SVG avatars from a seed string,
 * supporting multiple, user-extendable visual styles and color palettes.
 */

import { Buffer } from 'node:buffer';
import { AvatarOptions, AvatarStyle, ColorPalette } from './types.js';
import { allStyles } from './styles/index.js';
import { allPalettes } from './palettes/index.js';

// --- REGISTRIES ---
const styleRegistry = new Map<string, AvatarStyle>();
const paletteRegistry = new Map<string, ColorPalette>();

/**
 * Allows users of the package to register their own custom avatar styles.
 * @param style An object that conforms to the AvatarStyle interface.
 */
export function registerStyle(style: AvatarStyle) {
  if (styleRegistry.has(style.name)) {
    console.warn(`Avatar style "${style.name}" is being overwritten.`);
  }
  styleRegistry.set(style.name, style);
}

/**
 * Allows users of the package to register their own custom color palettes.
 * @param palette An object that conforms to the ColorPalette interface.
 */
export function registerPalette(palette: ColorPalette) {
  if (paletteRegistry.has(palette.name)) {
    console.warn(`Color palette "${palette.name}" is being overwritten.`);
  }
  paletteRegistry.set(palette.name, palette);
}

// Automatically register all built-in styles and palettes
allStyles.forEach(registerStyle);
allPalettes.forEach(registerPalette);

// --- HELPER FUNCTION ---
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Ensure the hash is a 32-bit integer
  }
  return Math.abs(hash); // Return a non-negative hash value
};

// Defines the public-facing options for the main generateAvatar function.
type PublicAvatarOptions = {
  type?: string;
  size?: number;
  palette?: string;
  variant?: 'light' | 'dark';
  displayName?: string;
};

// --- MAIN EXPORTED FUNCTION ---
export const generateAvatar = (
  seed: string,
  options: PublicAvatarOptions = {}
): string => {
  const {
    type = 'block',
    size = 100,
    palette: paletteName = 'cool',
    variant = 'light',
    displayName,
  } = options;

  if (!seed) {
    const placeholderSvg = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#cccccc"/></svg>`;
    const base64Placeholder = Buffer.from(placeholderSvg).toString('base64');
    return `data:image/svg+xml;base64,${base64Placeholder}`;
  }

  // 1. Find the requested style and palette in their respective registries
  const style = styleRegistry.get(type);
  if (!style) throw new Error(`Avatar style "${type}" not found.`);

  const selectedPalette = paletteRegistry.get(paletteName);
  if (!selectedPalette)
    throw new Error(`Color palette "${paletteName}" not found.`);

  // 2. Generate the hash and pass all necessary data to the style's generate function
  const hash = simpleHash(seed);
  const svgContent = style.generate(hash, {
    seed,
    size,
    palette: selectedPalette,
    variant,
    displayName,
  });

  // 3. Return the final SVG as a data URI
  const base64Svg = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${base64Svg}`;
};
