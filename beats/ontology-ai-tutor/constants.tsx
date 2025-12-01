import React from 'react';
import { CaseStudy, TheorySection, Language } from './types';
import { Factory, TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';
import { DecisionAtoms, OntologyArchitecture, CrispDmMapping } from './components/TheoryVisuals';

// --- UI TEXT DICTIONARY ---
export const UI_TEXT = {
  EN: {
    title: "Ontology Tutor",
    subtitle: "Management AI",
    navIntro: "Introduction & Theory",
    navCases: "Case Simulations",
    progress: "Your Progress",
    completed: "Completed",
    introTag: "Business Management Tutorial",
    introTitle: "Connecting AI to",
    introHighlight: "Business Decisions",
    introSub: "The 'Ontology' Framework for the Modern Enterprise.",
    nextConcept: "Next Concept",
    startSim: "Start Simulations",
    prev: "Previous",
    casesTitle: "Case Studies",
    casesSub: "Apply the Data-Logic-Action framework to realistic business problems.",
    review: "Review Case",
    start: "Start Simulation",
    phase: "Phase",
    context: "Scenario Context",
    back: "Back to Dashboard",
    feedbackTitle: "Tutor Feedback",
    feedbackPlaceholder: "Select an option on the left to receive immediate feedback based on the Ontology framework.",
    correct: "Correct Choice",
    incorrect: "Incorrect Choice",
    conceptNote: "Concept Note",
    conceptText: (
      <>
        Remember: <strong>Data</strong> is the Noun (Information), <strong>Logic</strong> is the Reasoning (Model), and <strong>Action</strong> is the Verb (Execution). All three must be connected to create business value.
      </>
    ),
    finish: "Finish Case Study",
    nextStage: "Go to Next Stage",
    retry: "Try Again",
    source: "Source Reference",
    summaryTitle: "Simulation Retrospective",
    summarySub: "You have constructed a Kinetic Workflow. Here is how your choices map to the Ontology architecture.",
    backToDash: "Return to Dashboard"
  },
  NL: {
    title: "Ontology Tutor",
    subtitle: "Management AI",
    navIntro: "Introductie & Theorie",
    navCases: "Case Simulaties",
    progress: "Jouw Voortgang",
    completed: "Voltooid",
    introTag: "Business Management Tutorial",
    introTitle: "Connecting AI to",
    introHighlight: "Business Decisions",
    introSub: "Het 'Ontology' framework voor de moderne onderneming.",
    nextConcept: "Volgend Concept",
    startSim: "Start Simulaties",
    prev: "Vorige",
    casesTitle: "Case Studies",
    casesSub: "Pas het Data-Logic-Action framework toe op realistische bedrijfsproblemen.",
    review: "Review Case",
    start: "Start Simulatie",
    phase: "Fase",
    context: "Scenario Context",
    back: "Terug naar Dashboard",
    feedbackTitle: "Tutor Feedback",
    feedbackPlaceholder: "Selecteer links een optie om direct feedback te ontvangen op basis van het Ontology framework.",
    correct: "Juiste Keuze",
    incorrect: "Onjuiste Keuze",
    conceptNote: "Concept Note",
    conceptText: (
      <>
        Onthoud: <strong>Data</strong> is het zelfstandig naamwoord (Informatie), <strong>Logic</strong> is de redenering (Model), en <strong>Action</strong> is het werkwoord (Uitvoering). Alle drie moeten verbonden zijn om bedrijfswaarde te creëren.
      </>
    ),
    finish: "Rond case study af",
    nextStage: "Ga naar volgende stap",
    retry: "Probeer Opnieuw",
    source: "Bronvermelding",
    summaryTitle: "Simulatie retrospectief",
    summarySub: "Je hebt een Kinetische Workflow gebouwd. Hier zie je hoe jouw keuzes mappen naar de Ontology architectuur.",
    backToDash: "Terug naar Dashboard"
  }
};

// --- CONTENT HELPERS ---

export const getTheorySections = (lang: Language): TheorySection[] => {
  if (lang === 'NL') {
    return [
      {
        id: 'theory-why',
        label: 'WHY',
        title: "De paradigmaverschuiving voor bedrijfskunde",
        content: (
          <div className="space-y-6">
            <p>
              Als toekomstige leiders leren jullie data te analyseren om beslissingen te nemen. In de moderne onderneming zijn 
              <strong> traditionele analytics echter vaak losgekoppeld van de operatie</strong>. Dashboards laten zien wat er gisteren is gebeurd, 
              maar helpen zelden om direct beslissingen uit te voeren of terug te schrijven (write-back) naar de systemen die het bedrijf draaiende houden.
            </p>
            <p>
              Om te winnen in het tijdperk van AI, moet je verder kijken dan "Database management" en je richten op <strong>"Decision-centric architecture."</strong>
              De 'prime directive' van een organisatie is niet alleen het opslaan van data, maar het uitvoeren van de best mogelijke beslissingen,
              vaak onder omstandigheden die continu veranderen.
            </p>
            <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 my-4">
              <h4 className="font-bold text-indigo-900 mb-2">Het kernprobleem:</h4>
              <p className="text-indigo-800 text-sm italic">
                "Conventionele analytics architecturen contextualiseren berekeningen niet binnen de operationele realiteit, en blijven daardoor losgekoppeld van de uitvoering."
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'theory-how',
        label: 'HOW',
        title: "De elementen van een beslissing",
        content: (
          <div className="space-y-6">
            <p>
              Om de oplossing te begrijpen, moeten we een beslissing opbreken in atomaire elementen. 
              De <strong>Ontology</strong> integreert deze drie elementen in een schaalbaar, dynamisch fundament:
            </p>
            
            <DecisionAtoms lang={lang} />
    
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <li className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <strong className="text-blue-600 block mb-2 text-lg">Data (De 'Nouns')</strong> 
                Semantische, real-world objecten (bijv. "Klant", "Fabriek", "Lening") in plaats van enkel rijen in een tabel. Het integreert operationele bronnen (ERP's), IoT en ongestructureerde data.
              </li>
              <li className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <strong className="text-purple-600 block mb-2 text-lg">Logic (De Redenering)</strong>
                De "Tools" die gebruikt worden om beslissingen te evalueren. Dit omvat AI-modellen, simulaties en business rules die direct aan de data verbonden zijn.
              </li>
              <li className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <strong className="text-emerald-600 block mb-2 text-lg">Action (De 'Verbs')</strong>
                De uitvoering. De loop sluiten door beslissingen veilig en beveiligd terug te schrijven naar operationele systemen (Write-back).
              </li>
            </ul>
    
            <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Verbinding met de studie: CRISP-DM</h3>
                <p>
                    Aangezien jullie bekend zijn met het <strong>CRISP-DM</strong> (Cross-Industry Standard Process for Data Mining) model,
                    zie je hieronder hoe het Ontology framework mapt naar de fasen die jullie al kennen. Let op hoe de Ontology <strong>Action</strong> benadrukt als het equivalent van Deployment, wat verzekert dat de cyclus niet stopt bij de Evaluatie.
                </p>
                <CrispDmMapping lang={lang} />
            </div>
          </div>
        )
      },
      {
        id: 'theory-what',
        label: 'WHAT',
        title: "Architectuur & toepassingen",
        content: (
          <div className="space-y-6">
            <p>
              Deze benadering is toepasbaar in elke sector. Het brengt de samenstellende elementen van besluitvorming samen in één enkel softwaresysteem. 
              Nieuwe data wordt snel geïntegreerd, algoritmes worden beschikbaar gemaakt als tools, en acties worden georkestreerd terug naar de kern.
            </p>
            
            <OntologyArchitecture lang={lang} />
    
            <p>
              Of het nu gaat om een <strong>supply chain</strong> manager die reageert op tekorten,
              een <strong>investment banker</strong> die kapitaal alloceert, of een <strong>marketeer</strong> die churn voorkomt, de flow is hetzelfde:
              <span className="font-mono bg-slate-100 px-2 py-1 rounded mx-1 text-slate-700">Sense (Data) {'->'} Reason (Logica) {'->'} Act (Actie)</span>.
            </p>
            <p>
              In de volgende tutorial zul je deze rollen simuleren om te begrijpen hoe AI verbindt met bedrijfswaarde.
            </p>
    
            <div className="mt-12 pt-8 border-t border-slate-200">
               <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Bronvermelding</h4>
               <p className="text-sm text-slate-600">
                 Palantir. (2025, November). <em>Connecting AI to Decisions with the Palantir Ontology</em>. Medium. <a href="https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline break-all">https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72</a>
               </p>
            </div>
          </div>
        )
      }
    ];
  } else {
    // ENGLISH CONTENT
    return [
        {
          id: 'theory-why',
          label: 'WHY',
          title: "The Paradigm Shift for Business Management",
          content: (
            <div className="space-y-6">
              <p>
                As future leaders, you are taught to analyze data to make decisions. However, in the modern enterprise, 
                <strong> traditional analytics are often disconnected from operations</strong>. Dashboards show what happened yesterday 
                but rarely help to immediately execute decisions or write-back to the systems that run the business.
              </p>
              <p>
                To win in the age of AI, you must look beyond "Database Management" and move towards <strong>"Decision-Centric Architecture."</strong>
                The prime directive of an organization is not just to store data, but to execute the best possible decisions, 
                often under conditions that are constantly changing.
              </p>
              <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 my-4">
                <h4 className="font-bold text-indigo-900 mb-2">The Core Problem:</h4>
                <p className="text-indigo-800 text-sm italic">
                  "Conventional analytics architectures do not contextualize computation within lived reality, and therefore remain disconnected from operations."
                </p>
              </div>
            </div>
          )
        },
        {
          id: 'theory-how',
          label: 'HOW',
          title: "The Elements of a Decision",
          content: (
            <div className="space-y-6">
              <p>
                To understand the solution, we must break a decision down into its atomic elements. 
                The <strong>Ontology</strong> integrates these three elements into a scalable, dynamic foundation:
              </p>
              
              <DecisionAtoms lang={lang} />
      
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <li className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <strong className="text-blue-600 block mb-2 text-lg">Data (The 'Nouns')</strong> 
                  Semantic, real-world objects (e.g., "Customer", "Factory", "Loan") instead of just rows in a table. It integrates operational sources (ERPs), IoT, and unstructured data.
                </li>
                <li className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <strong className="text-purple-600 block mb-2 text-lg">Logic (The Reasoning)</strong>
                  The "Tools" used to evaluate decisions. This includes AI models, simulations, and business rules bound directly to the data.
                </li>
                <li className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <strong className="text-emerald-600 block mb-2 text-lg">Action (The 'Verbs')</strong>
                  The execution. Closing the loop by securely writing decisions back to operational systems (Write-back).
                </li>
              </ul>
      
              <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Connection to Curriculum: CRISP-DM</h3>
                  <p>
                      Since you are familiar with the <strong>CRISP-DM</strong> (Cross-Industry Standard Process for Data Mining) model, 
                      see below how the Ontology framework maps to the phases you already know. Note how the Ontology emphasizes 
                      <strong>Action</strong> as the equivalent of Deployment, ensuring the cycle doesn't stop at Evaluation.
                  </p>
                  <CrispDmMapping lang={lang} />
              </div>
            </div>
          )
        },
        {
          id: 'theory-what',
          label: 'WHAT',
          title: "Architecture & Applications",
          content: (
            <div className="space-y-6">
              <p>
                This approach is applicable in every sector. It brings the constituent elements of decision-making together into a single software system. 
                New data is rapidly integrated, algorithms are surfaced as tools, and actions are orchestrated back to the core.
              </p>
              
              <OntologyArchitecture lang={lang} />
      
              <p>
                Whether it is a <strong>supply chain</strong> manager responding to shortages,
                an <strong>investment banker</strong> allocating capital, or a <strong>marketeer</strong> preventing churn, the flow is the same:
                <span className="font-mono bg-slate-100 px-2 py-1 rounded mx-1 text-slate-700">Sense (Data) {'->'} Reason (Logic) {'->'} Act (Action)</span>.
              </p>
              <p>
                In the following tutorial, you will simulate these roles to understand how AI connects to business value.
              </p>
      
              <div className="mt-12 pt-8 border-t border-slate-200">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Reference</h4>
                 <p className="text-sm text-slate-600">
                   Palantir. (2025, November). <em>Connecting AI to Decisions with the Palantir Ontology</em>. Medium. <a href="https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline break-all">https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72</a>
                 </p>
              </div>
            </div>
          )
        }
    ];
  }
};

export const getCaseStudies = (lang: Language): CaseStudy[] => {
  if (lang === 'NL') {
    return [
      {
        id: 'investment-decision',
        title: 'Financiële strategie: kapitaaltoewijzing',
        description: 'Bepaal of er geïnvesteerd moet worden in een volatiele asset class.',
        icon: 'trending-up',
        context: 'Jouw firma wil de bedrijfswaarde maximaliseren. Je staat voor de beslissing om te investeren in een nieuwe asset class die een hoog rendement belooft, maar aanzienlijke volatiliteit met zich meebrengt. Je moet bepalen of deze investering voldoet aan de "hurdle rate" en de trade uitvoeren.',
        summary: 'Je hebt met succes een beslissingsgerichte workflow gebouwd. In plaats van te vertrouwen op statische Excel-sheets en memo\'s, heb je live marktdata verbonden aan een DCF Logic Asset, en onmiddellijke executie mogelijk gemaakt via write-back. Dit vermindert latentie en financieel risico.',
        stages: {
          data: {
            id: 'inv-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Selecteer de kritieke data die nodig is om deze investeringskans te beoordelen.',
            options: [
              {
                id: 'd1',
                label: 'Marktrentes & cashflow historie',
                description: 'Real-time risicovrije rentes, market risk premiums en historische operationele cashflows.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Om waarde te modelleren, heb je semantische objecten nodig die de marktcondities (Rentes) en de operationele realiteit (Cashflows) vertegenwoordigen. Dit vormt de basis voor de "Investment Decision" in financiële theorie.'
              },
              {
                id: 'd2',
                label: 'Voorraad kantoorartikelen',
                description: 'Een complete inventaris van pennen, papier en nietmachines in het hoofdkantoor.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel dit data is, is het irrelevant voor de "Investment Decision". De Ontology focust op relevantie—ruis filteren om objecten aan te wijzen die waarde creëren.'
              },
              {
                id: 'd3',
                label: 'Externe marktanalyserapporten',
                description: 'Uitgebreide PDF-rapporten van zakenbanken die algemene sectortrends van het vorige kwartaal analyseren.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel waardevol voor context, zijn statische PDF\'s ("Data Graves") niet eenvoudig te binden aan logica-modellen voor real-time besluitvorming. Je hebt live, gestructureerde data nodig.'
              },
              {
                id: 'd4',
                label: 'Medewerker tevredenheidsonderzoek',
                description: 'Interne peilingsdata over hoe tevreden medewerkers zijn met het huidige kantine-aanbod.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is valide data voor HR, maar voor een Capital Allocation beslissing introduceert het ruis. De Ontology vereist het selecteren van domein-specifieke data.'
              }
            ]
          },
          logic: {
            id: 'inv-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Welk model helpt de investering te evalueren tegen de hurdle rate?',
            options: [
              {
                id: 'l1',
                label: 'DCF & risico-analyse model',
                description: 'Discounted Cash Flow analyse die corrigeert voor het specifieke risicoprofiel (Bèta) van de nieuwe asset.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Deze logic asset berekent het "drempelrendement" en "Net Present Value (NPV)". In de Ontology wordt dit model behandeld als een "tool" die AI of mensen kunnen aanroepen om te redeneren over de data.'
              },
              {
                id: 'l2',
                label: 'Sentiment analyse',
                description: 'Twitter checken voor algemene gevoelens over de economie.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel sentiment nuttig kan zijn, vereist de financiële kernbeslissing een deterministisch waarderingsmodel (DCF) om te vergelijken met het drempelrendement, niet slechts kwalitatief sentiment.'
              },
              {
                id: 'l3',
                label: 'LLM-gebaseerde markthallucinatie',
                description: 'Een Large Language Model vragen om exacte toekomstige aandelenkoersen te voorspellen op basis van nieuwsheadlines.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een veelvoorkomende valkuil. LLM\'s zijn niet-deterministisch en kunnen hallucineren. Voor financiële hurdles heb je deterministische, wiskundige logica nodig (Logic Assets).'
              },
              {
                id: 'l4',
                label: 'Statische Excel spreadsheet',
                description: 'Een handmatige draaitabel die de kosten van vorig jaar aggregeert, maar geen live marktrentes kan inladen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Een handmatige Excel-sheet is losgekoppeld en retrospectief (terugkijkend). Het biedt niet de verbonden, vooruitkijkende modellering die nodig is voor deze beslissing.'
              }
            ]
          },
          action: {
            id: 'inv-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Het model geeft een positieve NPV aan. Wat is de operationele actie?',
            options: [
              {
                id: 'a1',
                label: 'Allocatie & hedging uitvoeren',
                description: 'Activeer de overboeking van kapitaal en voer gelijktijdig hedging-contracten uit voor de risico-exposure.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is de "Action" die de loop sluit. Het is niet genoeg om te weten dat de NPV positief is; het systeem moet veilig terugschrijven naar de transactionele systemen om het geld te verplaatsen en het risico te hedgen.'
              },
              {
                id: 'a2',
                label: 'Investeringsmemo opstellen',
                description: 'Verzamel de positieve bevindingen in een formeel document voor de wekelijkse vergadering van het investeringscomité.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit creëert vertraging. Het doel van de Ontology is om onmiddellijke, systeem-gestuurde executie mogelijk te maken. Een memo schrijven is een administratieve taak, geen systeemactie.'
              },
              {
                id: 'a3',
                label: 'De dashboard kleur updaten',
                description: 'Verander de projectstatus van Rood naar Groen op het scherm.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Een pixel op een scherm veranderen is passief. Een echte "Action" moet propageren naar de onderliggende systemen (zoals het Grootboek of Trading Systeem) om bedrijfsimpact te hebben.'
              },
              {
                id: 'a4',
                label: 'Een blogpost schrijven',
                description: 'Kondig het idee aan op de bedrijfsblog.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is communicatie, geen operationele executie. De "Action" in de Ontology verwijst naar het veranderen van de status van bedrijfssystemen (bijv. de transactie uitvoeren).'
              }
            ]
          }
        }
      },
      {
        id: 'customer-journey',
        title: 'Marketing: klantbehoud',
        description: 'Voorkom churn door gepersonaliseerde incentives aan te bieden aan hoogwaardige klanten.',
        icon: 'cart',
        context: 'Je bent de CMO van een retailbank. Je hebt een piek in klantverloop (churn) opgemerkt. Je moet risicovolle, hoogwaardige klanten identificeren en onmiddellijk interveniëren voordat ze hun rekeningen sluiten.',
        summary: 'Je hebt een proactieve retentie-engine gebouwd. Door gefragmenteerde klantdata te integreren, voorspellende AI toe te passen, en de actie te automatiseren via de CRM, ben je overgestapt van passieve rapportage naar real-time klantbehoud.',
        stages: {
          data: {
            id: 'cust-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten definiëren de "Customer 360" view die hier nodig is?',
            options: [
              {
                id: 'cd1',
                label: 'Live transactie feeds & support tickets',
                description: 'Real-time uitgavenpatronen, recente klachten en gebruikslogs geïntegreerd in een "Customer" object.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Om een klant te begrijpen, heb je een volledige semantische representatie nodig: hun transacties (ERP), hun klachten (CRM/Service) en hun gebruik. Dit geïntegreerde beeld is het "Klant Object".'
              },
              {
                id: 'cd2',
                label: 'Gekochte externe demografische data',
                description: 'Een grote externe dataset met algemene inkomensschalen en postcode-demografie voor de hele regio.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is generieke geaggregeerde data. Om actie te ondernemen op specifieke klanten, heb je granulaire, instantie-niveau data nodig over *jouw* klanten, niet slechts regionale gemiddelden.'
              },
              {
                id: 'cd3',
                label: 'Marketing nieuwsbrief e-maillijst',
                description: 'Een losstaand CSV-bestand met e-mailadressen gebruikt voor de wekelijkse nieuwsbrief.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Een e-maillijst mist context. Het vertelt je niet *waarom* ze vertrekken of *hoeveel* ze waard zijn. Het is een gegevenssilo, geen semantisch object.'
              },
              {
                id: 'cd4',
                label: 'Social media sentiment scraper',
                description: 'Zoeken naar iedereen die het woord "Bank" heeft getweet in het afgelopen uur.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel potentieel interessant, is dit ongestructureerde ruis. Zonder het te koppelen aan specifieke klantaccounts, kun je geen operationele actie ondernemen om ze te behouden.'
              }
            ]
          },
          logic: {
            id: 'cust-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe bepalen we wie op het punt staat te vertrekken?',
            options: [
              {
                id: 'cl1',
                label: 'Churn probability model',
                description: 'Een machine learning model dat elke klant scoort (0-100%) op hun waarschijnlijkheid om binnen 30 dagen te vertrekken.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Deze "Logic" asset neemt de klantdata en output een waarschijnlijkheid. Het vult menselijke redenering aan door risico\'s naar boven te halen die niet zichtbaar zijn voor het blote oog.'
              },
              {
                id: 'cl2',
                label: 'Alfabetisch sorteren',
                description: 'De klantenlijst sorteren op achternaam om vertrekkers te vinden.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Sorteren is een basisfunctie, geen redenering. De naam van een klant heeft geen correlatie met hun waarschijnlijkheid om de bank te verlaten.'
              },
              {
                id: 'cl3',
                label: 'Excel-heuristieken',
                description: 'Data exporteren naar Excel om te filteren op klanten die 90 dagen niet hebben ingelogd en deze handmatig markeren.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is niet schaalbaar. Een mens kan niet handmatig duizenden variabelen over miljoenen transacties verwerken. Het is ook een "snapshot" die direct verouderd is.'
              },
              {
                id: 'cl4',
                label: 'Generieke chatbot vraag',
                description: 'Een standaard chatbot vragen "Waarom verlaten mensen banken?" om een lijst met redenen te krijgen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit biedt algemene kennis, geen specifieke bedrijfslogica toegepast op jouw daadwerkelijke klantdata. Het kan niet identificeren *welke* specifieke klanten risico lopen.'
              }
            ]
          },
          action: {
            id: 'cust-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Hoog-risico klanten zijn geïdentificeerd. Hoe automatiseren we de oplossing?',
            options: [
              {
                id: 'ca1',
                label: 'Injecteer dynamisch aanbod in CRM',
                description: 'Activeer automatisch een gepersonaliseerd retentie-aanbod (bijv. kwijtschelding kosten) in de app van de klant en waarschuw hun relatiemanager.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is de "Action". Het schrijft terug naar de App (Klant interface) en de CRM (Werknemer interface), wat zorgt dat de beslissing direct enterprise-breed wordt uitgevoerd.'
              },
              {
                id: 'ca2',
                label: 'Dashboard status updaten',
                description: 'Update het executive churn dashboard om het hoog-risico segment weer te geven voor de maandagochtend standup.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Rapportage is passief. Tegen de tijd dat de vergadering plaatsvindt, zijn de klanten al vertrokken. De Ontology vereist real-time operationele actie.'
              },
              {
                id: 'ca3',
                label: 'Stuur een generieke "We missen je" e-mail',
                description: 'Stuur hetzelfde e-mail template naar elke klant in de database.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een "schot hagel" tactiek. Het is geen intelligente actie afgeleid van het specifieke logic model, en negeert de context waarom de klant ontevreden is.'
              },
              {
                id: 'ca4',
                label: 'Vlaggen voor maandelijkse review',
                description: 'Voeg een kolom toe in een spreadsheet voor analisten om later naar te kijken.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is het uitstellen van actie. In een high-churn omgeving is vertraging de vijand. De actie moet plaatsvinden wanneer het risico gedetecteerd wordt, niet een maand later.'
              }
            ]
          }
        }
      },
      {
        id: 'titan-industries',
        title: 'Supply chain: crisisbestrijding',
        description: 'Beheer een plotseling grondstoffentekort voor chirurgische maskers.',
        icon: 'factory',
        context: `Titan Industries wordt geconfronteerd met een verstoring bij een grote leverancier voor grondstoffen die nodig zijn voor chirurgische maskers. De vraag escaleert. Je moet de Enterprise Ontology gebruiken om dit op te lossen zonder andere productielijnen te breken.`,
        summary: 'Je hebt een veerkrachtige supply chain gedemonstreerd. Door operationele data samen te brengen, scenario\'s te simuleren en direct terug te schrijven naar het ERP, heb je een crisis opgelost zonder menselijke latentie of foutgevoelige communicatie.',
        stages: {
          data: {
            id: 'titan-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke databronnen moeten we integreren om de volledige scope van deze verstoring te begrijpen?',
            options: [
              {
                id: 'd1',
                label: 'Live ERP & supplier feeds',
                description: 'Real-time integratie van voorraad, leveranciersstatus en openstaande klantorders.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. De Ontology integreert deze operationele bronnen (ERP, WMS) in semantische objecten. Hiermee zie je het "Materiaal", de "Leverancier" en de "Klantorder" als verbonden entiteiten in real-time.'
              },
              {
                id: 'd2',
                label: 'Geaggregeerde supply chain CSV\'s',
                description: 'Een compilatie van voorraad-spreadsheets van vorige week, gemaild door verschillende regionale magazijnmanagers.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Spreadsheets zijn "Data Graves". Ze reflecteren niet de huidige realiteit van de verstoring en kunnen niet gebruikt worden voor real-time besluitvorming of write-back.'
              },
              {
                id: 'd3',
                label: 'Satellietbeelden van parkeerplaatsen',
                description: 'Beelden die tonen hoeveel auto\'s er geparkeerd staan bij de fabriek.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel soms nuttig voor macro-trends, is deze data te abstract om een specifiek grondstoffentekort voor een specifieke productielijn op te lossen.'
              },
              {
                id: 'd4',
                label: 'Persberichten van concurrenten',
                description: 'Lezen wat andere bedrijven zeggen over hun supply chains.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is externe ruis. Je hebt interne operationele zichtbaarheid nodig (voorraadniveaus, productieschema\'s) om jouw specifieke tekort op te lossen.'
              }
            ]
          },
          logic: {
            id: 'titan-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Welke AI/Logic modellen moeten we aan deze data binden om een oplossing te vinden?',
            options: [
              {
                id: 'l1',
                label: 'Materiaalherverdeling simulatie',
                description: 'Een algoritme dat tradeoffs tussen verschillende productielijnen simuleert om omzet te optimaliseren.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit is een "Simulation Engine" behandeld als een Logic asset. Het stelt je in staat om "What-If" scenario\'s te verkennen (bijv. "Wat als we materialen van de spuiten-lijn halen?") voordat je een beslissing neemt.'
              },
              {
                id: 'l2',
                label: 'Spam detectie filter',
                description: 'Een standaard ML-model gebruikt om e-mails van leveranciers te filteren.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel dit "AI" is, is het geen relevante business logic voor het oplossen van een supply chain allocatiecrisis.'
              },
              {
                id: 'l3',
                label: 'Simpele optelsom formule',
                description: 'Het totaal aantal ontbrekende maskers optellen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Alleen het totale tekort weten is niet genoeg. Je hebt logica nodig die je helpt het probleem *op te lossen* door tradeoffs en herverdelingsopties te berekenen.'
              },
              {
                id: 'l4',
                label: 'Generatief incidentrapport',
                description: 'Een LLM gebruiken om een overtuigend verhaal te schrijven dat het tekort uitlegt aan stakeholders.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Generatieve AI voor creatief schrijven helpt niet bij de harde randvoorwaarden van supply chain optimalisatie (volume, tijd, kosten). Het legt het probleem alleen mooi uit.'
              }
            ]
          },
          action: {
            id: 'titan-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Zodra de AI een reallocatieplan voorstelt, hoe sluiten we de loop?',
            options: [
              {
                id: 'a1',
                label: 'Write-back naar ERP & planning',
                description: 'Update automatisch het Warehouse Management System en de productieschema\'s met het nieuwe plan.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit sluit effectief de loop. De beslissing genomen in de analyselaag wordt teruggeschreven naar de fysieke systemen (Warehouse/ERP) die de fabriek draaien, wat verzekert dat het plan daadwerkelijk wordt uitgevoerd.'
              },
              {
                id: 'a2',
                label: 'Genereer een CSV rapport',
                description: 'Download een spreadsheet en e-mail deze naar de vloermanager van de fabriek.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. CSV\'s en e-mails zijn "Digital Exhaust". Ze verbreken de chain of custody. Als de manager de e-mail mist, faalt de actie. Systemen moeten met systemen praten.'
              },
              {
                id: 'a3',
                label: 'Plak een post-it',
                description: 'Plak een fysiek briefje op de magazijndeur.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is volledig losgekoppeld van de digitale onderneming. Het creëert een enorm gat tussen de beslissing in de software en de realiteit op de vloer.'
              },
              {
                id: 'a4',
                label: 'E-mail instructies naar plant manager',
                description: 'Stuur een prioriteitsmail met details over het reallocatieplan naar de vloermanager voor handmatige uitvoering.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit introduceert vertraging en menselijke fouten. In een crisis kun je niet wachten tot een e-mail gelezen wordt. De Ontology stelt business users in staat om goedgekeurde acties direct uit te voeren.'
              }
            ]
          }
        }
      },
      {
        id: 'employee-journey',
        title: 'HR: talentbehoud',
        description: 'Identificeer en behoud toptalent dat risico loopt te vertrekken.',
        icon: 'users',
        context: 'Jouw techbedrijf verliest top-engineers aan concurrenten. Je moet identificeren wie ontevreden is en interveniëren voordat ze ontslag nemen. Je moet privacy respecteren maar wel proactief zijn.',
        summary: 'Je hebt HR getransformeerd van administratie naar strategisch talent management. Door prestatie- en sentimentdata te verbinden (Data), voorspellende modellen te gebruiken (Logic), en managers direct te empoweren (Action), heb je toptalent behouden voordat ze de deur uit liepen.',
        stages: {
          data: {
            id: 'emp-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Wat creëert een holistisch "Employee" object?',
            options: [
              {
                id: 'ed1',
                label: 'HRIS, performance & sentiment data',
                description: 'Integratie van dienstjaren, recente prestatiebeoordelingen, beloningshistorie en geanonimiseerde sentiment-surveys.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Een "Employee" in de Ontology is niet slechts een payroll ID. Het is een uitgebreid object dat hun historie, prestaties en sentiment bevat, opgehaald uit gefragmenteerde HR-systemen.'
              },
              {
                id: 'ed2',
                label: 'Externe salaris benchmarks',
                description: 'Een gekochte dataset die generieke functietitels en salarisschalen vergelijkt over de hele tech-industrie.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel externe data nuttig is, kun je geen interne managementbeslissingen nemen zonder de interne context (Prestaties, Compensatie) die je daadwerkelijk beheerst.'
              },
              {
                id: 'ed3',
                label: 'Keycard toegangslogs',
                description: 'Precies bijhouden wanneer mensen naar het toilet gaan.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is invasieve surveillance data. Het vernietigt vertrouwen en correleert niet noodzakelijk met de *waarde* van de medewerker, enkel hun fysieke aanwezigheid.'
              },
              {
                id: 'ed4',
                label: 'Recruitment e-maillijst',
                description: 'Een lijst met kandidaten die solliciteren naar banen.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is data over *potentiële* werknemers, niet je *huidige* talent. Kandidaten analyseren helpt je niet de engineers te behouden die je al hebt.'
              }
            ]
          },
          logic: {
            id: 'emp-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe identificeren we het risico op uitstroom (attrition)?',
            options: [
              {
                id: 'el1',
                label: 'Attrition risk model',
                description: 'Een ML-model dat het traject van een medewerker vergelijkt met historische patronen van mensen die vertrokken zijn.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit multivariaat model berekent een risicoscore. Het kan niet-voor de hand liggende patronen vinden, zoals "Engineers die 18 maanden geen verhoging hebben gehad en een promotie gemist hebben, hebben 80% kans om te vertrekken."'
              },
              {
                id: 'el2',
                label: 'Willekeurige selectie',
                description: 'Kies willekeurig 5 medewerkers om te interviewen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is inefficiënt en onwetenschappelijk. De Ontology gebruikt Logic om menselijke aandacht te prioriteren waar het het meest nodig is.'
              },
              {
                id: 'el3',
                label: 'Zoekwoord "Ontslag"',
                description: 'Werknemerse-mails scannen op het woord "stoppen".',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is reactief (te laat) en waarschijnlijk een privacy-schending. Je wilt voorspellende logica die risico identificeert *voordat* de beslissing om te stoppen is genomen.'
              },
              {
                id: 'el4',
                label: 'Performance bell curve analyse',
                description: 'Alle medewerkers strikt groeperen op hun laatste beoordeling om de onderste 10% te identificeren.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een te simplistische heuristiek. Het negeert high-performers die ongelukkig zijn en low-performers die blijven. Je hebt een multivariaat model nodig.'
              }
            ]
          },
          action: {
            id: 'emp-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Je hebt een top-engineer met hoog risico gevonden. Wat is de actie?',
            options: [
              {
                id: 'ea1',
                label: 'Manager alert & upskilling aanbod',
                description: 'Waarschuw de directe leidinggevende met een retentie-playbook en keur automatisch budget goed voor een gevorderde training.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is een "System of Action". Het stelt de manager in staat met data (het playbook) en verwijdert frictie (auto-goedgekeurd budget) om het probleem direct op te lossen.'
              },
              {
                id: 'ea2',
                label: 'Database veld updaten',
                description: 'Verander de werknemersstatus van "Actief" naar "In Risico" in de database.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Een tag updaten is slechts data-invoer. Het is geen *uitkomst*. Er wordt geen waarde gecreëerd totdat een interventie plaatsvindt in de echte wereld.'
              },
              {
                id: 'ea3',
                label: 'Plan HR exit interview',
                description: 'Plan preventief een gesprek om hun potentiële redenen voor vertrek te bespreken als ze besluiten ontslag te nemen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is passief management. Als de medewerker nu risico loopt, wil je ze *behouden*, niet interviewen op weg naar de uitgang.'
              },
              {
                id: 'ea4',
                label: 'Keycard toegang blokkeren',
                description: 'Sluit ze preventief buiten het gebouw.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een vijandige actie gebaseerd op een waarschijnlijkheid. De Ontology helpt mensen *in staat te stellen* betere beslissingen te nemen, niet schadelijke acties te automatiseren zonder review.'
              }
            ]
          }
        }
      },
      {
        id: 'dupont-analysis',
        title: 'Financiën: kinetische DuPont-analyse',
        description: 'Operationaliseer ROE door "Luie Activa" real-time te identificeren en te activeren.',
        icon: 'trending-up',
        context: 'Je bent een financieel analist die de Return on Equity (ROE) moet verbeteren. Uit traditionele analyse blijkt dat de omloopsnelheid van activa (Asset Turnover) de prestaties drukt. Je moet overstappen van het rapporteren van deze vertraging naar het actief oplossen ervan door onderbenutte activa ("Lazy Assets") te identificeren en om te zetten in geld.',
        summary: 'Je hebt met succes de "Asset Turnover" component van DuPont geoperationaliseerd. Door live IoT data te gebruiken (Data) en een "Lazy Asset" detectieregel toe te passen (Logic), kon je direct interveniëren met onderhouds- en verkoopworkflows (Action), wat de ROE verbetert zonder op de maandafsluiting te wachten.',
        stages: {
          data: {
            id: 'dupont-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten heb je nodig om kapitaal te detecteren dat vastzit in onproductieve activa?',
            options: [
              {
                id: 'dd1',
                label: 'Live asset objecten & gebruikslogs',
                description: 'Real-time koppeling tussen specifieke machines, hun uptime status en de ouderdom van voorraad SKU\'s.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Om Asset Turnover te verbeteren, moet je weten *welke* specifieke activa stilstaan. Live objecten met telemetrie (IoT) geven dit inzicht, in tegenstelling tot statische boekhoudkundige afschrijvingen.'
              },
              {
                id: 'dd2',
                label: 'Kwartaalbalans PDF',
                description: 'Een statisch exportbestand uit het ERP met boekwaardes en geaccumuleerde afschrijvingen van de vorige periode.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een "Data Grave". Het vertelt je de boekhoudkundige waarde van vorige maand, maar niet of een machine *nu* stilstaat of dat voorraad aan het verstoffen is.'
              },
              {
                id: 'dd3',
                label: 'Aandelenkoersen van concurrenten',
                description: 'Externe marktdata over de beursprestaties van rivalen.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is externe ruis. Hoewel interessant voor benchmarking, helpt het je niet om operationele inefficiënties binnen je eigen fabrieksmuren op te lossen.'
              },
              {
                id: 'dd4',
                label: 'Grootboekmutaties',
                description: 'Een lijst met debet- en creditboekingen van het afgelopen jaar.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Financiële boekingen zijn abstracties. Ze missen de operationele context (bijv. "machine is kapot") die nodig is om de onderliggende oorzaak van lage asset turnover aan te pakken.'
              }
            ]
          },
          logic: {
            id: 'dupont-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe identificeren we systematisch de "Luie Activa"?',
            options: [
              {
                id: 'dl1',
                label: '"Lazy Asset" detectie monitor',
                description: 'Een deterministische regelengine die continu scant en activa vlaggt met <40% benutting of voorraad >90 dagen oud.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit is operationele logica. Het vertaalt een financieel doel (Asset Turnover) naar een fysieke realiteit (Machine uptime / Voorraad leeftijd) en identificeert automatisch waar actie nodig is.'
              },
              {
                id: 'dl2',
                label: 'Generatieve asset beschrijving',
                description: 'Een LLM gebruiken om creatieve verkoopteksten te schrijven voor machines zonder gebruiksdata te analyseren.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een verkeerde toepassing van AI. Je hebt analytische logica nodig om inefficiëntie te *vinden*, niet generatieve logica om iets te *beschrijven* dat je nog niet hebt geïdentificeerd.'
              },
              {
                id: 'dl3',
                label: 'DuPont decompositie spreadsheet',
                description: 'Een handmatig model dat ROE opsplitst in drie delen met behulp van geaggregeerde cijfers van vorige maand.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit is diagnostisch (wat ging er mis?) maar niet prescriptief (wat doen we nu?). Het is te statisch en geaggregeerd om specifieke "Lazy Assets" te vinden.'
              },
              {
                id: 'dl4',
                label: 'Herberekening afschrijvingen',
                description: 'De standaard boekhoudformule opnieuw draaien om de boekwaarde aan te passen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit verandert alleen de rapportage, niet de operatie. Het doel is om de activa productiever te maken of te verkopen, niet om hun boekwaarde op papier te veranderen.'
              }
            ]
          },
          action: {
            id: 'dupont-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'We hebben stagnerende voorraad gevonden. Hoe zetten we dit direct om in geld?',
            options: [
              {
                id: 'da1',
                label: 'Activeer "Clearance" & onderhoudsworkflows',
                description: 'Start automatisch een uitverkoopcampagne in het e-commerce systeem voor oude voorraad en maak tickets aan voor kapotte machines.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is kinetische finance. Het systeem detecteert een financieel probleem en triggert een operationele oplossing (Verkoop/Reparatie) via write-back naar de relevante systemen.'
              },
              {
                id: 'da2',
                label: 'Update het grootboek',
                description: 'Boek een afwaardering van de voorraad om het verlies in de boeken te reflecteren.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is passieve boekhouding. Het erkent het verlies, maar probeert geen geld terug te winnen of de asset turnover te verbeteren.'
              },
              {
                id: 'da3',
                label: 'Genereer een "Asset Utilization" PDF',
                description: 'Maak een mooie grafiek van de inefficiëntie voor de bestuursvergadering van volgende maand.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Rapportage is geen actie. Tegen de tijd dat het bestuur de PDF ziet, is de voorraad nog minder waard geworden. Kinetische finance vereist directe interventie.'
              },
              {
                id: 'da4',
                label: 'E-mail de plant managers',
                description: 'Stuur een bulk e-mail met de vraag of managers willen kijken waarom hun assets niet efficiënt worden gebruikt.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is traag en onbetrouwbaar. Het legt de last bij de mens om data te zoeken en actie te ondernemen, in plaats van dat het systeem de oplossing (bijv. een onderhoudsticket) aandraagt.'
              }
            ]
          }
        }
      }
    ];
  } else {
    // ENGLISH CASE STUDIES
    return [
      {
        id: 'investment-decision',
        title: 'Financial Strategy: Capital Allocation',
        description: 'Decide whether to invest in a volatile asset class.',
        icon: 'trending-up',
        context: 'Your firm wants to maximize business value. You face a decision to invest in a new asset class that promises high returns but carries significant volatility. You must determine if this investment meets the "hurdle rate" and execute the trade.',
        summary: 'You have successfully built a decision-centric workflow. Instead of relying on static Excel sheets (Data Graves) and disconnected memos, you connected live Market Data directly to a DCF Logic Asset, and enabled immediate Execution via write-back. This reduces latency and risk.',
        stages: {
          data: {
            id: 'inv-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Select the critical data needed to assess this investment opportunity.',
            options: [
              {
                id: 'd1',
                label: 'Market Rates & Cashflow History',
                description: 'Real-time risk-free rates, market risk premiums, and historical operational cashflows.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. To model value, you need semantic objects representing market conditions (Rates) and operational reality (Cashflows). This forms the basis for the "Investment Decision" in finance theory.'
              },
              {
                id: 'd2',
                label: 'Office Supply Inventory',
                description: 'A complete inventory of pens, paper, and staplers in the headquarters.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While this is data, it is irrelevant to the "Investment Decision". The Ontology focuses on relevance—filtering noise to focus on objects that drive value.'
              },
              {
                id: 'd3',
                label: 'External Market Analyst Reports',
                description: 'Comprehensive PDF reports from investment banks analyzing general sector trends from the last quarter.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While valuable for context, static PDFs ("Data Graves") are not easily bound to logic models for real-time decision making. You need live, structured data.'
              },
              {
                id: 'd4',
                label: 'Employee Satisfaction Survey',
                description: 'Internal polling data on how satisfied employees are with current cafeteria offerings.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is valid data for HR, but for a Capital Allocation decision, it introduces noise. The Ontology requires selecting domain-specific data.'
              }
            ]
          },
          logic: {
            id: 'inv-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'Which model helps evaluate the investment against the hurdle rate?',
            options: [
              {
                id: 'l1',
                label: 'DCF & Risk Analysis Model',
                description: 'Discounted Cash Flow analysis adjusting for the specific risk profile (Beta) of the new asset.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This logic asset calculates the "Hurdle Rate" and "Net Present Value (NPV)". In the Ontology, this model is treated as a "tool" that AI or humans can call upon to reason about the data.'
              },
              {
                id: 'l2',
                label: 'Sentiment Analysis',
                description: 'Checking Twitter for general feelings about the economy.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. While sentiment can be useful, the core financial decision requires a deterministic valuation model (DCF) to compare against the hurdle rate, not just qualitative sentiment.'
              },
              {
                id: 'l3',
                label: 'LLM-based Market Hallucination',
                description: 'Asking a Large Language Model to predict exact future stock prices based on news headlines.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is a common pitfall. LLMs are non-deterministic and can hallucinate. For financial hurdles, you need deterministic, mathematical logic (Logic Assets).'
              },
              {
                id: 'l4',
                label: 'Static Excel Spreadsheet',
                description: 'A manual pivot table aggregating last year\'s costs, unable to ingest live market rates.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. A manual Excel sheet is disconnected and retrospective (looking back). It does not provide the connected, forward-looking modeling needed for this decision.'
              }
            ]
          },
          action: {
            id: 'inv-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'The model indicates a positive NPV. What is the operational action?',
            options: [
              {
                id: 'a1',
                label: 'Execute Allocation & Hedging',
                description: 'Trigger the transfer of capital and simultaneously execute hedging contracts for the risk exposure.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is the "Action" that closes the loop. It is not enough to know the NPV is positive; the system must safely write back to transactional systems to move the money and hedge the risk.'
              },
              {
                id: 'a2',
                label: 'Draft Investment Memo',
                description: 'Compile the positive findings into a formal document for the weekly investment committee meeting.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This creates latency. The goal of the Ontology is to enable immediate, system-driven execution. Writing a memo is an administrative task, not a system action.'
              },
              {
                id: 'a3',
                label: 'Update Dashboard Color',
                description: 'Change the project status from Red to Green on the screen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Changing a pixel on a screen is passive. A true "Action" must propagate to underlying systems (like the General Ledger or Trading System) to have business impact.'
              },
              {
                id: 'a4',
                label: 'Write a Blog Post',
                description: 'Announce the idea on the company blog.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is communication, not operational execution. "Action" in the Ontology refers to changing the state of business systems (e.g., executing the trade).'
              }
            ]
          }
        }
      },
      {
        id: 'customer-journey',
        title: 'Marketing: Customer Retention',
        description: 'Prevent churn by offering personalized incentives to high-value customers.',
        icon: 'cart',
        context: 'You are the CMO of a retail bank. You have noticed a spike in customer churn. You need to identify at-risk, high-value customers and intervene immediately before they close their accounts.',
        summary: 'You have built a proactive retention engine. By integrating fragmented customer data (Data), applying predictive AI (Logic), and automating the intervention via the CRM (Action), you shifted from passive reporting to real-time customer retention.',
        stages: {
          data: {
            id: 'cust-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects define the "Customer 360" view needed here?',
            options: [
              {
                id: 'cd1',
                label: 'Live Transaction Feeds & Support Tickets',
                description: 'Real-time spending patterns, recent complaints, and usage logs integrated into a "Customer" object.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. To understand a customer, you need a full semantic representation: their transactions (ERP), their complaints (CRM/Service), and their usage. This integrated view is the "Customer Object".'
              },
              {
                id: 'cd2',
                label: 'Purchased External Demographic Data',
                description: 'A large external dataset with general income brackets and zip code demographics for the entire region.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is generic aggregated data. To take action on specific customers, you need granular, instance-level data about *your* customers, not just regional averages.'
              },
              {
                id: 'cd3',
                label: 'Marketing Newsletter Email List',
                description: 'A standalone CSV file containing email addresses used for the weekly newsletter.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. An email list lacks context. It doesn\'t tell you *why* they are leaving or *how much* they are worth. It is a data silo, not a semantic object.'
              },
              {
                id: 'cd4',
                label: 'Social Media Sentiment Scraper',
                description: 'Searching for anyone who tweeted the word "Bank" in the last hour.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While potentially interesting, this is unstructured noise. Without linking it to specific customer accounts, you cannot take operational action to retain them.'
              }
            ]
          },
          logic: {
            id: 'cust-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we determine who is about to leave?',
            options: [
              {
                id: 'cl1',
                label: 'Churn Probability Model',
                description: 'A machine learning model scoring every customer (0-100%) on their likelihood to leave within 30 days.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This "Logic" asset takes the customer data and outputs a probability. It augments human reasoning by surfacing risks not visible to the naked eye.'
              },
              {
                id: 'cl2',
                label: 'Alphabetical Sorting',
                description: 'Sorting the customer list by last name to find leavers.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Sorting is a basic function, not reasoning. A customer\'s name has no correlation with their likelihood to leave the bank.'
              },
              {
                id: 'cl3',
                label: 'Excel Heuristics',
                description: 'Exporting data to Excel to filter for customers who haven\'t logged in for 90 days and highlighting them manually.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is not scalable. A human cannot manually process thousands of variables across millions of transactions. It is also a "snapshot" that is instantly stale.'
              },
              {
                id: 'cl4',
                label: 'Generic Chatbot Query',
                description: 'Asking a standard chatbot "Why do people leave banks?" to get a list of reasons.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This provides general knowledge, not specific business logic applied to your actual customer data. It cannot identify *which* specific customers are at risk.'
              }
            ]
          },
          action: {
            id: 'cust-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'High-risk customers are identified. How do we automate the solution?',
            options: [
              {
                id: 'ca1',
                label: 'Inject Dynamic Offer into CRM',
                description: 'Automatically trigger a personalized retention offer (e.g., fee waiver) in the customer\'s app and alert their relationship manager.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is the "Action". It writes back to the App (Customer interface) and the CRM (Employee interface), ensuring the decision is executed enterprise-wide immediately.'
              },
              {
                id: 'ca2',
                label: 'Update Dashboard Status',
                description: 'Update the executive churn dashboard to show the high-risk segment for the Monday morning standup.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Reporting is passive. By the time the meeting happens, the customers have left. The Ontology requires real-time operational action.'
              },
              {
                id: 'ca3',
                label: 'Send Generic "We Miss You" Email',
                description: 'Blast the same email template to every customer in the database.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is a "spray and pray" tactic. It is not intelligent action derived from the specific logic model, and ignores the context of why the customer is unhappy.'
              },
              {
                id: 'ca4',
                label: 'Flag for Monthly Review',
                description: 'Add a column in a spreadsheet for analysts to look at later.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is deferring action. In a high-churn environment, latency is the enemy. The action needs to happen when the risk is detected, not a month later.'
              }
            ]
          }
        }
      },
      {
        id: 'titan-industries',
        title: 'Supply Chain: Crisis Response',
        description: 'Manage a sudden raw material shortage for surgical masks.',
        icon: 'factory',
        context: `Titan Industries faces a disruption at a major supplier for raw materials needed for surgical masks. Demand is escalating. You must use the Enterprise Ontology to resolve this without breaking other production lines.`,
        summary: 'You have demonstrated a resilient supply chain. By bringing operational data together, simulating allocation scenarios, and writing back to the ERP instantly, you solved a crisis without human latency or error-prone manual communication.',
        stages: {
          data: {
            id: 'titan-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data sources must we integrate to understand the full scope of this disruption?',
            options: [
              {
                id: 'd1',
                label: 'Live ERP & Supplier Feeds',
                description: 'Real-time integration of inventory, supplier status, and outstanding customer orders.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. The Ontology integrates these operational sources (ERP, WMS) into semantic objects. This lets you see the "Material", the "Supplier", and the "Customer Order" as connected entities in real-time.'
              },
              {
                id: 'd2',
                label: 'Aggregated Supply Chain CSVs',
                description: 'A compilation of inventory spreadsheets from last week emailed by various regional warehouse managers.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Spreadsheets are "Data Graves". They do not reflect the current reality of the disruption and cannot be used for real-time decision making or write-back.'
              },
              {
                id: 'd3',
                label: 'Satellite Imagery of Parking Lots',
                description: 'Images showing how many cars are parked at the manufacturing plant.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While sometimes useful for macro trends, this data is too abstract to resolve a specific raw material shortage for a specific production line.'
              },
              {
                id: 'd4',
                label: 'Competitor Press Releases',
                description: 'Reading what other companies are saying about their supply chains.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is external noise. You need internal operational visibility (inventory levels, production schedules) to fix your specific shortage.'
              }
            ]
          },
          logic: {
            id: 'titan-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'Which AI/Logic models should we bind to this data to find a solution?',
            options: [
              {
                id: 'l1',
                label: 'Material Reallocation Simulation',
                description: 'An algorithm that simulates tradeoffs between different production lines to optimize revenue.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This is a "Simulation Engine" treated as a Logic asset. It allows you to explore "What-If" scenarios (e.g., "What if we take materials from the syringe line?") before making a decision.'
              },
              {
                id: 'l2',
                label: 'Spam Detection Filter',
                description: 'A standard ML model used to filter supplier emails.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. While this is "AI", it is not relevant business logic for solving a supply chain allocation crisis.'
              },
              {
                id: 'l3',
                label: 'Simple Summation Formula',
                description: 'Adding up the total number of missing masks.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Knowing the total shortage isn\'t enough. You need logic that helps you *solve* the problem by calculating tradeoffs and reallocation options.'
              },
              {
                id: 'l4',
                label: 'Generative Incident Report',
                description: 'Using an LLM to write a convincing story explaining the shortage to stakeholders.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Generative AI for creative writing helps explain the problem but doesn\'t solve the hard constraints of supply chain optimization (volume, time, cost).'
              }
            ]
          },
          action: {
            id: 'titan-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'Once the AI proposes a reallocation plan, how do we close the loop?',
            options: [
              {
                id: 'a1',
                label: 'Write-back to ERP & Planning',
                description: 'Automatically update the Warehouse Management System and production schedules with the new plan.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This effectively closes the loop. The decision made in the analysis layer is written back to the physical systems (Warehouse/ERP) that run the factory, ensuring the plan is actually executed.'
              },
              {
                id: 'a2',
                label: 'Generate a CSV Report',
                description: 'Download a spreadsheet and email it to the factory floor manager.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. CSVs and emails are "Digital Exhaust". They break the chain of custody. If the manager misses the email, the action fails. Systems must talk to systems.'
              },
              {
                id: 'a3',
                label: 'Post a Sticky Note',
                description: 'Stick a physical note on the warehouse door.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is completely disconnected from the digital enterprise. It creates a massive gap between the decision in software and reality on the floor.'
              },
              {
                id: 'a4',
                label: 'Email Instructions to Plant Manager',
                description: 'Send a priority email detailing the reallocation plan to the floor manager for manual execution.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This introduces latency and human error. In a crisis, you cannot wait for an email to be read. The Ontology enables business users to execute approved actions directly.'
              }
            ]
          }
        }
      },
      {
        id: 'employee-journey',
        title: 'HR: Talent Retention',
        description: 'Identify and retain top talent at risk of leaving.',
        icon: 'users',
        context: 'Your tech company is losing top engineers to competitors. You need to identify who is dissatisfied and intervene before they resign. You must respect privacy but be proactive.',
        summary: 'You have transformed HR from administration to strategic talent management. By connecting performance and sentiment data (Data), using predictive attrition models (Logic), and empowering managers directly (Action), you retained top talent before they walked out the door.',
        stages: {
          data: {
            id: 'emp-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'What creates a holistic "Employee" object?',
            options: [
              {
                id: 'ed1',
                label: 'HRIS, Performance & Sentiment Data',
                description: 'Integration of tenure, recent performance reviews, compensation history, and anonymized sentiment surveys.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. An "Employee" in the Ontology is not just a payroll ID. It is a rich object containing their history, performance, and sentiment, pulled from fragmented HR systems.'
              },
              {
                id: 'ed2',
                label: 'External Salary Benchmarks',
                description: 'A purchased dataset comparing generic job titles and salary ranges across the tech industry.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While external data is useful, you cannot make internal management decisions without the internal context (Performance, Compensation) that you actually control.'
              },
              {
                id: 'ed3',
                label: 'Keycard Access Logs',
                description: 'Tracking exactly when people go to the bathroom.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is invasive surveillance data. It destroys trust and does not necessarily correlate with employee *value*, only their physical presence.'
              },
              {
                id: 'ed4',
                label: 'Recruitment Email Database',
                description: 'A list of candidates applying for jobs.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is data about *potential* employees, not your *current* talent. Analyzing candidates won\'t help you retain the engineers you already have.'
              }
            ]
          },
          logic: {
            id: 'emp-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we identify attrition risk?',
            options: [
              {
                id: 'el1',
                label: 'Attrition Risk Model',
                description: 'An ML model comparing an employee\'s trajectory to historical patterns of those who left.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This logic model calculates a risk score. It can find non-obvious patterns, like "Engineers who haven\'t had a raise in 18 months and missed a promotion have an 80% chance of leaving."'
              },
              {
                id: 'el2',
                label: 'Random Selection',
                description: 'Randomly choose 5 employees to interview.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is inefficient and unscientific. The Ontology uses Logic to prioritize human attention where it is needed most.'
              },
              {
                id: 'el3',
                label: 'Keyword Search "Quit"',
                description: 'Scanning employee emails for the word "quit".',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is reactive (too late) and likely a privacy violation. You want predictive logic that identifies risk *before* the decision to quit is made.'
              },
              {
                id: 'el4',
                label: 'Performance Bell Curve Analysis',
                description: 'Strictly grouping all employees by their last review to identify the bottom 10%.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is an overly simplistic heuristic. It ignores high performers who are unhappy and low performers who stay. You need a multivariate model.'
              }
            ]
          },
          action: {
            id: 'emp-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'You found a high-risk top engineer. What is the action?',
            options: [
              {
                id: 'ea1',
                label: 'Manager Alert & Upskilling Offer',
                description: 'Alert the direct manager with a retention playbook and automatically approve budget for advanced training.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is a "System of Action". It empowers the manager with data (the playbook) and removes friction (auto-approved budget) to solve the problem immediately.'
              },
              {
                id: 'ea2',
                label: 'Update Database Field',
                description: 'Change the employee status from "Active" to "At Risk" in the database.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Updating a tag is just data entry. It is not an *outcome*. No value is created until an intervention happens in the real world.'
              },
              {
                id: 'ea3',
                label: 'Schedule HR Exit Interview',
                description: 'Preemptively schedule a meeting to discuss their potential reasons for leaving if they decide to quit.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is passive management. If the employee is at risk now, you want to *retain* them, not interview them on the way out.'
              },
              {
                id: 'ea4',
                label: 'Revoke Keycard Access',
                description: 'Lock them out of the building preemptively.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is a hostile action based on a probability. The Ontology helps *enable* humans to make better decisions, not automate harmful actions without review.'
              }
            ]
          }
        }
      },
      {
        id: 'dupont-analysis',
        title: 'Finance: Kinetic DuPont Analysis',
        description: 'Operationalize ROE by identifying and fixing "Lazy Assets" in real-time.',
        icon: 'trending-up',
        context: 'You are a Financial Analyst responsible for improving Return on Equity (ROE). Traditional analysis shows Asset Turnover is dragging down performance. You need to move from reporting this lag to actively fixing it by identifying underutilized assets ("Lazy Assets") and converting them to cash.',
        summary: 'You have successfully operationalized the "Asset Turnover" component of DuPont. By using live IoT data (Data) and applying a "Lazy Asset" detection rule (Logic), you were able to trigger maintenance and sales workflows (Action) immediately, improving ROE without waiting for month-end reporting.',
        stages: {
          data: {
            id: 'dupont-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects do we need to detect capital trapped in unproductive assets?',
            options: [
              {
                id: 'dd1',
                label: 'Live Asset Objects & Utilization Telemetry',
                description: 'Real-time linkage between specific machines, their uptime status, and inventory SKU aging.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. To improve Asset Turnover, you need to know *which* specific assets are idle. Live objects with telemetry (IoT) provide this visibility, unlike static accounting depreciation.'
              },
              {
                id: 'dd2',
                label: 'Quarterly Balance Sheet PDF',
                description: 'A static export from the ERP showing book values and accumulated depreciation from the previous period.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is a "Data Grave". It tells you the accounting value last month, but not if a machine is down *now* or if stock is gathering dust.'
              },
              {
                id: 'dd3',
                label: 'Competitor Stock Prices',
                description: 'External market data about rival companies\' performance.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is external noise. While interesting for benchmarking, it does not help you resolve operational inefficiencies within your own factory walls.'
              },
              {
                id: 'dd4',
                label: 'General Ledger Journal Entries',
                description: 'A list of debit and credit entries from the last year.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Financial entries are abstractions. They lack the operational context (e.g., "machine is broken") needed to address the root cause of low asset turnover.'
              }
            ]
          },
          logic: {
            id: 'dupont-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we systematically identify the "Lazy Assets"?',
            options: [
              {
                id: 'dl1',
                label: '"Lazy Asset" Detection Monitor',
                description: 'A deterministic rule engine that continuously scans and flags assets with <40% utilization or inventory aged >90 days.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This is operational logic. It translates a financial goal (Asset Turnover) into a physical reality (Machine uptime / Inventory age) and automatically surfaces where action is needed.'
              },
              {
                id: 'dl2',
                label: 'Generative Asset Description',
                description: 'Using an LLM to write creative sales copy for machinery without analyzing usage data.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is a misapplication of AI. You need analytical logic to *find* inefficiency, not generative logic to *describe* something you haven\'t identified yet.'
              },
              {
                id: 'dl3',
                label: 'DuPont Decomposition Spreadsheet',
                description: 'A manual model breaking down ROE into three parts using last month\'s aggregated figures.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This is diagnostic (what went wrong?) but not prescriptive (what do we do now?). It is too static and aggregated to find specific "Lazy Assets".'
              },
              {
                id: 'dl4',
                label: 'Depreciation Recalculation',
                description: 'Re-running the standard accounting formula to adjust the book value.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This only changes reporting, not operations. The goal is to make the assets more productive or sell them, not just change their value on paper.'
              }
            ]
          },
          action: {
            id: 'dupont-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'We identified stagnant inventory. How do we convert it to cash immediately?',
            options: [
              {
                id: 'da1',
                label: 'Trigger "Clearance" & Maintenance Workflows',
                description: 'Automatically execute a "Flash Sale" campaign in the e-commerce system for old stock and create tickets for broken machines.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is kinetic finance. The system detects a financial drag and triggers an operational solution (Sale/Repair) via write-back to the relevant systems.'
              },
              {
                id: 'da2',
                label: 'Update General Ledger',
                description: 'Post a journal entry to write down the inventory value to reflect the loss.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is passive accounting. It acknowledges the loss but does not attempt to recover cash or improve the asset turnover ratio.'
              },
              {
                id: 'da3',
                label: 'Generate "Asset Utilization" PDF',
                description: 'Create a beautiful chart of the inefficiency to present at the next board meeting in two weeks.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Reporting is not action. By the time the board sees the PDF, the inventory has depreciated further. Kinetic finance requires immediate intervention.'
              },
              {
                id: 'da4',
                label: 'Email Plant Managers',
                description: 'Send a bulk email asking managers to "please look into" why their assets aren\'t being used efficiently.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is high-latency and unreliable. It puts the burden on humans to find data and act, rather than the system serving up the solution (e.g., a maintenance ticket).'
              }
            ]
          }
        }
      }
    ];
  }
};

export const ICONS: Record<string, React.ReactNode> = {
  factory: <Factory className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  cart: <ShoppingCart className="w-6 h-6" />
};