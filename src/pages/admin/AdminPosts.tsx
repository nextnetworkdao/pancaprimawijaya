import React, { useState, useEffect } from 'react';
import { Post } from '../../types';
import { Link } from 'react-router-dom';

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const site = localStorage.getItem('currentSite') || 'panca';
    fetch(`/api/posts?site=${site}`)
      .then(res => res.json())
      .then(d => {
        if (!Array.isArray(d)) return;
        setPosts(d);
      });
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Yakin ingin memindah ke tong sampah?")) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  }

  return (
    <div className="text-[#3c434a]">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-[23px] font-normal text-[#1d2327]">Pos</h1>
        <Link 
          to="/admin/posts/new"
          className="px-2 py-1 border border-[#2271b1] text-[#2271b1] rounded-sm text-[13px] hover:bg-[#f0f0f1] transition"
        >
          Tambah Baru
        </Link>
      </div>

      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#c3c4c7]">
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327] border-r border-[#c3c4c7] w-12 text-center"><input type="checkbox" /></th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Judul</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Penulis</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Tanggal</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {posts.map((post, index) => (
              <tr key={post.id} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f7f7]'} border-b border-[#c3c4c7] last:border-0`}>
                <td className="px-3 py-2 text-center border-r border-[#c3c4c7]"><input type="checkbox" /></td>
                <td className="px-3 py-2 font-medium">
                  <Link to={`/admin/posts/${post.id}/edit`} className="text-[#2271b1] text-[14px] font-semibold hover:underline">
                    {post.title} {post.status === 'draft' && <span className="font-bold text-[#3c434a]">&mdash; Draft</span>}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[13px]">
                    <Link to={`/admin/posts/${post.id}/edit`} className="text-[#2271b1] hover:underline">Sunting</Link>
                    <span className="text-[#c3c4c7]">|</span>
                    <button onClick={() => handleDelete(post.id)} className="text-[#d63638] hover:underline">Buang</button>
                    <span className="text-[#c3c4c7]">|</span>
                    <Link to={`/blog/${post.slug}`} target="_blank" className="text-[#2271b1] hover:underline">Tampil</Link>
                  </div>
                </td>
                <td className="px-3 py-2 text-[13px]">Admin</td>
                <td className="px-3 py-2 text-[13px]">
                  Terbit<br/>
                  <span className="text-[#646970]">{post.createdat ? new Date(post.createdat).toLocaleDateString('id-ID') : '-'}</span>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-left text-gray-500">Tidak ada pos ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
