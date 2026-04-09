import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this at top
import { 
  Search, Edit2, Filter, Car, Briefcase, Home, ShieldCheck, 
  Users, ChevronRight, Calendar, CreditCard, Fingerprint, Database
} from 'lucide-react';

const ContractGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const contracts = [
    { id: '100254', customer: 'Ramesh Krishnan', type: 'Vehicles', date: '07 Apr 2026', amount: '₹8,50,000', category: 'A', risk: 'Low', source: 'LOS Portal' },
    { id: '100255', customer: 'Sri Vari Textiles', type: 'MSME', date: '06 Apr 2026', amount: '₹25,00,000', category: 'B', risk: 'Medium', source: 'LOS API' },
    { id: '100256', customer: 'Anitha Raghavan', type: 'LAP', date: '06 Apr 2026', amount: '₹45,00,000', category: 'A', risk: 'Low', source: 'LOS Mobile' },
    { id: '100257', customer: 'Metro Logistics', type: 'Business Loans', date: '05 Apr 2026', amount: '₹15,00,000', category: 'C', risk: 'High', source: 'LOS External' },
    { id: '100258', customer: 'Karthik Exports', type: 'Collateral', date: '05 Apr 2026', amount: '₹60,00,000', category: 'A', risk: 'Low', source: 'LOS Branch' },
    { id: '100259', customer: 'Selvam Transport', type: 'Vehicles', date: '04 Apr 2026', amount: '₹12,00,000', category: 'B', risk: 'Medium', source: 'LOS Portal' },
    { id: '100260', customer: 'Zenith Tech', type: 'MSME', date: '04 Apr 2026', amount: '₹30,00,000', category: 'A', risk: 'Low', source: 'LOS API' },
    { id: '100261', customer: 'Priya Groceries', type: 'Business Loans', date: '03 Apr 2026', amount: '₹5,50,000', category: 'C', risk: 'Medium', source: 'LOS Mobile' },
    { id: '100262', customer: 'Vijay Travels', type: 'Vehicles', date: '03 Apr 2026', amount: '₹18,00,000', category: 'B', risk: 'High', source: 'LOS Portal' },
    { id: '100263', customer: 'Mohamed Ali', type: 'LAP', date: '02 Apr 2026', amount: '₹35,00,000', category: 'A', risk: 'Low', source: 'LOS Branch' },
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Vehicles': return <Car size={14} className="text-black" />;
      case 'MSME': return <Briefcase size={14} className="text-black" />;
      case 'LAP': return <Home size={14} className="text-black" />;
      case 'Business Loans': return <Users size={14} className="text-black" />;
      case 'Collateral': return <ShieldCheck size={14} className="text-black" />;
      default: return <CreditCard size={14} className="text-black" />;
    }
  };

  const getRiskBadge = (risk) => {
    switch(risk) {
      case 'High': return 'border-red-600 text-red-700 bg-red-50';
      case 'Medium': return 'border-amber-600 text-amber-700 bg-amber-50';
      case 'Low': return 'border-emerald-600 text-emerald-700 bg-emerald-50';
      default: return 'border-slate-600 text-black';
    }
  };

  return (
    <div className="w-full bg-[#E5E7EB] min-h-screen" style={{ fontFamily: 'Calibri, Candara, Segoe UI, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-400 px-8 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-normal text-black tracking-tight flex items-center gap-3">
            Contracts Received From LOS
            <span className="text-[12px] font-normal text-black border-l border-slate-400 pl-3">
              Total Queue: {contracts.length}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={15} />
            <input 
              type="text"
              placeholder="Search Proposal ID..."
              className="pl-10 pr-4 py-1.5 bg-white border border-slate-400 rounded text-sm text-black focus:ring-1 focus:ring-black w-64 lg:w-80 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-400 rounded text-sm font-normal text-black hover:bg-slate-100 transition-colors">
            <Filter size={14} /> Filter Queue
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5">
          {contracts.map((contract) => (
            <div key={contract.id} className="bg-white border border-slate-400 rounded shadow-sm hover:border-black transition-all group flex flex-col relative overflow-hidden">
              
              <div className="px-5 py-3 border-b border-slate-400 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2 text-black font-normal text-sm uppercase tracking-wide">
                  {getTypeIcon(contract.type)}
                  {contract.type}
                </div>
                <div className="text-[11px] font-normal text-black flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-400">
                  CAT: <span className="font-semibold">{contract.category}</span>
                </div>
              </div>

              <div className="p-5 flex-1">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1.5 text-black">
                    <Fingerprint size={12} />
                    <span className="text-[12px] font-normal tracking-tight">{contract.id}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${getRiskBadge(contract.risk)}`}>
                    {contract.risk}
                  </span>
                </div>
                
                <h3 className="text-[16px] font-semibold text-black truncate mb-1 leading-tight border-b border-transparent hover:border-black cursor-pointer inline-block">
                  {contract.customer}
                </h3>
                
                <div className="flex items-center gap-2 mt-3 mb-4">
                  <Database size={12} className="text-black" />
                  <p className="text-[12px] text-black font-normal">
                    Source System: <span className="font-semibold">LOS</span>
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-black" />
                      <span className="text-[12px] font-normal text-black uppercase tracking-tighter">Proposal Amount</span>
                    </div>
                    <span className="text-[14px] font-semibold text-black">{contract.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-black" />
                      <span className="text-[12px] font-normal text-black uppercase tracking-tighter">Receipt Date</span>
                    </div>
                    <span className="text-[12px] font-normal text-black">{contract.date}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => navigate('/credit/transaction/contract/form')} className="w-full bg-white py-2.5 flex items-center justify-center gap-2 text-[12px] font-normal text-black border-t border-slate-400 group-hover:bg-[#0052CC] group-hover:text-white transition-all">
                <Edit2 size={13} />
                Process Contract
                <ChevronRight size={13} className="ml-1 opacity-50" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractGrid;