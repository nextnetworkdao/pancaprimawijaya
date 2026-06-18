import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { AutoLinkText } from '../../components/AutoLinkText';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';

export default function JasaFumigasiPage() {
  const { isEn } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = isEn ? {
    seoTitle: "Professional Rice Fumigation Services | Eradicate Weevils & Warehouse Pests - PT. Panca Prima Wijaya",
    seoDesc: "Professional rice fumigation services to eradicate rice weevils and warehouse pests down to eggs and larvae using phosphine fumigation. Serving grain silos, containers, ships, warehouses.",
    badge: "Professional Services",
    heroTitle: "Professional Rice Fumigation Services to Kill Rice Weevils & Warehouse Pests",
    heroSub: '"The Best Rice Fumigation Services to Protect Your Commodities from Pest Attacks that Depreciate Quality and Market Value."',
    ctaBtn: "Consult Now",
    introTitle: "Premium Rice Fumigation Services for Absolute Commodity Integrity",
    introDesc1: "Are your storage stocks of rice being ravaged by rice weevils, beetle infestations, moths, or grain borers? The presence of warehouse pests not only ruins commodity texture and grade but triggers heavy financial drops due to weight shrinkage, core decay, and rejection from international buyer benchmarks.",
    introDesc2: "PT. Panca Prima Wijaya is a premier provider of professional Rice Fumigation Services, assisting distributors, exporters, warehouse managers, and food processors in achieving complete pest management.",
    introDesc3: "We leverage advanced Phosphine Fumigation protocols, proven to destroy warehouse pests through all life cycles (eggs, larvae, pupae, and mature insects) for lasting protection.",
    whatIsTitle: "What is Rice Fumigation?",
    whatIsDesc1: "Rice fumigation is a controlled treatment applying gaseous fumigants inside airtight envelopes or storage bays. The gas deeply penetrates grain stacks, reaching hidden pests that standard mist sprays cannot reach.",
    whatIsIntroList: "This method is highly effective at eradicating:",
    whatIsList: [
      "Rice weevils", "Warehouse beetles", "Grain moths", "Tribolium castaneum",
      "Sitophilus oryzae", "Rhyzopertha dominica", "Oryzaephilus surinamensis",
      "And all grain pests"
    ],
    whatIsFooter: "Using precise dosage and professional execution ensures your commodities stay clean and compliant during long transport or storage cycles.",
    whyTitle: "Why Must Rice Weevils Be Eradicated Immediately?",
    whyIntro: "Early stage infestations are often near-invisible. Once multiplication ramps up, it causes massive losses, including:",
    whyList: [
      "Severe depreciation of nutrition and quality",
      "Heavy grain shrinkage and volume losses",
      "Direct contamination of food lines",
      "Damage to storage bags and woven structures",
      "Drop in market and business pricing",
      "Risk of export rejections at international borders",
      "Substantial direct financial losses"
    ],
    whyFooter: "Proper fumigation acts as your defense line, keeping commodities sound and grade-compliant.",
    advTitle: "Advantages of Our Rice Fumigation Services",
    advList: [
      { num: "1", title: "Effective Phosphine Protocols", desc: "We utilize advanced gas distribution protocols standard in global grain preservation.", list: ["High gas penetration rates", "Reaches inner core of grain pallets", "Kills down to eggs & larvae", "Ideal for high-volume storage silos"] },
      { num: "2", title: "Certified & Trained Specialists", desc: "Every operation is managed by licensed fumigators trained in chemical safety and target pest parameters." },
      { num: "3", title: "Precise & Safe Execution", desc: "We execute strict planning, concentration monitoring, and chemical tests to secure food lines safely." },
      { num: "4", title: "Highly Customizable Scale", desc: "Perfect for local storage facilities, bulk logistics bays, processing factories, shipping vessels, and customs containers." },
      { num: "5", title: "Maximum Extended Protection", desc: "Comprehensive gas saturation leads to a higher success margin compared to conventional surface spraying." }
    ],
    specTitle: "Commodity Fumigation Specialization",
    specSub: "PT. Panca Prima Wijaya also has immense experience protecting various other food resources:",
    specList: [
      { title: "Corn Fumigation", desc: "Arrests storage beetle cycles to secure yield grading and market value.", list: ["Eradicates maize weevils", "Halts larval boring", "Preserves storage shelf-life"] },
      { title: "Coffee Bean Fumigation", desc: "Preserves coffee beans to protect taste and aroma under long-term storage.", list: ["Warehouse beetle control", "Export standard preservation", "Commercial value maintenance"] },
      { title: "Animal Feed Fumigation", desc: "Protects bulk feed elements vulnerable to explosive insect breeding.", list: ["Preserves nutritional values", "Eliminates warehouse stock losses", "Shields bulk components"] }
    ],
    targetTitle: "Fumigation Targets & Locations",
    targetSub: "We serve industrial storage environments, marine containers, and critical food reserves.",
    targetList: [
      { title: "Warehouses & Facilities", list: ["Grain & Corn Silos", "Pet Feed Warehouses", "Coffee & Flour Storage Bays", "Cocoa & Soy Logistics Hubs", "Peanut & Pulse Deposits", "Cold Chain Logistics Warehouses", "National Food Reserve Sites", "Bulk Tank Containments"] },
      { title: "Commodities", list: ["Rice & Paddy Stocks", "Yellow Corn & Maize", "Green & Roasted Coffee", "Cocoa & Soybean Lines", "Peanuts & Green Mung Beans", "Wheat, Tapioca, & Flour", "All Small Grain Seeds", "Agricultural Export Goods"] },
      { title: "Shipping & Exports", list: ["Export Container Stacks", "Bulk Merchant Vessels", "Port Logistics Terminals", "Crop Quarantine Centers", "National Logistics Depots"] }
    ],
    stepTitle: "Fumigation Execution Guidelines",
    stepSub: "To yield optimal outcomes, our treatments are launched in specialized operational steps:",
    steps: [
      { num: "1", title: "Field Survey", desc: "Our specialists examine the warehouse structure, grain status, dampness, and insect species active in the stacks." },
      { num: "2", title: "Airtight Sealing", desc: "We construct airtight tarpaulin barriers or isolate rooms to guarantee the fumigant remains fully saturated." },
      { num: "3", title: "Fumigant Application", desc: "Licensed specialists calculate and apply the correct dose of phosphine according to safety instructions." },
      { num: "4", title: "Concentration Monitoring", desc: "We test concentration limits constantly during treatment to assure complete efficacy." },
      { num: "5", title: "Aeration & final Inspection", desc: "We safely exhaust residues, check success rates, and issue compliance reports once risk parameters read zero." }
    ],
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      { q: "Why is fumigation better than standard mist sprays?", a: "Gas penetrates deep within the heavy grain stacks. Mist sprays only affect exterior insects, leaving deeper populations and eggs intact to multiply later." },
      { q: "What insects are controlled by rice fumigation?", a: "Rice weevils, flour beetles, grain borers, moths, Tribolium species, and all major grain-eating insects." },
      { q: "Is phosphine fumigation safe for food commodities?", a: "Yes. When handled by certified professionals like us, aeration leaves zero toxic residue, preserving grain taste, scent, and safety." },
      { q: "How long does a typical treatment take?", a: "Generally 3 to 7 days depending on volume, structures, surrounding temperatures, and target insects." },
      { q: "When should we schedule a fumigation?", a: "Whenever you observe insect activity, prior to long term storage, before export shipping, or as an annual safety measure." }
    ],
    ctaTitle: "Discuss Your Grain Fumigation Requirements",
    ctaDesc: "If your storage stocks of rice, corn, coffee, or feed show signs of pest presence, act immediately to secure your grades and avoid financial loss."
  } : {
    seoTitle: "Jasa Fumigasi Beras Profesional | Basmi Kutu Beras & Hama Gudang - PT. Panca Prima Wijaya",
    seoDesc: "Jasa fumigasi beras profesional untuk membasmi kutu beras dan hama gudang hingga ke telur dan larva menggunakan fumigasi fosfin. Melayani gudang beras, jagung, kopi, pakan ternak, silo, kontainer, dan kapal.",
    badge: "Layanan Profesional",
    heroTitle: "Jasa Fumigasi Beras Profesional untuk Membasmi Kutu Beras & Hama Gudang",
    heroSub: '"Jasa Fumigasi Beras Terbaik untuk Perlindungan Komoditas Anda dari serangan hama yang menurunkan kualitas dan nilai jual komoditas."',
    ctaBtn: "Konsultasi Sekarang",
    introTitle: "Jasa Fumigasi Beras Terbaik untuk Perlindungan Komoditas Anda",
    introDesc1: "Apakah stok beras di gudang mulai terserang kutu beras, kumbang gudang, ngengat, atau hama penyimpanan lainnya? Kehadiran hama gudang tidak hanya menurunkan kualitas komoditas, tetapi juga menyebabkan kerugian ekonomi yang besar akibat penyusutan berat, kerusakan produk, dan penolakan standar kualitas.",
    introDesc2: "PT. Panca Prima Wijaya hadir sebagai penyedia Jasa Fumigasi Beras profesional yang membantu perusahaan, distributor, pengelola gudang, industri pangan, hingga eksportir dalam mengendalikan hama gudang secara efektif dan menyeluruh.",
    introDesc3: "Kami menggunakan metode fumigasi fosfin (phosphine fumigation) yang terbukti mampu membasmi berbagai jenis hama gudang hingga ke fase telur, larva, pupa, dan serangga dewasa, sehingga hasil pengendalian menjadi lebih maksimal, tuntas, dan tahan lama.",
    whatIsTitle: "Apa Itu Jasa Fumigasi Beras?",
    whatIsDesc1: "Jasa fumigasi beras adalah metode pengendalian hama menggunakan gas fumigan yang diaplikasikan pada area penyimpanan atau komoditas beras dalam kondisi tertutup rapat. Gas fumigan akan menembus celah-celah tumpukan beras sehingga mampu menjangkau hama yang tidak dapat dikendalikan dengan metode penyemprotan biasa.",
    whatIsIntroList: "Metode ini sangat efektif untuk mengatasi:",
    whatIsList: [
      "Kutu beras", "Kumbang gudang", "Ngengat gudang", "Tribolium spp.",
      "Sitophilus oryzae", "Rhyzopertha dominica", "Oryzaephilus spp.",
      "Hama penyimpanan biji-bijian lainnya"
    ],
    whatIsFooter: "Dengan proses yang tepat dan terukur, fumigasi mampu menjaga kualitas komoditas tetap aman selama masa penyimpanan maupun distribusi.",
    whyTitle: "Mengapa Kutu Beras Harus Segera Dikendalikan?",
    whyIntro: "Serangan kutu beras sering kali tidak terlihat pada tahap awal. Namun jika dibiarkan, populasinya dapat berkembang sangat cepat dan menyebabkan berbagai kerugian, seperti:",
    whyList: [
      "Penurunan kualitas beras.",
      "Penyusutan berat komoditas.",
      "Kontaminasi produk pangan.",
      "Kerusakan kemasan penyimpanan.",
      "Penurunan nilai jual produk.",
      "Risiko penolakan oleh pembeli atau eksportir.",
      "Kerugian finansial yang signifikan."
    ],
    whyFooter: "Oleh karena itu, fumigasi menjadi langkah penting untuk memastikan komoditas tetap aman dan memenuhi standar kualitas.",
    advTitle: "Keunggulan Jasa Fumigasi Beras PT. Panca Prima Wijaya",
    advList: [
      { num: "1", title: "Metode Fumigasi Fosfin yang Efektif", desc: "Kami menerapkan teknologi fumigasi fosfin yang telah digunakan secara luas dalam industri penyimpanan pangan.", list: ["Daya penetrasi tinggi", "Menjangkau seluruh area komoditas", "Membasmi hama hingga ke telur dan larva", "Efektif untuk volume besar"] },
      { num: "2", title: "Tim Berpengalaman dan Bersertifikat", desc: "Setiap pekerjaan ditangani oleh tenaga profesional yang memahami prosedur fumigasi sesuai standar keselamatan dan kebutuhan industri." },
      { num: "3", title: "Proses Aman dan Terukur", desc: "Kami melakukan perencanaan, monitoring, hingga evaluasi hasil fumigasi untuk memastikan efektivitas pengendalian hama berjalan optimal." },
      { num: "4", title: "Cocok untuk Gudang Skala Kecil Hingga Besar", desc: "Layanan kami dapat disesuaikan untuk kebutuhan gudang distribusi, gudang logistik, pabrik pengolahan pangan, silo penyimpanan, kontainer ekspor, dan kapal pengangkut." },
      { num: "5", title: "Hasil Pengendalian Lebih Maksimal", desc: "Dengan pengaplikasian yang tepat, fumigasi memberikan tingkat keberhasilan tinggi dibandingkan metode pengendalian konvensional." }
    ],
    specTitle: "Spesialisasi Fumigasi Komoditas",
    specSub: "Selain layanan utama Jasa Fumigasi Beras, PT. Panca Prima Wijaya juga memiliki pengalaman dalam menangani berbagai komoditas lainnya.",
    specList: [
      { title: "Fumigasi Jagung", desc: "Bertujuan mengendalikan hama penyimpanan yang dapat menurunkan kualitas dan nilai jual hasil panen.", list: ["Membasmi kumbang jagung", "Mengendalikan serangan larva", "Menjaga kualitas penyimpanan"] },
      { title: "Fumigasi Biji Kopi", desc: "Biji kopi memerlukan perlindungan khusus selama penyimpanan agar mutu dan aroma tetap terjaga.", list: ["Mengendalikan hama gudang", "Menjaga kualitas ekspor", "Mempertahankan nilai komersial"] },
      { title: "Fumigasi Pakan Ternak", desc: "Pakan ternak yang tersimpan dalam jumlah besar sangat rentan terhadap serangan serangga gudang.", list: ["Mencegah kerusakan nutrisi", "Mengurangi kehilangan stok", "Menjaga kualitas pakan"] }
    ],
    targetTitle: "Target & Komoditas Fumigasi",
    targetSub: "PT. Panca Prima Wijaya melayani fumigasi untuk berbagai fasilitas penyimpanan dan komoditas.",
    targetList: [
      { title: "Gudang & Fasilitas", list: ["Gudang Beras & Jagung", "Gudang Pakan Ternak", "Gudang Biji Kopi & Tepung", "Gudang Kakao & Kedelai", "Gudang Kacang Tanah & Kacang Hijau", "Gudang Logistik & Distribusi", "Fasilitas Penyimpanan Pangan Nasional", "Silo & Tangki Penyimpanan"] },
      { title: "Komoditas", list: ["Beras", "Jagung", "Biji Kopi", "Kakao & Kedelai", "Kacang Tanah & Hijau", "Tepung & Pakan Ternak", "Komoditas Biji-bijian & Sereal", "Produk Pertanian untuk Ekspor"] },
      { title: "Transportasi & Ekspor", list: ["Kontainer Ekspor & Impor", "Kapal Pengangkut Komoditas", "Terminal Peti Kemas", "Fasilitas Karantina Komoditas", "Area Distribusi Nasional"] }
    ],
    stepTitle: "Tahapan Pelaksanaan Fumigasi Beras",
    stepSub: "Untuk memastikan hasil yang optimal, proses fumigasi dilakukan melalui beberapa tahapan:",
    steps: [
      { num: "1", title: "Survey Lokasi", desc: "Tim melakukan inspeksi terhadap kondisi gudang, jenis komoditas, tingkat infestasi, dan volume penyimpanan." },
      { num: "2", title: "Persiapan Area", desc: "Area fumigasi dipastikan kedap gas untuk menjaga efektivitas proses pengendalian." },
      { num: "3", title: "Aplikasi Fumigan", desc: "Fumigan fosfin diaplikasikan sesuai dosis dan standar teknis yang berlaku." },
      { num: "4", title: "Monitoring Konsentrasi Gas", desc: "Konsentrasi gas dipantau secara berkala untuk memastikan hasil fumigasi maksimal." },
      { num: "5", title: "Aerasi dan Evaluasi", desc: "Setelah masa paparan selesai, dilakukan aerasi serta evaluasi hasil pengendalian hama." }
    ],
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      { q: "Mengapa fumigasi beras lebih efektif dibanding penyemprotan biasa?", a: "Fumigasi menggunakan gas yang dapat menjangkau seluruh bagian komoditas dan area tersembunyi. Berbeda dengan penyemprotan yang hanya bekerja pada permukaan, fumigasi mampu membasmi hama pada semua fase kehidupan, termasuk telur dan larva." },
      { q: "Hama apa saja yang dapat dibasmi dengan fumigasi beras?", a: "Fumigasi efektif untuk mengendalikan berbagai hama gudang seperti kutu beras (Sitophilus oryzae), kumbang gudang, ngengat gudang, Tribolium spp., Rhyzopertha dominica, dan berbagai serangga penyimpanan lainnya." },
      { q: "Apakah fumigasi fosfin aman untuk komoditas beras?", a: "Ya. Fumigasi fosfin dilakukan sesuai prosedur dan dosis yang direkomendasikan sehingga aman digunakan pada komoditas pangan setelah proses aerasi selesai dilakukan oleh tenaga profesional." },
      { q: "Berapa lama proses fumigasi beras berlangsung?", a: "Durasi fumigasi umumnya berkisar antara 3 hingga 7 hari tergantung jenis komoditas, tingkat infestasi hama, volume penyimpanan, serta kondisi lokasi fumigasi." },
      { q: "Kapan gudang perlu dilakukan fumigasi?", a: "Fumigasi sebaiknya dilakukan ketika ditemukan tanda-tanda serangan hama gudang, sebelum penyimpanan jangka panjang, sebelum distribusi besar, atau sebagai bagian dari program pengendalian hama berkala." }
    ],
    ctaTitle: "Konsultasikan Kebutuhan Jasa Fumigasi Beras Anda",
    ctaDesc: "Jika gudang beras, jagung, kopi, pakan ternak, atau komoditas lainnya mulai menunjukkan tanda-tanda serangan hama, segera lakukan tindakan pengendalian yang tepat sebelum kerugian semakin besar."
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
              <img src="https://ik.imagekit.io/cej2dcwlx/foto%20fumigasi%20beras.jpg?updatedAt=1713589433431" alt="Jasa Fumigasi Beras" className="w-full h-[400px] object-cover rounded-2xl shadow-2xl relative z-0 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0a2558] mb-6">{content.introTitle}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed text-justify">
            {content.introDesc1}
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed text-justify">
            {content.introDesc2}
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            {content.introDesc3}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 bg-[#f4f7f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Apa Itu Jasa Fumigasi */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0a2558] mb-4">{content.whatIsTitle}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                <AutoLinkText>
                  {content.whatIsDesc1}
                </AutoLinkText>
              </p>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">{content.whatIsIntroList}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                {content.whatIsList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed text-sm">
                {content.whatIsFooter}
              </p>
            </div>

            {/* Mengapa Harus Dikendalikan */}
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

      {/* Keunggulan */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558] mb-4">
              {isEn ? "Service Advantages" : "Keunggulan Jasa Fumigasi Beras"}<br/>{isEn ? "of PT. Panca Prima Wijaya" : "PT. Panca Prima Wijaya"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.advList.map((item, idx) => (
              <div key={idx} className="bg-[#f4f7f6] p-6 rounded-xl border border-gray-100">
                <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">{item.num}</span>
                <h4 className="font-bold text-[#0a2558] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                {item.list && (
                  <ul className="text-xs text-gray-500 space-y-1">
                    {item.list.map((lItem, lIdx) => <li key={lIdx}>• {lItem}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spesialisasi */}
      <section className="py-16 bg-[#0a2558] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">{content.specTitle}</h2>
            <p className="text-blue-100">{content.specSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.specList.map((app, idx) => (
              <div key={idx} className="bg-blue-900/50 p-6 rounded-xl border border-blue-800">
                <h4 className="font-bold text-white text-lg mb-3">{app.title}</h4>
                <p className="text-sm text-blue-200 mb-4 h-16">{app.desc}</p>
                <ul className="text-xs text-blue-100 space-y-2">
                  {app.list.map((listItem, listIdx) => (
                    <li key={listIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></span>{listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Fumigasi */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.targetTitle}</h2>
            <p className="mt-2 text-gray-600">{content.targetSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.targetList.map((tSection, sIdx) => {
              const colorCode = sIdx === 0 ? "bg-blue-500" : sIdx === 1 ? "bg-[#16a34a]" : "bg-yellow-500";
              return (
                <div key={sIdx}>
                  <h4 className="font-bold text-[#0a2558] mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gray-100 flex flex-col items-center justify-center">
                      <div className="w-4 h-3 bg-gray-400"></div>
                    </div> 
                    {tSection.title}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 pl-2">
                    {tSection.list.map((tItem, tItemIdx) => (
                      <li key={tItemIdx} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 ${colorCode} rounded-full mt-1.5 flex-shrink-0`}></div>{tItem}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Tahapan */}
      <section className="py-16 bg-[#f4f7f6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a2558]">{content.stepTitle}</h2>
            <p className="mt-2 text-gray-600">{content.stepSub}</p>
          </div>
          
          <div className="space-y-4">
            {content.steps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-12 h-12 rounded-full bg-[#16a34a] text-white flex justify-center items-center font-bold text-xl flex-shrink-0">{step.num}</div>
                <div>
                  <h4 className="font-bold text-[#0a2558]">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
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
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              {isEn ? "FAQ" : "PERTANYAAN UMUM"}
            </p>
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
