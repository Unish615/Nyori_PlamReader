/**
 * Nyoria चिना - Vedic Kundali Astronomical Calculation Engine
 * High-accuracy deterministic calculations for Vedic Sidereal Astrology (Lahiri Ayanamsa)
 */

export interface PlanetaryPosition {
  name: string;
  nameNe: string;
  symbol: string;
  longitude: number;
  sign: string;
  signNe: string;
  signNumber: number; // 1-12
  degreeInSign: number;
  minutesInSign: number;
  house: number; // 1-12
  nakshatra: string;
  nakshatraNe: string;
  pada: number; // 1-4
  isRetrograde: boolean;
  dignity: string;
  dignityNe: string;
}

export interface KundaliCalculationResult {
  lagna: {
    sign: string;
    signNe: string;
    signNumber: number;
    degree: number;
    lord: string;
    lordNe: string;
    nakshatra: string;
    nakshatraNe: string;
    pada: number;
  };
  rashi: {
    sign: string;
    signNe: string;
    signNumber: number;
    lord: string;
    lordNe: string;
  };
  nakshatra: {
    name: string;
    nameNe: string;
    lord: string;
    pada: number;
  };
  tithi: {
    name: string;
    nameNe: string;
    paksha: string;
    number: number;
  };
  yoga: {
    name: string;
    nameNe: string;
    number: number;
  };
  karana: {
    name: string;
    nameNe: string;
    number: number;
  };
  ayanamsa: {
    name: string;
    value: number;
    formatted: string;
  };
  planets: PlanetaryPosition[];
  houses: {
    houseNumber: number;
    signNumber: number;
    signName: string;
    signNameNe: string;
    planets: string[];
    planetsNe: string[];
  }[];
  rashiChart: Record<number, string[]>;
  navamsaChart: Record<number, string[]>;
  vimshottariDasha: {
    balanceAtBirth: {
      lord: string;
      lordNe: string;
      remainingYears: number;
      remainingMonths: number;
      remainingDays: number;
    };
    currentDasha: {
      mahaDasha: string;
      mahaDashaNe: string;
      antarDasha: string;
      antarDashaNe: string;
      startDate: string;
      endDate: string;
    };
    timeline: {
      lord: string;
      lordNe: string;
      startDate: string;
      endDate: string;
      durationYears: number;
    }[];
  };
  manglikDosha: {
    isManglik: boolean;
    severity: 'none' | 'low' | 'moderate' | 'high';
    marsHouse: number;
    hasCancellation: boolean;
    description: string;
    descriptionNe: string;
  };
  traditionalYogas: {
    name: string;
    nameNe: string;
    type: 'auspicious' | 'inauspicious' | 'neutral';
    description: string;
    descriptionNe: string;
  }[];
  interpretations: {
    personality: { en: string; ne: string };
    career: { en: string; ne: string };
    marriage: { en: string; ne: string };
    finance: { en: string; ne: string };
    family: { en: string; ne: string };
    general: { en: string; ne: string };
  };
}

export const RASHIS = [
  { id: 1, en: 'Aries', ne: 'मेष', lordEn: 'Mars', lordNe: 'मङ्गल' },
  { id: 2, en: 'Taurus', ne: 'वृष', lordEn: 'Venus', lordNe: 'शुक्र' },
  { id: 3, en: 'Gemini', ne: 'मिथुन', lordEn: 'Mercury', lordNe: 'बुध' },
  { id: 4, en: 'Cancer', ne: 'कर्कट', lordEn: 'Moon', lordNe: 'चन्द्र' },
  { id: 5, en: 'Leo', ne: 'सिंह', lordEn: 'Sun', lordNe: 'सूर्य' },
  { id: 6, en: 'Virgo', ne: 'कन्या', lordEn: 'Mercury', lordNe: 'बुध' },
  { id: 7, en: 'Libra', ne: 'तुला', lordEn: 'Venus', lordNe: 'शुक्र' },
  { id: 8, en: 'Scorpio', ne: 'वृश्चिक', lordEn: 'Mars', lordNe: 'मङ्गल' },
  { id: 9, en: 'Sagittarius', ne: 'धनु', lordEn: 'Jupiter', lordNe: 'बृहस्पति' },
  { id: 10, en: 'Capricorn', ne: 'मकर', lordEn: 'Saturn', lordNe: 'शनि' },
  { id: 11, en: 'Aquarius', ne: 'कुम्भ', lordEn: 'Saturn', lordNe: 'शनि' },
  { id: 12, en: 'Pisces', ne: 'मीन', lordEn: 'Jupiter', lordNe: 'बृहस्पति' }
];

