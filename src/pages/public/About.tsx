import React from 'react';
import { MapPin, Phone, Mail, Building } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SEO } from '../../components/SEO';

export default function About() {
  const { isEn, t } = useLanguage();
  const site = localStorage.getItem('currentSite') || 'panca';
  const isSensor = site === 'sensor';

  const defaultTitle = isSensor 
    ? (isEn ? 'About Us - Toyo Automation / Earthquake Sensors' : 'Tentang Kami - Toyo Automation / Sensor')
    : (isEn ? 'About Us - PT Panca Prima Wijaya' : 'Tentang Kami - PT Panca Prima Wijaya');

  const defaultDescription = isSensor
    ? (isEn ? 'Seismic integration and earthquake security automation systems.' : 'Solusi integrasi keamanan berbasis sensor seismik canggih untuk melindungi aset Anda.')
    : (isEn ? 'Partner in agricultural commodities and professional fumigation.' : 'Mitra tepercaya Anda dalam konsultasi komoditas pertanian dan teknologi fumigasi modern.');

  return (
    <div className="bg-gray-50 min-h-screen py-16 font-sans animate-fade-in">
      <SEO 
        title={defaultTitle}
        description={defaultDescription}
        type="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[#2271b1] p-12 text-center text-white">
            <h1 className="text-4xl font-black mb-4 tracking-tight">
              {t('title', 'about')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 font-light leading-relaxed">
              {isSensor ? t('subSensor', 'about') : t('subPanca', 'about')}
            </p>
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">
                  {t('ceritaTitle', 'about')}
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>{t('cerita1', 'about')}</p>
                  <p>{t('cerita2', 'about')}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building className="text-[#2271b1]" />
                  {t('hubungiKami')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0 flex items-center justify-center border border-gray-100 h-12 w-12">
                      <MapPin className="text-[#2271b1] h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">{t('alamatKantor')}</h4>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">Jalan Kayu Putih VII Blok A4 No. 8, RT.3/RW.6, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 14240</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0 flex items-center justify-center border border-gray-100 h-12 w-12">
                      <Phone className="text-[#2271b1] h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">{t('telepon')}</h4>
                      <p className="text-sm text-gray-600 mt-1">0853-1320-0188</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0 flex items-center justify-center border border-gray-100 h-12 w-12">
                      <Mail className="text-[#2271b1] h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">{t('email')}</h4>
                      <p className="text-sm text-gray-600 mt-1 font-medium text-blue-600 hover:underline">
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
