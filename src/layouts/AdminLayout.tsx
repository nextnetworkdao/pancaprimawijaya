import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ShoppingBag, Settings, LogOut, Activity, LayoutTemplate, Box, Home, ChevronRight, ChevronDown, Image as ImageIcon, Code, Menu, X, Store, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';

export function AdminLayout() {
  const location = useLocation();
  const [openSetting, setOpenSetting] = useState(
    location.pathname.startsWith('/admin/settings')
  );
  const [openStore, setOpenStore] = useState(
    location.pathname.startsWith('/admin/store-management') || 
    location.pathname.startsWith('/admin/products')
  );
  const [openPages, setOpenPages] = useState(
    location.pathname.startsWith('/admin/pages') || 
    location.pathname.startsWith('/admin/static-pages')
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItemsBefore = [
    { name: 'Dashboard', href: '/admin', icon: Activity },
    { name: 'Halaman Beranda', href: '/?edit=true', icon: LayoutTemplate },
  ];

  const pagesSubItems = [
    { name: 'Halaman Biasa', href: '/admin/pages' },
    { name: 'Halaman Statis (Layanan)', href: '/admin/static-pages' },
  ];

  const navItemsAfterPages = [
    { name: 'Pos', href: '/admin/posts', icon: FileText },
    { name: 'Media', href: '/admin/media', icon: ImageIcon },
  ];

  const navItemsAfter = [
    { name: 'Pesanan', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Insert Script', href: '/admin/scripts', icon: Code },
    { name: 'Analisa SEO', href: '/admin/seo-analysis', icon: TrendingUp },
  ];

  const storeSubItems = [
    { name: 'Pengaturan Toko', href: '/admin/store-management' },
    { name: 'Produk', href: '/admin/products' },
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

  const isStoreActive = location.pathname.startsWith('/admin/store-management') || location.pathname.startsWith('/admin/products');
  const isPagesActive = location.pathname.startsWith('/admin/pages') || location.pathname.startsWith('/admin/static-pages');
  const isSettingsActive = location.pathname.startsWith('/admin/settings');

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col font-sans relative">
      <SEO title="Dashboard ‹ PT Panca Prima Wijaya — WordPress" description="Dashboard" />
      
      {/* Top Admin Bar */}
      <div className="h-10 bg-[#1d2327] text-[#f0f0f1] flex items-center justify-between px-2 sm:px-4 z-50 shrink-0 border-b border-[#3c434a]">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            type="button" 
            className="md:hidden p-1 text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-4 sm:h-5 w-auto object-contain bg-white rounded-sm px-1" />
          </Link>
          <select 
            className="bg-[#2c3338] text-white text-[11px] sm:text-[13px] border border-[#3c434a] rounded px-1 sm:px-2 py-1 outline-none max-w-[120px] sm:max-w-none"
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
        <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-[13px]">
          <span className="hover:text-[#72aee6] cursor-pointer transition-colors hidden sm:inline">Halo, admin</span>
          <div className="w-5 h-5 bg-[#3c434a] rounded-sm flex items-center justify-center">
            A
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={cn(
          "bg-[#1d2327] text-white flex flex-col shrink-0 overflow-y-auto z-40 transition-transform duration-300 ease-in-out absolute md:relative h-full w-[240px] md:w-[160px]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <nav className="flex-1 py-3 text-[14px] md:text-[13px]">
            {navItemsBefore.map((item) => {
               const Icon = item.icon;
               const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
               return (
                 <Link
                   key={item.name}
                   to={item.href}
                   onClick={() => setIsSidebarOpen(false)}
                   className={cn(
                     "flex items-center gap-3 px-4 md:px-3 py-3 md:py-2 transition-colors relative group",
                     isActive ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
                   )}
                 >
                   <Icon className={cn("w-5 h-5 md:w-4 md:h-4", isActive ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                   {item.name}
                   {isActive && <div className="absolute right-0 w-1 h-full bg-[#72aee6] top-0" />}
                 </Link>
               );
            })}

            {/* Halaman (Collapsible list of pages) Section */}
            <div className="relative group">
               <button
                 type="button"
                 onClick={() => setOpenPages(!openPages)}
                 className={cn(
                   "w-full flex items-center justify-between px-4 md:px-3 py-3 md:py-2 transition-colors relative text-left outline-none",
                   isPagesActive || openPages ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
                 )}
               >
                 <div className="flex items-center gap-3">
                   <FileText className={cn("w-5 h-5 md:w-4 md:h-4", (isPagesActive || openPages) ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                   Halaman
                 </div>
                 <ChevronDown className={cn("w-4 h-4 transition-transform", openPages ? "rotate-180" : "")} />
                 {(isPagesActive || openPages) && <div className="absolute right-0 w-1 h-full bg-[#72aee6] top-0" />}
               </button>
               
               {(openPages || isPagesActive) && (
                 <div className="bg-[#32373c] py-1">
                   {pagesSubItems.map(subItem => {
                     const isSubActive = location.pathname === subItem.href || (subItem.href === '/admin/pages' && location.pathname.startsWith('/admin/page/'));
                     return (
                       <Link
                         key={subItem.name}
                         to={subItem.href}
                         onClick={() => setIsSidebarOpen(false)}
                         className={cn(
                           "block text-left px-12 md:px-10 py-2 md:py-1.5 transition-colors text-[13px] md:text-[12px]",
                           isSubActive ? "text-[#72aee6] font-bold" : "text-[#c3c4c7] hover:text-[#72aee6]"
                         )}
                       >
                         • {subItem.name}
                       </Link>
                     );
                   })}
                 </div>
               )}
            </div>

            {navItemsAfterPages.map((item) => {
               const Icon = item.icon;
               const isActive = location.pathname.startsWith(item.href);
               return (
                 <Link
                   key={item.name}
                   to={item.href}
                   onClick={() => setIsSidebarOpen(false)}
                   className={cn(
                     "flex items-center gap-3 px-4 md:px-3 py-3 md:py-2 transition-colors relative group",
                     isActive ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
                   )}
                 >
                   <Icon className={cn("w-5 h-5 md:w-4 md:h-4", isActive ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                   {item.name}
                   {isActive && <div className="absolute right-0 w-1 h-full bg-[#72aee6] top-0" />}
                 </Link>
               );
            })}

            {/* Kelola Toko Collapsible Menu */}
            <div className="relative group">
               <button
                 onClick={() => setOpenStore(!openStore)}
                 className={cn(
                   "w-full flex items-center justify-between px-4 md:px-3 py-3 md:py-2 transition-colors relative text-left outline-none",
                   isStoreActive || openStore ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
                 )}
               >
                 <div className="flex items-center gap-3">
                   <Store className={cn("w-5 h-5 md:w-4 md:h-4", (isStoreActive || openStore) ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                   Kelola Toko
                 </div>
                 <ChevronDown className={cn("w-4 h-4 transition-transform", openStore ? "rotate-180" : "")} />
                 {(isStoreActive || openStore) && <div className="absolute right-0 w-1 h-full bg-[#72aee6] top-0" />}
               </button>
               
               {(openStore || isStoreActive) && (
                 <div className="bg-[#32373c] py-1">
                   {storeSubItems.map(subItem => {
                     const isSubActive = location.pathname.startsWith(subItem.href);
                     return (
                       <Link
                         key={subItem.name}
                         to={subItem.href}
                         onClick={() => setIsSidebarOpen(false)}
                         className={cn(
                           "block text-left px-12 md:px-10 py-2 md:py-1.5 transition-colors",
                           isSubActive ? "text-white font-medium text-[#72aee6]" : "text-[#c3c4c7] hover:text-[#72aee6]"
                         )}
                       >
                         {subItem.name}
                       </Link>
                     );
                   })}
                 </div>
               )}
            </div>

            {navItemsAfter.map((item) => {
               const Icon = item.icon;
               const isActive = location.pathname.startsWith(item.href);
               return (
                 <Link
                   key={item.name}
                   to={item.href}
                   onClick={() => setIsSidebarOpen(false)}
                   className={cn(
                     "flex items-center gap-3 px-4 md:px-3 py-3 md:py-2 transition-colors relative group",
                     isActive ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
                   )}
                 >
                   <Icon className={cn("w-5 h-5 md:w-4 md:h-4", isActive ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
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
                   "w-full flex items-center justify-between px-4 md:px-3 py-3 md:py-2 transition-colors relative text-left outline-none",
                   isSettingsActive || openSetting ? "bg-[#2271b1] text-white font-medium" : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
                 )}
               >
                 <div className="flex items-center gap-3">
                   <Settings className={cn("w-5 h-5 md:w-4 md:h-4", (isSettingsActive || openSetting) ? "text-white" : "text-[#a7aaad] group-hover:text-[#72aee6]")} />
                   Pengaturan
                 </div>
                 <ChevronDown className={cn("w-4 h-4 transition-transform", openSetting ? "rotate-180" : "")} />
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
                         onClick={() => setIsSidebarOpen(false)}
                         className={cn(
                           "block text-left px-12 md:px-10 py-2 md:py-1.5 transition-colors",
                           isSubActive ? "text-white font-medium text-[#72aee6]" : "text-[#c3c4c7] hover:text-[#72aee6]"
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
                onClick={() => {
                  localStorage.removeItem('admin_token');
                  setIsSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 md:px-3 py-3 md:py-2 text-[#c3c4c7] hover:text-[#72aee6] hover:bg-[#2c3338]"
              >
                <LogOut className="w-5 h-5 md:w-4 md:h-4 text-[#a7aaad]" />
                Keluar
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-5 text-[#3c434a] w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
