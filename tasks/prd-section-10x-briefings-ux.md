# Section 10X Briefings UX - Product Requirements Document

## 1. Overview

De Section 10X Briefings zijn interactieve artikelen die door de CMS worden gegenereerd uit bronmateriaal. Momenteel worden lange tekstblokken in de INTRO view als ongeformatteerde "wall of text" weergegeven, wat de leesbaarheid en gebruikerservaring sterk beperkt.

Dit PRD beschrijft de verbeterde UX voor beide Briefing templates (Strategic Framework en Concept Tutorial), gebaseerd op:
- **Sinek's Golden Circle** structuur (WHY → HOW → WHAT)
- **THTX design system** patronen en componenten
- **Bullet-point focus** met korte intro's en key takeaways

---

## 2. Goals

1. **Verbeterde leesbaarheid**: Lange tekstblokken omzetten naar scanbare, gestructureerde content
2. **Consistente UX**: THTX design system toepassen op alle Briefing templates
3. **Golden Circle structuur**: Content organiseren volgens WHY → HOW → WHAT patroon
4. **Backwards compatibility**: Bestaande Briefings opnieuw genereren (geen fallback nodig)

---

## 3. User Stories

1. **Als executive** wil ik snel de kern van een framework begrijpen, zodat ik kan beslissen of het relevant is voor mijn situatie.

2. **Als technisch leider** wil ik concrete actiepunten zien in bullet-vorm, zodat ik weet wat ik moet doen.

3. **Als gebruiker** wil ik een visueel aantrekkelijke interface zien die aansluit bij de THTX huisstijl, zodat de content professioneel overkomt.

---

## 4. Functional Requirements

### 4.1 Schema Wijzigingen

**FR-1**: Het `context` object moet worden uitgebreid met gestructureerde secties:

```typescript
interface FrameworkContext {
  // Golden Circle: WHY
  why: {
    headline: string;           // Max 15 woorden
    paragraph: string;          // Max 100 woorden
    keyPoints: string[];        // 3-5 bullet points
  };

  // Golden Circle: HOW
  how: {
    headline: string;
    paragraph: string;
    steps?: string[];           // Optionele stappen
    keyPoints: string[];
  };

  // Golden Circle: WHAT
  what: {
    headline: string;
    paragraph: string;
    keyPoints: string[];
  };

  // Key Takeaways (behouden)
  keyTakeaways: string[];       // 3-5 hoofdinzichten
}
```

**FR-2**: Backwards compatibility is NIET vereist - bestaande Briefings worden opnieuw gegenereerd.

### 4.2 INTRO View Layout (Strategic Framework)

**FR-3**: De INTRO view moet drie color-coded secties tonen:

| Sectie | Kleur (THTX) | Icoon | Label |
|--------|--------------|-------|-------|
| WHY | Pink (`#ff6984` / `bg-pink-50`) | `AlertCircle` | "Waarom dit framework" |
| HOW | Cyan (`#00d1ff` / `bg-cyan-50`) | `Target` | "Hoe het werkt" |
| WHAT | Yellow (`#d4db3e` / `bg-yellow-50`) | `Lightbulb` | "Wat je leert" |

**FR-4**: Elke sectie moet bevatten:
- Badge met label (linksboven)
- Headline (text-xl font-bold)
- Korte paragraph (max 100 woorden)
- Bullet list met key points (FeatureListItem pattern)

**FR-5**: Onder de drie secties komt een "Key Takeaways" card:
- Genummerde lijst (1-5 items)
- Groene checkmark iconen
- Lichte achtergrond

### 4.3 INTRO View Layout (Concept Tutorial)

**FR-6**: Concept Tutorial INTRO moet dezelfde Golden Circle structuur volgen met aangepaste labels:

| Sectie | Label |
|--------|-------|
| WHY | "Waarom dit belangrijk is" |
| HOW | "De aanpak" |
| WHAT | "Wat je gaat oefenen" |

### 4.4 AI Prompt Wijzigingen

**FR-7**: De AI prompts moeten worden aangepast om de nieuwe structuur te genereren:
- Expliciete word limits per veld
- Instructie om bullet points te gebruiken
- Voorbeeld JSON met correcte structuur

**FR-8**: Prompt moet specificeren:
- `headline`: Max 15 woorden, pakkend
- `paragraph`: Max 100 woorden, context-gevend
- `keyPoints`: Array van 3-5 strings, elk max 20 woorden

### 4.5 Design System Integratie

