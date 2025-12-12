# Ontology AI Tutor

Een interactieve AI-tutoring applicatie voor Business Management studenten om het Palantir Ontology framework te leren door middel van realistische case studies.

## 🌐 Live Demo

**De app is live op GitHub Pages:**
https://businessdatasolutions.github.io/thtx-knowledge-bank/

## 📋 Over deze App

Deze applicatie leert studenten het "Ontology" framework door:
- **Interactieve theorie**: Uitleg van Data-Logic-Action paradigma
- **Case studies**: 5 realistische bedrijfsscenario's (Finance, Marketing, Supply Chain, HR, Finance)
- **AI-powered feedback**: Gepersonaliseerde feedback via Google Gemini AI
- **Tweetalig**: Volledig beschikbaar in Nederlands en Engels

### Het Framework

Het Ontology framework bestaat uit drie elementen:
- **Data (De 'Nouns')**: Semantische, real-world objecten
- **Logic (De Redenering)**: AI-modellen en algoritmes
- **Action (De 'Verbs')**: Write-back naar operationele systemen

## 🚀 Lokaal Draaien

### Vereisten
- Node.js (versie 20 of hoger)
- Google Gemini API key

### Installatie

1. **Clone de repository:**
   ```bash
   git clone https://github.com/businessdatasolutions/thtx-knowledge-bank.git
   cd thtx-knowledge-bank/beats/ontology-ai-tutor
   ```

2. **Installeer dependencies:**
   ```bash
   npm install
   ```

