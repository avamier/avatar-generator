/**
 * @file src/styles/block.ts
 * @description This style generates a symmetrical, pixelated pattern that adapts to light and dark modes.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';
import { getLuminance } from './utils.js';

const generateBlock = (hash: number, options: AvatarOptions): string => {
  const { size = 100, palette, variant = 'light' } = options;

  const allColors = [...palette.colors].sort(
    (a, b) => getLuminance(a) - getLuminance(b)
  );

  const darkestColor = allColors[0];
  const lightestColor = allColors[allColors.length - 1];

  const backgroundColor = variant === 'light' ? lightestColor : darkestColor;
  const potentialForegroundColors = allColors.filter(
    (c) => c !== backgroundColor
  );

  if (potentialForegroundColors.length === 0) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};"></svg>`;
  }

  // Ensure there's enough contrast between background and foreground.
  const LUMINANCE_THRESHOLD = 60;
  const backgroundLuminance = getLuminance(backgroundColor);
  
  const highContrastForegroundColors = potentialForegroundColors.filter(
    (c) => Math.abs(getLuminance(c) - backgroundLuminance) > LUMINANCE_THRESHOLD
  );

  let foregroundColor;

  if (highContrastForegroundColors.length > 0) {
    // If there are suitable high-contrast colors, pick one deterministically.
    foregroundColor = highContrastForegroundColors[hash % highContrastForegroundColors.length];
  } else {
    // As a fallback, use the color with the most possible contrast.
    foregroundColor = variant === 'light' ? darkestColor : lightestColor;
  }
  
  const gridSize = 5;
  const cellSize = size / gridSize;
  let svgRects = '';

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
      const bitIndex = y * 5 + x;
      const shouldDraw = (hash >> bitIndex) & 1;

      if (shouldDraw) {
        // Draw the left-side rectangle using the single selected foreground color
        svgRects += `<rect x="${x * cellSize}" y="${
          y * cellSize
        }" width="${cellSize}" height="${cellSize}" fill="${foregroundColor}" />`;

        // Draw the corresponding right-side rectangle for symmetry
        if (x < Math.floor(gridSize / 2)) {
          svgRects += `<rect x="${(gridSize - 1 - x) * cellSize}" y="${
            y * cellSize
          }" width="${cellSize}" height="${cellSize}" fill="${foregroundColor}" />`;
        }
      }
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">${svgRects}</svg>`;
};

export const block: AvatarStyle = { name: 'block', generate: generateBlock };
