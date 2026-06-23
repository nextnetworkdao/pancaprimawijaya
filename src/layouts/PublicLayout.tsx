import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Phone, Menu, X, Globe, Home, MessageSquare, User, Building, ChevronDown } from 'lucide-react';
import { useCart } from '../store';
import { cn } from '../lib/utils';
import { resetAutoLinkTracker } from '../utils/autoLink';
import { useLanguage } from '../context/LanguageContext';

export function PublicLayout() {
  const { getTotalItemsBySite } = useCart();
  const location = useLocation();
  const { isEn, t, langLink, toggleLanguage } = useLanguage();
  const [site, setSite] = useState<'panca' | 'sensor'>('panca');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSensorDropdownOpen, setIsSensorDropdownOpen] = useState(false);
  const [isPancaDropdownOpen, setIsPancaDropdownOpen] = useState(false);

  const sensorServices = [
    { name: isEn ? 'Early Warning System (EWS)' : 'Early Warning System (EWS)', path: '/sensor/early-warning-system' },
    { name: isEn ? 'TOYO Earthquake Sensor' : 'Sensor Gempa Toyo', path: '/sensor/sensor-gempa' },
    { name: isEn ? 'Building Management System (BMS)' : 'Building Management System (BMS)', path: '/sensor/building-management-system' },
    { name: isEn ? 'Real Time Monitoring System (RTMS)' : 'Real Time Monitoring System (RTMS)', path: '/sensor/real-time-monitoring-system-rtms' },
    { name: isEn ? 'Elevator & Escalator Spare Parts' : 'Spare Part Lift & Eskalator', path: '/sensor/sparepart-lift-terlengkap' },
  ];

  const pancaServices = [
    { name: isEn ? 'Agricultural Grain Fumigation' : 'Jasa Fumigasi Beras', path: '/panca/jasa-fumigasi-beras' },
    { name: isEn ? 'Wheat & Food Sanitizing' : 'Sanitasi Gudang Pangan', path: '/panca/sanitasi-gudang-pangan-profesional' },
    { name: isEn ? 'Ship & Vessel Fumigation' : 'Jasa Fumigasi Kapal', path: '/panca/jasa-fumigasi-kapal' },
  ];
  const isShopPage = 
    location.pathname.includes('/produk') || 
    location.pathname.includes('/katalog') || 
    location.pathname.includes('/cart') ||
    location.pathname.includes('/masuk') ||
    location.pathname.includes('/login') ||
    location.pathname.includes('/daftar') ||
    location.pathname.includes('/register') ||
    location.pathname.includes('/user');
  const isCatalogPage = location.pathname.includes('/produk') || location.pathname.includes('/katalog');

  const savedUser = localStorage.getItem('customer_user');
  const isLoggedIn = !!savedUser;
  const userPath = isLoggedIn ? (isEn ? "/en/user" : "/user") : (isEn ? "/en/login" : "/masuk");
  const isUserActive = location.pathname.includes('/masuk') || location.pathname.includes('/login') || location.pathname.includes('/user') || location.pathname.includes('/register') || location.pathname.includes('/daftar');

  useEffect(() => {
    resetAutoLinkTracker();
    // Basic multisite detection for preview (path-based) and production (hostname based - optional future)
    if (location.pathname.startsWith('/sensor') || location.pathname.startsWith('/en/sensor')) {
      setSite('sensor');
      localStorage.setItem('currentSite', 'sensor');
    } else if (
      location.pathname.startsWith('/panca') || 
      location.pathname.startsWith('/en/panca') || 
      location.pathname === '/' ||
      location.pathname === '/en'
    ) {
      setSite('panca');
      localStorage.setItem('currentSite', 'panca');
    } else {
      const stored = localStorage.getItem('currentSite');
      if (stored === 'sensor') setSite('sensor');
      else setSite('panca');
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (site === 'sensor') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans animate-fade-in">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <Link to={langLink('/sensor')} className="flex items-center gap-2">
                  <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-12 w-auto" />
                </Link>
              </div>

              {/* Desktop Menu */}
              <nav className="hidden md:flex space-x-8 items-center">
                <Link to={langLink('/sensor')} className="text-gray-600 hover:text-blue-700 font-medium">{t('beranda')}</Link>
                
                {/* Layanan Dropdown */}
                <div 
                  className="relative group py-2"
                  onMouseEnter={() => setIsSensorDropdownOpen(true)}
                  onMouseLeave={() => setIsSensorDropdownOpen(false)}
                >
                  <button 
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-700 font-medium focus:outline-none"
                    onClick={() => setIsSensorDropdownOpen(!isSensorDropdownOpen)}
                  >
                    <span>Layanan</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSensorDropdownOpen ? 'rotate-180 text-blue-700' : ''}`} />
                  </button>
                  {isSensorDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 animate-fade-in text-left">
                      {sensorServices.map((srv) => (
                        <Link
                          key={srv.path}
                          to={langLink(srv.path)}
                          className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold text-[13px] transition-colors"
                          onClick={() => setIsSensorDropdownOpen(false)}
                        >
                          {srv.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to={langLink('/sensor/produk')} className="text-gray-600 hover:text-blue-700 font-medium">{t('produkSensor')}</Link>
                <Link to={langLink('/sensor/blog')} className="text-gray-600 hover:text-blue-700 font-medium">{t('artikelEdukasi')}</Link>
                <Link to={langLink('/tentang-kami')} className="text-gray-600 hover:text-blue-700 font-medium">{t('tentangKami')}</Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {/* Language Switcher Button */}
                <button 
                  onClick={toggleLanguage} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-700 hover:border-blue-300 transition-all shadow-sm"
                  title={isEn ? "Ubah ke Bahasa Indonesia" : "Switch to English"}
                >
                  <Globe className="h-3.5 w-3.5 text-blue-600 animate-spin-slow" />
                  <span>{isEn ? 'English' : 'Bahasa'}</span>
                </button>

                <Link to={langLink('/cart')} className="relative p-2 text-gray-600 hover:text-blue-700 transition" aria-label={isEn ? "Shopping Cart" : "Keranjang Belanja"}>
                  <ShoppingCart className="h-6 w-6" />
                  {getTotalItemsBySite('sensor') > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                      {getTotalItemsBySite('sensor')}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  aria-label={isEn ? "Toggle Menu" : "Menu Utama"}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-200 text-left">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to={langLink('/sensor')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('beranda')}</Link>
                
                {/* Mobile Layanan Menu */}
                <div className="px-3 py-2 border-b border-gray-150">
                  <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Layanan</span>
                  <div className="pl-3 space-y-2 flex flex-col">
                    {sensorServices.map((srv) => (
                      <Link
                        key={srv.path}
                        to={langLink(srv.path)}
                        className="text-[14px] font-semibold text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {srv.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to={langLink('/sensor/produk')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('produkSensor')}</Link>
                <Link to={langLink('/sensor/blog')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('artikelEdukasi')}</Link>
                <Link to={langLink('/tentang-kami')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('tentangKami')}</Link>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 flex flex-col justify-start">
          {isShopPage ? (
            <div className="bg-[#f8fafc] w-full flex-1 flex flex-col justify-start pb-16">
              <div className="max-w-7xl w-full mx-auto bg-white min-h-[calc(100vh-80px)] shadow-lg border-x border-gray-100 flex flex-col justify-between relative animate-fade-in">
                <div className="flex-1">
                  <Outlet />
                </div>
                
                {/* Fixed Bottom App Navigation Bar */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2.5 flex justify-around items-center w-full max-w-7xl mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.08)] border-x">
                  <Link 
                    to={langLink('/sensor/produk')}
                    className={`flex flex-col items-center flex-1 py-1 transition ${isCatalogPage && !location.pathname.includes('/cart') && !location.pathname.includes('/masuk') && !location.pathname.includes('/login') ? 'text-blue-600 font-extrabold' : 'text-gray-400 hover:text-blue-600'}`}
                  >
                    <Home className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Beranda</span>
                  </Link>

                  <Link 
                    to={langLink('/cart')}
                    className={`flex flex-col items-center flex-1 py-1 relative transition ${location.pathname.includes('/cart') ? 'text-blue-600 font-extrabold' : 'text-gray-400 hover:text-blue-600'}`}
                  >
                    <ShoppingCart className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Keranjang</span>
                    {getTotalItemsBySite('sensor') > 0 && (
                      <span className="absolute top-0.5 right-1/2 translate-x-5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-red-600 rounded-full scale-90">
                        {getTotalItemsBySite('sensor')}
                      </span>
                    )}
                  </Link>

                  <a 
                    href="https://wa.me/6285313200188"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center flex-1 py-1 relative text-gray-400 hover:text-blue-600 transition"
                  >
                    <div className="relative">
                      <MessageSquare className="w-5 h-5 mb-1" />
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                    </div>
                    <span className="text-[10px] font-bold">Pesan</span>
                  </a>

                  <Link 
                    to={userPath}
                    className={`flex flex-col items-center flex-1 py-1 transition ${isUserActive ? 'text-blue-600 font-extrabold' : 'text-gray-400 hover:text-blue-600'}`}
                  >
                    <User className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">{isEn ? 'Account' : 'Saya'}</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

        <footer className={cn("bg-gray-900 text-gray-300 pt-12 border-t border-gray-800", isShopPage ? "pb-28 md:pb-12" : "pb-12")}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 bg-white p-2 rounded w-fit">
                <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-8 w-auto" />
              </div>
              <p className="text-sm leading-relaxed">
                {isEn 
                  ? 'PT. Panca Prima Wijaya is a premier integration solution provider for Building Management Systems (BMS), Early Warning Systems (EWS), Real Time Monitoring Systems (RTMS), and Toyo Earthquake Sensors for high-tech facilities, commercial structures, properties, and data centers.'
                  : 'PT. Panca Prima Wijaya adalah perusahaan penyedia solusi Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), dan Sensor Gempa Toyo untuk gedung, pabrik, rumah sakit, hotel, data center, dan fasilitas industri modern.'}
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">{isEn ? 'Core Solutions' : 'Solusi Utama'}</h3>
              <ul className="space-y-2 text-sm flex flex-col">
                <li><Link to={langLink('/sensor/early-warning-system')} className="hover:text-blue-400 transition-colors">Early Warning System</Link></li>
                <li><Link to={langLink('/sensor/sensor-gempa')} className="hover:text-blue-400 transition-colors">Sensor Gempa Toyo / Earthquake Sensors</Link></li>
                <li><Link to={langLink('/sensor/building-management-system')} className="hover:text-blue-400 transition-colors">Building Management System</Link></li>
                <li><Link to={langLink('/sensor/real-time-monitoring-system-rtms')} className="hover:text-blue-400 transition-colors">Real Time Monitoring System (RTMS)</Link></li>
                <li><Link to={langLink('/sensor/sparepart-lift-terlengkap')} className="hover:text-blue-400 transition-colors">{isEn ? 'Elevator & Escalator Spare Parts' : 'Spare Part Lift & Eskalator'}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">{t('hubungiKami')}</h3>
              <ul className="space-y-2 text-sm flex flex-col gap-2">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-500" /> 0853-1320-0188</li>
                <li className="leading-relaxed">Jalan Kayu Putih VII Blok A4 No. 8, RT.3/RW.6, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 14240</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            {t('copyrightSensor')}
          </div>
        </footer>
      </div>
    );
  }

  // Panca Prima Wijaya Layout
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans animate-fade-in">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link to={langLink('/panca')} className="flex items-center gap-2">
                <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to={langLink('/panca')} className="text-gray-600 hover:text-blue-700 font-medium">{t('beranda')}</Link>
              
              {/* Layanan Dropdown */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setIsPancaDropdownOpen(true)}
                onMouseLeave={() => setIsPancaDropdownOpen(false)}
              >
                <button 
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-700 font-medium focus:outline-none"
                  onClick={() => setIsPancaDropdownOpen(!isPancaDropdownOpen)}
                >
                  <span>Layanan</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPancaDropdownOpen ? 'rotate-180 text-blue-700' : ''}`} />
                </button>
                {isPancaDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 animate-fade-in text-left">
                    {pancaServices.map((srv) => (
                      <Link
                        key={srv.path}
                        to={langLink(srv.path)}
                        className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold text-[13px] transition-colors"
                        onClick={() => setIsPancaDropdownOpen(false)}
                      >
                        {srv.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to={langLink('/panca/produk')} className="text-gray-600 hover:text-blue-700 font-medium">{t('katalogEcommerce')}</Link>
              <Link to={langLink('/panca/blog')} className="text-gray-600 hover:text-blue-700 font-medium">{t('artikelEdukasi')}</Link>
              <Link to={langLink('/tentang-kami')} className="text-gray-600 hover:text-blue-700 font-medium">{t('tentangKami')}</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher Button */}
              <button 
                onClick={toggleLanguage} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-700 hover:border-blue-300 transition-all shadow-sm"
                title={isEn ? "Ubah ke Bahasa Indonesia" : "Switch to English"}
              >
                <Globe className="h-3.5 w-3.5 text-blue-600 animate-spin-slow" />
                <span>{isEn ? 'English' : 'Bahasa'}</span>
              </button>

              <Link to={langLink('/cart')} className="relative p-2 text-gray-600 hover:text-blue-700 transition" aria-label={isEn ? "Shopping Cart" : "Keranjang Belanja"}>
                <ShoppingCart className="h-6 w-6" />
                {getTotalItemsBySite('panca') > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {getTotalItemsBySite('panca')}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                aria-label={isEn ? "Toggle Menu" : "Menu Utama"}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 text-left">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to={langLink('/panca')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('beranda')}</Link>
              
              {/* Mobile Layanan Menu */}
              <div className="px-3 py-2 border-b border-gray-150">
                <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Layanan</span>
                <div className="pl-3 space-y-2 flex flex-col">
                  {pancaServices.map((srv) => (
                    <Link
                      key={srv.path}
                      to={langLink(srv.path)}
                      className="text-[14px] font-semibold text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {srv.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to={langLink('/panca/produk')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('katalogEcommerce')}</Link>
              <Link to={langLink('/panca/blog')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('artikelEdukasi')}</Link>
              <Link to={langLink('/tentang-kami')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">{t('tentangKami')}</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start">
        {isShopPage ? (
          <div className="bg-[#f8fafc] w-full flex-1 flex flex-col justify-start pb-16">
            <div className="max-w-7xl w-full mx-auto bg-white min-h-[calc(100vh-80px)] shadow-lg border-x border-gray-100 flex flex-col justify-between relative animate-fade-in">
              <div className="flex-1">
                <Outlet />
              </div>
              
              {/* Fixed Bottom App Navigation Bar */}
              <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2.5 flex justify-around items-center w-full max-w-7xl mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.08)] border-x">
                <Link 
                  to={langLink('/panca/produk')}
                  className={`flex flex-col items-center flex-1 py-1 transition ${isCatalogPage && !location.pathname.includes('/cart') && !location.pathname.includes('/masuk') && !location.pathname.includes('/login') ? 'text-blue-600 font-extrabold' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  <Home className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">Beranda</span>
                </Link>

                <Link 
                  to={langLink('/cart')}
                  className={`flex flex-col items-center flex-1 py-1 relative transition ${location.pathname.includes('/cart') ? 'text-blue-600 font-extrabold' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  <ShoppingCart className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">Keranjang</span>
                  {getTotalItemsBySite('panca') > 0 && (
                    <span className="absolute top-0.5 right-1/2 translate-x-5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-red-600 rounded-full scale-90">
                      {getTotalItemsBySite('panca')}
                    </span>
                  )}
                </Link>

                <a 
                  href="https://wa.me/6285313200188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center flex-1 py-1 relative text-gray-400 hover:text-blue-600 transition"
                >
                  <div className="relative">
                    <MessageSquare className="w-5 h-5 mb-1" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                  </div>
                  <span className="text-[10px] font-bold">Pesan</span>
                </a>

                <Link 
                  to={userPath}
                  className={`flex flex-col items-center flex-1 py-1 transition ${isUserActive ? 'text-blue-600 font-extrabold' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">{isEn ? 'Account' : 'Saya'}</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Footer */}
      <footer className={cn("bg-gray-900 text-gray-300 pt-12 border-t border-gray-800", isShopPage ? "pb-28 md:pb-12" : "pb-12")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 bg-white p-2 rounded w-fit">
              <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm leading-relaxed">
              {isEn 
                ? 'One-stop solution for crop protection consultation, grain pest control, professional agricultural fumigation and high-fidelity warning/monitoring technologies.'
                : 'One-stop solution untuk konsultasi, pengendalian hama, penanganan pasca panen komoditas pertanian, serta teknologi sistem keamanan dan monitoring modern.'}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">{isEn ? 'Our Main Services' : 'Layanan Utama'}</h3>
            <ul className="space-y-2 text-sm">
              <li>{isEn ? 'Agricultural Grain & Rice Fumigation' : 'Fumigasi Beras & Biji-bijian'}</li>
              <li>{isEn ? 'Professional Port Warehouse Sanitation' : 'Sanitasi Gudang Pangan'}</li>
              <li>{isEn ? 'Early Warning System (EWS)' : 'Early Warning System (EWS)'}</li>
              <li>{isEn ? 'Structural Health Monitoring (SHMS)' : 'Structural Health Monitoring (SHMS)'}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">{t('hubungiKami')}</h3>
            <ul className="space-y-2 text-sm flex flex-col gap-2">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-500" /> 0853-1320-0188</li>
              <li className="leading-relaxed">Jalan Kayu Putih VII Blok A4 No. 8, RT.3/RW.6, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 14240</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          {t('copyright')}
        </div>
      </footer>
    </div>
  );
}
