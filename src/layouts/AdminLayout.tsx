import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ShoppingBag, Settings, LogOut, Activity, LayoutTemplate, Box, Home, ChevronRight, ChevronDown, Image as ImageIcon, Code } from 'lucide-react';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';

export function AdminLayout() {
  const location = useLocation();
  const [openSetting, setOpenSetting] = useState(
    location.pathname.startsWith('/admin/settings')
  );
  
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Activity },
    { name: 'Halaman Beranda', href: '/?edit=true', icon: LayoutTemplate },
    { name: 'Halaman', href: '/admin/pages', icon: FileText },
    { name: 'Pos', href: '/admin/posts', icon: FileText },
    { name: 'Media', href: '/admin/media', icon: ImageIcon },
    { name: 'Produk', href: '/admin/products', icon: Box },
    { name: 'Pesanan', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Insert Script', href: '/admin/scripts', icon: Code },
  ];

  const settingsSubItems = [
    { name: 'Umum', href: '/admin/settings/general' },
    { name: 'Konektor', href: '/admin/settings/connectors' },
    { name: 'Menulis', href: '/admin/settings/writing' },
    { name: 'Membaca', href: '/admin/settings/reading' },
    { name: 'Diskusi', href: '/admin/settings/discussion' },
    { name: 'Media', href: '/admin/settings/media' },
    { name: 'Permalink', href: '/admin/settings/permalinks' },
    { name: 'Privasi', href: '/admin/settings/privacy' },
    { name: 'Slider Produk', href: '/admin/settings/slider' },
  ];

  const isSettingsActive = location.pathname.startsWith('/admin/settings');

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col font-sans">
      <SEO title="Dashboard ‹ PT Panca Prima Wijaya — WordPress" description="Dashboard" />
      
      {/* Top Admin Bar */}
      <div className="h-10 bg-[#1d2327] text-[#f0f0f1] flex items-center justify-between px-4 z-50 shrink-0 border-b border-[#3c434a]">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-5 w-auto object-contain bg-white rounded-sm px-1" />
          </Link>
          <select 
            className="bg-[#2c3338] text-white text-[13px] border border-[#3c434a] rounded px-2 py-1 outline-none"
            value={localStorage.getItem('currentSite') || 'panca'}
            onChange={(e) => {
              localStorage.setItem('currentSite', e.target.value);
              window.location.reload();
            }}
          >
            <option value="panca">PT Panca Prima Wijaya</option>
            <option value="sensor">SensorGempa.com</option>
          </select>
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <span className="hover:text-[#72aee6] cursor-pointer transition-colors">Halo, admin</span>
          <div className="w-5 h-5 bg-[#3c434a] rounded-sm flex items-center justify-center">
            A
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[160px] bg-[#1d2327] text-white flex flex-col shrink-0 overflow-y-auto">
          <nav className="flex-1 py-3 text-[13px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/admin' ? location.pathname === item.href : location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 transition-colors relative",
                    isActive ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#1d2327] hover:text-[#72aee6]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                  {item.name}
                  {isActive && <div className="absolute right-0 w-1 h-full bg-[#72aee6] top-0" />}
                </Link>
              );
            })}
            
            {/* Settings Menu */}
            <div className="relative group">
               <button
                 onClick={() => setOpenSetting(!openSetting)}
                 className={cn(
                   "w-full flex items-center gap-3 px-3 py-2 transition-colors relative",
                   isSettingsActive || openSetting ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#1d2327] hover:text-[#72aee6]"
                 )}
               >
                 <Settings className={cn("w-4 h-4", (isSettingsActive || openSetting) ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                 Pengaturan
                 {(isSettingsActive || openSetting) && <div className="absolute right-0 w-1 h-full bg-[#72aee6] top-0" />}
               </button>
               
               {(openSetting || isSettingsActive) && (
                 <div className="bg-[#32373c] py-1">
                   {settingsSubItems.map(subItem => {
                     const isSubActive = location.pathname.startsWith(subItem.href) || (location.pathname === '/admin/settings' && subItem.href === '/admin/settings/general');
                     return (
                       <Link
                         key={subItem.name}
                         to={subItem.href}
                         className={cn(
                           "block px-10 py-1.5 transition-colors",
                           isSubActive ? "text-white font-medium" : "text-[#c3c4c7] hover:text-[#72aee6]"
                         )}
                       >
                         {subItem.name}
                       </Link>
                     );
                   })}
                 </div>
               )}
            </div>

            <div className="mt-8">
              <Link 
                to="/" 
                onClick={() => localStorage.removeItem('admin_token')}
                className="flex items-center gap-3 px-3 py-2 text-[13px] text-[#c3c4c7] hover:text-[#72aee6]"
              >
                <LogOut className="w-4 h-4 text-[#a7aaad]" />
                Keluar
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-5 text-[#3c434a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
