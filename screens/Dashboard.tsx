
import React, { useState } from 'react';
import { ETF, ETFType } from '../types';
import { TOP_ETFS } from '../constants';
import Sparkline from '../components/Sparkline';

interface DashboardProps {
  onSelectETF: (etf: ETF) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectETF }) => {
  const [filter, setFilter] = useState<ETFType | 'All'>('All');

  const filteredEtfs = filter === 'All' 
    ? TOP_ETFS 
    : TOP_ETFS.filter(e => e.type === filter);

  const filterOptions: (ETFType | 'All')[] = ['All', 'Equity', 'Global', 'Tech', 'Gold'];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="flex-none px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">monitoring</span>
          </div>
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-full bg-gray-50 text-zinc-400 hover:text-zinc-950 transition border border-gray-100">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-full bg-gray-50 text-zinc-400 hover:text-zinc-950 transition border border-gray-100">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-950 mb-1">Elite 20 ETFs</h1>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Global Intelligence Suite</p>
      </header>

      {/* Filters */}
      <div className="flex-none px-6 py-4 overflow-x-auto hide-scrollbar flex gap-2">
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`flex-none h-10 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm border ${
              filter === opt 
                ? 'bg-zinc-950 text-white border-zinc-950' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-2 pb-10 space-y-3">
        {filteredEtfs.map(etf => (
          <div 
            key={etf.id}
            onClick={() => onSelectETF(etf)}
            className="group relative flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-black text-zinc-950 leading-none">{etf.ticker}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                    etf.type === 'Equity' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    etf.type === 'Global' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                    etf.type === 'Tech' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                    'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {etf.type}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-400 truncate w-32">{etf.name}</p>
              </div>
            </div>

            <div className="hidden sm:block">
              <Sparkline data={etf.history.map(h => h.value)} color={etf.change > 0 ? '#10b981' : '#f43f5e'} />
            </div>

            <div className="flex flex-col items-end">
              <div className={`px-2.5 py-1 rounded-xl text-sm font-black flex items-center gap-1 ${etf.change > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {etf.change > 0 ? '+' : ''}{etf.change}%
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{etf.aum}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
