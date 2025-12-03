/**
 * Add scaffold files to existing Beats that are missing them.
 *
 * Usage: npx tsx add-scaffold.ts [beat-id]
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type TemplateType = 'concept-tutorial' | 'strategic-framework';

async function copyScaffold(
  templateType: TemplateType,
  beatDir: string,
  beatId: string,
  beatTitle: string
): Promise<void> {
  const templatesDir = path.resolve(__dirname, '../_templates');
  const scaffoldDir = path.join(templatesDir, templateType, 'scaffold');

  // Check if scaffold directory exists
  try {
    await fs.promises.access(scaffoldDir);
  } catch {
    console.error(`Scaffold directory not found: ${scaffoldDir}`);
    return;
  }

  // Read all scaffold files
  const scaffoldFiles = await fs.promises.readdir(scaffoldDir);

  for (const filename of scaffoldFiles) {
    const sourcePath = path.join(scaffoldDir, filename);
    const destPath = path.join(beatDir, filename);

    const stat = await fs.promises.stat(sourcePath);
    if (stat.isDirectory()) {
      continue;
    }

    // Skip if file already exists (don't overwrite constants.tsx, etc.)
    try {
      await fs.promises.access(destPath);
      console.log(`  Skipping ${filename} (already exists)`);
      continue;
    } catch {
      // File doesn't exist, proceed
    }

    // Read file content
    let content = await fs.promises.readFile(sourcePath, 'utf-8');

    // Replace placeholders
    content = content.replace(/\{\{BEAT_ID\}\}/g, beatId);
    content = content.replace(/\{\{BEAT_TITLE\}\}/g, beatTitle);

    // Write to destination
    await fs.promises.writeFile(destPath, content, 'utf-8');
    console.log(`  Added ${filename}`);
  }
}

async function addScaffoldToBeat(beatId: string): Promise<void> {
  const beatsDir = path.resolve(__dirname, '..');
  const beatDir = path.join(beatsDir, beatId);

  // Check if beat exists
  try {
    await fs.promises.access(beatDir);
  } catch {
    console.error(`Beat not found: ${beatDir}`);
    return;
  }

  // Read metadata
  const metadataPath = path.join(beatDir, 'metadata.json');
  let metadata: { id: string; title: string; templateType: string };

  try {
    const metadataContent = await fs.promises.readFile(metadataPath, 'utf-8');
    metadata = JSON.parse(metadataContent);
  } catch (err) {
    console.error(`Could not read metadata: ${err}`);
    return;
  }

  console.log(`Adding scaffold to ${metadata.id} (${metadata.templateType})...`);

  await copyScaffold(
    metadata.templateType as TemplateType,
    beatDir,
    metadata.id,
    metadata.title
  );

  console.log('Done!');
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  // Find all beats missing scaffold files
  const beatsDir = path.resolve(__dirname, '..');
  const entries = await fs.promises.readdir(beatsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue;

    const beatDir = path.join(beatsDir, entry.name);
    const hasPackageJson = await fs.promises.access(path.join(beatDir, 'package.json')).then(() => true).catch(() => false);
    const hasMetadata = await fs.promises.access(path.join(beatDir, 'metadata.json')).then(() => true).catch(() => false);

    if (hasMetadata && !hasPackageJson) {
      console.log(`\nBeat "${entry.name}" is missing scaffold files.`);
      await addScaffoldToBeat(entry.name);
    }
  }
} else {
  await addScaffoldToBeat(args[0]);
}
