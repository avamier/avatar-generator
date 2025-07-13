# Deterministic Avatar Generator

A lightweight, zero-dependency TypeScript package for generating unique, SVG-based identicon avatars from a seed string.

This package is designed to be extensible, allowing developers to register their own custom avatar styles and color palettes. It's perfect for user profiles, default avatars, or any application where a deterministic, visually pleasing placeholder image is needed.

## ✨ Features

  - **Extensible Styles:** Comes with several built-in styles (`block`, `gradient`, `rings`, `stripes`, `nebula`, `polygon`, `bauhaus`, `pixel`, `initials`) and allows developers to easily register their own.
  - **Extensible Palettes:** Includes a variety of built-in color palettes (`monokai`, `pride`, `muted`, `cool`, `warm`, `grayscale`) with light and dark variants, and allows for custom palette registration.
  - **Deterministic:** The same input seed will always produce the exact same avatar.
  - **Zero Dependencies:** Runs in any Node.js or browser environment without needing external packages.
  - **SVG Output:** Generates a clean, scalable SVG image as a Base64 data URI, perfect for use in `<img>` tags.

## 🎨 Available Color Palettes

This document shows a preview for each available color palette.


### monokai

| Color | Hex Code |
|:---:|:---:|
| <img src="https://placehold.co/20x20/272822/272822.png" alt="#272822"> | `#272822` |
| <img src="https://placehold.co/20x20/383d3b/383d3b.png" alt="#383d3b"> | `#383d3b` |
| <img src="https://placehold.co/20x20/49483e/49483e.png" alt="#49483e"> | `#49483e` |
| <img src="https://placehold.co/20x20/75715e/75715e.png" alt="#75715e"> | `#75715e` |
| <img src="https://placehold.co/20x20/a59f85/a59f85.png" alt="#a59f85"> | `#a59f85` |
| <img src="https://placehold.co/20x20/f92672/f92672.png" alt="#f92672"> | `#f92672` |
| <img src="https://placehold.co/20x20/a6e22e/a6e22e.png" alt="#a6e22e"> | `#a6e22e` |
| <img src="https://placehold.co/20x20/f4bf75/f4bf75.png" alt="#f4bf75"> | `#f4bf75` |
| <img src="https://placehold.co/20x20/66d9ef/66d9ef.png" alt="#66d9ef"> | `#66d9ef` |
| <img src="https://placehold.co/20x20/ae81ff/ae81ff.png" alt="#ae81ff"> | `#ae81ff` |


### pride

| Color | Hex Code |
|:---:|:---:|
| <img src="https://placehold.co/20x20/e40303/e40303.png" alt="#e40303"> | `#e40303` |
| <img src="https://placehold.co/20x20/ff8c00/ff8c00.png" alt="#ff8c00"> | `#ff8c00` |
| <img src="https://placehold.co/20x20/ffed00/ffed00.png" alt="#ffed00"> | `#ffed00` |
| <img src="https://placehold.co/20x20/008026/008026.png" alt="#008026"> | `#008026` |
| <img src="https://placehold.co/20x20/004dff/004dff.png" alt="#004dff"> | `#004dff` |
| <img src="https://placehold.co/20x20/750787/750787.png" alt="#750787"> | `#750787` |
| <img src="https://placehold.co/20x20/ffffff/ffffff.png" alt="#ffffff"> | `#ffffff` |
| <img src="https://placehold.co/20x20/000000/000000.png" alt="#000000"> | `#000000` |
| <img src="https://placehold.co/20x20/613915/613915.png" alt="#613915"> | `#613915` |
| <img src="https://placehold.co/20x20/ffafc8/ffafc8.png" alt="#ffafc8"> | `#ffafc8` |


### muted

| Color | Hex Code |
|:---:|:---:|
| <img src="https://placehold.co/20x20/5a6a62/5a6a62.png" alt="#5a6a62"> | `#5a6a62` |
| <img src="https://placehold.co/20x20/6e8179/6e8179.png" alt="#6e8179"> | `#6e8179` |
| <img src="https://placehold.co/20x20/839990/839990.png" alt="#839990"> | `#839990` |
| <img src="https://placehold.co/20x20/97b1a7/97b1a7.png" alt="#97b1a7"> | `#97b1a7` |
| <img src="https://placehold.co/20x20/acb9b1/acb9b1.png" alt="#acb9b1"> | `#acb9b1` |
| <img src="https://placehold.co/20x20/e0e0e0/e0e0e0.png" alt="#e0e0e0"> | `#e0e0e0` |
| <img src="https://placehold.co/20x20/c7c7c7/c7c7c7.png" alt="#c7c7c7"> | `#c7c7c7` |
| <img src="https://placehold.co/20x20/aeaeae/aeaeae.png" alt="#aeaeae"> | `#aeaeae` |
| <img src="https://placehold.co/20x20/959595/959595.png" alt="#959595"> | `#959595` |
| <img src="https://placehold.co/20x20/7d7d7d/7d7d7d.png" alt="#7d7d7d"> | `#7d7d7d` |


