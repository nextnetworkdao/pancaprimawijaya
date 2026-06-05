import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Splash() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/10" />
      <div className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl -top-1/2 -left-1/2 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-[#ee4d2d]/10 rounded-full blur-3xl -bottom-1/2 -right-1/2 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-8 md:mb-16 mt-6 md:mt-0">
          <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya Logo" className="h-14 md:h-20 w-auto mx-auto mb-6 md:mb-8 bg-white p-2 md:p-3 rounded-lg shadow-2xl" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight">Pilih Layanan Kami</h1>
          <p className="text-base md:text-lg text-gray-400 font-light text-center max-w-xl mx-auto px-4">
            Silakan pilih kategori produk atau layanan yang sesuai dengan kebutuhan industri Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto px-4 md:px-0">
          <Link to="/sensor" className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all overflow-hidden backdrop-blur-sm shadow-2xl hover:-translate-y-1 block text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 text-blue-400 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Activity className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Produk Sensor Gempa</h2>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                Teknologi mutakhir untuk deteksi gempa, early warning system, dan otomasi pengamanan industri bangunan.
              </p>
            </div>
          </Link>

          <Link to="/panca" className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ee4d2d]/50 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all overflow-hidden backdrop-blur-sm shadow-2xl hover:-translate-y-1 block text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ee4d2d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#ee4d2d]/20 text-[#ee4d2d] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">PT Panca Prima Wijaya</h2>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                Spesialis perlindungan komoditas pasca-panen, fumigasi profesional, fogging, sanitasi dan higiene industri.
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
