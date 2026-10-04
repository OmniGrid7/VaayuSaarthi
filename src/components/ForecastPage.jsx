import { useEffect, useMemo, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { forecastMetrics } from '../data.js';

function buildForecastSeries(currentAqi) {
  const start = new Date();
  return Array.from({ length: 72 }, (_, index) => {
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

function groupByDay(points, locale) {
  const groups = new Map();
  points.forEach(point => {
    const key = point.time.toLocaleDateString('en-CA');
    if (!groups.has(key)) groups.set(key, { date: point.time, points: [] });
    groups.get(key).points.push(point);
  });
  return [...groups.values()].slice(0, 3).map(day => {
    const average = key => Math.round(day.points.reduce((sum, point) => sum + point[key], 0) / day.points.length);
    return {
      label: day.date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' }),
      aqi: average('aqi'),
      pm25: average('pm25'),
      o3: average('o3'),
      pm10: average('pm10'),
      nox: average('nox'),
    };
  });
}

export default function ForecastPage({ aqi, language, t }) {
  const [metric, setMetric] = useState('aqi');
  const canvasRef = useRef(null);
  const series = useMemo(() => buildForecastSeries(aqi), [aqi]);
  const locale = language === 'hi' ? 'hi-IN' : 'en-IN';
  const dailySummary = useMemo(() => groupByDay(series, locale), [series, locale]);

  useEffect(() => {
    const config = forecastMetrics[metric];
    const labels = series.map(point => point.time.toLocaleString(locale, {
      weekday: 'short', hour: 'numeric', hour12: true,
    }));
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: series.map(point => point[metric]),
          borderColor: config.color,
          backgroundColor: `${config.color}1c`,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.32,
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: context => ` ${context.parsed.y} ${config.unit}` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#738078', maxRotation: 0, autoSkip: false, callback: (value, index) => index % 12 === 0 ? labels[index] : '' } },
          y: { beginAtZero: true, grid: { color: '#edf1ed' }, ticks: { color: '#738078', maxTicksLimit: 6 }, title: { display: true, text: config.unit, color: '#738078', font: { size: 10 } } },
        },
      },
    });
    return () => chart.destroy();
  }, [language, locale, metric, series]);

  return (
    <section className="forecast-section">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">{t('modelOutlook', 'MODEL OUTLOOK')}</p>
          <h2>{t('next72', 'Next 72 hours')}</h2>
          <p className="section-description">{t('forecastDescription', 'Hourly outlook across Delhi NCR. Switch pollutant to compare its forecast.')}</p>
        </div>
        <div className="metric-tabs" role="group" aria-label="Forecast pollutant">
          {[
            ['aqi', 'AQI'], ['pm25', 'PM2.5'], ['o3', 'O₃'], ['pm10', 'PM10'], ['nox', 'NOx'],
          ].map(([key, label]) => (
            <button className={`metric-tab${metric === key ? ' active' : ''}`} type="button" key={key} data-metric={key} aria-pressed={metric === key} onClick={() => setMetric(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="forecast-chart-panel">
        <div className="forecast-chart-meta">
          <span>{forecastMetrics[metric].label}</span>
          <span className="forecast-model-note">{t('forecastNote', 'Illustrative forecast · not an official CPCB reading')}</span>
        </div>
        <div className="forecast-chart-wrap"><canvas ref={canvasRef} aria-label="Hourly 72-hour air quality forecast chart" /></div>
        <div className="chart-legend"><span className="legend-line" />{t('forecastProjection', 'Forecast projection')}<span className="legend-sample">{t('illustrativeValues', 'Illustrative values')}</span></div>
      </div>
      <div className="daily-forecast-grid" aria-live="polite">
        {dailySummary.map(day => (
          <article className="daily-card" key={day.label}>
            <h3>{day.label}</h3>
            <div className="daily-card-main"><strong>{day.aqi}</strong><span>average AQI</span></div>
            <div className="daily-pollutants">
              <span>PM2.5<strong>{day.pm25} μg/m³</strong></span>
              <span>O₃<strong>{day.o3} μg/m³</strong></span>
              <span>PM10<strong>{day.pm10} μg/m³</strong></span>
              <span>NOx<strong>{day.nox} μg/m³</strong></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}