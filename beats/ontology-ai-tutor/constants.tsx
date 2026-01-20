import React from 'react';
import { CaseStudy, TheorySection, Language } from './types';
import { Factory, TrendingUp, Users, ShoppingCart, Activity, Hotel, Heart, CalendarClock, Smartphone, UserX, ShieldAlert, Gift } from 'lucide-react';
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
              Als toekomstige leiders leren jullie data te analyseren om beslissingen te nemen. In veel organisaties zijn
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
        summary: 'Je hebt met succes een beslissingsgerichte workflow gebouwd. In plaats van te vertrouwen op statische Excel-sheets en memo\'s, heb je live marktdata verbonden aan een DCF Logic Asset, en onmiddellijke executie mogelijk gemaakt via write-back. Dit vermindert vertraging en financieel risico.',
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
                feedback: 'Correct. Om waarde te modelleren, heb je semantische objecten nodig die de marktcondities (Rentes) en de operationele realiteit (Cashflows) vertegenwoordigen. Dit vormt de basis voor de "Investment Decision" in financiële theorie. De Ontology integreert deze data uit heterogene bronnen (marktdata feeds, ERP-systemen, treasury platforms) in een uniform semantisch model, zodat Logic-modellen er direct mee kunnen werken.'
              },
              {
                id: 'd2',
                label: 'Historische bedrijfsprestaties (jaarverslagen)',
                description: 'Geaggregeerde financiële ratio\'s en narratieve beschrijvingen uit de laatste 5 jaarverslagen van het bedrijf zelf.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel bedrijfsprestatie relevant lijkt, zijn jaarverslagen retrospectief en geaggregeerd. Voor een DCF-analyse heb je toekomstgerichte, granulaire operationele cashflows nodig, niet historische samenvattingen. Bovendien zijn statische PDF-rapporten "Data Graves" die niet real-time aan logic-modellen gebonden kunnen worden.'
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
                feedback: 'Correct. Deze logic asset berekent het "drempelrendement" en "Net Present Value (NPV)". In de Ontology wordt dit model behandeld als een "tool" die AI of mensen kunnen aanroepen om te redeneren over de data. Via "logic binding" kan deze DCF-functie draaien in verschillende omgevingen (cloud-based Python workbench, on-premises Excel-model, of SaaS treasury platform) en toch uniform toegankelijk zijn via de Ontology-laag.'
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
                label: 'LLM-gebaseerde marktvoorspelling',
                description: 'Een Large Language Model gebruiken om toekomstige aandelenkoersen te voorspellen door nieuwsheadlines, earnings calls en analisten-rapporten te analyseren.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel LLMs waardevol kunnen zijn voor het verwerken van ongestructureerde data (nieuwsartikelen, sentiment), zijn ze **niet-deterministisch** en kunnen hallucineren bij numerieke voorspellingen. Voor financiële hurdle rate berekeningen heb je **deterministische, wiskundige logica** nodig (zoals DCF) die transparant, reproduceerbaar en auditable is. LLMs kunnen deze modellen *aanvullen* (bijv. voor risico-narratieven), maar niet vervangen.'
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
                label: 'Automatisch investment memo genereren voor compliance',
                description: 'Trigger een workflow die een gestandaardiseerd memo genereert voor het compliance team ter goedkeuring.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel dit operationeler is dan een blogpost, introduceert het nog steeds vertraging door menselijke goedkeuring te vereisen. De Ontology "Action" betekent directe write-back naar transactiesystemen (binnen governance guardrails), niet wachten op compliance. In een goed ontworpen systeem zijn compliance-regels al gebakken in de Logic-laag.'
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
                label: 'Geaggregeerde klanttevredenheidsscores per regio',
                description: 'Een maandelijkse NPS (Net Promoter Score) rapportage per regionale vestiging, gebaseerd op surveys.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. NPS-scores zijn waardevol voor strategische trends, maar ze zijn te geaggregeerd en te traag voor operationele churn-preventie. Je hebt granulaire, klant-specifieke data nodig (instantie-niveau) en real-time signalen, niet maandelijkse regionale gemiddelden. Tegen de tijd dat je een lage NPS ziet, zijn individuele hoogwaardige klanten al vertrokken.'
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
        context: `Titan Industries wordt geconfronteerd met een verstoring bij een grote leverancier voor grondstoffen die nodig zijn voor chirurgische maskers. De vraag escaleert. Je moet de Enterprise Ontology gebruiken om dit op te lossen zonder andere productielijnen te breken. Gebaseerd op het Titan Industries voorbeeld uit het Palantir Ontology artikel (Krishnaswamy, 2024).`,
        summary: 'Je hebt een veerkrachtige supply chain gedemonstreerd. Door operationele data samen te brengen, scenario\'s te simuleren en direct terug te schrijven naar het ERP, heb je een crisis opgelost zonder menselijke vertraging of foutgevoelige communicatie.',
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
                label: 'Handmatige logboeken van magazijnmedewerkers',
                description: 'Excel-spreadsheets die elke shift handmatig worden bijgewerkt door magazijnmanagers met hun beste schatting van voorraadniveaus.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel deze data lijkt op wat je nodig hebt, zijn handmatige logboeken notoir onbetrouwbaar en niet real-time. Ze reflecteren de waarneming van gisteren, niet de huidige realiteit. Voor supply chain crisis management heb je live, geautomatiseerde feeds nodig uit je ERP/WMS systemen, niet handmatige schattingen die verouderd zijn zodra ze worden ingevoerd.'
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
                feedback: 'Correct. Dit sluit effectief de loop. De beslissing genomen in de analyselaag wordt teruggeschreven naar de fysieke systemen (Warehouse/ERP) die de fabriek draaien, wat verzekert dat het plan daadwerkelijk wordt uitgevoerd. In de praktijk worden dit soort kritieke acties eerst "staged" als scenarios—een veilige sandbox waarin teams de gevolgen kunnen analyseren (welke orders worden vertraagd? welke kosten ontstaan?) voordat ze de beslissing committen. Dit combineert snelheid met governance.'
              },
              {
                id: 'a2',
                label: 'Genereer een CSV rapport',
                description: 'Download een spreadsheet en e-mail deze naar de floor manager.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. CSV\'s en e-mails zijn "digital exhaust". Ze verbreken de chain of custody. Als de manager de e-mail mist, faalt de actie. Systemen moeten met systemen praten.'
              },
              {
                id: 'a3',
                label: 'Activeer dashboard alert voor magazijnmedewerkers',
                description: 'Trigger een real-time notificatie op de dashboards in het magazijn die medewerkers wijst op het reallocatieplan.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Hoewel een real-time alert beter is dan een e-mail, vereist dit nog steeds dat mensen de notificatie lezen en handmatig het plan uitvoeren. Dit introduceert vertraging en menselijke fouten. De Ontology write-back moet direct naar de systemen (WMS, ERP) die de voorraad en productie besturen, niet naar een dashboard voor mensen.'
              },
              {
                id: 'a4',
                label: 'E-mail instructies naar plant manager',
                description: 'Stuur een prioriteitsmail met details over het reallocatieplan naar de floor manager voor handmatige uitvoering.',
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
                label: 'Plan automatisch exit interview bij volgende one-on-one',
                description: 'Trigger automatisch een agenda-item voor een exit interview gesprek bij de eerstvolgende reguliere one-on-one meeting.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is passief en reactief management. Een exit interview plan je wanneer iemand al besloten heeft te vertrekken, niet als preventieve maatregel. Als de medewerker nu risico loopt, wil je ze *behouden* met een retentie-gesprek en aanbod, niet voorbereiden op hun vertrek. De Ontology moet proactieve interventies triggeren, niet defensieve exit-procedures.'
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
                feedback: 'Correct. Dit is kinetische finance. Het systeem detecteert een financieel probleem en triggert een operationele oplossing (Verkoop/Reparatie) via write-back naar de relevante systemen. Door scenarios te gebruiken, kan een financial controller eerst de impact simuleren ("Als we deze voorraad afprijzen met 30%, hoeveel cash genereren we vs. hoeveel marge verliezen we?") voordat de clearance-campagne live gaat.'
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
      },
      {
        id: 'hotel-dynamic-pricing',
        title: 'Hospitality: dynamische kamerprijzen',
        description: 'Optimaliseer RevPAR door real-time prijsaanpassingen op basis van vraag en marktcondities.',
        icon: 'hotel',
        context: 'Je bent Revenue Manager bij een hotelketen met 12 properties. De bezettingsgraad fluctueert sterk door seizoenen, lokale evenementen en concurrentieprijzen. Je moet kamerprijzen real-time optimaliseren om de Revenue Per Available Room (RevPAR) te maximaliseren.',
        summary: 'Je hebt een dynamisch pricing systeem gebouwd dat live vraagdata integreert met voorspellende modellen. In plaats van handmatige prijsaanpassingen in spreadsheets, reageert het systeem nu automatisch op marktveranderingen en pusht optimale tarieven naar alle boekingskanalen.',
        stages: {
          data: {
            id: 'hotel-price-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten zijn essentieel om kamerprijzen te optimaliseren?',
            options: [
              {
                id: 'hpd1',
                label: 'Live boekingsdata, concurrentieprijzen & evenementenkalender',
                description: 'Real-time bezettingsgraad per kamertype, prijzen van concurrenten via rate shoppers, en een kalender met lokale evenementen (congressen, festivals, sportwedstrijden).',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Om prijzen te optimaliseren heb je drie semantische objecten nodig: je eigen vraag (Boekingen), de markt (Concurrentieprijzen), en vraagdrivers (Evenementen). De Ontology integreert deze real-time feeds uit je PMS, rate shopping tools en evenementendatabases in een uniform model dat Logic-assets kunnen consumeren.'
              },
              {
                id: 'hpd2',
                label: 'Maandelijkse bezettingsrapportage',
                description: 'Een PDF met geaggregeerde bezettingscijfers en gemiddelde dagprijzen van de afgelopen maand.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Maandelijkse rapportages zijn "Data Graves" - retrospectief en te traag voor dynamische pricing. Als je wacht op het maandrapport, heb je al duizenden euro\'s aan potentiële omzet gemist door suboptimale prijzen.'
              },
              {
                id: 'hpd3',
                label: 'TripAdvisor reviews',
                description: 'Gastbeoordelingen en scores van het afgelopen jaar.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Reviews zijn waardevol voor reputatiemanagement, maar ze voorspellen geen kortetermijnvraag. Voor pricing heb je forward-looking vraagindicatoren nodig, niet backward-looking tevredenheidsscores.'
              },
              {
                id: 'hpd4',
                label: 'Historische weersdata',
                description: 'Gemiddelde temperaturen en neerslagcijfers van de afgelopen 10 jaar.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Historisch weer is niet actionable voor pricing. Je hebt real-time weersverwachtingen nodig (als aanvulling op je kerndata), niet historische gemiddelden die niets zeggen over komend weekend.'
              }
            ]
          },
          logic: {
            id: 'hotel-price-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Welk model bepaalt de optimale kamerprijs per nacht?',
            options: [
              {
                id: 'hpl1',
                label: 'Demand forecasting & price elasticity model',
                description: 'Een machine learning model dat vraag voorspelt per kamertype/datum en de optimale prijs berekent op basis van prijselasticiteit en bezettingsdoelen.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit Logic-asset combineert vraagvoorspelling (hoeveel kamers kunnen we verkopen?) met prijsoptimalisatie (tegen welke prijs maximaliseren we RevPAR?). Het model weegt bezettingsgraad tegen gemiddelde dagprijs - soms is een lagere prijs met hogere bezetting winstgevender dan een hoge prijs met lege kamers.'
              },
              {
                id: 'hpl2',
                label: 'Vaste seizoensprijslijst',
                description: 'Een Excel-tabel met drie prijsniveaus: laagseizoen, hoogseizoen en piekseizoen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Statische seizoensprijzen negeren dagelijkse vraagfluctuaties. Een congres op dinsdag in het laagseizoen kan hogere vraag genereren dan een gemiddelde zaterdag in het hoogseizoen. Je mist omzet door niet te reageren op actuele marktcondities.'
              },
              {
                id: 'hpl3',
                label: 'Concurrent-matching algoritme',
                description: 'Automatisch de prijs van de goedkoopste concurrent matchen, altijd €5 lager.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit leidt tot een race-to-the-bottom en negeert je eigen vraag en waardepropositie. Als jouw hotel vol loopt kun je premium prijzen vragen - blind de concurrent volgen laat geld liggen of veroorzaakt onnodige prijsoorlogen.'
              },
              {
                id: 'hpl4',
                label: 'LLM-gebaseerde prijssuggestie',
                description: 'ChatGPT vragen: "Wat is een goede prijs voor een hotelkamer in Amsterdam volgende week?"',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. LLMs hebben geen toegang tot je real-time boekingsdata of actuele marktcondities. Ze kunnen hallucineren over prijzen en missen de deterministische, mathematische optimalisatie die revenue management vereist. LLMs kunnen wel helpen bij het genereren van prijscommunicatie naar gasten.'
              }
            ]
          },
          action: {
            id: 'hotel-price-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Het model beveelt een prijsverhoging aan voor komend weekend vanwege een groot congres. Wat is de juiste actie?',
            options: [
              {
                id: 'hpa1',
                label: 'Push prijsupdate naar PMS en alle OTA-kanalen',
                description: 'Activeer automatische rate-push naar het Property Management System, Booking.com, Expedia en de eigen website via channel manager.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is de "Action" die de loop sluit. De nieuwe prijs moet binnen minuten live staan op alle verkoopkanalen. Door write-back naar PMS en channel manager voorkom je rate parity issues en maximaliseer je de window of opportunity voordat concurrenten ook hun prijzen aanpassen.'
              },
              {
                id: 'hpa2',
                label: 'E-mail naar revenue meeting',
                description: 'Stuur de prijsaanbeveling naar het revenue team voor bespreking in de wekelijkse meeting.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Wachten op een vergadering introduceert dagen vertraging. In hospitality veranderen marktcondities per uur - tegen de tijd dat het team vergadert, is het congres misschien al volgeboekt bij concurrenten tegen hogere prijzen.'
              },
              {
                id: 'hpa3',
                label: 'Dashboard indicator updaten',
                description: 'Verander de "pricing opportunity" indicator van groen naar oranje in het management dashboard.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Een dashboard-wijziging is passieve visualisatie, geen actie. De gasten boeken niet via je dashboard - ze boeken via Booking.com waar je oude prijs nog steeds staat.'
              },
              {
                id: 'hpa4',
                label: 'Prijswijzigingsvoorstel documenteren',
                description: 'Genereer een memo met de rationale voor de prijswijziging ter archivering en compliance.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Documentatie is belangrijk maar geen primaire actie. In een goed ontworpen Ontology wordt de audit trail automatisch gegenereerd als bijproduct van de prijswijziging, niet als vervanging ervoor.'
              }
            ]
          }
        }
      },
      {
        id: 'guest-service-recovery',
        title: 'Hospitality: gastbeleving & service recovery',
        description: 'Identificeer ontevreden VIP-gasten real-time en activeer service recovery voordat ze uitchecken.',
        icon: 'heart',
        context: 'Je bent Guest Experience Director bij een luxe resort. Een hoogwaardige gast heeft zojuist een negatieve opmerking geplaatst op sociale media terwijl hij nog in het hotel verblijft. Je moet ontevreden gasten met hoge lifetime value identificeren en onmiddellijk interveniëren voordat ze uitchecken en negatieve reviews achterlaten.',
        summary: 'Je hebt een proactief service recovery systeem gebouwd. Door gastprofielen, in-stay feedback en sociale media te integreren met een prioriteringsmodel, kan het systeem automatisch de juiste interventie triggeren - van een persoonlijke verontschuldiging door de GM tot een complementaire spa-behandeling.',
        stages: {
          data: {
            id: 'guest-recovery-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten vormen het complete "Guest 360" beeld voor service recovery?',
            options: [
              {
                id: 'grd1',
                label: 'Gastprofiel, in-stay touchpoints & sociale media mentions',
                description: 'Loyaliteitsstatus en lifetime value uit CRM, real-time service interacties (roomservice, spa, klachten), en social listening feeds voor mentions van het hotel.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Effectieve service recovery vereist drie geïntegreerde data-objecten: wie de gast is (Profiel/Waarde), wat er tijdens het verblijf gebeurt (Touchpoints), en externe signalen (Social Media). De Ontology verbindt PMS, CRM, service logs en social listening in één semantisch gastobject.'
              },
              {
                id: 'grd2',
                label: 'Historische NPS-scores per kwartaal',
                description: 'Geaggregeerde Net Promoter Scores van post-stay surveys, uitgesplitst per afdeling.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. NPS-surveys komen te laat - de gast is al vertrokken. Voor in-stay recovery heb je real-time signalen nodig, niet retrospectieve aggregaties. Tegen de tijd dat je de NPS ziet, is de negatieve review al gepost.'
              },
              {
                id: 'grd3',
                label: 'Boekingskanaal informatie',
                description: 'Via welke OTA of direct channel de gast geboekt heeft.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Het boekingskanaal is relevant voor marketing attributie, maar zegt niets over de huidige tevredenheid van de gast of de urgentie van interventie.'
              },
              {
                id: 'grd4',
                label: 'Kamertype en prijs betaald',
                description: 'Welke kamercategorie de gast heeft en het tarief per nacht.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dit is transactionele data die helpt bij upselling, maar niet bij het detecteren van ontevredenheid. Een gast in de duurste suite kan net zo ontevreden zijn als een gast in een standaardkamer.'
              }
            ]
          },
          logic: {
            id: 'guest-recovery-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe bepalen we welke gasten prioriteit krijgen voor service recovery?',
            options: [
              {
                id: 'grl1',
                label: 'Guest risk scoring model',
                description: 'Een model dat sentiment-signalen combineert met gastwaarde om een "recovery priority score" te berekenen: hoge waarde + negatief sentiment = hoogste prioriteit.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit Logic-asset weegt twee dimensies: de potentiële schade (gastwaarde, social media bereik) en de urgentie (sentiment, check-out datum). Een ontevreden influencer met 100K volgers die morgen uitcheckt krijgt hogere prioriteit dan een first-time guest met een kleine klacht.'
              },
              {
                id: 'grl2',
                label: 'Chronologische klachtenafhandeling',
                description: 'Klachten behandelen in volgorde van binnenkomst: first-in, first-out.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. FIFO-logica negeert urgentie en impact. Een VIP die over 2 uur uitcheckt met een serieuze klacht moet voorrang krijgen op een gast die gisteren een kleine opmerking maakte en nog 5 nachten blijft.'
              },
              {
                id: 'grl3',
                label: 'Keyword-matching op klachten',
                description: 'Zoeken naar woorden als "vreselijk", "nooit meer" en "teleurgesteld" in feedback.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Simpele keyword-matching mist context en nuance. "Het was niet vreselijk" is positief, maar matcht op "vreselijk". Bovendien weegt dit niet mee hoe waardevol de gast is - je behandelt een first-time guest hetzelfde als een platinum member.'
              },
              {
                id: 'grl4',
                label: 'LLM-gegenereerde empathische respons',
                description: 'Een Large Language Model gebruiken om automatisch een verontschuldigings-email te genereren.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Dit verwart Logic (redeneren/prioriteren) met Action (uitvoeren). Eerst moet je bepalen *of* en *hoe urgent* je moet interveniëren - pas daarna komt de vraag hoe je communiceert. Een LLM kan helpen bij het formuleren van de boodschap, maar niet bij het bepalen van de prioriteit.'
              }
            ]
          },
          action: {
            id: 'guest-recovery-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Een platinum member met hoge social media following heeft net een negatieve tweet gepost over een slechte room service ervaring. Check-out is over 4 uur. Wat is de juiste actie?',
            options: [
              {
                id: 'gra1',
                label: 'Trigger multi-channel recovery workflow',
                description: 'Automatisch: (1) alert naar GM mobiel voor persoonlijk bezoek, (2) complementaire amenity order naar room service, (3) upgrade-check in PMS voor eventuele kamerverbetering, (4) notificatie naar social media team voor monitoring.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is georchestreerde actie via write-back naar meerdere systemen. De Ontology coördineert parallelle interventies: menselijke touch (GM alert), tastbare compensatie (amenity), en reputatiemanagement (social monitoring). Elke actie wordt gelogd voor de audit trail.'
              },
              {
                id: 'gra2',
                label: 'Standaard verontschuldigings-email sturen',
                description: 'Een automatische template-email versturen met excuses en een 10% kortingscode voor een volgend verblijf.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Een generieke email is te onpersoonlijk voor een hoogwaardige gast met een acuut probleem. Bovendien helpt een kortingscode voor "volgende keer" niet als de gast over 4 uur vertrekt en nu ontevreden is. De interventie moet in-stay zijn, niet post-stay.'
              },
              {
                id: 'gra3',
                label: 'Case aanmaken in CRM voor follow-up',
                description: 'Een ticket loggen zodat het guest relations team het kan oppakken tijdens kantooruren.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is te traag en passief. De gast checkt over 4 uur uit - "kantooruren" en "ticket queues" zijn niet relevant. De actie moet nu gebeuren, niet wanneer iemand de queue checkt.'
              },
              {
                id: 'gra4',
                label: 'Reactie plaatsen op de tweet',
                description: 'Direct publiekelijk reageren op Twitter met excuses en de vraag om een DM te sturen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Publieke social media respons zonder eerst het probleem op te lossen is riskant - het kan escaleren. De primaire actie moet de gastervaring in het hotel verbeteren. Social media respons kan onderdeel zijn van de workflow, maar niet de enige of eerste actie.'
              }
            ]
          }
        }
      },
      {
        id: 'workforce-scheduling',
        title: 'Hospitality: vraaggestuurde personeelsplanning',
        description: 'Optimaliseer personeelsbezetting op basis van voorspelde vraag om zowel service levels als arbeidskosten te optimaliseren.',
        icon: 'calendar-clock',
        context: 'Je bent Operations Manager bij een groot congreshotel. Arbeidskosten zijn je grootste kostenpost (35% van de omzet). Je moet de personeelsbezetting afstemmen op fluctuerende vraag van congressen, bruiloften en leisure gasten - zonder overstaffing (kostenverspilling) of understaffing (service gaps).',
        summary: 'Je hebt een demand-driven workforce planning systeem gebouwd. Door vraagvoorspelling te koppelen aan arbeidsregels en het roosteringsysteem, genereert het systeem automatisch optimale roosters die service levels garanderen binnen het arbeidsbudget.',
        stages: {
          data: {
            id: 'workforce-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten zijn nodig voor vraaggestuurde personeelsplanning?',
            options: [
              {
                id: 'wfd1',
                label: 'Eventboekingen, historische patronen & medewerker beschikbaarheid',
                description: 'Geplande congressen/bruiloften met verwachte covers, historische arbeidsuren per omzetniveau, en real-time beschikbaarheid/contracturen van medewerkers.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Workforce planning vereist drie geïntegreerde objecten: toekomstige vraag (Eventboekingen), de vertaling naar arbeid (Historische labor ratios), en de constraints (Medewerkerbeschikbaarheid). De Ontology verbindt je event management systeem, POS/PMS data en HR-systeem in één planning-ready dataset.'
              },
              {
                id: 'wfd2',
                label: 'Vorig jaar\'s personeelsrooster',
                description: 'Excel-export van alle diensten die vorig jaar zijn gedraaid.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Historische roosters tonen wat je *deed*, niet wat je *nodig had*. Als je vorig jaar structureel over- of understaffed was, reproduceer je die fouten. Je hebt de relatie tussen vraag en benodigde arbeid nodig, niet oude roosters.'
              },
              {
                id: 'wfd3',
                label: 'Medewerkerstevredenheidsscores',
                description: 'Jaarlijkse employee engagement survey resultaten per afdeling.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Medewerkerstevredenheid is belangrijk voor HR-strategie, maar niet voor operationele roosterplanning. Het vertelt je niet hoeveel mensen je vrijdag nodig hebt voor het congres van 500 personen.'
              },
              {
                id: 'wfd4',
                label: 'Salariskosten per medewerker',
                description: 'Uurtarieven en toeslagen uit het payroll systeem.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Kostendata is relevant voor budgettering, maar lost het kernprobleem niet op: hoeveel mensen heb je wanneer nodig? Eerst bepaal je de benodigde bezetting, daarna kun je kosten berekenen. Dit is input voor een latere optimalisatie, niet voor de vraagvoorspelling.'
              }
            ]
          },
          logic: {
            id: 'workforce-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe bepalen we de optimale personeelsbezetting per dag en shift?',
            options: [
              {
                id: 'wfl1',
                label: 'Demand-to-labor model met constraint optimization',
                description: 'Een model dat verwachte covers/check-ins vertaalt naar benodigde FTEs per rol, rekening houdend met arbeidsregels (max uren, pauzes, skills) en service level targets.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit Logic-asset combineert vraagvoorspelling met constraint optimization. Het berekent niet alleen hoeveel mensen je nodig hebt, maar ook welke combinatie van shifts en medewerkers voldoet aan alle regels (CAO, beschikbaarheid, skills) terwijl het budget wordt geminimaliseerd.'
              },
              {
                id: 'wfl2',
                label: 'Vaste bezettingsratio per afdeling',
                description: 'Altijd 1 kelner per 20 covers, 1 receptionist per 50 kamers, ongeacht de dag.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Statische ratio\'s negeren variabiliteit. Check-in piekmomenten, congressen met complexe F&B, of een rustige dinsdagavond vragen allemaal andere bezetting. Een "one-size-fits-all" ratio leidt tot structurele over- of understaffing.'
              },
              {
                id: 'wfl3',
                label: 'Manager intuïtie en ervaring',
                description: 'De operations manager maakt roosters op basis van jarenlange ervaring en "gut feeling".',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Menselijke intuïtie is waardevol maar niet schaalbaar of consistent. Het kan niet alle variabelen (events, weer, historische patronen, beschikbaarheid van 200 medewerkers) tegelijk optimaliseren. Bovendien is de kennis niet overdraagbaar als de manager vertrekt.'
              },
              {
                id: 'wfl4',
                label: 'LLM-gegenereerd roostervoorstel',
                description: 'ChatGPT vragen om een rooster te maken op basis van een tekstuele beschrijving van de week.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. LLMs kunnen niet betrouwbaar optimaliseren onder constraints. Ze kennen je CAO-regels niet, hebben geen toegang tot medewerkerbeschikbaarheid, en kunnen hallucineren over shift-tijden. Workforce scheduling vereist deterministische constraint solving, geen probabilistische tekstgeneratie.'
              }
            ]
          },
          action: {
            id: 'workforce-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Het model heeft de optimale bezetting berekend voor een druk congresweekend. Wat is de juiste actie?',
            options: [
              {
                id: 'wfa1',
                label: 'Push rooster naar workforce management & informeer medewerkers',
                description: 'Automatisch: (1) publiceer het geoptimaliseerde rooster in het WFM-systeem, (2) stuur shift-notificaties naar de app van medewerkers, (3) markeer open shifts voor invulling, (4) alert manager bij onderbezetting die niet automatisch opgelost kan worden.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is end-to-end workforce automation. De Ontology schrijft het rooster naar het WFM-systeem, triggert notificaties naar medewerkers, en escaleert alleen uitzonderingen naar managers. De loop van vraag naar bezetting naar communicatie is gesloten zonder handmatige interventie.'
              },
              {
                id: 'wfa2',
                label: 'Roostervoorstel e-mailen naar afdelingshoofden',
                description: 'Een Excel-bijlage sturen naar F&B manager, housekeeping manager en front office manager voor review en aanpassing.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit introduceert vertraging en fragmentatie. Elke manager past lokaal aan zonder zicht op het geheel, wat leidt tot suboptimalisatie. Bovendien moet iemand de Excel-wijzigingen handmatig terugvoeren naar het systeem.'
              },
              {
                id: 'wfa3',
                label: 'Dashboard updaten met bezettingsindicatoren',
                description: 'De "staffing health" metrics in het operations dashboard verversen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Een dashboard tonen is informatief maar geen actie. De medewerkers weten nog steeds niet wanneer ze moeten werken. Visualisatie moet een bijproduct zijn van de actie, niet de actie zelf.'
              },
              {
                id: 'wfa4',
                label: 'Uitzendbureau bellen voor extra personeel',
                description: 'Handmatig contact opnemen met het uitzendbureau om de verwachte onderbezetting op te vangen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Dit is een reactieve, handmatige workaround. In een Ontology-gedreven systeem zou de behoefte aan uitzendkrachten automatisch gedetecteerd worden, en zou de bestelling via API naar het uitzendbureau gaan (of naar een flex-pool platform). Telefoneren is niet schaalbaar.'
              }
            ]
          }
        }
      },
      {
        id: 'telecom-churn-prevention',
        title: 'Telecom: churn preventie & retentie',
        description: 'Identificeer klanten met churn-risico en doe proactief een gepersonaliseerd retentie-aanbod.',
        icon: 'user-x',
        context: 'Je bent Customer Value Director bij een grote mobiele provider. Je ziet dat klanten met aflopende contracten steeds vaker naar concurrenten overstappen. Je moet hoogwaardige klanten met churn-risico identificeren en proactief een gepersonaliseerd retentie-aanbod doen voordat ze opzeggen.',
        summary: 'Je hebt een proactief retentiesysteem gebouwd. Door gebruiksdata, contractstatus en servicehistorie te integreren met een churn-voorspellingsmodel, kan het systeem automatisch de juiste klanten identificeren en een gepersonaliseerd aanbod triggeren via hun voorkeurskanaal.',
        stages: {
          data: {
            id: 'telecom-churn-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten zijn nodig om klanten met churn-risico te identificeren?',
            options: [
              {
                id: 'tcd1',
                label: 'Gebruikspatronen, contractstatus & service-interacties',
                description: 'Real-time data/bel/SMS-gebruik, contractvervaldatum en resterende looptijd, plus alle klantenservice contacten (klachten, vragen, NPS-scores).',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Churn-preventie vereist drie geïntegreerde data-objecten: gedrag (Gebruikspatronen), contractuele status (Looptijd/Vervaldata), en sentiment (Service-interacties). De Ontology verbindt je billing systeem, CRM en contact center data in één klantobject dat veranderingen in gedrag real-time detecteert.'
              },
              {
                id: 'tcd2',
                label: 'Maandelijkse churn-rapportage',
                description: 'Een Excel-rapport met het aantal opzeggingen per regio van de afgelopen maand.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Maandelijkse rapportages tonen wie al vertrokken is, niet wie op het punt staat te vertrekken. Dit is retrospectieve data - je kunt geen klant behouden die al is opgezegd. Je hebt predictieve signalen nodig, geen historische tellingen.'
              },
              {
                id: 'tcd3',
                label: 'Marktaandeel statistieken',
                description: 'Externe marktonderzoeksdata over het marktaandeel van alle providers in Nederland.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Marktaandeel is strategische informatie, maar helpt niet bij het identificeren van individuele klanten met churn-risico. Je hebt klant-specifieke data nodig op instantie-niveau, niet geaggregeerde markttrends.'
              },
              {
                id: 'tcd4',
                label: 'Netwerkdekkingskaarten',
                description: 'Geografische data over 4G/5G dekking per postcode.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Dekkingsdata is relevant voor netwerkplanning, maar voorspelt niet of een specifieke klant gaat vertrekken. Een klant in een gebied met perfecte dekking kan nog steeds churnen vanwege prijs of service.'
              }
            ]
          },
          logic: {
            id: 'telecom-churn-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe bepalen we welke klanten prioriteit krijgen voor retentie-inspanningen?',
            options: [
              {
                id: 'tcl1',
                label: 'Churn probability × Customer Lifetime Value model',
                description: 'Een model dat voor elke klant de kans op vertrek berekent én dit vermenigvuldigt met hun verwachte lifetime value om een "retentie-prioriteitsscore" te genereren.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit Logic-asset combineert twee dimensies: risico (hoe waarschijnlijk is churn?) en waarde (hoeveel is deze klant waard?). Een klant met 80% churn-kans maar €10/maand waarde krijgt lagere prioriteit dan een klant met 40% churn-kans en €80/maand waarde. Dit maximaliseert de ROI van retentie-inspanningen.'
              },
              {
                id: 'tcl2',
                label: 'Contractvervaldatum sortering',
                description: 'Klanten sorteren op wanneer hun contract afloopt en beginnen met degenen die het eerst aflopen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Contractvervaldatum alleen is te simplistisch. Niet iedereen met een aflopend contract vertrekt, en sommige klanten vertrekken juist mid-contract (en betalen de boete). Je mist de nuance van gedragsverandering en klantwaarde.'
              },
              {
                id: 'tcl3',
                label: 'Klachten-teller',
                description: 'Klanten met meer dan 3 klachten in de afgelopen 6 maanden markeren als risico.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Een simpele drempelwaarde mist context. Sommige klanten klagen vaak maar blijven trouw; anderen zeggen niets en vertrekken stil. Bovendien weegt dit niet mee hoe waardevol de klant is.'
              },
              {
                id: 'tcl4',
                label: 'LLM-analyse van klantgesprekken',
                description: 'ChatGPT alle call center transcripts laten lezen om te bepalen wie ontevreden klinkt.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. LLMs kunnen helpen bij sentiment-extractie als input voor je model, maar zijn niet geschikt als primaire beslissingslogica. Ze missen de structuur om churn-kans te kwantificeren en kunnen niet betrouwbaar prioriteren op basis van klantwaarde. Bovendien is dit niet schaalbaar voor miljoenen klanten.'
              }
            ]
          },
          action: {
            id: 'telecom-churn-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Een hoogwaardige klant met hoog churn-risico is geïdentificeerd. Contract loopt over 3 weken af. Wat is de juiste actie?',
            options: [
              {
                id: 'tca1',
                label: 'Trigger gepersonaliseerd aanbod via voorkeurskanaal',
                description: 'Automatisch: (1) genereer een op-maat aanbod gebaseerd op gebruiksprofiel, (2) push naar preferred channel (app/email/SMS), (3) bij geen respons: escaleer naar outbound call met script en aanbod in CRM, (4) log alle interacties.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is multi-channel retentie-orchestratie. De Ontology bepaalt het beste aanbod (bijv. meer data, lagere prijs, nieuw toestel) op basis van het klantprofiel, en activeert het via het kanaal waar deze klant het beste op reageert. De call center agent ziet het aanbod direct in het CRM als de klant belt.'
              },
              {
                id: 'tca2',
                label: 'Bulk retentie-email naar alle aflopende contracten',
                description: 'Een standaard "blijf bij ons" email sturen naar iedereen wiens contract deze maand afloopt.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Bulk-communicatie is niet gepersonaliseerd en bereikt de verkeerde klanten. Je stuurt hetzelfde aanbod naar iemand die tevreden is (verspilling) als naar iemand met specifieke klachten (niet relevant). Bovendien is email vaak niet het effectiefste kanaal voor hoogwaardige klanten.'
              },
              {
                id: 'tca3',
                label: 'Klant toevoegen aan retentie-lijst voor maandelijks review',
                description: 'De klant markeren in een spreadsheet zodat het retentie-team hem kan bellen tijdens de volgende belactie.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Wachten op een maandelijks review introduceert fatale vertraging. Met een contract dat over 3 weken afloopt, moet je nu handelen. Tegen de tijd van het review is de klant mogelijk al overgestapt naar een concurrent.'
              },
              {
                id: 'tca4',
                label: 'Dashboard-alert voor management',
                description: 'Een notificatie sturen naar het management dashboard dat er een hoogwaardige klant met churn-risico is.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Management informeren is geen klantgerichte actie. De klant merkt hier niets van en het lost het probleem niet op. Actie moet direct naar de klant of naar de frontline medewerker die contact heeft.'
              }
            ]
          }
        }
      },
      {
        id: 'telecom-next-best-offer',
        title: 'Telecom: next best offer & upselling',
        description: 'Identificeer de optimale bundel of add-on voor elke klant en bied deze aan op het juiste moment.',
        icon: 'gift',
        context: 'Je bent Commercial Director bij een telecom operator. Klanten zitten vaak op bundels die niet passen bij hun werkelijke gebruik - sommigen betalen te veel (en zijn ontevreden), anderen lopen tegen limieten aan (en zijn gefrustreerd). Je moet real-time de optimale bundel of add-on identificeren en aanbieden op het juiste moment.',
        summary: 'Je hebt een intelligent upselling systeem gebouwd. Door real-time gebruiksdata te koppelen aan een propensity-to-buy model, kan het systeem automatisch het juiste aanbod op het juiste moment via het juiste kanaal presenteren - wanneer de klant er het meest ontvankelijk voor is.',
        stages: {
          data: {
            id: 'telecom-nbo-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten zijn nodig om de juiste aanbieding voor elke klant te bepalen?',
            options: [
              {
                id: 'tnd1',
                label: 'Real-time gebruik, huidige bundel & app-gedrag',
                description: 'Live data/bel/SMS-verbruik vs. bundellimieten, roaming-gedrag, device type, en browse/klik-gedrag in de self-service app.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Next-best-offer vereist drie geïntegreerde data-objecten: actueel verbruik (Usage), context (Huidige bundel & device), en engagement-signalen (App-gedrag). De Ontology verbindt je rating engine, product catalog en app analytics om real-time te detecteren wanneer een klant tegen limieten aanloopt of interesse toont.'
              },
              {
                id: 'tnd2',
                label: 'Verkoopcijfers per bundel type',
                description: 'Maandelijkse rapportage van hoeveel van elke bundel er verkocht is.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Geaggregeerde verkoopcijfers vertellen je wat populair is in het algemeen, niet wat relevant is voor een specifieke klant. Klant A die veel belt heeft een andere "next best offer" nodig dan klant B die veel data gebruikt.'
              },
              {
                id: 'tnd3',
                label: 'Concurrentie-aanbiedingen',
                description: 'Een overzicht van de huidige promoties en bundels van concurrenten.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Concurrentie-informatie is nuttig voor pricing strategie, maar helpt niet bij het bepalen van de beste aanbieding voor een individuele klant op basis van hun specifieke gebruikspatroon.'
              },
              {
                id: 'tnd4',
                label: 'Demografische klantdata',
                description: 'Leeftijd, geslacht en woonplaats van de klant uit het CRM.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Demografische data kan helpen bij segmentatie, maar gedrag is een veel betere voorspeller van behoefte. Een 25-jarige die nauwelijks data gebruikt heeft geen unlimited bundel nodig, ook al suggereert het stereotype anders.'
              }
            ]
          },
          logic: {
            id: 'telecom-nbo-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe bepalen we welke aanbieding we aan welke klant doen?',
            options: [
              {
                id: 'tnl1',
                label: 'Propensity model + next-best-offer engine',
                description: 'Een model dat per klant de koopwaarschijnlijkheid berekent voor elke mogelijke aanbieding, en de optie selecteert met de hoogste verwachte waarde (kans × marge).',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit Logic-asset combineert kansberekening (hoe waarschijnlijk accepteert deze klant dit aanbod?) met waarde-optimalisatie (welk aanbod maximaliseert lifetime value?). Het voorkomt dat je een klant die toch al zou upgraden korting geeft, of een aanbod doet waar geen interesse voor is.'
              },
              {
                id: 'tnl2',
                label: 'Vaste upsell-ladder',
                description: 'Klanten altijd de eerstvolgende duurdere bundel aanbieden.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Een lineaire upsell-ladder negeert klantgedrag. Soms is een add-on (bijv. roaming pakket) relevanter dan een grotere bundel. Soms moet je juist downsellen om churn te voorkomen bij een ontevreden klant die te veel betaalt.'
              },
              {
                id: 'tnl3',
                label: 'Bundel met hoogste marge pushen',
                description: 'Altijd de bundel aanbieden waar de provider de hoogste marge op maakt.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Marge-optimalisatie zonder klantrelevantie leidt tot irritatie en churn. Een klant die 2GB gebruikt een unlimited bundel van €50 aanbieden zal niet converteren en beschadigt de relatie. Je optimaliseert voor verwachte waarde (kans × marge), niet alleen marge.'
              },
              {
                id: 'tnl4',
                label: 'A/B test alle aanbiedingen',
                description: 'Willekeurig verschillende aanbiedingen tonen en kijken welke het beste converteert.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Pure A/B testing zonder personalisatie is inefficiënt en kan klanten frustreren met irrelevante aanbiedingen. Je hebt een model nodig dat leert van gedrag en personaliseert, niet blind experimenteert op elke individuele klant.'
              }
            ]
          },
          action: {
            id: 'telecom-nbo-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Een klant heeft 95% van zijn data-bundel verbruikt met nog 10 dagen te gaan. Het model identificeert een upgrade als beste optie. Wat is de juiste actie?',
            options: [
              {
                id: 'tna1',
                label: 'Real-time in-app aanbieding met one-click upgrade',
                description: 'Automatisch: (1) toon contextuele banner in de app wanneer klant gebruik checkt, (2) pre-populate upgrade met huidige gegevens, (3) enable one-click activatie, (4) bij acceptatie: direct doorvoeren in billing systeem.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is contextual commerce op het moment van maximale relevantie. De klant ervaart een probleem (data opraken), opent de app om te checken, en krijgt direct een oplossing gepresenteerd die met één klik te activeren is. De Ontology schrijft de upgrade direct naar het billing systeem - geen handmatige verwerking.'
              },
              {
                id: 'tna2',
                label: 'Email met bundel-overzicht sturen',
                description: 'Een email sturen met een overzicht van alle beschikbare bundels en prijzen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Email is te traag en te generiek voor dit moment. De klant heeft nu een probleem en zit in de app. Een email met alle opties (keuzestress) bereikt hem misschien morgen. Het moment van actie is nu, in het kanaal waar de klant al is.'
              },
              {
                id: 'tna3',
                label: 'Call center agent trainen op upselling',
                description: 'Zorgen dat agents weten welke bundels ze moeten aanbieden als klanten bellen.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Reactief wachten tot de klant belt is gemiste omzet. Veel klanten bellen niet - ze raken gefrustreerd en switchen naar wifi of een concurrent. Proactieve, digitale actie op het moment van behoefte is effectiever.'
              },
              {
                id: 'tna4',
                label: 'Data-limiet notificatie sturen',
                description: 'Een SMS sturen dat de klant bijna door zijn data heen is, zonder specifiek aanbod.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Een waarschuwing zonder oplossing is incompleet. Je informeert over het probleem maar laat de klant zelf uitzoeken wat te doen. Dit is een halve actie - je mist de kans om direct waarde te bieden en de conversie makkelijk te maken.'
              }
            ]
          }
        }
      },
      {
        id: 'telecom-fraud-detection',
        title: 'Telecom: SIM-swap & subscription fraude',
        description: 'Detecteer frauduleuze SIM-swaps en identiteitsfraude real-time zonder legitieme klanten te hinderen.',
        icon: 'shield-alert',
        context: 'Je bent Fraud & Risk Manager bij een mobiele operator. Fraudeurs gebruiken social engineering voor SIM-swaps om bankrekeningen te plunderen, of openen abonnementen met gestolen identiteiten. Je moet verdachte patronen real-time detecteren en blokkeren zonder legitieme klanten te hinderen.',
        summary: 'Je hebt een real-time fraud detection systeem gebouwd. Door authenticatie-events, device data en gedragspatronen te integreren met een risk scoring model, kan het systeem automatisch verdachte transacties blokkeren of step-up verificatie triggeren - terwijl legitieme klanten naadloos doorgaan.',
        stages: {
          data: {
            id: 'telecom-fraud-data',
            title: 'Stap 1: De "Nouns" (Data)',
            instruction: 'Welke data-objecten zijn nodig om fraude real-time te detecteren?',
            options: [
              {
                id: 'tfd1',
                label: 'SIM-events, device fingerprints & geolocatie-patronen',
                description: 'Real-time SIM-swap requests en authenticatie-pogingen, device identifiers en kenmerken, plus historische en huidige locatiedata van het toestel.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Fraude-detectie vereist drie geïntegreerde data-objecten: transactie-events (SIM-swaps, authenticaties), device-identiteit (Fingerprints), en gedragscontext (Geolocatie). De Ontology correleert deze streams real-time: een SIM-swap request vanaf een nieuw device in een ander land dan waar de klant normaal is, triggert alerts.'
              },
              {
                id: 'tfd2',
                label: 'Maandelijks fraude-rapport',
                description: 'Een overzicht van bevestigde fraudegevallen van de afgelopen maand met schade-bedragen.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Historische fraude-rapporten tonen wat al gebeurd is, niet wat nu gebeurt. Fraude-schade is dan al geleden. Je hebt real-time transactie-streams nodig om fraude te stoppen voordat de schade ontstaat.'
              },
              {
                id: 'tfd3',
                label: 'Klant kredietscores',
                description: 'Externe kredietbureau data over de financiële betrouwbaarheid van klanten.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Kredietscores zijn relevant bij nieuwe aanvragen, maar helpen niet bij het detecteren van SIM-swap fraude op bestaande accounts. Een fraudeur die een SIM-swap doet, doet dat op het account van een legitieme klant met mogelijk uitstekende kredietwaardigheid.'
              },
              {
                id: 'tfd4',
                label: 'Call center gesprekslogs',
                description: 'Transcripties van alle gesprekken met de klantenservice.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Gesprekslogs kunnen achteraf helpen bij onderzoek, maar zijn te traag voor real-time detectie. Tegen de tijd dat je de transcriptie analyseert, is de SIM-swap al uitgevoerd en de bankrekening al geplunderd.'
              }
            ]
          },
          logic: {
            id: 'telecom-fraud-logic',
            title: 'Stap 2: De Redenering (Logic)',
            instruction: 'Hoe bepalen we of een transactie frauduleus is?',
            options: [
              {
                id: 'tfl1',
                label: 'Real-time risk scoring met adaptive thresholds',
                description: 'Een model dat elke transactie scoort op basis van meerdere risico-indicatoren (device, locatie, gedrag, timing) en dynamisch bepaalt of blokkering, step-up verificatie, of doorgang gepast is.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. Dit Logic-asset combineert meerdere signalen tot één risico-score en past de respons aan op basis van risico-niveau. Laag risico: doorgang. Medium risico: extra verificatie (bijv. video-ident). Hoog risico: blokkering + alert. De thresholds zijn adaptive - ze verschuiven op basis van nieuwe fraude-patronen.'
              },
              {
                id: 'tfl2',
                label: 'Blacklist matching',
                description: 'Checken of het device ID of telefoonnummer op een bekende fraudelijst staat.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Blacklists vangen alleen bekende fraudeurs, niet nieuwe. Professionele fraudeurs gebruiken steeds nieuwe devices en nummers. Je hebt gedragsanalyse nodig om ook onbekende fraude-patronen te detecteren.'
              },
              {
                id: 'tfl3',
                label: 'Vaste regels per transactietype',
                description: 'Alle SIM-swaps boven een bepaald bedrag automatisch blokkeren en handmatig laten reviewen.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Statische regels zijn te rigide. Ze blokkeren legitieme klanten (false positives) en missen fraudeurs die onder de drempel blijven (false negatives). Je hebt contextbewuste scoring nodig, niet one-size-fits-all drempels.'
              },
              {
                id: 'tfl4',
                label: 'Handmatige review van alle SIM-swaps',
                description: 'Elke SIM-swap request naar een fraud analyst sturen voor beoordeling.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Handmatige review van alle transacties is niet schaalbaar en te traag. Bij duizenden SIM-swaps per dag kun je niet elke handmatig checken. Bovendien willen legitieme klanten niet uren wachten op hun nieuwe SIM.'
              }
            ]
          },
          action: {
            id: 'telecom-fraud-action',
            title: 'Stap 3: De "Verbs" (Action)',
            instruction: 'Een SIM-swap request komt binnen vanaf een onbekend device, vanuit een locatie waar de klant nooit eerder was, 10 minuten na een password reset. Risk score: 94/100. Wat is de juiste actie?',
            options: [
              {
                id: 'tfa1',
                label: 'Blokkeer transactie, trigger verificatie & alert fraud team',
                description: 'Automatisch: (1) blokkeer de SIM-swap, (2) stuur notificatie naar het geregistreerde e-mailadres én backup telefoonnummer, (3) vereist video-identificatie voor doorgang, (4) creëer high-priority case voor fraud team.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. Dit is defense-in-depth via georchestreerde actie. De Ontology blokkeert de verdachte transactie, waarschuwt de legitieme accounthouder via een ander kanaal (zodat de fraudeur dit niet ziet), en biedt een veilige route voor verificatie als het toch legitiem is. Het fraud team krijgt de case voor onderzoek.'
              },
              {
                id: 'tfa2',
                label: 'SIM-swap doorvoeren en achteraf monitoren',
                description: 'De transactie laten doorgaan maar het account 24 uur extra monitoren op verdachte activiteit.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Bij een risk score van 94/100 is doorgang onacceptabel. Binnen minuten na een frauduleuze SIM-swap kan een bankrekening geplunderd worden. "Achteraf monitoren" betekent de schade bekijken nadat die al is aangericht.'
              },
              {
                id: 'tfa3',
                label: 'Email sturen om bevestiging te vragen',
                description: 'Een email naar de klant sturen met de vraag of zij deze SIM-swap hebben aangevraagd.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Als de fraudeur ook toegang heeft tot de email (vaak het geval bij account takeover), bevestigen ze zelf. Bovendien is email te traag - de fraudeur wacht niet tot de klant over 6 uur zijn inbox checkt. Je hebt directe blokkering nodig met out-of-band verificatie.'
              },
              {
                id: 'tfa4',
                label: 'Fraud alert loggen voor dagelijkse review',
                description: 'Een record aanmaken in het fraud management systeem voor analyse door het team morgenochtend.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Logging voor dagelijkse review is nuttig voor trends, maar lost de acute dreiging niet op. Een fraudeur met een score van 94/100 moet nu gestopt worden, niet morgen geanalyseerd. De bankrekening is dan allang leeg.'
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
                feedback: 'Correct. To model value, you need semantic objects representing market conditions (Rates) and operational reality (Cashflows). This forms the basis for the "Investment Decision" in finance theory. The Ontology integrates this data from heterogeneous sources (market data feeds, ERP systems, treasury platforms) into a uniform semantic model, enabling Logic models to work with it directly.'
              },
              {
                id: 'd2',
                label: 'Historical company performance (annual reports)',
                description: 'Aggregated financial ratios and narrative descriptions from the last 5 annual reports of the company itself.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While company performance seems relevant, annual reports are retrospective and aggregated. For DCF analysis you need forward-looking, granular operational cashflows, not historical summaries. Moreover, static PDF reports are "Data Graves" that cannot be bound to logic models in real-time.'
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
                feedback: 'Correct. This logic asset calculates the "Hurdle Rate" and "Net Present Value (NPV)". In the Ontology, this model is treated as a "tool" that AI or humans can call upon to reason about the data. Through "logic binding," this DCF function can run in different environments (cloud-based Python workbench, on-premises Excel model, or SaaS treasury platform) yet remain uniformly accessible via the Ontology layer.'
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
                label: 'LLM-based market forecasting',
                description: 'Using a Large Language Model to predict future stock prices by analyzing news headlines, earnings calls, and analyst reports.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. While LLMs can be valuable for processing unstructured data (news articles, sentiment), they are **non-deterministic** and can hallucinate with numerical predictions. For financial hurdle rate calculations you need **deterministic, mathematical logic** (like DCF) that is transparent, reproducible, and auditable. LLMs can *complement* these models (e.g., for risk narratives), but not replace them.'
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
                label: 'Auto-generate investment memo for compliance review',
                description: 'Trigger a workflow that generates a standardized memo for the compliance team to approve.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. While this is more operational than a blog post, it still introduces latency by requiring human approval. The Ontology "Action" means direct write-back to transactional systems (within governance guardrails), not waiting for compliance. In a well-designed system, compliance rules are already baked into the Logic layer.'
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
                label: 'Aggregated customer satisfaction scores by region',
                description: 'Monthly NPS (Net Promoter Score) reporting per regional branch, based on surveys.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. NPS scores are valuable for strategic trends, but they are too aggregated and too slow for operational churn prevention. You need granular, customer-specific data (instance-level) and real-time signals, not monthly regional averages. By the time you see a low NPS, individual high-value customers have already left.'
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
        context: `Titan Industries faces a disruption at a major supplier for raw materials needed for surgical masks. Demand is escalating. You must use the Enterprise Ontology to resolve this without breaking other production lines. Based on the Titan Industries example from the Palantir Ontology article (Krishnaswamy, 2024).`,
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
                label: 'Manual warehouse staff logbooks',
                description: 'Excel spreadsheets manually updated each shift by warehouse managers with their best estimate of inventory levels.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. While this data seems like what you need, manual logbooks are notoriously unreliable and not real-time. They reflect yesterday\'s observation, not current reality. For supply chain crisis management you need live, automated feeds from your ERP/WMS systems, not manual estimates that are stale the moment they are entered.'
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
                feedback: 'Correct. This effectively closes the loop. The decision made in the analysis layer is written back to the physical systems (Warehouse/ERP) that run the factory, ensuring the plan is actually executed. In practice, these types of critical actions are first "staged" as scenarios—a safe sandbox where teams can analyze the consequences (which orders get delayed? what costs arise?) before committing the decision. This combines speed with governance.'
              },
              {
                id: 'a2',
                label: 'Generate a CSV Report',
                description: 'Download a spreadsheet and email it to the factory floor manager.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. CSVs and emails are "digital exhaust". They break the chain of custody. If the manager misses the email, the action fails. Systems must talk to systems.'
              },
              {
                id: 'a3',
                label: 'Trigger dashboard alert for warehouse staff',
                description: 'Activate a real-time notification on warehouse dashboards informing staff of the reallocation plan.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. While a real-time alert is better than email, this still requires humans to read the notification and manually execute the plan. This introduces latency and human error. Ontology write-back should go directly to the systems (WMS, ERP) that control inventory and production, not to a dashboard for people.'
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
                label: 'Auto-schedule exit interview at next one-on-one',
                description: 'Automatically trigger an agenda item for an exit interview discussion at the next regular one-on-one meeting.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is passive and reactive management. You schedule exit interviews when someone has already decided to leave, not as a preventive measure. If the employee is at risk now, you want to *retain* them with a retention conversation and offer, not prepare for their departure. The Ontology should trigger proactive interventions, not defensive exit procedures.'
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
                feedback: 'Correct. This is kinetic finance. The system detects a financial drag and triggers an operational solution (Sale/Repair) via write-back to the relevant systems. Using scenarios, a financial controller can first simulate the impact ("If we discount this inventory by 30%, how much cash do we generate vs. how much margin do we lose?") before the clearance campaign goes live.'
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
      },
      {
        id: 'hotel-dynamic-pricing',
        title: 'Hospitality: Dynamic Room Pricing',
        description: 'Optimize RevPAR through real-time pricing adjustments based on demand and market conditions.',
        icon: 'hotel',
        context: 'You are the Revenue Manager at a hotel chain with 12 properties. Occupancy rates fluctuate significantly due to seasonality, local events, and competitor pricing. You must optimize room rates in real-time to maximize Revenue Per Available Room (RevPAR).',
        summary: 'You have built a dynamic pricing system that integrates live demand data with predictive models. Instead of manual price adjustments in spreadsheets, the system now automatically responds to market changes and pushes optimal rates to all booking channels.',
        stages: {
          data: {
            id: 'hotel-price-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects are essential to optimize room prices?',
            options: [
              {
                id: 'hpd1',
                label: 'Live booking data, competitor rates & event calendar',
                description: 'Real-time occupancy rates per room type, competitor prices via rate shoppers, and a calendar of local events (conferences, festivals, sports matches).',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. To optimize prices you need three semantic objects: your own demand (Bookings), the market (Competitor Rates), and demand drivers (Events). The Ontology integrates these real-time feeds from your PMS, rate shopping tools, and event databases into a unified model that Logic assets can consume.'
              },
              {
                id: 'hpd2',
                label: 'Monthly occupancy reports',
                description: 'A PDF with aggregated occupancy figures and average daily rates from the past month.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Monthly reports are "Data Graves" - retrospective and too slow for dynamic pricing. If you wait for the monthly report, you have already missed thousands of euros in potential revenue due to suboptimal pricing.'
              },
              {
                id: 'hpd3',
                label: 'TripAdvisor reviews',
                description: 'Guest ratings and scores from the past year.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Reviews are valuable for reputation management, but they do not predict short-term demand. For pricing you need forward-looking demand indicators, not backward-looking satisfaction scores.'
              },
              {
                id: 'hpd4',
                label: 'Historical weather data',
                description: 'Average temperatures and precipitation figures from the past 10 years.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Historical weather is not actionable for pricing. You need real-time weather forecasts (as a supplement to your core data), not historical averages that say nothing about next weekend.'
              }
            ]
          },
          logic: {
            id: 'hotel-price-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'Which model determines the optimal room price per night?',
            options: [
              {
                id: 'hpl1',
                label: 'Demand forecasting & price elasticity model',
                description: 'A machine learning model that predicts demand per room type/date and calculates the optimal price based on price elasticity and occupancy targets.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This Logic asset combines demand forecasting (how many rooms can we sell?) with price optimization (at what price do we maximize RevPAR?). The model weighs occupancy rate against average daily rate - sometimes a lower price with higher occupancy is more profitable than a high price with empty rooms.'
              },
              {
                id: 'hpl2',
                label: 'Fixed seasonal price list',
                description: 'An Excel table with three price levels: low season, high season, and peak season.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Static seasonal prices ignore daily demand fluctuations. A conference on Tuesday in the low season can generate higher demand than an average Saturday in the high season. You miss revenue by not responding to actual market conditions.'
              },
              {
                id: 'hpl3',
                label: 'Competitor-matching algorithm',
                description: 'Automatically match the price of the cheapest competitor, always €5 lower.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This leads to a race-to-the-bottom and ignores your own demand and value proposition. If your hotel is filling up you can charge premium prices - blindly following competitors leaves money on the table or causes unnecessary price wars.'
              },
              {
                id: 'hpl4',
                label: 'LLM-based price suggestion',
                description: 'Asking ChatGPT: "What is a good price for a hotel room in Amsterdam next week?"',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. LLMs do not have access to your real-time booking data or current market conditions. They can hallucinate about prices and lack the deterministic, mathematical optimization that revenue management requires. LLMs can help with generating price communication to guests.'
              }
            ]
          },
          action: {
            id: 'hotel-price-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'The model recommends a price increase for next weekend due to a large conference. What is the correct action?',
            options: [
              {
                id: 'hpa1',
                label: 'Push rate update to PMS and all OTA channels',
                description: 'Activate automatic rate push to the Property Management System, Booking.com, Expedia, and the hotel website via channel manager.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is the "Action" that closes the loop. The new price must be live on all sales channels within minutes. By writing back to PMS and channel manager you prevent rate parity issues and maximize the window of opportunity before competitors also adjust their prices.'
              },
              {
                id: 'hpa2',
                label: 'Email to revenue meeting',
                description: 'Send the pricing recommendation to the revenue team for discussion in the weekly meeting.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Waiting for a meeting introduces days of delay. In hospitality, market conditions change by the hour - by the time the team meets, the conference may already be fully booked at competitors at higher prices.'
              },
              {
                id: 'hpa3',
                label: 'Update dashboard indicator',
                description: 'Change the "pricing opportunity" indicator from green to orange in the management dashboard.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. A dashboard change is passive visualization, not action. Guests do not book through your dashboard - they book via Booking.com where your old price is still listed.'
              },
              {
                id: 'hpa4',
                label: 'Document price change proposal',
                description: 'Generate a memo with the rationale for the price change for archiving and compliance.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Documentation is important but not a primary action. In a well-designed Ontology, the audit trail is automatically generated as a byproduct of the price change, not as a replacement for it.'
              }
            ]
          }
        }
      },
      {
        id: 'guest-service-recovery',
        title: 'Hospitality: Guest Experience & Service Recovery',
        description: 'Identify dissatisfied VIP guests in real-time and activate service recovery before they check out.',
        icon: 'heart',
        context: 'You are the Guest Experience Director at a luxury resort. A high-value guest has just posted a negative comment on social media while still staying at the hotel. You must identify dissatisfied guests with high lifetime value and intervene immediately before they check out and leave negative reviews.',
        summary: 'You have built a proactive service recovery system. By integrating guest profiles, in-stay feedback, and social media with a prioritization model, the system can automatically trigger the right intervention - from a personal apology by the GM to a complimentary spa treatment.',
        stages: {
          data: {
            id: 'guest-recovery-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects form the complete "Guest 360" view for service recovery?',
            options: [
              {
                id: 'grd1',
                label: 'Guest profile, in-stay touchpoints & social media mentions',
                description: 'Loyalty status and lifetime value from CRM, real-time service interactions (room service, spa, complaints), and social listening feeds for hotel mentions.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Effective service recovery requires three integrated data objects: who the guest is (Profile/Value), what happens during their stay (Touchpoints), and external signals (Social Media). The Ontology connects PMS, CRM, service logs, and social listening into one semantic guest object.'
              },
              {
                id: 'grd2',
                label: 'Quarterly NPS scores',
                description: 'Aggregated Net Promoter Scores from post-stay surveys, broken down by department.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. NPS surveys come too late - the guest has already left. For in-stay recovery you need real-time signals, not retrospective aggregations. By the time you see the NPS, the negative review has already been posted.'
              },
              {
                id: 'grd3',
                label: 'Booking channel information',
                description: 'Which OTA or direct channel the guest booked through.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. The booking channel is relevant for marketing attribution, but says nothing about the guest\'s current satisfaction or the urgency of intervention.'
              },
              {
                id: 'grd4',
                label: 'Room type and price paid',
                description: 'Which room category the guest has and the rate per night.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. This is transactional data that helps with upselling, but not with detecting dissatisfaction. A guest in the most expensive suite can be just as dissatisfied as a guest in a standard room.'
              }
            ]
          },
          logic: {
            id: 'guest-recovery-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we determine which guests get priority for service recovery?',
            options: [
              {
                id: 'grl1',
                label: 'Guest risk scoring model',
                description: 'A model that combines sentiment signals with guest value to calculate a "recovery priority score": high value + negative sentiment = highest priority.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This Logic asset weighs two dimensions: potential damage (guest value, social media reach) and urgency (sentiment, check-out date). A dissatisfied influencer with 100K followers checking out tomorrow gets higher priority than a first-time guest with a minor complaint.'
              },
              {
                id: 'grl2',
                label: 'Chronological complaint handling',
                description: 'Handle complaints in order of receipt: first-in, first-out.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. FIFO logic ignores urgency and impact. A VIP checking out in 2 hours with a serious complaint should take priority over a guest who made a minor remark yesterday and is staying 5 more nights.'
              },
              {
                id: 'grl3',
                label: 'Keyword matching on complaints',
                description: 'Search for words like "terrible", "never again" and "disappointed" in feedback.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Simple keyword matching misses context and nuance. "It was not terrible" is positive, but matches on "terrible". Moreover, this does not weigh how valuable the guest is - you treat a first-time guest the same as a platinum member.'
              },
              {
                id: 'grl4',
                label: 'LLM-generated empathetic response',
                description: 'Use a Large Language Model to automatically generate an apology email.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. This confuses Logic (reasoning/prioritizing) with Action (executing). First you must determine *if* and *how urgently* you need to intervene - only then comes the question of how you communicate. An LLM can help formulate the message, but not determine the priority.'
              }
            ]
          },
          action: {
            id: 'guest-recovery-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'A platinum member with a high social media following has just posted a negative tweet about a bad room service experience. Check-out is in 4 hours. What is the correct action?',
            options: [
              {
                id: 'gra1',
                label: 'Trigger multi-channel recovery workflow',
                description: 'Automatically: (1) alert to GM mobile for personal visit, (2) complimentary amenity order to room service, (3) upgrade check in PMS for possible room improvement, (4) notification to social media team for monitoring.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is orchestrated action via write-back to multiple systems. The Ontology coordinates parallel interventions: human touch (GM alert), tangible compensation (amenity), and reputation management (social monitoring). Each action is logged for the audit trail.'
              },
              {
                id: 'gra2',
                label: 'Send standard apology email',
                description: 'Send an automatic template email with apologies and a 10% discount code for a next stay.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. A generic email is too impersonal for a high-value guest with an acute problem. Moreover, a discount code for "next time" does not help if the guest is leaving in 4 hours and is currently dissatisfied. The intervention must be in-stay, not post-stay.'
              },
              {
                id: 'gra3',
                label: 'Create case in CRM for follow-up',
                description: 'Log a ticket so the guest relations team can pick it up during office hours.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is too slow and passive. The guest is checking out in 4 hours - "office hours" and "ticket queues" are not relevant. The action must happen now, not when someone checks the queue.'
              },
              {
                id: 'gra4',
                label: 'Post reply on the tweet',
                description: 'Directly respond publicly on Twitter with apologies and a request to send a DM.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Public social media response without first solving the problem is risky - it can escalate. The primary action must improve the guest experience in the hotel. Social media response can be part of the workflow, but not the only or first action.'
              }
            ]
          }
        }
      },
      {
        id: 'workforce-scheduling',
        title: 'Hospitality: Demand-Driven Workforce Planning',
        description: 'Optimize staffing levels based on predicted demand to optimize both service levels and labor costs.',
        icon: 'calendar-clock',
        context: 'You are the Operations Manager at a large conference hotel. Labor costs are your biggest expense (35% of revenue). You must align staffing levels with fluctuating demand from conferences, weddings, and leisure guests - without overstaffing (cost waste) or understaffing (service gaps).',
        summary: 'You have built a demand-driven workforce planning system. By linking demand forecasting to labor rules and the scheduling system, the system automatically generates optimal schedules that guarantee service levels within the labor budget.',
        stages: {
          data: {
            id: 'workforce-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects are needed for demand-driven workforce planning?',
            options: [
              {
                id: 'wfd1',
                label: 'Event bookings, historical patterns & employee availability',
                description: 'Scheduled conferences/weddings with expected covers, historical labor hours per revenue level, and real-time availability/contract hours of employees.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Workforce planning requires three integrated objects: future demand (Event Bookings), the translation to labor (Historical Labor Ratios), and constraints (Employee Availability). The Ontology connects your event management system, POS/PMS data, and HR system into one planning-ready dataset.'
              },
              {
                id: 'wfd2',
                label: 'Last year\'s staff schedule',
                description: 'Excel export of all shifts worked last year.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Historical schedules show what you *did*, not what you *needed*. If you were structurally over- or understaffed last year, you reproduce those mistakes. You need the relationship between demand and required labor, not old schedules.'
              },
              {
                id: 'wfd3',
                label: 'Employee satisfaction scores',
                description: 'Annual employee engagement survey results by department.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Employee satisfaction is important for HR strategy, but not for operational scheduling. It does not tell you how many people you need Friday for the conference of 500 people.'
              },
              {
                id: 'wfd4',
                label: 'Salary costs per employee',
                description: 'Hourly rates and premiums from the payroll system.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Cost data is relevant for budgeting, but does not solve the core problem: how many people do you need when? First you determine the required staffing, then you can calculate costs. This is input for later optimization, not for demand forecasting.'
              }
            ]
          },
          logic: {
            id: 'workforce-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we determine optimal staffing levels per day and shift?',
            options: [
              {
                id: 'wfl1',
                label: 'Demand-to-labor model with constraint optimization',
                description: 'A model that translates expected covers/check-ins to required FTEs per role, accounting for labor rules (max hours, breaks, skills) and service level targets.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This Logic asset combines demand forecasting with constraint optimization. It calculates not only how many people you need, but also which combination of shifts and employees meets all rules (collective labor agreement, availability, skills) while minimizing budget.'
              },
              {
                id: 'wfl2',
                label: 'Fixed staffing ratio per department',
                description: 'Always 1 server per 20 covers, 1 receptionist per 50 rooms, regardless of the day.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Static ratios ignore variability. Check-in peak moments, conferences with complex F&B, or a quiet Tuesday evening all require different staffing. A "one-size-fits-all" ratio leads to structural over- or understaffing.'
              },
              {
                id: 'wfl3',
                label: 'Manager intuition and experience',
                description: 'The operations manager creates schedules based on years of experience and "gut feeling".',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Human intuition is valuable but not scalable or consistent. It cannot optimize all variables (events, weather, historical patterns, availability of 200 employees) simultaneously. Moreover, the knowledge is not transferable when the manager leaves.'
              },
              {
                id: 'wfl4',
                label: 'LLM-generated schedule proposal',
                description: 'Ask ChatGPT to create a schedule based on a textual description of the week.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. LLMs cannot reliably optimize under constraints. They do not know your collective labor agreement rules, have no access to employee availability, and can hallucinate about shift times. Workforce scheduling requires deterministic constraint solving, not probabilistic text generation.'
              }
            ]
          },
          action: {
            id: 'workforce-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'The model has calculated optimal staffing for a busy conference weekend. What is the correct action?',
            options: [
              {
                id: 'wfa1',
                label: 'Push schedule to workforce management & notify employees',
                description: 'Automatically: (1) publish the optimized schedule in the WFM system, (2) send shift notifications to employee apps, (3) mark open shifts for filling, (4) alert manager for understaffing that cannot be automatically resolved.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is end-to-end workforce automation. The Ontology writes the schedule to the WFM system, triggers notifications to employees, and only escalates exceptions to managers. The loop from demand to staffing to communication is closed without manual intervention.'
              },
              {
                id: 'wfa2',
                label: 'Email schedule proposal to department heads',
                description: 'Send an Excel attachment to F&B manager, housekeeping manager, and front office manager for review and adjustment.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This introduces delay and fragmentation. Each manager adjusts locally without seeing the whole picture, leading to suboptimization. Moreover, someone must manually enter the Excel changes back into the system.'
              },
              {
                id: 'wfa3',
                label: 'Update dashboard with staffing indicators',
                description: 'Refresh the "staffing health" metrics in the operations dashboard.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Showing a dashboard is informative but not action. Employees still do not know when they need to work. Visualization should be a byproduct of the action, not the action itself.'
              },
              {
                id: 'wfa4',
                label: 'Call temp agency for extra staff',
                description: 'Manually contact the temp agency to cover expected understaffing.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. This is a reactive, manual workaround. In an Ontology-driven system, the need for temp workers would be automatically detected, and the order would go via API to the temp agency (or to a flex-pool platform). Making phone calls is not scalable.'
              }
            ]
          }
        }
      },
      {
        id: 'telecom-churn-prevention',
        title: 'Telecom: Churn Prevention & Retention',
        description: 'Identify customers at risk of churning and proactively make a personalized retention offer.',
        icon: 'user-x',
        context: 'You are the Customer Value Director at a major mobile provider. You notice that customers with expiring contracts are increasingly switching to competitors. You must identify high-value customers at churn risk and proactively make a personalized retention offer before they cancel.',
        summary: 'You have built a proactive retention system. By integrating usage data, contract status, and service history with a churn prediction model, the system can automatically identify the right customers and trigger a personalized offer through their preferred channel.',
        stages: {
          data: {
            id: 'telecom-churn-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects are needed to identify customers at churn risk?',
            options: [
              {
                id: 'tcd1',
                label: 'Usage patterns, contract status & service interactions',
                description: 'Real-time data/call/SMS usage, contract expiration date and remaining term, plus all customer service contacts (complaints, inquiries, NPS scores).',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Churn prevention requires three integrated data objects: behavior (Usage Patterns), contractual status (Term/Expiration Dates), and sentiment (Service Interactions). The Ontology connects your billing system, CRM, and contact center data into one customer object that detects behavioral changes in real-time.'
              },
              {
                id: 'tcd2',
                label: 'Monthly churn report',
                description: 'An Excel report showing the number of cancellations per region from the past month.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Monthly reports show who has already left, not who is about to leave. This is retrospective data - you cannot retain a customer who has already cancelled. You need predictive signals, not historical counts.'
              },
              {
                id: 'tcd3',
                label: 'Market share statistics',
                description: 'External market research data on the market share of all providers in the country.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Market share is strategic information, but does not help identify individual customers at churn risk. You need customer-specific data at instance level, not aggregated market trends.'
              },
              {
                id: 'tcd4',
                label: 'Network coverage maps',
                description: 'Geographic data on 4G/5G coverage per postal code.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Coverage data is relevant for network planning, but does not predict whether a specific customer will leave. A customer in an area with perfect coverage can still churn due to price or service issues.'
              }
            ]
          },
          logic: {
            id: 'telecom-churn-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we determine which customers get priority for retention efforts?',
            options: [
              {
                id: 'tcl1',
                label: 'Churn probability × Customer Lifetime Value model',
                description: 'A model that calculates the probability of departure for each customer and multiplies it by their expected lifetime value to generate a "retention priority score".',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This Logic asset combines two dimensions: risk (how likely is churn?) and value (how much is this customer worth?). A customer with 80% churn probability but €10/month value gets lower priority than a customer with 40% churn probability and €80/month value. This maximizes the ROI of retention efforts.'
              },
              {
                id: 'tcl2',
                label: 'Contract expiration date sorting',
                description: 'Sort customers by when their contract expires and start with those expiring first.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Contract expiration date alone is too simplistic. Not everyone with an expiring contract leaves, and some customers leave mid-contract (and pay the penalty). You miss the nuance of behavioral change and customer value.'
              },
              {
                id: 'tcl3',
                label: 'Complaint counter',
                description: 'Flag customers with more than 3 complaints in the past 6 months as at-risk.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. A simple threshold misses context. Some customers complain frequently but stay loyal; others say nothing and leave quietly. Moreover, this does not factor in how valuable the customer is.'
              },
              {
                id: 'tcl4',
                label: 'LLM analysis of customer conversations',
                description: 'Have ChatGPT read all call center transcripts to determine who sounds dissatisfied.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. LLMs can help with sentiment extraction as input for your model, but are not suitable as primary decision logic. They lack the structure to quantify churn probability and cannot reliably prioritize based on customer value. Moreover, this is not scalable for millions of customers.'
              }
            ]
          },
          action: {
            id: 'telecom-churn-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'A high-value customer with high churn risk has been identified. Contract expires in 3 weeks. What is the correct action?',
            options: [
              {
                id: 'tca1',
                label: 'Trigger personalized offer via preferred channel',
                description: 'Automatically: (1) generate a tailored offer based on usage profile, (2) push to preferred channel (app/email/SMS), (3) if no response: escalate to outbound call with script and offer in CRM, (4) log all interactions.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is multi-channel retention orchestration. The Ontology determines the best offer (e.g., more data, lower price, new device) based on the customer profile, and activates it through the channel where this customer responds best. The call center agent sees the offer directly in the CRM when the customer calls.'
              },
              {
                id: 'tca2',
                label: 'Bulk retention email to all expiring contracts',
                description: 'Send a standard "stay with us" email to everyone whose contract expires this month.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Bulk communication is not personalized and reaches the wrong customers. You send the same offer to someone who is satisfied (waste) as to someone with specific complaints (not relevant). Moreover, email is often not the most effective channel for high-value customers.'
              },
              {
                id: 'tca3',
                label: 'Add customer to retention list for monthly review',
                description: 'Mark the customer in a spreadsheet so the retention team can call them during the next calling campaign.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Waiting for a monthly review introduces fatal delay. With a contract expiring in 3 weeks, you must act now. By the time of the review, the customer may have already switched to a competitor.'
              },
              {
                id: 'tca4',
                label: 'Dashboard alert for management',
                description: 'Send a notification to the management dashboard that there is a high-value customer at churn risk.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Informing management is not a customer-facing action. The customer does not notice this and it does not solve the problem. Action must go directly to the customer or to the frontline employee who has contact.'
              }
            ]
          }
        }
      },
      {
        id: 'telecom-next-best-offer',
        title: 'Telecom: Next Best Offer & Upselling',
        description: 'Identify the optimal bundle or add-on for each customer and offer it at the right moment.',
        icon: 'gift',
        context: 'You are the Commercial Director at a telecom operator. Customers are often on bundles that do not match their actual usage - some pay too much (and are dissatisfied), others run into limits (and are frustrated). You must identify the optimal bundle or add-on in real-time and offer it at the right moment.',
        summary: 'You have built an intelligent upselling system. By linking real-time usage data to a propensity-to-buy model, the system can automatically present the right offer at the right time through the right channel - when the customer is most receptive.',
        stages: {
          data: {
            id: 'telecom-nbo-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects are needed to determine the right offer for each customer?',
            options: [
              {
                id: 'tnd1',
                label: 'Real-time usage, current bundle & app behavior',
                description: 'Live data/call/SMS consumption vs. bundle limits, roaming behavior, device type, and browse/click behavior in the self-service app.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Next-best-offer requires three integrated data objects: current consumption (Usage), context (Current bundle & device), and engagement signals (App behavior). The Ontology connects your rating engine, product catalog, and app analytics to detect in real-time when a customer hits limits or shows interest.'
              },
              {
                id: 'tnd2',
                label: 'Sales figures per bundle type',
                description: 'Monthly report of how many of each bundle were sold.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Aggregated sales figures tell you what is popular in general, not what is relevant for a specific customer. Customer A who calls a lot needs a different "next best offer" than customer B who uses a lot of data.'
              },
              {
                id: 'tnd3',
                label: 'Competitor offers',
                description: 'An overview of current promotions and bundles from competitors.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Competitor information is useful for pricing strategy, but does not help determine the best offer for an individual customer based on their specific usage pattern.'
              },
              {
                id: 'tnd4',
                label: 'Demographic customer data',
                description: 'Age, gender, and location of the customer from the CRM.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Demographic data can help with segmentation, but behavior is a much better predictor of need. A 25-year-old who barely uses data does not need an unlimited bundle, even if the stereotype suggests otherwise.'
              }
            ]
          },
          logic: {
            id: 'telecom-nbo-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we determine which offer to make to which customer?',
            options: [
              {
                id: 'tnl1',
                label: 'Propensity model + next-best-offer engine',
                description: 'A model that calculates the purchase probability for each possible offer per customer, and selects the option with the highest expected value (probability × margin).',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This Logic asset combines probability calculation (how likely will this customer accept this offer?) with value optimization (which offer maximizes lifetime value?). It prevents giving a discount to a customer who would upgrade anyway, or making an offer with no interest.'
              },
              {
                id: 'tnl2',
                label: 'Fixed upsell ladder',
                description: 'Always offer customers the next more expensive bundle.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. A linear upsell ladder ignores customer behavior. Sometimes an add-on (e.g., roaming package) is more relevant than a larger bundle. Sometimes you need to downsell to prevent churn from a dissatisfied customer who is paying too much.'
              },
              {
                id: 'tnl3',
                label: 'Push highest margin bundle',
                description: 'Always offer the bundle where the provider makes the highest margin.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Margin optimization without customer relevance leads to irritation and churn. Offering a customer who uses 2GB an unlimited bundle at €50 will not convert and damages the relationship. You optimize for expected value (probability × margin), not just margin.'
              },
              {
                id: 'tnl4',
                label: 'A/B test all offers',
                description: 'Randomly show different offers and see which converts best.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Pure A/B testing without personalization is inefficient and can frustrate customers with irrelevant offers. You need a model that learns from behavior and personalizes, not one that blindly experiments on each individual customer.'
              }
            ]
          },
          action: {
            id: 'telecom-nbo-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'A customer has used 95% of their data bundle with 10 days left. The model identifies an upgrade as the best option. What is the correct action?',
            options: [
              {
                id: 'tna1',
                label: 'Real-time in-app offer with one-click upgrade',
                description: 'Automatically: (1) show contextual banner in the app when customer checks usage, (2) pre-populate upgrade with current details, (3) enable one-click activation, (4) on acceptance: immediately process in billing system.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is contextual commerce at the moment of maximum relevance. The customer experiences a problem (running out of data), opens the app to check, and immediately gets a solution presented that can be activated with one click. The Ontology writes the upgrade directly to the billing system - no manual processing.'
              },
              {
                id: 'tna2',
                label: 'Send email with bundle overview',
                description: 'Send an email with an overview of all available bundles and prices.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Email is too slow and too generic for this moment. The customer has a problem now and is in the app. An email with all options (choice overload) might reach them tomorrow. The moment for action is now, in the channel where the customer already is.'
              },
              {
                id: 'tna3',
                label: 'Train call center agents on upselling',
                description: 'Ensure agents know which bundles to offer when customers call.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Reactively waiting for the customer to call is missed revenue. Many customers do not call - they get frustrated and switch to wifi or a competitor. Proactive, digital action at the moment of need is more effective.'
              },
              {
                id: 'tna4',
                label: 'Send data limit notification',
                description: 'Send an SMS that the customer is almost out of data, without a specific offer.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. A warning without a solution is incomplete. You inform about the problem but leave the customer to figure out what to do. This is half an action - you miss the opportunity to provide direct value and make conversion easy.'
              }
            ]
          }
        }
      },
      {
        id: 'telecom-fraud-detection',
        title: 'Telecom: SIM-swap & Subscription Fraud',
        description: 'Detect fraudulent SIM-swaps and identity fraud in real-time without hindering legitimate customers.',
        icon: 'shield-alert',
        context: 'You are the Fraud & Risk Manager at a mobile operator. Fraudsters use social engineering for SIM-swaps to drain bank accounts, or open subscriptions with stolen identities. You must detect suspicious patterns in real-time and block them without hindering legitimate customers.',
        summary: 'You have built a real-time fraud detection system. By integrating authentication events, device data, and behavioral patterns with a risk scoring model, the system can automatically block suspicious transactions or trigger step-up verification - while legitimate customers proceed seamlessly.',
        stages: {
          data: {
            id: 'telecom-fraud-data',
            title: 'Step 1: The "Nouns" (Data)',
            instruction: 'Which data objects are needed to detect fraud in real-time?',
            options: [
              {
                id: 'tfd1',
                label: 'SIM events, device fingerprints & geolocation patterns',
                description: 'Real-time SIM-swap requests and authentication attempts, device identifiers and characteristics, plus historical and current location data of the device.',
                category: 'DATA',
                isCorrect: true,
                feedback: 'Correct. Fraud detection requires three integrated data objects: transaction events (SIM-swaps, authentications), device identity (Fingerprints), and behavioral context (Geolocation). The Ontology correlates these streams in real-time: a SIM-swap request from a new device in a different country than where the customer normally is, triggers alerts.'
              },
              {
                id: 'tfd2',
                label: 'Monthly fraud report',
                description: 'An overview of confirmed fraud cases from the past month with damage amounts.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Historical fraud reports show what has already happened, not what is happening now. Fraud damage has already been done. You need real-time transaction streams to stop fraud before the damage occurs.'
              },
              {
                id: 'tfd3',
                label: 'Customer credit scores',
                description: 'External credit bureau data on the financial reliability of customers.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Credit scores are relevant for new applications, but do not help detect SIM-swap fraud on existing accounts. A fraudster doing a SIM-swap does so on the account of a legitimate customer who may have excellent creditworthiness.'
              },
              {
                id: 'tfd4',
                label: 'Call center conversation logs',
                description: 'Transcripts of all conversations with customer service.',
                category: 'DATA',
                isCorrect: false,
                feedback: 'Incorrect. Conversation logs can help with investigation after the fact, but are too slow for real-time detection. By the time you analyze the transcript, the SIM-swap has already been executed and the bank account already drained.'
              }
            ]
          },
          logic: {
            id: 'telecom-fraud-logic',
            title: 'Step 2: The Reasoning (Logic)',
            instruction: 'How do we determine if a transaction is fraudulent?',
            options: [
              {
                id: 'tfl1',
                label: 'Real-time risk scoring with adaptive thresholds',
                description: 'A model that scores each transaction based on multiple risk indicators (device, location, behavior, timing) and dynamically determines whether blocking, step-up verification, or passage is appropriate.',
                category: 'LOGIC',
                isCorrect: true,
                feedback: 'Correct. This Logic asset combines multiple signals into one risk score and adjusts the response based on risk level. Low risk: passage. Medium risk: extra verification (e.g., video-ident). High risk: blocking + alert. The thresholds are adaptive - they shift based on new fraud patterns.'
              },
              {
                id: 'tfl2',
                label: 'Blacklist matching',
                description: 'Check if the device ID or phone number is on a known fraud list.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Blacklists only catch known fraudsters, not new ones. Professional fraudsters constantly use new devices and numbers. You need behavioral analysis to detect unknown fraud patterns as well.'
              },
              {
                id: 'tfl3',
                label: 'Fixed rules per transaction type',
                description: 'Automatically block all SIM-swaps above a certain amount and have them manually reviewed.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Static rules are too rigid. They block legitimate customers (false positives) and miss fraudsters who stay below the threshold (false negatives). You need context-aware scoring, not one-size-fits-all thresholds.'
              },
              {
                id: 'tfl4',
                label: 'Manual review of all SIM-swaps',
                description: 'Send every SIM-swap request to a fraud analyst for assessment.',
                category: 'LOGIC',
                isCorrect: false,
                feedback: 'Incorrect. Manual review of all transactions is not scalable and too slow. With thousands of SIM-swaps per day, you cannot manually check each one. Moreover, legitimate customers do not want to wait hours for their new SIM.'
              }
            ]
          },
          action: {
            id: 'telecom-fraud-action',
            title: 'Step 3: The "Verbs" (Action)',
            instruction: 'A SIM-swap request comes in from an unknown device, from a location where the customer has never been before, 10 minutes after a password reset. Risk score: 94/100. What is the correct action?',
            options: [
              {
                id: 'tfa1',
                label: 'Block transaction, trigger verification & alert fraud team',
                description: 'Automatically: (1) block the SIM-swap, (2) send notification to the registered email address and backup phone number, (3) require video identification for passage, (4) create high-priority case for fraud team.',
                category: 'ACTION',
                isCorrect: true,
                feedback: 'Correct. This is defense-in-depth via orchestrated action. The Ontology blocks the suspicious transaction, alerts the legitimate account holder via a different channel (so the fraudster does not see it), and provides a safe route for verification if it is legitimate after all. The fraud team gets the case for investigation.'
              },
              {
                id: 'tfa2',
                label: 'Process SIM-swap and monitor afterwards',
                description: 'Let the transaction go through but monitor the account for 24 hours for suspicious activity.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. At a risk score of 94/100, passage is unacceptable. Within minutes of a fraudulent SIM-swap, a bank account can be drained. "Monitoring afterwards" means watching the damage after it has already been done.'
              },
              {
                id: 'tfa3',
                label: 'Send email to ask for confirmation',
                description: 'Send an email to the customer asking if they requested this SIM-swap.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. If the fraudster also has access to the email (often the case with account takeover), they confirm it themselves. Moreover, email is too slow - the fraudster is not waiting for the customer to check their inbox 6 hours later. You need immediate blocking with out-of-band verification.'
              },
              {
                id: 'tfa4',
                label: 'Log fraud alert for daily review',
                description: 'Create a record in the fraud management system for analysis by the team tomorrow morning.',
                category: 'ACTION',
                isCorrect: false,
                feedback: 'Incorrect. Logging for daily review is useful for trends, but does not address the acute threat. A fraudster with a score of 94/100 must be stopped now, not analyzed tomorrow. The bank account will be long empty by then.'
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
  cart: <ShoppingCart className="w-6 h-6" />,
  hotel: <Hotel className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  'calendar-clock': <CalendarClock className="w-6 h-6" />,
  'user-x': <UserX className="w-6 h-6" />,
  gift: <Gift className="w-6 h-6" />,
  'shield-alert': <ShieldAlert className="w-6 h-6" />
};