import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, LayoutDashboard, Info, Bell, AlertCircle, 
  ArrowUpRight, CheckSquare, Wallet, Clock, MessageSquare, Calendar, Timer, TrendingUp,
  CircleDot, Zap
} from 'lucide-react';

// Components
import Login from './pages/Login';
import TopNavbar from './components/TopNavbar';
import Footer from './components/Footer';

// Pages
import PartyCodeModify from './pages/Credit/Masters/PartyCodeModify';
import ContractGrid from './pages/credit/transaction/contract/ContractGrid';
import ContractEditForm from './pages/credit/transaction/contract/ContractEditForm.jsx';
import ReceiptVoucher from './pages/accounts/transactions/ReceiptVoucher';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// 1. THE DUAL-PANE SHELL (Enhanced Module Intelligence Sidebar)
const MainDashboardLayout = () => {
  const [isPropBoxOpen, setIsPropBoxOpen] = useState(true);
  const savedUser = localStorage.getItem('user');
  const userData = savedUser ? JSON.parse(savedUser) : null;
  const location = useLocation();

  const isFullScreenForm = location.pathname.includes('/contract/form') || 
                           location.pathname.includes('/receipt');

  return (
    <div className="h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-hidden">
      <TopNavbar menuTree={userData?.menuTree || []} userData={userData} />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out bg-[#F0F2F5]">
          <div className={`w-full h-full ${isFullScreenForm ? 'p-0' : 'p-4 lg:p-6'}`}>
            <div className={`${isFullScreenForm ? 'bg-transparent p-0' : 'p-6 bg-white rounded-xl border border-slate-300 shadow-md'} min-h-full`}>
              <Outlet /> 
            </div>
          </div>
        </main>

        {!isFullScreenForm && (
          <button 
            onClick={() => setIsPropBoxOpen(!isPropBoxOpen)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white border border-slate-300 shadow-md p-1.5 rounded-l-md hover:bg-blue-50 text-slate-600 transition-all duration-500 ${
              isPropBoxOpen ? 'mr-80' : 'mr-0'
            }`}
          >
            {isPropBoxOpen ? <ChevronRight size={18} strokeWidth={3} /> : <ChevronLeft size={18} strokeWidth={3} />}
          </button>
        )}

        {/* ENHANCED ZONE B: MODULE INTELLIGENCE */}
        {!isFullScreenForm && (
          <aside 
            className={`bg-white border-l border-slate-300 flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.02)] transition-all duration-500 ease-in-out overflow-hidden shrink-0 ${
              isPropBoxOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="w-80 flex flex-col h-full overflow-y-auto">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 sticky top-0 z-10">
                <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-[#0052CC]" />
                  Module Intelligence
                </h3>
                <div className="relative">
                   <Bell size={14} className="text-slate-400" />
                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
              </div>
              
              <div className="p-5 space-y-8">
                {/* PART 1: TASKS ASSIGNED QUICK LIST */}
                <section>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckSquare size={12} /> Active Tasks
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "KYC Folio #8821", due: "Today", color: "bg-red-500" },
                      { title: "Voucher #V-901", due: "Tomorrow", color: "bg-orange-500" }
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer transition-all">
                        <CircleDot size={8} className={task.color} />
                        <div>
                          <p className="text-[11px] font-black text-slate-800 leading-none">{task.title}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Target: {task.due}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PART 2: LIVE NOTIFICATIONS */}
                <section>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Bell size={12} /> Notifications
                  </p>
                  <div className="space-y-4">
                    <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 relative">
                      <p className="text-[10px] font-black text-blue-700 leading-tight">Contract CON-2026-001 updated by LOS</p>
                      <p className="text-[9px] text-blue-400 font-bold mt-1">2 mins ago</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <p className="text-[10px] font-black text-slate-700 leading-tight">New Payment Receipt logged for Chennai Branch</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-1">1 hour ago</p>
                    </div>
                  </div>
                </section>

                {/* PART 3: PERFORMANCE METRIC */}
                
              </div>
            </div>
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
};

// 2. ENHANCED WELCOME DASHBOARD (Same as before, synced with sidebar)
const WelcomeDashboard = () => {
  const savedUser = localStorage.getItem('user');
  const userData = savedUser ? JSON.parse(savedUser) : null;

  const metrics = [
    { label: 'New from LOS', count: '08', icon: <ArrowUpRight size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tasks Assigned', count: '05', icon: <CheckSquare size={18} />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Payments Pending', count: '14', icon: <Wallet size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Overdue Folios', count: '02', icon: <AlertCircle size={18} />, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome, <span className="text-[#0052CC]">{userData?.userName || 'Super Admin'}</span>
          </h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">
            System Status: <span className="text-green-600">Online</span> | Branch: <span className="text-slate-900">Chennai South</span>
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">Business Date</p>
          <p className="text-sm font-black text-slate-900">08-Apr-2026</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className={`${m.bg} ${m.color} p-2 rounded-lg`}>{m.icon}</div>
              <TrendingUp size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-2xl font-black text-slate-900">{m.count}</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Wallet size={14} className="text-green-600" /> Payments to be Received
            </h3>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Due Check</span>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { id: 'CON-2026-001', client: 'Ramesh Kumar', amt: '₹ 12,500', date: '08-Apr-2026', status: 'Due Today' },
              { id: 'CON-2026-042', client: 'Sathyamoorthy', amt: '₹ 45,000', date: '09-Apr-2026', status: 'Upcoming' },
              { id: 'CON-2026-089', client: 'Priya Electronics', amt: '₹ 8,200', date: '10-Apr-2026', status: 'Upcoming' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 flex justify-between items-center transition-colors cursor-pointer group">
                <div>
                  <p className="text-xs font-black text-slate-900 group-hover:text-[#0052CC]">{item.client}</p>
                  <p className="text-[10px] text-slate-500 font-bold">{item.id} • <span className="text-blue-600">{item.date}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">{item.amt}</p>
                  <p className={`text-[9px] font-black uppercase ${item.status === 'Due Today' ? 'text-red-500' : 'text-slate-400'}`}>
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare size={14} className="text-[#0052CC]" /> Tasks Assigned
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { msg: "Update KYC for Folio #8821", from: "Admin", sent: "07-Apr 10:30 AM", target: "08-Apr 05:00 PM" },
              { msg: "Verify Payment Voucher #V-901", from: "Accounts", sent: "08-Apr 09:15 AM", target: "09-Apr 11:00 AM" },
            ].map((task, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 space-y-3 cursor-pointer">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-black text-slate-900 leading-tight w-2/3">{task.msg}</p>
                  <span className="text-[9px] bg-blue-100 text-[#0052CC] px-2 py-0.5 rounded font-black uppercase">{task.from}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold">
                  <div className="flex items-center gap-1 text-slate-400"><Calendar size={12} /><span>Sent: {task.sent}</span></div>
                  <div className="flex items-center gap-1 text-orange-600"><Timer size={12} /><span>Target: {task.target}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. DEBUG PAGE
const RouteNotFound = () => {
  const location = useLocation();
  return (
    <div className="p-10 bg-red-50 rounded-xl border border-red-200 text-center">
      <h2 className="text-red-600 font-black text-xl mb-2">Route Mismatch!</h2>
      <p className="font-bold italic text-slate-600">{location.pathname}</p>
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
          <Route path="/credit/transaction/contract/edit" element={<ContractGrid />} />
          <Route path="/credit/transaction/contract/form" element={<ContractEditForm />} />
          <Route path="/accounts/transaction/entry/receipt" element={<ReceiptVoucher />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;