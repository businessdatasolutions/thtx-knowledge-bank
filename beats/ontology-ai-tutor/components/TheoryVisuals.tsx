import React from 'react';
import { Database, Server, Smartphone, Layers, ArrowUp, ArrowRight } from 'lucide-react';
import { Language } from '../types';

const AtomSVG = ({ colorClass, label, subLabel }: { colorClass: string, label: string, subLabel: string }) => {
  // Color mapping configuration
  const colors = {
    blue: { bg: 'bg-blue-50', stroke: 'stroke-blue-400', fill: 'fill-blue-500', text: 'text-blue-900', border: 'border-blue-100' },
    purple: { bg: 'bg-purple-50', stroke: 'stroke-purple-400', fill: 'fill-purple-500', text: 'text-purple-900', border: 'border-purple-100' },
    emerald: { bg: 'bg-emerald-50', stroke: 'stroke-emerald-400', fill: 'fill-emerald-500', text: 'text-emerald-900', border: 'border-emerald-100' },
  };
  const c = colors[colorClass as keyof typeof colors];

  return (
    <div className={`flex flex-col items-center p-6 rounded-2xl ${c.bg} border ${c.border} shadow-sm w-full md:flex-1 transition-transform hover:scale-105 duration-300`}>
        <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
            {/* Static background circle */}
            <div className={`absolute inset-0 rounded-full opacity-20 ${c.bg} bg-white`} />
            
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow absolute inset-0">
                {/* Orbits */}
                <ellipse cx="50" cy="50" rx="45" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none" className={`${c.stroke} opacity-70`} transform="rotate(0 50 50)" />
                <ellipse cx="50" cy="50" rx="45" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none" className={`${c.stroke} opacity-70`} transform="rotate(60 50 50)" />
                <ellipse cx="50" cy="50" rx="45" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none" className={`${c.stroke} opacity-70`} transform="rotate(120 50 50)" />

                {/* Electrons */}
                <circle cx="95" cy="50" r="3" className={c.fill} transform="rotate(0 50 50)" />
                <circle cx="27" cy="11" r="3" className={c.fill} transform="rotate(60 50 50)" />
                <circle cx="27" cy="89" r="3" className={c.fill} transform="rotate(120 50 50)" />
            </svg>
             {/* Nucleus */}
             <circle cx="50" cy="50" r="5" className={`${c.fill} opacity-90`} />
             <div className="w-4 h-4 rounded-full bg-current absolute" />
        </div>
        <h3 className={`text-2xl font-bold ${c.text} mb-1`}>{label}</h3>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 opacity-80">{subLabel}</p>
    </div>
  );
};

export const DecisionAtoms: React.FC<{lang: Language}> = ({ lang }) => {
  const t = {
    EN: { nouns: "The Nouns", reasoning: "The Reasoning", verbs: "The Verbs" },
    NL: { nouns: "De Nouns", reasoning: "De Redenering", verbs: "De Verbs" }
  };
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full my-8">
      <AtomSVG colorClass="blue" label="DATA" subLabel={t[lang].nouns} />
      <AtomSVG colorClass="purple" label="LOGIC" subLabel={t[lang].reasoning} />
      <AtomSVG colorClass="emerald" label="ACTION" subLabel={t[lang].verbs} />
    </div>
  );
};

