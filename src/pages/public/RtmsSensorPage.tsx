import React from 'react';
import { Target, Activity, ShieldCheck, Settings2, BarChart3, Database, Cable, Server, Home, Briefcase, Factory, Cpu, Zap, Eye, MonitorSmartphone, Plus, Minus, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';
import { AutoLinkText } from '../../components/AutoLinkText';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function RtmsSensorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { isEn } = useLanguage();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const content = isEn ? {
    seoTitle: "Integrated Real-Time Monitoring System (RTMS) | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya provides Real-Time Monitoring System (RTMS) solutions for real-time tracking of data, energy, machinery, utilities, and facilities with fully integrated dashboards.",
    badge: "DATA MANAGEMENT & DIRECT MONITORING",
    heroTitle: "Real-Time Monitoring System (RTMS) for Live Operational Tracker and Real-Time Analytics",
    heroSub: '"Professional RTMS Solutions from PT. Panca Prima Wijaya for Complete Live Visibility over Your Facilities and Business Processes."',
    introPart1: "Speed in obtaining information is a critical factor in business and operational decision-making. With a Real-Time Monitoring System (RTMS), organizations can monitor the status of assets, facilities, machinery, and key operational parameters instantly without waiting for manual reports.",
    introPart2: "PT. Panca Prima Wijaya provides comprehensive Real-Time Monitoring System (RTMS) solutions that collect, analyze, and render data from various devices, sensors, machines, and operating systems in real-time through an integrated central interface.",
    introPart3: "Through RTMS, enterprises can optimize operational efficiency, catalyze problem response times, eliminate unexpected downtime, and secure complete visibility into ongoing workflows and physical facilities.",
    whatIsTitle: "What is a Real-Time Monitoring System (RTMS)?",
    whatIsSub: "A Real-Time Monitoring System (RTMS) is a monitoring framework designed to curate, process, and display data in real-time from various sensor and infrastructure tracking nodes.",
    whatIsDescKey: "This platform empowers users to realize actual equipment, facility, and environment conditions with zero information latency.",
    whatIsListTitle: "Gathered data is illustrated nicely via:",
    whatIsList: [
      "Monitoring Dashboard",
      "Analytical Charts",
      "Equipment Status Metrics",
      "Alarms & Signals",
      "Automated Reports",
      "Mobile App Tracking"
    ],
    whatIsFooter: '"With RTMS, every minor parameter drift is known immediately so relevant teams can initiate resolutions with speed."',
    whyTitle: "Why is a Real-Time Monitoring System Important?",
    whyList: [
      { title: "24-Hour Nonstop Monitoring", desc: "RTMS functions persistently to ensure all essential parameters stay strictly inside safe bounds." },
      { title: "Faster Decision Making", desc: "Real-time metrics help operations and management lock in decisions backed by contemporary field status." },
      { title: "Minimize Downtime Risk", desc: "Disruptions are flagged early so repairs can be executed before full-scale operational default." },
      { title: "Boost Operational Efficiency", desc: "Automated tracking eliminates outdated physical checks, elevating operational crew productivity." },
      { title: "Asset Optimization", desc: "Enables organizations to assess complete asset performance curves for strategic asset allocation." }
    ],
    solTitle: "RTMS Solutions by PT. Panca Prima Wijaya",
    solSub: "We offer end-to-end consulting, telemetry design, sensor integration, system deployment, and maintenance of Real-Time Monitoring Systems.",
    solEnergyTitle: "Energy Monitoring",
    solEnergyDesc: "Track electricity for energy efficiency. Monitored parameters:",
    solEnergyList: ["Voltage & Current", "Active & Reactive Power", "Power Factor (Cos Phi)", "Energy Consumption (kWh)"],
    solMachineryTitle: "Machinery & Equipment Monitoring",
    solMachineryDesc: "Empower predictive maintenance schedules. Key metrics:",
    solMachineryList: ["Vibration & Temperature", "RPM & Air Pressure", "Motor Health Status", "Production Line Telemetry"],
    solEnvTitle: "Environmental Monitoring",
    solEnvDesc: "Tracking ambient conditions around crucial facilities:",
    solEnvList: ["Temperature & Humidity", "Barometric Pressure", "Air Quality & Ambient Light"],
    solInfraTitle: "Infrastructure Monitoring",
    solInfraDesc: "Exceptionally effective for watching over:",
    solInfraList: ["Power Systems & HVAC", "Pumps, Generators, Storage", "Industrial Utility Plants"],
    integrationTitle: "RTMS Integration",
    integrationList: [
      { bold: "BMS & EWS", desc: "Connects with Building Management Systems for centralized terminal access and Early Warning Alerts for warning messages." },
      { bold: "SCADA & IoT", desc: "Direct connectivity to IoT sensor arrays and industrial automation platforms for streamlined control." },
      { bold: "Unified Dashboard", desc: "Flexible real-time access on demand through Desktop, Tablet, and Smartphone screens." }
    ],
    indTitle: "Industrial Applications",
    indList: [
      { title: "Manufacturing Sector", desc: "Monitoring production lines, energy throughput, and machine outputs." },
      { title: "Corporate & Public Infrastructure", desc: "Multi-tenant office towers, public utility sites, and water/power distribution grids." },
      { title: "Data Centers", desc: "Server rack heat profiles, cooling limits, and power parameters." },
      { title: "Healthcare & Logistics", desc: "Medical cold chains, warehouse microclimates, and secure medicine storage." }
    ],
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      {
        question: "What is a Real-Time Monitoring System (RTMS)?",
        answer: "RTMS is an environmental and machine telemetry system used to observe parameters, alarms, and operating data live as it occurs in real-time."
      },
      {
        question: "What are the core business advantages of RTMS?",
        answer: "It provides continuous telemetry visibility, speeds up troubleshooting, optimizes energy consumption, and supports data-backed decisions."
      },
      {
        question: "Is integration with BMS and EWS possible?",
        answer: "Yes, our RTMS solutions fit perfectly inside larger Building Management (BMS) and automated alert (EWS) ecosystems."
      },
      {
        question: "What items can be measured by RTMS?",
        answer: "Electrical loads, ambient temperature, relative humidity, machine vibrations, fluid volumes, and industrial air quality parameters."
      },
      {
        question: "Does PT. Panca Prima Wijaya provide complete project implementation?",
        answer: "Yes, from consultation, telemetry architecture planning, hardware integration, to custom dashboard design and annual field service."
      }
    ],
    ctaTitle: "Contact PT. Panca Prima Wijaya",
    ctaDesc: "Discuss your Real-Time Monitoring System (RTMS) requirements with our professional technicians and unlock absolute operational visibility.",
    ctaBtn: "CONSULT NOW"
  } : {
    seoTitle: "Real Time Monitoring System (RTMS) Terintegrasi | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya menyediakan solusi Real Time Monitoring System (RTMS) untuk monitoring data, energi, mesin, utilitas, dan fasilitas secara real-time dengan dashboard terintegrasi.",
    badge: "MANAJEMEN DATA & MONITORING LANGSUNG",
    heroTitle: "Real Time Monitoring System (RTMS) untuk Monitoring Operasional dan Data Secara Real-Time",
    heroSub: '"Solusi RTMS Profesional dari PT. Panca Prima Wijaya untuk Visibilitas Penuh Fasilitas dan Proses Bisnis Anda Secara Langsung."',
    introPart1: "Kecepatan memperoleh informasi menjadi faktor penting dalam pengambilan keputusan bisnis dan operasional. Dengan Real Time Monitoring System (RTMS), perusahaan dapat memantau kondisi aset, fasilitas, mesin, maupun parameter operasional secara langsung tanpa harus menunggu laporan manual.",
    introPart2: "PT. Panca Prima Wijaya menyediakan solusi Real Time Monitoring System (RTMS) yang memungkinkan data dari berbagai perangkat, sensor, mesin, dan sistem operasional dikumpulkan, dianalisis, dan ditampilkan secara real-time melalui dashboard monitoring yang terintegrasi.",
    introPart3: "Melalui RTMS, perusahaan dapat meningkatkan efisiensi operasional, mempercepat respons terhadap gangguan, mengurangi downtime, serta memperoleh visibilitas penuh terhadap kondisi fasilitas dan proses bisnis yang berjalan.",
    whatIsTitle: "Apa Itu Real Time Monitoring System (RTMS)?",
    whatIsSub: "Real Time Monitoring System (RTMS) adalah sistem pemantauan yang dirancang untuk mengumpulkan, mengolah, dan menampilkan data secara langsung (real-time) dari berbagai sumber monitoring.",
    whatIsDescKey: "Sistem ini memungkinkan pengguna mengetahui kondisi aktual peralatan, fasilitas, maupun lingkungan operasional tanpa keterlambatan informasi.",
    whatIsListTitle: "Data yang diperoleh dapat ditampilkan dalam bentuk:",
    whatIsList: [
      "Dashboard Monitoring",
      "Grafik Analitik",
      "Status Peralatan",
      "Alarm & Notifikasi",
      "Laporan Otomatis",
      "Mobile App Monitor"
    ],
    whatIsFooter: '"Dengan RTMS, setiap perubahan kondisi dapat diketahui secara cepat sehingga tindakan yang diperlukan dapat segera dilakukan."',
    whyTitle: "Mengapa Real Time Monitoring System Penting?",
    whyList: [
      { title: "Monitoring 24 Jam Nonstop", desc: "RTMS bekerja secara terus menerus untuk memastikan seluruh parameter penting tetap berada dalam kondisi normal." },
      { title: "Pengambilan Keputusan Lebih Cepat", desc: "Data real-time membantu manajemen dan operator mengambil keputusan berdasarkan kondisi aktual di lapangan." },
      { title: "Mengurangi Risiko Downtime", desc: "Gangguan dapat terdeteksi lebih awal sehingga proses perbaikan dapat dilakukan sebelum terjadi kegagalan operasional." },
      { title: "Meningkatkan Efisiensi Operasional", desc: "Pemantauan otomatis mengurangi kebutuhan inspeksi manual dan meningkatkan produktivitas tim operasional." },
      { title: "Optimalisasi Penggunaan Aset", desc: "Perusahaan dapat memahami performa aset secara menyeluruh sehingga pengelolaan menjadi lebih efektif." }
    ],
    solTitle: "Solusi RTMS dari PT. Panca Prima Wijaya",
    solSub: "Menyediakan layanan konsultasi, desain sistem, integrasi perangkat, implementasi, hingga maintenance Real Time Monitoring System.",
    solEnergyTitle: "Monitoring Energi",
    solEnergyDesc: "Pantau listrik untuk efisiensi. Parameter:",
    solEnergyList: ["Tegangan & Arus", "Daya Aktif & Reaktif", "Faktor Daya", "Konsumsi Energi"],
    solMachineryTitle: "Monitoring Mesin & Peralatan",
    solMachineryDesc: "Mendukung predictive maintenance. Parameter:",
    solMachineryList: ["Getaran & Suhu", "Kecepatan & Tekanan", "Kondisi Motor", "Status Produksi"],
    solEnvTitle: "Monitoring Lingkungan",
    solEnvDesc: "Kondisi sekitar fasilitas:",
    solEnvList: ["Temperatur & Kelembaban", "Tekanan Udara", "Kualitas Udara & Cahaya"],
    solInfraTitle: "Monitoring Infrastruktur",
    solInfraDesc: "Sangat efektif memantau:",
    solInfraList: ["Sistem Listrik & HVAC", "Pompa, Genset, Tangki", "Utility Plant"],
    integrationTitle: "Integrasi RTMS",
    integrationList: [
      { bold: "BMS & EWS", desc: "Integrasi ke Building Management untuk sentralisasi dan Early Warning System untuk notifikasi otomatis bila ada abnormalitas." },
      { bold: "SCADA & IoT", desc: "Koneksi ke sensor IoT otomatis, SCADA dan Automation Sys industri untuk kontrol efisien." },
      { bold: "Dashboard Terpadu", desc: "Akses real-time fleksibel lewat Desktop, Tablet, Smartphone." }
    ],
    indTitle: "Aplikasi Industri",
    indList: [
      { title: "Industri Manufaktur", desc: "Monitoring mesin, energi, performa produksi." },
      { title: "Perkantoran & Infrastruktur", desc: "Fasilitas gedung, utilitas publik, distribusi air/energi." },
      { title: "Data Center", desc: "Suhu server, daya, kelembaban." },
      { title: "RS & Area Logistik", desc: "Alat medis listrik, kontrol suhu gudang." }
    ],
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faqs: [
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
    ],
    ctaTitle: "Hubungi PT. Panca Prima Wijaya",
    ctaDesc: "Konsultasikan kebutuhan Real Time Monitoring System (RTMS) Anda dan dapatkan visibilitas penuh untuk efisiensi operasional.",
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
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-green-500/20 text-green-200 font-bold text-xs rounded-full mb-6 border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {content.badge}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          
          <div className="pl-4 border-l-4 border-green-500 mb-8">
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
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium mb-4">
            <AutoLinkText>{content.introPart2}</AutoLinkText>
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            <AutoLinkText>{content.introPart3}</AutoLinkText>
          </p>
        </div>
      </section>

      {/* Apa Itu RTMS */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.whatIsTitle}</h2>
            <div className="mt-4 text-gray-600 max-w-2xl mx-auto">
              <strong>{content.whatIsSub}</strong>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
               {content.whatIsDescKey}
             </p>
             <p className="text-sm text-gray-600 font-medium mb-3">{content.whatIsListTitle}</p>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-green-500" /> {content.whatIsList[0]}</div>
                <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-green-500" /> {content.whatIsList[1]}</div>
                <div className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-green-500" /> {content.whatIsList[2]}</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> {content.whatIsList[3]}</div>
                <div className="flex items-center gap-2"><Database className="w-4 h-4 text-green-500" /> {content.whatIsList[4]}</div>
                <div className="flex items-center gap-2"><MonitorSmartphone className="w-4 h-4 text-green-500" /> {content.whatIsList[5]}</div>
             </div>
             <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100 font-medium text-center">
               {content.whatIsFooter}
             </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">{content.whyTitle}</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {content.whyList.map((item, idx) => (
                 <div key={idx} className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5"><Eye className="w-16 h-16"/></div>
                   <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">{item.title}</h3>
                   <p className="text-sm text-gray-600 relative z-10">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Solusi RTMS */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">{content.solTitle}</h2>
            <p className="text-blue-100 text-center mb-12">{content.solSub}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><Zap className="text-green-400"/><h3 className="font-bold text-xl text-white">{content.solEnergyTitle}</h3></div>
                    <p className="text-sm text-blue-100 mb-2">{content.solEnergyDesc}</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-blue-200">
                      {content.solEnergyList.map((item, idx) => <div key={idx}>• {item}</div>)}
                    </div>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><Settings2 className="text-green-400"/><h3 className="font-bold text-xl text-white">{content.solMachineryTitle}</h3></div>
                    <p className="text-sm text-blue-100 mb-2">{content.solMachineryDesc}</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-blue-200">
                      {content.solMachineryList.map((item, idx) => <div key={idx}>• {item}</div>)}
                    </div>
                 </div>
 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><Home className="text-green-400"/><h3 className="font-bold text-xl text-white">{content.solEnvTitle}</h3></div>
                    <p className="text-sm text-blue-100 mb-2">{content.solEnvDesc}</p>
                    <ul className="text-xs text-blue-200 flex flex-wrap gap-x-4 gap-y-1 list-disc list-inside">
                      {content.solEnvList.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><Server className="text-green-400"/><h3 className="font-bold text-xl text-white">{content.solInfraTitle}</h3></div>
                    <p className="text-sm text-blue-100 mb-2">{content.solInfraDesc}</p>
                    <ul className="text-xs text-blue-200 flex flex-wrap gap-x-4 gap-y-1 list-disc list-inside">
                      {content.solInfraList.map((item, idx) => <li key={idx}>{item}</li>)}
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
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.integrationTitle}</h2>
                  <div className="space-y-4">
                     {content.integrationList.map((item, idx) => (
                       <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                         <strong className="block text-gray-900 text-sm mb-2"><Cable className="inline w-4 h-4 mr-2 text-green-500"/>{item.bold}</strong>
                         <p className="text-xs text-gray-600">{item.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>

               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.indTitle}</h2>
                  <div className="flex flex-col gap-3">
                     {content.indList.map((item, idx) => (
                       <div key={idx} className="flex gap-4 items-center bg-gray-50 border border-gray-200 p-3 rounded">
                         <Factory className="w-6 h-6 text-gray-400 flex-shrink-0"/>
                         <div>
                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                         </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.faqTitle}</h2>
          </div>
          
          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
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
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">{content.ctaTitle}</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             {content.ctaDesc}
          </p>
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base">
            {content.ctaBtn}
          </a>
        </div>
      </section>

    </div>
  );
}
