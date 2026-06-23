import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Search, FileCode, Check, RefreshCw } from 'lucide-react';
import { SEO } from '../../components/SEO';

interface StaticPageItem {
  id: string;
  title: string;
  slug: string;
  site: 'panca' | 'sensor';
  category: string;
  isEnSupported: boolean;
}

export default function AdminStaticPages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [siteFilter, setSiteFilter] = useState<'all' | 'panca' | 'sensor'>('all');

  const staticPages: StaticPageItem[] = [
    { id: 'ST-1', title: 'Building Management System (BMS)', slug: 'sensor/building-management-system', site: 'sensor', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-2', title: 'Early Warning System (EWS)', slug: 'sensor/early-warning-system', site: 'sensor', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-3', title: 'Real Time Monitoring System (RTMS)', slug: 'sensor/real-time-monitoring-system-rtms', site: 'sensor', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-4', title: 'Sensor Gempa Toyo / Earthquake Sensors', slug: 'sensor/sensor-gempa', site: 'sensor', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-5', title: 'Sparepart Lift & Eskalator', slug: 'sensor/sparepart-lift-terlengkap', site: 'sensor', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-6', title: 'Jasa Fumigasi Beras', slug: 'panca/jasa-fumigasi-beras', site: 'panca', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-7', title: 'Sanitasi Gudang Pangan Profesional', slug: 'panca/sanitasi-gudang-pangan-profesional', site: 'panca', category: 'Layanan Utama', isEnSupported: true },
    { id: 'ST-8', title: 'Jasa Fumigasi Kapal', slug: 'panca/jasa-fumigasi-kapal', site: 'panca', category: 'Layanan Utama', isEnSupported: true },
  ];

  const filteredPages = staticPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSite = siteFilter === 'all' || page.site === siteFilter;
    return matchesSearch && matchesSite;
  });

  return (
    <div className="text-[#3c434a]">
      <SEO title="Halaman Statis (Layanan) ‹ PT Panca Prima Wijaya — WordPress" description="Static Services Pages Admin CMS" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[23px] font-normal text-[#1d2327]">Halaman Statis (Layanan)</h1>
          <p className="text-xs text-gray-500 mt-1">Daftar halaman layanan hardcoded sistem yang disajikan secara instan cepat dan elegan.</p>
        </div>
        <div className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-sm text-xs flex items-center gap-1.5 font-bold font-sans">
          <FileCode className="w-4 h-4" />
          <span>Halaman Statis Terbaca (8)</span>
        </div>
      </div>

      {/* Filter and search toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-[#c3c4c7] rounded-sm mb-4 select-none">
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#646970]">Filter Website:</span>
          <button 
            onClick={() => setSiteFilter('all')} 
            className={`px-2.5 py-1 rounded transition ${siteFilter === 'all' ? 'bg-[#2271b1] text-white font-bold' : 'bg-[#f6f7f7] text-[#2271b1] hover:bg-gray-100'}`}
          >
            Semua ({staticPages.length})
          </button>
          <span className="text-gray-300">|</span>
          <button 
            onClick={() => setSiteFilter('panca')} 
            className={`px-2.5 py-1 rounded transition ${siteFilter === 'panca' ? 'bg-[#2271b1] text-white font-bold' : 'bg-[#f6f7f7] text-[#2271b1] hover:bg-gray-100'}`}
          >
            PT Panca ({staticPages.filter(p => p.site === 'panca').length})
          </button>
          <span className="text-gray-300">|</span>
          <button 
            onClick={() => setSiteFilter('sensor')} 
            className={`px-2.5 py-1 rounded transition ${siteFilter === 'sensor' ? 'bg-[#2271b1] text-white font-bold' : 'bg-[#f6f7f7] text-[#2271b1] hover:bg-gray-100'}`}
          >
            SensorGempa ({staticPages.filter(p => p.site === 'sensor').length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari halaman statis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1 border border-[#c3c4c7] rounded-sm text-xs outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] w-full sm:w-56"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
              <th className="px-4 py-2.5 text-[13px] font-semibold text-[#1d2327] border-r border-[#c3c4c7] w-12 text-center">ID</th>
              <th className="px-4 py-2.5 text-[13px] font-semibold text-[#1d2327]">Judul Layanan</th>
              <th className="px-4 py-2.5 text-[13px] font-semibold text-[#1d2327]">Website / Tarp</th>
              <th className="px-4 py-2.5 text-[13px] font-semibold text-[#1d2327]">Path / URL Publik</th>
              <th className="px-4 py-2.5 text-[13px] font-semibold text-[#1d2327]">Multi-Bahasa</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {filteredPages.map((page, index) => (
              <tr key={page.id} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f7f7]'} border-b border-[#c3c4c7] last:border-0 hover:bg-[#f0f6fa]`}>
                <td className="px-4 py-3 text-center border-r border-[#c3c4c7] text-[#646970] font-mono select-none">{page.id}</td>
                <td className="px-4 py-3 font-semibold text-[#1d2327]">
                  <span className="text-[14px] text-[#2271b1]">{page.title}</span>
                  <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] select-none">
                    <span className="text-gray-400 font-normal">Tipe: Statis (Kode)</span>
                    <span className="text-[#c3c4c7]">|</span>
                    <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="text-[#2271b1] hover:underline flex items-center gap-0.5 font-bold">
                      Lihat Halaman <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    page.site === 'sensor' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {page.site === 'sensor' ? 'SensorGempa.com' : 'PT Panca Prima'}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-gray-500">
                  /{page.slug}
                </td>
                <td className="px-4 py-3">
                  {page.isEnSupported ? (
                    <span className="flex items-center gap-1.5 text-green-600 font-semibold text-xs select-none">
                      <Check className="w-4 h-4" /> ID & EN Active
                    </span>
                  ) : (
                    <span className="text-gray-400">ID Only</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredPages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Tidak ada halaman statis ditemukan yang sesuai dengan filter pencarian.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
