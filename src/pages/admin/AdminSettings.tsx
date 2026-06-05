import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { MediaPickerModal } from '../../components/MediaPickerModal';

const inputClass = "w-full max-w-md px-2 py-1 border border-[#8c8f94] outline-none hover:border-[#2271b1] focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] transition-shadow text-[14px]";
const tdLabelClass = "w-[200px] py-4 text-[14px] font-semibold text-[#1d2327] align-top";
const tdInputClass = "py-4 text-[14px] text-[#3c434a] align-top";

function GeneralSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Umum</h1>
      
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Judul Situs</td>
            <td className={tdInputClass}>
              <input type="text" defaultValue="PT Panca Prima Wijaya" className={inputClass} />
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Slogan</td>
            <td className={tdInputClass}>
              <input type="text" defaultValue="Halaman Web Baru" className={inputClass} />
              <p className="text-[13px] text-[#646970] mt-1 italic">Dalam beberapa patah kata, jelaskan mengenai situs ini.</p>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Alamat WordPress (URL)</td>
            <td className={tdInputClass}>
              <input type="text" defaultValue="https://website.com" className={inputClass} />
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Alamat Situs (URL)</td>
            <td className={tdInputClass}>
              <input type="text" defaultValue="https://website.com" className={inputClass} />
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Alamat Email Administrasi</td>
            <td className={tdInputClass}>
              <input type="email" defaultValue="admin@website.com" className={inputClass} />
              <p className="text-[13px] text-[#646970] mt-1 italic">Alamat ini digunakan untuk tujuan admin, seperti pemberitahuan pengguna baru.</p>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Keanggotaan</td>
            <td className={tdInputClass}>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Setiap orang dapat mendaftar</span>
              </label>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Bahasa Situs</td>
            <td className={tdInputClass}>
              <select className="max-w-[200px] w-full px-2 py-1 border border-[#8c8f94] outline-none">
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </select>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Zona Waktu</td>
            <td className={tdInputClass}>
              <select className="max-w-[200px] w-full px-2 py-1 border border-[#8c8f94] outline-none">
                <option>Jakarta</option>
                <option>UTC+0</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function ConnectorsSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Konektor</h1>
      <p className="mb-4">Konfigurasi integrasi dengan platform eksternal.</p>
      
      <h2 className="text-[18px] font-semibold text-[#1d2327] mb-3">Google Workspace</h2>
      <table className="w-full text-left border-collapse mb-8">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Klien ID OAuth</td>
            <td className={tdInputClass}>
              <input type="text" placeholder="Masukkan Client ID" className={inputClass} />
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Klien Secret</td>
            <td className={tdInputClass}>
              <input type="password" placeholder="Masukkan Client Secret" className={inputClass} />
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-[18px] font-semibold text-[#1d2327] mb-3">Payment Gateway (Midtrans)</h2>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Server Key</td>
            <td className={tdInputClass}>
              <input type="text" placeholder="Server Key Midtrans" className={inputClass} />
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Client Key</td>
            <td className={tdInputClass}>
              <input type="text" placeholder="Client Key Midtrans" className={inputClass} />
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function WritingSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Menulis</h1>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Kategori pos bawaan</td>
            <td className={tdInputClass}>
              <select className="max-w-[200px] w-full px-2 py-1 border border-[#8c8f94] outline-none">
                <option>Tak Berkategori</option>
                <option>Berita</option>
              </select>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Format pos bawaan</td>
            <td className={tdInputClass}>
              <select className="max-w-[200px] w-full px-2 py-1 border border-[#8c8f94] outline-none">
                <option>Standar</option>
                <option>Galeri</option>
                <option>Video</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function ReadingSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Membaca</h1>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Beranda Anda menampilkan</td>
            <td className={tdInputClass}>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="homepage" /> Pos-pos terbaru Anda
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="homepage" defaultChecked /> Sebuah halaman statis (pilih di bawah)
                </label>
              </div>
              <div className="ml-6 mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-24">Beranda:</span>
                  <select className="px-2 py-1 border border-[#8c8f94] outline-none w-48">
                    <option>Halaman Beranda</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">Laman Pos:</span>
                  <select className="px-2 py-1 border border-[#8c8f94] outline-none w-48">
                    <option>Blog</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Halaman blog menampilkan paling banyak</td>
            <td className={tdInputClass}>
              <input type="number" defaultValue={10} className="w-16 px-2 py-1 border border-[#8c8f94] outline-none mr-2" /> pos
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Tampak pada Mesin Pencari</td>
            <td className={tdInputClass}>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Halangi mesin pencari untuk menindeks situs ini</span>
              </label>
              <p className="text-[13px] text-[#646970] mt-1 italic">Terserah dari mesin pencarinya apakah akan memenuhi permohonan ini atau tidak.</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function DiscussionSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Diskusi</h1>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Pengaturan artikel bawaan</td>
            <td className={tdInputClass}>
              <div className="space-y-1">
                <label className="flex gap-2">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <span>Coba beritahu setiap blog yang ditautkan dari artikel</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <span>Izinkan pemberitahuan tautan dari blog lain (pingback dan trackback) pada artikel baru</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <span>Izinkan orang memberi komentar untuk artikel baru</span>
                </label>
              </div>
            </td>
          </tr>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Komentar lainnya</td>
            <td className={tdInputClass}>
              <div className="space-y-1">
                <label className="flex gap-2">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <span>Penulis komentar harus mengisi nama dan surel</span>
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>Pengguna harus terdaftar dan log masuk untuk dapat berkomentar</span>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function MediaSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Media</h1>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Ukuran Gambar</td>
            <td className={tdInputClass}>
              <p className="mb-2">Ukuran dalam piksel dikoordinat saat menambahkan foto ke Galeri Media.</p>
              
              <div className="mb-4">
                <strong>Ukuran Miniatur</strong>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    Lebar: <input type="number" defaultValue="150" className="w-16 px-2 py-1 border border-[#8c8f94]" />
                  </label>
                  <label className="flex items-center gap-2">
                    Tinggi: <input type="number" defaultValue="150" className="w-16 px-2 py-1 border border-[#8c8f94]" />
                  </label>
                </div>
                <label className="flex gap-2 mt-2">
                  <input type="checkbox" defaultChecked />
                  <span>Pangkas foto pas dengan ukuran secara persis</span>
                </label>
              </div>

              <div className="mb-4">
                <strong>Ukuran Sedang</strong>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    Lebar maks: <input type="number" defaultValue="300" className="w-16 px-2 py-1 border border-[#8c8f94]" />
                  </label>
                  <label className="flex items-center gap-2">
                    Tinggi maks: <input type="number" defaultValue="300" className="w-16 px-2 py-1 border border-[#8c8f94]" />
                  </label>
                </div>
              </div>

              <div>
                <strong>Ukuran Besar</strong>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    Lebar maks: <input type="number" defaultValue="1024" className="w-16 px-2 py-1 border border-[#8c8f94]" />
                  </label>
                  <label className="flex items-center gap-2">
                    Tinggi maks: <input type="number" defaultValue="1024" className="w-16 px-2 py-1 border border-[#8c8f94]" />
                  </label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function PermalinkSettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Permalink</h1>
      <p className="mb-4">WordPress menawarkan Anda kemampuan untuk membuat struktur URL kustom.</p>

      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-[#c3c4c7]">
            <td className={tdLabelClass}>Pengaturan Umum</td>
            <td className={tdInputClass}>
              <div className="space-y-3">
                <label className="flex gap-3">
                  <input type="radio" name="permalink" className="mt-1" />
                  <div>
                    <span className="font-semibold block">Biasa</span>
                    <span className="bg-[#f0f0f1] px-1 py-0.5 text-xs">https://website.com/?p=123</span>
                  </div>
                </label>
                <label className="flex gap-3">
                  <input type="radio" name="permalink" className="mt-1" />
                  <div>
                    <span className="font-semibold block">Tanggal dan nama</span>
                    <span className="bg-[#f0f0f1] px-1 py-0.5 text-xs">https://website.com/2026/05/27/contoh-pos/</span>
                  </div>
                </label>
                <label className="flex gap-3">
                  <input type="radio" name="permalink" className="mt-1" />
                  <div>
                    <span className="font-semibold block">Bulan dan nama</span>
                    <span className="bg-[#f0f0f1] px-1 py-0.5 text-xs">https://website.com/2026/05/contoh-pos/</span>
                  </div>
                </label>
                <label className="flex gap-3">
                  <input type="radio" name="permalink" className="mt-1" />
                  <div>
                    <span className="font-semibold block">Numerik</span>
                    <span className="bg-[#f0f0f1] px-1 py-0.5 text-xs">https://website.com/arsip/123</span>
                  </div>
                </label>
                <label className="flex gap-3">
                  <input type="radio" name="permalink" className="mt-1" defaultChecked />
                  <div>
                    <span className="font-semibold block">Nama tulisan</span>
                    <span className="bg-[#f0f0f1] px-1 py-0.5 text-xs">https://website.com/contoh-pos/</span>
                  </div>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6">
        <button className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96]">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Privasi</h1>
      
      <p className="mb-4 text-[14px]">
        Sebagai pemilik situs web, Anda mungkin diharuskan mengikuti pedoman hukum privasi internasional dan domestik yang berlaku. 
        Maka dari itu kami menyarankan Anda agar menerbitkan halaman Kebijakan Privasi.
      </p>

      <div className="bg-white border border-[#c3c4c7] p-6 max-w-2xl">
        <h2 className="text-[14px] font-semibold mb-2">Pilih halaman Kebijakan Privasi</h2>
        <div className="flex gap-2">
          <select className="border border-[#8c8f94] outline-none px-2 py-1 max-w-[300px] w-full">
            <option>Kebijakan Privasi</option>
          </select>
          <button className="border border-[#2271b1] text-[#2271b1] px-3 py-1 hover:bg-[#f6f7f7] bg-[#f0f0f1] text-[13px] rounded-sm">Pakai Halaman Ini</button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-[14px] font-semibold mb-2">Buat Kebijakan Privasi Baru</h2>
        <button className="border border-[#2271b1] text-[#2271b1] px-3 py-1.5 hover:bg-[#f6f7f7] bg-white text-[13px] rounded-sm">Buat Halaman</button>
      </div>
    </div>
  );
}

