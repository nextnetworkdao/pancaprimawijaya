import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Splash() {
  const { isEn, t, langLink, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-blue-900/10" />
      <div className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl -top-1/2 -left-1/2 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-[#ee4d2d]/10 rounded-full blur-3xl -bottom-1/2 -right-1/2 pointer-events-none" />

      {/* Floating Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleLanguage} 
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
          title={isEn ? "Ubah ke Bahasa Indonesia" : "Switch to English"}
        >
          <Globe className="h-4 w-4 text-blue-400" />
          <span>{isEn ? 'English' : 'Bahasa'}</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-8 md:mb-16 mt-6 md:mt-0">
          <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-14 md:h-20 w-auto mx-auto mb-6 md:mb-8 bg-white p-2 md:p-3 rounded-lg shadow-2xl" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight">
            {t('title', 'splash')}
          </h1>
          <p className="text-base md:text-lg text-gray-400 font-light text-center max-w-xl mx-auto px-4 leading-relaxed">
            {t('description', 'splash')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto px-4 md:px-0">
          <Link to={langLink('/sensor')} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all overflow-hidden backdrop-blur-sm shadow-2xl hover:-translate-y-1 block text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 text-blue-400 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Activity className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{t('sensorTitle', 'splash')}</h2>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {t('sensorDesc', 'splash')}
              </p>
            </div>
          </Link>

          <Link to={langLink('/panca')} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ee4d2d]/50 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all overflow-hidden backdrop-blur-sm shadow-2xl hover:-translate-y-1 block text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ee4d2d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#ee4d2d]/20 text-[#ee4d2d] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{t('pancaTitle', 'splash')}</h2>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {t('pancaDesc', 'splash')}
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
