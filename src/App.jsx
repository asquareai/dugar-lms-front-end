import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, LayoutDashboard, Bell, AlertCircle, 
  CheckSquare, Wallet, TrendingUp, CircleDot, Zap, ArrowUpRight,
  Clock, History, ShieldCheck, Activity, MessageSquare, ClipboardCheck, 
  HandCoins, HelpCircle, Users, User
} from 'lucide-react';

// Import Recharts
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area, Legend 
} from 'recharts';

// Components
import Login from './pages/Login';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';
import PartyCodeModify from './pages/Credit/Masters/PartyCodeModify';
import ContractGrid from './pages/credit/transaction/contract/ContractGrid';
import ContractEditForm from './pages/credit/transaction/contract/ContractEditForm.jsx';
import ReceiptVoucher from './pages/accounts/transactions/ReceiptVoucher';
import Ratios from './pages/accounts/reports/ratios.jsx';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// 1. THE ENHANCED DUAL-PANE SHELL
const MainDashboardLayout = () => {
  const [isPropBoxOpen, setIsPropBoxOpen] = useState(true);
  const savedUser = localStorage.getItem('user');
  const userData = savedUser ? JSON.parse(savedUser) : null;
  const location = useLocation();
  const navigate = useNavigate();

  const isFullScreenForm = location.pathname.includes('/contract/form') || 
                           location.pathname.includes('/receipt');

  const calibriBlackStyle = { 
    fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
    color: '#000000' 
  };

  return (
    <div style={calibriBlackStyle} className="h-screen bg-[#F0F2F5] flex flex-col overflow-hidden">
      {!isFullScreenForm && (
        <TopNavbar menuTree={userData?.menuTree || []} userData={userData} />
      )}

      {isFullScreenForm && (
        <div className="bg-white border-b border-black/60 px-4 py-2 flex items-center shadow-sm z-[110]">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[14px] font-bold text-blue-900 hover:text-blue-700 transition-colors uppercase tracking-tight"
          >
            <ChevronLeft size={18} strokeWidth={3} /> Back to Dashboard
          </button>
          <div className="h-4 w-[1px] bg-black/20 mx-4"></div>
          <span className="text-[12px] font-bold text-black/40 uppercase tracking-widest">
            Focused Entry Mode
          </span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out bg-[#F0F2F5]">
          <div className={`w-full h-full ${isFullScreenForm ? 'p-0' : 'p-6'}`}>
            <div className={`${isFullScreenForm ? 'bg-transparent' : 'p-8 bg-white rounded-2xl border border-gray-300 shadow-xl'} min-h-full`}>
              <Outlet /> 
            </div>
          </div>
        </main>

        {!isFullScreenForm && (
          <>
            <button 
              onClick={() => setIsPropBoxOpen(!isPropBoxOpen)}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 shadow-lg p-2 rounded-l-xl hover:bg-blue-50 text-black transition-all duration-300 ${
                isPropBoxOpen ? 'mr-80' : 'mr-0'
              }`}
            >
              {isPropBoxOpen ? <ChevronRight size={20} strokeWidth={3} /> : <ChevronLeft size={20} strokeWidth={3} />}
            </button>

            <aside 
              className={`bg-white border-l border-gray-300 flex flex-col transition-all duration-500 ease-in-out overflow-hidden shrink-0 ${
                isPropBoxOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="w-80 flex flex-col h-full bg-gray-50/50" style={{ fontFamily: 'Calibri, sans-serif' }}>
                <div className="p-6 border-b border-gray-300 flex items-center justify-between bg-white sticky top-0 z-10">
                  <h3 className="font-bold text-black text-[14px] uppercase tracking-wider flex items-center gap-2">
                    <Zap size={16} className="text-[#0052CC]" />
                    Module Intelligence
                  </h3>
                  <Activity size={16} className="text-emerald-600 animate-pulse" />
                </div>
                
                <div className="p-5 space-y-8 overflow-y-auto custom-scrollbar">
                  <section>
                    <p className="text-[12px] font-bold text-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ClipboardCheck size={14} className="text-[#0052CC]" /> Operational Backlog
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-sm hover:border-blue-400 transition-colors">
                        <p className="text-2xl font-bold text-black leading-none">14</p>
                        <p className="text-[11px] font-bold text-black uppercase mt-2 leading-tight">Vouchers for Auth</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-sm hover:border-blue-400 transition-colors">
                        <p className="text-2xl font-bold text-black leading-none">08</p>
                        <p className="text-[11px] font-bold text-black uppercase mt-2 leading-tight">Pending Disb.</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-sm hover:border-rose-400 transition-colors">
                        <p className="text-2xl font-bold text-black">03</p>
                        <p className="text-[11px] font-bold text-black uppercase mt-2 leading-tight">Grievances</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-sm hover:border-amber-400 transition-colors">
                        <p className="text-2xl font-bold text-black">05</p>
                        <p className="text-[11px] font-bold text-black uppercase mt-2 leading-tight">Dept. Requests</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <p className="text-[12px] font-black text-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckSquare size={14} className="text-[#7C3AED]" /> Task Management
                    </p>
                    <div className="space-y-3">
                      {[
                        { task: "Complete KYC Audit for case 14235", priority: "High Priority" },
                        { task: "Collect bank statement for case 14531", priority: "Medium Priority" },
                        { task: "Update contact details for case 14600", priority: "Low Priority" }
                      ].map((item, i) => {
                        const getPriorityStyles = (p) => {
                          if (p === 'High Priority') return 'bg-rose-600 text-white border-rose-700';
                          if (p === 'Medium Priority') return 'bg-[#0052CC] text-white border-[#003D99]';
                          return 'bg-[#059669] text-white border-emerald-700';
                        };

                        return (
                          <div key={i} className="p-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-center mb-2">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityStyles(item.priority)}`}>
                                {item.priority}
                              </span>
                              <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200">
                                <button className="px-2 py-0.5 text-[10px] font-black uppercase rounded-sm bg-white text-blue-700 shadow-sm border border-slate-200">
                                  Received
                                </button>
                                <button className="px-2 py-0.5 text-[10px] font-black uppercase rounded-sm text-slate-500 hover:text-black transition-colors">
                                  Sent
                                </button>
                              </div>
                            </div>
                            <p className="text-[13px] font-bold text-black leading-tight">
                              {item.task}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
      <Footer userData={userData} />
    </div>
  );
};

// 2. WELCOME DASHBOARD
const WelcomeDashboard = () => {
  const branchData = [
    { name: 'Jaipur', loans: 450, aum: 120 },
    { name: 'Chennai', loans: 320, aum: 85 },
    { name: 'Amravathi', loans: 210, aum: 55 },
    { name: 'Salem', loans: 380, aum: 95 },
  ];
  const COLORS = ['#0052CC', '#059669', '#D97706', '#7C3AED'];
  const disbursementData = [
    { d: '1', v: 10 }, { d: '5', v: 32 }, { d: '10', v: 25 }, 
    { d: '15', v: 48 }, { d: '20', v: 35 }, { d: '25', v: 62 }, { d: '30', v: 55 }
  ];
  
const metrics = [
  { 
    label: 'NPA Percentage', 
    count: '2.45%', 
    icon: <AlertCircle size={18} />, 
    // bg-[#0052CC]/15 creates a light blue tint
    bg: 'bg-[#0052CC]/65 border-[#0052CC]/30 text-[#0052CC]', 
    trend: '-0.2%' 
  },
  { 
    label: 'Litigation Cases', 
    count: '42', 
    icon: <CheckSquare size={18} />, 
    // bg-[#D97706]/15 creates a light amber tint
    bg: 'bg-[#D97706]/65 border-[#D97706]/30 text-[#D97706]', 
    trend: '+2' 
  },
  { 
    label: 'Repo Inventory', 
    count: '18', 
    icon: <Wallet size={18} />, 
    // bg-[#059669]/15 creates a light emerald tint
    bg: 'bg-[#059669]/65 border-[#059669]/30 text-[#059669]', 
    trend: 'Stable' 
  },
  { 
    label: 'Average IRR', 
    count: '14.8%', 
    icon: <TrendingUp size={18} />, 
    // bg-[#7C3AED]/15 creates a light purple tint
    bg: 'bg-[#7C3AED]/65 border-[#7C3AED]/30 text-[#7C3AED]', 
    trend: '+0.5%' 
  },
];

  // Modified Custom Legend: Vertical placement for side display
  // Modified Custom Legend: Single-line label and data for side display
const CustomPieLegend = ({ payload }) => {
  return (
    <div className="flex flex-col gap-2 pl-4 border-l border-gray-100 h-full justify-center">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2 group">
          {/* Circular Indicator */}
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          
          {/* Label and Data in Single Line */}
          <div className="flex items-center justify-between w-full gap-4">
            <span className="text-[11px] font-black text-black uppercase tracking-tighter truncate">
              {entry.value}
            </span>
            <span className="text-[11px] font-black text-blue-700 tabular-nums">
              {entry.payload.aum}L
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Update the Pie Component within WelcomeDashboard to use this legend
<div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-md">
  <h3 className="text-[14px] font-bold text-black uppercase tracking-widest mb-6 flex items-center gap-2">
    <CircleDot size={14} className="text-[#059669]" /> AUM Mix (Cr)
  </h3>
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={branchData} 
          innerRadius={55} 
          outerRadius={75} 
          paddingAngle={8} 
          dataKey="aum"
          nameKey="name"
          cx="35%" // Shifted slightly more to the left for a cleaner single-line legend on the right
        >
          {branchData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }} 
        />
        <Legend 
          content={<CustomPieLegend />} 
          layout="vertical" 
          verticalAlign="middle" 
          align="right" 
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Enterprise</h2>
            <div className="h-8 w-[2px] bg-blue-200 rotate-[20deg]"></div>
            <span className="bg-blue-600 text-white px-3 py-0.5 rounded text-[12px] font-bold tracking-[0.2em]">OVERVIEW</span>
          </div>
          <p className="text-xs font-bold text-black uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Data: All Branches
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded-2xl px-6 border border-gray-300 text-right">
          <p className="text-[10px] font-bold text-black uppercase leading-none mb-1">Business Date</p>
          <p className="text-lg font-bold text-black tracking-tight">10 APR 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className={`relative overflow-hidden p-6 rounded-3xl transition-all duration-500 hover:-translate-y-1 group shadow-xl ${m.bg}`}>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl shadow-lg">{m.icon}</div>
                <span className="text-[24px] font-bold px-2.5 py-1 rounded bg-black/20 text-white border border-white/10">{m.trend}</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1 tracking-tight">{m.count}</p>
              <p className="text-[24px] font-bold text-white uppercase tracking-[0.1em]">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-md">
          <h3 className="text-[24px] font-bold text-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <LayoutDashboard size={24} className="text-[#0052CC]" /> Active Loans (4350)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData}>
                <XAxis dataKey="name" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tick={{ fill: '#000' }} interval={0} />
                <Tooltip cursor={{ fill: '#f8f9fa' }} />
                <Bar 
                  dataKey="loans" 
                  fill="#0052CC" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                  label={{ position: 'top', fill: '#000', fontSize: 10, fontWeight: 'bold' }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART WITH RIGHT-SIDE LEGEND */}
        <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-md">
           <h3 className="text-[24px] font-bold text-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <CircleDot size={14} className="text-[#059669]" /> AUM (300 Cr)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={branchData} 
                  innerRadius={50} 
                  outerRadius={75} 
                  paddingAngle={8} 
                  dataKey="aum"
                  nameKey="name"
                  cx="40%" // Shift pie to the left to make room for right-side legend
                >
                  {branchData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip />
                <Legend 
                  content={<CustomPieLegend />} 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right" 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-md">
           <h3 className="text-[24px] font-bold text-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#D97706]" /> Disbursement MTD (5 Cr)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={disbursementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="d" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tick={{fill: '#000'}} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="v" 
                  stroke="#0052CC" 
                  strokeWidth={4} 
                  fill="#0052CC" 
                  fillOpacity={0.1}
                  label={{ fill: '#0052CC', fontSize: 10, fontWeight: 'bold', offset: 10 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><MainDashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<WelcomeDashboard />} />
          <Route path="/credit/masters/party-code" element={<PartyCodeModify />} />
          <Route path="/credit/trans/contract/edit" element={<ContractGrid />} />
          <Route path="/credit/trans/contract/form" element={<ContractEditForm />} />
          <Route path="/accounts/trans/voucher/receipt" element={<ReceiptVoucher />} />
          <Route path="/accounts/reports/ratios" element={<Ratios />} />
          <Route path="*" element={<div className="p-20 text-center"><h2 className="text-2xl font-bold text-black">404: Module Not Found</h2></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;