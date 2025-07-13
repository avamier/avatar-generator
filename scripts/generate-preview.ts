/**
 * @file This script generates a preview of all available avatar styles and palettes.
 * It creates an interactive HTML file and a static Markdown file for documentation.
 */

import { Buffer } from 'node:buffer';
import { generateAvatar } from '../src/index.js';
import { allStyles } from '../src/styles/index.js';
import { allPalettes } from '../src/palettes/index.js';
import * as fs from 'fs';
import * as path from 'path';

// --- CONFIGURATION ---
const PREVIEW_SEED = process.argv[2] || 'live-preview-seed-string';
const HTML_PREVIEW_SIZE = 150; // Size for the interactive HTML preview
const MARKDOWN_IMAGE_SIZE = 100; // A smaller, more compact size for the README
const HTML_OUTPUT_FILE = 'preview.html';
const MD_OUTPUT_FILE = 'PREVIEW.md';
const ASSETS_DIR = 'preview_assets';


/**
 * Decodes a base64 data URI and returns the raw SVG string.
 * @param dataUri The base64 data URI to decode.
 * @returns The raw SVG string.
 */
function decodeBase64Svg(dataUri: string): string {
  const base64Data = dataUri.split(',')[1];
  return Buffer.from(base64Data, 'base64').toString('utf8');
}


/**
 * Generates a comprehensive HTML style guide and a Markdown file
 * for all avatar combinations.
 */
