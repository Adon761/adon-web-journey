// --- COMPONENT ARCHITECTURE DEFINITIONS ---
// Reusable Component Functions returning Tailwind-styled HTML strings

// Component 1: StatCard
function StatCard({ title, value, change, isPositive }) {
  const badgeStyle = isPositive
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-rose-500/10 text-rose-400 border-rose-500/20';

  return `
    <article class="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-sm hover:border-slate-700/80 transition-all group">
      <span class="text-xs font-medium text-slate-400 tracking-wide uppercase">${title}</span>
      <div class="mt-3 flex items-baseline justify-between">
        <span class="text-2xl font-bold text-white tracking-tight group-hover:text-brand-500 transition-colors">${value}</span>
        <span class="px-2 py-0.5 text-xs font-semibold border rounded-md ${badgeStyle}">
          ${change}
        </span>
      </div>
    </article>
  `;
}

// Component 2: ServiceCard
function ServiceCard({ id, name, path, status, latency }) {
  const statusColors = {
    Operational: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Maintenance: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const badgeClass = statusColors[status] || statusColors.Operational;

  return `
    <div class="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition shadow-sm flex flex-col justify-between">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold text-slate-100 text-sm">${name}</h3>
          <p class="text-xs font-mono text-slate-500 mt-0.5">${path}</p>
        </div>
        <span class="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border rounded-full ${badgeClass}">
          ${status}
        </span>
      </div>

      <div class="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Response Time: <strong class="text-slate-200 font-mono">${latency}ms</strong></span>
        <button onclick="removeService(${id})" class="text-slate-500 hover:text-rose-400 transition text-xs">
          Remove
        </button>
      </div>
    </div>
  `;
}

// --- STATE MANAGEMENT ---
let telemetryStats = [
  { title: 'Total Throughput', value: '1.24 GB/s', change: '+12.4%', isPositive: true },
  { title: 'Active Requests', value: '42,810', change: '+5.1%', isPositive: true },
  { title: 'Error Rate', value: '0.04%', change: '-0.01%', isPositive: true },
  { title: 'Avg Latency', value: '18ms', change: '+2ms', isPositive: false }
];

let services = [
  { id: 1, name: 'Authentication Engine', path: '/v1/auth/verify', status: 'Operational', latency: 12 },
  { id: 2, name: 'Payment Gateway Proxy', path: '/v2/checkout/process', status: 'Operational', latency: 45 },
  { id: 3, name: 'User Profile Service', path: '/v1/users/me', status: 'Degraded', latency: 120 },
  { id: 4, name: 'Notification Queue', path: '/v1/notifications/push', status: 'Operational', latency: 8 }
];

// Attach remove handler to global window for inline click execution
window.removeService = function(id) {
  services = services.filter(service => service.id !== id);
  renderServices();
};

// --- RENDER PIPELINE ---
function renderStats() {
  const container = document.getElementById('stats-container');
  container.innerHTML = telemetryStats.map(stat => StatCard(stat)).join('');
}

function renderServices() {
  const container = document.getElementById('services-container');
  if (services.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
        No active services deployed. Use the controller panel to add one.
      </div>
    `;
    return;
  }
  container.innerHTML = services.map(service => ServiceCard(service)).join('');
}

// --- FORM SUBMISSION CONTROLLER (WITH DIAGNOSTICS) ---
const form = document.getElementById('add-service-form');

if (!form) {
  console.error("Error: Could not find element with id 'add-service-form'");
} else {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('service-name');
    const pathInput = document.getElementById('service-path');
    const statusInput = document.getElementById('service-status');

    if (!nameInput || !pathInput || !statusInput) {
      console.error("Error: One or more input fields missing from DOM.", { nameInput, pathInput, statusInput });
      return;
    }

    const newService = {
      id: Date.now(),
      name: nameInput.value.trim(),
      path: pathInput.value.trim(),
      status: statusInput.value,
      latency: Math.floor(Math.random() * 50) + 10
    };

    console.log("Injecting new service into state:", newService);

    services.unshift(newService);
    renderServices();

    // Reset Form Inputs
    nameInput.value = '';
    pathInput.value = '';
    statusInput.value = 'Operational';
  });
}

// Initial App Execution
renderStats();
renderServices();