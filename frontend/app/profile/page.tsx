'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Save, 
  Trash2, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

export default function ProfilePage() {
  const { language, setLanguage, t } = useLanguage();
  const { user, updateUser } = useAuth();
  const isNe = language === 'ne';

  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Unish Gautam',
    nwaranName: user?.nwaranName || 'शिव प्रसाद',
    email: user?.email || 'demo@nyoriachina.com',
    dateOfBirth: user?.dateOfBirth || '1996-05-14',
    timeOfBirth: user?.timeOfBirth || '06:30',
    district: user?.district || 'Kathmandu',
    city: user?.city || 'Kathmandu'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-devanagari">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
          {isNe ? 'प्रयोगकर्ता प्रोफाइल र सेटिङहरू' : 'User Profile & Settings'}
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {isNe ? 'आफ्नो जन्म विवरण, न्वारनको नाम र भाषा प्राथमिकता व्यवस्थित गर्नुहोस्।' : 'Manage your personal birth details, ceremony name, and preferences.'}
        </p>
      </div>

      <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-navy-800 shadow-xl space-y-6">
        
        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isNe ? 'प्रोफाइल विवरण सफलतापूर्वक सुरक्षित भयो।' : 'Profile details updated successfully.'}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'पूरा नाम' : 'Full Name'}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'न्वारनको नाम' : 'Ceremony Name (न्वारनको नाम)'}
              </label>
              <input
                type="text"
                value={formData.nwaranName}
                onChange={(e) => setFormData({ ...formData, nwaranName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'इमेल' : 'Email'}
              </label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-100 dark:bg-navy-800/40 text-gray-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'जन्म मिति' : 'Date of Birth'}
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'जन्म समय' : 'Time of Birth'}
              </label>
              <input
                type="time"
                value={formData.timeOfBirth}
                onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isNe ? 'जन्म जिल्ला' : 'District'}
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-royal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Language Preference */}
          <div className="pt-4 border-t border-gray-100 dark:border-navy-800">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              {isNe ? 'प्राथमिकताको भाषा' : 'Preferred Language'}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setLanguage('ne')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  language === 'ne'
                    ? 'bg-royal-600 text-white border-royal-600'
                    : 'bg-gray-50 dark:bg-navy-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-navy-700'
                }`}
              >
                नेपाली (नेपाल)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  language === 'en'
                    ? 'bg-royal-600 text-white border-royal-600'
                    : 'bg-gray-50 dark:bg-navy-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-navy-700'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isNe ? 'विवरण सुरक्षित गर्नुहोस्' : 'Save Changes'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
