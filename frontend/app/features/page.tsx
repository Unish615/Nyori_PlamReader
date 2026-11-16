'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Hand, Compass, Mic, FileText, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  const { language } = useLanguage();
  const isNe = language === 'ne';

  const list = [
    {
      icon: Hand,
      title: isNe ? 'AI हस्तरेखा पहिचान तथा विश्लेषण' : 'AI Palm Reading & Line Detection',
      desc: isNe 
        ? 'जीवन रेखा, मस्तिष्क रेखा, हृदय रेखा, भाग्य रेखा, सूर्य रेखा, विवाह रेखा र पर्वतहरूको विश्लेषण।'
        : 'Detailed detection and interpretation of major lines, palm geometry, mounts, and finger structures.'
    },
    {
      icon: Compass,
      title: isNe ? 'वैदिक जन्मकुण्डली (लाहिरी अयनांश)' : 'Vedic Birth Chart Generation',
      desc: isNe 
        ? 'लग्न, चन्द्र राशि, नक्षत्र, पाद, तिथि, योग, करण, १२ भाव, नवमांश (D-9) र विंशोत्तरी दशा चक्र।'
        : 'Full sidereal planetary positions, 12 houses, Navamsa D-9, and complete 120-year Vimshottari timeline.'
    },
    {
      icon: Mic,
      title: isNe ? 'आवाज तथा च्याट AI सहायक' : 'Bilingual Voice & Text Assistant',
      desc: isNe
        ? 'नेपाली र अङ्ग्रेजीमा आफ्नो आवाज बोलेर प्रश्न सोध्नुहोस् र तुरुन्तै आध्यात्मिक सल्लाह पाउनुहोस्।'
        : 'Natural speech-to-text recognition and text-to-speech voice answers in Nepali and English.'
    },
    {
      icon: FileText,
      title: isNe ? 'बहु-पृष्ठीय आधिकारिक PDF रिपोर्ट' : 'Comprehensive PDF Export',
      desc: isNe
        ? 'नेपाली युनिकोड र उत्तरी कुण्डली चक्रसहितको उच्च गुणस्तरको प्रिन्ट गर्न मिल्ने प्रतिवेदन।'
        : 'Print-ready export of complete astrological reports with authentic North Indian diamond diagrams.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-devanagari">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white">
          {isNe ? 'Nyoria चिना का विशेषताहरू' : 'Nyoria चिना Core Features'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isNe ? 'वैदिक ज्योतिष र आधुनिक एआई प्रविधिको अतुलनीय संयोजन।' : 'Explore what sets Nyoria चिना apart.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-8 bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
