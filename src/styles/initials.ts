/**
 * @file Defines the 'initials' avatar style.
 * @description This style generates an avatar with the initials of a display name.
 */
import { AvatarStyle, AvatarOptions } from '../types.js';

const generateInitials = (hash: number, palette: string[], options: AvatarOptions): string => {
    const { size = 100, displayName } = options;
    const [bgColor, textColor] = palette;

    let initials = '?';
    if (displayName) {
        const parts = displayName.trim().split(' ');
        if (parts.length > 1) {
            initials = `${parts[0][0]}${parts[parts.length - 1][0]}`;
        } else if (parts[0]) {
            initials = parts[0].substring(0, 2);
        }
    } else {
        // Fallback if no displayName is provided
        initials = String.fromCharCode(65 + (hash % 26));
    }

    const fontSize = size * 0.4;
    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" fill="${bgColor}" />
            <text x="50%" y="50%" font-family="sans-serif" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dy=".35em" font-weight="bold">
                ${initials.toUpperCase()}
            </text>
        </svg>
    `;
};

export const initialsStyle: AvatarStyle = { name: 'initials', generate: generateInitials };