**FR-9**: Gebruik THTX design tokens:
```css
/* Kleuren */
--primary: #d4db3e;
--pink: #ff6984;
--cyan: #00d1ff;
--bg-pink: #fff5f7;
--bg-cyan: #f0fbff;
--bg-yellow: #fafbf0;

/* Typography */
text-4xl font-bold     /* Section headers */
text-xl font-bold      /* Card titles */
text-base              /* Body text */

/* Spacing */
py-16 px-4             /* Section padding */
p-6                    /* Card padding */
gap-4                  /* Component spacing */
rounded-xl             /* Card corners */
```

**FR-10**: Implementeer THTX Card component pattern met:
- Icon (top-left)
- Badge (header-right, optioneel)
- Title + subtitle
- Content area
- Border-2 met theme-specifieke kleur

---

## 5. Non-Goals (Out of Scope)

1. **Geen markdown parsing** - Content blijft gestructureerde JSON, geen inline markdown
2. **Geen accordions/collapsibles** - Alle content is direct zichtbaar
3. **Geen animaties** - Simpele hover states zijn voldoende
4. **Geen A/B testing** - Directe implementatie zonder varianten
5. **Geen CMS preview update** - Focus op deployed Briefings

---

## 6. Design Considerations

### Visueel Ontwerp

```
┌─────────────────────────────────────────────────────────────┐
│  [Briefing Titel]                                           │
│  Interactieve verkenning                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔴 WAAROM DIT FRAMEWORK                             │   │
│  │ ─────────────────────────────────────────────────── │   │
│  │ **Headline hier**                                   │   │
│  │                                                     │   │
│  │ Korte paragraph met context en urgentie...          │   │
│  │                                                     │   │
│  │ ✓ Key point 1                                       │   │
│  │ ✓ Key point 2                                       │   │
│  │ ✓ Key point 3                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔵 HOE HET WERKT                                    │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🟡 WAT JE LEERT                                     │   │
│  │ ...                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📋 KEY TAKEAWAYS                                    │   │
│  │ 1. Inzicht een                                      │   │
│  │ 2. Inzicht twee                                     │   │
│  │ 3. Inzicht drie                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [ Start verkenning → ]                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Technical Considerations

### Kritieke Bestanden

| Bestand | Wijziging |
|---------|-----------|
| `beats/_templates/strategic-framework/schema.ts` | Nieuwe `FrameworkContext` interface |
| `beats/_templates/strategic-framework/StrategicFrameworkTemplate.tsx` | Nieuwe INTRO view rendering |
| `beats/_templates/concept-tutorial/schema.ts` | Nieuwe context interface |
| `beats/_templates/concept-tutorial/ConceptTutorialTemplate.tsx` | Nieuwe INTRO view rendering |
| `beats/_generator/prompts/strategic-framework.ts` | Aangepaste prompt structuur |
| `beats/_generator/prompts/concept-tutorial.ts` | Aangepaste prompt structuur |
| `beats/_generator/types.ts` | TypeScript types update |
| `beats/_shared/components/` | Optioneel: nieuwe shared components |

### Dependencies

- Geen nieuwe dependencies nodig
- Lucide React icons worden al gebruikt
- Tailwind CSS classes voor THTX design tokens

---

## 8. Success Metrics

1. **Leestijd**: Gebruikers kunnen de INTRO view in <60 seconden scannen
2. **Visuele consistentie**: Briefings matchen THTX.nl design system
3. **Content structuur**: Alle gegenereerde content volgt Golden Circle patroon
4. **Technische kwaliteit**: Geen TypeScript errors, alle validatie passeert

---

## 9. Open Questions

1. ~~Moeten we de Framework/Detail views ook updaten?~~ → **Ja, beide templates volledig**
2. ~~Welke design system volgen?~~ → **THTX.nl design system**
3. ~~Backwards compatibility?~~ → **Nee, opnieuw genereren**

---

## 10. Implementatie Volgorde

### Fase 1: Schema Updates (1-2 uur)
1. Update `FrameworkContext` interface in schema.ts (beide templates)
2. Update TypeScript types in `_generator/types.ts`
3. Update validatie functies

### Fase 2: UI Components (2-3 uur)
1. Maak `GoldenCircleSection` component met THTX styling
2. Maak `KeyTakeawaysCard` component
3. Integreer in StrategicFrameworkTemplate INTRO view
4. Integreer in ConceptTutorialTemplate INTRO view

### Fase 3: AI Prompts (1-2 uur)
1. Update strategic-framework.ts prompt met nieuwe JSON structuur
2. Update concept-tutorial.ts prompt met nieuwe JSON structuur
3. Voeg word limits en bullet point instructies toe

### Fase 4: Regeneratie (1 uur)
1. Regenereer bestaande Briefings via CMS
2. Verifieer output en deploy

**Totaal: ~5-8 uur**
