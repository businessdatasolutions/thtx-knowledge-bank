#!/usr/bin/env node
/**
 * Beat Generator CLI
 *
 * Command-line interface for generating Beats from source material.
 *
 * Usage:
 *   npx ts-node cli.ts --source <path> --template <type> --name <beat-name>
 *   npx ts-node cli.ts --interactive
 *
 * Examples:
 *   npx ts-node cli.ts --source ../articles/ai-strategy.md --template concept-tutorial --name ai-strategy-basics
 *   npx ts-node cli.ts -s transcript.txt -t strategic-framework -n market-positioning
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';
import { prepareGeneration, type GeneratorOptions } from './generator';
import type { TemplateType } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_TYPES: TemplateType[] = ['concept-tutorial', 'strategic-framework'];

interface CLIArgs {
  source?: string;
  template?: TemplateType;
  name?: string;
  audience?: string;
  interactive?: boolean;
  help?: boolean;
  outputPrompts?: boolean;
}

function printHelp(): void {
  console.log(`
THTX Beat Generator CLI
=======================

Generate interactive Beats from source material.

Usage:
  npx ts-node cli.ts [options]

Options:
  -s, --source <path>      Path to source material (markdown, transcript, or text)
  -t, --template <type>    Template type: concept-tutorial | strategic-framework
  -n, --name <name>        Output name for the Beat (kebab-case)
  -a, --audience <desc>    Target audience description
  -i, --interactive        Run in interactive mode
  -o, --output-prompts     Output prompts to console (for manual AI generation)
  -h, --help               Show this help message

Examples:
  # Generate prompts for a concept tutorial
  npx ts-node cli.ts -s article.md -t concept-tutorial -n my-beat -o

  # Interactive mode
  npx ts-node cli.ts -i

Workflow:
  1. Run this CLI with your source material
  2. Copy the generated prompts to Claude or another LLM
  3. Get the JSON response from the LLM
  4. Save the JSON as the Beat content

For more information, see the THTX Beats documentation.
`);
}

function parseArgs(args: string[]): CLIArgs {
  const result: CLIArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '-s':
      case '--source':
        result.source = args[++i];
        break;
      case '-t':
      case '--template':
        result.template = args[++i] as TemplateType;
        break;
      case '-n':
      case '--name':
        result.name = args[++i];
        break;
      case '-a':
      case '--audience':
        result.audience = args[++i];
        break;
      case '-i':
      case '--interactive':
        result.interactive = true;
        break;
      case '-o':
      case '--output-prompts':
        result.outputPrompts = true;
        break;
      case '-h':
      case '--help':
        result.help = true;
        break;
    }
  }

  return result;
}

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function selectOption(
  rl: readline.Interface,
  question: string,
  options: string[]
): Promise<string> {
  console.log(`\n${question}`);
  options.forEach((opt, i) => {
    console.log(`  ${i + 1}. ${opt}`);
  });

  const answer = await prompt(rl, 'Enter number: ');
  const index = parseInt(answer, 10) - 1;

  if (index >= 0 && index < options.length) {
    return options[index];
  }

  console.log('Invalid selection, please try again.');
  return selectOption(rl, question, options);
}

async function runInteractive(): Promise<void> {
  const rl = createReadlineInterface();

  console.log('\n🎯 THTX Beat Generator - Interactive Mode\n');
  console.log('This wizard will help you generate a Beat from your source material.\n');

  try {
    // Get source file
    const sourcePath = await prompt(rl, 'Path to source material: ');

    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ File not found: ${sourcePath}`);
      rl.close();
      process.exit(1);
    }

    // Select template
    const template = await selectOption(
      rl,
      'Select template type:',
      TEMPLATE_TYPES
    ) as TemplateType;

    // Get Beat name
    let beatName = await prompt(rl, 'Beat name (kebab-case, e.g., ai-strategy-basics): ');
    beatName = beatName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (!beatName) {
      console.error('❌ Beat name is required');
      rl.close();
      process.exit(1);
    }

    // Optional: target audience
    const audience = await prompt(rl, 'Target audience (optional, press Enter to skip): ');

    // Template-specific options
    let focusTopics: string[] | undefined;
    let scenarioCount: number | undefined;
    let xAxisConcept: string | undefined;
    let yAxisConcept: string | undefined;

    if (template === 'concept-tutorial') {
      const topicsInput = await prompt(
        rl,
        'Focus topics (comma-separated, optional): '
      );
      if (topicsInput) {
        focusTopics = topicsInput.split(',').map((t) => t.trim()).filter(Boolean);
      }

      const countInput = await prompt(rl, 'Number of scenarios (default: 4): ');
      scenarioCount = countInput ? parseInt(countInput, 10) : 4;
    }

    if (template === 'strategic-framework') {
      xAxisConcept = await prompt(rl, 'X-axis concept (e.g., "Implementation Complexity"): ');
      yAxisConcept = await prompt(rl, 'Y-axis concept (e.g., "Business Value"): ');
    }

    rl.close();

    // Build options
    const options: GeneratorOptions = {
      sourcePath,
      templateType: template,
      outputName: beatName,
      targetAudience: audience || undefined,
      focusTopics,
      scenarioCount,
      xAxisConcept,
      yAxisConcept,
    };

    // Generate
    await runGeneration(options, true);
  } catch (error) {
    rl.close();
    throw error;
  }
}

async function runGeneration(
  options: GeneratorOptions,
  outputPrompts: boolean
): Promise<void> {
  console.log('\n📚 Preparing Beat generation...\n');

  const preparation = await prepareGeneration(options);

  console.log(`✅ Source parsed: ${preparation.source.format} format`);
  console.log(`   - ${preparation.source.wordCount} words`);
  console.log(`   - ${preparation.source.keyPoints.length} key points extracted`);
  console.log(`✅ Template: ${preparation.templateType}`);
  console.log(`✅ Output name: ${preparation.outputName}`);

  if (outputPrompts) {
    console.log('\n' + '='.repeat(80));
    console.log('SYSTEM PROMPT');
    console.log('='.repeat(80) + '\n');
    console.log(preparation.prompts.system);

    console.log('\n' + '='.repeat(80));
    console.log('USER PROMPT');
    console.log('='.repeat(80) + '\n');
    console.log(preparation.prompts.user);

    console.log('\n' + '='.repeat(80));
    console.log('NEXT STEPS');
    console.log('='.repeat(80));
    console.log(`
1. Copy both prompts above to Claude or another LLM
2. Get the JSON response
3. Save the JSON response to: beats/${preparation.outputName}/content.json
4. Run the finalize command (coming soon) or manually create the Beat

Alternatively, use the prompts with the Claude API or another AI service
to automatically generate and save the Beat content.
`);
  }

  // Save prompts to a file for convenience
  const promptsDir = path.join(__dirname, '_output');
  await fs.promises.mkdir(promptsDir, { recursive: true });

  const promptsFile = path.join(promptsDir, `${options.outputName}-prompts.json`);
  await fs.promises.writeFile(
    promptsFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        templateType: preparation.templateType,
        outputName: preparation.outputName,
        source: {
          format: preparation.source.format,
          wordCount: preparation.source.wordCount,
          keyPoints: preparation.source.keyPoints,
        },
        prompts: preparation.prompts,
      },
      null,
      2
    ),
    'utf-8'
  );

  console.log(`\n💾 Prompts saved to: ${promptsFile}`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (args.interactive) {
    await runInteractive();
    return;
  }

  // Validate required arguments
  if (!args.source) {
    console.error('❌ Error: --source is required');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  if (!args.template) {
    console.error('❌ Error: --template is required');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  if (!TEMPLATE_TYPES.includes(args.template)) {
    console.error(`❌ Error: Invalid template type: ${args.template}`);
    console.log(`Valid types: ${TEMPLATE_TYPES.join(', ')}`);
    process.exit(1);
  }

  if (!args.name) {
    console.error('❌ Error: --name is required');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  // Check source file exists
  if (!fs.existsSync(args.source)) {
    console.error(`❌ Error: Source file not found: ${args.source}`);
    process.exit(1);
  }

  const options: GeneratorOptions = {
    sourcePath: args.source,
    templateType: args.template,
    outputName: args.name,
    targetAudience: args.audience,
  };

  await runGeneration(options, args.outputPrompts !== false);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
