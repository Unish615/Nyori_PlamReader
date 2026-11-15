'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface KundaliChartProps {
  title: string;
  lagnaSignNumber: number; // 1-12
  chartData: Record<number, string[]>; // House number (1-12) -> List of planet strings (e.g. ['Su', 'Me(R)'])
  isNavamsa?: boolean;
}

export function KundaliChart({ title, lagnaSignNumber, chartData, isNavamsa = false }: KundaliChartProps) {
  const { language } = useLanguage();

  const rashiNamesNe = ['मेष', 'वृष', 'मिथुन', 'कर्कट', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'];
  const rashiNamesEn = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  // Calculate sign number for each house (House 1 is lagnaSignNumber, House 2 is lagnaSignNumber+1, etc.)
  const getHouseSign = (houseNum: number) => {
    return ((lagnaSignNumber - 1 + (houseNum - 1)) % 12) + 1;
  };

  // Convert English planet symbol to authentic Devanagari if in Nepali mode
  const formatPlanet = (p: string) => {
    if (language !== 'ne') return p;
    const isRet = p.includes('(R)');
    const clean = p.replace('(R)', '').trim();
    const mapNe: Record<string, string> = {
      'Su': 'सूर्य',
      'Mo': 'चन्द्र',
      'Ma': 'मङ्गल',
      'Me': 'बुध',
      'Ju': 'बृह',
      'Ve': 'शुक्र',
      'Sa': 'शनि',
      'Ra': 'राहु',
      'Ke': 'केतु'
    };
    const neName = mapNe[clean] || clean;
    return `${neName}${isRet ? '(व)' : ''}`;
  };

  // House coordinates for label placement in 400x400 viewBox
  const houseCoordinates: Record<number, { signPos: { x: number; y: number }; planetPos: { x: number; y: number } }> = {
    1: { signPos: { x: 200, y: 135 }, planetPos: { x: 200, y: 95 } },
    2: { signPos: { x: 105, y: 48 }, planetPos: { x: 120, y: 80 } },
    3: { signPos: { x: 48, y: 105 }, planetPos: { x: 80, y: 120 } },
    4: { signPos: { x: 135, y: 200 }, planetPos: { x: 95, y: 200 } },
    5: { signPos: { x: 48, y: 295 }, planetPos: { x: 80, y: 280 } },
    6: { signPos: { x: 105, y: 352 }, planetPos: { x: 120, y: 320 } },
    7: { signPos: { x: 200, y: 265 }, planetPos: { x: 200, y: 305 } },
    8: { signPos: { x: 295, y: 352 }, planetPos: { x: 280, y: 320 } },
    9: { signPos: { x: 352, y: 295 }, planetPos: { x: 320, y: 280 } },
    10: { signPos: { x: 265, y: 200 }, planetPos: { x: 305, y: 200 } },
    11: { signPos: { x: 352, y: 105 }, planetPos: { x: 320, y: 120 } },
    12: { signPos: { x: 295, y: 48 }, planetPos: { x: 280, y: 80 } }
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700/80 rounded-2xl p-4 shadow-xl">
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-gray-100 dark:border-navy-800">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gold-400 font-devanagari">
          {title}
        </h4>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-gold-300">
          {isNavamsa ? 'D-9 Navamsa' : 'D-1 Lagna'}
        </span>
      </div>

      <div className="relative w-full max-w-[380px] aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
          {/* Background fill */}
          <rect x="10" y="10" width="380" height="380" fill="currentColor" className="text-amber-50/20 dark:text-navy-950/70" />

          {/* Outer Border */}
          <rect
            x="10"
            y="10"
            width="380"
            height="380"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-gold-600 dark:text-gold-500"
          />

          {/* Diagonal Lines */}
          <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="1.8" className="text-royal-500 dark:text-gold-600/80" />
          <line x1="10" y1="390" x2="390" y2="10" stroke="currentColor" strokeWidth="1.8" className="text-royal-500 dark:text-gold-600/80" />

          {/* Inner Diamond */}
          <polygon
            points="200,10 390,200 200,390 10,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gold-600 dark:text-gold-400"
          />

          {/* Render House Signs and Planets */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
            const coords = houseCoordinates[houseNum];
            const signNum = getHouseSign(houseNum);
            const planets = chartData[houseNum] || [];

            return (
              <g key={`house-${houseNum}`}>
                {/* Rashi Sign Number */}
                <text
                  x={coords.signPos.x}
                  y={coords.signPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-royal-700 dark:fill-gold-300 font-bold text-[13px] font-devanagari select-none"
                >
                  {signNum}
                </text>

                {/* Planets placed in house */}
                {planets.length > 0 && (
                  <text
                    x={coords.planetPos.x}
                    y={coords.planetPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-rose-700 dark:fill-amber-300 font-semibold text-[11px] font-devanagari select-none"
                  >
                    {planets.map(formatPlanet).join(' ')}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="w-full mt-3 pt-2 border-t border-gray-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
        <span>{language === 'ne' ? '१: प्रथम भाव (लग्न)' : '1: 1st House (Lagna)'}</span>
        <span className="font-devanagari text-gold-600 dark:text-gold-400">
          {language === 'ne' ? 'परम्परागत उत्तरी चक्र' : 'North Indian Diamond Chart'}
        </span>
      </div>
    </div>
  );
}
