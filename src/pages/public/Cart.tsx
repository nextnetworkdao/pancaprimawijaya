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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title="Keranjang Belanja | PT Panca Prima Wijaya" description="Detail pesanan dan checkout" />
      
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Keranjang Konsultasi / Pesanan</h1>

      {siteItems.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-6">Belum ada item di dalam keranjang Anda.</p>
          <Link to={site === 'sensor' ? '/sensor/produk' : '/panca/produk'} className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg">Cari Layanan/Produk</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {siteItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-6 bg-white p-6 rounded-2xl border border-gray-200">
                <img src={product.image || undefined} alt={product.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold">{formatCurrency(product.price)}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">Qty: {quantity}</span>
                      <button onClick={() => removeItem(product.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 h-fit sticky top-28">
            <h3 className="text-xl font-bold mb-6">Ringkasan Pemesanan</h3>
            <div className="flex justify-between items-center mb-6 pb-6 border-b text-xl font-black">
              <span>Total Estimasi</span>
              <span>{formatCurrency(siteTotalPrice)}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan / Individual</label>
                <input required name="name" type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required name="email" type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Penanganan / Pengiriman</label>
                <textarea required name="address" rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 disabled:opacity-75"
                >
                  <ShieldCheck className="w-5 h-5" />
                  {loading ? 'Memproses Gateway...' : 'Proses Pesanan Otomatis'}
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">Integrasi API Gateway terenkripsi.</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
