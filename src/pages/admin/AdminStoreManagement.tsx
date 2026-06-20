import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Save, CheckCircle, Smartphone, Monitor } from 'lucide-react';
import { MediaPickerModal } from '../../components/MediaPickerModal';

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
  progressText: string; // e.g. "75% Terjual", "Hampir Habis!", etc.
  progressValue: number; // 0 to 100
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
  iconName: string; // Cpu, Shirt, Home, Gamepad2, Activity, Sparkles, Utensils, BookOpen, etc.
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
    },
    {
      id: "fs-4",
      name: "Premium Leather Sneakers White Edition",
      price: 750000,
      originalPrice: 1050000,
      discount: "Diskon 30%",
      progressText: "45% Terjual",
      progressValue: 45,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "fs-5",
      name: "Panca Watch S1 Pro Navy Blue",
      price: 2100000,
      originalPrice: 2450000,
      discount: "Diskon 15%",
      progressText: "Stok Terbatas",
      progressValue: 88,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
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

export default function AdminStoreManagement() {
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mediaPickerConfig, setMediaPickerConfig] = useState<{ onSelect: (url: string) => void } | null>(null);

  useEffect(() => {
    fetch('/api/settings/store_layout')
      .then(res => res.json())
      .then(data => {
        if (data && data.mainBanner) {
          // Merge with DEFAULT_CONFIG to avoid missing properties if any were added
          setConfig({ ...DEFAULT_CONFIG, ...data });
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load store config", e);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/settings/store_layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      alert("Gagal menyimpan konfigurasi toko");
    } finally {
      setSaving(false);
    }
  };

  const handleBannerChange = (bannerKey: 'mainBanner' | 'subBanner1' | 'subBanner2', field: keyof BannerConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [bannerKey]: {
        ...prev[bannerKey],
        [field]: value
      }
    }));
  };

  const handleAddFlashSaleItem = () => {
    const newItem: FlashSaleItem = {
      id: Date.now().toString(),
      name: "Produk Flash Sale Baru",
      price: 150000,
      originalPrice: 200000,
      discount: "Diskon 25%",
      progressText: "0% Terjual",
      progressValue: 0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
    };
    setConfig(prev => ({
      ...prev,
      flashSaleItems: [...prev.flashSaleItems, newItem]
    }));
  };

  const handleUpdateFlashSaleItem = (id: string, field: keyof FlashSaleItem, value: any) => {
    setConfig(prev => ({
      ...prev,
      flashSaleItems: prev.flashSaleItems.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const handleRemoveFlashSaleItem = (id: string) => {
    setConfig(prev => ({
      ...prev,
      flashSaleItems: prev.flashSaleItems.filter(item => item.id !== id)
    }));
  };

  const handleAddRecommendItem = () => {
    const newItem: RecommendItem = {
      id: Date.now().toString(),
      name: "Produk Rekomendasi Baru",
      price: 180000,
      rating: "5.0",
      soldText: "Terjual 10+",
      location: "Jakarta",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
    };
    setConfig(prev => ({
      ...prev,
      recommendItems: [...prev.recommendItems, newItem]
    }));
  };

  const handleUpdateRecommendItem = (id: string, field: keyof RecommendItem, value: any) => {
    setConfig(prev => ({
      ...prev,
      recommendItems: prev.recommendItems.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const handleRemoveRecommendItem = (id: string) => {
    setConfig(prev => ({
      ...prev,
      recommendItems: prev.recommendItems.filter(item => item.id !== id)
    }));
  };

  const handleUpdateCategory = (id: string, field: keyof CategoryConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      categories: prev.categories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat)
    }));
  };

  const triggerMediaPicker = (onUrlSelected: (url: string) => void) => {
    setMediaPickerConfig({
      onSelect: (url) => {
        onUrlSelected(url);
        setMediaPickerConfig(null);
      }
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const tdLabelClass = "w-[220px] py-3 text-[14px] font-semibold text-[#1d2327] align-top";
  const tdInputClass = "py-3 text-[14px] text-[#3c434a] align-top space-y-2";
  const inputClass = "w-full max-w-lg px-3 py-2 border border-[#8c8f94] outline-none hover:border-[#2271b1] focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] transition-shadow duration-150 text-[14px] rounded-sm bg-white";

  return (
    <div className="p-6 text-[#3c434a] max-w-5xl">
      {mediaPickerConfig && (
        <MediaPickerModal 
          onSelect={mediaPickerConfig.onSelect} 
          onClose={() => setMediaPickerConfig(null)} 
        />
      )}

      {/* Header with Save actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 mb-6 gap-4">
        <div>
          <h1 className="text-[25px] font-semibold text-[#1d2327]">Kelola Toko</h1>
          <p className="text-sm text-gray-500 mt-1">Setup semua tampilan dan penawaran di halaman toko Anda agar sesuai dengan keinginan pelanggan.</p>
        </div>
        <div className="flex items-center gap-2">
          {showSuccess && (
            <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm bg-emerald-55 py-1.5 px-3 rounded-full border border-emerald-200">
              <CheckCircle className="w-4 h-4" />
              <span>Berhasil disimpan!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-2 rounded shadow-sm text-sm font-semibold tracking-wide transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="space-y-8">
        
        {/* SECTION 1: HEADER & BANNER PROMO */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 flex items-center gap-2">
            <span>🛡️</span> <span>1. Banner Promosi Samping & Utama (Hero Section)</span>
          </h2>
          
          <div className="space-y-8">
            {/* Main Banner Block */}
            <div className="bg-slate-50 p-4 border rounded">
              <h3 className="font-semibold text-[#1d2327] mb-3 text-sm">Banner Utama Kiri (Besar)</h3>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className={tdLabelClass}>Badge Tag</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.mainBanner.badge} 
                        onChange={(e) => handleBannerChange('mainBanner', 'badge', e.target.value)} 
                        className={inputClass} 
                        placeholder="Contoh: Promo Eksklusif"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Judul Utama Hero</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.mainBanner.title} 
                        onChange={(e) => handleBannerChange('mainBanner', 'title', e.target.value)} 
                        className={inputClass}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Sub-deskripsi</td>
                    <td className={tdInputClass}>
                      <textarea 
                        value={config.mainBanner.subtitle} 
                        onChange={(e) => handleBannerChange('mainBanner', 'subtitle', e.target.value)} 
                        className={`${inputClass} h-20 resize-none`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Teks Tombol</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.mainBanner.buttonText} 
                        onChange={(e) => handleBannerChange('mainBanner', 'buttonText', e.target.value)} 
                        className={inputClass}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Gambar Background (URL)</td>
                    <td className={tdInputClass}>
                      <div className="flex gap-2 max-w-lg">
                        <input 
                          type="text" 
                          value={config.mainBanner.image} 
                          onChange={(e) => handleBannerChange('mainBanner', 'image', e.target.value)} 
                          className="flex-1 px-3 py-2 border border-[#8c8f94] text-sm rounded-sm outline-none"
                        />
                        <button 
                          onClick={() => triggerMediaPicker((url) => handleBannerChange('mainBanner', 'image', url))}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded text-xs font-semibold flex items-center gap-1 shrink-0 border"
                        >
                          <ImageIcon className="w-3.5 h-3.5" /> Pilih Media
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sub Banner 1 */}
            <div className="bg-slate-50 p-4 border rounded">
              <h3 className="font-semibold text-[#1d2327] mb-3 text-sm">Banner Kecil Kanan Atas</h3>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className={tdLabelClass}>Judul Promo</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.subBanner1.title} 
                        onChange={(e) => handleBannerChange('subBanner1', 'title', e.target.value)} 
                        className={inputClass}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Subtitle / Koleksi</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.subBanner1.subtitle} 
                        onChange={(e) => handleBannerChange('subBanner1', 'subtitle', e.target.value)} 
                        className={inputClass}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Gambar / Background Promo (URL)</td>
                    <td className={tdInputClass}>
                      <div className="flex gap-2 max-w-lg">
                        <input 
                          type="text" 
                          value={config.subBanner1.image} 
                          onChange={(e) => handleBannerChange('subBanner1', 'image', e.target.value)} 
                          className="flex-1 px-3 py-2 border border-[#8c8f94] text-sm rounded-sm outline-none"
                        />
                        <button 
                          onClick={() => triggerMediaPicker((url) => handleBannerChange('subBanner1', 'image', url))}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded text-xs font-semibold flex items-center gap-1 shrink-0 border"
                        >
                          <ImageIcon className="w-3.5 h-3.5" /> Pilih Media
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sub Banner 2 */}
            <div className="bg-slate-50 p-4 border rounded">
              <h3 className="font-semibold text-[#1d2327] mb-3 text-sm">Banner Kecil Kanan Bawah</h3>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className={tdLabelClass}>Judul Promo</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.subBanner2.title} 
                        onChange={(e) => handleBannerChange('subBanner2', 'title', e.target.value)} 
                        className={inputClass}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Subtitle / Slogan</td>
                    <td className={tdInputClass}>
                      <input 
                        type="text" 
                        value={config.subBanner2.subtitle} 
                        onChange={(e) => handleBannerChange('subBanner2', 'subtitle', e.target.value)} 
                        className={inputClass}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={tdLabelClass}>Gambar / Background (URL)</td>
                    <td className={tdInputClass}>
                      <div className="flex gap-2 max-w-lg">
                        <input 
                          type="text" 
                          value={config.subBanner2.image} 
                          onChange={(e) => handleBannerChange('subBanner2', 'image', e.target.value)} 
                          className="flex-1 px-3 py-2 border border-[#8c8f94] text-sm rounded-sm outline-none"
                        />
                        <button 
                          onClick={() => triggerMediaPicker((url) => handleBannerChange('subBanner2', 'image', url))}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded text-xs font-semibold flex items-center gap-1 shrink-0 border"
                        >
                          <ImageIcon className="w-3.5 h-3.5" /> Pilih Media
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION 2: CATEGORY Populer */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 flex items-center gap-2">
            <span>📂</span> <span>2. Kelola Kategori Populer</span>
          </h2>
          <p className="text-xs text-gray-500 mb-4">Edit label dan icon untuk kategori-kategori populer yang muncul di halaman pertama e-commerce.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.categories.map((cat, idx) => (
              <div key={cat.id} className="p-3 border rounded bg-slate-50 flex items-center gap-3">
                <span className="font-bold text-gray-400 text-xs w-6">{idx + 1}.</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={cat.label} 
                    onChange={(e) => handleUpdateCategory(cat.id, 'label', e.target.value)}
                    className="px-2 py-1 border text-sm rounded" 
                    placeholder="Nama Kategori"
                  />
                  <select
                    value={cat.iconName}
                    onChange={(e) => handleUpdateCategory(cat.id, 'iconName', e.target.value)}
                    className="px-2 py-1 border text-sm rounded bg-white"
                  >
                    <option value="Cpu">Elektronik / Sensor (Cpu)</option>
                    <option value="Shirt">Fashion (Shirt)</option>
                    <option value="Home">Kebutuhan Rumah (Home)</option>
                    <option value="Gamepad2">Gaming (Gamepad2)</option>
                    <option value="Activity">Olahraga (Activity)</option>
                    <option value="Sparkles">Kecantikan (Sparkles)</option>
                    <option value="Utensils">Kuliner (Utensils)</option>
                    <option value="BookOpen">Buku (BookOpen)</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: FLASH SALE */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 flex items-center gap-2">
            <span>⚡</span> <span>3. Promo Flash Sale & Countdown Timer</span>
          </h2>

          {/* Flash sale timers */}
          <div className="bg-slate-50 p-4 border rounded mb-6">
            <h3 className="font-semibold text-[#1d2327] mb-3 text-sm">Waktu Jam Berakhir (Countdown)</h3>
            <div className="flex gap-4 max-w-sm">
              <label className="flex-1">
                <span className="text-xs font-bold text-gray-500 block mb-1">Jam</span>
                <input 
                  type="number" 
                  value={config.flashSaleHours} 
                  onChange={(e) => setConfig(prev => ({ ...prev, flashSaleHours: parseInt(e.target.value) || 0 }))} 
                  className="w-full px-3 py-1.5 border rounded outline-none"
                  min="0"
                />
              </label>
              <label className="flex-1">
                <span className="text-xs font-bold text-gray-500 block mb-1">Menit</span>
                <input 
                  type="number" 
                  value={config.flashSaleMinutes} 
                  onChange={(e) => setConfig(prev => ({ ...prev, flashSaleMinutes: parseInt(e.target.value) || 0 }))} 
                  className="w-full px-3 py-1.5 border rounded outline-none"
                  min="0"
                  max="59"
                />
              </label>
              <label className="flex-1">
                <span className="text-xs font-bold text-gray-500 block mb-1">Detik</span>
                <input 
                  type="number" 
                  value={config.flashSaleSeconds} 
                  onChange={(e) => setConfig(prev => ({ ...prev, flashSaleSeconds: parseInt(e.target.value) || 0 }))} 
                  className="w-full px-3 py-1.5 border rounded outline-none"
                  min="0"
                  max="59"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Daftar Item Flash Sale</h3>
            <button
              onClick={handleAddFlashSaleItem}
              className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded-sm text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Item Flash Sale
            </button>
          </div>

          <div className="space-y-4">
            {config.flashSaleItems.map((item, idx) => (
              <div key={item.id} className="p-4 border rounded bg-slate-50 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <span className="font-bold text-gray-500 text-xs shrink-0">{idx + 1}.</span>
                
                {/* Product thumbnail preview */}
                <div className="w-16 h-16 bg-white border rounded flex items-center justify-center relative group shrink-0 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-contain" />
                  <button 
                    onClick={() => triggerMediaPicker((url) => handleUpdateFlashSaleItem(item.id, 'image', url))}
                    className="absolute inset-0 bg-black/60 text-white text-[10px] items-center justify-center font-bold flex opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Ganti
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
                  <label className="col-span-1 sm:col-span-2">
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Nama Produk</span>
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handleUpdateFlashSaleItem(item.id, 'name', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                    />
                  </label>
                  
                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Diskon Label</span>
                    <input 
                      type="text" 
                      value={item.discount} 
                      onChange={(e) => handleUpdateFlashSaleItem(item.id, 'discount', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                      placeholder="Contoh: Diskon 40%"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Harga Promo (Rp)</span>
                    <input 
                      type="number" 
                      value={item.price} 
                      onChange={(e) => handleUpdateFlashSaleItem(item.id, 'price', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Harga Asli (Rp)</span>
                    <input 
                      type="number" 
                      value={item.originalPrice} 
                      onChange={(e) => handleUpdateFlashSaleItem(item.id, 'originalPrice', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Status Terjual</span>
                    <input 
                      type="text" 
                      value={item.progressText} 
                      onChange={(e) => handleUpdateFlashSaleItem(item.id, 'progressText', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                      placeholder="Contoh: 75% Terjual, Hampir Habis!"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Presentasi Terjual (%)</span>
                    <input 
                      type="number" 
                      value={item.progressValue} 
                      onChange={(e) => handleUpdateFlashSaleItem(item.id, 'progressValue', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                      min="0"
                      max="100"
                    />
                  </label>
                </div>

                <button
                  onClick={() => handleRemoveFlashSaleItem(item.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded shrink-0 duration-150 self-end md:self-center border border-transparent hover:border-red-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: REKOMENDASI UNTUK ANDA */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 flex items-center gap-2">
            <span>✨</span> <span>4. Rekomendasi Untuk Anda (Rekomendasi Produk)</span>
          </h2>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Daftar Item Rekomendasi</h3>
            <button
              onClick={handleAddRecommendItem}
              className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded-sm text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Item Rekomendasi
            </button>
          </div>

          <div className="space-y-4">
            {config.recommendItems.map((item, idx) => (
              <div key={item.id} className="p-4 border rounded bg-slate-50 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <span className="font-bold text-gray-500 text-xs shrink-0">{idx + 1}.</span>
                
                {/* Product thumbnail preview */}
                <div className="w-16 h-16 bg-white border rounded flex items-center justify-center relative group shrink-0 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-contain" />
                  <button 
                    onClick={() => triggerMediaPicker((url) => handleUpdateRecommendItem(item.id, 'image', url))}
                    className="absolute inset-0 bg-black/60 text-white text-[10px] items-center justify-center font-bold flex opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Ganti
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
                  <label className="col-span-1 sm:col-span-2">
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Nama Produk</span>
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handleUpdateRecommendItem(item.id, 'name', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Harga (Rp)</span>
                    <input 
                      type="number" 
                      value={item.price} 
                      onChange={(e) => handleUpdateRecommendItem(item.id, 'price', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Rating (Bintang)</span>
                    <input 
                      type="text" 
                      value={item.rating} 
                      onChange={(e) => handleUpdateRecommendItem(item.id, 'rating', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                      placeholder="Contoh: 4.9"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Volume Terjual</span>
                    <input 
                      type="text" 
                      value={item.soldText} 
                      onChange={(e) => handleUpdateRecommendItem(item.id, 'soldText', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                      placeholder="Contoh: Terjual 2rb+"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">Lokasi Toko</span>
                    <input 
                      type="text" 
                      value={item.location} 
                      onChange={(e) => handleUpdateRecommendItem(item.id, 'location', e.target.value)}
                      className="w-full px-2 py-1 border text-sm rounded bg-white" 
                      placeholder="Contoh: Jakarta Pusat, Surabaya, dsb."
                    />
                  </label>
                </div>

                <button
                  onClick={() => handleRemoveRecommendItem(item.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded shrink-0 duration-150 self-end md:self-center border border-transparent hover:border-red-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
