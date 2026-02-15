import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import RetirementCalc from './screens/calculators/RetirementCalc';
import MortgageCalc from './screens/calculators/MortgageCalc';
import InvestmentCalc from './screens/calculators/InvestmentCalc';
import TaxCalc from './screens/calculators/TaxCalc';
import Scenarios from './screens/Scenarios';
import Insights from './screens/Insights';
import Settings from './screens/Settings';
import { ScreenName } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} />;
      case 'calc_retirement':
        return <RetirementCalc />;
      case 'calc_mortgage':
        return <MortgageCalc />;
      case 'calc_investment':
        return <InvestmentCalc />;
      case 'calc_tax':
        return <TaxCalc />;
      case 'scenarios':
        return <Scenarios />;
      case 'insights':
        return <Insights />;
      case 'settings':
        return <Settings />;
      case 'calculator_menu':
        // A simple menu for the "Tools" tab if accessed directly
        return (
          <div className="p-4 bg-background-light min-h-screen">
             <header className="flex items-center p-4 sticky top-0 bg-white/80 backdrop-blur-md rounded-2xl mb-4 border border-primary/5">
                <h1 className="text-xl font-bold text-slate-900">Financial Tools</h1>
             </header>
             <div className="grid grid-cols-2 gap-4">
                 {[
                   { id: 'calc_retirement', icon: 'event_repeat', label: 'Retirement' },
                   { id: 'calc_mortgage', icon: 'calculate', label: 'Loan Calc' },
                   { id: 'calc_investment', icon: 'trending_up', label: 'Investments' },
                   { id: 'calc_tax', icon: 'account_balance', label: 'Tax Calc' },
                 ].map((tool) => (
                    <button 
                        key={tool.id} 
                        onClick={() => setCurrentScreen(tool.id as ScreenName)}
                        className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 flex flex-col items-center gap-3 active:scale-95 transition-transform"
                    >
                         <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                         </div>
                         <span className="font-bold text-slate-900">{tool.label}</span>
                    </button>
                 ))}
             </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
};

export default App;