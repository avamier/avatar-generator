/**
 * @file Defines the 'gradient' avatar style.
 * @description This style generates a simple, three-color linear gradient.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';

const generateGradient = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const [color1, color2, color3] = palette;
    const angle = hash % 360;

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="simple-grad" gradientTransform="rotate(${angle})">
                    <stop offset="0%" stop-color="${color1}" />
                    <stop offset="50%" stop-color="${color2}" />
                    <stop offset="100%" stop-color="${color3}" />
                </linearGradient>
            </defs>
            <rect width="${size}" height="${size}" fill="url(#simple-grad)" />
        </svg>
    `;
};

export const gradientStyle: AvatarStyle = { name: 'gradient', generate: generateGradient };