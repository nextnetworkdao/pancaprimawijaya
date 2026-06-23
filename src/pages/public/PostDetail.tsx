import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, Flame, ShoppingBag, MessageSquare, ChevronDown, Facebook, Link2, LucideCheck, Sparkles, Star, ChevronRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Post, Product } from '../../types';
import { applyAutoLinkHtml } from '../../utils/autoLink';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';
import { SAMPLE_POSTS } from '../../data/samplePosts';

// Fallback mockup products matching Attachment 2
const FALLBACK_PANCA_PRODUCT: Partial<Product> = {
  id: 'FB-PANCA-1',
  name: "Sofa Modular 'Kyoto' Series",
  name_en: "Modular Sofa 'Kyoto' Series",
  slug: 'sofa-modular-kyoto-series',
  price: 4599000,
  category: 'Home Collection',
  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  description: 'Sofa premium dengan desain Skandinavia modern yang dapat disesuaikan dengan tata letak ruang tamu Anda. Menggunakan bahan tahan air berkualitas tinggi bergaya minimalis.',
  description_en: 'Premium Scandinavian modular sofa designed to naturally elevate your living space layout. Crafted with waterproof premium textures in subtle minimalism.'
};

const FALLBACK_SENSOR_PRODUCT: Partial<Product> = {
  id: 'FB-SENSOR-1',
  name: 'Wireless Temperature IoT Sensor',
  name_en: 'Wireless Temperature IoT Sensor Gateway',
  slug: 'wireless-temperature-sensor',
  price: 1850000,
  category: 'Sparepart & Sensor',
  image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
  description: 'Sensor suhu nirkabel pintar berbasis LoRa / Zigbee untuk pemantauan realtime suhu panel listrik, ruang cold storage, dan motor elevator komersial.',
  description_en: 'Smart wireless IoT temperature sensor utilizing LoRa / Zigbee for real-time monitoring of power units, cold storage rooms, and elevator units.'
};

