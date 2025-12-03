/**
 * Concept Tutorial Prompts
 *
 * AI prompts for generating Concept Tutorial content from source material.
 */

import type { ParseResult } from '../parsers';

/**
 * System prompt for the AI to understand the Concept Tutorial format.
 */
export const SYSTEM_PROMPT = `Je bent een expert content generator voor THTX Beats - interactieve leercontainers voor executives en technisch leiders.

Je taak is om bronmateriaal te transformeren naar een gestructureerde "Concept Tutorial" Beat.

## Concept Tutorial Structuur

Een Concept Tutorial heeft 4 weergaven:
1. **INTRO** - Theorie uitleg in 3 tabbed secties (WAAROM / HOE / WAT)
2. **DASHBOARD** - Overzicht van 3-5 scenario's
3. **SCENARIO** - Interactieve 3-stappen simulatie (Data → Logica → Actie)
4. **SUMMARY** - Samenvatting van keuzes

## Vereisten voor Scenarios

Elk scenario moet:
- Een zakelijke context/uitdaging beschrijven
- 3 stages hebben: data, logic, action
- Elke stage heeft 4 opties met feedback
- Minstens 1 optie per stage is correct
- Feedback legt uit waarom de keuze goed of minder goed is

## Output Formaat

Genereer JSON die exact past bij het ConceptTutorialContent schema.
Alle tekst moet in het Nederlands zijn.
Wees concreet en praktisch - executives willen directe toepasbaarheid.`;

/**
 * Create a user prompt for generating content from parsed source material.
 */
export function createUserPrompt(source: ParseResult, options?: {
  targetAudience?: string;
  focusTopics?: string[];
  scenarioCount?: number;
  customInstructions?: string;
}): string {
  const audience = options?.targetAudience || 'executives en technisch leiders';
  const focusTopics = options?.focusTopics?.join(', ') || 'de belangrijkste concepten';
  const scenarioCount = options?.scenarioCount || 4;
  const customInstructionsSection = options?.customInstructions
    ? `\n\n## Aanvullende instructies van de gebruiker\n\n${options.customInstructions}\n`
    : '';

  return `## Bronmateriaal

**Titel:** ${source.content.title}
**Formaat:** ${source.format}
**Woorden:** ${source.content.wordCount}

### Inhoud

${source.content.raw.slice(0, 15000)}

${source.content.raw.length > 15000 ? '\n[Content afgekapt na 15000 karakters]' : ''}

---

## Opdracht

Genereer een Concept Tutorial Beat op basis van dit bronmateriaal.

**Doelgroep:** ${audience}
**Focus onderwerpen:** ${focusTopics}
**Aantal scenario's:** ${scenarioCount}

### Vereiste JSON Structuur

\`\`\`json
{
  "metadata": {
    "id": "kebab-case-id",
    "title": "Titel van de Beat",
    "description": "Korte beschrijving (max 150 karakters)",
    "author": "THTX",
    "publishDate": "${new Date().toISOString().split('T')[0]}",
    "templateType": "concept-tutorial"
  },
  "intro": {
    "sections": [
      {
        "id": "waarom",
        "tabLabel": "WAAROM",
        "title": "Waarom dit belangrijk is",
        "content": "Uitleg over het belang van dit concept..."
      },
      {
        "id": "hoe",
        "tabLabel": "HOE",
        "title": "Hoe het werkt",
        "content": "Uitleg over de aanpak..."
      },
      {
        "id": "wat",
        "tabLabel": "WAT",
        "title": "Wat je leert",
        "content": "Concrete leerdoelen..."
      }
    ]
  },
  "scenarios": [
    {
      "id": "scenario-1",
      "title": "Scenario Titel",
      "description": "Korte beschrijving voor dashboard",
      "icon": "BookOpen",
      "context": "Achtergrond verhaal van de zakelijke situatie...",
      "stages": [
        {
          "id": "data",
          "question": "Welke data heb je nodig om deze situatie te analyseren?",
          "options": [
            {
              "id": "data-a",
              "text": "Optie A beschrijving",
              "feedback": "Feedback waarom dit wel/niet de beste keuze is",
              "isCorrect": true
            },
            {
              "id": "data-b",
              "text": "Optie B beschrijving",
              "feedback": "Feedback...",
              "isCorrect": false
            },
            {
              "id": "data-c",
              "text": "Optie C beschrijving",
              "feedback": "Feedback...",
              "isCorrect": false
            },
            {
              "id": "data-d",
              "text": "Optie D beschrijving",
              "feedback": "Feedback...",
              "isCorrect": false
            }
          ]
        },
        {
          "id": "logic",
          "question": "Welke analyse of redenering pas je toe?",
          "options": [/* 4 opties */]
        },
        {
          "id": "action",
          "question": "Welke actie onderneem je?",
          "options": [/* 4 opties */]
        }
      ],
      "summary": "Terugblik op het scenario en de lessen..."
    }
  ]
}
\`\`\`

### Richtlijnen

1. **Intro secties**: Maak ze concreet en relevant voor de doelgroep
2. **Scenario's**: Baseer ze op realistische zakelijke situaties uit het bronmateriaal
3. **Opties**: Maak alle opties plausibel - niet te voor de hand liggend
4. **Feedback**: Geef educatieve uitleg, niet alleen "goed" of "fout"
5. **Taal**: Alles in zakelijk Nederlands, geen jargon zonder uitleg
6. **Icons**: Gebruik: BookOpen, Target, TrendingUp, Users, Settings, BarChart3, Lightbulb, Zap
${customInstructionsSection}
Genereer nu de complete JSON:`;
}

/**
 * Create a refinement prompt for iterating on generated content.
 */
export function createRefinementPrompt(
  currentContent: string,
  feedback: string
): string {
  return `## Huidige Content

${currentContent}

## Feedback voor Aanpassing

${feedback}

---

## Opdracht

Pas de content aan op basis van de feedback.
Behoud de JSON structuur.
Genereer de complete aangepaste JSON:`;
}

export default {
  SYSTEM_PROMPT,
  createUserPrompt,
  createRefinementPrompt,
};
