import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';
import { 
  User, Mail, Lock, AlertCircle, Loader2, CheckCircle, Phone
} from 'lucide-react';

const dict = {
  id: {
    titleCustomer: "Daftar Akun Pembeli",
    descCustomer: "Mulai buat profil pembeli korporat/personal Anda agar penawaran estimasi terekam dengan aman.",
    nameLabel: "Nama Lengkap / Nama Perusahaan",
    namePlaceholder: "Contoh: PT. Makmur Jaya / Budi Prasetyo",
    emailLabel: "Alamat Email",
    emailPlaceholder: "nama@perusahaan.com",
    passwordLabel: "Kata Sandi",
    passwordPlaceholder: "Format aman min. 6 karakter",
    phoneLabel: "Nomor HP / WhatsApp",
    phonePlaceholder: "Contoh: 8123456789 (Tanpa angka 0 di depan)",
    btnSubmitRegister: "Daftar Akun Sekarang",
    hasAccount: "Sudah memiliki akun pembeli?",
    loginPrompt: "Masuk Sekarang ke Portal",
    successReg: "Pendaftaran sukses! Silakan masuk dengan akun baru Anda.",
    errorEmpty: "Mohon lengkapi semua isian formulir.",
    footerNote: "Sistem Terenkripsi SSL PT Panca Prima Wijaya.",
    backToHome: "← Kembali ke Beranda"
  },
  en: {
    titleCustomer: "Register Buyer Account",
    descCustomer: "Register your corporate or individual buyer profile to secure your order estimations.",
    nameLabel: "Full Name / Company Name",
    namePlaceholder: "e.g., PT. Makmur Jaya / John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "name@company.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Secure password min. 6 characters",
    phoneLabel: "Phone Number / WhatsApp",
    phonePlaceholder: "e.g., 8123456789 (Without leading zero)",
    btnSubmitRegister: "Register Account Now",
    hasAccount: "Already have a buyer account?",
    loginPrompt: "Sign In to Portal",
    successReg: "Registration successful! Please sign in with your email.",
    errorEmpty: "Please complete all registration fields.",
    footerNote: "PT Panca Prima Wijaya SSL Encrypted System.",
    backToHome: "← Back to Home"
  }
};

const countries = [
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Brunei', code: '+673', flag: '🇧🇳' },
  { name: 'Cambodia', code: '+855', flag: '🇰🇭' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'Hong Kong', code: '+852', flag: '🇭🇰' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Iran', code: '+98', flag: '🇮🇷' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name: 'Kazakhstan', code: '+7', flag: '🇰🇿' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Laos', code: '+856', flag: '🇱🇦' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Macau', code: '+853', flag: '🇲🇴' },
  { name: 'Maldives', code: '+960', flag: '🇲🇻' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Myanmar', code: '+95', flag: '🇲🇲' },
  { name: 'Nepal', code: '+977', flag: '🇳🇵' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Taiwan', code: '+886', flag: '🇹🇼' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Timor-Leste', code: '+670', flag: '🇹🇱' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Uzbekistan', code: '+998', flag: '🇺🇿' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
  { name: 'Yemen', code: '+967', flag: '🇾🇪' }
];

export default function Register() {
  const navigate = useNavigate();
  const { isEn } = useLanguage();
  const t = isEn ? dict.en : dict.id;

  const site = (localStorage.getItem('currentSite') as 'panca' | 'sensor') || 'panca';
  const isSensor = site === 'sensor';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [phoneNum, setPhoneNum] = useState('');
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCustomerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!name.trim() || !email.trim() || !password.trim() || !phoneNum.trim()) {
      setError(t.errorEmpty);
      setLoading(false);
      return;
    }

    try {
      const phone = countryCode + phoneNum.trim().replace(/^0+/, ''); // strip leading zero if user accidentally adds it
      const response = await fetch('/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      localStorage.setItem('customer_user', JSON.stringify(data.customer));
      setMessage(t.successReg);
      // Wait 1s then redirect to user page
      setTimeout(() => {
        navigate(isEn ? '/en/user' : '/user');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Error occurred during registration');
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
        <p className="text-xs text-gray-500 font-semibold px-6 leading-relaxed mb-6">
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

          <form onSubmit={handleCustomerRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                {t.nameLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="pl-10 text-xs w-full px-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">
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
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">
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
                  placeholder={t.passwordPlaceholder}
                  className="pl-10 text-xs w-full px-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                {t.phoneLabel}
              </label>
              <div className="flex gap-2">
                <div className="w-[140px] flex-shrink-0">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="text-xs w-full px-2 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold bg-white cursor-pointer transition-all border-gray-200"
                  >
                    {countries.map((c) => (
                      <option key={c.name + c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder={t.phonePlaceholder}
                    className="pl-10 text-xs w-full px-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-[#0a2558] focus:border-[#0a2558] outline-none font-semibold transition-all placeholder:text-gray-300 border-gray-200"
                  />
                </div>
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
                {t.btnSubmitRegister}
              </button>
            </div>
          </form>

          {/* Login Link Prompt */}
          <div className="mt-6 text-center text-xs font-medium text-gray-500">
            <span>{t.hasAccount} </span>
            <Link 
              to={isEn ? '/en/login' : '/masuk'} 
              className="text-blue-600 font-extrabold hover:underline"
            >
              {t.loginPrompt}
            </Link>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-slate-100 text-[10px] text-gray-400 font-bold tracking-tight">
            {t.footerNote}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            to={isEn ? '/en/panca' : '/panca'} 
            className="text-xs font-bold text-gray-500 hover:text-gray-800 transition"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