function createPreview() {
  console.log(`Generating avatar previews for seed: "${PREVIEW_SEED}"`);

  // Create the assets directory if it doesn't exist
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR);
    console.log(`Created assets directory: ./${ASSETS_DIR}`);
  }

  let sectionsHtml = ''; // For the HTML file

  // --- Refactored Markdown Table Generation ---

  // 1. Build the header row with palette names
  let mdHeader = `| Style |`;
  allPalettes.forEach(palette => {
    mdHeader += ` ${palette.name} |`;
  });

  // 2. Build the separator row
  let mdSeparator = `|:---:|`;
  allPalettes.forEach(() => {
    mdSeparator += `:---:|`;
  });

  let markdownTable = `${mdHeader}\n${mdSeparator}\n`;

  // --- Main Loop for Generating HTML and Markdown ---
  allStyles.forEach(style => {
    let palettesHtml = ''; // For the HTML file
    let mdRow = `| **${style.name}** |`; // Start a new row for the Markdown table

    // Loop through each palette to generate avatars and build the row/section content
    allPalettes.forEach(palette => {
      // --- Generate Avatars ---
      const highContrastAvatar = generateAvatar(PREVIEW_SEED, {
        type: style.name,
        palette: palette.name,
        contrast: 'high',
        size: HTML_PREVIEW_SIZE,
        displayName: 'Ava Mier',
      });
      const lowContrastAvatar = generateAvatar(PREVIEW_SEED, {
        type: style.name,
        palette: palette.name,
        contrast: 'low',
        size: HTML_PREVIEW_SIZE,
        displayName: 'Ava Mier',
      });

      // --- HTML Generation (for preview.html) ---
      palettesHtml += `
        <div class="palette-group">
          <h3 class="palette-name">${palette.name}</h3>
          <div class="avatar-pair">
            <div class="avatar-container">
              <img src="${highContrastAvatar}" alt="High Contrast Avatar" />
              <p>High Contrast</p>
            </div>
            <div class="avatar-container">
              <img src="${lowContrastAvatar}" alt="Low Contrast Avatar" />
              <p>Low Contrast</p>
            </div>
          </div>
        </div>
      `;

      // --- Markdown Asset Generation (for PREVIEW.md) ---
      const highContrastFileName = `${style.name}-${palette.name}-high.svg`;
      const lowContrastFileName = `${style.name}-${palette.name}-low.svg`;
      fs.writeFileSync(path.join(ASSETS_DIR, highContrastFileName), decodeBase64Svg(highContrastAvatar));
      fs.writeFileSync(path.join(ASSETS_DIR, lowContrastFileName), decodeBase64Svg(lowContrastAvatar));

      // Build a single cell for the Markdown table containing both images
      const highContrastImageMd = `<img src="./${ASSETS_DIR}/${highContrastFileName}" alt="${palette.name} High Contrast" width="${MARKDOWN_IMAGE_SIZE}">`;
      const lowContrastImageMd = `<img src="./${ASSETS_DIR}/${lowContrastFileName}" alt="${palette.name} Low Contrast" width="${MARKDOWN_IMAGE_SIZE}">`;
      mdRow += ` ${highContrastImageMd}<br/><sub>High Contrast</sub><br/><br/>${lowContrastImageMd}<br/><sub>Low Contrast</sub> |`;
    });

    // --- Assemble HTML Section ---
    sectionsHtml += `
      <section class="style-section">
        <h2 class="style-name">${style.name}</h2>
        <div class="palette-grid">
          ${palettesHtml}
        </div>
      </section>
    `;
    
    // --- Add Completed Row to Markdown Table ---
    markdownTable += `${mdRow}\n`;
  });

  // --- Assemble and Write HTML File ---
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Avatar Generator Style Guide</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #111; color: #eee; margin: 0; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        h1 { color: #a855f7; font-size: 2.5rem; margin-bottom: 0.5rem; }
        .seed-display { font-size: 0.9rem; color: #888; }
        .seed-display code { background-color: #333; padding: 2px 6px; border-radius: 4px; }
        .controls { display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; }
        .controls input { background-color: #2a2a2a; border: 1px solid #444; color: #eee; padding: 0.5rem; border-radius: 4px; font-family: monospace; }
        .controls button { background-color: #8b5cf6; border: none; color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background-color 0.2s; }
        .controls button:hover { background-color: #7c3aed; }
        .style-section { margin-bottom: 4rem; }
        .style-name { font-size: 2rem; color: #d8b4fe; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-bottom: 1.5rem; text-transform: capitalize; }
        .palette-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
        .palette-group { background-color: #1f1f1f; border-radius: 8px; padding: 1rem; border: 1px solid #2a2a2a; }
        .palette-name { text-align: center; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem; color: #c4b5fd; text-transform: capitalize; }
        .avatar-pair { display: flex; justify-content: space-around; align-items: center; gap: 1rem; }
        .avatar-container { text-align: center; }
        .avatar-container img { border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); width: ${HTML_PREVIEW_SIZE}px; height: ${HTML_PREVIEW_SIZE}px; }
        .avatar-container p { font-size: 0.8rem; color: #888; margin-top: 0.5rem; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Avatar Generator Style Guide</h1>
        <p class="seed-display">Displaying results for seed: <code>${PREVIEW_SEED}</code></p>
        <div class="controls">
            <input type="text" id="seed-input" placeholder="Enter new seed phrase...">
            <button id="regenerate-btn">Copy Command</button>
        </div>
      </div>
      ${sectionsHtml}

      <script>
        document.addEventListener('DOMContentLoaded', () => {
            const input = document.getElementById('seed-input');
            const button = document.getElementById('regenerate-btn');

            button.addEventListener('click', () => {
                const newSeed = input.value;
                if (!newSeed) {
                    alert('Please enter a seed phrase in the input box.');
                    return;
                }

                const commandToCopy = 'npm run preview -- "' + newSeed + '"';
                
                const textArea = document.createElement('textarea');
                textArea.value = commandToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        });
      </script>
    </body>
    </html>
  `;

  const htmlOutputPath = path.join(process.cwd(), HTML_OUTPUT_FILE);
  fs.writeFileSync(htmlOutputPath, htmlContent);
  console.log(`✅ HTML style guide generated! Open ${HTML_OUTPUT_FILE} in your browser.`);

  // --- Assemble and Write Markdown File ---
  const markdownContent = `## 🎨 Available Styles & Palettes\n\nThis table shows a preview for each style combined with each palette in both high and low contrast modes.\n\n${markdownTable}`;
  const mdOutputPath = path.join(process.cwd(), MD_OUTPUT_FILE);
  fs.writeFileSync(mdOutputPath, markdownContent);
  console.log(`✅ Markdown preview generated! See ${MD_OUTPUT_FILE}.`);
}

createPreview();
