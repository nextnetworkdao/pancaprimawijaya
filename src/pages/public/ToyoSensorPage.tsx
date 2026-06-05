import React, { useState } from 'react';
import { Target, Activity, ShieldCheck, Settings2, BarChart3, Database, Cable, Server, Home, Briefcase, Factory, Building2, Zap, Eye, MonitorSmartphone, Plus, Minus, ArrowRight, ArrowUpCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { TrustedBy } from '../../components/TrustedBy';

export default function ToyoSensorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Apa fungsi Sensor Gempa?",
      answer: "Sensor Gempa berfungsi mendeteksi aktivitas seismik atau getaran gempa secara cepat sehingga sistem keselamatan dapat memberikan respons otomatis."
    },
    {
      question: "Mengapa Sensor Gempa penting untuk lift?",
      answer: "Sensor Gempa dapat menginstruksikan lift berhenti di lantai terdekat dan membuka pintu secara otomatis untuk mengurangi risiko penumpang terjebak saat gempa."
    },
    {
      question: "Apakah Sensor Gempa dapat diintegrasikan dengan BMS?",
      answer: "Ya. Sensor Gempa dapat terhubung dengan Building Management System (BMS), Early Warning System (EWS), RTMS, Fire Alarm System, dan berbagai platform monitoring lainnya."
    },
    {
      question: "Apakah PT. Panca Prima Wijaya distributor resmi Toyo Automation?",
      answer: "Ya. PT. Panca Prima Wijaya merupakan distributor resmi yang ditunjuk langsung oleh Toyo Automation untuk menyediakan produk dan layanan terkait Sensor Gempa di Indonesia."
    },
    {
      question: "Industri apa saja yang cocok menggunakan Sensor Gempa?",
      answer: "Sensor Gempa sangat cocok digunakan pada gedung bertingkat, rumah sakit, hotel, data center, pusat perbelanjaan, kawasan industri, bandara, pelabuhan, dan fasilitas publik lainnya."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="Sensor Gempa Toyo Automation | Distributor Resmi PT. Panca Prima Wijaya"
        description="PT. Panca Prima Wijaya adalah distributor resmi Sensor Gempa Toyo Automation di Indonesia. Solusi deteksi gempa untuk lift, gedung, rumah sakit, data center, dan fasilitas industri."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-red-500/20 text-red-200 font-bold text-xs rounded-full mb-6 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            DISTRIBUTOR RESMI TOYO AUTOMATION
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Sensor Gempa Toyo Automation untuk Gedung, Lift, dan Fasilitas Industri
          </h1>
          
          <div className="pl-4 border-l-4 border-red-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "Distributor Resmi Sensor Gempa Toyo Automation di Indonesia. Lindungi keselamatan operasional dan infrastruktur dari risiko seismik."
            </p>
          </div>
          
          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <div className="mb-12 relative w-full aspect-video rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            {!isVideoPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group" 
                onClick={() => setIsVideoPlaying(true)}
              >
                <img 
                  src="https://ik.imagekit.io/cej2dcwlx/logo%20Toyo%20(1).png" 
                  alt="Video Cover" 
                  className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gray-900/10 transition-colors duration-500 group-hover:bg-gray-900/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/30 backdrop-blur-sm border-2 border-white/50 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-black/50">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <iframe 
                className="w-full h-full absolute top-0 left-0"
                src="https://www.youtube.com/embed/izA6Y1ncG7c?si=qJa25qR8D901wvHg&autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            )}
          </div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            Gempa bumi merupakan salah satu risiko yang dapat mengancam keselamatan manusia, bangunan, serta operasional fasilitas penting. Oleh karena itu, penggunaan <strong>Sensor Gempa</strong> menjadi bagian penting dalam sistem mitigasi risiko dan keselamatan bangunan modern.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <strong>PT. Panca Prima Wijaya</strong> merupakan <strong>distributor resmi Sensor Gempa Toyo Automation di Indonesia</strong> yang ditunjuk langsung oleh principal untuk menyediakan produk, konsultasi, instalasi, integrasi, serta dukungan teknis bagi berbagai sektor industri dan bangunan.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
            Melalui teknologi deteksi gempa yang cepat dan akurat, Sensor Gempa Toyo Automation membantu memberikan peringatan dini sehingga sistem keamanan dapat bekerja lebih cepat dalam meminimalkan risiko kerusakan maupun kecelakaan.
          </p>
        </div>
      </section>

      {/* Apa Itu Sensor Gempa */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Apa Itu Sensor Gempa?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               <strong>Sensor Gempa</strong> adalah perangkat yang dirancang untuk mendeteksi getaran atau aktivitas seismik yang terjadi akibat gempa bumi. Ketika getaran terdeteksi melebihi ambang batas yang telah ditentukan, sistem akan mengirimkan sinyal peringatan atau menjalankan prosedur keselamatan secara otomatis.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 font-medium mb-4">Sensor gempa banyak digunakan pada:</p>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-500" /> Gedung Bertingkat</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /> Rumah Sakit</div>
                <div className="flex items-center gap-2"><Server className="w-4 h-4 text-blue-500" /> Data Center</div>
                <div className="flex items-center gap-2"><Factory className="w-4 h-4 text-blue-500" /> Pabrik Industri</div>
                <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-500" /> Pusat Perbelanjaan & Hotel</div>
                <div className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-500" /> Bandara & Pelabuhan</div>
                <div className="flex items-center gap-2"><ArrowUpCircle className="w-4 h-4 text-blue-500" /> Lift dan Elevator</div>
                <div className="flex items-center gap-2"><Cable className="w-4 h-4 text-blue-500" /> Infrastruktur Publik</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-500" /> Fasilitas Energi & Utilitas</div>
             </div>
             <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100 font-medium text-center">
               "Dengan deteksi yang cepat, tindakan mitigasi dapat dilakukan sebelum dampak gempa menjadi lebih besar."
             </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">Mengapa Sensor Gempa Penting?</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Melindungi Keselamatan Penghuni</h3>
                 <p className="text-sm text-gray-600 relative z-10">Peringatan dini membantu penghuni gedung maupun operator fasilitas mengambil tindakan yang lebih cepat saat terjadi gempa.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Mengurangi Risiko Kerusakan</h3>
                 <p className="text-sm text-gray-600 relative z-10">Sistem dapat mengaktifkan prosedur keselamatan untuk meminimalkan dampak terhadap bangunan dan peralatan.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Target className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Mendukung Sistem Evakuasi</h3>
                 <p className="text-sm text-gray-600 relative z-10">Sensor gempa dapat terintegrasi dengan alarm, sistem evakuasi, dan pusat kontrol gedung untuk mempercepat respons darurat.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Server className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Melindungi Peralatan Kritis</h3>
                 <p className="text-sm text-gray-600 relative z-10">Peralatan penting seperti server, mesin produksi, kelistrikan, dan utilitas dapat diamankan lebih cepat saat aktivitas seismik.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden sm:col-span-2 lg:col-span-2">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Settings2 className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Memenuhi Standar Keselamatan</h3>
                 <p className="text-sm text-gray-600 relative z-10">Banyak bangunan modern dan fasilitas kritis yang mulai menerapkan sistem deteksi gempa sebagai bagian dari standar keamanan operasional.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Aplikasi Alat Sensor Gempa TAC */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">Aplikasi Alat Sensor Gempa TAC</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beginilah ilustrasi bagaimana alat pendeteksi gempa bumi sederhana dari TAC bekerja di lapangan untuk berbagai fasilitas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-16 h-16"/></div>
              <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" /> Fasilitas LPG
              </h3>
              <p className="text-sm text-gray-600 relative z-10">
                Mencegah kebocoran gas dan ledakan akibat gempa dengan mematikan sistem secara otomatis saat gempa terdeteksi.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Database className="w-16 h-16"/></div>
              <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" /> Tangki Air
              </h3>
              <p className="text-sm text-gray-600 relative z-10">
                Melindungi struktur tangki air dari kerusakan dengan mendeteksi getaran gempa dan mengaktifkan sistem pengaman.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><ArrowUpCircle className="w-16 h-16"/></div>
              <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                <ArrowUpCircle className="w-5 h-5 text-blue-500" /> Lift
              </h3>
              <p className="text-sm text-gray-600 relative z-10">
                Menghentikan lift dan membawanya ke lantai terdekat untuk evakuasi aman saat gempa terdeteksi.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Factory className="w-16 h-16"/></div>
              <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                <Factory className="w-5 h-5 text-blue-500" /> Boiler
              </h3>
              <p className="text-sm text-gray-600 relative z-10">
                Mematikan boiler secara otomatis untuk mencegah kebakaran dan ledakan saat gempa terjadi.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Building2 className="w-16 h-16"/></div>
              <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" /> Bangunan Kantor
              </h3>
              <p className="text-sm text-gray-600 relative z-10">
                Mengintegrasikan dengan sistem Building Automation System untuk evakuasi dan penyelamatan yang terkoordinasi.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Target className="w-16 h-16"/></div>
              <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" /> Pabrik Alat Presisi
              </h3>
              <p className="text-sm text-gray-600 relative z-10">
                Melindungi peralatan presisi mahal dengan mematikan sistem saat getaran gempa terdeteksi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toyo Automation */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">Sensor Gempa Toyo Automation</h2>
            <p className="text-blue-100 text-center mb-12 max-w-3xl mx-auto">
              <strong>Toyo Automation</strong> merupakan perusahaan yang mengembangkan teknologi sensor dan sistem monitoring untuk kebutuhan industri, gedung, serta infrastruktur modern.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <h3 className="font-bold text-xl text-white mb-4">Fitur & Keunggulan Toyo</h3>
                   <ul className="space-y-3 text-sm text-blue-100">
                     <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Deteksi Gempa Cepat dan Akurat</li>
                     <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Respon Otomatis Real-Time</li>
                     <li className="flex items-start gap-2"><MonitorSmartphone className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Monitoring melalui Dashboard</li>
                     <li className="flex items-start gap-2"><Cable className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Dukungan Sistem IoT & Remote Monitoring</li>
                   </ul>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <h3 className="font-bold text-xl text-white mb-4">Integrasi Sistem</h3>
                   <ul className="space-y-3 text-sm text-blue-100">
                     <li className="flex items-start gap-2"><Building2 className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Building Management System (BMS)</li>
                     <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Early Warning System (EWS)</li>
                     <li className="flex items-start gap-2"><ArrowUpCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Lift dan Elevator</li>
                     <li className="flex items-start gap-2"><Target className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Fire Alarm System & Security</li>
                   </ul>
                </div>
            </div>

            <div className="mt-8 text-center bg-blue-900/40 p-4 rounded-lg border border-blue-400/20">
               <p className="text-sm font-medium">Melalui integrasi tersebut, seluruh informasi dapat dipantau melalui satu dashboard terpusat sehingga respons terhadap keadaan darurat menjadi lebih cepat dan terkoordinasi.</p>
            </div>
         </div>
      </section>

      {/* Aplikasi Pada Lift & Solusi Panca Prima*/}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">Aplikasi Sensor Gempa untuk Lift</h2>
                  <p className="text-sm text-gray-600 mb-4 bg-white p-3 border border-gray-200 rounded">
                    Salah satu aplikasi penting Sensor Gempa adalah pada sistem lift dan elevator. Karena alasan inilah banyak gedung tinggi mulai menerapkan sensor gempa sebagai bagian keselamatan.
                  </p>
                  <div className="space-y-3">
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <ArrowUpCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">Menghentikan operasi lift secara aman</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Building2 className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">Mengarahkan lift ke lantai terdekat</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Eye className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">Membuka pintu lift otomatis</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <ShieldCheck className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">Mencegah penumpang terjebak</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">Solusi PT. Panca Prima Wijaya</h2>
                  <p className="text-sm text-gray-600 mb-4">Sebagai distributor resmi yang ditunjuk langsung oleh Toyo Automation, kami menyediakan layanan lengkap:</p>
                  <ul className="space-y-4">
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Settings2 className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Konsultasi Kebutuhan Sistem</strong>
                            <span className="text-sm text-gray-600">Analisis kebutuhan fasilitas dan rekomendasi solusi sensor gempa yang sesuai.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Target className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Penyediaan Produk Original</strong>
                            <span className="text-sm text-gray-600">Menjamin produk Sensor Gempa Toyo Automation asli dan didukung garansi resmi.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Cable className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Instalasi, Integrasi & Commissioning</strong>
                            <span className="text-sm text-gray-600">Pemasangan sensor serta integrasi dengan sistem yang sudah ada & training.</span>
                         </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* Keunggulan & Industri */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-black text-[#0a2558] mb-6">Mengapa Memilih Kami?</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
               <div>
                  <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-3"><Briefcase className="w-6 h-6"/></div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Distributor Resmi</h4>
                  <p className="text-xs text-gray-600">Ditunjuk langsung Toyo Automation</p>
               </div>
               <div>
                  <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-3"><ShieldCheck className="w-6 h-6"/></div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Original & Garansi</h4>
                  <p className="text-xs text-gray-600">Produk asli & technical support jelas</p>
               </div>
               <div>
                  <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-3"><Settings2 className="w-6 h-6"/></div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Tim Berpengalaman</h4>
                  <p className="text-xs text-gray-600">Otomasi dan keselamatan bangunan</p>
               </div>
               <div>
                  <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-3"><Cable className="w-6 h-6"/></div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Solusi Terintegrasi</h4>
                  <p className="text-xs text-gray-600">Mendukung BMS, EWS, RTMS & IoT</p>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-bold text-[#0a2558] text-sm sm:text-base pr-4">{faq.question}</span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openFaq === index ? 'bg-blue-100 text-blue-600' : 'bg-[#f4f7f6] text-gray-400 border border-gray-200'}`}>
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
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">Hubungi PT. Panca Prima Wijaya</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             Tingkatkan keselamatan bangunan dan fasilitas Anda dengan teknologi Sensor Gempa Toyo Automation yang cepat, akurat, dan terintegrasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto">
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
