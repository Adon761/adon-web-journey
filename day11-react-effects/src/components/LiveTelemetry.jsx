import { useState, useEffect } from 'react';

export default function LiveTelemetry() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Effect 1: Initial Data Fetching with loading/error handling
  useEffect(() => {
    let isMounted = true; // Race-condition guard

    async function fetchServerNodes() {
      try {
        setLoading(true);
        setError(null);

        // Fetching user data to simulate fetching operational server nodes
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();

        if (isMounted) {
          const formattedNodes = data.map(node => ({
            id: node.id,
            name: node.company.name,
            endpoint: node.website,
            status: node.id % 2 === 0 ? 'Operational' : 'Healthy',
            latency: Math.floor(Math.random() * 35) + 12
          }));
          setServers(formattedNodes);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchServerNodes();

    return () => {
      isMounted = false; // Cleanup: prevents state updates if unmounted mid-fetch
    };
  }, []);

  // Effect 2: Polling / Timer Effect with explicit Cleanup
  useEffect(() => {
    if (servers.length === 0) return;

    const intervalId = setInterval(() => {
      setServers(prevServers =>
        prevServers.map(server => ({
          ...server,
          latency: Math.floor(Math.random() * 40) + 10
        }))
      );
      setLastUpdated(new Date().toLocaleTimeString());
    }, 3000);

    // CRITICAL: Cleanup function clears interval when component updates or unmounts
    return () => clearInterval(intervalId);
  }, [servers.length]);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Node Status Stream
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Live heartbeat polling every 3 seconds</p>
        </div>
        <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
          Last Sync: {lastUpdated}
        </span>
      </div>

      {loading && (
        <div className="py-12 text-center space-y-3">
          <div className="inline-block h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Establishing API connection...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400">
          <strong>Fetch Failed:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servers.map(node => (
            <div key={node.id} className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">{node.name}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                  {node.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">{node.endpoint}</p>
              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs text-slate-400">
                <span>Latency</span>
                <span className="font-mono font-bold text-blue-400">{node.latency} ms</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}