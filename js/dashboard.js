import { forecastMetrics, pollutantsData, rankingData } from './data.js';

let forecastChart;
let forecastSeries = [];
let activeForecastMetric = 'aqi';

function renderPollutants() {
  const grid = document.getElementById('pollutantsGrid');
  grid.innerHTML = pollutantsData.map(pollutant => {
    const pct = Math.min(100, (pollutant.value / pollutant.max) * 100).toFixed(1);
    return `
      <div class="pollutant-card">
        <span class="pollutant-name">${pollutant.name}</span>
        <div class="pollutant-value-row">
          <span class="pollutant-value">${pollutant.value}</span>
          <span class="pollutant-unit">${pollutant.unit}</span>
        </div>
        <div class="pollutant-bar-bg">
          <div class="pollutant-bar ${pollutant.barClass}" style="width:${pct}%"></div>
        </div>
        <span class="pollutant-status ${pollutant.statusClass}">${pollutant.status}</span>
      </div>
    `;
  }).join('');
}

function renderRanking() {
  const tbody = document.getElementById('rankingBody');
  tbody.innerHTML = rankingData.map((row, index) => `
    <tr>
      <td><span class="rank-num">${index + 1}</span></td>
      <td><div class="rank-city">${row.city}</div><div class="rank-state">${row.state}</div></td>
      <td><span class="aqi-pill ${row.bg}">${row.aqi}</span></td>
      <td>${row.status}</td>
      <td><span class="${row.tc}">${row.trend}</span></td>
      <td style="font-size:11px;color:#888;">${row.time}</td>
    </tr>
  `).join('');
}

function initAqiChart() {
  const today = new Date();
  const labels = [-2, -1, 0].map(offset => {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
  });

  new Chart(document.getElementById('aqiChart').getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'AQI', data: [72, 61, 55], borderColor: 'rgba(255,255,255,0.9)',
        backgroundColor: 'rgba(255,255,255,0.15)', pointBackgroundColor: '#fff',
        pointRadius: 4, pointHoverRadius: 6, fill: true, tension: 0.4, borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.7)', callbacks: { label: context => ` AQI: ${context.parsed.y}` } },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.15)' }, ticks: { color: 'rgba(255,255,255,0.85)', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.15)' }, ticks: { color: 'rgba(255,255,255,0.85)', font: { size: 11 } }, min: 0, max: 150 },
      },
    },
  });
}

function buildForecastSeries() {
  const currentAqi = Number.parseInt(document.getElementById('aqiValue').textContent, 10) || 55;
  const start = new Date();
  forecastSeries = Array.from({ length: 72 }, (_, index) => {
    const time = new Date(start);
    time.setHours(start.getHours() + index + 1, 0, 0, 0);
    const hourAngle = ((time.getHours() - 15) / 24) * Math.PI * 2;
    const daylight = Math.max(0, 1 - Math.abs(time.getHours() - 14) / 8);
    const aqi = Math.max(18, Math.min(450, Math.round(currentAqi + index * 0.12 + Math.sin(index / 8) * 9 + Math.sin(hourAngle) * 12)));
    return {
      time,
      aqi,
      pm25: Math.max(5, Math.round(aqi * 0.38 + 10 + Math.sin(index / 7) * 3)),
      o3: Math.max(12, Math.round(28 + daylight * 52 + Math.sin(index / 9) * 5)),
      pm10: Math.max(10, Math.round(aqi * 0.72 + 18 + Math.sin(index / 10) * 7)),
      nox: Math.max(4, Math.round(18 + aqi * 0.15 + Math.sin(index / 6) * 6)),
    };
  });
}

function renderDailyForecast() {
  const dailyForecast = document.getElementById('dailyForecast');
  const dayGroups = [];
  forecastSeries.forEach(point => {
    const dayKey = point.time.toLocaleDateString('en-CA');
    let group = dayGroups.find(day => day.key === dayKey);
    if (!group) {
      group = { key: dayKey, date: point.time, points: [] };
      dayGroups.push(group);
    }
    group.points.push(point);
  });

  dailyForecast.innerHTML = dayGroups.slice(0, 3).map(day => {
    const average = key => Math.round(day.points.reduce((sum, point) => sum + point[key], 0) / day.points.length);
    const dayLabel = day.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
    return `
      <article class="daily-card">
        <h3>${dayLabel}</h3>
        <div class="daily-card-main"><strong>${average('aqi')}</strong><span>average AQI</span></div>
        <div class="daily-pollutants">
          <span>PM2.5<strong>${average('pm25')} μg/m³</strong></span>
          <span>O₃<strong>${average('o3')} μg/m³</strong></span>
          <span>PM10<strong>${average('pm10')} μg/m³</strong></span>
          <span>NOx<strong>${average('nox')} μg/m³</strong></span>
        </div>
      </article>
    `;
  }).join('');
}

function renderForecast() {
  buildForecastSeries();
  renderDailyForecast();
  const metric = forecastMetrics[activeForecastMetric];
  document.getElementById('forecastMetricLabel').textContent = metric.label;
  const labels = forecastSeries.map(point => point.time.toLocaleString('en-IN', {
    weekday: 'short', hour: 'numeric', hour12: true,
  }));
  const values = forecastSeries.map(point => point[activeForecastMetric]);

  if (!forecastChart) {
    forecastChart = new Chart(document.getElementById('forecastChart').getContext('2d'), {
      type: 'line',
      data: { labels, datasets: [{ data: values, borderColor: metric.color, backgroundColor: `${metric.color}1c`, pointRadius: 0, pointHoverRadius: 4, fill: true, tension: 0.32, borderWidth: 2 }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: context => ` ${context.parsed.y} ${metric.unit}` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#738078', maxRotation: 0, autoSkip: false, callback: (value, index) => index % 12 === 0 ? labels[index] : '' } },
          y: { beginAtZero: true, grid: { color: '#edf1ed' }, ticks: { color: '#738078', maxTicksLimit: 6 }, title: { display: true, text: metric.unit, color: '#738078', font: { size: 10 } } },
        },
      },
    });
    return;
  }

  forecastChart.data.labels = labels;
  forecastChart.data.datasets[0].data = values;
  forecastChart.data.datasets[0].borderColor = metric.color;
  forecastChart.data.datasets[0].backgroundColor = `${metric.color}1c`;
  forecastChart.options.plugins.tooltip.callbacks.label = context => ` ${context.parsed.y} ${metric.unit}`;
  forecastChart.options.scales.y.title.text = metric.unit;
  forecastChart.update();
}

function bindMetricTabs() {
  document.querySelectorAll('.metric-tab').forEach(button => {
    button.addEventListener('click', () => {
      activeForecastMetric = button.dataset.metric;
      document.querySelectorAll('.metric-tab').forEach(tab => {
        const selected = tab === button;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-pressed', String(selected));
      });
      renderForecast();
    });
  });
}

export function initDashboard() {
  renderPollutants();
  renderRanking();
  initAqiChart();
  renderForecast();
  bindMetricTabs();
  return {
    renderForecast,
    resizeForecast: () => forecastChart?.resize(),
  };
}