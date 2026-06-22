import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  ChevronRight, 
  Heart, 
  Star, 
  MapPin, 
  Store, 
  Truck, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  Package, 
  ThumbsUp, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Product } from '../../types';
import { useCart } from '../../store';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const { isEn, langLink } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const isSensorPath = location.pathname.includes('/sensor');
  const isPancaPath = location.pathname.includes('/panca') || location.pathname === '/' || location.pathname === '/en';
  const baseSite = isSensorPath ? 'sensor' : 'panca';
  
  // Theme styling based on site context
  const themeColor = isSensorPath ? 'text-[#063970]' : 'text-[#0a2558]';
  const themeBg = isSensorPath ? 'bg-[#063970]' : 'bg-[#0a2558]';
  const themeHoverBg = isSensorPath ? 'hover:bg-[#04284d]' : 'hover:bg-[#06183b]';
  const themeTextAccent = isSensorPath ? 'text-[#063970]' : 'text-[#0a2558]';
  const themeBorder = isSensorPath ? 'border-[#063970]' : 'border-[#0a2558]';
  const themeBgLight = isSensorPath ? 'bg-[#063970]/5' : 'bg-[#0a2558]/5';
  const themeBorderLight = isSensorPath ? 'border-[#063970]/20' : 'border-[#0a2558]/20';

  const [activeImage, setActiveImage] = useState<string>('');
  const [isLiked, setIsLiked] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [showNotification, setShowNotification] = useState(false);

  // Load product & suggested products
  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then((data: Product[]) => {
        if (!Array.isArray(data)) return;
        const found = data.find(p => p.slug === slug || p.slug_en === slug);
        setProduct(found || null);
        if (found) {
          setActiveImage(found.image);
          
          // Set dynamic default variant based on product type
          if (found.category?.toLowerCase().includes('sensor')) {
            setSelectedVariant('Modbus RTU');
          } else {
            setSelectedVariant('1 Liter');
          }

          // Get suggested products
          let filtered = data.filter(p => p.id !== found.id);
          if (isSensorPath) {
            filtered = filtered.filter(p => p.site === 'sensor' || (p.category || '').toLowerCase().includes('sensor'));
          } else {
            filtered = filtered.filter(p => p.site === 'panca' || !(p.category || '').toLowerCase().includes('sensor'));
          }
          setSuggestedProducts(filtered.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug, isSensorPath]);

  // Handle translation
  const { translatedData: translatedProduct, loading: translating } = useAutoTranslate(
    product, 
    ['name', 'category', 'description', 'seoArticle']
  );

  if (loading || translating) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/5 aspect-square bg-gray-200 rounded-lg" />
          <div className="w-full md:w-3/5 space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-16 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!translatedProduct) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-6 text-center">
        <SEO 
          title={isEn ? "Product Not Found - 404 | PT Panca Prima Wijaya" : "Produk Tidak Ditemukan - 404 | PT Panca Prima Wijaya"} 
          description={isEn ? "The product you are looking for could not be found." : "Produk yang Anda cari tidak ditemukan."} 
        />
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {isEn ? "The product you are looking for cannot be found." : "Produk yang Anda cari tidak dapat ditemukan."}
        </p>
        <Link to={langLink(`/${baseSite}`)} className={`px-6 py-3 ${themeBg} text-white font-medium rounded-lg ${themeHoverBg} transition`}>
          {isEn ? "Back to Home" : "Kembali ke Beranda"}
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Generate realistic formatted values
  const currentPrice = translatedProduct.price || 150000;
  const originalPrice = Math.round(currentPrice * 1.15); // Show dynamic 15% discount
  const discountPercentage = '15%';

  const allImages = [translatedProduct.image, ...(translatedProduct.gallery || [])].filter(Boolean);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Beranda', item: currentUrl.replace(new RegExp(`/${baseSite}/produk/.*$`), `/${baseSite}`) },
    { name: isEn ? 'Catalog' : 'Katalog', item: currentUrl.replace(new RegExp(`/${slug}$`), '') },
    { name: translatedProduct.name, item: currentUrl }
  ];

  // Schema properties for dynamic SEO Rich Snippets
  const schemaOrgProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": translatedProduct.name,
    "image": allImages.map(img => img && img.startsWith('http') ? img : `${typeof window !== 'undefined' ? window.location.origin : ''}${img && img.startsWith('/') ? '' : '/'}${img || ''}`),
    "description": (translatedProduct.description || '').replace(/<[^>]*>/g, '').substring(0, 300),
    "sku": translatedProduct.id,
    "mpn": translatedProduct.mpn || translatedProduct.id,
    "gtin": translatedProduct.gtin || undefined,
    "brand": {
      "@type": "Brand",
      "name": translatedProduct.brand || (isSensorPath ? "Toyo Automation" : "PT Panca Prima Wijaya")
    },
    "offers": {
      "@type": "Offer",
      "url": currentUrl,
      "priceCurrency": "IDR",
      "price": currentPrice,
      "itemCondition": translatedProduct.condition === 'used' ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  };

  // Click handler to show gorgeous localized cart notification
  const handleAddToCart = () => {
    addItem(translatedProduct);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Custom mock reviews for Indonesia / English, specifically mapped to products
  const isSensor = (translatedProduct.category || '').toLowerCase().includes('sensor') || isSensorPath;
  const mockReviews = isSensor ? [
    {
      id: 1,
      name: 'Andi Wijaya',
      avatar: 'A',
      date: isEn ? '1 week ago' : 'Seminggu yang lalu',
      rating: 5,
      text: isEn 
        ? 'Excellent sensor performance! High reading accuracy and seamless connection to our SCADA Modbus database. Very robust build quality for industrial purposes.'
        : 'Sangat mantap performa sensornya! Akurasi pembacaan sangat konsisten dan integrasi ke database SCADA via Modbus berjalan tanpa kendala. Fisik kokoh untuk lingkungan industri.',
      verified: true
    },
    {
      id: 2,
      name: 'Rian Hermawan',
      avatar: 'R',
      date: isEn ? '2 weeks ago' : '2 minggu yang lalu',
      rating: 5,
      text: isEn 
        ? 'Official product from Toyo Automation Indonesia. Quick delivery, full documentation, and helpful configuration tips from their customer support.'
        : 'Produk resmi original Toyo Automation Indonesia. Pengiriman cepat, dokumentasi lengkap, dan tim support sangat membantu memberikan petunjuk konfigurasi.',
      verified: true
    }
  ] : [
    {
      id: 1,
      name: 'Rina Permata',
      avatar: 'R',
      date: isEn ? '2 days ago' : '2 hari yang lalu',
      rating: 5,
      text: isEn 
        ? 'Excellent packing quality! Tested on our storage container and the result is highly effective. No residue marks, Pest control quality is top-notch!'
        : 'Luar biasa! Layanan pengemasan aman paking kayu tebal, dicoba untuk fumigasi kontainer pangan dan hasilnya terbukti sangat efektif membasmi hama gudang tanpa sisa residu.',
      verified: true
    },
    {
      id: 2,
      name: 'Budi Santoso',
      avatar: 'B',
      date: isEn ? '1 week ago' : 'Seminggu yang lalu',
      rating: 5,
      text: isEn 
        ? 'Fast respon, authentic license from PT Panca Prima Wijaya. Safe for cargo operations and shipping guidelines are extremely clear.'
        : 'Barang sampai dengan aman, packing rapat, sudah berlisensi resmi kementerian dari PT Panca Prima Wijaya. Sangat membantu menjaga higienitas kargo ekspor.',
      verified: true
    }
  ];

  // Specific high quality feature highlight boxes based on industrial niche (Sensor vs PPW Pest Control)
  const productHighlights = isSensor ? [
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      title: isEn ? 'High Accuracy Sensor' : 'Akurasi Sensor Tinggi',
      desc: isEn ? 'High-calibration industrial sensor module with rapid response precision rating.' : 'Sensor industri dengan kalibrasi presisi tinggi untuk respon pengukuran yang instan.'
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-indigo-600" />,
      title: isEn ? 'Modbus & RTU Compatible' : 'Kompatibel Multi-Output',
      desc: isEn ? 'Fully compatible with mainstream telemetry, RTMS networks, PLC, and Modbus protocol.' : 'Dukung integrasi penuh ke PLC, RTMS, Smart Building, dan database SCADA Anda.'
    }
  ] : [
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      title: isEn ? 'Premium Active Formulation' : 'Formulasi Aktif Premium',
      desc: isEn ? 'Highly effective formula targeting grain beetles and standard port quarantine pests.' : 'Sangat efektif mematikan hama serangga gudang, kutu beras, & standar karantina ekspor.'
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: isEn ? 'Zero Dangerous Residue' : 'Bebas Residu Berbahaya',
      desc: isEn ? 'Safe aeration performance. Meets strict international fumigation protocols.' : 'Aerasi cepat, aman bagi komoditas pangan utama sesuai standar internasional.'
    }
  ];

  // Dynamic variants (Capacity or connection type)
  const variants = isSensor ? ['Modbus RTU', 'Analog 4-20mA', 'RS485 Output'] : ['1 Liter', '5 Liter', '20 Liter', 'Standard Set'];

  return (
    <>
      <div className="bg-slate-50 min-h-screen pt-4 pb-16 font-sans">
        <SEO 
          title={translatedProduct.seoTitle || `${translatedProduct.name} | PT Panca Prima Wijaya`}
          description={translatedProduct.seoDescription || (translatedProduct.description || '').substring(0, 160)}
          keywords={translatedProduct.keywords}
          type="product"
          canonical={currentUrl}
          breadcrumbs={breadcrumbs}
        />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgProduct)}
        </script>

        {/* Global Floating Toast for Smooth Cart Feedback */}
        {showNotification && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-slide-in max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-semibold">{translatedProduct.name}</span> {isEn ? 'added to shopping cart!' : 'berhasil dimasukkan ke keranjang!'}
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <nav className="flex items-center text-xs md:text-sm font-medium text-slate-500 gap-1.5 md:gap-2">
              <Link to={langLink(`/${baseSite}`)} className="hover:text-slate-900 transition">{isEn ? 'Home' : 'Beranda'}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link to={langLink(`/${baseSite}/produk`)} className="hover:text-slate-900 transition">{isEn ? 'Catalog' : 'Katalog'}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 truncate max-w-[120px] sm:max-w-xs font-semibold">{translatedProduct.name}</span>
            </nav>
            <Link 
              to={langLink(`/${baseSite}/produk`)} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEn ? 'Back' : 'Kembali'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
            
            {/* COLUMN LEFT: GALLERY CONTAINER (width 5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative bg-white rounded-lg p-3 border border-slate-200 shadow-sm overflow-hidden group">
                <div className="relative aspect-square w-full rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img 
                    src={activeImage || translatedProduct.image || undefined} 
                    alt={`${translatedProduct.seoTitle || translatedProduct.name} - Official PT Panca Prima Wijaya`} 
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                    loading="eager" 
                  />
                </div>
                
                {/* Floating Editor choice tag & Love Button */}
                <div className="absolute top-6 left-6">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold text-white ${themeBg} px-2.5 py-1 rounded-sm shadow-md`}>
                    {isEn ? 'Editor Choice' : 'Pilihan Editor'}
                  </span>
                </div>

                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white shadow-md border border-slate-100 hover:scale-110 active:scale-90 transition-all text-slate-400 group-hover:text-slate-500"
                  title="Bookmark Product"
                  id="btn-wishlist-toggle"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                </button>
              </div>

              {/* Dynamic responsive grid array for auxiliary media files */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-square rounded-md border-2 overflow-hidden transition-all bg-white ${activeImage === img ? `${themeBorder} ring-2 ring-blue-500/10` : 'border-slate-200 hover:border-slate-400'}`}
                    >
                      <img src={img || undefined} alt={`${translatedProduct.name} gallery item ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* COLUMN RIGHT: PURCHASE DETAILS & ORDER OPTIONS (width 7 cols on lg) */}
            <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">
              
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E12029] font-black block mb-1">
                  {isSensor ? 'TOYO AUTOMATION JAPAN' : 'FUMIGATION & QUARANTINE SPECIALIST'}
                </span>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {translatedProduct.name}
                </h1>
              </div>

              {/* Star ratings details matching picture */}
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="font-bold text-slate-800 ml-1">4.8</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">
                  <strong className="text-slate-800 underline">124</strong> {isEn ? 'Ratings' : 'Penilaian'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">
                  <strong className="text-slate-800">1.2k+</strong> {isEn ? 'Sold' : 'Terjual'}
                </span>
              </div>

              {/* Advanced Interactive E-Commerce Price Tag */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                <div className={`text-3xl md:text-4xl font-extrabold ${themeTextAccent} tracking-tight`}>
                  {formatCurrency(currentPrice)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded">
                    {discountPercentage} {isEn ? 'OFF' : 'POTONGAN'}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                </div>
              </div>

              {/* Interactive Multi-Option Variant Switcher */}
              <div className="space-y-3">
                <label className="text-xs md:text-sm font-bold text-slate-700 block">
                  {isSensor ? (isEn ? 'Choose Connectivity / Signal Output:' : 'Pilih Kapasitas / Output Sinyal:') : (isEn ? 'Choose Capacity / Volume Set:' : 'Pilih Kapasitas Penyimpanan / Ukuran:')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md border transition-all ${
                        selectedVariant === v 
                          ? `${themeBorder} ${themeBgLight} text-slate-900 border-2`
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                      }`}
                      id={`opt-var-${v.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Official Store Profiling Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${themeBg} text-white font-black flex items-center justify-center text-lg shadow-sm flex-shrink-0`}>
                    PS
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                      <span>Official Panca Shop</span>
                      <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded">Verified</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isEn ? 'Surabaya, East Java' : 'Surabaya, Jawa Timur'}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  to={langLink(`/${baseSite}/produk`)}
                  className="px-4 py-1.5 border border-slate-300 rounded-md hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                >
                  {isEn ? 'Visit Store' : 'Kunjungi Toko'}
                </Link>
              </div>

              {/* Standard Indonesian Interactive Cart CTA Button set */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 border ${themeBorder} ${themeBgLight} ${themeTextAccent} hover:bg-slate-50 px-6 py-3.5 rounded-md font-bold text-sm flex items-center justify-center gap-2.5 transition active:scale-[0.98] shadow-sm`}
                  id="btn-cart-add"
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  <span>{isEn ? 'Add to Cart' : 'Masukkan Keranjang'}</span>
                </button>
                <button 
                  onClick={() => {
                    addItem(translatedProduct);
                    window.location.href = langLink('/cart');
                  }}
                  className={`flex-1 ${themeBg} text-white ${themeHoverBg} px-8 py-3.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-md`}
                  id="btn-buy-now"
                >
                  <span>{isEn ? 'Buy Now' : 'Beli Sekarang'}</span>
                </button>
              </div>

              {/* Small trust features row */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>{isEn ? 'Free Shipping across Regency' : 'Gratis Ongkir Seluruh Indonesia'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span>{isEn ? 'Official 1-Year Authorized Warranty' : 'Garansi Resmi 1 Tahun'}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            
            {/* COLUMN BOTTOM LEFT: MULTI-TAB DISPLAY PANEL (width 8 cols on lg) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Product interactive tab system */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-200 bg-slate-50">
                  <button 
                    onClick={() => setActiveTab('description')}
                    className={`flex-1 py-4 text-center text-xs md:text-sm font-bold border-b-2 transition-all ${
                      activeTab === 'description' 
                        ? 'border-blue-600 text-blue-700 bg-white' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isEn ? 'Product Description' : 'Deskripsi Produk'}
                  </button>
                  <button 
                    onClick={() => setActiveTab('specifications')}
                    className={`flex-1 py-4 text-center text-xs md:text-sm font-bold border-b-2 transition-all ${
                      activeTab === 'specifications' 
                        ? 'border-blue-600 text-blue-700 bg-white' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isEn ? 'Specifications' : 'Spesifikasi'}
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-4 text-center text-xs md:text-sm font-bold border-b-2 transition-all ${
                      activeTab === 'reviews' 
                        ? 'border-blue-600 text-blue-700 bg-white' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isEn ? 'Buyer Reviews (4)' : 'Ulasan Pembeli (4)'}
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  {/* TAB 1: DESKRIPSI PRODUK */}
                  {activeTab === 'description' && (
                    <div className="space-y-6">
                      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base">
                        {translatedProduct.description.split('\n').map((paragraph, i) => paragraph.trim() && (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>

                      {/* Display structural specifications card summary chips inside layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {productHighlights.map((hl, i) => (
                          <div key={i} className={`flex gap-3 p-4 rounded-lg border ${themeBorderLight} bg-slate-50`}>
                            <div className="flex-shrink-0 mt-0.5">
                              {hl.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{hl.title}</h4>
                              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{hl.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Display dynamic long article SEO editor */}
                      {translatedProduct.seoArticle && (
                        <div className="border-t border-slate-100 pt-6 mt-6">
                          <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            <span>{isEn ? 'Information Guide & Application Manual' : 'Informasi Tambahan & Panduan Teknis'}</span>
                          </h3>
                          <div className="prose prose-sm md:prose-base max-w-none text-slate-600 leading-relaxed bg-[#f8fafc] border border-slate-100 rounded-md p-5" dangerouslySetInnerHTML={{ __html: translatedProduct.seoArticle }} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: SPESIFIKASI */}
                  {activeTab === 'specifications' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-slate-700">
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-1 text-slate-400 font-medium w-1/3">{isEn ? 'Category' : 'Kategori'}</td>
                            <td className="py-3 px-1 font-bold text-slate-900">{translatedProduct.category || (isEn ? 'Spare Parts & Sensors' : 'Sparepart & Sensor')}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-1 text-slate-400 font-medium">{isEn ? 'Brand' : 'Merek'}</td>
                            <td className="py-3 px-1 font-bold text-slate-900">{translatedProduct.brand || (isSensor ? 'Toyo Automation' : 'PT Panca Prima Wijaya')}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-1 text-slate-400 font-medium">{isEn ? 'Condition' : 'Kondisi'}</td>
                            <td className="py-3 px-1 font-bold text-slate-900">
                              {translatedProduct.condition === 'used' ? (isEn ? 'Used/Refurbished' : 'Bekas/Rekondisi') : (isEn ? 'New' : 'Baru')}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-1 text-slate-400 font-medium">GTIN Code</td>
                            <td className="py-3 px-1 font-mono text-slate-900">{translatedProduct.gtin || '8852367492104'}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 px-1 text-slate-400 font-medium">MPN Code</td>
                            <td className="py-3 px-1 font-mono text-slate-900">{translatedProduct.mpn || 'MPN-PPW-' + translatedProduct.id.substring(0, 5).toUpperCase()}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-1 text-slate-400 font-medium">{isEn ? 'Availability' : 'Stok'}</td>
                            <td className="py-3 px-1 text-emerald-600 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{isEn ? 'In Stock (Global Batch Delivery Available)' : 'Tersedia Banyak (Dukung Pengadaan Skala Besar)'}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB 3: ULASAN PEMBELI */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <div className="text-center">
                          <div className="text-4xl md:text-5xl font-black text-slate-900">4.8</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">out of 5.0</div>
                        </div>
                        <div className="flex-1 space-y-1.5 w-full">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="w-10 text-slate-500 font-bold">5 {isEn ? 'Stars' : 'Bintang'}</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }} />
                            </div>
                            <span className="w-8 text-right text-slate-400 font-medium">85%</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="w-10 text-slate-500 font-bold">4 {isEn ? 'Stars' : 'Bintang'}</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '12%' }} />
                            </div>
                            <span className="w-8 text-right text-slate-400 font-medium">12%</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="w-10 text-slate-500 font-bold">3 {isEn ? 'Stars' : 'Bintang'}</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: '3%' }} />
                            </div>
                            <span className="w-8 text-right text-slate-400 font-medium">3%</span>
                          </div>
                        </div>
                      </div>

                      {/* Buyer reviews cards list */}
                      <div className="space-y-5 pt-4">
                        {mockReviews.map((r) => (
                          <div key={r.id} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className={`w-9 h-9 rounded-full ${themeBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                                  {r.avatar}
                                </span>
                                <div>
                                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                    <span>{r.name}</span>
                                    {r.verified && (
                                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">Pembeli Terverifikasi</span>
                                    )}
                                  </div>
                                  <div className="flex text-amber-400 space-x-0.5 mt-0.5">
                                    {Array.from({ length: r.rating }).map((_, idx) => (
                                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[11px] text-slate-400">{r.date}</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed bg-[#f8fafc] p-4 rounded border border-slate-100">
                              "{r.text}"
                            </p>
                          </div>
                        ))}
                      </div>

                      <button className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition border border-dashed border-slate-200 hover:border-slate-400 rounded-md">
                        {isEn ? 'See All Genuine Buyer Reviews' : 'Lihat Semua Ulasan Pembeli'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* COLUMN BOTTOM RIGHT: SERVICES PANEL (width 4 cols on lg, matches sticky panel) */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              
              <div className="bg-[#f0f4f8] rounded-lg border border-[#d0e0f0] p-6 space-y-5">
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base border-b border-[#cfe0f0] pb-2.5">
                  {isEn ? 'Shipping & Logistics' : 'Pengiriman & Layanan'}
                </h3>
                
                <div className="flex gap-3">
                  <div className={`p-2 rounded-md ${themeBg}/10 text-slate-800 h-9 flex items-center justify-center flex-shrink-0`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm">
                      {isEn ? 'Shipped from Hub' : 'Dikirim dari Surabaya'}
                    </h4>
                    <p className="text-slate-500 text-[11px] md:text-xs mt-1 leading-relaxed">
                      {isEn ? 'Delivery estimate within 2-4 business days.' : 'Estimasi pesanan tiba dalam waktu 2-4 hari kerja.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className={`p-2 rounded-md ${themeBg}/10 text-slate-800 h-9 flex items-center justify-center flex-shrink-0`}>
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm">
                      {isEn ? 'Hassle-Free Return Guarantee' : 'Bebas Pengembalian'}
                    </h4>
                    <p className="text-slate-500 text-[11px] md:text-xs mt-1 leading-relaxed">
                      {isEn ? '7-day replacement warranty for factory damage.' : 'Garansi 7 hari retur resmi toko jika terjadi cacat produksi.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className={`p-2 rounded-md ${themeBg}/10 text-slate-800 h-9 flex items-center justify-center flex-shrink-0`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm">
                      {isEn ? '100% Genuine Certified' : 'Jaminan 100% Keaslian'}
                    </h4>
                    <p className="text-slate-500 text-[11px] md:text-xs mt-1 leading-relaxed">
                      {isEn ? 'Official certified seal of license from PT Panca Prima Wijaya.' : 'Bergaransi resmi dan memiliki lisensi lengkap dari PT Panca Prima Wijaya.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Suggested Products (You May Also Like section) */}
          {suggestedProducts.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8 mt-8">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-sm md:text-base font-bold text-slate-900 uppercase tracking-wide">
                  {isEn ? 'You May Also Like' : 'Kamu Mungkin Juga Suka'}
                </h2>
                <Link to={langLink(`/${baseSite}/produk`)} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition">
                  {isEn ? 'View All' : 'Lihat Semua'} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {suggestedProducts.map(p => {
                  const suggestedOriginalPrice = Math.round(p.price * 1.15);
                  return (
                    <Link 
                      key={p.id} 
                      className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all group flex flex-col cursor-pointer"
                      to={langLink(`/${baseSite}/produk/${p.slug}`)}
                    >
                      <div className="relative aspect-square bg-slate-100 overflow-hidden p-2 flex items-center justify-center">
                        <img 
                          src={p.image || undefined} 
                          alt={p.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-350"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`${themeBg} text-white font-extrabold text-[8px] tracking-wide px-1.5 py-0.5 rounded-sm`}>
                            Star+
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs text-slate-800 font-bold group-hover:text-blue-600 line-clamp-2 mb-1.5 min-h-[32px] transition-colors">{p.name}</h3>
                          <div className={`text-sm font-extrabold ${themeTextAccent}`}>
                            {formatCurrency(p.price)}
                          </div>
                          <div className="text-[10px] text-slate-400 line-through mt-0.5">
                            {formatCurrency(suggestedOriginalPrice)}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-[10px] text-slate-500 justify-between border-t border-slate-50 pt-2 mt-2">
                          <div className="flex text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          </div>
                          <span>100+ {isEn ? 'Sold' : 'Terjual'}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
      {isPancaPath && <KlienKami />}
    </>
  );
}
