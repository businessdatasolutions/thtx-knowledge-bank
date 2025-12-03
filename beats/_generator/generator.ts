/**
 * Beat Generator
 *
 * Core generation logic for creating Beats from source material.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parseSourceMaterial, parseContent, type ParseResult } from './parsers';
import { generatePrompts } from './prompts';
import type {
  TemplateType,
  BeatMetadata,
  ConceptTutorialContent,
  StrategicFrameworkContent,
} from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface GeneratorOptions {
  /** Path to source material file */
  sourcePath?: string;
  /** Raw source content (alternative to sourcePath) */
  sourceContent?: string;
  /** Filename hint for sourceContent */
  sourceFilename?: string;
  /** Template type to generate */
  templateType: TemplateType;
  /** Output name (kebab-case, will be used for folder name) */
  outputName: string;
  /** Target audience description */
  targetAudience?: string;
  /** Specific topics to focus on */
  focusTopics?: string[];
  /** Number of scenarios (for concept-tutorial) */
  scenarioCount?: number;
  /** X-axis concept (for strategic-framework) */
  xAxisConcept?: string;
  /** Y-axis concept (for strategic-framework) */
  yAxisConcept?: string;
}

export interface GeneratedBeat {
  /** Beat metadata */
  metadata: BeatMetadata;
  /** Generated content (type depends on templateType) */
  content: ConceptTutorialContent | StrategicFrameworkContent;
  /** Prompts used for generation (for debugging) */
  prompts: { system: string; user: string };
  /** Source material info */
  source: ParseResult;
}

/**
 * Parse the source material.
 */
async function getSourceMaterial(options: GeneratorOptions): Promise<ParseResult> {
  if (options.sourcePath) {
    return parseSourceMaterial(options.sourcePath);
  }

  if (options.sourceContent) {
    return parseContent(options.sourceContent, options.sourceFilename);
  }

  throw new Error('Either sourcePath or sourceContent must be provided');
}

/**
 * Generate prompts for AI content generation.
 */
function buildPrompts(
  templateType: TemplateType,
  source: ParseResult,
  options: GeneratorOptions
): { system: string; user: string } {
  const promptOptions: Record<string, unknown> = {
    targetAudience: options.targetAudience,
  };

  if (templateType === 'concept-tutorial') {
    promptOptions.focusTopics = options.focusTopics;
    promptOptions.scenarioCount = options.scenarioCount || 4;
  }

  if (templateType === 'strategic-framework') {
    promptOptions.xAxisConcept = options.xAxisConcept;
    promptOptions.yAxisConcept = options.yAxisConcept;
  }

  return generatePrompts(templateType, source, promptOptions);
}

/**
 * Validate generated content against schema.
 */
function validateContent(
  content: unknown,
  templateType: TemplateType
): string[] {
  const errors: string[] = [];

  if (!content || typeof content !== 'object') {
    errors.push('Content must be an object');
    return errors;
  }

  const obj = content as Record<string, unknown>;

  // Check metadata
  if (!obj.metadata || typeof obj.metadata !== 'object') {
    errors.push('Missing metadata');
  } else {
    const meta = obj.metadata as Record<string, unknown>;
    if (!meta.id) errors.push('Missing metadata.id');
    if (!meta.title) errors.push('Missing metadata.title');
    if (meta.templateType !== templateType) {
      errors.push(`Invalid templateType: expected ${templateType}`);
    }
  }

  // Template-specific validation
  if (templateType === 'concept-tutorial') {
    if (!obj.intro) errors.push('Missing intro');
    if (!obj.scenarios || !Array.isArray(obj.scenarios)) {
      errors.push('Missing or invalid scenarios array');
    }
  }

  if (templateType === 'strategic-framework') {
    if (!obj.framework) errors.push('Missing framework');
    if (!obj.context) errors.push('Missing context');
  }

  return errors;
}

/**
 * Copy template scaffold files to Beat directory.
 * Replaces {{BEAT_ID}} and {{BEAT_TITLE}} placeholders.
 */
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
    console.warn(`Scaffold directory not found: ${scaffoldDir}`);
    return;
  }

  // Read all scaffold files
  const scaffoldFiles = await fs.promises.readdir(scaffoldDir);

  for (const filename of scaffoldFiles) {
    const sourcePath = path.join(scaffoldDir, filename);
    const destPath = path.join(beatDir, filename);

    const stat = await fs.promises.stat(sourcePath);
    if (stat.isDirectory()) {
      // Skip directories (we don't have nested scaffold dirs)
      continue;
    }

    // Read file content
    let content = await fs.promises.readFile(sourcePath, 'utf-8');

    // Replace placeholders
    content = content.replace(/\{\{BEAT_ID\}\}/g, beatId);
    content = content.replace(/\{\{BEAT_TITLE\}\}/g, beatTitle);

    // Write to destination
    await fs.promises.writeFile(destPath, content, 'utf-8');
  }
}

