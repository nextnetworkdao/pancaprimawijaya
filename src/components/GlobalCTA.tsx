import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GlobalCTAProps {
  title?: string;
  description?: string;
}

export function GlobalCTA({
  title = "Konsultasi Layanan Kami",
  description = "Butuh jasa fumigasi beras, pembasmi kutu gudang, atau sanitasi gudang pangan profesional? PT. Panca Prima Wijaya siap membantu kebutuhan industri maupun instansi pemerintah."
}: GlobalCTAProps) {
  return (
    <section id="konsultasi" className="py-12 sm:py-20 bg-[#16a34a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img 
          src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" 
          alt="PT Panca Prima Wijaya" 
          className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" 
          fetchPriority="high" 
          loading="lazy" 
        />
        
        <h2 className="text-2xl sm:text-4xl font-black mb-4 uppercase tracking-tight">{title}</h2>
        
        <div className="max-w-2xl mx-auto border-t border-b border-white/20 py-6 my-6">
           <p className="text-sm sm:text-base text-green-50 font-medium leading-relaxed">
            {description}
          </p>
        </div>
        
        <p className="text-xs text-green-100 mb-8 max-w-xl mx-auto">
          Hubungi tim kami sekarang untuk konsultasi gratis, survey lokasi, dan solusi terintegrasi.
        </p>
        
        <a 
          href="https://wa.me/6285313200188" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center gap-3 bg-white text-[#16a34a] px-6 sm:px-10 py-3 sm:py-4 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto"
        >
          HUBUNGI KAMI SEKARANG <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </a>
      </div>
    </section>
  );
}
