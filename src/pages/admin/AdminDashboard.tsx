import React, { useEffect, useState } from 'react';
import { Users, Eye, TrendingUp, Package } from 'lucide-react';
import { AnalyticsData } from '../../types';

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(d => {
        if (!d || d.error) return;
        setData(d);
      });
  }, []);

  if (!data) return <div className="animate-pulse bg-white h-96 border border-[#c3c4c7]"></div>;

  const stats = [
    { name: 'Total Pengunjung', value: data.uniqueVisitors.toLocaleString('id-ID'), icon: Users },
    { name: 'Total Tampilan Halaman', value: data.pageViews.toLocaleString('id-ID'), icon: Eye },
    { name: 'Tingkat Konversi', value: '4.8%', icon: TrendingUp },
    { name: 'Pesanan Aktif', value: '12', icon: Package },
  ];

  return (
    <div>
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white border border-[#c3c4c7] rounded-sm p-4 hover:shadow-sm transition-shadow flex items-center gap-4">
              <div className="p-3 bg-[#f0f0f1] text-[#3c434a] rounded-full">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[13px] text-[#3c434a] mb-0">{stat.name}</h3>
                <p className="text-[18px] font-semibold text-[#1d2327]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-[#c3c4c7] rounded-sm">
          <h2 className="text-[14px] font-semibold text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Trafik 7 Hari Terakhir</h2>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between gap-2">
              {data.recentTraffic.map((day, i) => {
                const max = Math.max(...data.recentTraffic.map(d => d.views));
                const height = (day.views / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-[#f0f0f1] relative hover:bg-[#dcdcde] hover:cursor-pointer transition">
                      <div 
                        className="absolute bottom-0 w-full bg-[#2271b1] transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1d2327] text-white text-[11px] py-1 px-2 rounded-sm pointer-events-none transition z-10 whitespace-nowrap">
                        {day.views} views
                      </div>
                    </div>
                    <span className="text-[12px] text-[#646970]">{day.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#c3c4c7] rounded-sm">
          <h2 className="text-[14px] font-semibold text-[#1d2327] p-3 border-b border-[#c3c4c7] m-0">Top Katalog Layanan</h2>
          <div className="p-4">
            <div className="space-y-0">
              {data.topProducts.map((product, i) => (
                <div key={i} className="flex flex-col py-3 border-b border-[#f0f0f1] last:border-0 hover:bg-[#f6f7f7] transition px-2">
                  <span className="text-[13px] font-semibold text-[#2271b1] hover:underline cursor-pointer">{product}</span>
                  <span className="text-[12px] text-[#646970] mt-1">Populer dalam 30 hari terakhir</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
