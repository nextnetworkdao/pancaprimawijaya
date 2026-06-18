import React, { useState } from 'react';
import { Target, Activity, ShieldCheck, Settings2, BarChart3, Database, Cable, Server, Home, Briefcase, Factory, Building2, Zap, Eye, MonitorSmartphone, Plus, Minus, ArrowRight, ArrowUpCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { TrustedBy } from '../../components/TrustedBy';
import { AutoLinkText } from '../../components/AutoLinkText';
import { useLanguage } from '../../context/LanguageContext';

export default function ToyoSensorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { isEn, langLink } = useLanguage();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const content = isEn ? {
    seoTitle: "Toyo Automation Seismic Sensors | Official Distributor PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya is the official distributor of Toyo Automation Seismic Sensors (Earthquake Sensors) in Indonesia. Protection solutions for lifts, buildings, hospitals, and industrial facilities.",
    badge: "OFFICIAL DISTRIBUTOR OF TOYO AUTOMATION",
    heroTitle: "Toyo Automation Earthquake Sensors for Buildings, Elevators, and Industrial Facilities",
    heroSub: '"Official Distributor of Toyo Automation Earthquake Sensors in Indonesia. Guard operational safety and infrastructure elements against seismic risks."',
    introPart1: "Earthquakes represent a critical hazard that can directly threaten human lives, building integrity, and the operational continuity of essential facilities. Therefore, installing an Earthquake Sensor has become a pivotal cornerstone in modern safety mitigations and building safety codes.",
    introPart2: "PT. Panca Prima Wijaya is the official distributor of Toyo Automation Seismic Sensors in Indonesia, appointed directly by the manufacturer to offer premium products, detailed consulting, professional installation, integration, and continuous technical support.",
    introPart3: "Leveraging swift and highly precise seismic activation metrics, Toyo Automation Earthquake Sensors instantly trigger security automations to minimize structural risk and preserve human lives.",
    whatIsTitle: "What is an Earthquake Sensor?",
    whatIsDesc: "An Earthquake Sensor (Seismic Sensor) is a device engineered to detect seismic activity and vibrations resulting from an earthquake. In the event vibrations exceed a preconfigured threshold, it immediately triggers safety systems or shuts down machinery automatically.",
    whatIsListTitle: "Earthquake sensors are commonly utilized in:",
    whatIsList: [
      "High-rise Buildings",
      "Hospitals",
      "Data Centers",
      "Industrial Factories",
      "Malls & Hotels",
      "Airports & Ports",
      "Elevators & Lifts",
      "Public Infrastructures",
      "Energy & Water Facilities"
    ],
    whatIsFooter: '"With swift, instantaneous detection, protective measures are launched before seismic shockwaves amplify damages."',
    whyTitle: "Why are Earthquake Sensors Crucial?",
    whyList: [
      { title: "Protect Inhabitant Safety", desc: "Instant warnings guide building occupants and operators to initiate rapid evacuations and protective protocols." },
      { title: "Minimize Damage Risks", desc: "Allows mechanical systems to launch immediate preservation protocols, neutralizing extreme forces." },
      { title: "Support Evacuation Protocols", desc: "Can be connected with building alarms, exit signs, and automated command rooms to coordinate escape routes." },
      { title: "Protect Vital Equipment", desc: "Deactivates sensitive assets like data servers, production lines, power grids, and boiler burners when seismic force rises." },
      { title: "Meet Industrial Safety Codes", desc: "Modern architectural standards and mission-critical installations increasingly mandate earthquake detection nodes." }
    ],
    tacAppTitle: "TAC Earthquake Detection Applications",
    tacAppSub: "How simple detection accessories from TAC safeguard real-world facilities:",
    tacAppList: [
      { title: "LPG Storage Systems", desc: "Shuts down gas valves automatically upon seismic detection to prevent massive gas leaks or explosions." },
      { title: "Water Reservoirs", desc: "Keeps heavy fluid tanks structural units sound by managing overflow dynamics upon seismicity." },
      { title: "Lifts & Elevators", desc: "Halts elevator operations, routing the cabin to the closest floor and opening doors for instant egress." },
      { title: "Industrial Boilers", desc: "Deactivates high-temperature boiler lines instantly to eliminate fire and explosion hazards." },
      { title: "Corporate Assets", desc: "Communicates directly with Building Automation Systems for organized regional safety operations." },
      { title: "Precision Machinery", desc: "Secures high-value calibration structures and precise robotic machinery against sudden displacements." }
    ],
    toyoTitle: "Toyo Automation Seismic Solutions",
    toyoDesc: "Toyo Automation is a globally recognized pioneer in seismological automation and sensor controls for modern industrial and civil safety.",
    toyoFeaturesTitle: "Toyo Features & Advantages",
    toyoFeatures: [
      "Ultra-Fast Precise Seismic Detection",
      "Real-Time Automatic Trigger Controls",
      "Seamless Dashboard Live Observability",
      "IoT Connectivity & Remote Operations"
    ],
    toyoIntegrationTitle: "System Integrations",
    toyoIntegration: [
      "Building Management System (BMS)",
      "Early Warning System (EWS)",
      "Elevators & Smart Lifts",
      "Fire Alarms & Security Networks"
    ],
    toyoFooter: "Through these integrations, real-time parameters are consolidated inside a singular dashboard, allowing emergency actions to unfold instantly and uniformly.",
    liftTitle: "Earthquake Sensors for Elevators & Lifts",
    liftDesc: "A critical area of seismic sensors is passenger elevator structures. High-rises utilize these sensors to prevent cabins from trapping passengers mid-shaft.",
    liftList: [
      "Safely halting moving elevator systems",
      "Routing cabin to the nearest available floor",
      "Opening doors automatically for immediate escape",
      "Preventing passengers from getting trapped"
    ],
    pancaTitle: "PT. Panca Prima Wijaya Solutions",
    pancaDesc: "As the authorized distributor appointed directly by Toyo Automation, we manage your safety lifecycle end-to-end:",
    pancaList: [
      { title: "Custom Safety Consultation", desc: "We review your facility layouts to design highly custom and optimal seismological safety plans." },
      { title: "Authorized Original Hardware", desc: "We guarantee only official, genuine, and factory-certified Toyo Automation hardware with global warranties." },
      { title: "Deployment & Commissioning", desc: "Expert field engineers handle mounts, calibration tests, BMS sync, and crew rescue instructions." }
    ],
    whyUsTitle: "Why Choose PT. Panca Prima Wijaya?",
    whyUsList: [
      { title: "Official Distributor", desc: "Appointed directly by Toyo Automation brand curators" },
      { title: "Original with Warranty", desc: "Genuine products backed by official technical engineers" },
      { title: "Expert Crew", desc: "Highly trained team in automation and building safety structures" },
      { title: "Unified Solutions", desc: "Full compatibility with BMS, EWS, RTMS and advanced IoT" }
    ],
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      {
        question: "What is the primary function of an Earthquake Sensor?",
        answer: "Its primary function is to immediately identify seismic vibrations and deliver digital signals to stop machinery, sound alarms, or secure elevators instantly."
      },
      {
        question: "Why is it mandatory for elevator systems?",
        answer: "Elevator structures can shift or warp during seismic incidents. Shutting down elevators ensures passengers are evacuated rather than stuck in shafts."
      },
      {
        question: "Does it connect with BMS?",
        answer: "Yes, Toyo sensors are built on standard industrial relays and protocols, connecting flawlessly with BMS, EWS, SCADA, and Fire panels."
      },
      {
        question: "Is PT. Panca Prima Wijaya the official distributor for Toyo?",
        answer: "Yes. PT. Panca Prima Wijaya is the official distributor appointed directly by Toyo Automation in Indonesia."
      },
      {
        question: "Which facilities need seismic sensors most?",
        answer: "Hospitals, office multi-stories, industrial refineries, boiler rooms, gas facilities, and high-occupancy residential towers."
      }
    ],
    ctaTitle: "Contact PT. Panca Prima Wijaya",
    ctaDesc: "Protect your high-value assets and ensure building occupant safety with Toyo Automation's world-leading seismic detection technology.",
    ctaBtn: "CONSULT NOW",
    ctaBtnProd: "VIEW PRODUCTS"
  } : {
    seoTitle: "Sensor Gempa Toyo Automation | Distributor Resmi PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya adalah distributor resmi Sensor Gempa Toyo Automation di Indonesia. Solusi deteksi gempa untuk lift, gedung, rumah sakit, data center, dan fasilitas industri.",
    badge: "DISTRIBUTOR RESMI TOYO AUTOMATION",
    heroTitle: "Sensor Gempa Toyo Automation untuk Gedung, Lift, dan Fasilitas Industri",
    heroSub: '"Distributor Resmi Sensor Gempa Toyo Automation di Indonesia. Lindungi keselamatan operasional dan infrastruktur dari risiko seismik."',
    introPart1: "Gempa bumi merupakan salah satu risiko yang dapat mengancam keselamatan manusia, bangunan, serta operasional fasilitas penting. Oleh karena itu, penggunaan Sensor Gempa menjadi bagian penting dalam sistem mitigasi risiko dan keselamatan bangunan modern.",
    introPart2: "PT. Panca Prima Wijaya merupakan distributor resmi Sensor Gempa Toyo Automation di Indonesia yang ditunjuk langsung oleh principal untuk menyediakan produk, konsultasi, instalasi, integrasi, serta dukungan teknis bagi berbagai sektor industri dan bangunan.",
    introPart3: "Melalui teknologi deteksi gempa yang cepat dan akurat, Sensor Gempa Toyo Automation membantu memberikan peringatan dini sehingga sistem keamanan dapat bekerja lebih cepat dalam meminimalkan risiko kerusakan maupun kecelakaan.",
    whatIsTitle: "Apa Itu Sensor Gempa?",
    whatIsDesc: "Sensor Gempa adalah perangkat yang dirancang untuk mendeteksi getaran atau aktivitas seismik yang terjadi akibat gempa bumi. Ketika getaran terdeteksi melebihi ambang batas yang telah ditentukan, sistem akan mengirimkan sinyal peringatan atau menjalankan prosedur keselamatan secara otomatis.",
    whatIsListTitle: "Sensor gempa banyak digunakan pada:",
    whatIsList: [
      "Gedung Bertingkat",
      "Rumah Sakit",
      "Data Center",
      "Pabrik Industri",
      "Pusat Perbelanjaan & Hotel",
      "Bandara & Pelabuhan",
      "Lift dan Elevator",
      "Infrastruktur Publik",
      "Fasilitas Energi & Utilitas"
    ],
    whatIsFooter: '"Dengan deteksi yang cepat, tindakan mitigasi dapat dilakukan sebelum dampak gempa menjadi lebih besar."',
    whyTitle: "Mengapa Sensor Gempa Penting?",
    whyList: [
      { title: "Melindungi Keselamatan Penghuni", desc: "Peringatan dini membantu penghuni gedung maupun operator fasilitas mengambil tindakan yang lebih cepat saat terjadi gempa." },
      { title: "Mengurangi Risiko Kerusakan", desc: "Sistem dapat mengaktifkan prosedur keselamatan untuk meminimalkan dampak terhadap bangunan dan peralatan." },
      { title: "Mendukung Sistem Evakuasi", desc: "Sensor gempa dapat terintegrasi dengan alarm, sistem evakuasi, dan pusat kontrol gedung untuk mempercepat respons darurat." },
      { title: "Melindungi Peralatan Kritis", desc: "Peralatan penting seperti server, mesin produksi, kelistrikan, dan utilitas dapat diamankan lebih cepat saat aktivitas seismik." },
      { title: "Memenuhi Standar Keselamatan", desc: "Banyak bangunan modern dan fasilitas kritis yang mulai menerapkan sistem deteksi gempa sebagai bagian dari standar keamanan operasional." }
    ],
    tacAppTitle: "Aplikasi Alat Sensor Gempa TAC",
    tacAppSub: "Beginilah ilustrasi bagaimana alat pendeteksi gempa bumi sederhana dari TAC bekerja di lapangan untuk berbagai fasilitas:",
    tacAppList: [
      { title: "Fasilitas LPG", desc: "Mencegah kebocoran gas dan ledakan akibat gempa dengan mematikan sistem secara otomatis saat gempa terdeteksi." },
      { title: "Tangki Air", desc: "Melindungi struktur tangki air dari kerusakan dengan mendeteksi getaran gempa dan mengaktifkan sistem pengaman." },
      { title: "Lift", desc: "Menghentikan lift dan membawanya ke lantai terdekat untuk evakuasi aman saat gempa terdeteksi." },
      { title: "Boiler", desc: "Mematikan boiler secara otomatis untuk mencegah kebakaran dan ledakan saat gempa terjadi." },
      { title: "Bangunan Kantor", desc: "Mengintegrasikan dengan sistem Building Automation System untuk evakuasi dan penyelamatan yang terkoordinasi." },
      { title: "Pabrik Alat Presisi", desc: "Melindungi peralatan presisi mahal dengan mematikan sistem saat getaran gempa terdeteksi." }
    ],
    toyoTitle: "Sensor Gempa Toyo Automation",
    toyoDesc: "Toyo Automation merupakan perusahaan yang mengembangkan teknologi sensor dan sistem monitoring untuk kebutuhan industri, gedung, serta infrastruktur modern.",
    toyoFeaturesTitle: "Fitur & Keunggulan Toyo",
    toyoFeatures: [
      "Deteksi Gempa Cepat dan Akurat",
      "Respon Otomatis Real-Time",
      "Monitoring melalui Dashboard",
      "Dukungan Sistem IoT & Remote Monitoring"
    ],
    toyoIntegrationTitle: "Integrasi Sistem",
    toyoIntegration: [
      "Building Management System (BMS)",
      "Early Warning System (EWS)",
      "Lift dan Elevator",
      "Fire Alarm System & Security"
    ],
    toyoFooter: "Melalui integrasi tersebut, seluruh informasi dapat dipantau melalui satu dashboard terpusat sehingga respons terhadap keadaan darurat menjadi lebih cepat dan terkoordinasi.",
    liftTitle: "Aplikasi Sensor Gempa untuk Lift",
    liftDesc: "Salah satu aplikasi penting Sensor Gempa adalah pada sistem lift dan elevator. Karena alasan inilah banyak gedung tinggi mulai menerapkan sensor gempa sebagai bagian keselamatan.",
    liftList: [
      "Menghentikan operasi lift secara aman",
      "Mengarahkan lift ke lantai terdekat",
      "Membuka pintu lift otomatis",
      "Mencegah penumpang terjebak"
    ],
    pancaTitle: "Solusi PT. Panca Prima Wijaya",
    pancaDesc: "Sebagai distributor resmi yang ditunjuk langsung oleh Toyo Automation, kami menyediakan layanan lengkap:",
    pancaList: [
      { title: "Konsultasi Kebutuhan Sistem", desc: "Analisis kebutuhan fasilitas dan rekomendasi solusi sensor gempa yang sesuai." },
      { title: "Penyediaan Produk Original", desc: "Menjamin produk Sensor Gempa Toyo Automation asli dan didukung garansi resmi." },
      { title: "Instalasi, Integrasi & Commissioning", desc: "Pemasangan sensor serta integrasi dengan sistem yang sudah ada & training." }
    ],
    whyUsTitle: "Mengapa Memilih Kami?",
    whyUsList: [
      { title: "Distributor Resmi", desc: "Ditunjuk langsung Toyo Automation" },
      { title: "Original & Garansi", desc: "Produk asli & technical support jelas" },
      { title: "Tim Berpengalaman", desc: "Otomasi dan keselamatan bangunan" },
      { title: "Solusi Terintegrasi", desc: "Mendukung BMS, EWS, RTMS & IoT" }
    ],
    faqTitle: "Pertanyaan yang Sering Diajukan (FAQ)",
    faqs: [
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
    ],
    ctaTitle: "Hubungi PT. Panca Prima Wijaya",
    ctaDesc: "Tingkatkan keselamatan bangunan dan fasilitas Anda dengan teknologi Sensor Gempa Toyo Automation yang cepat, akurat, dan terintegrasi.",
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
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-red-500/20 text-red-200 font-bold text-xs rounded-full mb-6 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
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

      {/* Apa Itu Sensor Gempa */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.whatIsTitle}</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {content.whatIsDesc}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
             <p className="text-sm text-gray-600 mb-4 font-medium">{content.whatIsListTitle}</p>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-500" /> {content.whatIsList[0]}</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /> {content.whatIsList[1]}</div>
                <div className="flex items-center gap-2"><Server className="w-4 h-4 text-blue-500" /> {content.whatIsList[2]}</div>
                <div className="flex items-center gap-2"><Factory className="w-4 h-4 text-blue-500" /> {content.whatIsList[3]}</div>
                <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-500" /> {content.whatIsList[4]}</div>
                <div className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-500" /> {content.whatIsList[5]}</div>
                <div className="flex items-center gap-2"><ArrowUpCircle className="w-4 h-4 text-blue-500" /> {content.whatIsList[6]}</div>
                <div className="flex items-center gap-2"><Cable className="w-4 h-4 text-blue-500" /> {content.whatIsList[7]}</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-500" /> {content.whatIsList[8]}</div>
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
                   <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-16 h-16"/></div>
                   <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10">{item.title}</h3>
                   <p className="text-sm text-gray-600 relative z-10">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Aplikasi Alat Sensor Gempa TAC */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">{content.tacAppTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.tacAppSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.tacAppList.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-16 h-16"/></div>
                <h3 className="font-bold text-[#0a2558] text-lg mb-2 relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" /> {item.title}
                </h3>
                <p className="text-sm text-gray-600 relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toyo Automation */}
      <section className="py-12 sm:py-20 bg-[#0a2558] text-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">{content.toyoTitle}</h2>
            <p className="text-blue-100 text-center mb-12 max-w-3xl mx-auto">
              {content.toyoDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-white mb-4">{content.toyoFeaturesTitle}</h3>
                    <ul className="space-y-3 text-sm text-blue-100">
                      {content.toyoFeatures.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Activity className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                 </div>
                 
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-white mb-4">{content.toyoIntegrationTitle}</h3>
                    <ul className="space-y-3 text-sm text-blue-100">
                      {content.toyoIntegration.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Building2 className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                 </div>
            </div>

            <div className="mt-8 text-center bg-blue-900/40 p-4 rounded-lg border border-blue-400/20">
               <p className="text-sm font-medium">{content.toyoFooter}</p>
            </div>
         </div>
      </section>

      {/* Aplikasi Pada Lift & Solusi Panca Prima*/}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.liftTitle}</h2>
                  <p className="text-sm text-gray-600 mb-4 bg-white p-3 border border-gray-200 rounded">
                    {content.liftDesc}
                  </p>
                  <div className="space-y-3">
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <ArrowUpCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">{content.liftList[0]}</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Building2 className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">{content.liftList[1]}</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <Eye className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">{content.liftList[2]}</span>
                     </div>
                     <div className="bg-white p-3 flex gap-3 rounded shadow-sm border border-gray-100 items-center">
                        <ShieldCheck className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-800">{content.liftList[3]}</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.pancaTitle}</h2>
                  <p className="text-sm text-gray-600 mb-4">{content.pancaDesc}</p>
                  <ul className="space-y-4">
                     {content.pancaList.map((item, idx) => (
                       <li key={idx} className="flex gap-3">
                          <div className="mt-1 p-1 bg-blue-100 rounded text-blue-600 h-fit"><Settings2 className="w-4 h-4"/></div>
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

      {/* Keunggulan & Industri */}
      <section className="py-12 sm:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-black text-[#0a2558] mb-6">{content.whyUsTitle}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
               {content.whyUsList.map((item, idx) => (
                 <div key={idx}>
                   <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-3"><Briefcase className="w-6 h-6"/></div>
                   <h4 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h4>
                   <p className="text-xs text-gray-600">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.faqTitle}</h2>
          </div>
          
          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
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
          <h2 className="text-2xl sm:text-3xl font-black mb-4 uppercase tracking-tight">{content.ctaTitle}</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium mb-8 max-w-2xl mx-auto">
             {content.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto text-center">
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
