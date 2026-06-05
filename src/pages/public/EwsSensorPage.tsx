import React from 'react';
import { Target, Activity, ShieldCheck, Settings2, BarChart3, Database, Cable, Server, Home, BellRing, Smartphone, Briefcase, Plus, Minus } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';
import { useState } from 'react';

export default function EwsSensorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Apa itu Early Warning System (EWS)?",
      answer: "Early Warning System (EWS) adalah sistem yang digunakan untuk mendeteksi kondisi abnormal atau potensi risiko secara dini sehingga tindakan pencegahan dapat dilakukan sebelum terjadi gangguan yang lebih besar."
    },
    {
      question: "Apa manfaat Early Warning System bagi perusahaan?",
      answer: "EWS membantu mengurangi downtime, meningkatkan keamanan, menekan biaya perbaikan, dan mempercepat respons terhadap gangguan operasional."
    },
    {
      question: "Apakah EWS dapat diintegrasikan dengan BMS?",
      answer: "Ya. Early Warning System dapat diintegrasikan dengan Building Management System (BMS), RTMS, SCADA, dan berbagai platform monitoring lainnya. Parameter monitoring dan batas alarm dapat disesuaikan dengan kebutuhan operasional masing-masing pelanggan."
    },
    {
      question: "Industri apa saja yang cocok menggunakan EWS?",
      answer: "EWS cocok digunakan pada gedung perkantoran, rumah sakit, data center, manufaktur, pergudangan, fasilitas publik, dan berbagai sektor industri lainnya."
    },
    {
      question: "Apakah PT. Panca Prima Wijaya menyediakan layanan implementasi EWS?",
      answer: "Ya. PT. Panca Prima Wijaya menyediakan layanan konsultasi, desain, instalasi, integrasi, hingga maintenance sistem Early Warning System secara menyeluruh."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="Early Warning System (EWS) Terintegrasi | PT. Panca Prima Wijaya"
        description="PT. Panca Prima Wijaya menyediakan solusi Early Warning System (EWS) untuk deteksi dini risiko operasional, monitoring real-time, alarm otomatis, dan integrasi BMS serta RTMS."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-red-500/20 text-red-200 font-bold text-xs rounded-full mb-6 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            DETEKSI DINI & MITIGASI RISIKO
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Early Warning System (EWS) Terintegrasi untuk Monitoring dan Peringatan Dini Real-Time
          </h1>
          
          <div className="pl-4 border-l-4 border-red-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "Solusi Early Warning System (EWS) Profesional dari PT. Panca Prima Wijaya untuk Deteksi Dini dan Mitigasi Risiko Operasional Fasilitas Anda."
            </p>
          </div>
          
          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            Dalam dunia industri dan pengelolaan fasilitas modern, kecepatan dalam mendeteksi potensi masalah menjadi faktor penting untuk mencegah kerugian yang lebih besar. Oleh karena itu, penerapan <strong>Early Warning System (EWS)</strong> menjadi kebutuhan utama bagi perusahaan yang ingin meningkatkan keamanan, keandalan operasional, dan efektivitas pengambilan keputusan.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <strong>PT. Panca Prima Wijaya</strong> menyediakan solusi <strong>Early Warning System (EWS)</strong> yang dirancang untuk mendeteksi potensi gangguan, kerusakan, maupun kondisi darurat secara real-time. Sistem ini memungkinkan pengguna menerima notifikasi dini sehingga tindakan korektif dapat dilakukan sebelum masalah berkembang menjadi kegagalan operasional yang serius.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
            Dengan dukungan teknologi monitoring modern, integrasi IoT, dashboard real-time, serta sistem alarm otomatis, kami membantu perusahaan mengurangi risiko operasional sekaligus meningkatkan efisiensi pengelolaan aset dan fasilitas.
          </p>
        </div>
      </section>

      {/* Apa Itu EWS */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Apa Itu Early Warning System (EWS)?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               <strong>Early Warning System (EWS)</strong> adalah sistem pemantauan dan peringatan dini yang berfungsi mendeteksi kondisi abnormal, potensi bahaya, atau penyimpangan parameter operasional sebelum menyebabkan gangguan yang lebih besar.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
               Sistem ini bekerja dengan mengumpulkan data dari berbagai sensor, perangkat monitoring, maupun sistem kontrol yang kemudian dianalisis secara otomatis. Ketika ditemukan kondisi yang melebihi batas aman, sistem akan mengirimkan peringatan melalui dashboard, alarm, email, SMS, atau aplikasi mobile.<br/><br/>
               Dengan EWS, perusahaan dapat melakukan tindakan preventif lebih cepat sehingga mengurangi risiko downtime, kerusakan aset, kecelakaan kerja, hingga kerugian finansial.
             </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">Mengapa Early Warning System Penting?</h2>
            
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Mencegah Kerusakan Sebelum Terjadi</h3>
                 <p className="text-sm text-gray-600">EWS membantu mendeteksi tanda-tanda awal gangguan sehingga perbaikan dapat dilakukan sebelum terjadi kerusakan yang lebih serius.</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Mengurangi Downtime Operasional</h3>
                 <p className="text-sm text-gray-600">Gangguan yang terdeteksi lebih awal memungkinkan tim teknis mengambil tindakan cepat untuk menjaga kontinuitas operasional.</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Meningkatkan Keselamatan</h3>
                 <p className="text-sm text-gray-600">Sistem peringatan dini membantu mengidentifikasi kondisi berbahaya yang berpotensi mengancam keselamatan pekerja maupun fasilitas.</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Mendukung Pengambilan Keputusan</h3>
                 <p className="text-sm text-gray-600">Data real-time dan notifikasi otomatis memberikan informasi yang lebih akurat untuk mendukung keputusan operasional.</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1 sm:col-span-2">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">Mengurangi Biaya Perawatan</h3>
                 <p className="text-sm text-gray-600">Dengan pendekatan preventif, perusahaan dapat mengurangi biaya perbaikan besar akibat kerusakan yang terlambat ditangani.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Solusi Kami */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">Solusi Early Warning System PT. Panca Prima Wijaya</h2>
            <p className="text-blue-100 text-center mb-12">PT. Panca Prima Wijaya menyediakan layanan konsultasi, desain, implementasi, integrasi, dan pemeliharaan sistem EWS sesuai kebutuhan industri maupun fasilitas pelanggan.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Activity className="text-red-400"/><h3 className="font-bold text-xl text-white">Monitoring Parameter</h3></div>
                   <p className="text-sm text-blue-100 mb-2">Sistem dapat memantau berbagai parameter penting seperti:</p>
                   <ul className="grid grid-cols-2 gap-1 text-xs text-blue-200 list-disc list-inside">
                     <li>Suhu & Kelembaban</li>
                     <li>Tekanan & Getaran</li>
                     <li>Arus & Tegangan listrik</li>
                     <li>Konsumsi energi</li>
                     <li>Level cairan & Kualitas udara</li>
                   </ul>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><BellRing className="text-red-400"/><h3 className="font-bold text-xl text-white">Notifikasi Real-Time</h3></div>
                   <p className="text-sm text-blue-100 mb-2">Peringatan otomatis melalui:</p>
                   <ul className="text-xs text-blue-200 space-y-1 list-disc list-inside">
                     <li>Dashboard Monitoring & Aplikasi Mobile</li>
                     <li>Alarm Audio dan Visual</li>
                     <li>Email Notification & SMS Gateway</li>
                     <li>WhatsApp Notification</li>
                   </ul>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><Cable className="text-red-400"/><h3 className="font-bold text-xl text-white">Integrasi BMS & RTMS</h3></div>
                   <p className="text-sm text-blue-100 mb-4">Dapat diintegrasikan dengan Building Management System (BMS) dan Real-Time Monitoring System (RTMS) untuk analisis mendalam dan pengelolaan terpusat.</p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-3"><BarChart3 className="text-red-400"/><h3 className="font-bold text-xl text-white">Dashboard Terintegrasi</h3></div>
                   <p className="text-sm text-blue-100 mb-4">Seluruh data dan alarm ditampilkan dalam dashboard yang mudah dipahami sehingga pengguna dapat memantau kondisi dari mana saja.</p>
                </div>
            </div>
         </div>
      </section>

      {/* Aplikasi Industri */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-[#0a2558] mb-4">Aplikasi & Keunggulan Solusi EWS PT. Panca Prima Wijaya</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h3 className="font-bold text-[#0a2558] text-xl mb-4 border-b border-gray-200 pb-2">Aplikasi Sistem (EWS)</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                        <strong><Briefcase className="inline w-4 h-4 mr-2"/> Gedung Perkantoran:</strong> Memantau sistem kelistrikan, HVAC, pompa, genset.
                     </div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                        <strong><ShieldCheck className="inline w-4 h-4 mr-2"/> Rumah Sakit:</strong> Mengawasi peralatan medis, sistem listrik, ruang obat.
                     </div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                        <strong><Settings2 className="inline w-4 h-4 mr-2"/> Industri Manufaktur:</strong> Mendeteksi gangguan mesin, overheating, getaran.
                     </div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                        <strong><Server className="inline w-4 h-4 mr-2"/> Data Center:</strong> Mengawasi suhu ruang server, kelembaban, sistem pendingin.
                     </div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                        <strong><Home className="inline w-4 h-4 mr-2"/> Pergudangan & Infrastruktur:</strong> Menjaga kondisi penyimpanan produk dan fasilitas publik.
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="font-bold text-[#0a2558] text-xl mb-4 border-b border-gray-200 pb-2">Keunggulan Solusi EWS</h3>
                  <ul className="space-y-4">
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-red-100 rounded text-red-600 h-fit"><Activity className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Monitoring 24/7 & Notifikasi Cepat</strong>
                            <span className="text-sm text-gray-600">Sistem bekerja terus-menerus. Peringatan otomatis dikirim cepat saat ada anomali.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-red-100 rounded text-red-600 h-fit"><Settings2 className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Fleksibel & Integrasi Luas</strong>
                            <span className="text-sm text-gray-600">Mudah dikustomisasi parameter alarmnya. Mampu terhubung sensor, IoT, BMS, dan SCADA.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-red-100 rounded text-red-600 h-fit"><ShieldCheck className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Dukungan Teknis Profesional</strong>
                            <span className="text-sm text-gray-600">Tim siap membantu mulai perencanaan, integrasi hingga pemeliharaan sistem berkelanjutan.</span>
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
      
      {/* CTA Konsultasi */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">Hubungi PT. Panca Prima Wijaya</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             Konsultasikan kebutuhan Early Warning System (EWS) Anda bersama tim profesional kami dan dapatkan solusi monitoring terintegrasi untuk keamanan fasilitas Anda.
          </p>
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base">
            KONSULTASI SEKARANG
          </a>
        </div>
      </section>

    </div>
  );
}
