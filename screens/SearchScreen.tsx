
import React, { useState, useMemo } from 'react';
import { TOP_ETFS } from '../constants';
import { ETF } from '../types';

interface SearchScreenProps {
  onSelectETF: (etf: ETF) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectETF }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return TOP_ETFS;
    const q = query.toLowerCase();
    return TOP_ETFS.filter(e => 
      e.ticker.toLowerCase().includes(q) || 
      e.isin.toLowerCase().includes(q) || 
      e.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex-none px-6 pt-12 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-zinc-950 mb-6">Market Engine</h1>
        <div className="relative group">
          <input 
            autoFocus
            type="text"
            placeholder="Search ISIN, Ticker or Provider..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:text-gray-400"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-6 space-y-4 pb-10">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
          {results.length} Institutional Funds Found
        </p>
        
        {results.map(etf => (
          <div 
            key={etf.id}
            onClick={() => onSelectETF(etf)}
            className="flex items-center justify-between p-4 rounded-3xl border border-gray-100 hover:border-primary/20 transition active:scale-95 cursor-pointer bg-white shadow-sm"
          >
            <div className="flex flex-col">
              <span className="text-sm font-black text-zinc-950">{etf.ticker}</span>
              <span className="text-[10px] font-bold text-gray-400 font-mono">{etf.isin}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-black text-zinc-950">{etf.aum}</span>
              <span className="text-[10px] font-bold text-primary uppercase">{etf.provider}</span>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="py-20 flex flex-col items-center text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p className="text-sm font-black text-zinc-950">No Matches in Elite Directory</p>
            <p className="text-xs font-bold text-gray-400">Try searching for S&P 500 or iShares</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
