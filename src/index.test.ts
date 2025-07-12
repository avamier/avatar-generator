import { generateAvatar, registerStyle, registerPalette } from './index.js';
import { AvatarStyle, ColorPalette } from './types.js';
import { allStyles } from './styles/index.js';
import { allPalettes } from './palettes/index.js';

describe('Avatar Generator Core', () => {
  it('should return a valid SVG data URI', () => {
    const avatar = generateAvatar('some-seed');
    expect(avatar).toEqual(expect.stringMatching(/^data:image\/svg\+xml;base64,/));
  });

  it('should throw an error for an unregistered style', () => {
    expect(() => generateAvatar('seed', { type: 'non-existent-style' }))
      .toThrow('Avatar style "non-existent-style" not found.');
  });

  it('should throw an error for an unregistered palette', () => {
    expect(() => generateAvatar('seed', { palette: 'non-existent-palette' }))
      .toThrow('Color palette "non-existent-palette" not found.');
  });
});

// --- Automated Style & Palette Combination Testing ---
// This will automatically run a snapshot test for every possible combination
// of the built-in styles and palettes.

const testCases: { style: AvatarStyle; palette: ColorPalette }[] = [];
allStyles.forEach(style => {
  allPalettes.forEach(palette => {
    testCases.push({ style, palette });
  });
});

describe.each(testCases)('Combination: Style "$style.name" with Palette "$palette.name"', ({ style, palette }) => {
  const seed = 'a-very-consistent-seed-for-testing';

  // Test the high contrast version
  it('should match the saved snapshot (high contrast)', () => {
    const avatar = generateAvatar(seed, {
      type: style.name,
      palette: palette.name,
      contrast: 'high',
      size: 100,
    });
    expect(avatar).toMatchSnapshot();
  });

  // Test the low contrast version
  it('should match the saved snapshot (low contrast)', () => {
    const avatar = generateAvatar(seed, {
      type: style.name,
      palette: palette.name,
      contrast: 'low',
      size: 100,
    });
    expect(avatar).toMatchSnapshot();
  });
});
