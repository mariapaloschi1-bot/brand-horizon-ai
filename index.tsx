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
  LabelList,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area
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
  Check,
  Filter,
  Layers,
  Cpu,
  MousePointer2,
  Eye,
  Menu,
  X
} from 'lucide-react';

// --- COSTANTI E DATI ---

const THEME_COLORS = {
  primary: '#2dd4bf', // Teal 400
  secondary: '#99f6e4', // Teal 200
  tertiary: '#0f766e', // Teal 700
  accent: '#f472b6', // Pink
  chart: ['#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb7185', '#fbbf24', '#a3e635', '#34d399', '#22d3ee', '#60a5fa', '#a78bfa', '#e879f9', '#fca5a5', '#fcd34d']
};

const MARKETS = ['Italia', 'Germania', 'Spagna', 'UK', 'Francia', 'USA', 'Polonia'];

// Dati Cluster Brand
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

// Dati Hero Product Matrix (Radar Chart)
const HERO_MATRIX_DATA = [
  { subject: 'Price Point', A: 120, B: 110, fullMark: 150 },
  { subject: 'Organic Visibility', A: 98, B: 130, fullMark: 150 },
  { subject: 'Social Sentiment', A: 86, B: 130, fullMark: 150 },
  { subject: 'Conversion Rate', A: 99, B: 100, fullMark: 150 },
  { subject: 'Retention', A: 85, B: 90, fullMark: 150 },
  { subject: 'Trend Fit', A: 65, B: 85, fullMark: 150 },
];

// Dati AI Fan Out Espansi e Categorizzati
const AI_FAN_OUT_DATA = [
    { id: 1, term: "cafènoir slingback rosse prezzo outlet", llm: "GPT-4", sentiment: "Transazionale", confidence: 95, category: "Purchase" },
    { id: 2, term: "abbinamento slingback rosse cerimonia", llm: "Gemini", sentiment: "Informativo", confidence: 92, category: "Style" },
    { id: 3, term: "scarpe rosse tacco comodo cafènoir", llm: "Claude", sentiment: "Ricerca Prodotto", confidence: 85, category: "Comfort" },
    { id: 4, term: "slingback simili valentino economiche", llm: "Gemini", sentiment: "Comparativo", confidence: 78, category: "Competitor" },
    { id: 5, term: "cafènoir rosso vernice recensioni", llm: "GPT-4", sentiment: "Valutativo", confidence: 88, category: "Review" },
    { id: 6, term: "outfit primavera scarpe rosse", llm: "Claude", sentiment: "Informativo", confidence: 80, category: "Style" },
    { id: 7, term: "migliori scarpe eleganti comode 2024", llm: "Gemini", sentiment: "Generico", confidence: 75, category: "Comfort" },
    { id: 8, term: "sconti cafènoir zalando", llm: "GPT-4", sentiment: "Transazionale", confidence: 98, category: "Purchase" },
];

// Dati Sentiment AI Summary
const AI_SENTIMENT_SUMMARY = [
    { name: 'Transazionale', value: 35, color: '#34d399' },
    { name: 'Informativo', value: 25, color: '#60a5fa' },
    { name: 'Comparativo', value: 15, color: '#fbbf24' },
    { name: 'Valutativo', value: 25, color: '#f87171' },
];

// Dati YoY Organic Performance
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
];

