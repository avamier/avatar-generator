/**
 * @file This file acts as a central registry for all built-in avatar styles.
 * To add a new style to the package, simply import it here and add it to the `allStyles` array.
 */

import { AvatarStyle } from '../types.js';
import { blockStyle } from './block.js';
import { gradientStyle } from './gradient.js';
import { ringsStyle } from './rings.js';
import { stripesStyle } from './stripes.js';
import { nebulaStyle } from './nebula.js';
import { polygonStyle } from './polygon.js';
import { bauhausStyle } from './bauhaus.js';
import { pixelStyle } from './pixel.js';
import { initialsStyle } from './initials.js';

export const allStyles: AvatarStyle[] = [
  blockStyle,
  gradientStyle,
  ringsStyle,
  stripesStyle,
  nebulaStyle,
  polygonStyle,
  bauhausStyle,
  pixelStyle,
  initialsStyle,
];
