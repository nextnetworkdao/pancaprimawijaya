import React, { useState } from 'react';
import { Settings, ShieldCheck, Activity, Building2, Cable, Zap, MonitorSmartphone, Target, Plus, Minus, ArrowRight, ArrowUpCircle, PenTool, Cpu, Wrench } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { TrustedBy } from '../../components/TrustedBy';

export default function SparepartLiftPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Apakah PT. Panca Prima Wijaya menyediakan sparepart untuk semua merek lift?",
      answer: "Ya. Kami menyediakan sparepart untuk berbagai merek lift seperti Mitsubishi, Otis, KONE, Schindler, Hyundai, Fujitec, Hitachi, Sigma, Toshiba, dan banyak merek lainnya."
    },
    {
      question: "Apakah tersedia sparepart lift yang sudah tidak diproduksi lagi?",
      answer: "Tim kami akan membantu melakukan pencarian alternatif atau solusi penggantian yang sesuai dengan spesifikasi unit lift yang digunakan."
    },
    {
      question: "Apakah PT. Panca Prima Wijaya melayani pengiriman ke seluruh Indonesia?",
      answer: "Ya. Kami melayani kebutuhan sparepart lift untuk proyek dan gedung di berbagai wilayah Indonesia."
    },
    {
      question: "Selain sparepart lift, layanan apa saja yang tersedia?",
      answer: "Kami juga menyediakan modernisasi lift, sensor gempa lift, Building Management System (BMS), RTMS, EWS, dan berbagai solusi smart building."
    },
    {
      question: "Bagaimana cara mengetahui sparepart yang sesuai dengan lift saya?",
      answer: "Cukup kirimkan data lift, foto nameplate, atau kode part yang dibutuhkan. Tim teknis kami akan membantu mengidentifikasi komponen yang sesuai."
    }
  ];

  const brands = [
    "Mitsubishi Lift", "Otis Lift", "KONE Lift", "Schindler Lift",
    "Hyundai Elevator", "Fujitec", "Hitachi Elevator", "Sigma Elevator",
    "ThyssenKrupp Elevator", "Toshiba Elevator", "Monarch Elevator", 
    "LG Elevator", "Canny Elevator", "KOYO Elevator", "Dan lainnya..."
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="Sparepart Lift Terlengkap Semua Merk | PT. Panca Prima Wijaya"
        description="PT. Panca Prima Wijaya menyediakan sparepart lift terlengkap untuk semua merk lift seperti Mitsubishi, Otis, KONE, Schindler, Hyundai, Fujitec, Hitachi, dan lainnya."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            SPAREPART LIFT TERLENGKAP
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Sparepart Lift Terlengkap untuk Semua Merk Lift di Indonesia
          </h1>
          
          <div className="pl-4 border-l-4 border-blue-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "Penyedia sparepart lift terlengkap dan terpercaya untuk menjaga performa, keamanan, dan keandalan sistem lift Anda."
            </p>
          </div>
          
          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            Ketersediaan sparepart merupakan faktor penting untuk menjaga performa, keamanan, dan keandalan sistem lift. Ketika komponen lift mengalami kerusakan atau membutuhkan penggantian, penggunaan sparepart yang tepat akan membantu memperpanjang umur peralatan sekaligus mengurangi risiko downtime operasional.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <strong>PT. Panca Prima Wijaya</strong> hadir sebagai perusahaan yang menyediakan <strong>sparepart lift terlengkap</strong> untuk berbagai kebutuhan gedung, apartemen, hotel, rumah sakit, pusat perbelanjaan, perkantoran, hingga kawasan industri.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
            Dengan jaringan pemasok yang luas dan pengalaman dalam bidang elevator serta building automation, kami mampu menyediakan berbagai komponen lift dari berbagai merek terkenal dengan kualitas terbaik dan dukungan teknis profesional.
          </p>
        </div>
      </section>

      {/* Daftar Merk */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Supplier Sparepart Lift Lengkap untuk Semua Merek</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               PT. Panca Prima Wijaya menyediakan sparepart untuk berbagai merek lift yang digunakan di Indonesia, antara lain:
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <div className="flex flex-wrap gap-3 justify-center">
                {brands.map((brand, index) => (
                  <span key={index} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded shadow-sm border border-blue-100">
                    {brand}
                  </span>
                ))}
             </div>
             <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100 font-medium text-center">
               Kami membantu pelanggan mendapatkan komponen yang sesuai dengan spesifikasi unit yang digunakan sehingga proses perbaikan maupun pemeliharaan dapat berjalan lebih efektif.
             </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">Mengapa Ketersediaan Sparepart Lift Sangat Penting?</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Menjaga Keamanan Pengguna</h3>
                 <p className="text-sm text-gray-600 relative z-10">Lift merupakan fasilitas transportasi vertikal yang digunakan setiap hari. Penggantian komponen yang rusak secara tepat membantu menjaga standar keselamatan pengguna.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Mengurangi Downtime Lift</h3>
                 <p className="text-sm text-gray-600 relative z-10">Ketersediaan sparepart yang lengkap mempercepat proses perbaikan sehingga operasional lift dapat kembali normal dalam waktu lebih singkat.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Target className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Memperpanjang Umur Lift</h3>
                 <p className="text-sm text-gray-600 relative z-10">Penggunaan sparepart yang sesuai membantu menjaga performa dan usia pakai komponen lainnya.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Settings className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Menekan Biaya Perbaikan</h3>
                 <p className="text-sm text-gray-600 relative z-10">Kerusakan yang ditangani sejak dini dengan sparepart yang tepat dapat mencegah kerusakan yang lebih besar dan biaya perbaikan yang lebih mahal.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Kategori Produk */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">Produk Sparepart Lift yang Tersedia</h2>
            <p className="text-blue-100 text-center mb-12 max-w-3xl mx-auto">
              Menyediakan berbagai jenis sparepart lift untuk kebutuhan maintenance, repair, maupun modernisasi sistem elevator.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Cpu className="text-blue-400 w-5 h-5"/><h3 className="font-bold text-lg text-white">Control System</h3></div>
                   <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                     <li>Elevator Controller & Main Board</li>
                     <li>PCB Lift & Drive Control Unit</li>
                     <li>Inverter Lift & VVVF Drive</li>
                     <li>Relay, Contactor, Power Supply</li>
                   </ul>
                </div>
                
                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Settings className="text-blue-400 w-5 h-5"/><h3 className="font-bold text-lg text-white">Motor & Mesin</h3></div>
                   <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                     <li>Gearless & Geared Machine</li>
                     <li>Brake Assembly & Coil</li>
                     <li>Encoder & Traction Sheave</li>
                     <li>Motor Bearing</li>
                   </ul>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><ArrowUpCircle className="text-blue-400 w-5 h-5"/><h3 className="font-bold text-lg text-white">Door System</h3></div>
                   <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                     <li>Door Motor & Operator</li>
                     <li>Door Roller & Lock</li>
                     <li>Door Sensor & Guide Shoe</li>
                     <li>Door Controller</li>
                   </ul>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><ShieldCheck className="text-blue-400 w-5 h-5"/><h3 className="font-bold text-lg text-white">Safety System</h3></div>
                   <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                     <li>Governor & Safety Gear</li>
                     <li>Limit Switch & Emergency Switch</li>
                     <li>Overspeed Protection</li>
                     <li>Safety Contact</li>
                   </ul>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Activity className="text-blue-400 w-5 h-5"/><h3 className="font-bold text-lg text-white">Sensor Lift</h3></div>
                   <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                     <li>Leveling & Magnetic Sensor</li>
                     <li>Proximity & Encoder Sensor</li>
                     <li>Load & Door Sensor</li>
                     <li>Earthquake Sensor (Sensor Gempa)</li>
                   </ul>
                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><MonitorSmartphone className="text-blue-400 w-5 h-5"/><h3 className="font-bold text-lg text-white">Cabin & Hall</h3></div>
                   <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                     <li>COP & LOP (Operating Panel)</li>
                     <li>Push Button & Display Lift</li>
                     <li>Indicator Panel & Voice Announcer</li>
                     <li>Intercom Lift</li>
                   </ul>
                </div>
            </div>

            <div className="mt-8 text-center bg-blue-900/40 p-4 rounded-lg border border-blue-400/20">
               <p className="text-sm font-medium">Selain lift, kami juga menyediakan berbagai sparepart untuk escalator dan travelator berbagai merek.</p>
            </div>
         </div>
      </section>

      {/* Modernisasi & Layanan Lain */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6 border-b border-gray-200 pb-2">Solusi Modernisasi Lift</h2>
                  <p className="text-sm text-gray-600 mb-4 bg-white p-3 border border-gray-200 rounded">
                    Kami melayani kebutuhan modernisasi lift untuk meningkatkan performa dan keamanan sistem elevator yang sudah beroperasi selama bertahun-tahun. Layanan meliputi:
                  </p>
                  <div className="space-y-3">
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <PenTool className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">Penggantian Controller & Upgrade Inverter</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Wrench className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">Penggantian Door Operator & Upgrade Display</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Cable className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">Integrasi Sensor Gempa, BMS, dan Monitoring Lift</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6 border-b border-gray-200 pb-2">Keunggulan Panca Prima</h2>
                  <ul className="space-y-4">
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Settings className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Sparepart Terlengkap & Berkualitas</strong>
                            <span className="text-sm text-gray-600">Ribuan jenis sparepart dari berbagai merek dengan seleksi kualitas optimal.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Zap className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Dukungan Teknis Profesional</strong>
                            <span className="text-sm text-gray-600">Bukan sekadar penjual, tim kami memberikan konsultasi teknis yang tepat sasaran.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Building2 className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Solusi Terintegrasi Penuh</strong>
                            <span className="text-sm text-gray-600">Menyediakan juga BMS, RTMS, EWS, dan solusi Smart Building lainnya.</span>
                         </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-bold text-[#0a2558] text-sm sm:text-base pr-4">{faq.question}</span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openFaq === index ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 border border-gray-200'}`}>
                    {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-200/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Konsultasi & Produk */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">Hubungi PT. Panca Prima Wijaya</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             Sedang mencari sparepart lift terlengkap untuk berbagai merek lift? Konsultasikan kebutuhan Anda sekarang dan dapatkan solusi sparepart lift terbaik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto">
               KONSULTASI SEKARANG
             </a>
             <Link to="/produk" className="inline-flex items-center justify-center gap-2 bg-white text-[#0a2558] hover:bg-gray-100 px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto">
               LIHAT PRODUK <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
