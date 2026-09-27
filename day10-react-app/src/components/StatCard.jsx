export default function StatCard({ title, value, change, isPositive }) {
  const badgeStyle = isPositive
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-rose-500/10 text-rose-400 border-rose-500/20';

  return (
    <article className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm hover:border-slate-700 transition group">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{title}</span>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-500 transition-colors">
          {value}
        </span>
        <span className={`px-2 py-0.5 text-xs font-semibold border rounded-md ${badgeStyle}`}>
          {change}
        </span>
      </div>
    </article>
  );
}