import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, ChevronRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Product } from '../../types';
import { useCart } from '../../store';
import { ProductSlider } from '../../components/ProductSlider';

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const isSensorPath = location.pathname.includes('/sensor/produk');
  const isPancaPath = location.pathname.includes('/panca/produk');
  const baseSite = isSensorPath ? 'sensor' : 'panca';
  const themeColor = isSensorPath ? 'text-[#0a2558]' : 'text-blue-600';
  const themeBg = isSensorPath ? 'bg-[#0a2558]' : 'bg-blue-600';
  const themeHoverBg = isSensorPath ? 'hover:bg-[#06183b]' : 'hover:bg-blue-700';
  const themeTextAccent = isSensorPath ? 'text-[#0a2558]' : 'text-blue-600';
  const themeBorder = isSensorPath ? 'border-[#0a2558]' : 'border-blue-600';
  const themeBgLight = isSensorPath ? 'bg-[#0a2558]/10' : 'bg-blue-50';

  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then((data: Product[]) => {
        if (!Array.isArray(data)) return;
        const found = data.find(p => p.slug === slug);
        setProduct(found || null);
        if (found) {
          setActiveImage(found.image);
          // Get suggested products
          let filtered = data.filter(p => p.id !== found.id);
          if (isSensorPath) {
            filtered = filtered.filter(p => p.site === 'sensor' || (p.category || '').toLowerCase().includes('sensor'));
          } else if (isPancaPath) {
            filtered = filtered.filter(p => p.site === 'panca' || !(p.category || '').toLowerCase().includes('sensor'));
          }
          setSuggestedProducts(filtered.slice(0, 5)); // Show 5 suggestions
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug, isSensorPath, isPancaPath]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse h-96 bg-gray-100 rounded-xl"></div>;

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Produk Tidak Ditemukan</h1>
        <Link to={`/${baseSite}`} className="text-[#ee4d2d] hover:underline">&larr; Kembali ke Beranda</Link>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);

  return (
    <>
      <ProductSlider />
      <div className="bg-gray-50 min-h-screen pt-4 pb-16">
        <SEO 
          title={product.seoTitle || product.name}
        description={product.seoDescription || product.description.substring(0, 160)}
        keywords={product.keywords}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-6 gap-2">
          <Link to={`/${baseSite}`} className={`${themeHoverBg.replace('bg-', 'text-').replace('hover:text-', 'hover:text-')}`}>Beranda</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/${baseSite}/produk`} className={`${themeHoverBg.replace('bg-', 'text-').replace('hover:text-', 'hover:text-')}`}>Katalog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="bg-white rounded-sm shadow-sm flex flex-col md:flex-row mb-6 overflow-hidden">
          {/* Product Image */}
          <div className="w-full md:w-2/5 p-4 flex-shrink-0">
             <div className="relative pt-[100%] bg-gray-100 rounded-sm overflow-hidden border border-gray-100 mb-4">
                <img src={activeImage || product.image || undefined} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-all" />
             </div>
             {allImages.length > 1 && (
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {allImages.map((img, i) => (
                   <button 
                     key={i} 
                     onClick={() => setActiveImage(img)}
                     className={`relative w-20 h-20 flex-shrink-0 rounded-sm border-2 overflow-hidden transition-colors ${activeImage === img ? themeBorder : 'border-transparent'} hover:${themeBorder}`}
                   >
                     <img src={img || undefined} alt="" className="w-full h-full object-cover" />
                     {activeImage !== img && <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors" />}
                   </button>
                 ))}
               </div>
             )}
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-3/5 p-6 md:py-8 lg:pr-12">
             <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] text-white ${themeBg} px-1.5 py-0.5 rounded-sm font-bold`}>Star+</span>
             </div>
             <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug mb-4">
               {product.name}
             </h1>
             
             <div className="flex items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-100">
                <div className={`flex ${themeTextAccent}`}>
                   <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="text-gray-500"><span className="text-gray-900 border-b border-gray-900">10RB+</span> Penilaian</div>
                <div className="text-gray-500"><span className="text-gray-900">10RB+</span> Terjual</div>
             </div>

             <div className="bg-gray-50 py-4 px-6 md:px-8 flex items-center mb-6 border border-gray-100">
                <div className={`${themeTextAccent} text-3xl font-bold`}>
                  {formatCurrency(product.price)}
                </div>
             </div>

             <div className="flex items-center gap-4 mb-8 text-sm">
                <div className="text-gray-500 w-24">Pengiriman</div>
                <div className="flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-green-500" />
                   <span>Garansi Resmi PT Panca Prima Wijaya</span>
                </div>
             </div>

             {/* Action Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 mt-8">
               <button 
                 onClick={() => addItem(product)}
                 className={`flex-1 sm:flex-none border ${themeBorder} ${themeBgLight} ${themeTextAccent} px-6 py-3 rounded-sm font-medium flex items-center justify-center gap-2 transition-colors hover:bg-gray-100`}
               >
                 <ShoppingCart className="w-5 h-5" />
                 Masukkan Keranjang
               </button>
               <button 
                 onClick={() => addItem(product)}
                 className={`flex-1 sm:flex-none ${themeBg} text-white ${themeHoverBg} px-10 py-3 rounded-sm font-medium flex items-center justify-center transition-colors shadow-sm`}
               >
                 Beli Sekarang
               </button>
             </div>
          </div>
        </div>

        {/* Product Specifications & Details */}
        <div className="bg-white rounded-sm shadow-sm p-6 md:p-8 mb-6">
           <h2 className="bg-gray-50 p-4 text-lg font-bold text-gray-900 mb-6 uppercase border border-gray-100">Spesifikasi Produk</h2>
           <div className="mb-8">
             <table className="w-full text-sm sm:text-base text-gray-700 max-w-2xl">
               <tbody>
                 <tr className="border-b border-gray-100">
                   <td className="py-3 text-gray-500 w-1/3">Kategori</td>
                   <td className="py-3 font-medium text-gray-900">{product.category || 'Sparepart & Sensor'}</td>
                 </tr>
                 <tr className="border-b border-gray-100">
                   <td className="py-3 text-gray-500">Merek</td>
                   <td className="py-3 font-medium text-gray-900">{isSensorPath ? 'Toyo Automation / Original' : 'Panca Prima Wijaya'}</td>
                 </tr>
                 <tr className="border-b border-gray-100">
                   <td className="py-3 text-gray-500">Kondisi</td>
                   <td className="py-3 font-medium text-gray-900">Baru</td>
                 </tr>
                 <tr>
                   <td className="py-3 text-gray-500">Stok</td>
                   <td className="py-3 font-medium text-gray-900">Tersedia (Custom Order)</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <h2 className="bg-gray-50 p-4 text-lg font-bold text-gray-900 mb-6 uppercase border border-gray-100">Deskripsi Produk</h2>
           <div className="prose prose-sm md:prose-base max-w-none text-gray-700">
             {product.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
             ))}
           </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <h2 className={`text-lg font-bold ${themeTextAccent} uppercase`}>Kamu Mungkin Juga Suka</h2>
              <Link to={`/${baseSite}/produk`} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {suggestedProducts.map(p => (
                <Link 
                  key={p.id} 
                  className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer block"
                  to={`/${baseSite}/produk/${p.slug}`}
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img 
                      src={p.image || undefined} 
                      alt={p.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm shadow-sm">
                      Star+
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">{p.name}</h3>
                    <div className="mt-auto">
                      <span className={`text-base font-bold ${themeColor} block mb-1`}>{formatCurrency(p.price)}</span>
                      <div className="flex items-center text-[10px] text-gray-500 justify-between">
                        <div className="flex text-yellow-400 space-x-px">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                        </div>
                        <span>10RB+ Terjual</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}
