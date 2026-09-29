/* ============================================================
   VaayuSaarthi – script.js
   Air Quality Monitoring Dashboard
   ============================================================ */

'use strict';

/* ── Data ──────────────────────────────────────────────────── */

const pollutantsData = [
  { name: 'PM2.5', value: 38,  unit: 'μg/m³', max: 250, status: 'Satisfactory', barClass: 'bar-satisfactory', statusClass: 'status-satisfactory' },
  { name: 'PM10',  value: 62,  unit: 'μg/m³', max: 350, status: 'Satisfactory', barClass: 'bar-satisfactory', statusClass: 'status-satisfactory' },
  { name: 'NO₂',  value: 24,  unit: 'μg/m³', max: 200, status: 'Good',         barClass: 'bar-good',         statusClass: 'status-good'          },
  { name: 'SO₂',  value: 11,  unit: 'μg/m³', max: 350, status: 'Good',         barClass: 'bar-good',         statusClass: 'status-good'          },
  { name: 'CO',   value: 0.8, unit: 'mg/m³', max: 10,  status: 'Good',         barClass: 'bar-good',         statusClass: 'status-good'          },
  { name: 'O₃',  value: 58,  unit: 'μg/m³', max: 200, status: 'Satisfactory', barClass: 'bar-satisfactory', statusClass: 'status-satisfactory' },
];

const rankingData = [
  { city: 'Faridabad',     state: 'Haryana',       aqi: 201, status: 'Poor',         bg: 'bg-poor',         trend: '▲', tc: 'trend-up',   time: '10 min ago' },
  { city: 'Delhi',         state: 'Delhi',          aqi: 168, status: 'Moderate',     bg: 'bg-moderate',     trend: '▲', tc: 'trend-up',   time: '5 min ago'  },
  { city: 'Noida',         state: 'Uttar Pradesh',  aqi: 142, status: 'Moderate',     bg: 'bg-moderate',     trend: '▼', tc: 'trend-down', time: '8 min ago'  },
  { city: 'Rohtak',        state: 'Haryana',        aqi: 118, status: 'Moderate',     bg: 'bg-moderate',     trend: '→', tc: 'trend-same', time: '12 min ago' },
  { city: 'Gurugram',      state: 'Haryana',        aqi: 89,  status: 'Satisfactory', bg: 'bg-satisfactory', trend: '▼', tc: 'trend-down', time: '6 min ago'  },
  { city: 'Greater Noida', state: 'Uttar Pradesh',  aqi: 76,  status: 'Satisfactory', bg: 'bg-satisfactory', trend: '▼', tc: 'trend-down', time: '9 min ago'  },
  { city: 'Ghaziabad',     state: 'Uttar Pradesh',  aqi: 55,  status: 'Satisfactory', bg: 'bg-satisfactory', trend: '▼', tc: 'trend-down', time: '3 min ago'  },
  { city: 'Sonipat',       state: 'Haryana',        aqi: 44,  status: 'Good',         bg: 'bg-good',         trend: '▼', tc: 'trend-down', time: '15 min ago' },
];

/** AQI card background per quality category */
const cardColors = {
  Good:          '#66bb6a',
  Satisfactory:  '#4caf50',
  Moderate:      '#ffc107',
  Poor:          '#ff9800',
  'Very Poor':   '#f44336',
  Severe:        '#9c27b0',
};

/** Human-readable language names */
const languageNames = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
};

/* ── Render: Pollutants Grid ───────────────────────────────── */

function renderPollutants() {
  const grid = document.getElementById('pollutantsGrid');

  grid.innerHTML = pollutantsData.map(p => {
    const pct = Math.min(100, (p.value / p.max) * 100).toFixed(1);
    return `
      <div class="pollutant-card">
        <span class="pollutant-name">${p.name}</span>
        <div class="pollutant-value-row">
          <span class="pollutant-value">${p.value}</span>
          <span class="pollutant-unit">${p.unit}</span>
        </div>
        <div class="pollutant-bar-bg">
          <div class="pollutant-bar ${p.barClass}" style="width:${pct}%"></div>
        </div>
        <span class="pollutant-status ${p.statusClass}">${p.status}</span>
      </div>
    `;
  }).join('');
}

/* ── Render: Ranking Table ─────────────────────────────────── */

function renderRanking() {
  const tbody = document.getElementById('rankingBody');

  tbody.innerHTML = rankingData.map((r, i) => `
    <tr>
      <td><span class="rank-num">${i + 1}</span></td>
      <td>
        <div class="rank-city">${r.city}</div>
        <div class="rank-state">${r.state}</div>
      </td>
      <td><span class="aqi-pill ${r.bg}">${r.aqi}</span></td>
      <td>${r.status}</td>
      <td><span class="${r.tc}">${r.trend}</span></td>
      <td style="font-size:11px;color:#888;">${r.time}</td>
    </tr>
  `).join('');
}