export const CrispDmMapping: React.FC<{lang: Language}> = ({ lang }) => {
  const t = {
    EN: {
      headerPhase: "CRISP-DM Phase",
      headerOntology: "Ontology Element",
      headerExplain: "Mapping Explanation",
      mappingTo: "MAPPING TO",
      dContext: "Decision Context",
      dContextDesc: "Defines the 'Why' and the objective of the decision.",
      dataDesc: "The semantic objects representing business reality (cleaning and unifying).",
      logicDesc: "The tools, AI models, and simulations used to reason about the data.",
      actionDesc: "Closing the loop by securely writing decisions back to operational systems (write-back).",
      dataLabel: "DATA (The Nouns)",
      logicLabel: "LOGIC (The Reasoning)",
      actionLabel: "ACTION (The Verbs)"
    },
    NL: {
      headerPhase: "CRISP-DM Fase",
      headerOntology: "Ontology Element",
      headerExplain: "Uitleg Mapping",
      mappingTo: "MAPPING NAAR",
      dContext: "Decision Context",
      dContextDesc: "Definieert de 'Why' en de doelstelling van de beslissing.",
      dataDesc: "De semantische objecten die de bedrijfsrealiteit weergeven (cleaning en unifying).",
      logicDesc: "De tools, AI-modellen en simulaties die gebruikt worden om te redeneren over de data.",
      actionDesc: "De loop sluiten door beslissingen veilig terug te schrijven (write-back) naar operationele systemen.",
      dataLabel: "DATA (De Nouns)",
      logicLabel: "LOGIC (De Redenering)",
      actionLabel: "ACTION (De Werkwoorden)"
    }
  };
  const text = t[lang];

  return (
  <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm my-8">
    <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
      <h3 className="font-bold text-slate-700">Framework Mapping: CRISP-DM vs. Ontology</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 text-sm">
        {/* Header */}
        <div className="hidden md:block md:col-span-4 p-4 font-bold text-slate-500 uppercase tracking-wider border-b bg-slate-50/50">{text.headerPhase}</div>
        <div className="hidden md:block md:col-span-4 p-4 font-bold text-slate-500 uppercase tracking-wider border-b border-l bg-slate-50/50">{text.headerOntology}</div>
        <div className="hidden md:block md:col-span-4 p-4 font-bold text-slate-500 uppercase tracking-wider border-b border-l bg-slate-50/50">{text.headerExplain}</div>

        {/* Row 1 */}
        <div className="col-span-1 md:col-span-4 p-4 border-b font-bold md:font-medium text-slate-800 bg-slate-50 md:bg-white">Business Understanding</div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-l text-slate-600 bg-slate-50/30 flex items-center gap-2">
            <span className="md:hidden font-bold text-slate-400 text-xs">{text.mappingTo}:</span> {text.dContext}
        </div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-l text-slate-600">{text.dContextDesc}</div>

        {/* Row 2 */}
        <div className="col-span-1 md:col-span-4 p-4 border-b font-bold md:font-medium text-slate-800 bg-slate-50 md:bg-white">Data Understanding & Preparation</div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-l font-bold text-blue-600 bg-blue-50/30 flex items-center gap-2">
            <span className="md:hidden font-bold text-slate-400 text-xs">{text.mappingTo}:</span> {text.dataLabel}
        </div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-l text-slate-600">{text.dataDesc}</div>

        {/* Row 3 */}
        <div className="col-span-1 md:col-span-4 p-4 border-b font-bold md:font-medium text-slate-800 bg-slate-50 md:bg-white">Modeling & Evaluation</div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-l font-bold text-purple-600 bg-purple-50/30 flex items-center gap-2">
            <span className="md:hidden font-bold text-slate-400 text-xs">{text.mappingTo}:</span> {text.logicLabel}
        </div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-l text-slate-600">{text.logicDesc}</div>

        {/* Row 4 */}
        <div className="col-span-1 md:col-span-4 p-4 font-bold md:font-medium text-slate-800 bg-slate-50 md:bg-white">Deployment</div>
        <div className="col-span-1 md:col-span-4 p-4 md:border-l font-bold text-emerald-600 bg-emerald-50/30 flex items-center gap-2">
             <span className="md:hidden font-bold text-slate-400 text-xs">{text.mappingTo}:</span> {text.actionLabel}
        </div>
        <div className="col-span-1 md:col-span-4 p-4 border-b md:border-b-0 md:border-l text-slate-600">{text.actionDesc}</div>
    </div>
  </div>
  );
};

