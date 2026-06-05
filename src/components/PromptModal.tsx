import React, { useState } from 'react';

export function PromptModal({ 
  isOpen, 
  title, 
  placeholder, 
  onConfirm, 
  onCancel 
}: { 
  isOpen: boolean; 
  title: string; 
  placeholder: string; 
  onConfirm: (val: string) => void; 
  onCancel: () => void; 
}) {
  const [val, setVal] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-lg p-5 w-full max-w-sm">
        <h3 className="font-semibold text-[15px] mb-3">{title}</h3>
        <input 
          type="text" 
          autoFocus
          value={val} 
          onChange={e => setVal(e.target.value)} 
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] mb-4 text-[13px]"
          onKeyDown={e => {
            if(e.key === 'Enter') { e.preventDefault(); onConfirm(val); setVal(''); }
            if(e.key === 'Escape') { e.preventDefault(); onCancel(); setVal(''); }
          }}
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => { onCancel(); setVal(''); }} className="px-3 py-1.5 border border-[#2271b1] text-[#2271b1] text-[13px] rounded-sm hover:bg-[#f6f7f7]">Batal</button>
          <button type="button" onClick={() => { onConfirm(val); setVal(''); }} className="px-3 py-1.5 bg-[#2271b1] text-white text-[13px] rounded-sm hover:bg-[#135e96]">Oke</button>
        </div>
      </div>
    </div>
  );
}
