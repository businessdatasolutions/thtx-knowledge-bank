/**
 * Beat Catalog Types
 *
 * Type definitions for the Beat catalog system.
 */

import type { TemplateType } from '../_shared/types/common';

/**
 * A single entry in the Beat catalog.
 */
export interface CatalogEntry {
  /** Unique identifier (kebab-case, matches folder name) */
  id: string;
  /** Display title */
  title: string;
  /** Short description for catalog listing */
  description: string;
  /** Author name */
  author: string;
  /** ISO date string of publication */
  publishDate: string;
  /** Template type used */
  templateType: TemplateType;
  /** URL path to the Beat (relative to base URL) */
  path: string;
  /** Tags for categorization */
  tags?: string[];
  /** Whether this Beat is featured/highlighted */
  featured?: boolean;
  /** Whether this Beat is currently published */
  published?: boolean;
}

/**
 * The complete catalog structure.
 */
export interface Catalog {
  /** Last updated timestamp */
  lastUpdated: string;
  /** Base URL for Beat links */
  baseUrl: string;
  /** Array of catalog entries */
  beats: CatalogEntry[];
}

/**
 * Filter options for the catalog.
 */
export interface CatalogFilter {
  /** Filter by template type */
  templateType?: TemplateType;
  /** Filter by tag */
  tag?: string;
  /** Only show featured Beats */
  featured?: boolean;
  /** Only show published Beats (default true) */
  published?: boolean;
}

/**
 * Apply filters to catalog entries.
 */
export function filterCatalog(
  entries: CatalogEntry[],
  filter: CatalogFilter
): CatalogEntry[] {
  return entries.filter(entry => {
    // Published filter (default to showing only published)
    if (filter.published !== false && entry.published === false) {
      return false;
    }

    // Template type filter
    if (filter.templateType && entry.templateType !== filter.templateType) {
      return false;
    }

    // Tag filter
    if (filter.tag && (!entry.tags || !entry.tags.includes(filter.tag))) {
      return false;
    }

    // Featured filter
    if (filter.featured && !entry.featured) {
      return false;
    }

    return true;
  });
}

/**
 * Sort catalog entries by date (newest first).
 */
export function sortByDate(entries: CatalogEntry[]): CatalogEntry[] {
  return [...entries].sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Get unique tags from catalog entries.
 */
export function getUniqueTags(entries: CatalogEntry[]): string[] {
  const tags = new Set<string>();
  entries.forEach(entry => {
    entry.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}
