import React, { useState } from 'react';
import { 
  ArrowLeft, Save, Send, RotateCcw, User, 
  Car, IndianRupee, FileText, Share2, Users, ShieldCheck, Copy, CheckCircle,
  ChevronRight, ChevronLeft, RotateCcw as ResetIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- SUB-COMPONENTS ---

const FormField = ({ label, placeholder, type = "text", className = "" }) => (
  <div className={`flex flex-col gap-0 ${className}`}>
    <label className="text-[11px] text-slate-700 font-normal uppercase tracking-tighter leading-tight">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="border border-slate-400 px-1.5 py-0.5 text-[14px] font-medium text-black focus:border-blue-600 outline-none bg-white rounded-sm shadow-sm w-full" 
    />
  </div>
);

const FormSelect = ({ label, options, value, onChange, className = "" }) => (
  <div className={`flex flex-col gap-0 ${className}`}>
    <label className="text-[11px] text-slate-700 font-normal uppercase tracking-tighter leading-tight">{label}</label>
    <select 
      value={value} 
      onChange={onChange} 
      className="border border-slate-400 px-1 py-0.5 text-[14px] font-medium text-black focus:border-blue-600 outline-none bg-white rounded-sm shadow-sm w-full h-[28px] cursor-pointer"
    >
      <option value="">Select</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const EntityBlock = ({ title, icon: Icon, typeKey, colorClass, customerType, onTypeChange, indianStates }) => (
    <div className="space-y-2 border-l-4 border-slate-300 pl-2">
    <div className={`flex items-center gap-2 px-2 py-1 rounded-t-sm shadow-sm ${colorClass}`}>
      <Icon size={14} className="text-slate-700" />
      {/* Changed font-black to font-medium and removed uppercase for a 'normal' look */}
      <span className="text-[13px] font-medium text-black tracking-tight">{title}</span>
    </div>

    <div className="border border-slate-300 rounded-sm shadow-sm bg-white">
      <div className="bg-slate-100 px-2 py-0.5 border-b border-slate-300 font-bold text-[10px] uppercase">Identification</div>
      <div className="p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-2">
        <FormSelect 
          label="Type of Customer" 
          options={["Individual", "Firm", "Partnership", "Pvt Ltd"]} 
          value={customerType} 
          onChange={(e) => onTypeChange(typeKey, e.target.value)} 
        />
        {customerType === 'Individual' ? (
          <>
            <div className="flex gap-1 md:col-span-2">
              <FormSelect label="Salutation" options={["Mr", "Mrs", "M/S"]} className="w-1/4" />
              <FormField label="Full Name" className="w-3/4" />
            </div>
            <FormField label="DOB" type="date" />
          </>
        ) : (
          <>
            <FormField label="Proprietor Name" />
            <FormField label="Partner 1" />
            <FormField label="Partner 2" />
          </>
        )}
        <FormField label="Pan No" />
        <FormField label="Aadhar Number" />
      </div>
    </div>

    <div className="border border-slate-300 rounded-sm shadow-sm bg-white">
      <div className="bg-slate-100 px-2 py-0.5 border-b border-slate-300 font-bold text-[10px] uppercase flex justify-between items-center">
        <span>Residential Address</span>
        {typeKey !== 'primary' && <button type="button" className="text-[9px] text-blue-700 font-bold flex items-center gap-1 hover:bg-blue-50 px-1 rounded"><Copy size={10}/> Copy Primary</button>}
      </div>
      <div className="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-2">
        <FormField label="Flat/Apt No" />
        <FormField label="Street" className="md:col-span-2" />
        <FormField label="Area" className="md:col-span-2" />
        <FormField label="City" />
        <FormSelect label="State" options={indianStates} />
        <FormField label="Dist. (KM)" />
        <FormSelect label="Type" options={["Own", "Rental"]} />
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const ContractEditForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Borrower Details');
  const [proposalCat, setProposalCat] = useState('A');
  const [riskLevel, setRiskLevel] = useState('Low');

  const [types, setTypes] = useState({
    primary: 'Individual',
    coApp: 'Individual',
    g1: 'Individual',
    g2: 'Individual'
  });

  const [productType, setProductType] = useState('Vehicles');
  const [assetSecured, setAssetSecured] = useState('Secured');

  const tabs = [
    { name: 'Borrower Details', icon: <User size={14} />, active: 'bg-blue-600', inactive: 'bg-blue-100', border: 'border-blue-400' },
    { name: 'Asset Details', icon: <Car size={14} />, active: 'bg-emerald-600', inactive: 'bg-emerald-100', border: 'border-emerald-400' },
    { name: 'Financial Terms', icon: <IndianRupee size={14} />, active: 'bg-amber-600', inactive: 'bg-amber-100', border: 'border-amber-400' },
    { name: 'Documentation Details', icon: <FileText size={14} />, active: 'bg-purple-600', inactive: 'bg-purple-100', border: 'border-purple-400' },
    { name: 'Co Lending Details', icon: <Share2 size={14} />, active: 'bg-cyan-600', inactive: 'bg-cyan-100', border: 'border-cyan-400' }
  ];

  const handleTypeChange = (key, value) => {
    setTypes(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.name === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].name);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    const currentIndex = tabs.findIndex(tab => tab.name === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].name);
      window.scrollTo(0, 0);
    }
  };

  const indianStates = ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Maharashtra", "Delhi"];

  return (
    <div className="min-h-screen w-full bg-[#F0F2F5] text-black font-sans flex flex-col relative">
      
      {/* 1. TOP ACTION BAR (Sticky) */}
      <div className="sticky top-0 bg-white border-b border-slate-400 px-2 py-1.5 flex items-center justify-between shadow-sm z-[100]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:bg-slate-100 p-1 rounded-full"><ArrowLeft size={18} /></button>
          <h1 className="text-sm font-black uppercase tracking-tighter italic text-blue-900 whitespace-nowrap">Contract Edit — #100254</h1>
          <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-normal text-slate-500 uppercase whitespace-nowrap">Proposal Cat:</span>
              <select value={proposalCat} onChange={(e) => setProposalCat(e.target.value)} className="text-[10px] font-bold border border-slate-300 rounded px-1 outline-none focus:border-blue-500 bg-slate-50 h-5">
                <option>A</option><option>B</option><option>C</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-normal text-slate-500 uppercase whitespace-nowrap">Risk Level:</span>
              <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} className={`text-[10px] font-bold border border-slate-300 rounded px-1 outline-none bg-slate-50 h-5 ${riskLevel === 'High' ? 'text-red-600' : riskLevel === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          <button className="px-2 py-1 bg-red-600   text-white  border border-slate-400 text-[9px] font-bold flex items-center gap-1 hover:bg-slate-50 rounded-sm"><ResetIcon size={10} /> MOVE TO LOS</button>
          <button className="px-2 py-1 bg-blue-600  text-white  border border-slate-400 text-[9px] font-bold flex items-center gap-1 hover:bg-slate-50 rounded-sm"><Save size={10} /> SAVE DRAFT</button>
          <button className="px-3 py-1 bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-1 hover:bg-emerald-700 rounded-sm shadow-sm"><CheckCircle size={10} /> SUBMIT & CREATE CONTRACT</button>
        </div>
      </div>

      {/* 2. TAB ROW (Sticky - Offset by Top Bar height) */}
      <div className="sticky top-[37px] bg-white border-b border-slate-300 px-1 pt-1 flex items-end gap-1 shadow-sm z-[90]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-1.5 px-4 py-2 text-[12px] border-t border-x rounded-t-sm transition-all ${
              activeTab === tab.name 
                ? `${tab.active} ${tab.border} text-white font-bold z-10 translate-y-[1px]` 
                : `${tab.inactive} ${tab.border} font-semibold opacity-70 hover:opacity-100 hover:bg-white text-slate-800`
            }`}
          >
            {tab.icon} <span className="whitespace-nowrap tracking-tight uppercase">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* 3. MAIN WORKSPACE (Natural Flow) */}
      <div className="p-2 w-full">
       {activeTab === 'Borrower Details' && (
  <div className="max-w-[1600px] mx-auto space-y-8 pb-32">
    <EntityBlock 
      title="Primary Borrower" 
      icon={User} 
      typeKey="primary" 
      colorClass="bg-sky-100 text-black border border-slate-400" 
      customerType={types.primary} 
      onTypeChange={handleTypeChange} 
      indianStates={indianStates} 
    />
    
    <EntityBlock 
      title="Co-Applicant Details" 
      icon={Users} 
      typeKey="coApp" 
      colorClass="bg-sky-100 text-black border border-slate-400" 
      customerType={types.coApp} 
      onTypeChange={handleTypeChange} 
      indianStates={indianStates} 
    />
    
    <EntityBlock 
      title="Guarantor 01" 
      icon={ShieldCheck} 
      typeKey="g1" 
      colorClass="bg-sky-100 text-black border border-slate-400" 
      customerType={types.g1} 
      onTypeChange={handleTypeChange} 
      indianStates={indianStates} 
    />
    
    <EntityBlock 
      title="Guarantor 02" 
      icon={ShieldCheck} 
      typeKey="g2" 
      colorClass="bg-sky-100 text-black border border-slate-400" 
      customerType={types.g2} 
      onTypeChange={handleTypeChange} 
      indianStates={indianStates} 
    />
  </div>
)}

        {activeTab === 'Asset Details' && (
          <div className="max-w-[1600px] mx-auto space-y-4 pb-32">
            <div className="bg-white border border-slate-300 rounded-sm p-3 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm border-l-4 border-l-emerald-500">
              <FormSelect label="Type of Assets" options={["Secured", "UnSecured"]} value={assetSecured} onChange={(e) => setAssetSecured(e.target.value)} />
              <FormSelect label="Product Type" options={["Vehicles", "MSME", "LAP", "Business Loans", "Collateral"]} value={productType} onChange={(e) => setProductType(e.target.value)} />
            </div>

            {productType === 'Vehicles' && (
              <div className="space-y-4">
                <div className="bg-emerald-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
                  
                  <Car size={14} /> <span className="text-[12px] uppercase">Vehicle Specifications</span>
                </div>
                <div className="bg-white border border-slate-300 p-3 grid grid-cols-2 md:grid-cols-4 gap-3 shadow-sm">
                  <FormSelect label="Vehicle Type" options={["Car", "SCV", "HCV", "Two Wheeler"]} />
                  <FormSelect label="Deal of Assets" options={["Purchase", "Refinance"]} />
                  <FormField label="Make of Vehicle" />
                  <FormField label="Version" />
                  <FormField label="Year of Mfg" type="number" />
                  <FormField label="Owner serial Number" />
                  <FormField label="Regn Number" />
                  <FormSelect label="Fuel Type" options={["Diesel", "Petrol", "EV"]} />
                  <FormField label="Kms Run" />
                  <FormField label="Market Value" />
                  <FormField label="Chasis Number" />
                  <FormField label="Engine Number" />
                </div>
                <div className="bg-emerald-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
                  <ShieldCheck size={14} /> <span className="text-[12px] uppercase">Insurance Details</span>
                </div>
                <div className="bg-white border border-slate-300 p-3 grid grid-cols-2 md:grid-cols-4 gap-3 shadow-sm">
                  <FormField label="IDV" />
                  <FormField label="Expiry" type="date" />
                  <FormField label="Insurance Company" />
                  <FormField label="Premium" />
                </div>
              </div>
            )}

            {productType === 'LAP' && (
              <div className="space-y-4">
                <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-t-sm flex items-center gap-2">
                  <FileText size={14} /> <span className="text-[12px] font-black uppercase">Property Location Details</span>
                </div>
                <div className="bg-white border border-slate-300 p-3 grid grid-cols-2 md:grid-cols-4 gap-3 shadow-sm">
                  <FormSelect label="Property Type" options={["Residential", "Commercial", "Industrial"]} />
                  <FormField label="Flat No." /><FormField label="Apartment No." /><FormField label="Street Name" />
                  <FormField label="Area Name" /><FormField label="City" /><FormSelect label="State" options={indianStates} />
                  <FormField label="Distance from Office" /><FormSelect label="Any Rent received" options={["Yes", "No"]} />
                  <FormField label="Rent Amount (If yes)" /><FormField label="Guide Line Value" className="md:col-span-2" />
                </div>
              </div>
            )}

            {productType === 'MSME' && (
              <div className="space-y-4">
                <div className="bg-purple-600 text-white px-2 py-0.5 rounded-t-sm flex items-center gap-2">
                  <ShieldCheck size={14} /> <span className="text-[12px] font-black uppercase">Business Details</span>
                </div>
                <div className="bg-white border border-slate-300 p-3 grid grid-cols-2 md:grid-cols-3 gap-3 shadow-sm">
                  <FormField label="Nature of Business" /><FormField label="Date of Incorporation" type="date" /><FormSelect label="Is it secured" options={["Yes", "No"]} />
                </div>
              </div>
            )}
          </div>
        )}

       {activeTab === 'Financial Terms' && (
  <div className="max-w-[1600px] mx-auto pb-32">
    {/* 3-COLUMN MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      
      {/* COLUMN 1: CORE FINANCIAL TERMS */}
      <div className="flex flex-col">
        <div className="bg-orange-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
          <IndianRupee size={14} /> 
          <span className="text-[12px] uppercase">Financial Terms</span>
        </div>
        <div className="bg-white border border-slate-300 p-3 space-y-3 shadow-sm rounded-b-sm">
          <FormField label="Loan Amount" />
          <div className="grid grid-cols-2 gap-2">
            <FormField label="Tenure (Months)" />
            <FormField label="Flat Rate (%)" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField label="IRR (%)" />
            <FormField label="Insurance Deposit" />
          </div>
          <FormField label="Total Contract Value" className="bg-slate-50" />
          <FormSelect label="Repayment Terms" options={["Monthly", "Quarterly", "Bullet"]} />
          <FormSelect label="Moratorium" options={["No Moratorium", "One Month", "Two Month"]} />
          <FormSelect label="Advance" options={["EMI", "Interest"]} />
        </div>
      </div>

      {/* COLUMN 2: REPAYMENT STRUCTURE (STEP EMI) */}
      <div className="flex flex-col">
        <div className="bg-orange-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
          <RotateCcw size={14} /> 
          <span className="text-[12px]  uppercase">Repayment Structure</span>
        </div>
        <div className="bg-white border border-slate-300 p-3 space-y-4 shadow-sm rounded-b-sm">
          {/* Step 1 */}
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-sm">
            <div className="text-[9px] font-bold text-slate-500 uppercase mb-1 italic">Step 01</div>
            <div className="grid grid-cols-2 gap-2">
              <FormField label="EMI Amount" />
              <FormField label="No. of EMI" />
            </div>
          </div>
          {/* Step 2 */}
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-sm">
            <div className="text-[9px] font-bold text-slate-500 uppercase mb-1 italic">Step 02</div>
            <div className="grid grid-cols-2 gap-2">
              <FormField label="EMI Amount" />
              <FormField label="No. of EMI" />
            </div>
          </div>
          {/* Step 3 */}
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-sm">
            <div className="text-[9px] font-bold text-slate-500 uppercase mb-1 italic">Step 03</div>
            <div className="grid grid-cols-2 gap-2">
              <FormField label="EMI Amount" />
              <FormField label="No. of EMI" />
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 3: INITIAL PAYMENT & DISBURSEMENT */}
      <div className="flex flex-col">
        <div className="bg-orange-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
          <ShieldCheck size={14} /> 
          <span className="text-[12px] uppercase">Initial & Disbursement</span>
        </div>
        <div className="bg-white border border-slate-300 p-3 space-y-2 shadow-sm rounded-b-sm">
          <div className="grid grid-cols-2 gap-2">
            <FormField label="EMI Advance" />
            <FormField label="Processing" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField label="RTO" />
            <FormField label="Valuation" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField label="Stamp Duty" />
            <FormField label="RC Holding" />
          </div>
          <FormField label="Other Charges" />
          <FormSelect label="Repayment Mode" options={["E Nach", "Online", "Cash", "Others"]} />
          
          <div className="mt-4 pt-2 border-t border-slate-200">
            <FormField label="Payment Done To" placeholder="Dealer/Customer" />
            <div className="grid grid-cols-3 gap-1 mt-2">
              <FormField label="Pay 1" />
              <FormField label="Pay 2" />
              <FormField label="Pay 3" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
)}
{/* 4. DOCUMENTATION DETAILS TAB */}
  {activeTab === 'Documentation Details' && (
  <div className="max-w-[1600px] mx-auto pb-32 space-y-4">
    
    {/* ROW 1: TWO COLUMNS (BRANCH & HO) */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      
      {/* COLUMN 1: BRANCH LEVEL DETAILS */}
      <div className="flex flex-col">
        <div className="bg-purple-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
          <FileText size={14} /> 
          <span className="text-[12px] uppercase tracking-wider">Document Details at Branch Level</span>
        </div>
        <div className="bg-white border border-slate-300 p-3 space-y-3 shadow-sm rounded-b-sm">
          <div className="grid grid-cols-2 gap-3">
            <FormSelect label="Document Type" options={["Original", "Photocopy", "Digitally Signed"]} />
            <FormField label="Verified By" placeholder="Employee Name/ID" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Obtained By" />
            <FormField label="FI Guarantor" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="FI of Borrower" />
            <FormField label="Loan Referred By" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="TVR Done By" />
            <FormField label="Vehicle by Agency (if any)" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Vehicle Inspection By" />
            <FormField label="Property Valuation By" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Legal Opinion By" />
            <FormField label="Collection Tool By" />
          </div>
        </div>
      </div>

      {/* COLUMN 2: HO LEVEL DETAILS */}
      <div className="flex flex-col">
        <div className="bg-purple-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
          <ShieldCheck size={14} /> 
          <span className="text-[12px] uppercase tracking-wider">Document Details at HO Level</span>
        </div>
        <div className="bg-white border border-slate-300 p-3 space-y-3 shadow-sm rounded-b-sm">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Documents Checked By" />
            <FormField label="Documents Verified By" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Loan Approved By" />
            <FormField label="Disbursed By" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="RC Online Checking" />
            <FormField label="Collection Tool By (HO)" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Area Code" />
            <FormField label="TVR Done By (HO)" />
          </div>
          <FormSelect label="Stock Marked to Bank" options={["Select Bank", "HDFC", "ICICI", "SBI", "Axis", "Kotak"]} />
        </div>
      </div>
    </div>

    {/* ROW 2: PENDING DOCUMENTS CHECKLIST (FULL WIDTH) */}
    <div className="flex flex-col">
      <div className="bg-purple-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
        <Copy size={14} /> 
        <span className="text-[12px] uppercase tracking-wider">Pending Document Details (Check List)</span>
      </div>
      <div className="bg-white border border-slate-300 p-3 shadow-sm rounded-b-sm">
        <div className="flex flex-wrap gap-x-10 gap-y-3 py-2 px-4">
          {["Agreement book", "RC Book", "HYP Endorsement", "Insurance Copy", "NOC Certificate", "Permit Copy"].map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-amber-600 border-slate-400 rounded transition-all cursor-pointer" />
              <span className="text-[12px] font-bold text-slate-700 group-hover:text-black uppercase tracking-tight">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* ROW 3: UPLOAD DOCUMENTS SECTION (TWO INTERNAL ROWS) */}
    <div className="flex flex-col">
      <div className="bg-purple-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
        <Send size={14} /> 
        <span className="text-[12px]  tracking-wider">Upload Documents Section</span>
      </div>
      <div className="bg-white border border-slate-300 p-4 shadow-sm rounded-b-sm space-y-6">
        
        {/* SUB-ROW 1: INPUT CONTROLS */}
        <div className="flex flex-col md:flex-row items-end gap-4 bg-slate-50 p-4 border border-slate-200 rounded-sm">
          <FormSelect 
            label="Select Document Type" 
            options={["PAN Card", "Aadhar", "Property Tax", "RC Copy", "Agreement", "Insurance"]} 
            className="flex-1"
          />
          <div className="flex-[2] w-full">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-tighter leading-tight mb-1 block">Browse Attachment</label>
            <div className="flex gap-2">
              <input 
                type="file" 
                className="block w-full text-[12px] text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-[11px] file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer border border-slate-400 bg-white shadow-sm"
              />
              <button className="bg-emerald-600 text-white px-6 py-1.5 text-[11px] font-black rounded-sm uppercase hover:bg-emerald-700 transition-all shadow-md active:scale-95">
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* SUB-ROW 2: DATA TABLE WITH PREVIEW */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 uppercase italic tracking-widest">Linked Attachments Registry</span>
            <span className="text-[9px] text-blue-600 font-bold uppercase">Total Files: 1</span>
          </div>
          <div className="border border-slate-300 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest w-20">Preview</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Document Category</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">File Name</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Size</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="hover:bg-blue-50/60 transition-colors group">
                  <td className="px-4 py-2">
                    <div 
                      className="w-12 h-12 bg-slate-100 rounded-sm border border-slate-300 overflow-hidden cursor-pointer relative shadow-inner group-hover:border-blue-400"
                      title="Click to view full image"
                    >
                      <img 
                        src="https://via.placeholder.com/150" 
                        alt="pan_card_thumbnail" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Share2 size={14} className="text-white" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 uppercase border border-blue-200">
                      PAN Card
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[12px] font-bold text-slate-700 tracking-tight">pan_card_front_user102.jpg</td>
                  <td className="px-4 py-2 text-[11px] font-medium text-slate-400">1.2 MB</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-900 text-[10px] font-black uppercase tracking-tighter group/btn">
                        <FileText size={12} className="group-hover/btn:scale-110 transition-transform" /> View
                      </button>
                      <div className="w-[1px] h-4 bg-slate-300"></div>
                      <button className="flex items-center gap-1 text-red-600 hover:text-red-800 text-[10px] font-black uppercase tracking-tighter group/btn">
                        <RotateCcw size={12} className="group-hover/btn:rotate-12 transition-transform" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

  {/* 5. CO LENDING DETAILS TAB */}
  {activeTab === 'Co Lending Details' && (
    <div className="max-w-[1600px] mx-auto pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        
        {/* COLUMN 1: MODEL & LENDER INFO */}
        <div className="flex flex-col">
          <div className="bg-cyan-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
            <Share2 size={14} /> 
            <span className="text-[12px] uppercase">Contribution Model</span>
          </div>
          <div className="bg-white border border-slate-300 p-3 space-y-4 shadow-sm rounded-b-sm">
            <FormSelect 
              label="Co-Lending Type" 
              options={["Contribution Model", "Revenue Sharing (RSP)", "Risk Sharing", "Franchise"]} 
            />
            <FormField label="Name of Co-Lender" />
            <FormField label="Security Deposit Amount" />
          </div>
        </div>

        {/* COLUMN 2: SHARE PERCENTAGES */}
        <div className="flex flex-col">
          <div className="bg-cyan-100 text-black border border-slate-400 px-2 py-1 rounded-t-sm shadow-sm flex items-center gap-2">
            <IndianRupee size={14} /> 
            <span className="text-[12px]  uppercase">Revenue & Risk Share</span>
          </div>
          <div className="bg-white border border-slate-300 p-3 shadow-sm rounded-b-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <FormField label="If Contribution Share %" />
              <FormField label="EMI Share" />
              <FormField label="% of Revenue Share" />
              <FormField label="Risk Share" />
            </div>
            <div className="mt-6 p-3 bg-cyan-50 border border-cyan-100 rounded-sm">
              <p className="text-[11px] text-cyan-800 leading-tight">
                <strong>Note:</strong> Co-lending terms are governed by the master agreement between the primary financier and the participating partner.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )}
        {!['Borrower Details', 'Asset Details', 'Financial Terms', 'Co Lending Details', 'Documentation Details'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-300 rounded-lg mx-4">
            <h2 className="text-xl font-black uppercase text-slate-400 italic tracking-widest">{activeTab} MODULE</h2>
          </div>
        )}
      </div>

      {/* 4. PERSISTENT NAVIGATION BAR (Sticky at Bottom) */}
      <div className="sticky bottom-[21px] bg-white border-t border-slate-300 p-2 flex justify-end items-center px-4 gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-[80]">
        {activeTab !== tabs[0].name && (
          <button onClick={handlePrev} className="px-4 py-1.5 border border-slate-400 text-slate-700 text-[11px] font-bold rounded flex items-center gap-2 hover:bg-slate-50 uppercase tracking-wider transition-colors">
            <ChevronLeft size={14} /> Previous Section
          </button>
        )}
        {activeTab !== tabs[tabs.length - 1].name ? (
          <button onClick={handleNext} className="px-6 py-1.5 bg-slate-800 text-white text-[11px] font-bold rounded flex items-center gap-2 hover:bg-black uppercase tracking-widest transition-all shadow-md">
            Next Section <ChevronRight size={14} />
          </button>
        ) : (
          <button className="px-6 py-1.5 bg-emerald-600 text-white text-[11px] font-bold rounded flex items-center gap-2 hover:bg-emerald-700 uppercase tracking-widest transition-all shadow-md">
            Final Review <CheckCircle size={14} />
          </button>
        )}
      </div>

      {/* 5. FOOTER (Sticky at Absolute Bottom) */}
      <div className="sticky bottom-0 bg-[#F8FAFC] border-t border-slate-400 px-2 py-0.5 flex justify-between items-center text-[10px] font-normal uppercase z-[100]">
        <span className="text-slate-500">UNIT: PRODUCTION_CORE_V4</span>
        <div className="flex items-center gap-1 text-[#0052CC] font-bold">
          <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
          SECURE_SESSION_ACTIVE
        </div>
      </div>
    </div>
  );
};

export default ContractEditForm;