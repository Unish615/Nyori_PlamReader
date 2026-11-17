'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Bookmark, 
  Hand, 
  Compass, 
  Download, 
  Trash2, 
  Search, 
  Calendar, 
  ArrowRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '../../components/AuthGuard';

export default function ReportsPage() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  const [reports, setReports] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'palm' | 'kundali'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/reports', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || 'jwt-usr-demo-01'}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setReports(data.data);
        }
      })
      .catch(err => {
        console.warn('Reports fetch error', err);
        setReports([]);
      });
  }, [isNe]);

  const handleDelete = async (id: string) => {
    if (!confirm(isNe ? 'के तपाईं यो रिपोर्ट मेटाउन निश्चित हुनुहुन्छ?' : 'Are you sure you want to delete this report?')) return;
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

  const filteredReports = reports.filter(r => {
    const matchesFilter = filterType === 'all' || r.type === filterType;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AuthGuard featureName="Saved Reports" featureNameNe="सुरक्षित प्रतिवेदनहरू">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-navy-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 text-xs font-semibold mb-2">
            <Bookmark className="w-4 h-4" />
            <span>{t.nav.reports}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white font-devanagari">
            {isNe ? 'तपाईंका सुरक्षित हस्तरेखा तथा कुण्डली रिपोर्टहरू' : 'Your Saved Astrological Reports'}
          </h1>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder={isNe ? 'रिपोर्ट खोज्नुहोस्...' : 'Search reports...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs text-gray-900 dark:text-white focus:outline-none font-devanagari"
            />
          </div>

          <div className="flex items-center border border-gray-300 dark:border-navy-700 rounded-xl overflow-hidden p-0.5 bg-gray-50 dark:bg-navy-900">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-royal-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {isNe ? 'सबै' : 'All'}
            </button>
            <button
              onClick={() => setFilterType('palm')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'palm'
                  ? 'bg-royal-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {isNe ? 'हस्तरेखा' : 'Palm'}
            </button>
            <button
              onClick={() => setFilterType('kundali')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'kundali'
                  ? 'bg-royal-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {isNe ? 'कुण्डली' : 'Kundali'}
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-6 bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 shadow-md hover:shadow-xl hover:border-royal-600/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
                    {report.type === 'palm' ? <Hand className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 font-mono">
                    {report.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white font-devanagari">
                  {report.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 font-devanagari">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                </span>

                {report.details && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-navy-800 text-xs text-gray-600 dark:text-gray-300 space-y-1 font-devanagari">
                    {report.details.lagna && <div>लग्न: <span className="font-semibold">{report.details.lagna}</span></div>}
                    {report.details.rashi && <div>राशि: <span className="font-semibold">{report.details.rashi}</span></div>}
                    {report.details.nakshatra && <div>नक्षत्र: <span className="font-semibold">{report.details.nakshatra}</span></div>}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-navy-800 flex items-center justify-between">
                <Link
                  href={report.type === 'palm' ? '/palm-reading' : '/kundali'}
                  className="flex items-center gap-1 text-xs font-bold text-royal-600 dark:text-gold-400 hover:underline font-devanagari"
                >
                  <span>{isNe ? 'विस्तृत रिपोर्ट हेर्नुहोस्' : 'View Full Report'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 space-y-3 font-devanagari">
          <Bookmark className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
            {isNe ? 'कुनै पनि सुरक्षित रिपोर्ट भेटिएन' : 'No reports found'}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {isNe ? 'तपाईंले हस्तरेखा वा कुण्डली परीक्षण गरेपछि रिपोर्टहरू यहाँ स्वतः सुरक्षित हुनेछन्।' : 'Your generated palm and kundali readings will be archived here.'}
          </p>
        </div>
      )}

      </div>
    </AuthGuard>
  );
}
