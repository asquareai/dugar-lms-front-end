import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ChevronRight, Circle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ item, depth = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  const subMenus = item?.subMenus || item?.submenus || [];
  const hasSubMenu = subMenus.length > 0;
  
  const targetPath = item.urlPath || item.path;
  const isLink = !hasSubMenu && targetPath && targetPath !== "#";
  const isActive = location.pathname === targetPath;

  const getIcon = (name) => {
    if (!name) return Circle;
    const PascalName = name.split(/[-_]/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
    return Icons[name] || Icons[PascalName] || Circle;
  };

  const IconComponent = getIcon(item.icon);

  // FONT SIZE UPDATE: Both depth 0 and submenus are now 16px
  const commonClasses = `
    flex items-center gap-2 transition-all duration-200 relative whitespace-nowrap uppercase tracking-tight
    ${depth === 0 
      ? 'px-2 h-10 rounded-md text-[16px] font-bold' 
      : 'w-full py-3 px-4 rounded-md text-[16px] font-bold'}
    ${isActive && depth === 0 ? 'text-[#0052CC] bg-blue-50/80' : 'text-black'}
    ${isHovered && depth === 0 ? 'text-[#0052CC] bg-blue-50/50' : ''}
    ${isHovered && depth > 0 ? 'bg-[#0052CC] text-white' : ''}
  `;

  const iconColor = (isHovered && depth > 0) ? '#FFFFFF' : '#0052CC';

  return (
    <div 
      style={{ fontFamily: 'Calibri, sans-serif' }}
      className={`relative h-full flex items-center ${depth > 0 ? 'w-full' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLink ? (
        <Link 
          to={targetPath} 
          className={commonClasses}
        >
          <IconComponent 
            size={depth === 0 ? 18 : 16} 
            strokeWidth={isActive ? 3 : 2.5} 
            color={iconColor} 
          />
          <span className="flex-1 text-left">{item.menuName}</span>
          
          {(isActive || (isHovered && depth === 0)) && (
            <div className="absolute bottom-0 left-1 right-1 h-[3px] bg-[#0052CC] rounded-t-full z-[120]" />
          )}
        </Link>
      ) : (
        <button type="button" className={commonClasses}>
          <IconComponent 
            size={depth === 0 ? 18 : 16} 
            strokeWidth={2.5} 
            color={iconColor} 
          />
          <span className="flex-1 text-left">{item.menuName}</span>
          
          {hasSubMenu && depth > 0 && (
            <ChevronRight 
              size={16} 
              strokeWidth={3}
              className={`ml-3 transition-transform duration-300 ${isHovered ? 'translate-x-1 text-white' : 'text-[#0052CC]/60'}`} 
            />
          )}
          
          {isHovered && depth === 0 && (
            <div className="absolute bottom-0 left-1 right-1 h-[3px] bg-[#0052CC] rounded-t-full z-[120]" />
          )}
        </button>
      )}

      {/* Dropdown Section */}
      {hasSubMenu && (
        <div className={`
          absolute z-[110] transition-all duration-300 ease-out
          ${isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}
          ${depth === 0 ? 'top-[100%] left-0 pt-1 w-max' : 'left-[100%] top-0 pl-1 w-max'}
        `}>
          <div className="bg-white border-2 border-slate-200 shadow-2xl rounded-xl p-2 flex flex-col min-w-[240px]">
            {subMenus
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
              .map((sub) => (
                <div key={sub.menuId} className="relative flex items-center rounded-md mb-1">
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