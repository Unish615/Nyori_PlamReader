'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShieldCheck, Lock, EyeOff, Trash2 } from 'lucide-react';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isNe = language === 'ne';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 font-devanagari">
      <div>
        <h1 className="text-3xl font-extrabold text-navy-900 dark:text-white">
          {isNe ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          Last Updated: November 2026 • Nyoria चिना Platform
        </p>
      </div>

      <div className="bg-white dark:bg-navy-900 rounded-3xl p-8 border border-gray-200 dark:border-navy-800 shadow-xl space-y-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <h3 className="text-base font-bold text-gray-900 dark:text-gold-400">
          {isNe ? '१. व्यक्तिगत विवरणको सुरक्षा' : '1. Protection of Personal Data'}
        </h3>
        <p>
          {isNe
            ? 'Nyoria चिना ले तपाईँको व्यक्तिगत गोपनीयतालाई उच्च प्राथमिकता दिन्छ। तपाईँले अपलोड गर्नुभएको हत्केलाको फोटो तथा जन्म विवरणहरू केवल ज्योतिषीय र हस्तरेखा प्रतिवेदन तयार गर्नका लागि मात्र प्रयोग गरिन्छ।'
            : 'Nyoria चिना prioritizes user privacy. Hand photos and birth details are processed solely to produce astrological and palmistry reports.'}
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-gold-400">
          {isNe ? '२. कुनै पनि सार्वजनिक एआई तालिम नगर्ने प्रतिबद्धता' : '2. No AI Training on User Data'}
        </h3>
        <p>
          {isNe
            ? 'प्रयोगकर्ताको स्पष्ट अनुमतिबिना तपाईँका फोटो वा जन्म विवरणहरू सार्वजनिक एआई मोडेल तालिमका लागि प्रयोग गरिँदैन।'
            : 'Your personal hand images and birth information are strictly isolated and never utilized for general AI model training without consent.'}
        </p>

        <h3 className="text-base font-bold text-gray-900 dark:text-gold-400">
          {isNe ? '३. विवरण मेटाउने अधिकार' : '3. Right to Deletion'}
        </h3>
        <p>
          {isNe
            ? 'प्रयोगकर्ताले जुनसुकै बेला आफ्नो ड्यासबोर्डबाट आफ्ना सम्पूर्ण हस्तरेखा र कुण्डली रिपोर्टहरू स्थायी रूपमा मेटाउन सक्नुहुन्छ।'
            : 'You possess the perpetual right to delete your uploaded images, records, and accounts at any time from the dashboard.'}
        </p>
      </div>
    </div>
  );
}
