import React, { useEffect, useState } from 'react';
import { 
  Eye, X, Shield, ShoppingCart, User, MapPin, Phone, 
  Mail, Calendar, Tag, FileText, CheckCircle, Clock, Truck, 
  AlertTriangle, Save, Loader2, ArrowRight, MessageCircle 
} from 'lucide-react';
import { Order, Product } from '../../types';
import { formatCurrency } from '../../lib/utils';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');
  const [editResi, setEditResi] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const fetchOrders = () => {
    setLoading(true);
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    // Load products list for lookup fallback
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setEditResi(order.resi || '');
    setSuccessMsg('');
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setUpdatingId(selectedOrder.id);
    try {
      const response = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          resi: editResi.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui pesanan');
      }

      const updated = await response.json();
      
      // Update local orders list state
      setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
      setSelectedOrder(updated);
      setSuccessMsg('Status pesanan dan resi berhasil diperbarui!');
      
      // Clear message after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan');
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper to resolve product details if not already complete in items
  const getProductDetail = (itemId: string, itemFallbackName: string = 'Produk Spesialis') => {
    const match = products.find(p => p.id === itemId);
    return {
      name: match ? match.name : itemFallbackName,
      price: match ? match.price : 0,
      image: match ? match.image : ''
    };
  };

  // Human readable statuses
  const getStatusLabelAndStyle = (status: string) => {
    switch (status.trim().toLowerCase()) {
      case 'pending':
        return { label: 'Pending Payment', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'diproses':
      case 'processing':
        return { label: 'Sedang Diproses', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'dikirim':
      case 'shipped':
        return { label: 'Dalam Pengiriman (Shipped)', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'selesai':
      case 'completed':
        return { label: 'Selesai', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'dibatalkan':
      case 'cancelled':
        return { label: 'Dibatalkan', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: status, bg: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  const getWhatsAppLink = (phone: string) => {
    if (!phone) return '';
    const cleanNum = phone.replace(/[^0-9]/g, '');
    // WhatsApp requires country code, if it starts with 08, format to Indonesian 628
    let formatted = cleanNum;
    if (cleanNum.startsWith('08')) {
      formatted = '628' + cleanNum.substring(2);
    }
    return `https://wa.me/${formatted}`;
  };

  return (
    <div className="font-sans text-[#3c434a] max-w-7xl mx-auto p-4 md:p-6">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#0a2558]" />
            Panel Manajemen Pesanan
          </h1>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">
            Proses pesanan pelanggan, kelola status logistik, dan input resi pengiriman real-time.
          </p>
        </div>
        <div>
          <button 
            onClick={fetchOrders}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-gray-800 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-[#c3c4c7] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-[180px]">No. Pesanan</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-[140px]">Tanggal</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-[180px]">Status Logistik</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-[180px]">No. Resi</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-[150px] text-right">Total Tagihan</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-[100px] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-7 h-7 animate-spin mx-auto text-[#0a2558] mb-2" />
                    <span>Sinkronisasi database pesanan...</span>
                  </td>
                </tr>
              ) : orders.map((order, idx) => {
                const statusMeta = getStatusLabelAndStyle(order.status);
                // Try reading phone
                const customerPhone = (order.customer as any)?.phone || '';

                return (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-[#0a2558]">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-gray-800">{order.customer.name}</div>
                      <div className="text-gray-400 font-medium">{order.customer.email}</div>
                      {customerPhone && (
                        <div className="text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span>{customerPhone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-semibold">
                      {new Date(order.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 border rounded-full text-[10px] font-extrabold tracking-wide uppercase ${statusMeta.bg}`}>
                        {statusMeta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {order.resi ? (
                        <div className="font-mono text-gray-800 font-bold bg-slate-100 px-2 py-1 rounded inline-block">
                          {order.resi}
                        </div>
                      ) : (
                        <span className="text-gray-300 font-bold italic">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right font-black text-gray-900 text-sm">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="p-1 px-3 border border-gray-200 hover:border-[#0a2558] text-[#0a2558] hover:bg-[#0a2558] hover:text-white rounded-lg transition font-extrabold flex items-center gap-1 mx-auto shadow-sm"
                        title="Detail & Hambatan Kiriman"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Kelola</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <span className="font-bold block text-gray-700 mb-1">Belum Ada Pesanan</span>
                    <span className="text-xs text-gray-500 font-semibold">Pesanan yang dibuat oleh pembeli akan muncul otomatis di sini.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Dialog/Drawer Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Detail Pesanan</h3>
                <p className="font-mono text-[#0a2558] font-bold text-xs mt-0.5">#{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-700 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Success Notification message */}
              {successMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Status Indicator Bar */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border rounded-xl">
                <span className="text-xs font-bold text-gray-500">Status Terkini:</span>
                <span className={`inline-block px-3 py-1 text-xs font-black rounded-lg border uppercase ${getStatusLabelAndStyle(selectedOrder.status).bg}`}>
                  {getStatusLabelAndStyle(selectedOrder.status).label}
                </span>
              </div>

              {/* Buyer section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" />
                  Informasi Pembeli
                </h4>
                <div className="bg-white border rounded-xl p-4 text-xs space-y-2.5">
                  <div className="grid grid-cols-3">
                    <span className="text-gray-400 font-semibold">Nama / Perusahaan</span>
                    <span className="col-span-2 font-bold text-gray-800">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-gray-400 font-semibold">Alamat email</span>
                    <span className="col-span-2 font-bold text-gray-800 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {selectedOrder.customer.email}
                    </span>
                  </div>
                  
                  {/* Customer phone number displays */}
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-gray-400 font-semibold">No. Telepon / WA</span>
                    <div className="col-span-2">
                      {((selectedOrder.customer as any)?.phone) ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{(selectedOrder.customer as any).phone}</span>
                          <a 
                            href={getWhatsAppLink((selectedOrder.customer as any).phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-extrabold flex items-center gap-1 border border-emerald-200 transition text-[10px]"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Hubungi WA</span>
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-semibold italic">Tidak terlampir</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <span className="text-gray-400 font-semibold">Alamat Logistik</span>
                    <span className="col-span-2 font-semibold text-gray-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 inline mr-1 mb-0.5" />
                      {selectedOrder.customer.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                  <ShoppingCart className="w-4 h-4 text-gray-400" />
                  Rincian Komoditas Dipesan
                </h4>
                <div className="border rounded-xl overflow-hidden bg-white">
                  <div className="divide-y divide-gray-100">
                    {selectedOrder.items.map((item: any, iIndex) => {
                      // Items can have exact product name saved at checkout, fallback to catalog
                      const pData = getProductDetail(item.productId, item.name);
                      const finalItemName = item.name || pData.name;
                      const finalPrice = item.price !== undefined ? Number(item.price) : pData.price;
                      
                      return (
                        <div key={iIndex} className="p-3.5 flex items-start justify-between gap-4 text-xs hover:bg-slate-50/55 transition-colors">
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-800">{finalItemName}</h5>
                            <div className="text-gray-400 font-semibold mt-0.5 flex items-center gap-1">
                              <span>SKU: {item.productId}</span>
                              {item.variation && (
                                <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-extrabold text-[10px]">
                                  {item.variation}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="font-semibold text-gray-600 block">{item.quantity} x {formatCurrency(finalPrice)}</span>
                            <span className="font-bold text-gray-800 block text-xs mt-0.5">{formatCurrency(finalPrice * item.quantity)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-slate-50 p-3.5 flex items-center justify-between border-t text-sm">
                    <span className="font-bold text-gray-700">Total Pembayaran:</span>
                    <span className="font-black text-gray-900 text-base">{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Update Logistical Processing */}
              <form onSubmit={handleUpdateOrder} className="space-y-4 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-extrabold uppercase text-[#0a2558] tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4.5 h-4.5" />
                  Logistik & Proses Status Pesanan
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Status Alur Kerja</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] bg-white cursor-pointer"
                    >
                      <option value="Pending">Pending Payment (Pending)</option>
                      <option value="Diproses">Diproses Admin (Diproses)</option>
                      <option value="Dikirim">Dikirim Kurir (Dikirim)</option>
                      <option value="Selesai">Pesanan Selesai (Selesai)</option>
                      <option value="Dibatalkan">Pesanan Dibatalkan (Dibatalkan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Nomor Resi Pengiriman
                    </label>
                    <input
                      type="text"
                      value={editResi}
                      onChange={(e) => setEditResi(e.target.value)}
                      placeholder="Masukkan No. Resi JNE/J&T dsb."
                      className="w-full text-xs font-semibold px-3 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558]"
                    />
                    <p className="text-[10px] text-gray-400 font-bold mt-1">
                      No. Resi akan terlihat langsung di dashboard pembeli.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={updatingId !== null}
                    className="w-full py-3 px-4 bg-[#0a2558] hover:bg-[#06183b] text-white rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
                  >
                    {updatingId !== null ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Simpan Perubahan & Update Kurir</span>
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
