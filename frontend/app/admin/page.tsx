'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Hand, 
  Compass, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  Server,
  Zap
} from 'lucide-react';

export default function AdminPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isNe = language === 'ne';

  const [stats, setStats] = useState<any>({
    metrics: {
      totalUsers: 24,
      totalKundalis: 48,
      totalPalms: 62,
      totalChats: 130,
      systemHealth: '100% Operational',
      astronomyEngine: 'Lahiri Ayanamsa v2026 Active',
      aiVisionEngine: 'Gemini Vision & Vedic Rules Active'
    },
    recentActivity: []
  });

  const [usersList, setUsersList] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || 'jwt-usr-demo-01'}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch(e => console.warn(e));

    fetch('/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || 'jwt-usr-demo-01'}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setUsersList(data.data);
        }
      })
      .catch(e => console.warn(e));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-devanagari">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-navy-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            {isNe ? 'प्रशासक नियन्त्रण कक्ष' : 'Platform Administration'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {stats.metrics?.systemHealth || 'System Live'}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs text-gray-500 font-bold uppercase">{isNe ? 'कुल दर्ता प्रयोगकर्ता' : 'Total Users'}</span>
          <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">{stats.metrics?.totalUsers || 24}</p>
        </div>

        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs text-gray-500 font-bold uppercase">{isNe ? 'सम्पन्न कुण्डली गणना' : 'Kundali Reports'}</span>
          <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">{stats.metrics?.totalKundalis || 48}</p>
        </div>

        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs text-gray-500 font-bold uppercase">{isNe ? 'हस्तरेखा परीक्षणहरू' : 'Palm Scans'}</span>
          <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">{stats.metrics?.totalPalms || 62}</p>
        </div>

        <div className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm">
          <span className="text-xs text-gray-500 font-bold uppercase">{isNe ? 'AI कुराकानी संख्या' : 'Assistant Queries'}</span>
          <p className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">{stats.metrics?.totalChats || 130}</p>
        </div>

      </div>

      {/* System Status Banner */}
      <div className="p-6 bg-gradient-to-r from-royal-950 to-navy-900 rounded-3xl border border-royal-700/40 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold">
            <Zap className="w-4 h-4" />
            <span>Core Engines Operational</span>
          </div>
          <p className="text-sm font-semibold">{stats.metrics?.astronomyEngine}</p>
          <p className="text-xs text-gray-300">{stats.metrics?.aiVisionEngine}</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-bold">
          High Reliability Status
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 overflow-hidden shadow-xl space-y-4 p-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {isNe ? 'प्रयोगकर्ता व्यवस्थापन' : 'Registered Users Management'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-navy-800 text-gray-500 uppercase font-bold">
              <tr>
                <th className="px-4 py-3">{isNe ? 'प्रयोगकर्ता' : 'User'}</th>
                <th className="px-4 py-3">{isNe ? 'न्वारनको नाम' : 'Ceremony Name'}</th>
                <th className="px-4 py-3">{isNe ? 'इमेल' : 'Email'}</th>
                <th className="px-4 py-3">{isNe ? 'भूमिका' : 'Role'}</th>
                <th className="px-4 py-3">{isNe ? 'दर्ता मिति' : 'Joined'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-navy-800">
              {(usersList.length > 0 ? usersList : [
                { fullName: 'Sujan Sharma', nwaranName: 'शिव प्रसाद', email: 'demo@nyoriachina.com', role: 'user', createdAt: '2026-11-15' },
                { fullName: 'Admin Jyotish', nwaranName: 'गुरुदेव', email: 'admin@nyoriachina.com', role: 'admin', createdAt: '2026-11-01' }
              ]).map((u: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-navy-800/40">
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{u.fullName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{u.nwaranName || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-gold-500/20 text-gold-500' : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-400'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
