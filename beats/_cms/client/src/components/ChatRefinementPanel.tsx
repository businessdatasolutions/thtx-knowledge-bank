import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, RotateCcw, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { generatorApi } from '../api/client';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatRefinementPanelProps {
  content: any;
  templateType: string;
  onContentUpdate: (newContent: any) => void;
  originalContent: any;
}

export function ChatRefinementPanel({
  content,
  templateType,
  onContentUpdate,
  originalContent,
}: ChatRefinementPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isRefining) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setError(null);

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage, timestamp: new Date() },
    ]);

    setIsRefining(true);

    try {
      const result = await generatorApi.refine(
        {
          currentContent: content,
          userRequest: userMessage,
          templateType,
        },
        (progress) => {
          // Optional: show progress in UI
          console.log('Refine progress:', progress);
        }
      );

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Content is aangepast volgens je verzoek.',
          timestamp: new Date(),
        },
      ]);

      // Update the content
      onContentUpdate(result);
    } catch (err: any) {
      setError(err.message || 'Aanpassing mislukt');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Fout: ${err.message || 'Aanpassing mislukt'}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsRefining(false);
    }
  };

  const handleReset = () => {
    onContentUpdate(originalContent);
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: 'Content is teruggezet naar de originele versie.',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="border border-primary-200 rounded-lg overflow-hidden bg-white">
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-primary-50 hover:bg-primary-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary-600" />
          <span className="font-medium text-primary-900">
            Verfijn met chat
          </span>
          {messages.length > 0 && (
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full">
              {messages.length} berichten
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-primary-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-primary-500" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="border-t border-primary-200">
          {/* Chat messages */}
          <div className="h-48 overflow-y-auto p-4 space-y-3 bg-primary-50/50">
            {messages.length === 0 ? (
              <div className="text-center text-primary-400 text-sm py-8">
                <p>Vraag de AI om aanpassingen te maken aan de gegenereerde content.</p>
                <p className="mt-2 text-xs">
                  Bijv: "Maak de toon informeler" of "Voeg meer praktische voorbeelden toe"
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-accent-500 text-white'
                        : 'bg-white border border-primary-200 text-primary-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isRefining && (
              <div className="flex justify-start">
                <div className="bg-white border border-primary-200 rounded-lg px-3 py-2 text-sm text-primary-500 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Bezig met aanpassen...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error message */}
          {error && (
            <div className="px-4 py-2 bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-primary-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Beschrijf je gewenste aanpassing..."
                disabled={isRefining}
                className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm disabled:bg-primary-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isRefining}
                className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:bg-primary-200 disabled:text-primary-400 transition-colors"
              >
                {isRefining ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isRefining}
                title="Reset naar origineel"
                className="px-3 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 disabled:opacity-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatRefinementPanel;
