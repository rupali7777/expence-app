import React from 'react';

const Scenarios: React.FC = () => {
  const scenarios = [
    {
        title: "Buy vs Rent (Mumbai/Metro)",
        desc: "Compare wealth creation: ₹1.5 Cr home purchase vs. renting @ ₹45k and investing the downpayment surplus.",
        impact: "High Impact",
        color: "blue",
        icon: "home",
        time: "5 mins",
        complexity: "Medium"
    },
    {
        title: "Growth vs Stability",
        desc: "Simulate ₹50,000 monthly SIP in Aggressive Equity (14% CAGR) vs. Balanced Debt (8% CAGR) over 15 years.",
        impact: "Investing",
        color: "emerald",
        icon: "trending_up",
        time: "3 mins",
        complexity: "Low"
    },
    {
        title: "FIRE vs Traditional",
        desc: "Retire at 45 vs. 60. Calculate the required corpus difference for a ₹2 Lakh/month lifestyle post-retirement.",
        impact: "Retirement",
        color: "amber",
        icon: "park",
        time: "8 mins",
        complexity: "High"
    },
    {
        title: "Prepay Loan vs SIP",
        desc: "Should you pay ₹10 Lakh extra towards your Home Loan or start an Equity SIP? Analyze interest saved vs returns earned.",
        impact: "Debt",
        color: "rose",
        icon: "payments",
        time: "4 mins",
        complexity: "Medium"
    }
  ];

  const getColorClasses = (color: string) => {
      // Map simplified colors to Tailwind classes
      switch(color) {
          case 'blue': return { bg: 'bg-blue-50', icon: 'text-primary', badge: 'bg-blue-100 text-primary' };
          case 'emerald': return { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' };
          case 'amber': return { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' };
          case 'rose': return { bg: 'bg-rose-50', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' };
          default: return { bg: 'bg-gray-50', icon: 'text-gray-600', badge: 'bg-gray-100 text-gray-700' };
      }
  };

  return (
    <div className="bg-background-light min-h-screen text-[#111318]">
        <header className="flex items-center bg-white p-4 border-b border-gray-100 justify-between sticky top-0 z-10">
            <div className="text-[#111318] flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </div>
            <h1 className="text-[#111318] text-lg font-bold leading-tight tracking-tight flex-1 text-center">Financial Scenarios</h1>
            <div className="flex size-10 items-center justify-end">
                <button className="flex items-center justify-center rounded-full size-10 hover:bg-gray-50 transition-colors">
                    <span className="material-symbols-outlined">help_outline</span>
                </button>
            </div>
        </header>

        <div className="px-4 py-4">
            <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                    <div className="text-[#636f88] flex border-none bg-white items-center justify-center pl-4 rounded-l-xl">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </div>
                    <input className="flex w-full min-w-0 flex-1 border-none bg-white focus:ring-0 h-full placeholder:text-[#636f88] px-4 rounded-r-xl text-base font-normal leading-normal text-slate-900" placeholder="Search scenarios..." />
                </div>
            </label>
        </div>

        <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-5 shadow-sm transition-all">
                <span className="text-sm font-semibold tracking-wide">All</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white text-[#111318] px-5 hover:bg-gray-100 transition-all border border-transparent">
                <span className="text-sm font-medium">Real Estate</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white text-[#111318] px-5 hover:bg-gray-100 transition-all border border-transparent">
                <span className="text-sm font-medium">Retirement</span>
            </button>
        </div>

        <main className="px-4 space-y-4 pb-4">
            {scenarios.map((s, i) => {
                const colors = getColorClasses(s.color);
                return (
                    <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className={`h-40 w-full ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <div className="z-10 bg-white p-4 rounded-2xl shadow-xl">
                                <span className={`material-symbols-outlined ${colors.icon} text-5xl`}>{s.icon}</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="text-[#111318] text-lg font-bold leading-tight">{s.title}</h3>
                                <span className={`${colors.badge} text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider`}>{s.impact}</span>
                            </div>
                            <p className="text-[#636f88] text-sm leading-relaxed">{s.desc}</p>
                            <div className="flex items-center gap-4 text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {s.time}</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bar_chart</span> {s.complexity}</span>
                            </div>
                            <button className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                                Compare Scenarios
                            </button>
                        </div>
                    </div>
                );
            })}
        </main>
    </div>
  );
};

export default Scenarios;