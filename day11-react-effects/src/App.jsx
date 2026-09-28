import LiveTelemetry from './components/LiveTelemetry';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="pb-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">React Side Effects & Lifecycle</h1>
          <p className="text-sm text-slate-400 mt-1">Day 11: Data Fetching, Auto-Polling & Cleanup via useEffect</p>
        </header>

        <LiveTelemetry />
      </div>
    </main>
  );
}