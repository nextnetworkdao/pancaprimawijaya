import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Page } from '../../types';
import { SEO } from '../../components/SEO';
import { TrustedBy } from '../../components/TrustedBy';

export default function PageDetail() {
  const { slug } = useParams();
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setPage(data);
      });
  }, [slug]);

  if (!page) return <div className="min-h-screen bg-transparent p-12 text-center text-gray-500">Memuat Halaman...</div>;

  const words = page.title.split(' ');
  const lastWord = words.pop();
  const titleWithoutLast = words.join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      <SEO 
        title={page.seotitle || `${page.title} - PT Panca Prima Wijaya`} 
        description={page.seodescription} 
        image={page.image} 
      />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a2558]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-200 font-bold text-xs rounded-full mb-6 border border-blue-500/30 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            INFO HALAMAN
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            {titleWithoutLast ? <>{titleWithoutLast} <br /></> : ''}
            <span className="text-blue-400">{lastWord}</span>
          </h1>
          
          {page.seodescription && (
            <div className="pl-4 border-l-4 border-blue-500 mb-8">
              <p className="text-base sm:text-lg text-gray-200 font-medium italic">
                "{page.seodescription}"
              </p>
            </div>
          )}
          
          <TrustedBy />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {page.image && (
            <img src={page.image} alt={page.title} className="w-full h-auto object-cover rounded-xl mb-8 shadow-sm" />
          )}
          <div 
            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content || '' }}
          />
        </div>
      </section>
    </div>
  );
}
