import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Page } from '../../types';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';
import { applyAutoLinkHtml } from '../../utils/autoLink';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export default function PageDetail() {
  const params = useParams();
  const { isEn, langLink } = useLanguage();
  const slug = params.slug || params['*'] || '';
  const [page, setPage] = useState<Page | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorNotFound, setErrorNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setErrorNotFound(true);
      setIsLoading(false);
      return;
    }

    fetch(`/api/pages/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setPage(data);
        } else {
          setErrorNotFound(true);
        }
      })
      .catch(() => setErrorNotFound(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const { translatedData: translatedPage, loading: translating } = useAutoTranslate(page, ['title', 'content', 'seodescription', 'seotitle']);

  if (isLoading || translating) {
    return (
      <div className="min-h-screen bg-white p-12 text-center text-gray-500 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4" />
        <p>{isEn ? "Translating and Loading Content..." : "Memuat Halaman..."}</p>
      </div>
    );
  }

  if (errorNotFound || !translatedPage) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-6 text-center">
        <SEO 
          title={isEn ? "Page Not Found - 404 | PT Panca Prima Wijaya" : "Halaman Tidak Ditemukan - 404 | PT Panca Prima Wijaya"} 
          description={isEn ? "The page you are looking for does not exist." : "Halaman yang Anda cari tidak ditemukan."} 
        />
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {isEn ? "The page you are looking for could not be found." : "Halaman yang Anda cari tidak dapat ditemukan."}
        </p>
        <Link to={langLink('/')} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
          {isEn ? "Back to Home" : "Kembali ke Beranda"}
        </Link>
      </div>
    );
  }

  const words = translatedPage.title.split(' ');
  const lastWord = words.pop() || '';
  const titleWithoutLast = words.join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans animate-fade-in">
      <SEO 
        title={translatedPage.seotitle || `${translatedPage.title} - PT Panca Prima Wijaya`} 
        description={translatedPage.seodescription || ""} 
        image={translatedPage.image || ""} 
        type="website"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        breadcrumbs={[
          { name: isEn ? 'Home' : 'Beranda', item: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: translatedPage.title, item: typeof window !== 'undefined' ? window.location.href : '' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-500/30 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {isEn ? 'PAGE INFO' : 'INFO HALAMAN'}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            {titleWithoutLast ? <>{titleWithoutLast} <br /></> : ''}
            <span className="text-blue-400">{lastWord}</span>
          </h1>
          
          {translatedPage.seodescription && (
            <div className="pl-4 border-l-4 border-blue-500 mb-8">
              <p className="text-base sm:text-lg text-gray-200 font-medium italic">
                "{translatedPage.seodescription}"
              </p>
            </div>
          )}
          
          <TrustedBy />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {translatedPage.image && (
            <img src={translatedPage.image} alt={translatedPage.title} className="w-full h-auto object-cover rounded-xl mb-8 shadow-sm" />
          )}
          <div 
            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: applyAutoLinkHtml(translatedPage.content || '') }}
          />
        </div>
      </section>
      
      <KlienKami />
      <GlobalCTA 
        title={isEn ? "Inquire with PT PPW" : "Konsultasi Lebih Lanjut"} 
        description={isEn 
          ? `Interested in our services about ${translatedPage.title}? PT Panca Prima Wijaya is here to consult and partner on your industrial needs.`
          : `Butuh layanan atau solusi terkait ${translatedPage.title}? PT. Panca Prima Wijaya siap membantu kebutuhan industri maupun instansi pemerintah.`}
      />
    </div>
  );
}
