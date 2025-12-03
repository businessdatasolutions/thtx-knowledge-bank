/**
 * API Client
 *
 * Fetch wrappers for the CMS API endpoints.
 */

const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// ============================================================================
// Files API
// ============================================================================

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  size?: number;
  modified?: string;
  extension?: string;
  children?: FileEntry[];
}

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  modified?: string;
  extension?: string;
  children?: FileItem[];
}

export interface FileListResponse {
  path: string;
  items: FileItem[];
}

export interface FileContentResponse {
  path: string;
  filename: string;
  content: string;
  size: number;
  modified: string;
  wordCount: number;
}

export interface FileTreeResponse {
  path: string;
  tree: FileItem[];
}

export const filesApi = {
  list: async (path = 'articles'): Promise<FileEntry[]> => {
    const response = await fetchJson<FileListResponse>(`/files?path=${encodeURIComponent(path)}`);
    return response.items.map((item) => ({
      name: item.name,
      path: item.path,
      isDirectory: item.type === 'directory',
      size: item.size,
      modified: item.modified,
      extension: item.extension,
    }));
  },

  getContent: async (path: string): Promise<string> => {
    const response = await fetchJson<FileContentResponse>(`/files/content?path=${encodeURIComponent(path)}`);
    return response.content;
  },

  getTree: async (basePath = 'articles'): Promise<FileEntry> => {
    const response = await fetchJson<FileTreeResponse>(`/files/tree?path=${encodeURIComponent(basePath)}`);
    const mapItem = (item: FileItem): FileEntry => ({
      name: item.name,
      path: item.path,
      isDirectory: item.type === 'directory',
      size: item.size,
      modified: item.modified,
      extension: item.extension,
      children: item.children?.map(mapItem),
    });
    // Wrap the array in a root entry
    return {
      name: basePath,
      path: basePath,
      isDirectory: true,
      children: response.tree.map(mapItem),
    };
  },
};

// ============================================================================
// Generator API
// ============================================================================

export interface TemplateOption {
  name: string;
  type: 'string' | 'number' | 'array';
  label: string;
  default?: any;
  placeholder?: string;
  optional?: boolean;
  min?: number;
  max?: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  options: TemplateOption[];
}

export interface TemplatesResponse {
  templates: Template[];
}

export interface PrepareRequest {
  sourcePath?: string;
  sourceContent?: string;
  templateType: string;
  outputName: string;
  targetAudience?: string;
  focusTopics?: string[];
  scenarioCount?: number;
  xAxisConcept?: string;
  yAxisConcept?: string;
}

export interface PrepareResponse {
  prompts: { system: string; user: string };
  source: {
    format: string;
    wordCount: number;
    keyPoints: string[];
  };
  outputName: string;
  templateType: string;
}

export interface ValidateResponse {
  valid: boolean;
  errors: string[];
}

export interface FinalizeResponse {
  success: boolean;
  beatId: string;
  path: string;
}

export const generatorApi = {
  getTemplates: () => fetchJson<TemplatesResponse>('/generate/templates'),

  prepare: (data: PrepareRequest) =>
    fetchJson<PrepareResponse>('/generate/prepare', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  validate: (content: any, templateType: string) =>
    fetchJson<ValidateResponse>('/generate/validate', {
      method: 'POST',
      body: JSON.stringify({ content, templateType }),
    }),

  finalize: (data: { content: any; outputName: string; templateType: string }) =>
    fetchJson<FinalizeResponse>('/generate/finalize', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Generate with AI using Server-Sent Events
   * Returns the generated content on success
   */
  generateWithAI: (
    data: PrepareRequest & { sourceFilename?: string },
    onProgress: (message: string) => void
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE}/generate/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(async (response) => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          reject(new Error('No response body'));
          return;
        }

        let buffer = '';
        let result: any = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.trim()) continue;

            const eventMatch = line.match(/^event: (\w+)\ndata: (.+)$/s);
            if (eventMatch) {
              const [, eventType, dataStr] = eventMatch;
              try {
                const eventData = JSON.parse(dataStr);

                switch (eventType) {
                  case 'progress':
                    onProgress(eventData.message || eventData.step);
                    break;
                  case 'content':
                    result = eventData;
                    break;
                  case 'complete':
                    resolve(result || eventData);
                    return;
                  case 'error':
                  case 'validation_error':
                    reject(new Error(eventData.message || JSON.stringify(eventData.errors)));
                    return;
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', dataStr);
              }
            }
          }
        }

        // If we get here without a result, resolve with what we have
        if (result) {
          resolve(result);
        } else {
          reject(new Error('No content received'));
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

// ============================================================================
// Catalog API
// ============================================================================

export interface Beat {
  id: string;
  title: string;
  description: string;
  author: string;
  publishDate: string;
  templateType: string;
  path?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

export interface CatalogResponse {
  lastUpdated: string;
  baseUrl: string;
  beats: Beat[];
}

export const catalogApi = {
  get: () => fetchJson<CatalogResponse>('/catalog'),
  getBeat: (id: string) => fetchJson<Beat & { content?: any }>(`/catalog/${id}`),
};
