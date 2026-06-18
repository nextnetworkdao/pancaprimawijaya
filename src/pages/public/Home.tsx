import React, { useRef, useEffect } from 'react';
import { ShieldCheck, Bug, Box, Factory, Wind, CheckCircle2, ArrowRight, Landmark, Store, Tractor, Ship, Warehouse, Wheat, Coffee, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AutoLinkText } from '../../components/AutoLinkText';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Home() {
  const { isEn, langLink } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let isHovering = false;

    const scroll = () => {
      if (slider && !isHovering) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
          slider.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => isHovering = true;
    const handleMouseLeave = () => isHovering = false;

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Comprehensive localized content map
  const content = isEn ? {
    seoTitle: "Fumigation & Food Warehouse Sanitation Services | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya provides a professional, integrated one-stop solution for consultation, fumigation, food warehouse sanitation, and agricultural commodity pest control.",
    seoKeywords: "fumigation service, warehouse sanitation, panca prima wijaya, rice fumigation, crop pest control",
    
    badge: "ONE-STOP FUMIGATION SOLUTION",
    heroTitle1: "PT. PANCA PRIMA WIJAYA",
    heroTitle2: "Rice Fumigation & Sanitation Services.",
    heroQuote: '"PT. Panca Prima Wijaya is an Indonesian company providing an integrated, professional one-stop solution for agricultural consultancy, fumigation, food-grade storage sanitation, commodity pest control, and a builder of the most reliable fumigation chemicals and instruments."',
    heroBtnConsult: "FREE CONSULTATION",
    heroBtnProd: "VIEW PRODUCTS",
    heroServiceTitle: "Professional Commodity Pest Control Services",
    
    infraFumigasi: "FUMIGATION",
    infraSanitasi: "SANITATION",
    infraFogging: "FOGGING",
    
    introDesc1: "We are highly experienced in eradicating destructive agricultural storable pests. As leading warehouse fumigation experts, we deliver specialized solutions against rice weevils, flour beetles, tobacco beetles, coffee bean borers, maize weevils, moths, and other grain or seed pest species.",
    introDesc2: "Leveraging proven phosphine gas treatment parameters combined with agricultural-grade sanitation sweeps, our pest management protocols protect grains, keep reserves secure, meet industrial regulations, and reduce dry-weight export losses.",
    
    trustedTitle: "Trusted by Major Industries and Government Institutions",
    stats: [
      { text: "10+ Years Experience" },
      { text: "1909+ Clients Served" },
      { text: "500+ Warehouses Sterilized" },
      { text: "Certified Pest Technicians" },
      { text: "Nationwide Operations" },
      { text: "Modern Isolation Tech" }
    ],
    
    svcBadge: "CORE SERVICES",
    svcHead: "Effective Solutions for Commodity Pest Control",
    
    card1Title: "Rice & Food Warehouse Fumigation",
    card1Desc: "A complete crop-securing phosphine fumigation service targeting all growth stages—including eggs, pupae, under-shroud nymphs, and adults. Fully customizable for rice/paddy bays, yellow corn grids, coffee/cocoa yards, and raw feed piles.",
    card1Badge: "TREATMENT TARGETS",
    card1Targets: [
      "Paddy & Rice Stocks", "Animal Feed Piles", "Coffee & Cocoa Batches", "Flour & Maize Stocks", "Commodity Silos", "Export & Import Boxes", "Dry Cargo Carriers", "Port Distribution Hubs", "Pest Management Advice", "Custom Quarantine Zones"
    ],
    cardLink: "View Details",
    
    card2Title: "Professional Storage Sanitation",
    card2Desc: "A clean and well-maintained food storage warehouse is paramount. Our sanitation service uses certified industrial sweeps and cold/thermal fogging to prevent residual weevils from re-infesting clean commodity lots.",
    card2Badge: "SANITATION PROGRAMS",
    card2Targets: [
      "Physical Warehouse Sweeps", "Thermal & Cold Fogging", "Marine Container Clearing", "Grain Silo Sanitizing", "Processing Conveyor Clearing", "Debris & Infested Bag Disposal", "Weevil Population Monitoring", "Facility Hygiene Evaluations"
    ],
    
    card3Title: "Container & Cargo Ship Fumigation",
    card3Desc: "Protecting export and import cargoes from severe phytosanitary risks during transit. We coordinate closely with shipping operators to provide portside container sealing and deep ship hold gas treatment.",
    card3Badge: "ADDITIONAL APPLICATIONS",
    card3Targets: [
      "Archival Files & Libraries", "Government Facility Sites", "Freight Shipping Containers", "Seaport Terminal Stations", "Commodity Transit Barges", "Retail Goods Storages", "Buffer Reserve Buffer Pools", "Raw Agricultural Reserves"
    ],
    
    card4Title: "Specialty Insecticides & Lab Equipment",
    card4Desc: "Providing certified post-harvest testing kits, wheat flour grain grading instruments, moisture testing meters, and eco-safe agricultural pest management supplies.",
    card4Badge: "PRODUCT CATEGORIES",
    card4TargetsLeft: ["Wheat grading lab kits", "Seed testing equipment", "Feed industry tool solutions"],
    card4TargetsRight: ["Agricultural insecticides", "Sanitation audit check tools", "Pest management advisory"],
    
    ctaWA: "CONSULT YOUR COMMERCIAL NEEDS NOW",
    
    whyPPWBadge: "WHY PARTNER WITH PT. PANCA PRIMA WIJAYA?",
    whyPPWHead: "Professional, Certified, and Dependable",
    whyPPWDesc: "PT. Panca Prima Wijaya is a premier crop protection and structural pest control provider in Indonesia. Guided by certified technical applicators and rigid chemical protocols, we help logistics firms, state agencies, and seed exporters safeguard bulk commodities while ensuring smooth phytosanitary clearance across global borders.",
    
    advFeatures: [
      { title: "Experts & Modern Tech", desc: "Equipped with gas leakage checkers, certified safety breathers, and heavy-duty cold fog generators." },
      { title: "Standardized Quality", desc: "Supporting industrial manufacturers and national reserve authorities with reliable security." },
      { title: "One-Stop Commodity Protection", desc: "Coordinated gas treatments alongside professional sanitation, pest monitoring, and certified supplies." },
      { title: "Vast Projects Log", desc: "A flawless track record of handling military complexes, large commercial silos, and disaster response logistics." }
    ],
    
    advContactBtn: "CONTACT OUR EXPERTS",
    
    indSvcBadge: "INDUSTRIES WE SERVE",
    indSvcHead: "Target Sectors and Infrastructure",
    indSvcList: [
      { name: "Government Buffer Reserves", icon: Landmark },
      { name: "Grain Distributors", icon: Store },
      { name: "Animal Feed Processing", icon: Tractor },
      { name: "Import & Export Agencies", icon: Ship },
      { name: "Yellow Corn Storage Silos", icon: Warehouse },
      { name: "Grain Milling Industries", icon: Factory },
      { name: "Coffee & Cocoa Exporters", icon: Coffee },
      { name: "Logistics Hub Terminals", icon: Package }
    ],
    
    prodTitle: "Manufacturer & Supplier of Eco-Safe Pest Control",
    prodSub: "PT. Panca Prima Wijaya manufactures and supplies highly acclaimed crop protection formulas and fumigation systems used by leading grain handlers nationwide.",
    
    prod1Title: "FUMIPHOS® 56 TB",
    prod1Desc1: "FUMIPHOS is an elite Aluminium Phosphide grain fumigant, highly trusted for eradicating structural weevils, beetles, and larvae in stored commodities. Ideal for silos, bulk warehouses, barges, and export containers.",
    prod1Desc2: "Fully registered with the Indonesian Ministry of Agriculture, FUMIPHOS leaves zero dangerous chemical residues when properly aerated. Supplied with full MSDS sheets and Certificate of Analysis (CoA) records.",
    
    prod2Title: "SILOGUD® 250 EC",
    prod2Desc: "A premium liquid insecticide formulated with state-of-the-art chemical matrices. Perfect for space spraying and structural sanitation barriers to destroy resistant crawling pests in storage bays, shipping boxes, and conveyor sections.",
    
    tkdnTitle: "Fumigation Sheeting & Cover Cover Manufacturer",
    tkdnDesc: "PT. Panca Prima Wijaya produces high-strength PVC gas-tight fumigation blankets with certified TKDN (Domestic Component Level) content, supporting local factories and state logistics targets.",
    tkdnFeatures: [
      "Meets TKDN standards for state enterprise purchase targets",
      "Robust tearing resistance and heat-sealed margins",
      "Gas-tight formulation ensures optimal phosphine retention",
      "Various dimensions tailored for stack sizes",
      "Durable for rice, corn, cocoa, coffee, and animal feeds",
      "Applicable for flat stores, silo bottoms, and export port rails",
      "Manufactured under certified industrial safety standards"
    ],
    
    integratedTitle: "Integrated Quality Assurance",
    integratedDesc: "By leveraging the combination of FUMIPHOS fumigants, SILOGUD barrier spraying, high-strength sealed sheeting, and certified technical advisors, we ensure your crop inventory remains structurally clean, pristine, and pest-free.",
    
    sliderTitle: "Product Collection",
    sliderCollection: [
      { name: "FUMIPHOS® 56 TB", cat: "Grain Fumigant", price: "Rp 1,150,000", sold: "10K+ Sold" },
      { name: "SILOGUD® 250 EC", cat: "Liquid Insecticide", price: "Rp 850,000", sold: "5K+ Sold" },
      { name: "Sungkup Fumigation PVC Sheet", cat: "Gas-Tight Sheeting", price: "From Rp 500,000", sold: "1K+ Sold" },
      { name: "Grading Grain Sieves & Meters", cat: "Quality Testing", price: "Contact Us", sold: "100+ Sold" }
    ],
    sliderBtnAll: "View All Products",
    
    faqSectionTitle: "FAQ About Our Enterprise Services",
    faqHead: "Frequently Asked Questions",
    faqs: [
      { q: "What is grain fumigation?", a: "Grain fumigation is the application of highly penetrative Phosphine gas within airtight enclosures to destroy agricultural beetle, weevil, and egg infestations." },
      { q: "Is FUMIPHOS safe for food consumption?", a: "Yes. When applied correctly and followed by standard aeration, phosphine gas does not compromise grain taste, texture, nutritional value, or leave dangerous chemical residue." },
      { q: "How long does a typical grain fumigation take?", a: "Average exposure periods range from 3 to 7 days depending on temperatures, targeted pest species, volume, and stack seal integrity." },
      { q: "Do you supply certified phytosanitary fumigation certificates?", a: "Yes. We supply standard phytosanitary fumigation certificates and documentation required for export shipments and quarantine clearance." }
    ],
    ctaTitle: "Need Fully Integrated Pest Control?",
    ctaDesc: "Let's configure a custom program to keep your commodities pristine. Chat with our certified crop preservation specialists today."
  } : {
    seoTitle: "Jasa Fumigasi & Sanitasi Gudang Pangan | PT. Panca Prima Wijaya",
    seoDesc: "PT. Panca Prima Wijaya menyediakan one-stop solution untuk konsultasi, fumigasi, sanitasi gudang pangan, dan pengendalian hama komoditas pertanian.",
    seoKeywords: "fumigasi, sanitasi gudang, panca prima wijaya, jasa fumigasi beras, hama komoditas",
    
    badge: "ONE-STOP SOLUTION FUMIGASI",
    heroTitle1: "PT. PANCA PRIMA WIJAYA",
    heroTitle2: "Jasa Fumigasi Beras & Sanitasi.",
    heroQuote: '"PT. Panca Prima Wijaya adalah perusahaan Indonesia yang menyediakan one-stop solution untuk konsultasi, fumigasi, sanitasi gudang pangan, dan pengendalian hama komoditas pertanian secara profesional dan terintegrasi, serta merupakan produsen dan penyedia obat dan alat fumigasi terlengkap."',
    heroBtnConsult: "KONSULTASI GRATIS",
    heroBtnProd: "LIHAT PRODUK",
    heroServiceTitle: "Layanan Hama Gudang Profesional",
    
    infraFumigasi: "FUMIGASI",
    infraSanitasi: "SANITASI",
    infraFogging: "FOGGING",
    
    introDesc1: "Kami berpengalaman menangani berbagai permasalahan hama gudang pangan. Sebagai pakar jasa fumigasi gudang, kami memberikan solusi terdepan, termasuk sebagai pembasmi kutu beras, kutu gabah, kutu katul, ulat tembakau, kumbang biji kopi, hingga serangga dan hama pada jagung, tepung, kacang tanah, kacang hijau, pakan ternak, dan berbagai jenis biji-bijian maupun sereal lainnya.",
    introDesc2: "Dengan metode fumigasi fosfin dan kombinasi sanitasi gudang pangan yang tepat, perlindungan pengendalian hama gudang kami membantu menjaga kualitas komoditas tetap aman, higienis, bebas hama, dan memenuhi standar penyimpanan secara profesional.",
    
    trustedTitle: "Dipercaya Berbagai Industri dan Instansi",
    stats: [
      { text: "10+ Tahun Pengalaman" },
      { text: "1909+ Pelanggan" },
      { text: "500+ Gudang Ditangani" },
      { text: "Tim Bersertifikat" },
      { text: "Melayani Seluruh Indonesia" },
      { text: "Teknologi Modern" }
    ],
    
    svcBadge: "LAYANAN UTAMA",
    svcHead: "Solusi Efektif Pengendalian Hama Gudang",
    
    card1Title: "Jasa Fumigasi Beras dan Gudang Pangan",
    card1Desc: "Solusi andal jasa fumigasi beras untuk membasmi kutu beras dan hama gudang. Kami menggunakan metode fumigasi fosfin yang efektif untuk membasmi hama hingga ke telur dan larva sehingga hasil pengendalian lebih maksimal dan tahan lama, juga dilengkapi dengan spesialisasi Fumigasi jagung, Fumigasi biji kopi, dan Fumigasi pakan ternak.",
    card1Badge: "TARGET FUMIGASI",
    card1Targets: [
      "Gudang Beras & Jagung", "Gudang Pakan Ternak", "Gudang Biji Kopi & Tepung", "Gudang Kakao & Kedelai", "Gudang Kacang Tanah & Kacang Hijau", "Silo Penyimpanan Komoditas", "Kontainer Ekspor & Impor", "Kapal Pengangkut Komoditas", "Gudang Logistik & Distribusi", "Pabrik Pengolahan Pangan", "Gudang Bahan Baku Industri", "Terminal Peti Kemas", "Fasilitas Penyimpanan Hasil Pertanian", "Komoditas Biji-bijian & Sereal", "Produk Pertanian untuk Ekspor", "Fasilitas Penyimpanan Pangan Nasional"
    ],
    cardLink: "Lihat Detail",
    
    card2Title: "Sanitasi Gudang Pangan Profesional",
    card2Desc: "Menjaga gudang tetap bersih, aman, dan bebas hama. Selain fumigasi, sanitasi gudang pangan menjadi langkah penting untuk mencegah infestasi ulang secara menyeluruh.",
    card2Badge: "LAYANAN SANITASI",
    card2Targets: [
      "Pembersihan area gudang", "Thermal & Cold fogging", "Sanitasi silo dan kontainer", "Sanitasi area produksi pangan", "Pembersihan residu komoditas", "Pencegahan kontaminasi", "Monitoring populasi hama", "Inspeksi dan evaluasi gudang"
    ],
    
    card3Title: "Jasa Fumigasi Kontainer & Kapal",
    card3Desc: "Tidak hanya gudang pangan, layanan kami membantu melindungi aset penting dari serangan hama yang dapat merusak material maupun dokumen berharga, dengan menghadirkan solusi Jasa fumigasi kontainer dan Jasa fumigasi kapal bagi eksportir dan importir.",
    card3Badge: "APLIKASI LAINNYA",
    card3Targets: [
      "Arsip Dokumen & Perpustakaan", "Gedung Pemerintahan", "Armada Bus & Kereta Api", "Fasilitas Penyimpanan Industri", "Kontainer Ekspor & Impor", "Kapal Kargo & Kapal Pengangkut Komoditas", "Gudang Logistik dan Distribusi", "Silo Penyimpanan Biji-bijian", "Pabrik Pengolahan Pangan", "Gudang Bahan Baku Industri", "Museum dan Pusat Arsip Nasional", "Fasilitas Militer dan Pertahanan", "Pergudangan Pelabuhan", "Terminal Peti Kemas", "Pusat Distribusi Retail", "Fasilitas Penyimpanan Produk Ekspor"
    ],
    
    card4Title: "Peralatan Laboratorium dan Pestisida",
    card4Desc: "Selain layanan fumigasi dan sanitasi, kami siap membantu industri pangan, pertanian, dan logistik dalam menjaga kualitas produk selama proses penyimpanan maupun distribusi dengan solusi lengkap.",
    card4Badge: "KAMI MENYEDIAKAN",
    card4TargetsLeft: ["Peralatan lab industri gandum", "Alat pengujian benih", "Peralatan industri pakan ternak"],
    card4TargetsRight: ["Insektisida dan pestisida", "Sistem monitoring sanitasi", "Konsultasi pengendalian hama"],
    
    ctaWA: "KONSULTASIKAN KEBUTUHAN ANDA SEKARANG",
    
    whyPPWBadge: "MENGAPA MEMILIH PT. PANCA PRIMA WIJAYA?",
    whyPPWHead: "Profesional, Berpengalaman, dan Terpercaya",
    whyPPWDesc: "PT. Panca Prima Wijaya merupakan perusahaan terbaik dalam layanan fumigasi, pengendalian hama gudang, dan perlindungan komoditas yang mengutamakan profesionalisme, pengalaman, serta kepercayaan pelanggan. Didukung oleh tenaga ahli yang kompeten, metode kerja yang terstandarisasi, serta penggunaan produk dan teknologi berkualitas, kami mampu memberikan solusi yang efektif, aman, dan tepat sasaran.",
    
    advFeatures: [
      { title: "Ahli & Modern", desc: "Tim ahli fumigasi dengan teknologi modern untuk penanganan hama secara menyeluruh." },
      { title: "Kualitas Terjamin", desc: "Mendukung keamanan dan stabilitas pangan nasional bersama pemerintah dan industri." },
      { title: "One-Stop Service", desc: "Solusi lengkap pengendalian hama gudang pangan, peralatan laboratorium, dan pestisida." },
      { title: "Pengalaman Luas", desc: "Berpengalaman menangani proyek kementerian, TNI, pemerintah, dan kebutuhan logistik darurat." }
    ],
    
    advContactBtn: "HUBUNGI TIM AHLI FUMIGASI",
    
    indSvcBadge: "SIAPA SAJA YANG MEMBUTUHKAN LAYANAN INI?",
    indSvcHead: "Industri yang Kami Layani",
    indSvcList: [
      { name: "Bulog & Gudang Pemerintah", icon: Landmark },
      { name: "Distributor Beras Nasional", icon: Store },
      { name: "Pabrik Pakan Ternak", icon: Tractor },
      { name: "Importir & Eksportir", icon: Ship },
      { name: "Gudang Jagung & Kedelai", icon: Warehouse },
      { name: "Industri Tepung", icon: Factory },
      { name: "Industri Kopi & Kakao", icon: Coffee },
      { name: "Logistik & Pergudangan", icon: Package }
    ],
    
    prodTitle: "Produsen & Distributor Produk Pengendalian Hama Gudang",
    prodSub: "PT. Panca Prima Wijaya menyediakan berbagai produk pengendalian hama gudang pangan yang telah digunakan oleh industri beras, jagung, kopi, pakan ternak, dan komoditas pertanian lainnya.",
    
    prod1Title: "FUMIPHOS® 56 TB",
    prod1Desc1: "FUMIPHOS adalah fumigan Aluminium Phosphide yang efektif membasmi hama gudang seperti kutu beras, kutu jagung, kutu kopi, dan ulat tembakau. Cocok digunakan untuk fumigasi gudang, silo, kontainer, kapal, serta berbagai komoditas pertanian tersimpan.",
    prod1Desc2: "Terdaftar resmi di Komisi Pestisida Kementerian Pertanian, FUMIPHOS telah teruji efektivitasnya dan dilengkapi dengan dokumen MSDS serta Certificate of Analysis (CoA). Tablet FUMIPHOS meluruh sempurna sehingga memberikan hasil fumigasi yang optimal dan efektif.",
    
    prod2Title: "SILOGUD® 250 EC",
    prod2Desc: "Insektisida profesional untuk sanitasi gudang pangan dan pengendalian hama pada area penyimpanan komoditas. Efektif membantu mengendalikan serangga gudang, mencegah infestasi ulang, dan menjaga kualitas beras, jagung, kopi, tepung, pakan ternak, serta berbagai komoditas pertanian lainnya.",
    
    tkdnTitle: "Produsen Plastik Sungkup Fumigasi TKDN",
    tkdnDesc: "PT. Panca Prima Wijaya merupakan produsen plastik sungkup fumigasi berkualitas tinggi dengan kandungan Tingkat Komponen Dalam Negeri (TKDN) untuk mendukung kebutuhan industri pangan, pergudangan, logistik, dan instansi pemerintah di Indonesia.",
    tkdnFeatures: [
      "Memenuhi persyaratan TKDN untuk proyek pemerintah dan BUMN",
      "Material kuat dan tahan sobek",
      "Kedap gas untuk proses fumigasi yang optimal",
      "Tersedia berbagai ukuran sesuai kebutuhan gudang dan komoditas",
      "Cocok untuk fumigasi beras, jagung, kopi, kakao, tepung, dan biji-bijian",
      "Dapat digunakan untuk gudang, silo, kontainer, dan kapal",
      "Diproduksi dengan standar kualitas industri"
    ],
    
    integratedTitle: "Solusi Terintegrasi",
    integratedDesc: "Dengan kombinasi layanan fumigasi profesional, sanitasi gudang, serta penggunaan produk FUMIPHOS® dan SILOGUD® yang telah teruji, kami membantu menjaga kualitas komoditas pangan tetap aman, higienis, dan bebas hama selama proses penyimpanan maupun distribusi.",
    
    sliderTitle: "Pilihan Produk Kami",
    sliderCollection: [
      { name: "FUMIPHOS® 56 TB", cat: "Obat Kutu Beras", price: "Rp 1.150.000", sold: "10RB+ Terjual" },
      { name: "SILOGUD® 250 EC", cat: "Insektisida", price: "Rp 850.000", sold: "5RB+ Terjual" },
      { name: "Plastik Sungkup PVC", cat: "Alat Perlengkapan", price: "Mulai Rp 500.000", sold: "1RB+ Terjual" },
      { name: "Alat Uji Mutu Beras", cat: "Alat Uji", price: "Hubungi Kami", sold: "100+ Terjual" }
    ],
    sliderBtnAll: "Lihat Semua Produk",
    
    faqSectionTitle: "FAQ",
    faqHead: "FAQ Pembasmi Hama Gudang Pangan",
    faqs: [
      { q: "Apa itu fumigasi beras & komoditas?", a: "Fumigasi komoditas adalah metode pembasmian hama beras, jagung, kacang, pakan ternak, biskuit, dan bahan grain lainnya di dalam ruang kedap gas menggunakan zat fumigan." },
      { q: "Apakah fumigasi aman bagi bahan pangan?", a: "Ya. Metode fumigasi fosfin dari sisa residu FUMIPHOS dijamin aman, tidak mengubah rasa, aroma, warna, maupun komposisi gizi komoditas pangan setelah diaerasi dengan benar." },
      { q: "Berapa lama waktu proses fumigasi?", a: "Umumnya paparan gas memakan waktu 3 sampai 7 hari, tergantung pada jenis kemasan, volume tumpukan, suhu ruangan, serta spesies hama sasaran." },
      { q: "Apakah PT Panca Prima Wijaya menyediakan sertifikat fumigasi?", a: "Ya, kami melayani penerbitan sertifikat fumigasi resmi berstandar ekspor untuk logistik peti kemas, kontainer kapal kargo, dan sereal bijian." }
    ],
    ctaTitle: "Konsultasikan Kebutuhan Pembasmian Hama Pangan Anda",
    ctaDesc: "Jauhkan komoditas dari serangan weevil, kutu beras, kumbang biji, maupun jamur merusak. Hubungi tim ahli kami saat ini."
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans animate-fade-in">
      <SEO 
        title={content.seoTitle}
        description={content.seoDesc}
        type="website"
        canonical={typeof window !== 'undefined' ? window.location.origin + langLink('/panca') : ''}
        keywords={content.seoKeywords}
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#16a34a]/20 text-[#bbf7d0] font-bold text-xs rounded-full mb-6 border border-[#16a34a]/30">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
            {content.badge}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight uppercase">
            {content.heroTitle1}<br/>
            <span className="text-[#bbf7d0]">{content.heroTitle2}</span>
          </h1>
          
          <div className="pl-4 border-l-4 border-[#16a34a] mb-8">
            <p className="text-base sm:text-lg text-gray-200 font-medium italic">
              <AutoLinkText>
                {content.heroQuote}
              </AutoLinkText>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth' })} 
              className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center"
            >
              {content.heroBtnConsult}
            </button>
            <Link to={langLink('/panca/produk')} className="w-full sm:w-auto bg-transparent border-2 border-white/50 hover:border-white text-white px-6 py-3 rounded font-bold transition-all text-sm sm:text-base text-center">
              {content.heroBtnProd}
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">{content.heroServiceTitle}</p>
            <div className="flex flex-wrap gap-4 sm:gap-8 opacity-70 grayscale">
              <span className="font-black text-xl text-white">{content.infraFumigasi}</span>
              <span className="font-black text-xl text-white">{content.infraSanitasi}</span>
              <span className="font-black text-xl text-white">{content.infraFogging}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <video 
            src="https://ik.imagekit.io/cej2dcwlx/paca_transparent.webm" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full max-w-48 h-auto mx-auto mb-8 bg-transparent"
          />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            <AutoLinkText>
              {content.introDesc1}
            </AutoLinkText>
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            <AutoLinkText>
              {content.introDesc2}
            </AutoLinkText>
          </p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-10 bg-[#0a2558] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-8">{content.trustedTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm font-medium">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center shadow-sm text-center">
                {stat.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Cards Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{content.svcBadge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.svcHead}</h2>
          </div>

          <div className="grid gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <img src="https://cdn-icons-gif.flaticon.com/19026/19026444.gif" alt="Jasa Fumigasi Beras" className="w-20 h-20 mb-6 object-contain" />
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">{content.card1Title}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {content.card1Desc}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{content.card1Badge}</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-gray-600">
                  {content.card1Targets.map((target, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#16a34a]" />
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <Link to={langLink('/panca/jasa-fumigasi-beras')} className="inline-flex items-center justify-center border-2 border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white px-6 py-2 rounded-lg font-bold transition-all text-sm w-full md:w-auto">
                  {content.cardLink}
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0a2558] text-white p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Wind className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <img src="https://cdn-icons-gif.flaticon.com/17489/17489771.gif" alt="Sanitasi Gudang" className="w-20 h-20 mb-6 object-contain" />
                <h3 className="text-xl font-bold mb-3">{content.card2Title}</h3>
                <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                  {content.card2Desc}
                </p>
                
                <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <p className="text-xs font-bold text-white mb-3 border-b border-white/20 pb-2">{content.card2Badge}</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-blue-50">
                    {content.card2Targets.map((target, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        {target}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-white/10 pt-6 relative z-10">
                <Link to={langLink('/panca/sanitasi-gudang-pangan-profesional')} className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0a2558] px-6 py-2 rounded-lg font-bold transition-all text-sm w-full md:w-auto">
                  {content.cardLink}
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden transition-all hover:shadow-md">
              <img src="https://cdn-icons-gif.flaticon.com/15663/15663634.gif" alt="Jasa Fumigasi Kontainer & Kapal" className="w-20 h-20 mb-6 object-contain" />
              <h3 className="text-xl font-bold text-[#0a2558] mb-3">{content.card3Title}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {content.card3Desc}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{content.card3Badge}</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-gray-600">
                  {content.card3Targets.map((target, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#16a34a]" />
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <Link to={langLink('/panca/jasa-fumigasi-kapal')} className="inline-flex items-center justify-center bg-white border-2 border-[#0a2558] text-[#0a2558] hover:bg-[#0a2558] hover:text-white px-6 py-2 rounded-lg font-bold transition-all text-sm w-full md:w-auto">
                  {content.cardLink}
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#16a34a] transition-all hover:shadow-md">
               <img src="http://cdn-icons-gif.flaticon.com/11257/11257218.gif" alt="Peralatan Laboratorium dan Pestisida" className="w-20 h-20 mb-6 object-contain" />
               <h3 className="text-xl font-bold text-[#0a2558] mb-3">{content.card4Title}</h3>
               <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                 {content.card4Desc}
               </p>
               
               <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{content.card4Badge}</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     {content.card4TargetsLeft.map((target, idx) => <li key={idx}>{target}</li>)}
                   </ul>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">{isEn ? "PROTECTION PRODUCTS" : "PRODUK PENGENDALIAN"}</p>
                   <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                     {content.card4TargetsRight.map((target, idx) => <li key={idx}>{target}</li>)}
                   </ul>
                 </div>
               </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#16a34a] text-white px-8 py-4 rounded font-bold hover:bg-[#15803d] transition-colors shadow-lg text-sm sm:text-base">
              {content.ctaWA} <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Panca Prima Wijaya */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <img src="https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png" alt="PT Panca Prima Wijaya" className="w-[150px] lg:w-[200px] h-auto mx-auto mb-6 object-contain animate-pulse" />
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{content.whyPPWBadge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">{content.whyPPWHead}</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {content.whyPPWDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {content.advFeatures.map((feat, idx) => (
              <div key={idx} className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:border-[#16a34a]/30 transition-colors">
                <ShieldCheck className="w-8 h-8 text-[#16a34a] mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="https://wa.me/6285313200188" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#0a2558] text-white px-8 py-3 rounded font-bold hover:bg-[#1a3875] transition-colors shadow-md text-sm sm:text-base border border-[#1a3875]">
              {content.advContactBtn} <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#16a34a] uppercase tracking-widest mb-2">{content.indSvcBadge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.indSvcHead}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.indSvcList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-[#16a34a] transition-colors">
                  <IconComp className="w-8 h-8 text-[#16a34a] mb-3" />
                  <span className="text-sm font-bold text-[#0a2558] text-center leading-snug">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialty Products Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.prodTitle}</h2>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
              {content.prodSub}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#f4f7f6] p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <img src="https://ik.imagekit.io/cej2dcwlx/foto%20fumiphos.png" alt="FUMIPHOS®" className="w-full h-64 object-contain mb-6 rounded-lg bg-white p-4 shadow-sm" />
              <h3 className="text-2xl font-black text-[#16a34a] mb-4">{content.prod1Title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {content.prod1Desc1}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {content.prod1Desc2}
              </p>
            </div>
            
            <div className="bg-[#f4f7f6] p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <img src="https://ik.imagekit.io/cej2dcwlx/foto%20silogud.png" alt="SILOGUD® 250 EC" className="w-full h-64 object-contain mb-6 rounded-lg bg-white p-4 shadow-sm" />
              <h3 className="text-2xl font-black text-[#16a34a] mb-4">{content.prod2Title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {content.prod2Desc}
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-black text-[#0a2558] mb-4 text-center">{content.tkdnTitle}</h3>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-center">
              {content.tkdnDesc}
            </p>
            
            <div className="bg-[#f4f7f6] p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow max-w-4xl mx-auto">
              <h4 className="text-xl font-bold text-[#16a34a] mb-4">{isEn ? "Our Sheeting Advantages" : "Keunggulan Plastik Sungkup Fumigasi Kami"}</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                {content.tkdnFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0a2558] text-white p-8 rounded-xl text-center shadow-md">
            <h4 className="font-bold text-lg mb-3">{content.integratedTitle}</h4>
            <p className="text-sm text-blue-100 leading-relaxed max-w-3xl mx-auto">
              {content.integratedDesc}
            </p>
          </div>

          {/* Product Carousel Slider */}
          <div className="mt-16 text-center relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-black text-[#0a2558] mb-8">{content.sliderTitle}</h3>
            
            <div className="relative w-full group">
              <button 
                onClick={scrollLeft}
                className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 bg-white border border-gray-200 z-10 p-2 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div 
                ref={sliderRef}
                className="flex overflow-x-auto gap-3 md:gap-4 snap-x snap-mandatory pb-6 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Product 1 */}
                <Link to={langLink('/panca/produk/fumiphos')} className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer min-w-[200px] md:min-w-[240px] snap-center flex-shrink-0 text-left">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img 
                      src="https://ik.imagekit.io/cej2dcwlx/foto%20fumiphos.png" 
                      alt="FUMIPHOS®" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-white"
                    />
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm shadow-sm">
                      Star+
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">FUMIPHOS® 56 TB</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-gray-400 text-xs border border-gray-400 px-1 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        {content.sliderCollection[0].cat}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <span className="text-base font-bold text-blue-600 block mb-1">{content.sliderCollection[0].price}</span>
                      <div className="flex items-center text-[10px] text-gray-500 justify-between">
                        <div className="flex text-yellow-400 space-x-px">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <span>{content.sliderCollection[0].sold}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Product 2 */}
                <Link to={langLink('/panca/produk/silogud')} className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer min-w-[200px] md:min-w-[240px] snap-center flex-shrink-0 text-left">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img 
                      src="https://ik.imagekit.io/cej2dcwlx/foto%20silogud.png" 
                      alt="SILOGUD® 250 EC" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-white p-2"
                    />
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm shadow-sm">
                      Star+
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">SILOGUD® 250 EC</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-gray-400 text-xs border border-gray-400 px-1 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        {content.sliderCollection[1].cat}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <span className="text-base font-bold text-blue-600 block mb-1">{content.sliderCollection[1].price}</span>
                      <div className="flex items-center text-[10px] text-gray-500 justify-between">
                        <div className="flex text-yellow-400 space-x-px">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                        </div>
                        <span>{content.sliderCollection[1].sold}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Product 3 */}
                <Link to={langLink('/panca/produk')} className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer min-w-[200px] md:min-w-[240px] snap-center flex-shrink-0 text-left">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden flex items-center justify-center bg-white p-4">
                    <div className="text-gray-400 font-bold text-sm text-center">{isEn ? "TKDN Protective Cover" : "Plastik Sungkup TKDN"}</div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">{content.sliderCollection[2].name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-gray-400 text-xs border border-gray-400 px-1 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        {content.sliderCollection[2].cat}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <span className="text-base font-bold text-blue-600 block mb-1">{content.sliderCollection[2].price}</span>
                      <div className="flex items-center text-[10px] text-gray-500 justify-between">
                        <div className="flex text-yellow-400 space-x-px">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                        </div>
                        <span>{content.sliderCollection[2].sold}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Product 4 */}
                <Link to={langLink('/panca/produk')} className="bg-white rounded-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col cursor-pointer min-w-[200px] md:min-w-[240px] snap-center flex-shrink-0 text-left">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden flex items-center justify-center bg-white">
                    <div className="text-gray-400 font-bold text-sm text-center">{isEn ? "Laboratory Sieve Meters" : "Peralatan Laboratorium"}</div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">{content.sliderCollection[3].name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-gray-400 text-xs border border-gray-400 px-1 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        {content.sliderCollection[3].cat}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <span className="text-base font-bold text-blue-600 block mb-1">{content.sliderCollection[3].price}</span>
                      <div className="flex items-center text-[10px] text-gray-500 justify-between">
                        <div className="flex text-yellow-400 space-x-px">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <span>{content.sliderCollection[3].sold}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <button 
                onClick={scrollRight}
                className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-white border border-gray-200 z-10 p-2 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8">
              <Link to={langLink('/panca/produk')} className="inline-flex items-center justify-center gap-2 bg-white text-[#0a2558] border-2 border-[#0a2558] px-8 py-3 rounded font-bold hover:bg-[#0a2558] hover:text-white transition-colors shadow-sm text-sm">
                {content.sliderBtnAll}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#16a34a] uppercase tracking-widest mb-2">{content.faqSectionTitle}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.faqHead}</h2>
          </div>
          
          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <details key={index} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-gray-200 transition-all">
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
