import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ArrowUpRight, 
  Calendar, Clock, User, BookOpen 
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Post } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { SAMPLE_POSTS } from '../../data/samplePosts';

export default function Blog() {
  const { isEn, langLink } = useLanguage();
  const location = useLocation();
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 1. Determine active currentSite context ('panca' vs 'sensor') dynamically
  const currentSite = React.useMemo<'panca' | 'sensor'>(() => {
    if (location.pathname.includes('/sensor/blog') || location.pathname.includes('/sensor')) {
      return 'sensor';
    }
    if (location.pathname.includes('/panca/blog') || location.pathname.includes('/panca')) {
      return 'panca';
    }
    const stored = localStorage.getItem('currentSite');
    return stored === 'sensor' ? 'sensor' : 'panca';
  }, [location.pathname]);

  // 2. Fetch posts from internal API on load
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Keep only published posts
          setDbPosts(data.filter(p => !p.status || p.status === 'publish'));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching database articles:", err);
        setLoading(false);
      });
  }, []);

  // 3. Filter database posts and fallback mockup samples by active site partition
  const activeSitePosts = React.useMemo(() => {
    const filteredDb = dbPosts.filter(p => (p.site || 'panca') === currentSite);
    const filteredSamples = SAMPLE_POSTS.filter(s => (s.site || 'panca') === currentSite);

    // Filter duplicates by slug
    const dbSlugs = new Set(filteredDb.map(p => p.slug));
    const uniqueSamples = filteredSamples.filter(s => !dbSlugs.has(s.slug));

    return [...filteredDb, ...uniqueSamples];
  }, [dbPosts, currentSite]);

  // 4. Extract categories for the current active site beautifully
  const siteCategories = React.useMemo(() => {
    const cats = new Set<string>();
    activeSitePosts.forEach(p => {
      if (p.category) {
        p.category.split(',').forEach(c => {
          const trimmed = c.trim();
          if (trimmed) cats.add(trimmed);
        });
      }
    });
    return Array.from(cats);
  }, [activeSitePosts]);

  // 5. Filter posts based on Category Selection
  const filteredPosts = React.useMemo(() => {
    if (activeCategory.toLowerCase().trim() === 'all') {
      return activeSitePosts;
    }
    return activeSitePosts.filter(p => {
      if (!p.category) return false;
      const cats = p.category.split(',').map(c => c.trim().toLowerCase());
      return cats.includes(activeCategory.toLowerCase().trim());
    });
  }, [activeSitePosts, activeCategory]);

  // Reset page pagination whenever site or category filters modify
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, currentSite]);

  // 6. Layout-specific Slicing and Grid settings
  // Sensor uses 6 card grid view, Panca uses 1 Large Featured Hero banner followed by 6 cards.
  const postsPerPage = 6;
  const totalItems = filteredPosts.length;

  const featuredPost = currentSite === 'panca' && currentPage === 1 && totalItems > 0 
    ? filteredPosts[0] 
    : null;

  const gridPosts = React.useMemo(() => {
    if (totalItems === 0) return [];
    
    if (currentSite === 'panca') {
      if (currentPage === 1) {
        return filteredPosts.slice(1, 7); // skip 1st (featured banner)
      }
      const startIndex = (currentPage - 1) * postsPerPage + 1;
      return filteredPosts.slice(startIndex, startIndex + postsPerPage);
    } else {
      // Sensor site: standard card listing from index 0
      const startIndex = (currentPage - 1) * postsPerPage;
      return filteredPosts.slice(startIndex, startIndex + postsPerPage);
    }
  }, [filteredPosts, currentPage, totalItems, currentSite]);

  // Calculate total pages dynamically based on slicing model
  const totalPages = React.useMemo(() => {
    if (currentSite === 'panca') {
      if (totalItems <= 7) return 1;
      return 1 + Math.ceil((totalItems - 7) / postsPerPage);
    } else {
      return Math.ceil(totalItems / postsPerPage);
    }
  }, [totalItems, currentSite]);

  // 7. Human labels mapper matching the screenshots
  const getCategoryLabel = (cat: string) => {
    const norm = cat.toLowerCase().trim();
    if (norm === 'all') {
      if (currentSite === 'sensor') return isEn ? 'All Articles' : 'Semua Artikel';
      return isEn ? 'All' : 'Semua';
    }
    if (norm === 'lifestyle' || norm === 'gaya hidup') {
      return isEn ? 'Lifestyle' : 'Gaya Hidup';
    }
    if (norm === 'tech' || norm === 'teknologi') {
      return isEn ? 'Technology' : 'Teknologi';
    }
    if (norm === 'fashion' || norm === 'gaya busana') {
      return isEn ? 'Fashion' : 'Gaya Busana';
    }
    if (norm === 'beauty' || norm === 'kecantikan') {
      return isEn ? 'Beauty & Skincare' : 'Kecantikan';
    }
    if (norm === 'koleksi rumah' || norm === 'home collection') {
      return isEn ? 'Home Collection' : 'Koleksi Rumah';
    }
    if (norm === 'home decor' || norm === 'decor' || norm === 'dekorasi rumah') {
      return isEn ? 'Home Decor' : 'Dekorasi Rumah';
    }
    if (norm === 'sport' || norm === 'olahraga') {
      return isEn ? 'Sports' : 'Olahraga';
    }
    if (norm === 'promo') {
      return isEn ? 'Promotions' : 'Promo';
    }
    return cat;
  };

  // Color mapper for Sensor category tags (Mobile attachment mockup)
  const getSensorCategoryBadgeStyles = (cat: string) => {
    const norm = cat.toLowerCase().trim();
    if (norm === 'koleksi rumah') {
      return 'bg-amber-500 text-white';
    }
    if (norm === 'gaya hidup' || norm === 'lifestyle') {
      return 'bg-emerald-500 text-white';
    }
    return 'bg-sky-500 text-white'; // default to teknologi blue
  };

  // Safe date parser to relative string
  const getRelativeDateString = (isoString?: string) => {
    if (!isoString) return isEn ? 'Recent' : 'Baru-baru ini';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return isEn ? 'Recent' : 'Baru';
    }
  };

  // Build pagination circles list helper
  const getPaginationRange = (current: number, max: number) => {
    const range: (number | string)[] = [];
    if (max <= 5) {
      for (let i = 1; i <= max; i++) range.push(i);
    } else {
      range.push(1);
      if (current > 3) range.push('...');
      
      const start = Math.max(2, current - 1);
      const end = Math.min(max - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        if (!range.includes(i)) range.push(i);
      }
      
      if (current < max - 2) range.push('...');
      if (!range.includes(max)) range.push(max);
    }
    return range;
  };

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="font-sans text-slate-800 bg-slate-50/40 min-h-screen py-8 md:py-14">
      <SEO 
        title={isEn 
          ? `${currentSite === 'sensor' ? 'Sensor & IoT' : 'Educational'} Articles | PT Panca Prima Wijaya` 
          : `${currentSite === 'sensor' ? 'Artikel Sensor & IoT' : 'Artikel Edukasi & Blog'} | PT Panca Prima Wijaya`
        }
        description={isEn 
          ? "Read the latest tips on warehouse monitoring, industrial early warnings, smart sensors and cargo safety." 
          : "Informasi terbaru seputar teknologi monitoring suhu, early warning system, pest control, dan logistik pergudangan."
        }
        type="website"
        canonical={typeof window !== 'undefined' ? window.location.origin + langLink(`/${currentSite}/blog`) : ''}
        breadcrumbs={[
          { name: isEn ? 'Home' : 'Beranda', item: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: 'Blog', item: typeof window !== 'undefined' ? window.location.origin + langLink(`/${currentSite}/blog`) : '' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section Details */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#0a2558] bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-3 animate-pulse">
            {currentSite === 'sensor' ? 'TOYO AUTOMATION JAPAN' : 'INSIGHTS & EDUCATION'}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            {currentSite === 'sensor' 
              ? (isEn ? 'IoT Sensor Articles' : 'Edukasi & Blog Sensor')
              : (isEn ? 'Articles & Insights' : 'Artikel & Edukasi')
            }
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
            {currentSite === 'sensor'
              ? (isEn 
                  ? 'Learn about industrial monitoring systems, real-time alerts, and smart temperature tracking.'
                  : 'Pelajari pemanfaatan teknologi nirkabel, sensor ketahanan industri, dan mitigasi anomali gudang.'
                )
              : (isEn
                  ? 'Find helpful guides, technological reviews, and specialist logs curated by PT Panca Prima Wijaya.'
                  : 'Informasi terbaru seputar teknologi monitoring infrastruktur, penanganan sanitasi, dan pengelolaan logistik.'
                )
            }
          </p>
        </div>

        {/* Categories Pills Filter: Matches mockups perfectly for both views */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 md:mb-10 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-black rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#0a2558] text-white border-transparent shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {getCategoryLabel('all')}
          </button>
          
          {siteCategories.map(cat => {
            const isSelected = activeCategory.toLowerCase().trim() === cat.toLowerCase().trim();
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-black rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#0a2558] text-white border-transparent shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            );
          })}
        </div>

        {/* Global Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
                <div className="h-44 bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-6 bg-slate-200 rounded w-5/6" />
                <div className="h-4 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* 1. Large Premium Featured Hero Post at page 1 (ONLY for PANCA site view) */}
            {featuredPost && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all duration-300 overflow-hidden mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left component: Hero Image */}
                  <div className="lg:col-span-7 h-[250px] sm:h-[350px] lg:h-[430px] w-full relative overflow-hidden group">
                    <img 
                      src={featuredPost.featuredImage || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200'} 
                      alt={isEn ? (featuredPost.title_en || featuredPost.title) : featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right component: Meta Content */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                    <div>
                      {/* Badge in emerald green */}
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-md mb-4">
                        {featuredPost.category ? getCategoryLabel(featuredPost.category) : 'Tech & Gadget'}
                      </span>
                      
                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl lg:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4 hover:text-[#0a2558] transition-colors">
                        <Link to={langLink(`/${currentSite}/blog/${featuredPost.slug}`)}>
                          {isEn ? (featuredPost.title_en || featuredPost.title) : featuredPost.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed mb-6 line-clamp-4">
                        {isEn ? (featuredPost.content_en || featuredPost.content) : featuredPost.content}
                      </p>
                    </div>

                    {/* Bottom Metadata row matches mockup with Redaksi Panca / Date / arrow link */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-[#0a2558]">
                          {featuredPost.category ? featuredPost.category[0].toUpperCase() : 'P'}
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-800 leading-none">
                            {isEn ? 'Editorial Team' : 'Redaksi Panca'}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1">
                            {getRelativeDateString(featuredPost.createdat)}
                          </p>
                        </div>
                      </div>

                      <Link 
                        to={langLink(`/${currentSite}/blog/${featuredPost.slug}`)}
                        className="text-xs font-black text-[#0a2558] hover:text-blue-700 transition flex items-center gap-1.5"
                      >
                        <span>{isEn ? 'Read More' : 'Keterangan Selengkapnya'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* 2. Grid Cards Section matches 3-column / 2-column mockup based on screen sizes */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in">
                {gridPosts.map(post => {
                  const displayTitle = isEn ? (post.title_en || post.title) : post.title;
                  const displayContent = isEn ? (post.content_en || post.content) : post.content;
                  
                  return (
                    <div 
                      key={post.id} 
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex flex-col group overflow-hidden"
                    >
                      <Link to={langLink(`/${currentSite}/blog/${post.slug}`)} className="block relative overflow-hidden aspect-video">
                        {/* Categorization tag on top of image matching mockups */}
                        {post.category && (
                          <span className={`absolute top-3 left-3 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs z-10 ${
                            currentSite === 'sensor' 
                              ? getSensorCategoryBadgeStyles(post.category)
                              : 'bg-white/95 text-slate-800'
                          }`}>
                            {getCategoryLabel(post.category)}
                          </span>
                        )}
                        <img 
                          src={post.featuredImage || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800'} 
                          alt={displayTitle}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                      </Link>

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0a2558] line-clamp-2 leading-snug mb-2 transition-colors">
                            <Link to={langLink(`/${currentSite}/blog/${post.slug}`)}>
                              {displayTitle}
                            </Link>
                          </h3>

                          {/* Excerpt */}
                          <p className="text-xs sm:text-[13px] text-slate-500 font-semibold line-clamp-3 leading-relaxed mb-4">
                            {displayContent}
                          </p>
                        </div>

                        {/* Footer cards metadata: matches attachments exactly */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                            <span>{getRelativeDateString(post.createdat)}</span>
                          </div>
                          <Link 
                            to={langLink(`/${currentSite}/blog/${post.slug}`)}
                            className="text-[#0a2558] hover:text-blue-700 select-none flex items-center gap-0.5 font-black transition"
                          >
                            <span>{isEn ? 'More Detail' : 'Baca Selengkapnya'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : !featuredPost && (
              <div className="text-center py-20 bg-white border rounded-2xl p-6">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">
                  {isEn ? 'No articles found' : 'Belum ada artikel'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {isEn 
                    ? 'No articles match the selected filters right now.' 
                    : 'Belum ada artikel pada kategori terpilih untuk website ini.'
                  }
                </p>
              </div>
            )}

            {/* 3. Aesthetic Pagination Row matches mockups precisely */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2.5 mt-10 md:mt-14 pb-4">
                
                {/* Prev button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page number circles */}
                {paginationRange.map((p, idx) => {
                  if (p === '...') {
                    return (
                      <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs font-bold font-mono">
                        ...
                      </span>
                    );
                  }
                  
                  const isCurrent = currentPage === p;
                  return (
                    <button
                      key={`page-${p}`}
                      onClick={() => setCurrentPage(p as number)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-black transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0a2558] text-white shadow-xs'
                          : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                {/* Next button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
