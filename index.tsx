import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  LabelList
} from 'recharts';
import {
  Search,
  Share2,
  ArrowRight,
  Zap,
  Target,
  BrainCircuit,
  Clock,
  PieChart as PieChartIcon,
  Download,
  MapPin,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Hexagon,
  Link as LinkIcon,
  AlertCircle,
  Activity,
  ChevronRight,
  MessageSquare,
  Check
} from 'lucide-react';

// --- Costanti Dati & Configurazioni ---

const THEME_COLORS = {
  primary: '#2dd4bf', // Teal 400
  secondary: '#99f6e4', // Teal 200
  tertiary: '#0f766e', // Teal 700
  accent: '#f472b6', // Pink
  chart: ['#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb7185', '#fbbf24', '#a3e635', '#34d399', '#22d3ee', '#60a5fa', '#a78bfa', '#e879f9', '#fca5a5', '#fcd34d']
};

const MARKETS = ['Italia', 'Germania', 'Spagna', 'UK', 'Francia', 'USA', 'Polonia'];

const GSC_QUERIES = [
    { term: "cafenoir", type: "Brand", impressions: 150000, clicks: 45000 },
    { term: "sandali cafenoir", type: "Brand", impressions: 80000, clicks: 12000 },
    { term: "scarpe cafenoir", type: "Brand", impressions: 60000, clicks: 8000 },
    { term: "cafenoir outlet", type: "Brand", impressions: 40000, clicks: 9000 },
    { term: "stivali cafenoir", type: "Brand", impressions: 35000, clicks: 6000 },
    { term: "sandali gioiello", type: "Generic", impressions: 90000, clicks: 2500 },
    { term: "scarpe donna eleganti", type: "Generic", impressions: 75000, clicks: 1200 },
    { term: "anfibi donna", type: "Generic", impressions: 60000, clicks: 1800 },
    { term: "sneakers zeppa", type: "Generic", impressions: 45000, clicks: 900 },
    { term: "borse a spalla", type: "Generic", impressions: 30000, clicks: 600 }
];

// Dati Cluster Brand (Simulazione CafèNoir)
const CLUSTER_DATA_UPDATED = [
  { name: 'Sandali Gioiello', google: 28500, tiktok: 5000, amazon: 4000, yoy: 45 },
  { name: 'Sneakers Zeppa', google: 15000, tiktok: 2000, amazon: 28000, yoy: 12 },
  { name: 'Tronchetti', google: 15400, tiktok: 3000, amazon: 12000, yoy: -5 },
  { name: 'Anfibi', google: 12200, tiktok: 25000, amazon: 9000, yoy: 22 },
  { name: 'Mocassini', google: 8100, tiktok: 4000, amazon: 8500, yoy: 8 },
  { name: 'Décolleté', google: 6200, tiktok: 1500, amazon: 6000, yoy: 2 },
  { name: 'Borse a Spalla', google: 9500, tiktok: 6000, amazon: 7000, yoy: 15 },
  { name: 'Zaini', google: 4200, tiktok: 8500, amazon: 9000, yoy: 5 },
  { name: 'Ciabatte Mare', google: 3000, tiktok: 1500, amazon: 15000, yoy: 10 },
  { name: 'Pochette', google: 2500, tiktok: 2500, amazon: 2500, yoy: -2 },
  { name: 'Cinture', google: 1500, tiktok: 500, amazon: 4000, yoy: 0 },
  { name: 'Portafogli', google: 3400, tiktok: 1000, amazon: 8500, yoy: 4 },
  { name: 'Sciarpe', google: 800, tiktok: 400, amazon: 2000, yoy: 25 },
  { name: 'Cappelli', google: 600, tiktok: 12000, amazon: 1000, yoy: 150 },
  { name: 'Stivali Alti', google: 18000, tiktok: 16000, amazon: 11000, yoy: 8 },
];

// Dati YoY Organic Performance (da CSV)
const YOY_COMPARISON_DATA = [
    { cluster: 'Ricerca Generica Brand', gen25: 33560, gen26: 29540, delta: -12.0 },
    { cluster: 'Ricerca Generica Scarpe', gen25: 15790, gen26: 12420, delta: -21.3 },
    { cluster: 'Borse', gen25: 7360, gen26: 5130, delta: -30.3 },
    { cluster: 'Sandali', gen25: 7270, gen26: 4450, delta: -38.8 },
    { cluster: 'Stivali', gen25: 3120, gen26: 3960, delta: 26.9 },
    { cluster: 'Outlet/Saldi', gen25: 2970, gen26: 3060, delta: 3.0 },
    { cluster: 'Stivaletti', gen25: 2410, gen26: 2870, delta: 19.1 },
    { cluster: 'Sneakers', gen25: 4340, gen26: 2370, delta: -45.4 },
    { cluster: 'Tronchetti', gen25: 2100, gen26: 2020, delta: -3.8 },
    { cluster: 'Nuovi Arrivi', gen25: 2430, gen26: 1730, delta: -28.8 },
    { cluster: 'Store Locator', gen25: 770, gen26: 1040, delta: 35.1 },
    { cluster: 'Mocassini', gen25: 1310, gen26: 1020, delta: -22.1 },
    { cluster: 'Sito Ufficiale', gen25: 940, gen26: 890, delta: -5.3 },
    { cluster: 'Portafogli', gen25: 540, gen26: 650, delta: 20.4 },
    { cluster: 'Abbigliamento', gen25: 1120, gen26: 570, delta: -49.1 },
    { cluster: 'Anfibi', gen25: 920, gen26: 530, delta: -42.4 },
    { cluster: 'Uomo', gen25: 430, gen26: 480, delta: 11.6 },
    { cluster: 'Zaini', gen25: 790, gen26: 430, delta: -45.6 },
    { cluster: 'Ciabatte', gen25: 310, gen26: 290, delta: -6.5 },
    { cluster: 'Décolleté', gen25: 300, gen26: 200, delta: -33.3 },
    { cluster: 'Infradito', gen25: 270, gen26: 140, delta: -48.1 },
    { cluster: 'Ballerine', gen25: 310, gen26: 90, delta: -71.0 },
    { cluster: 'Zeppe', gen25: 170, gen26: 90, delta: -47.1 },
    { cluster: 'Occhiali da Vista', gen25: 300, gen26: 70, delta: -76.7 }
];