/* ── Init: AQI 3-Day Chart ─────────────────────────────────── */

function initChart() {
  const today  = new Date();
  const labels = [-2, -1, 0].map(d => {
    const dt = new Date(today);
    dt.setDate(dt.getDate() + d);
    return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
  });

  new Chart(document.getElementById('aqiChart').getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'AQI',
        data: [72, 61, 55],
        borderColor: 'rgba(255,255,255,0.9)',
        backgroundColor: 'rgba(255,255,255,0.15)',
        pointBackgroundColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          callbacks: { label: ctx => ` AQI: ${ctx.parsed.y}` },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.15)' },
          ticks: { color: 'rgba(255,255,255,0.85)', font: { size: 11 } },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.15)' },
          ticks: { color: 'rgba(255,255,255,0.85)', font: { size: 11 } },
          min: 0,
          max: 150,
        },
      },
    },
  });
}

/* ── Init: Leaflet Live Map ────────────────────────────────── */

function initMap() {
  const map = L.map('live-map', {
    zoomControl: true,
    scrollWheelZoom: false,
  }).setView([28.60, 77.30], 9);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  const cities = [
    { name: 'Ghaziabad',     lat: 28.67, lng: 77.41, aqi: 55,  color: '#8bc34a' },
    { name: 'Delhi',         lat: 28.61, lng: 77.21, aqi: 168, color: '#ffc107' },
    { name: 'Noida',         lat: 28.57, lng: 77.32, aqi: 142, color: '#ffc107' },
    { name: 'Gurugram',      lat: 28.46, lng: 77.03, aqi: 89,  color: '#8bc34a' },
    { name: 'Faridabad',     lat: 28.40, lng: 77.31, aqi: 201, color: '#ff9800' },
    { name: 'Greater Noida', lat: 28.47, lng: 77.50, aqi: 76,  color: '#8bc34a' },
  ];

  cities.forEach(c => {
    L.circleMarker([c.lat, c.lng], {
      radius: 14,
      fillColor: c.color,
      color: '#fff',
      weight: 2,
      fillOpacity: 0.85,
    })
      .addTo(map)
      .bindPopup(`<b>${c.name}</b><br>AQI: <b>${c.aqi}</b>`);

    L.marker([c.lat, c.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div style="font-size:10px;font-weight:700;color:#222;background:rgba(255,255,255,0.88);border-radius:3px;padding:1px 4px;white-space:nowrap;">${c.aqi}</div>`,
        iconAnchor: [16, -10],
      }),
    }).addTo(map);
  });
}

/* ── City Selector ─────────────────────────────────────────── */

function toggleCityDropdown() {
  document.getElementById('cityDropdown').classList.toggle('open');
}

function selectCity(name, aqi, quality) {
  document.getElementById('selectedCity').textContent  = name;
  document.getElementById('aqiValue').textContent      = aqi;
  document.getElementById('qualityBadge').textContent  = quality;
  document.getElementById('aqiCard').style.background  = cardColors[quality] || '#4caf50';

  document.querySelectorAll('#cityDropdown li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('cityDropdown').classList.remove('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.city-selector')) {
    document.getElementById('cityDropdown').classList.remove('open');
  }
});

/* ── Login Modal ───────────────────────────────────────────── */

function openLogin() {
  document.getElementById('loginOverlay').classList.add('open');
}

function closeLogin(e) {
  if (e.target.id === 'loginOverlay') {
    document.getElementById('loginOverlay').classList.remove('open');
  }
}

/* ── Language Modal ────────────────────────────────────────── */

function openLang() {
  document.getElementById('langOverlay').classList.add('open');
}

function closeLang(e) {
  if (e.target.id === 'langOverlay') {
    document.getElementById('langOverlay').classList.remove('open');
  }
}

function setLang(code) {
  alert(`Language set to: ${languageNames[code] || code}\n(Connect to i18n system for full translation)`);
  document.getElementById('langOverlay').classList.remove('open');
}

/* ── Live AQI Ticker (simulates real-time updates) ─────────── */

setInterval(() => {
  const current = parseInt(document.getElementById('aqiValue').textContent, 10);
  const delta   = Math.floor(Math.random() * 5) - 2;
  document.getElementById('aqiValue').textContent = Math.max(10, Math.min(500, current + delta));
}, 8000);

/* ── Boot ──────────────────────────────────────────────────── */

renderPollutants();
renderRanking();
initChart();
initMap();
