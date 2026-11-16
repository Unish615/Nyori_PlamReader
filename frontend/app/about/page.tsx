'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Compass, Heart, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();
  const isNe = language === 'ne';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-devanagari">
      
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-royal-600 to-gold-500 p-0.5 shadow-xl">
          <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
            <Compass className="w-8 h-8 text-gold-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white">
          {isNe ? 'Nyoria चिना को बारेमा' : 'About Nyoria चिना'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {isNe
            ? 'Nyoria चिना वैदिक हस्तरेखा र ज्योतिषीय परम्परालाई आधुनिक कृत्रिम बुद्धिमत्ता (AI) सँग जोड्ने नेपालको आधिकारिक डिजिटल प्लेटफर्म हो।'
            : 'Nyoria चिना is a pioneering platform bridging time-tested Vedic Astrology and Hasta Rekha Shastra with modern artificial intelligence.'}
        </p>
      </div>

      <div className="bg-white dark:bg-navy-900 rounded-3xl p-8 border border-gray-200 dark:border-navy-800 shadow-xl space-y-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gold-400">
          {isNe ? 'हाम्रो उद्देश्य (Our Mission)' : 'Our Mission'}
        </h2>
        <p>
          {isNe
            ? 'हाम्रो उद्देश्य प्राचीन ज्ञानलाई वैज्ञानिक शुद्धता, उच्च गणितीय खगोलशास्त्र (Lahiri Ayanamsa) र आधुनिक सुलभताका साथ हरेक व्यक्तिको पहुँचमा पुर्‍याउनु हो। न्वारनको नाम, जन्म समय र हस्तरेखाबाट प्राप्त हुने सूक्ष्म आध्यात्मिक फललाई निष्पक्ष, सांस्कृतिक र गोपनीयतासहित प्रस्तुत गर्न हामी प्रतिबद्ध छौँ।'
            : 'Our mission is to democratize traditional astrological awareness with high mathematical rigor and cultural authenticity. By unifying Lahiri Sidereal ephemeris calculations with computer vision, Nyoria चिना delivers clear, structured personal insights.'}
        </p>

        <h2 className="text-lg font-bold text-gray-900 dark:text-gold-400 pt-4">
          {isNe ? 'नैतिकता तथा परम्परागत मर्यादा' : 'Ethical Philosophy'}
        </h2>
        <p>
          {isNe
            ? 'हस्तरेखा र कुण्डली मानिसलाई भाग्यवादी बनाउनका लागि होइन, आत्म-अवलोकन, कर्ममा निष्ठा र मानसिक शान्ति प्राप्त गर्नका लागि मार्गदर्शन हुन्। हामी कुनै पनि प्रकारको भ्रम, डर वा अवैज्ञानिक दाबी नगरी शास्त्रीय मार्गदर्शन प्रदान गर्छौँ।'
            : 'Astrology and palmistry serve as instruments for self-reflection, mindfulness, and constructive action rather than fatalistic dread. We reject superstition while honoring the philosophical depths of Jyotish Shastra.'}
        </p>
      </div>

    </div>
  );
}
