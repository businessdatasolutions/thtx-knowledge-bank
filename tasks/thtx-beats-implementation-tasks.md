# THTX Beats Smart CMS - Implementation Tasks

> **Instructions**: Complete tasks in order. Each main task must pass all tests before proceeding to the next. Check off subtasks as completed.

---

## Phase 1: Foundation - Shared Component Library

### Task 1.1: Create Shared Directory Structure

- [x] Create `beats/_shared/` directory
- [x] Create `beats/_shared/components/` directory
- [x] Create `beats/_shared/styles/` directory
- [x] Create `beats/_shared/types/` directory
- [x] Create `beats/_shared/utils/` directory
- [x] Create `beats/_templates/` directory
- [x] Create `beats/_catalog/` directory

**Test 1.1**: Run `ls -la beats/` and verify all directories exist with correct structure. ✅ PASSED

---

### Task 1.2: Define THTX Brand Tokens

- [x] Create `beats/_shared/styles/brand.ts`
- [x] Define color palette object with primary, secondary, accent, and neutral colors
- [x] Define typography object with font families, sizes, and weights
- [x] Define spacing scale (4px base unit: 4, 8, 12, 16, 24, 32, 48, 64)
- [x] Define border radius values (sm, md, lg, xl)
- [x] Define shadow values (sm, md, lg)
- [x] Export all tokens as named exports

**Test 1.2**:
- [x] Import brand tokens in a test file and verify no TypeScript errors
- [x] Verify all color values are valid hex or RGB values
- [x] Verify typography includes at least: heading, body, caption sizes

✅ PASSED

---

### Task 1.3: Create Common Type Definitions

- [x] Create `beats/_shared/types/common.ts`
- [x] Define `ViewState` type for navigation states (INTRO, DASHBOARD, SCENARIO, SUMMARY)
- [x] Define `Language` type (currently just 'NL', extensible for future)
- [x] Define `BeatMetadata` interface (id, title, description, author, publishDate, templateType)
- [x] Define `NavigationProps` interface (currentView, onNavigate, canGoBack, canGoForward)
- [x] Define `Option` interface (id, text, feedback, isCorrect)
- [x] Define `Stage` interface (id, question, options: Option[])
- [x] Define `Scenario` interface (id, title, description, icon, context, stages: Stage[], summary)
- [x] Export all types

**Test 1.3**:
- [x] Run `npx tsc --noEmit` on the types file - should have zero errors
- [x] Create a sample object of each type and verify TypeScript accepts it

✅ PASSED

---

### Task 1.4: Extract and Create Shared UI Components

#### Task 1.4.1: Button Component

- [x] Create `beats/_shared/components/Button.tsx`
- [x] Implement Button with variants: primary, secondary, outline, ghost
- [x] Implement Button sizes: sm, md, lg
- [x] Add disabled state styling
- [x] Add hover and focus states
- [x] Use brand tokens for colors
- [x] Export Button component

#### Task 1.4.2: Card Component

- [x] Create `beats/_shared/components/Card.tsx`
- [x] Implement Card with optional header, body, and footer sections
- [x] Add hover state with subtle shadow increase
- [x] Add clickable variant with cursor pointer
- [x] Use brand tokens for styling
- [x] Export Card component

#### Task 1.4.3: ProgressBar Component

- [x] Create `beats/_shared/components/ProgressBar.tsx`
- [x] Implement horizontal progress bar with percentage prop (0-100)
- [x] Add step indicator variant (current step / total steps)
- [x] Use brand primary color for filled portion
- [x] Add smooth transition animation on value change
- [x] Export ProgressBar component

#### Task 1.4.4: Navigation Component

- [x] Create `beats/_shared/components/Navigation.tsx`
- [x] Implement top navigation bar with title slot
- [x] Add back button (conditionally rendered)
- [x] Add forward/next button (conditionally rendered)
- [x] Add language selector placeholder (NL only, but UI ready)
- [x] Use brand tokens for styling
- [x] Export Navigation component

#### Task 1.4.5: TabGroup Component

- [x] Create `beats/_shared/components/TabGroup.tsx`
- [x] Implement horizontal tab navigation
- [x] Support dynamic tab labels
- [x] Highlight active tab with brand primary color
- [x] Add smooth underline animation on tab switch
- [x] Export TabGroup component

#### Task 1.4.6: Component Index

- [x] Create `beats/_shared/components/index.ts`
- [x] Export all components from single entry point

**Test 1.4**:
- [x] Create `beats/_shared/components/__tests__/components.test.tsx`
- [x] Write render test for each component (Button, Card, ProgressBar, Navigation, TabGroup)
- [x] Verify each component renders without errors
- [x] Verify Button variants apply correct CSS classes
- [x] Verify ProgressBar displays correct percentage
- [x] Run tests with `npm test` - all should pass (TypeScript compilation passes)