### warm

| Color | Hex Code |
|:---:|:---:|
| <img src="https://placehold.co/20x20/AF165E/AF165E.png" alt="#AF165E"> | `#AF165E` |
| <img src="https://placehold.co/20x20/EE092D/EE092D.png" alt="#EE092D"> | `#EE092D` |
| <img src="https://placehold.co/20x20/FF6302/FF6302.png" alt="#FF6302"> | `#FF6302` |
| <img src="https://placehold.co/20x20/e96616/e96616.png" alt="#e96616"> | `#e96616` |
| <img src="https://placehold.co/20x20/D60457/D60457.png" alt="#D60457"> | `#D60457` |
| <img src="https://placehold.co/20x20/FC9F1B/FC9F1B.png" alt="#FC9F1B"> | `#FC9F1B` |
| <img src="https://placehold.co/20x20/FFBD27/FFBD27.png" alt="#FFBD27"> | `#FFBD27` |
| <img src="https://placehold.co/20x20/FFE72B/FFE72B.png" alt="#FFE72B"> | `#FFE72B` |
| <img src="https://placehold.co/20x20/FCE77D/FCE77D.png" alt="#FCE77D"> | `#FCE77D` |
| <img src="https://placehold.co/20x20/ffca7b/ffca7b.png" alt="#ffca7b"> | `#ffca7b` |


### cool

| Color | Hex Code |
|:---:|:---:|
| <img src="https://placehold.co/20x20/09186D/09186D.png" alt="#09186D"> | `#09186D` |
| <img src="https://placehold.co/20x20/2B3252/2B3252.png" alt="#2B3252"> | `#2B3252` |
| <img src="https://placehold.co/20x20/3D155F/3D155F.png" alt="#3D155F"> | `#3D155F` |
| <img src="https://placehold.co/20x20/021c41/021c41.png" alt="#021c41"> | `#021c41` |
| <img src="https://placehold.co/20x20/4D4C53/4D4C53.png" alt="#4D4C53"> | `#4D4C53` |
| <img src="https://placehold.co/20x20/8AAAE5/8AAAE5.png" alt="#8AAAE5"> | `#8AAAE5` |
| <img src="https://placehold.co/20x20/bde8f1/bde8f1.png" alt="#bde8f1"> | `#bde8f1` |
| <img src="https://placehold.co/20x20/819fa7/819fa7.png" alt="#819fa7"> | `#819fa7` |
| <img src="https://placehold.co/20x20/CDC6B4/CDC6B4.png" alt="#CDC6B4"> | `#CDC6B4` |
| <img src="https://placehold.co/20x20/dfe5f3/dfe5f3.png" alt="#dfe5f3"> | `#dfe5f3` |


### grayscale

| Color | Hex Code |
|:---:|:---:|
| <img src="https://placehold.co/20x20/222222/222222.png" alt="#222222"> | `#222222` |
| <img src="https://placehold.co/20x20/333333/333333.png" alt="#333333"> | `#333333` |
| <img src="https://placehold.co/20x20/444444/444444.png" alt="#444444"> | `#444444` |
| <img src="https://placehold.co/20x20/555555/555555.png" alt="#555555"> | `#555555` |
| <img src="https://placehold.co/20x20/666666/666666.png" alt="#666666"> | `#666666` |
| <img src="https://placehold.co/20x20/eeeeee/eeeeee.png" alt="#eeeeee"> | `#eeeeee` |
| <img src="https://placehold.co/20x20/dddddd/dddddd.png" alt="#dddddd"> | `#dddddd` |
| <img src="https://placehold.co/20x20/cccccc/cccccc.png" alt="#cccccc"> | `#cccccc` |
| <img src="https://placehold.co/20x20/bbbbbb/bbbbbb.png" alt="#bbbbbb"> | `#bbbbbb` |
| <img src="https://placehold.co/20x20/aaaaaa/aaaaaa.png" alt="#aaaaaa"> | `#aaaaaa` |

## 🖼️ Available Styles & Palettes

This table shows a preview for each style combined with each palette in both light and dark variants.

