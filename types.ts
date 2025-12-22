
export type ETFType = 'Equity' | 'Bonds' | 'Global' | 'Gold' | 'Tech' | 'Emerging' | 'ESG' | 'Dividend';

export interface Holding {
  name: string;
  weight: string;
  logo: string;
}

export interface PerformanceData {
  time: string;
  value: number;
}

export interface ETF {
  id: string;
  ticker: string;
  name: string;
  type: ETFType;
  price: number;
  change: number;
  aum: string;
  ter: number;
  isin: string;
  domicile: string;
  replication: string;
  distribution: string;
  holdings: Holding[];
  history: PerformanceData[];
  riskScale: number; // 1-7
  provider: 'Vanguard' | 'iShares' | 'Xtrackers' | 'Invesco' | 'Amundi';
}

export type Screen = 'onboarding' | 'dashboard' | 'search' | 'detail' | 'profile';
