import { cardColors, translations } from './data.js';

export function initNavigation({ renderForecast, map, resizeForecast }) {
  function toggleCityDropdown() {
    document.getElementById('cityDropdown').classList.toggle('open');
  }

  function selectCity(name, aqi, quality) {
    document.getElementById('selectedCity').textContent = name;
    document.getElementById('aqiValue').textContent = aqi;
    document.getElementById('qualityBadge').textContent = quality;
    document.getElementById('aqiCard').style.background = cardColors[quality] || '#4caf50';
    document.querySelectorAll('#cityDropdown li').forEach(item => {
      item.classList.toggle('active', item.textContent.trim() === name);
    });
    document.getElementById('cityDropdown').classList.remove('open');
    renderForecast();
  }

  function openLogin() {
    document.getElementById('loginOverlay').classList.add('open');
  }

  function closeLogin(event) {
    if (event.target.id === 'loginOverlay') document.getElementById('loginOverlay').classList.remove('open');
  }

  function toggleLanguageMenu() {
    const options = document.getElementById('languageOptions');
    const toggle = document.getElementById('languageToggle');
    options.hidden = !options.hidden;
    toggle.setAttribute('aria-expanded', String(!options.hidden));
  }

  function closeLanguageMenu() {
    document.getElementById('languageOptions').hidden = true;
    document.getElementById('languageToggle').setAttribute('aria-expanded', 'false');
  }

  function setLang(code) {
    const language = translations[code] ? code : 'en';
    const dictionary = translations[language];
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      if (!element.dataset.defaultText) element.dataset.defaultText = element.textContent;
      element.textContent = dictionary[element.dataset.i18n] || element.dataset.defaultText;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      if (!element.dataset.defaultPlaceholder) element.dataset.defaultPlaceholder = element.placeholder;
      element.placeholder = dictionary[element.dataset.i18nPlaceholder] || element.dataset.defaultPlaceholder;
    });
    const locationStatus = document.getElementById('locationStatus');
    if (locationStatus.dataset.locationState === 'found') {
      locationStatus.textContent = dictionary.yourLocation || 'Your current location';
    } else if (locationStatus.dataset.locationState === 'unavailable') {
      locationStatus.textContent = dictionary.locationUnavailable || 'Location unavailable';
    }
    document.querySelectorAll('.language-option').forEach(option => {
      option.setAttribute('aria-pressed', String(option.dataset.language === language));
    });
    localStorage.setItem('vaayusaarthi-language', language);
    closeLanguageMenu();
  }

  const routeNames = ['home', 'forecast', 'atmosphere', 'ranking', 'resources'];
  function showPage() {
    let page = window.location.hash.slice(1);
    if (!routeNames.includes(page)) {
      page = 'home';
      history.replaceState(null, '', '#home');
    }
    document.querySelectorAll('.route-page').forEach(view => {
      view.classList.toggle('active', view.dataset.page === page);
    });
    document.querySelectorAll('.nav-link[data-route]').forEach(link => {
      const selected = link.dataset.route === page;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `VaayuSaarthi – ${page.charAt(0).toUpperCase()}${page.slice(1)}`;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      if (page === 'home') map.invalidateSize();
      if (page === 'forecast') resizeForecast();
    });
  }

  document.addEventListener('click', event => {
    if (!event.target.closest('.city-selector')) document.getElementById('cityDropdown').classList.remove('open');
    if (!event.target.closest('#languageMenu')) closeLanguageMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLanguageMenu();
  });
  window.addEventListener('hashchange', showPage);
  Object.assign(window, { toggleCityDropdown, selectCity, openLogin, closeLogin, toggleLanguageMenu, setLang });
  setLang(localStorage.getItem('vaayusaarthi-language') || 'en');
  if (!window.location.hash) history.replaceState(null, '', '#home');
  showPage();
}