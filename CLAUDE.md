# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the THTX Knowledge Bank, a repository for storing and organizing articles, research papers, and knowledge resources related to business data solutions and AI.

## Repository Structure

- `articles/` - Collection of articles and research papers organized by topic
  - `leadership-and-strategy/` - Executive perspectives, strategic frameworks, and business transformation
    - Core articles on 10X thinking, executive AI adoption, and dynamic capabilities
    - Includes supporting transcripts from fireside chats in `transcripts/` subdirectory
  - `ai-architecture-and-implementation/` - Technical architecture and AI implementation practices
    - Solutions architecture, AI agent development, and deployment strategies
    - Includes technical transcripts on implementation approaches in `transcripts/` subdirectory
  - `_index.md` - Master catalog with article metadata and cross-references
- `beats/` - Interactive web applications
  - `ontology-ai-tutor/` - React/TypeScript educational app for Palantir Ontology framework
- `frameworks/` - Visual frameworks and models (HTML/diagrams)

## Current State

This repository contains:
- **7 articles** across 2 topic categories with kebab-case naming convention
- **1 interactive web app** (Ontology AI Tutor) deployed on GitHub Pages
- **Visual frameworks** for AI strategy and digital capabilities
- **Comprehensive documentation** with master article index

## Future Enhancements

As tracked in GitHub Issues:
- Index/catalog system (Issue #2)
- Metadata files for article contents (Issue #3)
- Search functionality (Issue #4)

## THTX Beats Smart CMS

The repository is being transformed into a smart CMS for generating interactive "Beats" - AI-powered information containers for executives and technical leaders.

### Key Documents
- `tasks/prd-thtx-beats-smart-cms.md` - Product Requirements Document
- `tasks/thtx-beats-implementation-tasks.md` - Implementation task list with checkboxes

### Task Tracking Instructions

**IMPORTANT**: When implementing the THTX Beats Smart CMS:

1. **Always check task status** before starting work by reading `tasks/thtx-beats-implementation-tasks.md`
2. **Update task checkboxes** immediately after completing each subtask:
   - Change `- [ ]` to `- [x]` for completed items
3. **Run all tests** for a task before marking the main task complete
4. **Do not proceed** to the next main task (e.g., Task 1.2) until all subtasks and tests in the current task (e.g., Task 1.1) pass
5. **Update the Phase Completion Checklist** when all tasks in a phase are done
6. **Commit progress** at logical checkpoints (end of each main task)

### Current Implementation Status

Track progress in `tasks/thtx-beats-implementation-tasks.md`. Phases:
- Phase 1: Foundation - Shared Component Library ✅
- Phase 2: Template System ✅
- Phase 3: Beat Catalog System ✅
- Phase 4: Beat Generation System ✅
- Phase 5: Integration and First Beat (in progress)

### Using the Beat Generator

The generator CLI creates AI prompts from source material:

```bash
cd beats/_generator
npm install
npx tsx cli.ts --source <path-to-article> --template <type> --name <beat-name>
```

**Template types:**
- `concept-tutorial` - Interactive 4-view learning module with scenarios
- `strategic-framework` - 2x2 matrix with clickable quadrants

**Example:**
```bash
npx tsx cli.ts --source ../../articles/leadership-and-strategy/10x-thinking-with-ai-tutorial.md --template concept-tutorial --name 10x-thinking
```

**Workflow:**
1. Run CLI to generate prompts
2. Copy prompts to Claude/LLM
3. Get JSON response matching schema
4. Save to `beats/<name>/constants.tsx`
5. Copy template files to Beat directory
6. Build and deploy

### Key Directories

- `beats/_shared/` - Shared components, types, and styles
- `beats/_templates/` - Template definitions (concept-tutorial, strategic-framework)
- `beats/_catalog/` - Beat catalog website
- `beats/_generator/` - Content generation CLI
