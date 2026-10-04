export const pollutantsData = [
  { name: 'PM2.5', value: 38, unit: 'μg/m³', max: 250, status: 'Satisfactory', barClass: 'bar-satisfactory', statusClass: 'status-satisfactory' },
  { name: 'PM10', value: 62, unit: 'μg/m³', max: 350, status: 'Satisfactory', barClass: 'bar-satisfactory', statusClass: 'status-satisfactory' },
  { name: 'NOx', value: 34, unit: 'μg/m³', max: 200, status: 'Good', barClass: 'bar-good', statusClass: 'status-good' },
  { name: 'NO₂', value: 24, unit: 'μg/m³', max: 200, status: 'Good', barClass: 'bar-good', statusClass: 'status-good' },
  { name: 'SO₂', value: 11, unit: 'μg/m³', max: 350, status: 'Good', barClass: 'bar-good', statusClass: 'status-good' },
  { name: 'CO', value: 0.8, unit: 'mg/m³', max: 10, status: 'Good', barClass: 'bar-good', statusClass: 'status-good' },
  { name: 'O₃', value: 58, unit: 'μg/m³', max: 200, status: 'Satisfactory', barClass: 'bar-satisfactory', statusClass: 'status-satisfactory' },
];

export const rankingData = [
  { city: 'Faridabad', state: 'Haryana', aqi: 201, status: 'Poor', bg: 'bg-poor', trend: '▲', tc: 'trend-up', time: '10 min ago' },
  { city: 'Delhi', state: 'Delhi', aqi: 168, status: 'Moderate', bg: 'bg-moderate', trend: '▲', tc: 'trend-up', time: '5 min ago' },
  { city: 'Noida', state: 'Uttar Pradesh', aqi: 142, status: 'Moderate', bg: 'bg-moderate', trend: '▼', tc: 'trend-down', time: '8 min ago' },
  { city: 'Rohtak', state: 'Haryana', aqi: 118, status: 'Moderate', bg: 'bg-moderate', trend: '→', tc: 'trend-same', time: '12 min ago' },
  { city: 'Gurugram', state: 'Haryana', aqi: 89, status: 'Satisfactory', bg: 'bg-satisfactory', trend: '▼', tc: 'trend-down', time: '6 min ago' },
  { city: 'Greater Noida', state: 'Uttar Pradesh', aqi: 76, status: 'Satisfactory', bg: 'bg-satisfactory', trend: '▼', tc: 'trend-down', time: '9 min ago' },
  { city: 'Ghaziabad', state: 'Uttar Pradesh', aqi: 55, status: 'Satisfactory', bg: 'bg-satisfactory', trend: '▼', tc: 'trend-down', time: '3 min ago' },
  { city: 'Sonipat', state: 'Haryana', aqi: 44, status: 'Good', bg: 'bg-good', trend: '▼', tc: 'trend-down', time: '15 min ago' },
];

export const cardColors = {
  Good: '#66bb6a', Satisfactory: '#4caf50', Moderate: '#ffc107',
  Poor: '#ff9800', 'Very Poor': '#f44336', Severe: '#9c27b0',
};