/**
 * Save generated Beat to disk.
 */
async function saveBeat(
  beat: GeneratedBeat,
  outputDir: string
): Promise<string> {
  const beatDir = path.join(outputDir, beat.metadata.id);

  // Create directory
  await fs.promises.mkdir(beatDir, { recursive: true });

  // Copy scaffold files from template
  await copyScaffold(
    beat.metadata.templateType as TemplateType,
    beatDir,
    beat.metadata.id,
    beat.metadata.title
  );

  // Save content as constants.tsx (overwrites scaffold placeholder)
  const constantsContent = `/**
 * ${beat.metadata.title}
 *
 * Generated Beat content.
 * Template: ${beat.metadata.templateType}
 * Generated: ${new Date().toISOString()}
 */

export const BEAT_CONTENT = ${JSON.stringify(beat.content, null, 2)} as const;

export default BEAT_CONTENT;
`;

  await fs.promises.writeFile(
    path.join(beatDir, 'constants.tsx'),
    constantsContent,
    'utf-8'
  );

  // Save metadata
  await fs.promises.writeFile(
    path.join(beatDir, 'metadata.json'),
    JSON.stringify(beat.metadata, null, 2),
    'utf-8'
  );

  // Save prompts for debugging
  await fs.promises.writeFile(
    path.join(beatDir, '_prompts.json'),
    JSON.stringify(beat.prompts, null, 2),
    'utf-8'
  );

  return beatDir;
}

/**
 * Update the catalog with the new Beat.
 */
async function updateCatalog(
  metadata: BeatMetadata,
  catalogPath: string
): Promise<void> {
  let catalog: { lastUpdated: string; baseUrl: string; beats: BeatMetadata[] };

  try {
    const catalogContent = await fs.promises.readFile(catalogPath, 'utf-8');
    catalog = JSON.parse(catalogContent);
  } catch {
    // Create new catalog if doesn't exist
    catalog = {
      lastUpdated: new Date().toISOString().split('T')[0],
      baseUrl: 'https://businessdatasolutions.github.io/thtx-knowledge-bank',
      beats: [],
    };
  }

  // Remove existing entry with same ID
  catalog.beats = catalog.beats.filter(b => b.id !== metadata.id);

  // Add new entry
  catalog.beats.push({
    ...metadata,
    path: `/${metadata.id}/`,
    published: true,
  } as any);

  // Update timestamp
  catalog.lastUpdated = new Date().toISOString().split('T')[0];

  // Save catalog
  await fs.promises.writeFile(catalogPath, JSON.stringify(catalog, null, 2), 'utf-8');
}

/**
 * Main generator function.
 *
 * This prepares everything for AI generation but does not call the AI directly.
 * The prompts should be used with Claude or another LLM to generate the content.
 *
 * @param options - Generator options
 * @returns Object with prompts and source info for AI generation
 */
export async function prepareGeneration(options: GeneratorOptions): Promise<{
  prompts: { system: string; user: string };
  source: ParseResult;
  outputName: string;
  templateType: TemplateType;
}> {
  // Parse source material
  const source = await getSourceMaterial(options);

  // Generate prompts
  const prompts = buildPrompts(options.templateType, source, options);

  return {
    prompts,
    source,
    outputName: options.outputName,
    templateType: options.templateType,
  };
}

/**
 * Finalize Beat generation after receiving AI-generated content.
 *
 * @param content - AI-generated content (JSON parsed)
 * @param preparation - Result from prepareGeneration
 * @param outputDir - Directory to save the Beat (default: beats/)
 * @returns Generated Beat info
 */
export async function finalizeGeneration(
  content: ConceptTutorialContent | StrategicFrameworkContent,
  preparation: Awaited<ReturnType<typeof prepareGeneration>>,
  outputDir: string = path.join(process.cwd(), 'beats')
): Promise<GeneratedBeat> {
  // Validate content
  const errors = validateContent(content, preparation.templateType);
  if (errors.length > 0) {
    throw new Error(`Content validation failed:\n${errors.join('\n')}`);
  }

  // Build Beat object
  const beat: GeneratedBeat = {
    metadata: content.metadata,
    content,
    prompts: preparation.prompts,
    source: preparation.source,
  };

  // Save to disk
  const beatDir = await saveBeat(beat, outputDir);
  console.log(`Beat saved to: ${beatDir}`);

  // Update catalog
  const catalogPath = path.join(outputDir, '_catalog', 'beats.json');
  try {
    await updateCatalog(content.metadata, catalogPath);
    console.log(`Catalog updated: ${catalogPath}`);
  } catch (error) {
    console.warn(`Could not update catalog: ${error}`);
  }

  return beat;
}

export default {
  prepareGeneration,
  finalizeGeneration,
  validateContent,
};
