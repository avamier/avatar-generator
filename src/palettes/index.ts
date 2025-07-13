/**
 * @file This file acts as a central registry for all built-in color palettes.
 * To add a new palette to the package, simply import it here and add it to the `allPalettes` array.
 */
import { ColorPalette } from '../types.js';
import { monokaiPalette } from './monokai.js';
import { pridePalette } from './pride.js';
import { mutedPalette } from './muted.js';
import { darkPalette } from './dark.js';
import { lightPalette } from './light.js';
import { grayscalePalette } from './grayscale.js';

export const allPalettes: ColorPalette[] = [
  monokaiPalette,
  pridePalette,
  mutedPalette,
  darkPalette,
  lightPalette,
  grayscalePalette,
];