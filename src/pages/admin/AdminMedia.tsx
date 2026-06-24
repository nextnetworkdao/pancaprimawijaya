import React, { useState, useEffect } from 'react';
import { Upload, Copy, CheckCircle2, Image as ImageIcon, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO';

export default function AdminMedia() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        await fetchMedia();
      } else {
        alert('Gagal mengupload gambar');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Terjadi kesalahan saat mengupload gambar');
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <SEO title="Media ‹ PT Panca Prima Wijaya — WordPress" description="Media Library" />
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-normal text-[#1d2327]">Pustaka Media</h1>
        
        <div className="relative">
          <input 
            type="file" 
            id="media-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <label 
            htmlFor="media-upload"
            className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded text-[13px] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Mengupload...' : 'Tambah Baru'}
          </label>
        </div>
      </div>

      <div className="bg-white border border-[#c3c4c7] border-t-4 border-t-[#2271b1] p-6 shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-[#646970]">Memuat media...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-[#c3c4c7] mx-auto mb-4" />
            <p className="text-[#646970] mb-4">Belum ada media yang diupload.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((url, idx) => (
              <div key={idx} className="group relative border border-[#c3c4c7] bg-[#f0f0f1] aspect-square flex items-center justify-center overflow-hidden">
                <img 
                  src={url} 
                  alt="Media item" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <button 
                    onClick={() => handleCopyUrl(url)}
                    className="bg-white text-gray-900 px-3 py-1.5 rounded-sm text-xs font-medium inline-flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                  >
                    {copiedUrl === url ? (
                      <><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Tersalin</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /> Salin URL</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
