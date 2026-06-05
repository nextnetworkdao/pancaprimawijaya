import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings, 
  ImagePlus, Bold, Italic, List, ListOrdered, 
  Quote, AlignLeft, AlignCenter, AlignRight, Link2, ExternalLink,
  MoreHorizontal, ChevronDown, Strikethrough, Underline, Baseline,
  Heading1, Heading2, Heading3, Heading4, Table, Type
} from 'lucide-react';
import { Page } from '../../types';
import { PromptModal } from '../../components/PromptModal';
import { MediaPickerModal } from '../../components/MediaPickerModal';
import { ImageDetailsModal } from '../../components/ImageDetailsModal';
import { LinkDetailsModal } from '../../components/LinkDetailsModal';

export default function AdminPageEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [editorMode, setEditorMode] = useState<'visual' | 'kode'>('visual');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const visualEditorRef = useRef<HTMLDivElement>(null);
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetch('/api/categories/pages').then(r => r.json()).then(data => setCategories(data));
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(prev => [...prev, newCategory.trim()]);
      
      const currentCats = formData.category ? formData.category.split(',').map(c => c.trim()).filter(Boolean) : [];
      if (!currentCats.includes(newCategory.trim())) {
          setFormData({ ...formData, category: [...currentCats, newCategory.trim()].join(', ') });
      }
      setNewCategory('');
    }
  };

  const handleCategoryCheckbox = (cat: string, checked: boolean) => {
    let currentCats = formData.category ? formData.category.split(',').map(c => c.trim()).filter(Boolean) : [];
    if (checked) {
        if(!currentCats.includes(cat)) currentCats.push(cat);
    } else {
        currentCats = currentCats.filter(c => c !== cat);
    }
    setFormData({ ...formData, category: currentCats.join(', ') });
  };

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    placeholder: string;
    onConfirm: (val: string) => void;
  } | null>(null);

  const [mediaPickerConfig, setMediaPickerConfig] = useState<{
    isOpen: boolean;
    onSelect: (url: string) => void;
  } | null>(null);

  const [imageDetailsConfig, setImageDetailsConfig] = useState<{ url: string } | null>(null);
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Page>>({
    title: '', slug: '', content: '', image: '', seotitle: '', seodescription: ''
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/pages/${id}`)
        .then(r => r.json())
        .then(data => setFormData(data));
    }
  }, [id, isEdit]);

  // Sync visual editor initial value
  useEffect(() => {
    if (editorMode === 'visual' && visualEditorRef.current) {
        if (visualEditorRef.current.innerHTML !== formData.content) {
            visualEditorRef.current.innerHTML = formData.content || '';
        }
    }
  }, [editorMode, formData.content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !isEdit ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') } : {})
    }));
  };

  const handleVisualInput = () => {
    if (visualEditorRef.current) {
        setFormData(prev => ({ ...prev, content: visualEditorRef.current!.innerHTML }));
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
        setSavedRange(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    visualEditorRef.current?.focus();
    if (savedRange) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(savedRange);
    }
  };

  const insertTag = (tagStart: string, tagEnd: string = '') => {
    const area = textareaRef.current;
    if (!area) return;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = formData.content || '';
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end, text.length);
    
    setFormData(prev => ({
      ...prev,
      content: before + tagStart + selected + tagEnd + after
    }));
    
    setTimeout(() => {
      area.focus();
      area.setSelectionRange(start + tagStart.length, start + tagStart.length + selected.length);
    }, 0);
  };

  const applyFormat = (command: string, tagStart: string, tagEnd: string = '', arg?: string) => {
    if (editorMode === 'visual') {
      document.execCommand(command, false, arg);
      handleVisualInput();
    } else {
      insertTag(tagStart, tagEnd);
    }
  };

  const handleToolbarImage = () => {
    if (editorMode === 'visual') saveSelection();
    setMediaPickerConfig({
        isOpen: true,
        onSelect: (url) => {
            if (url) {
                // Show Image Details Modal next
                setImageDetailsConfig({ url });
            }
            setMediaPickerConfig(null);
        }
    });
  };

  const handleImageDetailsConfirm = ({ alt, title, caption, width, height }: { alt: string, title: string, caption: string, width?: string, height?: string }) => {
    if (!imageDetailsConfig) return;
    const { url } = imageDetailsConfig;
    
    let imgStyle = '';
    if (width || height) {
      const w = width ? `width: ${width};` : '';
      const h = height ? `height: ${height};` : '';
      imgStyle = ` style="${w} ${h}"`;
    }
    let html = `<img src="${url}" alt="${alt}" title="${title || ''}"${imgStyle} />`;
    if (caption) {
        html = `<figure>${html}<figcaption>${caption}</figcaption></figure>`;
    }

    if (editorMode === 'visual') {
        restoreSelection();
        document.execCommand('insertHTML', false, html);
        handleVisualInput();
    } else {
        insertTag(html);
    }
    setImageDetailsConfig(null);
  };

  const handleLink = () => {
    if (editorMode === 'visual') saveSelection();
    setLinkModalOpen(true);
  };

  const handleLinkConfirm = ({ url, isExternal }: { url: string, isExternal: boolean }) => {
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    if (editorMode === 'visual') {
        restoreSelection();
        const sel = window.getSelection();
        const text = sel?.toString() || url;
        const html = `<a href="${url}"${target}>${text}</a>`;
        document.execCommand('insertHTML', false, html);
        handleVisualInput();
    } else {
        insertTag(`<a href="${url}"${target}>`, '</a>');
    }
    setLinkModalOpen(false);
  };

  const handleInsertTable = () => {
    const tableHTML = `
      <table style="width: 100%; border-collapse: collapse;" border="1">
        <tbody>
          <tr><td style="padding: 8px;">Baris 1, Kolom 1</td><td style="padding: 8px;">Baris 1, Kolom 2</td></tr>
          <tr><td style="padding: 8px;">Baris 2, Kolom 1</td><td style="padding: 8px;">Baris 2, Kolom 2</td></tr>
        </tbody>
      </table><p><br/></p>
    `;
    if (editorMode === 'visual') {
      restoreSelection();
      document.execCommand('insertHTML', false, tableHTML);
      handleVisualInput();
    } else {
      insertTag(tableHTML);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, statusToSave?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/pages/${id}` : '/api/pages';

    const dataToSave = { ...formData };
    if (statusToSave) {
        dataToSave.status = statusToSave;
    } else if (!dataToSave.status) {
        dataToSave.status = 'publish';
    }

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave)
    });
    
    navigate('/admin/pages');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto h-full flex flex-col text-[#3c434a]">
      {modalConfig && <PromptModal {...modalConfig} onCancel={() => setModalConfig(null)} />}
      {mediaPickerConfig && <MediaPickerModal onSelect={mediaPickerConfig.onSelect} onClose={() => setMediaPickerConfig(null)} />}
      {imageDetailsConfig && <ImageDetailsModal url={imageDetailsConfig.url} onConfirm={handleImageDetailsConfirm} onCancel={() => setImageDetailsConfig(null)} />}
      {linkModalOpen && <LinkDetailsModal onConfirm={handleLinkConfirm} onCancel={() => setLinkModalOpen(false)} />}
      <div className="flex items-center gap-3 mb-4">
        <Link to="/admin/pages" className="p-1.5 hover:bg-[#c3c4c7] hover:text-white rounded-full transition text-[#c3c4c7]"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-[23px] font-normal text-[#1d2327]">{isEdit ? 'Sunting Halaman' : 'Tambah Halaman Baru'}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <input 
            required
            name="title" 
            value={formData.title || ''} 
            onChange={handleChange}
            placeholder="Tambahkan judul" 
            className="w-full text-[20px] bg-white border border-[#c3c4c7] p-2 outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] transition-shadow placeholder-[#c3c4c7]" 
          />
          <div className="text-[13px] text-[#646970] flex items-center mb-4">
            <span className="font-semibold mr-2">Tautan permanen:</span> 
            <span className="text-[#2271b1] underline">https://website.com/</span>
            <input 
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              className="px-1 py-0 border border-transparent hover:border-[#c3c4c7] focus:border-[#2271b1] bg-transparent outline-none flex-1 max-w-sm ml-1 decoration-[#2271b1] underline text-[#2271b1] inline-block focus:no-underline"
            />
          </div>
          
          <div className="flex justify-between items-end mb-1">
             <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleToolbarImage} className="border border-[#2271b1] text-[#2271b1] bg-[#f0f0f1] hover:bg-[#f6f7f7] px-2 py-1 text-[13px] rounded-sm flex items-center gap-2 transition cursor-pointer">
               <ImagePlus className="w-4 h-4 pointer-events-none" /> Tambahkan Media
             </button>
             <div className="flex rounded-t-sm overflow-hidden border border-b-0 border-[#c3c4c7]">
                <button type="button" onClick={() => setEditorMode('visual')} className={`px-3 py-1 text-[13px] ${editorMode === 'visual' ? 'bg-[#f0f0f1] text-[#3c434a] font-semibold' : 'bg-[#e5f5fa] text-[#2271b1] hover:text-[#0a4b78] border-b border-[#c3c4c7]'}`}>Visual</button>
                <button type="button" onClick={() => setEditorMode('kode')} className={`px-3 py-1 text-[13px] ${editorMode === 'kode' ? 'bg-[#f0f0f1] text-[#3c434a] font-semibold' : 'bg-[#e5f5fa] text-[#2271b1] hover:text-[#0a4b78] border-b border-[#c3c4c7]'}`}>Teks</button>
             </div>
          </div>

          <div className="border border-[#c3c4c7] bg-white overflow-hidden rounded-sm flex flex-col">
            <div className="bg-[#f0f0f1] border-b border-[#c3c4c7] flex flex-wrap items-center gap-1 p-1">
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('formatBlock', '<p>', '</p>', 'P')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Paragraph (Normal Text)"><Type className="w-4 h-4 pointer-events-none" /></button>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('formatBlock', '<h1>', '</h1>', 'H1')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Heading 1"><Heading1 className="w-4 h-4 pointer-events-none" /></button>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('formatBlock', '<h2>', '</h2>', 'H2')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Heading 2"><Heading2 className="w-4 h-4 pointer-events-none" /></button>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('formatBlock', '<h3>', '</h3>', 'H3')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Heading 3"><Heading3 className="w-4 h-4 pointer-events-none" /></button>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('formatBlock', '<h4>', '</h4>', 'H4')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Heading 4"><Heading4 className="w-4 h-4 pointer-events-none" /></button>
               <div className="w-px h-5 bg-[#c3c4c7] mx-1"></div>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('bold', '<strong>', '</strong>')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Bold"><Bold className="w-4 h-4 pointer-events-none" /></button>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('italic', '<em>', '</em>')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Italic"><Italic className="w-4 h-4 pointer-events-none" /></button>
               <div className="w-px h-5 bg-[#c3c4c7] mx-1"></div>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('insertUnorderedList', '<ul>\n<li>', '</li>\n</ul>')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="List Bullet"><List className="w-4 h-4 pointer-events-none" /></button>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('insertOrderedList', '<ol>\n<li>', '</li>\n</ol>')} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Number List"><ListOrdered className="w-4 h-4 pointer-events-none" /></button>
               <div className="w-px h-5 bg-[#c3c4c7] mx-1"></div>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleLink} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Sisipkan Tautan"><Link2 className="w-4 h-4 pointer-events-none" /></button>
               <div className="w-px h-5 bg-[#c3c4c7] mx-1"></div>
               <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleInsertTable} className="p-1.5 hover:bg-white hover:border-[#c3c4c7] border border-transparent text-[#3c434a] transition cursor-pointer" title="Sisipkan Tabel"><Table className="w-4 h-4 pointer-events-none" /></button>
            </div>

            <div className="relative flex-1 flex flex-col">
              {editorMode === 'visual' ? (
                <div 
                  ref={visualEditorRef}
                  contentEditable
                  onInput={handleVisualInput}
                  onBlur={handleVisualInput}
                  className="w-full min-h-[400px] p-4 outline-none text-[15px] text-[#3c434a] bg-white prose max-w-none flex-1 border-0"
                />
              ) : (
                <textarea 
                  ref={textareaRef}
                  name="content"
                  required
                  value={formData.content || ''}
                  onChange={handleChange}
                  className="w-full min-h-[400px] p-4 outline-none resize-y font-mono text-[13px] text-[#3c434a] bg-[#f0f0f1] flex-1 border-0 m-0 block"
                />
              )}
            </div>
            
            <div className="bg-[#f0f0f1] border-t border-[#c3c4c7] py-1 px-3 text-[12px] text-[#646970] flex justify-between">
              <span>Jumlah Kata: {formData.content?.trim() ? formData.content.trim().split(/\s+/).length : 0}</span>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm mt-5 shadow-sm">
            <div className="p-3 border-b border-[#c3c4c7] bg-white flex items-center justify-between">
              <h3 className="font-semibold text-[14px] text-[#1d2327] m-0">AIOSEO Settings</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-[13px] font-semibold text-[#1d2327] mb-2 flex items-center gap-1">Pratinjau SERP</h4>
                <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 max-w-2xl">
                   <div className="text-[14px] text-[#1a0dab] cursor-pointer hover:underline truncate" style={{ fontFamily: 'arial, sans-serif' }}>
                      {formData.seotitle || formData.title || 'Judul Halaman'}
                   </div>
                   <div className="text-[12px] text-[#006621] mt-0.5 truncate" style={{ fontFamily: 'arial, sans-serif' }}>
                      https://website.com/{formData.slug || 'slug'}
                   </div>
                   <div className="text-[13px] text-[#545454] mt-1 leading-snug break-words" style={{ fontFamily: 'arial, sans-serif' }}>
                      {formData.seodescription || 'Ketikkan deskripsi meta untuk melihat pratinjau cuplikan di hasil pencarian Google.'}
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[13px] font-semibold text-[#1d2327]">Judul SEO</label>
                    <span className="text-[12px] text-[#646970]">{formData.seotitle?.length || 0} dari 60 adalah maksimum karakter yang direkomendasikan</span>
                  </div>
                  <input 
                    name="seotitle" 
                    value={formData.seotitle || ''} 
                    onChange={handleChange} 
                    className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                  />
                  <div className="w-full h-1 bg-[#f0f0f1] mt-1 rounded-sm overflow-hidden">
                    <div className={`h-full ${(formData.seotitle?.length || 0) > 60 ? 'bg-[#d63638]' : (formData.seotitle?.length || 0) > 0 ? 'bg-[#00a32a]' : 'bg-transparent'}`} style={{ width: `${Math.min(((formData.seotitle?.length || 0) / 60) * 100, 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[13px] font-semibold text-[#1d2327]">Deskripsi Meta</label>
                    <span className="text-[12px] text-[#646970]">{formData.seodescription?.length || 0} dari 160 adalah maksimum karakter yang direkomendasikan</span>
                  </div>
                  <textarea 
                    name="seodescription" 
                    value={formData.seodescription || ''} 
                    onChange={handleChange} 
                    rows={3} 
                    className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                  />
                  <div className="w-full h-1 bg-[#f0f0f1] mt-1 rounded-sm overflow-hidden">
                    <div className={`h-full ${(formData.seodescription?.length || 0) > 160 ? 'bg-[#d63638]' : (formData.seodescription?.length || 0) > 0 ? 'bg-[#00a32a]' : 'bg-transparent'}`} style={{ width: `${Math.min(((formData.seodescription?.length || 0) / 160) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0f0f1] space-y-4 mt-4">
                <h4 className="font-semibold text-[14px]">Advanced SEO Settings</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Canonical URL</label>
                    <input 
                      name="canonical" 
                      value={formData.canonical || ''} 
                      onChange={handleChange} 
                      placeholder="https://..."
                      className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Robots Meta</label>
                    <select 
                      name="robots" 
                      value={formData.robots || 'index, follow'} 
                      onChange={handleChange} 
                      className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm bg-white" 
                    >
                      <option value="index, follow">index, follow</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Open Graph Title</label>
                    <input 
                      name="ogtitle" 
                      value={formData.ogtitle || ''} 
                      onChange={handleChange} 
                      className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Twitter Card Type</label>
                    <select 
                      name="twittercard" 
                      value={formData.twittercard || 'summary_large_image'} 
                      onChange={handleChange} 
                      className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm bg-white" 
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Open Graph Description</label>
                   <textarea 
                     name="ogdescription" 
                     value={formData.ogdescription || ''} 
                     onChange={handleChange} 
                     rows={2} 
                     className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                   />
                </div>
                <div>
                   <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Open Graph Image URL</label>
                   <input 
                     name="ogimage" 
                     value={formData.ogimage || ''} 
                     onChange={handleChange} 
                     placeholder="https://..."
                     className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                   />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Terbitkan</h3>
            <div className="p-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex justify-between items-center text-[13px]">
              <span className="text-[#3c434a]">Status: <strong>{formData.status === 'draft' ? 'Draft' : 'Diterbitkan'}</strong></span>
            </div>
            <div className="p-3 bg-[#f6f7f7] flex justify-between items-center flex-wrap gap-2">
              <button type="button" onClick={() => navigate('/admin/pages')} className="text-[#d63638] text-[13px] hover:underline">Pindah ke Tong Sampah</button>
              <div className="flex gap-2">
                <button type="button" onClick={() => handleSubmit(undefined, 'draft')} disabled={loading} className="bg-[#f0f0f1] border border-[#2271b1] text-[#2271b1] px-3 py-1 rounded-sm text-[13px] font-medium hover:bg-[#f6f7f7] disabled:opacity-50">
                  Simpan Draft
                </button>
                <button type="button" disabled={loading} onClick={() => handleSubmit(undefined, 'publish')} className="bg-[#2271b1] text-white px-3 py-1 rounded-sm text-[13px] font-medium hover:bg-[#135e96] disabled:opacity-50">
                  {loading ? 'Menyimpan...' : 'Perbarui'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Kategori</h3>
            <div className="p-4 text-[13px]">
              <div className="max-h-[150px] overflow-y-auto mb-3 border border-[#c3c4c7] p-2 rounded-sm bg-[#f6f7f7]">
                {categories.map(cat => {
                  const currentCats = formData.category ? formData.category.split(',').map(c => c.trim()) : [];
                  const isChecked = currentCats.includes(cat);
                  return (
                    <label key={cat} className="flex items-center gap-2 mb-1 cursor-pointer hover:bg-white p-1 rounded">
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={(e) => handleCategoryCheckbox(cat, e.target.checked)}
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
                {categories.length === 0 && <p className="text-[#646970] italic">Belum ada kategori.</p>}
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="Tambah Kategori Baru"
                  className="flex-1 px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                />
                <button 
                  type="button" 
                  onClick={handleAddCategory}
                  className="px-3 py-1 border border-[#2271b1] text-[#2271b1] bg-[#f0f0f1] hover:bg-[#f6f7f7] rounded-sm"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Gambar Andalan</h3>
            <div className="p-4 text-[13px]">
              {formData.image ? (
                <div className="relative mb-3 group">
                  <img src={formData.image} alt="Thumbnail preview" className="w-full h-auto max-h-48 object-contain bg-[#f0f0f1]" />
                  <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 bg-white rounded-sm px-2 py-1 opacity-0 group-hover:opacity-100 border border-[#d63638] text-[#d63638] transition text-[12px]">Hapus</button>
                </div>
              ) : (
                <p className="text-[#2271b1] underline cursor-pointer mb-3" onClick={() => {
                  setMediaPickerConfig({
                    isOpen: true,
                    onSelect: (url) => {
                      setFormData({...formData, image: url});
                      setMediaPickerConfig(null);
                    }
                  });
                }}>Tetapkan gambar andalan</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
