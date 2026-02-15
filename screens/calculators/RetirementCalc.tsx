import React, { useState } from 'react';

const RetirementCalc: React.FC = () => {
  const [mode, setMode] = useState<'Standard' | 'FIRE'>('Standard');
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(1000000); // 10 Lakhs
  const [monthlyContribution, setMonthlyContribution] = useState(25000); // Monthly SIP
  const [returnRate, setReturnRate] = useState(12.0);

  // Simplified projection logic
  const yearsToRetirement = Math.max(0, targetAge - currentAge);
  const r = returnRate / 100;
  const n = yearsToRetirement;
  
  // FV of Lumpsum
  const fvPrincipal = currentSavings * Math.pow(1 + r, n);
  
  // FV of SIP: P * [((1+i)^n - 1) / i] * (1+i) usually for beginning of period, 
  // but simplified: P * [((1+r)^n - 1)/r] is for annual compounding of annual payment.
  // For monthly compounding:
  const monthlyRate = r / 12;
  const months = n * 12;
  const fvContributions = (monthlyContribution) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  
  const totalCorpus = fvPrincipal + fvContributions;
  
  // Safe withdrawal rate (SWF) - conservative 5% for India
  const monthlyIncome = (totalCorpus * 0.05) / 12;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setCurrentSavings(Number(val));
  };

  const handleContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setMonthlyContribution(Number(val));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-10 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 py-3 flex items-center justify-between">
        <button className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500">
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-slate-900">Retirement Planner</h1>
        <button className="size-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-primary">
            <span className="material-symbols-outlined fill">history</span>
        </button>
      </header>

      <main className="max-w-xl mx-auto space-y-6 p-4">
        
        {/* Toggle Mode */}
        <div className="bg-white/50 p-1 rounded-xl flex border border-slate-200/60 shadow-sm backdrop-blur-md">
          {['Standard', 'FIRE'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                mode === m 
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Hero Summary Card */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-indigo-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Projected Corpus</p>
            <h2 className="text-5xl font-extrabold text-slate-900 mb-2 tracking-tight relative z-10">
                {formatCurrency(totalCorpus)}
            </h2>
            <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100 relative z-10">
                <span className="material-symbols-outlined text-green-600 text-sm">payments</span>
                <span className="text-green-700 text-xs font-bold">Income: {formatCurrency(monthlyIncome * 12)}/yr</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 relative z-10">
                <div className="text-center">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-lg font-bold text-slate-700">{yearsToRetirement} Years</p>
                </div>
                <div className="text-center border-l border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Maturity Year</p>
                    <p className="text-lg font-bold text-slate-700">{new Date().getFullYear() + yearsToRetirement}</p>
                </div>
            </div>
        </div>

        {/* Inputs Container */}
        <div className="space-y-4">
            <h3 className="text-slate-900 text-lg font-bold px-2">Key Parameters</h3>

            {/* Age Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base">person</span>
                            Current Age
                        </label>
                        <span className="text-2xl font-bold text-slate-900">{currentAge}</span>
                    </div>
                    <input 
                        type="range" min="18" max="70" 
                        value={currentAge} 
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setCurrentAge(val);
                            if(val >= targetAge) setTargetAge(val + 1);
                        }}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all" 
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-300">
                        <span>18</span>
                        <span>70</span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base">beach_access</span>
                            Retirement Age
                        </label>
                        <span className="text-2xl font-bold text-slate-900">{targetAge}</span>
                    </div>
                    <input 
                        type="range" min="30" max="80" 
                        value={targetAge} 
                        onChange={(e) => {
                             const val = Number(e.target.value);
                             if (val > currentAge) setTargetAge(val);
                        }}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all" 
                    />
                     <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-300">
                        <span>30</span>
                        <span>80</span>
                    </div>
                </div>
            </div>

            {/* Money Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-slate-500 font-bold text-xs uppercase tracking-wider">Current Savings</label>
                        <div className="flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-xl border border-transparent focus-within:border-primary/20 focus-within:bg-blue-50/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                            <span className="text-slate-400 font-semibold">₹</span>
                            <input 
                                type="text"
                                value={currentSavings.toLocaleString('en-IN')}
                                onChange={handleSavingsChange}
                                className="w-28 text-right bg-transparent outline-none font-bold text-slate-900 placeholder-slate-300"
                            />
                        </div>
                    </div>
                    <input 
                        type="range" min="0" max="50000000" step="50000"
                        value={currentSavings} 
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all" 
                    />
                     <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-300">
                        <span>₹0</span>
                        <span>₹5 Cr</span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-slate-500 font-bold text-xs uppercase tracking-wider">Monthly SIP</label>
                        <div className="flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-xl border border-transparent focus-within:border-primary/20 focus-within:bg-blue-50/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                            <span className="text-slate-400 font-semibold">₹</span>
                            <input 
                                type="text"
                                value={monthlyContribution.toLocaleString('en-IN')}
                                onChange={handleContributionChange}
                                className="w-28 text-right bg-transparent outline-none font-bold text-slate-900 placeholder-slate-300"
                            />
                        </div>
                    </div>
                    <input 
                        type="range" min="1000" max="500000" step="1000"
                        value={monthlyContribution} 
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all" 
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-300">
                        <span>₹1k</span>
                        <span>₹5 L</span>
                    </div>
                </div>
            </div>

             {/* Returns Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        Exp. Return (CAGR)
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-xl">
                        <input 
                            type="number"
                            value={returnRate}
                            onChange={(e) => setReturnRate(Number(e.target.value))}
                            className="w-12 text-right bg-transparent outline-none font-bold text-slate-900"
                        />
                        <span className="text-slate-400 font-semibold text-sm">%</span>
                    </div>
                </div>
                <input 
                    type="range" min="4" max="25" step="0.5"
                    value={returnRate} 
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all" 
                />
                <div className="flex justify-between mt-2 text-[10px] font-medium text-slate-400">
                    <span>Conservative (4%)</span>
                    <span>Aggressive (25%)</span>
                </div>
            </div>
        </div>
        
        {/* Helper Note */}
        <p className="text-center text-xs text-slate-400 px-8 leading-relaxed">
            *Projections assume a monthly compounding rate based on your expected annual returns. Inflation is not adjusted.
        </p>

      </main>
    </div>
  );
};

export default RetirementCalc;