import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { Post } from '../../types';

export default function PostDetail() {
  const { slug } = useParams();
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

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-24 animate-pulse h-64 bg-gray-100 rounded-xl"></div>;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">&larr; Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO 
        title={post.seoTitle || post.title}
        description={post.seoDescription}
        keywords={post.keywords}
        type="article"
      />
      
      <div className="mb-10">
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-500 text-sm">
          Dipublikasikan pada {post.createdat ? new Date(post.createdat).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
        </div>
      </div>

      <div className="prose prose-lg prose-blue max-w-none text-gray-700">
        {/* Simple rendering for plain text content */}
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-6 leading-relaxed">{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
