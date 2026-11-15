'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();
  const isNe = language === 'ne';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 font-devanagari">
      <div>
        <h1 className="text-3xl font-extrabold text-navy-900 dark:text-white">
          {isNe ? 'नियम तथा सर्तहरू (Terms & Conditions)' : 'Terms & Conditions'}
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          Last Updated: November 2026 • Nyoria चिना Platform
        </p>
      </div>

      <div className="bg-white dark:bg-navy-900 rounded-3xl p-8 border border-gray-200 dark:border-navy-800 shadow-xl space-y-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <h3 className="text-base font-bold text-gray-900 dark:text-gold-400">
          {isNe ? '१. परम्परागत तथा सांस्कृतिक व्याख्या' : '1. Traditional & Cultural Scope'}
        </h3>
        <p>
          {isNe
            ? 'Nyoria चिना मा प्रस्तुत गरिएका सम्पूर्ण हस्तरेखा तथा ज्योतिषीय सामग्रीहरू परम्परागत वैदिक मान्यता र सांस्कृतिक व्याख्यामा आधारित छन्। यी सामग्रीहरू १००% निश्चित वैज्ञानिक वा चिकित्सा निदान होइनन्।'
            : 'All insights provided on Nyoria चिना reflect canonical Vedic and palmistry systems. They are symbolic, educational interpretations and do not replace professional medical, legal, or financial counsel.'}
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-gold-400">
          {isNe ? '२. प्रयोगकर्ताको उत्तरदायित्व' : '2. User Responsibility'}
        </h3>
        <p>
          {isNe
            ? 'प्रयोगकर्ताले सही जन्म मिति, समय र आफ्नै हत्केलाको फोटो अपलोड गर्नुपर्नेछ। प्राप्त व्याख्यालाई सकारात्मक आत्म-सुधार र अध्ययनका रूपमा लिनुपर्नेछ।'
            : 'Users agree to provide accurate information and engage with the platform in the spirit of positive self-reflection and personal inquiry.'}
        </p>
      </div>
    </div>
  );
}
