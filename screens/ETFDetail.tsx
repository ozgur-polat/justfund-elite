
import React, { useState, useEffect } from 'react';
import { ETF } from '../types';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import EspressoMeter from '../components/EspressoMeter';
import { GoogleGenAI } from '@google/genai';

interface ETFDetailProps {
  etf: ETF;
  onBack: () => void;
}

const ETFDetail: React.FC<ETFDetailProps> = ({ etf, onBack }) => {
  const [insight, setInsight] = useState<string>('');
  const [news, setNews] = useState<{title: string, uri: string}[]>([]);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchAILayer = async () => {
      setLoadingInsight(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        // Using Search Grounding for the most up-to-date sentiment
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Analyze the current market sentiment for ${etf.name} (${etf.ticker}). Provide a concise, professional investor summary and list 2-3 specific reasons for its current performance. Format as a short paragraph.`,
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        
        setInsight(response.text || 'Market intelligence stream currently adjusting.');
        
        // Extract grounding chunks for news links
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const links = chunks
            .filter((c: any) => c.web)
            .map((c: any) => ({ title: c.web.title, uri: c.web.uri }))
            .slice(0, 3);
          setNews(links);
        }
      } catch (e) {
        console.error("Gemini Search Grounding Error:", e);
        setInsight(`Historical benchmark: ${etf.name} remains a core institutional building block for ${etf.type} exposure.`);
      } finally {
        setLoadingInsight(false);
      }
    };
    fetchAILayer();
  }, [etf]);

  return (
    <div className="flex flex-col h-full bg-[#f6f6f8] overflow-y-auto hide-scrollbar">
      {/* Premium Navigation Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#f6f6f8]/90 backdrop-blur-2xl border-b border-gray-100/50">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-2xl bg-white text-zinc-950 shadow-sm border border-gray-100 active:scale-90 transition">
          <span className="material-symbols-outlined font-bold">arrow_back_ios_new</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{etf.provider}</span>
          <span className="text-sm font-black text-zinc-950 tracking-tighter">{etf.ticker}</span>
        </div>
        <button className="flex size-10 items-center justify-center rounded-2xl bg-white text-zinc-950 shadow-sm border border-gray-100 active:scale-90 transition">
          <span className="material-symbols-outlined text-2xl">ios_share</span>
        </button>
      </header>

      {/* Primary Value Matrix */}
      <section className="px-6 pt-10 pb-6 text-center">
        <h1 className="text-2xl font-black tracking-tight text-zinc-950 mb-6 leading-tight max-w-xs mx-auto">
          {etf.name}
        </h1>
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl font-black tracking-tighter text-zinc-950">€{etf.price.toFixed(2)}</span>
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-sm shadow-sm ${etf.change > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <span className="material-symbols-outlined text-lg">{etf.change > 0 ? 'trending_up' : 'trending_down'}</span>
            {etf.change > 0 ? '+' : ''}{etf.change}%
          </div>
        </div>
      </section>

      {/* Grounded Intelligence Layer */}
      <section className="px-6 mb-10">
        <div className="p-6 bg-zinc-950 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">g_translate</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Pulse Analysis</span>
          </div>
          
          <div className="min-h-[100px]">
            {loadingInsight ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
                <div className="h-3 bg-white/10 rounded w-4/6"></div>
              </div>
            ) : (
              <p className="text-xs font-medium text-white/80 leading-relaxed italic mb-6">
                "{insight}"
              </p>
            )}
          </div>

          {news.length > 0 && (
            <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Institutional Citations</p>
              {news.map((n, i) => (
                <a key={i} href={n.uri} target="_blank" className="flex items-center justify-between group">
                  <span className="text-[10px] font-bold text-primary truncate max-w-[200px] group-hover:underline">{n.title}</span>
                  <span className="material-symbols-outlined text-xs text-white/20">open_in_new</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Institutional Charting */}
      <section className="px-6 mb-12">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-lg font-black text-zinc-950">Architectural Growth</h3>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
             <button className="px-4 py-1.5 text-[10px] font-black uppercase rounded-lg bg-white text-zinc-950 shadow-sm transition">30D</button>
             <button className="px-4 py-1.5 text-[10px] font-black uppercase rounded-lg text-gray-400 hover:text-zinc-950 transition">All</button>
          </div>
        </div>
        <div className="h-72 w-full bg-white rounded-[3rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/50">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={etf.history}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#135bec" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#135bec" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis hide dataKey="time" />
              <YAxis hide domain={['auto', 'auto']} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#135bec" 
                strokeWidth={4} 
                fill="url(#chartGradient)" 
                animationDuration={1500}
              />
              <Tooltip 
                cursor={{ stroke: '#135bec', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px 20px' }}
                labelStyle={{ display: 'none' }}
                itemStyle={{ color: '#09090b', fontWeight: '900', fontSize: '14px' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Brand X-Ray Component */}
      <section className="px-6 mb-12">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-lg font-black text-zinc-950">Brand X-Ray</h3>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase">Top Holdings</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {etf.holdings.map((h, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center group active:scale-95 transition">
              <div className="size-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 p-2 group-hover:bg-primary/5 transition">
                <img 
                  src={h.logo} 
                  alt={h.name} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100/100?seed=' + h.name)} 
                />
              </div>
              <p className="text-[10px] font-black text-zinc-950 uppercase truncate w-full">{h.name}</p>
              <p className="text-[9px] font-bold text-gray-400 mt-0.5">{h.weight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Efficiency Metrics */}
      <section className="px-6 mb-12">
        <h3 className="text-lg font-black text-zinc-950 mb-6 px-1">Institutional Metrics</h3>
        <EspressoMeter ter={etf.ter} />
      </section>

      {/* Technical Integrity Grid */}
      <section className="px-6 pb-40">
        <div className="grid grid-cols-2 gap-4">
          <TechTile label="ISIN ID" value={etf.isin} />
          <TechTile label="Domicile" value={etf.domicile} />
          <TechTile label="Replication" value={etf.replication} />
          <TechTile label="Dividend" value={etf.distribution} />
        </div>
      </section>

      {/* Global Action CTA */}
      <div className="fixed bottom-32 left-0 right-0 px-6 z-50 pointer-events-none">
        <button className="pointer-events-auto w-full h-18 bg-primary text-white rounded-3xl font-black text-lg shadow-2xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-4">
          <span className="material-symbols-outlined font-black">bolt</span>
          Commit Capital
        </button>
      </div>
    </div>
  );
};

const TechTile = ({ label, value }: any) => (
  <div className="p-5 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-xs font-black text-zinc-950 truncate">{value}</p>
  </div>
);

export default ETFDetail;
