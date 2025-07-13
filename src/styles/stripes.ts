/**
 * @file src/styles/stripes.ts
 * @description Defines the 'stripes' avatar style.
 */
import { AvatarStyle as StripesAvatarStyle, AvatarOptions as StripesAvatarOptions } from '../types.js';
import { getLuminance as getStripesLuminance } from './utils.js';

const generateStripes = (hash: number, options: StripesAvatarOptions): string => {
    const { size = 100, palette, variant = 'light' } = options;

    const allColors = [...palette.colors].sort((a, b) => getStripesLuminance(a) - getStripesLuminance(b));
    const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
    const foregroundColors = allColors.filter(c => c !== backgroundColor);

    if (foregroundColors.length === 0) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};"></svg>`;
    }

    let stripes = '';
    const numStripes = (hash % 4) + 3; // 3 to 6 stripes
    const stripeWidth = size / numStripes;
    const rotation = 0; // hash % 90;

    for (let i = 0; i < numStripes; i++) {
        const colorIndex = (hash >> i) % foregroundColors.length;
        const color = foregroundColors[colorIndex];
        stripes += `<rect x="${i * stripeWidth}" y="0" width="${stripeWidth}" height="${size}" fill="${color}" />`;
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">
        <g transform="rotate(${rotation} ${size / 2} ${size / 2})">${stripes}</g>
    </svg>`;
};

export const stripes: StripesAvatarStyle = { name: 'stripes', generate: generateStripes };