export default function PostDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const { langLink, isEn } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // States for interactive components
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [isTOCExpanded, setIsTOCExpanded] = useState(true);

  // Determine active currentSite context ('panca' vs 'sensor') dynamically
  const currentSite = React.useMemo<'panca' | 'sensor'>(() => {
    if (location.pathname.startsWith('/sensor') || location.pathname.includes('/sensor/')) {
      return 'sensor';
    }
    if (post && post.site === 'sensor') {
      return 'sensor';
    }
    return 'panca';
  }, [location.pathname, post]);

  // Fetch the main article details
  useEffect(() => {
    // Check if it's an offline/fallback sample post first
    const isSample = SAMPLE_POSTS.find(p => p.slug === slug || p.slug_en === slug);
    if (isSample) {
      setPost(isSample);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from backend DB
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) return;
    
    // If language is English and current URL is Indonesian slug, redirect to English slug
    if (language === 'en' && slug === post.slug && post.slug_en && slug !== post.slug_en) {
      navigate(`/en/${currentSite}/blog/${post.slug_en}`, { replace: true });
    }
    // If language is Indonesian and current URL is English slug, redirect to Indonesian slug
    else if (language === 'id' && slug === post.slug_en && post.slug && slug !== post.slug) {
      navigate(`/${currentSite}/blog/${post.slug}`, { replace: true });
    }
  }, [language, slug, post, currentSite, navigate]);

  // Fetch sidebar data on site context change
  useEffect(() => {
    // Fetch products
    fetch(`/api/products?site=${currentSite}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Error fetching related products:", err));

    // Fetch all posts to populate trending now list
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Keep only published posts of current site partition
          const filtered = data.filter(p => p.site === currentSite && p.slug !== slug && (!p.status || p.status === 'publish'));
          setAllPosts(filtered);
        }
      })
      .catch(err => console.error("Error fetching trending articles:", err));
  }, [currentSite, slug]);

  const { translatedData: translatedPost, loading: translating } = useAutoTranslate(post, ['title', 'content']);

  // Extract other posts for "Trending Sekarang" widget (limiting to top 4)
  const trendingPosts = React.useMemo(() => {
    const list = [...allPosts];
    // If not enough server posts, secure fallback from static sample list
    const samps = SAMPLE_POSTS.filter(s => s.site === currentSite && s.slug !== slug);
    samps.forEach(s => {
      if (!list.some(p => p.slug === s.slug)) {
        list.push(s);
      }
    });
    return list.slice(0, 4);
  }, [allPosts, currentSite, slug]);

  // Related products sidebar widgets (limiting to top 2)
  const relatedProducts = React.useMemo(() => {
    return products.slice(0, 2);
  }, [products]);

  // Selected recommended product for inline body insertion (fallbacks to custom mockups matching Image 2 layout)
  const promoProduct = React.useMemo(() => {
    if (products.length > 0) {
      return products[products.length - 1]; // fetch last product
    }
    return currentSite === 'sensor' 
      ? FALLBACK_SENSOR_PRODUCT as Product 
      : FALLBACK_PANCA_PRODUCT as Product;
  }, [products, currentSite]);

  // Helper for formatting pricing context
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Safe browser window link sharer
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnWhatsapp = () => {
    const text = encodeURIComponent(`${translatedPost?.title || 'Artikel Edukasi'} - Baca selengkapnya di: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Auto-extract headings for the interactive Table of Contents (TOC)
  const parsedHeadings = React.useMemo(() => {
    const headings: { id: string; text: string; level: number }[] = [];
    if (!translatedPost || !translatedPost.content) return headings;

    const content = translatedPost.content;
    const h2h3Regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
    let match;
    let idCounter = 0;

    while ((match = h2h3Regex.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      if (text) {
        idCounter++;
        headings.push({ id: `heading-${idCounter}`, text, level });
      }
    }

    // Markdown headings alternative
    if (headings.length === 0) {
      const mdRegex = /^(#{2,3})\s+(.+)$/gm;
      let mdMatch;
      while ((mdMatch = mdRegex.exec(content)) !== null) {
        const level = mdMatch[1].length;
        const text = mdMatch[2].trim();
        if (text) {
          idCounter++;
          headings.push({ id: `heading-${idCounter}`, text, level });
        }
      }
    }

    // Core default sections for raw plain text paragraph posts
    if (headings.length === 0) {
      const lines = content.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim().replace(/<[^>]*>/g, '');
        if (trimmed.length > 5 && trimmed.length < 100) {
          const isHeadingLike = /^\d+\.\s+/.test(trimmed) || 
                                trimmed.toLowerCase().startsWith('kesimpulan') || 
                                trimmed.toLowerCase().startsWith('prinsip utama') ||
                                trimmed.toLowerCase().includes('tips') ||
                                trimmed.toLowerCase().includes('penting');
          if (isHeadingLike) {
            idCounter++;
            headings.push({ id: `heading-${idCounter}`, text: trimmed, level: 2 });
          }
        }
      });
    }

    // Global structural fallback segments to secure a TOC under all user contents
    if (headings.length === 0) {
      const paragraphs = content.split(/<\/p>|<br\s*\/?>\s*<br\s*\/?>|\n\n+/gi)
        .map(p => p.replace(/<[^>]*>/g, '').trim())
        .filter(p => p.length > 10);
      
      if (paragraphs.length > 0) {
        headings.push({ id: 'heading-intro', text: isEn ? 'Introduction' : 'Pendahuluan', level: 2 });
        if (paragraphs.length > 1) {
          headings.push({ id: 'heading-main', text: isEn ? 'Core Discussion' : 'Pembahasan Utama', level: 2 });
        }
        if (paragraphs.length > 2) {
          headings.push({ id: 'heading-conclusion', text: isEn ? 'Conclusion & Recommendation' : 'Kesimpulan dan Rekomendasi', level: 2 });
        }
      }
    }

    return headings;
  }, [translatedPost, isEn]);

  // Inject ID attributes into the content body for smooth anchoring
  const processedContentHtml = React.useMemo(() => {
    if (!translatedPost || !translatedPost.content) return '';
    let content = applyAutoLinkHtml(translatedPost.content);

    let idCounter = 0;
    // Replace raw headings
    content = content.replace(/(<h[2-3][^>]*>)(.*?)(<\/h[2-3]>)/gi, (match, openTag, text, closeTag) => {
      idCounter++;
      return `${openTag.replace('>', ` id="heading-${idCounter}">`)}${text}${closeTag}`;
    });

    // If fallback segments was used, inject anchors above first, mid, and last paragraphs
    if (idCounter === 0) {
      const segments = content.split(/<p>/gi);
      if (segments.length > 1) {
        let rebuilt = segments[0];
        for (let i = 1; i < segments.length; i++) {
          let spanId = '';
          if (i === 1) {
            spanId = '<span id="heading-intro" class="block h-0 w-0 overflow-hidden"></span>';
          } else if (i === Math.floor(segments.length / 2)) {
            spanId = '<span id="heading-main" class="block h-0 w-0 overflow-hidden"></span>';
          } else if (i === segments.length - 1) {
            spanId = '<span id="heading-conclusion" class="block h-0 w-0 overflow-hidden"></span>';
          }
          rebuilt += `<p>${spanId}${segments[i]}`;
        }
        content = rebuilt;
      }
    }

    return content;
  }, [translatedPost]);

  // Click handler for Table of Contents item smooth scrolled
  const handleTOCKlick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.scrollBy(0, -90);
    }
  };

  // Context-aware FAQ automatic generator reflecting the article's attributes
  const faqs = React.useMemo(() => {
    if (!translatedPost) return [];
    const title = translatedPost.title || '';
    const contentLower = (translatedPost.content || '').toLowerCase();
    const categoryLower = (translatedPost.category || '').toLowerCase();

    const isPestOrFumigation = categoryLower.includes('pest') || 
                               categoryLower.includes('gudang') ||
                               contentLower.includes('pest') || 
                               contentLower.includes('fumiga') || 
                               contentLower.includes('kutu') || 
                               contentLower.includes('hama');

    const isHardwareOrIoT = currentSite === 'sensor' || 
                            categoryLower.includes('sensor') || 
                            categoryLower.includes('technology') ||
                            categoryLower.includes('teknologi') ||
                            contentLower.includes('sensor') ||
                            contentLower.includes('monitoring') ||
                            contentLower.includes('early warning');

    if (isPestOrFumigation) {
      return [
        {
          q: isEn 
            ? `How does professional fumigation differ from general spray pest control?` 
            : `Apa perbedaan antara fumigasi profesional dengan pest control semprot biasa?`,
          a: isEn 
            ? `Unlike conventional spray pest control, fumigation uses deeply penetrative gas (fumigants) such as Fumiphos. This fully permeates packed bulk commodities (like rice stacks, grain bags, and wood) to eliminate all pest life stages—including eggs, larvae, and pupae—which sprays cannot reach.`
            : `Berbeda dengan penyemprotan biasa, fumigasi menggunakan zat gas (fumigan) seperti Fumiphos yang mampu menembus ke dalam tumpukan komoditi pangan (seperti komoditas beras, kopi, jagung) hingga ke sela-sela terdalam untuk mengeliminasi hama di semua fase hidup (telur, larva, kepompong, kutu dewasa).`
        },
        {
          q: isEn 
            ? `Does fumigation using Fumiphos or Silogud affect food safety or quality?` 
            : `Apakah fumigasi dengan Fumiphos atau Silogud aman untuk kualitas beras dan makanan?`,
          a: isEn 
            ? `Fumiphos and Silogud are certified food-grade formulations designed by PT Panca Prima Wijaya. They leave absolutely zero toxic chemical residues on agricultural commodities, and do not alter the texture, taste, color, nutritional content, or standard aroma of foods.`
            : `Fumiphos dan Silogud merupakan formulasi khusus berkualitas tinggi dari PT Panca Prima Wijaya yang tidak meninggalkan residu kimia berbahaya pada komoditas pertanian. Fumigasi ini dijamin tidak merubah tekstur, rasa, warna, kandungan nutrisi, maupun aroma komoditas pangan.`
        },
        {
          q: isEn 
            ? `How often should commercial warehouses conduct sanitation and pest monitoring?` 
            : `Seberapa sering gudang komersial harus melakukan sanitasi dan pemantauan hama?`,
          a: isEn 
            ? `For commercial warehouses storing grains or high-value organic bulk foods, warehouse sanitation should be performed weekly, and complete fumigation checks should occur every 3-6 months. This depends on temperature, humidity logs, and pest inspection thresholds.`
            : `Untuk gudang penyimpanan pangan berskala komersial, disarankan melakukan sanitasi mingguan serta inspeksi berkala. Fumigasi pencegahan atau pembersihan menyeluruh idealnya dijadwalkan setiap 3-6 bulan sekali tergantung tingkat aktivitas dan kelembabab ruangan.`
        }
      ];
    }

    if (isHardwareOrIoT) {
      return [
        {
          q: isEn 
            ? `How do wireless temperature IoT sensors securely transmit data over long factory distances?` 
            : `Bagaimana sensor suhu nirkabel IoT mengirim data secara aman di area pabrik yang luas?`,
          a: isEn 
            ? `Our industrial Toyo temperature sensors utilize advanced Sub-GHz LoRa (Long Range) or Zigbee mesh networks. This allows for reliable wireless communication up to several kilometers inside factories, bypassing thick concrete walls and electrical interference with high-frequency security encryption.`
            : `Sensor suhu Toyo menggunakan frekuensi nirkabel industrial seperti LoRa (Long Range) dan Zigbee Mesh. Sinyal sensor ini terstandarisasi untuk menjangkau jarak hingga beberapa kilometer di area pabrik tanpa terganggu dinding beton tebal maupun interferensi mesin-mesin listrik.`
        },
        {
          q: isEn 
            ? `What actions does the Industrial Early Warning System take once a threshold is breached?` 
            : `Tindakan apa yang diambil Early Warning System saat batas aman terlampaui?`,
          a: isEn 
            ? `Once a critical temp or vibration threshold is breached, the Early Warning System instantly sends push notifications, activates visual/audio sirens on the floor, and triggers safe shutdown relays to cut power from affected control panels or backup generators to avoid fire risks.`
            : `Seketika sensor mendeteksi anomali suhu atau getaran ekstrim, sistem akan memicu alarm lokal, mengirimkan notifikasi instan (email/SMS/aplikasi) ke petugas, serta mengaktifkan sirkuit otomatis untuk mematikan aliran panel listrik/motor lift guna meminimalkan resiko kebakaran.`
        },
        {
          q: isEn 
            ? `Is active calibration required for wireless sensors in cold chain logistical storage?` 
            : `Apakah sensor nirkabel di cold storage logistik membutuhkan kalibrasi rutin?`,
          a: isEn 
            ? `Yes. To ensure maximum accuracy and regulatory compliance with strict pharmaceutical or fresh food cold-chain standards, wireless temperature and relative humidity sensors must undergo professional calibration every 12 months.`
            : `Benar. Guna menjaga tingkat akurasi pengukuran agar tetap presisi dan memenuhi regulasi standardisasi cold chain pangan/farmasi, sensor suhu nirkabel disarankan dikalibrasi secara resmi setiap 12 bulan sekali.`
        }
      ];
    }

    const subject = title;
    return [
      {
        q: isEn 
          ? `What are the actionable takeaways regarding "${subject}"?` 
          : `Apa langkah penting pertama yang dibahas seputar "${subject}"?`,
          a: isEn 
            ? `The article details comprehensive practical methods to handle "${subject}" in structured phases. It recommends assessing your current environment first, followed by choosing certified, high-grade tools or expert support.`
            : `Artikel ini mengupas langkah operasional praktis dalam menangani "${subject}" secara terstruktur. Direkomendasikan melakukan analisis situasi terlebih dahulu sebelum menerapkan taktik serta menggunakan peralatan/jasa bersertifikasi.`
      },
      {
        q: isEn 
          ? `Are the strategies mentioned in "${subject}" safe for beginners or small enterprises?` 
          : `Apakah strategi seputar "${subject}" ini aman diterapkan untuk pemula atau UMKM?`,
          a: isEn 
            ? `Absolutely. Each strategy is designed for scalable safety and efficiency. Small businesses and beginners can start with lightweight steps before deploying larger investments or commercial contracts.`
            : `Tentu saja aman. Setiap anjuran dirancang secara aman dan efisien agar dapat diaplikasikan mulai dari skala mikro (UMKM) hingga level industrial secara bertahap tanpa mengganggu operasional reguler.`
      },
      {
        q: isEn 
          ? `Where can I obtain professional consultation and high-grade solutions related to "${subject}"?` 
          : `Di mana saya bisa berkonsultasi secara mendalam tentang tema "${subject}" ini?`,
          a: isEn 
            ? `You can directly reach the specialist team at PT Panca Prima Wijaya. Click on our floating WhatsApp chat button or fill out our contact inquiry form to receive free professional consultation.`
            : `Anda dapat berdiskusi langsung dengan tim ahli PT Panca Prima Wijaya melalui tautan obrolan WhatsApp resmi atau mengisi form kontak layanan di situs ini untuk mendapatkan konsultasi gratis.`
      }
    ];
  }, [translatedPost, currentSite, isEn]);

  if (loading || translating) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6" />
            <div className="h-96 bg-gray-200 rounded-2xl mb-6" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="h-48 bg-gray-200 rounded-2xl" />
            <div className="h-64 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!translatedPost) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
        <SEO 
          title={isEn ? "Article Not Found - 404 | PT Panca Prima Wijaya" : "Artikel Tidak Ditemukan - 404 | PT Panca Prima Wijaya"} 
          description={isEn ? "The article you are looking for could not be found." : "Artikel yang Anda cari tidak ditemukan."} 
        />
        <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">
          {isEn ? "The article you are looking for cannot be found." : "Artikel yang Anda cari tidak dapat ditemukan."}
        </p>
        <Link to={langLink(`/${currentSite}/blog`)} className="px-6 py-3 bg-[#0a2558] text-white font-medium rounded-lg hover:bg-blue-900 transition">
          {isEn ? "Back to Blog" : "Kembali ke Blog"}
        </Link>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Beranda', item: currentUrl.replace(/\/blog\/.*$/, '') },
    { name: 'Blog', item: currentUrl.replace(new RegExp(`/${slug}$`), '') },
    { name: translatedPost.title, item: currentUrl }
  ];

  const authorName = currentSite === 'sensor' ? 'Toyo Automation Team' : 'Diah Sarah Wijaya';
  const authorRole = currentSite === 'sensor' ? 'Field Technical Engineer' : 'Editor Senior';
  const displayCategory = translatedPost.category || (currentSite === 'sensor' ? 'Teknologi' : 'Gaya Hidup');

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-14">
      <SEO 
        title={translatedPost.seoTitle || translatedPost.title}
        description={translatedPost.seoDescription || ""}
        keywords={translatedPost.keywords || ""}
        type="article"
        canonical={currentUrl}
        breadcrumbs={breadcrumbs}
      />

      {/* Primary Container with desktop-first dual column design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Nice responsive Breadcrumbs */}
        <nav className="flex items-center text-xs font-semibold text-slate-500 mb-6 flex-wrap gap-1">
          <Link to={langLink(`/${currentSite}`)} className="hover:text-[#0a2558] transition-colors">{isEn ? 'Home' : 'Beranda'}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={langLink(`/${currentSite}/blog`)} className="hover:text-[#0a2558] transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 font-bold" />
          <span className="text-[#0a2558] font-bold line-clamp-1 max-w-[250px] sm:max-w-xs">{translatedPost.title}</span>
        </nav>

        {/* Outer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* LEFT COLUMN: Main Editorial Content */}
          <article className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs animate-fade-in">
            
            {/* Elegant Header Banner Overlay Card */}
            <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video group">
              {translatedPost.featuredImage ? (
                <img 
                  src={translatedPost.featuredImage} 
                  alt={translatedPost.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-700 ease-out z-0"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#0a2558]/5 flex items-center justify-center p-8 text-center text-[#0a2558]">
                  <MessageSquare className="w-16 h-16 opacity-10" />
                </div>
              )}
              {/* Back Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent z-10" />
              
              {/* Bottom aligned attributes */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20">
                <span className="inline-block bg-[#0a2558] text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md z-10 mb-3 shadow">
                  {displayCategory}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                  {translatedPost.title}
                </h1>
              </div>
            </div>

            {/* Author details Row + Share Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-blue-50 text-[#0a2558] font-black text-sm uppercase overflow-hidden shadow-xs">
                  {currentSite === 'sensor' ? (
                    <span className="font-bold text-xs">TA</span>
                  ) : (
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Author" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">{authorName}</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    {authorRole} <span className="mx-1">•</span> 
                    {translatedPost.createdat ? new Date(translatedPost.createdat).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                  </p>
                </div>
              </div>

              {/* Interaction icons matching mockup */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyPageLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 hover:bg-slate-100/50 hover:text-slate-900 font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEn ? 'Share' : 'Bagikan'}</span>
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer shadow-2xs ${
                    isSaved 
                      ? 'bg-blue-50 border-blue-200 text-[#0a2558] font-bold' 
                      : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#0a2558] text-[#0a2558]' : 'text-slate-500'}`} />
                  <span>{isSaved ? (isEn ? 'Saved' : 'Tersimpan') : (isEn ? 'Save' : 'Simpan')}</span>
                </button>
              </div>
            </div>

            {/* AUTOMATIC TABLE OF CONTENTS: Expandable widget with nice layout */}
            {parsedHeadings.length > 0 && (
              <div id="table-of-contents" className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8">
                <button 
                  onClick={() => setIsTOCExpanded(!isTOCExpanded)}
                  className="text-slate-900 font-black text-sm flex items-center justify-between w-full uppercase tracking-wider cursor-pointer select-none"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0a2558]" />
                    {isEn ? 'Table of Contents' : 'Daftar Isi'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTOCExpanded ? 'rotate-180 text-[#0a2558]' : 'text-slate-400'}`} />
                </button>
                
                {isTOCExpanded && (
                  <ul className="mt-4 space-y-2 text-xs font-semibold text-[#0a2558] pl-1 animate-fade-in">
                    {parsedHeadings.map((heading) => (
                      <li 
                        key={heading.id} 
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                        className="flex items-start gap-1.5"
                      >
                        <span className="text-slate-400 mt-0.5 select-none">•</span>
                        <a 
                          href={`#${heading.id}`}
                          onClick={(e) => handleTOCKlick(e, heading.id)}
                          className="hover:underline transition-all hover:text-blue-700 leading-snug"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ARTICLE BODY INTERIOR */}
            <div 
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-sans first-letter:float-left first-letter:text-6xl first-letter:font-black first-letter:text-[#0a2558] first-letter:mr-3 first-letter:mt-1.5 first-letter:leading-[0.8] first-letter:font-sans"
              dangerouslySetInnerHTML={{ __html: processedContentHtml }}
            />

            {/* Custom caption style box matching Image 1 design */}
            {translatedPost.featuredImage && (
              <div className="border border-blue-100 bg-blue-50/40 text-blue-900/80 italic px-4 py-2 text-xs text-center rounded-xl max-w-md mx-auto my-8 font-medium">
                {isEn 
                  ? `Illustration of minimal workspace and functional equipment matching best standard models.`
                  : `Inspirasi tata letak ruang fungsional dengan paduan teknologi monitoring berkualitas prima.`}
              </div>
            )}

            {/* IN-CONTENT RECOMMENDED PRODUCT CARD: Fully matching Mockup layout */}
            {promoProduct && (
              <div className="bg-[#f0f4f8] border border-blue-200/60 rounded-2xl p-4 sm:p-5 my-8 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-b-sm">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  {promoProduct.image ? (
                    <img 
                      src={promoProduct.image} 
                      alt={promoProduct.name} 
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-slate-200 shadow-xs flex-shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md mb-1.5 shadow-3xs">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      {isEn ? 'Recommended Choice' : 'Pilihan Rekomendasi'}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 leading-snug">
                      {isEn ? (promoProduct.name_en || promoProduct.name) : promoProduct.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal font-medium">
                      {isEn ? (promoProduct.description_en || promoProduct.description) : promoProduct.description}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-slate-500 font-bold mt-2">
                      <span className="text-amber-500">★ 4.9</span>
                      <span>({isEn ? '132 sold' : '132 terjual'})</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto text-center sm:text-right border-t sm:border-t-0 border-slate-200/50 pt-3 sm:pt-0 flex-shrink-0">
                  <p className="text-xs text-slate-500 font-bold mb-1">{isEn ? 'Best Price:' : 'Harga Spesial:'}</p>
                  <p className="text-base font-black text-[#0a2558] mb-3">{formatIDR(promoProduct.price)}</p>
                  <Link 
                    to={langLink(`/${currentSite}/produk/${promoProduct.slug}`)}
                    className="inline-block w-full sm:w-auto text-center bg-[#0a2558] hover:bg-slate-900 text-white font-black text-xs px-5 py-2.5 rounded-lg transition-all shadow-xs"
                  >
                    {isEn ? 'Buy Now' : 'Beli Sekarang'}
                  </Link>
                </div>
              </div>
            )}

            {/* AUTOMATIC DYNAMIC FAQ ACCORDION SECTION (Strict compliance) */}
            {faqs.length > 0 && (
              <div className="border-t border-slate-100 pt-8 mt-8">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-5 uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0a2558]" />
                  {isEn ? 'Frequently Asked Questions (FAQ)' : 'Pertanyaan Sering Diajukan (FAQ)'}
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => {
                    const isOpen = openFaqIdx === i;
                    return (
                      <div 
                        key={i} 
                        className={`border rounded-xl transition-all duration-300 ${
                          isOpen 
                            ? 'border-blue-200 bg-blue-50/10 shadow-3xs' 
                            : 'border-slate-200/60 hover:bg-slate-50/50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                          className="w-full text-left p-4 flex items-center justify-between gap-3 text-sm font-extrabold text-slate-900 transition-colors hover:text-[#0a2558]"
                        >
                          <span className="leading-snug">{faq.q}</span>
                          <span className={`w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-100 text-[#0a2558]' : 'text-slate-500'}`}>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs sm:text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BOTTOM SOCIAL SHARING BUTTONS SECTION: Matching Attachment 1 */}
            <div className="border-t border-slate-100 pt-6 mt-8">
              <h5 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-4 text-center sm:text-left">
                {isEn ? 'SHARE THIS ARTICLE' : 'BAGIKAN ARTIKEL INI'}
              </h5>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <button 
                  onClick={shareOnFacebook}
                  className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-black text-white bg-[#1877F2] hover:bg-[#166FE5] rounded-xl transition-all shadow-2xs shadow-blue-400/10 cursor-pointer select-none"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                  <span>Facebook</span>
                </button>
                <button 
                  onClick={shareOnWhatsapp}
                  className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-black text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-xl transition-all shadow-2xs shadow-green-400/10 cursor-pointer select-none"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </button>
                <button 
                  onClick={copyPageLink}
                  className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer select-none ${
                    copied 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-slate-100 border-slate-200/80 text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  {copied ? (
                    <>
                      <LucideCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{isEn ? 'Copied!' : 'Tersalin!'}</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{isEn ? 'Copy Link' : 'Salin Tautan'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </article>


          {/* RIGHT COLUMN: Sidebar Widgets (Desktop view matching layouts) */}
          <aside className="lg:col-span-4 space-y-7">
            
            {/* WIDGET 1: TRENDING SEKARANG / TRENDING NOW */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-3xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                {isEn ? 'Trending Now' : 'Trending Sekarang'}
              </h3>
              
              <div className="space-y-4">
                {trendingPosts.map((trend, idx) => (
                  <Link 
                    key={trend.id || idx}
                    to={langLink(`/${currentSite}/blog/${trend.slug}`)} 
                    className="flex items-start gap-3 group"
                  >
                    {trend.featuredImage ? (
                      <img 
                        src={trend.featuredImage} 
                        alt={trend.title} 
                        className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-3xs flex-shrink-0 group-hover:opacity-85 transition-opacity" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-slate-300" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0a2558] line-clamp-2 transition-colors leading-snug">
                        {isEn ? (trend.title_en || trend.title) : trend.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                        {trend.createdat ? new Date(trend.createdat).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short' }) : ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>


            {/* WIDGET 2: RELATED PRODUCTS / PRODUK TERKAIT */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-3xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#0a2558]" />
                {isEn ? 'Related Products' : 'Produk Terkait'}
              </h3>

              {relatedProducts.length > 0 ? (
                <div className="space-y-4">
                  {relatedProducts.map((prod) => (
                    <div key={prod.id} className="relative border border-slate-100 rounded-xl p-3 hover:border-blue-100 transition shadow-2xs">
                      {/* Heart bookmark feedback trigger */}
                      <button className="absolute top-2 right-2 w-7 h-7 bg-white/95 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-105 transition shadow-2xs cursor-pointer">
                        <Star className="w-3.5 h-3.5 fill-current text-slate-300 hover:text-amber-500" />
                      </button>

                      <Link to={langLink(`/${currentSite}/produk/${prod.slug}`)} className="flex items-center gap-3">
                        {prod.image ? (
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                            <ShoppingBag className="w-6 h-6 text-slate-300" />
                          </div>
                        )}
                        <div className="min-w-0 pr-6">
                          <h4 className="text-xs font-extrabold text-slate-800 hover:text-[#0a2558] line-clamp-1 truncate transition-colors leading-snug">
                            {isEn ? (prod.name_en || prod.name) : prod.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">{prod.category || 'Sparepart'}</p>
                          <p className="text-xs font-black text-slate-950 mt-1">{formatIDR(prod.price)}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                /* Static mockup product lists matched if DB products empty */
                <div className="space-y-4">
                  <div className="relative border border-slate-100 rounded-xl p-3 hover:border-blue-100 transition shadow-2xs">
                    <button className="absolute top-2.5 right-2.5 w-6 h-6 bg-white/95 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-amber-500 hover:scale-105 transition shadow-2xs cursor-pointer">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <Link to={langLink(`/${currentSite}/produk`)} className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=150" alt="Sofa Kyoto" className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">Sofa Modular 'Kyoto' Series</h4>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Home Collection</p>
                        <p className="text-xs font-black text-[#0a2558] mt-1">Rp 4.599.000</p>
                      </div>
                    </Link>
                  </div>
                  <div className="relative border border-slate-100 rounded-xl p-3 hover:border-blue-100 transition shadow-2xs">
                    <button className="absolute top-2.5 right-2.5 w-6 h-6 bg-white/95 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-amber-500 hover:scale-105 transition shadow-2xs cursor-pointer">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <Link to={langLink(`/${currentSite}/produk`)} className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=150" alt="Kamera Polaroid" className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">Vase Keramik Modern 'Terra'</h4>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Luxe Ceramics</p>
                        <p className="text-xs font-black text-[#0a2558] mt-1">Rp 325.000</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Catalog Bridge Link matches Image 2 "Lihat Semua Produk" and functions correctly */}
              <div className="mt-5 text-center">
                <Link 
                  to={langLink(`/${currentSite}/produk`)}
                  className="inline-flex items-center justify-center gap-1 w-full text-center py-2.5 border border-[#0a2558] hover:bg-[#0a2558]/5 text-[#0a2558] font-black text-xs rounded-xl transition-all"
                >
                  <span>{isEn ? 'See All Products' : 'Lihat Semua Produk'}</span>
                </Link>
              </div>
            </div>

          </aside>

        </div>

      </div>

      <KlienKami />
      
      <GlobalCTA 
        title={isEn ? "Consultation & Inquiry" : "Konsultasi Lebih Lanjut"} 
        description={isEn 
          ? `Need more assistance or services regarding ${translatedPost.title}? PT. Panca Prima Wijaya is ready to support your private industrial or public governmental sector requirements.`
          : `Butuh layanan atau solusi terkait ${translatedPost.title}? PT. Panca Prima Wijaya siap membantu kebutuhan industri maupun instansi pemerintah.`}
      />
    </div>
  );
}
