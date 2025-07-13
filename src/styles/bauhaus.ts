/**
 * @file Defines the 'bauhaus' avatar style.
 * @description This style generates an abstract, geometric composition inspired by the Bauhaus art movement.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';

const generateBauhaus = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const [color1, color2, color3] = palette;
    const shapes = [];
    
    // Shape 1: Large background rectangle
    shapes.push(`<rect width="${size}" height="${size}" fill="${color3}" />`);
    
    // Shape 2: A circle
    const c1x = (hash % 20) + 20;
    const c1y = ((hash >> 2) % 20) + 30;
    const c1r = 15 + (hash % 10);
    shapes.push(`<circle cx="${c1x}" cy="${c1y}" r="${c1r}" fill="${color1}" />`);

    // Shape 3: A rectangle
    const r1x = 60 - ((hash >> 4) % 15);
    const r1y = 50 + ((hash >> 6) % 20);
    const r1w = 20 + (hash % 15);
    const r1h = 30 + (hash % 10);
    shapes.push(`<rect x="${r1x}" y="${r1y}" width="${r1w}" height="${r1h}" transform="rotate(${(hash % 45) - 22}, ${r1x}, ${r1y})" fill="${color2}" />`);

    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${shapes.join('')}</svg>`;
};

export const bauhausStyle: AvatarStyle = { name: 'bauhaus', generate: generateBauhaus };

