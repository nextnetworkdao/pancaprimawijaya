import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { AutoLinkText } from '../../components/AutoLinkText';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';

export default function SanitasiGudangPage() {
  const { isEn } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = isEn ? {
    seoTitle: "Professional Food Warehouse Sanitation | Trusted Cleanliness Services - PT. Panca Prima Wijaya",
    seoDesc: "Professional food warehouse sanitation services to keep storage clean, secure, and pest-free. Covering cleaning, fogging, silos, containers, food production lines, and contamination prevention.",
    badge: "Professional Services",
    heroTitle: "Professional Food Warehouse Sanitation",
    heroSub: '"Keeping Warehouses Clean, Secure, and Pest-Free to guarantee your stored agricultural products retain optimal quality and trading standards."',
    ctaBtn: "Consult Now",
    introTitle: "Keeping Warehouses Clean, Secure, and Free of Crop Infestations",
    introDesc1: "A clean and well-maintained food storage warehouse is crucial in preserving the quality of agricultural commodities during long intervals. Scattered dust, crop residues, food spills, and uncleaned corners serve as prime breeding grounds for warehouse pests and biological pollutants capable of undermining your business reputation.",
    introDesc2: "PT. Panca Prima Wijaya offers expert Professional Food Warehouse Sanitation services, assisting industrial storage operators in maintaining sterile, clean, and pest-resistant environments. In combination with our professional fumigation treatments, rigorous sanitation is key to preventing re-infestation.",
    introDesc3: "Our tailored sanitation plans protect global food supply chains, minimize product losses, eliminate cross-contamination hazards, and help companies comply with food safety inspection audits.",
    whyTitle: "Why is Food Storage Sanitation So Critical?",
    whyDesc: "Many severe insect pest explosions begin from simple neglected dust or residual crop debris. Spilled grains and dirt accumulate in hidden architectural corners, providing food and shelter for insects and microflora.",
    whyBenefitsTitle: "With consistent, expert sanitation programs, operators experience immediate benefits, including:",
    whyList: [
      "Preserves the raw value and grade of agricultural produce.",
      "Vastly limits the probability of sudden warehouse insect spikes.",
      "Thwarts residual populations from triggering immediate re-infestation after gas fumigation.",
      "Reduces the threat of mechanical and structural cross-contamination.",
      "Suppresses dangerous mold, spore, and bacterial buildup.",
      "Reinforces overall national and international food safety rules.",
      "Dramatically cuts inventory loss due to damage or decay.",
      "Streamlines warehouse operations and inventory cycles.",
      "Earns passing grades for food manufacturing audits and exports."
    ],
    areaTitle: "Acreage & Facilities Under Our Scope",
    areaSub: "We apply deep sanitation practices to a wide range of logistics and resource stations:",
    areaSectors: [
      { title: "Commodity Warehouses", list: ["Rice & Paddy Bulk Bays", "Yellow Corn & Maize Silos", "Coffee & Cocoa Grain Depots", "Soybean & Raw Grain Piles", "Pet Feed Finished Warehouses"] },
      { title: "Industrial & Logistical Bays", list: ["Distribution & Forwarding Centers", "Raw Material Storage Hubs", "National Supply Logistics Depots", "Finished Goods Storage Warehouses"] },
      { title: "Storage Infrastructures", list: ["Large Metal Grain Silos", "Bulk Flat Warehouse Stacks", "Ports & Marine Grain Elevators", "National Reserve Buffer Pools"] },
      { title: "Freight & Export Liners", list: ["Commercial Shipping Containers", "Seaport Container Terminals", "Barges & Cargo Ship Holds", "Customs Inspection & Quarantine Lots"] }
    ],
    svcTitle: "Comprehensive Sanitation Services",
    svcDesc: "We provide high-precision environmental cleanup operations engineered for industrial food grids, custom silos, and distribution facilities:",
    svcList: [
      { title: "Deep Warehouse Cleaning", desc: "Meticulous dust and debris vacuuming of physical structures to eliminate webs, larvae channels, and spills.", list: ["Silo walls, beams, and overhead racks", "Loading docks and transport lanes", "Active grain bays and perimeter walls"] },
      { title: "Dual Fogging (Thermal & Cold)", desc: "Controlled fogging to immediately drop flying pests and prevent pest cycles from settling on raw stacks.", list: ["Aerosols reach complex rafters", "Destroys active adult beetles", "Eco-safe agricultural grade formulas"] },
      { title: "Silo & Container Clearing", desc: "Rigorous cleaning of massive vertical storage silo compartments and shipping boxes to prevent cross-contamination.", list: ["Physical removal of crust and scaling", "Fumigation preparation cleaning", "Marine freight box disinfection"] },
      { title: "Food Production Line Sanitation", desc: "Sterilizing packing tables, mill machines, conveyors, and food processing lines to ensure zero organic build-up.", list: ["Processing equipment sanitation", "Finished bag bays sanitizing", "Raw conveyor track clearing"] },
      { title: "Spill and Residue Cleanup", desc: "Targeted clearance of grain powders and damaged feed bags which act as structural magnets for larvae.", list: ["Sweeping of organic dust coats", "Disposal of infected feed materials", "Deep cleaning of crevices"] },
      { title: "Risk Prevention Audits & Monitoring", desc: "Scientific monitoring including insect traps, barrier audits, and structural seal checking.", list: ["Identification of crack entry-points", "Weevil population count traps", "Pest management advice docs"] }
    ],
    whyPPWTitle: "Why Partner with PT. Panca Prima Wijaya?",
    whyPPWList: [
      { title: "Certified Expertise", desc: "Operations run by licensed chemical applicators and food hygiene experts." },
      { title: "End-to-End Solutions", desc: "We coordinate sanitation plans directly alongside active weevil phosphine fumigation for maximum efficacy." },
      { title: "Industrial Gear", desc: "We deploy heavy-duty high-volume HEPA vacuums, powerful cold fogging machines, and secure safety wear." },
      { title: "Preventative Blueprint", desc: "We focus on long-term prevention, looking past simple sweeping to destroy pest reproduction channels." },
      { title: "Strict Compliance", desc: "Our methods comply with food safety inspection guidelines and standard crop protection rules." },
      { title: "Flexible Operational Timing", desc: "We adjust cleanup shifts to minimize interruptions to shipping, bagging, and receipt processes." }
    ],
    faqTitle: "FAQ About Our Sanitization Procedures",
    faqs: [
      { q: "What is the core purpose of food storage sanitation?", a: "It removes food sources, insect trails, dust, and moisture that attract pests, preventing mold and weevil breeding cycles." },
      { q: "How does sanitation differ from fumigation?", a: "Sanitation is the structural cleaning and prevention of pest resources. Fumigation utilizes toxic gas to kill active pests inside commodities." },
      { q: "Is sanitation necessary directly after a fumigation?", a: "Yes. Cleaning dead weevils and residual dust after gas aeration prevents mold and stops new weevils from re-infesting from other warehouse sectors." },
      { q: "What is cold fogging?", a: "Cold fogging generates fine micro-droplets of pesticide without heat, which is safe for food processing environments and leaves zero residual danger when executed by us." }
    ],
    ctaTitle: "Schedule Your Professional Warehouse Sanitation Audit",
    ctaDesc: "Keep your food storage clean, safe, and fully pest-free with Indonesia's premier crop preservation team."
  } : {
    seoTitle: "Sanitasi Gudang Pangan Profesional | Jasa Sanitasi Gudang Terpercaya - PT. Panca Prima Wijaya",
    seoDesc: "Sanitasi gudang pangan profesional untuk menjaga gudang tetap bersih, aman, dan bebas hama. Meliputi pembersihan gudang, fogging, sanitasi silo, kontainer, area produksi pangan, serta pencegahan kontaminasi.",
    badge: "Layanan Profesional",
    heroTitle: "Sanitasi Gudang Pangan Profesional",
    heroSub: '"Menjaga Gudang Tetap Bersih, Aman, dan Bebas Hama untuk memastikan kualitas komoditas yang disimpan tetap optimal."',
    ctaBtn: "Konsultasi Sekarang",
    introTitle: "Menjaga Gudang Tetap Bersih, Aman, dan Bebas Hama",
    introDesc1: "Gudang pangan yang bersih dan terawat merupakan faktor penting dalam menjaga kualitas komoditas selama penyimpanan. Debu, residu komoditas, tumpahan bahan pangan, serta area yang jarang dibersihkan dapat menjadi tempat berkembangnya berbagai jenis hama gudang dan sumber kontaminasi yang berpotensi merugikan bisnis Anda.",
    introDesc2: "PT. Panca Prima Wijaya hadir sebagai penyedia Sanitasi Gudang Pangan Profesional yang membantu perusahaan menjaga fasilitas penyimpanan tetap bersih, aman, higienis, dan bebas hama. Selain fumigasi, sanitasi gudang pangan menjadi langkah penting untuk mencegah infestasi ulang secara menyeluruh sehingga kualitas produk tetap terjaga selama proses penyimpanan maupun distribusi.",
    introDesc3: "Layanan sanitasi kami dirancang untuk mendukung program keamanan pangan, meningkatkan kualitas penyimpanan komoditas, mengurangi risiko kontaminasi, serta membantu menciptakan lingkungan gudang yang memenuhi standar industri modern.",
    whyTitle: "Mengapa Sanitasi Gudang Pangan Sangat Penting?",
    whyDesc: "Banyak kasus serangan hama gudang berawal dari kondisi fasilitas penyimpanan yang kurang bersih. Sisa komoditas yang tercecer, debu yang menumpuk, hingga area tersembunyi yang jarang dibersihkan dapat menjadi sumber berkembangnya hama dan mikroorganisme.",
    whyBenefitsTitle: "Dengan sanitasi yang dilakukan secara berkala, perusahaan dapat memperoleh berbagai manfaat seperti:",
    whyList: [
      "Menjaga kualitas komoditas selama penyimpanan.",
      "Mengurangi risiko serangan hama gudang.",
      "Mencegah infestasi ulang setelah fumigasi.",
      "Mengurangi risiko kontaminasi silang.",
      "Mencegah pertumbuhan jamur dan bakteri.",
      "Mendukung standar keamanan pangan.",
      "Mengurangi kerugian akibat kerusakan stok.",
      "Meningkatkan efisiensi operasional gudang.",
      "Mendukung kebutuhan audit dan sertifikasi industri pangan."
    ],
    areaTitle: "Area dan Fasilitas yang Dapat Disanitasi",
    areaSub: "PT. Panca Prima Wijaya melayani berbagai jenis fasilitas penyimpanan dan industri pangan:",
    areaSectors: [
      { title: "Gudang Komoditas", list: ["Gudang Beras & Jagung", "Gudang Biji Kopi & Kakao", "Gudang Kedelai & Kacang Tanah", "Gudang Kacang Hijau & Tepung", "Gudang Pakan Ternak"] },
      { title: "Gudang Industri & Logistik", list: ["Gudang Logistik & Distribusi", "Gudang Bahan Baku Industri", "Pusat Distribusi Nasional", "Gudang Produk Jadi"] },
      { title: "Fasilitas Penyimpanan", list: ["Silo Penyimpanan Komoditas", "Bulk Storage", "Terminal Penyimpanan Pangan", "Fasilitas Cadangan Pangan"] },
      { title: "Transportasi & Ekspor", list: ["Kontainer Ekspor & Impor", "Terminal Peti Kemas", "Kapal Pengangkut Komoditas", "Area Karantina Komoditas"] }
    ],
    svcTitle: "Layanan Sanitasi Gudang Pangan",
    svcDesc: "PT. Panca Prima Wijaya menyediakan layanan sanitasi menyeluruh yang dapat disesuaikan dengan kebutuhan gudang, silo, fasilitas produksi, maupun area distribusi pangan.",
    svcList: [
      { title: "Pembersihan Area Gudang", desc: "Pembersihan menyeluruh pada area gudang untuk menghilangkan debu, kotoran, sarang hama, residu komoditas, serta berbagai sumber kontaminasi lainnya.", list: ["Lantai dan dinding gudang", "Struktur bangunan dan rak penyimpanan", "Area bongkar muat dan lorong distribusi", "Area penyimpanan komoditas"] },
      { title: "Thermal & Cold Fogging", desc: "Layanan fogging untuk membantu mengendalikan serangga terbang maupun merayap yang berpotensi mengganggu kualitas komoditas dan lingkungan penyimpanan.", list: ["Menjangkau area sulit diakses", "Membantu mengurangi populasi serangga", "Mendukung pengendalian hama terpadu", "Cocok untuk area gudang dan produksi"] },
      { title: "Sanitasi Silo dan Kontainer", desc: "Silo penyimpanan dan kontainer ekspor-impor memerlukan sanitasi berkala untuk menjaga kualitas komoditas serta mengurangi risiko kontaminasi.", list: ["Pembersihan silo penyimpanan", "Sanitasi kontainer ekspor / impor", "Penghilangan residu komoditas", "Persiapan sebelum proses fumigasi"] },
      { title: "Sanitasi Area Produksi Pangan", desc: "Kami membantu menjaga kebersihan area produksi dan pengolahan pangan agar tetap memenuhi standar operasional yang baik.", list: ["Area produksi pangan dan packing", "Area pengemasan", "Ruang penyimpanan bahan baku", "Ruang distribusi produk"] },
      { title: "Pembersihan Residu Komoditas", desc: "Residu komoditas yang tertinggal sering menjadi sumber infestasi hama gudang. Kami menangani pembersihan dengan cermat.", list: ["Beras, jagung, kedelai, kakao", "Biji kopi, tepung, pakan ternak", "Biji-bijian lainnya"] },
      { title: "Pencegahan, Monitoring & Evaluasi", desc: "Program sanitasi komprehensif, mulai dari pencegahan debu dan kontaminasi silang hingga monitoring kutu, ngengat, dan tikus secara berkala.", list: ["Pemeriksaan kondisi bangunan", "Identifikasi sumber kontaminasi", "Evaluasi kebersihan fasilitas", "Rekomendasi pengelolaan hama"] }
    ],
    whyPPWTitle: "Mengapa Memilih PT. Panca Prima Wijaya?",
    whyPPWList: [
      { title: "Tim Profesional dan Berpengalaman", desc: "Ditangani oleh tenaga berpengalaman dalam sanitasi gudang pangan, pengendalian hama, dan penanganan pasca panen." },
      { title: "Solusi Terintegrasi", desc: "Menyediakan layanan sanitasi, fumigasi, inspeksi, monitoring hama, hingga rekomendasi pengelolaan gudang." },
      { title: "Peralatan Lengkap", desc: "Menggunakan peralatan sanitasi dan fogging yang sesuai dengan kebutuhan industri pangan." },
      { title: "Pendekatan Preventif dan Kuratif", desc: "Tidak hanya membersihkan, tetapi juga membantu mencegah munculnya infestasi baru." },
      { title: "Mendukung Keamanan Pangan", desc: "Membantu perusahaan menjaga kualitas produk dan memenuhi standar penyimpanan pangan yang baik." },
      { title: "Cakupan Layanan Luas", desc: "Melayanani gudang, silo, kontainer, area produksi, fasilitas logistik, hingga industri pengolahan pangan." }
    ],
    faqTitle: "FAQ Sanitasi Gudang Pangan Profesional",
    faqs: [
      { q: "Apa itu sanitasi gudang pangan?", a: "Sanitasi gudang pangan adalah proses pembersihan dan pengendalian sumber kontaminasi untuk menjaga area penyimpanan tetap bersih, aman, dan bebas hama." },
      { q: "Mengapa sanitasi gudang pangan penting?", a: "Sanitasi membantu mencegah serangan hama, pertumbuhan jamur, kontaminasi produk, serta menjaga kualitas komoditas selama penyimpanan." },
      { q: "Apa perbedaan sanitasi dan fumigasi?", a: "Sanitasi berfokus pada pembersihan sumber infestasi dan kontaminasi, sedangkan fumigasi bertujuan membasmi hama menggunakan fumigan hingga ke telur dan larva." },
      { q: "Apakah sanitasi perlu dilakukan setelah fumigasi?", a: "Ya. Sanitasi setelah fumigasi membantu mengurangi risiko infestasi ulang dan menjaga gudang tetap bersih dalam jangka panjang." }
    ],
    ctaTitle: "Konsultasikan Kebutuhan Sanitasi Gudang Pangan Anda",
    ctaDesc: "Jaga gudang tetap bersih, aman, dan bebas hama bersama ahlinya."
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title={content.seoTitle}
        description={content.seoDesc}
        type="website"
      />

      {/* Hero Section */}
      <section className="bg-[#0a2558] text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
                <ShieldCheck className="w-4 h-4 text-[#16a34a]" /> {content.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                {content.heroTitle}
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-xl leading-relaxed">
                {content.heroSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#konsultasi" className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded font-bold transition-all shadow-lg text-center">
                  {content.ctaBtn}
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a2558] to-transparent z-10 w-full h-full rounded-2xl"></div>
              <img src="https://ik.imagekit.io/cej2dcwlx/panca2.jpg" alt="Sanitasi Gudang Pangan Profesional" className="w-full h-[400px] object-cover rounded-2xl shadow-2xl relative z-0 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0a2558] mb-6">{content.introTitle}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed text-justify">
            <AutoLinkText>{content.introDesc1}</AutoLinkText>
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed text-justify">
            <AutoLinkText>{content.introDesc2}</AutoLinkText>
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            <AutoLinkText>{content.introDesc3}</AutoLinkText>
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 bg-[#f4f7f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Pentingnya Sanitasi */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0a2558] mb-4">{content.whyTitle}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {content.whyDesc}
              </p>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">{content.whyBenefitsTitle}</h4>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {content.whyList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Area dan Fasilitas */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-[#0a2558] mb-6">{content.areaTitle}</h3>
              <p className="text-gray-600 mb-6 text-sm">{content.areaSub}</p>
              
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                {content.areaSectors.map((sector, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-[#0a2558] mb-3 text-sm">{sector.title}</h4>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {sector.list.map((item, idy) => <li key={idy}>• {item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Layanan Sanitasi Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">{content.svcTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{content.svcDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.svcList.map((service, idx) => (
              <div key={idx} className="bg-[#f4f7f6] p-6 rounded-xl border border-gray-100">
                <h4 className="font-bold text-[#0a2558] text-lg mb-3">{service.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {service.list.map((item, keyIdx) => <li key={keyIdx}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mengapa Memilih Panca Prima Wijaya */}
      <section className="py-16 bg-[#0a2558] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">{content.whyPPWTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.whyPPWList.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded bg-[#16a34a] flex items-center justify-center flex-shrink-0 border border-green-400">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-blue-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.faqTitle}</h2>
          </div>
          
          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <details key={index} className="group bg-[#f4f7f6] p-6 rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-[#0a2558] list-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <p className="text-sm text-gray-600 mt-4 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <KlienKami />
      <GlobalCTA 
        title={content.ctaTitle} 
        description={content.ctaDesc} 
      />
    </div>
  );
}
