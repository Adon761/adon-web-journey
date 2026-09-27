export default function ServiceCard({ service, onDelete }) {
  const { id, name, path, status, latency } = service;

  const statusColors = {
    Operational: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Maintenance: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const badgeClass = statusColors[status] || statusColors.Operational;

  return (
    <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-100 text-sm">{name}</h3>
          <p className="text-xs font-mono text-slate-500 mt-0.5">{path}</p>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border rounded-full ${badgeClass}`}>
          {status}
        </span>
      </div>

      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Response Time: <strong className="text-slate-200 font-mono">{latency}ms</strong></span>
        <button
          onClick={() => onDelete(id)}
          className="text-slate-500 hover:text-rose-400 transition text-xs font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
}