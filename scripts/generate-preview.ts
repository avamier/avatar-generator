import { Buffer } from 'node:buffer';
import { generateAvatar } from '../src/index.js';
import { allStyles } from '../src/styles/index.js';
import { allPalettes } from '../src/palettes/index.js';
import * as fs from 'fs';
import * as path from 'path';

// Read the seed from the command line, or use a default.
const PREVIEW_SEED = process.argv[2] || 'live-preview-seed-string';
const PREVIEW_SIZE = 150;
const OUTPUT_FILE = 'preview.html';

/**
 * Generates a comprehensive HTML style guide for all avatar combinations.
 */
function createPreview() {
  console.log(`Generating comprehensive avatar style guide for seed: "${PREVIEW_SEED}"`);

  let sectionsHtml = '';

  // Loop through each style to create a section
  allStyles.forEach(style => {
    let palettesHtml = '';
    // Inside each style section, loop through each palette
    allPalettes.forEach(palette => {
      // Generate both high and low contrast versions
      const highContrastAvatar = generateAvatar(PREVIEW_SEED, {
        type: style.name,
        palette: palette.name,
        contrast: 'high',
        size: PREVIEW_SIZE,
        displayName: 'Ava Mier', // Provide a sample name for the 'initials' style
      });
      const lowContrastAvatar = generateAvatar(PREVIEW_SEED, {
        type: style.name,
        palette: palette.name,
        contrast: 'low',
        size: PREVIEW_SIZE,
        displayName: 'Ava Mier',
      });

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
    });

    sectionsHtml += `
      <section class="style-section">
        <h2 class="style-name">${style.name}</h2>
        <div class="palette-grid">
          ${palettesHtml}
        </div>
      </section>
    `;
  });

  // Assemble the final HTML file
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
        .avatar-container img { border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
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

                const commandToCopy = 'npm run dev:preview -- "' + newSeed + '"';
                
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

  const outputPath = path.join(process.cwd(), OUTPUT_FILE);
  fs.writeFileSync(outputPath, htmlContent);

  console.log(`✅ Style guide generated! Open ${OUTPUT_FILE} in your browser.`);
}

createPreview();
