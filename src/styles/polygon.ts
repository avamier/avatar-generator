/**
 * @file src/styles/polygon.ts
 * @description Defines the 'polygon' avatar style using two overlapping shapes.
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
 * Generates the data for a single polygon.
 * @param prng A pseudo-random number generator function.
 * @param targetCenter An optional center point to generate the new polygon near, ensuring intersection.
 * @returns An object containing the polygon's points and its center coordinates.
 */
const createPolygon = (prng: () => number, targetCenter?: { x: number; y: number }): { points: string; center: { x: number; y: number } } => {
  const numPoints = Math.floor(prng() * 4) + 5; // 5 to 8 points
  const radius = prng() * 30 + 20; // 20-50

  let center_x: number, center_y: number;

  if (targetCenter) {
    // Generate the new center close to the target to guarantee an intersection.
    const offsetX = (prng() * radius) - (radius / 2); // Position within one radius of the target
    const offsetY = (prng() * radius) - (radius / 2);
    center_x = targetCenter.x + offsetX;
    center_y = targetCenter.y + offsetY;
  } else {
    // Generate a random center for the first polygon.
    center_x = prng() * 60 + 20; // 20-80
    center_y = prng() * 60 + 20; // 20-80
  }

  let points = '';
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    // Add some randomness to the radius for more irregular shapes
    const r = radius * (prng() * 0.4 + 0.8); // 80%-120% of base radius
    const x = center_x + r * Math.cos(angle);
    const y = center_y + r * Math.sin(angle);
    points += `${x},${y} `;
  }
  return { points: points.trim(), center: { x: center_x, y: center_y } };
};

const generatePolygon = (hash: number, options: AvatarOptions): string => {
  const { size = 100, palette, variant = 'light' } = options;
  const prng = createPrng(hash);

  const allColors = [...palette.colors].sort(
    (a, b) => getLuminance(a) - getLuminance(b)
  );
  const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
  const foregroundColors = allColors.filter((c) => c !== backgroundColor);

  if (foregroundColors.length < 3) {
    // Fallback for palettes with too few colors.
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};"></svg>`;
  }
  
  const availableColors = [...foregroundColors];
  
  // Helper to pick a color and remove it from the available pool to avoid reuse
  const pickColor = () => {
      if (availableColors.length === 0) return foregroundColors[Math.floor(prng() * foregroundColors.length)];
      const colorIndex = Math.floor(prng() * availableColors.length);
      return availableColors.splice(colorIndex, 1)[0];
  };

  const color1 = pickColor();
  const color2 = pickColor();
  const intersectionColor = pickColor();

  const poly1 = createPolygon(prng);
  const poly2 = createPolygon(prng, poly1.center); // Create the second polygon near the first

  const transform1 = `rotate(${prng() * 360} ${poly1.center.x} ${poly1.center.y})`;
  const transform2 = `rotate(${prng() * 360} ${poly2.center.x} ${poly2.center.y})`;

  // Calculate the approximate center of the entire composition.
  const groupCenterX = (poly1.center.x + poly2.center.x) / 2;
  const groupCenterY = (poly1.center.y + poly2.center.y) / 2;

  // Determine the translation needed to move the group's center to the SVG's center (50, 50).
  const translateX = 50 - groupCenterX;
  const translateY = 50 - groupCenterY;
  const groupTransform = `translate(${translateX} ${translateY})`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">
    <defs>
      <mask id="poly-mask">
        <rect width="100" height="100" fill="white" />
        <g transform="${groupTransform}">
          <polygon points="${poly1.points}" transform="${transform1}" fill="black" />
        </g>
      </mask>
      <mask id="poly-mask-inverse">
        <rect width="100" height="100" fill="black" />
        <g transform="${groupTransform}">
          <polygon points="${poly1.points}" transform="${transform1}" fill="white" />
        </g>
      </mask>
    </defs>
    
    <g transform="${groupTransform}">
      <!-- Draw the first polygon -->
      <polygon points="${poly1.points}" transform="${transform1}" fill="${color1}" />
      
      <!-- Draw the second polygon, but only where it does NOT overlap with the first -->
      <polygon points="${poly2.points}" transform="${transform2}" fill="${color2}" mask="url(#poly-mask)" />
      
      <!-- Draw the intersection area with the third color -->
      <polygon points="${poly2.points}" transform="${transform2}" fill="${intersectionColor}" mask="url(#poly-mask-inverse)" />
    </g>
  </svg>`;
};

export const polygon: AvatarStyle = { name: 'polygon', generate: generatePolygon };