// Dati Base Keyword per Stagionalità (Google Baseline)
const SEASONALITY_BASE = [
  { month: 'Gen', sandali: 2000, stivali: 45000, sneakers: 15000, borse: 12000, cerimonia: 5000, anfibi: 30000, zeppe: 1000, mocassini: 8000, zaini: 5000, accessori: 4000 },
  { month: 'Feb', sandali: 3000, stivali: 35000, sneakers: 16000, borse: 11000, cerimonia: 6000, anfibi: 25000, zeppe: 1500, mocassini: 9000, zaini: 5500, accessori: 3500 },
  { month: 'Mar', sandali: 8000, stivali: 15000, sneakers: 22000, borse: 13000, cerimonia: 12000, anfibi: 10000, zeppe: 4000, mocassini: 15000, zaini: 6000, accessori: 4500 },
  { month: 'Apr', sandali: 15000, stivali: 5000, sneakers: 25000, borse: 14000, cerimonia: 25000, anfibi: 5000, zeppe: 8000, mocassini: 18000, zaini: 7000, accessori: 5000 },
  { month: 'Mag', sandali: 35000, stivali: 2000, sneakers: 24000, borse: 15000, cerimonia: 45000, anfibi: 2000, zeppe: 15000, mocassini: 12000, zaini: 8000, accessori: 5500 },
  { month: 'Giu', sandali: 65000, stivali: 1000, sneakers: 20000, borse: 16000, cerimonia: 35000, anfibi: 1000, zeppe: 25000, mocassini: 8000, zaini: 9000, accessori: 6000 },
  { month: 'Lug', sandali: 80000, stivali: 500, sneakers: 18000, borse: 18000, cerimonia: 20000, anfibi: 500, zeppe: 30000, mocassini: 5000, zaini: 12000, accessori: 7000 },
  { month: 'Ago', sandali: 45000, stivali: 800, sneakers: 15000, borse: 15000, cerimonia: 10000, anfibi: 800, zeppe: 15000, mocassini: 4000, zaini: 15000, accessori: 5000 },
  { month: 'Set', sandali: 10000, stivali: 15000, sneakers: 28000, borse: 22000, cerimonia: 15000, anfibi: 12000, zeppe: 5000, mocassini: 20000, zaini: 25000, accessori: 6000 },
  { month: 'Ott', sandali: 4000, stivali: 35000, sneakers: 20000, borse: 18000, cerimonia: 8000, anfibi: 35000, zeppe: 2000, mocassini: 22000, zaini: 10000, accessori: 5500 },
  { month: 'Nov', sandali: 2000, stivali: 55000, sneakers: 25000, borse: 25000, cerimonia: 5000, anfibi: 45000, zeppe: 1000, mocassini: 15000, zaini: 6000, accessori: 8000 },
  { month: 'Dic', sandali: 3000, stivali: 65000, sneakers: 30000, borse: 35000, cerimonia: 4000, anfibi: 50000, zeppe: 500, mocassini: 10000, zaini: 8000, accessori: 12000 },
];

const COMPETITORS_HERO = [
  { name: 'Competitor A (Lusso)', shareOfVoice: 18, mainProductPrice: 180 },
  { name: 'Competitor B (Mass)', shareOfVoice: 25, mainProductPrice: 99 },
  { name: 'Market Leader', shareOfVoice: 40, mainProductPrice: 110 },
];

const QUERY_FAN_OUT_DATA = [
  {
    id: 1,
    root: "CafèNoir Slingback Rosse",
    volume: "12.5K",
    branches: [
      { term: "cafènoir slingback rosse prezzo outlet", llm: "GPT-4", sentiment: "Transazionale", confidence: 95, category: "Purchase" },
      { term: "abbinamento slingback rosse cerimonia", llm: "Gemini", sentiment: "Informativo", confidence: 92, category: "Style" },
      { term: "scarpe rosse tacco comodo cafènoir", llm: "Claude", sentiment: "Ricerca Prodotto", confidence: 85, category: "Comfort" },
      { term: "slingback simili valentino economiche", llm: "Gemini", sentiment: "Comparativo", confidence: 78, category: "Competitor" },
      { term: "cafènoir rosso vernice recensioni", llm: "GPT-4", sentiment: "Valutativo", confidence: 88, category: "Review" },
    ]
  }
];

// --- Componenti UI Riutilizzabili ---

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  description?: string;
  action?: React.ReactNode;
}

const Card = ({ title, children, className = "", description = "", action }: CardProps) => (
  <div className={`glass rounded-xl p-6 transition-all duration-300 border-t border-teal-500/20 ${className}`}>
    {(title || description || action) && (
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            {title && <h3 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h3>}
            <div className="h-0.5 w-12 bg-teal-400 rounded-full opacity-80 shadow-[0_0_8px_rgba(45,212,191,0.5)] mt-3 mb-2"></div>
          </div>
          {action && <div>{action}</div>}
        </div>
        {description && (
          <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
             <p className="text-xs text-slate-300 font-medium leading-relaxed text-balance">{description}</p>
          </div>
        )}
      </div>
    )}
    {children}
  </div>
);

const DemoDataAlert = () => (
    <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900/40 p-3 rounded-lg border border-indigo-500/20 flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-top-4">
        <AlertCircle className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
        <div>
        <h4 className="text-sm font-bold text-indigo-100">Dati Demo Visualizzati</h4>
        <p className="text-xs text-slate-400 leading-relaxed">
            Stai visualizzando una simulazione, bisogna collegare le API e le fonti dati Google Search Console per ottenere insights live.
        </p>
        </div>
    </div>
);

interface InsightBoxProps {
  title: string;
  children?: React.ReactNode;
  icon?: any;
}

const InsightBox = ({ title, children, icon: Icon = Zap }: InsightBoxProps) => (
  <div className="bg-slate-900/60 border-l-2 border-teal-500 p-4 rounded-r-lg mt-4 backdrop-blur-sm shadow-lg hover:bg-slate-900/80 transition-colors">
    <div className="flex items-center mb-2">
      <Icon className="w-4 h-4 text-teal-400 mr-2" />
      <span className="text-[10px] font-bold text-teal-200 uppercase tracking-widest">{title}</span>
    </div>
    <div className="text-sm text-slate-300 leading-relaxed font-light text-balance">
      {children}
    </div>
  </div>
);

