import React, { useState } from 'react';
import { Settings, ShieldCheck, Activity, Building2, Cable, Zap, MonitorSmartphone, Target, Plus, Minus, ArrowRight, ArrowUpCircle, PenTool, Cpu, Wrench } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { TrustedBy } from '../../components/TrustedBy';
import { AutoLinkText } from '../../components/AutoLinkText';
import { useLanguage } from '../../context/LanguageContext';

export default function SparepartLiftPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { isEn, langLink } = useLanguage();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const content = isEn ? {
    seoTitle: "Comprehensive Elevator Spare Parts supplier for All Brands | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya provides the most comprehensive collection of elevator spare parts for all major brands including Mitsubishi, Otis, KONE, Schindler, Hyundai, Fujitec, Hitachi, and more.",
    badge: "COMPREHENSIVE ELEVATOR SPARE PARTS",
    heroTitle: "Most Comprehensive Elevator Spare Parts for All Lift Brands in Indonesia",
    heroSub: '"Reliable and complete elevator spare parts supplier to ensure peak performance, optimal passenger safety, and high system uptime."',
    introPart1: "Spare parts availability is critical to ensuring superior ride comfort, occupant safety, and overall lift durability. When an elevator component suffers fatigue or demands replacement, introducing the correct parts prolongs structural lifespan while minimizing operational downtime.",
    introPart2: "PT. Panca Prima Wijaya operates as a trusted general supplier of complete elevator spare parts to support office complexes, multi-family apartments, hotels, healthcare centers, modern retail arenas, and heavy industrial facilities.",
    introPart3: "With an extensive supplier grid, direct OEM connections, and comprehensive expertise in elevators and building automation, we provide premium components with rich technical consultation.",
    supplierTitle: "Elevator Spare Parts Supplier for All Major Brands",
    supplierSub: "PT. Panca Prima Wijaya supplies premium components for a wide range of elevator models operated globally:",
    brands: [
      "Mitsubishi Lift", "Otis Lift", "KONE Lift", "Schindler Lift",
      "Hyundai Elevator", "Fujitec", "Hitachi Elevator", "Sigma Elevator",
      "ThyssenKrupp Elevator", "Toshiba Elevator", "Monarch Elevator", 
      "LG Elevator", "Canny Elevator", "KOYO Elevator", "And others..."
    ],
    supplierFooter: "We assist facility teams in matching parts to exact mechanical and electronic specs to maximize maintenance cycles and streamline installations.",
    whyTitle: "Why is Elevator Part Availability Critical?",
    whyList: [
      { title: "Insure Passenger Safety", desc: "Elevators carry dozens of people every single day. Using certified premium parts protects passengers and avoids safety hazards." },
      { title: "Minimize Downtime", desc: "Speedy part distribution minimizes elevator offline periods, keeping logistics and traffic moving inside your facility." },
      { title: "Prolong System Lifespan", desc: "Authentic, high-grade parts keep other neighboring mechanical nodes running in harmony, optimizing elevator replacement life." },
      { title: "Mitigate Heavy Repair Costs", desc: "Fixing worn components early with prompt spare parts prevents catastrophic system failure and heavy repair bills." }
    ],
    prodTitle: "Elevator Component Categories",
    prodSub: "We stock a massive range of components for preventative maintenance, emergency repair, and modernizations:",
    prodList: [
      { title: "Control System", list: ["Elevator Controller & Main Board", "PCB Lift & Drive Control Unit", "Inverter Lift & VVVF Drive", "Relay, Contactor, Power Supply Panel"] },
      { title: "Motor & Machines", list: ["Gearless & Geared Machine Units", "Brake Assembly & Coils", "Encoder & Traction Sheaves", "Industrial Motor Bearings"] },
      { title: "Door System", list: ["Door Motor & Operators", "Door Rollers & Locks", "Door Sensors & Guide Shoes", "Door Controller Cabinets"] },
      { title: "Safety System", list: ["Governors & Safety Gears", "Limit Switches & Emergency Switches", "Overspeed Protectors", "Safety Contact Assemblies"] },
      { title: "Sensor Lift", list: ["Leveling & Magnetic Sensors", "Proximity & Encoder Sensors", "Load Weighing & Door Interlocks", "Earthquake Sensors (Toyo Automation)"] },
      { title: "Cabin & Hall Indicators", list: ["COP & LOP (Operating Panels)", "Push Buttons & Display Screen Indicators", "Indicator Panels & Voice Synthesizers", "Lift Intercom Electronics"] }
    ],
    prodFooter: "In addition to elevator cars, we supply spare parts for step escalators and passenger travelators across all leading brands.",
    modernTitle: "Lift Modernization Solutions",
    modernDesc: "We provide complete lift modernization assets to revamp older, lagging elevators to today's strict safety and speed specifications:",
    modernList: [
      "Controller replacement & smart VVVF variable frequency drives",
      "High-efficiency door operators & modern crisp display screens",
      "Integration with Toyo Seismic Sensors, EWS, and centralized BMS platforms"
    ],
    advTitle: "PT. Panca Prima Wijaya Advantages",
    advList: [
      { title: "Most Comprehensive Selection", desc: "Thousands of high-demand items in stock representing the world's leading brands." },
      { title: "Direct Technical Guidance", desc: "We are technical consultants who help verify parts specs based on photos, stamps, and manual sheets." },
      { title: "Complete Integrated Solution", desc: "We support smart buildings with BMS software, RTMS telemetry grids, and EWS alarm systems." }
    ],
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      {
        question: "Do you supply spare parts for all major lift brands?",
        answer: "Yes, we stock components for Mitsubishi, KONE, Otis, Hyundai, Schindler, Fujitec, Hitachi, Toshiba, and other popular global brands."
      },
      {
        question: "What if my elevator model is old and out of production?",
        answer: "Our expert engineering group can assist in sourcing high-performance retrofits or alternatives that fully match the original specs."
      },
      {
        question: "Does PT. Panca Prima Wijaya ship nationwide?",
        answer: "Yes, we dispatch parts and components to projects, ports, and buildings in all regions across Indonesia."
      },
      {
        question: "What other solutions do you offer besides elevator parts?",
        answer: "Modernization packages, seismic sensors, Building Management System integration, and live RTMS tracking platforms."
      },
      {
        question: "How do I ensure the replacement parts match my elevator?",
        answer: "Simply send us pictures of the nameplate, manufacturer stamps, or part codes. Our tech support will analyze it to verify consistency."
      }
    ],
    ctaTitle: "Contact PT. Panca Prima Wijaya",
    ctaDesc: "Are you searching for complete, reliable elevator spare parts? Discuss your technical specifications with our support team and get the ideal components today.",
    ctaBtn: "CONSULT NOW",
    ctaBtnProd: "VIEW PRODUCTS"
  } : {
    seoTitle: "Sparepart Lift Terlengkap Semua Merk | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya menyediakan sparepart lift terlengkap untuk semua merk lift seperti Mitsubishi, Otis, KONE, Schindler, Hyundai, Fujitec, Hitachi, dan lainnya.",
    badge: "SPAREPART LIFT TERLENGKAP",
    heroTitle: "Sparepart Lift Terlengkap untuk Semua Merk Lift di Indonesia",
    heroSub: '"Penyedia sparepart lift terlengkap dan terpercaya untuk menjaga performa, keamanan, dan keandalan sistem lift Anda."',
    introPart1: "Ketersediaan sparepart merupakan faktor penting untuk menjaga performa, keamanan, dan keandalan sistem lift. Ketika komponen lift mengalami kerusakan atau membutuhkan penggantian, penggunaan sparepart yang tepat akan membantu memperpanjang umur peralatan sekaligus mengurangi risiko downtime operasional.",
    introPart2: "PT. Panca Prima Wijaya hadir sebagai perusahaan yang menyediakan sparepart lift terlengkap untuk berbagai kebutuhan gedung, apartemen, hotel, rumah sakit, pusat perbelanjaan, perkantoran, hingga kawasan industri.",
    introPart3: "Dengan jaringan pemasok yang luas dan pengalaman dalam bidang elevator serta building automation, kami mampu menyediakan berbagai komponen lift dari berbagai merek terkenal dengan kualitas terbaik dan dukungan teknis profesional.",
    supplierTitle: "Supplier Sparepart Lift Lengkap untuk Semua Merek",
    supplierSub: "PT. Panca Prima Wijaya menyediakan sparepart untuk berbagai merek lift yang digunakan di Indonesia, antara lain:",
    brands: [
      "Mitsubishi Lift", "Otis Lift", "KONE Lift", "Schindler Lift",
      "Hyundai Elevator", "Fujitec", "Hitachi Elevator", "Sigma Elevator",
      "ThyssenKrupp Elevator", "Toshiba Elevator", "Monarch Elevator", 
      "LG Elevator", "Canny Elevator", "KOYO Elevator", "Dan lainnya..."
    ],
    supplierFooter: "Kami membantu pelanggan mendapatkan komponen yang sesuai dengan spesifikasi unit yang digunakan sehingga proses perbaikan maupun pemeliharaan dapat berjalan lebih efektif.",
    whyTitle: "Mengapa Ketersediaan Sparepart Lift Sangat Penting?",
    whyList: [
      { title: "Menjaga Keamanan Pengguna", desc: "Lift merupakan fasilitas transportasi vertikal yang digunakan setiap hari. Penggantian komponen yang rusak secara tepat membantu menjaga standar keselamatan pengguna." },
      { title: "Mengurangi Downtime Lift", desc: "Ketersediaan sparepart yang lengkap mempercepat proses perbaikan sehingga operasional lift dapat kembali normal dalam waktu lebih singkat." },
      { title: "Memperpanjang Umur Lift", desc: "Penggunaan sparepart yang sesuai membantu menjaga performa dan usia pakai komponen lainnya." },
      { title: "Menekan Biaya Perbaikan", desc: "Kerusakan yang ditangani sejak dini dengan sparepart yang tepat dapat mencegah kerusakan yang lebih besar dan biaya perbaikan yang lebih mahal." }
    ],
    prodTitle: "Produk Sparepart Lift yang Tersedia",
    prodSub: "Menyediakan berbagai jenis sparepart lift untuk kebutuhan maintenance, repair, maupun modernisasi sistem elevator.",
    prodList: [
      { title: "Control System", list: ["Elevator Controller & Main Board", "PCB Lift & Drive Control Unit", "Inverter Lift & VVVF Drive", "Relay, Contactor, Power Supply"] },
      { title: "Motor & Mesin", list: ["Gearless & Geared Machine", "Brake Assembly & Coil", "Encoder & Traction Sheave", "Motor Bearing"] },
      { title: "Door System", list: ["Door Motor & Operator", "Door Roller & Lock", "Door Sensor & Guide Shoe", "Door Controller"] },
      { title: "Safety System", list: ["Governor & Safety Gear", "Limit Switch & Emergency Switch", "Overspeed Protection", "Safety Contact"] },
      { title: "Sensor Lift", list: ["Leveling & Magnetic Sensor", "Proximity & Encoder Sensor", "Load & Door Sensor", "Earthquake Sensor (Sensor Gempa)"] },
      { title: "Cabin & Hall", list: ["COP & LOP (Operating Panel)", "Push Button & Display Lift", "Indicator Panel & Voice Announcer", "Intercom Lift"] }
    ],
    prodFooter: "Selain lift, kami juga menyediakan berbagai sparepart untuk escalator dan travelator berbagai merek.",
    modernTitle: "Solusi Modernisasi Lift",
    modernDesc: "Kami melayani kebutuhan modernisasi lift untuk meningkatkan performa dan keamanan sistem elevator yang sudah beroperasi selama bertahun-tahun. Layanan meliputi:",
    modernList: [
      "Penggantian Controller & Upgrade Inverter",
      "Penggantian Door Operator & Upgrade Display",
      "Integrasi Sensor Gempa, BMS, dan Monitoring Lift"
    ],
    advTitle: "Keunggulan Panca Prima",
    advList: [
      { title: "Sparepart Terlengkap & Berkualitas", desc: "Ribuan jenis sparepart dari berbagai merek dengan seleksi kualitas optimal." },
      { title: "Dukungan Teknis Profesional", desc: "Bukan sekadar penjual, tim kami memberikan konsultasi teknis yang tepat sasaran." },
      { title: "Solusi Terintegrasi Penuh", desc: "Menyediakan juga BMS, RTMS, EWS, dan solusi Smart Building lainnya." }
    ],
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faqs: [
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
    ],
    ctaTitle: "Hubungi PT. Panca Prima Wijaya",
    ctaDesc: "Sedang mencari sparepart lift terlengkap untuk berbagai merek lift? Konsultasikan kebutuhan Anda sekarang dan dapatkan solusi sparepart lift terbaik.",
    ctaBtn: "KONSULTASI SEKARANG",
    ctaBtnProd: "LIHAT PRODUK"
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
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
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
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium mb-4">
            <AutoLinkText>{content.introPart2}</AutoLinkText>
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            <AutoLinkText>{content.introPart3}</AutoLinkText>
          </p>
        </div>
      </section>

      {/* Daftar Merk */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.supplierTitle}</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               {content.supplierSub}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
              <div className="flex flex-wrap gap-3 justify-center">
                 {content.brands.map((brand, index) => (
                   <span key={index} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded shadow-sm border border-blue-100">
                     {brand}
                   </span>
                 ))}
              </div>
              <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100 font-medium text-center">
                {content.supplierFooter}
              </p>
          </div>
        </div>
      </section>

      {/* Mengapa Penting */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-10 text-center">{content.whyTitle}</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
               {content.whyList.map((item, idx) => (
                 <div key={idx} className="bg-gray-50 border border-gray-100 p-6 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-16 h-16"/></div>
                   <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">{item.title}</h3>
                   <p className="text-sm text-gray-600 relative z-10">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Kategori Produk */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">{content.prodTitle}</h2>
            <p className="text-blue-100 text-center mb-12 max-w-3xl mx-auto">
              {content.prodSub}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {content.prodList.map((category, idx) => (
                   <div key={idx} className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                         <Cpu className="text-blue-400 w-5 h-5"/>
                         <h3 className="font-bold text-lg text-white">{category.title}</h3>
                      </div>
                      <ul className="space-y-1 text-xs text-blue-100 list-disc list-inside">
                        {category.list.map((item, keyIdx) => (
                          <li key={keyIdx}>{item}</li>
                        ))}
                      </ul>
                   </div>
                 ))}
            </div>

            <div className="mt-8 text-center bg-blue-900/40 p-4 rounded-lg border border-blue-400/20">
               <p className="text-sm font-medium">{content.prodFooter}</p>
            </div>
         </div>
      </section>

      {/* Modernisasi & Layanan Lain */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6 border-b border-gray-200 pb-2">{content.modernTitle}</h2>
                  <p className="text-sm text-gray-600 mb-4 bg-white p-3 border border-gray-200 rounded">
                    {content.modernDesc}
                  </p>
                  <div className="space-y-3">
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <PenTool className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">{content.modernList[0]}</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Wrench className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">{content.modernList[1]}</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Cable className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-800">{content.modernList[2]}</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6 border-b border-gray-200 pb-2">{content.advTitle}</h2>
                  <ul className="space-y-4">
                     {content.advList.map((item, idx) => (
                       <li key={idx} className="flex gap-3">
                          <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Settings className="w-4 h-4"/></div>
                          <div>
                             <strong className="block text-gray-900 text-sm mb-1">{item.title}</strong>
                             <span className="text-sm text-gray-600">{item.desc}</span>
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
      
      {/* CTA Konsultasi & Produk */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white border-t-4 border-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://ik.imagekit.io/cej2dcwlx/Panca%20Prima%20Wijaya.png" alt="PT Panca Prima Wijaya" className="w-full max-w-[500px] h-auto lg:w-[300px] lg:h-[300px] mx-auto mb-6 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">{content.ctaTitle}</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             {content.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto text-center">
               {content.ctaBtn}
             </a>
             <Link to={langLink("/produk")} className="inline-flex items-center justify-center gap-2 bg-white text-[#0a2558] hover:bg-gray-100 px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto text-center">
               {content.ctaBtnProd} <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
