import { translations } from './data.js';

export function initMap() {
  const map = L.map('live-map', { zoomControl: true, scrollWheelZoom: false }).setView([28.60, 77.30], 9);
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

  requestUserLocation(map);
  return map;
}

function requestUserLocation(map) {
  const status = document.getElementById('locationStatus');
  if (!navigator.geolocation) {
    status.dataset.locationState = 'unavailable';
    status.textContent = 'Location unavailable';
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const point = [position.coords.latitude, position.coords.longitude];
    map.setView(point, 12);
    L.circleMarker(point, {
      radius: 8, fillColor: '#1769aa', color: '#fff', weight: 3, fillOpacity: 1,
    }).addTo(map).bindPopup('Your current location');
    status.dataset.locationState = 'found';
    status.textContent = translations[document.documentElement.lang]?.yourLocation || 'Your current location';
  }, () => {
    status.dataset.locationState = 'unavailable';
    status.textContent = translations[document.documentElement.lang]?.locationUnavailable || 'Location unavailable';
  }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 });
}