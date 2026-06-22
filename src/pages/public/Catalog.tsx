import React, { useEffect, useState } from 'react';
import { 
  Search, ShoppingCart, Bell, Cpu, Shirt, ShoppingBag, Sparkles, 
  ChevronRight, Flame, Star, Home, MessageSquare, User, Building, 
  Gamepad2, Activity, Utensils, BookOpen, Heart, ArrowRight, CheckCircle2, Plus 
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../types';
import { useCart } from '../../store';
import { Link, useLocation } from 'react-router-dom';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';

interface BannerConfig {
  badge?: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  image: string;
  bgColor: string;
}

interface FlashSaleItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  progressText: string;
  progressValue: number;
  image: string;
}

interface RecommendItem {
  id: string;
  name: string;
  price: number;
  rating: string;
  soldText: string;
  location: string;
  image: string;
}

interface CategoryConfig {
  id: string;
  label: string;
  iconName: string;
}

interface StoreConfig {
  mainBanner: BannerConfig;
  subBanner1: BannerConfig;
  subBanner2: BannerConfig;
  flashSaleHours: number;
  flashSaleMinutes: number;
  flashSaleSeconds: number;
  flashSaleItems: FlashSaleItem[];
  recommendItems: RecommendItem[];
  categories: CategoryConfig[];
}

const DEFAULT_CONFIG: StoreConfig = {
  mainBanner: {
    badge: "Promo Eksklusif",
    title: "Upgrade Gaya Hidup Digital Anda",
    subtitle: "Diskon hingga 50% untuk perangkat audio premium dan gadget rumah pintar.",
    buttonText: "Belanja Sekarang",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
    bgColor: "#0f172a"
  },
  subBanner1: {
    title: "Fashion Pria",
    subtitle: "Koleksi Terbaru 2024",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
    bgColor: "#1a2e40"
  },
  subBanner2: {
    title: "Kecantikan",
    subtitle: "Tampil Glowing Setiap Hari",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop&q=60",
    bgColor: "#ccfbf1"
  },
  flashSaleHours: 2,
  flashSaleMinutes: 45,
  flashSaleSeconds: 12,
  flashSaleItems: [
    {
      id: "fs-1",
      name: "Sony WH-1000XM5 Wireless Headphones",
      price: 4299000,
      originalPrice: 5999000,
      discount: "Diskon 40%",
      progressText: "75% Terjual",
      progressValue: 75,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "fs-2",
      name: "Mechanical Gaming Keyboard RGB TKL",
      price: 850000,
      originalPrice: 1150000,
      discount: "Diskon 25%",
      progressText: "20% Terjual",
      progressValue: 20,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "fs-3",
      name: "Smart Coffee Brewer Set V2",
      price: 1200000,
      originalPrice: 2400000,
      discount: "Diskon 50%",
      progressText: "Hampir Habis!",
      progressValue: 95,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60"
    }
  ],
  recommendItems: [
    {
      id: "rec-1",
      name: "Panca Air Purifier Pro - Filter HEPA 13",
      price: 1850000,
      rating: "4.9",
      soldText: "Terjual 2rb+",
      location: "Jakarta Pusat",
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "rec-2",
      name: "Logitech G Pro Wireless Gaming Mouse",
      price: 1499000,
      rating: "5.0",
      soldText: "Terjual 5rb+",
      location: "Surabaya",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "rec-3",
      name: "Handmade Ceramic Dining Set - Indigo Blue",
      price: 650000,
      rating: "4.8",
      soldText: "Terjual 800+",
      location: "Bandung",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "rec-4",
      name: "Ergonomic Office Chair - Blue Mesh",
      price: 2350000,
      rating: "4.9",
      soldText: "Terjual 1.2rb+",
      location: "Tangerang",
      image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "rec-5",
      name: "Mirrorless Camera 4K - Content Creator Kit",
      price: 12500000,
      rating: "5.0",
      soldText: "Terjual 500+",
      location: "Jakarta Selatan",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
    }
  ],
  categories: [
    { id: "cat-1", label: "Elektronik", iconName: "Cpu" },
    { id: "cat-2", label: "Fashion", iconName: "Shirt" },
    { id: "cat-3", label: "Rumah", iconName: "Home" },
    { id: "cat-4", label: "Gaming", iconName: "Gamepad2" },
    { id: "cat-5", label: "Olahraga", iconName: "Activity" },
    { id: "cat-6", label: "Kecantikan", iconName: "Sparkles" },
    { id: "cat-7", label: "Kuliner", iconName: "Utensils" },
    { id: "cat-8", label: "Buku", iconName: "BookOpen" }
  ]
};

