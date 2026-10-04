import { initDashboard } from './dashboard.js';
import { initMap } from './map.js';
import { initNavigation } from './navigation.js';

const dashboard = initDashboard();
const map = initMap();

initNavigation({ ...dashboard, map });