const GSC_QUERIES = [
  { term: 'cafe noir', clicks: 34682, impressions: 207414, ctr: 16.72, pos: 1.83, type: 'Brand', cluster: 'Brand Generico' },
  { term: 'stivali donna', clicks: 7179, impressions: 537718, ctr: 1.34, pos: 6.88, type: 'Generic', cluster: 'Stivali' },
  { term: 'scarpe donna', clicks: 4986, impressions: 406895, ctr: 1.23, pos: 5.91, type: 'Generic', cluster: 'Scarpe Generico' },
  { term: 'sandali donna', clicks: 3560, impressions: 275783, ctr: 1.29, pos: 6.22, type: 'Generic', cluster: 'Sandali' },
  { term: 'mocassini donna', clicks: 1962, impressions: 214610, ctr: 0.91, pos: 9.54, type: 'Generic', cluster: 'Mocassini' },
  { term: 'cafè noir nuovi arrivi', clicks: 2841, impressions: 9540, ctr: 29.78, pos: 1.21, type: 'Brand', cluster: 'Brand Generico' },
  { term: 'anfibi donna', clicks: 1402, impressions: 194158, ctr: 0.72, pos: 9.44, type: 'Generic', cluster: 'Anfibi' },
  { term: 'slingback', clicks: 1361, impressions: 214489, ctr: 0.63, pos: 7.04, type: 'Generic', cluster: 'Scarpe Generico' },
  { term: 'ciabatte donna estive', clicks: 1150, impressions: 107870, ctr: 1.07, pos: 7.37, type: 'Generic', cluster: 'Ciabatte' },
  { term: 'sneakers donna', clicks: 412, impressions: 361399, ctr: 0.11, pos: 8.63, type: 'Generic', cluster: 'Sneakers' },
  { term: 'stivali alti donna', clicks: 529, impressions: 96024, ctr: 0.55, pos: 10.52, type: 'Generic', cluster: 'Stivali' },
  { term: 'cafè noir outlet', clicks: 1284, impressions: 5248, ctr: 24.47, pos: 2.72, type: 'Brand', cluster: 'Brand Generico' }
];

// Baseline Stagionale con Dati Anno Precedente (Simulati)
const SEASONALITY_BASE = [
  { month: 'Gen', google: 45000, google_prev: 42000, tiktok: 15000, amazon: 12000 },
  { month: 'Feb', google: 35000, google_prev: 38000, tiktok: 16000, amazon: 11000 },
  { month: 'Mar', google: 15000, google_prev: 20000, tiktok: 22000, amazon: 13000 },
  { month: 'Apr', google: 5000, google_prev: 8000, tiktok: 25000, amazon: 14000 },
  { month: 'Mag', google: 2000, google_prev: 3000, tiktok: 24000, amazon: 15000 },
  { month: 'Giu', google: 1000, google_prev: 1500, tiktok: 20000, amazon: 16000 },
  { month: 'Lug', google: 500, google_prev: 800, tiktok: 18000, amazon: 25000 }, // Prime Day
  { month: 'Ago', google: 800, google_prev: 900, tiktok: 15000, amazon: 15000 },
  { month: 'Set', google: 15000, google_prev: 12000, tiktok: 28000, amazon: 22000 },
  { month: 'Ott', google: 35000, google_prev: 30000, tiktok: 20000, amazon: 18000 },
  { month: 'Nov', google: 55000, google_prev: 50000, tiktok: 25000, amazon: 40000 }, // Black Friday
  { month: 'Dic', google: 65000, google_prev: 60000, tiktok: 30000, amazon: 35000 },
];

const COMPETITORS_HERO = [
  { name: 'Competitor A (Lusso)', shareOfVoice: 18, mainProductPrice: 180 },
  { name: 'Competitor B (Mass)', shareOfVoice: 25, mainProductPrice: 99 },
  { name: 'Market Leader', shareOfVoice: 40, mainProductPrice: 110 },
];

