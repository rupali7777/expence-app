import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Insights: React.FC = () => {
  const expenseData = [
    { name: 'Housing', value: 18000, color: '#1754cf' },
    { name: 'Food', value: 8500, color: '#818cf8' },
    { name: 'Transport', value: 5200, color: '#cbd5e1' },
    { name: 'Others', value: 10800, color: '#e2e8f0' },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
        <header className="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-100">
            <div className="text-[#111318] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-50 cursor-pointer">
                <span className="material-symbols-outlined">arrow_back</span>
            </div>
            <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-tight flex-1 text-center">Financial Insights</h2>
            <div className="flex w-10 items-center justify-end">
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-50 text-[#111318]">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </div>
        </header>

        <div className="bg-white sticky top-[61px] z-10">
            <div className="flex border-b border-slate-100 px-4 gap-8">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-3 pt-4" href="#">
                    <p className="text-sm font-bold leading-normal">This Month</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 pb-3 pt-4" href="#">
                    <p className="text-sm font-bold leading-normal">Last Month</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 pb-3 pt-4" href="#">
                    <p className="text-sm font-bold leading-normal">Custom</p>
                </a>
            </div>
        </div>

        <div className="flex flex-wrap gap-3 p-4">
            <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <span className="material-symbols-outlined text-sm text-green-600">south_west</span>
                    <p className="text-xs font-semibold uppercase tracking-wider">Total Income</p>
                </div>
                <p className="text-[#111318] text-xl font-extrabold">₹85,000</p>
                <p className="text-green-600 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">trending_up</span> +12.4%
                </p>
            </div>
            <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <span className="material-symbols-outlined text-sm text-red-600">north_east</span>
                    <p className="text-xs font-semibold uppercase tracking-wider">Total Expenses</p>
                </div>
                <p className="text-[#111318] text-xl font-extrabold">₹42,500</p>
                <p className="text-red-600 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">trending_down</span> -5.2%
                </p>
            </div>
        </div>

        <div className="px-4 py-2">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4">
                <div className="bg-primary size-10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">auto_awesome</span>
                </div>
                <div>
                    <h4 className="text-primary text-sm font-bold mb-1">Smart Tax Saving Tip</h4>
                    <p className="text-slate-700 text-xs leading-relaxed">
                        Invest ₹45,000 more in ELSS funds before March 31st to save up to <span className="font-bold">₹46,800</span> in taxes under Section 80C.
                    </p>
                    <button className="mt-2 text-primary text-xs font-bold flex items-center gap-1">
                        Explore ELSS Funds <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>

        <section className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#111318] text-lg font-bold">Expense Breakdown</h2>
                <span className="material-symbols-outlined text-slate-400">info</span>
            </div>
            
            <div className="flex items-center justify-center h-48 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={expenseData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-medium text-slate-500">Total spent</span>
                    <span className="text-lg font-bold">₹42.5k</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {expenseData.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        <div className="size-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-500 font-medium">{d.name}</p>
                            <p className="text-sm font-bold">₹{d.value.toLocaleString()} ({Math.round(d.value/42500*100)}%)</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="p-4">
            <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800">Income vs Expenses</h3>
                    <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-primary"></div> Inc</div>
                        <div className="flex items-center gap-1"><div className="size-2 rounded-full bg-red-500"></div> Exp</div>
                    </div>
                </div>
                <div className="flex items-end justify-between h-40 gap-2 px-2">
                    {/* Simplified Static Bar Representation to match visual style exactly */}
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="flex gap-1 items-end w-full justify-center">
                            <div className="w-2 bg-primary/40 rounded-t-sm h-24"></div>
                            <div className="w-2 bg-red-500/40 rounded-t-sm h-16"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">OCT</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="flex gap-1 items-end w-full justify-center">
                            <div className="w-2 bg-primary/60 rounded-t-sm h-28"></div>
                            <div className="w-2 bg-red-500/60 rounded-t-sm h-14"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">NOV</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="flex gap-1 items-end w-full justify-center">
                            <div className="w-2 bg-primary rounded-t-sm h-32"></div>
                            <div className="w-2 bg-red-500 rounded-t-sm h-20"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-800">DEC</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Insights;