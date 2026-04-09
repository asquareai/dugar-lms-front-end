import React from 'react';

const Footer = () => {
  // Ultra-thin shortcut style
  const Shortcut = ({ label, keyCombo }) => (
    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 rounded">
      <span className="text-[9px] font-bold text-blue-200/60 uppercase tracking-tighter">{label}</span>
      <kbd className="px-1 rounded bg-blue-500/20 text-blue-100 text-[9px] font-bold border border-blue-400/30">
        {keyCombo}
      </kbd>
    </div>
  );

  return (
    <footer className="w-full bg-gradient-to-b from-[#003B94] to-[#002B6B] border-t border-white/10 py-1.5 px-6 sticky bottom-0 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* LEFT: Shortcuts - Ultra Thin */}
        <div className="flex items-center gap-4">
          <p className="text-[9px] text-blue-200 font-extrabold uppercase tracking-[0.15em] border-r border-white/10 pr-4">
            Command Center
          </p>
          <div className="flex items-center gap-2">
            <Shortcut label="New" keyCombo="Alt+N" />
            <Shortcut label="Save" keyCombo="Alt+S" />
            <Shortcut label="Search" keyCombo="Alt+F" />
          </div>
        </div>

        {/* RIGHT: Status - Compact & Dark */}
        <div className="flex items-center gap-5">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-black/20 border border-white/5 rounded-full">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)]"></span>
            </div>
            <span className="text-[9px] font-bold text-blue-100 uppercase tracking-widest">
              Live
            </span>
          </div>

          {/* Versioning */}
          <div className="flex items-center gap-2">
             <span className="text-[9px] font-bold text-blue-300/50 uppercase tracking-tighter">
              v2.0.0
            </span>
            <span className="h-2 w-[1px] bg-white/10" />
            <span className="text-[9px] font-medium text-blue-400 uppercase tracking-[0.2em]">
              Dugar <span className="font-black">Edge</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;