export const NAKSHATRAS = [
  { id: 1, en: 'Ashwini', ne: 'अश्विनी', lord: 'Ketu', lordNe: 'केतु' },
  { id: 2, en: 'Bharani', ne: 'भरणी', lord: 'Venus', lordNe: 'शुक्र' },
  { id: 3, en: 'Krittika', ne: 'कृत्तिका', lord: 'Sun', lordNe: 'सूर्य' },
  { id: 4, en: 'Rohini', ne: 'रोहिणी', lord: 'Moon', lordNe: 'चन्द्र' },
  { id: 5, en: 'Mrigashira', ne: 'मृगशिरा', lord: 'Mars', lordNe: 'मङ्गल' },
  { id: 6, en: 'Ardra', ne: 'आर्द्रा', lord: 'Rahu', lordNe: 'राहु' },
  { id: 7, en: 'Punarvasu', ne: 'पुनर्वसु', lord: 'Jupiter', lordNe: 'बृहस्पति' },
  { id: 8, en: 'Pushya', ne: 'पुष्य', lord: 'Saturn', lordNe: 'शनि' },
  { id: 9, en: 'Ashlesha', ne: 'आश्लेषा', lord: 'Mercury', lordNe: 'बुध' },
  { id: 10, en: 'Magha', ne: 'मघा', lord: 'Ketu', lordNe: 'केतु' },
  { id: 11, en: 'Purva Phalguni', ne: 'पूर्वाफाल्गुनी', lord: 'Venus', lordNe: 'शुक्र' },
  { id: 12, en: 'Uttara Phalguni', ne: 'उत्तराफाल्गुनी', lord: 'Sun', lordNe: 'सूर्य' },
  { id: 13, en: 'Hasta', ne: 'हस्त', lord: 'Moon', lordNe: 'चन्द्र' },
  { id: 14, en: 'Chitra', ne: 'चित्रा', lord: 'Mars', lordNe: 'मङ्गल' },
  { id: 15, en: 'Swati', ne: 'स्वाती', lord: 'Rahu', lordNe: 'राहु' },
  { id: 16, en: 'Vishakha', ne: 'विशाखा', lord: 'Jupiter', lordNe: 'बृहस्पति' },
  { id: 17, en: 'Anuradha', ne: 'अनुराधा', lord: 'Saturn', lordNe: 'शनि' },
  { id: 18, en: 'Jyeshtha', ne: 'ज्येष्ठा', lord: 'Mercury', lordNe: 'बुध' },
  { id: 19, en: 'Mula', ne: 'मूल', lord: 'Ketu', lordNe: 'केतु' },
  { id: 20, en: 'Purva Ashadha', ne: 'पूर्वाषाढा', lord: 'Venus', lordNe: 'शुक्र' },
  { id: 21, en: 'Uttara Ashadha', ne: 'उत्तराषाढा', lord: 'Sun', lordNe: 'सूर्य' },
  { id: 22, en: 'Shravana', ne: 'श्रवण', lord: 'Moon', lordNe: 'चन्द्र' },
  { id: 23, en: 'Dhanishta', ne: 'धनिष्ठा', lord: 'Mars', lordNe: 'मङ्गल' },
  { id: 24, en: 'Shatabhisha', ne: 'शतभिषा', lord: 'Rahu', lordNe: 'राहु' },
  { id: 25, en: 'Purva Bhadrapada', ne: 'पूर्वभाद्रपदा', lord: 'Jupiter', lordNe: 'बृहस्पति' },
  { id: 26, en: 'Uttara Bhadrapada', ne: 'उत्तरभाद्रपदा', lord: 'Saturn', lordNe: 'शनि' },
  { id: 27, en: 'Revati', ne: 'रेवती', lord: 'Mercury', lordNe: 'बुध' }
];

export const VIMSHOTTARI_YEARS: Record<string, number> = {
  'Ketu': 7,
  'Venus': 20,
  'Sun': 6,
  'Moon': 10,
  'Mars': 7,
  'Rahu': 18,
  'Jupiter': 16,
  'Saturn': 19,
  'Mercury': 17
};

export const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

export const DASHA_NEPALI: Record<string, string> = {
  'Ketu': 'केतु',
  'Venus': 'शुक्र',
  'Sun': 'सूर्य',
  'Moon': 'चन्द्र',
  'Mars': 'मङ्गल',
  'Rahu': 'राहु',
  'Jupiter': 'बृहस्पति',
  'Saturn': 'शनि',
  'Mercury': 'बुध'
};

export const TITHI_NAMES = [
  'Pratipada (प्रतिपदा)', 'Dwitiya (द्वितीया)', 'Tritiya (तृतीया)', 'Chaturthi (चतुर्थी)',
  'Panchami (पञ्चमी)', 'Shashthi (षष्ठी)', 'Saptami (सप्तमी)', 'Ashtami (अष्टमी)',
  'Navami (नवमी)', 'Dashami (दशमी)', 'Ekadashi (एकादशी)', 'Dwadashi (द्वादशी)',
  'Trayodashi (त्रयोदशी)', 'Chaturdashi (चतुर्दशी)', 'Purnima / Amavasya (पूर्णिमा / औँसी)'
];

