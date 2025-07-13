/**
 * @file src/styles/gradient.ts
 * @description Defines the 'gradient' avatar style.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';
import { getLuminance } from './utils.js';

const generateGradient = (hash: number, options: AvatarOptions): string => {
  const { size = 100, palette, variant = 'light' } = options;

  // Sort all colors by brightness to easily find the extremes.
  const allColors = [...palette.colors].sort(
    (a, b) => getLuminance(a) - getLuminance(b)
  );

  // Ensure there are enough colors to create a meaningful gradient.
  if (allColors.length < 3) {
    const color = allColors[0] || '#cccccc';
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="${color}"/></svg>`;
  }

  // Determine the primary background and the opposite extreme color.
  const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
  const extremeForegroundColor = variant === 'light' ? allColors[0] : allColors[allColors.length - 1];

  // --- Start: Logic copied from block.ts to find the high-contrast middle color ---
  const potentialMiddleColors = allColors.filter(
    (c) => c !== backgroundColor && c !== extremeForegroundColor
  );

  const LUMINANCE_THRESHOLD = 60;
  const backgroundLuminance = getLuminance(backgroundColor);
  
  const highContrastMiddleColors = potentialMiddleColors.filter(
    (c) => Math.abs(getLuminance(c) - backgroundLuminance) > LUMINANCE_THRESHOLD
  );

  let middleColor;

  if (highContrastMiddleColors.length > 0) {
    // If there are suitable high-contrast colors, pick one deterministically.
    middleColor = highContrastMiddleColors[hash % highContrastMiddleColors.length];
  } else {
    // As a fallback, use the color with the most possible contrast.
    middleColor = extremeForegroundColor;
  }
  // --- End: Logic copied from block.ts ---

  // Assemble the three colors for our gradient.
  const gradientColors = [backgroundColor, middleColor, extremeForegroundColor];

  // Generate the <stop> elements for the SVG gradient.
  const stops = gradientColors
    .map((color, index) => {
      const offset = (index / (gradientColors.length - 1)) * 100;
      return `<stop offset="${offset}%" style="stop-color:${color};" />`;
    })
    .join('');

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#grad)"/>
  </svg>`;
};

export const gradient: AvatarStyle = { name: 'gradient', generate: generateGradient };
