/**
 * Strategic Framework Prompts
 *
 * AI prompts for generating Strategic Framework content from source material.
 */

import type { ParseResult } from '../parsers';

/**
 * System prompt for the AI to understand the Strategic Framework format.
 */
export const SYSTEM_PROMPT = `Je bent een expert content generator voor THTX Section 10X Briefings - interactieve leercontainers voor executives en technisch leiders.

Je taak is om bronmateriaal te transformeren naar een gestructureerde "Strategic Framework" Briefing.

## Strategic Framework Structuur

Een Strategic Framework heeft 3 weergaven:
1. **INTRO** - Uitleg via Golden Circle (WHY → HOW → WHAT) met scanbare bullet points
2. **FRAMEWORK** - Interactieve 2x2 matrix met klikbare kwadranten
3. **DETAIL** - Diepgaande informatie per kwadrant

## INTRO View - Golden Circle Structuur (Sinek)

De INTRO moet gestructureerd zijn volgens Sinek's Golden Circle:

1. **WHY** - Waarom dit framework belangrijk is
   - headline: Max 15 woorden, pakkend
   - paragraph: Max 100 woorden, context-gevend
   - keyPoints: 3-5 bullet points, elk max 20 woorden

2. **HOW** - Hoe het framework werkt
   - headline: Max 15 woorden
   - paragraph: Max 100 woorden
   - keyPoints: 3-5 bullet points
   - steps: Optionele stappen (als relevant)

3. **WHAT** - Wat je leert/bereikt
   - headline: Max 15 woorden
   - paragraph: Max 100 woorden
   - keyPoints: 3-5 bullet points

4. **Key Takeaways** - 3-5 hoofdinzichten

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
    "why": {
      "headline": "Pakkende headline over waarom dit framework belangrijk is (max 15 woorden)",
      "paragraph": "Korte context-gevende paragraaf die de urgentie en relevantie uitlegt. Maximaal 100 woorden.",
      "keyPoints": [
        "Eerste key point over het waarom (max 20 woorden)",
        "Tweede key point over het probleem dat dit framework oplost",
        "Derde key point over de impact van niet handelen"
      ]
    },
    "how": {
      "headline": "Pakkende headline over hoe het framework werkt (max 15 woorden)",
      "paragraph": "Korte uitleg van de aanpak en methodiek. Maximaal 100 woorden.",
      "keyPoints": [
        "Eerste key point over de aanpak",
        "Tweede key point over het proces",
        "Derde key point over de implementatie"
      ],
      "steps": [
        "Optionele stap 1",
        "Optionele stap 2",
        "Optionele stap 3"
      ]
    },
    "what": {
      "headline": "Pakkende headline over wat je leert/bereikt (max 15 woorden)",
      "paragraph": "Korte beschrijving van de concrete outcomes. Maximaal 100 woorden.",
      "keyPoints": [
        "Eerste key point over de outcome",
        "Tweede key point over de resultaten",
        "Derde key point over de toepasbaarheid"
      ]
    },
    "keyTakeaways": [
      "Belangrijkste inzicht 1 uit het hele framework",
      "Belangrijkste inzicht 2",
      "Belangrijkste inzicht 3"
    ]
  }
}
\`\`\`

### Richtlijnen

1. **Golden Circle Context**: Structureer de intro volgens WHY → HOW → WHAT
   - WHY: Urgentie, probleem, waarom nu handelen
   - HOW: Aanpak, methodiek, hoe het werkt
   - WHAT: Concrete outcomes, wat je leert/bereikt
2. **Tekstlengtes**: Strikt aanhouden!
   - Headlines: max 15 woorden
   - Paragraphs: max 100 woorden
   - Key points: 3-5 items, elk max 20 woorden
3. **Assen**: Kies twee dimensies die een zinvolle strategische spanning creëren
4. **Kwadranten**: Elk kwadrant moet een herkenbare strategische positie zijn
5. **Voorbeelden**: Geef concrete, herkenbare voorbeelden voor elke positie
6. **Aanbevelingen**: Maak ze actionable - wat moet iemand in die positie doen?
7. **Kleuren**: Gebruik de standaard Tailwind kleuren:
   - top-left: bg-purple-100
   - top-right: bg-blue-100
   - bottom-left: bg-amber-100
   - bottom-right: bg-green-100
8. **Taal**: Zakelijk Nederlands, concreet en praktisch
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
