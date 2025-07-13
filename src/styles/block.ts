/**
 * @file Defines the 'block' avatar style.
 * @description This style generates a symmetrical, pixelated pattern.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';

const generate = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const color = palette[0];
    const gridSize = 5;
    const cellSize = size / gridSize;
    let svgRects = '';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
            const bit = (hash >> (y * 5 + x)) & 1;
            if (bit === 1) {
                svgRects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                if (x < Math.floor(gridSize / 2)) {
                    svgRects += `<rect x="${(gridSize - 1 - x) * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                }
            }
        }
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: #f0f0f0;">${svgRects}</svg>`;
};

export const blockStyle: AvatarStyle = { name: 'block', generate };