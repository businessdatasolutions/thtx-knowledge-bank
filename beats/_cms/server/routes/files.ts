/**
 * File Browsing API Routes
 *
 * Provides endpoints for browsing and reading source materials.
 */

import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const filesRouter = Router();

// Base directories for file access
const PROJECT_ROOT = path.resolve(__dirname, '../../../../');
const ARTICLES_DIR = path.join(PROJECT_ROOT, 'articles');
const BEATS_DIR = path.join(PROJECT_ROOT, 'beats');

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  modified?: string;
  extension?: string;
}

/**
 * List files in a directory
 * GET /api/files?path=articles/leadership-and-strategy
 */
filesRouter.get('/', async (req, res, next) => {
  try {
    const relativePath = (req.query.path as string) || 'articles';
    const fullPath = path.join(PROJECT_ROOT, relativePath);

    // Security: ensure path is within allowed directories
    if (!fullPath.startsWith(ARTICLES_DIR) && !fullPath.startsWith(BEATS_DIR)) {
      return res.status(403).json({ error: 'Access denied to this path' });
    }

    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const items: FileItem[] = [];

    for (const entry of entries) {
      // Skip hidden files and internal directories
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) {
        continue;
      }

      const entryPath = path.join(fullPath, entry.name);
      const stats = await fs.stat(entryPath);

      items.push({
        name: entry.name,
        path: path.join(relativePath, entry.name),
        type: entry.isDirectory() ? 'directory' : 'file',
        size: entry.isFile() ? stats.size : undefined,
        modified: stats.mtime.toISOString(),
        extension: entry.isFile() ? path.extname(entry.name).slice(1) : undefined,
      });
    }

    // Sort: directories first, then files alphabetically
    items.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    res.json({
      path: relativePath,
      items,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get file contents
 * GET /api/files/content?path=articles/leadership-and-strategy/10x-thinking.md
 */
filesRouter.get('/content', async (req, res, next) => {
  try {
    const relativePath = req.query.path as string;
    if (!relativePath) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const fullPath = path.join(PROJECT_ROOT, relativePath);

    // Security: ensure path is within allowed directories
    if (!fullPath.startsWith(ARTICLES_DIR) && !fullPath.startsWith(BEATS_DIR)) {
      return res.status(403).json({ error: 'Access denied to this path' });
    }

    // Only allow certain file types
    const ext = path.extname(fullPath).toLowerCase();
    const allowedExtensions = ['.md', '.txt', '.markdown', '.json'];
    if (!allowedExtensions.includes(ext)) {
      return res.status(400).json({ error: 'File type not supported' });
    }

    const content = await fs.readFile(fullPath, 'utf-8');
    const stats = await fs.stat(fullPath);

    // Calculate basic stats
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;

    res.json({
      path: relativePath,
      filename: path.basename(fullPath),
      content,
      size: stats.size,
      modified: stats.mtime.toISOString(),
      wordCount,
    });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    next(error);
  }
});

/**
 * Get directory tree (recursive)
 * GET /api/files/tree?path=articles
 */
filesRouter.get('/tree', async (req, res, next) => {
  try {
    const relativePath = (req.query.path as string) || 'articles';
    const fullPath = path.join(PROJECT_ROOT, relativePath);

    // Security check
    if (!fullPath.startsWith(ARTICLES_DIR) && !fullPath.startsWith(BEATS_DIR)) {
      return res.status(403).json({ error: 'Access denied to this path' });
    }

    async function buildTree(dirPath: string, relPath: string): Promise<FileItem[]> {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const items: FileItem[] = [];

      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) {
          continue;
        }

        const entryFullPath = path.join(dirPath, entry.name);
        const entryRelPath = path.join(relPath, entry.name);

        if (entry.isDirectory()) {
          const children = await buildTree(entryFullPath, entryRelPath);
          items.push({
            name: entry.name,
            path: entryRelPath,
            type: 'directory',
            children,
          } as any);
        } else {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.md', '.txt', '.markdown'].includes(ext)) {
            const stats = await fs.stat(entryFullPath);
            items.push({
              name: entry.name,
              path: entryRelPath,
              type: 'file',
              size: stats.size,
              extension: ext.slice(1),
            });
          }
        }
      }

      return items.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    }

    const tree = await buildTree(fullPath, relativePath);
    res.json({ path: relativePath, tree });
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
