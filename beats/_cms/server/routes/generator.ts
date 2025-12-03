/**
 * Generator API Routes
 *
 * Wraps the Beat generator functions and provides AI generation endpoint.
 */

import { Router } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

// Import generator functions
import generator from '../../../_generator/generator.js';
import type { TemplateType } from '../../../_generator/types.js';

const { prepareGeneration, finalizeGeneration, validateContent } = generator;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatorRouter = Router();

const PROJECT_ROOT = path.resolve(__dirname, '../../../../');

/**
 * Prepare generation (create prompts)
 * POST /api/generate/prepare
 */
generatorRouter.post('/prepare', async (req, res, next) => {
  try {
    const {
      sourcePath,
      sourceContent,
      templateType,
      outputName,
      targetAudience,
      focusTopics,
      scenarioCount,
      xAxisConcept,
      yAxisConcept,
    } = req.body;

    const options = {
      sourcePath: sourcePath ? path.join(PROJECT_ROOT, sourcePath) : undefined,
      sourceContent,
      templateType: templateType as TemplateType,
      outputName,
      targetAudience,
      focusTopics,
      scenarioCount,
      xAxisConcept,
      yAxisConcept,
    };

    const result = await prepareGeneration(options);

    res.json({
      prompts: result.prompts,
      source: {
        format: result.source.format,
        wordCount: result.source.wordCount,
        keyPoints: result.source.keyPoints.slice(0, 10), // Limit for response size
      },
      outputName: result.outputName,
      templateType: result.templateType,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Validate generated content
 * POST /api/generate/validate
 */
generatorRouter.post('/validate', (req, res) => {
  try {
    const { content, templateType } = req.body;

    if (!content || !templateType) {
      return res.status(400).json({ error: 'Content and templateType are required' });
    }

    const errors = validateContent(content, templateType as TemplateType);

    res.json({
      valid: errors.length === 0,
      errors,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Finalize and save Beat
 * POST /api/generate/finalize
 */
generatorRouter.post('/finalize', async (req, res, next) => {
  try {
    const { content, outputName, templateType } = req.body;

    if (!content || !outputName || !templateType) {
      return res.status(400).json({ error: 'Content, outputName, and templateType are required' });
    }

    // Build a minimal preparation object for finalizeGeneration
    // We use unknown cast since we don't have the original parsed source
    const preparation = {
      prompts: { system: '', user: '' },
      source: {
        format: 'text',
        wordCount: 0,
        keyPoints: [],
        content: { raw: '', title: '', paragraphs: [], wordCount: 0, keySentences: [], languageHint: 'en' },
        filename: outputName,
        filepath: '',
      },
      outputName,
      templateType,
    } as unknown as Parameters<typeof finalizeGeneration>[1];

    const beatsDir = path.join(PROJECT_ROOT, 'beats');
    const result = await finalizeGeneration(content, preparation, beatsDir);

    res.json({
      success: true,
      beatId: result.metadata.id,
      path: `beats/${result.metadata.id}`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Generate Beat with AI (Claude API)
 * POST /api/generate/ai
 *
 * This endpoint uses Server-Sent Events (SSE) for streaming progress.
 */
generatorRouter.post('/ai', async (req, res, next) => {
  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (type: string, data: any) => {
    res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const {
      sourcePath,
      sourceContent,
      templateType,
      outputName,
      targetAudience,
      focusTopics,
      scenarioCount,
      xAxisConcept,
      yAxisConcept,
      customInstructions,
    } = req.body;

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      sendEvent('error', { message: 'ANTHROPIC_API_KEY not configured' });
      return res.end();
    }

    // Step 1: Prepare generation
    sendEvent('progress', { step: 'parsing', message: 'Parsing source material...' });

    const options = {
      sourcePath: sourcePath ? path.join(PROJECT_ROOT, sourcePath) : undefined,
      sourceContent,
      templateType: templateType as TemplateType,
      outputName,
      targetAudience,
      focusTopics,
      scenarioCount,
      xAxisConcept,
      yAxisConcept,
      customInstructions,
    };

    const preparation = await prepareGeneration(options);

    sendEvent('progress', {
      step: 'prepared',
      message: `Parsed ${preparation.source.wordCount} words`,
    });

    // Step 2: Call Claude API
    sendEvent('progress', { step: 'generating', message: 'Generating content with Claude...' });

    const anthropic = new Anthropic({ apiKey });

    let fullResponse = '';

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16000,
      system: preparation.prompts.system,
      messages: [{ role: 'user', content: preparation.prompts.user }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        fullResponse += event.delta.text;
        // Send chunks periodically for progress indication
        if (fullResponse.length % 500 < 10) {
          sendEvent('progress', {
            step: 'generating',
            message: `Generating... (${fullResponse.length} chars)`,
          });
        }
      }
    }

    // Step 3: Parse and validate response
    sendEvent('progress', { step: 'validating', message: 'Validating generated content...' });

    // Extract JSON from response (may be wrapped in markdown code blocks)
    let jsonContent = fullResponse;
    const jsonMatch = fullResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    let content;
    try {
      content = JSON.parse(jsonContent);
    } catch (e) {
      sendEvent('error', { message: 'Failed to parse AI response as JSON', raw: fullResponse.slice(0, 500) });
      return res.end();
    }

    const errors = validateContent(content, templateType as TemplateType);
    if (errors.length > 0) {
      sendEvent('validation_error', { errors, content });
      return res.end();
    }

    // Send the generated content to the client
    sendEvent('content', content);

    sendEvent('complete', {
      success: true,
      valid: true,
    });

    res.end();
  } catch (error: any) {
    sendEvent('error', { message: error.message });
    res.end();
  }
});

/**
 * Refine generated content via chat
 * POST /api/generate/refine
 *
 * This endpoint uses Server-Sent Events (SSE) for streaming progress.
 */
generatorRouter.post('/refine', async (req, res, next) => {
  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (type: string, data: any) => {
    res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const { currentContent, userRequest, templateType } = req.body;

    if (!currentContent || !userRequest || !templateType) {
      sendEvent('error', { message: 'currentContent, userRequest, and templateType are required' });
      return res.end();
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      sendEvent('error', { message: 'ANTHROPIC_API_KEY not configured' });
      return res.end();
    }

    sendEvent('progress', { step: 'refining', message: 'Verwerken van wijziging...' });

    const anthropic = new Anthropic({ apiKey });

    // Build refinement prompt
    const systemPrompt = `Je bent een expert content editor voor THTX Beats.
Je taak is om bestaande Beat content aan te passen op basis van feedback van de gebruiker.

## Regels
1. Behoud de exacte JSON structuur - verander geen veldnamen of structuur
2. Pas alleen de inhoud aan waar de gebruiker om vraagt
3. Behoud de kwaliteit en consistentie van de content
4. Alle tekst moet in het Nederlands blijven
5. Genereer ALLEEN de complete aangepaste JSON, geen uitleg`;

    const userPrompt = `## Huidige Content

\`\`\`json
${JSON.stringify(currentContent, null, 2)}
\`\`\`

## Gewenste Aanpassing

${userRequest}

---

Genereer de complete aangepaste JSON:`;

    let fullResponse = '';

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        fullResponse += event.delta.text;
        // Send progress updates periodically
        if (fullResponse.length % 500 < 10) {
          sendEvent('progress', {
            step: 'refining',
            message: `Aanpassen... (${fullResponse.length} chars)`,
          });
        }
      }
    }

    sendEvent('progress', { step: 'validating', message: 'Valideren van aangepaste content...' });

    // Extract JSON from response
    let jsonContent = fullResponse;
    const jsonMatch = fullResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    let content;
    try {
      content = JSON.parse(jsonContent);
    } catch (e) {
      sendEvent('error', { message: 'Kon AI response niet parsen als JSON', raw: fullResponse.slice(0, 500) });
      return res.end();
    }

    // Validate the refined content
    const errors = validateContent(content, templateType as TemplateType);
    if (errors.length > 0) {
      sendEvent('validation_error', { errors, content });
      return res.end();
    }

    // Send the refined content
    sendEvent('content', content);
    sendEvent('complete', { success: true });

    res.end();
  } catch (error: any) {
    sendEvent('error', { message: error.message });
    res.end();
  }
});

/**
 * Get available templates
 * GET /api/generate/templates
 */
generatorRouter.get('/templates', (req, res) => {
  res.json({
    templates: [
      {
        id: 'concept-tutorial',
        name: 'Concept Tutorial',
        description: 'Interactieve 4-view leermodule met scenario\'s (INTRO → DASHBOARD → SCENARIO → SUMMARY)',
        options: [
          { name: 'targetAudience', type: 'string', label: 'Doelgroep', default: 'executives en technisch leiders' },
          { name: 'focusTopics', type: 'array', label: 'Focus onderwerpen', optional: true },
          { name: 'scenarioCount', type: 'number', label: 'Aantal scenario\'s', default: 4, min: 2, max: 6 },
        ],
      },
      {
        id: 'strategic-framework',
        name: 'Strategic Framework',
        description: 'Interactieve 2x2 matrix met klikbare kwadranten',
        options: [
          { name: 'targetAudience', type: 'string', label: 'Doelgroep', default: 'executives en technisch leiders' },
          { name: 'xAxisConcept', type: 'string', label: 'X-as concept', placeholder: 'bijv. "Implementation Complexity"' },
          { name: 'yAxisConcept', type: 'string', label: 'Y-as concept', placeholder: 'bijv. "Business Value"' },
        ],
      },
    ],
  });
});

export default generatorRouter;
