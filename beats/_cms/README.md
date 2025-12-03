# THTX Beats CMS

Web-based content management system for generating interactive Beats from source material using AI.

## Features

- **File Browser**: Browse and preview articles and transcripts
- **Generator Wizard**: 5-step wizard for creating new Beats
- **AI Generation**: Direct Claude API integration for content generation
- **Catalog Management**: View and manage published Beats

## Quick Start

### Prerequisites

- Node.js 20+
- Anthropic API key

### Development Mode

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Create .env file
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Start development servers
npm run dev
```

This starts:
- Backend server at http://localhost:3002
- Frontend dev server at http://localhost:3003

### Docker

```bash
# Production
docker-compose up cms

# Development with hot reload
docker-compose --profile dev up cms-dev
```

## Project Structure

```
beats/_cms/
├── server/              # Express.js backend
│   ├── index.ts         # Server entry point
│   └── routes/          # API route handlers
│       ├── files.ts     # File browsing API
│       ├── generator.ts # Beat generation API
│       └── catalog.ts   # Catalog API
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── api/         # API client
│   │   └── App.tsx      # Main app component
│   └── vite.config.ts   # Vite configuration
├── Dockerfile           # Production Docker image
├── docker-compose.yml   # Docker Compose config
└── package.json         # Dependencies
```

## API Endpoints

### Files API
- `GET /api/files` - List all source files
- `GET /api/files/tree` - Get file tree structure
- `GET /api/files/content?path=...` - Get file content

### Generator API
- `POST /api/generate/prepare` - Prepare generation prompts
- `POST /api/generate/ai` - Generate with Claude (SSE streaming)
- `POST /api/generate/finalize` - Save generated Beat

### Catalog API
- `GET /api/catalog` - Get all Beats
- `GET /api/catalog/:id` - Get single Beat details

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude |
| `PORT` | Server port (default: 3002) |
| `NODE_ENV` | Environment mode |
