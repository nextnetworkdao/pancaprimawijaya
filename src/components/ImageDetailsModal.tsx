import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ImageDetailsModalProps {
  url: string;
  onConfirm: (details: { alt: string; title: string; caption: string; width?: string; height?: string; }) => void;
  onCancel: () => void;
}

export function ImageDetailsModal({ url, onConfirm, onCancel }: ImageDetailsModalProps) {
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  // Extract name from URL
  const fileName = url.split('/').pop() || '';

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-lg w-full flex flex-col shadow-2xl overflow-hidden max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-[#c3c4c7]">
          <h2 className="text-xl font-normal text-[#1d2327]">Detail Gambar</h2>
          <button type="button" onClick={onCancel} className="p-1 hover:bg-[#f0f0f1] rounded text-[#646970] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-1">Nama File</label>
            <input type="text" readOnly value={fileName} className="w-full bg-gray-100 border border-[#c3c4c7] p-2 rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alt Text (Wajib)</label>
            <input type="text" value={alt} onChange={e => setAlt(e.target.value)} placeholder="Teks alternatif" className="w-full border border-[#c3c4c7] p-2 rounded focus:border-[#2271b1] outline-none border focus:ring-1 focus:ring-[#2271b1] text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Atribut title" className="w-full border border-[#c3c4c7] p-2 rounded focus:border-[#2271b1] outline-none text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Lebar (Width)</label>
              <input type="text" value={width} onChange={e => setWidth(e.target.value)} placeholder="Contoh: 100%, 300px, auto" className="w-full border border-[#c3c4c7] p-2 rounded focus:border-[#2271b1] outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tinggi (Height)</label>
              <input type="text" value={height} onChange={e => setHeight(e.target.value)} placeholder="Contoh: auto, 200px" className="w-full border border-[#c3c4c7] p-2 rounded focus:border-[#2271b1] outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Caption</label>
            <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="Keterangan gambar" className="w-full border border-[#c3c4c7] p-2 rounded focus:border-[#2271b1] outline-none text-sm" rows={2}></textarea>
          </div>
        </div>

        <div className="p-4 border-t border-[#c3c4c7] flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-[#2271b1] hover:bg-[#f0f0f1] border border-[#2271b1] rounded text-sm font-medium">Batal</button>
          <button 
            type="button" 
            onClick={() => {
              if(!alt) {
                alert('Alt text wajib diisi!');
                return;
              }
              onConfirm({ alt, title, caption, width, height });
            }}
            className="px-4 py-2 bg-[#2271b1] text-white hover:bg-[#135e96] rounded text-sm font-medium"
          >
            Sisipkan
          </button>
        </div>
      </div>
    </div>
  );
}
