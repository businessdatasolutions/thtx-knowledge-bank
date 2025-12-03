import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Eye,
  Sparkles,
  Home,
} from 'lucide-react';
import { filesApi, type FileEntry } from '../api/client';

interface TreeNodeProps {
  entry: FileEntry;
  level: number;
  selectedPath: string | null;
  expandedPaths: Set<string>;
  onSelect: (path: string, isDirectory: boolean) => void;
  onToggle: (path: string) => void;
}

function TreeNode({
  entry,
  level,
  selectedPath,
  expandedPaths,
  onSelect,
  onToggle,
}: TreeNodeProps) {
  const isExpanded = expandedPaths.has(entry.path);
  const isSelected = selectedPath === entry.path;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer transition-colors ${
          isSelected
            ? 'bg-accent-100 text-accent-700'
            : 'hover:bg-primary-100 text-primary-700'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (entry.isDirectory) {
            onToggle(entry.path);
          }
          onSelect(entry.path, entry.isDirectory);
        }}
      >
        {entry.isDirectory ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-primary-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-primary-400 flex-shrink-0" />
            )}
            <Folder className="w-4 h-4 text-accent-500 flex-shrink-0" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <FileText className="w-4 h-4 text-primary-400 flex-shrink-0" />
          </>
        )}
        <span className="truncate text-sm">{entry.name}</span>
      </div>
      {entry.isDirectory && isExpanded && entry.children && (
        <div>
          {entry.children.map((child) => (
            <TreeNode
              key={child.path}
              entry={child}
              level={level + 1}
              selectedPath={selectedPath}
              expandedPaths={expandedPaths}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileBrowser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tree, setTree] = useState<FileEntry | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    filesApi
      .getTree()
      .then((data) => {
        setTree(data);
        // Auto-expand root
        setExpandedPaths(new Set([data.path]));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const pathParam = searchParams.get('path');
    if (pathParam) {
      setSelectedPath(pathParam);
      loadFileContent(pathParam);
    }
  }, [searchParams]);

  const loadFileContent = async (path: string) => {
    setLoadingContent(true);
    try {
      const content = await filesApi.getContent(path);
      setSelectedContent(content);
    } catch (error) {
      console.error('Failed to load file:', error);
      setSelectedContent(null);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSelect = (path: string, isDirectory: boolean) => {
    setSelectedPath(path);
    if (!isDirectory) {
      setSearchParams({ path });
      loadFileContent(path);
    } else {
      setSelectedContent(null);
    }
  };

  const handleToggle = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const getFileName = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const getBreadcrumbs = (path: string) => {
    const parts = path.split('/');
    const articlesIndex = parts.findIndex((p) => p === 'articles');
    if (articlesIndex === -1) return [];
    return parts.slice(articlesIndex);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-primary-900">Bronbestanden</h1>
        <p className="text-primary-500 mt-1">
          Blader door artikelen en transcripten om als bron te gebruiken voor Beat generatie.
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* File tree */}
        <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-primary-200 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-primary-200 bg-primary-50">
            <h2 className="font-medium text-primary-900 text-sm">Bestandsstructuur</h2>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {loading ? (
              <div className="text-primary-400 text-sm p-2">Laden...</div>
            ) : tree ? (
              <TreeNode
                entry={tree}
                level={0}
                selectedPath={selectedPath}
                expandedPaths={expandedPaths}
                onSelect={handleSelect}
                onToggle={handleToggle}
              />
            ) : (
              <div className="text-primary-400 text-sm p-2">
                Geen bestanden gevonden
              </div>
            )}
          </div>
        </div>

        {/* File preview */}
        <div className="flex-1 bg-white rounded-xl border border-primary-200 overflow-hidden flex flex-col">
          {selectedPath && !selectedPath.endsWith('/') ? (
            <>
              {/* File header */}
              <div className="p-4 border-b border-primary-200 bg-primary-50">
                <div className="flex items-center justify-between">
                  <div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1 text-xs text-primary-400 mb-1">
                      <Home className="w-3 h-3" />
                      {getBreadcrumbs(selectedPath).map((part, index, arr) => (
                        <span key={index} className="flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" />
                          <span
                            className={
                              index === arr.length - 1
                                ? 'text-primary-700'
                                : ''
                            }
                          >
                            {part}
                          </span>
                        </span>
                      ))}
                    </div>
                    <h2 className="font-semibold text-primary-900">
                      {getFileName(selectedPath)}
                    </h2>
                  </div>
                  <a
                    href={`/generate?source=${encodeURIComponent(selectedPath)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    Genereer Beat
                  </a>
                </div>
              </div>

              {/* File content */}
              <div className="flex-1 overflow-auto p-4">
                {loadingContent ? (
                  <div className="text-primary-400">Laden...</div>
                ) : selectedContent ? (
                  <pre className="text-sm text-primary-700 whitespace-pre-wrap font-mono leading-relaxed">
                    {selectedContent}
                  </pre>
                ) : (
                  <div className="text-primary-400">
                    Kon bestand niet laden
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-primary-400">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Selecteer een bestand om te bekijken</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
