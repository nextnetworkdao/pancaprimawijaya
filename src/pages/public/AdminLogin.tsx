import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Lock, User, AlertCircle, ShieldAlert } from 'lucide-react';

const dict = {
  id: {
    titleAdmin: "Otorisasi Administrator",
    descAdmin: "Gunakan kredensial internal Anda untuk mengelola produk, sistem, dan pesanan.",
    adminUsernameLabel: "Nama Pengguna Admin (Username)",
    adminPasswordLabel: "Kata Sandi (Password)",
    btnSubmitAdmin: "Otorisasi & Masuk Sistem",
    errorEmpty: "Mohon lengkapi semua isian formulir.",
    errorAdminInvalid: "Kombinasi username atau password salah.",
    warningAdmin: "Area Terbatas. Hanya personel internal terdaftar yang memiliki akses konsol.",
    unauthorizedText: "Upaya akses yang tidak sah akan dicatat oleh sistem keamanan.",
    footerNote: "Sistem Transaksi Terenkripsi SSL PT Panca Prima Wijaya.",
    backToHome: "← Kembali ke Beranda"
  },
  en: {
    titleAdmin: "Administrator Authorization",
    descAdmin: "Use your internal system credentials to manage products, settings, and orders.",
    adminUsernameLabel: "Admin Username",
    adminPasswordLabel: "Admin Password",
    btnSubmitAdmin: "Authorize & Access Console",
    errorEmpty: "Please fill in all the required fields.",
    errorAdminInvalid: "Invalid username or password combination.",
    warningAdmin: "Restricted Area. Authorized internal operations staff only.",
    unauthorizedText: "Unauthorized access attempts are automatically logged and analyzed.",
    footerNote: "PT Panca Prima Wijaya SSL Encrypted Transaction System.",
    backToHome: "← Back to Home"
  }
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const { isEn } = useLanguage();
  const t = isEn ? dict.en : dict.id;

  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!adminUsername || !adminPassword) {
      setError(t.errorEmpty);
      return;
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('admin_token', data.token || 'temporary_token_123');
        navigate('/admin');
      } else {
        setError(data.error || t.errorAdminInvalid);
      }
    } catch (err) {
      console.error(err);
      setError(t.errorAdminInvalid);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO 
        title={`${t.titleAdmin} | Console`} 
        description={t.descAdmin} 
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center mx-auto mb-4 text-red-500">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white border-b-2 border-red-500 pb-2 inline-block">
          {t.titleAdmin}
        </h2>
        <p className="text-center text-xs text-gray-400 font-semibold px-6 mt-3 mb-6 leading-relaxed">
          {t.descAdmin}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-950 shadow-2xl rounded-3xl border border-red-500/10 sm:px-10 py-8 px-6">
          
          {error && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Security Restricted Warning Banner */}
          <div className="bg-slate-900 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-red-400">{t.warningAdmin}</p>
              <p className="text-slate-400 text-[10px] font-medium leading-relaxed mt-0.5">
                {t.unauthorizedText}
              </p>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                {t.adminUsernameLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="pl-10 text-xs w-full px-4 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-bold transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                {t.adminPasswordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 text-xs w-full px-4 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-bold transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 transition duration-200 focus:outline-none cursor-pointer"
              >
                {t.btnSubmitAdmin}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-slate-800 text-[10px] text-gray-500 font-bold tracking-tight">
            {t.footerNote}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            to={isEn ? '/en/panca' : '/panca'} 
            className="text-xs font-bold text-gray-400 hover:text-white transition"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
