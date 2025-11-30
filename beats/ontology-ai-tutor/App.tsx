import React, { useState } from 'react';
import { ICONS, UI_TEXT, getCaseStudies, getTheorySections } from './constants';
import { AppState, Option, Language } from './types';
import InteractiveDiagram from './components/InteractiveDiagram';
import StageSelector from './components/StageSelector';
import CaseSummary from './components/CaseSummary';
import { Bot, ChevronRight, BookOpen, RotateCcw, Award, ArrowRight, LayoutDashboard, CheckCircle, GraduationCap, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('NL');
  const [state, setState] = useState<AppState>({
    currentView: 'INTRO',
    activeCaseId: null,
    completedCases: []
  });

  const [currentStageStep, setCurrentStageStep] = useState<0 | 1 | 2>(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [theoryStep, setTheoryStep] = useState<number>(0);

  // Track choices for the current active case run
  const [currentRunChoices, setCurrentRunChoices] = useState<{
      data: Option | null;
      logic: Option | null;
      action: Option | null;
  }>({ data: null, logic: null, action: null });

  // Derived state based on Language
  const theorySections = getTheorySections(lang);
  const caseStudies = getCaseStudies(lang);
  const activeCase = caseStudies.find(c => c.id === state.activeCaseId);
  const ui = UI_TEXT[lang];

  const handleStart = () => {
    setState(prev => ({ ...prev, currentView: 'DASHBOARD' }));
  };

  const handleSelectCase = (caseId: string) => {
    setState(prev => ({ ...prev, currentView: 'CASE_STUDY', activeCaseId: caseId }));
    setCurrentStageStep(0);
    setSelectedOption(null);
    setCurrentRunChoices({ data: null, logic: null, action: null });
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const handleNextStage = () => {
    // Save current selection to history
    if (selectedOption) {
        const stageKey = currentStageStep === 0 ? 'data' : currentStageStep === 1 ? 'logic' : 'action';
        setCurrentRunChoices(prev => ({ ...prev, [stageKey]: selectedOption }));
    }

    if (currentStageStep < 2) {
      setCurrentStageStep(prev => (prev + 1) as 0 | 1 | 2);
      setSelectedOption(null);
    } else {
      // Complete Stage -> Go to Summary
      if (activeCase) {
        setState(prev => ({
          ...prev,
          completedCases: [...new Set([...prev.completedCases, activeCase.id])],
          currentView: 'SUMMARY'
        }));
      }
    }
  };

  const handleBackToDashboard = () => {
    setState(prev => ({ ...prev, currentView: 'DASHBOARD', activeCaseId: null }));
  };

  const getStageContent = () => {
    if (!activeCase) return null;
    if (currentStageStep === 0) return activeCase.stages.data;
    if (currentStageStep === 1) return activeCase.stages.logic;
    return activeCase.stages.action;
  };

  const activeStageType = currentStageStep === 0 ? 'DATA' : currentStageStep === 1 ? 'LOGIC' : 'ACTION';

  const toggleLanguage = () => {
      setLang(prev => prev === 'EN' ? 'NL' : 'EN');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar / Navigation */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-1">
            <LayoutDashboard />
            <span>{ui.title}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
             <p className="text-xs text-slate-500 uppercase tracking-widest">{ui.subtitle}</p>
             <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-xs px-2 py-1 rounded text-white transition-colors border border-slate-700"
             >
                <Globe size={12}/>
                {lang}
             </button>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setState(prev => ({...prev, currentView: 'INTRO'}))}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${state.currentView === 'INTRO' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <BookOpen size={18} />
            {ui.navIntro}
          </button>
          <button 
            onClick={() => setState(prev => ({...prev, currentView: 'DASHBOARD'}))}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${['DASHBOARD', 'CASE_STUDY', 'SUMMARY'].includes(state.currentView) ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <Award size={18} />
            {ui.navCases}
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-white mb-2">{ui.progress}</h4>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
               <div 
                 className="bg-green-50 h-full transition-all duration-1000" 
                 style={{ width: `${(state.completedCases.length / caseStudies.length) * 100}%`}}
               />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {state.completedCases.length} / {caseStudies.length} {ui.completed}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Intro / Theory View */}
        {state.currentView === 'INTRO' && (
          <div className="flex-1 overflow-y-auto p-8 md:p-12 max-w-5xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 min-h-[80vh] flex flex-col">
              <div className="mb-8 text-center">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                  <GraduationCap size={16} /> {ui.introTag}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-4 leading-tight">
                  {ui.introTitle} <span className="text-indigo-600">{ui.introHighlight}</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  {ui.introSub}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-slate-100 p-1 rounded-xl">
                  {theorySections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => setTheoryStep(idx)}
                      className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                        theoryStep === idx 
                          ? 'bg-white text-indigo-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Theory Content */}
              <div className="flex-1 animate-fadeIn">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-800">{theorySections[theoryStep].title}</h2>
                </div>
                <div className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200 shadow-inner">
                   {theorySections[theoryStep].content}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
                <button
                  onClick={() => setTheoryStep(prev => Math.max(0, prev - 1))}
                  disabled={theoryStep === 0}
                  className={`flex items-center gap-2 text-slate-500 font-semibold hover:text-indigo-600 transition-colors ${theoryStep === 0 ? 'opacity-0 cursor-default' : ''}`}
                >
                  <ChevronRight size={20} className="rotate-180"/> {ui.prev}
                </button>

                <div className="flex gap-2">
                   {theorySections.map((_, idx) => (
                     <div 
                      key={idx} 
                      className={`h-2 w-2 rounded-full transition-all ${theoryStep === idx ? 'bg-indigo-600 w-6' : 'bg-slate-300'}`}
                     />
                   ))}
                </div>

                {theoryStep < theorySections.length - 1 ? (
                  <button
                    onClick={() => setTheoryStep(prev => Math.min(theorySections.length - 1, prev + 1))}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    {ui.nextConcept} <ChevronRight size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={handleStart}
                    className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg animate-pulse"
                  >
                    {ui.startSim} <ArrowRight size={20} />
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Dashboard View */}
        {state.currentView === 'DASHBOARD' && (
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
            <header className="mb-8 max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-slate-900">{ui.casesTitle}</h1>
              <p className="text-slate-500 mt-2 text-lg">{ui.casesSub}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {caseStudies.map((study) => (
                <button
                  key={study.id}
                  onClick={() => handleSelectCase(study.id)}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all text-left group flex flex-col h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${state.completedCases.includes(study.id) ? 'bg-green-500' : 'bg-indigo-500 group-hover:bg-indigo-600'}`} />
                  
                  <div className="flex items-start justify-between w-full mb-4 pl-4">
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {ICONS[study.icon] || ICONS['factory']}
                    </div>
                    {state.completedCases.includes(study.id) && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={14} /> {ui.completed}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-indigo-700 pl-4">{study.title}</h3>
                  <p className="text-slate-600 mb-6 flex-1 pl-4 leading-relaxed">{study.description}</p>
                  <div className="pl-4 flex items-center text-indigo-600 font-semibold group-hover:underline">
                    {state.completedCases.includes(study.id) ? ui.review : ui.start} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Case Study View */}
        {state.currentView === 'CASE_STUDY' && activeCase && (
          <div className="flex h-full flex-col md:flex-row">
            
            {/* Left Panel: Context & Simulation */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 relative bg-slate-50/50">
              <button 
                onClick={handleBackToDashboard}
                className="flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 font-medium transition-colors"
              >
                <ChevronRight className="rotate-180 mr-1" size={16} /> {ui.back}
              </button>

              <div className="max-w-3xl mx-auto">
                <header className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                      {ui.phase} {currentStageStep + 1}/3
                    </span>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{activeCase.title}</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">{ui.context}</h3>
                    <p className="text-slate-700 italic text-lg leading-relaxed">
                      "{activeCase.context}"
                    </p>
                  </div>
                </header>

                <InteractiveDiagram activeStage={activeStageType} lang={lang} />

                {getStageContent() && (
                  <div className="mt-8">
                     <StageSelector 
                      stage={getStageContent()!} 
                      selectedOptionId={selectedOption?.id || null}
                      onSelect={handleOptionSelect}
                      isProcessing={false}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Feedback */}
            <div className={`
              w-full md:w-[400px] border-l border-slate-200 bg-white flex flex-col shadow-2xl z-20 transition-transform duration-300 absolute md:relative h-full
              ${selectedOption ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <Bot size={24} className="text-indigo-400" />
                  <h3 className="font-bold tracking-wide">{ui.feedbackTitle}</h3>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
                {!selectedOption ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
                    <div className="bg-slate-100 p-4 rounded-full mb-4">
                      <Bot size={32} className="opacity-40 text-slate-500" />
                    </div>
                    <p className="text-sm font-medium">{ui.feedbackPlaceholder}</p>
                  </div>
                ) : (
                  <div className="animate-fadeIn">
                    <div className={`
                      p-6 rounded-xl mb-6 border shadow-sm
                      ${selectedOption.isCorrect 
                        ? 'bg-green-50 border-green-200 text-green-900' 
                        : 'bg-red-50 border-red-200 text-red-900'
                      }
                    `}>
                      <div className="flex items-center gap-3 mb-4 border-b border-black/10 pb-3">
                         {selectedOption.isCorrect ? (
                           <CheckCircle className="text-green-600" size={24} />
                         ) : (
                           <RotateCcw className="text-red-500" size={24} />
                         )}
                        <span className="font-bold uppercase text-sm tracking-wider">
                          {selectedOption.isCorrect ? ui.correct : ui.incorrect}
                        </span>
                      </div>
                      <p className="text-base leading-relaxed font-medium">{selectedOption.feedback}</p>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                      <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">{ui.conceptNote}</h4>
                      <p className="text-sm text-blue-900 leading-relaxed">
                        {ui.conceptText}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              {selectedOption && (
                <div className="p-6 bg-white border-t border-slate-100">
                  {selectedOption.isCorrect ? (
                    <button 
                      onClick={handleNextStage}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-200"
                    >
                      {currentStageStep === 2 ? ui.finish : ui.nextStage}
                      <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => setSelectedOption(null)}
                      className="w-full py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors hover:bg-slate-50"
                    >
                      <RotateCcw size={20} />
                      {ui.retry}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Summary View */}
        {state.currentView === 'SUMMARY' && activeCase && (
            <CaseSummary 
                caseStudy={activeCase}
                choices={currentRunChoices}
                lang={lang}
                onBack={handleBackToDashboard}
            />
        )}
      </main>
    </div>
  );
};

export default App;