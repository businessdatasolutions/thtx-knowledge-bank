---
name: prd-creator
description: Create detailed Product Requirements Documents (PRDs) through guided discovery. Use when the user wants to define a new feature, write requirements, create a PRD, document product specifications, or says things like "I need a PRD for...", "help me define requirements for...", "I want to build [feature]", or "create a product spec".
---

# PRD Creator

Create clear, actionable Product Requirements Documents suitable for junior developers to implement.

## Workflow

### 1. Gather Requirements

When the user describes a feature, ask clarifying questions **before** writing the PRD. Present options as lettered/numbered lists for easy selection.

**Core questions to adapt based on context:**

- **Problem/Goal**: What problem does this solve? What's the main objective?
- **Target User**: Who will use this feature?
- **Core Functionality**: What key actions should users perform?
- **User Stories**: Can you provide scenarios? (As a [user], I want to [action] so that [benefit])
- **Acceptance Criteria**: How do we know it's done? What defines success?
- **Scope**: What should this explicitly *not* do?
- **Data**: What data does this display or manipulate?
- **Design/UI**: Any mockups, guidelines, or desired look and feel?
- **Edge Cases**: Any error conditions or unusual scenarios to handle?

Ask 3-5 focused questions per round. Provide sensible defaults or examples where helpful.

### 2. Generate PRD

After gathering sufficient detail, create the PRD with this structure:

```markdown
# [Feature Name] - Product Requirements Document

## 1. Overview
Brief description of the feature and the problem it solves.

## 2. Goals
Specific, measurable objectives for this feature.

## 3. User Stories
Narratives describing feature usage and benefits.
Format: "As a [user type], I want to [action] so that [benefit]."

## 4. Functional Requirements
Numbered list of specific functionalities. Use clear, unambiguous language.
Example: "1. The system must allow users to upload a profile picture."

## 5. Non-Goals (Out of Scope)
What this feature will NOT include.

## 6. Design Considerations
UI/UX requirements, mockup links, relevant components/styles. (Optional)

## 7. Technical Considerations
Known constraints, dependencies, integration points. (Optional)

## 8. Success Metrics
How success will be measured. (e.g., "Reduce support tickets by 20%")

## 9. Open Questions
Remaining questions or areas needing clarification.
```

### 3. Save the Document

Save the PRD to: `/tasks/prd-[feature-name].md`

Use kebab-case for the feature name (e.g., `prd-user-authentication.md`).

## Writing Guidelines

- **Audience**: Junior developers who need explicit, unambiguous requirements
- **Language**: Avoid jargon; define technical terms when necessary
- **Requirements**: Be specific and testable; avoid vague terms like "fast" or "user-friendly"
- **Scope**: Clearly separate what's in vs. out of scope
