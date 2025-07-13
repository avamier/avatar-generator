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

// --- Test for Custom Extensibility ---
describe('Custom Registration', () => {
  it('should allow registering and using a new custom style', () => {
    // 1. Define the checkerboard custom style
    const checkerboardStyle: AvatarStyle = {
      name: 'checkerboard',
      generate: (hash: number, palette: string[], options) => {
        const { size = 100 } = options;
        const [color1, color2] = palette;
        const cellSize = size / 8;
        let rects = '';

        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            const color = (x + y) % 2 === 0 ? color1 : color2;
            rects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
          }
        }
        return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
      },
    };

    // 2. Register the new style
    registerStyle(checkerboardStyle);

    // 3. Generate an avatar using the custom style
    const avatar = generateAvatar('custom-seed', {
      type: 'checkerboard',
      palette: 'grayscale', // Using a simple palette for predictable colors
    });

    // 4. Assert that the output is what we expect
    // This snapshot will capture the full output of our custom style.
    expect(avatar).toMatchSnapshot();
    // Also, explicitly check that the output is a valid data URI.
    expect(avatar).toEqual(expect.stringMatching(/^data:image\/svg\+xml;base64,/));
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