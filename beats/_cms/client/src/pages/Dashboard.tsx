import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FolderOpen, Library, FileText, ArrowRight } from 'lucide-react';
import { catalogApi, type Beat } from '../api/client';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-200">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-primary-500 text-sm">{label}</p>
          <p className="text-2xl font-bold text-primary-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
  to,
  color,
}: {
  icon: any;
  title: string;
  description: string;
  to: string;
  color: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl p-6 shadow-sm border border-primary-200 hover:border-accent-300 hover:shadow-md transition-all group"
    >
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-semibold text-primary-900 mb-1 flex items-center gap-2">
        {title}
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-sm text-primary-500">{description}</p>
    </Link>
  );
}

function RecentBeatCard({ beat }: { beat: Beat }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-primary-200">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-primary-900">{beat.title}</h4>
          <p className="text-sm text-primary-500 mt-1 line-clamp-2">{beat.description}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            beat.templateType === 'concept-tutorial'
              ? 'bg-accent-100 text-accent-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {beat.templateType === 'concept-tutorial' ? 'Tutorial' : 'Framework'}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-primary-400">
        <span>{beat.publishDate}</span>
        {beat.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="bg-primary-100 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catalogApi
      .get()
      .then((data) => setBeats(data.beats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Dashboard</h1>
        <p className="text-primary-500 mt-2">
          Welkom bij de THTX Beats CMS. Genereer interactieve Beats vanuit je bronmateriaal.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Library}
          label="Totaal Beats"
          value={beats.length}
          color="bg-accent-500"
        />
        <StatCard
          icon={FileText}
          label="Tutorials"
          value={beats.filter((b) => b.templateType === 'concept-tutorial').length}
          color="bg-purple-500"
        />
        <StatCard
          icon={FileText}
          label="Frameworks"
          value={beats.filter((b) => b.templateType === 'strategic-framework').length}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-primary-900 mb-4">Snelle acties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            icon={Sparkles}
            title="Nieuwe Beat genereren"
            description="Maak een interactieve Beat vanuit bronmateriaal met AI"
            to="/generate"
            color="bg-accent-500"
          />
          <QuickAction
            icon={FolderOpen}
            title="Bronbestanden bekijken"
            description="Blader door artikelen en transcripten"
            to="/browse"
            color="bg-purple-500"
          />
          <QuickAction
            icon={Library}
            title="Catalog beheren"
            description="Bekijk en beheer gepubliceerde Beats"
            to="/catalog"
            color="bg-green-500"
          />
        </div>
      </div>

      {/* Recent Beats */}
      <div>
        <h2 className="text-lg font-semibold text-primary-900 mb-4">Recente Beats</h2>
        {loading ? (
          <div className="text-primary-400">Laden...</div>
        ) : beats.length === 0 ? (
          <div className="bg-white rounded-xl p-8 border border-primary-200 text-center">
            <p className="text-primary-500">Nog geen Beats gegenereerd.</p>
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Genereer je eerste Beat
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beats.slice(0, 4).map((beat) => (
              <RecentBeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
