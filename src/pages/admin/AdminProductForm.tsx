import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Settings, X, Plus, Sparkles, Loader2 } from 'lucide-react';
import { Product } from '../../types';
import { MediaPickerModal } from '../../components/MediaPickerModal';

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [mediaPickerConfig, setMediaPickerConfig] = useState<{
    isOpen: boolean;
    onSelect: (url: string) => void;
  } | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', slug: '', description: '', price: 0, category: 'Fumigasi', image: '', gallery: [], seoTitle: '', seoDescription: '', keywords: '', site: (localStorage.getItem('currentSite') as 'panca' | 'sensor') || 'panca', stock: 0, hasvariations: false, variationname: '', variationoptions: ''
  });

  const [optionsList, setOptionsList] = useState<{ label: string; price?: number }[]>([]);

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const [editorMode, setEditorMode] = useState<'visual' | 'text'>('visual');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiKeyword, setAiKeyword] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState('');
  
  const visualEditorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  useEffect(() => {
    fetch('/api/categories/products').then(r => r.json()).then(data => setCategories(data));
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

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/products/${id}`)
        .then(r => r.json())
        .then(data => {
          setFormData(data);
          if (data.variationoptions) {
            try {
              const parsed = JSON.parse(data.variationoptions);
              if (Array.isArray(parsed)) {
                setOptionsList(parsed.map(item => {
                  if (item && typeof item === 'object' && item.label) {
                    return { label: item.label, price: item.price ? Number(item.price) : undefined };
                  }
                  return { label: String(item), price: undefined };
                }));
              } else {
                const legacy = String(data.variationoptions).split(',').map((v: string) => v.trim()).filter(Boolean);
                setOptionsList(legacy.map(lbl => ({ label: lbl, price: undefined })));
              }
            } catch (e) {
              const legacy = String(data.variationoptions).split(',').map((v: string) => v.trim()).filter(Boolean);
              setOptionsList(legacy.map(lbl => ({ label: lbl, price: undefined })));
            }
          } else {
            setOptionsList([]);
          }
        });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'price' || name === 'stock') ? Number(value) : value,
      ...(name === 'name' && !isEdit ? { slug: String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/products/${id}` : '/api/products';

    const submissionData = {
      ...formData,
      variationoptions: JSON.stringify(optionsList)
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Terjadi kesalahan saat menyimpan produk.');
      }

      navigate('/admin/products');
    } catch (error: any) {
      console.error('Submit error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!aiKeyword.trim()) {
      setAiError('Keyword tidak boleh kosong');
      return;
    }
    
    setGeneratingAI(true);
    setAiError('');
    
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: aiKeyword })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      setFormData(prev => ({ 
        ...prev, 
        seoArticle: data.fullContent,
        seoTitle: data.seoTitle,
        seoDescription: data.seoMeta
      }));
      
      if (visualEditorRef.current) {
        visualEditorRef.current.innerHTML = data.fullContent || '';
      }

      setShowAIModal(false);
      setAiKeyword('');
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Gagal tersambung ke server pembuat artikel.');
    } finally {
      setGeneratingAI(false);
    }
  };

  useEffect(() => {
    if (editorMode === 'visual' && visualEditorRef.current) {
        if (visualEditorRef.current.innerHTML !== formData.seoArticle) {
            visualEditorRef.current.innerHTML = formData.seoArticle || '';
        }
    }
  }, [editorMode, formData.seoArticle]);

  const handleVisualInput = () => {
    if (visualEditorRef.current) {
        setFormData(prev => ({ ...prev, seoArticle: visualEditorRef.current!.innerHTML }));
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
    const text = area.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end, text.length);

    setFormData(prev => ({
        ...prev,
        seoArticle: before + tagStart + selected + tagEnd + after
    }));

    setTimeout(() => {
        area.focus();
        area.setSelectionRange(start + tagStart.length, end + tagStart.length);
    }, 0);
  };

  const execCmd = (cmd: string, val?: string) => {
    restoreSelection();
    document.execCommand(cmd, false, val);
    handleVisualInput();
    saveSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto h-full flex flex-col text-[#3c434a]">
      {mediaPickerConfig && <MediaPickerModal onSelect={mediaPickerConfig.onSelect} onClose={() => setMediaPickerConfig(null)} />}
      <div className="flex items-center gap-3 mb-4">
        <Link to="/admin/products" className="p-1.5 hover:bg-[#c3c4c7] hover:text-white rounded-full transition text-[#c3c4c7]"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-[23px] font-normal text-[#1d2327]">{isEdit ? 'Sunting Produk' : 'Tambah Baru'}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <input 
            required 
            name="name" 
            value={formData.name || ''} 
            onChange={handleChange} 
            placeholder="Nama produk"
            className="w-full text-[20px] bg-white border border-[#c3c4c7] p-2 outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] transition-shadow placeholder-[#c3c4c7]" 
          />
          
          <div className="text-[13px] text-[#646970] flex items-center mb-4">
            <span className="font-semibold mr-2">Tautan permanen:</span> 
            <span className="text-[#2271b1] underline">https://website.com/produk/</span>
            <input 
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              className="px-1 py-0 border border-transparent hover:border-[#c3c4c7] focus:border-[#2271b1] bg-transparent outline-none flex-1 max-w-sm ml-1 decoration-[#2271b1] underline text-[#2271b1] inline-block focus:no-underline"
            />
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h2 className="text-[14px] font-semibold text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Data Produk</h2>
            <div className="p-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[13px] font-semibold w-1/4">Harga Rutin (Rp)</label>
                <input required type="number" name="price" value={formData.price || 0} onChange={handleChange} className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[13px] font-semibold w-1/4">Stok Produk</label>
                <input required type="number" name="stock" value={formData.stock !== undefined ? formData.stock : 0} onChange={handleChange} min={0} className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[13px] font-semibold w-1/4">Merek (Brand)</label>
                <input type="text" name="brand" value={formData.brand || ''} onChange={handleChange} placeholder="Misal: PT Panca Prima Wijaya" className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[13px] font-semibold w-1/4">Kondisi (Condition)</label>
                <select name="condition" value={formData.condition || 'new'} onChange={handleChange} className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] bg-white">
                  <option value="new">Baru (New)</option>
                  <option value="used">Bekas (Used)</option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[13px] font-semibold w-1/4">GTIN (EAN/UPC/ISBN)</label>
                <input type="text" name="gtin" value={formData.gtin || ''} onChange={handleChange} placeholder="Nomor Identifikasi Produk (EAN/UPC)" className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[13px] font-semibold w-1/4">MPN (Part Number)</label>
                <input type="text" name="mpn" value={formData.mpn || ''} onChange={handleChange} placeholder="Manufacturer Part Number" className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" />
              </div>

              {/* Variasi Section */}
              <div className="border-t border-[#f0f0f1] pt-4 mt-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <span className="text-[13px] font-semibold w-1/4">Variasi Produk</span>
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] font-medium selection:bg-transparent">
                    <input 
                      type="checkbox" 
                      name="hasvariations" 
                      checked={!!formData.hasvariations} 
                      onChange={(e) => setFormData(prev => ({ ...prev, hasvariations: e.target.checked }))} 
                      className="rounded border-[#c3c4c7] text-[#2271b1] focus:ring-[#2271b1] h-4 w-4" 
                    />
                    <span>Aktifkan Variasi Pilihan untuk Produk ini</span>
                  </label>
                </div>

                {formData.hasvariations && (
                  <div className="mt-2 pl-4 border-l-2 border-[#2271b1] space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                      <label className="text-[13px] font-semibold w-1/4">Nama Variasi</label>
                      <input 
                        type="text" 
                        name="variationname" 
                        value={formData.variationname || ''} 
                        onChange={handleChange} 
                        placeholder="Contoh: Pilih Kapasitas, Output Sinyal, Ukuran" 
                        className="flex-1 w-full max-w-xs px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" 
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:items-start">
                      <div className="w-1/4">
                        <label className="text-[13px] font-semibold block">Pilihan Variasi & Harga</label>
                        <span className="text-[10px] text-gray-500 block mt-0.5">Konfigurasikan pilihan serta harga khusus per pilihan</span>
                      </div>
                      <div className="flex-1 w-full space-y-3">
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setOptionsList(prev => [...prev, { label: '', price: undefined }])}
                            className="flex items-center gap-1 px-2.5 py-1 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-xs font-semibold transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Pilihan</span>
                          </button>
                        </div>

                        {optionsList.length === 0 ? (
                          <div className="p-4 border border-[#c3c4c7] bg-[#f6f6f7] text-center text-[12px] text-gray-500 rounded">
                            Belum ada pilihan variasi. Klik "Tambah Pilihan" untuk memulai.
                          </div>
                        ) : (
                          <div className="space-y-2 max-w-xl">
                            {optionsList.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 bg-white p-2 border border-[#c3c4c7] rounded">
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    required
                                    value={item.label}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setOptionsList(prev => prev.map((opt, i) => i === index ? { ...opt, label: val } : opt));
                                    }}
                                    placeholder="Nama pilihan (contoh: 5 Liter, RTU)"
                                    className="w-full px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] text-[12px]"
                                  />
                                </div>
                                <div className="w-[150px]">
                                  <input
                                    type="number"
                                    value={item.price ?? ''}
                                    onChange={(e) => {
                                      const rawVal = e.target.value;
                                      const val = rawVal === '' ? undefined : Number(rawVal);
                                      setOptionsList(prev => prev.map((opt, i) => i === index ? { ...opt, price: val } : opt));
                                    }}
                                    placeholder={`Dasar: Rp ${new Intl.NumberFormat('id-ID').format(formData.price || 0)}`}
                                    className="w-full px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] text-[12px] font-mono"
                                    min={0}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setOptionsList(prev => prev.filter((_, i) => i !== index))}
                                  className="p-1 px-2 border border-[#cc1818] bg-[#fcf2f2] hover:bg-[#fcdede] text-[#cc1818] rounded text-[11px] font-semibold transition"
                                  title="Hapus"
                                >
                                  Hapus
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:items-start">
                <label className="text-[13px] font-semibold w-1/4 mt-1">Deskripsi & Detail</label>
                <textarea required name="description" value={formData.description || ''} onChange={handleChange} rows={5} className="flex-1 w-full px-2 py-1 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]" />
              </div>
            </div>
          </div>

          {/* Editor SEO Article */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm mt-5 shadow-sm">
            <div className="p-3 border-b border-[#c3c4c7] flex justify-between items-center bg-[#f6f7f7]">
              <div className="flex gap-2">
                <button type="button" onClick={() => setEditorMode('visual')} className={`px-3 py-1 text-[13px] border border-[#c3c4c7] ${editorMode === 'visual' ? 'bg-[#f0f0f1] text-[#1d2327]' : 'bg-white text-[#2271b1] hover:bg-[#f6f7f7]'} border-b-0 -mb-[13px] pb-[13px]`}>Visual</button>
                <button type="button" onClick={() => setEditorMode('text')} className={`px-3 py-1 text-[13px] border border-[#c3c4c7] ${editorMode === 'text' ? 'bg-[#f0f0f1] text-[#1d2327]' : 'bg-white text-[#2271b1] hover:bg-[#f6f7f7]'} border-b-0 -mb-[13px] pb-[13px]`}>Teks</button>
              </div>
              <button type="button" onClick={() => setShowAIModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8a2424] text-white text-[13px] font-medium rounded-sm hover:bg-[#7a1414] transition-colors"><Sparkles className="w-4 h-4" /> Buat Artikel SEO dengan AI</button>
            </div>
            
            <div className="border-t border-[#c3c4c7]">
              {editorMode === 'visual' ? (
                <div className="bg-[#f0f0f1] border-b border-[#c3c4c7] p-2 flex gap-1 flex-wrap">
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('bold'); }} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm font-bold text-[13px]">B</button>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('italic'); }} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm italic text-[13px]">I</button>
                  <span className="w-px h-5 bg-[#c3c4c7] my-auto mx-1"></span>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('insertUnorderedList'); }} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px]">• List</button>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('insertOrderedList'); }} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px]">1. List</button>
                  <span className="w-px h-5 bg-[#c3c4c7] my-auto mx-1"></span>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('formatBlock', 'H2'); }} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px] font-bold">H2</button>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('formatBlock', 'H3'); }} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px] font-bold">H3</button>
                </div>
              ) : (
                <div className="bg-[#f0f0f1] border-b border-[#c3c4c7] p-2 flex gap-1 flex-wrap">
                  <button type="button" onClick={() => insertTag('<strong>', '</strong>')} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px]">b</button>
                  <button type="button" onClick={() => insertTag('<em>', '</em>')} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px]">i</button>
                  <button type="button" onClick={() => insertTag('<a href="" target="_blank">', '</a>')} className="px-2 py-1 hover:bg-white border border-transparent hover:border-[#c3c4c7] rounded-sm text-[13px]">link</button>
                </div>
              )}
              
              <div className="min-h-[400px] flex">
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
                    name="seoArticle"
                    value={formData.seoArticle || ''}
                    onChange={handleChange}
                    className="w-full min-h-[400px] p-4 outline-none text-[14px] font-mono text-[#3c434a] flex-1 resize-y border-0 focus:ring-0"
                  />
                )}
              </div>
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
                      {formData.seoTitle || formData.title || 'Judul Produk'}
                   </div>
                   <div className="text-[12px] text-[#006621] mt-0.5 truncate" style={{ fontFamily: 'arial, sans-serif' }}>
                      https://website.com/produk/{formData.slug || 'slug'}
                   </div>
                   <div className="text-[13px] text-[#545454] mt-1 leading-snug break-words" style={{ fontFamily: 'arial, sans-serif' }}>
                      {formData.seoDescription || 'Ketikkan deskripsi meta untuk melihat pratinjau cuplikan di hasil pencarian Google.'}
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[13px] font-semibold text-[#1d2327]">Judul Produk</label>
                    <span className="text-[12px] text-[#646970]">{formData.seoTitle?.length || 0} dari 60 adalah maksimum karakter yang direkomendasikan</span>
                  </div>
                  <input 
                    name="seoTitle" 
                    value={formData.seoTitle || ''} 
                    onChange={handleChange} 
                    className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                  />
                  <div className="w-full h-1 bg-[#f0f0f1] mt-1 rounded-sm overflow-hidden">
                    <div className={`h-full ${(formData.seoTitle?.length || 0) > 60 ? 'bg-[#d63638]' : (formData.seoTitle?.length || 0) > 0 ? 'bg-[#00a32a]' : 'bg-transparent'}`} style={{ width: `${Math.min(((formData.seoTitle?.length || 0) / 60) * 100, 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[13px] font-semibold text-[#1d2327]">Deskripsi Meta</label>
                    <span className="text-[12px] text-[#646970]">{formData.seoDescription?.length || 0} dari 160 adalah maksimum karakter yang direkomendasikan</span>
                  </div>
                  <textarea 
                    name="seoDescription" 
                    value={formData.seoDescription || ''} 
                    onChange={handleChange} 
                    rows={3} 
                    className="w-full px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                  />
                  <div className="w-full h-1 bg-[#f0f0f1] mt-1 rounded-sm overflow-hidden">
                    <div className={`h-full ${(formData.seoDescription?.length || 0) > 160 ? 'bg-[#d63638]' : (formData.seoDescription?.length || 0) > 0 ? 'bg-[#00a32a]' : 'bg-transparent'}`} style={{ width: `${Math.min(((formData.seoDescription?.length || 0) / 160) * 100, 100)}%` }} />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-[#1d2327] block mb-1">Focus Keyword</label>
                  <div className="flex items-center gap-2">
                    <input 
                      name="keywords" 
                      value={formData.keywords || ''} 
                      onChange={handleChange} 
                      placeholder="Masukkan Focus Keyword"
                      className="w-full max-w-sm px-2 py-1.5 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px] rounded-sm" 
                    />
                    {formData.keywords && (
                      <span className="text-[13px] font-semibold text-[#00a32a] border border-[#00a32a] bg-[#e5f5fa] px-3 py-1 rounded-sm">
                        100/100
                      </span>
                    )}
                  </div>
                  
                  {formData.keywords && (
                    <div className="mt-4 space-y-2 pb-4">
                      <div className="flex gap-4 mb-2 border-b border-[#f0f0f1]">
                         <span className="text-[13px] font-semibold text-[#2271b1] border-b-2 border-[#2271b1] pb-2 cursor-pointer inline-flex items-center gap-1">SEO Dasar <span className="text-[#00a32a]">Semua bagus!</span></span>
                         <span className="text-[13px] font-semibold text-[#1d2327] pb-2 cursor-pointer inline-flex items-center gap-1 hover:text-[#2271b1]">Judul <span className="text-[#00a32a]">Semua bagus!</span></span>
                         <span className="text-[13px] font-semibold text-[#1d2327] pb-2 cursor-pointer inline-flex items-center gap-1 hover:text-[#2271b1]">Keterbacaan <span className="text-[#d63638]">4 Errors</span></span>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Focus Keyword in content <span className="ml-auto text-[#646970]">›</span>
                        </div>
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Focus keyword in introduction <span className="ml-auto text-[#646970]">›</span>
                        </div>
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Focus keyword in meta description <span className="ml-auto text-[#646970]">›</span>
                        </div>
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Focus Keyword in URL <span className="ml-auto text-[#646970]">›</span>
                        </div>
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Focus keyword length <span className="ml-auto text-[#646970]">›</span>
                        </div>
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Meta description length <span className="ml-auto text-[#646970]">›</span>
                        </div>
                        <div className="text-[13px] flex items-center gap-2 text-[#1d2327] font-medium border-b border-[#f0f0f1] pb-2 cursor-pointer hover:bg-[#f6f7f7] -mx-4 px-4">
                          <span className="text-[#00a32a] w-4 h-4 rounded-full border border-[#00a32a] flex items-center justify-center text-[10px]">✓</span> Content length <span className="ml-auto text-[#646970]">›</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Terbitkan</h3>
            <div className="p-3 bg-[#f6f7f7] flex justify-between items-center">
              <button type="button" onClick={() => navigate('/admin/products')} className="text-[#d63638] text-[13px] hover:underline">Buang</button>
              <button type="submit" disabled={loading} className="bg-[#2271b1] text-white px-3 py-1 rounded-sm text-[13px] font-medium hover:bg-[#135e96] disabled:opacity-50">
                {loading ? 'Menyimpan...' : 'Perbarui'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Kategori Produk</h3>
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
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Gambar Andalan (Thumbnail)</h3>
            <div className="p-4 text-[13px]">
              {formData.image ? (
                <div className="relative mb-3 group">
                  <img src={formData.image} alt="Thumbnail preview" className="w-full h-auto max-h-48 object-cover border border-[#c3c4c7] bg-[#f0f0f1]" />
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
                }}>Pilih Gambar Andalan</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm">
            <h3 className="font-semibold text-[14px] text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Galeri Produk</h3>
            <div className="p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {(formData.gallery || []).map((url, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover border border-[#c3c4c7] bg-[#f0f0f1]" />
                    <button type="button" onClick={() => {
                      setFormData({...formData, gallery: (formData.gallery || []).filter((_, idx) => idx !== i)});
                    }} className="absolute top-1 right-1 bg-white p-1 rounded-sm opacity-0 group-hover:opacity-100 border border-[#d63638] text-[#d63638] transition">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[#2271b1] underline cursor-pointer inline-flex items-center gap-1" onClick={() => {
                  setMediaPickerConfig({
                    isOpen: true,
                    onSelect: (url) => {
                      setFormData({...formData, gallery: [...(formData.gallery || []), url]});
                      setMediaPickerConfig(null);
                    }
                  });
              }}><Plus className="w-3 h-3" /> Tambahkan ke Galeri Kemasan</p>
            </div>
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#f0f0f1] px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#2271b1]" /> Buat Artikel SEO Pembantu</h3>
              <button 
                onClick={() => !generatingAI && setShowAIModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-[13px] text-gray-600 mb-4 pb-4 border-b border-[#f0f0f1]">
                AI akan membuatkan artikel pendukung untuk produk ini secara lengkap mulai dari H1 hingga H3, paragraf SEO, Meta Description, Meta Title, hingga list artikel yang cocok dengan kata kunci produk Anda.
              </p>

              <div className="mb-4">
                <label className="block text-[13px] font-semibold mb-2">Kata Kunci Utama / Topik</label>
                <input 
                  autoFocus
                  type="text"
                  placeholder="Contoh: Manfaat Obat Kutu Beras Terbaik"
                  className="w-full px-3 py-2 border border-[#c3c4c7] outline-none focus:border-[#2271b1] text-[13px]"
                  value={aiKeyword}
                  onChange={(e) => setAiKeyword(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleGenerateAI();
                    }
                  }}
                  disabled={generatingAI}
                />
              </div>

              {aiError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-sm">
                  {aiError}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAIModal(false)}
                  className="px-4 py-2 border border-[#c3c4c7] text-[#2271b1] text-[13px] hover:bg-[#f6f7f7]"
                  disabled={generatingAI}
                >
                  Batal
                </button>
                <button 
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={generatingAI || !aiKeyword.trim()}
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-[13px] font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingAI ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sedang Membuat...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate AI</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </form>
  );
}
