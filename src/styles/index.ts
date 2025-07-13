/**
 * @file This file acts as a central registry for all built-in avatar styles.
 * To add a new style to the package, simply import it here and add it to the `allStyles` array.
 */

import { AvatarStyle } from '../types.js';
import { block } from './block.js';
import { gradient } from './gradient.js';
import { rings } from './rings.js';
import { stripes } from './stripes.js';
import { nebula } from './nebula.js';
import { polygon } from './polygon.js';
import { bauhaus } from './bauhaus.js';
import { pixel } from './pixel.js';
import { initials } from './initials.js';

export const allStyles: AvatarStyle[] = [
  block,
  gradient,
  rings,
  stripes,
  nebula,
  polygon,
  bauhaus,
  pixel,
  initials,
];