function SliderSettings() {
  const [posters, setPosters] = useState<{ id: string; image: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [mediaPickerConfig, setMediaPickerConfig] = useState<{onSelect: (url: string) => void} | null>(null);

  useEffect(() => {
    fetch('/api/settings/slider')
      .then(res => res.json())
      .then(d => {
        if (d && Array.isArray(d.posters)) {
          setPosters(d.posters);
        }
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/settings/slider', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posters })
      });
      alert('Tersimpan!');
    } catch (e) {
      alert('Gagal menyimpan');
    }
    setLoading(false);
  };

  const removePoster = (id: string) => {
    setPosters(posters.filter(p => p.id !== id));
  };

  const addPoster = () => {
    setMediaPickerConfig({
      onSelect: (url) => {
        setPosters([...posters, { id: Date.now().toString(), image: url }]);
        setMediaPickerConfig(null);
      }
    });
  };

  return (
    <div className="max-w-[1000px]">
      {mediaPickerConfig && <MediaPickerModal onSelect={mediaPickerConfig.onSelect} onClose={() => setMediaPickerConfig(null)} />}
      
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Pengaturan Slider Produk</h1>
      <p className="mb-6">Atur poster slider yang akan muncul di semua bagian atas halaman produk.</p>
      
      <div className="space-y-4 mb-6">
        {posters.map((poster, idx) => (
          <div key={poster.id} className="flex items-center gap-4 bg-white p-4 border border-[#c3c4c7] rounded-sm">
            <span className="font-bold text-gray-500 w-8">{idx + 1}.</span>
            <div className="flex-1">
              <img src={poster.image} alt="Poster" className="w-full max-w-[300px] h-[100px] object-cover rounded border" />
            </div>
            <button
              onClick={() => removePoster(poster.id)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {posters.length === 0 && (
          <div className="text-[#646970] italic">Belum ada poster slider.</div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={addPoster}
          className="bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#f6f7f7] flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Tambah Poster
        </button>
        
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#2271b1] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium hover:bg-[#135e96] disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="text-[#3c434a]">
      <Routes>
        <Route path="general" element={<GeneralSettings />} />
        <Route path="connectors" element={<ConnectorsSettings />} />
        <Route path="writing" element={<WritingSettings />} />
        <Route path="reading" element={<ReadingSettings />} />
        <Route path="discussion" element={<DiscussionSettings />} />
        <Route path="media" element={<MediaSettings />} />
        <Route path="permalinks" element={<PermalinkSettings />} />
        <Route path="privacy" element={<PrivacySettings />} />
        <Route path="slider" element={<SliderSettings />} />
        {/* Redirect base to general */}
        <Route path="/" element={<Navigate to="general" replace />} />
      </Routes>
    </div>
  );
}
