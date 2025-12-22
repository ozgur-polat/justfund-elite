
import React from 'react';

interface EspressoMeterProps {
  ter: number;
}

const EspressoMeter: React.FC<EspressoMeterProps> = ({ ter }) => {
  const annualCostOn10k = (10000 * (ter / 100)).toFixed(2);
  const espressoPrice = 2.50; // Average price
  const cupsCount = (parseFloat(annualCostOn10k) / espressoPrice).toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 shadow-sm group">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Expense Ratio</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-950">{ter}%</span>
            <span className="text-xs font-semibold text-gray-500">per year</span>
          </div>
        </div>
        <div className="flex flex-col items-center text-orange-900/40">
           <span className="material-symbols-outlined text-4xl">coffee</span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-2xl">
        <span className="material-symbols-outlined text-orange-600 text-lg mt-0.5">verified</span>
        <div className="flex flex-col">
          <p className="text-xs font-bold text-orange-950">Espresso Equivalent</p>
          <p className="text-[11px] text-orange-900/70 leading-relaxed">
            On a €10,000 investment, this fund costs you roughly <span className="font-bold">€{annualCostOn10k}</span> annually. 
            That's less than <span className="font-bold">{cupsCount} espressos</span> a year.
          </p>
        </div>
      </div>
      
      <p className="text-[10px] text-center text-gray-400 mt-3 italic font-medium">
        "Tactile transparency for high-net-worth indexing."
      </p>
    </div>
  );
};

export default EspressoMeter;
