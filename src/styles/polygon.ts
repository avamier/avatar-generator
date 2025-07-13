/**
 * @file Defines the 'polygon' avatar style.
 * @description This style generates a regular polygon with a gradient fill.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';

const generate = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const [color1, color2] = palette;
    const sides = 5 + (hash % 4); // 5 to 8 sides
    const angleOffset = (Math.PI * 2) / sides;
    const rotation = (hash % 90) * (Math.PI / 180);
    const center = size / 2;
    const radius = size / 2 * 0.9;
    
    let points = '';
    for (let i = 0; i < sides; i++) {
        const angle = i * angleOffset + rotation;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        points += `${x},${y} `;
    }

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color1}" />
                    <stop offset="100%" stop-color="${color2}" />
                </linearGradient>
            </defs>
            <rect width="${size}" height="${size}" fill="${palette[2] || '#1a1a1a'}" />
            <polygon points="${points.trim()}" fill="url(#poly-grad)" />
        </svg>
    `;
};

export const polygonStyle: AvatarStyle = { name: 'polygon', generate };