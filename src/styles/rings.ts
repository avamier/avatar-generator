/**
 * @file src/styles/rings.ts
 * @description Defines the 'rings' avatar style.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';
import { getLuminance } from './utils.js';

const generateRings = (hash: number, options: AvatarOptions): string => {
    const { size = 100, palette, variant = 'light' } = options;

    const allColors = [...palette.colors].sort((a, b) => getLuminance(a) - getLuminance(b));
    const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
    const foregroundColors = allColors.filter(c => c !== backgroundColor);

    if (foregroundColors.length === 0) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};"></svg>`;
    }

    let circles = '';
    const numRings = (hash % 4) + 3; // 3 to 6 rings, same as stripes
    const maxRadius = size / 2;

    // Draw circles from largest to smallest to create the concentric effect
    for (let i = 0; i < numRings; i++) {
        // Use the same color selection logic as stripes for more variety
        const colorIndex = (hash >> i) % foregroundColors.length;
        const color = foregroundColors[colorIndex];
        
        // The largest ring is drawn first, then smaller ones on top
        const radius = maxRadius * (1 - i / numRings);

        if (radius > 0) {
            circles += `<circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${color}" />`;
        }
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">${circles}</svg>`;
};

export const rings: AvatarStyle = { name: 'rings', generate: generateRings };
