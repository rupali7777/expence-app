import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light text-[#111318]">
        <header className="flex items-center px-4 py-6 justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-[#111318]">arrow_back</span>
            </button>
            <h1 className="text-xl font-bold tracking-tight text-[#111318]">Settings</h1>
            <div className="size-10"></div>
        </header>

        <section className="px-4 py-4">
            <div className="bg-primary/5 rounded-xl p-4 flex items-center justify-between border border-primary/10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img alt="User" className="size-16 rounded-full object-cover border-2 border-white shadow-sm" src="https://picsum.photos/200/200" />
                        <div className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[#111318]">John Doe</h2>
                        <p className="text-sm text-gray-500">john.doe@email.com</p>
                    </div>
                </div>
                <button className="flex items-center justify-center size-10 rounded-full bg-white text-primary shadow-sm hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-xl">edit</span>
                </button>
            </div>
        </section>
        
        <div className="mt-4">
            <h3 className="px-6 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Financial Preferences</h3>
            <div className="bg-white">
                <button className="flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors group">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-primary">payments</span>
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-base font-semibold">Currency</p>
                        <p className="text-xs text-gray-500">Indian Rupee</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">INR ₹</span>
                        <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </div>
                </button>
            </div>
        </div>

        <div className="mt-8">
            <h3 className="px-6 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Security</h3>
            <div className="bg-white">
                <div className="flex items-center px-6 py-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-primary">fingerprint</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-base font-semibold">Biometrics</p>
                        <p className="text-xs text-gray-500">Face ID & Fingerprint</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
                <button className="flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors group border-t border-gray-100">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-primary">lock_reset</span>
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-base font-semibold">Change Transaction PIN</p>
                        <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
            </div>
        </div>

        <div className="mt-8">
            <h3 className="px-6 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">App Preferences</h3>
            <div className="bg-white">
                <div className="flex items-center px-6 py-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-primary">notifications_active</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-base font-semibold">Push Notifications</p>
                        <p className="text-xs text-gray-500">Transaction alerts & news</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </div>

        <div className="mt-8 px-6 pb-6">
            <button className="w-full py-4 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined">help_outline</span>
                Help & Support
            </button>
            <button className="w-full mt-3 py-4 bg-primary/10 text-primary rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined">logout</span>
                Log Out
            </button>
            <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">Financely App v2.4.0</p>
            </div>
        </div>
    </div>
  );
};

export default Settings;