import React, { useState, useEffect } from 'react';
import { X, Upload, Check } from 'lucide-react';

interface MediaPickerModalProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaPickerModal({ onSelect, onClose }: MediaPickerModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      }
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
      event.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#c3c4c7]">
          <h2 className="text-xl font-normal text-[#1d2327]">Pilih Media</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#f0f0f1] rounded text-[#646970] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 border-b border-[#c3c4c7] bg-[#f0f0f1] flex gap-4">
          <div className="relative">
            <input 
              type="file" 
              id="media-upload-modal" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <label 
              htmlFor="media-upload-modal"
              className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded text-[13px] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Mengupload...' : 'Upload File'}
            </label>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto min-h-[300px]">
          {loading ? (
            <div className="text-center py-12 text-[#646970]">Memuat media...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-12 text-[#646970]">Belum ada media. Upload gambar baru.</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {images.map((url, idx) => (
                <div 
                  key={idx} 
                  className="group relative border border-[#c3c4c7] bg-[#f0f0f1] aspect-square flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#2271b1] transition-colors"
                  onClick={() => onSelect(url)}
                >
                  <img 
                    src={url} 
                    alt="Media" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                     <div className="bg-[#2271b1] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                       <Check className="w-4 h-4" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
