'use client';

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PalmOverlayProps {
  imageUrl: string;
  handType: 'left' | 'right';
  features: any;
}

export function PalmOverlay({ imageUrl, handType, features }: PalmOverlayProps) {
  const { language } = useLanguage();
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const isRight = handType === 'right';

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-royal-600/30 dark:border-gold-500/30 shadow-2xl bg-black">
        {/* Palm Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Analyzed Palm"
            className="w-full h-full object-cover select-none filter contrast-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}

        {/* SVG Interactive Line Overlay */}
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full pointer-events-auto"
        >
          {/* Heart Line (Pink/Red) */}
          <path
            d={isRight ? "M 70 140 Q 150 130 230 115" : "M 230 140 Q 150 130 70 115"}
            fill="none"
            stroke={activeHighlight === 'heart' ? '#F43F5E' : '#FB7185'}
            strokeWidth={activeHighlight === 'heart' ? '4.5' : '3'}
            strokeDasharray={activeHighlight === 'heart' ? 'none' : '4,2'}
            className="cursor-pointer transition-all hover:stroke-rose-500"
            onMouseEnter={() => setActiveHighlight('heart')}
            onMouseLeave={() => setActiveHighlight(null)}
          />

          {/* Head Line (Blue/Cyan) */}
          <path
            d={isRight ? "M 80 180 Q 160 185 240 210" : "M 220 180 Q 140 185 60 210"}
            fill="none"
            stroke={activeHighlight === 'head' ? '#06B6D4' : '#38BDF8'}
            strokeWidth={activeHighlight === 'head' ? '4.5' : '3'}
            strokeDasharray={activeHighlight === 'head' ? 'none' : '4,2'}
            className="cursor-pointer transition-all hover:stroke-cyan-400"
            onMouseEnter={() => setActiveHighlight('head')}
            onMouseLeave={() => setActiveHighlight(null)}
          />

          {/* Life Line (Emerald/Green) */}
          <path
            d={isRight ? "M 80 180 Q 130 240 120 330" : "M 220 180 Q 170 240 180 330"}
            fill="none"
            stroke={activeHighlight === 'life' ? '#10B981' : '#34D399'}
            strokeWidth={activeHighlight === 'life' ? '4.5' : '3'}
            strokeDasharray={activeHighlight === 'life' ? 'none' : '4,2'}
            className="cursor-pointer transition-all hover:stroke-emerald-400"
            onMouseEnter={() => setActiveHighlight('life')}
            onMouseLeave={() => setActiveHighlight(null)}
          />

          {/* Fate Line (Purple/Gold) */}
          <path
            d={isRight ? "M 155 350 L 155 160" : "M 145 350 L 145 160"}
            fill="none"
            stroke={activeHighlight === 'fate' ? '#D6AD60' : '#FBBF24'}
            strokeWidth={activeHighlight === 'fate' ? '4' : '2.5'}
            strokeDasharray="3,3"
            className="cursor-pointer transition-all hover:stroke-amber-400"
            onMouseEnter={() => setActiveHighlight('fate')}
            onMouseLeave={() => setActiveHighlight(null)}
          />
        </svg>

        {/* Hand Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-navy-900/80 backdrop-blur-md rounded-full border border-gold-500/40 text-[11px] font-semibold text-gold-300">
          {isRight ? (language === 'ne' ? 'दायाँ हात' : 'Right Hand') : (language === 'ne' ? 'बायाँ हात' : 'Left Hand')}
        </div>
      </div>

      {/* Line Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setActiveHighlight('life')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
            activeHighlight === 'life'
              ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          }`}
        >
          {language === 'ne' ? 'जीवन रेखा' : 'Life Line'}
        </button>
        <button
          onClick={() => setActiveHighlight('head')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
            activeHighlight === 'head'
              ? 'bg-cyan-500 text-white border-cyan-600 scale-105'
              : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
          }`}
        >
          {language === 'ne' ? 'मस्तिष्क रेखा' : 'Head Line'}
        </button>
        <button
          onClick={() => setActiveHighlight('heart')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
            activeHighlight === 'heart'
              ? 'bg-rose-500 text-white border-rose-600 scale-105'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
          }`}
        >
          {language === 'ne' ? 'हृदय रेखा' : 'Heart Line'}
        </button>
        <button
          onClick={() => setActiveHighlight('fate')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
            activeHighlight === 'fate'
              ? 'bg-gold-500 text-navy-900 border-gold-600 scale-105'
              : 'bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/30'
          }`}
        >
          {language === 'ne' ? 'भाग्य रेखा' : 'Fate Line'}
        </button>
      </div>
    </div>
  );
}
