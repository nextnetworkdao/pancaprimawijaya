import React, { useState } from 'react';
import { Trash2, ShieldCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { formatCurrency } from '../../lib/utils';
import { useCart } from '../../store';

export default function Cart() {
  const { removeItem, clearCartBySite, getItemsBySite, getTotalPriceBySite } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const site = (localStorage.getItem('currentSite') as 'panca' | 'sensor') || 'panca';
  const siteItems = getItemsBySite(site);
  const siteTotalPrice = getTotalPriceBySite(site);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Simulate order placement
    const payload = {
      total: siteTotalPrice,
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address')
      },
      items: siteItems.map(i => ({ productId: i.product.id, quantity: i.quantity }))
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSuccess(true);
      clearCartBySite(site);
    } catch (err) {
      alert("Terjadi kesalahan sistem pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <SEO title="Pesanan Berhasil | Panca Prima Wijaya" description="Checkout berhail" />
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Pesanan Berhasil Diverifikasi</h2>
        <p className="text-gray-600 mb-8">Pihak kami akan segera menghubungi Anda dengan langkah teknis selanjutnya. Riwayat otomatis terekam dalam sistem admin.</p>
        <Link to={site === 'sensor' ? '/sensor/produk' : '/panca/produk'} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800">
          Pesanan Selesai
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      <SEO title="Keranjang Belanja | PT Panca Prima Wijaya" description="Detail pesanan dan checkout" />
      
      <h1 className="text-xl font-black text-[#0a2558] tracking-tight mb-6">Keranjang Belanja</h1>
 
       {siteItems.length === 0 ? (
        <div className="bg-white border rounded-2xl p-8 text-center shadow-sm">
           <p className="text-gray-500 mb-6 text-sm">Belum ada item di dalam keranjang Anda.</p>
           <Link to={site === 'sensor' ? '/sensor/produk' : '/panca/produk'} className="bg-[#0a2558] hover:bg-[#06183b] text-white font-bold px-6 py-2.5 rounded-full text-xs transition shadow-md inline-block">Cari Layanan/Produk</Link>
         </div>
       ) : (
        <div className="flex flex-col gap-6">
           {/* Cart Items */}
          <div className="space-y-4">
             {siteItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <img src={product.image || undefined} alt={product.keywords || product.name} className="w-16 h-16 object-cover rounded-xl bg-gray-50 border p-1" />
                 <div className="flex-1 flex flex-col justify-between">
                   <div>
                     <h3 className="font-extrabold text-[#0a2558] text-sm line-clamp-1">{product.name}</h3>
                     <p className="text-gray-400 text-[10px] mt-0.5 font-semibold">{product.category}</p>
                   </div>
                   <div className="mt-2 flex items-center justify-between">
                     <span className="font-bold text-[#0a2558] text-xs">{formatCurrency(product.price)}</span>
                     <div className="flex items-center gap-3">
                       <span className="text-[11px] font-bold text-gray-500">Qty: {quantity}</span>
                       <button onClick={() => removeItem(product.id)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-colors" aria-label="Hapus">
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
 
           {/* Checkout Form */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-base font-black text-[#0a2558] mb-4">Ringkasan Pemesanan</h3>
            <div className="flex justify-between items-center mb-4 pb-4 border-b text-base font-black">
               <span>Total Estimasi</span>
               <span className="text-[#0a2558]">{formatCurrency(siteTotalPrice)}</span>
             </div>
 
             <form onSubmit={handleCheckout} className="space-y-4">
               <div>
                 <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Nama Perusahaan / Individual</label>
                 <input required name="name" type="text" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none text-xs font-semibold" />
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Email</label>
                 <input required name="email" type="email" className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none text-xs font-semibold" />
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Alamat Penanganan / Pengiriman</label>
                 <textarea required name="address" rows={2} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none text-xs font-semibold" />
               </div>
               
               <div className="pt-2">
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full flex items-center justify-center gap-2 bg-[#0a2558] text-white font-extrabold py-3.5 rounded-xl hover:bg-[#06183b] disabled:opacity-75 transition-all text-xs shadow-md"
                 >
                   <ShieldCheck className="w-4 h-4 text-amber-500" />
                   {loading ? 'Memproses Gateway...' : 'Proses Pesanan Otomatis'}
                 </button>
                 <p className="text-[9px] text-gray-400 text-center mt-3 font-semibold">Integrasi API Gateway terenkripsi.</p>
               </div>
             </form>
           </div>
         </div>
       )}
     </div>
  );
}
