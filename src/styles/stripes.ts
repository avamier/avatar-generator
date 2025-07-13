/**
 * @file Defines the 'stripes' avatar style.
 * @description This style generates a diagonal stripe pattern with varied widths and angles.
 * 
*/
import { AvatarStyle, AvatarOptions } from '../types.js';

const generate = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100 } = options; // Correctly destructure size from the options object
    const [color1, color2, color3] = palette;
    
    // Use the hash to create a more varied stripe width and angle
    const stripeWidth = 8 + (hash % 12); // Varies stripe width from 8 to 20
    const angle = 45 + (hash % 90); // Varies the angle as well

    const svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="stripe-pattern" width="${stripeWidth * 2}" height="${stripeWidth * 2}" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
                    <rect width="${stripeWidth}" height="${stripeWidth * 2}" fill="${color1}"/>
                    <rect x="${stripeWidth}" width="${stripeWidth}" height="${stripeWidth * 2}" fill="${color2}"/>
                </pattern>
            </defs>
            <rect width="${size}" height="${size}" fill="url(#stripe-pattern)" />
            <rect width="${size}" height="${size}" fill="${color3}" style="mix-blend-mode: overlay; opacity: 0.7;"/>
        </svg>
    `;
    return svgContent;
};

export const stripesStyle: AvatarStyle = {
    name: 'stripes',
    generate,
};
