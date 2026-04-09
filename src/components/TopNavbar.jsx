import React, { useState } from 'react';
import NavItem from './NavItem';
import MobileSidebar from './MobileSideBar';
import { LogOut, Clock, Menu, Bell } from 'lucide-react';

import logo from '../assets/logo.png'; 

const TopNavbar = ({ menuTree, userData, notificationsCount = 5 }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      {/* VERTICAL GRADIENT: 
          - bg-gradient-to-b: Vertical flow (Top to Bottom)
          - from-white: Clean top edge
          - to-blue-100: Visible blue base that anchors the bar
          - border-blue-300: Stronger bottom line for definition
      */}
      <nav className="w-full h-12 bg-gradient-to-b from-white to-blue-100 border-b border-blue-300 px-3 md:px-6 flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        
        {/* LEFT: Mobile Toggle & Brand */}
        <div className="flex items-center h-full gap-3 md:gap-8">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-1.5 bg-white/50 hover:bg-white rounded-md text-slate-900 border border-blue-200 shadow-sm transition-all"
          >
            <Menu size={20} strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-2 pr-3 md:pr-6 md:border-r border-blue-300/40 h-6 shrink-0">
            <img 
                src={logo} 
                alt="Dugar Loan Edge Logo" 
                className="h-7 w-auto object-contain" 
            />
            <span className="text-[13px] font-medium text-black tracking-tight uppercase whitespace-nowrap">
                Dugar <span className="text-[#0052CC] hidden sm:inline font-bold">Loan Edge</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center h-full gap-1">
            {menuTree?.sort((a, b) => a.displayOrder - b.displayOrder).map((item) => (
              <NavItem key={item.menuId} item={item} depth={0} />
            ))}
          </div>
        </div>

        {/* RIGHT: Last Login, Notifications, & User Info */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* 1. Last Access Details */}
          <div className="flex items-center gap-2 px-2 md:px-4 md:border-r border-blue-300/40 h-6">
            <Clock size={14} className="text-[#0052CC] hidden sm:block" />
            <div className="flex flex-col items-end md:items-start">
              <span className="text-[8px] md:text-[9px] uppercase font-bold text-slate-500 tracking-widest leading-none hidden md:block">
                Last Access
              </span>
              <span className="text-[9px] md:text-[11px] text-black font-semibold whitespace-nowrap">
                {userData?.lastLogin || "03-Apr-2026 | 17:05"}
              </span>
            </div>
          </div>

          {/* 2. Notifications Bell */}
          <button className="p-1.5 md:p-2 text-[#0052CC] bg-white/80 hover:bg-white rounded-full transition-all relative group border border-blue-200 shadow-sm">
            <Bell size={18} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white ring-2 ring-white">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* 3. User Identity & Logout */}
          <div className="flex items-center gap-2 md:gap-4 ml-1 md:ml-2 pl-2 border-l border-blue-300/40 h-6">
            <div className="flex flex-col items-end">
              <span className="text-[11px] md:text-[13px] font-bold text-black leading-tight">
                {userData?.fullName}
              </span>
              <span className="text-[9px] md:text-[10px] font-extrabold text-[#0052CC] uppercase tracking-wider">
                {userData?.roleName}
              </span>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="p-1.5 md:p-2 bg-white/80 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 rounded-lg transition-all group shadow-sm"
              title="Logout"
            >
              <LogOut size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <MobileSidebar 
            isOpen={isMobileOpen} 
            onClose={() => setIsMobileOpen(false)} 
            menuTree={menuTree}
        />
      )}
    </>
  );
};

export default TopNavbar;