import React from 'react';
import { Power, Clock } from 'lucide-react';

const Footer = ({ userData }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const Shortcut = ({ label, keyCombo }) => (
    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 border border-white/20 rounded">
      <span className="text-[9px] font-bold text-white uppercase tracking-tighter">{label}</span>
      <kbd className="px-1 rounded bg-white/20 text-white text-[9px] font-bold border border-white/30">
        {keyCombo}
      </kbd>
    </div>
  );

  return (
    <footer className="w-full bg-gradient-to-b from-[#003B94] to-[#002B6B] border-t border-white/10 py-1.5 px-6 sticky bottom-0 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LEFT: Shortcuts - Text changed to White */}
        <div className="flex items-center gap-4">
          <p className="text-[9px] text-white font-extrabold uppercase tracking-[0.15em] border-r border-white/20 pr-4">
            Command Center
          </p>
          <div className="flex items-center gap-2">
            <Shortcut label="New" keyCombo="Alt+N" />
            <Shortcut label="Save" keyCombo="Alt+S" />
            <Shortcut label="Search" keyCombo="Alt+F" />
          </div>
        </div>

        {/* RIGHT: Status, Login Info & Logout */}
        <div className="flex items-center gap-5">
          
          {/* Last Login - Changed text to White */}
          <div className="flex items-center gap-2 px-3 py-0.5 bg-white/10 border border-white/10 rounded">
            <Clock size={10} className="text-white" />
            <span className="text-[9px] font-bold text-white uppercase tracking-tight">
              Last Login: <span className="font-black">{userData?.lastLogin || "10-Apr-2026 | 10:15"}</span>
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-black/30 border border-white/10 rounded-full">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)]"></span>
            </div>
            <span className="text-[9px] font-bold text-white uppercase tracking-widest">Live</span>
          </div>

          {/* Versioning & Brand */}
          <div className="flex items-center gap-2 border-r border-white/10 pr-5">
            <span className="text-[9px] font-bold text-blue-200 uppercase tracking-tighter">v2.0.0</span>
            <span className="h-2 w-[1px] bg-white/10" />
            <span className="text-[9px] font-medium text-white uppercase tracking-[0.2em]">
              Dugar <span className="font-black">Edge</span>
            </span>
          </div>

          {/* Logout Button - Default Red Background */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white border border-red-500 rounded shadow-sm transition-all duration-200 group"
          >
            <Power size={11} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest">End Session</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;