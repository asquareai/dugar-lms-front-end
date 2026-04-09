import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ChevronRight, Circle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ item, depth = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  // 1. DATA MAPPING
  const subMenus = item?.subMenus || item?.submenus || [];
  const hasSubMenu = subMenus.length > 0;
  
  // 2. PATH LOGIC - Using urlPath from your JSON
  const targetPath = item.urlPath || item.path;
  const isLink = !hasSubMenu && targetPath && targetPath !== "#";
  const isActive = location.pathname === targetPath;

  // 3. ICON LOGIC
  const getIcon = (name) => {
    if (!name) return Circle;
    const PascalName = name.split(/[-_]/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
    return Icons[name] || Icons[PascalName] || Circle;
  };

  const IconComponent = getIcon(item.icon);

  // 4. CSS CLASSES - Defined here so they are available below
  const commonClasses = `
    flex items-center gap-3 transition-all duration-200 relative whitespace-nowrap uppercase tracking-tight
    ${depth === 0 
      ? 'px-4 h-9 rounded-md text-[13px] font-medium' 
      : 'w-full py-2.5 px-4 rounded-md text-[12px] font-normal'}
    ${isActive && depth === 0 ? 'text-[#0052CC] bg-blue-50/80 font-bold' : 'text-black'}
    ${isHovered && depth === 0 ? 'text-[#0052CC] bg-blue-50/50' : ''}
    ${isHovered && depth > 0 ? 'bg-[#0052CC] text-white' : ''}
  `;

  return (
    <div 
      className={`relative h-full flex items-center ${depth > 0 ? 'w-full' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLink ? (
        <Link 
          to={targetPath} 
          className={commonClasses}
          onClick={() => console.log("Navigating to:", targetPath)}
        >
          <IconComponent size={depth === 0 ? 16 : 14} strokeWidth={isActive ? 3 : 2} />
          <span className="flex-1 text-left">{item.menuName}</span>
          
          {(isActive || (isHovered && depth === 0)) && (
            <div className="absolute -bottom-[2px] left-2 right-2 h-[2px] bg-[#0052CC] rounded-full z-[120]" />
          )}
        </Link>
      ) : (
        <button type="button" className={commonClasses}>
          <IconComponent size={depth === 0 ? 16 : 14} strokeWidth={2} />
          <span className="flex-1 text-left">{item.menuName}</span>
          
          {hasSubMenu && depth > 0 && (
            <ChevronRight 
              size={14} 
              strokeWidth={2}
              className={`ml-4 transition-transform duration-300 ${isHovered ? 'translate-x-1 text-white' : 'text-black/40'}`} 
            />
          )}
          
          {isHovered && depth === 0 && (
            <div className="absolute -bottom-[2px] left-2 right-2 h-[2px] bg-[#0052CC] rounded-full z-[120]" />
          )}
        </button>
      )}

      {/* Recursive Dropdown Section */}
      {hasSubMenu && (
        <div className={`
          absolute z-[110] transition-all duration-300 ease-out
          ${isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}
          ${depth === 0 ? 'top-[100%] left-0 pt-2 w-max' : 'left-[100%] top-[-4px] pl-1 w-max'}
        `}>
          <div className="bg-white border border-slate-200 shadow-xl rounded-lg p-1.5 flex flex-col min-w-[200px]">
            {subMenus
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
              .map((sub) => (
                <div key={sub.menuId} className="relative flex items-center rounded-md mb-0.5">
                   <NavItem item={sub} depth={depth + 1} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;