// --- COMPONENTI UI RIUTILIZZABILI ---

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
            Stai visualizzando una simulazione. Collega le API e Google Search Console per i dati reali.
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
    // Tooltip Differenziato
    return (
      <div className="glass-strong p-4 rounded-lg shadow-2xl border border-teal-500/20 bg-slate-950/95 z-50 relative pointer-events-none">
        <p className="text-teal-50 font-bold mb-2 text-sm">{label || data.name || data.subject}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex flex-col space-y-1 text-xs py-1 mb-2 last:mb-0">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color || pld.fill }} />
                <span className="text-slate-400 font-medium capitalize">{pld.name || pld.dataKey}:</span>
                <span className="text-white font-mono font-semibold">
                {typeof pld.value === 'number' ? pld.value.toLocaleString() : pld.value}
                {pld.dataKey === 'yoy' ? '%' : ''}
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

// --- VISTE APPLICATIVE ---

const DonutChartWithStats = ({ dataKey, platformName }: { dataKey: string, platformName: string }) => {
    const enrichedData = CLUSTER_DATA_UPDATED.map(item => {
        let specificYoY = item.yoy;
        if (platformName === 'TikTok') {
            const volumeFactor = item.tiktok > 5000 ? 1 : -0.5;
            specificYoY = Math.round(item.yoy + (25 * volumeFactor)); 
        } else if (platformName === 'Amazon') {
             const volumeFactor = item.amazon > 5000 ? 0.5 : -0.8;
             specificYoY = Math.round(item.yoy + (15 * volumeFactor));
        }
        const grandTotal = item.google + item.tiktok + item.amazon;
        const totalShare = ((grandTotal > 0 ? (item[dataKey as keyof typeof item] as number) / grandTotal : 0) * 100).toFixed(2);
        return { ...item, specificYoY, totalShare };
    });

    const sortedByVolume = [...enrichedData].sort((a: any, b: any) => (b[dataKey as keyof typeof b] as number) - (a[dataKey as keyof typeof a] as number));
    const sortedByTrend = [...enrichedData].sort((a, b) => b.specificYoY - a.specificYoY);
    const topGrowers = sortedByTrend.slice(0, 3);
    const topDecliners = sortedByTrend.slice(-3).reverse();

    return (
      <div className="flex flex-col h-full">
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
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
             <div className="text-xl font-bold text-white">{sortedByVolume.length}</div>
             <div className="text-[9px] text-slate-400 uppercase tracking-widest">Clusters</div>
          </div>
        </div>
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

// --- VIEW 1: MARKET ---
const BrandAnalysisView = () => {
  const [selectedMarket, setSelectedMarket] = useState('Italia');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <DemoDataAlert />
      
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Brand Search Google" description="Quota maggioritaria di domanda esplicita.">
            <DonutChartWithStats dataKey="google" platformName="Google" />
        </Card>
        <Card title="Brand Search TikTok" description="Viralità e trend visivi (Discovery).">
            <DonutChartWithStats dataKey="tiktok" platformName="TikTok" />
        </Card>
        <Card title="Brand Search Amazon" description="Intento transazionale (Commodity).">
            <DonutChartWithStats dataKey="amazon" platformName="Amazon" />
        </Card>
      </div>

      <Card 
        title="Market Resonance Comparativa (Tutti i Cluster)" 
        description="Analisi orizzontale dei volumi per piattaforma. Identifica i 'Power Products' che trainano il fatturato e le categorie 'Zombie'."
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
                    <Bar dataKey="amazon" name="Amazon" fill="#fbbf24" radius={[0, 4, 4, 0]} stackId="a" barSize={20}>
                        <LabelList dataKey="yoy" position="right" content={renderYoYLabel} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
         </div>
         <AnalysisGuide>
            <strong>Come leggere questo grafico:</strong> Le barre Gialle (Amazon) indicano prodotti commodity/prezzo. Le barre Rosa (TikTok) sono trend visuali. Le barre Verdi (Google) sono i pilastri del brand.
            <br/>
            <strong>Insight Operativo:</strong> Discrepanza tra Sandali (Google) e Anfibi (TikTok) suggerisce strategie differenziate per canale.
         </AnalysisGuide>
      </Card>
    </div>
  );
};

// --- VIEW 2: FORECAST ---
const SeasonalityView = () => {
  const [keywordsInput, setKeywordsInput] = useState('stivali, sandali, sneakers, borse, anfibi...');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <DemoDataAlert />
       <div className="flex flex-col md:flex-row justify-between md:items-end mb-4 gap-4">
          <div>
              <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                  <Clock className="w-6 h-6 mr-3 text-teal-400" />
                  Seasonality Forecast
              </h2>
              <p className="text-slate-400 text-sm mt-1">Confronto volumi YoY (Quest'anno vs Scorso Anno) diviso per piattaforma.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex flex-wrap items-center gap-4 text-xs">
                 <div className="flex items-center"><div className="w-3 h-0.5 bg-teal-400 mr-2"></div>Google</div>
                 <div className="flex items-center"><div className="w-3 h-0.5 bg-pink-400 mr-2"></div>TikTok</div>
                 <div className="flex items-center"><div className="w-3 h-0.5 bg-amber-400 mr-2"></div>Amazon</div>
                 <div className="flex items-center"><div className="w-3 h-0.5 border-t border-dashed border-slate-500 mr-2"></div>Last Year</div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-6">
             <Card 
                title="Forecast & YoY Comparison"
                description="Linee continue = Anno Corrente. Linee tratteggiate = Anno Precedente. Osserva come TikTok (Rosa) tenda ad anticipare i trend di ricerca Google (Verde)."
             >
                <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SEASONALITY_BASE} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 13, fontWeight: 700, dy: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '11px'}} />
                        
                        {/* Google */}
                        <Line type="monotone" dataKey="google" name="Google (Current)" stroke="#2dd4bf" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="google_prev" name="Google (Last Year)" stroke="#2dd4bf" strokeWidth={1} strokeDasharray="5 5" dot={false} strokeOpacity={0.5} />
                        
                        {/* TikTok */}
                        <Line type="monotone" dataKey="tiktok" name="TikTok" stroke="#f472b6" strokeWidth={3} dot={false} />
                        
                        {/* Amazon */}
                        <Line type="monotone" dataKey="amazon" name="Amazon" stroke="#fbbf24" strokeWidth={3} dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Snapshot Mensile (Sostituisce Market Velocity) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-t border-white/5 pt-4">
                     <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                        <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Growth Velocity Index</div>
                        <div className="text-2xl font-bold text-emerald-400">+12.5%</div>
                        <div className="text-[10px] text-slate-400">vs Mese Precedente</div>
                     </div>
                     <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                        <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Top Mover (Mese)</div>
                        <div className="text-lg font-bold text-white">Stivali</div>
                        <div className="text-[10px] text-teal-400 font-bold">+150% Vol.</div>
                     </div>
                     <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                        <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Peak Prediction</div>
                        <div className="text-lg font-bold text-white">Novembre</div>
                        <div className="text-[10px] text-slate-400">Black Friday</div>
                     </div>
                </div>

                <AnalysisGuide>
                    <strong>Lettura Dati:</strong> Il confronto YoY (linea tratteggiata) mostra se stiamo battendo lo storico. Notiamo che TikTok (Rosa) ha picchi anticipati rispetto a Google: la fase di "Discovery" avviene sui social circa 30 giorni prima della ricerca transazionale.
                </AnalysisGuide>
             </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
             <Card title="Imposta Keyword Set">
                <p className="text-xs text-slate-400 mb-3">Inserisci le keyword separate da virgola per generare il forecast personalizzato.</p>
                <textarea 
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-slate-300 focus:ring-1 focus:ring-teal-500 placeholder-slate-600 mb-3 h-48 resize-none leading-relaxed custom-scrollbar"
                ></textarea>
                <button className="w-full bg-teal-600 hover:bg-teal-500 text-slate-900 font-bold py-2 rounded-lg transition-colors text-sm">
                    Genera Forecast
                </button>
             </Card>
             <InsightBox title="Insight Piattaforme">
                La stagionalità Amazon è molto più "appuntita" (spike violenti) su eventi come Prime Day (Lug) e Black Friday (Nov). Google ha curve più morbide.
             </InsightBox>
          </div>
       </div>
    </div>
  );
};