3. **Configureer API key:**

   Maak een `.env.local` bestand aan met:
   ```
   GEMINI_API_KEY=jouw-api-key-hier
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🏗️ Build voor Productie

```bash
npm run build
```

De productie build komt in de `dist/` directory.

## 📦 Deployment

### Automatische Deployment (GitHub Actions)

De app wordt automatisch gedeployed naar GitHub Pages bij elke push naar `main` die wijzigingen bevat in `beats/ontology-ai-tutor/`.

**Deployment workflow:**
- Triggert automatisch bij push
- Build met Vite
- Deploy naar GitHub Pages
- Live binnen ~30 seconden

**Handmatig triggeren:**
```bash
gh workflow run deploy.yml
```

### Deployment Configuratie

Voor gedetailleerde deployment instructies, zie [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Technische Stack

- **Framework**: React 19 met TypeScript
- **Build tool**: Vite 6
- **AI**: Google Gemini 2.5 Flash API
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages + GitHub Actions

## 📁 Project Structuur

```
ontology-ai-tutor/
├── components/          # React componenten
│   ├── StageSelector.tsx       # Multiple choice selectie UI
│   ├── InteractiveDiagram.tsx  # Visuele framework representatie
│   ├── CaseSummary.tsx         # Resultaten overzicht
│   └── TheoryVisuals.tsx       # Educatieve visualisaties
├── services/           # API services
│   └── geminiService.ts        # Google Gemini integratie
├── App.tsx            # Hoofd applicatie component
├── constants.tsx      # UI teksten en case study content (1,570 regels)
├── types.ts           # TypeScript type definities
├── index.html         # HTML entry point
├── index.tsx          # React mount point
├── vite.config.ts     # Vite configuratie
├── package.json       # Dependencies en scripts
└── DEPLOYMENT.md      # Deployment documentatie
```

## 🎓 Case Studies

De app bevat 5 interactieve case studies:

1. **Financiële strategie: Kapitaaltoewijzing** - Investment decision making met DCF analyse
2. **Marketing: Klantbehoud** - Churn preventie met predictive AI
3. **Supply chain: Crisisbestrijding** - Materiaal reallocatie tijdens tekorten
4. **HR: Talentbehoud** - Proactieve retentie van high-performers
5. **Financiën: Kinetische DuPont-analyse** - Asset efficiency optimalisatie

Elke case study heeft drie stappen:
- **Stap 1**: Data selectie (de 'Nouns')
- **Stap 2**: Logic selectie (de redenering)
- **Stap 3**: Action selectie (de 'Verbs')

## 🌍 Talen

- **Nederlands (NL)**: Professionele zakelijke content met 29 kwaliteitscorrecties
- **Engels (EN)**: Volledige Engelse vertaling

## 📈 Recente Verbeteringen (December 2024)

### Kwaliteitsverbetering voor HBO Bedrijfskunde Jaar 2

De quiz-kwaliteit is verbeterd van **8.2/10** naar **9.0/10+** met focus op:

#### 1. Content Verbeteringen
- ✅ **Bronverwijzing toegevoegd**: Case 3 (Titan Industries) citeert nu het Palantir Ontology artikel (Krishnaswamy, 2024)
- ✅ **6 distractor upgrades**: "Overduidelijk foute" opties vervangen door "plausibel maar suboptimaal" alternatieven
  - Case 1: "Kantoorartikelen" → "Historische jaarverslagen" (leert aggregate vs. instance-level)
  - Case 1: "Blogpost" → "Auto-genereer compliance memo" (leert latency en governance)
  - Case 2: "Social media scraper" → "NPS scores per regio" (leert real-time vs. batch)
  - Case 3: "Satellietbeelden" → "Handmatige logboeken" (leert betrouwbaarheid)
  - Case 3: "Post-it" → "Dashboard alert" (leert write-back vs. human-in-loop)
  - Case 4: "Keycard blokkeren" → "Auto-schedule exit interview" (leert proactief vs. reactief)

#### 2. Verrijkte Feedback
- **Data feedback**: Vermeldt heterogene bronintegratie (ERP, CRM, IoT, SaaS)
- **Logic feedback**: Legt logic binding uit over cloud, on-prem, en SaaS omgevingen
- **Action feedback**: Introduceert scenarios framework voor safe staging

#### 3. Pedagogische Ondersteuning
- **Reflectievragen**: 3 vragen op het samenvattingsscherm per case
- **Docentenhandleiding**: [TEACHER_GUIDE.md](./TEACHER_GUIDE.md) met:
  - 3-rondes discussie framework (Delen → Patroon → Toepassen)
  - Beoordelingsrubric (Data, Logic, Action, Integratie)
  - Veelvoorkomende misconcepties met correcties
  - Verlengactiviteiten voor dieper leren

#### 4. Kwaliteitsimpact

| Aspect | Voor | Na |
|--------|------|-----|
| Algemene kwaliteit | 8.2/10 | 9.0/10+ |
| Distractor kwaliteit | 7.5/10 | 8.5/10 |
| Bronalignment | 8.0/10 | 9.0/10 |
| Validiteit | 8.5/10 | 9.0/10 |

#### 5. Nieuwe Bestanden
- `TEACHER_GUIDE.md` - Volledige klasfacilitatiegids (3000+ woorden)
- `quality-criteria.md` - Referentiedocument voor vraagkwaliteit
- Palantir Ontology bronmateriaal (PDF)

Voor details, zie commit `17d5462` of `/Users/witoldtenhove/.claude/plans/compressed-snacking-gray.md`

## 📝 Licentie

Dit is een educatief project ontwikkeld voor Business Management onderwijs.

## 🤝 Credits

- **Framework concept**: Gebaseerd op Palantir's Ontology framework
- **AI integratie**: Google Gemini 2.5 Flash
- **Development**: THTX Knowledge Bank project
- **Nederlandse content correcties**: Professionele business schrijfstijl

## 🔗 Links

- **Live app**: https://businessdatasolutions.github.io/thtx-knowledge-bank/
- **Repository**: https://github.com/businessdatasolutions/thtx-knowledge-bank
- **GitHub Actions**: https://github.com/businessdatasolutions/thtx-knowledge-bank/actions
- **Deployment docs**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Laatste update**: 12 december 2024
**Versie**: 1.1.0
**Status**: ✅ Live op GitHub Pages
