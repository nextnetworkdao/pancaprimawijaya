import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';
import { 
  User as UserIcon, Mail, Phone, MapPin, Lock, 
  LogOut, ShoppingBag, Calendar, ChevronRight, 
  AlertCircle, Loader2, CheckCircle, Save, Truck
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

const dict = {
  id: {
    portalTitle: "Portal Saya",
    dashboardDesc: "Atur alamat pengiriman, perbarui kredensial akun, serta lacak status pengajuan pesanan Anda secara real-time.",
    personalDetails: "Data Profil & Kontak",
    emailLabel: "Alamat Email",
    nameLabel: "Nama Lengkap / Perusahaan",
    phoneLabel: "Nomor Telepon / WhatsApp",
    phonePlaceholder: "Contoh: 0853XXXXXXXX",
    passwordLabel: "Kata Sandi Baru",
    passwordHelper: "Biarkan kosong jika tidak ingin mengubah kata sandi",
    shippingAddress: "Alamat Pengiriman Utama Anda",
    addressPlaceholder: "Masukkan detail alamat pengiriman/pengerjaan lengkap...",
    btnSave: "Simpan Perubahan",
    btnSaving: "Menyimpan...",
    saveSuccess: "Profil dan alamat berhasil diperbarui!",
    saveError: "Gagal menyimpan perubahan. Periksa inputan Anda.",
    ordersTitle: "Riwayat & Status Pesanan",
    loadingOrders: "Memuat riwayat transaksi...",
    noOrders: "Belum memiliki riwayat transaksi/estimasi.",
    shopBtn: "Mulai Jelajahi Produk",
    totalPrice: "Total Estimasi",
    shippingLabel: "Alamat Pengiriman",
    logoutBtn: "Keluar Akun",
    activeStatus: "Pembeli Aktif",
    backToHome: "← Kembali ke Produk",
    unauthorized: "Silakan masuk terlebih dahulu."
  },
  en: {
    portalTitle: "My Account Portal",
    dashboardDesc: "Manage your default shipping address, update contact details, and track your active order estimations in real-time.",
    personalDetails: "Profile & Contact Settings",
    emailLabel: "Email Address",
    nameLabel: "Full Name / Company Name",
    phoneLabel: "Phone Number / WhatsApp",
    phonePlaceholder: "e.g., +62 853 XXXX XXXX",
    passwordLabel: "New Password",
    passwordHelper: "Leave blank if you do not wish to change your password",
    shippingAddress: "Default Shipping Address",
    addressPlaceholder: "Provide complete shipping or installation address details...",
    btnSave: "Save Profile",
    btnSaving: "Saving...",
    saveSuccess: "Profile and address successfully updated!",
    saveError: "Failed to save profile changes. Verify your inputs.",
    ordersTitle: "Order Estimations & Status",
    loadingOrders: "Retrieving transaction history...",
    noOrders: "No order history found for this account.",
    shopBtn: "Browse Our Products",
    totalPrice: "Total Estimated",
    shippingLabel: "Shipping Address",
    logoutBtn: "Sign Out",
    activeStatus: "Active Customer",
    backToHome: "← Back to Products",
    unauthorized: "Please sign in first."
  }
};

export default function UserPage() {
  const navigate = useNavigate();
  const { isEn } = useLanguage();
  const t = isEn ? dict.en : dict.id;

  const site = (localStorage.getItem('currentSite') as 'panca' | 'sensor') || 'panca';
  const isSensor = site === 'sensor';

  const [customerUser, setCustomerUser] = useState<Customer | null>(null);
  
  // Settings edit states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Guard and load data
  useEffect(() => {
    const saved = localStorage.getItem('customer_user');
    if (!saved) {
      navigate(isEn ? '/en/login' : '/masuk', { replace: true });
      return;
    }

    try {
      const parsed: Customer = JSON.parse(saved);
      if (parsed && parsed.email) {
        setCustomerUser(parsed);
        setName(parsed.name || '');
        setEmail(parsed.email || '');
        setPhone(parsed.phone || '');
        setAddress(parsed.address || '');
      } else {
        localStorage.removeItem('customer_user');
        navigate(isEn ? '/en/login' : '/masuk', { replace: true });
      }
    } catch (e) {
      localStorage.removeItem('customer_user');
      navigate(isEn ? '/en/login' : '/masuk', { replace: true });
    }
  }, [navigate, isEn]);

  // Load orders when customer parsed
  useEffect(() => {
    if (customerUser?.email) {
      fetchCustomerOrders(customerUser.email);
    }
  }, [customerUser]);

  const fetchCustomerOrders = async (userEmail: string) => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`/api/customers/orders?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (e) {
      console.error("Failed to fetch customer orders:", e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerUser) return;
    
    setLoading(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/customers/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: customerUser.id,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim() || undefined,
          phone: phone.trim(),
          address: address.trim()
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || t.saveError);
      }

      // Update in local storage
      const updatedUser = resData.customer;
      localStorage.setItem('customer_user', JSON.stringify(updatedUser));
      setCustomerUser(updatedUser);
      setPassword(''); // Clear password field
      setSaveSuccess(true);
      
      // Auto-hide success banner
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch (err: any) {
      setSaveError(err.message || t.saveError);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_user');
    navigate(isEn ? '/en/login' : '/masuk');
  };

  if (!customerUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#f8fafc] py-8 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO 
        title={`${t.portalTitle} | PT Panca Prima Wijaya`} 
        description={t.dashboardDesc} 
      />

      <div className="max-w-4xl mx-auto">
        {/* User Hero Header */}
        <div className={`bg-gradient-to-r ${
          isSensor ? 'from-amber-600 to-orange-700' : 'from-[#0a2558] to-[#1e3a8a]'
        } rounded-3xl p-6 md:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-black text-amber-300 border border-white/10 uppercase font-sans">
              {name ? name.charAt(0) : 'U'}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">{t.portalTitle}</span>
              <h1 className="text-xl md:text-2xl font-black tracking-tight mt-0.5">{name}</h1>
              <p className="text-blue-100 text-xs font-semibold">{email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2.5 bg-green-500/25 border border-green-500/30 text-green-300 px-3 py-0.5 rounded-full text-[10px] font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-green-400 animate-pulse" /> {t.activeStatus}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 px-5 py-2.5 rounded-xl font-bold text-xs transition duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-300" />
            {t.logoutBtn}
          </button>
        </div>

        {/* Settings and Order History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PROFILE SETTINGS FORM */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col h-fit">
            <div className="flex items-center gap-2.5 mb-6 border-b pb-4">
              <UserIcon className="w-5 h-5 text-[#0a2558]" />
              <h2 className="text-base font-black text-slate-800 tracking-tight">{t.personalDetails}</h2>
            </div>

            {saveSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>{t.saveSuccess}</span>
              </div>
            )}

            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">{t.nameLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 text-xs w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">{t.emailLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-xs w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">{t.phoneLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    placeholder={t.phonePlaceholder}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 text-xs w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 text-xs w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition"
                  />
                </div>
                <p className="text-[9px] text-gray-400 mt-1 font-semibold">{t.passwordHelper}</p>
              </div>

              <div className="border-t pt-4 mt-4">
                <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {t.shippingAddress}
                </label>
                <textarea
                  value={address}
                  rows={3}
                  placeholder={t.addressPlaceholder}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-xs w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full gap-2 py-3.5 px-4 mt-2 rounded-xl text-xs font-extrabold text-white flex justify-center items-center transition shadow-md disabled:opacity-75 cursor-pointer ${
                  isSensor ? 'bg-orange-600 hover:bg-orange-700' : 'bg-[#0a2558] hover:bg-[#06183b]'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? t.btnSaving : t.btnSave}
              </button>
            </form>
          </div>

          {/* ACTIVE ESTIMATIONS / HISTORY */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col h-fit">
            <div className="flex items-center gap-2.5 mb-6 border-b pb-4">
              <ShoppingBag className="w-5 h-5 text-[#0a2558]" />
              <h2 className="text-base font-black text-slate-800 tracking-tight">{t.ordersTitle}</h2>
            </div>

            {loadingOrders ? (
              <div className="py-16 text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                {t.loadingOrders}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl">
                <p className="text-gray-400 text-xs font-bold mb-4">{t.noOrders}</p>
                <button 
                  onClick={() => navigate(isSensor ? '/sensor/produk' : '/panca/produk')}
                  className={`text-white font-extrabold text-[11px] px-6 py-2.5 rounded-full transition shadow-md ${
                    isSensor ? 'bg-orange-600 hover:bg-orange-700' : 'bg-[#0a2558] hover:bg-[#06183b]'
                  }`}
                >
                  {t.shopBtn}
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {orders.map((order) => {
                  const s = order.status.trim().toLowerCase();
                  const isSelesai = s === 'selesai' || s === 'completed';
                  const isDikirim = s === 'dikirim' || s === 'shipped';
                  const isDiproses = s === 'diproses' || s === 'processing';
                  const isPaid = s.includes('success') || s.includes('paid');

                  let statusClass = 'bg-amber-100 text-amber-700';
                  let statusTxt = order.status;

                  if (isSelesai) {
                    statusClass = 'bg-green-100 text-green-700';
                    statusTxt = isEn ? 'Completed' : 'Selesai';
                  } else if (isDikirim) {
                    statusClass = 'bg-indigo-100 text-indigo-700';
                    statusTxt = isEn ? 'Shipped / Out for Delivery' : 'Dalam Pengiriman (Shipped)';
                  } else if (isDiproses) {
                    statusClass = 'bg-blue-100 text-blue-700';
                    statusTxt = isEn ? 'Processing' : 'Sedang Diproses';
                  } else if (isPaid) {
                    statusClass = 'bg-emerald-100 text-emerald-700';
                    statusTxt = isEn ? 'Paid' : 'Lunas';
                  } else if (s === 'dibatalkan' || s === 'cancelled') {
                    statusClass = 'bg-rose-100 text-rose-700';
                    statusTxt = isEn ? 'Cancelled' : 'Dibatalkan';
                  } else if (s === 'pending') {
                    statusTxt = isEn ? 'Pending Payment' : 'Menunggu Pembayaran';
                  }

                  return (
                    <div key={order.id} className="border border-gray-100 p-4 rounded-2xl hover:bg-gray-50/50 transition-colors flex flex-col justify-between gap-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-xs text-[#0a2558] block">{order.id}</span>
                          <div className="flex items-center gap-1 text-gray-400 text-[10px] font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(order.date).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide uppercase ${statusClass}`}>
                          {statusTxt}
                        </span>
                      </div>

                      {order.resi && (
                        <div className="bg-indigo-50 border border-indigo-100/50 p-3 rounded-xl text-[11px]">
                          <div className="flex items-center gap-1.5 text-indigo-800 font-bold mb-1">
                            <Truck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                            <span>{isEn ? 'Logistics / Tracking info' : 'Pelacakan Pengiriman'}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] mt-1 text-indigo-900 font-medium bg-white p-2 rounded-lg border border-indigo-100/30">
                            <span>{isEn ? 'Tracking Code (Resi):' : 'No. Resi Pengiriman:'}</span>
                            <span className="font-mono font-black tracking-wide select-all bg-indigo-50 px-1.5 py-0.5 rounded text-indigo-700">
                              {order.resi}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10px] text-gray-500">
                        <span className="font-bold text-[#0a2558]">{t.shippingLabel}: </span>
                        <span className="font-medium line-clamp-2">{order.customer.address}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">{t.totalPrice}</p>
                          <p className="font-extrabold text-[#0a2558] text-xs">{formatCurrency(order.total)}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
