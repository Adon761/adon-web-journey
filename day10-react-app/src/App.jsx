import { useState } from 'react';
import StatCard from './components/StatCard';
import ServiceCard from './components/ServiceCard';
import ServiceForm from './components/ServiceForm';

export default function App() {
  const [telemetryStats] = useState([
    { id: 1, title: 'Total Throughput', value: '1.24 GB/s', change: '+12.4%', isPositive: true },
    { id: 2, title: 'Active Requests', value: '42,810', change: '+5.1%', isPositive: true },
    { id: 3, title: 'Error Rate', value: '0.04%', change: '-0.01%', isPositive: true },
    { id: 4, title: 'Avg Latency', value: '18ms', change: '+2ms', isPositive: false }
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'Authentication Engine', path: '/v1/auth/verify', status: 'Operational', latency: 12 },
    { id: 2, name: 'Payment Gateway Proxy', path: '/v2/checkout/process', status: 'Operational', latency: 45 },
    { id: 3, name: 'User Profile Service', path: '/v1/users/me', status: 'Degraded', latency: 120 }
  ]);

  const handleAddService = (newService) => {
    setServices([newService, ...services]);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
              <h1 className="text-2xl font-bold tracking-tight text-white">React Telemetry Engine</h1>
            </div>
            <p className="text-sm text-slate-400 mt-1">Day 10: JSX, Props & Reactive State via Vite</p>
          </div>
        </header>

        {/* Telemetry Stats Bar */}
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Core Telemetry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {telemetryStats.map(stat => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>
        </section>

        {/* Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Services List */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Active Services ({services.length})
              </h2>
              <span className="text-xs text-slate-500">Re-rendered via React State</span>
            </div>

            {services.length === 0 ? (
              <div className="p-8 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
                No active services deployed. Use the controller panel to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <ServiceCard key={service.id} service={service} onDelete={handleDeleteService} />
                ))}
              </div>
            )}
          </section>

          {/* Right Column: Controller Form */}
          <aside className="space-y-4">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">State Controller</h2>
            <ServiceForm onAddService={handleAddService} />
          </aside>

        </div>

      </div>
    </main>
  );
}