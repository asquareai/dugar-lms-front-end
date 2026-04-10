import React, { useState, useMemo } from 'react';
import NavItem from './NavItem';
import MobileSidebar from './MobileSideBar';
import { Menu, Bell, User } from 'lucide-react';

import logo from '../assets/logo.png'; 

const TopNavbar = ({ menuTree, userData, notificationsCount = 5 }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // BULLETPROOF SORTING LOGIC
  const sortedMenu = useMemo(() => {
    if (!menuTree || !Array.isArray(menuTree)) return [];
    
    // Create a copy to avoid mutating props
    return [...menuTree].sort((a, b) => {
      // Your NavItem uses item.menuName, so we must check that property
      const nameA = (a.menuName || a.menu_name || "").toLowerCase().trim();
      const nameB = (b.menuName || b.menu_name || "").toLowerCase().trim();

      // 1. FORCE 'DASHBOARD' TO THE FRONT (-1 moves it to the start)
      if (nameA === 'dashboard') return -1;
      if (nameB === 'dashboard') return 1;

      // 2. FOR EVERYTHING ELSE, USE THE DB DISPLAY ORDER
      const orderA = a.displayOrder || a.display_order || 0;
      const orderB = b.displayOrder || b.display_order || 0;
      
      return orderA - orderB;
    });
  }, [menuTree]);

  return (
    <>
      <nav className="w-full h-[72px] bg-gradient-to-b from-white to-blue-100 border-b-2 border-blue-300 px-3 md:px-6 flex items-center justify-between sticky top-0 z-[100] shadow-md">
        
        {/* LEFT: Mobile Toggle & Brand */}
        <div className="flex items-center h-full gap-3 md:gap-8">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 bg-white/50 hover:bg-white rounded-md text-slate-900 border border-blue-200 shadow-sm transition-all"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-4 pr-3 md:pr-6 md:border-r border-blue-300/40 h-12 shrink-0">
            <img src={logo} alt="Dugar Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col justify-center leading-[0.95]">
              <span className="text-[18px] font-black text-black uppercase tracking-tighter" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Dugar
              </span>
              <span className="text-[18px] font-black text-[#0052CC] uppercase tracking-tighter" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Loan Edge
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Using the Sorted Menu */}
          <div className="hidden lg:flex items-center h-full gap-1">
            {sortedMenu.map((item) => (
              <NavItem key={item.menuId} item={item} depth={0} />
            ))}
          </div>
        </div>

        {/* RIGHT: User & Notifications */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-[#0052CC] hover:bg-white rounded-full transition-all relative border border-blue-200/50 bg-white/30">
            <Bell size={20} strokeWidth={2.5} />
            {notificationsCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                {notificationsCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3 pl-3 border-l-2 border-blue-300/40 h-10">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-[13px] font-black text-black uppercase">
                {userData?.fullName}
              </span>
              <span className="text-[10px] font-black text-[#0052CC] uppercase tracking-wider">
                {userData?.roleName}
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#0052CC] text-white flex items-center justify-center border-2 border-white shadow-sm font-bold text-sm">
                {userData?.fullName?.charAt(0) || <User size={18} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <MobileSidebar 
            isOpen={isMobileOpen} 
            onClose={() => setIsMobileOpen(false)} 
            menuTree={sortedMenu} 
        />
      )}
    </>
  );
};

export default TopNavbar;