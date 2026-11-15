'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Sparkles, 
  Hand, 
  Compass, 
  Bot, 
  LayoutDashboard, 
  Bookmark, 
  CreditCard,
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  User as UserIcon,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home, icon: Sparkles },
    { href: '/palm-reading', label: t.nav.palmReading, icon: Hand },
    { href: '/kundali', label: t.nav.kundali, icon: Compass },
    { href: '/assistant', label: t.nav.assistant, icon: Bot },
    { href: '/pricing', label: t.nav.pricing, icon: CreditCard },
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { href: '/reports', label: t.nav.reports, icon: Bookmark },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-navy-900/85 border-b border-gray-200/50 dark:border-navy-700/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo - Brand name "Nyoria चिना" is preserved */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-royal-600 via-royal-500 to-gold-500 p-0.5 shadow-lg shadow-royal-600/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-navy-900 via-royal-600 to-navy-900 dark:from-white dark:via-purple-200 dark:to-gold-400 bg-clip-text text-transparent">
                Nyoria <span className="font-devanagari text-gold-500 dark:text-gold-400 font-extrabold">चिना</span>
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1 font-medium tracking-wider uppercase">
                Vedic AI Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 border border-royal-600/20 dark:border-gold-500/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-royal-600 dark:hover:text-gold-400 hover:bg-gray-100 dark:hover:bg-navy-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-royal-600 dark:text-gold-400' : 'text-gray-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Language Switcher, Theme Switcher, Auth Button */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800/80 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-royal-600 dark:hover:border-gold-500 transition-colors shadow-sm"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-royal-600 dark:text-gold-400" />
              <span>{language === 'ne' ? 'नेपाली' : 'English'}</span>
              <span className="text-[10px] uppercase px-1 py-0.2 rounded bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold">
                {language === 'ne' ? 'EN' : 'ने'}
              </span>
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-gray-50 dark:bg-navy-800/80 text-gray-700 dark:text-gray-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-royal-600" />}
            </button>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-navy-700">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 border border-royal-600/30 text-xs font-medium hover:scale-102 transition-transform"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[100px]">{user.fullName || user.email.split('@')[0]}</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="p-1.5 rounded-lg bg-gold-500/20 text-gold-500 hover:bg-gold-500/30 text-xs"
                    title="Admin Panel"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-royal-600 to-royal-700 text-white shadow-md shadow-royal-600/30 hover:shadow-royal-600/50 hover:scale-102 transition-all"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-1.5 text-xs font-bold rounded border border-gray-300 dark:border-navy-700"
            >
              {language === 'ne' ? 'EN' : 'ने'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 space-y-2 border-t border-gray-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-royal-600/15 text-royal-600 dark:text-gold-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800'
                }`}
              >
                <Icon className="w-4 h-4 text-gold-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-gray-200 dark:border-navy-800 flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-royal-600" />}
              <span>{isDark ? t.common.lightMode : t.common.darkMode}</span>
            </button>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-red-500 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.nav.logout}</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-royal-600 dark:text-gold-400"
              >
                {t.nav.login} / {t.nav.register}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
