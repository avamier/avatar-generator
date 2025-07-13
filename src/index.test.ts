import { generateAvatar, registerStyle, registerPalette } from './index.js';
import { AvatarStyle, ColorPalette, AvatarOptions } from './types.js';
import { allStyles } from './styles/index.js';
import { allPalettes } from './palettes/index.js';

describe('Avatar Generator Core', () => {
  it('should return a valid SVG data URI', () => {
    const avatar = generateAvatar('some-seed');
    expect(avatar).toEqual(
      expect.stringMatching(/^data:image\/svg\+xml;base64,/)
    );
  });

  it('should throw an error for an unregistered style', () => {
    expect(() =>
      generateAvatar('seed', { type: 'non-existent-style' })
    ).toThrow('Avatar style "non-existent-style" not found.');
  });

  it('should throw an error for an unregistered palette', () => {
    expect(() =>
      generateAvatar('seed', { palette: 'non-existent-palette' })
    ).toThrow('Color palette "non-existent-palette" not found.');
  });
});

// --- Test for Custom Extensibility ---
describe('Custom Registration', () => {
  it('should allow registering and using a new custom style', () => {
    // 1. Define the checkerboard custom style with the updated signature
    const checkerboardStyle: AvatarStyle = {
      name: 'checkerboard',
      generate: (hash: number, options: AvatarOptions) => {
        const { size = 100, palette } = options;
        const [color1, color2] = palette.colors;
        const cellSize = size / 8;
        let rects = '';

        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            const color = (x + y) % 2 === 0 ? color1 : color2;
            rects += `<rect x="${
              x * cellSize
            }" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
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
      palette: 'grayscale',
    });

    // 4. Assert that the output is what we expect
    expect(avatar).toMatchSnapshot();
    expect(avatar).toEqual(
      expect.stringMatching(/^data:image\/svg\+xml;base64,/)
    );
  });
});

// --- Automated Style & Palette Combination Testing ---
const testCases: { style: AvatarStyle; palette: ColorPalette }[] = [];
allStyles.forEach((style) => {
  allPalettes.forEach((palette) => {
    testCases.push({ style, palette });
  });
});

describe.each(testCases)(
  'Combination: Style "$style.name" with Palette "$palette.name"',
  ({ style, palette }) => {
    const seed = 'a-very-consistent-seed-for-testing';

    // Test the light variant
    it('should match the saved snapshot (light variant)', () => {
      const avatar = generateAvatar(seed, {
        type: style.name,
        palette: palette.name,
        variant: 'light',
        size: 100,
      });
      expect(avatar).toMatchSnapshot();
    });

    // Test the dark variant
    it('should match the saved snapshot (dark variant)', () => {
      const avatar = generateAvatar(seed, {
        type: style.name,
        palette: palette.name,
        variant: 'dark',
        size: 100,
      });
      expect(avatar).toMatchSnapshot();
    });
  }
);
