'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Sparkles, 
  Hand, 
  Compass, 
  Bot, 
  ShieldCheck, 
  Mic, 
  Volume2, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  Star,
  Globe2
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();

  const isNe = language === 'ne';

  const featuresList = [
    {
      icon: Hand,
      title: isNe ? 'AI हस्तरेखा परीक्षण' : 'AI Palm Reading',
      desc: isNe 
        ? 'जीवन रेखा, मस्तिष्क रेखा, हृदय रेखा, भाग्य रेखा र ग्रह पर्वतहरूको परम्परागत वैदिक विश्लेषण।' 
        : 'Deep AI vision analysis of Life, Head, Heart, Fate lines and planetary mounts.',
      link: '/palm-reading',
      badge: isNe ? 'तत्काल विश्लेषण' : 'Instant Vision AI'
    },
    {
      icon: Compass,
      title: isNe ? 'वैदिक कुण्डली (चिना)' : 'Vedic Kundali Generation',
      desc: isNe
        ? 'न्वारनको नाम, जन्म समय र जन्मस्थान अनुसार लाहिरी अयनांशमा आधारित शुद्ध कुण्डली तथा दशा कालक्रम।'
        : 'Mathematically exact birth charts, Vimshottari Dasha, Navamsa D-9, and Manglik Dosha.',
      link: '/kundali',
      badge: isNe ? 'लाहिरी अयनांश' : 'Lahiri Precision'
    },
    {
      icon: Mic,
      title: isNe ? 'AI आवाज तथा च्याट सहायक' : 'Voice & Text AI Assistant',
      desc: isNe
        ? 'नेपाली र अङ्ग्रेजीमा बोलेर वा लेखेर हस्तरेखा, कुण्डली र जीवन मार्गबारे सोध्नुहोस्।'
        : 'Speak or type in Nepali or English to receive personalized spiritual clarity.',
      link: '/assistant',
      badge: isNe ? 'द्विभाषिक' : 'Speech Enabled'
    },
    {
      icon: FileText,
      title: isNe ? 'व्यावसायिक PDF रिपोर्ट' : 'Professional PDF Reports',
      desc: isNe
        ? 'नेपाली युनिकोड र कुण्डली चक्रसहितको बहु-पृष्ठीय आधिकारिक प्रतिवेदन तुरुन्त डाउनलोड गर्नुहोस्।'
        : 'Export comprehensive astrological reports with clear diagrams and tables.',
      link: '/reports',
      badge: isNe ? 'डाउनलोड योग्य' : 'Print Ready'
    }
  ];

  const faqs = [
    {
      q: isNe ? 'Nyoria चिना ले हस्तरेखा कसरी अध्ययन गर्छ?' : 'How does Nyoria चिना analyze palms?',
      a: isNe
        ? 'हाम्रो प्रणालीले तपाईँले अपलोड गरेको हत्केलाको फोटोलाई आधुनिक भिजन एआई प्रविधि र परम्परागत वैदिक हस्तरेखा शास्त्रका नियमहरू संयोजन गरेर रेखा, पर्वत र बनोटको सूक्ष्म व्याख्या तयार गर्छ।'
        : 'Our platform merges high-precision computer vision with canonical Vedic Hasta Rekha Shastra principles to evaluate line curvature, clarity, mounts, and palm proportions.'
    },
    {
      q: isNe ? 'कुण्डली गणना कति शुद्ध छ?' : 'How accurate are the Kundali calculations?',
      a: isNe
        ? 'हामी खगोलीय गणित र लाहिरी अयनांश (Lahiri Ayanamsa) प्रयोग गर्छौँ। नेपालका सबै ७७ जिल्लाका अक्षांश र देशान्तर शुद्ध रूपमा लिई ग्रह स्थिति, भाव र विंशोत्तरी दशा निकालिन्छ।'
        : 'Calculations utilize deterministic astronomical algorithms with Lahiri Ayanamsa, incorporating exact coordinates for all 77 districts of Nepal and world time zones.'
    },
    {
      q: isNe ? 'के मेरा फोटो र व्यक्तिगत विवरणहरू सुरक्षित रहन्छन्?' : 'Is my personal data and photo secure?',
      a: isNe
        ? 'हो, शतप्रतिशत सुरक्षित छन्। प्रयोगकर्ताको अनुमतिबिना कुनै पनि फोटो वा विवरण तेस्रो पक्ष वा एआई तालिमका लागि प्रयोग गरिँदैन। तपाईँ जुनसुकै बेला आफ्ना रिपोर्टहरू मेटाउन सक्नुहुन्छ।'
        : 'Yes, 100%. Uploaded hand photos and birth records are encrypted, never sold, and never used for public AI training without consent. You can delete your records anytime.'
    },
    {
      q: isNe ? 'के सम्पूर्ण रिपोर्ट नेपालीमा सुन्न सकिन्छ?' : 'Can I listen to all reports in Nepali audio?',
      a: isNe
        ? 'अवश्य! सबै हस्तरेखा र कुण्डली प्रतिवेदनहरूमा टेक्स्ट-टु-स्पीच (TTS) अडियो प्लेयर उपलब्ध छ, जसबाट तपाईं गति नियन्त्रणसहित प्रतिवेदन सुन्न सक्नुहुन्छ।'
        : 'Yes! Every reading includes a full audio reader with speed controls and natural voice synthesis for both Nepali and English.'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      
      {/* Background Decorative Cosmic Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-royal-600/15 via-gold-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 right-0 w-96 h-96 bg-royal-700/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-600/10 dark:bg-royal-600/20 border border-royal-600/30 dark:border-gold-500/30 text-royal-700 dark:text-gold-400 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-gold-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{t.hero.badge}</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white max-w-4xl mx-auto leading-tight font-devanagari">
          {t.hero.heading}
        </h1>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-devanagari">
          {t.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/palm-reading"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-royal-600 via-royal-700 to-royal-800 hover:from-royal-500 hover:to-royal-700 text-white font-semibold shadow-lg shadow-royal-600/30 hover:scale-102 transition-all font-devanagari"
          >
            <Hand className="w-5 h-5 text-gold-400" />
            <span>{t.hero.explorePalmBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/kundali"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-navy-800 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-900 dark:text-gold-300 font-semibold border border-gray-300 dark:border-gold-500/30 shadow-md hover:scale-102 transition-all font-devanagari"
          >
            <Compass className="w-5 h-5 text-gold-500" />
            <span>{t.hero.generateKundaliBtn}</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{isNe ? '१००% व्यक्तिगत गोपनीयता' : '100% Privacy Protected'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-royal-500 dark:text-gold-400" />
            <span>{isNe ? 'नेपाली र अङ्ग्रेजी पूर्ण समर्थन' : 'Full Bilingual Engine'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-purple-500" />
            <span>{isNe ? 'आवाजमा वाचन सुविधा' : 'Text-to-Speech Playback'}</span>
          </div>
        </div>

      </section>

      {/* Main Features Grid */}
      <section className="py-16 bg-white/50 dark:bg-navy-950/40 border-y border-gray-200/60 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-devanagari">
              {isNe ? 'प्रमुख आध्यात्मिक तथा वैज्ञानिक विशेषताहरू' : 'Comprehensive Astrological Modules'}
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-devanagari">
              {isNe
                ? 'हस्तरेखा, जन्मकुण्डली, विंशोत्तरी दशा र आवाज सहायक एकै ठाउँमा।'
                : 'Tradition meets cutting-edge machine learning and astronomical precision.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresList.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={index}
                  href={feat.link}
                  className="group relative p-6 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 hover:border-royal-600/50 dark:hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 flex items-center justify-center text-royal-600 dark:text-gold-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-royal-600 dark:group-hover:text-gold-400 transition-colors font-devanagari">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-devanagari">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-800 flex items-center gap-1 text-xs font-semibold text-royal-600 dark:text-gold-400">
                    <span>{isNe ? 'थप जान्नुहोस्' : 'Explore Feature'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest font-mono">
            {isNe ? 'सरल ४ चरण' : 'Simple 4-Step Process'}
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white font-devanagari">
            {isNe ? 'Nyoria चिना ले कसरी काम गर्छ?' : 'How Nyoria चिना Works'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '०१',
              title: isNe ? 'विवरण वा फोटो दिनुहोस्' : 'Submit Details or Photo',
              desc: isNe ? 'हत्केलाको फोटो अपलोड गर्नुहोस् वा जन्म समय र स्थान भर्नुहोस्।' : 'Upload a palm photograph or input exact birth time and birthplace.'
            },
            {
              step: '०२',
              title: isNe ? 'एआई र खगोलीय गणना' : 'Astronomical & AI Analysis',
              desc: isNe ? 'लाहिरी अयनांश र भिजन एआईद्वारा सूक्ष्म रेखा तथा ग्रह स्थिति विश्लेषण हुन्छ।' : 'Algorithms compute exact sidereal planetary positions and line characteristics.'
            },
            {
              step: '०३',
              title: isNe ? 'विस्तृत प्रतिवेदन हेर्नुहोस्' : 'Explore Detailed Report',
              desc: isNe ? 'व्यक्तित्व, करियर, प्रेम, धन र महादशाको शास्त्रीय फल नेपालीमा पढ्नुहोस्।' : 'Read comprehensive readings on career, relationships, and Vimshottari dashas.'
            },
            {
              step: '०४',
              title: isNe ? 'सुन्नुहोस् र डाउनलोड गर्नुहोस्' : 'Listen & Download PDF',
              desc: isNe ? 'नेपाली वा अङ्ग्रेजीमा अडियो सुन्नुहोस् र सुन्दर PDF डाउनलोड गर्नुहोस्।' : 'Listen with TTS playback and save an official multi-page PDF document.'
            }
          ].map((item, i) => (
            <div key={i} className="relative p-6 bg-white dark:bg-navy-900/60 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm">
              <span className="text-3xl font-extrabold font-mono text-royal-600/30 dark:text-gold-500/30">
                {item.step}
              </span>
              <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white font-devanagari">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-devanagari">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50/60 dark:bg-navy-950/50 border-t border-gray-200/60 dark:border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-devanagari">
              {isNe ? 'प्रायः सोधिने प्रश्नहरू (FAQs)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-800 shadow-sm">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gold-400 font-devanagari">
                  {faq.q}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-devanagari">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-royal-900 via-navy-900 to-navy-900 border border-royal-600/40 shadow-2xl text-center">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-devanagari">
            {isNe ? 'आजै आफ्नो हस्तरेखा र कुण्डलीको रहस्य जान्नुहोस्' : 'Discover Your Astrological Blueprint Today'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-devanagari">
            {isNe
              ? 'आफ्नो हातको फोटो अपलोड गर्नुहोस् वा जन्म विवरण दिएर तत्काल निःशुल्क विश्लेषण प्राप्त गर्नुहोस्।'
              : 'Join thousands seeking self-reflection through authentic Vedic principles and modern AI.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/palm-reading"
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-lg transition-transform hover:scale-105 font-devanagari"
            >
              {isNe ? 'हस्तरेखा परीक्षण सुरु गर्नुहोस्' : 'Start Palm Reading'}
            </Link>
            <Link
              href="/kundali"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-transform hover:scale-105 font-devanagari"
            >
              {isNe ? 'कुण्डली बनाउनुहोस्' : 'Create Kundali'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