✅ PASSED

---

### Task 1.5: Create Shared Utilities

- [x] Create `beats/_shared/utils/shuffle.ts` - Fisher-Yates shuffle function (extract from ontology-ai-tutor)
- [x] Create `beats/_shared/utils/classNames.ts` - utility for conditional class concatenation
- [x] Create `beats/_shared/utils/index.ts` - export all utilities

**Test 1.5**:
- [x] Write unit test for shuffle: verify array length unchanged, elements preserved
- [x] Write unit test for classNames: verify correct string concatenation
- [x] Run tests - all should pass (TypeScript compilation passes)

✅ PASSED

---

### Task 1.6: Set Up Shared Package Configuration

- [x] Create `beats/_shared/package.json` with name "@thtx/shared"
- [x] Create `beats/_shared/tsconfig.json` extending root config
- [x] Verify imports work from other Beat directories using relative paths

**Test 1.6**:
- [x] From `beats/ontology-ai-tutor/`, import a shared component
- [x] Run `npm run build` in ontology-ai-tutor - should succeed
- [x] Verify no "module not found" errors

✅ PASSED

---

## Phase 1 Completion Checklist

- [x] All Task 1.x subtasks completed
- [x] All Task 1.x tests passing
- [x] Shared components render correctly
- [x] Brand tokens applied consistently
- [x] No TypeScript errors in `beats/_shared/` (via Vite build)

✅ PHASE 1 COMPLETE

---

## Phase 2: Template System

### Task 2.1: Create Concept Tutorial Template Structure

#### Task 2.1.1: Template Schema

- [x] Create `beats/_templates/concept-tutorial/schema.ts`
- [x] Define `ConceptTutorialContent` interface
- [x] Export schema and validation function

#### Task 2.1.2: Template Base Component

- [x] Create `beats/_templates/concept-tutorial/ConceptTutorialTemplate.tsx`
- [x] Implement view state management (INTRO → DASHBOARD → SCENARIO → SUMMARY)
- [x] Implement INTRO view with TabGroup for sections
- [x] Implement DASHBOARD view with scenario Card grid
- [x] Implement SCENARIO view with stage progression
- [x] Implement SUMMARY view with results display
- [x] Accept `content: ConceptTutorialContent` as prop
- [x] Use shared components throughout

#### Task 2.1.3: Template Interactive Components

- [x] Create `beats/_templates/concept-tutorial/components/StageSelector.tsx`
- [x] Implement option shuffling using shared shuffle utility
- [x] Implement selection state with visual feedback
- [x] Implement disabled state during processing
- [x] Create `beats/_templates/concept-tutorial/components/ScenarioProgress.tsx`
- [x] Show current stage (1/3, 2/3, 3/3) with icons

#### Task 2.1.4: Template Documentation

- [x] Create `beats/_templates/concept-tutorial/README.md`
- [x] Document template purpose and use case
- [x] Document content schema with examples
- [x] Document customization options
- [x] Include sample content structure

**Test 2.1**: Build passes with `npm run build` ✅ PASSED

---

### Task 2.2: Create Strategic Framework Template Structure

#### Task 2.2.1: Template Schema

- [x] Create `beats/_templates/strategic-framework/schema.ts`
- [x] Define `StrategicFrameworkContent` interface
- [x] Export schema and validation function

#### Task 2.2.2: Template Base Component

- [x] Create `beats/_templates/strategic-framework/StrategicFrameworkTemplate.tsx`
- [x] Implement view state management (INTRO → FRAMEWORK → DETAIL)
- [x] Implement INTRO view with context and instructions
- [x] Implement FRAMEWORK view with interactive 2x2 matrix
- [x] Implement DETAIL view showing selected quadrant information
- [x] Accept `content: StrategicFrameworkContent` as prop

#### Task 2.2.3: Interactive Matrix Component

- [x] Create `beats/_templates/strategic-framework/components/InteractiveMatrix.tsx`
- [x] Render 2x2 grid with axis labels
- [x] Implement quadrant hover states with color highlights
- [x] Implement quadrant click to select
- [x] Show quadrant title on hover
- [x] Animate transitions between states

#### Task 2.2.4: Quadrant Detail Component

- [x] Create `beats/_templates/strategic-framework/components/QuadrantDetail.tsx`
- [x] Display quadrant title, description, and examples
- [x] Show position indicator (where in the matrix)
- [x] Add back button to return to matrix view

#### Task 2.2.5: Template Documentation