export const OntologyArchitecture: React.FC<{lang: Language}> = ({ lang }) => {
  const t = {
    EN: {
      valCreation: "Value Creation",
      objLinks: "Objects & Links",
      modRules: "Models & Rules",
      wb: "Write-back",
      layer: "The Ontology Layer",
      systems: "Existing Enterprise Systems"
    },
    NL: {
      valCreation: "Waardecreatie",
      objLinks: "Objecten & Links",
      modRules: "Modellen & Regels",
      wb: "Write-back",
      layer: "De Ontology Laag",
      systems: "Bestaande Enterprise Systemen"
    }
  };
  const text = t[lang];

  return (
   <div className="w-full bg-white p-8 rounded-2xl border border-slate-200 my-8 shadow-md">
      <div className="flex flex-col items-center gap-6">
         
         {/* Top Layer: Decisions */}
         <div className="w-full max-w-2xl text-center">
            <div className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold tracking-widest shadow-xl text-lg mb-2 mx-auto inline-block">
                DECISIONS
            </div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">{text.valCreation}</p>
         </div>

         {/* Connection Lines */}
         <div className="flex w-3/4 max-w-2xl justify-around opacity-30">
            <ArrowUp size={32} className="text-slate-400" />
            <ArrowUp size={32} className="text-slate-400" />
            <ArrowUp size={32} className="text-slate-400" />
         </div>

         {/* Middle Layer: Ontology */}
         <div className="w-full max-w-4xl relative">
             <div className="absolute inset-0 bg-slate-50 rounded-xl -z-10 transform -skew-y-1 scale-105 border border-slate-100" />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                 <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl text-center flex flex-col items-center shadow-sm">
                    <Database className="text-blue-500 mb-2" size={24} />
                    <div className="text-blue-900 font-bold text-base">DATA</div>
                    <div className="text-xs text-blue-600 mt-1">{text.objLinks}</div>
                 </div>
                 
                 <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl text-center flex flex-col items-center shadow-sm relative">
                    {/* Plus signs for visual connection */}
                    <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xl">+</div>
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xl">+</div>
                    
                    <Layers className="text-purple-500 mb-2" size={24} />
                    <div className="text-purple-900 font-bold text-base">LOGIC</div>
                    <div className="text-xs text-purple-600 mt-1">{text.modRules}</div>
                 </div>
                 
                 <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl text-center flex flex-col items-center shadow-sm">
                    <Smartphone className="text-emerald-500 mb-2" size={24} />
                    <div className="text-emerald-900 font-bold text-base">ACTION</div>
                    <div className="text-xs text-emerald-600 mt-1">{text.wb}</div>
                 </div>
             </div>
             <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{text.layer}</p>
         </div>

         {/* Connection Lines */}
         <div className="flex w-3/4 max-w-2xl justify-around opacity-30">
            <ArrowUp size={32} className="text-slate-400" />
            <ArrowUp size={32} className="text-slate-400" />
            <ArrowUp size={32} className="text-slate-400" />
         </div>

         {/* Bottom Layer: Systems */}
         <div className="grid grid-cols-3 gap-4 w-full max-w-2xl text-center">
             <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex flex-col items-center gap-1">
                <Server size={16} className="text-slate-400"/>
                <span className="text-xs font-semibold text-slate-600">ERP / CRM</span>
             </div>
             <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex flex-col items-center gap-1">
                <Database size={16} className="text-slate-400"/>
                <span className="text-xs font-semibold text-slate-600">Data Lake</span>
             </div>
             <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex flex-col items-center gap-1">
                <Smartphone size={16} className="text-slate-400"/>
                <span className="text-xs font-semibold text-slate-600">Edge / IoT</span>
             </div>
         </div>
         <p className="text-slate-400 text-xs uppercase tracking-wide">{text.systems}</p>
      </div>
   </div>
  );
};