import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Post } from '../../types';
import { applyAutoLinkHtml } from '../../utils/autoLink';
import { GlobalCTA } from '../../components/GlobalCTA';
import { KlienKami } from '../../components/KlienKami';
import { useLanguage } from '../../context/LanguageContext';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export default function PostDetail() {
  const { slug } = useParams();
  const { langLink, isEn } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const { translatedData: translatedPost, loading: translating } = useAutoTranslate(post, ['title', 'content']);

  if (loading || translating) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-6" />
        <div className="h-64 bg-gray-200 rounded-xl mb-6" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulseDelay" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!translatedPost) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-6 text-center">
        <SEO 
          title={isEn ? "Article Not Found - 404 | PT Panca Prima Wijaya" : "Artikel Tidak Ditemukan - 404 | PT Panca Prima Wijaya"} 
          description={isEn ? "The article you are looking for could not be found." : "Artikel yang Anda cari tidak ditemukan."} 
        />
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {isEn ? "The article you are looking for cannot be found." : "Artikel yang Anda cari tidak dapat ditemukan."}
        </p>
        <Link to={langLink('/blog')} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
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

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <SEO 
          title={translatedPost.seoTitle || translatedPost.title}
          description={translatedPost.seoDescription || ""}
          keywords={translatedPost.keywords || ""}
          type="article"
          canonical={currentUrl}
          breadcrumbs={breadcrumbs}
        />
        
        <div className="mb-10">
          <Link to={langLink('/blog')} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> {isEn ? "Back to Blog" : "Kembali ke Blog"}
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
            {translatedPost.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            {isEn ? "Published on " : "Dipublikasikan pada "} 
            {translatedPost.createdat ? new Date(translatedPost.createdat).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </div>
        </div>

        {translatedPost.featuredImage && (
          <img 
            src={translatedPost.featuredImage} 
            alt={translatedPost.title} 
            className="w-full h-auto aspect-video object-cover rounded-xl mb-10 shadow-sm border border-gray-100"
            loading="eager"
          />
        )}

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed font-sans"
          dangerouslySetInnerHTML={{ __html: applyAutoLinkHtml(translatedPost.content) }}
        />
      </article>
      <KlienKami />
      <GlobalCTA 
        title={isEn ? "Consultation & Inquiry" : "Konsultasi Lebih Lanjut"} 
        description={isEn 
          ? `Need more assistance or services regarding ${translatedPost.title}? PT. Panca Prima Wijaya is ready to support your private industrial or public governmental sector requirements.`
          : `Butuh layanan atau solusi terkait ${translatedPost.title}? PT. Panca Prima Wijaya siap membantu kebutuhan industri maupun instansi pemerintah.`}
      />
    </>
  );
}
