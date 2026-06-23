import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Mail, Lock, AlertCircle, Loader2, CheckCircle
} from 'lucide-react';

const dict = {
  id: {
    titleCustomer: "Masuk Akun Pembeli",
    descCustomer: "Silakan masuk untuk mengakses riwayat pemesanan & melacak status transaksi Anda.",
    emailLabel: "Alamat Email",
    emailPlaceholder: "nama@perusahaan.com",
    passwordLabel: "Kata Sandi",
    btnSubmitLogin: "Masuk Sekarang",
    noAccount: "Belum memiliki akun pembeli?",
    registerPrompt: "Daftar Akun Baru di Sini",
    successLogin: "Berhasil masuk! Selamat datang kembali.",
    errorEmpty: "Mohon lengkapi semua isian formulir.",
    errorAuth: "Alamat email atau kata sandi tidak cocok.",
    footerNote: "Sistem Terenkripsi SSL PT Panca Prima Wijaya.",
    backToHome: "← Kembali ke Beranda"
  },
  en: {
    titleCustomer: "Buyer Account Login",
    descCustomer: "Sign in to access your order history and track your transaction status.",
    emailLabel: "Email Address",
    emailPlaceholder: "name@company.com",
    passwordLabel: "Password",
    btnSubmitLogin: "Sign In Now",
    noAccount: "Don't have a buyer account?",
    registerPrompt: "Register a New Account Here",
    successLogin: "Successfully signed in! Welcome back.",
    errorEmpty: "Please fill in all mandatory fields.",
    errorAuth: "The email address or password did not match.",
    footerNote: "PT Panca Prima Wijaya SSL Encrypted System.",
    backToHome: "← Back to Home"
  }
};

export default function Login() {
  const navigate = useNavigate();
  const { isEn } = useLanguage();
  const t = isEn ? dict.en : dict.id;
  
  const site = (localStorage.getItem('currentSite') as 'panca' | 'sensor') || 'panca';
  const isSensor = site === 'sensor';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('customer_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          navigate(isEn ? '/en/user' : '/user', { replace: true });
        }
      } catch (e) {
        localStorage.removeItem('customer_user');
      }
    }
  }, [navigate, isEn]);

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError(t.errorEmpty);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t.errorAuth);
      }
      
      localStorage.setItem('customer_user', JSON.stringify(data.customer));
      setMessage(t.successLogin);
      setTimeout(() => {
        navigate(isEn ? '/en/user' : '/user');
      }, 800);
    } catch (err: any) {
      setError(err.message || t.errorAuth);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO 
        title={`${t.titleCustomer} | PT Panca Prima Wijaya`} 
        description={t.descCustomer} 
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-2xl font-black tracking-tight text-[#0a2558] mb-2 font-sans">
          {t.titleCustomer}
        </h2>
        <p className="text-xs text-gray-500 font-semibold px-6 leading-relaxed mb-6 font-sans">
          {t.descCustomer}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow-xl rounded-3xl border border-slate-100 sm:px-10 py-8 px-6">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleCustomerLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1 font-sans">
                {t.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="pl-10 text-xs w-full px-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1 font-sans">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 text-xs w-full px-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-xs font-extrabold text-white transition-all duration-200 shadow-md disabled:opacity-75 cursor-pointer ${
                  isSensor ? 'bg-orange-600 hover:bg-orange-700' : 'bg-[#0a2558] hover:bg-[#06183b]'
                }`}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {t.btnSubmitLogin}
              </button>
            </div>
          </form>

          {/* Registration Link Prompt */}
          <div className="mt-6 text-center text-xs font-medium text-gray-500 font-sans">
            <span>{t.noAccount} </span>
            <Link 
              to={isEn ? '/en/register' : '/daftar'} 
              className="text-blue-600 font-extrabold hover:underline"
            >
              {t.registerPrompt}
            </Link>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-slate-100 text-[10px] text-gray-400 font-bold tracking-tight font-sans">
            {t.footerNote}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            to={isEn ? '/en/panca' : '/panca'} 
            className="text-xs font-bold text-gray-500 hover:text-gray-800 transition font-sans"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
