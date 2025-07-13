/**
 * @file src/styles/initials.ts
 * @description Defines the 'initials' avatar style.
 */
import { AvatarStyle as InitialsAvatarStyle, AvatarOptions as InitialsAvatarOptions } from '../types.js';
import { getLuminance as getInitialsLuminance } from './utils.js';

const generateInitials = (hash: number, options: InitialsAvatarOptions): string => {
  const { size = 100, palette, variant = 'light', displayName = '?' } = options;

  const allColors = [...palette.colors].sort(
    (a, b) => getInitialsLuminance(a) - getInitialsLuminance(b)
  );
  const backgroundColor = variant === 'light' ? allColors[allColors.length - 1] : allColors[0];
  const textColor = variant === 'light' ? allColors[0] : allColors[allColors.length - 1];

  const initials = displayName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};">
    <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${textColor}" font-size="40" font-family="sans-serif">${initials}</text>
  </svg>`;
};

export const initials: InitialsAvatarStyle = { name: 'initials', generate: generateInitials };