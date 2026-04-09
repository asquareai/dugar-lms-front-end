import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { X, ChevronDown } from 'lucide-react';

const MobileSidebar = ({ isOpen, onClose, menuTree }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      // 1. First, put it in the DOM (but keep it hidden/off-screen)
      setIsRendered(true);
      
      // 2. Wait for the browser to acknowledge the hidden state, then slide in
      timeoutId = setTimeout(() => {
        setIsAnimating(true);
      }, 10); // A tiny 10ms delay is enough to trigger the CSS transition
      
      document.body.style.overflow = 'hidden';
    } else {
      // 3. Slide out first
      setIsAnimating(false);
      
      // 4. Wait for the 300ms transition to finish before removing from DOM
      timeoutId = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      
      document.body.style.overflow = 'unset';
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[2000] lg:hidden flex">
      {/* BACKDROP: Fades in/out smoothly */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose} 
      />
      
      {/* SIDEBAR: Slides in/out smoothly using transform */}
      <div className={`relative w-[280px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
        isAnimating ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Branding Header */}
        <div className="h-14 flex items-center justify-between px-5 bg-[#0052CC] text-white shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-white rounded text-[#0052CC] flex items-center justify-center font-black text-[11px]">D</div>
             <span className="font-black text-[12px] uppercase tracking-widest">LMS Navigation</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-full active:scale-90 transition-transform"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable Menu Body */}
        <div className="flex-1 overflow-y-auto pb-10">
          {menuTree?.sort((a, b) => a.displayOrder - b.displayOrder).map((item) => (
            <MobileAccordionItem key={item.menuId} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-component for Accordion with Slide Down effect
const MobileAccordionItem = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenus = item?.subMenus || [];
  const hasSubMenu = subMenus.length > 0;
  const IconComponent = Icons[item.icon] || Icons.Circle;

  return (
    <div className="w-full border-b border-slate-50">
      <button 
        onClick={() => hasSubMenu && setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 py-4 px-5 transition-colors duration-200 ${
          depth === 0 ? 'font-black text-slate-900' : 'font-bold text-slate-700 text-[12px]'
        } ${isOpen && depth === 0 ? 'bg-blue-50/50 text-[#0052CC]' : 'bg-white'}`}
        style={{ paddingLeft: `${(depth * 20) + 20}px` }}
      >
        {depth === 0 && <IconComponent size={18} strokeWidth={2.5} />}
        <span className="flex-1 text-left uppercase tracking-tight">{item.menuName}</span>
        {hasSubMenu && (
          <ChevronDown size={16} strokeWidth={3} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Level 2, 3, 4 Sliding Logic */}
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: isOpen ? '1000px' : '0px', 
          opacity: isOpen ? '1' : '0' 
        }}
      >
        <div className="bg-slate-50/40">
          {subMenus.sort((a, b) => a.displayOrder - b.displayOrder).map((sub) => (
            <MobileAccordionItem key={sub.menuId} item={sub} depth={depth + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;