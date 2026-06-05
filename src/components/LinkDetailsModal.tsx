import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LinkDetailsModalProps {
  onConfirm: (details: { url: string; isExternal: boolean }) => void;
  onCancel: () => void;
}

export function LinkDetailsModal({ onConfirm, onCancel }: LinkDetailsModalProps) {
  const [url, setUrl] = useState('');
  const [isExternal, setIsExternal] = useState(false);

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-md w-full flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#c3c4c7]">
          <h2 className="text-xl font-normal text-[#1d2327]">Sisipkan Tautan</h2>
          <button type="button" onClick={onCancel} className="p-1 hover:bg-[#f0f0f1] rounded text-[#646970] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL Tautan</label>
            <input 
              type="text" 
              value={url} 
              onChange={e => setUrl(e.target.value)} 
              placeholder="https://..." 
              className="w-full border border-[#c3c4c7] p-2 rounded focus:border-[#2271b1] outline-none" 
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isExternal" 
              checked={isExternal} 
              onChange={e => setIsExternal(e.target.checked)} 
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isExternal" className="text-sm cursor-pointer">Buka di tab baru (External Link)</label>
          </div>
        </div>

        <div className="p-4 border-t border-[#c3c4c7] flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-[#2271b1] hover:bg-[#f0f0f1] border border-[#2271b1] rounded">Batal</button>
          <button 
            type="button" 
            onClick={() => {
              if(!url) return;
              onConfirm({ url, isExternal });
            }}
            className="px-4 py-2 bg-[#2271b1] text-white hover:bg-[#135e96] rounded"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
