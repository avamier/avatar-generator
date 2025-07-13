/**
 * @file Defines the 'nebula' avatar style.
 * @description This style generates a cosmic scene with a nebula and stars.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';

const createRandomGenerator = (seed: number) => {
  let state = seed;
  return () => {
    state = (1103515245 * state + 12345) % 2147483647;
    return state / 2147483647;
  };
};

const generateNebula = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options;
    const [color1, color2, color3] = palette;
    const numOctaves = 3 + (hash % 2);
    const baseFrequency = ((hash % 7) + 2) / 1000;

    const defs = `
        <defs>
            <filter id="nebula-filter">
                <feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" stitchTiles="stitch"/>
            </filter>
        </defs>
    `;
    const background = `<rect width="${size}" height="${size}" fill="${color3}" />`;
    const nebulaLayer1 = `<rect width="${size}" height="${size}" fill="${color1}" filter="url(#nebula-filter)" style="mix-blend-mode: screen; opacity: 0.6;"/>`;
    const nebulaLayer2 = `<rect width="${size}" height="${size}" fill="${color2}" filter="url(#nebula-filter)" style="mix-blend-mode: lighten; opacity: 0.5; transform: rotate(${(hash % 360)}deg) scale(1.2);"/>`;
    let stars = '';
    const starCount = 40 + (hash % 30);
    const random = createRandomGenerator(hash);
    for (let i = 0; i < starCount; i++) {
        const x = Math.floor(random() * size);
        const y = Math.floor(random() * size);
        const r = random() * 1.2 + 0.5;
        const opacity = 0.5 + random() * 0.5;
        stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" style="opacity: ${opacity};" />`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${defs}${background}${nebulaLayer1}${nebulaLayer2}${stars}</svg>`;
};

export const nebulaStyle: AvatarStyle = { name: 'nebula', generate: generateNebula };
