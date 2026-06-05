import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../types';
import { useCart } from '../../store';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { ProductSlider } from '../../components/ProductSlider';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const filter = searchParams.get('filter');

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
        } else if (filter === 'sensor') {
          filtered = data.filter(p => (p.category || '').toLowerCase().includes('sensor') || p.site === 'sensor');
        } else if (filter) {
          filtered = data.filter(p => (p.category || '').toLowerCase().includes(filter.toLowerCase()));
        }

        setProducts(filtered);
        setLoading(false);
      });
  }, [filter, isSensorPath, isPancaPath]);

  const pageTitle = isSensorPath 
    ? "Katalog Produk Sensor | PT Panca Prima Wijaya"
    : isPancaPath
    ? "Katalog Produk Panca Prima Wijaya"
    : "Katalog Produk & Layanan | PT Panca Prima Wijaya";

  return (
    <>
      <ProductSlider />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SEO 
          title={pageTitle}
          description="Pesan layanan sanitasi, obat kutu beras, atau sensor gempa (Early Warning System) terbaik dengan marketplace Panca Prima Wijaya."
        />
      
      <div className="mb-12 border-b pb-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Katalog Solusi Kami</h1>
        <p className="text-gray-500 mt-2 text-lg">Konsultasikan atau pesan produk terbaik kami langsung melalui sistem ini.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="animate-pulse bg-white border border-gray-100 h-64 md:h-80 rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => {
            const isSensor = product.site === 'sensor' || (product.category || '').toLowerCase().includes('sensor');
            const themeColor = isSensorPath || isSensor ? 'text-[#0a2558]' : 'text-blue-600';
            const themeBg = isSensorPath || isSensor ? 'bg-[#0a2558]' : 'bg-blue-600';
            const themeHoverBg = isSensorPath || isSensor ? 'hover:bg-[#06183b]' : 'hover:bg-blue-700';

            return (
              <Link 
                key={product.id} 
                className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer block"
                to={`/${isSensorPath ? 'sensor' : 'panca'}/produk/${product.slug}`}
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image || undefined} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge Star+ simulation */}
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm shadow-sm">
                    Star+
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-gray-400 text-xs border border-gray-400 px-1 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                      {product.category || 'Terlaris'}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <span className={`text-base font-bold ${themeColor} block mb-1`}>{formatCurrency(product.price)}</span>
                    <div className="flex items-center text-[10px] text-gray-500 justify-between">
                      <div className="flex text-yellow-400 space-x-px">
                         <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                      </div>
                      <span>10RB+ Terjual</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
      </div>
    </>
  );
}
