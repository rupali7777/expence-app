import React from 'react';
import { ScreenName } from '../types';

interface DashboardProps {
  onNavigate: (screen: ScreenName) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-background-light/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
            <img 
              alt="User Profile" 
              className="size-full object-cover" 
              src="https://picsum.photos/100/100" 
            />
          </div>
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-wider">Welcome back</p>
            <h1 className="text-base font-bold leading-none text-slate-900">Arjun Mehta</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors">
            <span className="material-symbols-outlined">visibility</span>
          </button>
          <button className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-light"></span>
          </button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-8">
        {/* Financial Health Score */}
        <section>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-primary/5">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold text-slate-900">Financial Health Score</h2>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+2.4%</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative size-24 flex items-center justify-center shrink-0">
                <svg className="size-full transform -rotate-90">
                  <circle className="text-primary/10" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="40" strokeWidth="8" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-primary">84</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Excellent</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "Your debt-to-income ratio improved this month. You're in the top 5% of savers in your bracket."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">Quick Access Tools</h2>
            <button onClick={() => onNavigate('calculator_menu')} className="text-primary text-sm font-semibold">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div onClick={() => onNavigate('calc_retirement')} className="cursor-pointer bg-white p-4 rounded-xl shadow-sm border border-primary/5 group active:scale-95 transition-all">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">event_repeat</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Retirement Planner</h3>
              <p className="text-[11px] text-gray-500 mt-1">Goal: ₹5 Cr</p>
            </div>

            <div onClick={() => onNavigate('calc_mortgage')} className="cursor-pointer bg-white p-4 rounded-xl shadow-sm border border-primary/5 group active:scale-95 transition-all">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">calculate</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Loan Calculator</h3>
              <p className="text-[11px] text-gray-500 mt-1">Rates from 8.5%</p>
            </div>

            <div onClick={() => onNavigate('calc_investment')} className="cursor-pointer bg-white p-4 rounded-xl shadow-sm border border-primary/5 group active:scale-95 transition-all">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">SIP Calculator</h3>
              <p className="text-[11px] text-gray-500 mt-1">Returns: +14.2%</p>
            </div>

            <div onClick={() => onNavigate('calc_retirement')} className="cursor-pointer bg-white p-4 rounded-xl shadow-sm border border-primary/5 group active:scale-95 transition-all">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">flag</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Financial Freedom</h3>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary h-full w-[65%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">65% of target</p>
            </div>
          </div>
        </section>

        {/* Recent Calculations */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-slate-900">Recent Calculations</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-primary/5 shadow-sm">
              <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">directions_car</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Car Loan Estimate</h4>
                <p className="text-[11px] text-gray-500">2 mins ago • 5 Years</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">₹18,500/mo</p>
                <p className="text-[10px] text-gray-400">9.2% APR</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-primary/5 shadow-sm">
              <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">house</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Home Loan EMI</h4>
                <p className="text-[11px] text-gray-500">Yesterday • 20 years</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">₹48,200/mo</p>
                <p className="text-[10px] text-gray-400">8.6% APR</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-primary/5 shadow-sm">
              <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">NPS Growth</h4>
                <p className="text-[11px] text-gray-500">Oct 24, 2023 • Tier I</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">₹2.8 Cr</p>
                <p className="text-[10px] text-gray-400">at age 60</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;