export default function Catalog() {
  const { isEn, langLink } = useLanguage();
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_CONFIG);
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, getTotalItemsBySite } = useCart();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Search & dynamic values
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visCount, setVisCount] = useState(10);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const isSensorPath = location.pathname.includes('/sensor');
  const isPancaPath = location.pathname.includes('/panca') || location.pathname === '/';

  // Load custom storefront config
  useEffect(() => {
    fetch('/api/settings/store_layout')
      .then(res => res.json())
      .then(data => {
        if (data && data.mainBanner) {
          setStoreConfig({ ...DEFAULT_CONFIG, ...data });
        }
      })
      .catch(err => {
        console.warn("Could not load database store config, using defaults:", err);
      });
  }, []);

  // Fetch actual products list
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
      })
      .catch(() => setLoading(false));
  }, [isSensorPath, isPancaPath]);

  // Countdown timer clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: storeConfig.flashSaleHours || 2, minutes: storeConfig.flashSaleMinutes || 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [storeConfig]);

  const pageTitle = isSensorPath 
    ? "Katalog E-commerce Alat & Sensor Gempa | PT Panca Prima Wijaya"
    : "Katalog E-commerce Utama | PT Panca Prima Wijaya";

  // Filter existing database products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory) {
      const matchesCategory = (p.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    }
    return matchesSearch;
  });

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Shirt': return Shirt;
      case 'Home': return Home;
      case 'Gamepad2': return Gamepad2;
      case 'Activity': return Activity;
      case 'Sparkles': return Sparkles;
      case 'Utensils': return Utensils;
      case 'BookOpen': return BookOpen;
      default: return ShoppingBag;
    }
  };

  const getBgForKategori = (idx: number) => {
    const bgs = [
      'bg-blue-50 text-blue-600 border-blue-100',
      'bg-amber-50 text-amber-600 border-amber-100',
      'bg-emerald-50 text-emerald-600 border-emerald-100',
      'bg-purple-50 text-purple-600 border-purple-100',
      'bg-pink-50 text-pink-600 border-pink-100',
      'bg-teal-50 text-teal-600 border-teal-100',
      'bg-orange-50 text-orange-600 border-orange-100',
      'bg-cyan-50 text-cyan-600 border-cyan-100'
    ];
    return bgs[idx % bgs.length];
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id || Date.now().toString(),
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      site: isSensorPath ? 'sensor' : 'panca'
    });
    setAddedItemName(item.name);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 pb-16 font-sans">
      <SEO 
        title={pageTitle}
        description="Pesan sensor seismik, obat fumigasi, atau perlengkapan gedung komersial terbaik di Panca Shop."
        type="website"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
      />

      {/* Floating Success Alert Toast for Add To Cart */}
      {addedItemName && (
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 bg-slate-900 text-white rounded-lg px-4 py-3 shadow-2xl border border-slate-700 flex items-center gap-2 max-w-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block text-white truncate">{addedItemName}</span>
            <span className="text-slate-400">Berhasil masuk ke keranjang belanja!</span>
          </div>
        </div>
      )}

      {/* BRAND HEADER BAR */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 shrink-0">
            <Link to={isSensorPath ? '/sensor' : '/panca'} className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent flex items-center gap-1.5 hover:opacity-85 transition-opacity">
              <span>🏰</span> PANCA SHOP
            </Link>
          </div>

          {/* Search bar inside the header */}
          <div className="flex-1 max-w-lg relative block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari barang impian Anda di Panca Shop..." 
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none transition duration-150 text-slate-700 font-medium"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>
            <Link to="/cart" className="p-2 text-slate-400 hover:text-slate-600 relative transition">
              <ShoppingCart className="w-5 h-5" />
              {getTotalItemsBySite(isSensorPath ? 'sensor' : 'panca') > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-rose-600 rounded-full scale-95">
                  {getTotalItemsBySite(isSensorPath ? 'sensor' : 'panca')}
                </span>
              )}
            </Link>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-indigo-700 border border-indigo-100 shrink-0 select-none">
              U
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        
        {/* 1. HERO BANNER GRID (2/3 & 1/3 stacked layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          
          {/* Main big Left banner (2/3 width) */}
          <div 
            className="lg:col-span-2 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-sm group"
            style={{ 
              backgroundColor: storeConfig.mainBanner.bgColor || '#0f172a',
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%), url(${storeConfig.mainBanner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10 max-w-lg">
              {storeConfig.mainBanner.badge && (
                <span className="inline-block bg-indigo-600/95 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow border border-indigo-400/30">
                  {storeConfig.mainBanner.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white leading-tight">
                {storeConfig.mainBanner.title || "Upgrade Gaya Hidup Digital Anda"}
              </h1>
              <p className="text-sm text-slate-200 font-medium leading-relaxed mb-6 opacity-95">
                {storeConfig.mainBanner.subtitle || "Dapatkan diskon eksklusif hingga 50% untuk berbagai model sensor gempa kustom dan perlindungan fumigasi modern."}
              </p>
            </div>
            
            <div className="relative z-10">
              <button 
                onClick={() => {
                  const el = document.getElementById('products-grid-section');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-slate-900 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-indigo-650 hover:text-white transition-all shadow duration-200 flex items-center gap-1.5 w-fit"
              >
                <span>{storeConfig.mainBanner.buttonText || "Belanja Sekarang"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Soft decorative light leak glow */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-500/20 rounded-full filter blur-3xl -translate-x-12 translate-y-12"></div>
          </div>

          {/* Right stacked small banners (1/3 width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Small Banner Top */}
            <div 
              className="rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-end min-h-[160px] shadow-sm"
              style={{
                backgroundColor: storeConfig.subBanner1.bgColor || '#1e3a8a',
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%), url(${storeConfig.subBanner1.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="relative z-10">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-300 block mb-1">PROMO SPESIAL</span>
                <h3 className="text-lg font-extrabold tracking-tight mb-1 text-white">{storeConfig.subBanner1.title}</h3>
                <p className="text-xs text-slate-300 leading-snug">{storeConfig.subBanner1.subtitle}</p>
              </div>
            </div>

            {/* Small Banner Bottom */}
            <div 
              className="rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-end min-h-[160px] shadow-sm"
              style={{
                backgroundColor: storeConfig.subBanner2.bgColor || '#ccfbf1',
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%), url(${storeConfig.subBanner2.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="relative z-10">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-teal-300 block mb-1">TERLARIS BULAN INI</span>
                <h3 className="text-lg font-extrabold tracking-tight mb-1 text-white">{storeConfig.subBanner2.title}</h3>
                <p className="text-xs text-slate-300 leading-snug">{storeConfig.subBanner2.subtitle}</p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. POPULAR CATEGORIES GRID */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-8">
          <h2 className="text-md font-extrabold text-slate-900 mb-4 tracking-tight flex items-center gap-1.5">
            <span>✨</span> Kategori Populer
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {storeConfig.categories.map((cat, idx) => {
              const IconComp = getIconComponent(cat.iconName);
              const isSelected = selectedCategory?.toLowerCase() === cat.label.toLowerCase();
              return (
                <button 
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.label);
                  }}
                  className={`flex flex-col items-center hover:scale-102 hover:shadow-md border border-slate-100 transition-all rounded-2xl py-4 px-2 group ${isSelected ? 'ring-2 ring-indigo-600 bg-indigo-50 border-transparent shadow-sm' : 'bg-slate-50'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-all outline-none ${getBgForKategori(idx)}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-center text-slate-700 select-none tracking-tight">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DYNAMIC FLASH SALE SECTION */}
        <div className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 rounded-3xl p-6 shadow-md mb-8 text-white relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute right-0 top-0 opacity-10 bg-white w-96 h-96 rounded-full translate-x-24 -translate-y-24"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-yellow-400 text-slate-950 rounded-xl animate-pulse">
                <Flame className="w-5 h-5 fill-current text-slate-950" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>FLASH SALE</span>
                </h2>
                <p className="text-[11px] text-slate-100 font-medium">Jangan lewatkan penawaran terbatas dengan harga miring ini!</p>
              </div>
              
              {/* Countdown timer cards */}
              <div className="flex items-center gap-1.5 ml-2">
                <span className="bg-slate-900 border border-slate-800 text-white font-mono rounded px-2.5 py-1 text-xs font-extrabold shadow tracking-wider min-w-[28px] text-center">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-yellow-400 font-extrabold animate-pulse">:</span>
                <span className="bg-slate-900 border border-slate-800 text-white font-mono rounded px-2.5 py-1 text-xs font-extrabold shadow tracking-wider min-w-[28px] text-center">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-yellow-400 font-extrabold animate-pulse">:</span>
                <span className="bg-slate-900 border border-slate-800 text-amber-400 font-mono rounded px-2.5 py-1 text-xs font-extrabold shadow tracking-wider min-w-[28px] text-center">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-extrabold bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/35 transition cursor-pointer select-none"
            >
              Lihat Kategori Lain
            </button>
          </div>

          {/* Flash Sale product list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {storeConfig.flashSaleItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 text-slate-800 flex items-center gap-4 hover:shadow-xl transition-all duration-200 group relative"
              >
                {/* Discount Badge on corner */}
                <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm z-10">
                  {item.discount}
                </span>

                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-105 duration-200" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-800 truncate mb-1" title={item.name}>
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-sm font-black text-rose-600">
                      {formatCurrency(item.price)}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatCurrency(item.originalPrice)}
                    </span>
                  </div>

                  {/* Stock progress meter */}
                  <div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        style={{ width: `${item.progressValue}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mt-1">
                      <span>{item.progressText}</span>
                      <span>{item.progressValue}%</span>
                    </div>
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-rose-600 hover:scale-105 transition duration-150 shadow"
                    title="Beli Cepat"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {storeConfig.flashSaleItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-200 italic font-medium text-xs">Belum ada promo flash sale terdaftar.</div>
            )}
          </div>
        </div>

        {/* 4. MAIN STORE PRODUCTS & RECOMMENDATIONS GRID */}
        <div id="products-grid-section" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT COLUMN: Categories sidebar / filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm sticky top-40">
              <h3 className="text-sm font-black text-slate-900 border-b pb-3 mb-4 flex items-center gap-1.5 tracking-tight">
                <span>🔍</span> Filter Produk
              </h3>
              
              {/* Category selector widget list */}
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${selectedCategory === null ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>Semua Produk</span>
                  <span className="text-[10px] opacity-75">({products.length})</span>
                </button>

                {storeConfig.categories.map((cat) => {
                  const itemsCount = products.filter(p => (p.category || '').toLowerCase().includes(cat.label.toLowerCase())).length;
                  const isSelected = selectedCategory?.toLowerCase() === cat.label.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.label)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${isSelected ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[10px] opacity-75">({itemsCount})</span>
                    </button>
                  );
                })}
              </div>

              {/* Reset filter button if any active */}
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                  className="w-full mt-6 py-2 border border-slate-200 rounded-full text-center hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition text-xs font-bold font-sans cursor-pointer select-none"
                >
                  Hapus Semua Filter
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Grid list of items */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Products grid area */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-md font-extrabold text-slate-900 tracking-tight">
                    {selectedCategory ? `Kategori: ${selectedCategory}` : "Semua Produk & Rekomendasi"}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Menampilkan {filteredProducts.slice(0, visCount).length} dari {filteredProducts.length} hasil</p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {[1, 2, 3, 4, 5, 6].map(v => (
                    <div key={v} className="bg-white border rounded-2xl h-64 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
                  <div className="text-2xl mb-2">🎁</div>
                  <h4 className="font-extrabold text-slate-800 text-sm">Produk Tidak Ditemukan</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">Produk yang Anda cari saat ini kosong atau sedang tidak tersedia untuk kategori ini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {/* Render loaded config custom items first or normal database products */}
                  {filteredProducts.slice(0, visCount).map((prod, idx) => {
                    const ratingScore = (((prod.name.length || 3) % 5) / 10 + 4.5).toFixed(1);
                    const isPromo = idx % 3 === 0;
                    return (
                      <div 
                        key={prod.id} 
                        className="bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:border-indigo-150 transition-all duration-200 flex flex-col justify-between p-3 relative group"
                      >
                        {isPromo && (
                          <span className="absolute top-2.5 left-2.5 bg-indigo-600 text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm z-10 select-none">
                            Populer
                          </span>
                        )}

                        <Link 
                          to={isSensorPath ? `/sensor/produk/${prod.slug}` : `/panca/produk/${prod.slug}`}
                          className="block"
                        >
                          <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3 p-3 flex items-center justify-center">
                            <img 
                              src={prod.image || undefined} 
                              alt={prod.name} 
                              className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-200"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 flex flex-col justify-between pt-1">
                          <Link to={isSensorPath ? `/sensor/produk/${prod.slug}` : `/panca/produk/${prod.slug}`}>
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-indigo-600 transition duration-150" title={prod.name}>
                              {prod.name}
                            </h4>
                          </Link>

                          <div className="mt-2 text-left">
                            <span className="text-sm font-black text-slate-900 block leading-none">
                              {formatCurrency(prod.price)}
                            </span>

                            {/* Vendor, rating, sales info to match Shopee/Tokopedia exact looks */}
                            <div className="mt-2.5 border-t border-slate-50 pt-2 text-[10px] text-slate-500 flex flex-col gap-1 font-sans">
                              <span className="text-[10px] font-bold text-slate-400 block max-w-full truncate">📍 Jakarta Pusat</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-yellow-400 font-bold">★</span>
                                <span className="font-extrabold text-slate-700">{ratingScore}</span>
                                <span className="text-slate-200">|</span>
                                <span className="font-semibold text-slate-400">Terjual {((idx + 1) * 140) % 900}+</span>
                              </div>
                            </div>
                          </div>

                          {/* Inline Add to Cart trigger buttons */}
                          <div className="mt-3 flex gap-1.5">
                            <button
                              onClick={() => handleAddToCart(prod)}
                              className="flex-1 px-2 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-extrabold transition text-center flex items-center justify-center gap-1 cursor-pointer select-none border border-indigo-100/30"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Beli</span>
                            </button>
                            <Link
                              to={isSensorPath ? `/sensor/produk/${prod.slug}` : `/panca/produk/${prod.slug}`}
                              className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-extrabold transition text-center shrink-0 flex items-center justify-center"
                              title="Lihat Detail"
                            >
                              Detail
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* MUAT LEBIH BANYAK PAGINATION TRIGGER */}
              {!loading && filteredProducts.length > visCount && (
                <div className="mt-8">
                  <button 
                    onClick={() => setVisCount(prev => prev + 8)}
                    className="w-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 py-3.5 rounded-full text-xs font-bold text-slate-700 hover:text-indigo-700 transition"
                  >
                    Lihat Produk Lainnya
                  </button>
                </div>
              )}
            </div>

            {/* Custom static recommendation lists in config (e.g. recommend items) block */}
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-md font-extrabold text-slate-900 tracking-tight mb-5 flex items-center gap-1.5">
                <span>🔥</span> Rekomendasi Khusus Untuk Anda
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {storeConfig.recommendItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:border-indigo-150 transition-all duration-200 flex flex-col justify-between p-3 relative group"
                  >
                    <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3 p-3 flex items-center justify-center relative">
                      <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-103 transition" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-2" title={item.name}>
                          {item.name}
                        </h4>
                      </div>

                      <div className="mt-2 text-left">
                        <span className="text-sm font-black text-slate-900 block leading-none">
                          {formatCurrency(item.price)}
                        </span>

                        <div className="mt-2.5 border-t border-slate-50 pt-2 text-[10px] text-slate-500 flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 block truncate">📍 {item.location}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-yellow-400 font-bold block">★</span>
                            <span className="font-extrabold text-slate-700">{item.rating}</span>
                            <span className="text-slate-200">|</span>
                            <span className="font-semibold text-slate-400">{item.soldText}</span>
                          </div>
                        </div>

                        {/* Quick action buttons */}
                        <div className="mt-3">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full py-1.5 bg-slate-900 hover:bg-indigo-650 text-white rounded-lg text-[10px] font-extrabold transition flex items-center justify-center gap-1 border border-transparent"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Beli Sekarang</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 5. BRAND PARTNER FOOTER SECTION */}
        <div className="mt-14">
          {isPancaPath && <KlienKami />}
        </div>

        {/* 6. POLICY LINKS SECTION FOR GOOGLE MERCHANT */}
        <div className="mt-12 mb-6 border-t border-slate-200 pt-8 pb-4 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              {isEn ? 'Information & Policies' : 'Informasi & Kebijakan'}
            </h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm">
              <Link 
                to={langLink('/kebijakan-pengembalian-dana')} 
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors border border-slate-200 hover:border-indigo-200 px-4 py-2 rounded-xl bg-white shadow-sm"
              >
                {isEn ? 'Return & Refund Policy' : 'Kebijakan Pengembalian & Dana'}
              </Link>
              <Link 
                to={langLink('/kontak')} 
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors border border-slate-200 hover:border-indigo-200 px-4 py-2 rounded-xl bg-white shadow-sm"
              >
                {isEn ? 'Contact Us' : 'Hubungi Kami (Kontak)'}
              </Link>
              <Link 
                to={langLink('/syarat-ketentuan')} 
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors border border-slate-200 hover:border-indigo-200 px-4 py-2 rounded-xl bg-white shadow-sm"
              >
                {isEn ? 'Terms & Conditions' : 'Syarat & Ketentuan'}
              </Link>
              <Link 
                to={langLink('/kebijakan-privasi')} 
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors border border-slate-200 hover:border-indigo-200 px-4 py-2 rounded-xl bg-white shadow-sm"
              >
                {isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}
              </Link>
            </div>
            
            {/* Accepted Payments Info Badge */}
            <div className="mt-6 p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left animate-fade-in">
                <span className="text-xs font-extrabold text-slate-800 block uppercase tracking-wide">
                  {isEn ? 'Secured Payments' : 'Metode Pembayaran Aman'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {isEn ? 'We support Bank Transfer, QRIS, E-Wallet, VA & Credit Card' : 'Mendukung Transfer Bank, QRIS, GoPay, OVO, DANA, VA & Kartu Kredit'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-indigo-50 border border-indigo-100/50 text-indigo-700 px-3 py-1 rounded-full font-bold">
                🔒 SSL Secure Encryption
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
