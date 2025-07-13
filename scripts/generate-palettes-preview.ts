/**
 * @file This script generates a preview of all available color palettes.
 * It creates an interactive HTML file and a static Markdown file for documentation.
 */

import { allPalettes } from '../src/palettes/index.js';
import * as fs from 'fs';
import * as path from 'path';

// --- CONFIGURATION ---
const HTML_OUTPUT_FILE = 'palettes.html';
const MD_OUTPUT_FILE = 'PALETTES.md';

/**
 * Generates an HTML file and a Markdown file to preview all color palettes.
 */
function createPalettePreview() {
  console.log('Generating color palette previews...');

  let htmlSections = '';
  let markdownTableRows = '';

  // --- Main Loop for Generating HTML and Markdown ---
  allPalettes.forEach((palette) => {
    const colors = [...palette.colors];

    // --- HTML Generation (Remains the same) ---
    let swatchesHtml = '';
    colors.forEach((color) => {
      swatchesHtml += `
        <div class="color-swatch-container">
          <div class="color-swatch" style="background-color: ${color};"></div>
          <p class="color-code">${color}</p>
        </div>
      `;
    });

    htmlSections += `
      <section class="palette-section">
        <h2 class="palette-name">${palette.name}</h2>
        <div class="swatch-grid">
          ${swatchesHtml}
        </div>
      </section>
    `;

    // --- Markdown Generation (Refactored for a single table) ---
    const markdownSwatches = colors
      .map(
        (color) =>
          `<img src="https://placehold.co/20x20/${color.substring(
            1
          )}/${color.substring(1)}.png" alt="${color}" title="${color}">`
      )
      .join(' ');

    markdownTableRows += `| \`${palette.name}\` | ${markdownSwatches} |\n`;
  });

  // --- Assemble and Write HTML File ---
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Color Palette Guide</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #111; color: #eee; margin: 0; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; }
        h1 { color: #a855f7; font-size: 2.5rem; margin-bottom: 0.5rem; }
        .palette-section { margin-bottom: 4rem; }
        .palette-name { font-size: 2rem; color: #d8b4fe; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-bottom: 1.5rem; text-transform: capitalize; }
        .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1.5rem; }
        .color-swatch-container { background-color: #1f1f1f; border-radius: 8px; padding: 1rem; border: 1px solid #2a2a2a; text-align: center; }
        .color-swatch { width: 100%; height: 80px; border-radius: 4px; margin-bottom: 0.5rem; }
        .color-code { font-family: monospace; font-size: 0.9rem; color: #aaa; margin: 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Color Palette Guide</h1>
      </div>
      ${htmlSections}
    </body>
    </html>
  `;

  const htmlOutputPath = path.join(process.cwd(), HTML_OUTPUT_FILE);
  fs.writeFileSync(htmlOutputPath, htmlContent);
  console.log(
    `✅ HTML palette guide generated! Open ${HTML_OUTPUT_FILE} in your browser.`
  );

  // --- Assemble and Write Markdown File ---
  const markdownContent = `## 🎨 Available Color Palettes\n\nThis document shows a preview for each available color palette.\n\n| Palette | Colors |\n|:---|:---|\n${markdownTableRows}`;
  const mdOutputPath = path.join(process.cwd(), MD_OUTPUT_FILE);
  fs.writeFileSync(mdOutputPath, markdownContent);
  console.log(`✅ Markdown palette preview generated! See ${MD_OUTPUT_FILE}.`);
}

createPalettePreview();