// --- VIEW 3: HERO PRODUCT ---
const HeroProductView = () => {
  const heroProduct = CLUSTER_DATA_UPDATED[0]; // Sandali Gioiello
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <DemoDataAlert />
        <div className="flex justify-between items-start">
             <div>
                <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                    <Target className="w-6 h-6 mr-3 text-teal-400" />
                    Hero Product Deep Dive
                </h2>
                <p className="text-slate-400 text-sm mt-1">Focus: <span className="text-teal-400 font-bold uppercase">{heroProduct.name}</span>.</p>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
                <Card title="Performance Matrix (Radar)" description="Confronto qualitativo tra il nostro Hero Product (Verde) e il Competitor Diretto (Rosa). Un'area più ampia indica una performance complessiva migliore.">
                   <div className="h-[400px] w-full flex justify-center items-center">
                        <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={HERO_MATRIX_DATA}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar name="CafèNoir" dataKey="A" stroke="#2dd4bf" strokeWidth={2} fill="#2dd4bf" fillOpacity={0.4} />
                            <Radar name="Competitor B" dataKey="B" stroke="#f472b6" strokeWidth={2} fill="#f472b6" fillOpacity={0.2} />
                            <Legend />
                            <Tooltip content={<CustomTooltip />} />
                        </RadarChart>
                        </ResponsiveContainer>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                        <div className="bg-teal-500/10 p-2 rounded border border-teal-500/20">
                            <div className="text-xs text-teal-300 font-bold">Punto di Forza</div>
                            <div className="text-sm text-white">Price Competitiveness</div>
                        </div>
                        <div className="bg-pink-500/10 p-2 rounded border border-pink-500/20">
                            <div className="text-xs text-pink-300 font-bold">Area Critica</div>
                            <div className="text-sm text-white">Social Sentiment</div>
                        </div>
                   </div>
                </Card>
            </div>

            <div className="lg:col-span-5 space-y-6">
                 <Card title="Analisi Competitiva">
                    <div className="space-y-4">
                    {COMPETITORS_HERO.map((comp, i) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                            <div>
                                <div className="font-bold text-white text-sm">{comp.name}</div>
                                <div className="text-xs text-slate-500 mt-1">Prezzo: <span className="text-slate-300">€{comp.mainProductPrice}</span></div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-500">SoV</div>
                                <div className="text-lg font-mono font-bold text-teal-400">{comp.shareOfVoice}%</div>
                            </div>
                        </div>
                    ))}
                    </div>
                </Card>
                <InsightBox title="Strategy Action">
                   Il grafico radar mostra che, sebbene il prezzo sia competitivo, il <strong>Sentiment Social</strong> è inferiore al competitor. È necessario investire in campagne Influencer per migliorare la percezione "Trend Fit".
                </InsightBox>
            </div>
        </div>
    </div>
  );
};

