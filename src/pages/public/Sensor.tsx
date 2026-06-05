import React, { useState } from 'react';
import { ShieldCheck, Activity, Building2, Signal, Cpu, ArrowRight, CheckCircle2, Factory, Settings, AlertCircle, Network, Zap, Layers, Headset, MapPin, Award } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';

import { TrustedBy } from '../../components/TrustedBy';

export default function Sensor() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title="BMS, EWS, RTMS & Sensor Gempa Toyo | PT. Panca Prima Wijaya"
        description="Solusi BMS, EWS, RTMS & Sensor Gempa Toyo untuk Gedung Modern dan Industri. Integrasi Sistem Monitoring dan Keselamatan Bangunan Berstandar Profesional."
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            SOLUSI SMART BUILDING
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight uppercase">
            Perusahaan Automasi Building <br/>
            <span className="text-blue-400">#terlengkap.</span>
          </h1>
          
          <div className="pl-4 border-l-4 border-blue-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              "PT. Panca Prima Wijaya menyediakan solusi Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), dan Sensor Gempa Toyo untuk gedung, pabrik, rumah sakit, hotel, data center, dan fasilitas industri modern."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:w-auto bg-[#0066cc] hover:bg-blue-600 text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center"
            >
              KONSULTASI GRATIS
            </button>
            <Link to="/katalog?filter=sensor" className="w-full sm:w-auto bg-transparent border-2 border-white/50 hover:border-white text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center">
              LIHAT PRODUK
            </Link>
          </div>

          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya" className="w-[150px] lg:w-[200px] h-auto mx-auto mb-8 object-contain" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 text-center">
            Di era digital dan smart building, pengelolaan gedung tidak lagi dilakukan secara manual. Dibutuhkan sistem terintegrasi yang mampu memonitor kondisi bangunan secara real-time, memberikan peringatan dini terhadap potensi bahaya, serta membantu pengambilan keputusan secara cepat dan akurat.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium text-center">
            PT. Panca Prima Wijaya menyediakan solusi Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), dan Sensor Gempa Toyo untuk gedung, pabrik, rumah sakit, hotel, data center, dan fasilitas industri modern.
          </p>
        </div>
      </section>

      {/* Solutions Cards Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">SOLUSI TERINTEGRASI</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Sistem Automasi Bangunan Terintegrasi</h2>
          </div>

          <div className="grid gap-6">
            
            {/* Card 1: BMS */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">Building Management System (BMS)</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Kendalikan seluruh sistem gedung dalam satu dashboard. Solusi otomatisasi gedung yang mengintegrasikan berbagai perangkat ke dalam satu pusat kontrol.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-red-900 mb-3 border-b border-red-200 pb-2">MASALAH YANG DIHADAPI</p>
                  <div className="space-y-2 text-xs text-red-800">
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Konsumsi energi yang tinggi</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Biaya operasional yang terus meningkat</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Monitoring sistem masih dilakukan secara manual</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Kerusakan peralatan sulit terdeteksi sejak dini</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Data operasional tersebar di berbagai sistem</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Respon terhadap gangguan dan alarm kurang cepat</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Sulit mengelola dan mengawasi seluruh fasilitas gedung secara terpusat</span></div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">MANFAAT UTAMA BMS</p>
                  <div className="space-y-2 text-xs text-blue-800">
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Efisiensi energi optimal</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Mengurangi biaya operasional</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Monitoring 24 jam real-time</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Maintenance preventif</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Meningkatkan keamanan gedung</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Integrasi seluruh sistem dalam satu dashboard</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Respon gangguan lebih cepat</span></div>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/sensor/building-management-system"
                className="inline-flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-[#06183b] text-white px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
              >
                Lihat Detail <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: EWS */}
            <div className="bg-[#0a2558] text-white p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Activity className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Signal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Early Warning System (EWS)</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  Sistem peringatan dini gempa untuk perlindungan maksimal. Mendeteksi aktivitas seismik lebih awal untuk mitigasi sebelum dampak dirasakan.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-950/40 p-4 rounded-lg backdrop-blur-sm border border-red-500/20">
                    <p className="text-xs font-bold text-red-200 mb-3 border-b border-red-500/20 pb-2">MASALAH YANG DIHADAPI</p>
                    <div className="space-y-2 text-xs text-white">
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Tidak adanya peringatan dini sebelum gempa dirasakan</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Risiko keterlambatan proses evakuasi</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Potensi kerusakan aset dan infrastruktur yang tinggi</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Sulit melakukan respon darurat secara cepat</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Kurangnya integrasi antara sensor dan sistem alarm</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Minimnya monitoring aktivitas seismik secara real-time</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">Tingginya risiko keselamatan bagi penghuni dan pekerja</span></div>
                    </div>
                  </div>
                  <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-bold text-white mb-3 border-b border-white/20 pb-2">MANFAAT EWS</p>
                    <div className="space-y-2 text-xs text-blue-50">
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Deteksi dini aktivitas seismik</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Integrasi dengan alarm dan sistem gedung</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Prosedur evakuasi otomatis</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Monitoring berbasis cloud 24/7</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Notifikasi cepat dan real-time</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Mendukung mitigasi risiko bencana</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">Meningkatkan keselamatan penghuni dan aset gedung</span></div>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/sensor/early-warning-system"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0a2558] px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
                >
                  Lihat Detail <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: RTMS */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">Real Time Monitoring System (RTMS)</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Monitoring data secara langsung dan akurat. Pemantauan kondisi peralatan, struktur bangunan, dan lingkungan operasional secara real-time.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">PARAMETER MONITOR</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Getaran struktur</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Temperatur & kelembaban</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Konsumsi energi</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Kondisi lingkungan</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Tegangan listrik</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Arus listrik</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Frekuensi listrik</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Faktor daya</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Kualitas udara</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Tekanan udara</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Ketinggian muka air</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Curah hujan</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Pergeseran struktur</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">Status operasional peralatan dan mesin</span></div>
                </div>
              </div>

              <Link 
                to="/sensor/real-time-monitoring-system-rtms"
                className="inline-flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-[#06183b] text-white px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
              >
                Lihat Detail <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 4: Sensor Toyo */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#0a2558] transition-all hover:shadow-md">
               <div className="mb-6">
                 <img src="https://ik.imagekit.io/cej2dcwlx/logo%20Toyo%20(1).png" alt="Toyo Automation" className="w-[80px] h-[80px] object-contain" />
               </div>
               <h3 className="text-xl font-bold text-[#0a2558] mb-3">Sensor Gempa Canggih Toyo</h3>
               <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                 Teknologi deteksi gempa presisi tinggi dari Jepang. Dirancang untuk memberikan deteksi cepat, akurat, dan stabil pada berbagai jenis bangunan.
               </p>
               
               <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">APLIKASI</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>Gedung perkantoran & apartemen</li>
                     <li>Rumah sakit & data center</li>
                     <li>Pabrik & kawasan industri</li>
                     <li>Infrastruktur publik</li>
                     <li>Bandara & pelabuhan</li>
                     <li>Pusat perbelanjaan & hotel</li>
                     <li>Kampus & fasilitas pendidikan</li>
                   </ul>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">KEUNGGULAN</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>Akurasi tinggi & respon cepat</li>
                     <li>Integrasi BMS & EWS</li>
                     <li>Mendukung evakuasi otomatis</li>
                     <li>Cocok untuk retrofit maupun gedung baru</li>
                     <li>Monitoring real-time berbasis cloud</li>
                     <li>Skalabel untuk berbagai jenis fasilitas</li>
                     <li>Mudah diintegrasikan dengan sistem eksisting</li>
                   </ul>
                 </div>
               </div>

               <div className="mt-8 mb-6 relative w-full aspect-video rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
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

               <Link 
                 to="/sensor/sensor-gempa"
                 className="inline-flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-[#06183b] text-white px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto mt-6"
               >
                 Lihat Detail <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            {/* Card 5: Part Lift */}
            <div className="bg-[#0a2558] text-white p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Settings className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Part Lift Terlengkap</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  Kami menyediakan berbagai macam spare part lift terlengkap untuk semua merk elevator dan eskalator dengan kualitas terjamin.
                </p>
                
                <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 mb-6">
                  <p className="text-xs font-bold text-white mb-3 border-b border-white/20 pb-2">LAYANAN SPARE PART</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-blue-50">
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Semua merk lift & eskalator</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Kualitas original dan bergaransi</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Harga kompetitif</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Stok lengkap dan ready</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Pengiriman cepat ke seluruh Indonesia</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Dukungan teknis profesional</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Tersedia part baru maupun replacement</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">Solusi pengadaan spare part satu pintu (one-stop solution)</span></div>
                  </div>
                </div>

                <Link 
                  to="/sensor/sparepart-lift-terlengkap"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0a2558] px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
                >
                  Lihat Part Lift <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Keunggulan Kami List Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">MENGAPA MEMILIH KAMI</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">Keunggulan PT. Panca Prima Wijaya</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Cpu className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Teknologi Terkini</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Menggunakan teknologi monitoring, IoT, otomasi, dan dashboard digital modern yang mendukung kebutuhan industri 4.0 dan smart building.</p>
            </div>
            
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Settings className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Solusi Custom Sesuai Kebutuhan</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Setiap proyek dirancang berdasarkan kebutuhan spesifik pelanggan, sehingga solusi yang diterapkan lebih efektif dan memberikan nilai investasi yang maksimal.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Activity className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Monitoring Real-Time 24/7</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Memungkinkan pemantauan kondisi fasilitas, peralatan, dan operasional secara real-time selama 24 jam dengan notifikasi otomatis saat terjadi anomali.</p>
            </div>
            
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Network className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Integrasi Multi-Platform</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Mampu terintegrasi dengan BMS, SCADA, RTMS, EWS, PLC, sensor IoT, Fire Alarm System, Elevator Monitoring, hingga sistem pihak ketiga lainnya.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Produk dan Perangkat Berkualitas</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Menggunakan perangkat dan komponen berkualitas tinggi dari brand terpercaya untuk menjamin akurasi, stabilitas, dan keandalan sistem.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Efisiensi Operasional dan Energi</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Membantu perusahaan mengoptimalkan penggunaan energi, mengurangi downtime, meningkatkan produktivitas, dan menekan biaya operasional.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Layers className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">One Stop Solution</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Mulai dari konsultasi, desain sistem, pengadaan perangkat, instalasi, integrasi, commissioning, training, hingga maintenance tersedia dalam satu layanan terpadu.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Headset className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Respon Cepat dan Profesional</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Tim support siap memberikan respon cepat terhadap kebutuhan pelanggan untuk meminimalkan gangguan operasional dan menjaga kontinuitas bisnis.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <MapPin className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Jangkauan Layanan Nasional</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Melayani kebutuhan proyek untuk gedung, industri, rumah sakit, data center, pergudangan, dan infrastruktur di berbagai wilayah Indonesia.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Award className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Distributor Resmi dan Mitra Teknologi Terpercaya</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Didukung kerja sama dengan berbagai principal dan produsen teknologi terkemuka sehingga pelanggan mendapatkan produk original, garansi resmi, dan dukungan teknis yang jelas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Konsultasi - Blue version instead of red */}
      <section id="konsultasi" className="py-12 sm:py-20 bg-[#0066cc] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          
          <h2 className="text-2xl sm:text-4xl font-black mb-4 uppercase tracking-tight">Hubungi Kami Sekarang</h2>
          
          <div className="max-w-2xl mx-auto border-t border-b border-white/20 py-6 my-6">
             <p className="text-sm sm:text-base text-blue-50 font-medium leading-relaxed">
              Butuh solusi monitoring gedung dan sistem keselamatan modern? PT. Panca Prima Wijaya siap membantu implementasi BMS, EWS, RTMS, dan Sensor Gempa Toyo.
            </p>
          </div>
          
          <p className="text-xs text-blue-100 mb-8 max-w-xl mx-auto">
            Dapatkan konsultasi gratis, survey lokasi, dan penawaran terbaik sesuai kebutuhan proyek Anda.
          </p>
          
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-[#0066cc] px-6 sm:px-10 py-3 sm:py-4 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto">
            KONSULTASI GRATIS <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
