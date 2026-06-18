import React from 'react';
import { Target, Activity, ShieldCheck, Settings2, BarChart3, Cable, Server, Home, BellRing, Smartphone, Briefcase, Plus, Minus } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';
import { AutoLinkText } from '../../components/AutoLinkText';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function EwsSensorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { isEn } = useLanguage();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const content = isEn ? {
    seoTitle: "Integrated Early Warning System (EWS) | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya provides Early Warning System (EWS) solutions for early detection of operational risks, real-time monitoring, automated alarms, and BMS/RTMS integrations.",
    badge: "EARLY DETECTION & RISK MITIGATION",
    heroTitle: "Integrated Early Warning System (EWS) for Real-Time Monitoring and Early Warning Alerts",
    heroSub: '"Professional Early Warning System (EWS) Solutions from PT. Panca Prima Wijaya for Early Detection and Operational Risk Mitigation of Your Facilities."',
    introPart1: "In today's modern industrial and facility management world, speed in detecting potential issues is a critical factor in preventing larger losses. Therefore, implementing an Early Warning System (EWS) has become a primary requirement for companies aiming to improve security, operational reliability, and decision-making effectiveness.",
    introPart2: "PT. Panca Prima Wijaya provides Early Warning System (EWS) solutions designed to detect prospective disruptions, damage, or emergency conditions in real-time. This system allows users to receive early notifications so corrective action can be taken before problems escalate into serious operational failures.",
    introPart3: "Armed with modern monitoring technologies, IoT integration, real-time dashboards, and automated alert systems, we help businesses reduce operational risks while increasing asset and facility management efficiency.",
    whatIsTitle: "What is an Early Warning System (EWS)?",
    whatIsDesc1: "An Early Warning System (EWS) is a monitoring and early notification platform designed to detect abnormal conditions, potential hazards, or operational parameter deviations before they lead to more significant disruptions.",
    whatIsDesc2: "This system functions by collecting data from multiple sensors, monitoring devices, or control systems, which are then parsed automatically. When a condition exceeding safe limits is detected, the system immediately dispatches an alert via dashboards, audible alarms, email, SMS, or mobile apps.",
    whatIsDesc3: "Supported by EWS, companies can initiate preventatives faster to mitigate downtime, protect assets, reduce workplace accidents, and prevent financial loss.",
    whyTitle: "Why is an Early Warning System Important?",
    why1Title: "Prevent Damage Before It Happens",
    why1Desc: "EWS helps detect the earliest signs of failure so repairs can be executed before more severe damage occurs.",
    why2Title: "Reduce Operational Downtime",
    why2Desc: "Issues detected earlier allow technical teams to take quick action to ensure continuous operational workflows.",
    why3Title: "Increase Safety & Compliance",
    why3Desc: "The early warning system helps identify hazardous conditions that may threaten employee safety and facility integrity.",
    why4Title: "Support Smart Decision Making",
    why4Desc: "Real-time data and automated notifications deliver more accurate information to support critical operational pivots.",
    why5Title: "Optimize Maintenance Costs",
    why5Desc: "With a preventative approach, organizations can reduce heavy repair bills resulting from delayed interventions.",
    solutionsTitle: "Early Warning System (EWS) Solutions by PT. Panca Prima Wijaya",
    solutionsSub: "PT. Panca Prima Wijaya provides comprehensive consulting, design, implementation, integration, and maintenance of EWS systems tailored to support each customer's specific facility.",
    sol1Title: "Parameter Monitoring",
    sol1Desc: "The system can monitor multiple critical parameters, including:",
    sol1List: [
      "Temperature & Humidity",
      "Pressure & Vibration",
      "Electrical Current & Voltage",
      "Energy consumption",
      "Liquid Level & Air Quality"
    ],
    sol2Title: "Real-Time Notifications",
    sol2Desc: "Automated warnings dispatched via:",
    sol2List: [
      "Monitoring Dashboard & Mobile App",
      "Audio and Visual Alarms",
      "Email Notifications & SMS Gateways",
      "WhatsApp Alerts"
    ],
    sol3Title: "BMS & RTMS Integration",
    sol3Desc: "Can be seamlessly integrated with Building Management Systems (BMS) and Real-Time Monitoring Systems (RTMS) for deep analytics and centralized command.",
    sol4Title: "Integrated Dashboard",
    sol4Desc: "All data and alerts are organized on an intuitive dashboard, enabling users to keep a watchful eye on conditions from anywhere.",
    appTitle: "Applications & Advantages of EWS Solutions",
    appSubTitle: "System Applications (EWS)",
    apps: [
      { bold: "Office Buildings", desc: "Monitors electrical systems, HVAC progress, water pumps, and generators." },
      { bold: "Hospitals", desc: "Monitors medical apparatus, power reliability, and sensitive medicine storage vaults." },
      { bold: "Manufacturing Plants", desc: "Detects machine faults, overheating threshold levels, and motor vibrations." },
      { bold: "Data Centers", desc: "Monitors server room temperature, humidity fluctuations, and cooling efficiency." },
      { bold: "Warehouses & Infrastructure", desc: "Preserves storage parameters for sensitive merchandise and public utilities." }
    ],
    advTitle: "EWS Solution Advantages",
    advs: [
      { title: "24/7 Monitoring & Rapid Alerts", desc: "The system runs continuously. Automated warnings are delivered instantly when anomalies surface." },
      { title: "Flexible & Broad Integrations", desc: "Alarm thresholds are highly customizable. Connects seamlessly with IoT sensors, BMS, and SCADA protocols." },
      { title: "Professional Support Teams", desc: "Our team stands ready to assist you along the entire path, from initial planning to long-term system maintenance." }
    ],
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      {
        question: "What is an Early Warning System (EWS)?",
        answer: "An Early Warning System (EWS) is a solution used to detect abnormal conditions or potential risks early so that preventive actions can be taken before a larger system breakdown occurs."
      },
      {
        question: "What are the benefits of EWS for a business?",
        answer: "EWS helps reduce downtime, increases safety, lowers overall repair costs, and accelerates response times against operational failures."
      },
      {
        question: "Can EWS be integrated with BMS?",
        answer: "Yes, our Early Warning System can be fully integrated with Building Management Systems (BMS), RTMS, SCADA, or other monitoring platforms. Monitoring thresholds and alarm boundaries are fully customized to clients' operational requirements."
      },
      {
        question: "Which industries are most suitable for EWS?",
        answer: "EWS is exceptionally suited for office towers, hospitals, data centers, manufacturing sites, large warehouses, public facilities, and any infrastructure demanding high uptime and strict security."
      },
      {
        question: "Does PT. Panca Prima Wijaya provide EWS implementation services?",
        answer: "Yes. PT. Panca Prima Wijaya delivers end-to-end services from initial consulting, system design, hardware installation, software integration, to continuous maintenance."
      }
    ],
    ctaTitle: "Contact PT. Panca Prima Wijaya",
    ctaDesc: "Discuss your Early Warning System (EWS) requirements with our professional consultants and unlock an integrated monitoring solution for your facility.",
    ctaBtn: "CONSULT NOW"
  } : {
    seoTitle: "Early Warning System (EWS) Terintegrasi | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya menyediakan solusi Early Warning System (EWS) untuk deteksi dini risiko operasional, monitoring real-time, alarm otomatis, dan integrasi BMS serta RTMS.",
    badge: "DETEKSI DINI & MITIGASI RISIKO",
    heroTitle: "Early Warning System (EWS) Terintegrasi untuk Monitoring dan Peringatan Dini Real-Time",
    heroSub: '"Solusi Early Warning System (EWS) Profesional dari PT. Panca Prima Wijaya untuk Deteksi Dini dan Mitigasi Risiko Operasional Fasilitas Anda."',
    introPart1: "Dalam dunia industri dan pengelolaan fasilitas modern, kecepatan dalam mendeteksi potensi masalah menjadi faktor penting untuk mencegah kerugian yang lebih besar. Oleh karena itu, penerapan Early Warning System (EWS) menjadi kebutuhan utama bagi perusahaan yang ingin meningkatkan keamanan, keandalan operasional, dan efektivitas pengambilan keputusan.",
    introPart2: "PT. Panca Prima Wijaya menyediakan solusi Early Warning System (EWS) yang dirancang untuk mendeteksi potensi gangguan, kerusakan, maupun kondisi darurat secara real-time. Sistem ini memungkinkan pengguna menerima notifikasi dini sehingga tindakan korektif dapat dilakukan sebelum masalah berkembang menjadi kegagalan operasional yang serius.",
    introPart3: "Dengan dukungan teknologi monitoring modern, integrasi IoT, dashboard real-time, serta sistem alarm otomatis, kami membantu perusahaan mengurangi risiko operasional sekaligus meningkatkan efisiensi pengelolaan aset dan fasilitas.",
    whatIsTitle: "Apa Itu Early Warning System (EWS)?",
    whatIsDesc1: "Early Warning System (EWS) adalah sistem pemantauan dan peringatan dini yang berfungsi mendeteksi kondisi abnormal, potensi bahaya, atau penyimpangan parameter operasional sebelum menyebabkan gangguan yang lebih besar.",
    whatIsDesc2: "Sistem ini bekerja dengan mengumpulkan data dari berbagai sensor, perangkat monitoring, maupun sistem kontrol yang kemudian dianalisis secara otomatis. Ketika ditemukan kondisi yang melebihi batas aman, sistem akan mengirimkan peringatan melalui dashboard, alarm, email, SMS, atau aplikasi mobile.",
    whatIsDesc3: "Dengan EWS, perusahaan dapat melakukan tindakan preventif lebih cepat sehingga mengurangi risiko downtime, kerusakan aset, kecelakaan kerja, hingga kerugian finansial.",
    whyTitle: "Mengapa Early Warning System Penting?",
    why1Title: "Mencegah Kerusakan Sebelum Terjadi",
    why1Desc: "EWS membantu mendeteksi tanda-tanda awal gangguan sehingga perbaikan dapat dilakukan sebelum terjadi kerusakan yang lebih serius.",
    why2Title: "Mengurangi Downtime Operasional",
    why2Desc: "Gangguan yang terdeteksi lebih awal memungkinkan tim teknis mengambil tindakan cepat untuk menjaga kontinuitas operasional.",
    why3Title: "Meningkatkan Keselamatan",
    why3Desc: "Sistem peringatan dini membantu mengidentifikasi kondisi berbahaya yang berpotensi mengancam keselamatan pekerja maupun fasilitas.",
    why4Title: "Mendukung Pengambilan Keputusan",
    why4Desc: "Data real-time dan notifikasi otomatis memberikan informasi yang lebih akurat untuk mendukung keputusan operasional.",
    why5Title: "Mengurangi Biaya Perawatan",
    why5Desc: "Dengan pendekatan preventif, perusahaan dapat mengurangi biaya perbaikan besar akibat kerusakan yang terlambat ditangani.",
    solutionsTitle: "Solusi Early Warning System PT. Panca Prima Wijaya",
    solutionsSub: "PT. Panca Prima Wijaya menyediakan layanan konsultasi, desain, implementasi, integrasi, dan pemeliharaan sistem EWS sesuai kebutuhan industri maupun fasilitas pelanggan.",
    sol1Title: "Monitoring Parameter",
    sol1Desc: "Sistem dapat memantau berbagai parameter penting seperti:",
    sol1List: [
      "Suhu & Kelembaban",
      "Tekanan & Getaran",
      "Arus & Tegangan listrik",
      "Konsumsi energi",
      "Level cairan & Kualitas udara"
    ],
    sol2Title: "Notifikasi Real-Time",
    sol2Desc: "Peringatan otomatis melalui:",
    sol2List: [
      "Dashboard Monitoring & Aplikasi Mobile",
      "Alarm Audio dan Visual",
      "Email Notification & SMS Gateway",
      "WhatsApp Notification"
    ],
    sol3Title: "Integrasi BMS & RTMS",
    sol3Desc: "Dapat diintegrasikan dengan Building Management System (BMS) dan Real-Time Monitoring System (RTMS) untuk analisis mendalam dan pengelolaan terpusat.",
    sol4Title: "Dashboard Terintegrasi",
    sol4Desc: "Seluruh data dan alarm ditampilkan dalam dashboard yang mudah dipahami sehingga pengguna dapat memantau kondisi dari mana saja.",
    appTitle: "Aplikasi & Keunggulan Solusi EWS PT. Panca Prima Wijaya",
    appSubTitle: "Sistem Aplikasi (EWS)",
    apps: [
      { bold: "Gedung Perkantoran", desc: "Memantau sistem kelistrikan, HVAC, pompa, genset." },
      { bold: "Rumah Sakit", desc: "Mengawasi peralatan medis, sistem listrik, ruang obat." },
      { bold: "Industri Manufaktur", desc: "Mendeteksi gangguan mesin, overheating, getaran." },
      { bold: "Data Center", desc: "Mengawasi suhu ruang server, kelembaban, sistem pendingin." },
      { bold: "Pergudangan & Infrastruktur", desc: "Menjaga kondisi penyimpanan produk dan fasilitas publik." }
    ],
    advTitle: "Keunggulan Solusi EWS",
    advs: [
      { title: "Monitoring 24/7 & Notifikasi Cepat", desc: "Sistem bekerja terus-menerus. Peringatan otomatis dikirim cepat saat ada anomali." },
      { title: "Fleksibel & Integrasi Luas", desc: "Mudah dikustomisasi parameter alarmnya. Mampu terhubung sensor, IoT, BMS, dan SCADA." },
      { title: "Dukungan Teknis Profesional", desc: "Tim siap membantu mulai perencanaan, integrasi hingga pemeliharaan sistem berkelanjutan." }
    ],
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faqs: [
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
    ],
    ctaTitle: "Hubungi PT. Panca Prima Wijaya",
    ctaDesc: "Konsultasikan kebutuhan Early Warning System (EWS) Anda bersama tim profesional kami dan dapatkan solusi monitoring terintegrasi untuk keamanan fasilitas Anda.",
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
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-red-500/20 text-red-200 font-bold text-xs rounded-full mb-6 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {content.badge}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight max-w-3xl">
            {content.heroTitle}
          </h1>
          
          <div className="pl-4 border-l-4 border-red-500 mb-8">
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

      {/* Apa Itu EWS */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.whatIsTitle}</h2>
            <div className="mt-4 text-gray-600 max-w-2xl mx-auto">
              <AutoLinkText>{content.whatIsDesc1}</AutoLinkText>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10 text-justify sm:text-left">
             <p className="text-sm text-gray-700 leading-relaxed mb-4">
               {content.whatIsDesc2}
             </p>
             <p className="text-sm text-gray-700 leading-relaxed font-semibold">
               {content.whatIsDesc3}
             </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">{content.whyTitle}</h2>
            
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why1Title}</h3>
                 <p className="text-sm text-gray-600">{content.why1Desc}</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why2Title}</h3>
                 <p className="text-sm text-gray-600">{content.why2Desc}</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why3Title}</h3>
                 <p className="text-sm text-gray-600">{content.why3Desc}</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{content.why4Title}</h3>
                 <p className="text-sm text-gray-600">{content.why4Desc}</p>
               </div>
               
               <div className="border-l-4 border-red-500 pl-4 py-1 sm:col-span-2">
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
            
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><Activity className="text-red-400"/><h3 className="font-bold text-xl text-white">{content.sol1Title}</h3></div>
                    <p className="text-sm text-blue-100 mb-2">{content.sol1Desc}</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-blue-200 list-disc list-inside">
                      {content.sol1List.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><BellRing className="text-red-400"/><h3 className="font-bold text-xl text-white">{content.sol2Title}</h3></div>
                    <p className="text-sm text-blue-100 mb-2">{content.sol2Desc}</p>
                    <ul className="text-xs text-blue-200 space-y-1 list-disc list-inside">
                      {content.sol2List.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><Cable className="text-red-400"/><h3 className="font-bold text-xl text-white">{content.sol3Title}</h3></div>
                    <p className="text-sm text-blue-100 mb-4">{content.sol3Desc}</p>
                 </div>

                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3"><BarChart3 className="text-red-400"/><h3 className="font-bold text-xl text-white">{content.sol4Title}</h3></div>
                    <p className="text-sm text-blue-100 mb-4">{content.sol4Desc}</p>
                 </div>
            </div>
         </div>
      </section>

      {/* Aplikasi Industri */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-[#0a2558] mb-4">{content.appTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h3 className="font-bold text-[#0a2558] text-xl mb-4 border-b border-gray-200 pb-2">{content.appSubTitle}</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                     {content.apps.map((app, idx) => (
                       <div key={idx} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                         <strong>{app.bold}:</strong> {app.desc}
                       </div>
                     ))}
                  </div>
               </div>

               <div>
                  <h3 className="font-bold text-[#0a2558] text-xl mb-4 border-b border-gray-200 pb-2">{content.advTitle}</h3>
                  <ul className="space-y-4">
                     {content.advs.map((adv, idx) => (
                       <li key={idx} className="flex gap-3">
                          <div className="mt-1 p-1 bg-red-100 rounded text-red-600 h-fit"><Activity className="w-4 h-4"/></div>
                          <div>
                             <strong className="block text-gray-900 text-sm mb-1">{adv.title}</strong>
                             <span className="text-sm text-gray-600">{adv.desc}</span>
                          </div>
                       </li>
                     ))}
                  </ul>
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
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">{content.ctaTitle}</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             {content.ctaDesc}
          </p>
          <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base">
            {content.ctaBtn}
          </a>
        </div>
      </section>

    </div>
  );
}
