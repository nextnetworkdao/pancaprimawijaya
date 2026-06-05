import React, { useState, useEffect } from 'react';
import { Save, Search, Type, Image as ImageIcon, Trash2, Settings, Box, LayoutTemplate, Layers, MousePointerClick, AlignLeft, Square, Plus, Grid, Layout, Move, ChevronRight, CornerRightDown, X, Paintbrush, ShieldCheck, Factory, Activity } from 'lucide-react';
import { HomeSettings, Block, BlockStyle, Product } from '../../types';
import { formatCurrency } from '../../lib/utils';

const WIDGETS = [
  { type: 'section', label: 'Section Container', icon: Layout },
  { type: 'column', label: 'Inner Column', icon: Grid },
  { type: 'heading', label: 'Heading Title', icon: Type },
  { type: 'text', label: 'Text Editor', icon: AlignLeft },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'button', label: 'Button', icon: MousePointerClick },
  { type: 'spacer', label: 'Spacer', icon: Square },
  { type: 'hero', label: 'Hero Block', icon: Box },
  { type: 'services', label: 'Services Block', icon: Layers },
  { type: 'products', label: 'Products Block', icon: Box },
];

const generateId = () => 'el_' + Math.random().toString(36).substring(2, 9);

export default function AdminPageBuilder() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilter, setProductFilter] = useState<'Fumigasi' | 'Sensor Gempa'>('Fumigasi');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'widgets' | 'edit' | 'seo'>('widgets');
  const [selectedId, setSelectedId] = useState<string | 'root'>('root');
  
  // To keep track of which element is currently being dragged (simple DND setup)
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings/home')
      .then(r => r.json())
      .then(data => {
        if (!data || data.error) return;
        setSettings(data);
      });
      
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (!data || data.error || !Array.isArray(data)) return;
        setProducts(data);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings/home', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    setSaving(false);
    alert('Desain Halaman Berhasil Disimpan!');
  };

  const getElementById = (blocks: Block[], id: string): Block | null => {
    for (const b of blocks) {
      if (b.id === id) return b;
      if (b.children) {
        const found = getElementById(b.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedElement = settings && selectedId !== 'root' ? getElementById(settings.blocks, selectedId) : null;

  const addBlockToTree = (blocks: Block[], parentId: string, newBlock: Block): Block[] => {
    if (parentId === 'root') return [...blocks, newBlock];
    return blocks.map(b => {
      if (b.id === parentId) {
        return { ...b, children: [...(b.children || []), newBlock] };
      }
      if (b.children) {
        return { ...b, children: addBlockToTree(b.children, parentId, newBlock) };
      }
      return b;
    });
  };

  const addWidget = (type: string, targetId: string = selectedId) => {
    if (!settings) return;
    
    // Default initializations
    const newBlock: Block = { 
      id: generateId(), 
      type, 
      data: {},
      styles: {}
    };

    if (type === 'section') {
      newBlock.styles = { padding: '4rem 2rem', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1rem' };
      newBlock.children = [];
    } else if (type === 'column') {
      newBlock.styles = { width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' };
      newBlock.children = [];
    } else if (type === 'heading') {
      newBlock.data = { text: 'Heading Baru', tag: 'h2' };
      newBlock.styles = { fontSize: '2rem', color: '#111827', textAlign: 'left', margin: '0 0 1rem 0' };
    } else if (type === 'text') {
      newBlock.data = { content: 'Ini adalah paragraf teks editor. Anda dapat menulis panjang di sini.' };
      newBlock.styles = { color: '#4b5563', fontSize: '1rem', textAlign: 'left' };
    } else if (type === 'image') {
      newBlock.data = { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', alt: 'Gambar' };
      newBlock.styles = { width: '100%', borderRadius: '0.5rem' };
    } else if (type === 'button') {
      newBlock.data = { text: 'Klik Disini', url: '#' };
      newBlock.styles = { padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '0.375rem', display: 'inline-block', textAlign: 'center' };
    } else if (type === 'spacer') {
      newBlock.styles = { minHeight: '3rem' };
    } else if (type === 'custom') {
      newBlock.data = { layout: 'text-left', title: 'Custom Title' }; // legacy
    }

    setSettings({ ...settings, blocks: addBlockToTree(settings.blocks, targetId, newBlock) });
    // If we add a structural block, select it automatically
    if(type === 'section' || type === 'column') setSelectedId(newBlock.id);
  };

  const updateNodeFields = (blocks: Block[], id: string, payload: Partial<Block>): Block[] => {
    return blocks.map(b => {
      if (b.id === id) {
        return { ...b, ...payload, data: { ...b.data, ...payload.data }, styles: { ...b.styles, ...payload.styles } };
      }
      if (b.children) {
        return { ...b, children: updateNodeFields(b.children, id, payload) };
      }
      return b;
    });
  };

  const removeNode = (blocks: Block[], id: string): Block[] => {
    return blocks.filter(b => b.id !== id).map(b => ({
      ...b,
      children: b.children ? removeNode(b.children, id) : undefined
    }));
  };

  const updateElement = (payload: Partial<Block>) => {
    if(!settings || !selectedElement) return;
    setSettings({...settings, blocks: updateNodeFields(settings.blocks, selectedElement.id, payload)});
  };

  const doRemove = (id: string) => {
    if(!settings) return;
    setSettings({...settings, blocks: removeNode(settings.blocks, id)});
    if(selectedId === id) setSelectedId('root');
  }

  const selectElement = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    if(id !== 'root') setActiveTab('edit');
    else setActiveTab('widgets');
  };

  if (!settings) return <div className="p-8 text-center bg-gray-50 flex-1 flex items-center justify-center">Memuat Visual Builder...</div>;

  // Renders nested blocks in the canvas
  const renderCanvasNode = (block: Block) => {
    const isSelected = block.id === selectedId;
    const commonProps = {
      onClick: (e: React.MouseEvent) => selectElement(e, block.id),
      onDragOver: (e: React.DragEvent) => {
        if (block.type === 'section' || block.type === 'column') {
           e.preventDefault(); // Allow drop
           e.stopPropagation();
        }
      },
      onDrop: (e: React.DragEvent) => {
        if (block.type === 'section' || block.type === 'column') {
          e.preventDefault();
          e.stopPropagation();
          const pType = e.dataTransfer.getData('pluginType');
          if (pType) {
            addWidget(pType, block.id);
          }
        }
      },
      className: `relative group transition-all duration-200 outline outline-1 outline-transparent ${isSelected ? '!outline-blue-500 outline-2 z-10' : 'hover:outline-blue-300 hover:outline-dashed hover:z-10'} ${(block.type === 'section' || block.type === 'column') ? (draggedWidget ? 'outline-dashed outline-2 outline-blue-300 bg-blue-50/10 min-h-[50px]' : 'min-h-[50px]') : ''}`,
      style: block.styles as React.CSSProperties
    };

    // Controls badge overlay on hover/select
    const RenderControls = () => (
      <div className={`absolute top-0 right-0 transform translate-y-[-100%] flex bg-blue-600 text-white text-[10px] items-center rounded-t shadow-lg overflow-hidden whitespace-nowrap transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className="px-2 py-1 font-bold tracking-widest">{block.type.toUpperCase()}</span>
        <button onClick={(e) => { e.stopPropagation(); addWidget('text', block.id); }} className="p-1 hover:bg-blue-700 tooltip" title="Add Inside"><Plus className="w-3 h-3" /></button>
        <button onClick={(e) => { e.stopPropagation(); doRemove(block.id); }} className="p-1 hover:bg-red-500 bg-red-600"><Trash2 className="w-3 h-3" /></button>
      </div>
    );

    let content = null;
    switch (block.type) {
      case 'text':
        content = <div dangerouslySetInnerHTML={{ __html: block.data.content || 'Teks kosong' }} />;
        break;
      case 'heading':
        const Tag = (block.data.tag || 'h2') as any;
        content = <Tag>{block.data.text}</Tag>;
        break;
      case 'image':
        content = <img src={block.data.src || undefined} alt={block.data.alt} className="max-w-full" style={{ borderRadius: block.styles?.borderRadius }} />;
        break;
      case 'button':
        content = <button>{block.data.text}</button>; // link wrapper usually handled outside or simulated here
        break;
      case 'spacer':
        content = <div className="w-full" />;
        break;
      case 'hero':
        content = (
          <section className="relative w-full overflow-hidden bg-gray-950 flex flex-col justify-center min-h-[500px]">
            {block.data.bgImage && (
              <div className="absolute inset-0">
                <img src={block.data.bgImage || undefined} alt="" className="w-full h-full object-cover opacity-30" />
              </div>
            )}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 max-w-4xl leading-tight">
                  {block.data.title || "Visi Keamanan & Higiene"}
               </h1>
               <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light">
                  {block.data.subtitle}
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services-grid" onClick={e => e.preventDefault()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-900/20">
                     Konsultasi Gratis
                  </a>
               </div>
            </div>
          </section>
        );
        break;
        
      case 'services':
        content = (
          <section className="w-full py-24 bg-white" id="services-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-none">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition group">
                  <div className="bg-blue-100 p-4 rounded-full text-blue-700 w-fit mb-6 group-hover:scale-110 transition-transform"><ShieldCheck className="h-8 w-8" /></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Fumigasi Pangan Terpadu</h3>
                  <p className="text-gray-600">Melindungi beras, jagung, dan biji-bijian dari kutu resisten secara profesional menggunakan standar fosfin kelas industri.</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition group">
                  <div className="bg-blue-100 p-4 rounded-full text-blue-700 w-fit mb-6 group-hover:scale-110 transition-transform"><Factory className="h-8 w-8" /></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sanitasi & Fogging</h3>
                  <p className="text-gray-600">Sterilisasi preventif untuk kapal laut, perpustakaan, gerbong kereta, bus, serta gudang komersial dari infestasi hama.</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition group">
                  <div className="bg-blue-100 p-4 rounded-full text-blue-700 w-fit mb-6 group-hover:scale-110 transition-transform"><Activity className="h-8 w-8" /></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Teknologi Sensor EWS</h3>
                  <p className="text-gray-600">Integrasi Early Warning System termutakhir untuk perlindungan struktural dan otomasi keselamatan industri modern.</p>
                </div>
              </div>
            </div>
          </section>
        );
        break;

      case 'custom':
        const isLeft = block.data.layout === 'text-left';
        const isFull = block.data.layout === 'full-width';
        content = (
          <section className="w-full py-20 bg-gray-50 pointer-events-none">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${isFull ? 'text-center' : 'md:flex-row'} items-center gap-12`}>
              <div className={`flex-1 w-full ${!isLeft && !isFull ? 'md:order-2' : ''}`}>
                 <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">{block.data.title}</h2>
                 <div className="prose prose-blue text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: block.data.content?.replace(/\n/g, '<br/>') || '' }} />
              </div>
              {(!isFull) && block.data.image && (
                <div className={`flex-1 w-full ${!isLeft ? 'md:order-1' : ''}`}>
                   <img src={block.data.image || undefined} alt="" className="rounded-2xl shadow-xl w-full object-cover aspect-video" />
                </div>
              )}
            </div>
          </section>
        );
        break;

      case 'products':
        const filteredProducts = products.filter(p => productFilter === 'Fumigasi' ? p.category.includes('Fumigasi') : p.category.includes('Sensor Gempa'));
        content = (
          <section className="w-full py-24 bg-white border-t border-gray-100 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12 pointer-events-auto">
                 <h2 className="text-3xl font-black text-gray-900 mb-4">{block.data.title || "Pilihan Solusi & Produk"}</h2>
                 <div className="inline-flex bg-gray-100 p-1 rounded-full text-sm font-semibold mt-4 relative z-10">
                   <button onClick={(e) => { e.stopPropagation(); setProductFilter('Fumigasi'); }} className={`px-6 py-2 rounded-full transition ${productFilter === 'Fumigasi' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-900'}`}>Layanan Fumigasi</button>
                   <button onClick={(e) => { e.stopPropagation(); setProductFilter('Sensor Gempa'); }} className={`px-6 py-2 rounded-full transition ${productFilter === 'Sensor Gempa' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-900'}`}>Sensor Gempa EWS</button>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredProducts.slice(0, 3).map(product => (
                  <div key={product.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group bg-white flex flex-col">
                    <img src={product.image || undefined} className="w-full h-56 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-500 text-sm flex-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <span className="font-black text-gray-900 text-lg">{formatCurrency(product.price)}</span>
                        <button className="text-sm font-bold text-blue-600 hover:text-blue-800">Pesan Sekarang</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center text-gray-500 py-12">Tidak ada produk dalam kategori ini.</div>
              )}
            </div>
          </section>
        );
        break;
      default:
        // section or column
        content = (
          <>
            {(!block.children || block.children.length === 0) && (
              <div className="p-4 border border-dashed border-gray-300 text-gray-400 text-xs text-center">
                Kosong. Drag atau Tambahkan widget di sini.
              </div>
            )}
            {block.children?.map(renderCanvasNode)}
          </>
        );
    }

    return (
      <div key={block.id} {...commonProps}>
        <RenderControls />
        {content}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 top-16 bg-[#e5e5e5] z-40 flex overflow-hidden">
      
      {/* Left Sidebar Control Panel (Elementor Style) */}
      <div className="w-80 bg-white border-r shadow-2xl flex flex-col h-full z-50">
        
        {/* Sidebar Header */}
        <div className="bg-[#2a2b37] text-white p-3 flex justify-between items-center shrink-0 shadow">
          <div className="flex items-center gap-2 font-semibold">
            <LayoutTemplate className="w-5 h-5 text-blue-400" /> Web Builder
          </div>
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 rounded px-3 py-1 text-xs font-bold transition">
            {saving ? '...' : 'SIMPAN'}
          </button>
        </div>

        {/* Global Toolbar / Tabs */}
        <div className="flex text-xs font-bold border-b text-gray-500 shrink-0 bg-gray-50">
           <button onClick={() => {setActiveTab('widgets'); setSelectedId('root');}} className={`flex-1 py-3 border-b-2 ${activeTab === 'widgets' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent hover:bg-gray-100'}`}>WIDGETS</button>
           <button onClick={() => {if(selectedElement) setActiveTab('edit');}} className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 ${activeTab === 'edit' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent hover:bg-gray-100'} ${!selectedElement && 'opacity-50 cursor-not-allowed'}`}>
             <Settings className="w-3 h-3" /> EDIT
           </button>
           <button onClick={() => setActiveTab('seo')} className={`flex-1 py-3 border-b-2 ${activeTab === 'seo' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent hover:bg-gray-100'}`}>SEO</button>
        </div>

        {/* Sidebar Content Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          
          {/* SEC: WIDGETS */}
          {activeTab === 'widgets' && (
            <div>
              <div className="mb-4">
                <input type="text" placeholder="Cari Widget..." className="w-full bg-gray-100 border-none rounded p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="text-xs font-bold text-gray-400 mb-3 ml-1 uppercase">Struktur & Tata Letak</div>
// Adding draggable to widgets
              <div className="grid grid-cols-2 gap-2 mb-6">
                {WIDGETS.slice(0,2).map(w => (
                  <div 
                    key={w.type} 
                    draggable 
                    onDragStart={e => {
                       e.dataTransfer.setData('pluginType', w.type);
                       setDraggedWidget(w.type);
                    }}
                    onDragEnd={() => setDraggedWidget(null)}
                    onClick={() => addWidget(w.type)} 
                    className="bg-white border hover:border-blue-500 p-3 rounded flex flex-col items-center justify-center gap-2 cursor-pointer transition text-gray-600 hover:text-blue-600 shadow-sm"
                  >
                    <w.icon className="w-6 h-6 stroke-1" />
                    <span className="text-[10px] font-bold text-center">{w.label}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs font-bold text-gray-400 mb-3 ml-1 uppercase">Elemen Dasar</div>
              <div className="grid grid-cols-2 gap-2">
                {WIDGETS.slice(2).map(w => (
                  <div 
                    key={w.type} 
                    draggable
                    onDragStart={e => {
                       e.dataTransfer.setData('pluginType', w.type);
                       setDraggedWidget(w.type);
                    }}
                    onDragEnd={() => setDraggedWidget(null)}
                    onClick={() => addWidget(w.type)} 
                    className="bg-white border hover:border-blue-500 p-3 rounded flex flex-col items-center justify-center gap-2 cursor-pointer transition text-gray-600 hover:text-blue-600 shadow-sm"
                  >
                    <w.icon className="w-6 h-6 stroke-1" />
                    <span className="text-[10px] font-bold text-center">{w.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-medium">
                Tip: Klik widget di atas untuk menambahkannya otomatis ke kanvas, atau pilih kontainer hijau di kanvas terlebih dahulu.
              </div>
            </div>
          )}

          {/* SEC: EDIT ELEMENT */}
          {activeTab === 'edit' && selectedElement && (
            <div className="space-y-6">
              <div className="text-sm font-black bg-gray-100 p-2 rounded text-gray-700 flex items-center justify-between">
                 <div className="flex items-center gap-2 uppercase tracking-wide">
                   <Settings className="w-4 h-4 text-blue-600" /> Edit {selectedElement.type}
                 </div>
                 <X className="w-4 h-4 text-gray-400 hover:text-gray-900 cursor-pointer" onClick={() => setSelectedId('root')} />
              </div>

              {/* Edit Type: TEXT / HEADING content */}
              {(selectedElement.type === 'heading' || selectedElement.type === 'text' || selectedElement.type === 'button') && (
                <div className="space-y-3 p-3 bg-gray-50 border rounded shadow-inner">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2 border-b pb-1">Konten</span>
                  
                  {selectedElement.type === 'heading' && (
                    <>
                      <label className="text-xs font-medium block">Teks Judul</label>
                      <input value={selectedElement.data.text || ''} onChange={e => updateElement({ data: { text: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                      <label className="text-xs font-medium block mt-2">Tag HTML</label>
                      <select value={selectedElement.data.tag || 'h2'} onChange={e => updateElement({ data: { tag: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none bg-white">
                        <option value="h1">H1 (Utama)</option>
                        <option value="h2">H2 (SubUtama)</option>
                        <option value="h3">H3 (Sub)</option>
                        <option value="h4">H4</option>
                        <option value="h5">H5</option>
                        <option value="h6">H6</option>
                      </select>
                    </>
                  )}

                  {selectedElement.type === 'text' && (
                    <>
                      <label className="text-xs font-medium block">Konten Teks/HTML</label>
                      <textarea rows={6} value={selectedElement.data.content || ''} onChange={e => updateElement({ data: { content: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" placeholder="<p>...</p>" />
                    </>
                  )}

                  {selectedElement.type === 'button' && (
                    <>
                      <label className="text-xs font-medium block">Teks Tombol</label>
                      <input value={selectedElement.data.text || ''} onChange={e => updateElement({ data: { text: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                      <label className="text-xs font-medium block mt-2">Link Tujuan</label>
                      <input value={selectedElement.data.url || ''} onChange={e => updateElement({ data: { url: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" placeholder="https://" />
                    </>
                  )}
                </div>
              )}

              {/* Edit Type: IMAGE content */}
              {selectedElement.type === 'image' && (
                <div className="space-y-3 p-3 bg-gray-50 border rounded shadow-inner">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2 border-b pb-1">Media Gambar</span>
                  <label className="text-xs font-medium block">Sumber (URL Gambar)</label>
                  <input value={selectedElement.data.src || ''} onChange={e => updateElement({ data: { src: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                  <label className="text-xs font-medium block mt-2">Alt Teks (SEO)</label>
                  <input value={selectedElement.data.alt || ''} onChange={e => updateElement({ data: { alt: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                </div>
              )}

               {/* Edit Type: LEGACY HERO/CUSTOM */}
               {(selectedElement.type === 'hero' || selectedElement.type === 'custom' || selectedElement.type === 'products') && (
                <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <span className="text-xs font-bold text-blue-600 block mb-2 border-b border-blue-200 pb-1">Atribut Terdaftar</span>
                  <label className="text-xs font-medium block">Judul / Title</label>
                  <input value={selectedElement.data.title || ''} onChange={e => updateElement({ data: { title: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                  
                  {(selectedElement.type === 'hero') && (
                    <>
                       <label className="text-xs font-medium block mt-2">Sub-judul / Subtitle</label>
                       <textarea value={selectedElement.data.subtitle || ''} onChange={e => updateElement({ data: { subtitle: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                       <label className="text-xs font-medium block mt-2">Gambar Background (Hero)</label>
                       <input value={selectedElement.data.bgImage || ''} onChange={e => updateElement({ data: { bgImage: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                    </>
                  )}
                  
                  {selectedElement.type === 'custom' && (
                    <>
                       <label className="text-xs font-medium block mt-2">Sisi Media (Layout)</label>
                       <select value={selectedElement.data.layout || 'text-left'} onChange={e => updateElement({ data: { layout: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none bg-white">
                         <option value="text-left">Kiri Kanan</option><option value="text-right">Kanan Kiri</option><option value="full-width">Full Text</option>
                       </select>
                       <label className="text-xs font-medium block mt-2">Gambar / Media URL</label>
                       <input value={selectedElement.data.image || ''} onChange={e => updateElement({ data: { image: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                       <label className="text-xs font-medium block mt-2">Isi Konten Teks</label>
                       <textarea rows={4} value={selectedElement.data.content || ''} onChange={e => updateElement({ data: { content: e.target.value }})} className="w-full border p-2 text-sm rounded outline-none" />
                    </>
                  )}
                </div>
              )}

              {/* Edit Type: STYLES (Color, bg, alignment, gap) */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Paintbrush className="w-3 h-3"/> Styling Visual</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Color (Text)</label>
                    <div className="flex bg-white border border-gray-300 rounded overflow-hidden p-1 gap-1">
                      <input type="color" value={selectedElement.styles?.color || '#000000'} onChange={e => updateElement({ styles: { color: e.target.value }})} className="w-6 h-6 p-0 border-0 outline-none rounded bg-transparent" />
                      <input type="text" value={selectedElement.styles?.color || ''} onChange={e => updateElement({ styles: { color: e.target.value }})} className="w-full text-xs font-mono outline-none uppercase" placeholder="#hex" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Background</label>
                     <div className="flex bg-white border border-gray-300 rounded overflow-hidden p-1 gap-1">
                      <input type="color" value={selectedElement.styles?.backgroundColor || '#ffffff'} onChange={e => updateElement({ styles: { backgroundColor: e.target.value }})} className="w-6 h-6 p-0 border-0 outline-none rounded bg-transparent" />
                      <input type="text" value={selectedElement.styles?.backgroundColor || ''} onChange={e => updateElement({ styles: { backgroundColor: e.target.value }})} className="w-full text-xs font-mono outline-none uppercase" placeholder="#hex" />
                    </div>
                  </div>
                </div>

                <div>
                   <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Text Align</label>
                   <div className="flex bg-gray-100 p-1 rounded gap-1 text-xs font-bold text-gray-500 text-center">
                     {['left', 'center', 'right', 'justify'].map(a => (
                       <button key={a} onClick={() => updateElement({ styles: { textAlign: a as any }})} className={`flex-1 py-1 rounded transition ${selectedElement.styles?.textAlign === a ? 'bg-white shadow text-blue-600' : 'hover:bg-gray-200'}`}>{a.substring(0,1).toUpperCase()}</button>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Typography / Layout Modifiers</label>
                   <div className="space-y-2">
                     <input type="text" value={selectedElement.styles?.fontSize || ''} onChange={e => updateElement({ styles: { fontSize: e.target.value }})} className="w-full text-xs font-mono border p-1 rounded" placeholder="font-size (cth: 2rem, 16px)" />
                     <input type="text" value={selectedElement.styles?.width || ''} onChange={e => updateElement({ styles: { width: e.target.value }})} className="w-full text-xs font-mono border p-1 rounded" placeholder="width (cth: 100%, 300px)" />
                     <input type="text" value={selectedElement.styles?.minHeight || ''} onChange={e => updateElement({ styles: { minHeight: e.target.value }})} className="w-full text-xs font-mono border p-1 rounded" placeholder="min-height (cth: 50vh, 200px)" />
                   </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                   <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 flex items-center justify-between">
                     Spasi (Margin & Padding)
                   </label>
                   <div className="space-y-2 relative border border-gray-200 bg-gray-50 p-2 rounded">
                     <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 font-black text-4xl pointer-events-none opacity-30 select-none">BOX</span>
                     <input type="text" value={selectedElement.styles?.margin || ''} onChange={e => updateElement({ styles: { margin: e.target.value }})} className="w-full text-xs font-mono border border-dashed border-gray-400 p-1 rounded bg-transparent" placeholder="margin (cth: 0 auto)" />
                     <input type="text" value={selectedElement.styles?.padding || ''} onChange={e => updateElement({ styles: { padding: e.target.value }})} className="w-full text-xs font-mono border border-solid border-gray-300 p-1 rounded mx-auto block max-w-[80%]" placeholder="padding (cth: 1rem 2rem)" />
                   </div>
                </div>
                
                 <div className="pt-2 border-t border-gray-100">
                   <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 flex items-center justify-between">Flexbox (Hanya Container)</label>
                   <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <select value={selectedElement.styles?.flexDirection || ''} onChange={e => updateElement({ styles: { flexDirection: e.target.value as any }})} className="w-full bg-white border p-1 text-xs rounded outline-none">
                           <option value="">Arah Flex</option><option value="row">Horizontal (Row)</option><option value="column">Vertical (Col)</option>
                        </select>
                        <input type="text" value={selectedElement.styles?.gap || ''} onChange={e => updateElement({ styles: { gap: e.target.value }})} className="w-full text-xs font-mono border p-1 rounded" placeholder="gap (cth: 1rem)" />
                      </div>
                      <select value={selectedElement.styles?.alignItems || ''} onChange={e => updateElement({ styles: { alignItems: e.target.value }})} className="w-full bg-white border p-1 text-xs rounded outline-none">
                         <option value="">Align Items</option><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="stretch">Stretch</option>
                      </select>
                      <select value={selectedElement.styles?.justifyContent || ''} onChange={e => updateElement({ styles: { justifyContent: e.target.value }})} className="w-full bg-white border p-1 text-xs rounded outline-none">
                         <option value="">Justify Content</option><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="space-between">Space Between</option>
                      </select>
                   </div>
                 </div>

              </div>
            </div>
          )}

          {/* SEC: SEO GLOBALS */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2 border-b pb-1">Pengaturan Halaman Meta</span>
              <div>
                <label className="text-xs font-medium block mb-1">Judul Landing Page (Title)</label>
                <input value={settings.seoTitle} onChange={e => setSettings({...settings, seoTitle: e.target.value})} className="w-full border p-2 text-sm rounded outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Deskripsi Meta</label>
                <textarea rows={4} value={settings.seoDescription} onChange={e => setSettings({...settings, seoDescription: e.target.value})} className="w-full border p-2 text-sm rounded outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Open Graph Image (Social)</label>
                <input value={settings.seoImage} onChange={e => setSettings({...settings, seoImage: e.target.value})} className="w-full border p-2 text-sm rounded outline-none focus:border-blue-500" placeholder="https://" />
                {settings.seoImage && <img src={settings.seoImage || undefined} alt="SEO Preview" className="w-full h-auto mt-2 rounded border" />}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Canvas Playground (Web Document Representation) */}
      <div 
         className="flex-1 overflow-y-auto relative bg-[#c8ced3] items-start justify-center flex py-8"
         onClick={() => { setSelectedId('root'); setActiveTab('widgets'); }}
         onDragOver={e => e.preventDefault()}
         onDrop={e => {
            const t = e.dataTransfer.getData('pluginType');
            if(t) {
               addWidget(t, 'root');
            }
         }}
      >
        <div className="bg-white w-full max-w-[1400px] min-h-[90vh] shadow-2xl rounded-sm overflow-hidden flex flex-col relative transition-transform">
          {/* Virtual Top Bar for Canvas */}
          <div className="bg-gray-100 p-2 flex items-center justify-between border-b font-mono text-[10px] text-gray-500">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div><div className="w-2 h-2 rounded-full bg-yellow-400"></div><div className="w-2 h-2 rounded-full bg-green-400"></div></div>
             <span>https://domain.com/ (Live Preview Canvas)</span>
             <span>1400px X {'>'}800px</span>
          </div>

          <div className="flex-1 p-0 transition-opacity">
            {settings.blocks.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 mt-32">
                 <MousePointerClick className="w-16 h-16 opacity-30" />
                 <p className="font-semibold text-lg">Mulai Desain Halaman Anda</p>
                 <button onClick={(e) => { e.stopPropagation(); addWidget('section', 'root'); }} className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-500 transition">+ Tambah Kontainer Baru</button>
               </div>
            ) : (
               <div className="w-full h-full relative z-0 flex flex-col">
                 {settings.blocks.map(b => renderCanvasNode(b))}
               </div>
            )}

            {/* Empty zone at bottom to append new sections easily */}
             <div 
               className="w-full p-8 flex items-center justify-center border-t border-dashed border-gray-300 bg-gray-50/50 mt-12 cursor-pointer hover:bg-gray-50 group" 
               onClick={(e) => { e.stopPropagation(); addWidget('section', 'root'); }}
               onDragOver={(e) => e.preventDefault()}
               onDrop={(e) => { e.preventDefault(); const t = e.dataTransfer.getData('pluginType'); if(t) addWidget(t, 'root'); }}
             >
                 <div className="flex items-center gap-2 text-gray-400 font-bold group-hover:text-blue-500 transition">
                    <Plus className="w-5 h-5"/> Klik atau Drop widget di sini untuk menambah ke area root
                 </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
