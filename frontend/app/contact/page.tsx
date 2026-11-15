'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Mail, MapPin, Send, CheckCircle2, Compass } from 'lucide-react';

export default function ContactPage() {
  const { language } = useLanguage();
  const isNe = language === 'ne';

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 font-devanagari">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-navy-900 dark:text-white">
          {isNe ? 'सम्पर्क गर्नुहोस्' : 'Contact Nyoria चिना'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {isNe ? 'जिज्ञासा, सुझाव वा प्राविधिक सहयोगका लागि हामीलाई सन्देश पठाउनुहोस्।' : 'Reach out for inquiries, feedback, or enterprise partnerships.'}
        </p>
      </div>

      <div className="bg-white dark:bg-navy-900 rounded-3xl p-8 border border-gray-200 dark:border-navy-800 shadow-xl max-w-xl mx-auto space-y-6">
        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {isNe ? 'सन्देश प्राप्त भयो!' : 'Message Received!'}
            </h3>
            <p className="text-xs text-gray-500">
              {isNe ? 'हाम्रो टोलीले छिट्टै तपाईंसँग सम्पर्क गर्नेछ।' : 'Our team will respond to your inquiry shortly.'}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'तपाईंको नाम' : 'Your Name'}
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'इमेल ठेगाना' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'सन्देश' : 'Message'}
              </label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isNe ? 'सन्देश पठाउनुहोस्' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