// --- VIEW 4: AI NODES (Rifatta completamente) ---
const AINodesView = () => {
  const [selectedLLM, setSelectedLLM] = useState('All');
  
  const filteredNodes = selectedLLM === 'All' 
    ? AI_FAN_OUT_DATA 
    : AI_FAN_OUT_DATA.filter(node => node.llm === selectedLLM);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <DemoDataAlert />
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                <BrainCircuit className="w-6 h-6 mr-3 text-teal-400" />
                Query Fan Out (AI Analysis)
            </h2>
            <p className="text-slate-400 text-sm mt-1">Esplorazione semantica generata da LLM (GPT-4, Gemini, Claude).</p>
         </div>
         <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10">
            {['All', 'GPT-4', 'Gemini', 'Claude'].map(llm => (
                <button
                    key={llm}
                    onClick={() => setSelectedLLM(llm)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${selectedLLM === llm ? 'bg-teal-500 text-slate-900' : 'text-slate-400 hover:text-white'}`}
                >
                    {llm}
                </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Pannello Sentiment Generale */}
         <div className="lg:col-span-1">
             <Card title="Overall Sentiment Distribution" className="h-full">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={AI_SENTIMENT_SUMMARY} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                                {AI_SENTIMENT_SUMMARY.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '11px'}} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg text-xs text-slate-400 leading-relaxed">
                    L'analisi aggregata degli LLM mostra una prevalenza di intenti <strong>Transazionali</strong> (Verde), indicando che il brand è percepito come pronto all'acquisto.
                </div>
             </Card>
         </div>

         {/* Lista Nodi Filtrabile */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
             {filteredNodes.map(node => (
                 <div key={node.id} className="glass p-4 rounded-xl border border-white/5 hover:border-teal-500/30 transition-all group">
                     <div className="flex justify-between items-start mb-2">
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            node.llm === 'GPT-4' ? 'bg-emerald-500/10 text-emerald-400' :
                            node.llm === 'Gemini' ? 'bg-blue-500/10 text-blue-400' :
                            'bg-orange-500/10 text-orange-400'
                        }`}>
                            {node.llm}
                        </div>
                        <div className="flex items-center text-[10px] text-slate-500">
                            <Zap className="w-3 h-3 mr-1 text-yellow-400" /> {node.confidence}% Conf.
                        </div>
                     </div>
                     <h4 className="text-sm font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{node.term}</h4>
                     <div className="flex justify-between items-end mt-3 border-t border-white/5 pt-3">
                         <span className="text-xs text-slate-400 flex items-center"><Layers className="w-3 h-3 mr-1" /> {node.category}</span>
                         <span className="text-xs font-mono text-teal-400 font-bold bg-teal-500/10 px-2 py-1 rounded">{node.sentiment}</span>
                     </div>
                 </div>
             ))}
         </div>
      </div>
      
      <AnalysisGuide>
         Usa i filtri in alto per vedere come diversi modelli AI interpretano il brand. Gemini tende a suggerire query comparative, GPT-4 query transazionali.
      </AnalysisGuide>
    </div>
  );
};

