/**
 * Strategic Framework Prompts
 *
 * AI prompts for generating Strategic Framework content from source material.
 */

import type { ParseResult } from '../parsers';

/**
 * System prompt for the AI to understand the Strategic Framework format.
 */
export const SYSTEM_PROMPT = `Je bent een expert content generator voor THTX Beats - interactieve leercontainers voor executives en technisch leiders.

Je taak is om bronmateriaal te transformeren naar een gestructureerd "Strategic Framework" Beat.

## Strategic Framework Structuur

Een Strategic Framework heeft 3 weergaven:
1. **INTRO** - Uitleg van het framework met context en instructies
2. **FRAMEWORK** - Interactieve 2x2 matrix met klikbare kwadranten
3. **DETAIL** - Diepgaande informatie per kwadrant

## Vereisten voor de Matrix

De 2x2 matrix moet:
- Twee duidelijke assen hebben met lage en hoge waarden
- 4 kwadranten die elk een strategische positie vertegenwoordigen
- Elk kwadrant heeft: titel, beschrijving, voorbeelden, aanbevelingen
- De assen moeten relevant zijn voor het bronmateriaal

## Output Formaat

Genereer JSON die exact past bij het StrategicFrameworkContent schema.
Alle tekst moet in het Nederlands zijn.
Maak het framework praktisch toepasbaar voor strategische besluitvorming.`;

/**
 * Create a user prompt for generating content from parsed source material.
 */
export function createUserPrompt(source: ParseResult, options?: {
  targetAudience?: string;
  xAxisConcept?: string;
  yAxisConcept?: string;
  customInstructions?: string;
}): string {
  const audience = options?.targetAudience || 'executives en technisch leiders';
  const xAxisHint = options?.xAxisConcept ? `\n- Overweeg "${options.xAxisConcept}" als X-as concept` : '';
  const yAxisHint = options?.yAxisConcept ? `\n- Overweeg "${options.yAxisConcept}" als Y-as concept` : '';
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

Genereer een Strategic Framework Beat op basis van dit bronmateriaal.

**Doelgroep:** ${audience}${xAxisHint}${yAxisHint}

### Vereiste JSON Structuur

\`\`\`json
{
  "metadata": {
    "id": "kebab-case-id",
    "title": "Framework Titel",
    "description": "Korte beschrijving (max 150 karakters)",
    "author": "THTX",
    "publishDate": "${new Date().toISOString().split('T')[0]}",
    "templateType": "strategic-framework"
  },
  "framework": {
    "title": "Framework Titel",
    "description": "Korte uitleg van wat het framework visualiseert",
    "xAxis": {
      "label": "X-As Label",
      "lowLabel": "Laag/Links",
      "highLabel": "Hoog/Rechts"
    },
    "yAxis": {
      "label": "Y-As Label",
      "lowLabel": "Laag/Onder",
      "highLabel": "Hoog/Boven"
    },
    "quadrants": [
      {
        "id": "top-left-id",
        "position": "top-left",
        "title": "Kwadrant Naam",
        "description": "Gedetailleerde beschrijving van deze strategische positie...",
        "examples": [
          "Voorbeeld organisatie of situatie 1",
          "Voorbeeld 2",
          "Voorbeeld 3"
        ],
        "recommendations": [
          "Strategische aanbeveling 1",
          "Strategische aanbeveling 2",
          "Strategische aanbeveling 3"
        ],
        "color": "bg-purple-100"
      },
      {
        "id": "top-right-id",
        "position": "top-right",
        "title": "Kwadrant Naam",
        "description": "...",
        "examples": ["..."],
        "recommendations": ["..."],
        "color": "bg-blue-100"
      },
      {
        "id": "bottom-left-id",
        "position": "bottom-left",
        "title": "Kwadrant Naam",
        "description": "...",
        "examples": ["..."],
        "recommendations": ["..."],
        "color": "bg-amber-100"
      },
      {
        "id": "bottom-right-id",
        "position": "bottom-right",
        "title": "Kwadrant Naam",
        "description": "...",
        "examples": ["..."],
        "recommendations": ["..."],
        "color": "bg-green-100"
      }
    ]
  },
  "context": {
    "introduction": "Uitgebreide introductie die uitlegt waarom dit framework relevant is, waar het vandaan komt, en hoe het zich verhoudt tot strategische besluitvorming...",
    "howToUse": "Instructies voor het gebruik: hoe bepaal je je positie, wat betekenen de kwadranten, en hoe kun je het framework gebruiken voor besluitvorming...",
    "keyTakeaways": [
      "Belangrijkste inzicht 1",
      "Belangrijkste inzicht 2",
      "Belangrijkste inzicht 3"
    ]
  }
}
\`\`\`

### Richtlijnen

1. **Assen**: Kies twee dimensies die een zinvolle strategische spanning creëren
2. **Kwadranten**: Elk kwadrant moet een herkenbare strategische positie zijn
3. **Voorbeelden**: Geef concrete, herkenbare voorbeelden voor elke positie
4. **Aanbevelingen**: Maak ze actionable - wat moet iemand in die positie doen?
5. **Kleuren**: Gebruik de standaard Tailwind kleuren:
   - top-left: bg-purple-100
   - top-right: bg-blue-100
   - bottom-left: bg-amber-100
   - bottom-right: bg-green-100
6. **Taal**: Zakelijk Nederlands, concreet en praktisch
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
