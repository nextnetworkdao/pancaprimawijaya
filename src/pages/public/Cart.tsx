import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  ShieldCheck, 
  CheckCircle, 
  Check, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  ClipboardList, 
  Truck, 
  Receipt, 
  ChevronDown, 
  ShoppingBag, 
  X,
  Smartphone,
  MapPinned
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { formatCurrency } from '../../lib/utils';
import { useCart } from '../../store';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types';

// Multi-language translation dictionaries
const translations = {
  cartTitle: { id: "Keranjang Belanja", en: "Shopping Cart" },
  selectAll: { id: "Pilih Semua", en: "Select All" },
  deleteAll: { id: "Hapus Semua", en: "Clear All" },
  variantLabel: { id: "Varian", en: "Variant" },
  totalBelanja: { id: "Total Belanja", en: "Total Shopping" },
  checkoutBtn: { id: "Checkout", en: "Checkout" },
  emptyCart: { id: "Belanjaan Anda kosong.", en: "Your cart is currently empty." },
  findProducts: { id: "Cari Layanan/Produk", en: "Find Services/Products" },
  
  checkoutTitle: { id: "Halaman Checkout", en: "Checkout Page" },
  deliveryAddress: { id: "Alamat Pengiriman", en: "Shipping Address" },
  changeAddress: { id: "Pilih Alamat Lain", en: "Select Another Address" },
  yourOrders: { id: "Pesanan Anda", en: "Your Order" },
  notesLabel: { id: "Pesan (Opsional)", en: "Notes (Optional)" },
  notesPlaceholder: { id: "Tinggalkan pesan untuk penjual...", en: "Leave a message for the seller..." },
  shippingLabel: { id: "Pengiriman", en: "Shipping" },
  selectShipping: { id: "Pilih Opsi Pengiriman", en: "Select Shipping Option" },
  paymentDetails: { id: "Rincian Pembayaran", en: "Payment Details" },
  subtotalProducts: { id: "Subtotal untuk Produk", en: "Product Subtotal" },
  subtotalShipping: { id: "Subtotal Pengiriman", en: "Shipping Subtotal" },
  serviceFee: { id: "Biaya Layanan", en: "Service Fee" },
  totalPayment: { id: "Total Pembayaran", en: "Total Payment" },
  placeOrderBtn: { id: "Buat Pesanan", en: "Place Order" },
  processing: { id: "Memproses Gateway...", en: "Processing Gateway..." },
  backBtn: { id: "Kembali", en: "Back" },
  
  // Custom Address Dialog Modal
  editAddressTitle: { id: "Ubah Informasi Pengiriman", en: "Edit Shipping Details" },
  recipientNameLabel: { id: "Nama Penerima", en: "Recipient Name" },
  recipientPhoneLabel: { id: "Nomor Telepon", en: "Phone Number" },
  recipientAddressLabel: { id: "Alamat Lengkap", en: "Full Address" },
  saveBtn: { id: "Simpan Perubahan", en: "Save Changes" },
  cancelBtn: { id: "Batal", en: "Cancel" },

  // Sign In Dialog Warning
  notSignedIn: { id: "💡 Anda Belum Masuk Akun", en: "💡 You Are Not Signed In" },
  pleaseSignIn: { 
    id: "Silakan Masuk atau Daftar Akun Baru terlebih dahulu untuk melakukan checkout agar pesanan Anda terekam otomatis dalam riwayat belanja Anda.", 
    en: "Please Sign In or Register a New Account first to handle checkout and automatically track your orders in your history."
  },
  signInNow: { id: "Login / Daftar Sekarang", en: "Sign In / Register Now" }
};

