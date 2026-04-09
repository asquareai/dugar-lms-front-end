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
      <div className="sticky top-0 z-50 bg-white border-b border-slate-300 px-6 py-2 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-[#1e3a8a] p-1.5 rounded shadow-sm">
            <Building2 size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-tighter leading-none text-black">Dugar Loan Edge <span className="text-slate-400">v2.0</span></h1>
            <p className="text-[9px] font-bold text-[#1e3a8a] uppercase tracking-widest mt-0.5">Finance Management Terminal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => window.location.reload()} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-black hover:bg-slate-100 rounded transition-all uppercase">
            <RefreshCcw size={12} /> Reset
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-black hover:bg-slate-100 rounded transition-all uppercase">
            <Printer size={12} /> Print
          </button>
          <div className="h-4 w-[1px] bg-slate-300 mx-1" />
          {/* Save Button changes color if matched */}
          <button className={`flex items-center gap-2 px-5 py-2 text-white text-[10px] font-black uppercase rounded transition-all ${isMatch ? 'bg-green-600 hover:bg-green-700' : 'bg-[#1e3a8a] hover:bg-blue-900'}`}>
            <Save size={14} /> Save Voucher (F10)
          </button>
        </div>
      </div>

      {/* VOUCHER WORKSPACE */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white border border-slate-400 shadow-xl flex flex-col">
          
          {/* VOUCHER HEADER - DARK METRICS */}
          <div className="bg-slate-50 border-b border-slate-300 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-black tracking-tight flex items-center gap-2">
                RECEIPT <span className="text-[#1e3a8a]">VOUCHER</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-yellow-400 text-[9px] font-black uppercase rounded">Draft Mode</span>
                <span className="text-[10px] font-black text-black uppercase opacity-60 font-mono">ID: RV-2026-0001</span>
              </div>
            </div>

            <div className="flex flex-col bg-white border border-black p-3 rounded shadow-sm">
              <label className="text-[9px] font-black text-black uppercase tracking-widest mb-1">Receipt Mode</label>
              <div className="flex items-center justify-between text-black">
                <select className="bg-transparent text-sm font-black outline-none w-full cursor-pointer appearance-none">
                  <option>CASH</option>
                  <option>UPI / DIGITAL</option>
                  <option>RTGS / NEFT TRANSFERS</option>
                  <option>CHEQUE</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Total Amount Header - Changes to Green if it matches the table total */}
            <div className={`flex flex-col p-3 rounded shadow-md border-b-4 transition-colors duration-300 ${isMatch ? 'bg-green-600 border-green-800' : 'bg-[#1e3a8a] border-blue-900'}`}>
              <label className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1 text-center">Total Amount (INR)</label>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-black text-white">₹</span>
                <input 
                  type="number" 
                  value={headerTotal} 
                  onChange={(e) => setHeaderTotal(e.target.value)}
                  className="bg-transparent text-2xl font-black text-white outline-none w-full text-center" 
                />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* MASTER FIELDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative border-b-2 border-black group">
                <label className="text-[10px] font-black uppercase text-black mb-1 block">Category</label>
                <select className="w-full bg-transparent py-2 text-sm font-black text-black outline-none appearance-none uppercase cursor-pointer">
                  <option>GENERAL REVENUE</option>
                  <option>LOAN REPAYMENT</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 bottom-3 text-black" />
              </div>

              <div className="relative border-b-2 border-black group">
                <label className="text-[10px] font-black uppercase text-black mb-1 block">Voucher Date</label>
                <div className="flex items-center justify-between">
                  <input type="date" className="w-full bg-transparent py-2 text-sm font-black text-black outline-none" />
                  <Calendar size={14} className="text-black" />
                </div>
              </div>

              <div className="relative border-b-2 border-black group cursor-pointer" onClick={() => openSearch("Header Code")}>
                <label className="text-[10px] font-black uppercase text-black mb-1 block">Header Code</label>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-black text-black opacity-40">SEARCH...</span>
                  <Search size={14} className="text-black" />
                </div>
              </div>

              <div className="relative border-b-2 border-black group cursor-pointer" onClick={() => openSearch("Details Code")}>
                <label className="text-[10px] font-black uppercase text-black mb-1 block">Details Code</label>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-black text-black opacity-40">SEARCH...</span>
                  <Search size={14} className="text-black" />
                </div>
              </div>
            </div>

            {/* Global Narration */}
            <div className="relative border-b-2 border-black group">
              <label className="text-[10px] font-black uppercase text-black mb-1 block">Global Narration</label>
              <div className="flex items-center gap-3 py-2">
                <FileText size={16} className="text-black" />
                <input placeholder="ENTER REMARKS..." className="w-full bg-transparent text-sm font-black text-black outline-none uppercase placeholder:text-slate-300" />
              </div>
            </div>

            {/* GRID SECTION */}
            <div className="mt-12 space-y-2">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-black">Transaction Breakup Breakdown</h3>
                <button onClick={addNewRow} className="flex items-center gap-2 bg-black text-white px-4 py-1.5 text-[9px] font-black uppercase hover:bg-slate-800 transition-all">
                  <Plus size={12} /> Add Row
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-black">
                  <thead>
                    <tr className="bg-slate-700 text-white">
                      <th className="p-3 text-[12px] font-black uppercase text-left border-r border-slate-500">Details Code</th>
                      <th className="p-3 text-[12px] font-black uppercase text-left border-r border-slate-500">Loan / Reference</th>
                      <th className="p-3 text-[12px] font-black uppercase text-left border-r border-slate-500">Area Code</th>
                      <th className="p-3 text-[12px] font-black uppercase text-right border-r border-slate-500">Amount</th>
                      <th className="p-3 text-[12px] font-black uppercase text-center w-14">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="border-b border-black hover:bg-slate-50 transition-colors">
                          <td className="p-3 border-r border-black cursor-pointer" onClick={() => openSearch("Search Line Code")}>
                             <div className="flex justify-between items-center text-[11px] font-black text-black opacity-30">SEARCH... <Search size={12}/></div>
                          </td>
                          <td className="p-3 border-r border-black cursor-pointer" onClick={() => openSearch("Search Loan")}>
                             <div className="flex justify-between items-center text-[11px] font-black text-black opacity-30">SEARCH... <Search size={12}/></div>
                          </td>
                          <td className="p-3 border-r border-black cursor-pointer" onClick={() => openSearch("Search Area")}>
                             <div className="flex justify-between items-center text-[11px] font-black text-black opacity-30">SEARCH... <Search size={12}/></div>
                          </td>
                          <td className="p-3 border-r border-black">
                            <input 
                              type="number" 
                              value={row.amount}
                              onChange={(e) => handleAmountChange(row.id, e.target.value)}
                              className="w-full text-xs font-black text-black text-right outline-none bg-transparent" 
                              placeholder="0.00" 
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button onClick={() => removeRow(row.id)} className="text-black hover:text-red-600 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr className="bg-slate-100 border-b border-black">
                          <td colSpan="5" className="p-2 border-r border-black">
                            <div className="flex items-center gap-2 px-2">
                              <Info size={12} className="text-black" />
                              <input placeholder="LINE REMARKS..." className="w-full bg-transparent text-[11px] font-black text-black outline-none uppercase placeholder:text-slate-400" />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                  {/* DYNAMIC TOTAL FOOTER */}
                  <tfoot>
                    <tr className={`border-t-2 border-black font-black ${isMatch ? 'bg-green-100' : 'bg-red-50'}`}>
                      <td colSpan="3" className="p-3 text-right text-[11px] uppercase border-r border-black">
                        Total Calculated Breakdown:
                      </td>
                      <td className={`p-3 text-right text-[13px] border-r border-black ${isMatch ? 'text-green-700' : 'text-red-600'}`}>
                        ₹ {columnTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="bg-white"></td>
                    </tr>
                    {!isMatch && columnTotal > 0 && (
                       <tr className="bg-red-600 text-white text-center">
                         <td colSpan="5" className="p-1 text-[9px] font-black uppercase tracking-widest">
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
          <div className="bg-white w-full max-w-md border-2 border-black flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-100 border-b-2 border-black flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-black">Directory Lookup: {modalTitle}</h4>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className="p-4">
              <input type="text" placeholder="FILTER RESULTS..." className="w-full p-2 border-2 border-black text-xs font-black text-black outline-none uppercase mb-4" autoFocus />
              <div className="max-h-60 overflow-y-auto border border-black scrollbar-thin">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} onClick={() => setShowModal(false)} className="p-3 border-b border-slate-100 flex justify-between items-center hover:bg-black hover:text-white cursor-pointer group">
                    <p className="text-[10px] font-black uppercase">Sample Account Entry 00{i}</p>
                    <Check size={14} className="opacity-0 group-hover:opacity-100" />
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