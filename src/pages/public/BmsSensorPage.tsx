import React from 'react';
import { ShieldCheck, Activity, Target, Zap, Server, Settings2, BarChart3, Factory } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';
import { AutoLinkText } from '../../components/AutoLinkText';
import { useLanguage } from '../../context/LanguageContext';

export default function BmsSensorPage() {
  const { isEn } = useLanguage();

  const content = isEn ? {
    seoTitle: "Integrated Building Management System (BMS) | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya provides Building Management System (BMS), RTMS, EWS, Energy Monitoring System, and Smart Building solutions for real-time monitoring and building management.",
    badge: "INTEGRATED MANAGEMENT & MONITORING",
    heroTitle: <>Building Management System (BMS) <br /><span className="text-blue-400">Integrated.</span></>,
    heroSub: '"Professional Building Management System (BMS) Solutions from PT. Panca Prima Wijaya for Real-Time and Modern Building Monitoring and Management."',
    introPart1: "In today's digital era, building management is no longer a manual task. With the implementation of a Building Management System (BMS), all operational building systems can be monitored, controlled, and analyzed in real-time through a single integrated platform.",
    introPart2: "PT. Panca Prima Wijaya is here as a leading provider of Building Management System (BMS), Real-Time Monitoring System (RTMS), Early Warning System (EWS), and various smart building technologies designed to enhance operational efficiency, security, and the overall productivity of your facility.",
    whatIsTitle: "What is a Building Management System (BMS)?",
    whatIsDesc: "An integrated system used to automatically control and monitor various devices and facilities within a building.",
    whatIsListTitle: "Through BMS, building managers can monitor critical systems such as:",
    systems: [
      "Electrical systems",
      "HVAC (Heating, Ventilation, AC)",
      "Lighting systems",
      "Water pumps & Generators",
      "Fire Alarm & Security System",
      "Energy monitoring"
    ],
    whyTitle: "Why is a Building Management System Important?",
    why1Title: "1. Increase Operational Efficiency",
    why1Desc: "BMS enables automatic facility management, reducing manual work and increasing labor efficiency.",
    why2Title: "2. Save Energy Consumption",
    why2Desc: "Real-time tracking of electricity usage helps identify energy waste so that operational costs can be significantly reduced.",
    why3Title: "3. Improve Building Security",
    why3Desc: "The system provides automatic notifications in the event of anomalies, breakdowns, or emergencies requiring immediate corrective action.",
    why4Title: "4. Simplify Monitoring",
    why4Desc: "All devices and systems in the building can be monitored through a single integrated dashboard without the need for manual location checks.",
    why5Title: "5. Support Smart Buildings",
    why5Desc: "BMS serves as the core foundation in implementing smart building concepts and digitalizing modern facilities.",
    solutionsTitle: "Building Management System Solutions by PT. Panca Prima Wijaya",
    solutionsSub: "We provide consulting, design, implementation, integration, and maintenance services for Building Management Systems tailored to each industry's distinct needs.",
    sol1Title: "Building Management System (BMS)",
    sol1Desc: "A centralized building management and control solution that allows monitoring of all operational systems through a single platform.",
    sol2Title: "Real-Time Monitoring System (RTMS)",
    sol2Desc: "Enables users to obtain actual operational data on critical parameters including energy consumption, temperature, humidity, pressure, air quality, up to equipment performance.",
    sol3Title: "Early Warning System (EWS)",
    sol3Desc: "An automated early warning system triggered when abnormal conditions occur, such as power overloads, extreme temperature spikes, system leaks, equipment failure, or fire hazards.",
    advTitle: "Our Advantages",
    adv1Title: "Integrated Solution & Experienced Team",
    adv1Desc: "A one-stop solution from consultation to maintenance, fully backed by certified technical experts.",
    adv2Title: "Modern & Scalable Technology",
    adv2Desc: "State-of-the-art platforms that can be customized and expanded as your facility grows.",
    indTitle: "Industrial Applications",
    industries: [
      "Office Buildings",
      "Data Center",
      "Hospitals",
      "Factories / Manufacturing",
      "Malls & Hotels",
      "Industrial Areas"
    ],
    ctaTitle: "Contact PT. Panca Prima Wijaya",
    ctaDesc: "Consult your Building Management System (BMS), RTMS, EWS, and other monitoring needs with our professional team and boost your operational efficiency.",
    ctaBtn: "CONSULT NOW"
  } : {
    seoTitle: "Building Management System (BMS) Terintegrasi | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya menyediakan solusi Building Management System (BMS), RTMS, EWS, Energy Monitoring System, dan Smart Building untuk monitoring serta pengelolaan gedung secara real-time.",
    badge: "MANAJEMEN & MONITORING TERINTEGRASI",
    heroTitle: <>Building Management System (BMS) <br /><span className="text-blue-400">Terintegrasi.</span></>,
    heroSub: '"Solusi Building Management System (BMS) Profesional dari PT. Panca Prima Wijaya untuk Monitoring dan Pengelolaan Gedung Modern secara Real-time."',
    introPart1: "Di era digital saat ini, pengelolaan gedung tidak lagi dilakukan secara manual. Dengan penerapan Building Management System (BMS), seluruh sistem operasional gedung dapat dipantau, dikontrol, dan dianalisis secara real-time melalui satu platform terintegrasi.",
    introPart2: "PT. Panca Prima Wijaya hadir sebagai perusahaan penyedia solusi Building Management System (BMS), Real-Time Monitoring System (RTMS), Early Warning System (EWS), dan berbagai teknologi smart building yang dirancang untuk meningkatkan efisiensi operasional, keamanan, serta produktivitas fasilitas Anda.",
    whatIsTitle: "Apa Itu Building Management System (BMS)?",
    whatIsDesc: "Sistem terintegrasi yang digunakan untuk mengontrol dan memonitor berbagai perangkat dan fasilitas dalam sebuah bangunan secara otomatis.",
    whatIsListTitle: "Melalui BMS, pengelola gedung dapat mengawasi berbagai sistem penting seperti:",
    systems: [
      "Sistem kelistrikan",
      "HVAC (Heating, Ventilation, AC)",
      "Sistem pencahayaan",
      "Pompa air & Genset",
      "Fire Alarm & Security System",
      "Monitoring energi"
    ],
    whyTitle: "Mengapa Building Management System Penting?",
    why1Title: "1. Meningkatkan Efisiensi Operasional",
    why1Desc: "BMS memungkinkan pengelolaan fasilitas secara otomatis sehingga mengurangi pekerjaan manual dan meningkatkan efisiensi tenaga kerja.",
    why2Title: "2. Menghemat Konsumsi Energi",
    why2Desc: "Monitoring penggunaan listrik secara real-time membantu mengidentifikasi pemborosan energi sehingga biaya operasional dapat ditekan secara signifikan.",
    why3Title: "3. Meningkatkan Keamanan Gedung",
    why3Desc: "Sistem dapat memberikan notifikasi otomatis apabila terjadi gangguan, kerusakan, atau kondisi darurat yang memerlukan tindakan segera.",
    why4Title: "4. Mempermudah Monitoring",
    why4Desc: "Seluruh perangkat dan sistem dalam gedung dapat dipantau melalui satu dashboard terintegrasi tanpa perlu melakukan pengecekan secara manual ke setiap lokasi.",
    why5Title: "5. Mendukung Smart Building",
    why5Desc: "BMS menjadi fondasi utama dalam implementasi konsep smart building dan digitalisasi fasilitas modern.",
    solutionsTitle: "Solusi Building Management System PT. Panca Prima Wijaya",
    solutionsSub: "Menyediakan layanan konsultasi, perancangan, implementasi, integrasi, dan maintenance Building Management System sesuai kebutuhan di masing-masing industri.",
    sol1Title: "Building Management System (BMS)",
    sol1Desc: "Solusi pengelolaan dan kontrol gedung secara terpusat yang memungkinkan monitoring seluruh sistem operasional melalui satu platform.",
    sol2Title: "Real-Time Monitoring System (RTMS)",
    sol2Desc: "Memungkinkan pengguna memperoleh data operasional secara langsung untuk parameter penting seperti konsumsi energi, temperatur, kelembaban, tekanan, kualitas udara, hingga performa peralatan.",
    sol3Title: "Early Warning System (EWS)",
    sol3Desc: "Sistem peringatan dini otomatis ketika terjadi kondisi abnormal seperti overload listrik, kenaikan temperatur ekstrem, kebocoran sistem, gangguan peralatan, hingga potensi kebakaran.",
    advTitle: "Keunggulan Kami",
    adv1Title: "Solusi Terintegrasi & Tim Berpengalaman",
    adv1Desc: "One-stop solution dari konsultasi hingga maintenance didukung tenaga ahli tersertifikasi.",
    adv2Title: "Teknologi Modern & Scalable",
    adv2Desc: "Platform terkini yang dapat dikustomisasi dan dikembangkan seiring pertumbuhan fasilitas Anda.",
    indTitle: "Aplikasi Industri",
    industries: [
      "Gedung Perkantoran",
      "Data Center",
      "Rumah Sakit",
      "Pabrik / Manufaktur",
      "Mall & Hotel",
      "Kawasan Industri"
    ],
    ctaTitle: "Hubungi PT. Panca Prima Wijaya",
    ctaDesc: "Konsultasikan kebutuhan Building Management System (BMS), RTMS, EWS, dan solusi monitoring lainnya bersama tim profesional kami dan tingkatkan efisiensi operasional.",
    ctaBtn: "KONSULTASI SEKARANG"
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title={content.seoTitle}
        description={content.seoDesc}
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {content.badge}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          
          <div className="pl-4 border-l-4 border-blue-500 mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              {content.heroSub}
            </p>
          </div>
          
          <TrustedBy />
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            <AutoLinkText>{content.introPart1}</AutoLinkText>
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <AutoLinkText>{content.introPart2}</AutoLinkText>
          </p>
        </div>
      </section>

      {/* Apa Itu BMS */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.whatIsTitle}</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {content.whatIsDesc}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 mb-6 font-medium">{content.whatIsListTitle}</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-blue-500" /> {content.systems[0]}</div>
                <div className="flex items-center gap-3"><Settings2 className="w-5 h-5 text-blue-500" /> {content.systems[1]}</div>
                <div className="flex items-center gap-3"><Target className="w-5 h-5 text-blue-500" /> {content.systems[2]}</div>
                <div className="flex items-center gap-3"><Activity className="w-5 h-5 text-blue-500" /> {content.systems[3]}</div>
                <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-blue-500" /> {content.systems[4]}</div>
                <div className="flex items-center gap-3"><BarChart3 className="w-5 h-5 text-blue-500" /> {content.systems[5]}</div>
             </div>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">{content.whyTitle}</h2>
            
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why1Title}</h3>
                 <p className="text-sm text-gray-600">{content.why1Desc}</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why2Title}</h3>
                 <p className="text-sm text-gray-600">{content.why2Desc}</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why3Title}</h3>
                 <p className="text-sm text-gray-600">{content.why3Desc}</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why4Title}</h3>
                 <p className="text-sm text-gray-600">{content.why4Desc}</p>
               </div>
               
               <div className="border-l-4 border-blue-500 pl-4 py-1 sm:col-span-2">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why5Title}</h3>
                 <p className="text-sm text-gray-600">{content.why5Desc}</p>
               </div>
            </div>
         </div>
      </section>

      {/* Solusi Kami */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">{content.solutionsTitle}</h2>
            <p className="text-blue-100 text-center mb-12">{content.solutionsSub}</p>
            
            <div className="grid gap-6">
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-white mb-2">{content.sol1Title}</h3>
                    <p className="text-sm text-blue-100">{content.sol1Desc}</p>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-white mb-3">{content.sol2Title}</h3>
                    <p className="text-sm text-blue-100 mb-4">{content.sol2Desc}</p>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-white mb-3">{content.sol3Title}</h3>
                    <p className="text-sm text-blue-100 mb-4">{content.sol3Desc}</p>
                 </div>
            </div>
         </div>
      </section>

      {/* Industri yang Cocok & Keunggulan */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.advTitle}</h2>
                  <ul className="space-y-4">
                     <li className="flex gap-3">
                          <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><ShieldCheck className="w-4 h-4"/></div>
                          <div>
                             <strong className="block text-gray-900 text-sm mb-1">{content.adv1Title}</strong>
                             <span className="text-sm text-gray-600">{content.adv1Desc}</span>
                          </div>
                     </li>
                     <li className="flex gap-3">
                          <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Activity className="w-4 h-4"/></div>
                          <div>
                             <strong className="block text-gray-900 text-sm mb-1">{content.adv2Title}</strong>
                             <span className="text-sm text-gray-600">{content.adv2Desc}</span>
                          </div>
                     </li>
                  </ul>
               </div>
               
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.indTitle}</h2>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Factory className="w-4 h-4 text-gray-400"/> {content.industries[0]}</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Server className="w-4 h-4 text-gray-400"/> {content.industries[1]}</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gray-400"/> {content.industries[2]}</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Factory className="w-4 h-4 text-gray-400"/> {content.industries[3]}</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><Target className="w-4 h-4 text-gray-400"/> {content.industries[4]}</div>
                     <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-gray-400"/> {content.industries[5]}</div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* CTA Konsultasi */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">{content.ctaTitle}</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             {content.ctaDesc}
          </p>
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base">
            {content.ctaBtn}
          </a>
        </div>
      </section>

    </div>
  );
}
