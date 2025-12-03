/**
 * Beat Catalog Page
 *
 * Displays all published Beats in a responsive grid with filtering.
 */

import React, { useState, useMemo } from 'react';
import { BookOpen, Grid, Star, Calendar, Tag, ExternalLink } from 'lucide-react';
import { Card, Button, TabGroup } from '../_shared/components';
import type { CatalogEntry, CatalogFilter } from './types';
import { filterCatalog, sortByDate, getUniqueTags } from './types';
import catalogData from './beats.json';

export interface CatalogPageProps {
  /** Optional custom catalog data (for testing) */
  catalog?: typeof catalogData;
}

/**
 * Get template type display name.
 */
function getTemplateLabel(type: string): string {
  const labels: Record<string, string> = {
    'concept-tutorial': 'Tutorial',
    'strategic-framework': 'Framework',
  };
  return labels[type] || type;
}

/**
 * Get template type color.
 */
function getTemplateColor(type: string): string {
  const colors: Record<string, string> = {
    'concept-tutorial': 'bg-blue-100 text-blue-700',
    'strategic-framework': 'bg-purple-100 text-purple-700',
  };
  return colors[type] || 'bg-slate-100 text-slate-700';
}

/**
 * Format date for display.
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Main catalog page component.
 */
export const CatalogPage: React.FC<CatalogPageProps> = ({
  catalog = catalogData,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'concept-tutorial' | 'strategic-framework'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get filtered and sorted beats
  const filteredBeats = useMemo(() => {
    const filter: CatalogFilter = {
      published: true,
      templateType: activeFilter === 'all' ? undefined : activeFilter,
      tag: selectedTag || undefined,
    };
    return sortByDate(filterCatalog(catalog.beats, filter));
  }, [catalog.beats, activeFilter, selectedTag]);

  // Get unique tags
  const allTags = useMemo(() => getUniqueTags(catalog.beats), [catalog.beats]);

  // Filter tabs
  const tabs = [
    { id: 'all', label: 'Alles' },
    { id: 'concept-tutorial', label: 'Tutorials' },
    { id: 'strategic-framework', label: 'Frameworks' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">THTX Beats</h1>
              <p className="text-slate-600">Interactieve kenniscontainers</p>
            </div>
          </div>

          {/* Filter tabs */}
          <TabGroup
            tabs={tabs}
            activeTab={activeFilter}
            onChange={(id) => setActiveFilter(id as typeof activeFilter)}
            variant="pills"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tag filter (if tags exist) */}
        {allTags.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === null
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle tags
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-4">
          {filteredBeats.length} {filteredBeats.length === 1 ? 'beat' : 'beats'} gevonden
        </p>

        {/* Beat grid */}
        {filteredBeats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} baseUrl={catalog.baseUrl} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Geen beats gevonden met deze filters.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-sm text-slate-500 text-center">
            Laatst bijgewerkt: {formatDate(catalog.lastUpdated)}
          </p>
        </div>
      </footer>
    </div>
  );
};

/**
 * Individual Beat card component.
 */
const BeatCard: React.FC<{ beat: CatalogEntry; baseUrl: string }> = ({ beat, baseUrl }) => {
  const beatUrl = `${baseUrl}${beat.path}`;

  return (
    <Card className="relative flex flex-col h-full">
      {/* Featured badge */}
      {beat.featured && (
        <div className="absolute top-4 right-4">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        {/* Template type badge */}
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-3 ${getTemplateColor(beat.templateType)}`}>
          {getTemplateLabel(beat.templateType)}
        </span>

        <h3 className="text-lg font-semibold text-slate-900 mb-2">{beat.title}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">{beat.description}</p>

        {/* Tags */}
        {beat.tags && beat.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {beat.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
            {beat.tags.length > 3 && (
              <span className="text-xs text-slate-400">+{beat.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(beat.publishDate)}</span>
        </div>
        <a
          href={beatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Bekijken
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
};

export default CatalogPage;
