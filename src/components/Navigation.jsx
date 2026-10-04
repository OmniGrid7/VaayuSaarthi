import { useEffect, useRef, useState } from 'react';
import logoUrl from '../../assets/vaayusaarthi-logo.svg';

const routes = [
  ['home', 'navHome', 'Home'],
  ['forecast', 'navForecast', '72-hour forecast'],
  ['atmosphere', 'navAtmosphere', 'Atmosphere'],
  ['ranking', 'navRanking', 'Rankings'],
  ['resources', 'navResources', 'Resources'],
];

export default function Navigation({ page, language, onLanguageChange, onLogin, t }) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setLanguageOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setLanguageOpen(false);
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <a className="brand" href="#home" aria-label="VaayuSaarthi home">
          <img className="brand-image" src={logoUrl} alt="VaayuSaarthi — Know the air you breathe" />
        </a>
        <div className="search-wrap">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input type="search" placeholder={t('search', 'Search for a city…')} aria-label={t('search', 'Search for a city…')} />
        </div>
        <button className="btn-login" type="button" onClick={onLogin}>{t('login', 'Login')}</button>
      </div>

      <div className="navbar-bottom">
        {routes.map(([route, key, fallback]) => (
          <a
            className={`nav-link${page === route ? ' active' : ''}`}
            href={`#${route}`}
            key={route}
            aria-current={page === route ? 'page' : undefined}
          >
            {t(key, fallback)}
          </a>
        ))}
        <div className="language-menu" ref={menuRef}>
          <button
            className="language-toggle"
            type="button"
            aria-expanded={languageOpen}
            aria-controls="languageOptions"
            onClick={() => setLanguageOpen(value => !value)}
          >
            <span>{t('language', 'Language')}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div className="language-options" id="languageOptions" role="group" aria-label="Choose language" hidden={!languageOpen}>
            {[
              ['en', 'English'],
              ['hi', 'हिन्दी'],
            ].map(([code, label]) => (
              <button
                className="language-option"
                type="button"
                key={code}
                aria-pressed={language === code}
                onClick={() => {
                  onLanguageChange(code);
                  setLanguageOpen(false);
                }}
              >
                <span>{label}</span><span className="language-check" aria-hidden="true">✓</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}