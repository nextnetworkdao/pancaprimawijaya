import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Code } from 'lucide-react';
import { SEO } from '../../components/SEO';

interface ExternalScript {
  id: number;
  name: string;
  code: string;
  location: 'head' | 'body' | 'footer';
  is_active: boolean;
}

export default function AdminScripts() {
  const [scripts, setScripts] = useState<ExternalScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<Partial<ExternalScript>>({
    name: '',
    code: '',
    location: 'head',
    is_active: true
  });

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const res = await fetch('/api/scripts');
      const data = await res.json();
      setScripts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = formData.id ? `/api/scripts/${formData.id}` : '/api/scripts';
      const method = formData.id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsEditing(false);
        setFormData({ name: '', code: '', location: 'head', is_active: true });
        fetchScripts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (script: ExternalScript) => {
    setFormData(script);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus script ini?')) return;
    try {
      await fetch(`/api/scripts/${id}`, { method: 'DELETE' });
      fetchScripts();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <SEO title="Insert Script - Admin Pane" description="Manage scripts that execute on the site" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-normal text-[#1d2327] flex items-center gap-2">
          <Code className="w-6 h-6" /> Insert Script
        </h1>
        {!isEditing && (
          <button 
            onClick={() => {
              setFormData({ name: '', code: '', location: 'head', is_active: true });
              setIsEditing(true);
            }}
            className="border border-[#2271b1] text-[#2271b1] hover:bg-[#f6f7f7] px-3 py-1 rounded-sm text-[13px] font-semibold transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Tambah Baru
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white border border-[#c3c4c7] p-6 rounded-sm max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[13px] font-semibold mb-1">Nama Script</label>
              <input
                required
                type="text"
                value={formData.name || ''}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Google Analytics, Facebook Pixel"
                className="w-full px-3 py-2 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold mb-1">Lokasi Script</label>
              <select
                value={formData.location || 'head'}
                onChange={e => setFormData({...formData, location: e.target.value as 'head'|'body'|'footer'})}
                className="w-full px-3 py-2 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] text-[13px]"
              >
                <option value="head">Head Tag (&lt;head&gt;)</option>
                <option value="body">Body Tag (Awal &lt;body&gt;)</option>
                <option value="footer">Footer Tag (Sebelum &lt;/body&gt;)</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold mb-1">Kode Script</label>
              <textarea
                required
                rows={10}
                value={formData.code || ''}
                onChange={e => setFormData({...formData, code: e.target.value})}
                placeholder="Tempel kode snippet di sini..."
                className="w-full px-3 py-2 border border-[#c3c4c7] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] font-mono text-[13px] bg-[#f0f0f1]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active !== false}
                onChange={e => setFormData({...formData, is_active: e.target.checked})}
              />
              <label htmlFor="is_active" className="text-[13px]">Aktifkan script ini</label>
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="bg-[#2271b1] text-white px-4 py-2 rounded-sm text-[13px] hover:bg-[#135e96] transition-colors font-semibold"
              >
                Simpan Script
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-[#c3c4c7] text-[#2271b1] hover:bg-[#f6f7f7] px-4 py-2 rounded-sm text-[13px] font-semibold transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-[#c3c4c7]">
          <table className="w-full text-left text-[13px] text-[#3c434a]">
            <thead>
              <tr className="border-b border-[#c3c4c7]">
                <th className="font-semibold p-3">Nama</th>
                <th className="font-semibold p-3 w-32">Lokasi</th>
                <th className="font-semibold p-3 w-24">Status</th>
                <th className="font-semibold p-3 w-24 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {scripts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">Belum ada script yang ditambahkan.</td>
                </tr>
              ) : (
                scripts.map((script) => (
                  <tr key={script.id} className="border-b border-[#c3c4c7] hover:bg-[#f6f7f7] group">
                    <td className="p-3 font-semibold text-[#2271b1]">{script.name}</td>
                    <td className="p-3">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {script.location === 'head' ? '<head>' : script.location === 'body' ? '<body>' : '<footer>'}
                      </span>
                    </td>
                    <td className="p-3">
                      {script.is_active ? 
                        <span className="text-green-600 font-semibold">Aktif</span> : 
                        <span className="text-gray-400">Nonaktif</span>
                      }
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(script)} className="text-[#2271b1] hover:text-[#135e96]">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(script.id)} className="text-[#d63638] hover:text-[#b32d2e]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
