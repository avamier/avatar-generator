/**
 * @file src/styles/bauhaus.ts
 * @description Defines the 'bauhaus' avatar style, inspired by the Bauhaus art school's geometric and colorful compositions.
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

// --- Shape Generator Functions ---
// Each function now uses the PRNG for more organic values.

const createCircle = (prng: () => number, color: string, isGuaranteed: boolean = false): { svg: string; size: number } => {
  const shapeSize = prng() * 50 + 25; // size 25-75
  // Use a more constrained position for guaranteed shapes
  const range = isGuaranteed ? 60 : 120;
  const offset = isGuaranteed ? 20 : -10;
  const cx = prng() * range + offset;
  const cy = prng() * range + offset;
  return {
    svg: `<circle cx="${cx}" cy="${cy}" r="${shapeSize / 2}" fill="${color}" />`,
    size: shapeSize,
  };
};

const createRectangle = (prng: () => number, color: string, isGuaranteed: boolean = false): { svg: string; size: number } => {
  const width = prng() * 60 + 25; // width 25-85
  const height = prng() * 60 + 25; // height 25-85
  // Use a more constrained position for guaranteed shapes
  const range = isGuaranteed ? 60 : 120;
  const offset = isGuaranteed ? 20 : -10;
  const x = prng() * range + offset;
  const y = prng() * range + offset;
  const rot = prng() * 90;
  return {
    svg: `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" transform="rotate(${rot} ${x + width / 2} ${y + height / 2})"/>`,
    size: width * height, // Use area as the size metric for rectangles
  };
};

const createTriangle = (prng: () => number, color: string): { svg: string; size: number } => {
    const sideLength = prng() * 50 + 30; // 30-80
    const x = prng() * 120 - 10; // x -10 to 110
    const y = prng() * 120 - 10; // y -10 to 110
    const halfSide = sideLength / 2;
    const height = sideLength * (Math.sqrt(3) / 2);
    const p1 = `${x},${y - height / 2}`;
    const p2 = `${x - halfSide},${y + height / 2}`;
    const p3 = `${x + halfSide},${y + height / 2}`;
    const rot = prng() * 180;
    return {
        svg: `<polygon points="${p1} ${p2} ${p3}" fill="${color}" transform="rotate(${rot} ${x} ${y})"/>`,
        size: (sideLength * height) / 2, // Use area as the size metric for triangles
    };
};


const generateBauhaus = (hash: number, options: AvatarOptions): string => {
  const { size = 100, palette, variant = 'light' } = options;
  const prng = createPrng(hash);

  const allColors = [...palette.colors].sort(
    (a, b) => getLuminance(a) - getLuminance(b)
  );
  const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
  const foregroundColors = allColors.filter((c) => c !== backgroundColor);

  if (foregroundColors.length === 0) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};"></svg>`;
  }

  // --- Generate a dynamic composition of shapes ---

  const shapeData = [];
  const availableColors = [...foregroundColors];
  const shapeGenerators = [createCircle, createRectangle, createTriangle];

  // Helper to pick a color and remove it from the available pool to avoid reuse
  const pickColor = () => {
    if (availableColors.length === 0) return foregroundColors[Math.floor(prng() * foregroundColors.length)];
    const colorIndex = Math.floor(prng() * availableColors.length);
    return availableColors.splice(colorIndex, 1)[0];
  };

  // Guarantee that one circle and one rectangle are always present, with constrained positions.
  shapeData.push(createCircle(prng, pickColor(), true));
  shapeData.push(createRectangle(prng, pickColor(), true));

  // Determine how many additional shapes to draw (0 to 2).
  const numAdditionalShapes = Math.floor(prng() * 3);

  for (let i = 0; i < numAdditionalShapes; i++) {
    const generatorIndex = Math.floor(prng() * shapeGenerators.length);
    const shapeGenerator = shapeGenerators[generatorIndex];
    const color = pickColor();
    
    // Additional shapes are not guaranteed, so they can have wider distribution.
    if (shapeGenerator.name === 'createTriangle') {
        shapeData.push(createTriangle(prng, color));
    } else {
        shapeData.push(shapeGenerator(prng, color, false));
    }
  }

  // Sort shapes by size (descending) so largest shapes are rendered first (at the bottom).
  const sortedShapes = shapeData
    .sort((a, b) => b.size - a.size)
    .map(s => s.svg)
    .join('');

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">
    <g>
      ${sortedShapes}
    </g>
  </svg>`;
};

export const bauhaus: AvatarStyle = { name: 'bauhaus', generate: generateBauhaus };
