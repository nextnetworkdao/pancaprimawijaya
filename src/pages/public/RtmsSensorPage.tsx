import React from 'react';
import { Target, Activity, ShieldCheck, Settings2, BarChart3, Database, Cable, Server, Home, Briefcase, Factory, Cpu, Zap, Eye, MonitorSmartphone, Plus, Minus, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';
import { useState } from 'react';

export default function RtmsSensorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Apa itu Real Time Monitoring System (RTMS)?",
      answer: "RTMS adalah sistem yang digunakan untuk memantau data dan kondisi operasional secara langsung (real-time) dari berbagai perangkat, sensor, mesin, maupun fasilitas."
    },
    {
      question: "Apa manfaat RTMS bagi perusahaan?",
      answer: "RTMS membantu meningkatkan efisiensi operasional, mengurangi downtime, mempercepat respons terhadap gangguan, dan mendukung pengambilan keputusan berbasis data."
    },
    {
      question: "Apakah RTMS dapat diintegrasikan dengan BMS dan EWS?",
      answer: "Ya. RTMS dapat terintegrasi dengan Building Management System (BMS), Early Warning System (EWS), SCADA, dan berbagai platform IoT Monitoring."
    },
    {
      question: "Data apa saja yang dapat dimonitor menggunakan RTMS?",
      answer: "RTMS dapat memantau energi, temperatur, kelembaban, tekanan, getaran mesin, level cairan, kualitas udara, utilitas, dan berbagai parameter operasional lainnya."
    },
    {
      question: "Apakah PT. Panca Prima Wijaya menyediakan implementasi RTMS secara lengkap?",
      answer: "Ya. PT. Panca Prima Wijaya menyediakan layanan konsultasi, desain sistem, integrasi perangkat, instalasi, dashboard monitoring, hingga maintenance RTMS secara menyeluruh."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="Real Time Monitoring System (RTMS) Terintegrasi | PT. Panca Prima Wijaya"
        description="PT. Panca Prima Wijaya menyediakan solusi Real Time Monitoring System (RTMS) untuk monitoring data, energi, mesin, utilitas, dan fasilitas secara real-time dengan dashboard terintegrasi."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-green-500/20 text-green-200 font-bold text-xs rounded-full mb-6 border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            MANAJEMEN DATA & MONITORING LANGSUNG
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Real Time Monitoring System (RTMS) untuk Monitoring Operasional dan Data Secara Real-Time
          </h1>
          
          <div className="pl-4 border-l-4 border-green-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "Solusi RTMS Profesional dari PT. Panca Prima Wijaya untuk Visibilitas Penuh Fasilitas dan Proses Bisnis Anda Secara Langsung."
            </p>
          </div>
          
          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            Kecepatan memperoleh informasi menjadi faktor penting dalam pengambilan keputusan bisnis dan operasional. Dengan <strong>Real Time Monitoring System (RTMS)</strong>, perusahaan dapat memantau kondisi aset, fasilitas, mesin, maupun parameter operasional secara langsung tanpa harus menunggu laporan manual.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <strong>PT. Panca Prima Wijaya</strong> menyediakan solusi <strong>Real Time Monitoring System (RTMS)</strong> yang memungkinkan data dari berbagai perangkat, sensor, mesin, dan sistem operasional dikumpulkan, dianalisis, dan ditampilkan secara real-time melalui dashboard monitoring yang terintegrasi.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
            Melalui RTMS, perusahaan dapat meningkatkan efisiensi operasional, mempercepat respons terhadap gangguan, mengurangi downtime, serta memperoleh visibilitas penuh terhadap kondisi fasilitas dan proses bisnis yang berjalan.
          </p>
        </div>
      </section>

      {/* Apa Itu RTMS */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Apa Itu Real Time Monitoring System (RTMS)?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               <strong>Real Time Monitoring System (RTMS)</strong> adalah sistem pemantauan yang dirancang untuk mengumpulkan, mengolah, dan menampilkan data secara langsung (real-time) dari berbagai sumber monitoring.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
               Sistem ini memungkinkan pengguna mengetahui kondisi aktual peralatan, fasilitas, maupun lingkungan operasional tanpa keterlambatan informasi.
             </p>
             <p className="text-sm text-gray-600 font-medium mb-3">Data yang diperoleh dapat ditampilkan dalam bentuk:</p>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-green-500" /> Dashboard Monitoring</div>
                <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-green-500" /> Grafik Analitik</div>
                <div className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-green-500" /> Status Peralatan</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Alarm & Notifikasi</div>
                <div className="flex items-center gap-2"><Database className="w-4 h-4 text-green-500" /> Laporan Otomatis</div>
                <div className="flex items-center gap-2"><MonitorSmartphone className="w-4 h-4 text-green-500" /> Mobile App Monitor</div>
             </div>
             <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100 font-medium text-center">
               "Dengan RTMS, setiap perubahan kondisi dapat diketahui secara cepat sehingga tindakan yang diperlukan dapat segera dilakukan."
             </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">Mengapa Real Time Monitoring System Penting?</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Eye className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Monitoring 24 Jam Nonstop</h3>
                 <p className="text-sm text-gray-600 relative z-10">RTMS bekerja secara terus menerus untuk memastikan seluruh parameter penting tetap berada dalam kondisi normal.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Pengambilan Keputusan Lebih Cepat</h3>
                 <p className="text-sm text-gray-600 relative z-10">Data real-time membantu manajemen dan operator mengambil keputusan berdasarkan kondisi aktual di lapangan.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Mengurangi Risiko Downtime</h3>
                 <p className="text-sm text-gray-600 relative z-10">Gangguan dapat terdeteksi lebih awal sehingga proses perbaikan dapat dilakukan sebelum terjadi kegagalan operasional.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Settings2 className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Meningkatkan Efisiensi Operasional</h3>
                 <p className="text-sm text-gray-600 relative z-10">Pemantauan otomatis mengurangi kebutuhan inspeksi manual dan meningkatkan produktivitas tim operasional.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden sm:col-span-2 lg:col-span-2">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Target className="w-16 h-16"/></div>
                 <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">Optimalisasi Penggunaan Aset</h3>
                 <p className="text-sm text-gray-600 relative z-10">Perusahaan dapat memahami performa aset secara menyeluruh sehingga pengelolaan menjadi lebih efektif.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Solusi RTMS */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">Solusi RTMS dari PT. Panca Prima Wijaya</h2>
            <p className="text-blue-100 text-center mb-12">Menyediakan layanan konsultasi, desain sistem, integrasi perangkat, implementasi, hingga maintenance Real Time Monitoring System.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Zap className="text-green-400"/><h3 className="font-bold text-xl text-white">Monitoring Energi</h3></div>
                   <p className="text-sm text-blue-100 mb-2">Pantau listrik untuk efisiensi. Parameter:</p>
                   <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-blue-200">
                     <div>• Tegangan & Arus</div>
                     <div>• Daya Aktif & Reaktif</div>
                     <div>• Faktor Daya</div>
                     <div>• Konsumsi Energi</div>
                   </div>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Settings2 className="text-green-400"/><h3 className="font-bold text-xl text-white">Monitoring Mesin & Pralatan</h3></div>
                   <p className="text-sm text-blue-100 mb-2">Mendukung predictive maintenance. Parameter:</p>
                   <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-blue-200">
                     <div>• Getaran & Suhu</div>
                     <div>• Kecepatan & Tekanan</div>
                     <div>• Kondisi Motor</div>
                     <div>• Status Produksi</div>
                   </div>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Home className="text-green-400"/><h3 className="font-bold text-xl text-white">Monitoring Lingkungan</h3></div>
                   <p className="text-sm text-blue-100 mb-2">Kondisi sekitar fasilitas:</p>
                   <ul className="text-xs text-blue-200 flex flex-wrap gap-x-4 gap-y-1 list-disc list-inside">
                     <li>Temperatur & Kelembaban</li>
                     <li>Tekanan Udara</li>
                     <li>Kualitas Udara & Cahaya</li>
                   </ul>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Server className="text-green-400"/><h3 className="font-bold text-xl text-white">Monitoring Infrastruktur</h3></div>
                   <p className="text-sm text-blue-100 mb-2">Sangat efektif memantau:</p>
                   <ul className="text-xs text-blue-200 flex flex-wrap gap-x-4 gap-y-1 list-disc list-inside">
                     <li>Sistem Listrik & HVAC</li>
                     <li>Pompa, Genset, Tangki</li>
                     <li>Utility Plant</li>
                   </ul>
                </div>
            </div>
         </div>
      </section>

      {/* Integrasi & Aplikasi Industri */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">Integrasi RTMS</h2>
                  <div className="space-y-4">
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <strong className="block text-gray-900 text-sm mb-2"><Cable className="inline w-4 h-4 mr-2 text-green-500"/>BMS & EWS</strong>
                        <p className="text-xs text-gray-600">Integrasi ke Building Management untuk sentralisasi dan Early Warning System untuk notifikasi otomatis bila ada abnormalitas.</p>
                     </div>
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <strong className="block text-gray-900 text-sm mb-2"><Activity className="inline w-4 h-4 mr-2 text-green-500"/>SCADA & IoT</strong>
                        <p className="text-xs text-gray-600">Koneksi ke sensor IoT otomatis, SCADA dan Automation Sys industri untuk kontrol efisien.</p>
                     </div>
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <strong className="block text-gray-900 text-sm mb-2"><MonitorSmartphone className="inline w-4 h-4 mr-2 text-green-500"/>Dashboard Terpadu</strong>
                        <p className="text-xs text-gray-600">Akses real-time fleksibel lewat Desktop, Tablet, Smartphone.</p>
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">Aplikasi Industri</h2>
                  <div className="flex flex-col gap-3">
                     <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 p-3 rounded">
                        <Factory className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                        <div>
                           <p className="text-sm font-bold text-gray-900">Industri Manufaktur</p>
                           <p className="text-xs text-gray-600">Monitoring mesin, energi, performa produksi.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 p-3 rounded">
                        <Briefcase className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                        <div>
                           <p className="text-sm font-bold text-gray-900">Perkantoran & Infrastruktur</p>
                           <p className="text-xs text-gray-600">Fasilitas gedung, utilitas publik, distribusi air/energi.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 p-3 rounded">
                        <Server className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                        <div>
                           <p className="text-sm font-bold text-gray-900">Data Center</p>
                           <p className="text-xs text-gray-600">Suhu server, daya, kelembaban.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 p-3 rounded">
                        <ShieldCheck className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                        <div>
                           <p className="text-sm font-bold text-gray-900">RS & Area Logistik</p>
                           <p className="text-xs text-gray-600">Alat medis listrik, kontrol suhu gudang.</p>
                        </div>
                     </div>
                  </div>
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
      
      {/* CTA Konsultasi */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">Hubungi PT. Panca Prima Wijaya</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             Konsultasikan kebutuhan Real Time Monitoring System (RTMS) Anda dan dapatkan visibilitas penuh untuk efisiensi operasional.
          </p>
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base">
            KONSULTASI SEKARANG
          </a>
        </div>
      </section>

    </div>
  );
}
