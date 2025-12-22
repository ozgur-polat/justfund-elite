
import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#f6f6f8]">
      <header className="px-6 pt-16 pb-8 bg-zinc-950 text-white rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="size-20 rounded-full bg-gradient-to-br from-primary to-blue-400 border-4 border-white/10 p-1">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EliteInvestor" className="w-full h-full rounded-full" alt="Profile" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Alexander Sterling</h1>
            <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Institutional Tier</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Portfolio Value</p>
            <p className="text-lg font-black">€1.24M</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Growth YTD</p>
            <p className="text-lg font-black text-emerald-400">+14.2%</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-1">Workspace Settings</h3>
          <div className="space-y-3">
            <ProfileLink icon="verified_user" label="Institutional Verification" sub="Status: Active" />
            <ProfileLink icon="currency_exchange" label="Tax Reporting (EU)" sub="Germany/Ireland" />
            <ProfileLink icon="notifications_active" label="Market Alerts" sub="High Volatility Only" />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-1">Security</h3>
          <div className="space-y-3">
            <ProfileLink icon="fingerprint" label="Biometric Unlock" sub="Enabled" />
            <ProfileLink icon="key" label="API Management" sub="Gemini Integration Active" />
          </div>
        </div>

        <button className="w-full h-14 rounded-2xl border border-rose-100 text-rose-600 font-black text-sm uppercase tracking-widest hover:bg-rose-50 transition active:scale-95">
          Revoke Access
        </button>
      </div>
    </div>
  );
};

const ProfileLink = ({ icon, label, sub }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-98 transition">
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-zinc-950">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-black text-zinc-950">{label}</p>
        <p className="text-[10px] font-bold text-gray-400">{sub}</p>
      </div>
    </div>
    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
  </div>
);

export default ProfileScreen;
