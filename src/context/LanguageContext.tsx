import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Language = 'id' | 'en';

interface LanguageContextProps {
  language: Language;
  isEn: boolean;
  t: (key: string, section?: string) => string;
  langLink: (path: string) => string;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// High-quality Translations dictionary
const translations: Record<Language, Record<string, any>> = {
  id: {
    common: {
      beranda: 'Beranda',
      layananFumigasi: 'Layanan Fumigasi',
      katalogEcommerce: 'Katalog & E-commerce',
      produkSensor: 'Produk Sensor',
      artikelEdukasi: 'Artikel Edukasi',
      tentangKami: 'Tentang Kami',
      keranjang: 'Keranjang Belanja',
      hubungiKami: 'Hubungi Kami',
      alamatKantor: 'Alamat Kantor',
      telepon: 'Telepon',
      email: 'Email',
      bacaSelengkapnya: 'Baca Selengkapnya',
      kembali: 'Kembali',
      menghubungiKami: 'Hubungi Kami via WhatsApp',
      solusiUtama: 'Solusi Utama',
      layananUtama: 'Layanan Utama',
      copyright: 'copyright © 2026 | PT. Panca Prima Wijaya',
      copyrightSensor: 'copyright © 2026 | PT. Panca Prima Wijaya'
    },
    splash: {
      title: 'Pilih Layanan Kami',
      description: 'Silakan pilih kategori produk atau layanan yang sesuai dengan kebutuhan industri Anda.',
      sensorTitle: 'Produk Sensor Gempa',
      sensorDesc: 'Teknologi mutakhir untuk deteksi gempa, early warning system, dan otomasi pengamanan industri bangunan.',
      pancaTitle: 'PT Panca Prima Wijaya',
      pancaDesc: 'Spesialis perlindungan komoditas pasca-panen, fumigasi profesional, fogging, sanitasi dan higiene industri.'
    },
    about: {
      title: 'Tentang Kami',
      subPanca: 'Mitra tepercaya Anda dalam konsultasi komoditas pertanian dan teknologi fumigasi modern.',
      subSensor: 'Solusi integrasi keamanan berbasis sensor seismik canggih untuk melindungi aset Anda.',
      ceritaTitle: 'Cerita Kami',
      cerita1: 'PT Panca Prima Wijaya didedikasikan untuk membawa solusi teknologi modern ke dalam dunia keamanan fasilitas dan perlindungan komoditas pasca-panen. Dengan menggunakan teknologi terkini, kami percaya dapat memberikan pelayanan yang maksimal dan aman.',
      cerita2: 'Kami menyediakan solusi end-to-end dengan dukungan konsultasi untuk menjamin kepuasan pelanggan dan keandalan sistem dalam jangka panjang. Misi kami adalah menghadirkan standar mutu dan ketenangan bagi operasional bisnis Anda, di mana pun Anda berada.'
    }
  },
  en: {
    common: {
      beranda: 'Home',
      layananFumigasi: 'Fumigation Services',
      katalogEcommerce: 'Catalog & E-commerce',
      produkSensor: 'Sensor Products',
      artikelEdukasi: 'Educational Articles',
      tentangKami: 'About Us',
      keranjang: 'Shopping Cart',
      hubungiKami: 'Contact Us',
      alamatKantor: 'Office Address',
      telepon: 'Phone',
      email: 'Email',
      bacaSelengkapnya: 'Read More',
      kembali: 'Go Back',
      menghubungiKami: 'Contact Us via WhatsApp',
      solusiUtama: 'Core Solutions',
      layananUtama: 'Core Services',
      copyright: 'Copyright © 2026 | PT. Panca Prima Wijaya. All Rights Reserved.',
      copyrightSensor: 'Copyright © 2026 | Toyo Sensor Automation. All Rights Reserved.'
    },
    splash: {
      title: 'Select Our Services',
      description: 'Please choose the product category or service that matches your industry and operational needs.',
      sensorTitle: 'Earthquake Sensor Products',
      sensorDesc: 'Advanced technology for earthquake detection, early warning systems, and building automation security.',
      pancaTitle: 'PT Panca Prima Wijaya',
      pancaDesc: 'Specialists in post-harvest commodity protection, professional fumigation, fogging, sanitization and industrial hygiene.'
    },
    about: {
      title: 'About Us',
      subPanca: 'Your trusted partner in agricultural commodity consultancy and modern fumigation technology.',
      subSensor: 'Advanced seismic sensor integration solutions designed to protect your modern infrastructure.',
      ceritaTitle: 'Our Story',
      cerita1: 'PT Panca Prima Wijaya is dedicated to bringing state-of-the-art technological solutions into facility security and post-harvest crop protection. Leveraging leading-edge technology, we believe in delivering maximum efficiency and top-tier safety standards.',
      cerita2: 'We offer extensive end-to-end solutions coupled with technical consultation to ensure long-term reliability and customer satisfaction. Our primary mission is to implement absolute quality and peace of mind for your business operations across Indonesia and beyond.'
    }
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLangState] = useState<Language>('id');

  // Sync language with URL path prefix /en
  useEffect(() => {
    const isEnglishRoute = location.pathname.startsWith('/en') || location.pathname === '/en';
    setLangState(isEnglishRoute ? 'en' : 'id');
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    
    const isCurrentEn = location.pathname.startsWith('/en');
    let newPath = location.pathname;

    if (lang === 'en' && !isCurrentEn) {
      // Add /en prefix
      newPath = `/en${location.pathname === '/' ? '' : location.pathname}`;
    } else if (lang === 'id' && isCurrentEn) {
      // Remove /en prefix
      newPath = location.pathname.replace(/^\/en/, '') || '/';
    }

    navigate(newPath);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  // Rewrites any link dynamically to preserve the user's active language prefix
  const langLink = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (language === 'en') {
      if (cleanPath.startsWith('/en/')) {
        return cleanPath;
      }
      if (cleanPath === '/en') {
        return '/en';
      }
      return `/en${cleanPath === '/' ? '' : cleanPath}`;
    } else {
      // Return normal ID path (remove en prefix safely if exists)
      return cleanPath.replace(/^\/en/, '') || '/';
    }
  };

  const t = (key: string, section = 'common'): string => {
    try {
      const sectionObj = translations[language]?.[section];
      if (sectionObj && sectionObj[key]) {
        return sectionObj[key];
      }
      // Fallback to indonesian fallback
      const fallbackObj = translations['id']?.[section];
      if (fallbackObj && fallbackObj[key]) {
        return fallbackObj[key];
      }
    } catch (e) {
      console.warn(`Translation missing for key: ${section}.${key}`);
    }
    return key;
  };

  const isEn = language === 'en';

  return (
    <LanguageContext.Provider value={{ language, isEn, t, langLink, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
