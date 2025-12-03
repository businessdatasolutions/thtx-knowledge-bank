import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Sparkles, Library } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import FileBrowser from './pages/FileBrowser';
import GeneratorWizard from './pages/GeneratorWizard';
import Catalog from './pages/Catalog';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/browse', label: 'Bestanden', icon: FolderOpen },
    { path: '/generate', label: 'Genereren', icon: Sparkles },
    { path: '/catalog', label: 'Catalog', icon: Library },
  ];

  return (
    <nav className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center font-bold">
              T
            </div>
            <span className="font-semibold text-lg">THTX Beats CMS</span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent-600 text-white'
                      : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/browse" element={<FileBrowser />} />
            <Route path="/generate" element={<GeneratorWizard />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
