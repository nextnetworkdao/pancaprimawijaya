import React from 'react';
import { ShieldCheck, Bug, Box, Factory, Wind, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="Jasa Fumigasi & Sanitasi Gudang Pangan | PT. Panca Prima Wijaya"
        description="PT. Panca Prima Wijaya menyediakan one-stop solution untuk konsultasi, fumigasi, sanitasi gudang pangan, dan pengendalian hama komoditas pertanian."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#ee4d2d]/20 text-[#ffbdae] font-bold text-xs rounded-full mb-6 border border-[#ee4d2d]/30">
            <span className="w-2 h-2 rounded-full bg-[#ee4d2d]"></span>
            ONE-STOP SOLUTION FUMIGASI
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight uppercase">
            PT. PANCA PRIMA WIJAYA<br/>
            <span className="text-[#ffbdae]">Jasa Fumigasi Beras & Sanitasi.</span>
          </h1>
          
          <div className="pl-4 border-l-4 border-[#ee4d2d] mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "PT. Panca Prima Wijaya adalah perusahaan Indonesia yang menyediakan one-stop solution untuk konsultasi, fumigasi, sanitasi gudang pangan, dan pengendalian hama komoditas pertanian secara profesional dan terintegrasi."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:w-auto bg-[#ee4d2d] hover:bg-[#d73f22] text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center"
            >
              KONSULTASI GRATIS
            </button>
            <Link to="/panca/produk" className="w-full sm:w-auto bg-transparent border-2 border-white/50 hover:border-white text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center">
              LIHAT PRODUK
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">Layanan Hama Gudang Profesional</p>
            <div className="flex flex-wrap gap-4 sm:gap-8 opacity-70 grayscale">
              <span className="font-black text-xl text-white">FUMIGASI</span>
              <span className="font-black text-xl text-white">SANITASI</span>
              <span className="font-black text-xl text-white">FOGGING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            Kami berpengalaman menangani berbagai permasalahan hama gudang pangan seperti kutu beras, kutu gabah, kutu katul, ulat tembakau, kumbang biji kopi, hingga serangga dan hama pada jagung, tepung, kacang tanah, kacang hijau, pakan ternak, dan berbagai jenis biji-bijian maupun sereal lainnya.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            Dengan metode fumigasi fosfin dan kombinasi sanitasi gudang yang tepat, kami membantu menjaga kualitas komoditas tetap aman, higienis, bebas hama, dan memenuhi standar penyimpanan pangan.
          </p>
        </div>
      </section>

      {/* Solutions Cards Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">LAYANAN UTAMA</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Solusi Efektif Pengendalian Hama</h2>
          </div>

          <div className="grid gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-[#ee4d2d]/10 text-[#ee4d2d] rounded-lg flex items-center justify-center mb-6">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">Jasa Fumigasi Beras dan Gudang Pangan</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Solusi efektif membasmi kutu beras dan hama gudang. Kami menggunakan metode fumigasi fosfin yang efektif untuk membasmi hama hingga ke telur dan larva sehingga hasil pengendalian lebih maksimal dan tahan lama.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">TARGET FUMIGASI</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Gudang beras & jagung</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Gudang pakan ternak</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Gudang biji kopi & tepung</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Kontainer & kapal</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0a2558] text-white p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Wind className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sanitasi Gudang Pangan Profesional</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  Menjaga gudang tetap bersih, aman, dan bebas hama. Selain fumigasi, sanitasi gudang menjadi langkah penting untuk mencegah infestasi ulang secara menyeluruh.
                </p>
                
                <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <p className="text-xs font-bold text-white mb-3 border-b border-white/20 pb-2">LAYANAN SANITASI</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-blue-50">
                    <div className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Pembersihan area gudang</div>
                    <div className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Thermal & Cold fogging</div>
                    <div className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Pencegahan kontaminasi</div>
                    <div className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div> Monitoring dan evaluasi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-[#ee4d2d]/10 text-[#ee4d2d] rounded-lg flex items-center justify-center mb-6">
                <Bug className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">Fumigasi Fosfin untuk Berbagai Kebutuhan</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Tidak hanya gudang pangan, layanan kami membantu melindungi aset penting dari serangan hama yang dapat merusak material maupun dokumen berharga.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">APLIKASI LAINNYA</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Arsip dokumen & Perpustakaan</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Gedung pemerintahan</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Armada bus & Kereta api</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#ee4d2d]" /> Fasilitas penyimpanan industri</div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#ee4d2d] transition-all hover:shadow-md">
               <h3 className="text-xl font-bold text-[#0a2558] mb-3">Peralatan Laboratorium dan Pestisida</h3>
               <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                 Selain layanan fumigasi dan sanitasi, kami siap membantu industri pangan, pertanian, dan logistik dalam menjaga kualitas produk selama proses penyimpanan maupun distribusi dengan solusi lengkap.
               </p>
               
               <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">KAMI MENYEDIAKAN</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>Peralatan lab industri gandum</li>
                     <li>Alat pengujian benih</li>
                     <li>Peralatan industri pakan ternak</li>
                   </ul>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">PRODUK PENGENDALIAN</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>Insektisida dan pestisida</li>
                     <li>Sistem monitoring sanitasi</li>
                     <li>Konsultasi pengendalian hama</li>
                   </ul>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Keunggulan Kami List Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya" className="w-[150px] lg:w-[200px] h-auto mx-auto mb-6 object-contain" />
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">MENGAPA MEMILIH PT. PANCA PRIMA WIJAYA?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Profesional, Berpengalaman, dan Terpercaya</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-[#ee4d2d]/30 transition-colors">
              <ShieldCheck className="w-8 h-8 text-[#ee4d2d] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Ahli & Modern</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Tim ahli fumigasi dengan teknologi modern untuk penanganan hama secara menyeluruh.</p>
            </div>
            
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-[#ee4d2d]/30 transition-colors">
              <CheckCircle2 className="w-8 h-8 text-[#ee4d2d] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Kualitas Terjamin</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Mendukung keamanan dan stabilitas pangan nasional bersama pemerintah dan industri.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-[#ee4d2d]/30 transition-colors">
              <ShieldCheck className="w-8 h-8 text-[#ee4d2d] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">One-Stop Service</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Solusi lengkap pengendalian hama gudang pangan, peralatan laboratorium, dan pestisida.</p>
            </div>
            
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-[#ee4d2d]/30 transition-colors">
              <Factory className="w-8 h-8 text-[#ee4d2d] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Pengalaman Luas</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Berpengalaman menangani proyek kementerian, TNI, pemerintah, dan kebutuhan logistik darurat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Konsultasi - Red version */}
      <section id="konsultasi" className="py-12 sm:py-20 bg-[#ee4d2d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
            <Bug className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black mb-4 uppercase tracking-tight">Konsultasi Layanan Kami</h2>
          
          <div className="max-w-2xl mx-auto border-t border-b border-white/20 py-6 my-6">
             <p className="text-sm sm:text-base text-red-50 font-medium leading-relaxed">
              Butuh jasa fumigasi beras, pembasmi kutu gudang, atau sanitasi gudang pangan profesional? PT. Panca Prima Wijaya siap membantu kebutuhan industri maupun instansi pemerintah.
            </p>
          </div>
          
          <p className="text-xs text-red-100 mb-8 max-w-xl mx-auto">
            Hubungi tim kami sekarang untuk konsultasi gratis, survey lokasi, dan solusi terintegrasi.
          </p>
          
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-[#ee4d2d] px-6 sm:px-10 py-3 sm:py-4 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto">
            HUBUNGI KAMI SEKARANG <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}

