'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
  children: React.ReactNode;
  featureName?: string;
  featureNameNe?: string;
}

export function AuthGuard({ children, featureName, featureNameNe }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const { language } = useLanguage();
  const pathname = usePathname();
  const isNe = language === 'ne';

  if (isLoading) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-10 h-10 border-3 border-royal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-500 font-medium font-devanagari">
          {isNe ? 'प्रयोगकर्ता प्रमाणीकरण जाँच हुँदैछ...' : 'Verifying user authentication...'}
        </p>
      </div>
    );
  }

  if (!user) {
    const redirectParam = encodeURIComponent(pathname || '/dashboard');
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center border border-royal-600/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-devanagari">
              {isNe ? 'पहिले लगइन गर्नुहोस्' : 'Login Required'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-devanagari leading-relaxed">
              {isNe ? (
                <>
                  यस <strong className="text-royal-600 dark:text-gold-400">{featureNameNe || 'विशेष सुविधा'}</strong> को पूर्ण प्रयोग गर्नका लागि कृपया पहिले आफ्नो खातामा लगइन गर्नुहोस् वा नयाँ निःशुल्क खाता खोल्नुहोस्।
                </>
              ) : (
                <>
                  Please log in to your Nyoria चिना account to access <strong className="text-royal-600 dark:text-gold-400">{featureName || 'this feature'}</strong> and manage your Vedic reports.
                </>
              )}
            </p>
          </div>

          <div className="space-y-3 pt-2 font-devanagari">
            <Link
              href={`/login?redirect=${redirectParam}`}
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-royal-600/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>{isNe ? 'खातामा लगइन गर्नुहोस्' : 'Log In to Nyoria चिना'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/register?redirect=${redirectParam}`}
              className="w-full py-2.5 px-5 rounded-2xl border border-gray-300 dark:border-navy-700 hover:bg-gray-100 dark:hover:bg-navy-800 text-gray-800 dark:text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isNe ? 'नयाँ निःशुल्क खाता बनाउनुहोस्' : 'Create Free Account'}</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-navy-800 text-[11px] text-gray-400 font-devanagari">
            {isNe ? 'नयाँ खातामा ३ निःशुल्क AI प्रश्न, १ हस्तरेखा र १ कुण्डली उपलब्ध छ।' : 'Free account includes 3 AI questions, 1 palm reading & 1 Kundali.'}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
