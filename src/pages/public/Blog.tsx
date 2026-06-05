import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { Post } from '../../types';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Artikel & Edukasi | PT Panca Prima Wijaya"
        description="Edukasi mengenai pentingnya fumigasi, teknologi EWS, sanitasi, dan penanganan pasca panen komoditas pangan."
      />
      
      <div className="mb-12 border-b pb-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Artikel & Edukasi</h1>
        <p className="text-gray-500 mt-2 text-lg">Informasi terbaru seputar teknologi monitoring infrastruktur dan penanganan hama komoditas.</p>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-8">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl w-full" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full hover:shadow-lg transition flex flex-col">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {post.createdat ? new Date(post.createdat).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.content}
                </p>
                <div className="mt-6 text-sm font-semibold text-blue-600">
                  Baca Selengkapnya &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
