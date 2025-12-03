/**
 * THTX Beats CMS - Express Server
 *
 * API server for the Beats CMS frontend.
 * Wraps the generator functions and provides file browsing capabilities.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { filesRouter } from './routes/files.js';
import { generatorRouter } from './routes/generator.js';
import { catalogRouter } from './routes/catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/files', filesRouter);
app.use('/api/generate', generatorRouter);
app.use('/api/catalog', catalogRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║     THTX Beats CMS Server                 ║
  ║     http://localhost:${PORT}                  ║
  ╚═══════════════════════════════════════════╝
  `);
});

export default app;
