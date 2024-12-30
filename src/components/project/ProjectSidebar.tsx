import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  LayoutGrid,
  Cpu,
  ClipboardList,
  FolderOpen,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react';

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: 'dashboard', functional: true },
  { icon: Cpu, label: 'Device Details', path: 'device-details', functional: true },
  { icon: ClipboardList, label: 'Specs', path: 'spec', functional: true },
  { icon: FolderOpen, label: 'Results', path: 'results', functional: true },
  { icon: Calendar, label: 'Calendar', path: 'calendar', functional: false },
  { icon: Settings, label: 'Settings', path: 'settings', functional: false }
];

export function ProjectSidebar() {
  const { deviceId } = useParams();
  
  return (
    <div className="w-[72px] bg-white border-r border-gray-200 h-[calc(100vh-64px)]">
      <nav className="flex-1 w-full py-4">
        <div className="flex flex-col items-center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.functional ? `/project/${deviceId}/${item.path}` : '#'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full px-2 my-3 text-xs transition-colors relative group ${
                    isActive && item.functional
                      ? 'text-[#DC6B4A]'
                      : 'text-gray-500 hover:text-[#DC6B4A]'
                  }`
                }
                onClick={(e) => {
                  if (!item.functional) {
                    e.preventDefault();
                  }
                }}
              >
                {({ isActive }) => (
                  <>
                    <Icon className="h-6 w-6" />
                    <span className="text-[10px] text-center mt-1 leading-tight min-h-[24px] flex items-center justify-center">
                      {item.label}
                    </span>
                    {isActive && item.functional && (
                      <div className="absolute right-0 top-0 w-0.5 h-full bg-[#DC6B4A] rounded-l" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
      <div className="absolute bottom-4 w-[72px]">
        <button className="flex flex-col items-center justify-center w-full px-2 text-xs text-gray-500 hover:text-[#DC6B4A] transition-colors">
          <HelpCircle className="h-6 w-6" />
          <span className="text-[10px] text-center mt-1 leading-tight min-h-[24px] flex items-center justify-center">
            Help
          </span>
        </button>
      </div>
    </div>
  );
}