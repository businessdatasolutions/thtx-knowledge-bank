# THTX Beats Smart CMS - Product Requirements Document

## 1. Overview

THTX Beats is a smart content management system that transforms static source materials (articles, PDFs, transcripts, presentations) into interactive "information containers" for executive and technical leader audiences. Unlike traditional newsletters, Beats are engaging, React-based web applications featuring quizzes, interactive frameworks, simulations, and data visualizations.

The system uses agentic AI to fully generate interactive Beats from source material, enabling weekly publication of thought leadership content that drives brand positioning and lead generation.

**Working Example**: The existing `ontology-ai-tutor` Beat demonstrates the target format—a multi-stage interactive tutorial with theory sections, case study simulations, and visual frameworks.

## 2. Goals

1. **Enable weekly Beat publication** by automating the transformation of source material into interactive content
2. **Establish thought leadership** through differentiated, engaging content formats for executives and technical leaders
3. **Create a scalable content library** with consistent THTX branding and discoverable catalog
4. **Reduce content creation time** from days to hours using AI-powered generation
5. **Support lead generation** via GitHub Pages (public) with future gated content capability

## 3. User Stories

### Content Author (You)
- As a content author, I want to select a Beat template type so that I have a clear structure for my content
- As a content author, I want to provide source material in any format (PDF, markdown, transcript, slides, notes) so that I can repurpose existing content
- As a content author, I want AI to generate a complete interactive Beat so that I don't need to write React code
- As a content author, I want to iteratively refine the generated Beat through conversation so that I can customize the output
- As a content author, I want consistent THTX branding applied automatically so that all Beats look professional

### Content Consumer (Executive/Technical Leader)
- As an executive, I want to explore interactive frameworks so that I can understand strategic concepts in context
- As a technical leader, I want to work through tutorial simulations so that I can apply methodologies to my situation
- As a reader, I want a clear progression through content so that I know where I am and what's next
- As a reader, I want the content in Dutch so that I can consume it in my preferred language

### System
- As the system, I want to deploy Beats automatically to GitHub Pages so that new content is immediately available
- As the system, I want to maintain a Beat catalog so that all published content is discoverable

## 4. Functional Requirements

### 4.1 Template System

1. The system must provide two initial template types:
   - **Concept Tutorial**: Multi-stage educational content (Intro → Dashboard → Scenarios → Summary)
   - **Strategic Framework**: Interactive 2x2 matrices and visual frameworks for strategic positioning

2. Templates must be selectable by interaction type (not topic or complexity)

3. Each template must define:
   - Required content sections
   - Interactive component types
   - Navigation flow
   - Data structure for content

### 4.2 Source Material Processing

4. The system must accept source material in these formats:
   - Markdown files (from `/articles/`)
   - PDF documents (research papers, whitepapers)
   - Text transcripts (meeting notes, video transcripts)
   - Slide decks (PowerPoint/PDF)
   - Raw notes/outlines (bullet points)

5. The system must extract key concepts, frameworks, and examples from source material

6. The system must map extracted content to template sections automatically

### 4.3 AI-Powered Beat Generation

7. The system must generate complete React components from source material and selected template

8. Generated Beats must include:
   - All required TypeScript/React files
   - Content data structures (similar to `constants.tsx`)
   - Interactive components appropriate to the template
   - Proper type definitions

9. The generation workflow must be:
   - Step 1: Select template type
   - Step 2: Provide source material
   - Step 3: AI generates complete Beat
   - Step 4: Conversational refinement (optional)
   - Step 5: Deploy

### 4.4 Content Structure (Concept Tutorial Template)

10. Concept Tutorial Beats must follow this structure:
    - **INTRO View**: Theory/context with tabbed sections (WHY/HOW/WHAT)
    - **DASHBOARD View**: Grid of interactive scenarios/cases
    - **SCENARIO View**: Multi-stage simulation with choices and feedback
    - **SUMMARY View**: Key takeaways and retrospective

11. Each scenario must have 3+ stages with multiple-choice options

12. Options must include explanatory feedback for each choice

### 4.5 Content Structure (Strategic Framework Template)

13. Strategic Framework Beats must include:
    - Framework introduction and context
    - Interactive 2x2 matrix or visual model
    - User positioning capability (click/drag to place on framework)
    - Quadrant-specific insights and recommendations
    - Examples for each quadrant position

### 4.6 Branding & Visual Design

14. All Beats must use consistent THTX branding:
    - Defined color palette
    - Typography standards
    - Logo placement
    - Component styling (buttons, cards, navigation)

15. Branding must be centralized in shared configuration/components

### 4.7 Localization

16. All Beats must be in Dutch (NL) only for v1

17. UI text and content must support future bilingual extension

### 4.8 Beat Catalog

18. The system must maintain a Beat catalog/index page listing all published Beats

19. Each catalog entry must include:
    - Title and description
    - Template type
    - Publication date
    - Link to Beat

20. The catalog must be automatically updated when new Beats are deployed

### 4.9 Deployment

21. Beats must deploy automatically to GitHub Pages via existing workflow

22. Each Beat must have a unique URL path under the repository

23. Deployment must be triggered by push to main branch

