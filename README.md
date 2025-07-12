# Deterministic Avatar Generator

A lightweight, zero-dependency TypeScript package for generating unique, SVG-based identicon avatars from a seed string.

This package is designed to be extensible, allowing developers to register their own custom avatar styles and color palettes. It's perfect for user profiles, default avatars, or any application where a deterministic, visually pleasing placeholder image is needed.

## ✨ Features

- **Extensible Styles:** Comes with several built-in styles (`block`, `gradient`, `rings`, `stripes`, `nebula`, `polygon`, `bauhaus`, `pixel`, `initials`) and allows developers to easily register their own.
- **Extensible Palettes:** Includes a variety of built-in color palettes (`monokai`, `pride`, `muted`, `dark`, `light`, `grayscale`) with high and low contrast modes, and allows for custom palette registration.
- **Deterministic:** The same input seed will always produce the exact same avatar.
- **Zero Dependencies:** Runs in any Node.js or browser environment without needing external packages.
- **SVG Output:** Generates a clean, scalable SVG image as a Base64 data URI, perfect for use in `<img>` tags.

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