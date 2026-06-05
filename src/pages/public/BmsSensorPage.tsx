import React from 'react';
import { ShieldCheck, Activity, Target, Zap, Server, Settings2, BarChart3, Factory } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';

export default function BmsSensorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="Building Management System (BMS) Terintegrasi | PT. Panca Prima Wijaya"
        description="PT. Panca Prima Wijaya menyediakan solusi Building Management System (BMS), RTMS, EWS, Energy Monitoring System, dan Smart Building untuk monitoring serta pengelolaan gedung secara real-time."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            MANAJEMEN & MONITORING TERINTEGRASI
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Building Management System (BMS) <br />
            <span className="text-blue-400">Terintegrasi.</span>
          </h1>
          
          <div className="pl-4 border-l-4 border-blue-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "Solusi Building Management System (BMS) Profesional dari PT. Panca Prima Wijaya untuk Monitoring dan Pengelolaan Gedung Modern secara Real-time."
            </p>
          </div>
          
          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            Di era digital saat ini, pengelolaan gedung tidak lagi dilakukan secara manual. Dengan penerapan <strong>Building Management System (BMS)</strong>, seluruh sistem operasional gedung dapat dipantau, dikontrol, dan dianalisis secara real-time melalui satu platform terintegrasi.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <strong>PT. Panca Prima Wijaya</strong> hadir sebagai perusahaan penyedia solusi Building Management System (BMS), Real-Time Monitoring System (RTMS), Early Warning System (EWS), dan berbagai teknologi smart building yang dirancang untuk meningkatkan efisiensi operasional, keamanan, serta produktivitas fasilitas Anda.
          </p>
        </div>
      </section>

      {/* Apa Itu BMS */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Apa Itu Building Management System (BMS)?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Sistem terintegrasi yang digunakan untuk mengontrol dan memonitor berbagai perangkat dan fasilitas dalam sebuah bangunan secara otomatis.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 mb-6 font-medium">Melalui BMS, pengelola gedung dapat mengawasi berbagai sistem penting seperti:</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-blue-500" /> Sistem kelistrikan</div>
                <div className="flex items-center gap-3"><Settings2 className="w-5 h-5 text-blue-500" /> HVAC (Heating, Ventilation, AC)</div>
                <div className="flex items-center gap-3"><Target className="w-5 h-5 text-blue-500" /> Sistem pencahayaan</div>
                <div className="flex items-center gap-3"><Activity className="w-5 h-5 text-blue-500" /> Pompa air & Genset</div>
                <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-blue-500" /> Fire Alarm & Security System</div>
                <div className="flex items-center gap-3"><BarChart3 className="w-5 h-5 text-blue-500" /> Monitoring energi</div>
             </div>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">Mengapa Building Management System Penting?</h2>
            
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">1. Meningkatkan Efisiensi Operasional</h3>
                 <p className="text-sm text-gray-600">BMS memungkinkan pengelolaan fasilitas secara otomatis sehingga mengurangi pekerjaan manual dan meningkatkan efisiensi tenaga kerja.</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">2. Menghemat Konsumsi Energi</h3>
                 <p className="text-sm text-gray-600">Monitoring penggunaan listrik secara real-time membantu mengidentifikasi pemborosan energi sehingga biaya operasional dapat ditekan secara signifikan.</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">3. Meningkatkan Keamanan Gedung</h3>
                 <p className="text-sm text-gray-600">Sistem dapat memberikan notifikasi otomatis apabila terjadi gangguan, kerusakan, atau kondisi darurat yang memerlukan tindakan segera.</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">4. Mempermudah Monitoring</h3>
                 <p className="text-sm text-gray-600">Seluruh perangkat dan sistem dalam gedung dapat dipantau melalui satu dashboard terintegrasi tanpa perlu melakukan pengecekan secara manual ke setiap lokasi.</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1 sm:col-span-2">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">5. Mendukung Smart Building</h3>
                 <p className="text-sm text-gray-600">BMS menjadi fondasi utama dalam implementasi konsep smart building dan digitalisasi fasilitas modern.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Solusi Kami */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">Solusi Building Management System PT. Panca Prima Wijaya</h2>
            <p className="text-blue-100 text-center mb-12">Menyediakan layanan konsultasi, perancangan, implementasi, integrasi, dan maintenance Building Management System sesuai kebutuhan di masing-masing industri.</p>
            
            <div className="grid gap-6">
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <h3 className="font-bold text-xl text-white mb-2">Building Management System (BMS)</h3>
                   <p className="text-sm text-blue-100">Solusi pengelolaan dan kontrol gedung secara terpusat yang memungkinkan monitoring seluruh sistem operasional melalui satu platform.</p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <h3 className="font-bold text-xl text-white mb-3">Real-Time Monitoring System (RTMS)</h3>
                   <p className="text-sm text-blue-100 mb-4">Memungkinkan pengguna memperoleh data operasional secara langsung untuk parameter penting seperti konsumsi energi, temperatur, kelembaban, tekanan, kualitas udara, hingga performa peralatan.</p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                   <h3 className="font-bold text-xl text-white mb-3">Early Warning System (EWS)</h3>
                   <p className="text-sm text-blue-100 mb-4">Sistem peringatan dini otomatis ketika terjadi kondisi abnormal seperti overload listrik, kenaikan temperatur ekstrem, kebocoran sistem, gangguan peralatan, hingga potensi kebakaran.</p>
                </div>
            </div>
         </div>
      </section>

      {/* Industri yang Cocok & Keunggulan */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">Keunggulan Kami</h2>
                  <ul className="space-y-4">
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><ShieldCheck className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Solusi Terintegrasi & Tim Berpengalaman</strong>
                            <span className="text-sm text-gray-600">One-stop solution dari konsultasi hingga maintenance didukung tenaga ahli tersertifikasi.</span>
                         </div>
                     </li>
                     <li className="flex gap-3">
                         <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Activity className="w-4 h-4"/></div>
                         <div>
                            <strong className="block text-gray-900 text-sm mb-1">Teknologi Modern & Scalable</strong>
                            <span className="text-sm text-gray-600">Platform terkini yang dapat dikustomisasi dan dikembangkan seiring pertumbuhan fasilitas Anda.</span>
                         </div>
                     </li>
                  </ul>
               </div>
               
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">Aplikasi Industri</h2>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Factory className="w-4 h-4 text-gray-400"/> Gedung Perkantoran</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Server className="w-4 h-4 text-gray-400"/> Data Center</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gray-400"/> Rumah Sakit</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Factory className="w-4 h-4 text-gray-400"/> Pabrik / Manufaktur</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Target className="w-4 h-4 text-gray-400"/> Mall & Hotel</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-gray-400"/> Kawasan Industri</div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* CTA Konsultasi */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">Hubungi PT. Panca Prima Wijaya</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             Konsultasikan kebutuhan Building Management System (BMS), RTMS, EWS, dan solusi monitoring lainnya bersama tim profesional kami dan tingkatkan efisiensi operasional.
          </p>
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base">
            KONSULTASI SEKARANG
          </a>
        </div>
      </section>

    </div>
  );
}