### 4.10 Source Material Storage

24. Each Beat must store its source materials in a `_source/` subdirectory within the Beat folder

25. The `_source/` directory must contain:
    - Original source files (PDF, markdown, transcripts, etc.)
    - A `README.md` documenting the source material provenance

26. Source materials must be excluded from the production build but retained in the repository for reference

## 5. Non-Goals (Out of Scope for v1)

- AI-powered real-time feedback (Gemini integration) - deferred to v2
- English language support - NL only for v1
- User authentication / gated content
- Analytics and user tracking
- CRM integration (HubSpot/Salesforce)
- Email embedding of interactive elements
- ROI calculators and assessment tools (future templates)
- Data visualization dashboards (future templates)

## 6. Design Considerations

### Component Architecture

```
beats/
├── _shared/                    # Shared components and utilities
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Card.tsx
│   │   └── Button.tsx
│   ├── styles/
│   │   └── brand.ts           # THTX color palette, typography
│   └── types/
│       └── common.ts
├── _templates/                 # Template definitions
│   ├── concept-tutorial/
│   │   ├── template.tsx       # Base structure
│   │   ├── schema.ts          # Content data structure
│   │   └── README.md          # Template documentation
│   └── strategic-framework/
│       ├── template.tsx
│       ├── schema.ts
│       └── README.md
├── _catalog/                   # Beat index
│   └── index.tsx              # Catalog page component
├── ontology-ai-tutor/         # Existing Beat (reference)
└── [new-beat-name]/           # Generated Beats
    ├── _source/               # Source materials (excluded from build)
    │   ├── README.md          # Provenance documentation
    │   └── [original files]   # PDFs, transcripts, etc.
    └── [beat files]           # React components, constants, etc.
```

### Existing Components to Reuse

From `ontology-ai-tutor`:
- `InteractiveDiagram.tsx` - Animated node visualization
- `StageSelector.tsx` - Multiple choice with shuffle
- `CaseSummary.tsx` - Results display
- Navigation patterns and view state management

### Technology Stack (Unchanged)

- React 19 + TypeScript
- Vite for build
- Tailwind CSS for styling
- GitHub Pages for hosting
- GitHub Actions for CI/CD

## 7. Technical Considerations

### AI Generation Strategy

The agentic AI generation must:
1. Parse source material to extract structure and key content
2. Map content to template schema
3. Generate TypeScript constants file with all content
4. Generate or adapt React components as needed
5. Ensure type safety and build success

### Content Schema Example (Concept Tutorial)

```typescript
interface ConceptTutorialContent {
  metadata: {
    id: string;
    title: string;
    description: string;
    author: string;
    publishDate: string;
  };
  intro: {
    sections: Array<{
      id: string;
      title: string;
      content: ReactNode;
    }>;
  };
  scenarios: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    context: string;
    stages: Array<{
      id: string;
      question: string;
      options: Array<{
        id: string;
        text: string;
        feedback: string;
        isCorrect: boolean;
      }>;
    }>;
    summary: string;
  }>;
}
```

### Build Integration

- Each Beat must be independently buildable
- Shared components must not break individual Beat builds
- Catalog page must aggregate all Beat metadata

## 8. Success Metrics

1. **Publication velocity**: Ability to publish 1 Beat per week
2. **Generation quality**: Generated Beats require < 2 hours of manual refinement
3. **Build reliability**: 100% of generated Beats pass TypeScript and build checks
4. **Catalog completeness**: All published Beats appear in catalog within deployment

## 9. Open Questions

The following questions are tracked as GitHub Issues for future resolution:

1. **Shared component versioning** ([Issue #5](https://github.com/businessdatasolutions/thtx-knowledge-bank/issues/5)): How to handle breaking changes to shared components without affecting existing Beats?

2. **Content validation** ([Issue #6](https://github.com/businessdatasolutions/thtx-knowledge-bank/issues/6)): Should there be automated checks for content quality (minimum scenarios, option counts, etc.)?

3. **Beat archiving** ([Issue #7](https://github.com/businessdatasolutions/thtx-knowledge-bank/issues/7)): How to handle outdated Beats? Archive, hide, or delete?

4. **Template extensibility** ([Issue #8](https://github.com/businessdatasolutions/thtx-knowledge-bank/issues/8)): Process for adding new template types in future?

### Resolved

- **Source material storage**: Source materials will be stored in the repo alongside generated Beats for reference. See requirement 24 below.

---

## Implementation Phases

### Phase 1: Foundation
- Create shared component library (`beats/_shared/`)
- Extract reusable components from ontology-ai-tutor
- Define THTX brand tokens and styling
- Set up template structure

### Phase 2: Templates
- Create Concept Tutorial template with schema
- Create Strategic Framework template with schema
- Document template usage

### Phase 3: AI Generation
- Build source material parser (multi-format)
- Create content extraction logic
- Implement template-aware generation
- Add conversational refinement capability

### Phase 4: Catalog & Deployment
- Build Beat catalog page
- Update GitHub Actions for multi-Beat deployment
- Create Beat metadata aggregation

### Phase 5: First Beat
- Generate first client-facing Beat from source material
- Refine generation based on learnings
- Publish and validate workflow