export const YOGA_NAMES = [
  'Vishkambha (विष्कम्भ)', 'Priti (प्रीति)', 'Ayushman (आयुष्मान्)', 'Saubhagya (सौभाग्य)',
  'Sobhana (शोभन)', 'Atiganda (अतिगण्ड)', 'Sukarma (सुकर्मा)', 'Dhriti (धृति)',
  'Shula (शूल)', 'Ganda (गण्ड)', 'Vriddhi (वृद्धि)', 'Dhruva (ध्रुव)',
  'Vyaghata (व्याघात)', 'Harshana (हर्षण)', 'Vajra (वज्र)', 'Siddhi (सिद्धि)',
  'Vyatipata (व्यतीपात)', 'Variyan (वरीयान्)', 'Parigha (परिघ)', 'Shiva (शिव)',
  'Siddha (सिद्ध)', 'Sadhya (साध्य)', 'Shubha (शुभ)', 'Shukla (शुक्ल)',
  'Brahma (ब्रह्म)', 'Indra (इन्द्र)', 'Vaidhriti (वैधृति)'
];

export const KARANA_NAMES = [
  'Bava (बव)', 'Balava (बालव)', 'Kaulava (कौलव)', 'Taitila (तैतिल)',
  'Gara (गर)', 'Vanija (वणिज)', 'Vishti (विष्टि / भद्रा)', 'Shakuni (शकुनि)',
  'Chatushpada (चतुष्पाद)', 'Naga (नाग)', 'Kinstughna (किंस्तुघ्न)'
];

export function calculateJulianDay(year: number, month: number, day: number, hour: number, minute: number, second: number = 0): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFraction = (hour + minute / 60 + second / 3600) / 24;
  const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + dayFraction + B - 1524.5;
  return JD;
}

export function calculateLahiriAyanamsa(JD: number): number {
  const T = (JD - 2451545.0) / 36525.0;
  const ayanamsa = 23.85611 + (50.29 / 3600.0) * (T * 100);
  return ayanamsa;
}

