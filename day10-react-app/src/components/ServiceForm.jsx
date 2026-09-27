import { useState } from 'react';

export default function ServiceForm({ onAddService }) {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [status, setStatus] = useState('Operational');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !path.trim()) return;

    onAddService({
      id: Date.now(),
      name: name.trim(),
      path: path.trim(),
      status,
      latency: Math.floor(Math.random() * 50) + 10
    });

    setName('');
    setPath('');
    setStatus('Operational');
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-white">Inject React Component</h3>
        <p className="text-xs text-slate-400">Add a new service directly into immutable React state.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Service Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Auth Microservice"
          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Endpoint Path</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          required
          placeholder="e.g. /api/v1/auth"
          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="Operational">Operational</option>
          <option value="Degraded">Degraded</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20"
      >
        + Add Component to State
      </button>
    </form>
  );
}