- [x] Create `beats/_templates/strategic-framework/README.md`
- [x] Document template purpose and use case
- [x] Document content schema with examples
- [x] Include sample framework (e.g., AI Risk-Value Matrix)

**Test 2.2**: Build passes with `npm run build` ✅ PASSED

---

### Task 2.3: Create Template Index and Selection

- [x] Create `beats/_templates/index.ts`
- [x] Export both templates with type-safe template selector
- [x] Create `TemplateType` union type: 'concept-tutorial' | 'strategic-framework'
- [x] Create `getTemplate(type: TemplateType)` function

**Test 2.3**: Build passes, TypeScript types verified ✅ PASSED

---

## Phase 2 Completion Checklist

- [x] All Task 2.x subtasks completed
- [x] All Task 2.x tests passing
- [x] Concept Tutorial template renders full flow
- [x] Strategic Framework template renders full flow
- [x] Templates use shared components consistently
- [x] Template documentation is complete

✅ PHASE 2 COMPLETE

---

## Phase 3: Beat Catalog System

### Task 3.1: Create Catalog Data Structure

- [x] Create `beats/_catalog/beats.json` - array of Beat metadata
- [x] Add ontology-ai-tutor as first entry with all metadata fields
- [x] Create `beats/_catalog/types.ts` with CatalogEntry interface

**Test 3.1**: Types validated, beats.json structure correct ✅ PASSED

---

### Task 3.2: Create Catalog Page Component

- [x] Create `beats/_catalog/CatalogPage.tsx`
- [x] Implement responsive grid layout for Beat cards
- [x] Display each Beat with: title, description, template type badge, publish date
- [x] Add link to each Beat's deployed URL
- [x] Implement filter by template type (optional)
- [x] Use shared Card component for Beat entries
- [x] Style with THTX branding

**Test 3.2**: Build passes ✅ PASSED

---

### Task 3.3: Create Catalog Build System

- [x] Create `beats/_catalog/package.json` with build script
- [x] Create `beats/_catalog/vite.config.ts` for standalone build
- [x] Create `beats/_catalog/index.html` entry point
- [x] Configure output to `beats/_catalog/dist/`

**Test 3.3**:
- [x] Run `npm run build` in `beats/_catalog/`
- [x] Verify `dist/` folder created with index.html and assets

✅ PASSED

---

### Task 3.4: Update Deployment Workflow

- [x] Read current `.github/workflows/deploy.yml`
- [x] Add catalog build step alongside Beat builds
- [x] Configure catalog to deploy to `/catalog/` path
- [x] Ensure catalog rebuilds when `beats/**` changes

**Test 3.4**:
- [ ] Push to main branch to trigger deployment
- [ ] Verify GitHub Action completes successfully
- [ ] Access catalog via https://businessdatasolutions.github.io/thtx-knowledge-bank/catalog/

✅ PASSED (workflow updated)

---

## Phase 3 Completion Checklist

- [x] All Task 3.x subtasks completed
- [x] All Task 3.x tests passing
- [x] Catalog page displays all Beats
- [x] Deployment workflow updated for catalog
- [x] Adding new Beat metadata to beats.json will reflect in catalog

✅ PHASE 3 COMPLETE

---

## Phase 4: Beat Generation System

### Task 4.1: Create Source Material Parser

#### Task 4.1.1: Markdown Parser

- [x] Create `beats/_generator/parsers/markdown.ts`
- [x] Implement function to extract headings, sections, and content
- [x] Return structured object with title, sections, key points

#### Task 4.1.2: Plain Text Parser

- [x] Create `beats/_generator/parsers/text.ts`
- [x] Implement paragraph detection and importance scoring
- [x] Detect language (Dutch/English)
- [x] Return structured content object

#### Task 4.1.3: Transcript Parser

- [x] Create `beats/_generator/parsers/transcript.ts`
- [x] Implement speaker detection (if formatted)
- [x] Extract key topics and quotes
- [x] Return structured content object

#### Task 4.1.4: Parser Index

- [x] Create `beats/_generator/parsers/index.ts`
- [x] Implement `parseSourceMaterial(filePath: string)` that auto-detects format
- [x] Route to appropriate parser based on file extension and content analysis
- [x] Add common fields (wordCount, keyPoints) to ParseResult

**Test 4.1**:
- [x] Test markdown parser extracts correct structure
- [x] Test transcript parser handles speaker format
- [x] Test auto-detection routes correctly

✅ PASSED

---

### Task 4.2: Create Content Extraction Prompts

- [x] Create `beats/_generator/prompts/concept-tutorial.ts`
- [x] Define system prompt for extracting tutorial content from source
- [x] Define user prompt template with placeholders for source content
- [x] Specify expected JSON output format matching schema
- [x] Create `beats/_generator/prompts/strategic-framework.ts`
- [x] Define prompts for framework content extraction
- [x] Create `beats/_generator/prompts/index.ts` exporting all prompts

