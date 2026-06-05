import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Building } from 'lucide-react';

export default function About() {
  const site = localStorage.getItem('currentSite') || 'panca';
  const isSensor = site === 'sensor';

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Helmet>
        <title>Tentang Kami - {isSensor ? 'Toyo Automation / Sensor' : 'PT Panca Prima Wijaya'}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#2271b1] p-12 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              {isSensor 
                ? 'Solusi integrasi keamanan berbasis sensor seismik canggih untuk melindungi aset Anda.'
                : 'Mitra tepercaya Anda dalam konsultasi komoditas pertanian dan teknologi fumigasi modern.'}
            </p>
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    PT Panca Prima Wijaya didedikasikan untuk membawa solusi teknologi modern ke dalam dunia keamanan fasilitas dan perlindungan komoditas pasca-panen. Dengan menggunakan teknologi terkini, kami percaya dapat memberikan pelayanan yang maksimal dan aman.
                  </p>
                  <p>
                    Kami menyediakan solusi end-to-end dengan dukungan konsultasi untuk menjamin kepuasan pelanggan dan keandalan sistem dalam jangka panjang. Misi kami adalah menghadirkan standar mutu dan ketenangan bagi operasional bisnis Anda, di mana pun Anda berada.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building className="text-[#2271b1]" />
                  Hubungi Kami
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0 flex items-center justify-center">
                      <MapPin className="text-[#2271b1] h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Alamat Kantor</h4>
                      <p className="text-gray-600 mt-1">Jalan Kayu Putih VII Blok A4 No. 8, RT.3/RW.6, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 14240</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0 flex items-center justify-center">
                      <Phone className="text-[#2271b1] h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Telepon</h4>
                      <p className="text-gray-600 mt-1">0853-1320-0188</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0 flex items-center justify-center">
                      <Mail className="text-[#2271b1] h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600 mt-1">
                        {isSensor ? 'info@sensorgempa.com' : 'info@pancaprimawijaya.com'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
