import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Phone, Menu, X } from 'lucide-react';
import { useCart } from '../store';
import { cn } from '../lib/utils';

export function PublicLayout() {
  const { getTotalItemsBySite } = useCart();
  const location = useLocation();
  const [site, setSite] = useState<'panca' | 'sensor'>('panca');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Basic multisite detection for preview (path-based) and production (hostname based - optional future)
    if (location.pathname.startsWith('/sensor')) {
      setSite('sensor');
      localStorage.setItem('currentSite', 'sensor');
    } else if (location.pathname.startsWith('/panca') || location.pathname === '/') {
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
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <Link to="/sensor" className="flex items-center gap-2">
                  <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-12 w-auto" />
                </Link>
              </div>

              {/* Desktop Menu */}
              <nav className="hidden md:flex space-x-8">
                <Link to="/sensor" className="text-gray-600 hover:text-blue-700 font-medium">Beranda</Link>
                <Link to="/sensor/produk" className="text-gray-600 hover:text-blue-700 font-medium">Produk Sensor</Link>
                <Link to="/blog" className="text-gray-600 hover:text-blue-700 font-medium">Artikel Edukasi</Link>
                <Link to="/tentang-kami" className="text-gray-600 hover:text-blue-700 font-medium">Tentang Kami</Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-700 transition">
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
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/sensor" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Beranda</Link>
                <Link to="/sensor/produk" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Produk Sensor</Link>
                <Link to="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Artikel Edukasi</Link>
                <Link to="/tentang-kami" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Tentang Kami</Link>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 bg-white p-2 rounded w-fit">
                <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-8 w-auto" />
              </div>
              <p className="text-sm">
                PT. Panca Prima Wijaya adalah perusahaan penyedia solusi Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), dan Sensor Gempa Toyo untuk gedung, pabrik, rumah sakit, hotel, data center, dan fasilitas industri modern.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Solusi</h3>
              <ul className="space-y-2 text-sm flex flex-col">
                <li><Link to="/sensor/early-warning-system" className="hover:text-blue-400 transition-colors">Early Warning System</Link></li>
                <li><Link to="/sensor/sensor-gempa" className="hover:text-blue-400 transition-colors">Sensor Gempa Toyo</Link></li>
                <li><Link to="/sensor/building-management-system" className="hover:text-blue-400 transition-colors">Building Management System</Link></li>
                <li><Link to="/sensor/real-time-monitoring-system-rtms" className="hover:text-blue-400 transition-colors">Real Time Monitoring System (RTMS)</Link></li>
                <li><Link to="/sensor/sparepart-lift-terlengkap" className="hover:text-blue-400 transition-colors">Spare Part Lift & Eskalator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Hubungi Kami</h3>
              <ul className="space-y-2 text-sm flex flex-col gap-2">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0853-1320-0188</li>
                <li>Jalan Kayu Putih VII Blok A4 No. 8, RT.3/RW.6, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 14240</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            copyright &copy; 2026 | PT. Panca Prima Wijaya
          </div>
        </footer>
      </div>
    );
  }

  // Panca Prima Wijaya Layout
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link to="/panca" className="flex items-center gap-2">
                <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/panca" className="text-gray-600 hover:text-blue-700 font-medium">Beranda</Link>
              <Link to="/layanan" className="text-gray-600 hover:text-blue-700 font-medium">Layanan Fumigasi</Link>
              <Link to="/panca/produk" className="text-gray-600 hover:text-blue-700 font-medium">Katalog & E-commerce</Link>
              <Link to="/blog" className="text-gray-600 hover:text-blue-700 font-medium">Artikel Edukasi</Link>
              <Link to="/tentang-kami" className="text-gray-600 hover:text-blue-700 font-medium">Tentang Kami</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-700 transition">
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
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/panca" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Beranda</Link>
              <Link to="/layanan" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Layanan Fumigasi</Link>
              <Link to="/panca/produk" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Katalog & E-commerce</Link>
              <Link to="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Artikel Edukasi</Link>
              <Link to="/tentang-kami" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Tentang Kami</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 bg-white p-2 rounded w-fit">
              <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm">
              One-stop solution untuk konsultasi, pengendalian hama, penanganan pasca panen komoditas pertanian, serta teknologi sistem keamanan dan monitoring modern.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Layanan Utama</h3>
            <ul className="space-y-2 text-sm">
              <li>Fumigasi Beras & Biji-bijian</li>
              <li>Sanitasi Gudang Pangan</li>
              <li>Early Warning System (EWS)</li>
              <li>Structural Health Monitoring (SHMS)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm flex flex-col gap-2">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0853-1320-0188</li>
              <li>Jalan Kayu Putih VII Blok A4 No. 8, RT.3/RW.6, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 14240</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          copyright &copy; 2026 | PT. Panca Prima Wijaya
        </div>
      </footer>
    </div>
  );
}
