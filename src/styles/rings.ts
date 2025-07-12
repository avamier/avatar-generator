import { AvatarStyle, AvatarOptions } from '../types.js';

const generateRings = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const [color1, color2, color3] = palette;
    const ringCount = 4 + (hash % 3);
    const center = size / 2;
    const maxRadius = size / 2;
    let svgCircles = `<rect width="${size}" height="${size}" fill="${color3}" />`;

    for (let i = 0; i < ringCount; i++) {
        const radius = maxRadius * (1 - i / ringCount);
        const strokeColor = i % 2 === 0 ? color1 : color2;
        const strokeWidth = (maxRadius / ringCount) * (0.6 + ((hash >> i) & 1) * 0.4);
        svgCircles += `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${svgCircles}</svg>`;
};

export const ringsStyle: AvatarStyle = { name: 'rings', generate: generateRings };