'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Compass, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { language, t } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();
  const isNe = language === 'ne';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const success = await login(email, password);
    setLoading(false);
    if (success) {
      router.push('/dashboard');
    } else {
      setError(isNe ? 'इमेल वा पासवर्ड मिलेन।' : 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-navy-900 rounded-3xl p-8 border border-gray-200 dark:border-navy-800 shadow-2xl space-y-6">
        
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-royal-600 to-gold-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-gold-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white font-devanagari">
            {isNe ? 'Nyoria चिना मा लगइन गर्नुहोस्' : 'Log In to Nyoria चिना'}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-devanagari">
            {isNe ? 'आफ्ना सुरक्षित कुण्डली तथा हस्तरेखा रिपोर्टहरू हेर्नुहोस्।' : 'Access your saved readings and Vedic charts.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold text-center font-devanagari">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 font-devanagari">
              {isNe ? 'इमेल ठेगाना' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 font-devanagari">
                {isNe ? 'पासवर्ड' : 'Password'}
              </label>
              <span className="text-[11px] text-royal-600 dark:text-gold-400 hover:underline cursor-pointer font-devanagari">
                {isNe ? 'पासवर्ड बिर्सनुभयो?' : 'Forgot password?'}
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 text-white font-bold text-xs shadow-lg shadow-royal-600/30 transition-transform hover:scale-[1.01] disabled:opacity-50 font-devanagari"
          >
            {loading ? t.common.loading : t.nav.login}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500 font-devanagari">
          {isNe ? 'खाता छैन?' : "Don't have an account?"}{' '}
          <Link href="/register" className="font-bold text-royal-600 dark:text-gold-400 hover:underline">
            {t.nav.register}
          </Link>
        </div>

      </div>
    </div>
  );
}