// --- VIEW 5: GSC DEEP DIVE ---
const GSCView = () => {
    return (
  <div className="space-y-6 animate-in fade-in duration-500">
      <DemoDataAlert />
      <div className="flex justify-between items-start">
         <div>
             <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                <Search className="w-6 h-6 mr-3 text-teal-400" />
                Organic Search Performance
             </h2>
             <p className="text-slate-400 text-sm mt-1">Analisi GSC Brand vs Generic.</p>
         </div>
         <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-lg transition-all">
            <LinkIcon className="w-4 h-4" />
            <span className="text-xs font-bold">GSC Connected</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Generic vs Branded Traffic" description="Split del traffico organico. I grafici non sforano più la visuale.">
                <div className="h-[300px] w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{name: 'Traffic', Brand: 12500, Generic: 3200}]} margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" label={{ value: 'Clicks', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="Brand" fill="#2dd4bf" barSize={50} />
                            <Bar dataKey="Generic" fill="#f472b6" barSize={50} />
                        </BarChart>
                     </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-400 px-4">
                    <span>Branded Clicks: <strong>12.5K</strong></span>
                    <span>Generic Clicks: <strong>3.2K</strong></span>
                </div>
          </Card>

          <Card title="Top YoY Movers" description="Cluster con maggiore variazione di clic rispetto all'anno scorso.">
             <div className="h-[300px] overflow-y-auto custom-scrollbar pr-2">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-slate-500 border-b border-white/10">
                            <th className="py-2">Cluster</th>
                            <th className="py-2 text-right">YoY Delta</th>
                            <th className="py-2 text-right">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {YOY_COMPARISON_DATA.sort((a,b) => b.delta - a.delta).map((row, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="py-2.5 text-xs text-white font-medium">{row.cluster}</td>
                                <td className={`py-2.5 text-xs font-bold font-mono text-right ${row.delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {row.delta > 0 ? '+' : ''}{row.delta}%
                                </td>
                                <td className="py-2.5 text-right">
                                    {row.delta > 0 ? <TrendingUp className="w-4 h-4 text-emerald-500 ml-auto" /> : <TrendingDown className="w-4 h-4 text-red-500 ml-auto" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </Card>
      </div>

      <AnalysisGuide>
        Il grafico a barre mostra una dipendenza eccessiva dal traffico Branded (Verde). L'obiettivo SEO dovrebbe essere incrementare la barra Rosa (Generic) lavorando su cluster come "Scarpe Donna" o "Stivali Pelle".
      </AnalysisGuide>
  </div>
);
};

// --- LAYOUT PRINCIPALE ---

const App = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  interface NavItemProps {
    id: string;
    icon: React.ElementType;
    label: string;
  }

  const NavItem = ({ id, icon: Icon, label }: NavItemProps) => (
    <button 
      onClick={() => {
        setActiveTab(id);
        setMobileMenuOpen(false);
      }}
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
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                <div className="relative w-72 h-full bg-slate-950 border-r border-white/10 p-6 shadow-2xl animate-in slide-in-from-left duration-200">
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <div className="mb-8 mt-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gradient-to-br from-teal-400 to-emerald-600 p-2 rounded-lg shadow-lg shadow-teal-500/20">
                                <Hexagon className="w-6 h-6 text-white fill-white/10" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 block leading-none">BRAND<br/><span className="text-teal-400">HORIZON.AI</span></span>
                            </div>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <NavItem id="market" icon={PieChartIcon} label="Brand Market Share" />
                        <NavItem id="forecast" icon={Clock} label="Seasonality Forecast" />
                        <NavItem id="hero" icon={Target} label="Hero Product Deep Dive" />
                        <NavItem id="ainodes" icon={BrainCircuit} label="AI Semantic Expansion" />
                        <NavItem id="gsc" icon={Search} label="Organic Performance" />
                    </nav>
                </div>
            </div>
        )}

        {/* Sidebar Desktop */}
        <aside className="w-72 glass-strong hidden md:flex flex-col fixed h-full z-20 border-r border-white/5 bg-slate-950">
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
                    Market Intelligence Suite for Retail Leaders.
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
            <div className="absolute top-0 left-0 w-full h-[500px] bg-teal-900/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] pointer-events-none"></div>

            <header className="glass-strong sticky top-0 z-10 border-b border-white/5 backdrop-blur-md">
            <div className="px-4 py-4 md:px-8 md:py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Hamburger Button for Mobile */}
                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                            <span className="hidden sm:inline">Dashboard</span>
                            <ChevronRight className="w-3 h-3 hidden sm:inline" />
                            <span className="text-teal-400 font-medium">
                                {activeTab === 'market' ? 'Cluster Analysis' : 
                                activeTab === 'ainodes' ? 'AI Query Expansion' :
                                activeTab === 'forecast' ? 'Seasonal Trends' :
                                activeTab === 'hero' ? 'Product Strategy' :
                                'Organic Search'}
                            </span>
                        </div>
                        <h1 className="text-lg md:text-xl font-bold text-white capitalize flex items-center tracking-tight truncate max-w-[200px] sm:max-w-none">
                            {activeTab === 'market' && <PieChartIcon className="w-5 h-5 mr-3 text-teal-400 hidden sm:block" />}
                            {activeTab === 'ainodes' && <BrainCircuit className="w-5 h-5 mr-3 text-teal-400 hidden sm:block" />}
                            {activeTab === 'forecast' && <Clock className="w-5 h-5 mr-3 text-teal-400 hidden sm:block" />}
                            {activeTab === 'hero' && <Target className="w-5 h-5 mr-3 text-teal-400 hidden sm:block" />}
                            {activeTab === 'gsc' && <Search className="w-5 h-5 mr-3 text-teal-400 hidden sm:block" />}
                            {activeTab === 'market' ? 'Analisi Cluster Brand' : 
                            activeTab === 'ainodes' ? 'Query Fan Out' :
                            activeTab === 'forecast' ? 'Seasonality & Trends' :
                            activeTab === 'hero' ? 'Hero Product Study' :
                            'Organic Search Performance'}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-6">
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-all text-xs font-bold mr-2 md:mr-4"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{copied ? 'Link Copiato!' : 'Condividi Tool'}</span>
                    </button>
                    <div className="hidden sm:flex items-center space-x-2 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest font-bold">API Connected</span>
                    </div>
                </div>
            </div>
            </header>
            
            <div className="p-4 md:p-8 max-w-[1600px] mx-auto relative z-0 flex-1 w-full">
            {renderContent()}
            </div>

            <footer className="border-t border-white/5 bg-slate-950 py-8 md:py-12 px-4 md:px-8 mt-12">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <div className="mb-6">
                        <Hexagon className="w-6 h-6 text-teal-500 mx-auto opacity-50 mb-4" />
                        <p className="text-sm text-slate-400 leading-relaxed text-balance">
                            Brand Horizon.ai è la suite di <strong>Market Intelligence Predittiva</strong> progettata per Marketing Manager che devono anticipare i trend.
                        </p>
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