| Style | monokai | pride | muted | warm | cool | grayscale |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **block** | <img src="./preview_assets/block-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/block-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/block-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/block-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/block-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/block-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/block-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/block-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/block-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/block-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/block-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/block-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **gradient** | <img src="./preview_assets/gradient-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/gradient-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/gradient-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/gradient-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/gradient-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/gradient-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/gradient-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/gradient-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/gradient-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/gradient-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/gradient-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/gradient-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **rings** | <img src="./preview_assets/rings-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/rings-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/rings-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/rings-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/rings-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/rings-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/rings-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/rings-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/rings-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/rings-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/rings-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/rings-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **stripes** | <img src="./preview_assets/stripes-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/stripes-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/stripes-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/stripes-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/stripes-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/stripes-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/stripes-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/stripes-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/stripes-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/stripes-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/stripes-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/stripes-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **nebula** | <img src="./preview_assets/nebula-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/nebula-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/nebula-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/nebula-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/nebula-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/nebula-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/nebula-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/nebula-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/nebula-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/nebula-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/nebula-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/nebula-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **polygon** | <img src="./preview_assets/polygon-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/polygon-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/polygon-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/polygon-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/polygon-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/polygon-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/polygon-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/polygon-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/polygon-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/polygon-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/polygon-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/polygon-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **bauhaus** | <img src="./preview_assets/bauhaus-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/bauhaus-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/bauhaus-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/bauhaus-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/bauhaus-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/bauhaus-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/bauhaus-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/bauhaus-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/bauhaus-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/bauhaus-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/bauhaus-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/bauhaus-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **pixel** | <img src="./preview_assets/pixel-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/pixel-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/pixel-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/pixel-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/pixel-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/pixel-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/pixel-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/pixel-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/pixel-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/pixel-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/pixel-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/pixel-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |
| **initials** | <img src="./preview_assets/initials-monokai-light.svg" alt="monokai Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/initials-monokai-dark.svg" alt="monokai Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/initials-pride-light.svg" alt="pride Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/initials-pride-dark.svg" alt="pride Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/initials-muted-light.svg" alt="muted Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/initials-muted-dark.svg" alt="muted Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/initials-warm-light.svg" alt="warm Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/initials-warm-dark.svg" alt="warm Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/initials-cool-light.svg" alt="cool Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/initials-cool-dark.svg" alt="cool Dark Variant" width="100"><br/><sub>Dark Variant</sub> | <img src="./preview_assets/initials-grayscale-light.svg" alt="grayscale Light Variant" width="100"><br/><sub>Light Variant</sub><br/><br/><img src="./preview_assets/initials-grayscale-dark.svg" alt="grayscale Dark Variant" width="100"><br/><sub>Dark Variant</sub> |

## 📦 Installation

```bash
npm install @avamier/avatar-generator
```

## 🚀 Usage

The package exports three main functions: `generateAvatar`, `registerStyle`, and `registerPalette`.

### Generating an Avatar

To generate an avatar, import `generateAvatar` and provide a seed string. You can optionally specify a `type`, `palette`, `variant`, `size`, and `displayName`.

```typescript
import { generateAvatar } from '@avamier/avatar-generator';

const seed = 'a-unique-user-seed-string';

// Generate a default (block style, cool palette) 100x100px avatar
const blockAvatar = generateAvatar(seed);

// Generate a built-in "nebula" style avatar with the "pride" palette
const nebulaAvatar = generateAvatar(seed, { type: 'nebula', palette: 'pride' });

// Generate a larger, dark-variant "initials" avatar
const initialsAvatar = generateAvatar(seed, {
  type: 'initials',
  size: 250,
  variant: 'dark',
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
import { AvatarStyle, AvatarOptions } from '@avamier/avatar-generator';

const generateCheckerboard = (hash: number, options: AvatarOptions): string => {
  const { size = 100, palette } = options;
  const [color1, color2] = palette.colors;
  const cellSize = size / 8;
  let rects = '';

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const color = (x + y) % 2 === 0 ? color1 : color2;
      rects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
    }
  }
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
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

This project is written in TypeScript and includes a testing suite and live preview scripts for local development.

### Prerequisites

  * Node.js and npm
  * TypeScript

### Local Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/avamier/avatar-generator.git
    cd avatar-generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Development Scripts

  - **Live Previews:** To see a style guide of all built-in styles and palettes, use the preview scripts.

      - **Styles Preview:** Generates `preview.html` with all style/palette combinations.
      - **Palettes Preview:** Generates `palettes.html` with a detailed view of each color palette.

    <!-- end list -->

    ```bash
    # Generate a preview of all styles
    npm run preview:styles

    # Generate a preview of all styles with a custom seed
    npm run preview:styles -- "your-custom-seed"

    # Generate a preview of all palettes
    npm run preview:palettes
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