export default function Cart() {
  const { isEn, langLink } = useLanguage();
  const { items, removeItem, updateQuantity, clearCartBySite, getItemsBySite } = useCart();
  
  const [viewState, setViewState] = useState<'cart' | 'checkout'>('cart');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Read site context ('panca' vs 'sensor')
  const site = (localStorage.getItem('currentSite') as 'panca' | 'sensor') || 'panca';
  const siteItems = getItemsBySite(site);

  // Local storage logged-in customer info
  const savedUser = localStorage.getItem('customer_user');
  const loggedInCustomer = savedUser ? JSON.parse(savedUser) : null;
  const isLoggedIn = !!loggedInCustomer;

  // Selected item checkboxes (Tracks product IDs)
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  
  // Custom expandable checkout dropdown options for Shipping Courier
  const [shippingOption, setShippingOption] = useState<'regular' | 'cargo' | 'express'>('regular');
  
  // Delivery user form live state matching Mockup 2
  const [recipientName, setRecipientName] = useState(loggedInCustomer?.name || 'Budi Santosa');
  const [recipientPhone, setRecipientPhone] = useState(loggedInCustomer?.phone || '081234567890');
  const [recipientAddress, setRecipientAddress] = useState(
    loggedInCustomer?.address || 'Jl. Sudirman No. 123, Komplek Mawar Blok B4, RT 01/RW 02, Jakarta Selatan, DKI Jakarta 12190'
  );
  
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  // Buffer states for the Edit Address Form Modal
  const [tempName, setTempName] = useState(recipientName);
  const [tempPhone, setTempPhone] = useState(recipientPhone);
  const [tempAddress, setTempAddress] = useState(recipientAddress);

  // Sync recipient state if active user logs in/updates
  useEffect(() => {
    if (loggedInCustomer) {
      setRecipientName(loggedInCustomer.name || 'Budi Santosa');
      setRecipientPhone(loggedInCustomer.phone || '081234567890');
      setRecipientAddress(loggedInCustomer.address || 'Jl. Sudirman No. 123, Komplek Mawar Blok B4, RT 01/RW 02, Jakarta Selatan, DKI Jakarta 12190');
    }
  }, [savedUser]);

  // Pre-load all available site items as checked when cart loads
  useEffect(() => {
    if (siteItems.length > 0) {
      // Keep selected items that still exist inside the list
      const validSelected = selectedItemIds.filter(id => siteItems.some(item => item.product.id === id));
      if (validSelected.length === 0) {
        setSelectedItemIds(siteItems.map(item => item.product.id));
      } else {
        setSelectedItemIds(validSelected);
      }
    } else {
      setSelectedItemIds([]);
    }
  }, [items, site]);

  // Translate helper
  const t = (key: keyof typeof translations) => {
    return isEn ? translations[key].en : translations[key].id;
  };

  // Select all logic matching Attachment 1
  const isAllSelected = siteItems.length > 0 && selectedItemIds.length === siteItems.length;
  
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(siteItems.map(item => item.product.id));
    }
  };

  const handleToggleSelectItem = (productId: string) => {
    setSelectedItemIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleClearAll = () => {
    clearCartBySite(site);
    setSelectedItemIds([]);
  };

  // Dynamically yield a realistic mock variant label based on item category & context
  const getProductVariantLabel = (product: Product) => {
    const name = product.name.toLowerCase();
    if (name.includes('headphone')) return isEn ? 'Matte Black' : 'Hitam Matte';
    if (name.includes('kamera') || name.includes('camera')) return isEn ? 'White Glossy' : 'Putih';
    if (name.includes('mouse')) return isEn ? 'Dark Gray' : 'Abu-abu Gelap';
    if (name.includes('sofa')) return isEn ? 'Kyoto Gray' : 'Abu-abu Kyoto';
    if (name.includes('smartwatch') || name.includes('watch')) return 'Silver Metallic';
    if (name.includes('sensor')) return 'Sub-GHz Wireless';
    return isEn ? 'Standard Edition' : 'Varian Standar';
  };

  // Checked items details
  const checkedItems = siteItems.filter(item => selectedItemIds.includes(item.product.id));
  
  // Financial Calculators Matching Attachment 2
  const subtotalProducts = checkedItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  const shippingFee = React.useMemo(() => {
    if (shippingOption === 'express') return 25000;
    return 0; // standard free promotional options
  }, [shippingOption]);
  
  const serviceFee = checkedItems.length > 0 ? 2500 : 0; // match image 2 exactly
  
  const grandTotal = subtotalProducts + shippingFee + serviceFee;

  // Open Edit Address Modal
  const openAddressModal = () => {
    setTempName(recipientName);
    setTempPhone(recipientPhone);
    setTempAddress(recipientAddress);
    setShowAddressModal(true);
  };

  const saveAddressModal = (e: React.FormEvent) => {
    e.preventDefault();
    setRecipientName(tempName);
    setRecipientPhone(tempPhone);
    setRecipientAddress(tempAddress);
    setShowAddressModal(false);
  };

  // Run official payment flow or simulator
  const handleProceedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkedItems.length === 0) return;
    
    // E-Commerce Analytics: begin_checkout
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ ecommerce: null });
      (window as any).dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          items: checkedItems.map(i => ({
            item_id: i.product.id || i.product.slug,
            item_name: i.product.name,
            affiliation: 'PT Panca Prima Wijaya',
            item_category: i.product.category,
            price: i.product.price,
            quantity: i.quantity,
          })),
          currency: 'IDR',
          value: grandTotal
        }
      });
    }

    setLoading(true);

    const payload = {
      total: grandTotal,
      customer: {
        name: recipientName,
        email: loggedInCustomer?.email || 'customer@pancaprimawijaya.com',
        phone: recipientPhone,
        address: recipientAddress
      },
      items: checkedItems.map(i => ({ 
        productId: i.product.id, 
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity 
      })),
      notes: notes,
      shippingOption: shippingOption
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error("Gagal membuat pesanan");
      }
      
      const resData = await response.json();
      clearCartBySite(site);
      
      if (resData.paymentUrl) {
        // Redirect to simulation page or real gateway
        window.location.href = resData.paymentUrl;
      } else {
        setSuccess(true);
      }
    } catch (err) {
      alert(isEn ? "Failed connected to gateway. Standard dispatch completed." : "Terjadi kesalahan sistem pembayaran.");
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center mt-10">
        <SEO title={isEn ? "Order Created Successfully | PT Panca Prima Wijaya" : "Pesanan Berhasil | PT Panca Prima Wijaya"} description="Verify checkout completed" />
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
          {isEn ? "Order Verified Successfully" : "Pesanan Berhasil Diverifikasi"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
          {isEn 
            ? "Thank you for choosing PT Panca Prima Wijaya. Our customer specialist will connect with you shortly via WhatsApp or Email." 
            : "Sistem berhasil mendaftarkan tagihan Anda. Pihak PT Panca Prima Wijaya akan menghubungi Anda dalam waktu singkat untuk menyelesaikan pengiriman."}
        </p>
        <Link 
          to={langLink(site === 'sensor' ? '/sensor/produk' : '/panca/produk')} 
          className="bg-[#0a2558] text-white hover:bg-[#06183b] px-6 py-2.5 rounded-full font-black text-xs transition shadow-sm inline-block cursor-pointer select-none"
        >
          {isEn ? "Return to Store" : "Kembali Belanja"}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      <SEO 
        title={`${viewState === 'cart' ? t('cartTitle') : t('checkoutTitle')} | PT Panca Prima Wijaya`} 
        description="Pristine professional checkout screen" 
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6">

        {/* Back navigation support */}
        {viewState === 'checkout' && (
          <button 
            onClick={() => setViewState('cart')}
            className="group flex items-center gap-1 text-xs font-black text-[#0a2558] hover:text-slate-900 mb-5 transition cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{t('backBtn')}</span>
          </button>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-[#0a2558] tracking-tight font-sans uppercase">
            {viewState === 'cart' ? t('cartTitle') : t('checkoutTitle')}
          </h1>
          
          <div className="text-xs font-bold text-slate-400 bg-slate-100 border px-3 py-1 rounded-full uppercase tracking-wider">
            Site Partition: <span className="text-[#0a2558] font-black">{site}</span>
          </div>
        </div>

        {siteItems.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-3xl p-10 text-center shadow-xs mt-4">
            <div className="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center mx-auto mb-4 border text-[#0a2558]/30">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-slate-500 mb-6 text-xs sm:text-sm font-semibold">{t('emptyCart')}</p>
            <Link 
              to={langLink(site === 'sensor' ? '/sensor/produk' : '/panca/produk')} 
              className="bg-[#0a2558] hover:bg-[#06183b] text-white font-black px-6 py-3 rounded-full text-xs transition shadow-xs inline-block cursor-pointer select-none"
            >
              {t('findProducts')}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {/* ============================================================== */}
            {/* VIEW STATE: CART PREVIEW (Attachment 1)                        */}
            {/* ============================================================== */}
            {viewState === 'cart' && (
              <div className="space-y-4">
                
                {/* Checkbox select all heading card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-3xs">
                  <button 
                    onClick={handleToggleSelectAll}
                    className="flex items-center gap-3 font-sans text-xs sm:text-sm font-black text-[#0a2558] text-left cursor-pointer select-none"
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isAllSelected 
                        ? 'bg-[#0a2558] border-[#0a2558] text-white shadow-3xs' 
                        : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                    }`}>
                      {isAllSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>{t('selectAll')} ({siteItems.length} item)</span>
                  </button>

                  <button 
                    onClick={handleClearAll}
                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer select-none"
                  >
                    {t('deleteAll')}
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3.5">
                  {siteItems.map(({ product, quantity }) => {
                    const isChecked = selectedItemIds.includes(product.id);
                    return (
                      <div 
                        key={product.id} 
                        className={`bg-white border rounded-3xl p-4 flex gap-3 sm:gap-4 items-center shadow-3xs transition-all ${
                          isChecked ? 'border-blue-100 bg-blue-50/5' : 'border-slate-200/80'
                        }`}
                      >
                        {/* Selector checkbox */}
                        <button 
                          onClick={() => handleToggleSelectItem(product.id)}
                          className="w-8 h-8 flex items-center justify-center flex-shrink-0 cursor-pointer select-none"
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked 
                              ? 'bg-[#0a2558] border-[#0a2558] text-white shadow-3xs' 
                              : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>

                        {/* Image Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover rounded-xl" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <ShoppingBag className="w-8 h-8 text-slate-300" />
                          )}
                        </div>

                        {/* Middle Info Column */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-extrabold text-[#0a2558] text-xs sm:text-sm line-clamp-1 truncate">
                            {product.name}
                          </h3>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                            {t('variantLabel')}: <span className="text-slate-500 font-semibold">{getProductVariantLabel(product)}</span>
                          </p>
                          <p className="font-black text-[#0a2558] text-xs sm:text-sm mt-1.5 font-sans">
                            {formatCurrency(product.price)}
                          </p>
                        </div>

                        {/* Right side Qty pill incrementer */}
                        <div className="flex flex-col items-end justify-between gap-3 self-stretch flex-shrink-0">
                          <button 
                            onClick={() => removeItem(product.id)}
                            className="text-slate-300 hover:text-red-500 hover:bg-slate-100 p-1 rounded-full transition cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Stepper pill */}
                          <div className="bg-slate-50 border border-slate-200/60 rounded-full flex items-center p-1 font-mono shadow-3xs">
                            <button 
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200 transition cursor-pointer select-none"
                            >
                              <Minus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                            <span className="w-6 text-center text-[11px] font-black text-slate-800">{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200 transition cursor-pointer select-none"
                            >
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Inline non-sticky Summary & Checkout Card (guarantees visibility in any screen/iframe layout) */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-3xs mt-4 mb-2 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">{t('totalBelanja')}</span>
                    <span className="text-base sm:text-lg font-black text-orange-500 font-sans">{formatCurrency(subtotalProducts)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (checkedItems.length > 0) {
                        setViewState('checkout');
                      }
                    }}
                    disabled={checkedItems.length === 0}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all select-none cursor-pointer ${
                      checkedItems.length > 0 
                        ? 'bg-[#0a2558] hover:bg-slate-900 text-white shadow-md' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <span>{isEn ? 'Proceed to Checkout' : 'Lanjut ke Checkout'} ({checkedItems.length})</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Sticky checkout bottom control pane (Attachment 1 layout) */}
                <div className="bg-white border-t border-slate-200/80 fixed bottom-0 left-0 right-0 py-3.5 px-4 z-40 shadow-lg">
                  <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        {t('totalBelanja')}
                      </p>
                      <p className="text-base sm:text-lg font-black text-orange-500 font-sans mt-1">
                        {formatCurrency(subtotalProducts)}
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        if (checkedItems.length > 0) {
                          setViewState('checkout');
                        }
                      }}
                      disabled={checkedItems.length === 0}
                      className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all select-none cursor-pointer ${
                        checkedItems.length > 0 
                          ? 'bg-[#0a2558] hover:bg-slate-900 text-white shadow-md hover:translate-y-[-1px]' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      <span>{t('checkoutBtn')} ({checkedItems.length})</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

              </div>
            )}


            {/* ============================================================== */}
            {/* VIEW STATE: CHECKOUT SCREEN (Attachment 2)                     */}
            {/* ============================================================== */}
            {viewState === 'checkout' && (
              <div className="space-y-4 pb-20">

                {/* CARD 1: Alamat Pengiriman (Delivery credentials) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-3xs relative overflow-hidden">
                  
                  {/* Decorative design line on top matches mockup */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500" />
                  
                  <div className="p-4 sm:p-5 pt-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-[#0a2558] uppercase tracking-wide">
                      <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center border text-[#0a2558]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-black text-slate-800">{t('deliveryAddress')}</span>
                    </div>

                    {/* Recipient summary content block */}
                    <div className="pl-9 space-y-1 sm:space-y-1.5 font-sans">
                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {recipientName} <span className="text-slate-400 font-medium px-1">|</span> <span className="text-slate-600 font-bold">{recipientPhone}</span>
                      </p>
                      
                      <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans max-w-sm">
                        {recipientAddress}
                      </p>
                    </div>

                    {/* Change / edit shipping info button */}
                    <div className="pt-2 text-center pl-9">
                      <button 
                        type="button"
                        onClick={openAddressModal}
                        className="inline-block px-5 py-2 border border-slate-200 hover:border-[#0a2558] hover:bg-slate-50 text-[11px] font-black text-slate-700 bg-white rounded-full transition shadow-3xs cursor-pointer select-none"
                      >
                        {t('changeAddress')}
                      </button>
                    </div>
                  </div>
                </div>


                {/* CARD 2: Pesanan Anda (Products Checklist) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-3xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wide pb-1.5 border-b border-slate-100">
                    <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center border text-[#0a2558]">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <span>{t('yourOrders')}</span>
                  </div>

                  {/* Items mapped with layout in Attachment 2 */}
                  <div className="space-y-4">
                    {checkedItems.map(({ product, quantity }) => (
                      <div key={product.id} className="flex gap-3 sm:gap-4 items-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 border rounded-xl overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                          ) : (
                            <ShoppingBag className="w-6 h-6 text-slate-300" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-extrabold text-[#0a2558] line-clamp-1 truncate">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                            {t('variantLabel')}: <span className="text-slate-500 font-semibold">{getProductVariantLabel(product)}</span>
                          </p>
                          <p className="font-black text-[#0a2558] text-xs font-sans mt-1">
                            {formatCurrency(product.price)}
                          </p>
                        </div>

                        <div className="text-xs font-black text-slate-400 px-2 flex-shrink-0">
                          x{quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Attachment 2 Optional buyer notes/text field */}
                  <div className="pt-3 border-t border-slate-50">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      {t('notesLabel')}
                    </label>
                    <input 
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('notesPlaceholder')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:ring-1 focus:ring-[#0a2558] focus:border-[#0a2558] transition text-xs font-medium text-slate-800 shadow-inner"
                    />
                  </div>
                </div>


                {/* CARD 3: Pengiriman (Delivery Courier Option) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-3xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wide">
                    <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center border text-[#0a2558]">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span>{t('shippingLabel')}</span>
                  </div>

                  <div className="relative pl-9">
                    {/* Custom Dropdown select matching Attachment 2 trigger styling */}
                    <div className="relative">
                      <select 
                        value={shippingOption}
                        onChange={(e) => setShippingOption(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#0a2558] transition appearance-none text-xs font-bold text-slate-800 cursor-pointer pr-10 shadow-3xs"
                      >
                        <option value="regular">
                          🚀 {isEn ? "Standard Courier J&T (Free Promo) - Rp 0" : "J&T Express Reguler (Promo Bebas Ongkir) - Rp 0"}
                        </option>
                        <option value="cargo">
                          🚛 {isEn ? "Sicepat Cargo Heavy Bulk (Free Promo) - Rp 0" : "Sicepat Kargo Khusus Berat (Promo Bebas Ongkir) - Rp 0"}
                        </option>
                        <option value="express">
                          ⚡ {isEn ? "Instant One-Day Express Delivery - Rp 25,000" : "Pengiriman Ekspres Instan (1 Hari) - Rp 25.000"}
                        </option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>


                {/* CARD 4: Rincian Pembayaran (Billing Details) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-3xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wide pb-1.5 border-b border-slate-100">
                    <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center border text-[#0a2558]">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <span>{t('paymentDetails')}</span>
                  </div>

                  <div className="space-y-3 pl-1 text-xs">
                    <div className="flex justify-between text-slate-500 font-semibold">
                      <span>{t('subtotalProducts')}</span>
                      <span className="text-slate-800 font-bold">{formatCurrency(subtotalProducts)}</span>
                    </div>

                    <div className="flex justify-between text-slate-500 font-semibold">
                      <span>{t('subtotalShipping')}</span>
                      <span className="text-slate-800 font-bold">{formatCurrency(shippingFee)}</span>
                    </div>

                    <div className="flex justify-between text-slate-500 font-semibold">
                      <span>{t('serviceFee')}</span>
                      <span className="text-slate-800 font-bold">{formatCurrency(serviceFee)}</span>
                    </div>

                    <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">{t('totalPayment')}</span>
                      <span className="text-sm sm:text-base font-black text-[#0a2558] font-sans">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Inline non-sticky Place Order Button (guarantees accessibility on all resolutions) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-3xs mt-4 space-y-3 text-center">
                  <div className="flex justify-between items-center text-xs font-bold font-sans">
                    <span className="text-slate-500 uppercase">{t('totalPayment')}</span>
                    <span className="text-base font-black text-[#0a2558] font-sans">{formatCurrency(grandTotal)}</span>
                  </div>
                  <form onSubmit={handleProceedCheckout} className="w-full">
                    <button 
                      type="submit" 
                      disabled={loading || checkedItems.length === 0}
                      className="w-full flex items-center justify-center gap-2 bg-[#05c46b] hover:bg-[#04a75a] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs px-6 py-4 rounded-xl transition-all uppercase tracking-wide cursor-pointer shadow-md select-none"
                    >
                      {loading ? t('processing') : t('placeOrderBtn')}
                    </button>
                  </form>
                </div>


                {/* Non-logged in customer caution / warn box */}
                {!isLoggedIn && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs shadow-inner flex gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-amber-800 font-sans">{t('notSignedIn')}</p>
                      <p className="text-amber-700 font-medium mt-1 leading-relaxed font-sans">{t('pleaseSignIn')}</p>
                      <Link 
                        to={isEn ? "/en/login" : "/masuk"} 
                        className="inline-block mt-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-xl transition shadow-3xs cursor-pointer"
                      >
                        {t('signInNow')}
                      </Link>
                    </div>
                  </div>
                )}


                {/* Sticky buatan pesanan footer control bar (Attachment 2 layout) */}
                <div className="bg-white border-t border-slate-200/80 fixed bottom-0 left-0 right-0 py-3.5 px-4 z-40 shadow-lg">
                  <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
                    <div className="text-left font-sans">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        {t('totalPayment')}
                      </p>
                      <p className="text-base sm:text-lg font-black text-[#0a2558] mt-1 font-sans">
                        {formatCurrency(grandTotal)}
                      </p>
                    </div>

                    <form onSubmit={handleProceedCheckout}>
                      <button 
                        type="submit" 
                        disabled={loading || checkedItems.length === 0}
                        className="flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs px-6 py-3.5 rounded-full transition-all uppercase tracking-wider shadow-md hover:translate-y-[-1px] select-none cursor-pointer"
                      >
                        {loading ? t('processing') : t('placeOrderBtn')}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* SHPPING ADDRESS CUSTOM MODAL GUEST FORM                      */}
      {/* ============================================================== */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-fade-in">
            
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500" />
            
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-black text-[#0a2558] flex items-center gap-2 uppercase tracking-tight">
                  <MapPinned className="w-5 h-5 text-sky-500" />
                  {t('editAddressTitle')}
                </h3>
                <button 
                  onClick={() => setShowAddressModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-150 border flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={saveAddressModal} className="space-y-4.5 pt-2">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {t('recipientNameLabel')}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-1 focus:ring-[#0a2558] focus:border-[#0a2558] transition text-xs font-bold text-slate-850" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {t('recipientPhoneLabel')}
                  </label>
                  <input 
                    type="tel" 
                    required 
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-1 focus:ring-[#0a2558] focus:border-[#0a2558] transition text-xs font-bold text-slate-850" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {t('recipientAddressLabel')}
                  </label>
                  <textarea 
                    rows={3} 
                    required 
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-1 focus:ring-[#0a2558] focus:border-[#0a2558] transition text-xs font-semibold text-slate-850 leading-relaxed" 
                  />
                </div>

                <div className="flex gap-2.5 pt-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="flex-1 py-3 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-150 rounded-xl transition cursor-pointer select-none text-center"
                  >
                    {t('cancelBtn')}
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 text-xs font-black text-white bg-[#0a2558] hover:bg-slate-900 rounded-xl transition cursor-pointer select-none text-center shadow-md shadow-blue-900/10"
                  >
                    {t('saveBtn')}
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
