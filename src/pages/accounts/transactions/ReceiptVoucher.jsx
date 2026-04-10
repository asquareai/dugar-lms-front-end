import React, { useState } from 'react';
import { 
  Save, Search, Calendar, Plus, Trash2, 
  Building2, ChevronDown, X, Check, Printer, 
  RefreshCcw, Info, ArrowRightLeft, FileText
} from 'lucide-react';

const ReceiptVoucher = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  
  // 1. STATE FOR TOTALS
  const [headerTotal, setHeaderTotal] = useState("0.00");
  const [rows, setRows] = useState([
    { id: Date.now(), detailsCode: "", loanRef: "", areaCode: "", amount: "", remarks: "" }
  ]);

  // 2. CALCULATION LOGIC
  const columnTotal = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
  const isMatch = parseFloat(headerTotal) === columnTotal && columnTotal > 0;

  const openSearch = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };

  const addNewRow = () => {
    const newRow = { id: Date.now(), detailsCode: "", loanRef: "", areaCode: "", amount: "", remarks: "" };
    setRows([...rows, newRow]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  // 3. UPDATE ROW AMOUNT
  const handleAmountChange = (id, val) => {
    setRows(rows.map(row => row.id === id ? { ...row, amount: val } : row));
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans text-black" style={{ fontFamily: 'Calibri, "Segoe UI", sans-serif' }}>
      
      {/* TOP SYSTEM ACTION BAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-300 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-[#1e3a8a] p-2 rounded shadow-sm">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-[14px] font-black uppercase tracking-tighter leading-none text-black">Dugar Loan Edge <span className="text-slate-400">v2.0</span></h1>
            <p className="text-[14px] font-bold text-[#1e3a8a] uppercase tracking-widest mt-1">Finance Management Terminal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.location.reload()} className="flex items-center gap-1.5 px-3 py-1.5 text-[14px] font-black text-black hover:bg-slate-100 rounded transition-all uppercase">
            <RefreshCcw size={14} /> Reset
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[14px] font-black text-black hover:bg-slate-100 rounded transition-all uppercase">
            <Printer size={14} /> Print
          </button>
          <div className="h-6 w-[1px] bg-slate-300 mx-1" />
          <button className={`flex items-center gap-2 px-6 py-2.5 text-white text-[14px] font-black uppercase rounded transition-all ${isMatch ? 'bg-green-600 hover:bg-green-700' : 'bg-[#1e3a8a] hover:bg-blue-900'}`}>
            <Save size={16} /> Save Voucher (F10)
          </button>
        </div>
      </div>

      {/* VOUCHER WORKSPACE */}
      <div className="flex-1 overflow-y-auto py-10 px-4 flex justify-center">
        <div className="w-full max-w-4xl bg-white border border-slate-400 shadow-xl flex flex-col">
          
          {/* VOUCHER HEADER */}
          <div className="bg-slate-50 border-b border-slate-300 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-black tracking-tight flex items-center gap-2">
                RECEIPT <span className="text-[#1e3a8a]">VOUCHER</span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-yellow-400 text-[14px] font-black uppercase rounded">Draft Mode</span>
                <span className="text-[14px] font-black text-black uppercase opacity-60 font-mono">ID: RV-2026-0001</span>
              </div>
            </div>

           

           
          </div>

          <div className="p-10 space-y-10">
            {/* MASTER FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
              {/* 1. Category */}
              <div className="relative border-b-2 border-black group">
                <label className="text-[14px] font-black uppercase text-black mb-2 block">Category</label>
                <select className="w-full bg-transparent py-2 text-[14px] font-black text-black outline-none appearance-none uppercase cursor-pointer">
                  <option>GENERAL REVENUE</option>
                  <option>LOAN REPAYMENT</option>
                </select>
                <ChevronDown size={18} className="absolute right-0 bottom-3 text-black" />
              </div>

              {/* 2. Voucher Date */}
              <div className="relative border-b-2 border-black group">
                <label className="text-[14px] font-black uppercase text-black mb-2 block">Voucher Date</label>
                <div className="flex items-center justify-between">
                  <input type="date" className="w-full bg-transparent py-2 text-[14px] font-black text-black outline-none" />
                  <Calendar size={18} className="text-black" />
                </div>
              </div>

              {/* 3. Header Code */}
              <div className="relative border-b-2 border-black group cursor-pointer" onClick={() => openSearch("Header Code")}>
                <label className="text-[14px] font-black uppercase text-black mb-2 block">Header Code</label>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[14px] font-black text-black opacity-40 uppercase">Search Ledger...</span>
                  <Search size={18} className="text-black" />
                </div>
              </div>

              {/* 4. Integrated Amount & Mode Card */}
              <div className={`flex flex-col p-3 rounded shadow-md border-b-4 transition-colors duration-300 ${isMatch ? 'bg-green-600 border-green-800' : 'bg-[#1e3a8a] border-blue-900'}`}>
                <div className="flex justify-between items-center mb-1 border-b border-white/20 pb-1.5">
                  <label className="text-[14px] font-black text-white/80 uppercase tracking-tight">Amount (INR)</label>
                  
                  <div className="relative flex items-center bg-black/20 px-2 py-0.5 rounded border border-white/10 hover:bg-black/30 transition-all">
                    <select 
                      className="bg-transparent text-[14px] font-black text-white outline-none cursor-pointer appearance-none py-0 pr-5 z-10"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option className="bg-white text-black font-bold"> CASH </option>
                      <option className="bg-white text-black font-bold"> UPI / Online </option>
                      <option className="bg-white text-black font-bold"> NEFT / RTGS </option>
                      <option className="bg-white text-black font-bold"> CHEQUE </option>
                    </select>
                    <ChevronDown size={14} className="text-white/70 absolute right-1 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-black text-white/90">₹</span>
                  <input 
                    type="number" 
                    value={headerTotal} 
                    onChange={(e) => setHeaderTotal(e.target.value)}
                    className="bg-transparent text-2xl font-black text-white outline-none w-full text-center" 
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* GRID SECTION */}
            <div className="mt-14 space-y-4">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-[14px] font-black uppercase tracking-widest text-black">Transaction Breakup Breakdown</h3>
                <button onClick={addNewRow} className="flex items-center gap-2 bg-black text-white px-6 py-2.5 text-[14px] font-black uppercase hover:bg-slate-800 transition-all">
                  <Plus size={16} /> Add Row
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-black">
                  <thead>
                    <tr className="bg-slate-700 text-white">
                      <th className="p-4 text-[14px] font-black uppercase text-left border-r border-slate-500">Details Code</th>
                      <th className="p-4 text-[14px] font-black uppercase text-left border-r border-slate-500">Loan / Reference</th>
                      <th className="p-4 text-[14px] font-black uppercase text-left border-r border-slate-500">Area Code</th>
                      <th className="p-4 text-[14px] font-black uppercase text-right border-r border-slate-500">Amount</th>
                      <th className="p-4 text-[14px] font-black uppercase text-center w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="border-b border-black hover:bg-slate-50 transition-colors">
                          <td className="p-4 border-r border-black cursor-pointer" onClick={() => openSearch("Search Line Code")}>
                              <div className="flex justify-between items-center text-[14px] font-black text-black opacity-30">SEARCH... <Search size={16}/></div>
                          </td>
                          <td className="p-4 border-r border-black cursor-pointer" onClick={() => openSearch("Search Loan")}>
                              <div className="flex justify-between items-center text-[14px] font-black text-black opacity-30">SEARCH... <Search size={16}/></div>
                          </td>
                          <td className="p-4 border-r border-black cursor-pointer" onClick={() => openSearch("Search Area")}>
                              <div className="flex justify-between items-center text-[14px] font-black text-black opacity-30">SEARCH... <Search size={16}/></div>
                          </td>
                          <td className="p-4 border-r border-black">
                            <input 
                              type="number" 
                              value={row.amount}
                              onChange={(e) => handleAmountChange(row.id, e.target.value)}
                              className="w-full text-[14px] font-black text-black text-right outline-none bg-transparent" 
                              placeholder="0.00" 
                            />
                          </td>
                          <td className="p-4 text-center">
                            <button onClick={() => removeRow(row.id)} className="text-black hover:text-red-600 transition-colors">
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </tr>
                        <tr className="bg-slate-100 border-b border-black">
                          <td colSpan="5" className="p-3 border-r border-black">
                            <div className="flex items-center gap-3 px-2">
                              <Info size={16} className="text-black" />
                              <input placeholder="REMARKS..." className="w-full bg-transparent text-[14px] font-black text-black outline-none uppercase placeholder:text-black-80" />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={`border-t-2 border-black font-black ${isMatch ? 'bg-green-100' : 'bg-red-50'}`}>
                      <td colSpan="3" className="p-4 text-right text-[14px] uppercase border-r border-black">
                        Total Calculated Breakdown:
                      </td>
                      <td className={`p-4 text-right text-[16px] border-r border-black ${isMatch ? 'text-green-700' : 'text-red-600'}`}>
                        ₹ {columnTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="bg-white"></td>
                    </tr>
                    {!isMatch && columnTotal > 0 && (
                       <tr className="bg-red-600 text-white text-center">
                         <td colSpan="5" className="p-2 text-[14px] font-black uppercase tracking-widest">
                           Balance Discrepancy detected between header and table
                         </td>
                       </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SEARCH Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg border-2 border-black flex flex-col shadow-2xl">
            <div className="p-5 bg-slate-100 border-b-2 border-black flex justify-between items-center">
              <h4 className="text-[14px] font-black uppercase text-black">Directory Lookup: {modalTitle}</h4>
              <button onClick={() => setShowModal(false)}><X size={24} /></button>
            </div>
            <div className="p-6">
              <input type="text" placeholder="FILTER RESULTS..." className="w-full p-3 border-2 border-black text-[14px] font-black text-black outline-none uppercase mb-6" autoFocus />
              <div className="max-h-80 overflow-y-auto border border-black scrollbar-thin">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} onClick={() => setShowModal(false)} className="p-4 border-b border-slate-100 flex justify-between items-center hover:bg-black hover:text-white cursor-pointer group">
                    <p className="text-[14px] font-black uppercase">Sample Account Entry 00{i}</p>
                    <Check size={18} className="opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptVoucher;