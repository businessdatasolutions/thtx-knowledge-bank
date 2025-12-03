/**
 * Catalog API Routes
 *
 * Provides access to the Beats catalog.
 */

import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const catalogRouter = Router();

const PROJECT_ROOT = path.resolve(__dirname, '../../../../');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'beats/_catalog/beats.json');

/**
 * Get catalog
 * GET /api/catalog
 */
catalogRouter.get('/', async (req, res, next) => {
  try {
    const content = await fs.readFile(CATALOG_PATH, 'utf-8');
    const catalog = JSON.parse(content);
    res.json(catalog);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return res.json({
        lastUpdated: new Date().toISOString().split('T')[0],
        baseUrl: '',
        beats: [],
      });
    }
    next(error);
  }
});

/**
 * Get single beat info
 * GET /api/catalog/:id
 */
catalogRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await fs.readFile(CATALOG_PATH, 'utf-8');
    const catalog = JSON.parse(content);

    const beat = catalog.beats.find((b: any) => b.id === id);
    if (!beat) {
      return res.status(404).json({ error: 'Beat not found' });
    }

    // Try to read full content from beat directory
    const beatDir = path.join(PROJECT_ROOT, 'beats', id);
    let fullContent = null;

    try {
      const constantsPath = path.join(beatDir, 'constants.tsx');
      const constantsContent = await fs.readFile(constantsPath, 'utf-8');
      // Extract JSON from constants file
      const match = constantsContent.match(/export const BEAT_CONTENT = ({[\s\S]*}) as const;/);
      if (match) {
        fullContent = JSON.parse(match[1]);
      }
    } catch {
      // Content not available, that's ok
    }

    res.json({
      ...beat,
      content: fullContent,
    });
  } catch (error) {
    next(error);
  }
});

export default catalogRouter;
