import React, { useState, useMemo } from 'react';

const MortgageCalc: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [downPayment, setDownPayment] = useState(1000000); // 10 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // India standard
  const [termYears, setTermYears] = useState(20);

  const { monthlyPayment, totalInterest, totalCost, amortizationSchedule } = useMemo(() => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = termYears * 12;
    
    let mPayment = 0;
    if (monthlyRate === 0) {
        mPayment = principal / numberOfPayments;
    } else {
        mPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const tPayment = mPayment * numberOfPayments;
    const tInterest = tPayment - principal;

    // Generate simplified schedule (first 3 years for display)
    const schedule = [];
    let balance = principal;
    const startYear = 2024;
    
    // Create annual summary for 3 years
    for (let i = 0; i < 3; i++) {
        let yearInterest = 0;
        let yearPrincipal = 0;
        for(let m = 0; m < 12; m++) {
            const interest = balance * monthlyRate;
            const principalPayment = mPayment - interest;
            balance -= principalPayment;
            yearInterest += interest;
            yearPrincipal += principalPayment;
        }
        schedule.push({
            year: startYear + i,
            interest: yearInterest,
            principal: yearPrincipal,
            balance: balance > 0 ? balance : 0
        });
    }

    return {
        monthlyPayment: mPayment,
        totalInterest: tInterest,
        totalCost: tPayment,
        amortizationSchedule: schedule
    };
  }, [loanAmount, downPayment, interestRate, termYears]);

  return (
    <div className="bg-background-light min-h-screen text-slate-900 font-display">
      <header className="flex items-center bg-white p-4 border-b border-slate-100 sticky top-0 z-10 justify-between">
        <div className="w-12">
            <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-slate-600">menu</span>
            </button>
        </div>
        <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-tight flex-1 text-center">EMI Calculator</h2>
        <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-[#111318]">settings</span>
            </button>
        </div>
      </header>

      <div className="p-4">
        {/* Result Card */}
        <div className="flex flex-col items-center justify-center rounded-xl shadow-lg bg-primary text-white p-6 relative overflow-hidden mb-6">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">Monthly EMI</p>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                ₹{monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </h1>
            <div className="grid grid-cols-2 gap-4 w-full border-t border-white/20 pt-4 mt-2">
                <div className="text-center">
                    <p className="text-white/70 text-xs font-normal">Total Interest</p>
                    <p className="text-white text-base font-bold">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="text-center border-l border-white/20">
                    <p className="text-white/70 text-xs font-normal">Total Cost</p>
                    <p className="text-white text-base font-bold">₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
            </div>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
            <h3 className="text-[#111318] text-lg font-bold leading-tight pt-2">Loan Details</h3>
            
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-[#111318] text-sm font-semibold">Loan Amount</label>
                    <span className="text-primary font-bold text-sm">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="relative flex items-center">
                    <div className="absolute left-4 text-slate-400 font-bold">₹</div>
                    <input 
                        type="number" 
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 font-semibold"
                    />
                </div>
                <input 
                    type="range" min="500000" max="20000000" step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-[#111318] text-sm font-semibold">Down Payment</label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <div className="absolute left-4 text-slate-400 font-bold">₹</div>
                        <input 
                            type="number" 
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 font-semibold"
                        />
                    </div>
                    <div className="w-24 bg-slate-100 p-1 flex rounded-lg">
                        <button className="flex-1 text-xs font-bold bg-white rounded shadow-sm text-primary py-2 text-center">₹</button>
                        <button className="flex-1 text-xs font-bold text-slate-500 py-2 text-center">%</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-[#111318] text-sm font-semibold">Interest Rate</label>
                    <div className="relative">
                        <input 
                            type="number" step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 font-semibold"
                        />
                        <div className="absolute right-4 top-3 text-slate-400 font-bold">%</div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-[#111318] text-sm font-semibold">Loan Term</label>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <input 
                            type="number" 
                            value={termYears}
                            onChange={(e) => setTermYears(Number(e.target.value))}
                            className="w-16 bg-transparent border-none focus:ring-0 text-slate-900 font-bold p-0 text-center" 
                        />
                        <div className="flex flex-1 gap-1">
                            <button className="flex-1 text-[10px] font-bold bg-white rounded shadow-sm text-primary py-1 text-center">YRS</button>
                            <button className="flex-1 text-[10px] font-bold text-slate-500 py-1 text-center">MOS</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Amortization Table */}
            <div className="pt-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#111318] text-lg font-bold leading-tight">Amortization Schedule</h3>
                    <button className="text-primary text-sm font-bold flex items-center gap-1">
                        View All <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-4 bg-slate-100/80 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <div>Year</div>
                        <div>Principal</div>
                        <div>Interest</div>
                        <div className="text-right">Balance</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {amortizationSchedule.map((row) => (
                            <div key={row.year} className="grid grid-cols-4 px-4 py-3 text-xs text-slate-700">
                                <div className="font-bold">{row.year}</div>
                                <div>₹{row.principal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                                <div>₹{row.interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                                <div className="text-right font-medium">₹{row.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-slate-100 p-4 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button className="flex-1 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined">save</span>
            Save Estimate
        </button>
        <button className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>
  );
};

export default MortgageCalc;