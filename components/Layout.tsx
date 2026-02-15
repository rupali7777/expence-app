import React from 'react';
import { ScreenName } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  const isCalculatorSubScreen = [
    'calc_retirement', 
    'calc_mortgage', 
    'calc_investment', 
    'calc_tax'
  ].includes(currentScreen);

  // If we are in a specific calculator, we might want to hide the bottom nav or show a back button layout, 
  // but for this app style, a persistent bottom nav is good, except maybe for deep drills.
  // The provided screenshots show bottom nav on Dashboard, Calculators, etc.
  
  const navItems = [
    { id: 'dashboard', icon: 'home', label: 'Home' },
    { id: 'scenarios', icon: 'history_toggle_off', label: 'Scenarios' }, // Using similar icon to screenshot
    { id: 'calculator_menu', icon: 'calculate', label: 'Tools' }, // Center action-like button
    { id: 'insights', icon: 'pie_chart', label: 'Insights' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ] as const;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24 no-scrollbar">
        {children}
      </div>

      {/* Floating Action Button for Dashboard (Only show on Dashboard) */}
      {currentScreen === 'dashboard' && (
        <button 
          onClick={() => onNavigate('calculator_menu')}
          className="absolute bottom-24 right-6 bg-primary size-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 active:scale-90 transition-transform z-40"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-primary/10 px-6 pb-6 pt-3 z-50">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id || 
              (item.id === 'calculator_menu' && isCalculatorSubScreen);
            
            // Special styling for the middle button if desired, but following the screenshot style:
            // Screenshot has a "Tools" icon that looks standard.
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;