const AnalysisGuide = ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-4 p-4 rounded-lg bg-teal-500/5 border border-teal-500/10">
        <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2 flex items-center">
            <Activity className="w-3 h-3 mr-2" /> Guida all'Analisi
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed text-balance">
            {children}
        </p>
    </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    // Tooltip per il Pie Chart (Tab 1)
    if (data.totalShare !== undefined) {
        return (
            <div className="glass-strong p-4 rounded-lg shadow-2xl border border-teal-500/20 bg-slate-950/95 z-50 relative pointer-events-none">
                <p className="text-teal-50 font-bold mb-2 text-sm">{data.name}</p>
                <div className="flex flex-col space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Volume Canale:</span>
                        <span className="text-white font-mono font-bold">
                            {payload[0].value.toLocaleString()}
                        </span>
                    </div>
                    {/* Share del cluster su tutte le ricerche brand */}
                    <div className="flex justify-between items-center border-t border-white/10 pt-2">
                        <span className="text-slate-400">Share su Totale Brand:</span>
                        <span className="text-teal-400 font-bold font-mono">
                            {data.totalShare}%
                        </span>
                    </div>
                    {/* YoY specifico del cluster */}
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">YoY Cluster:</span>
                        <span className={`font-bold font-mono ${data.specificYoY >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {data.specificYoY >= 0 ? '+' : ''}{data.specificYoY}%
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Default Tooltip
    return (
      <div className="glass-strong p-4 rounded-lg shadow-2xl border border-teal-500/20 bg-slate-950/95 z-50 relative pointer-events-none">
        <p className="text-teal-50 font-bold mb-2 text-sm">{label || data.name}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex flex-col space-y-1 text-xs py-1 mb-2 last:mb-0">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color || pld.fill }} />
                <span className="text-slate-400 font-medium capitalize">{pld.name}:</span>
                <span className="text-white font-mono font-semibold">
                {typeof pld.value === 'number' ? pld.value.toLocaleString() : pld.value}
                </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Render function custom per etichette YoY
const renderYoYLabel = (props: any) => {
    const { x, y, width, value } = props;
    // value qui sarà il valore YoY passato nel dataKey="yoy"
    return (
        <text 
            x={x + width + 5} 
            y={y + 14} 
            fill={value >= 0 ? '#34d399' : '#f87171'} 
            fontSize={10} 
            fontWeight="bold" 
            fontFamily="monospace"
        >
            {value > 0 ? '+' : ''}{value}%
        </text>
    );
};

// --- Viste Applicative ---

const DonutChartWithStats = ({ dataKey, platformName }: { dataKey: string, platformName: string }) => {
    // Generate platform specific YoY to vary the data visuals as requested
    const enrichedData = CLUSTER_DATA_UPDATED.map(item => {
        let specificYoY = item.yoy;
        
        // Add variance based on platform to differentiate the cards
        if (platformName === 'TikTok') {
            // Logic: High volume items on TikTok get a boost (viral effect), low volume get penalized
            const volumeFactor = item.tiktok > 5000 ? 1 : -0.5;
            specificYoY = Math.round(item.yoy + (25 * volumeFactor)); 
        } else if (platformName === 'Amazon') {
             // Logic: High volume on Amazon (commodities) are steadier, low volume drops faster
             const volumeFactor = item.amazon > 5000 ? 0.5 : -0.8;
             specificYoY = Math.round(item.yoy + (15 * volumeFactor));
        }
        
        // Calculate global share for pie chart visualization context
        const grandTotal = item.google + item.tiktok + item.amazon;
        const totalShare = ((grandTotal > 0 ? (item[dataKey as keyof typeof item] as number) / grandTotal : 0) * 100).toFixed(2);

        return { 
            ...item, 
            specificYoY,
            totalShare
        };
    });

    // 1. Sort for the Pie Chart (Volume based)
    const sortedByVolume = [...enrichedData].sort((a: any, b: any) => b[dataKey] - a[dataKey]);
    const topCategory = sortedByVolume[0];
    
    // 2. Sort for the Movers List (Trend based) - This ensures different lists for different platforms
    const sortedByTrend = [...enrichedData].sort((a, b) => b.specificYoY - a.specificYoY);
    const topGrowers = sortedByTrend.slice(0, 3);
    const topDecliners = sortedByTrend.slice(-3).reverse();

    // Totale Globale (tutte le piattaforme) per il calcolo della share globale
    const grandTotalVolume = CLUSTER_DATA_UPDATED.reduce((acc, curr) => acc + curr.google + curr.tiktok + curr.amazon, 0);
    // Share on Total Brand (Global)
    const platformVolume = topCategory[dataKey as keyof typeof topCategory] as number;
    const topCategoryTotalShare = (( platformVolume / grandTotalVolume) * 100).toFixed(1);

    // Trend specifico del cluster (Top Category)
    const trend = topCategory.specificYoY;

    return (
      <div className="flex flex-col h-full">
         <div className="flex justify-between items-start mb-4 bg-slate-900/50 p-3 rounded-lg border border-white/5">
             <div>
                <div className="text-[10px] text-slate-500 uppercase">Top Category</div>
                <div className="text-sm font-bold text-white truncate max-w-[100px]">{topCategory.name}</div>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase">Share on Total Brand</div>
                <div className="text-sm font-bold text-teal-400">{topCategoryTotalShare}%</div>
             </div>
             <div className="text-right pl-3 border-l border-white/10">
                <div className="text-[10px] text-slate-500 uppercase">YoY (Trend)</div>
                <div className={`text-sm font-bold ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {trend >= 0 ? '+' : ''}{trend}%
                </div>
             </div>
         </div>

        <div className="h-[220px] w-full relative mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sortedByVolume}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={1}
                dataKey={dataKey}
              >
                {sortedByVolume.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={THEME_COLORS.chart[index % THEME_COLORS.chart.length]} stroke="rgba(0,0,0,0)" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 1000 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
             <div className="text-xl font-bold text-white">{sortedByVolume.length}</div>
             <div className="text-[9px] text-slate-400 uppercase tracking-widest">Clusters</div>
          </div>
        </div>

        {/* New YoY Movers Section to Fill Empty Space */}
        <div className="mt-2 bg-slate-900/30 p-3 rounded-lg border border-white/5 flex-1">
            <div className="grid grid-cols-2 gap-4 h-full">
                <div>
                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> Growing
                    </div>
                    <ul className="space-y-1">
                        {topGrowers.map((item, i) => (
                            <li key={i} className="flex justify-between items-center text-xs text-slate-300">
                                <span className="truncate max-w-[80px]">{item.name}</span>
                                <span className="text-emerald-400 font-mono font-bold">+{item.specificYoY}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border-l border-white/5 pl-4">
                    <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" /> Declining
                    </div>
                    <ul className="space-y-1">
                        {topDecliners.map((item, i) => (
                            <li key={i} className="flex justify-between items-center text-xs text-slate-300">
                                <span className="truncate max-w-[80px]">{item.name}</span>
                                <span className="text-red-400 font-mono font-bold">{item.specificYoY}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    );
};

// 1. Analisi Cluster Brand (Brand Search)
const BrandAnalysisView = () => {
  const [selectedMarket, setSelectedMarket] = useState('Italia');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <DemoDataAlert />
      
      {/* Header Filtri */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-white/5">
         <div className="flex flex-col gap-1 w-full md:w-auto">
             <div className="glass px-3 py-2 rounded-lg flex items-center min-w-[300px]">
                <Search className="w-4 h-4 text-teal-500 mr-2" />
                <input type="text" placeholder="Cerca Brand..." defaultValue="CafèNoir" className="bg-transparent border-none text-white text-sm w-full focus:ring-0 placeholder-slate-500 font-semibold" />
             </div>
             <span className="text-[10px] text-emerald-400 ml-2 font-mono">● Simulazione attiva per il brand CafèNoir</span>
         </div>
         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="glass px-3 py-2 rounded-lg flex items-center">
                <MapPin className="w-4 h-4 text-teal-500 mr-2" />
                <select 
                    value={selectedMarket} 
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="bg-transparent border-none text-white text-sm focus:ring-0 [&>option]:bg-slate-900 cursor-pointer"
                >
                    {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>
            <button className="glass hover:bg-teal-500/20 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-all border border-teal-500/30">
                <Download className="w-4 h-4 mr-2" /> Export
            </button>
         </div>
      </div>

      <div className="glass p-4 rounded-lg border-l-4 border-teal-500 bg-teal-500/5">
         <h3 className="text-white font-bold text-sm mb-1">Panoramica Volumi Cluster</h3>
         <p className="text-xs text-slate-400 leading-relaxed">
           Analisi completa di tutti i cluster merceologici. I dati mostrano chiaramente come l'intento dell'utente cambi: 
           su TikTok cercano trend (Cappelli, Anfibi), su Amazon cercano commodities e prezzo (Ciabatte, Zeppe), su Google cercano il prodotto core (Sandali Gioiello).
         </p>
      </div>

      {/* 3 Donut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Brand Search Google" description="Visualizza la ripartizione percentuale delle ricerche brandizzate divise per piattaforma. Questo grafico a ciambella evidenzia quale canale detiene la quota maggioritaria di domanda esplicita, permettendo di allocare il budget dove l'utente è più attivo.">
            <DonutChartWithStats dataKey="google" platformName="Google" />
            <AnalysisGuide>
                Google rimane il canale primario per intenzioni d'acquisto dirette e specifiche. TikTok mostra una crescita nelle categorie accessorie, suggerendo un uso per discovery. Amazon converte la domanda su prodotti commodity a basso prezzo.
            </AnalysisGuide>
        </Card>
        <Card title="Brand Search TikTok" description="Analizza la viralità e l'interesse su TikTok. Qui i volumi sono spesso legati a trend visivi (es. 'Cappelli', 'Anfibi') e non necessariamente al core business storico. Indica potenziale per campagne influencer e awareness.">
            <DonutChartWithStats dataKey="tiktok" platformName="TikTok" />
            <AnalysisGuide>
                Il pubblico TikTok cerca ispirazione visiva. I volumi elevati su Anfibi indicano che questo prodotto è percepito come 'trend' e si presta a contenuti video brevi. Strategia consigliata: User Generated Content.
            </AnalysisGuide>
        </Card>
        <Card title="Brand Search Amazon" description="Riflette l'intento transazionale puro. Su Amazon dominano categorie 'commodity' o ad acquisto d'impulso e prezzo competitivo (es. 'Ciabatte', 'Sneakers'). Utile per strategie di pricing, stock e difesa del brand.">
            <DonutChartWithStats dataKey="amazon" platformName="Amazon" />
            <AnalysisGuide>
                 Dominano i prodotti 'entry level' o funzionali. Se il volume di ricerca è alto ma la conversione bassa, potrebbe esserci un problema di prezzo rispetto ai competitor mass market. Controllare la Buy Box.
            </AnalysisGuide>
        </Card>
      </div>

      {/* Market Resonance - Orizzontale per leggibilità */}
      <Card 
        title="Market Resonance Comparativa (Tutti i Cluster)" 
        description="Confronta i volumi assoluti di ricerca per ogni categoria di prodotto attraverso tutti i canali monitorati. La visualizzazione orizzontale permette di identificare rapidamente i 'Power Products' che trainano il fatturato e le categorie 'Zombie' che non generano interesse."
      >
         <div className="h-[800px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CLUSTER_DATA_UPDATED} layout="vertical" margin={{ top: 20, right: 60, left: 100, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 11, fill: '#cbd5e1', fontWeight: 500}} 
                        width={100}
                    />
                    <Tooltip cursor={{fill: 'rgba(45,212,191,0.05)'}} content={<CustomTooltip />} />
                    <Legend wrapperStyle={{paddingBottom: '20px'}} />
                    <Bar dataKey="google" name="Google" fill="#2dd4bf" stackId="a" barSize={20} />
                    <Bar dataKey="tiktok" name="TikTok" fill="#f472b6" stackId="a" barSize={20} />
                    {/* Added LabelList to the last bar (Amazon) to show YoY at the end of the stack */}
                    <Bar dataKey="amazon" name="Amazon" fill="#fbbf24" radius={[0, 4, 4, 0]} stackId="a" barSize={20}>
                        <LabelList dataKey="yoy" position="right" content={renderYoYLabel} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
             <InsightBox title="Insight Google">
                <strong>Sandali Gioiello</strong> è la categoria Regina su Google. L'intento è di ricerca specifica del modello iconico del brand. Massimizza la SEO qui.
             </InsightBox>
             <InsightBox title="Insight TikTok">
                I <strong>Cappelli</strong> e gli <strong>Anfibi</strong> hanno un volume sproporzionato su TikTok. Questo indica che sono prodotti 'Visual' adatti a campagne Influencer.
             </InsightBox>
             <InsightBox title="Insight Amazon">
                Le <strong>Ciabatte Mare</strong> e <strong>Sneakers Zeppa</strong> dominano su Amazon. L'utente qui cerca comodità e prezzo competitivo, meno il brand puro.
             </InsightBox>
         </div>
         <AnalysisGuide>
            <strong>Come leggere questo grafico:</strong> Ogni barra rappresenta il volume totale di ricerca per un cluster merceologico (es. "Sandali"). I colori indicano la provenienza della ricerca (Google, TikTok, Amazon). 
            <br/><br/>
            <strong>Utilità Strategica per il Marketing Manager:</strong> Le barre con una forte componente Gialla (Amazon) sono prodotti dove il prezzo è la leva principale. Le barre con forte componente Rosa (TikTok) sono prodotti "Trend" o "Viral" da spingere sui social. Le barre con forte componente Verde (Google) sono i pilastri storici del brand da presidiare con la SEO.
            <br/>
            <strong>Insight Operativo:</strong> I Sandali Gioiello sono l'asset strategico indiscusso su Google, mentre gli Anfibi dominano la scena social. Questa discrepanza suggerisce una strategia differenziata: branding emozionale su TikTok per gli stivali, campagne conversion-based su Google per i sandali.
         </AnalysisGuide>
      </Card>
    </div>
  );
};

// 2. Seasonality
const SeasonalityView = () => {
  const [platform, setPlatform] = useState('Google'); 
  const [showSaldi, setShowSaldi] = useState(false);
  const [showBF, setShowBF] = useState(false);
  const [showXmas, setShowXmas] = useState(false);
  const [keywordsInput, setKeywordsInput] = useState('sandali, stivali, sneakers, borse, cerimonia, anfibi, zeppe, mocassini, zaini, accessori...');

  // Generazione dati Marquee Simulati per tutte le kw
  const ALL_KW_YOY = [
      { kw: 'Sandali Gioiello', val: 45 }, { kw: 'Sneakers Zeppa', val: 12 }, { kw: 'Tronchetti', val: -5 },
      { kw: 'Anfibi', val: 22 }, { kw: 'Mocassini', val: 8 }, { kw: 'Décolleté', val: 2 },
      { kw: 'Borse Spalla', val: 15 }, { kw: 'Zaini', val: 5 }, { kw: 'Ciabatte Mare', val: 10 },
      { kw: 'Pochette', val: -2 }, { kw: 'Cinture', val: 0 }, { kw: 'Portafogli', val: 4 },
      { kw: 'Sciarpe', val: 25 }, { kw: 'Cappelli', val: 150 }, { kw: 'Stivali Alti', val: 8 },
      { kw: 'Sneakers Uomo', val: -10 }, { kw: 'Scarpe Eleganti', val: 0 }, { kw: 'Borse Pelle', val: 30 }
  ];

  // Simulazione dati per piattaforma basata sui dati Google reali
  const getChartData = () => {
    return SEASONALITY_BASE.map(d => {
        // Logica di simulazione differenziata
        let sandali = d.sandali;
        let stivali = d.stivali;
        let sneakers = d.sneakers;
        let borse = d.borse;
        let cerimonia = d.cerimonia;
        let anfibi = d.anfibi;
        let zeppe = d.zeppe;

        if (platform === 'TikTok') {
            // TikTok anticipa i trend (Discovery) e ha spike virali
            sandali = d.sandali * 0.6; // Meno volume search puro
            stivali = d.stivali * 0.7;
            anfibi = d.anfibi * 1.5; // Molto popolare su TikTok
            // Anticipo picchi estivi
            if (d.month === 'Mag') sandali = sandali * 1.5;
        } else if (platform === 'Amazon') {
            // Amazon segue i saldi e prime day
            sandali = d.sandali * 0.9;
            // Prime Day (Luglio) Boost
            if (d.month === 'Lug') {
                sandali = sandali * 1.4;
                sneakers = sneakers * 1.4;
                zeppe = zeppe * 1.6;
            }
            // Black Friday Boost Massivo
            if (d.month === 'Nov') {
                sneakers = sneakers * 2.0;
                stivali = stivali * 1.3;
            }
        } else if (platform === 'All') {
            // Somma approssimativa
            sandali = d.sandali * 2.5;
            stivali = d.stivali * 2.5;
            sneakers = d.sneakers * 2.5;
            borse = d.borse * 2.5;
            cerimonia = d.cerimonia * 2.5;
            anfibi = d.anfibi * 2.5;
            zeppe = d.zeppe * 2.5;
        }

        return {
            month: d.month,
            sandali, stivali, sneakers, borse, cerimonia, anfibi, zeppe,
            mocassini: d.mocassini * (platform === 'All' ? 2.5 : 1),
            zaini: d.zaini * (platform === 'All' ? 2.5 : 1),
            accessori: d.accessori * (platform === 'All' ? 2.5 : 1)
        }
    });
  };

  const chartData = getChartData();

  const handleExport = () => {
    const header = "Month,Sandali,Stivali,Sneakers,Borse,Cerimonia,Anfibi,Zeppe,Mocassini,Zaini,Accessori";
    const rows = chartData.map(e => 
        `${e.month},${e.sandali},${e.stivali},${e.sneakers},${e.borse},${e.cerimonia},${e.anfibi},${e.zeppe},${e.mocassini},${e.zaini},${e.accessori}`
    ).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${header}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `seasonality_forecast_${platform.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <DemoDataAlert />
       <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-4">
          <div>
              <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                  <Clock className="w-6 h-6 mr-3 text-teal-400" />
                  Seasonality & Trends (Not Brand)
              </h2>
              <p className="text-slate-400 text-sm mt-1">Studio della stagionalità delle ricerche generiche (es. "scarpe donna") per pianificare le campagne.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
                onClick={handleExport}
                className="flex items-center bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/10 text-xs font-bold transition-all"
            >
                <Download className="w-3 h-3 mr-2 text-teal-400" />
                Export CSV
            </button>

            <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10">
                {['Google', 'TikTok', 'Amazon', 'All'].map(p => (
                    <button 
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${platform === p ? 'bg-teal-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-6">
             <Card 
                title={`Trend Stagionali (${platform})`}
                description="Analisi temporale delle keyword generiche. Questo grafico permette di visualizzare i picchi di domanda durante l'anno, essenziale per sincronizzare il lancio di prodotti o promozioni. I dati variano in base alla piattaforma selezionata."
                action={
                    <div className="flex gap-2">
                         <button onClick={() => setShowSaldi(!showSaldi)} className={`px-3 py-1 rounded border text-xs font-bold transition-all ${showSaldi ? 'bg-pink-500/20 border-pink-500 text-pink-400' : 'border-white/10 text-slate-400'}`}>
                            {showSaldi ? 'Saldi' : 'Saldi'}
                         </button>
                         <button onClick={() => setShowBF(!showBF)} className={`px-3 py-1 rounded border text-xs font-bold transition-all ${showBF ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'border-white/10 text-slate-400'}`}>
                            {showBF ? 'Black Friday' : 'Black Friday'}
                         </button>
                         <button onClick={() => setShowXmas(!showXmas)} className={`px-3 py-1 rounded border text-xs font-bold transition-all ${showXmas ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-white/10 text-slate-400'}`}>
                            {showXmas ? 'Natale' : 'Natale'}
                         </button>
                    </div>
                }
             >
                <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 13, fontWeight: 700, dy: 10}} height={50} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={60} iconType="circle" wrapperStyle={{fontSize: '11px'}} />
                        
                        {/* Linee eventi chiave Toggleable */}
                        {showSaldi && <ReferenceLine x="Gen" stroke="#f472b6" strokeDasharray="3 3" label={{ value: 'SALDI INV.', fill: '#f472b6', fontSize: 10, position: 'insideTop' }} />}
                        {showSaldi && <ReferenceLine x="Lug" stroke="#f472b6" strokeDasharray="3 3" label={{ value: 'SALDI EST.', fill: '#f472b6', fontSize: 10, position: 'insideTop' }} />}
                        {showBF && <ReferenceLine x="Nov" stroke="#a855f7" strokeDasharray="3 3" label={{ value: 'BLACK FRIDAY', fill: '#a855f7', fontSize: 10, position: 'insideTop' }} />}
                        {showXmas && <ReferenceLine x="Dic" stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'NATALE', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />}

                        <Line type="monotone" dataKey="sandali" stroke="#fbbf24" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="stivali" stroke="#2dd4bf" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="cerimonia" stroke="#818cf8" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="sneakers" stroke="#f472b6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="anfibi" stroke="#34d399" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="zeppe" stroke="#fb7185" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="mocassini" stroke="#a78bfa" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="borse" stroke="#c084fc" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="zaini" stroke="#60a5fa" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="accessori" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Scrolling Marquee for YoY Stats */}
                <div className="mt-6 border-t border-white/5 pt-4 overflow-hidden relative">
                    <style>{`
                        @keyframes scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .marquee-content {
                            display: flex;
                            gap: 2rem;
                            animation: scroll 30s linear infinite;
                            width: max-content;
                        }
                    `}</style>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Global Keyword YoY Trends</div>
                    <div className="marquee-content hover:[animation-play-state:paused]">
                        {[...ALL_KW_YOY, ...ALL_KW_YOY].map((item, i) => (
                            <div key={i} className="flex items-center space-x-2 flex-shrink-0">
                                <span className="text-xs text-slate-300 font-medium">{item.kw}</span>
                                <span className={`text-xs font-bold font-mono ${item.val > 0 ? 'text-emerald-400' : item.val < 0 ? 'text-red-400' : 'text-white'}`}>
                                    {item.val > 0 ? '+' : ''}{item.val}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <AnalysisGuide>
                    <strong>Lettura del grafico:</strong> Questo grafico mostra l'andamento annuale della domanda per categorie generiche (NON brandizzate). Traccia l'andamento temporale della domanda di mercato (keyword generiche) mese per mese. Fondamentale per il timing delle campagne: anticipare il picco di domanda significa acquisire clienti a CPC inferiore prima che la competizione saturi l'asta.
                    <br/>
                    <strong>Perché varia per piattaforma?</strong> Google mostra quando la gente "cerca" informazioni. TikTok mostra quando la gente "guarda" trend (spesso anticipa Google). Amazon mostra quando la gente "compra" (picchi più concentrati su eventi come Prime Day/Black Friday).
                    <br/>
                    <strong>Azione:</strong> Si osserva una stagionalità anticipata su TikTok rispetto a Google: gli utenti cercano ispirazione visiva (Discovery) circa 30 giorni prima di effettuare la ricerca transazionale su Google. Le campagne Awareness devono partire a Settembre per gli stivali, non a Ottobre.
                </AnalysisGuide>
             </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
             <Card title="Aggiungi Keyword (Analisi Bulk)">
                <textarea 
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-slate-300 focus:ring-1 focus:ring-teal-500 placeholder-slate-600 mb-3 h-64 resize-none leading-relaxed custom-scrollbar"
                    placeholder="Inserisci keyword separate da virgola..."
                ></textarea>
                <button className="w-full bg-teal-600 hover:bg-teal-500 text-slate-900 font-bold py-2 rounded-lg transition-colors text-sm">
                    Analizza Trend
                </button>
             </Card>
             <InsightBox title={`Insight ${platform}`}>
                {platform === 'Google' && "La stagionalità è canonica: Cerimonia a Maggio, Sandali a Luglio, Stivali a Dicembre. Pianifica con 2 mesi di anticipo la SEO."}
                {platform === 'TikTok' && "Notiamo picchi anticipati per 'Anfibi' e 'Cappelli'. Su TikTok la 'Discovery' avviene 1 mese prima dell'acquisto reale."}
                {platform === 'Amazon' && "Forte concentrazione su 'Prime Day' (Luglio) per Zeppe e Sneakers. A Novembre spike massivo per Stivali."}
                {platform === 'All' && "Visione complessiva: Il mercato si muove a ondate. I volumi totali a Dicembre raddoppiano grazie al gifting."}
             </InsightBox>
          </div>
       </div>
    </div>
  );
};

// 3. Hero Product Study
const HeroProductView = () => {
  // Hero Product: Sandali Gioiello
  const heroProduct = CLUSTER_DATA_UPDATED[0]; // Sandali Gioiello
  const totalBrandVolume = CLUSTER_DATA_UPDATED.reduce((acc, curr) => acc + curr.google, 0);
  const heroPercentage = ((heroProduct.google / totalBrandVolume) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <DemoDataAlert />
        <div className="flex justify-between items-start">
             <div>
                <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                    <Target className="w-6 h-6 mr-3 text-teal-400" />
                    Hero Product Study
                </h2>
                <p className="text-slate-400 text-sm mt-1">Analisi del prodotto dominante: <span className="text-teal-400 font-bold uppercase">{heroProduct.name}</span>.</p>
             </div>
             <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold">Incidenza sul Brand</div>
                <div className="text-3xl font-mono text-white font-bold">{heroPercentage}%</div>
                <div className="text-xs text-emerald-400 font-bold">Volume: {heroProduct.google.toLocaleString()}</div>
             </div>
        </div>

        <div className="glass p-4 rounded-lg border-l-4 border-teal-500 bg-teal-500/5">
            <h3 className="text-white font-bold text-sm mb-1">Perché questo è l'Hero Product?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
                Il cluster <strong>{heroProduct.name}</strong> genera il maggior volume di traffico qualificato su Google. 
                Per CafèNoir, questo prodotto rappresenta la "porta d'ingresso" principale al brand.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Analisi Competitiva Diretta" description="Analisi comparativa diretta tra il tuo Hero Product e i prodotti equivalenti dei principali competitor. Monitoriamo Share of Voice (visibilità) e Prezzo Medio per capire se stiamo perdendo quote di mercato a causa di un posizionamento prezzo errato o di una scarsa pressione pubblicitaria.">
                <div className="space-y-4 mt-2">
                    {COMPETITORS_HERO.map((comp, i) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                            <div>
                                <div className="font-bold text-white text-sm">{comp.name}</div>
                                <div className="text-xs text-slate-500 mt-1">Prezzo Medio: <span className="text-slate-300">€{comp.mainProductPrice}</span></div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Share of Voice</div>
                                <div className="text-lg font-mono font-bold text-teal-400">{comp.shareOfVoice}%</div>
                            </div>
                        </div>
                    ))}
                    {/* Il Nostro Brand */}
                    <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/30 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1 bg-teal-500"></div>
                        <div>
                            <div className="font-bold text-white text-sm">CAFÈNOIR</div>
                            <div className="text-xs text-slate-400 mt-1">Prezzo Medio: <span className="text-white">€129</span></div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-400 uppercase tracking-wider">Share of Voice</div>
                            <div className="text-lg font-mono font-bold text-white">17%</div>
                        </div>
                    </div>
                </div>
                <AnalysisGuide>
                    <strong>Analisi Prezzo/Share:</strong> Confrontiamo il prezzo medio del nostro Hero Product con i competitor che bidano sulle stesse keyword.
                    <br/>
                    <strong>Insight:</strong> Nonostante un prezzo premium (€129), CafèNoir mantiene una buona quota di mercato. Tuttavia, il Competitor B sta erodendo margini nel segmento mass market con un prezzo aggressivo (€99). È necessario giustificare il premium price con contenuti che esaltino la qualità dei materiali.
                </AnalysisGuide>
            </Card>

            <div className="space-y-6">
                <Card title="Strategie di Crescita">
                    <div className="space-y-6">
                         <div className="flex items-start gap-4">
                            <div className="bg-amber-500/10 p-2 rounded-lg"><Lightbulb className="w-5 h-5 text-amber-400" /></div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-200">Idea Bundle: "Cerimonia Pack"</h4>
                                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                    Dato il prezzo medio competitivo (€129) rispetto al Lusso (€180), crea un bundle: Sandali Gioiello + Pochette Abbinata (cluster correlato) con uno sconto del 10% sul set.
                                </p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                            <div className="bg-teal-500/10 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-teal-400" /></div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-200">Espansione Keywords</h4>
                                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                    Aggredisci keyword long-tail come "sandali gioiello tacco basso comodi" dove il Competitor B (Mass Market) è debole sulla percezione di qualità.
                                </p>
                            </div>
                         </div>
                    </div>
                </Card>
                
                <InsightBox title="Cross-Selling">
                   Chi compra <strong>Sandali Gioiello</strong> ha un'alta probabilità di cercare <strong>Sciarpe/Stole</strong> eleganti (vedi dati Seasonality). Usa il checkout per proporre l'accessorio.
                </InsightBox>
            </div>
        </div>
    </div>
  );
};

// 4. Query Fan Out (Spostato in fondo)
const AINodesView = () => {
  const [keyword, setKeyword] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1]);

  const toggleNode = (id: number) => {
    setExpandedNodes(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <DemoDataAlert />
      <div className="flex justify-between items-center mb-4">
         <div>
            <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                <BrainCircuit className="w-6 h-6 mr-3 text-teal-400" />
                Query Fan Out (AI Analysis)
            </h2>
            <p className="text-slate-400 text-sm mt-1">Scopri come l'Intelligenza Artificiale espande i concetti legati al brand CafèNoir.</p>
         </div>
      </div>

      <div className="glass p-6 rounded-xl border-t border-teal-500/20 mb-6">
         <div className="flex gap-4 mb-4">
            <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Simulazione su: CafèNoir..." 
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold px-6 py-2 rounded-lg transition-colors">
                Analizza
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {QUERY_FAN_OUT_DATA.map(node => (
            <div key={node.id} className="glass rounded-xl overflow-hidden border border-white/5">
               <div 
                 className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                 onClick={() => toggleNode(node.id)}
               >
                 <div className="flex items-center gap-4">
                    <div className="bg-teal-500/10 p-2 rounded-lg">
                        <Share2 className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Seed: {node.root}</h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-white/5">Vol. Brand: {node.volume}</span>
                        </div>
                    </div>
                 </div>
                 <ArrowRight className={`w-5 h-5 text-slate-500 transition-transform ${expandedNodes.includes(node.id) ? 'rotate-90' : ''}`} />
               </div>

               {expandedNodes.includes(node.id) && (
                 <div className="p-4 pt-0 border-t border-white/5 bg-slate-900/30">
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-teal-500/20">
                        {node.branches.map((branch, i) => (
                            <div key={i} className="flex justify-between items-center group py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${branch.llm === 'Gemini' ? 'bg-blue-400' : branch.llm === 'GPT-4' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                                    <div>
                                        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors block">{branch.term}</span>
                                        <span className="text--[10px] text-slate-500">{branch.llm === 'GPT-4' ? 'Suggerito da OpenAI' : branch.llm === 'Gemini' ? 'Suggerito da Google' : 'Suggerito da Anthropic'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded border border-teal-500/20 uppercase font-bold">{branch.sentiment}</span>
                                    <span className="text-[10px] text-slate-500">Confidence: {branch.confidence}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <InsightBox title="Insight Semantico">
                        Utilizza LLM (GPT-4, Gemini, Claude) per esplorare le associazioni semantiche laterali che gli utenti fanno con il brand. Questo diagramma interattivo svela intenti di ricerca nascosti. 
                        <br/>
                        <strong>Azione:</strong> L'IA rileva una forte correlazione semantica tra il brand e il concetto di 'Comodità' per le cerimonie. Questo è un insight cruciale per il copy: gli utenti non cercano solo estetica, ma garanzia di comfort per eventi lunghi. Integrare 'Comode' nelle descrizioni aumenterà il CTR.
                    </InsightBox>
                 </div>
               )}
            </div>
         ))}
      </div>
    </div>
  );
};

// 5. GSC Deep Dive (Overhauled & Action Oriented with Scatter Plot)
const GSCView = () => {
    // Brand vs Generic Split
    const brandVsGeneric = useMemo(() => {
        let brandImps = 0; let genericImps = 0;
        let brandClicks = 0; let genericClicks = 0;

        GSC_QUERIES.forEach(q => {
            if (q.type === 'Brand') { brandImps += q.impressions; brandClicks += q.clicks; }
            else { genericImps += q.impressions; genericClicks += q.clicks; }
        });

        return {
            impressions: [
                { name: 'Brand', value: brandImps },
                { name: 'Generic', value: genericImps }
            ],
            clicks: [
                { name: 'Brand', value: brandClicks },
                { name: 'Generic', value: genericClicks }
            ]
        };
    }, []);

    // YoY Winners & Losers (from CSV)
    const sortedYoY = useMemo(() => {
        const sorted = [...YOY_COMPARISON_DATA].sort((a, b) => b.delta - a.delta);
        return {
            winners: sorted.slice(0, 5),
            losers: sorted.slice(-5).reverse()
        };
    }, []);

    // Mock Data for Last 3 Months Performance Delta
    const LAST_3_MONTHS_DATA = [
        { type: 'Brand', metric: 'Clicks', value: 12500, yoy: 12.5 },
        { type: 'Brand', metric: 'Impressions', value: 450000, yoy: 5.2 },
        { type: 'Generic', metric: 'Clicks', value: 3200, yoy: -8.4 },
        { type: 'Generic', metric: 'Impressions', value: 180000, yoy: -15.1 },
    ];

    return (
  <div className="space-y-6 animate-in fade-in duration-500">
      <DemoDataAlert />
      <div className="flex justify-between items-start">
         <div>
             <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                <Search className="w-6 h-6 mr-3 text-teal-400" />
                Organic Search Performance
             </h2>
             <p className="text-slate-400 text-sm mt-1">
                Analisi profonda delle performance GSC. Focus su split Brand/Generic e trend YoY dei cluster.
                <br/>
                <span className="text-xs text-amber-400 flex items-center mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Disclaimer: I volumi organici brand possono essere influenzati dall'attività di Bidding Paid (Brand Protection).
                </span>
             </p>
         </div>
         <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            <LinkIcon className="w-4 h-4" />
            <span className="text-xs font-bold">GSC Connected</span>
         </button>
      </div>

      {/* Brand vs Generic Split and Delta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Performance Ultimi 3 Mesi (YoY)" description="Monitora la variazione percentuale (YoY) del traffico organico, segmentando tra ricerche Brand (utenti che vi cercano) e Generic (utenti che cercano prodotti). Questo split è vitale per capire se la crescita è sana (nuovi utenti) o solo frutto di notorietà pregressa.">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 h-[250px]">
                    {LAST_3_MONTHS_DATA.map((item, i) => (
                        <div key={i} className={`p-4 rounded-lg border flex flex-col justify-center ${item.type === 'Brand' ? 'bg-teal-500/5 border-teal-500/20' : 'bg-pink-500/5 border-pink-500/20'}`}>
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">{item.type} {item.metric}</div>
                            <div className="text-2xl font-bold text-white mb-2">{item.value.toLocaleString()}</div>
                            <div className={`text-sm font-mono font-bold flex items-center ${item.yoy >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {item.yoy >= 0 ? <TrendingUp className="w-4 h-4 mr-2"/> : <TrendingDown className="w-4 h-4 mr-2"/>}
                                {item.yoy > 0 ? '+' : ''}{item.yoy}% YoY
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center"><div className="w-3 h-3 bg-teal-500/20 border border-teal-500 rounded-full mr-2"></div><span className="text-xs text-slate-300">Brand Traffic</span></div>
                    <div className="flex items-center"><div className="w-3 h-3 bg-pink-500/20 border border-pink-500 rounded-full mr-2"></div><span className="text-xs text-slate-300">Generic Traffic</span></div>
                </div>
                <div className="mt-4 border-t border-white/5 pt-3">
                    <p className="text-xs text-slate-400 leading-relaxed text-balance">
                         Il calo del traffico generico (-8.4% Clicks) è un segnale d'allarme: il sito sta perdendo visibilità su keyword competitive come 'Sneakers'. Al contrario, la tenuta del Brand (+12.5%) conferma la fedeltà della customer base storica, ma non basta per scalare.
                    </p>
                </div>
          </Card>

          {/* YoY Winners & Losers Lists (Improved Aesthetics) */}
          <Card title="Brand Cluster Trends (Clicks YoY)" description="Classifica i cluster semantici in base alla velocità di crescita o decrescita dei clic rispetto all'anno precedente. Identifica istantaneamente quali categorie stanno diventando trend emergenti e quali sono in fase di declino strutturale.">
             <div className="grid grid-cols-2 gap-6 h-[300px]">
                {/* Winners */}
                <div className="bg-slate-900/30 rounded-lg p-4 border border-emerald-500/10 flex flex-col">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" /> Top Growing
                    </h4>
                    <ul className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {sortedYoY.winners.map((item, i) => (
                            <li key={i} className="flex flex-col gap-1 pb-2 border-b border-white/5 last:border-0 group">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-200 font-medium group-hover:text-emerald-300 transition-colors">{item.cluster}</span>
                                    <span className="text-emerald-400 font-bold font-mono">+{item.delta}%</span>
                                </div>
                                {/* Visual Bar */}
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(Math.abs(item.delta) * 1.5, 100)}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Losers */}
                <div className="bg-slate-900/30 rounded-lg p-4 border border-red-500/10 flex flex-col">
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center">
                        <TrendingDown className="w-4 h-4 mr-2" /> Top Declining
                    </h4>
                    <ul className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {sortedYoY.losers.map((item, i) => (
                            <li key={i} className="flex flex-col gap-1 pb-2 border-b border-white/5 last:border-0 group">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-200 font-medium group-hover:text-red-300 transition-colors">{item.cluster}</span>
                                    <span className="text-red-400 font-bold font-mono">{item.delta}%</span>
                                </div>
                                 {/* Visual Bar */}
                                 <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${Math.min(Math.abs(item.delta) * 1.5, 100)}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
          </Card>
      </div>

      <AnalysisGuide>
        <strong>Analisi Performance Organica:</strong> Questa tab incrocia i dati GSC reali.
        <br/>
        1. <strong>Brand vs Generic:</strong> Se i Clic sono dominati dal Brand (Verde) > 80%, significa che il sito vive di rendita sulla notorietà e non acquisisce nuovi clienti generici. Obiettivo: alzare la quota Rosa (Generic).
        <br/>
        2. <strong>YoY Trends:</strong> "Store Locator" in crescita (+35%) indica un ritorno al fisico (ROPO). Il calo di "Sneakers" (-45%) è un alert critico: il prodotto non è più trend o c'è un problema tecnico/competitivo sulle serp. L'esplosione di 'Store Locator' (+35%) suggerisce un forte ritorno al retail fisico (effetto ROPO). Il crollo delle 'Sneakers' (-45%) indica che i modelli attuali non risuonano più con il mercato.
      </AnalysisGuide>
  </div>
);
};

// --- Layout Principale ---

const App = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'market': return <BrandAnalysisView />;
      case 'forecast': return <SeasonalityView />;
      case 'hero': return <HeroProductView />;
      case 'ainodes': return <AINodesView />;
      case 'gsc': return <GSCView />;
      default: return <BrandAnalysisView />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 mb-1 ${
        activeTab === id 
          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.2)]' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col text-slate-200 font-sans selection:bg-teal-500/30">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 glass-strong hidden md:flex flex-col fixed h-full z-20 border-r border-white/5 bg-slate-950">
            {/* Branding Section (Top) - RESTORED */}
            <div className="p-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-br from-teal-400 to-emerald-600 p-2.5 rounded-xl shadow-lg shadow-teal-500/20">
                        <Hexagon className="w-8 h-8 text-white fill-white/10" strokeWidth={1.5} />
                    </div>
                    <div>
                        <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 block leading-none">BRAND<br/><span className="text-teal-400">HORIZON.AI</span></span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide leading-relaxed">
                    Market Intelligence Suite for Retail Leaders, Marketing Managers & SEOs.
                </p>
            </div>
            
            <nav className="flex-1 px-6 py-4 space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Intelligence Modules</div>
                <NavItem id="market" icon={PieChartIcon} label="Brand Market Share" />
                <NavItem id="forecast" icon={Clock} label="Seasonality Forecast" />
                <NavItem id="hero" icon={Target} label="Hero Product Deep Dive" />
                <NavItem id="ainodes" icon={BrainCircuit} label="AI Semantic Expansion" />
                <NavItem id="gsc" icon={Search} label="Organic Performance" />
            </nav>

            {/* PM Section (Bottom) - RESTORED */}
            <div className="p-6 border-t border-white/5 bg-slate-900/30">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-teal-500/20">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-600 flex items-center justify-center text-slate-900 font-bold text-xs shadow-lg">MM</div>
                    <div className="text-xs">
                        <div className="font-bold text-white tracking-wide">Marketing Manager</div>
                        <div className="text-slate-500 font-mono">CafèNoir</div>
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto md:ml-72 relative bg-[#020617] flex flex-col">
            {/* Top Gradient Accents */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-teal-900/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] pointer-events-none"></div>

            <header className="glass-strong sticky top-0 z-10 border-b border-white/5 backdrop-blur-md">
            <div className="px-8 py-5 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span>Dashboard</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-teal-400 font-medium">
                            {activeTab === 'market' ? 'Cluster Analysis' : 
                            activeTab === 'ainodes' ? 'AI Query Expansion' :
                            activeTab === 'forecast' ? 'Seasonal Trends' :
                            activeTab === 'hero' ? 'Product Strategy' :
                            'Organic Search'}
                        </span>
                    </div>
                    <h1 className="text-xl font-bold text-white capitalize flex items-center tracking-tight">
                        {activeTab === 'market' && <PieChartIcon className="w-5 h-5 mr-3 text-teal-400" />}
                        {activeTab === 'ainodes' && <BrainCircuit className="w-5 h-5 mr-3 text-teal-400" />}
                        {activeTab === 'forecast' && <Clock className="w-5 h-5 mr-3 text-teal-400" />}
                        {activeTab === 'hero' && <Target className="w-5 h-5 mr-3 text-teal-400" />}
                        {activeTab === 'gsc' && <Search className="w-5 h-5 mr-3 text-teal-400" />}
                        {activeTab === 'market' ? 'Analisi Cluster Brand' : 
                        activeTab === 'ainodes' ? 'Query Fan Out' :
                        activeTab === 'forecast' ? 'Seasonality & Trends' :
                        activeTab === 'hero' ? 'Hero Product Study' :
                        'Organic Search Performance'}
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-all text-xs font-bold mr-4"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Link Copiato!' : 'Condividi Tool'}</span>
                    </button>
                    <div className="flex items-center space-x-2 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest font-bold">API Connected</span>
                    </div>
                </div>
            </div>
            </header>
            
            <div className="p-8 max-w-[1600px] mx-auto relative z-0 flex-1 w-full">
            {renderContent()}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-slate-950 py-12 px-8 mt-12">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <div className="mb-6">
                        <Hexagon className="w-6 h-6 text-teal-500 mx-auto opacity-50 mb-4" />
                        <p className="text-sm text-slate-400 leading-relaxed text-balance">
                            Brand Horizon.ai è la suite di <strong>Market Intelligence Predittiva</strong> progettata per Marketing Manager che devono anticipare i trend.
                            Integriamo dati di Ricerca (Google), Social (TikTok) e Marketplace (Amazon) per fornire una visione olistica del posizionamento del brand e guidare decisioni strategiche data-driven.
                        </p>
                    </div>
                    
                    <div className="flex gap-6 mb-8 border-t border-white/5 pt-6 w-full justify-center">
                        <button className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors"><Download className="w-3 h-3" /> Export Report</button>
                        <button className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors"><LinkIcon className="w-3 h-3" /> API Docs</button>
                        <button className="text-xs text-slate-500 hover:text-white flex items-center gap-2 transition-colors"><MessageSquare className="w-3 h-3" /> Support</button>
                    </div>

                    <div className="text-[10px] text-slate-700 font-medium">
                        Powered by XNOVO Enterprise Intelligence Engine
                    </div>
                </div>
            </footer>
        </main>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
