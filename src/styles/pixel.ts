import { AvatarStyle, AvatarOptions } from '../types.js';

const generatePixel = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const gridSize = 8;
    const cellSize = size / gridSize;
    let svgRects = '';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
            const cellHash = (hash >> (y * 4 + x)) & 0b111; // Use 3 bits for more variety
            if (cellHash > 1) { // 0 and 1 will be empty cells
                const color = palette[cellHash % palette.length];
                svgRects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                if (x < Math.floor(gridSize / 2)) {
                    svgRects += `<rect x="${(gridSize - 1 - x) * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
                }
            }
        }
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background-color: #f0f0f0;">${svgRects}</svg>`;
};

export const pixelStyle: AvatarStyle = { name: 'pixel', generate: generatePixel };

