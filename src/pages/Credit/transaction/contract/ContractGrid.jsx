import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Edit2, Filter, Car, Briefcase, Home, ShieldCheck, 
  Users, CreditCard, ChevronRight, Fingerprint, MapPin
} from 'lucide-react';

const ContractGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const contracts = [
    { id: '100254', customer: 'Ramesh Krishnan', type: 'Vehicles', amount: '8,50,000', category: 'A', risk: 'Low', branch: 'Chennai' },
    { id: '100255', customer: 'Sri Vari Textiles', type: 'MSME', amount: '25,00,000', category: 'B', risk: 'Medium', branch: 'Amravathi' },
    { id: '100256', customer: 'Anitha Raghavan', type: 'LAP', amount: '45,00,000', category: 'A', risk: 'Low', branch: 'Jaipur' },
    { id: '100257', customer: 'Metro Logistics', type: 'Business Loans', amount: '15,00,000', category: 'C', risk: 'High', branch: 'Bhilaspur' },
    { id: '100262', customer: 'Vijay Travels', type: 'Vehicles', amount: '18,00,000', category: 'B', risk: 'High', branch: 'Chennai' },
    { id: '100263', customer: 'Mohamed Ali', type: 'LAP', amount: '35,00,000', category: 'A', risk: 'Low', branch: 'Jaipur' },
  ];

  const getTypeIcon = (type) => {
    const iconProps = { size: 14, className: "text-[#0052CC]" };
    switch(type) {
      case 'Vehicles': return <Car {...iconProps} />;
      case 'MSME': return <Briefcase {...iconProps} />;
      case 'LAP': return <Home {...iconProps} />;
      case 'Business Loans': return <Users {...iconProps} />;
      default: return <CreditCard {...iconProps} />;
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'text-red-700 border-red-400 bg-red-50';
      case 'Medium': return 'text-orange-700 border-orange-400 bg-orange-50';
      case 'Low': return 'text-emerald-700 border-emerald-400 bg-emerald-50';
      default: return 'text-black border-black/30';
    }
  };

  return (
    <div className="w-full bg-white min-h-screen" style={{ fontFamily: 'Calibri, sans-serif' }}>
      {/* Sticky Header - Tightened Padding */}
      <div className="bg-white border-b-2 border-black/10 px-4 py-3 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm bg-white/90">
        <h1 className="text-lg font-black text-black tracking-tighter uppercase">
          New Contracts <span className="text-[#0052CC]"> Received From LOS</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 group-focus-within:text-[#0052CC] transition-colors" size={14} />
            <input 
              type="text"
              placeholder="QUICK SEARCH..."
              className="pl-9 pr-3 py-1.5 border-2 border-black/20 rounded-lg text-[13px] focus:border-[#0052CC] w-56 outline-none uppercase font-black transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-1.5 border-2 border-black rounded-lg font-black uppercase text-[11px] hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
            Filter
          </button>
        </div>
      </div>

      {/* Grid Container - 5px Padding as requested */}
      <div className="p-[5px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {contracts.map((contract) => (
            <div 
              key={contract.id} 
              className="group bg-white border-2 border-black/30 rounded-xl transition-all duration-500 flex flex-col hover:border-[#0052CC] hover:shadow-[0_15px_30px_rgba(0,82,204,0.12)]"
            >
              {/* Header Row - Compact */}
              <div className="px-3 py-1.5 flex items-center justify-between border-b border-black/5 bg-slate-50/30">
                <span className="text-[11px] font-black text-black uppercase tracking-widest opacity-60">
                  CAT {contract.category}
                </span>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider shadow-sm ${getRiskColor(contract.risk)}`}>
                  {contract.risk}
                </span>
              </div>

              {/* Body Content - Reduced vertical gap */}
              <div className="px-4 py-3 flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-[16px] font-black text-black truncate group-hover:text-[#0052CC] transition-colors duration-300 leading-tight">
                    {contract.customer}
                  </h3>
                  <span className="text-[15px] font-black text-black tracking-tighter shrink-0">₹{contract.amount}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#0052CC] bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-100/50">
                    <Fingerprint size={11} strokeWidth={3} />
                    <span className="text-[11px] font-black">#{contract.id}</span>
                  </div>
                  <div className="flex items-center gap-1 text-black/80">
                    <MapPin size={11} strokeWidth={3} />
                    <span className="text-[11px] font-black uppercase tracking-tight">{contract.branch}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-1.5 py-0.5 bg-black/5 rounded group-hover:bg-[#0052CC]/5 transition-colors">
                    {getTypeIcon(contract.type)}
                    <span className="text-[10px] font-black text-black uppercase tracking-tight">{contract.type}</span>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="px-4 pb-3">
                <button 
                  onClick={() => navigate('/credit/trans/contract/form')} 
                  className="relative overflow-hidden w-full bg-[#E1EFFF] border-2 border-[#0052CC]/20 text-[#0052CC] py-2 rounded-lg flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#0052CC] hover:text-white active:scale-[0.97] group/btn"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-[shimmer_0.75s_ease-out]" 
                        style={{ filter: 'blur(8px)' }} />
                  
                  <Edit2 size={13} strokeWidth={3} className="transition-transform duration-300 group-hover/btn:-translate-x-1" />
                  <span className="relative z-10">Process</span>
                  <ChevronRight size={14} strokeWidth={3} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(300%) skewX(-25deg); }
        }
      `}} />
    </div>
  );
};

export default ContractGrid;