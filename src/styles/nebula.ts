/**
 * @file src/styles/nebula.ts
 * @description Defines the 'nebula' avatar style, creating a celestial scene with a background gradient and a colorful starfield.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';
import { getLuminance } from './utils.js';

/**
 * Creates a simple pseudo-random number generator from a seed.
 * @param seed The seed to initialize the generator.
 * @returns A function that returns a new pseudo-random number between 0 and 1 on each call.
 */
const createPrng = (seed: number) => {
  let h = seed;
  return () => {
    h = Math.sin(h) * 10000;
    return h - Math.floor(h);
  };
};

/**
 * Generates a string of SVG <circle> elements to represent stars.
 * @param prng A pseudo-random number generator function.
 * @param starColorPool An array of colors to use for the stars.
 * @returns An SVG string containing all the star elements.
 */
const generateStars = (prng: () => number, starColorPool: string[]): string => {
  let stars = '';
  // Reduced star count to 10-25
  const numStars = Math.floor(prng() * 16) + 10;

  if (starColorPool.length === 0) {
    return ''; // No colors available for stars.
  }

  for (let i = 0; i < numStars; i++) {
    const cx = Math.floor(prng() * 100);
    const cy = Math.floor(prng() * 100);
    // Updated star size to a range of 1 to 5
    const r = prng() * 4 + 1;
    const opacity = prng() * 0.6 + 0.3; // opacity 0.3 to 0.9
    const color = starColorPool[Math.floor(prng() * starColorPool.length)];

    stars += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" fill-opacity="${opacity}" />`;
  }
  return stars;
};

const generateNebula = (hash: number, options: AvatarOptions): string => {
  const { size = 100, palette, variant = 'light' } = options;
  const prng = createPrng(hash);

  // Sort all colors by brightness to easily find the extremes.
  const allColors = [...palette.colors].sort(
    (a, b) => getLuminance(a) - getLuminance(b)
  );

  // Ensure there are enough colors to work with.
  if (allColors.length < 2) {
    const color = allColors[0] || '#cccccc';
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="${color}"/></svg>`;
  }

  // --- Background Gradient ---
  const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
  // Use the second closest color for a more pronounced gradient, with a fallback for small palettes.
  const secondBackgroundColor = variant === 'light' 
    ? allColors[Math.max(0, allColors.length - 3)] 
    : allColors[Math.min(allColors.length - 1, 2)];

  const backgroundStops = `
    <stop offset="0%" style="stop-color:${secondBackgroundColor};" />
    <stop offset="100%" style="stop-color:${backgroundColor};" />
  `;

  // --- Starfield ---
  const starColorPool = allColors.filter(
    (c) => c !== backgroundColor && c !== secondBackgroundColor
  );
  const stars = generateStars(prng, starColorPool);
  
  // Position the center of the nebula anywhere within the frame.
  const cx = Math.floor(prng() * 101);
  const cy = Math.floor(prng() * 101);

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="backgroundGrad" cx="${cx}%" cy="${cy}%" r="80%">
        ${backgroundStops}
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#backgroundGrad)"/>
    ${stars}
  </svg>`;
};

export const nebula: AvatarStyle = { name: 'nebula', generate: generateNebula };
