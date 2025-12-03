import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Library,
  ExternalLink,
  Eye,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { catalogApi, type Beat } from '../api/client';

export default function Catalog() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);

  useEffect(() => {
    loadBeats();
  }, []);

  const loadBeats = () => {
    setLoading(true);
    catalogApi
      .get()
      .then((data) => setBeats(data.beats))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const filteredBeats = beats.filter((beat) => {
    const matchesSearch =
      beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beat.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType =
      filterType === 'all' || beat.templateType === filterType;

    return matchesSearch && matchesType;
  });

  const getTemplateLabel = (type: string) => {
    switch (type) {
      case 'concept-tutorial':
        return 'Tutorial';
      case 'strategic-framework':
        return 'Framework';
      default:
        return type;
    }
  };

  const getTemplateColor = (type: string) => {
    switch (type) {
      case 'concept-tutorial':
        return 'bg-purple-100 text-purple-700';
      case 'strategic-framework':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900">Beat Catalog</h1>
          <p className="text-primary-500 mt-1">
            Bekijk en beheer alle gepubliceerde Beats.
          </p>
        </div>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Nieuwe Beat
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input
            type="text"
            placeholder="Zoek op titel, beschrijving of tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          >
            <option value="all">Alle types</option>
            <option value="concept-tutorial">Tutorials</option>
            <option value="strategic-framework">Frameworks</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-primary-200">
          <p className="text-primary-500 text-sm">Totaal</p>
          <p className="text-2xl font-bold text-primary-900">{beats.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-primary-200">
          <p className="text-primary-500 text-sm">Tutorials</p>
          <p className="text-2xl font-bold text-purple-600">
            {beats.filter((b) => b.templateType === 'concept-tutorial').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-primary-200">
          <p className="text-primary-500 text-sm">Frameworks</p>
          <p className="text-2xl font-bold text-green-600">
            {
              beats.filter((b) => b.templateType === 'strategic-framework')
                .length
            }
          </p>
        </div>
      </div>

      {/* Beat list */}
      {loading ? (
        <div className="text-primary-400">Laden...</div>
      ) : filteredBeats.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-primary-200 text-center">
          {beats.length === 0 ? (
            <>
              <Library className="w-12 h-12 mx-auto text-primary-300 mb-4" />
              <p className="text-primary-500 mb-4">
                Nog geen Beats in de catalog.
              </p>
              <Link
                to="/generate"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Genereer je eerste Beat
              </Link>
            </>
          ) : (
            <>
              <Search className="w-12 h-12 mx-auto text-primary-300 mb-4" />
              <p className="text-primary-500">
                Geen Beats gevonden met deze filters.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBeats.map((beat) => (
            <div
              key={beat.id}
              className="bg-white rounded-xl p-6 border border-primary-200 hover:border-accent-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-primary-900 truncate">
                      {beat.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${getTemplateColor(
                        beat.templateType
                      )}`}
                    >
                      {getTemplateLabel(beat.templateType)}
                    </span>
                  </div>
                  <p className="text-primary-500 text-sm line-clamp-2 mb-3">
                    {beat.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-primary-400">
                    <span>ID: {beat.id}</span>
                    <span>{beat.publishDate}</span>
                    {beat.tags && beat.tags.length > 0 && (
                      <div className="flex gap-1">
                        {beat.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary-100 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {beat.tags.length > 3 && (
                          <span className="text-primary-400">
                            +{beat.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setSelectedBeat(beat)}
                    className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    title="Bekijk details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <a
                    href={`https://businessdatasolutions.github.io/thtx-knowledge-bank/${beat.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-primary-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                    title="Open Beat"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedBeat && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBeat(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-primary-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-primary-900">
                    {selectedBeat.title}
                  </h2>
                  <p className="text-primary-500 mt-1">
                    {selectedBeat.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBeat(null)}
                  className="text-primary-400 hover:text-primary-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-primary-400">ID</p>
                  <p className="font-medium text-primary-900">
                    {selectedBeat.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-primary-400">Template</p>
                  <p className="font-medium text-primary-900">
                    {getTemplateLabel(selectedBeat.templateType)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-primary-400">Auteur</p>
                  <p className="font-medium text-primary-900">
                    {selectedBeat.author || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-primary-400">Publicatiedatum</p>
                  <p className="font-medium text-primary-900">
                    {selectedBeat.publishDate}
                  </p>
                </div>
              </div>
              {selectedBeat.tags && selectedBeat.tags.length > 0 && (
                <div>
                  <p className="text-sm text-primary-400 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedBeat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 px-3 py-1 rounded-full text-sm text-primary-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 flex gap-3">
                <a
                  href={`https://businessdatasolutions.github.io/thtx-knowledge-bank/${selectedBeat.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Beat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
