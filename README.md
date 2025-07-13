# Deterministic Avatar Generator

A lightweight, zero-dependency TypeScript package for generating unique, SVG-based identicon avatars from a seed string.

This package is designed to be extensible, allowing developers to register their own custom avatar styles and color palettes. It's perfect for user profiles, default avatars, or any application where a deterministic, visually pleasing placeholder image is needed.

## ✨ Features

- **Extensible Styles:** Comes with several built-in styles (`block`, `gradient`, `rings`, `stripes`, `nebula`, `polygon`, `bauhaus`, `pixel`, `initials`) and allows developers to easily register their own.
- **Extensible Palettes:** Includes a variety of built-in color palettes (`monokai`, `pride`, `muted`, `dark`, `light`, `grayscale`) with high and low contrast modes, and allows for custom palette registration.
- **Deterministic:** The same input seed will always produce the exact same avatar.
- **Zero Dependencies:** Runs in any Node.js or browser environment without needing external packages.
- **SVG Output:** Generates a clean, scalable SVG image as a Base64 data URI, perfect for use in `<img>` tags.

## 🎨 Available Styles & Palettes

This table shows a preview for each style combined with each palette in both high and low contrast modes.

| Style | monokai | pride | muted | dark | light | grayscale |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **block** | ![monokai High Contrast](./preview_assets/block-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/block-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/block-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/block-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/block-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/block-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/block-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/block-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/block-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/block-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/block-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/block-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **gradient** | ![monokai High Contrast](./preview_assets/gradient-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/gradient-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/gradient-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/gradient-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/gradient-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/gradient-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/gradient-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/gradient-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/gradient-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/gradient-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/gradient-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/gradient-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **rings** | ![monokai High Contrast](./preview_assets/rings-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/rings-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/rings-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/rings-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/rings-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/rings-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/rings-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/rings-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/rings-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/rings-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/rings-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/rings-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **stripes** | ![monokai High Contrast](./preview_assets/stripes-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/stripes-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/stripes-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/stripes-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/stripes-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/stripes-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/stripes-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/stripes-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/stripes-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/stripes-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/stripes-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/stripes-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **nebula** | ![monokai High Contrast](./preview_assets/nebula-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/nebula-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/nebula-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/nebula-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/nebula-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/nebula-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/nebula-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/nebula-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/nebula-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/nebula-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/nebula-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/nebula-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **polygon** | ![monokai High Contrast](./preview_assets/polygon-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/polygon-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/polygon-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/polygon-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/polygon-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/polygon-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/polygon-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/polygon-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/polygon-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/polygon-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/polygon-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/polygon-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **bauhaus** | ![monokai High Contrast](./preview_assets/bauhaus-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/bauhaus-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/bauhaus-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/bauhaus-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/bauhaus-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/bauhaus-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/bauhaus-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/bauhaus-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/bauhaus-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/bauhaus-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/bauhaus-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/bauhaus-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **pixel** | ![monokai High Contrast](./preview_assets/pixel-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/pixel-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/pixel-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/pixel-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/pixel-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/pixel-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/pixel-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/pixel-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/pixel-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/pixel-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/pixel-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/pixel-grayscale-low.svg)<br/><sub>Low Contrast</sub> |
| **initials** | ![monokai High Contrast](./preview_assets/initials-monokai-high.svg)<br/><sub>High Contrast</sub><br/><br/>![monokai Low Contrast](./preview_assets/initials-monokai-low.svg)<br/><sub>Low Contrast</sub> | ![pride High Contrast](./preview_assets/initials-pride-high.svg)<br/><sub>High Contrast</sub><br/><br/>![pride Low Contrast](./preview_assets/initials-pride-low.svg)<br/><sub>Low Contrast</sub> | ![muted High Contrast](./preview_assets/initials-muted-high.svg)<br/><sub>High Contrast</sub><br/><br/>![muted Low Contrast](./preview_assets/initials-muted-low.svg)<br/><sub>Low Contrast</sub> | ![dark High Contrast](./preview_assets/initials-dark-high.svg)<br/><sub>High Contrast</sub><br/><br/>![dark Low Contrast](./preview_assets/initials-dark-low.svg)<br/><sub>Low Contrast</sub> | ![light High Contrast](./preview_assets/initials-light-high.svg)<br/><sub>High Contrast</sub><br/><br/>![light Low Contrast](./preview_assets/initials-light-low.svg)<br/><sub>Low Contrast</sub> | ![grayscale High Contrast](./preview_assets/initials-grayscale-high.svg)<br/><sub>High Contrast</sub><br/><br/>![grayscale Low Contrast](./preview_assets/initials-grayscale-low.svg)<br/><sub>Low Contrast</sub> |

## 📦 Installation

```bash
npm install @avamier/avatar-generator
````

## 🚀 Usage

The package exports three main functions: `generateAvatar`, `registerStyle`, and `registerPalette`.

### Generating an Avatar

To generate an avatar, import `generateAvatar` and provide a seed string. You can optionally specify a `type`, `palette`, `contrast`, `size`, and `displayName`.

```typescript
import { generateAvatar } from '@avamier/avatar-generator';

const seed = 'a-unique-user-seed-string';

// Generate a default (block style, monokai palette) 100x100px avatar
const blockAvatar = generateAvatar(seed);

// Generate a built-in "nebula" style avatar with the "pride" palette
const nebulaAvatar = generateAvatar(seed, { type: 'nebula', palette: 'pride' });

// Generate a larger, low-contrast "initials" avatar
const initialsAvatar = generateAvatar(seed, {
  type: 'initials',
  size: 250,
  contrast: 'low',
  displayName: 'Ava Mier'
});

// You can now use this data URI directly in an image tag:
// <img src={nebulaAvatar} alt="User Avatar" />
```

### Creating and Registering a Custom Style or Palette

This package is designed to be extensible. You can create your own styles and palettes and register them for use throughout your application.

**1. Define your custom style/palette:**
Create a file for your style. It must export an object that conforms to the `AvatarStyle` or `ColorPalette` interface.

```typescript
// my-app/src/styles/custom-checkerboard.ts
import { AvatarStyle } from '@avamier/avatar-generator';

const generateCheckerboard = (hash, size, palette) => {
  // ... your custom SVG generation logic ...
  return `<svg>...</svg>`;
};

export const checkerboardStyle: AvatarStyle = {
  name: 'checkerboard',
  generate: generateCheckerboard,
};
```

**2. Register your style/palette:**
In your application's main entry point (e.g., `main.tsx` or `App.tsx`), import and register your new style. This only needs to be done once.

```typescript
// my-app/src/main.tsx
import { registerStyle } from '@avamier/avatar-generator';
import { checkerboardStyle } from './styles/custom-checkerboard';

registerStyle(checkerboardStyle);
```

**3. Use your custom style:**
Now you can use your new style by name anywhere in your application.

```typescript
const customAvatar = generateAvatar(seed, { type: 'checkerboard' });
```

## 🛠️ Development & Setup

This project is written in TypeScript and includes a testing suite and a live preview script for local development.

### Prerequisites

  * Node.js and npm
  * TypeScript

### Local Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/avamier/avatar-generator.git](https://github.com/avamier/avatar-generator.git)
    cd avatar-generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Development Scripts

  - **Live Preview:** To see a style guide of all built-in styles and palettes, use the `dev:preview` script. This creates a `preview.html` file in the root directory that you can open in your browser.

    ```bash
    # Generate a preview with a default seed
    npm run dev:preview

    # Generate a preview with a custom seed phrase
    npm run dev:preview -- "your-custom-seed"
    ```

  - **Build:** To compile the TypeScript code from `src` into JavaScript in the `dist` directory for publishing.

    ```bash
    npm run build
    ```

## 🧪 Testing

This project uses Jest for unit and snapshot testing. The test suite is automated to test every combination of built-in styles and palettes.

  - **Run Tests:**

    ```bash
    npm test
    ```

  - **Update Snapshots:** If you make an intentional change to the visual output of the generator, you can update the saved snapshots.

    ```bash
    npm test -- -u
    ```

## 📦 Publishing to NPM

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Login to NPM:**

    ```bash
    npm login
    ```

3.  **Publish:**

    ```bash
    npm publish --access public
    ```