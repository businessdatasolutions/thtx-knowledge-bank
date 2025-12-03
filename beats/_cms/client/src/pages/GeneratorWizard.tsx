import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Layout,
  Settings,
  Sparkles,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { filesApi, generatorApi, type FileEntry } from '../api/client';

type Step = 'source' | 'template' | 'options' | 'generate' | 'review';

const STEPS: { id: Step; label: string; icon: any }[] = [
  { id: 'source', label: 'Bron', icon: FileText },
  { id: 'template', label: 'Template', icon: Layout },
  { id: 'options', label: 'Opties', icon: Settings },
  { id: 'generate', label: 'Genereren', icon: Sparkles },
  { id: 'review', label: 'Opslaan', icon: CheckCircle },
];

interface GeneratorState {
  sourcePath: string;
  sourceContent: string;
  templateType: 'concept-tutorial' | 'strategic-framework';
  outputName: string;
  targetAudience: string;
  scenarioCount: number;
  xAxisConcept: string;
  yAxisConcept: string;
}

export default function GeneratorWizard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('source');
  const [state, setState] = useState<GeneratorState>({
    sourcePath: '',
    sourceContent: '',
    templateType: 'concept-tutorial',
    outputName: '',
    targetAudience: 'Executives en managers die strategische beslissingen nemen',
    scenarioCount: 4,
    xAxisConcept: '',
    yAxisConcept: '',
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // File selection state
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const progressRef = useRef<HTMLDivElement>(null);

  // Load initial source from URL params
  useEffect(() => {
    const sourcePath = searchParams.get('source');
    if (sourcePath) {
      setState((prev) => ({ ...prev, sourcePath }));
      loadSourceContent(sourcePath);
    }
  }, [searchParams]);

  // Load available files
  useEffect(() => {
    filesApi
      .list()
      .then(setFiles)
      .catch(console.error)
      .finally(() => setLoadingFiles(false));
  }, []);

  // Auto-scroll progress
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.scrollTop = progressRef.current.scrollHeight;
    }
  }, [generationProgress]);

  const loadSourceContent = async (path: string) => {
    try {
      const content = await filesApi.getContent(path);
      setState((prev) => ({
        ...prev,
        sourcePath: path,
        sourceContent: content,
        outputName: prev.outputName || generateOutputName(path),
      }));
    } catch (error) {
      console.error('Failed to load source:', error);
    }
  };

  const generateOutputName = (path: string): string => {
    const fileName = path.split('/').pop() || '';
    return fileName
      .replace(/\.(md|txt)$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'source':
        return !!state.sourcePath && !!state.sourceContent;
      case 'template':
        return !!state.templateType;
      case 'options':
        return !!state.outputName && state.outputName.length >= 3;
      case 'generate':
        return !!generatedContent;
      case 'review':
        return saveSuccess;
      default:
        return false;
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress([]);
    setGeneratedContent(null);
    setGenerationError(null);

    try {
      const result = await generatorApi.generateWithAI(
        {
          sourceContent: state.sourceContent,
          sourceFilename: state.sourcePath.split('/').pop(),
          templateType: state.templateType,
          outputName: state.outputName,
          targetAudience: state.targetAudience,
          scenarioCount:
            state.templateType === 'concept-tutorial'
              ? state.scenarioCount
              : undefined,
          xAxisConcept:
            state.templateType === 'strategic-framework'
              ? state.xAxisConcept
              : undefined,
          yAxisConcept:
            state.templateType === 'strategic-framework'
              ? state.yAxisConcept
              : undefined,
        },
        (progress) => {
          setGenerationProgress((prev) => [...prev, progress]);
        }
      );

      setGeneratedContent(result);
      setGenerationProgress((prev) => [...prev, '✅ Generatie voltooid!']);
    } catch (error: any) {
      setGenerationError(error.message || 'Generation failed');
      setGenerationProgress((prev) => [
        ...prev,
        `❌ Fout: ${error.message || 'Generation failed'}`,
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    setIsSaving(true);
    try {
      await generatorApi.finalize({
        content: generatedContent,
        outputName: state.outputName,
        templateType: state.templateType,
      });
      setSaveSuccess(true);
    } catch (error: any) {
      setGenerationError(error.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyJSON = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(JSON.stringify(generatedContent, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'source':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Selecteer bronmateriaal
              </h2>
              <p className="text-primary-500">
                Kies een artikel of transcript als basis voor je Beat.
              </p>
            </div>

            {loadingFiles ? (
              <div className="text-primary-400">Laden...</div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-auto border border-primary-200 rounded-lg p-2">
                {files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => loadSourceContent(file.path)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      state.sourcePath === file.path
                        ? 'bg-accent-100 border-2 border-accent-500'
                        : 'bg-primary-50 hover:bg-primary-100 border-2 border-transparent'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-primary-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-primary-400 truncate">
                        {file.path}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {state.sourceContent && (
              <div>
                <h3 className="text-sm font-medium text-primary-700 mb-2">
                  Preview ({state.sourceContent.length.toLocaleString()} karakters)
                </h3>
                <pre className="text-sm text-primary-600 bg-primary-50 p-4 rounded-lg max-h-48 overflow-auto whitespace-pre-wrap font-mono">
                  {state.sourceContent.slice(0, 1000)}
                  {state.sourceContent.length > 1000 && '...'}
                </pre>
              </div>
            )}
          </div>
        );

      case 'template':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Kies template type
              </h2>
              <p className="text-primary-500">
                Selecteer het type Beat dat je wilt genereren.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    templateType: 'concept-tutorial',
                  }))
                }
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  state.templateType === 'concept-tutorial'
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-primary-200 hover:border-primary-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Layout className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Concept Tutorial
                </h3>
                <p className="text-sm text-primary-500">
                  Interactieve leermodule met scenario's en quizvragen. Ideaal
                  voor het uitleggen van concepten en frameworks.
                </p>
              </button>

              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    templateType: 'strategic-framework',
                  }))
                }
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  state.templateType === 'strategic-framework'
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-primary-200 hover:border-primary-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Layout className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Strategic Framework
                </h3>
                <p className="text-sm text-primary-500">
                  2x2 matrix met klikbare kwadranten. Perfect voor het
                  visualiseren van strategische positionering.
                </p>
              </button>
            </div>
          </div>
        );

      case 'options':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Configureer opties
              </h2>
              <p className="text-primary-500">
                Pas de generatie-instellingen aan voor je Beat.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Output naam (kebab-case)
                </label>
                <input
                  type="text"
                  value={state.outputName}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      outputName: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, '-'),
                    }))
                  }
                  placeholder="mijn-beat-naam"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
                <p className="text-xs text-primary-400 mt-1">
                  Wordt gebruikt als folder- en ID-naam
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Doelgroep
                </label>
                <input
                  type="text"
                  value={state.targetAudience}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      targetAudience: e.target.value,
                    }))
                  }
                  placeholder="Beschrijf je doelgroep"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>

              {state.templateType === 'concept-tutorial' && (
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Aantal scenario's
                  </label>
                  <select
                    value={state.scenarioCount}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        scenarioCount: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value={3}>3 scenario's</option>
                    <option value={4}>4 scenario's</option>
                    <option value={5}>5 scenario's</option>
                  </select>
                </div>
              )}

              {state.templateType === 'strategic-framework' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      X-as concept (optioneel)
                    </label>
                    <input
                      type="text"
                      value={state.xAxisConcept}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          xAxisConcept: e.target.value,
                        }))
                      }
                      placeholder="Bijv. 'Technische complexiteit'"
                      className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Y-as concept (optioneel)
                    </label>
                    <input
                      type="text"
                      value={state.yAxisConcept}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          yAxisConcept: e.target.value,
                        }))
                      }
                      placeholder="Bijv. 'Business impact'"
                      className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'generate':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Genereer met AI
              </h2>
              <p className="text-primary-500">
                Claude genereert je Beat content op basis van het bronmateriaal.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-primary-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-primary-500">Bron:</span>
                <span className="text-primary-900 font-medium">
                  {state.sourcePath.split('/').pop()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-500">Template:</span>
                <span className="text-primary-900 font-medium">
                  {state.templateType === 'concept-tutorial'
                    ? 'Concept Tutorial'
                    : 'Strategic Framework'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-500">Output:</span>
                <span className="text-primary-900 font-medium">
                  beats/{state.outputName}/
                </span>
              </div>
            </div>

            {/* Progress */}
            {generationProgress.length > 0 && (
              <div
                ref={progressRef}
                className="bg-gray-900 rounded-lg p-4 max-h-48 overflow-auto font-mono text-sm"
              >
                {generationProgress.map((msg, i) => (
                  <div key={i} className="text-gray-300">
                    {msg}
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {generationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Generatie mislukt</p>
                  <p className="text-red-600 text-sm mt-1">{generationError}</p>
                </div>
              </div>
            )}

            {/* Generate button */}
            {!generatedContent && (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 px-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:bg-accent-300 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Genereren...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Start generatie
                  </>
                )}
              </button>
            )}

            {/* Success */}
            {generatedContent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">
                    Content succesvol gegenereerd!
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Ga door naar de volgende stap om te reviewen en op te slaan.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Review en opslaan
              </h2>
              <p className="text-primary-500">
                Controleer de gegenereerde content en sla op naar de catalog.
              </p>
            </div>

            {generatedContent && (
              <>
                {/* Content preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-primary-700">
                      Gegenereerde JSON
                    </h3>
                    <button
                      onClick={handleCopyJSON}
                      className="text-sm text-accent-600 hover:text-accent-700 flex items-center gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Gekopieerd
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopieer JSON
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-primary-600 bg-primary-50 p-4 rounded-lg max-h-64 overflow-auto font-mono">
                    {JSON.stringify(generatedContent, null, 2)}
                  </pre>
                </div>

                {/* Validation summary */}
                <div className="bg-primary-50 rounded-lg p-4 space-y-2">
                  <h3 className="text-sm font-medium text-primary-700 mb-2">
                    Validatie
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-primary-700">
                      Metadata: {generatedContent.metadata?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-primary-700">
                      Template type:{' '}
                      {generatedContent.metadata?.templateType}
                    </span>
                  </div>
                  {state.templateType === 'concept-tutorial' && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-primary-700">
                        Scenarios: {generatedContent.scenarios?.length || 0}
                      </span>
                    </div>
                  )}
                </div>

                {/* Save button */}
                {!saveSuccess ? (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Opslaan...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Opslaan naar catalog
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-800 font-medium">
                          Beat succesvol opgeslagen!
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          Je Beat is opgeslagen in beats/{state.outputName}/ en
                          toegevoegd aan de catalog.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/catalog')}
                      className="w-full py-3 px-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      Bekijk in catalog
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isPast = index < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent-100 text-accent-700'
                      : isPast
                      ? 'bg-green-100 text-green-700'
                      : 'text-primary-400'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="font-medium text-sm hidden sm:inline">
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-primary-300 mx-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-primary-200 p-6 mb-6">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStepIndex === 0}
          className="px-4 py-2 text-primary-600 hover:text-primary-800 disabled:text-primary-300 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Vorige
        </button>

        {currentStep !== 'review' && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:bg-primary-200 disabled:text-primary-400 transition-colors flex items-center gap-2"
          >
            Volgende
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