export const translations = {
  en: {},
  hi: {
    language: 'भाषा', search: 'शहर खोजें…', login: 'लॉग इन', navHome: 'होम',
    navForecast: '72 घंटे का पूर्वानुमान', navAtmosphere: 'वायुमंडल', navRanking: 'रैंकिंग',
    navResources: 'संसाधन', eyebrow: 'दिल्ली एनसीआर · वायु गुणवत्ता जानकारी',
    headline: 'हवा में क्या है, जानें।', subtitle: 'प्रदूषण, मौसम और तापमान उलटाव का क्षेत्रीय पूर्वानुमान।',
    prototype: 'पूर्वानुमान प्रोटोटाइप · नमूना डेटा', aqiIndex: 'वायु गुणवत्ता सूचकांक:',
    demoFeed: 'डेमो डेटा', airQuality: 'वायु गुणवत्ता:', mapTitle: 'क्षेत्रीय निगरानी मानचित्र',
    locating: 'स्थान खोज रहे हैं…', yourLocation: 'आपका वर्तमान स्थान', locationUnavailable: 'स्थान उपलब्ध नहीं',
    modelOutlook: 'मॉडल पूर्वानुमान', next72: 'अगले 72 घंटे',
    forecastDescription: 'दिल्ली एनसीआर का प्रति घंटे का पूर्वानुमान। तुलना के लिए प्रदूषक चुनें।',
    forecastNote: 'सांकेतिक पूर्वानुमान · आधिकारिक CPCB रीडिंग नहीं',
    forecastProjection: 'पूर्वानुमान', illustrativeValues: 'उदाहरण मान',
    weatherChemistry: 'मौसम × रसायन', shapingAir: 'हवा को क्या प्रभावित कर रहा है',
    weatherDescription: 'वर्तमान स्थिति के मौसम और प्रदूषक परिवहन संकेत।',
    boundaryLayer: 'सीमा-परत की स्थिति', temperature: 'तापमान', coolMorning: 'ठंडी सुबह',
    windSpeed: 'हवा की गति', northwesterly: 'उत्तर-पश्चिमी', pblHeight: 'सीमा-परत ऊँचाई',
    lowDispersion: 'कम फैलाव', humidity: 'सापेक्ष आर्द्रता', elevated: 'अधिक',
    inversionStrength: 'तापमान उलटाव की तीव्रता', moderate: 'मध्यम',
    inversionDescription: 'सतह के पास स्थिर हवा प्रदूषकों के मिश्रण को धीमा कर सकती है और उनकी मात्रा बढ़ा सकती है।',
    upwind: 'हवा के साथ परिवहन', plumeTitle: 'पराली जलाने का धुआँ',
    transportPotential: 'परिवहन की संभावना अधिक',
    plumeDisclaimer: 'केवल उदाहरण। आग की पहचान और धुएँ का परिवहन लाइव उपग्रह या मौसम डेटा से जुड़ा नहीं है।',
    feedbackTitle: 'एरोसोल–विकिरण प्रभाव',
    feedbackDescription: 'युग्मित मॉडल में कण सतह की धूप कम कर सकते हैं, जिससे सतह ठंडी होती है और सीमा-परत का विकास घटता है। यह डैशबोर्ड केवल उदाहरण संकेत दिखाता है; WRF-Chem सिमुलेशन जुड़ा नहीं है।',
    notCoupled: 'जुड़ा नहीं है',
    resourcesEyebrow: 'संदर्भ और सीमाएँ', resourcesTitle: 'संसाधन और डेटा जानकारी',
    resourcesDescription: 'इस प्रोटोटाइप में दिखाई गई जानकारी को समझें।',
    dataNote: 'यह प्रोटोटाइप उदाहरण मान दिखाता है। परिचालन 72 घंटे के पूर्वानुमान के लिए सत्यापित मॉडल, लाइव अवलोकन और मौसम डेटा आवश्यक हैं।',
    majorPollutants: 'मुख्य वायु प्रदूषक:', rankingTitle: 'वायु गुणवत्ता रैंकिंग · दिल्ली एनसीआर नमूना',
    city: 'शहर', status: 'स्थिति', trend: 'रुझान', updated: 'अपडेट',
  },
};

export const forecastMetrics = {
  aqi: { label: 'AQI forecast', unit: 'AQI', color: '#208359' },
  pm25: { label: 'PM2.5 forecast', unit: 'μg/m³', color: '#d5793d' },
  o3: { label: 'O₃ forecast', unit: 'μg/m³', color: '#5576a8' },
  pm10: { label: 'PM10 forecast', unit: 'μg/m³', color: '#aa7951' },
  nox: { label: 'NOx forecast', unit: 'μg/m³', color: '#8260a8' },
};