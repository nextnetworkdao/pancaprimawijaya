import React, { useEffect, useState } from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { Order } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Link } from 'react-router-dom';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setOrders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-[#3c434a]">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-[23px] font-normal text-[#1d2327]">Pesanan (WooCommerce)</h1>
      </div>

      <div className="bg-white border border-[#c3c4c7] rounded-sm mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#c3c4c7]">
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327] border-r border-[#c3c4c7] w-12 text-center"><input type="checkbox" /></th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Pesanan</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Tanggal</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Status</th>
              <th className="px-3 py-2 text-[14px] font-semibold text-[#1d2327]">Total</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-[#646970]">Memuat...</td></tr>
            ) : orders.map((order, index) => (
              <tr key={order.id} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f7f7]'} border-b border-[#c3c4c7] last:border-0`}>
                <td className="px-3 py-2 text-center border-r border-[#c3c4c7]"><input type="checkbox" /></td>
                <td className="px-3 py-2 font-medium">
                  <Link to={`#`} className="text-[#2271b1] text-[14px] font-semibold hover:underline">#{order.id} {order.customer.name}</Link>
                  <div className="text-[#646970] font-normal text-[12px]">{order.customer.email}</div>
                  <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[13px]">
                    <span className="text-[#2271b1] hover:underline cursor-pointer">Lihat pesanan</span>
                    <span className="text-[#c3c4c7]">|</span>
                    <span className="text-[#d63638] hover:underline cursor-pointer">Pindahkan ke Tong Sampah</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-[13px]">
                  {new Date(order.date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-3 py-2">
                  <span className="inline-block px-2 py-1 bg-[#e5f5fa] text-[#00a1cb] rounded-sm text-[12px] font-semibold">
                    {order.status === 'completed' ? 'Selesai' : order.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-[13px]">
                  <span className="font-semibold">{formatCurrency(order.total)}</span>
                </td>
              </tr>
            ))}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-left text-[#646970]">Tidak ada pesanan ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
