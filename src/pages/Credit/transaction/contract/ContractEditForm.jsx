import React, { useState } from 'react';
import { 
  ArrowLeft, Save, Send, RotateCcw, User, 
  Car, IndianRupee, FileText, Share2, Users, ShieldCheck, Copy, CheckCircle,
  ChevronRight, ChevronLeft, RotateCcw as ResetIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- SUB-COMPONENTS ---

const FormField = ({ label, placeholder, type = "text", className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`} style={{ fontFamily: 'Calibri, sans-serif' }}>
    {/* Changed from text-[11px] and slate to text-[14px] and black/90 */}
    <label className="text-[14px] text-black/90 font-normal uppercase tracking-tight leading-tight">
      {label}
    </label>
    <input 
      type={type} 
      placeholder={placeholder} 
      /* Changed border and text size */
      className="border border-black/60 px-2 py-1 text-[14px] font-normal text-black/90 focus:border-blue-600 outline-none bg-white rounded-sm w-full transition-all" 
    />
  </div>
);

const FormSelect = ({ label, options, value, onChange, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`} style={{ fontFamily: 'Calibri, sans-serif' }}>
    {/* Changed from text-[11px] and slate to text-[14px] and black/90 */}
    <label className="text-[14px] text-black/90 font-normal uppercase tracking-tight leading-tight">
      {label}
    </label>
    <select 
      value={value} 
      onChange={onChange} 
      /* Standardized font size and border opacity */
      className="border border-black/60 px-2 py-1 text-[14px] font-normal text-black/90 focus:border-blue-600 outline-none bg-white rounded-sm w-full h-[36px] cursor-pointer transition-all"
    >
      <option value="">Select</option>
      {options.map(opt => <option key={opt} value={opt} className="text-[14px]">{opt}</option>)}
    </select>
  </div>
);

const EntityBlock = ({ title, icon: Icon, typeKey, customerType, onTypeChange, indianStates }) => (
 <div 
  className="space-y-3 mb-6"
  style={{ 
    fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif',
    color: 'rgba(0, 0, 0, 0.9)' 
  }}
>
    {/* Header with Brand Blue Gradient - Text Black 90 */}
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg border border-black/60 bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] shadow-sm">
      <Icon size={16} className="text-black/90" />
      <span className="text-[14px] font-normal text-black/90 uppercase tracking-wide">{title}</span>
    </div>

    {/* Identification Section */}
    <div className="border border-black/60 rounded-sm shadow-sm bg-white overflow-hidden">
      <div className="bg-gradient-to-b from-white to-[#F9FAFF] px-3 py-1 border-b border-black/60 font-normal text-[16px] uppercase text-black/90">
        Identification
      </div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
        <FormSelect 
          label="Type of Customer" 
          options={["Individual", "Firm", "Partnership", "Pvt Ltd"]} 
          value={customerType} 
          onChange={(e) => onTypeChange(typeKey, e.target.value)} 
        />
        {customerType === 'Individual' ? (
          <>
            <div className="flex gap-2 md:col-span-2">
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

    {/* Residential Address Section */}
    <div className="border border-black/60 rounded-sm shadow-sm bg-white overflow-hidden">
      <div className="bg-gradient-to-b from-white to-[#F9FAFF] px-3 py-1 border-b border-black/60 font-normal text-[14px] uppercase text-black/90 flex justify-between items-center">
        <span>Residential Address</span>
        {typeKey !== 'primary' && (
          <button 
            type="button" 
            className="text-[12px] text-blue-900 font-normal flex items-center gap-1 hover:bg-blue-50 px-2 py-0.5 border border-blue-200 rounded transition-colors"
          >
            <Copy size={12}/> Copy Primary
          </button>
        )}
      </div>
      <div className="p-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-3">
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
      <div 
        className="sticky top-0 bg-white border-b border-black/60 px-4 py-2 flex items-center justify-between shadow-md z-[100]"
        style={{ fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif' }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="hover:bg-blue-50 p-1.5 rounded-full transition-colors border border-transparent hover:border-black/10"
          >
            <ArrowLeft size={18} className="text-black/90" />
          </button>
          
          <h1 className="text-[16px] font-bold text-blue-900 whitespace-nowrap">
            Application Number — #100254
          </h1>
          
          <div className="h-6 w-[1px] bg-black/20 mx-2"></div>
          
          <div className="flex items-center gap-6">
            {/* Proposal Category - Light Green */}
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-black text-black/80 uppercase">Proposal Category:</span>
              <select 
                value={proposalCat} 
                onChange={(e) => setProposalCat(e.target.value)} 
                className="text-[14px] font-bold border border-green-600/40 rounded-sm px-2 outline-none focus:border-green-600 bg-green-50 h-8 min-w-[60px] text-green-800"
              >
                <option>A</option><option>B</option><option>C</option>
              </select>
            </div>
            
            {/* Risk Level - Light Orange */}
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-black text-black/80 uppercase">Risk Level:</span>
              <select 
                value={riskLevel} 
                onChange={(e) => setRiskLevel(e.target.value)} 
                className="text-[14px] font-bold border border-orange-600/40 rounded-sm px-2 outline-none focus:border-orange-600 bg-orange-50 h-8 text-orange-800"
              >
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {/* Move to LOS - Light Blue */}
          <button className="px-4 py-1.5 bg-blue-50 text-blue-700 border-2 border-blue-500 text-[14px] font-black uppercase flex items-center gap-1.5 hover:bg-blue-100 rounded-sm transition-all">
            <RotateCcw size={15} /> MOVE TO LOS
          </button>
          
          {/* Save Draft - Yellow Light */}
          <button className="px-4 py-1.5 bg-yellow-50 text-yellow-700 border-2 border-yellow-500 text-[14px] font-black uppercase flex items-center gap-1.5 hover:bg-yellow-100 rounded-sm transition-all">
            <Save size={15} /> SAVE DRAFT
          </button>
          
          {/* Submit - Light Green and Larger Size */}
          <button className="px-8 py-1.5 bg-green-100 text-green-700 border-2 border-green-500 text-[15px] font-black uppercase flex items-center gap-2 hover:bg-green-200 rounded-sm shadow-md transition-all">
            <CheckCircle size={18} /> SUBMIT APPLICATION
          </button>
        </div>
      </div>

      {/* 2. TAB ROW (Sticky - Offset by Top Bar height) */}
    <div className="sticky top-[37px] bg-white border-b border-black/60 px-2 pt-2 flex items-end gap-1.5 shadow-sm z-[90]">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          style={{ fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif' }}
          className={`
            flex items-center gap-2 px-6 py-2 text-[16px] transition-all duration-300 ease-in-out
            rounded-t-lg border-t border-x border-black/60 uppercase tracking-wide font-normal
            relative overflow-hidden group
            ${activeTab === tab.name 
              ? "bg-gradient-to-b from-[#0052CC] to-[#003D99] text-white z-10 translate-y-[1px] shadow-[0_-2px_8px_rgba(0,82,204,0.2)]" 
              : "bg-gradient-to-b from-[#E1EFFF] to-[#D6E4FF] text-black hover:from-white hover:to-[#E1EFFF] hover:translate-y-[-1px]"
            }
          `}
        >
          {/* Subtle Shine Effect for Active Tab */}
          {activeTab === tab.name && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          )}
          
          <span className={`transition-transform duration-300 ${activeTab === tab.name ? 'scale-105' : 'group-hover:scale-100'}`}>
            {tab.icon}
          </span>
          
          <span className="whitespace-nowrap tracking-tight">
            {tab.name}
          </span>
        </button>
      ))}

      {/* Keyframe for the shine effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
      {/* 3. MAIN WORKSPACE (Natural Flow) */}
      <div className="p-2 w-full">
       {activeTab === 'Borrower Details' && (
    <div 
        className="w-full space-y-8 pb-32 px-4" 
        style={{ 
          fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif',
          color: 'rgba(0, 0, 0, 0.9)' 
        }}
      >
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
          <div 
            className="w-full space-y-6 pb-32 px-4" 
            style={{ fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif' }}
          >
            {/* Top Asset/Product Type Selector */}
            <div className="bg-white border border-black/60 rounded-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-sm">
              <FormSelect label="Type of Assets" options={["Secured", "UnSecured"]} value={assetSecured} onChange={(e) => setAssetSecured(e.target.value)} />
              <FormSelect label="Product Type" options={["Vehicles", "MSME", "LAP", "Business Loans", "Collateral"]} value={productType} onChange={(e) => setProductType(e.target.value)} />
            </div>

            {/* VEHICLES SECTION */}
            {productType === 'Vehicles' && (
              <div className="space-y-4">
                {/* Brand Blue Gradient Header */}
                <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                  <Car size={16} className="text-black/90" />
                  <span className="text-[14px] font-normal uppercase tracking-wide">Vehicle Specifications</span>
                </div>
                <div className="bg-white border border-black/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm rounded-b-sm">
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

                <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                  <ShieldCheck size={16} className="text-black/90" />
                  <span className="text-[14px] font-normal uppercase tracking-wide">Insurance Details</span>
                </div>
                <div className="bg-white border border-black/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm rounded-b-sm">
                  <FormField label="IDV" />
                  <FormField label="Expiry" type="date" />
                  <FormField label="Insurance Company" />
                  <FormField label="Premium" />
                </div>
              </div>
            )}

            {/* LAP SECTION */}
            {productType === 'LAP' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                  <FileText size={16} className="text-black/90" />
                  <span className="text-[14px] font-normal uppercase tracking-wide">Property Location Details</span>
                </div>
                <div className="bg-white border border-black/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm rounded-b-sm">
                  <FormSelect label="Property Type" options={["Residential", "Commercial", "Industrial"]} />
                  <FormField label="Flat No." /><FormField label="Apartment No." /><FormField label="Street Name" />
                  <FormField label="Area Name" /><FormField label="City" /><FormSelect label="State" options={indianStates} />
                  <FormField label="Distance from Office" /><FormSelect label="Any Rent received" options={["Yes", "No"]} />
                  <FormField label="Rent Amount (If yes)" /><FormField label="Guide Line Value" className="md:col-span-2" />
                </div>
              </div>
            )}

            {/* MSME SECTION */}
            {productType === 'MSME' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                  <ShieldCheck size={16} className="text-black/90" />
                  <span className="text-[14px] font-normal uppercase tracking-wide">Business Details</span>
                </div>
                <div className="bg-white border border-black/60 p-4 grid grid-cols-2 md:grid-cols-3 gap-4 shadow-sm rounded-b-sm">
                  <FormField label="Nature of Business" /><FormField label="Date of Incorporation" type="date" /><FormSelect label="Is it secured" options={["Yes", "No"]} />
                </div>
              </div>
            )}
          </div>
        )}

       {activeTab === 'Financial Terms' && (
          <div className="w-full pb-32 px-4" style={{ fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif' }}>
          {/* 3-COLUMN MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* COLUMN 1: CORE FINANCIAL TERMS */}
            <div className="flex flex-col">
              <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                <IndianRupee size={16} className="text-black/90" /> 
                <span className="text-[14px] font-normal uppercase tracking-wide">Financial Terms</span>
              </div>
              <div className="bg-white border border-black/60 p-4 space-y-4 shadow-sm rounded-b-sm">
                <FormField label="Loan Amount" />
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Tenure (Months)" />
                  <FormField label="Flat Rate (%)" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="IRR (%)" />
                  <FormField label="Insurance Deposit" />
                </div>
                <FormField label="Total Contract Value" />
                <FormSelect label="Repayment Terms" options={["Monthly", "Quarterly", "Bullet"]} />
                <FormSelect label="Moratorium" options={["No Moratorium", "One Month", "Two Month"]} />
                <FormSelect label="Advance" options={["EMI", "Interest"]} />
              </div>
            </div>

            {/* COLUMN 2: REPAYMENT STRUCTURE (STEP EMI) */}
            <div className="flex flex-col">
              <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                <RotateCcw size={16} className="text-black/90" /> 
                <span className="text-[14px] font-normal uppercase tracking-wide">Repayment Structure</span>
              </div>
              <div className="bg-white border border-black/60 p-4 space-y-4 shadow-sm rounded-b-sm">
                {/* Step 01 */}
                <div className="p-3 bg-[#F9FAFF] border border-black/60 rounded-sm">
                  <div className="text-[12px] font-normal text-black/90 uppercase mb-2">Step 01</div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="EMI Amount" />
                    <FormField label="No. of EMI" />
                  </div>
                </div>
                {/* Step 02 */}
                <div className="p-3 bg-[#F9FAFF] border border-black/60 rounded-sm">
                  <div className="text-[12px] font-normal text-black/90 uppercase mb-2">Step 02</div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="EMI Amount" />
                    <FormField label="No. of EMI" />
                  </div>
                </div>
                {/* Step 03 */}
                <div className="p-3 bg-[#F9FAFF] border border-black/60 rounded-sm">
                  <div className="text-[12px] font-normal text-black/90 uppercase mb-2">Step 03</div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="EMI Amount" />
                    <FormField label="No. of EMI" />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: INITIAL PAYMENT & DISBURSEMENT */}
            <div className="flex flex-col">
              <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
                <ShieldCheck size={16} className="text-black/90" /> 
                <span className="text-[14px] font-normal uppercase tracking-wide">Initial & Disbursement</span>
              </div>
              <div className="bg-white border border-black/60 p-4 space-y-3 shadow-sm rounded-b-sm">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="EMI Advance" />
                  <FormField label="Processing" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="RTO" />
                  <FormField label="Valuation" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Stamp Duty" />
                  <FormField label="RC Holding" />
                </div>
                <FormField label="Other Charges" />
                <FormSelect label="Repayment Mode" options={["E Nach", "Online", "Cash", "Others"]} />
                
                <div className="mt-4 pt-4 border-t border-black/60">
                  <FormField label="Payment Done To" placeholder="Dealer/Customer" />
                  <div className="grid grid-cols-3 gap-2 mt-3">
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
        <div className="w-full space-y-6 pb-32 px-4" style={{ fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif' }}>
        
        {/* ROW 1: TWO COLUMNS (BRANCH & HO) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* COLUMN 1: BRANCH LEVEL DETAILS */}
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
              <FileText size={16} className="text-black/90" /> 
              <span className="text-[14px] font-normal uppercase tracking-wide">Document Details at Branch Level</span>
            </div>
            <div className="bg-white border border-black/60 p-4 space-y-4 shadow-sm rounded-b-sm">
              <div className="grid grid-cols-2 gap-4">
                <FormSelect label="Document Type" options={["Original", "Photocopy", "Digitally Signed"]} />
                <FormField label="Verified By" placeholder="Employee Name/ID" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Obtained By" />
                <FormField label="FI Guarantor" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="FI of Borrower" />
                <FormField label="Loan Referred By" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="TVR Done By" />
                <FormField label="Vehicle by Agency (if any)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Vehicle Inspection By" />
                <FormField label="Property Valuation By" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Legal Opinion By" />
                <FormField label="Collection Tool By" />
              </div>
            </div>
          </div>

          {/* COLUMN 2: HO LEVEL DETAILS */}
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
              <ShieldCheck size={16} className="text-black/90" /> 
              <span className="text-[14px] font-normal uppercase tracking-wide">Document Details at HO Level</span>
            </div>
            <div className="bg-white border border-black/60 p-4 space-y-4 shadow-sm rounded-b-sm">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Documents Checked By" />
                <FormField label="Documents Verified By" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Loan Approved By" />
                <FormField label="Disbursed By" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="RC Online Checking" />
                <FormField label="Collection Tool By (HO)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Area Code" />
                <FormField label="TVR Done By (HO)" />
              </div>
              <FormSelect label="Stock Marked to Bank" options={["Select Bank", "HDFC", "ICICI", "SBI", "Axis", "Kotak"]} />
            </div>
          </div>
        </div>

        {/* ROW 2: PENDING DOCUMENTS CHECKLIST */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
            <Copy size={16} className="text-black/90" /> 
            <span className="text-[14px] font-normal uppercase tracking-wide">Pending Document Details (Check List)</span>
          </div>
          <div className="bg-white border border-black/60 p-4 shadow-sm rounded-b-sm">
            <div className="flex flex-wrap gap-x-12 gap-y-4 py-2 px-2">
              {["Agreement book", "RC Book", "HYP Endorsement", "Insurance Copy", "NOC Certificate", "Permit Copy"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-blue-700 border-black/60 rounded cursor-pointer" />
                  <span className="text-[14px] font-normal text-black/90 group-hover:text-black uppercase tracking-tight">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: UPLOAD DOCUMENTS SECTION */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
            <Send size={16} className="text-black/90" /> 
            <span className="text-[14px] font-normal uppercase tracking-wide">Upload Documents Section</span>
          </div>
          <div className="bg-white border border-black/60 p-5 shadow-sm rounded-b-sm space-y-6">
            
            {/* SUB-ROW 1: INPUT CONTROLS */}
            <div className="flex flex-col md:flex-row items-end gap-6 bg-[#F9FAFF] p-4 border border-black/20 rounded-sm">
              <FormSelect 
                label="Select Document Type" 
                options={["PAN Card", "Aadhar", "Property Tax", "RC Copy", "Agreement", "Insurance"]} 
                className="flex-1"
              />
              <div className="flex-[2] w-full">
                <label className="text-[14px] text-black/90 font-normal uppercase tracking-tight mb-1 block">Browse Attachment</label>
                <div className="flex gap-3">
                  <input 
                    type="file" 
                    className="block w-full text-[14px] text-black/90 file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-[12px] file:font-normal file:bg-blue-800 file:text-white hover:file:bg-blue-900 cursor-pointer border border-black/60 bg-white shadow-sm"
                  />
                  <button className="bg-blue-800 text-white px-8 py-1.5 text-[14px] font-normal rounded-sm uppercase hover:bg-blue-900 transition-all shadow-md active:scale-95">
                    Upload
                  </button>
                </div>
              </div>
            </div>

            {/* SUB-ROW 2: DATA TABLE */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[14px] font-normal text-black/60 uppercase tracking-widest">Linked Attachments Registry</span>
                <span className="text-[12px] text-blue-800 font-normal uppercase">Total Files: 1</span>
              </div>
              <div className="border border-black/60 rounded-sm overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] border-b border-black/60 shadow-sm">
                      <th className="px-4 py-3 text-[14px] font-normal text-black/90 uppercase tracking-wider w-24">
                        Preview
                      </th>
                      <th className="px-4 py-3 text-[14px] font-normal text-black/90 uppercase tracking-wider">
                        Document Category
                      </th>
                      <th className="px-4 py-3 text-[14px] font-normal text-black/90 uppercase tracking-wider">
                        File Name
                      </th>
                      <th className="px-4 py-3 text-[14px] font-normal text-black/90 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-4 py-3 text-[14px] font-normal text-black/90 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 bg-white">
                    <tr className="hover:bg-blue-50/40 transition-colors group text-black/90">
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 bg-white rounded-sm border border-black/20 overflow-hidden cursor-pointer relative shadow-sm group-hover:border-blue-400">
                          <img src="https://via.placeholder.com/150" alt="preview" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[14px]">
                        <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-900 border border-blue-100">PAN Card</span>
                      </td>
                      <td className="px-4 py-3 text-[14px]">pan_card_front.jpg</td>
                      <td className="px-4 py-3 text-[14px] text-black/40">1.2 MB</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end items-center gap-4">
                          <button className="text-blue-800 hover:text-blue-900 text-[14px] uppercase flex items-center gap-1">
                            <FileText size={14} /> View
                          </button>
                          <button className="text-red-700 hover:text-red-900 text-[14px] uppercase flex items-center gap-1">
                            <RotateCcw size={14} /> Remove
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
        <div className="w-full pb-32 px-4" style={{ fontFamily: 'Calibri, Candara, Segoe UI, Optima, Arial, sans-serif' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* COLUMN 1: MODEL & LENDER INFO */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
            <Share2 size={16} className="text-black/90" /> 
            <span className="text-[14px] font-normal uppercase tracking-wide">Contribution Model</span>
          </div>
          <div className="bg-white border border-black/60 p-4 space-y-4 shadow-sm rounded-b-sm">
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
          <div className="bg-gradient-to-r from-[#E1EFFF] to-[#D6E4FF] text-black/90 border border-black/60 px-3 py-1.5 rounded-t-lg shadow-sm flex items-center gap-2">
            <IndianRupee size={16} className="text-black/90" /> 
            <span className="text-[14px] font-normal uppercase tracking-wide">Revenue & Risk Share</span>
          </div>
          <div className="bg-white border border-black/60 p-4 shadow-sm rounded-b-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <FormField label="If Contribution Share %" />
              <FormField label="EMI Share" />
              <FormField label="% of Revenue Share" />
              <FormField label="Risk Share" />
            </div>
            
            {/* The note section updated to match the brand blue style */}
            <div className="mt-6 p-3 bg-[#F9FAFF] border border-black/20 rounded-sm">
              <p className="text-[14px] text-black/90 leading-tight">
                <span className="font-bold text-blue-900">Note:</span> Co-lending terms are governed by the master agreement between the primary financier and the participating partner.
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

     {/* 4. COMPACT PERSISTENT NAVIGATION BAR */}
<div className="fixed bottom-[40px] left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-black/20 py-1.5 flex justify-end items-center px-6 gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.06)] z-[80]">
  
  {/* Previous Section Button - Light Brand Blue Style */}
  {activeTab !== tabs[0].name && (
    <button 
      onClick={handlePrev} 
      className="px-4 py-1.5 bg-[#E1EFFF] border-2 border-[#0052CC]/20 text-[#0052CC] text-[11px] font-black rounded-md flex items-center gap-2 hover:bg-black hover:text-white hover:border-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
    >
      <ChevronLeft size={14} strokeWidth={3} /> 
      Previous Section
    </button>
  )}

  {/* Next / Final Review Button - Light Brand Blue with Shimmer */}
  {activeTab !== tabs[tabs.length - 1].name ? (
    <button 
      onClick={handleNext} 
      className="relative overflow-hidden px-6 py-2 bg-[#E1EFFF] border-2 border-[#0052CC]/30 text-[#0052CC] text-[11px] font-black rounded-md flex items-center gap-2 hover:bg-[#0052CC] hover:text-white uppercase tracking-[0.15em] transition-all duration-300 group active:scale-95 shadow-sm"
    >
      {/* Shimmer Effect */}
      <span className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-full group-hover:animate-[shimmer_0.75s_ease-out]" style={{ filter: 'blur(8px)' }} />
      
      <span className="relative z-10">Next Section</span>
      <ChevronRight size={14} strokeWidth={3} className="relative z-10 transition-transform group-hover:translate-x-1" />
    </button>
  ) : (
    <button className="px-6 py-2 bg-emerald-600 text-white text-[11px] font-black rounded-md flex items-center gap-2 hover:bg-emerald-800 uppercase tracking-[0.15em] transition-all shadow-[0_5px_15px_rgba(16,185,129,0.2)] active:scale-95">
      Final Review <CheckCircle size={14} strokeWidth={3} />
    </button>
  )}

  {/* Shimmer Keyframes */}
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes shimmer {
      100% { transform: translateX(450%) skewX(-25deg); }
    }
  `}} />
</div>
     

    </div>
  );
};

export default ContractEditForm;