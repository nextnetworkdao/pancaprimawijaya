import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Activity, Building2, Signal, Cpu, ArrowRight, CheckCircle2, Factory, Settings, AlertCircle, Network, Zap, Layers, Headset, MapPin, Award } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

import { TrustedBy } from '../../components/TrustedBy';
import { AutoLinkText } from '../../components/AutoLinkText';

export default function Sensor() {
  const { isEn, langLink } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasPlayed && videoRef.current) {
        videoRef.current.play().catch(e => console.log('Auto-play prevented', e));
        setHasPlayed(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasPlayed]);

  const faqItems = [
    {
      qId: "What is Building Management System (BMS)?",
      qIdEn: "What is a Building Management System (BMS)?",
      qIn: "Apa itu Building Management System (BMS)?",
      aIdEn: "A Building Management System (BMS) is an integrated system used to monitor, control, and optimize various building facilities such as HVAC, power, lighting, pumps, elevators, security systems, and other utilities through a centralized dashboard.",
      aIn: "Building Management System (BMS) adalah sistem terintegrasi yang digunakan untuk memonitor, mengontrol, dan mengoptimalkan berbagai fasilitas gedung seperti HVAC, listrik, pencahayaan, pompa, lift, sistem keamanan, dan utilitas lainnya melalui satu dashboard terpusat."
    },
    {
      qIdEn: "What are the main benefits of using a Building Management System?",
      qIn: "Apa manfaat utama menggunakan Building Management System?",
      aIdEn: "BMS helps increase energy efficiency, reduce operational costs, ease facilities monitoring, speed up response to disruptions, and support preventive maintenance to extend equipment lifespan.",
      aIn: "BMS membantu meningkatkan efisiensi energi, mengurangi biaya operasional, mempermudah monitoring fasilitas, mempercepat respon terhadap gangguan, serta mendukung maintenance preventif untuk memperpanjang usia peralatan."
    },
    {
      qIdEn: "What is an Early Warning System (EWS)?",
      qIn: "Apa itu Early Warning System (EWS)?",
      aIdEn: "An Early Warning System (EWS) is a system designed to detect potential hazards such as seismic activity (earthquakes) and provide early warnings so mitigation and evacuation can be carried out more effectively.",
      aIn: "Early Warning System (EWS) adalah sistem peringatan dini yang dirancang untuk mendeteksi potensi bahaya seperti aktivitas seismik (gempa bumi) dan memberikan notifikasi lebih cepat sehingga proses mitigasi dan evakuasi dapat dilakukan lebih efektif."
    },
    {
      qIdEn: "How does the Toyo Earthquake Sensor work?",
      qIn: "Bagaimana cara kerja Sensor Gempa Toyo?",
      aIdEn: "The Toyo Earthquake Sensor detects seismic waves with high accuracy and sends real-time data to the monitoring system. The system can be integrated with alarms, automated notifications, and evacuation procedures to enhance the safety of building occupants and assets.",
      aIn: "Sensor Gempa Toyo mendeteksi gelombang seismik dengan tingkat akurasi tinggi dan mengirimkan data secara real-time ke sistem monitoring. Sistem dapat diintegrasikan dengan alarm, notifikasi otomatis, hingga prosedur evakuasi untuk meningkatkan keselamatan penghuni dan aset."
    },
    {
      qIdEn: "What is a Real-Time Monitoring System (RTMS)?",
      qIn: "Apa itu Real Time Monitoring System (RTMS)?",
      aIdEn: "RTMS is a sensor-based monitoring system that enables real-time oversight of facility conditions, building structure, utilities, and equipment through a digital dashboard accessible at any time.",
      aIn: "RTMS adalah sistem pemantauan berbasis sensor yang memungkinkan pengawasan kondisi fasilitas, struktur bangunan, utilitas, dan peralatan secara real-time melalui dashboard digital yang dapat diakses kapan saja."
    },
    {
      qIdEn: "What parameters can be monitored by RTMS?",
      qIn: "Parameter apa saja yang dapat dimonitor oleh RTMS?",
      aIdEn: "RTMS can monitor various parameters such as energy consumption, temperature, humidity, air quality, structural vibration, voltage, current, frequency, power factor, air pressure, rainfall, water level, and machines/equipment operational status.",
      aIn: "RTMS dapat memonitor berbagai parameter seperti konsumsi energi, temperatur, kelembaban, kualitas udara, getaran struktur, tegangan listrik, arus listrik, frekuensi, faktor daya, tekanan udara, curah hujan, ketinggian muka air, hingga kondisi operasional mesin dan peralatan."
    },
    {
      qIdEn: "Can the system be integrated with existing equipment?",
      qIn: "Apakah sistem dapat diintegrasikan dengan perangkat yang sudah ada?",
      aIdEn: "Yes. PT. Panca Prima Wijaya's solutions can be integrated with various existing systems such as SCADA, PLC, Fire Alarm Systems, Elevator Monitoring Systems, IoT Sensors, EWS, RTMS, and other third-party platforms.",
      aIn: "Ya. Solusi PT. Panca Prima Wijaya dapat diintegrasikan dengan berbagai sistem eksisting seperti SCADA, PLC, Fire Alarm System, Elevator Monitoring System, IoT Sensor, EWS, RTMS, dan platform pihak ketiga lainnya."
    },
    {
      qIdEn: "What industries are suitable for PT. Panca Prima Wijaya solutions?",
      qIn: "Industri apa saja yang cocok menggunakan solusi PT. Panca Prima Wijaya?",
      aIdEn: "Our solutions are widely used in office buildings, apartments, hospitals, hotels, data centers, factories, industrial estates, airports, ports, shopping malls, universities, warehouses, and various other infrastructural facilities.",
      aIn: "Solusi kami banyak digunakan pada gedung perkantoran, apartemen, rumah sakit, hotel, data center, pabrik, kawasan industri, bandara, pelabuhan, pusat perbelanjaan, kampus, gudang, dan berbagai fasilitas infrastruktur lainnya."
    },
    {
      qIdEn: "Does PT. Panca Prima Wijaya serve projects across Indonesia?",
      qIn: "Apakah PT. Panca Prima Wijaya melayani proyek di seluruh Indonesia?",
      aIdEn: "Yes. We serve consulting, procurement, installation, integration, commissioning, training, and maintenance needs for various regions in Indonesia.",
      aIn: "Ya. Kami melayani kebutuhan konsultasi, pengadaan, instalasi, integrasi, commissioning, training, hingga maintenance untuk berbagai wilayah di Indonesia."
    },
    {
      qIdEn: "Is consulting service available before the project begins?",
      qIn: "Apakah tersedia layanan konsultasi sebelum proyek dimulai?",
      aIdEn: "Indeed. Our team is ready to provide technical consultation, site surveys, requirements analysis, and recommendations for the best solutions according to the facility's characteristics and customer's business objectives.",
      aIn: "Tentu. Tim kami siap memberikan konsultasi teknis, survey lokasi, analisis kebutuhan, dan rekomendasi solusi terbaik sesuai karakteristik fasilitas dan tujuan bisnis pelanggan."
    },
    {
      qIdEn: "Can the system be accessed online?",
      qIn: "Apakah sistem dapat diakses secara online?",
      aIdEn: "Yes. Most of the monitoring and automation solutions we provide support web-based and cloud-based access so users can monitor facility conditions in real-time from various locations.",
      aIn: "Ya. Sebagian besar solusi monitoring dan automasi yang kami sediakan mendukung akses berbasis web maupun cloud sehingga pengguna dapat memantau kondisi fasilitas secara real-time dari berbagai lokasi."
    },
    {
      qIdEn: "How does the system help reduce operational costs?",
      qIn: "Bagaimana sistem membantu mengurangi biaya operasional?",
      aIdEn: "Through automated monitoring, real-time data analysis, energy use optimization, and early fault detection, companies can significantly reduce energy waste, minimize downtime, and improve operational efficiency.",
      aIn: "Melalui monitoring otomatis, analisis data real-time, optimasi penggunaan energi, dan deteksi dini gangguan, perusahaan dapat mengurangi pemborosan energi, meminimalkan downtime, dan meningkatkan efisiensi operasional secara signifikan."
    },
    {
      qIdEn: "Does PT. Panca Prima Wijaya provide after-sales services?",
      qIn: "Apakah PT. Panca Prima Wijaya menyediakan layanan purna jual?",
      aIdEn: "Yes. We provide technical support, periodic maintenance, troubleshooting, system upgrades, as well as user training to ensure the system continues to run optimally in the long term.",
      aIn: "Ya. Kami menyediakan dukungan teknis, maintenance berkala, troubleshooting, upgrade sistem, serta pelatihan pengguna untuk memastikan sistem tetap berjalan optimal dalam jangka panjang."
    },
    {
      qIdEn: "Are the devices and products used covered by warranty?",
      qIn: "Apakah produk dan perangkat yang digunakan bergaransi?",
      aIdEn: "Yes. We use quality products from trusted brands and principals equipped with official warranties and clear technical support.",
      aIn: "Ya. Kami menggunakan perangkat berkualitas dari brand dan principal terpercaya yang dilengkapi garansi resmi serta dukungan teknis yang jelas."
    },
    {
      qIdEn: "Why choose PT. Panca Prima Wijaya?",
      qIn: "Mengapa memilih PT. Panca Prima Wijaya?",
      aIdEn: "PT. Panca Prima Wijaya is a trusted partner for Building Management System, Early Warning System, Real-Time Monitoring System, and industrial sensor solutions. With experience, latest technologies, a one-stop-shop approach, professional technical support, and broad integration capabilities, we help customers enhance the efficiency, safety, and operational reliability of modern facilities.",
      aIn: "PT. Panca Prima Wijaya merupakan mitra terpercaya untuk solusi Building Management System, Early Warning System, Real Time Monitoring System, dan teknologi sensor industri. Dengan pengalaman, teknologi terkini, layanan one-stop solution, dukungan teknis profesional, serta kemampuan integrasi yang luas, kami membantu pelanggan meningkatkan efisiensi, keamanan, dan keandalan operasional fasilitas modern."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title={isEn ? "BMS, EWS, RTMS & Toyo Earthquake Sensor | PT. Panca Prima Wijaya" : "BMS, EWS, RTMS & Sensor Gempa Toyo | PT. Panca Prima Wijaya"}
        description={isEn 
          ? "Toyo BMS, EWS, RTMS & Earthquake Sensor solutions for modern buildings and industry. Professional-grade integrated monitoring systems."
          : "Solusi BMS, EWS, RTMS & Sensor Gempa Toyo untuk Gedung Modern dan Industri. Integrasi Sistem Monitoring dan Keselamatan Bangunan Berstandar Profesional."}
        type="website"
        canonical={typeof window !== 'undefined' ? window.location.origin + langLink('/sensor') : ''}
        keywords={isEn ? "earthquake sensor, toyo automation, bms, ews, rtms, building monitoring" : "sensor gempa, toyo automation, bms, ews, rtms, monitoring gedung"}
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            {isEn ? "SMART BUILDING SOLUTIONS" : "SOLUSI SMART BUILDING"}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight uppercase">
            {isEn ? "Building Automation Company" : "Perusahaan Automasi Building"} <br/>
            <span className="text-blue-400">{isEn ? "#mostcomplete." : "#terlengkap."}</span>
          </h1>
          
          <div className="pl-4 border-l-4 border-blue-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              <AutoLinkText>
                {isEn 
                  ? '"PT. Panca Prima Wijaya provides Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), and Toyo Earthquake Sensor solutions for modern buildings, factories, hospitals, hotels, data centers, and advanced industrial facilities."'
                  : '"PT. Panca Prima Wijaya menyediakan solusi Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), dan Sensor Gempa Toyo untuk gedung, pabrik, rumah sakit, hotel, data center, dan fasilitas industri modern."'}
              </AutoLinkText>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:w-auto bg-[#0066cc] hover:bg-blue-600 text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center"
            >
              {isEn ? "FREE CONSULTATION" : "KONSULTASI GRATIS"}
            </button>
            <Link to={langLink("/sensor/produk?filter=sensor")} className="w-full sm:w-auto bg-transparent border-2 border-white/50 hover:border-white text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center">
              {isEn ? "VIEW PRODUCTS" : "LIHAT PRODUK"}
            </Link>
          </div>

          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <video 
            ref={videoRef}
            src="https://ik.imagekit.io/cej2dcwlx/paca_transparent.webm" 
            muted 
            playsInline 
            className="w-full max-w-48 h-auto mx-auto mb-8 bg-transparent"
          ></video>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 text-center">
            <AutoLinkText>
              {isEn 
                ? "In the digital and smart building era, building management is no longer manual. An integrated system is needed to monitor building conditions in real-time, provide early warnings of potential hazards, and assist in fast and accurate decision-making."
                : "Di era digital dan smart building, pengelolaan gedung tidak lagi dilakukan secara manual. Dibutuhkan sistem terintegrasi yang mampu memonitor kondisi bangunan secara real-time, memberikan peringatan dini terhadap potensi bahaya, serta membantu pengambilan keputusan secara cepat dan akurat."}
            </AutoLinkText>
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium text-center">
            <AutoLinkText>
              {isEn 
                ? "PT. Panca Prima Wijaya provides Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), and Toyo Earthquake Sensor solutions for modern buildings, factories, hospitals, hotels, data centers, and advanced industrial facilities."
                : "PT. Panca Prima Wijaya menyediakan solusi Building Management System (BMS), Early Warning System (EWS), Real Time Monitoring System (RTMS), dan Sensor Gempa Toyo untuk gedung, pabrik, rumah sakit, hotel, data center, dan fasilitas industri modern."}
            </AutoLinkText>
          </p>
        </div>
      </section>

      {/* Solutions Cards Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{isEn ? "INTEGRATED SOLUTIONS" : "SOLUSI TERINTEGRASI"}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{isEn ? "Integrated Building Automation Systems" : "Sistem Automasi Bangunan Terintegrasi"}</h2>
          </div>

          <div className="grid gap-6">
            
            {/* Card 1: BMS */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <div className="w-[72px] h-[72px] bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 overflow-hidden p-2">
                <img src="https://cdn-icons-gif.flaticon.com/14164/14164976.gif" alt="Building Management System" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">{isEn ? "Building Management System (BMS)" : "Building Management System (BMS)"}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                <AutoLinkText>{isEn ? "Control all building systems in one dashboard. Automation solutions integrating various devices into a single control center." : "Kendalikan seluruh sistem gedung dalam satu dashboard. Solusi otomatisasi gedung yang mengintegrasikan berbagai perangkat ke dalam satu pusat kontrol."}</AutoLinkText>
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-red-900 mb-3 border-b border-red-200 pb-2">{isEn ? "PROBLEMS FACED" : "MASALAH YANG DIHADAPI"}</p>
                  <div className="space-y-2 text-xs text-red-800">
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "High energy consumption" : "Konsumsi energi yang tinggi"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Constantly rising operational costs" : "Biaya operasional yang terus meningkat"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "System monitoring is still done manually" : "Monitoring sistem masih dilakukan secara manual"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Early stage equipment failure is hard to detect" : "Kerusakan peralatan sulit terdeteksi sejak dini"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Operational data is scattered across systems" : "Data operasional tersebar di berbagai sistem"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Response to disturbances and alarms is slow" : "Respon terhadap gangguan dan alarm kurang cepat"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Difficult to manage and supervise all facilities centrally" : "Sulit mengelola dan mengawasi seluruh fasilitas gedung secara terpusat"}</span></div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">{isEn ? "MAIN BENEFITS OF BMS" : "MANFAAT UTAMA BMS"}</p>
                  <div className="space-y-2 text-xs text-blue-800">
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Optimal energy efficiency" : "Efisiensi energi optimal"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Reduce operational costs" : "Mengurangi biaya operasional"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "24/7 real-time monitoring" : "Monitoring 24 jam real-time"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Preventive maintenance" : "Maintenance preventif"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Enhance building safety" : "Meningkatkan keamanan gedung"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Integration of all systems in one dashboard" : "Integrasi seluruh sistem dalam satu dashboard"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Faster response to disturbances" : "Respon gangguan lebih cepat"}</span></div>
                  </div>
                </div>
              </div>
              
              <Link 
                to={langLink("/sensor/building-management-system")}
                className="inline-flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-[#06183b] text-white px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
              >
                {isEn ? "View Details" : "Lihat Detail"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: EWS */}
            <div className="bg-[#0a2558] text-white p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Activity className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-[72px] h-[72px] bg-white rounded-lg flex items-center justify-center mb-6 overflow-hidden p-2 shadow-md">
                  <img src="https://cdn-icons-gif.flaticon.com/17643/17643257.gif" alt="Early Warning System" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="text-xl font-bold mb-3">Early Warning System (EWS)</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  <AutoLinkText>{isEn ? "Earthquake early warning system for maximum protection. Detects seismic activity early for mitigation before impacts are felt." : "Sistem peringatan dini gempa untuk perlindungan maksimal. Mendeteksi aktivitas seismik lebih awal untuk mitigasi sebelum dampak dirasakan."}</AutoLinkText>
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-950/40 p-4 rounded-lg backdrop-blur-sm border border-red-500/20">
                    <p className="text-xs font-bold text-red-200 mb-3 border-b border-red-500/20 pb-2">{isEn ? "PROBLEMS FACED" : "MASALAH YANG DIHADAPI"}</p>
                    <div className="space-y-2 text-xs text-white">
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "No early warning before earthquake is felt" : "Tidak adanya peringatan dini sebelum gempa dirasakan"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Risk of delayed evacuation process" : "Risiko keterlambatan proses evakuasi"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "High potential for asset and infrastructure damage" : "Potensi kerusakan aset dan infrastruktur yang tinggi"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Difficult to conduct emergency response quickly" : "Sulit melakukan respon darurat secara cepat"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Lack of integration between sensors and alarm systems" : "Kurangnya integrasi antara sensor dan sistem alarm"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Minimal real-time seismic activity monitoring" : "Minimnya monitoring aktivitas seismik secara real-time"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "High safety risks for residents and workers" : "Tingginya risiko keselamatan bagi penghuni dan pekerja"}</span></div>
                    </div>
                  </div>
                  <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-bold text-white mb-3 border-b border-white/20 pb-2">{isEn ? "EWS BENEFITS" : "MANFAAT EWS"}</p>
                    <div className="space-y-2 text-xs text-blue-50">
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Early detection of seismic activity" : "Deteksi dini aktivitas seismik"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Integration with alarm and building systems" : "Integrasi dengan alarm dan sistem gedung"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Automated evacuation procedures" : "Prosedur evakuasi otomatis"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "24/7 cloud-based monitoring" : "Monitoring berbasis cloud 24/7"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Fast and real-time alerts" : "Notifikasi cepat dan real-time"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Supports disaster risk mitigation" : "Mendukung mitigasi risiko bencana"}</span></div>
                      <div className="flex items-start gap-2 max-w-sm"><CheckCircle2 className="w-3.5 h-3.5 text-blue-300 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Enhances safety of residents and building assets" : "Meningkatkan keselamatan penghuni dan aset gedung"}</span></div>
                    </div>
                  </div>
                </div>

                <Link 
                  to={langLink("/sensor/early-warning-system")}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0a2558] px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
                >
                  {isEn ? "View Details" : "Lihat Detail"} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: RTMS */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <div className="w-[72px] h-[72px] bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 overflow-hidden p-2">
                <img src="https://cdn-icons-gif.flaticon.com/11681/11681318.gif" alt="Real Time Monitoring System" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">Real Time Monitoring System (RTMS)</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                <AutoLinkText>{isEn ? "Monitor data directly and accurately. Real-time observation of equipment conditions, building structures, and operational environments." : "Monitoring data secara langsung dan akurat. Pemantauan kondisi peralatan, struktur bangunan, dan lingkungan operasional secara real-time."}</AutoLinkText>
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{isEn ? "MONITOR PARAMETERS" : "PARAMETER MONITOR"}</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Structural vibration" : "Getaran struktur"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Temperature & humidity" : "Temperatur & kelembaban"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Energy consumption" : "Konsumsi energi"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Environmental conditions" : "Kondisi lingkungan"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Electrical voltage" : "Tegangan listrik"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Electrical current" : "Arus listrik"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Electrical frequency" : "Frekuensi listrik"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Power factor" : "Faktor daya"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Air quality" : "Kualitas udara"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Air pressure" : "Tekanan udara"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Water level height" : "Ketinggian muka air"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Rainfall" : "Curah hujan"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Structural shift" : "Pergeseran struktur"}</span></div>
                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> <span className="leading-relaxed">{isEn ? "Operational status of equipment and machinery" : "Status operasional peralatan dan mesin"}</span></div>
                </div>
              </div>

              <Link 
                to={langLink("/sensor/real-time-monitoring-system-rtms")}
                className="inline-flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-[#06183b] text-white px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
              >
                {isEn ? "View Details" : "Lihat Detail"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 4: Sensor Toyo */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#0a2558] transition-all hover:shadow-md">
               <div className="mb-6">
                 <img src="https://ik.imagekit.io/cej2dcwlx/logo%20Toyo%20(1).png" alt="Toyo Automation" className="w-[80px] h-[80px] object-contain" />
               </div>
               <h3 className="text-xl font-bold text-[#0a2558] mb-3">{isEn ? "Advanced Toyo Earthquake Sensor" : "Sensor Gempa Canggih Toyo"}</h3>
               <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                 {isEn ? "High-precision earthquake detection technology from Japan. Designed to provide fast, accurate, and stable detection for various building types." : "Teknologi deteksi gempa presisi tinggi dari Jepang. Dirancang untuk memberikan deteksi cepat, akurat, dan stabil pada berbagai jenis bangunan."}
               </p>
               
               <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{isEn ? "APPLICATIONS" : "APLIKASI"}</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>{isEn ? "Office buildings & apartments" : "Gedung perkantoran & apartemen"}</li>
                     <li>{isEn ? "Hospitals & data centers" : "Rumah sakit & data center"}</li>
                     <li>{isEn ? "Factories & industrial estates" : "Pabrik & kawasan industri"}</li>
                     <li>{isEn ? "Public infrastructure" : "Infrastruktur publik"}</li>
                     <li>{isEn ? "Airports & ports" : "Bandara & pelabuhan"}</li>
                     <li>{isEn ? "Shopping malls & hotels" : "Pusat perbelanjaan & hotel"}</li>
                     <li>{isEn ? "Universities & educational facilities" : "Kampus & fasilitas pendidikan"}</li>
                   </ul>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{isEn ? "ADVANTAGES" : "KEUNGGULAN"}</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>{isEn ? "High accuracy & fast response" : "Akurasi tinggi & respon cepat"}</li>
                     <li>{isEn ? "BMS & EWS Integration" : "Integrasi BMS & EWS"}</li>
                     <li>{isEn ? "Supports automated evacuation" : "Mendukung evakuasi otomatis"}</li>
                     <li>{isEn ? "Suitable for retrofit as well as new buildings" : "Cocok untuk retrofit maupun gedung baru"}</li>
                     <li>{isEn ? "Cloud-based real-time monitoring" : "Monitoring real-time berbasis cloud"}</li>
                     <li>{isEn ? "Scalable for various types of facilities" : "Skalabel untuk berbagai jenis fasilitas"}</li>
                     <li>{isEn ? "Easy to integrate with existing systems" : "Mudah diintegrasikan dengan sistem eksisting"}</li>
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
                 to={langLink("/sensor/sensor-gempa")}
                 className="inline-flex items-center justify-center gap-2 bg-[#0a2558] hover:bg-[#06183b] text-white px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto mt-6"
               >
                 {isEn ? "View Details" : "Lihat Detail"} <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            {/* Card 5: Part Lift */}
            <div className="bg-[#0a2558] text-white p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Settings className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-[72px] h-[72px] bg-white rounded-lg flex items-center justify-center mb-6 overflow-hidden p-2 shadow-md">
                  <img src="https://cdn-icons-gif.flaticon.com/15576/15576905.gif" alt="Part Lift" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="text-xl font-bold mb-3">{isEn ? "Most Complete Lift Parts" : "Part Lift Terlengkap"}</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  {isEn ? "We provide a complete range of spare parts for all elevator and escalator brands with guaranteed quality." : "Kami menyediakan berbagai macam spare part lift terlengkap untuk semua merk elevator dan eskalator dengan kualitas terjamin."}
                </p>
                
                <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 mb-6">
                  <p className="text-xs font-bold text-white mb-3 border-b border-white/20 pb-2">{isEn ? "SPARE PART SERVICES" : "LAYANAN SPARE PART"}</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-blue-50">
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "All lift & escalator brands" : "Semua merk lift & eskalator"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "Original quality and under warranty" : "Kualitas original dan bergaransi"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "Competitive price" : "Harga kompetitif"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "Complete and ready stock" : "Stok lengkap dan ready"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "Fast shipping throughout Indonesia" : "Pengiriman cepat ke seluruh Indonesia"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "Professional technical support" : "Dukungan teknis profesional"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "New and replacement parts available" : "Tersedia part baru maupun replacement"}</span></div>
                    <div className="flex items-start gap-2 max-w-sm"><div className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></div> <span className="leading-relaxed">{isEn ? "One-stop spare parts procurement solution" : "Solusi pengadaan spare part satu pintu (one-stop solution)"}</span></div>
                  </div>
                </div>

                <Link 
                  to={langLink("/sensor/sparepart-lift-terlengkap")}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0a2558] px-6 py-3 rounded text-sm font-bold transition-all w-full sm:w-auto"
                >
                  {isEn ? "View Lift Parts" : "Lihat Part Lift"} <ArrowRight className="w-4 h-4" />
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
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{isEn ? "WHY CHOOSE US" : "MENGAPA MEMILIH KAMI"}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{isEn ? "Advantages of PT. Panca Prima Wijaya" : "Keunggulan PT. Panca Prima Wijaya"}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Cpu className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Latest Technology" : "Teknologi Terkini"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Utilizing monitoring technology, IoT, automation, and modern digital dashboards that support the needs of Industry 4.0 and smart buildings." : "Menggunakan teknologi monitoring, IoT, otomasi, dan dashboard digital modern yang mendukung kebutuhan industri 4.0 dan smart building."}</p>
            </div>
            
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Settings className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Customized Solutions" : "Solusi Custom Sesuai Kebutuhan"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Each project is designed based on the customer's specific requirements, making the implemented solution more effective and maximizing investment value." : "Setiap proyek dirancang berdasarkan kebutuhan spesifik pelanggan, sehingga solusi yang diterapkan lebih efektif dan memberikan nilai investasi yang maksimal."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Activity className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "24/7 Real-Time Monitoring" : "Monitoring Real-Time 24/7"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Enables continuous monitoring of facilities, equipment, and operations 24 hours a day with automatic notifications in case of anomalies." : "Memungkinkan pemantauan kondisi fasilitas, peralatan, dan operasional secara real-time selama 24 jam dengan notifikasi otomatis saat terjadi anomali."}</p>
            </div>
            
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Network className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Multi-Platform Integration" : "Integrasi Multi-Platform"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Capable of integrating with BMS, SCADA, RTMS, EWS, PLCs, IoT sensors, Fire Alarm Systems, Elevator Monitoring, and other third-party systems." : "Mampu terintegrasi dengan BMS, SCADA, RTMS, EWS, PLC, sensor IoT, Fire Alarm System, Elevator Monitoring, hingga sistem pihak ketiga lainnya."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Quality Products & Devices" : "Produk dan Perangkat Berkualitas"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Using high-quality equipment and components from trusted brands to guarantee accuracy, stability, and system reliability." : "Menggunakan perangkat dan komponen berkualitas tinggi dari brand terpercaya untuk menjamin akurasi, stabilitas, dan keandalan sistem."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Operational and Energy Efficiency" : "Efisiensi Operasional dan Energi"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Helping companies optimize energy usage, reduce downtime, increase productivity, and lower operational expenses." : "Membantu perusahaan mengoptimalkan penggunaan energi, mengurangi downtime, meningkatkan produktivitas, dan menekan biaya operasional."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Layers className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "One Stop Solution" : "One Stop Solution"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "From consultation, system design, equipment procurement, installation, integration, commissioning, training, to maintenance are available in one integrated service." : "Mulai dari konsultasi, desain sistem, pengadaan perangkat, instalasi, integrasi, commissioning, training, hingga maintenance tersedia dalam satu layanan terpadu."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Headset className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Fast and Professional Response" : "Respon Cepat dan Profesional"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "The support team is ready to respond quickly to customer needs to minimize operational disruptions and maintain business continuity." : "Tim support siap memberikan respon cepat terhadap kebutuhan pelanggan untuk meminimalkan gangguan operasional dan menjaga kontinuitas bisnis."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <MapPin className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "National Service Coverage" : "Jangkauan Layanan Nasional"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Catering to project requirements for buildings, industries, hospitals, data centers, warehouses, and infrastructure across Indonesia." : "Melayani kebutuhan proyek untuk gedung, industri, rumah sakit, data center, pergudangan, dan infrastruktur di berbagai wilayah Indonesia."}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
              <Award className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{isEn ? "Authorized Distributor & Trusted Tech Partner" : "Distributor Resmi dan Mitra Teknologi Terpercaya"}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{isEn ? "Supported by partnerships with leading principals and tech manufacturers, ensuring customers receive original products, official warranties, and reliable technical support." : "Didukung kerja sama dengan berbagai principal dan produsen teknologi terkemuka sehingga pelanggan mendapatkan produk original, garansi resmi, dan dukungan teknis yang jelas."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{isEn ? "COMMON QUESTIONS" : "PERTANYAAN UMUM"}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{isEn ? "Frequently Asked Questions" : "Frequently Asked Questions (FAQ)"}</h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group bg-[#f4f7f6] p-6 rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-[#0a2558] list-none">
                  {isEn ? item.qIdEn : item.qIn}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <p className="text-sm text-gray-600 mt-4 leading-relaxed border-t border-gray-100 pt-4">
                  {isEn ? item.aIdEn : item.aIn}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Konsultasi - Blue version instead of red */}
      <section id="konsultasi" className="py-12 sm:py-20 bg-[#0066cc] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          
          <h2 className="text-2xl sm:text-4xl font-black mb-4 uppercase tracking-tight">{isEn ? "Contact Us Now" : "Hubungi Kami Sekarang"}</h2>
          
          <div className="max-w-2xl mx-auto border-t border-b border-white/20 py-6 my-6">
             <p className="text-sm sm:text-base text-blue-50 font-medium leading-relaxed">
              {isEn ? "Need modern building monitoring and safety solutions? PT. Panca Prima Wijaya is ready to assist with the implementation of BMS, EWS, RTMS, and Toyo Earthquake Sensors." : "Butuh solusi monitoring gedung dan sistem keselamatan modern? PT. Panca Prima Wijaya siap membantu implementasi BMS, EWS, RTMS, dan Sensor Gempa Toyo."}
            </p>
          </div>
          
          <p className="text-xs text-blue-100 mb-8 max-w-xl mx-auto">
            {isEn ? "Get a free consultation, site survey, and the best offer tailored to your project needs." : "Dapatkan konsultasi gratis, survey lokasi, dan penawaran terbaik sesuai kebutuhan proyek Anda."}
          </p>
          
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-[#0066cc] px-6 sm:px-10 py-3 sm:py-4 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto">
            {isEn ? "FREE CONSULTATION" : "KONSULTASI GRATIS"} <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
