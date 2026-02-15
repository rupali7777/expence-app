import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InvestmentCalc: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [expenseRatio, setExpenseRatio] = useState(1.0); // 1% Investment Charge
  const [taxRate, setTaxRate] = useState(12.0); // 12% LTCG

  const { data, totalInvested, totalCorpus, wealthGained, taxAmount, finalValue } = useMemo(() => {
    const chartData = [];
    let currentBalance = initialInvestment;
    let currentInvested = initialInvestment;
    
    // Effective annual rate considering expense ratio
    // We treat expense ratio as a deduction from annual return (CAGR reduction)
    const effectiveAnnualRate = Math.max(0, annualReturn - expenseRatio);
    const monthlyRate = effectiveAnnualRate / 100 / 12;

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        chartData.push({
          year: `Yr 0`,
          balance: currentBalance,
          invested: currentInvested,
        });
      } else {
        // Compound for 12 months
        for (let m = 0; m < 12; m++) {
          currentBalance += monthlyContribution;
          currentBalance *= (1 + monthlyRate);
          currentInvested += monthlyContribution;
        }
        
        chartData.push({
          year: `Yr ${year}`,
          balance: Math.round(currentBalance),
          invested: Math.round(currentInvested),
        });
      }
    }

    const totalGain = Math.max(0, currentBalance - currentInvested);
    const tax = totalGain * (taxRate / 100);
    const final = currentBalance - tax;

    return {
      data: chartData,
      totalInvested: currentInvested,
      totalCorpus: currentBalance,
      wealthGained: totalGain,
      taxAmount: tax,
      finalValue: final
    };
  }, [initialInvestment, monthlyContribution, annualReturn, years, expenseRatio, taxRate]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                   <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">SIP Calculator</h1>
                   <p className="text-[10px] text-slate-500 font-medium">Includes Tax & Charges</p>
                </div>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-slate-900">restart_alt</span>
            </button>
        </div>
      </header>

      <main className="flex-1 w-full pb-8">
         <section className="p-4">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-xl shadow-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <span className="material-symbols-outlined text-9xl">savings</span>
                </div>
                
                <p className="text-sm font-medium text-white/80 mb-1">Net Receivable Amount (Post Tax)</p>
                <h2 className="text-3xl font-extrabold mb-6 tracking-tight">{formatCurrency(finalValue)}</h2>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">Total Invested</p>
                        <p className="text-lg font-bold">{formatCurrency(totalInvested)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">Wealth Gained</p>
                        <p className="text-lg font-bold text-green-300">+{formatCurrency(wealthGained)}</p>
                    </div>
                </div>
            </div>
         </section>

         {/* Chart Section */}
         <section className="px-4 py-2">
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-sm text-slate-900">Growth Projection</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                            <span className="text-slate-500">Invested</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            <span className="text-primary">Gains</span>
                        </div>
                    </div>
                </div>
                
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1754cf" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#1754cf" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#1754cf" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                      <Area type="monotone" dataKey="invested" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-3 border-t border-slate-50 mt-2">
                    <span>Now</span>
                    <span>{Math.floor(years/2)} Years</span>
                    <span>{years} Years</span>
                </div>
            </div>
         </section>
        
        {/* Breakdown of Taxes */}
         <section className="px-4 py-2">
            <div className="flex gap-2">
                <div className="flex-1 bg-red-50 border border-red-100 p-3 rounded-xl">
                   <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">LTCG Tax ({taxRate}%)</p>
                   <p className="text-base font-bold text-red-700">-{formatCurrency(taxAmount)}</p>
                </div>
                <div className="flex-1 bg-orange-50 border border-orange-100 p-3 rounded-xl">
                   <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Exp Ratio ({expenseRatio}%)</p>
                   <p className="text-base font-bold text-orange-700">Applied</p>
                </div>
            </div>
         </section>

         <section className="p-4 space-y-6">
            <h3 className="text-base font-bold text-slate-800 px-1">Configuration</h3>
            
            {/* Initial & Monthly */}
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 flex justify-between">
                        Lumpsum Investment
                        <span className="text-primary font-bold">₹{initialInvestment.toLocaleString('en-IN')}</span>
                    </label>
                    <input 
                        type="range" min="0" max="1000000" step="10000" 
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 flex justify-between">
                        Monthly SIP
                        <span className="text-primary font-bold">₹{monthlyContribution.toLocaleString('en-IN')}</span>
                    </label>
                    <input 
                        type="range" min="500" max="100000" step="500" 
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                </div>
            </div>

            {/* Returns & Time */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exp Return</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            value={annualReturn}
                            onChange={(e) => setAnnualReturn(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-lg font-bold focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900"
                        />
                        <span className="absolute right-3 top-4 text-xs font-bold text-slate-400">%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Duration</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-lg font-bold focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900"
                        />
                        <span className="absolute right-3 top-4 text-xs font-bold text-slate-400">Yrs</span>
                    </div>
                </div>
            </div>

            {/* Tax & Charges */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Taxes & Charges</p>
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">LTCG Tax Rate</label>
                    <div className="flex items-center gap-2">
                         <input 
                            type="number" 
                            value={taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="w-16 bg-white border border-slate-200 rounded-lg py-1 px-2 text-right font-bold text-slate-900"
                        />
                        <span className="text-sm font-bold text-slate-400">%</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-700">Investment Charge</label>
                        <span className="text-[10px] text-slate-400">Expense Ratio</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <input 
                            type="number" step="0.1"
                            value={expenseRatio}
                            onChange={(e) => setExpenseRatio(Number(e.target.value))}
                            className="w-16 bg-white border border-slate-200 rounded-lg py-1 px-2 text-right font-bold text-slate-900"
                        />
                        <span className="text-sm font-bold text-slate-400">%</span>
                    </div>
                </div>
            </div>
         </section>
      </main>
      
      <div className="bg-white border-t border-slate-200 p-4">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95">
            <span className="material-symbols-outlined">calculate</span>
            Calculate Growth
        </button>
      </div>
    </div>
  );
};

export default InvestmentCalc;