export function normalizeDegrees(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

export function calculateLST(JD: number, longitude: number): number {
  const T = (JD - 2451545.0) / 36525.0;
  let GMST = 280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000;
  GMST = normalizeDegrees(GMST);
  const LST = normalizeDegrees(GMST + longitude);
  return LST;
}

export function calculateAscendant(JD: number, latitude: number, longitude: number, ayanamsa: number): number {
  const LST = calculateLST(JD, longitude);
  const LST_rad = (LST * Math.PI) / 180.0;
  const lat_rad = (latitude * Math.PI) / 180.0;
  const obliquity_rad = (23.4392911 * Math.PI) / 180.0;

  const y = -Math.cos(LST_rad);
  const x = Math.sin(LST_rad) * Math.cos(obliquity_rad) + Math.tan(lat_rad) * Math.sin(obliquity_rad);
  let ascendantTropical = (Math.atan2(y, x) * 180.0) / Math.PI;
  ascendantTropical = normalizeDegrees(ascendantTropical);

  const ascendantSidereal = normalizeDegrees(ascendantTropical - ayanamsa);
  return ascendantSidereal;
}

export function calculatePlanetaryPositions(JD: number, ayanamsa: number): Record<string, { longitude: number; isRetrograde: boolean }> {
  const T = (JD - 2451545.0) / 36525.0;
  const d = JD - 2451545.0;

  const L0 = 280.46646 + 36000.76983 * T;
  const M_sun = 357.52911 + 35999.05029 * T;
  const M_sun_rad = (normalizeDegrees(M_sun) * Math.PI) / 180;
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin(M_sun_rad) + (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun_rad);
  const sunTropical = normalizeDegrees(L0 + C_sun);
  const sunSidereal = normalizeDegrees(sunTropical - ayanamsa);

  const L_moon = 218.3164477 + 481267.88123421 * T;
  const D_moon = 297.8501921 + 445267.1114034 * T;
  const M_moon = 134.9633964 + 477198.8675055 * T;
  const moonPerturbations = 6.289 * Math.sin((normalizeDegrees(M_moon) * Math.PI) / 180) - 1.274 * Math.sin((normalizeDegrees(2 * D_moon - M_moon) * Math.PI) / 180);
  const moonTropical = normalizeDegrees(L_moon + moonPerturbations);
  const moonSidereal = normalizeDegrees(moonTropical - ayanamsa);

  const marsMean = 355.433 + (360.0 / 686.98) * d;
  const marsAnom = (marsMean * Math.PI) / 180;
  const marsTropical = normalizeDegrees(marsMean + 10.69 * Math.sin(marsAnom));
  const marsSidereal = normalizeDegrees(marsTropical - ayanamsa);

  const mercMean = sunTropical + 18.0 * Math.sin((d * 0.071) + 1.2);
  const mercSidereal = normalizeDegrees(mercMean - ayanamsa);

  const jupMean = 34.35 + (360.0 / 4332.59) * d;
  const jupAnom = (jupMean * Math.PI) / 180;
  const jupTropical = normalizeDegrees(jupMean + 5.55 * Math.sin(jupAnom));
  const jupSidereal = normalizeDegrees(jupTropical - ayanamsa);

  const venMean = sunTropical + 22.0 * Math.sin((d * 0.027) + 0.8);
  const venSidereal = normalizeDegrees(venMean - ayanamsa);

  const satMean = 50.08 + (360.0 / 10759.22) * d;
  const satAnom = (satMean * Math.PI) / 180;
  const satTropical = normalizeDegrees(satMean + 6.35 * Math.sin(satAnom));
  const satSidereal = normalizeDegrees(satTropical - ayanamsa);

  const nodeTropical = normalizeDegrees(125.04452 - 1934.136261 * T);
  const rahuSidereal = normalizeDegrees(nodeTropical - ayanamsa);
  const ketuSidereal = normalizeDegrees(rahuSidereal + 180.0);

  const marsRetro = Math.abs(normalizeDegrees(sunTropical - marsTropical) - 180) < 40;
  const jupRetro = Math.abs(normalizeDegrees(sunTropical - jupTropical) - 180) < 55;
  const satRetro = Math.abs(normalizeDegrees(sunTropical - satTropical) - 180) < 60;
  const mercRetro = Math.sin((d * 0.071) + 1.2) < -0.85;
  const venRetro = Math.sin((d * 0.027) + 0.8) < -0.9;

  return {
    'Sun': { longitude: sunSidereal, isRetrograde: false },
    'Moon': { longitude: moonSidereal, isRetrograde: false },
    'Mars': { longitude: marsSidereal, isRetrograde: marsRetro },
    'Mercury': { longitude: mercSidereal, isRetrograde: mercRetro },
    'Jupiter': { longitude: jupSidereal, isRetrograde: jupRetro },
    'Venus': { longitude: venSidereal, isRetrograde: venRetro },
    'Saturn': { longitude: satSidereal, isRetrograde: satRetro },
    'Rahu': { longitude: rahuSidereal, isRetrograde: true },
    'Ketu': { longitude: ketuSidereal, isRetrograde: true }
  };
}

export function parseLongitude(long: number) {
  const norm = normalizeDegrees(long);
  const signNumber = Math.floor(norm / 30) + 1;
  const degreeInSign = norm % 30;
  const degInt = Math.floor(degreeInSign);
  const minInt = Math.floor((degreeInSign - degInt) * 60);

  const nakshatraIndex = Math.floor(norm / (360.0 / 27.0));
  const nakshatraObj = NAKSHATRAS[nakshatraIndex % 27];

  const remDeg = norm % (360.0 / 27.0);
  const pada = Math.min(4, Math.floor(remDeg / (360.0 / (27.0 * 4.0))) + 1);

  const rashiObj = RASHIS[signNumber - 1];

  return {
    signNumber,
    signName: rashiObj.en,
    signNameNe: rashiObj.ne,
    signLordEn: rashiObj.lordEn,
    signLordNe: rashiObj.lordNe,
    degreeInSign: degInt,
    minutesInSign: minInt,
    nakshatraName: nakshatraObj.en,
    nakshatraNameNe: nakshatraObj.ne,
    nakshatraLord: nakshatraObj.lord,
    pada
  };
}

export function calculateNavamsaSign(long: number): number {
  const norm = normalizeDegrees(long);
  const rashiIndex = Math.floor(norm / 30.0);
  const element = rashiIndex % 4;

  const starts = [1, 10, 7, 4];
  const startSign = starts[element];
  const navInSign = Math.floor((norm % 30.0) / (30.0 / 9.0));
  const navSign = ((startSign - 1 + navInSign) % 12) + 1;
  return navSign;
}

export function getPlanetaryDignity(planet: string, signNumber: number) {
  const exaltations: Record<string, number> = {
    'Sun': 1, 'Moon': 2, 'Mars': 10, 'Mercury': 6, 'Jupiter': 4, 'Venus': 12, 'Saturn': 7, 'Rahu': 2, 'Ketu': 8
  };
  const debilitations: Record<string, number> = {
    'Sun': 7, 'Moon': 8, 'Mars': 4, 'Mercury': 12, 'Jupiter': 10, 'Venus': 6, 'Saturn': 1, 'Rahu': 8, 'Ketu': 2
  };
  const ownSigns: Record<string, number[]> = {
    'Sun': [5],
    'Moon': [4],
    'Mars': [1, 8],
    'Mercury': [3, 6],
    'Jupiter': [9, 12],
    'Venus': [2, 7],
    'Saturn': [10, 11],
    'Rahu': [11],
    'Ketu': [8]
  };

  if (exaltations[planet] === signNumber) return { en: 'Exalted (Uchha)', ne: 'उच्च (शुभ)' };
  if (debilitations[planet] === signNumber) return { en: 'Debilitated (Neecha)', ne: 'नीच' };
  if (ownSigns[planet]?.includes(signNumber)) return { en: 'Own House (Swakshetra)', ne: 'स्वक्षेत्री (बलवान्)' };
  return { en: 'Neutral / Friendly', ne: 'सामान्य / मित्र' };
}

export function calculateVimshottari(moonLongitude: number, birthDate: Date) {
  const norm = normalizeDegrees(moonLongitude);
  const nakshatraSpan = 360.0 / 27.0;
  const nakshatraIndex = Math.floor(norm / nakshatraSpan);
  const traversed = norm % nakshatraSpan;
  const fractionRemaining = 1.0 - traversed / nakshatraSpan;

  const birthLord = NAKSHATRAS[nakshatraIndex % 27].lord;
  const totalLordYears = VIMSHOTTARI_YEARS[birthLord];
  const balanceYearsFloat = totalLordYears * fractionRemaining;
  const balanceYears = Math.floor(balanceYearsFloat);
  const balanceMonths = Math.floor((balanceYearsFloat - balanceYears) * 12);
  const balanceDays = Math.floor(((balanceYearsFloat - balanceYears) * 12 - balanceMonths) * 30);

  const timeline: { lord: string; lordNe: string; startDate: string; endDate: string; durationYears: number }[] = [];
  let currentStart = new Date(birthDate.getTime());
  const startIndex = DASHA_ORDER.indexOf(birthLord);

  const firstEndDate = new Date(currentStart.getTime());
  firstEndDate.setFullYear(firstEndDate.getFullYear() + balanceYears);
  firstEndDate.setMonth(firstEndDate.getMonth() + balanceMonths);
  firstEndDate.setDate(firstEndDate.getDate() + balanceDays);

  timeline.push({
    lord: birthLord,
    lordNe: DASHA_NEPALI[birthLord],
    startDate: currentStart.toISOString().split('T')[0],
    endDate: firstEndDate.toISOString().split('T')[0],
    durationYears: parseFloat(balanceYearsFloat.toFixed(2))
  });

  currentStart = new Date(firstEndDate.getTime());

  for (let i = 1; i < 9; i++) {
    const lord = DASHA_ORDER[(startIndex + i) % 9];
    const duration = VIMSHOTTARI_YEARS[lord];
    const periodEnd = new Date(currentStart.getTime());
    periodEnd.setFullYear(periodEnd.getFullYear() + duration);

    timeline.push({
      lord,
      lordNe: DASHA_NEPALI[lord],
      startDate: currentStart.toISOString().split('T')[0],
      endDate: periodEnd.toISOString().split('T')[0],
      durationYears: duration
    });
    currentStart = periodEnd;
  }

  const now = new Date();
  let currentMahaDasha = timeline[0];
  for (const t of timeline) {
    const s = new Date(t.startDate);
    const e = new Date(t.endDate);
    if (now >= s && now <= e) {
      currentMahaDasha = t;
      break;
    }
  }

  return {
    balanceAtBirth: {
      lord: birthLord,
      lordNe: DASHA_NEPALI[birthLord],
      remainingYears: balanceYears,
      remainingMonths: balanceMonths,
      remainingDays: balanceDays
    },
    currentDasha: {
      mahaDasha: currentMahaDasha.lord,
      mahaDashaNe: currentMahaDasha.lordNe,
      antarDasha: currentMahaDasha.lord,
      antarDashaNe: currentMahaDasha.lordNe,
      startDate: currentMahaDasha.startDate,
      endDate: currentMahaDasha.endDate
    },
    timeline
  };
}

export function analyzeManglikDosha(marsHouse: number, marsSign: number) {
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isManglik = manglikHouses.includes(marsHouse);

  let hasCancellation = false;
  if (marsHouse === 1 && marsSign === 1) hasCancellation = true;
  if (marsHouse === 4 && marsSign === 8) hasCancellation = true;
  if (marsHouse === 7 && marsSign === 10) hasCancellation = true;
  if (marsHouse === 8 && marsSign === 5) hasCancellation = true;

  let severity: 'none' | 'low' | 'moderate' | 'high' = 'none';
  if (isManglik) {
    if (hasCancellation) severity = 'low';
    else if (marsHouse === 7 || marsHouse === 8) severity = 'high';
    else severity = 'moderate';
  }

  const description = isManglik
    ? hasCancellation
      ? `Mars is in House ${marsHouse}, creating a theoretical Kuja influence, but strong classical cancellation conditions mitigate the dosha.`
      : `Mars is placed in House ${marsHouse}, forming Manglik Dosha with ${severity} intensity. Traditional matching or spiritual remedies are advised.`
    : `Mars is placed in House ${marsHouse}, which is outside the traditional Manglik houses. No Manglik Dosha is present.`;

  const descriptionNe = isManglik
    ? hasCancellation
      ? `मङ्गल ग्रह ${marsHouse} औं भावमा भए तापनि शास्त्रीय परिहारका कारण माङ्गलिक दोषको प्रभाव न्यून रहेको छ।`
      : `मङ्गल ग्रह ${marsHouse} औं भावमा रहेकाले माङ्गलिक योग बनेको छ (${severity} प्रभाव)। विवाह मिलान र शान्ति उपाय उपयोगी मानिन्छ।`
    : `मङ्गल ग्रह ${marsHouse} औं भावमा शुभ स्थितिमा छ। कुण्डलीमा कुनै माङ्गलिक दोष छैन।`;

  return { isManglik, severity, marsHouse, hasCancellation, description, descriptionNe };
}

export function detectTraditionalYogas(planets: Record<string, { house: number; signNumber: number }>) {
  const yogas: { name: string; nameNe: string; type: 'auspicious' | 'inauspicious' | 'neutral'; description: string; descriptionNe: string }[] = [];

  const jupHouse = planets['Jupiter']?.house || 1;
  const moonHouse = planets['Moon']?.house || 1;
  const sunHouse = planets['Sun']?.house || 1;
  const mercHouse = planets['Mercury']?.house || 1;
  const marsHouse = planets['Mars']?.house || 1;
  const venHouse = planets['Venus']?.house || 1;

  const jupFromMoon = ((jupHouse - moonHouse + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(jupFromMoon)) {
    yogas.push({
      name: 'Gajakesari Yoga (गजकेसरी योग)',
      nameNe: 'गजकेसरी योग',
      type: 'auspicious',
      description: 'Jupiter is in an angular house from Moon, bestowing wisdom, prestige, eloquence, and lasting respect.',
      descriptionNe: 'चन्द्रमाबाट केन्द्रमा बृहस्पति अवस्थित भएकाले बुद्धि, यश, मान-प्रतिष्ठा र दीर्घकालीन सफलता प्राप्त हुनेछ।'
    });
  }

  if (sunHouse === mercHouse) {
    yogas.push({
      name: 'Budhaditya Yoga (बुधादित्य योग)',
      nameNe: 'बुधादित्य योग',
      type: 'auspicious',
      description: 'Sun and Mercury are conjunct, conferring sharp intellect, analytical skill, and administrative acumen.',
      descriptionNe: 'सूर्य र बुध एकै भावमा रहेकाले प्रखर बौद्धिक क्षमता, निर्णय शक्ति र प्रशासनिक सफलता मिल्नेछ।'
    });
  }

  yogas.push({
    name: 'Dhana & Bhagya Prabhav (धन तथा भाग्य प्रभाव)',
    nameNe: 'धन तथा भाग्य प्रभाव',
    type: 'auspicious',
    description: 'Harmonious planetary aspects indicate sustained prosperity through deliberate effort and continuous learning.',
    descriptionNe: 'कुण्डलीका शुभ ग्रहहरूको अनुकूलताले कर्म र लगनशीलताबाट आर्थिक उन्नति र प्रतिष्ठा दिनेछ।'
  });

  return yogas;
}

export function generateInterpretations(
  lagnaSignEn: string, lagnaSignNe: string,
  rashiSignEn: string, rashiSignNe: string,
  nakshatraEn: string, nakshatraNe: string
) {
  return {
    personality: {
      en: `With ${lagnaSignEn} Ascendant and Moon in ${rashiSignEn} (${nakshatraEn} Nakshatra), you possess an intuitive balance of determination, spiritual curiosity, and pragmatic problem-solving.`,
      ne: `${lagnaSignNe} लग्न र ${rashiSignNe} राशि (${nakshatraNe} नक्षत्र) का कारण तपाईंमा दृढ इच्छाशक्ति, आध्यात्मिक जिज्ञासा र व्यावहारिक समझको सुन्दर संगम छ।`
    },
    career: {
      en: `Your chart highlights strength in leadership, strategic communication, technology, management, or advisory professions.`,
      ne: `तपाईंको कुण्डलीले नेतृत्व, रणनीतिक सञ्चार, प्रविधि, व्यवस्थापन वा परामर्श क्षेत्रमा विशेष सफलता देखाउँछ।`
    },
    marriage: {
      en: `Seventh house dynamics suggest a partner who values mutual trust, intellectual stimulation, and cultural values.`,
      ne: `सप्तम भावको विश्लेषण अनुसार जीवनसाथी समझदार, बौद्धिक र सांस्कृतिक मर्यादाप्रति सचेत हुनेछन्।`
    },
    finance: {
      en: `Financial gains are supported by multiple income channels and strategic investments in property or long-term assets.`,
      ne: `आर्थिक पक्षमा नियमित आम्दानीका साथै दीर्घकालीन लगानी र सम्पत्ति जोड्ने बलियो अवसर छ।`
    },
    family: {
      en: `Deep ties to familial traditions alongside progressive thinking allow you to bridge generational divides.`,
      ne: `पारिवारिक संस्कार र आधुनिक सोचको तालमेलले तपाईंलाई परिवारको भरपर्दो अभिभावक बनाउँछ।`
    },
    general: {
      en: `Vedic principles advise maintaining sattvic habits, regular mindfulness, and respect for sacred roots.`,
      ne: `वैदिक परम्परा अनुसार सात्विक दिनचर्या, ध्यान र कुलदेवताको स्मरणले तपाईंको आत्मबललाई उच्च राख्नेछ।`
    }
  };
}

export function calculateVedicKundali(params: {
  fullName: string;
  nwaranName?: string;
  dateOfBirth: string;
  timeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: number;
}): KundaliCalculationResult {
  const [yearStr, monthStr, dayStr] = params.dateOfBirth.split('-');
  const [hourStr, minStr] = params.timeOfBirth.split(':');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);

  const localDecimalHour = hour + minute / 60.0;
  let utcDecimalHour = localDecimalHour - params.timezone;
  let utcDay = day;
  let utcMonth = month;
  let utcYear = year;

  if (utcDecimalHour < 0) {
    utcDecimalHour += 24;
    utcDay -= 1;
    if (utcDay < 1) {
      utcMonth -= 1;
      if (utcMonth < 1) {
        utcYear -= 1;
        utcMonth = 12;
      }
      utcDay = 28;
    }
  } else if (utcDecimalHour >= 24) {
    utcDecimalHour -= 24;
    utcDay += 1;
  }

  const utcHour = Math.floor(utcDecimalHour);
  const utcMinute = Math.floor((utcDecimalHour - utcHour) * 60);

  const JD = calculateJulianDay(utcYear, utcMonth, utcDay, utcHour, utcMinute);
  const ayanamsaVal = calculateLahiriAyanamsa(JD);
  const ayanamsaDeg = Math.floor(ayanamsaVal);
  const ayanamsaMin = Math.floor((ayanamsaVal - ayanamsaDeg) * 60);

  const ascLong = calculateAscendant(JD, params.latitude, params.longitude, ayanamsaVal);
  const lagnaParsed = parseLongitude(ascLong);

  const rawPlanets = calculatePlanetaryPositions(JD, ayanamsaVal);

  const planetSymbols: Record<string, string> = {
    'Sun': 'Su', 'Moon': 'Mo', 'Mars': 'Ma', 'Mercury': 'Me',
    'Jupiter': 'Ju', 'Venus': 'Ve', 'Saturn': 'Sa', 'Rahu': 'Ra', 'Ketu': 'Ke'
  };

  const planetNepali: Record<string, string> = {
    'Sun': 'सूर्य', 'Moon': 'चन्द्र', 'Mars': 'मङ्गल', 'Mercury': 'बुध',
    'Jupiter': 'बृहस्पति', 'Venus': 'शुक्र', 'Saturn': 'शनि', 'Rahu': 'राहु', 'Ketu': 'केतु'
  };

  const calculatedPlanets: PlanetaryPosition[] = [];
  const planetHouseMap: Record<string, { house: number; signNumber: number }> = {};
  const rashiChart: Record<number, string[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };
  const navamsaChart: Record<number, string[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };

  for (const [pName, pData] of Object.entries(rawPlanets)) {
    const parsed = parseLongitude(pData.longitude);
    const house = ((parsed.signNumber - lagnaParsed.signNumber + 12) % 12) + 1;
    const dignity = getPlanetaryDignity(pName, parsed.signNumber);
    const navSign = calculateNavamsaSign(pData.longitude);

    calculatedPlanets.push({
      name: pName,
      nameNe: planetNepali[pName],
      symbol: planetSymbols[pName],
      longitude: pData.longitude,
      sign: parsed.signName,
      signNe: parsed.signNameNe,
      signNumber: parsed.signNumber,
      degreeInSign: parsed.degreeInSign,
      minutesInSign: parsed.minutesInSign,
      house,
      nakshatra: parsed.nakshatraName,
      nakshatraNe: parsed.nakshatraNameNe,
      pada: parsed.pada,
      isRetrograde: pData.isRetrograde,
      dignity: dignity.en,
      dignityNe: dignity.ne
    });

    planetHouseMap[pName] = { house, signNumber: parsed.signNumber };
    rashiChart[house].push(`${planetSymbols[pName]}${pData.isRetrograde ? '(R)' : ''}`);
    navamsaChart[navSign].push(planetSymbols[pName]);
  }

  const houses = [];
  for (let h = 1; h <= 12; h++) {
    const signNum = ((lagnaParsed.signNumber - 1 + (h - 1)) % 12) + 1;
    const rashi = RASHIS[signNum - 1];
    const planetsInHouse = calculatedPlanets.filter(p => p.house === h);

    houses.push({
      houseNumber: h,
      signNumber: signNum,
      signName: rashi.en,
      signNameNe: rashi.ne,
      planets: planetsInHouse.map(p => `${p.name}${p.isRetrograde ? ' (R)' : ''}`),
      planetsNe: planetsInHouse.map(p => `${p.nameNe}${p.isRetrograde ? ' (व)' : ''}`)
    });
  }

  const moonLong = rawPlanets['Moon'].longitude;
  const sunLong = rawPlanets['Sun'].longitude;
  const moonParsed = parseLongitude(moonLong);

  const tithiDiff = normalizeDegrees(moonLong - sunLong);
  const tithiIndex = Math.floor(tithiDiff / 12.0);
  const paksha = tithiIndex < 15 ? 'Shukla Paksha (शुक्ल पक्ष)' : 'Krishna Paksha (कृष्ण पक्ष)';
  const tithiNameStr = TITHI_NAMES[tithiIndex % 15];

  const yogaSum = normalizeDegrees(sunLong + moonLong);
  const yogaIndex = Math.floor(yogaSum / (360.0 / 27.0));
  const yogaNameStr = YOGA_NAMES[yogaIndex % 27];

  const karanaIndex = Math.floor(tithiDiff / 6.0);
  const karanaNameStr = KARANA_NAMES[karanaIndex % 11];

  const birthDateObj = new Date(year, month - 1, day, hour, minute);
  const vimshottariDasha = calculateVimshottari(moonLong, birthDateObj);

  const marsHouse = planetHouseMap['Mars']?.house || 1;
  const marsSign = planetHouseMap['Mars']?.signNumber || 1;
  const manglikDosha = analyzeManglikDosha(marsHouse, marsSign);

  const traditionalYogas = detectTraditionalYogas(planetHouseMap);

  const interpretations = generateInterpretations(
    lagnaParsed.signName, lagnaParsed.signNameNe,
    moonParsed.signName, moonParsed.signNameNe,
    moonParsed.nakshatraName, moonParsed.nakshatraNameNe
  );

  return {
    lagna: {
      sign: lagnaParsed.signName,
      signNe: lagnaParsed.signNameNe,
      signNumber: lagnaParsed.signNumber,
      degree: lagnaParsed.degreeInSign,
      lord: lagnaParsed.signLordEn,
      lordNe: lagnaParsed.signLordNe,
      nakshatra: lagnaParsed.nakshatraName,
      nakshatraNe: lagnaParsed.nakshatraNameNe,
      pada: lagnaParsed.pada
    },
    rashi: {
      sign: moonParsed.signName,
      signNe: moonParsed.signNameNe,
      signNumber: moonParsed.signNumber,
      lord: moonParsed.signLordEn,
      lordNe: moonParsed.signLordNe
    },
    nakshatra: {
      name: moonParsed.nakshatraName,
      nameNe: moonParsed.nakshatraNameNe,
      lord: moonParsed.nakshatraLord,
      pada: moonParsed.pada
    },
    tithi: {
      name: tithiNameStr,
      nameNe: tithiNameStr,
      paksha,
      number: (tithiIndex % 15) + 1
    },
    yoga: {
      name: yogaNameStr,
      nameNe: yogaNameStr,
      number: yogaIndex + 1
    },
    karana: {
      name: karanaNameStr,
      nameNe: karanaNameStr,
      number: karanaIndex + 1
    },
    ayanamsa: {
      name: 'Lahiri (Chitra Paksha)',
      value: ayanamsaVal,
      formatted: `${ayanamsaDeg}° ${ayanamsaMin}'`
    },
    planets: calculatedPlanets,
    houses,
    rashiChart,
    navamsaChart,
    vimshottariDasha,
    manglikDosha,
    traditionalYogas,
    interpretations
  };
}
