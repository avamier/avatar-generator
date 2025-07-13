/**
 * @file src/styles/pixel.ts
 * @description Defines the 'pixel' avatar style.
 */
import { AvatarStyle as PixelAvatarStyle, AvatarOptions as PixelAvatarOptions } from '../types.js';
import { getLuminance as getPixelLuminance } from './utils.js';

const generatePixel = (hash: number, options: PixelAvatarOptions): string => {
    const { size = 100, palette, variant = 'light' } = options;

    const allColors = [...palette.colors].sort((a, b) => getPixelLuminance(a) - getPixelLuminance(b));
    const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
    const foregroundColors = allColors.filter(c => c !== backgroundColor);

    if (foregroundColors.length === 0) {
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};"></svg>`;
    }

    const gridSize = 8;
    const cellSize = size / gridSize;
    let svgRects = '';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const bitIndex = y * gridSize + x;
            if ((hash >> (bitIndex % 32)) & 1) {
                const colorIndex = (hash >> (bitIndex % 8)) % foregroundColors.length;
                const color = foregroundColors[colorIndex];
                svgRects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
            }
        }
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">${svgRects}</svg>`;
};

export const pixel: PixelAvatarStyle = { name: 'pixel', generate: generatePixel };