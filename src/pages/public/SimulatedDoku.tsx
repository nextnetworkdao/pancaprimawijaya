import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, CreditCard, Landmark, QrCode, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { SEO } from '../../components/SEO';

interface OrderData {
  id: string;
  total: number;
  status: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Array<{ productId: string; quantity: number }>;
}

export default function SimulatedDoku() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'va' | 'qris' | 'cc'>('va');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Order data not found');
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId]);

  const handleSimulatePayment = async () => {
    setPaying(true);
    try {
      const response = await fetch(`/api/doku/simulate-success`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate('/cart');
        }, 3000);
      } else {
        alert('Terjadi kesalahan selama simulasi pembayaran.');
      }
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim perintah simulasi ke backend.');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E12029] mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Menghubungi Virtual Checkout DOKU...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-lg">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Pesanan Tidak Ditemukan</h2>
          <p className="text-slate-500 text-xs mt-2 mb-6">ID Pesanan {orderId} tidak terdaftar di database.</p>
          <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold">KEMBALI KE BERANDA</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans">
      <SEO title="DOKU Hosted Checkout Simulator" description="Simulasi Gateway Pembayaran DOKU" />

      {paymentSuccess ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border shadow-xl animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Simulasi Sukses!</h1>
          <p className="text-sm text-slate-500">Pembayaran untuk <strong>#{orderId}</strong> berhasil diverifikasi secara real-time via simulator DOKU.</p>
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
            <span className="text-xs font-bold text-green-800 block">Status: SUCCESS_PAID</span>
            <span className="text-[11px] text-green-600 mt-1 block">Anda akan segera diarahkan kembali ke web merchant.</span>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 shadow-2xl rounded-3xl overflow-hidden bg-white border border-slate-200">
          {/* Main Doku Frame UI */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-center justify-between border-b pb-6 mb-6">
              <div>
                <img src="/img/doku-logo-or-similar" alt="DOKU Payment Gateway" className="h-8 onerror-fallback" onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }} />
                {/* Fallback branded text in case logo is missing */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tighter text-[#E12029]">DOKU</span>
                  <span className="bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase">Simulator</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Merchant</span>
                <span className="text-xs font-extrabold text-slate-800">PT PANCA PRIMA WIJAYA</span>
              </div>
            </div>

            {/* Config warning info */}
            <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200/60 flex gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-amber-800 block">DOKU Sandbox / Production Ready</span>
                <p className="text-[11px] text-amber-600 leading-relaxed mt-1">
                  Model REST API signature DOKU telah terprogram secara penuh di backend. Ketika Anda menambahkan <code className="bg-amber-100 font-mono px-1 rounded">DOKU_CLIENT_ID</code> dan <code className="bg-amber-100 font-mono px-1 rounded">DOKU_SECRET_KEY</code> ke dalam environment secrets, sistem akan langsung mengirim redirect ke halaman pembayaran resmi DOKU (Jokul Checkout).
                </p>
              </div>
            </div>

            {/* Payment Methods Tabs */}
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Pilih Metode Simulasi</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSelectedMethod('va')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                  selectedMethod === 'va'
                    ? 'border-[#E12029] bg-red-50 text-[#E12029]'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                }`}
              >
                <Landmark className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase">Virtual Account</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('qris')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                  selectedMethod === 'qris'
                    ? 'border-[#E12029] bg-red-50 text-[#E12029]'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase">QRIS / E-Wallet</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('cc')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                  selectedMethod === 'cc'
                    ? 'border-[#E12029] bg-red-50 text-[#E12029]'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase">Credit Card</span>
              </button>
            </div>

            {/* Payment details content based on tabs */}
            <div className="bg-slate-50 border rounded-2xl p-5 mb-6 text-left">
              {selectedMethod === 'va' && (
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase mb-1">Nomor Virtual Account</span>
                  <span className="font-mono text-lg font-black text-slate-800 tracking-wider">8887602046481754</span>
                  <span className="text-[10px] text-slate-400 block mt-2">Dukung Transfer BNI, Mandiri, BRI, Permata &amp; Permata Syariah.</span>
                </div>
              )}
              {selectedMethod === 'qris' && (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="bg-white p-2 border rounded-xl shadow-sm">
                    {/* Simulated QR block layout */}
                    <div className="w-24 h-24 bg-slate-800 flex items-center justify-center rounded-lg">
                      <QrCode className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block uppercase">QRIS GPN NASIONAL</span>
                    <span className="text-[11px] text-slate-400 block mt-1">Gunakan pemindai aplikasi DANA, OVO, Gopek, LinkAja, atau m-Banking Anda untuk melakukan transaksi pembayaran QR.</span>
                  </div>
                </div>
              )}
              {selectedMethod === 'cc' && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block uppercase">Metode Kartu Kredit / Debit</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input disabled placeholder="Nomor Kartu: **** **** **** 4812" className="bg-white border rounded-xl p-2 text-xs text-slate-400" />
                    <input disabled placeholder="Expiry: 12/28" className="bg-white border rounded-xl p-2 text-xs text-slate-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Payment buttons */}
            <button
              onClick={handleSimulatePayment}
              disabled={paying}
              className="w-full bg-[#E12029] hover:bg-red-700 text-white font-extrabold py-3.5 rounded-2xl tracking-wide uppercase transition shadow-lg hover:shadow-red-500/25 disabled:opacity-75 flex items-center justify-center gap-2 text-sm"
            >
              🔒 {paying ? 'Verifying payment...' : `Lakukan Simulasi Pembayaran (${formatCurrency(order.total)})`}
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-3">Tautan pembayaran ini diamankan dengan SSL 256-bit Enkripsi Ganda.</p>
          </div>

          {/* Sidebar Order Summary */}
          <div className="w-full md:w-80 bg-slate-50 border-t md:border-t-0 md:border-l p-6 md:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="mb-6">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">ID Pesanan</span>
                <span className="text-lg font-black text-slate-800 block">#{orderId}</span>
              </div>

              <div className="border-b pb-4 mb-4">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Detail Pelanggan</span>
                <span className="text-xs font-bold text-slate-800 block mt-1">{order.customer.name}</span>
                <span className="text-xs text-slate-500 block">{order.customer.email}</span>
                <span className="text-[11px] text-slate-400 block mt-1 line-clamp-1">{order.customer.address}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2 block">Item Pesanan</span>
                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600 max-w-[150px] truncate">Servis / Barang: {it.productId}</span>
                      <span className="text-slate-400 font-bold">x{it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center text-slate-800">
                <span className="text-xs font-extrabold uppercase">Total Tagihan</span>
                <span className="text-lg font-black text-[#E12029]">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
