import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, Bell, Cpu, Shirt, ShoppingBag, Sparkles, ChevronRight, Flame, Star, Home, MessageSquare, User, Building } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../types';
import { useCart } from '../../store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { KlienKami } from '../../components/KlienKami';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, getTotalItemsBySite } = useCart();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Search, categories, and load more pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visCount, setVisCount] = useState(4); // Desktop/mobile initial products count

  // Active slideshow index
  const [activeSlide, setActiveSlide] = useState(0);

  // Active bottom navigation tab selection
  const [activeTab, setActiveTab] = useState<'beranda' | 'mall' | 'kotak' | 'saya'>('beranda');

  // Interactive Live Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  const isSensorPath = location.pathname.includes('/sensor/produk');
  const isPancaPath = location.pathname.includes('/panca/produk');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        let filtered = data;
        
        if (isSensorPath) {
          filtered = data.filter(p => (p.category || '').toLowerCase().includes('sensor') || p.site === 'sensor');
        } else if (isPancaPath) {
          filtered = data.filter(p => p.site === 'panca' || !(p.category || '').toLowerCase().includes('sensor'));
        }

        setProducts(filtered);
        setLoading(false);
      });
  }, [isSensorPath, isPancaPath]);

  // Handle ticking active Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 45, seconds: 12 }; // reset loop periodically
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle automated rotating hero slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide(p => (p + 1) % 3);
    }, 5500);
    return () => clearInterval(slideInterval);
  }, []);

  const pageTitle = isSensorPath 
    ? "Katalog Produk Sensor | PT Panca Prima Wijaya"
    : isPancaPath
    ? "Katalog Produk Panca Prima Wijaya"
    : "Katalog Produk & Layanan | PT Panca Prima Wijaya";

  // Filter products by searching input and categories selection
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory) {
      const matchesCategory = (p.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    }
    return matchesSearch;
  });

  // Custom categories matching mock layout
  const categoriesList = [
    { id: 'elektronik', label: 'Elektronik', icon: Cpu, bg: 'bg-[#e0f2fe] text-blue-600', filterKey: 'sensor' },
    { id: 'fashion', label: 'Fashion', icon: Shirt, bg: 'bg-[#ffedd5] text-amber-600', filterKey: 'sparepart' },
    { id: 'kebutuhan', label: 'Kebutuhan Pokok', icon: ShoppingBag, bg: 'bg-[#dcfce7] text-emerald-600', filterKey: 'fumigasi' },
    { id: 'kecantikan', label: 'Kecantikan', icon: Sparkles, bg: 'bg-[#fce7f3] text-rose-600', filterKey: 'pestisida' },
    { id: 'all', label: 'Semua', icon: Building, bg: 'bg-[#ecfeff] text-cyan-600', filterKey: null }
  ];

  const handleCategoryClick = (filterKey: string | null) => {
    setSelectedCategory(filterKey);
    setVisCount(4); // Reset pagination count on category change
  };

  // Helper function to return simulated selling progress bar
  const getSimulatedProgress = (prodId: string) => {
    const charSum = prodId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    const percentage = (charSum % 40) + 40; // 40% to 80%
    return percentage;
  };

  // Helper function to render formatted rating score
  const getSimulatedRating = (prodId: string) => {
    const charSum = prodId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    const score = ((charSum % 5) / 10) + 4.5; // 4.5 to 4.9
    return score.toFixed(1);
  };

  const handleTabClick = (tab: 'beranda' | 'mall' | 'kotak' | 'saya') => {
    setActiveTab(tab);
    if (tab === 'saya') {
      navigate('/admin-login');
    } else if (tab === 'kotak') {
      window.open('https://wa.me/6285313200188', '_blank');
    } else if (tab === 'mall') {
      setSelectedCategory(null);
      setSearchQuery('');
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title={pageTitle}
        description="Pesan layanan sanitasi, obat kutu beras, atau sensor gempa (Early Warning System) terbaik dengan marketplace Panca Prima Wijaya."
        type="website"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
      />

      <div>
          {/* 2. DYNAMIC SEARCH INPUT BOX */}
          <div className="p-4" id="search-container">
            <div className="relative flex items-center w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input 
                id="search-input-box"
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..." 
                className="w-full bg-slate-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#0a2558] focus:bg-white transition-all text-gray-800 font-medium"
              />
            </div>
          </div>

          {/* 3. HERO SLIDESHOW BANNER PANEL */}
          <div className="px-4 pb-4">
            <div className="relative h-44 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0a2558] to-[#1e40af] text-white p-6 shadow-sm flex flex-col justify-between">
              {/* Dynamic abstract graphic patterns inside slide */}
              <div className="absolute right-0 bottom-0 opacity-15 overflow-hidden">
                <svg width="240" height="240" viewBox="0 0 100 100" fill="none" className="translate-x-12 translate-y-12">
                  <circle cx="50" cy="50" r="50" fill="white" />
                </svg>
              </div>

              {activeSlide === 0 && (
                <div className="animate-fade-in relative z-10">
                  <span className="bg-amber-500 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wide">
                    BIG PROMO SALE
                  </span>
                  <h3 className="text-2xl font-black mt-2 tracking-tight">50% SALE</h3>
                  <p className="text-xs text-blue-100 mt-1 max-w-[200px] leading-relaxed">
                    Dapatkan penawaran terbaik fumigasi dan monitoring sensor!
                  </p>
                </div>
              )}

              {activeSlide === 1 && (
                <div className="animate-fade-in relative z-10">
                  <span className="bg-emerald-500 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wide">
                    SOLUSI TERBAIK
                  </span>
                  <h3 className="text-xl font-black mt-2 tracking-tight">Fumiphos® 56 TB</h3>
                  <p className="text-xs text-emerald-100 mt-1 max-w-[200px] leading-relaxed">
                    Pembasmi kutu beras andalan nomor satu di Indonesia.
                  </p>
                </div>
              )}

              {activeSlide === 2 && (
                <div className="animate-fade-in relative z-10">
                  <span className="bg-[#06b6d4] text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wide">
                    MITRA PROTEKSI
                  </span>
                  <h3 className="text-xl font-black mt-2 tracking-tight">Safety & Monitoring</h3>
                  <p className="text-xs text-cyan-100 mt-1 max-w-[200px] leading-relaxed">
                    Gas leak alarm & Earthquakes sensor andalan gedung modern.
                  </p>
                </div>
              )}

              {/* Slider Dots Indicator */}
              <div className="flex gap-1.5 self-center">
                {[0, 1, 2].map((idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-5 bg-white' : 'w-2 bg-white/40'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 4. HORIZONTAL CATEGORIES BAR */}
          <div className="px-4 py-2">
            <div className="flex items-center justify-between overflow-x-auto pb-4 pt-1 gap-4 scrollbar-hide">
              {categoriesList.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.filterKey || (cat.id === 'all' && selectedCategory === null);
                return (
                  <button 
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.filterKey)}
                    className="flex flex-col items-center flex-shrink-0 transition-transform active:scale-95 group"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.bg} transition-all shadow-sm group-hover:shadow ${isSelected ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold mt-2 text-center max-w-[70px] leading-tight ${isSelected ? 'text-[#0a2558]' : 'text-gray-500'}`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. FLASH SALE PANEL SECTION */}
          <div className="p-4 bg-white border-t border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-amber-500 text-white rounded">
                  <Flame className="w-5 h-5 fill-current text-white animate-pulse" />
                </div>
                <h2 className="text-lg font-black text-[#0a2558] tracking-tight">
                  Flash Sale
                </h2>
                
                {/* Active Dynamic Countdown Timer Boxes */}
                <div className="flex items-center gap-1 ml-2 text-xs font-bold">
                  <span className="bg-slate-900 text-white font-mono rounded px-1.5 py-0.5 text-[11px]">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-slate-900">:</span>
                  <span className="bg-slate-900 text-white font-mono rounded px-1.5 py-0.5 text-[11px]">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-slate-900">:</span>
                  <span className="bg-slate-900 text-orange-500 font-mono rounded px-1.5 py-0.5 text-[11px]">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              <Link to="/katalog" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center">
                Lihat Semua <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            {/* Scrollable Horizontal Discounted Rows */}
            {loading ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2].map((i) => (
                  <div key={i} className="w-[150px] flex-shrink-0 animate-pulse bg-gray-100 h-44 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {products.slice(0, 3).map((prod, idx) => {
                  const originalPrice = prod.price * (idx === 0 ? 1.66 : 1.35); // simulated strike price
                  const discPct = idx === 0 ? '-40%' : '-25%';
                  const progressVal = getSimulatedProgress(prod.id);

                  return (
                    <Link 
                      key={prod.id}
                      to={location.pathname.includes('/sensor') ? `/sensor/produk/${prod.slug}` : `/panca/produk/${prod.slug}`}
                      className="w-[145px] bg-white flex-shrink-0 rounded-xl border border-gray-100 overflow-hidden flex flex-col justify-between group p-2 relative shadow-sm hover:border-[#1e40af]"
                    >
                      {/* Discount Label */}
                      <span className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg z-10 shadow-sm">
                        {discPct}
                      </span>

                      <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2">
                        <img 
                          src={prod.image || undefined} 
                          alt={prod.keywords || prod.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-end">
                        <h4 className="text-xs font-bold text-gray-800 truncate mb-1">
                          {prod.name}
                        </h4>
                        <div className="mb-1.5">
                          <span className="text-sm font-extrabold text-amber-500 block">
                            {formatCurrency(prod.price)}
                          </span>
                          <span className="text-[9px] text-gray-400 line-through">
                            {formatCurrency(originalPrice)}
                          </span>
                        </div>

                        {/* Custom status bar */}
                        <div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
                              style={{ width: `${progressVal}%` }}
                            />
                          </div>
                          <span className="text-[8px] font-bold text-gray-500 mt-1 block">
                            Terjual {progressVal}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 6. "REKOMENDASI UNTUKMU" GRID SECTION */}
          <div className="p-4 bg-slate-50/50">
            <h3 className="text-base font-black text-[#0a2558] tracking-tight mb-4">
              Rekomendasi Untukmu
            </h3>

            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="animate-pulse bg-white border border-gray-100 h-52 rounded-xl" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 p-4 bg-white rounded-2xl border">
                <p className="text-sm text-gray-400 font-bold mb-2">Pencarian tidak ditemukan</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} 
                  className="px-4 py-1.5 bg-[#0a2558] text-white text-xs font-bold rounded-full"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.slice(0, visCount).map((prod, idx) => {
                  const ratingVal = getSimulatedRating(prod.id);
                  const isPromo = idx % 2 === 0;

                  return (
                    <Link 
                      key={prod.id}
                      to={location.pathname.includes('/sensor') ? `/sensor/produk/${prod.slug}` : `/panca/produk/${prod.slug}`}
                      className="bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all overflow-hidden flex flex-col justify-between group p-3 relative"
                    >
                      {/* Active Promo Sticker Tag */}
                      {isPromo && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full z-10 shadow-sm animate-pulse">
                          Promo
                        </span>
                      )}

                      <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3 p-2 flex items-center justify-center">
                        <img 
                          src={prod.image || undefined} 
                          alt={prod.keywords || prod.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-2 md:line-clamp-3 mb-1 group-hover:text-blue-600 transition-colors">
                            {prod.name}
                          </h4>
                        </div>

                        <div className="mt-3">
                          <span className="text-sm font-black text-[#0a2558] block mb-1">
                            {formatCurrency(prod.price)}
                          </span>

                          <div className="flex items-center text-[10px] text-gray-500 font-extrabold gap-1 mt-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-700">{ratingVal}</span>
                            <span className="text-gray-300">|</span>
                            <span>{idx % 2 === 0 ? '1.2k' : '340'} terjual</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* 7. MUAT LEBIH BANYAK BUTTON */}
            {!loading && filteredProducts.length > visCount && (
              <div className="mt-6">
                <button 
                  onClick={() => setVisCount(p => p + 6)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-[#0a2558] border border-blue-200 py-3 rounded-2xl text-xs font-extrabold transition-all text-center"
                >
                  Muat Lebih Banyak
                </button>
              </div>
            )}
          </div>
        </div>

      <div className="mt-8 px-4 pb-8">
        {isPancaPath && <KlienKami />}
      </div>
    </div>
  );
}

