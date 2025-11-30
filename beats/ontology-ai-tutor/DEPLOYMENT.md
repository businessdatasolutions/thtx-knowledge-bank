# Deployment Guide: Ontology AI Tutor

## GitHub Pages Deployment

This app is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup Instructions

#### 1. Add GitHub Secret for API Key

Go to your repository settings:
- Navigate to **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**
- Name: `GEMINI_API_KEY`
- Value: Your Google Gemini API key
- Click **Add secret**

#### 2. Enable GitHub Pages

In your repository settings:
- Navigate to **Settings** → **Pages**
- Under **Source**, select **GitHub Actions**
- Save the settings

#### 3. Trigger Deployment

The app will automatically deploy when:
- You push changes to the `main` branch in the `beats/ontology-ai-tutor/` directory
- You manually trigger the workflow from the Actions tab

### Access Your Deployed App

After successful deployment, your app will be available at:
```
https://businessdatasolutions.github.io/thtx-knowledge-bank/
```

### Manual Deployment (Alternative)

If you prefer to deploy manually:

1. Build the app:
   ```bash
   cd beats/ontology-ai-tutor
   npm run build
   ```

2. The production build will be in the `dist/` directory

3. Deploy the `dist/` folder to your hosting service

### Local Development

To run the app locally:

```bash
cd beats/ontology-ai-tutor
npm install
npm run dev
```

The app will be available at `http://localhost:3000/`

### Configuration

- **Base URL**: Configured in `vite.config.ts` as `/thtx-knowledge-bank/`
- **API Key**: Loaded from environment variable `GEMINI_API_KEY`
- **Build output**: `dist/` directory (gitignored)

### Troubleshooting

**404 on GitHub Pages:**
- Ensure the base path in `vite.config.ts` matches your repository name
- Check that GitHub Pages is enabled and set to GitHub Actions

**API Key not working:**
- Verify the `GEMINI_API_KEY` secret is set in repository settings
- Check the Actions logs for any build errors

**Build fails:**
- Ensure all dependencies are installed (`npm ci`)
- Check for TypeScript or ESLint errors
- Review the GitHub Actions workflow logs