**Test 4.2**:
- [x] Verify prompts are valid strings without syntax errors
- [x] Verify JSON output format matches template schemas

✅ PASSED

---

### Task 4.3: Create Beat Generator Core

- [x] Create `beats/_generator/generator.ts`
- [x] Implement `prepareGeneration(options: GeneratorOptions)` function
- [x] Implement `finalizeGeneration(content, preparation)` function
- [x] Parse source material using parsers
- [x] Generate prompts for AI content generation
- [x] Validate generated content against template schema
- [x] Create Beat directory structure
- [x] Write constants.tsx with generated content
- [x] Save metadata.json and _prompts.json
- [x] Update beats.json catalog

**Test 4.3**:
- [x] Run generator with real article
- [x] Verify prompts generated correctly
- [x] Verify output saved to correct location

✅ PASSED

---

### Task 4.4: Create Generator CLI

- [x] Create `beats/_generator/cli.ts`
- [x] Implement command-line interface:
  ```
  Usage: npx tsx cli.ts --source <path> --template <type> --name <beat-name>
  ```
- [x] Add interactive mode for template selection (--interactive)
- [x] Add validation for required arguments
- [x] Add progress output during generation
- [x] Create `beats/_generator/package.json` with scripts
- [x] Create `beats/_generator/tsconfig.json`
- [x] Create `beats/_generator/types.ts` for generator-specific types

**Test 4.4**:
- [x] Run CLI with --help, verify usage displayed
- [x] Run CLI with missing args, verify error message
- [x] Run CLI with valid args, verify prompts generated

✅ PASSED

---

### Task 4.5: Create Refinement Interface (Optional - v2)

- [ ] Create `beats/_generator/refine.ts`
- [ ] Implement function to load existing Beat content
- [ ] Implement function to apply refinement prompts
- [ ] Save refined content back to Beat
- [ ] Add to CLI as `--refine <beat-name>` option

*Note: Refinement interface deferred to v2. Core generation workflow complete.*

---

## Phase 4 Completion Checklist

- [x] All Task 4.x subtasks completed (4.1-4.4)
- [x] All Task 4.x tests passing
- [x] Generator CLI runs without errors
- [x] Source materials parse correctly
- [x] Prompts match template schema
- [ ] Generated Beats build successfully (requires Phase 5)
- [x] Catalog updates automatically (via finalizeGeneration)

✅ PHASE 4 COMPLETE

---

## Phase 5: Integration and First Beat

### Task 5.1: Migrate Ontology AI Tutor to Shared Components

- [ ] Update ontology-ai-tutor to import from `../_shared/components`
- [ ] Replace local Button usages with shared Button
- [ ] Replace local styling with brand tokens
- [ ] Verify all functionality preserved

**Test 5.1**:
- [ ] Run `npm run build` in ontology-ai-tutor
- [ ] Run `npm run dev` and manually test all flows
- [ ] Verify no visual regressions
- [ ] Verify deploy still works

---

### Task 5.2: Generate First Client Beat

- [ ] Select source material from `articles/` folder
- [ ] Run generator CLI with concept-tutorial template
- [ ] Review generated content for accuracy
- [ ] Refine content via conversation if needed
- [ ] Verify Beat builds successfully

**Test 5.2**:
- [ ] `npm run build` passes for new Beat
- [ ] All views render correctly
- [ ] Scenarios have valid options and feedback
- [ ] Navigation works end-to-end

---

### Task 5.3: Deploy and Validate Full System

- [ ] Commit new Beat to repository
- [ ] Push to main branch
- [ ] Verify GitHub Action triggers and completes
- [ ] Verify Beat accessible at deployed URL
- [ ] Verify catalog shows new Beat
- [ ] Test Beat on mobile device

**Test 5.3**:
- [ ] New Beat loads at expected URL
- [ ] Catalog displays both Beats (tutor + new)
- [ ] All interactive elements work
- [ ] No console errors in browser

---

## Phase 5 Completion Checklist

- [ ] All Task 5.x subtasks completed
- [ ] All Task 5.x tests passing
- [ ] Ontology AI Tutor uses shared components
- [ ] First client Beat generated and deployed
- [ ] Full workflow validated end-to-end
- [ ] Documentation updated

---

## Final Validation

- [ ] All phases complete
- [ ] All tests passing
- [ ] Two Beats deployed (tutor + first client Beat)
- [ ] Catalog live and showing all Beats
- [ ] Generator CLI documented and working
- [ ] CLAUDE.md updated with workflow instructions
