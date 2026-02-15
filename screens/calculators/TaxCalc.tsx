import React, { useState } from 'react';

const TaxCalc: React.FC = () => {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');

  // Simple Tax Logic (Approximation for Demo)
  const calculateTax = () => {
    let taxableIncome = income;
    if (regime === 'old') {
      taxableIncome -= deductions;
    } else {
      // Standard deduction for new regime
      taxableIncome -= 50000; 
    }

    if (taxableIncome <= 300000) return 0;

    let tax = 0;
    let tempIncome = taxableIncome;
    
    // New Regime Slabs (Simplified 2024-25)
    // 0-3L: 0
    // 3-7L: 5% (Rebate up to 7L means 0 effectively if income < 7L, but for calculation logic:)
    // 7-10L: 10%
    // 10-12L: 15%
    // 12-15L: 20%
    // >15L: 30%
    
    // For the UI breakdown matching the screenshot (3-6, 6-9, 9-12):
    // 3L-6L: 5%
    // 6L-9L: 10%
    // 9L-12L: 15%
    
    // Using simple slab logic for the summary
    if (regime === 'new') {
        if (taxableIncome > 300000) tax += Math.min(Math.max(taxableIncome - 300000, 0), 300000) * 0.05;
        if (taxableIncome > 600000) tax += Math.min(Math.max(taxableIncome - 600000, 0), 300000) * 0.10;
        if (taxableIncome > 900000) tax += Math.min(Math.max(taxableIncome - 900000, 0), 300000) * 0.15;
        if (taxableIncome > 1200000) tax += Math.min(Math.max(taxableIncome - 1200000, 0), 300000) * 0.20;
        if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
    } else {
        // Old regime simplified
        if (taxableIncome > 250000) tax += Math.min(Math.max(taxableIncome - 250000, 0), 250000) * 0.05;
        if (taxableIncome > 500000) tax += Math.min(Math.max(taxableIncome - 500000, 0), 500000) * 0.20;
        if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
    }
    
    return tax;
  };

  const taxPayable = calculateTax();
  const effectiveRate = ((taxPayable / income) * 100).toFixed(1);
  const monthlyTakeHome = ((income - taxPayable) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="bg-background-light min-h-screen text-[#111318] flex flex-col">
       <header className="flex items-center p-4 sticky top-0 bg-white z-10 border-b border-gray-100">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-symbols-outlined align-middle">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold ml-2">Tax Calculator</h1>
       </header>

       <main className="flex-1 overflow-y-auto pb-4">
        <section className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Select Financial Year</h3>
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button className="flex-1 py-2 px-4 rounded-lg bg-white shadow-sm text-sm font-bold text-primary">FY 2024-25</button>
                <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-500">FY 2023-24</button>
            </div>
        </section>

        <section className="p-4 space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gross Annual Income (₹)</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input 
                        type="number" 
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg font-bold" 
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Total Deductions (80C, 80D, etc.)</label>
                    <span className="material-symbols-outlined text-gray-400 text-lg cursor-help">info</span>
                </div>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input 
                         type="number" 
                         value={deductions}
                         onChange={(e) => setDeductions(Number(e.target.value))}
                         className="w-full pl-8 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg font-bold" 
                    />
                </div>
                <p className="mt-2 text-xs text-gray-400 italic">* Applicable only for Old Regime</p>
            </div>
        </section>

        <section className="px-4 py-2 border-b border-gray-100">
            <div className="flex gap-8">
                <button 
                    onClick={() => setRegime('new')}
                    className={`pb-3 text-sm font-bold border-b-2 ${regime === 'new' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                >
                    New Regime
                </button>
                <button 
                    onClick={() => setRegime('old')}
                    className={`pb-3 text-sm font-bold border-b-2 ${regime === 'old' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                >
                    Old Regime
                </button>
            </div>
        </section>

        <section className="p-4">
            <div className="bg-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 scale-150 rotate-12">
                    <span className="material-symbols-outlined text-[120px]">account_balance_wallet</span>
                </div>
                <p className="text-primary/80 bg-white/10 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span> Recommended
                </p>
                <h4 className="text-sm font-medium text-white/80 mb-1">Estimated Tax Payable</h4>
                <div className="text-3xl font-extrabold mb-6">₹ {taxPayable.toLocaleString()}</div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                        <p className="text-xs text-white/70 mb-1">Effective Rate</p>
                        <p className="text-lg font-bold">{effectiveRate}%</p>
                    </div>
                    <div>
                        <p className="text-xs text-white/70 mb-1">Take-Home Pay</p>
                        <p className="text-lg font-bold">₹ {monthlyTakeHome}<span className="text-xs font-normal text-white/70">/mo</span></p>
                    </div>
                </div>
            </div>
        </section>

        <section className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tax Slab Breakdown</h3>
            <div className="space-y-3">
                {/* Visual Fake Slabs for Demo match */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="size-8 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-600">0%</span>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Up to ₹3,00,000</p>
                            <p className="text-xs text-gray-400">Nil tax</p>
                        </div>
                    </div>
                    <p className="font-bold text-sm text-slate-900">₹0</p>
                </div>
                
                {[
                  { range: '₹3L - ₹6,00,000', rate: '5%', bg: 'bg-primary/10', text: 'text-primary' },
                  { range: '₹6L - ₹9,00,000', rate: '10%', bg: 'bg-primary/20', text: 'text-primary' },
                  { range: '₹9L - ₹12,00,000', rate: '15%', bg: 'bg-primary/30', text: 'text-primary' }
                ].map((slab, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className={`size-8 flex items-center justify-center ${slab.bg} ${slab.text} rounded-full text-xs font-bold`}>{slab.rate}</span>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{slab.range}</p>
                                <p className="text-xs text-gray-400">{slab.rate} on slab</p>
                            </div>
                        </div>
                        <p className="font-bold text-sm text-slate-900">-</p>
                    </div>
                ))}
            </div>
            
            <button className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl shadow-md active:scale-[0.98] transition-all">
                Recalculate Tax
            </button>
        </section>
       </main>
    </div>
  );
};

export default TaxCalc;