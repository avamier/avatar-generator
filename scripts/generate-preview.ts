/**
 * @file This script generates a preview of all available avatar styles and palettes.
 * It also generates a Markdown file that can be copied into the README.
 */

import { AvatarGenerator } from '../src';
import { allStyles } from '../src/styles';
import { allPalettes } from '../src/palettes';
import fs from 'fs';
import path from 'path';

const previewDir = path.join(__dirname, '..', 'preview');

async function generate() {
  try {
    // Create the preview directory if it doesn't exist
    if (!fs.existsSync(previewDir)) {
      fs.mkdirSync(previewDir);
    }

    const generator = new AvatarGenerator();
    let markdown = '# Avatar Previews\n\n';
    markdown += '| Style | Palette | Preview |\n';
    markdown += '|---|---|---|\n';

    for (const style of Object.keys(allStyles)) {
      for (const palette of Object.keys(allPalettes)) {
        // Generate the avatar
        const svg = await generator.generate({
          style: style as any,
          palette: palette as any,
          // Provide a sample name for the 'initials' style to ensure consistent output
          displayName: 'Ava Mier',
        });

        // Save the avatar to a file
        const fileName = `${style}-${palette}.svg`;
        const filePath = path.join(previewDir, fileName);
        fs.writeFileSync(filePath, svg);
        console.log(`Generated ${filePath}`);

        // Add a row to the Markdown table
        markdown += `| ${style} | ${palette} | ![[Preview](./preview/${fileName})](./preview/${fileName}) |\n`;
      }
    }

    // Write the Markdown to a file
    const markdownPath = path.join(previewDir, 'PREVIEW.md');
    fs.writeFileSync(markdownPath, markdown);
    console.log(`Generated ${markdownPath}`);

  } catch (error) {
    console.error('Error generating previews:', error);
  }
}

generate();