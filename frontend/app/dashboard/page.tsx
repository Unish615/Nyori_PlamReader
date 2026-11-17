'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { CreditManager } from '../../lib/creditManager';
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
  ChevronRight,
  User as UserIcon,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const isNe = language === 'ne';

  const [reports, setReports] = useState<any[]>([]);
  const [credits, setCredits] = useState({
    aiQuestions: 3,
    palmReadings: 1,
    kundalis: 1
  });
  const [subscription, setSubscription] = useState<any>({
    planName: 'Free Plan',
    status: 'active',
    billingPeriod: 'free',
    expiryDate: null
  });
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    palms: 0,
    kundalis: 0,
    chats: 0,
    saved: 0
  });

  const loadDashboardData = () => {
    // 1. Instant robust local load (works for guests & logged in users alike)
    const localCreds = CreditManager.getCredits(user?.id);
    const localSub = CreditManager.getSubscription(user?.id);
    const localPayments = CreditManager.getPayments(user?.id);

    setCredits(localCreds);
    setSubscription(localSub);
    setPayments(localPayments);

    const currentUserId = user?.id || 'usr-client';

    // 2. Fetch server credits & subscription sync
    fetch(`/api/credits?userId=${currentUserId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.subscription && data.subscription.planId !== 'plan-free') {
            setSubscription(data.subscription);
            CreditManager.saveSubscription(data.subscription, user?.id);
          } else if (localSub.planId !== 'plan-free') {
            // Push active client subscription to server
            fetch('/api/credits', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: currentUserId,
                subscription: localSub,
                credits: localCreds,
                planId: localSub.planId
              })
            }).catch(() => {});
          }

          if (data.credits && localSub.planId === 'plan-free') {
            setCredits(data.credits);
            CreditManager.saveCredits(data.credits, user?.id);
          }
        }
      })
      .catch(() => {});

    // 3. Fetch server payment history and merge seamlessly
    fetch(`/api/payments/my?userId=${currentUserId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.payments)) {
          // Merge unique by transactionReference or id
          const map = new Map();
          localPayments.forEach(p => map.set(p.transactionReference.toLowerCase(), p));
          data.payments.forEach((p: any) => map.set(p.transactionReference.toLowerCase(), p));
          const merged = Array.from(map.values()).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setPayments(merged);
        }
      })
      .catch(() => {});

    // 4. Fetch reports
    fetch('/api/reports', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || ''}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setReports(data.data);
          const p = data.data.filter((r: any) => r.type === 'palm').length;
          const k = data.data.filter((r: any) => r.type === 'kundali').length;
          setStats({
            palms: p,
            kundalis: k,
            chats: 0,
            saved: data.data.length
          });
        }
      })
      .catch(err => {
        console.warn('Reports fetch error', err);
        setReports([]);
      });
  };

  useEffect(() => {
    loadDashboardData();

    const handleSync = () => {
      setCredits(CreditManager.getCredits(user?.id));
      setSubscription(CreditManager.getSubscription(user?.id));
      setPayments(CreditManager.getPayments(user?.id));
    };

    window.addEventListener('nyoria_credits_changed', handleSync);
    window.addEventListener('nyoria_subscription_changed', handleSync);

    return () => {
      window.removeEventListener('nyoria_credits_changed', handleSync);
      window.removeEventListener('nyoria_subscription_changed', handleSync);
    };
  }, [user, isNe]);

  const handleSwitchPlan = (planId: string) => {
    const { subscription: newSub, credits: newCreds } = CreditManager.activatePlan(planId, user?.id);
    setSubscription(newSub);
    setCredits(newCreds);
  };

  const handleQuickApprove = (paymentId: string, planId: string) => {
    CreditManager.updatePaymentStatus(paymentId, 'approved');
    const { subscription: newSub, credits: newCreds } = CreditManager.activatePlan(planId, user?.id);
    setSubscription(newSub);
    setCredits(newCreds);
    setPayments(CreditManager.getPayments(user?.id));
    fetch('/api/payments/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId, adminId: user?.id || 'usr-admin-01' })
    }).catch(() => {});
    alert(isNe ? 'भुक्तानी स्वीकृत भयो र योजना सक्रिय भयो!' : 'Payment approved and plan activated successfully!');
  };

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
            <Compass className="w-3.5 h-3.5" />
            <span>{isNe ? 'व्यक्तिगत ड्यासबोर्ड' : 'Personal Dashboard'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-devanagari">
            {t.dashboard.welcome}{user?.fullName ? `, ${user.fullName}` : ''}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-devanagari">
            {user?.nwaranName && `${isNe ? 'न्वारनको नाम' : 'Ceremony Name'}: ${user.nwaranName} • `}
            {isNe ? 'तपाईंका हस्तरेखा र कुण्डली प्रतिवेदनहरू यहाँ सुरक्षित छन्।' : 'All your astrological readings and reports are saved securely here.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 text-xs font-bold shadow-lg transition-transform hover:scale-105 font-devanagari"
          >
            <CreditCard className="w-4 h-4" />
            <span>{isNe ? 'योजना तथा भुक्तानी' : 'Plans & Credits'}</span>
          </Link>
          <Link
            href="/palm-reading"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105 font-devanagari"
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

      {/* Credit Balance & Subscription Status (Section 18.B) */}
      <div className="p-6 sm:p-7 bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-600/10 dark:bg-royal-600/20 text-royal-600 dark:text-gold-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-devanagari">
                {t.credits.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-devanagari">
                <span>{t.credits.planStatus}: <strong className="text-royal-600 dark:text-gold-400 text-sm">{subscription.planName}</strong></span>
                <span>•</span>
                <span>{t.credits.validUntil}: {subscription.expiryDate ? new Date(subscription.expiryDate).toLocaleDateString() : t.credits.expiresNever}</span>
              </div>
            </div>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold transition-all font-devanagari shrink-0"
          >
            <span>{t.credits.upgradeToContinue}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Plan Switcher for Instant Testing & Selection */}
        <div className="p-3 bg-gray-50 dark:bg-navy-800/60 rounded-2xl border border-gray-100 dark:border-navy-700/60 flex flex-wrap items-center justify-between gap-3 text-xs font-devanagari">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {isNe ? 'योजना चयन गर्नुहोस् (तुरुन्त सक्रिय):' : 'Switch / Test Plan (Instant Activate):'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'plan-free', name: 'Free (NPR 0)', nameNe: 'निःशुल्क (रू ०)' },
              { id: 'plan-basic', name: 'Basic (NPR 100)', nameNe: 'आधारभूत (रू १००)' },
              { id: 'plan-premium', name: 'Premium (NPR 299)', nameNe: 'प्रिमियम (रू २९९)' },
              { id: 'plan-ultimate', name: 'Ultimate (NPR 599 - ∞)', nameNe: 'अल्टिमेट (रू ५९९ - ∞)' }
            ].map(p => {
              const active = subscription.planId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSwitchPlan(p.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 shadow-md ring-2 ring-gold-400 font-black'
                      : 'bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300 hover:border-royal-500 hover:text-royal-600 dark:hover:text-gold-400'
                  }`}
                >
                  {isNe ? p.nameNe : p.name}
                  {active && <span className="ml-1 text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* AI Questions Remaining */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-800/60 border border-gray-100 dark:border-navy-700 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium font-devanagari">
                {t.credits.aiQuestionsRemaining}
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                {subscription.planId === 'plan-ultimate' || credits.aiQuestions >= 99999 ? (
                  <>
                    <span className="text-3xl text-gold-500">∞</span>
                    <span className="text-[11px] font-bold text-gold-600 dark:text-gold-400 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30">
                      {isNe ? 'असीमित' : 'Unlimited'}
                    </span>
                  </>
                ) : (
                  credits.aiQuestions
                )}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
          </div>

          {/* Palm Readings Remaining */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-800/60 border border-gray-100 dark:border-navy-700 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium font-devanagari">
                {t.credits.palmReadingsRemaining}
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                {subscription.planId === 'plan-ultimate' || credits.palmReadings >= 99999 ? (
                  <>
                    <span className="text-3xl text-gold-500">∞</span>
                    <span className="text-[11px] font-bold text-gold-600 dark:text-gold-400 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30">
                      {isNe ? 'असीमित' : 'Unlimited'}
                    </span>
                  </>
                ) : (
                  credits.palmReadings
                )}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center">
              <Hand className="w-5 h-5" />
            </div>
          </div>

          {/* Kundali Reports Remaining */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-800/60 border border-gray-100 dark:border-navy-700 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium font-devanagari">
                {t.credits.kundaliReportsRemaining}
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                {subscription.planId === 'plan-ultimate' || credits.kundalis >= 99999 ? (
                  <>
                    <span className="text-3xl text-gold-500">∞</span>
                    <span className="text-[11px] font-bold text-gold-600 dark:text-gold-400 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30">
                      {isNe ? 'असीमित' : 'Unlimited'}
                    </span>
                  </>
                ) : (
                  credits.kundalis
                )}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-royal-600/10 text-royal-600 dark:text-royal-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* User Payment History Section (Section 18.D & 18.H) */}
      <div className="p-6 sm:p-7 bg-white dark:bg-navy-900 rounded-3xl border border-gray-200 dark:border-navy-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-royal-600 dark:text-gold-400" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-devanagari">
              {t.payment.historyTitle}
            </h2>
          </div>
          <Link
            href="/pricing"
            className="text-xs font-semibold text-royal-600 dark:text-gold-400 hover:underline font-devanagari"
          >
            {isNe ? '+ नयाँ योजना खरिद गर्नुहोस्' : '+ Upgrade Plan'}
          </Link>
        </div>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-devanagari">
              <thead>
                <tr className="border-b border-gray-200 dark:border-navy-700 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">{isNe ? 'योजना' : 'Plan'}</th>
                  <th className="py-3 px-3">{isNe ? 'रकम (NPR)' : 'Amount'}</th>
                  <th className="py-3 px-3">{isNe ? 'माध्यम' : 'Method'}</th>
                  <th className="py-3 px-3">{isNe ? 'कारोबार नं' : 'Txn Ref'}</th>
                  <th className="py-3 px-3">{isNe ? 'मिति' : 'Date'}</th>
                  <th className="py-3 px-3">{isNe ? 'अवस्था' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-navy-800">
                {payments.map((p) => {
                  let badge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
                      <Clock className="w-3 h-3" /> {t.payment.statusPending}
                    </span>
                  );
                  if (p.status === 'approved') {
                    badge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> {t.payment.statusApproved}
                      </span>
                    );
                  } else if (p.status === 'rejected') {
                    badge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[11px] font-semibold">
                        <XCircle className="w-3 h-3" /> {t.payment.statusRejected}
                      </span>
                    );
                  }

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-navy-800/40">
                      <td className="py-3 px-3 font-bold text-gray-900 dark:text-white">{p.planName}</td>
                      <td className="py-3 px-3 font-semibold text-emerald-600 dark:text-emerald-400 font-mono">NPR {p.amountNpr}</td>
                      <td className="py-3 px-3 uppercase font-medium">{p.paymentMethod}</td>
                      <td className="py-3 px-3 font-mono text-gray-500 dark:text-gray-400">{p.transactionReference}</td>
                      <td className="py-3 px-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {badge}
                          {p.status === 'pending' && (
                            <button
                              onClick={() => handleQuickApprove(p.id, p.planId)}
                              className="px-2 py-0.5 rounded-lg bg-royal-600 hover:bg-royal-700 text-white text-[10px] font-bold shadow transition-transform active:scale-95 cursor-pointer"
                              title={isNe ? "प्रमाणीकरण गरी योजना सक्रिय गर्नुहोस्" : "Approve & Activate Plan Now"}
                            >
                              {isNe ? 'सक्रिय गर्नुहोस्' : 'Activate'}
                            </button>
                          )}
                        </div>
                        {p.status === 'rejected' && p.rejectionReason && (
                          <div className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{p.rejectionReason}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center rounded-2xl bg-gray-50 dark:bg-navy-800/40 border border-gray-100 dark:border-navy-700/60 text-xs text-gray-500 font-devanagari">
            {isNe ? 'अहिलेसम्म कुनै म्यानुअल भुक्तानी अनुरोध गरिएको छैन।' : 'No manual payment requests submitted yet.'}
          </div>
        )}
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
              href="/pricing"
              className="flex items-center justify-between p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-gold-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white font-devanagari">
                    {t.nav.pricing}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-devanagari">
                    {isNe ? 'योजना खरिद र क्रेडिट थप' : 'Upgrade & buy credits'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/palm-reading"
              className="flex items-center justify-between p-4 bg-white dark:bg-navy-900 rounded-2xl border border-gray-200 dark:border-navy-800 shadow-sm hover:border-gold-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-royal-600/10 text-royal-600 dark:text-gold-400 flex items-center justify-center">
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
          </div>
        </div>

      </div>

    </div>
  );
}
