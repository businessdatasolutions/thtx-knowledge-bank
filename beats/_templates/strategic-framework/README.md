# Strategic Framework Template

Een interactieve 2x2 matrix template voor strategische frameworks en positionering.

## Structuur

De template bestaat uit drie weergaven:

1. **INTRO** - Introductie van het framework met uitleg en instructies
2. **FRAMEWORK** - Interactieve 2x2 matrix visualisatie
3. **DETAIL** - Diepgaande informatie over geselecteerd kwadrant

## Gebruik

```typescript
import { StrategicFrameworkTemplate, createContent } from '@thtx/templates/strategic-framework';

const content = createContent({
  metadata: {
    id: 'ai-risk-value-matrix',
    title: 'AI Risk-Value Matrix',
    description: 'Strategische positionering voor AI initiatieven',
    author: 'THTX',
    publishDate: '2024-01-01',
    templateType: 'strategic-framework',
  },
  framework: {
    title: 'AI Risk-Value Matrix',
    description: 'Bepaal de strategische positie van AI initiatieven',
    xAxis: {
      label: 'Potentiële Waarde',
      lowLabel: 'Laag',
      highLabel: 'Hoog',
    },
    yAxis: {
      label: 'Risico / Complexiteit',
      lowLabel: 'Laag',
      highLabel: 'Hoog',
    },
    quadrants: [
      {
        id: 'explore',
        position: 'top-right',
        title: 'Verkennen',
        description: 'Hoog risico, hoge waarde - strategische experimenten',
        examples: ['Generatieve AI producten', 'Autonome systemen'],
        recommendations: ['Start met pilot projecten', 'Bouw expertise op'],
        color: 'bg-blue-100',
      },
      // ... andere kwadranten
    ],
  },
  context: {
    introduction: 'Dit framework helpt bij het prioriteren van AI initiatieven...',
    howToUse: 'Klik op een kwadrant om meer te leren over de strategie...',
    keyTakeaways: [
      'Begin met lage risico, hoge waarde initiatieven',
      'Bouw expertise op via experimenten',
    ],
  },
});

// Render de template
<StrategicFrameworkTemplate content={content} />
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
| templateType | 'strategic-framework' | Template type |

### framework (verplicht)
| Veld | Type | Beschrijving |
|------|------|--------------|
| title | string | Framework titel |
| description | string | Korte beschrijving |
| xAxis | Axis | X-as configuratie |
| yAxis | Axis | Y-as configuratie |
| quadrants | Quadrant[] | Precies 4 kwadranten |

### Axis
| Veld | Type | Beschrijving |
|------|------|--------------|
| label | string | As label |
| lowLabel | string | Label voor lage waarde |
| highLabel | string | Label voor hoge waarde |

### Quadrant (verplicht, precies 4)
| Veld | Type | Beschrijving |
|------|------|--------------|
| id | string | Unieke identifier |
| position | QuadrantPosition | top-left, top-right, bottom-left, bottom-right |
| title | string | Kwadrant titel |
| description | string | Gedetailleerde beschrijving |
| examples | string[] | Voorbeelden in dit kwadrant |
| recommendations | string[]? | Optionele aanbevelingen |
| color | string | Achtergrondkleur (Tailwind class) |
| icon | string? | Optioneel lucide-react icon |

### context (verplicht)
| Veld | Type | Beschrijving |
|------|------|--------------|
| introduction | string | Introductie tekst |
| howToUse | string | Gebruiksinstructies |
| keyTakeaways | string[]? | Optionele kernpunten |

## Standaard Kleuren

Kwadranten krijgen standaard kleuren als niet gespecificeerd:

| Positie | Kleur |
|---------|-------|
| top-left | `bg-purple-100` |
| top-right | `bg-blue-100` |
| bottom-left | `bg-amber-100` |
| bottom-right | `bg-green-100` |

## UI Labels

De template gebruikt standaard Nederlandse labels. Deze kunnen worden overschreven:

```typescript
const content = createContent({
  // ... metadata, framework, context
  ui: {
    title: 'Aangepaste titel',
    selectQuadrant: 'Kies je positie',
    // ... andere labels
  },
});
```

Zie `schema.ts` voor alle beschikbare labels.

## Componenten

### StrategicFrameworkTemplate
Hoofd template component. Accepteert `content: StrategicFrameworkContent`.

### InteractiveMatrix
De 2x2 matrix visualisatie met klikbare kwadranten.

### QuadrantDetail
Gedetailleerde weergave van een geselecteerd kwadrant.

## Validatie

Gebruik `validateContent()` om content te valideren:

```typescript
import { validateContent } from '@thtx/templates/strategic-framework';

const errors = validateContent(content);
if (errors.length > 0) {
  console.error('Validatie fouten:', errors);
}
```
