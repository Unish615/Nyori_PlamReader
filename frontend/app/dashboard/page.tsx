'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Hand, 
  Compass, 
  Bot, 
  Bookmark, 
  Clock, 
  ArrowRight, 
  Download, 
  Trash2, 
  Plus, 
  Sparkles,
  ChevronRight,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const isNe = language === 'ne';

  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState({
    palms: 1,
    kundalis: 1,
    chats: 3,
    saved: 2
  });

  useEffect(() => {
    // Fetch reports
    fetch('/api/reports', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || 'jwt-usr-demo-01'}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setReports(data.data);
          const p = data.data.filter((r: any) => r.type === 'palm').length;
          const k = data.data.filter((r: any) => r.type === 'kundali').length;
          setStats({
            palms: Math.max(1, p),
            kundalis: Math.max(1, k),
            chats: 4,
            saved: data.data.length || 2
          });
        }
      })
      .catch(err => {
        console.warn('Reports fetch error fallback', err);
        // Default sample reports
        setReports([
          {
            id: 'kun-01',
            type: 'kundali',
            title: isNe ? 'कुण्डली: Sujan Sharma (शिव प्रसाद)' : 'Kundali: Sujan Sharma',
            date: new Date().toISOString(),
            details: { lagna: 'वृष', rashi: 'मीन', nakshatra: 'रेवती' }
          },
          {
            id: 'plm-01',
            type: 'palm',
            title: isNe ? 'हस्तरेखा परीक्षण (दायाँ हात)' : 'Palm Reading (Right Hand)',
            date: new Date(Date.now() - 86400000).toISOString(),
            details: { handType: 'right', quality: 'verified' }
          }
        ]);
      });
  }, [isNe]);

  const handleDelete = async (id: string) => {
    if (!confirm(isNe ? 'के तपाईं यो रिपोर्ट मेटाउन चाहनुहुन्छ?' : 'Are you sure you want to delete this report?')) return;
    try {
      await fetch(`/api/reports/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || 'jwt-usr-demo-01'}` }
      });
    } catch (e) {
      console.warn(e);
    }
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-royal-900 via-navy-900 to-navy-900 border border-royal-600/30 shadow-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isNe ? 'व्यक्तिगत ड्यासबोर्ड' : 'Personal Dashboard'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-devanagari">
            {t.dashboard.welcome}, {user?.fullName || 'Sujan Sharma'}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-devanagari">
            {user?.nwaranName && `${isNe ? 'न्वारनको नाम' : 'Ceremony Name'}: ${user.nwaranName} • `}
            {isNe ? 'तपाईंका हस्तरेखा र कुण्डली प्रतिवेदनहरू यहाँ सुरक्षित छन्।' : 'All your astrological readings and reports are saved securely here.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link
            href="/palm-reading"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow-lg transition-transform hover:scale-105 font-devanagari"
          >
            <Hand className="w-4 h-4" />
            <span>{t.dashboard.newPalmBtn}</span>
          </Link>
          <Link
            href="/kundali"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-transform hover:scale-105 font-devanagari"
          >
            <Compass className="w-4 h-4 text-gold-400" />
            <span>{t.dashboard.newKundaliBtn}</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 font-devanagari">
              {t.dashboard.totalPalms}
            </span>
            <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">
              {stats.palms}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
            <Hand className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 font-devanagari">
              {t.dashboard.totalKundalis}
            </span>
            <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">
              {stats.kundalis}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 font-devanagari">
              {t.dashboard.totalChats}
            </span>
            <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">
              {stats.chats}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 font-devanagari">
              {t.dashboard.savedReports}
            </span>
            <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">
              {stats.saved}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
            <Bookmark className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Reports List (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-devanagari">
              {t.dashboard.recentActivity}
            </h3>
            <Link
              href="/reports"
              className="text-xs font-semibold text-royal-600 dark:text-gold-400 hover:underline font-devanagari flex items-center gap-1"
            >
              <span>{t.dashboard.viewAllReports}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-royal-500 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-navy-800 flex items-center justify-center text-royal-600 dark:text-gold-400">
                      {report.type === 'palm' ? <Hand className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white font-devanagari">
                        {report.title}
                      </h4>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={report.type === 'palm' ? '/palm-reading' : '/kundali'}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 text-xs font-medium text-gray-700 dark:text-gray-300 font-devanagari"
                    >
                      {isNe ? 'हेर्नुहोस्' : 'View'}
                    </Link>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 text-xs text-gray-500 font-devanagari">
                {t.dashboard.noReportsYet}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Navigation Sidebar */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-devanagari">
            {t.dashboard.quickActions}
          </h3>

          <div className="space-y-3">
            <Link
              href="/palm-reading"
              className="flex items-center justify-between p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-gold-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
                  <Hand className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white font-devanagari">
                    {t.nav.palmReading}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-devanagari">
                    {isNe ? 'नयाँ हत्केला स्क्यान' : 'Scan hand photo'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/kundali"
              className="flex items-center justify-between p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-gold-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-royal-600/10 text-royal-600 dark:text-gold-400 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white font-devanagari">
                    {t.nav.kundali}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-devanagari">
                    {isNe ? 'न्वारनको नामबाट चिना' : 'Generate birth chart'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/assistant"
              className="flex items-center justify-between p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-gold-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white font-devanagari">
                    {t.nav.assistant}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-devanagari">
                    {isNe ? 'आवाज वा च्याटबाट प्रश्न' : 'Ask voice questions'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/profile"
              className="flex items-center justify-between p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-gold-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white font-devanagari">
                    {isNe ? 'प्रयोगकर्ता प्रोफाइल' : 'User Profile'}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-devanagari">
                    {isNe ? 'जन्म विवरण र प्राथमिकता' : 'Manage birth settings'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
