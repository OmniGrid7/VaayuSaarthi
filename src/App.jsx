import { useEffect, useState } from 'react';
import AtmospherePage from './components/AtmospherePage.jsx';
import ForecastPage from './components/ForecastPage.jsx';
import HomePage from './components/HomePage.jsx';
import LoginModal from './components/LoginModal.jsx';
import Navigation from './components/Navigation.jsx';
import RankingPage from './components/RankingPage.jsx';
import ResourcesPage from './components/ResourcesPage.jsx';
import { cityOptions, translations } from './data.js';

const routeNames = ['home', 'forecast', 'atmosphere', 'ranking', 'resources'];

function routeFromHash() {
  const route = window.location.hash.slice(1);
  return routeNames.includes(route) ? route : 'home';
}

export default function App() {
  const [page, setPage] = useState(routeFromHash);
  const [language, setLanguage] = useState(() => localStorage.getItem('vaayusaarthi-language') || 'en');
  const [city, setCity] = useState(cityOptions[1]);
  const [loginOpen, setLoginOpen] = useState(false);
  const t = (key, fallback) => translations[language]?.[key] || fallback;

  useEffect(() => {
    function syncRoute() {
      const route = routeFromHash();
      if (!routeNames.includes(window.location.hash.slice(1))) history.replaceState(null, '', '#home');
      setPage(route);
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', syncRoute);
    if (!routeNames.includes(window.location.hash.slice(1))) history.replaceState(null, '', '#home');
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('vaayusaarthi-language', language);
    document.title = `VaayuSaarthi – ${page.charAt(0).toUpperCase()}${page.slice(1)}`;
  }, [language, page]);

  return (
    <>
      <Navigation
        page={page}
        language={language}
        onLanguageChange={setLanguage}
        onLogin={() => setLoginOpen(true)}
        t={t}
      />
      <main className="page">
        {page === 'home' && <HomePage city={city} onCitySelect={setCity} t={t} />}
        {page === 'forecast' && <ForecastPage aqi={city.aqi} language={language} t={t} />}
        {page === 'atmosphere' && <AtmospherePage t={t} />}
        {page === 'ranking' && <RankingPage t={t} />}
        {page === 'resources' && <ResourcesPage t={t} />}
      </main>
      <footer className="site-footer"><p>Built by <strong>@Anti-Graviti</strong></p></footer>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}