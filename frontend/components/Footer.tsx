'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-navy-900 border-t border-gray-200 dark:border-navy-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-royal-600 to-gold-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-navy-900 rounded-[7px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-gold-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-navy-900 dark:text-white">
                Nyoria <span className="font-devanagari text-gold-500 font-extrabold">चिना</span>
              </span>
            </Link>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-devanagari">
              {language === 'ne'
                ? 'आफ्नो हातका रेखाहरूबाट परम्परागत व्याख्या जान्नुहोस् र गणितीय रूपमा शुद्ध वैदिक कुण्डली प्राप्त गर्नुहोस्।'
                : 'Discover What Your Hands Reveal with AI-powered Vedic Palmistry and astronomical kundali calculations.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-600 dark:text-gold-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Lahiri Sidereal Ayanamsa Engine</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {language === 'ne' ? 'मुख्य सेवाहरू' : 'Core Features'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/palm-reading" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {t.nav.palmReading}
                </Link>
              </li>
              <li>
                <Link href="/kundali" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {t.nav.kundali}
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {t.nav.assistant}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {language === 'ne' ? 'सम्पर्क र कानुनी' : 'Legal & Info'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {language === 'ne' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {language === 'ne' ? 'नियम तथा सर्तहरू' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-royal-600 dark:hover:text-gold-400 transition-colors">
                  {language === 'ne' ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Cultural & Privacy Notice */}
          <div className="space-y-3 bg-gray-50 dark:bg-navy-800/40 p-4 rounded-xl border border-gray-200/50 dark:border-navy-700/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{language === 'ne' ? 'गोपनीयता प्रतिबद्धता' : 'Privacy Guarantee'}</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-devanagari">
              {t.common.disclaimerText}
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Nyoria चिना. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 font-devanagari">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Nepal and global spiritual seekers.
          </p>
        </div>
      </div>
    </footer>
  );
}
