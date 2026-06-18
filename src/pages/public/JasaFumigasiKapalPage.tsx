import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Anchor } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { AutoLinkText } from '../../components/AutoLinkText';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';

export default function JasaFumigasiKapalPage() {
  const { isEn } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = isEn ? {
    seoTitle: "Professional Vessel & Ship Fumigation Services | Cargo & Maritime Export Preservation - PT. Panca Prima Wijaya",
    seoDesc: "Professional vessel and ship fumigation services to kill pests on cargo ships, bulk commodity carriers, and dry export/import containers. Reliable maritime solutions ensuring phytosanitary compliance.",
    badge: "Professional Services",
    heroTitle: "Professional Vessel & Ship Fumigation",
    heroSub: '"Effective Solutions to Shield Your Commodities and Marine Vessels Against Pest Infestations During Transit."',
    ctaBtn: "Consult Now",
    introTitle: "Securing Commodities and Assets During Maritime Transit",
    introDesc1: "Merchant and logistics vessels form the backbone of national and international trade routes. However, during storage and ocean transit, various grain and cargo pests thrive, threatening raw cargoes, structural integrity, and commercial grades.",
    introDesc2: "PT. Panca Prima Wijaya excels in professional Marine Vessel Fumigation services, serving shipping lines, global exporters, grain importers, and food industry groups with authoritative pest control.",
    introDesc3: "We utilize highly penetrative gas treatment protocols designed to target even hard-to-reach structural voids in cargo holds, securing supply chains and complying with international customs inspections.",
    whatIsTitle: "What is Ship & Vessel Fumigation?",
    whatIsDesc1: "Ship fumigation involves applying gaseous chemical agents under strict air-sealed boundaries within cargo holds, empty storage compartments, and ballast chambers to eradicate insect populations.",
    whatIsIntroList: "Vessel fumigation is commonly performed on:",
    whatIsList: [
      "Bulk cargo carriers", "Agricultural commodity shippers", "Industrial raw material vessels",
      "International export-import liners", "Food-grade shipping fleets", "Marine logistics vessels"
    ],
    whatIsFooter: "This process provides structural protection, preserving the monetary value of food commodities during long transoceanic voyages.",
    whyTitle: "Why is Ship Fumigation Essential?",
    whyIntro: "An active infestation inside cargo holds during shipping waves can lead to severe operational and monetary losses:",
    whyList: [
      "Substandard commodity depreciation.",
      "Direct decay of edible cargo.",
      "Structural mold and insect contamination of container walls.",
      "Outright cargo rejection by foreign target buyers.",
      "Massive financial losses and insurance claims.",
      "Vessel quarantine delays at international ports.",
      "Disruption of international import/export timelines."
    ],
    whyFooter: "Phytosanitary maritime fumigation helps mitigate these cross-border terminal risks completely.",
    svcTitle: "Vessel Fumigation Service Range",
    svcList: [
      { title: "Cargo Vessel Fumigation", desc: "Protecting bulk commodities in large cargo holds against pest populations during several weeks of sea shipment." },
      { title: "Hold Prep Fumigation", desc: "Sanitizing empty cargo holds to prevent residue from preceding grain shipments from infecting new stockpiles." },
      { title: "Pre-Export Maritime Treatment", desc: "Performing rapid portside fumigation treatments to comply with phytosanitary customs guidelines." },
      { title: "Post-Discharge Treatment", desc: "Eradicating residual pest vectors directly after unloading cargo to avoid infesting subsequent shipment cycles." },
      { title: "Agricultural Freight Holds", desc: "We have massive experience caring for high-risk maritime goods:", list: ["Rice & Maize Cargoes", "Soybean & Cocoa Bulk", "Green Coffee Beans", "Wheat & Pet Feeds"] }
    ],
    additionalTitle: "Not Just Ships, We Safeguard a Wide Array of High-Value Assets",
    additionalDesc: "We provide fully integrated export-import Container Fumigation. Beyond marine vessels, our customized programs preserve public facilities, archive libraries, and transport assets from pest degradation.",
    additionalAssets: [
      { title: "Archival & Document Custodies", list: ["Government Archives", "Public Libraries", "Historical Museums", "National Document Storage"] },
      { title: "Transportation & Transit Systems", list: ["Public Bus Fleets", "Railway Systems", "Export & Import Sea Containers", "Dry Freight Cargo Liners", "Port Warehouse Hubs"] },
      { title: "Industrial Storage Facilities", list: ["Global Logistics Depots", "Raw Ingredient Storages", "Retail Distribution Warehouses", "Commercial Silo Stacks"] },
      { title: "Crop & Commodity Reserves", list: ["Large Metal Feed Silos", "Food Processing Plants", "Bulk Paddy Barns", "Agricultural Collection Depots"] }
    ],
    advTitle: "Advantages of Our Ship Fumigation Services",
    advList: [
      { title: "Experienced Maritime Personnel", desc: "Our technicians understand specialized ship layouts, gas seals, and port safety rules." },
      { title: "Highly Penetrative Methods", desc: "Gaseous fumigants reach deep within complex bulk configurations and double-bottom holds." },
      { title: "Export Regulations Support", desc: "We support phytosanitary certifications required for international borders." },
      { title: "Multi-Commodity Expertise", desc: "Acclaimed experience with rice, maize, coffee, pet food, cocoa, and various other grains." },
      { title: "Integrated Portside Plans", desc: "We coordinate container, vessel, warehouse, and sanitization services at major ports." },
      { title: "Professional Operation Standards", desc: "We use gas leak detection and safety monitoring tools for secure, successful execution." }
    ],
    whyPPWTitle: "Why Partner with PT. Panca Prima Wijaya?",
    whyPPWDesc1: "PT. Panca Prima Wijaya holds extensive experience in commercial crop preservation, vessel fumigation, export container sanitization, and large-scale pest management.",
    whyPPWDesc2: "We help logistics operators, maritime companies, food producers, and seed exporters secure product quality while minimizing severe commercial damage during ocean freight.",
    faqTitle: "FAQ About Vessel & Ship Fumigation",
    faqs: [
      { q: "What is ship fumigation?", a: "It is the application of gaseous fumigants inside vessel holds, shipping containers, and compartments to eradicate woodborers, weevils, and other pests." },
      { q: "Why is ship fumigation necessary?", a: "It prevents pests from breeding and consuming grain during long sea routes, ensuring international quarantine compliance." },
      { q: "What types of vessels do you treat?", a: "We treat bulk commodity carriers, dry container liners, freight ships, barges, and maritime storage assets." },
      { q: "Do you offer container fumigation besides ships?", a: "Yes. We offer fully certified on-chassis, dry-container, and terminal-stack container fumigation services." }
    ],
    ctaTitle: "Schedule Your Portside Maritime Vessel Fumigation",
    ctaDesc: "Need to secure your bulk commodity shipment? Discuss your shipping schedule with Indonesia's premier vessel preservation team for a custom quote."
  } : {
    seoTitle: "Jasa Fumigasi Kapal Profesional | Fumigasi Kapal Kargo & Ekspor - PT. Panca Prima Wijaya",
    seoDesc: "Jasa fumigasi kapal profesional untuk membasmi hama pada kapal kargo, kapal pengangkut komoditas, dan kontainer ekspor impor. Solusi efektif menjaga kualitas komoditas dan memenuhi kebutuhan perdagangan internasional.",
    badge: "Layanan Profesional",
    heroTitle: "Jasa Fumigasi Kapal Profesional",
    heroSub: '"Solusi Efektif Melindungi Komoditas dan Aset Selama Pengiriman dari serangan hama yang merugikan."',
    ctaBtn: "Konsultasi Sekarang",
    introTitle: "Solusi Efektif Melindungi Komoditas dan Aset Selama Pengiriman",
    introDesc1: "Kapal pengangkut komoditas memiliki peran penting dalam rantai distribusi nasional maupun internasional. Namun, selama proses penyimpanan dan pengiriman, berbagai jenis hama dapat berkembang dan menyebabkan kerusakan pada muatan, fasilitas penyimpanan, maupun aset bernilai lainnya.",
    introDesc2: "PT. Panca Prima Wijaya hadir sebagai penyedia Jasa Fumigasi Kapal Profesional yang membantu perusahaan pelayaran, eksportir, importir, operator logistik, serta industri pengolahan pangan dalam mengendalikan hama secara efektif dan menyeluruh.",
    introDesc3: "Kami menggunakan metode fumigasi yang dirancang untuk membasmi berbagai jenis hama hingga ke area yang sulit dijangkau, sehingga membantu menjaga kualitas komoditas, mencegah kerugian ekonomi, serta mendukung kelancaran distribusi barang.",
    whatIsTitle: "Apa Itu Jasa Fumigasi Kapal?",
    whatIsDesc1: "Jasa fumigasi kapal adalah proses pengendalian hama menggunakan fumigan yang diaplikasikan pada ruang muatan kapal, area penyimpanan, maupun kompartemen tertentu untuk membasmi serangga dan organisme pengganggu lainnya.",
    whatIsIntroList: "Fumigasi kapal umumnya dilakukan pada:",
    whatIsList: [
      "Kapal kargo", "Kapal pengangkut komoditas pertanian", "Kapal pengangkut bahan baku industri",
      "Kapal ekspor dan impor", "Kapal pengangkut pangan", "Kapal logistik"
    ],
    whatIsFooter: "Metode ini efektif untuk mengendalikan hama yang dapat merusak muatan selama perjalanan maupun saat penyimpanan.",
    whyTitle: "Mengapa Fumigasi Kapal Sangat Penting?",
    whyIntro: "Serangan hama selama proses pengiriman dapat menyebabkan berbagai kerugian serius bagi kelancaran bisnis Anda:",
    whyList: [
      "Penurunan kualitas komoditas.",
      "Kerusakan produk pangan.",
      "Kontaminasi muatan.",
      "Penolakan produk oleh buyer.",
      "Kerugian finansial.",
      "Gangguan proses ekspor dan impor.",
      "Risiko pelanggaran standar perdagangan internasional."
    ],
    whyFooter: "Melalui fumigasi kapal yang dilakukan secara profesional, risiko tersebut dapat diminimalkan secara signifikan.",
    svcTitle: "Layanan Jasa Fumigasi Kapal PT. Panca Prima Wijaya",
    svcList: [
      { title: "Fumigasi Kapal Kargo", desc: "Pengendalian hama pada kapal pengangkut berbagai jenis komoditas untuk menjaga kualitas barang selama perjalanan." },
      { title: "Fumigasi Ruang Muatan Kapal", desc: "Membantu memastikan area penyimpanan komoditas bebas dari infestasi hama sebelum dan sesudah proses pengiriman." },
      { title: "Fumigasi Sebelum Ekspor", desc: "Membantu memenuhi persyaratan perdagangan internasional dan menjaga kualitas komoditas tujuan ekspor." },
      { title: "Fumigasi Setelah Pembongkaran", desc: "Mengendalikan potensi infestasi yang tersisa setelah proses bongkar muat untuk mencegah penyebaran hama ke pengiriman berikutnya." },
      { title: "Fumigasi Kapal Pengangkut Komoditas", desc: "Berpengalaman menangani berbagai jenis muatan komoditas pertanian yang rentan terhadap hama gudang:", list: ["Beras & Jagung", "Kedelai & Kakao", "Biji Kopi", "Gandum & Pakan Ternak"] }
    ],
    additionalTitle: "Tidak Hanya Kapal, Kami Juga Melindungi Berbagai Aset Penting",
    additionalDesc: "Terintegrasi dengan Jasa Fumigasi Kontainer bagi eksportir dan importir. Melalui metode yang tepat, kami membantu menjaga fasilitas, sarana transportasi, dan penyimpanan dari risiko kerugian.",
    additionalAssets: [
      { title: "Arsip & Fasilitas Dokumen", list: ["Arsip Dokumen", "Perpustakaan", "Museum", "Pusat Arsip Nasional", "Gedung Pemerintahan", "Fasilitas Militer & Pertahanan", "Kantor Operasional"] },
      { title: "Transportasi & Logistik", list: ["Armada Bus", "Kereta Api", "Kontainer  Ekspor dan Impor", "Kapal Kargo", "Kapal Pengangkut Komoditas", "Terminal Peti Kemas", "Pergudangan Pelabuhan"] },
      { title: "Industri & Pergudangan", list: ["Gudang Logistik & Distribusi", "Gudang Bahan Baku Industri", "Pusat Distribusi Retail", "Fasilitas Penyimpanan Industri", "Fasilitas Penyimpanan Produk Ekspor"] },
      { title: "Penyimpanan Komoditas", list: ["Silo Penyimpanan Biji-bijian", "Pabrik Pengolahan Pangan", "Gudang Komoditas Pertanian", "Area Penyimpanan Hasil Panen"] }
    ],
    advTitle: "Keunggulan Jasa Fumigasi Kapal PT. Panca Prima Wijaya",
    advList: [
      { title: "Tim Berpengalaman", desc: "Didukung tenaga profesional yang memahami prosedur fumigasi pada kapal dan fasilitas logistik." },
      { title: "Metode Efektif", desc: "Mampu menjangkau area yang sulit diakses dan membasmi hama secara menyeluruh." },
      { title: "Mendukung Kebutuhan Ekspor Impor", desc: "Membantu menjaga kualitas komoditas selama proses perdagangan internasional." },
      { title: "Penanganan Berbagai Komoditas", desc: "Berpengalaman menangani beras, jagung, kopi, kakao, kedelai, pakan ternak, dan komoditas lainnya." },
      { title: "Pelayanan Terintegrasi", desc: "Tersedia layanan fumigasi kapal, kontainer, gudang, serta sanitasi fasilitas penyimpanan." },
      { title: "Standar Kerja Profesional", desc: "Pekerjaan dilakukan dengan prosedur yang terukur untuk memastikan efektivitas dan keamanan." }
    ],
    whyPPWTitle: "Mengapa Memilih PT. Panca Prima Wijaya?",
    whyPPWDesc1: "PT. Panca Prima Wijaya merupakan perusahaan yang berpengalaman dalam layanan fumigasi komoditas, fumigasi kapal, fumigasi kontainer, sanitasi gudang pangan, dan pengendalian hama penyimpanan.",
    whyPPWDesc2: "Kami membantu perusahaan logistik, eksportir, importir, industri pangan, dan pemilik komoditas menjaga kualitas produk sekaligus meminimalkan risiko kerugian akibat infestasi hama selama penyimpanan maupun pengiriman.",
    faqTitle: "FAQ Jasa Fumigasi Kapal",
    faqs: [
      { q: "Apa itu jasa fumigasi kapal?", a: "Jasa fumigasi kapal adalah layanan pengendalian hama menggunakan fumigan untuk membasmi serangga dan organisme pengganggu pada kapal serta ruang muatan." },
      { q: "Mengapa kapal perlu dilakukan fumigasi?", a: "Fumigasi diperlukan untuk mencegah kerusakan komoditas, mengurangi risiko kontaminasi, dan menjaga kualitas muatan selama proses pengiriman." },
      { q: "Kapal apa saja yang dapat difumigasi?", a: "Kapal kargo, kapal pengangkut komoditas pertanian, kapal logistik, kapal ekspor-impor, dan berbagai jenis kapal pengangkut barang lainnya." },
      { q: "Apakah PT. Panca Prima Wijaya juga melayani fumigasi kontainer?", a: "Ya. Selain jasa fumigasi kapal, kami juga menyediakan jasa fumigasi kontainer ekspor dan impor untuk berbagai jenis komoditas." }
    ],
    ctaTitle: "Konsultasikan Kebutuhan Fumigasi Kapal Anda",
    ctaDesc: "Perlu melindungi komoditas selama pengiriman? Kami siap memberikan penawaran sesuai kebutuhan."
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
                <Anchor className="w-4 h-4 text-[#16a34a]" /> {content.badge}
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
              <img src="https://ik.imagekit.io/cej2dcwlx/panca3.jpeg" alt="Jasa Fumigasi Kapal Profesional" className="w-full h-[400px] object-cover rounded-2xl shadow-2xl relative z-0 opacity-80 bg-white" />
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
            
            {/* Apa Itu Jasa Fumigasi Kapal */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0a2558] mb-4">{content.whatIsTitle}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                <AutoLinkText>
                  {content.whatIsDesc1}
                </AutoLinkText>
              </p>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">{content.whatIsIntroList}</h4>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {content.whatIsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16a34a] flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mengapa Harus Fumigasi Kapal */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0a2558] mb-4">{content.whyTitle}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {content.whyIntro}
              </p>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {content.whyList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div> {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 font-medium leading-relaxed text-sm">
                {content.whyFooter}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Layanan Tambahan */}
      <section className="py-16 bg-[#0a2558] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">{content.svcTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.svcList.map((service, idx) => (
              <div key={idx} className="bg-blue-900/50 p-6 rounded-xl border border-blue-800">
                <h4 className="font-bold text-white text-lg mb-3">{service.title}</h4>
                <p className="text-sm text-blue-200 leading-relaxed mb-4">{service.desc}</p>
                {service.list && (
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-blue-200">
                    {service.list.map((target, keyIdx) => (
                      <div key={keyIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></div>{target}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Aplikasi Spesifik */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">{content.additionalTitle}</h2>
            <p className="max-w-3xl mx-auto text-gray-600">{content.additionalDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.additionalAssets.map((assetGroup, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-[#0a2558] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">{assetGroup.title}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {assetGroup.list.map((item, keyIdx) => <li key={keyIdx}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16 bg-[#f4f7f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">{isEn ? "Service Advantages" : "Keunggulan Jasa Fumigasi Kapal PT. Panca Prima Wijaya"}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.advList.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#0a2558] mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#16a34a]" /> {item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mengapa Memilih */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0a2558] mb-6">{content.whyPPWTitle}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {content.whyPPWDesc1}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {content.whyPPWDesc2}
          </p>
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
