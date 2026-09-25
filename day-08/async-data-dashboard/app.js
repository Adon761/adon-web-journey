// --- CLOSURE PATTERN: Private Filter State Controller ---
function createFilterController() {
  let currentCategory = 'all';
  let searchTerm = '';

  return {
    setCategory: (category) => { currentCategory = category; },
    setSearchTerm: (term) => { searchTerm = term.toLowerCase().trim(); },
    applyPipeline: (rawCoins) => {
      // Functional Pipeline: .filter() composition
      return rawCoins.filter(coin => {
        const matchesSearch = coin.name.toLowerCase().includes(searchTerm) || 
                              coin.symbol.toLowerCase().includes(searchTerm);
        
        const changeVal = parseFloat(coin.changePercent24Hr);
        const matchesCategory = 
          currentCategory === 'all' ? true :
          currentCategory === 'gainers' ? changeVal > 0 :
          currentCategory === 'losers' ? changeVal < 0 : true;

        return matchesSearch && matchesCategory;
      });
    }
  };
}

// Instantiate closure
const filterEngine = createFilterController();

// Global In-Memory Store
let rawMarketData = [];

// DOM Element Selectors
const gridContainer = document.getElementById('crypto-grid');
const statusEl = document.getElementById('status-message');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

const statCountEl = document.getElementById('stat-count');
const statAvgEl = document.getElementById('stat-avg');
const statGainersEl = document.getElementById('stat-gainers');

// --- ASYNC API FETCH ENGINE ---
async function fetchCryptoData() {
  statusEl.style.display = 'block';
  statusEl.textContent = 'Fetching live market data...';
  gridContainer.innerHTML = '';

  try {
    const response = await fetch('https://api.coinlore.net/api/tickers/?start=0&limit=12');
    
    if (!response.ok) {
      throw new Error(`API Error (Status: ${response.status})`);
    }

    const { data } = await response.json();
    rawMarketData = data;
    statusEl.style.display = 'none';
    render();
  } catch (error) {
    console.warn('Network API fetch failed, loading fallback data:', error.message);
    // Graceful Fallback Dataset if CoinCap API rate limit or CORS triggers
    rawMarketData = getFallbackData();
    statusEl.style.display = 'none';
    render();
  }
}

// Analytics calculation using .reduce() with safe fallback parsing
function updateAnalytics(coins) {
  const total = coins.length;
  statCountEl.textContent = total;

  if (total === 0) {
    statAvgEl.textContent = '$0.00';
    statGainersEl.textContent = '0';
    return;
  }

  // Safe .reduce() handles both priceUsd and price_usd
  const totalPriceSum = coins.reduce((acc, coin) => {
    const rawPrice = coin.priceUsd || coin.price_usd || 0;
    const price = parseFloat(rawPrice);
    return acc + (isNaN(price) ? 0 : price);
  }, 0);

  const avgPrice = totalPriceSum / total;

  // Safe .filter() handles both changePercent24Hr and percent_change_24h
  const gainersCount = coins.filter(coin => {
    const rawChange = coin.changePercent24Hr || coin.percent_change_24h || 0;
    return parseFloat(rawChange) > 0;
  }).length;

  statAvgEl.textContent = avgPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  });
  statGainersEl.textContent = gainersCount;
}

// Render function with safe fallbacks
function render() {
  const filteredCoins = filterEngine.applyPipeline(rawMarketData);

  updateAnalytics(filteredCoins);

  if (filteredCoins.length === 0) {
    gridContainer.innerHTML = `<p style="color: var(--muted); grid-column: 1/-1; text-align: center;">No matching assets found.</p>`;
    return;
  }

  gridContainer.innerHTML = filteredCoins.map(coin => {
    const rawPrice = coin.priceUsd || coin.price_usd || 0;
    const rawChange = coin.changePercent24Hr || coin.percent_change_24h || 0;

    const priceNum = parseFloat(rawPrice);
    const changeNum = parseFloat(rawChange);

    const price = (isNaN(priceNum) ? 0 : priceNum).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    });

    const isPositive = changeNum >= 0;
    const badgeClass = isPositive ? 'positive' : 'negative';
    const sign = isPositive ? '+' : '';

    return `
      <article class="coin-card">
        <div class="coin-header">
          <span class="coin-name">${coin.name}</span>
          <span class="coin-symbol">${coin.symbol}</span>
        </div>
        <div class="coin-body">
          <span class="price">${price}</span>
          <span class="change-badge ${badgeClass}">${sign}${changeNum.toFixed(2)}%</span>
        </div>
      </article>
    `;
  }).join('');
}

// --- EVENT LISTENERS ---
searchInput.addEventListener('input', (e) => {
  filterEngine.setSearchTerm(e.target.value);
  render();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    filterEngine.setCategory(e.target.dataset.filter);
    render();
  });
});

refreshBtn.addEventListener('click', () => fetchCryptoData());

// --- FALLBACK MOCK DATA ENGINE ---
function getFallbackData() {
  return [
    { name: 'Bitcoin', symbol: 'BTC', priceUsd: '64230.50', changePercent24Hr: '2.45' },
    { name: 'Ethereum', symbol: 'ETH', priceUsd: '3480.10', changePercent24Hr: '-1.12' },
    { name: 'Solana', symbol: 'SOL', priceUsd: '145.80', changePercent24Hr: '5.60' },
    { name: 'Cardano', symbol: 'ADA', priceUsd: '0.42', changePercent24Hr: '-0.85' },
    { name: 'Avalanche', symbol: 'AVAX', priceUsd: '28.90', changePercent24Hr: '3.10' },
    { name: 'Polkadot', symbol: 'DOT', priceUsd: '6.15', changePercent24Hr: '-2.40' }
  ];
}

// Initial Kickoff
fetchCryptoData();