import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, ChevronRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Product } from '../../types';
import { useCart } from '../../store';
import { ProductSlider } from '../../components/ProductSlider';
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
  const themeColor = 'text-[#0a2558]';
  const themeBg = 'bg-[#0a2558]';
  const themeHoverBg = 'hover:bg-[#06183b]';
  const themeTextAccent = 'text-[#0a2558]';
  const themeBorder = 'border-[#0a2558]';
  const themeBgLight = 'bg-[#0a2558]/5';

  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then((data: Product[]) => {
        if (!Array.isArray(data)) return;
        const found = data.find(p => p.slug === slug || p.slug_en === slug);
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

  const { translatedData: translatedProduct, loading: translating } = useAutoTranslate(product, ['name', 'category', 'description', 'seoArticle']);

  if (loading || translating) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/5 aspect-square bg-gray-200 rounded-sm" />
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

  const allImages = [translatedProduct.image, ...(translatedProduct.gallery || [])].filter(Boolean);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Beranda', item: currentUrl.replace(new RegExp(`/${baseSite}/produk/.*$`), `/${baseSite}`) },
    { name: isEn ? 'Catalog' : 'Katalog', item: currentUrl.replace(new RegExp(`/${slug}$`), '') },
    { name: translatedProduct.name, item: currentUrl }
  ];

  return (
    <>
      <ProductSlider />
      <div className="bg-gray-50 min-h-screen pt-4 pb-16 animate-fade-in">
        <SEO 
          title={translatedProduct.seoTitle || translatedProduct.name}
          description={translatedProduct.seoDescription || translatedProduct.description.substring(0, 160)}
          keywords={translatedProduct.keywords}
          type="product"
          canonical={currentUrl}
          breadcrumbs={breadcrumbs}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Top Bar */}
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <nav className="flex items-center text-sm font-medium text-gray-500 gap-2">
              <Link to={langLink(`/${baseSite}`)} className="hover:text-[#0a2558] transition">{isEn ? 'Home' : 'Beranda'}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to={langLink(`/${baseSite}/produk`)} className="hover:text-[#0a2558] transition">{isEn ? 'Catalog' : 'Katalog'}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 truncate max-w-[120px] sm:max-w-xs">{translatedProduct.name}</span>
            </nav>
            <Link 
              to={langLink(`/${baseSite}/produk`)} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#0a2558] hover:text-white text-xs font-bold text-gray-700 transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEn ? 'Back' : 'Kembali'}</span>
            </Link>
          </div>

           <div className="bg-white rounded-sm shadow-sm flex flex-col mb-6 overflow-hidden border border-gray-200">
            {/* Product Image */}
            <div className="w-full p-4 flex-shrink-0">
               <div className="relative pt-[100%] bg-gray-100 rounded-sm overflow-hidden border border-gray-100 mb-4">
                  <img src={activeImage || translatedProduct.image || undefined} alt={`${translatedProduct.keywords || translatedProduct.seoTitle || translatedProduct.name} - ${isEn ? 'Fumigation & Port Sanitation services PT Panca Prima Wijaya' : 'Jasa Fumigasi & Sanitasi Gudang Pangan PT Panca Prima Wijaya'}`} className="absolute inset-0 w-full h-full object-cover transition-all" loading="eager" />
               </div>
               {allImages.length > 1 && (
                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                   {allImages.map((img, i) => (
                     <button 
                       key={i} 
                       onClick={() => setActiveImage(img)}
                       className={`relative w-20 h-20 flex-shrink-0 rounded-sm border-2 overflow-hidden transition-colors ${activeImage === img ? themeBorder : 'border-transparent'} hover:${themeBorder}`}
                     >
                       <img src={img || undefined} alt={`${translatedProduct.keywords || translatedProduct.name} Detail ${i + 1} - PT Panca Prima Wijaya`} className="w-full h-full object-cover" loading="lazy" />
                       {activeImage !== img && <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors" />}
                     </button>
                   ))}
                 </div>
               )}
            </div>
            
            {/* Product Info */}
            <div className="w-full p-4">
               <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] text-white ${themeBg} px-1.5 py-0.5 rounded-sm font-bold`}>Star+</span>
               </div>
               <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug mb-4">
                 {translatedProduct.name}
               </h1>
               
               <div className="flex items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-100">
                  <div className={`flex ${themeTextAccent}`}>
                     <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="text-gray-500"><span className="text-gray-900 border-b border-gray-900">10RB+</span> {isEn ? 'Ratings' : 'Penilaian'}</div>
                  <div className="text-gray-500"><span className="text-gray-900">10RB+</span> {isEn ? 'Sold' : 'Terjual'}</div>
               </div>

               <div className="bg-gray-50 py-4 px-6 md:px-8 flex items-center mb-6 border border-gray-100">
                  <div className={`${themeTextAccent} text-3xl font-bold`}>
                    {formatCurrency(translatedProduct.price)}
                  </div>
               </div>

               <div className="flex items-center gap-4 mb-8 text-sm">
                  <div className="text-gray-500 w-24">{isEn ? 'Shipping' : 'Pengiriman'}</div>
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-green-500" />
                     <span>{isEn ? 'Official Authorized Warranty PT Panca Prima Wijaya' : 'Garansi Resmi PT Panca Prima Wijaya'}</span>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 mt-8">
                 <button 
                   onClick={() => addItem(translatedProduct)}
                   className={`flex-1 sm:flex-none border ${themeBorder} ${themeBgLight} ${themeTextAccent} px-6 py-3 rounded-sm font-medium flex items-center justify-center gap-2 transition-colors hover:bg-gray-100`}
                 >
                   <ShoppingCart className="w-5 h-5" />
                   {isEn ? 'Add to Cart' : 'Masukkan Keranjang'}
                 </button>
                 <button 
                   onClick={() => addItem(translatedProduct)}
                   className={`flex-1 sm:flex-none ${themeBg} text-white ${themeHoverBg} px-10 py-3 rounded-sm font-medium flex items-center justify-center transition-colors shadow-sm`}
                 >
                   {isEn ? 'Buy Now' : 'Beli Sekarang'}
                 </button>
               </div>
            </div>
          </div>

          {/* Product Specifications & Details */}
          <div className="bg-white rounded-sm shadow-sm p-6 md:p-8 mb-6 border border-gray-200">
             <h2 className="bg-gray-50 p-4 text-base font-bold text-gray-900 mb-6 uppercase border border-gray-100">{isEn ? 'Product Specifications' : 'Spesifikasi Produk'}</h2>
             <div className="mb-8">
                <table className="w-full text-sm sm:text-base text-gray-700 max-w-2xl">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 text-gray-500 w-1/3">{isEn ? 'Category' : 'Kategori'}</td>
                      <td className="py-3 font-medium text-gray-900">{translatedProduct.category || (isEn ? 'Spare Parts & Sensors' : 'Sparepart & Sensor')}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 text-gray-500">{isEn ? 'Brand' : 'Merek'}</td>
                      <td className="py-3 font-medium text-gray-900">{isSensorPath ? 'Toyo Automation / Original' : 'Panca Prima Wijaya'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 text-gray-500">{isEn ? 'Condition' : 'Kondisi'}</td>
                      <td className="py-3 font-medium text-gray-900">{isEn ? 'New' : 'Baru'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-500">{isEn ? 'Availability' : 'Stok'}</td>
                      <td className="py-3 font-medium text-gray-900">{isEn ? 'Available (Custom Order)' : 'Tersedia (Custom Order)'}</td>
                    </tr>
                  </tbody>
                </table>
             </div>

             <h2 className="bg-gray-50 p-4 text-base font-bold text-gray-900 mb-6 uppercase border border-gray-100">{isEn ? 'Product Description' : 'Deskripsi Produk'}</h2>
             <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed">
                {translatedProduct.description.split('\n').map((paragraph, i) => (
                   <p key={i} className="mb-4">{paragraph}</p>
                ))}
             </div>

             {translatedProduct.seoArticle && (
                <>
                  <h2 className="bg-gray-50 p-4 text-base font-bold text-gray-900 mb-6 mt-8 uppercase border border-gray-100">{isEn ? 'Guides & Directives' : 'Artikel & Panduan'}</h2>
                  <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: translatedProduct.seoArticle }} />
                </>
             )}
          </div>

          {/* Suggested Products */}
          {suggestedProducts.length > 0 && (
            <div className="bg-white rounded-sm shadow-sm p-6 md:p-8 border border-gray-200">
               <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                 <h2 className={`text-base font-bold ${themeTextAccent} uppercase`}>{isEn ? 'You May Also Like' : 'Kamu Mungkin Juga Suka'}</h2>
                 <Link to={langLink(`/${baseSite}/produk`)} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                   {isEn ? 'View All' : 'Lihat Semua'} <ChevronRight className="w-4 h-4" />
                 </Link>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 {suggestedProducts.map(p => (
                   <Link 
                     key={p.id} 
                     className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all group flex flex-col cursor-pointer"
                     to={langLink(`/${baseSite}/produk/${p.slug}`)}
                   >
                     <div className="relative aspect-square bg-gray-100 overflow-hidden">
                       <img 
                         src={p.image || undefined} 
                         alt={p.name} 
                         className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         loading="lazy"
                       />
                       <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm shadow-sm">
                         Star+
                       </div>
                     </div>
                     <div className="p-3 flex-1 flex flex-col">
                       <h3 className="text-xs text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1 font-semibold">{p.name}</h3>
                       <div className="mt-auto">
                         <span className={`text-sm font-bold ${themeColor} block mb-1`}>{formatCurrency(p.price)}</span>
                         <div className="flex items-center text-[9px] text-gray-500 justify-between">
                           <div className="flex text-yellow-400 space-x-px">
                             <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                           </div>
                           <span>10RB+ {isEn ? 'Sold' : 'Terjual'}</span>
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
      {isPancaPath && <KlienKami />}
    </>
  );
}
