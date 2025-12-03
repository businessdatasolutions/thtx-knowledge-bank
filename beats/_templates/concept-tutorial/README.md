# Concept Tutorial Template

Een multi-stage educatieve template voor het maken van interactieve leertrajecten.

## Structuur

De template bestaat uit vier weergaven:

1. **INTRO** - Theorie sectie met tabs (bijv. WAAROM / HOE / WAT)
2. **DASHBOARD** - Overzicht van scenario's in een grid
3. **SCENARIO** - Interactieve drie-stappen flow (Data → Logica → Actie)
4. **SUMMARY** - Samenvatting van gemaakte keuzes met terugblik

## Gebruik

```typescript
import { ConceptTutorialTemplate, createContent } from '@thtx/templates/concept-tutorial';

const content = createContent({
  metadata: {
    id: 'mijn-tutorial',
    title: 'Mijn Tutorial',
    description: 'Een interactieve leerervaring',
    author: 'THTX',
    publishDate: '2024-01-01',
    templateType: 'concept-tutorial',
  },
  intro: {
    sections: [
      {
        id: 'waarom',
        tabLabel: 'WAAROM',
        title: 'Waarom dit belangrijk is',
        content: 'Uitleg over het belang...',
      },
      // meer secties...
    ],
  },
  scenarios: [
    {
      id: 'scenario-1',
      title: 'Eerste Scenario',
      description: 'Korte beschrijving',
      icon: 'BookOpen',
      context: 'Achtergrond verhaal...',
      stages: [
        {
          id: 'data',
          question: 'Welke data heb je nodig?',
          options: [
            { id: 'a', text: 'Optie A', feedback: 'Uitleg...', isCorrect: true },
            { id: 'b', text: 'Optie B', feedback: 'Uitleg...', isCorrect: false },
          ],
        },
        // logic en action stages...
      ],
      summary: 'Terugblik op het scenario...',
    },
  ],
});

// Render de template
<ConceptTutorialTemplate content={content} />
```

## Content Schema

### metadata (verplicht)
| Veld | Type | Beschrijving |
|------|------|--------------|
| id | string | Unieke identifier (kebab-case) |
| title | string | Titel van de Beat |
| description | string | Korte beschrijving |
| author | string | Auteur naam |
| publishDate | string | ISO datum string |
| templateType | 'concept-tutorial' | Template type |

### intro.sections (verplicht, minimaal 1)
| Veld | Type | Beschrijving |
|------|------|--------------|
| id | string | Unieke identifier |
| tabLabel | string | Kort label voor tab (bijv. "HOE") |
| title | string | Volledige sectie titel |
| content | ReactNode \| string | Inhoud van de sectie |

### scenarios (verplicht, minimaal 1)
| Veld | Type | Beschrijving |
|------|------|--------------|
| id | string | Unieke identifier |
| title | string | Scenario titel |
| description | string | Korte beschrijving voor dashboard |
| icon | string | Lucide icon naam |
| context | string | Achtergrond verhaal |
| stages | Stage[] | Array van 3 stages (data, logic, action) |
| summary | string | Terugblik tekst |

### stages (verplicht, 3 per scenario)
| Veld | Type | Beschrijving |
|------|------|--------------|
| id | string | Stage identifier (data/logic/action) |
| question | string | De vraag voor deze stage |
| instruction | string? | Optionele instructie |
| options | Option[] | Minimaal 2 opties |

### options (verplicht, minimaal 2 per stage)
| Veld | Type | Beschrijving |
|------|------|--------------|
| id | string | Unieke identifier |
| text | string | Optie tekst |
| feedback | string | Feedback na selectie |
| isCorrect | boolean | Of dit de juiste keuze is |

## UI Labels

De template gebruikt standaard Nederlandse labels. Deze kunnen worden overschreven:

```typescript
const content = createContent({
  // ... metadata, intro, scenarios
  ui: {
    title: 'Aangepaste titel',
    dashboardTitle: 'Kies je pad',
    // ... andere labels
  },
});
```

Zie `schema.ts` voor alle beschikbare labels.

## Componenten

### ConceptTutorialTemplate
Hoofd template component. Accepteert `content: ConceptTutorialContent`.

### StageSelector
Multiple-choice selector voor scenario stages. Shuffelt opties automatisch.

### ScenarioProgress
Visuele voortgangsindicator: Data → Logica → Actie.

## Validatie

Gebruik `validateContent()` om content te valideren:

```typescript
import { validateContent } from '@thtx/templates/concept-tutorial';

const errors = validateContent(content);
if (errors.length > 0) {
  console.error('Validatie fouten:', errors);
}
```
