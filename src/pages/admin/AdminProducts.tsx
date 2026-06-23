import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/utils';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const site = localStorage.getItem('currentSite') || 'panca';
    fetch(`/api/products?site=${site}`)
      .then(res => res.json())
      .then(d => {
        if (!Array.isArray(d)) return;
        setProducts(d);
      });
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Yakin ingin memindah ke tong sampah?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  }

  return (
    <div className="text-[#3c434a]">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-[23px] font-normal text-[#1d2327]">Produk</h1>
        <Link 
          to="/admin/products/new"
          className="px-2 py-1 border border-[#2271b1] text-[#2271b1] rounded-sm text-[13px] hover:bg-[#f0f0f1] transition"
        >
          Tambah Baru
        </Link>
      </div>

      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#c3c4c7]">
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327] border-r border-[#c3c4c7] w-12 text-center"><input type="checkbox" /></th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327] w-16 text-center"><span className="hidden">Gambar</span></th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Nama</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Kategori</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Stok</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Harga</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {products.map((product, index) => (
              <tr key={product.id} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f7f7]'} border-b border-[#c3c4c7] last:border-0`}>
                <td className="px-3 py-2 text-center border-r border-[#c3c4c7]"><input type="checkbox" /></td>
                <td className="px-3 py-2">
                  <img src={product.image || undefined} className="w-10 h-10 object-cover border border-[#c3c4c7]" alt="" />
                </td>
                <td className="px-3 py-2 font-medium">
                  <Link to={`/admin/products/${product.id}/edit`} className="text-[#2271b1] text-[14px] font-semibold hover:underline">{product.name}</Link>
                  <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[13px]">
                    <Link to={`/admin/products/${product.id}/edit`} className="text-[#2271b1] hover:underline">Sunting</Link>
                    <span className="text-[#c3c4c7]">|</span>
                    <button onClick={() => handleDelete(product.id)} className="text-[#d63638] hover:underline">Buang</button>
                    <span className="text-[#c3c4c7]">|</span>
                    <Link to={`/produk/${product.slug}`} target="_blank" className="text-[#2271b1] hover:underline">Tampil</Link>
                  </div>
                </td>
                <td className="px-3 py-2 text-[13px]">
                  {product.category}
                </td>
                <td className="px-3 py-2 text-[13px]">
                  {product.stock !== undefined ? product.stock : 0}
                </td>
                <td className="px-3 py-2 text-[13px] font-semibold">
                  {formatCurrency(product.price)}
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-left text-gray-500">Tidak ada produk ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
