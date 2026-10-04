import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import L from 'leaflet';
import { cardColors, cityOptions, pollutantsData } from '../data.js';

function AqiHistoryChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const labels = [-2, -1, 0].map(offset => {
      const date = new Date(today);
      date.setDate(date.getDate() + offset);
      return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
    });
    const chart = new Chart(canvasRef.current, {
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
    return () => chart.destroy();
  }, []);

  return <canvas ref={canvasRef} aria-label="AQI for the past three days" />;
}

function RegionalMap({ t }) {
  const mapElementRef = useRef(null);
  const [locationState, setLocationState] = useState('locating');

  useEffect(() => {
    const map = L.map(mapElementRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([28.60, 77.30], 9);
    let cancelled = false;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    const cities = [
      { name: 'Ghaziabad', lat: 28.67, lng: 77.41, aqi: 55, color: '#8bc34a' },
      { name: 'Delhi', lat: 28.61, lng: 77.21, aqi: 168, color: '#ffc107' },
      { name: 'Noida', lat: 28.57, lng: 77.32, aqi: 142, color: '#ffc107' },
      { name: 'Gurugram', lat: 28.46, lng: 77.03, aqi: 89, color: '#8bc34a' },
      { name: 'Faridabad', lat: 28.40, lng: 77.31, aqi: 201, color: '#ff9800' },
      { name: 'Greater Noida', lat: 28.47, lng: 77.50, aqi: 76, color: '#8bc34a' },
    ];

    cities.forEach(city => {
      L.circleMarker([city.lat, city.lng], {
        radius: 14, fillColor: city.color, color: '#fff', weight: 2, fillOpacity: 0.85,
      }).addTo(map).bindPopup(`<b>${city.name}</b><br>AQI: <b>${city.aqi}</b>`);
      L.marker([city.lat, city.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="font-size:10px;font-weight:700;color:#222;background:rgba(255,255,255,0.88);border-radius:3px;padding:1px 4px;white-space:nowrap;">${city.aqi}</div>`,
          iconAnchor: [16, -10],
        }),
      }).addTo(map);
    });

    if (!navigator.geolocation) {
      setLocationState('unavailable');
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        if (cancelled) return;
        const point = [position.coords.latitude, position.coords.longitude];
        map.setView(point, 12);
        L.circleMarker(point, {
          radius: 8, fillColor: '#1769aa', color: '#fff', weight: 3, fillOpacity: 1,
        }).addTo(map).bindPopup('Your current location');
        setLocationState('found');
      }, () => {
        if (!cancelled) setLocationState('unavailable');
      }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 });
    }

    return () => {
      cancelled = true;
      map.remove();
    };
  }, []);

  const locationText = locationState === 'found'
    ? t('yourLocation', 'Your current location')
    : locationState === 'unavailable'
      ? t('locationUnavailable', 'Location unavailable')
      : t('locating', 'Locating…');

  return (
    <div className="map-card">
      <div className="map-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" aria-hidden="true">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{t('mapTitle', 'Regional monitor map')}</span>
        <span className="location-status" aria-live="polite">{locationText}</span>
      </div>
      <div id="live-map" ref={mapElementRef} />
    </div>
  );
}

function AqiCard({ city, onCitySelect, t }) {
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  return (
    <div className="aqi-card" style={{ background: cardColors[city.quality] || '#4caf50' }}>
      <div className="live-badge"><span className="live-dot" /><span>{t('demoFeed', 'Demo feed')}</span></div>
      <div className="aqi-meta">
        <div className="aqi-left">
          <span className="aqi-label">{t('airQuality', 'Air Quality is :')}</span>
          <span className="aqi-quality-badge">{city.quality}</span>
          <span className="aqi-value">{city.aqi}</span>
        </div>
        <div className="city-selector">
          <button className="city-btn" type="button" aria-expanded={cityMenuOpen} onClick={() => setCityMenuOpen(open => !open)}>
            <span>{city.name}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {cityMenuOpen && (
            <ul className="city-dropdown open" role="listbox" aria-label="Select city">
              {cityOptions.map(option => (
                <li key={option.name} className={option.name === city.name ? 'active' : ''}>
                  <button className="city-option" type="button" role="option" aria-selected={option.name === city.name} onClick={() => { onCitySelect(option); setCityMenuOpen(false); }}>
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="aqi-chart-wrap">
        <div className="chart-label">AQI · past 3 days</div>
        <div className="chart-canvas-wrap"><AqiHistoryChart /></div>
      </div>
    </div>
  );
}

export default function HomePage({ city, onCitySelect, t }) {
  return (
    <>
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">{t('eyebrow', 'DELHI NCR · AIR QUALITY INTELLIGENCE')}</p>
          <h1>{t('headline', 'Know what the air is carrying.')}</h1>
          <p className="dashboard-subtitle">{t('subtitle', 'A regional outlook for pollution, weather and inversion conditions.')}</p>
        </div>
        <span className="prototype-tag"><span /><span>{t('prototype', 'Forecast prototype · sample data')}</span></span>
      </header>

      <section style={{ marginBottom: 24 }}>
        <div className="section-label">{t('aqiIndex', 'AQI INDEX:')}</div>
        <div className="aqi-row">
          <AqiCard city={city} onCitySelect={onCitySelect} t={t} />
          <RegionalMap t={t} />
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <div className="section-title">{t('majorPollutants', 'Major Air Pollutants:')}</div>
        <div className="pollutants-grid">
          {pollutantsData.map(pollutant => {
            const percent = Math.min(100, (pollutant.value / pollutant.max) * 100).toFixed(1);
            return (
              <div className="pollutant-card" key={pollutant.name}>
                <span className="pollutant-name">{pollutant.name}</span>
                <div className="pollutant-value-row"><span className="pollutant-value">{pollutant.value}</span><span className="pollutant-unit">{pollutant.unit}</span></div>
                <div className="pollutant-bar-bg"><div className={`pollutant-bar ${pollutant.barClass}`} style={{ width: `${percent}%` }} /></div>
                <span className={`pollutant-status ${pollutant.statusClass}`}>{pollutant.status}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}