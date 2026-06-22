import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { Pool } from 'pg';
import { GoogleGenAI, Type } from "@google/genai";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_KXPcOL8yei6r@ep-restless-waterfall-aocnkn4e-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
});

async function seedDefaultPages(pool: Pool) {
  try {
    const list = [
      {
        id: 'PAGE-privacy',
        title: 'Kebijakan Privasi & Metode Pembayaran',
        slug: 'kebijakan-privasi',
        content: `<h2>Kebijakan Privasi (Privacy Policy)</h2>
<p>PT Panca Prima Wijaya berkomitmen untuk melindungi privasi data pribadi Anda saat menggunakan platform kami. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.</p>
<h3>Metode Pembayaran (Payment Methods)</h3>
<h4>Pembayaran yang Kami Terima</h4>
<p>Kami menerima berbagai metode pembayaran untuk memudahkan pelanggan kami:</p>
<ul>
  <li><strong>Transfer Bank:</strong> BCA, Mandiri, BNI, BRI</li>
  <li><strong>E-Wallet:</strong> GoPay, OVO, DANA, ShopeePay</li>
  <li><strong>Virtual Account:</strong> BCA Virtual Account, BNI Virtual Account, Mandiri Virtual Account, Permata Virtual Account</li>
  <li><strong>QRIS:</strong> Pembayaran dapat dilakukan menggunakan QRIS yang mendukung seluruh aplikasi pembayaran digital di Indonesia.</li>
  <li><strong>Kartu Kredit &amp; Debit:</strong> Kami menerima pembayaran menggunakan kartu kredit dan debit yang didukung oleh payment gateway resmi.</li>
  <li><strong>Keamanan Transaksi:</strong> Seluruh transaksi diproses melalui sistem pembayaran yang aman dan terenkripsi untuk menjaga keamanan data pelanggan.</li>
</ul>`,
        seotitle: 'Kebijakan Privasi & Metode Pembayaran | PT Panca Prima Wijaya',
        seodescription: 'Informasi lengkap tentang Kebijakan Privasi dan daftar lengkap metode pembayaran aman yang diterima oleh PT Panca Prima Wijaya.',
        status: 'publish',
        title_en: 'Privacy Policy & Payment Methods',
        slug_en: 'privacy-policy',
        content_en: `<h2>Privacy Policy</h2>
<p>PT Panca Prima Wijaya is committed to protecting your personal data privacy while utilizing our platform. This page details how we collect, use, and secure your information.</p>
<h3>Payment Methods</h3>
<h4>Payments We Accept</h4>
<p>We accept various payment methods to facilitate our customers:</p>
<ul>
  <li><strong>Bank Transfer:</strong> BCA, Mandiri, BNI, BRI</li>
  <li><strong>E-Wallet:</strong> GoPay, OVO, DANA, ShopeePay</li>
  <li><strong>Virtual Account:</strong> BCA Virtual Account, BNI Virtual Account, Mandiri Virtual Account, Permata Virtual Account</li>
  <li><strong>QRIS:</strong> Payments can be made using QRIS, which supports all digital payment applications in Indonesia.</li>
  <li><strong>Credit &amp; Debit Cards:</strong> We accept payments using credit and debit cards backed by official payment gateways.</li>
  <li><strong>Transaction Security:</strong> All transactions are processed through encrypted, secure payment systems to safeguard customer data.</li>
</ul>`,
        seotitle_en: 'Privacy Policy & Payment Methods | PT Panca Prima Wijaya',
        seodescription_en: 'Complete details on our Privacy Policy and the secure payment methods accepted by PT Panca Prima Wijaya.'
      },
      {
        id: 'PAGE-refund',
        title: 'Kebijakan Pengembalian & Pengembalian Dana',
        slug: 'kebijakan-pengembalian-dana',
        content: `<h2>Kebijakan Pengembalian &amp; Pengembalian Dana</h2>
<p>Komitmen kami adalah memberikan kepuasan maksimal kepada setiap pelanggan PT Panca Prima Wijaya. Jika Anda tidak sepenuhnya puas dengan transaksi Anda, kami siap membantu.</p>
<h3>Ketentuan Pengembalian Barang:</h3>
<ul>
  <li>Permohonan pengembalian produk dapat diajukan dalam waktu maksimal 7 hari sejak produk diterima.</li>
  <li>Produk harus dalam kondisi asli, segel belum terbuka, serta belum pernah digunakan.</li>
  <li>Wajib menyertakan bukti pembelian atau invoice resmi serta video unboxing lengkap tanpa jeda.</li>
</ul>
<h3>Ketentuan Pengembalian Dana (Refund):</h3>
<ul>
  <li>Setelah produk pengembalian kami terima dan verifikasi berhasil, kami akan memproses pengembalian dana dalam waktu 3-5 hari kerja.</li>
  <li>Pengembalian dana akan dikirimkan ke rekening bank asal atau e-wallet yang digunakan saat pembelian.</li>
</ul>`,
        seotitle: 'Kebijakan Pengembalian & Pengembalian Dana | PT Panca Prima Wijaya',
        seodescription: 'Syarat dan prosedur pengajuan pengembalian produk dan pengembalian dana (refund) resmi di PT Panca Prima Wijaya.',
        status: 'publish',
        title_en: 'Return & Refund Policy',
        slug_en: 'return-policy',
        content_en: `<h2>Return &amp; Refund Policy</h2>
<p>Our commitment is to deliver maximum satisfaction to every customer of PT Panca Prima Wijaya. If you are not entirely satisfied with your transaction, we are here to help.</p>
<h3>Return Terms:</h3>
<ul>
  <li>Return requests can be submitted within a maximum of 7 days from product receipt.</li>
  <li>The product must be in its original condition, sealed, and unused.</li>
  <li>Must include proof of purchase or official invoice along with a complete, unedited unboxing video.</li>
</ul>
<h3>Refund Terms:</h3>
<ul>
  <li>Once the returned product is received and verification is successful, we will process your refund within 3-5 business days.</li>
  <li>The refund will be sent to the original bank account or e-wallet used during purchase.</li>
</ul>`,
        seotitle_en: 'Return & Refund Policy | PT Panca Prima Wijaya',
        seodescription_en: 'Terms and official procedures for product returns and refund claims at PT Panca Prima Wijaya.'
      },
      {
        id: 'PAGE-terms',
        title: 'Syarat & Ketentuan',
        slug: 'syarat-ketentuan',
        content: `<h2>Syarat &amp; Ketentuan (Terms &amp; Conditions)</h2>
<p>Selamat datang di layanan resmi PT Panca Prima Wijaya. Dengan mengakses dan berbelanja di platform kami, Anda menyetujui seluruh ketentuan di bawah ini.</p>
<h3>Ketentuan Penggunaan:</h3>
<p>Seluruh materi, logo, dan konten yang ditampilkan di situs ini adalah milik sah PT Panca Prima Wijaya. Penggunaan tanpa izin tertulis adalah pelanggaran hak cipta.</p>
<h3>Ketentuan Pembelian &amp; Garansi:</h3>
<p>Seluruh produk saniter pelabuhan, fumigasi, dan sensor yang kami sediakan dijamin orisinalitasnya dan didukung oleh garansi resmi kami.</p>`,
        seotitle: 'Syarat & Ketentuan Layanan | PT Panca Prima Wijaya',
        seodescription: 'Syarat dan ketentuan umum penggunaan situs dan pembelian resmi produk PT Panca Prima Wijaya.',
        status: 'publish',
        title_en: 'Terms & Conditions',
        slug_en: 'terms-conditions',
        content_en: `<h2>Terms &amp; Conditions</h2>
<p>Welcome to the official services of PT Panca Prima Wijaya. By accessing and purchasing on our platform, you agree to all the terms below.</p>
<h3>Terms of Use:</h3>
<p>All materials, logos, and content displayed on this site are the legal property of PT Panca Prima Wijaya. Unauthorized use is a copyright violation.</p>
<h3>Purchase &amp; Warranty Terms:</h3>
<p>All port sanitation, fumigation, and sensor products we provide are guaranteed authentic and backed by our official warranty.</p>`,
        seotitle_en: 'Terms & Conditions | PT Panca Prima Wijaya',
        seodescription_en: 'General terms and conditions of website usage and product purchasing at PT Panca Prima Wijaya.'
      },
      {
        id: 'PAGE-contact',
        title: 'Hubungi Kami',
        slug: 'kontak',
        content: `<h2>Hubungi PT Panca Prima Wijaya</h2>
<p>Hubungi tim spesialis kami untuk bantuan konsultasi teknis, produk, atau pembelian massal.</p>
<div class="mt-6 border border-gray-150 p-4 rounded-lg bg-gray-50">
  <p class="mb-2"><strong>📍 Alamat Kantor:</strong> Ruko Golden Boulevard Blok C No. 9, BSD City, Tangerang, Banten, Indonesia</p>
  <p class="mb-2"><strong>📞 WhatsApp Resmi:</strong> +62 853 1320 0188</p>
  <p class="mb-0"><strong>✉️ Email:</strong> info@pancaprimawijaya.com</p>
</div>`,
        seotitle: 'Hubungi Kami | PT Panca Prima Wijaya',
        seodescription: 'Kontak resmi, alamat kantor, WhatsApp, dan email PT Panca Prima Wijaya untuk layanan bantuan.',
        status: 'publish',
        title_en: 'Contact Us',
        slug_en: 'contact',
        content_en: `<h2>Contact PT Panca Prima Wijaya</h2>
<p>Contact our specialist team for technical consulting, product inquiries, or bulk corporate purchases.</p>
<div class="mt-6 border border-gray-150 p-4 rounded-lg bg-gray-50">
  <p class="mb-2"><strong>📍 Office Address:</strong> Ruko Golden Boulevard Blok C No. 9, BSD City, Tangerang, Banten, Indonesia</p>
  <p class="mb-2"><strong>📞 Official WhatsApp:</strong> +62 853 1320 0188</p>
  <p class="mb-0"><strong>✉️ Email:</strong> info@pancaprimawijaya.com</p>
</div>`,
        seotitle_en: 'Contact Us | PT Panca Prima Wijaya',
        seodescription_en: 'Official contact details, office address, WhatsApp, and email of PT Panca Prima Wijaya.'
      }
    ];

    for (const p of list) {
      await pool.query(`
        INSERT INTO pages (id, title, slug, content, seotitle, seodescription, status, title_en, slug_en, content_en, seotitle_en, seodescription_en)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          content = EXCLUDED.content,
          seotitle = EXCLUDED.seotitle,
          seodescription = EXCLUDED.seodescription,
          title_en = EXCLUDED.title_en,
          slug_en = EXCLUDED.slug_en,
          content_en = EXCLUDED.content_en,
          seotitle_en = EXCLUDED.seotitle_en,
          seodescription_en = EXCLUDED.seodescription_en
      `, [p.id, p.title, p.slug, p.content, p.seotitle, p.seodescription, p.status, p.title_en, p.slug_en, p.content_en, p.seotitle_en, p.seodescription_en]);
    }
    console.log("Required Google Merchant policies pages verified/seeded successfully.");
  } catch (e) {
    console.error("Error seeding default policy pages:", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure tables exist on boot
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
          id SERIAL PRIMARY KEY,
          key VARCHAR(255) UNIQUE NOT NULL,
          value JSONB NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS pages (
          id VARCHAR(255) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          content TEXT,
          seotitle VARCHAR(255),
          seodescription TEXT,
          image VARCHAR(255),
          createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS posts (
          id VARCHAR(255) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          content TEXT,
          seotitle VARCHAR(255),
          seodescription TEXT,
          keywords TEXT,
          featuredimage VARCHAR(255),
          site VARCHAR(100),
          createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          price DECIMAL(15, 2) NOT NULL,
          category VARCHAR(100),
          image VARCHAR(255),
          gallery JSONB,
          description TEXT,
          seoarticle TEXT,
          seotitle VARCHAR(255),
          seodescription TEXT,
          keywords TEXT,
          site VARCHAR(100),
          createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Alter table to add seoarticle if it doesn't exist
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='seoarticle') THEN
              ALTER TABLE products ADD COLUMN seoarticle TEXT;
          END IF;
      END $$;

      ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery JSONB;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS gtin VARCHAR(100);
      ALTER TABLE products ADD COLUMN IF NOT EXISTS mpn VARCHAR(100);
      ALTER TABLE products ADD COLUMN IF NOT EXISTS brand VARCHAR(255) DEFAULT 'PT Panca Prima Wijaya';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS condition VARCHAR(100) DEFAULT 'new';

      ALTER TABLE pages ADD COLUMN IF NOT EXISTS canonical VARCHAR(255);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS robots VARCHAR(50);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS ogtitle VARCHAR(255);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS ogdescription TEXT;
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS ogimage VARCHAR(255);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS twittercard VARCHAR(50);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS category VARCHAR(255);

      ALTER TABLE posts ADD COLUMN IF NOT EXISTS canonical VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS robots VARCHAR(50);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS ogtitle VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS ogdescription TEXT;
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS ogimage VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS twittercard VARCHAR(50);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS category VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'publish';
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'publish';

      -- Pre-translated English columns for instant performance & perfect SEO
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug_en VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_en TEXT;
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS seotitle_en VARCHAR(255);
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS seodescription_en TEXT;
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS keywords_en TEXT;

      ALTER TABLE products ADD COLUMN IF NOT EXISTS name_en VARCHAR(255);
      ALTER TABLE products ADD COLUMN IF NOT EXISTS slug_en VARCHAR(255);
      ALTER TABLE products ADD COLUMN IF NOT EXISTS description_en TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS seoarticle_en TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS seotitle_en VARCHAR(255);
      ALTER TABLE products ADD COLUMN IF NOT EXISTS seodescription_en TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS keywords_en TEXT;

      ALTER TABLE pages ADD COLUMN IF NOT EXISTS title_en VARCHAR(255);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS slug_en VARCHAR(255);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS content_en TEXT;
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS seotitle_en VARCHAR(255);
      ALTER TABLE pages ADD COLUMN IF NOT EXISTS seodescription_en TEXT;

      CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(255) PRIMARY KEY,
          customer JSONB NOT NULL,
          items JSONB NOT NULL,
          total DECIMAL(15, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'Pending',
          createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS analytics (
          id SERIAL PRIMARY KEY,
          pageviews INT DEFAULT 0,
          uniquevisitors INT DEFAULT 0,
          recordedat DATE DEFAULT CURRENT_DATE UNIQUE
      );
      CREATE TABLE IF NOT EXISTS scripts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          code TEXT NOT NULL,
          location VARCHAR(50) NOT NULL, -- 'head', 'body', 'footer'
          is_active BOOLEAN DEFAULT true,
          createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database tables verified/created successfully.");
    await seedDefaultPages(pool);
    runDatabaseTranslationMigration(); // Trigger the background auto-translation migration
  } catch (err) {
    console.error("Failed to verify tables:", err);
  }

  // --- AUTO-TRANSLATION SERVER-SIDE HELPERS (GEMINI 3.5 FLASH) ---
  async function translatePostAI(ai: any, title: string, content: string, seoTitle: string, seoDescription: string, keywords: string) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `You are an expert bilingual content editor and professional SEO analyst.
  Translate the following Indonesian blog post content and SEO parameters into natural, high-converting English.
  CRITICAL MANDATES:
  1. Preserve all HTML structure, inline styles, tags (e.g. figure, img, figcaption, a, inline target attributes, table, thead, tbody, etc.) EXACTLY inside the translated content. Do not drop or break any HTML element.
  2. The translated slug_en must be a clean URL path (lowercase, alphanumeric, with '-' separators) based on the translated title.
  3. Make all English copy natural, native-sounding, and deeply optimized for SEO keywords.

  ORIGINAL INDONESIAN CONTENT:
  Title: "${title}"
  Content: ${content}
  SEO Title: "${seoTitle || ''}"
  SEO Description: "${seoDescription || ''}"
  Keywords: "${keywords || ''}"`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title_en: { type: Type.STRING },
              slug_en: { type: Type.STRING },
              content_en: { type: Type.STRING },
              seotitle_en: { type: Type.STRING },
              seodescription_en: { type: Type.STRING },
              keywords_en: { type: Type.STRING }
            },
            required: ['title_en', 'slug_en', 'content_en', 'seotitle_en', 'seodescription_en', 'keywords_en']
          }
        }
      });

      const text = res.text || '{}';
      return JSON.parse(text);
    } catch (err) {
      console.error("translatePostAI failed:", err);
      return {
        title_en: title,
        slug_en: (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content_en: content,
        seotitle_en: seoTitle || '',
        seodescription_en: seoDescription || '',
        keywords_en: keywords || ''
      };
    }
  }

  async function translateProductAI(ai: any, name: string, description: string, seoarticle: string, seoTitle: string, seoDescription: string, keywords: string) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `You are an expert e-commerce catalog translator and professional SEO specialist.
  Translate the following Indonesian product specifications, content guides, and SEO attributes into natural, elegant English.
  CRITICAL MANDATES:
  1. Preserve all HTML structures, tables, and spacing EXACTLY.
  2. The translated slug_en must be a clean URL slug (lowercase, alphanumeric, with '-' separators) based on the translated product name.

  ORIGINAL INDONESIAN INFO:
  Name: "${name}"
  Description: ${description}
  SEO Article Guide: ${seoarticle || ''}
  SEO Title: "${seoTitle || ''}"
  SEO Description: "${seoDescription || ''}"
  Keywords: "${keywords || ''}"`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name_en: { type: Type.STRING },
              slug_en: { type: Type.STRING },
              description_en: { type: Type.STRING },
              seoarticle_en: { type: Type.STRING },
              seotitle_en: { type: Type.STRING },
              seodescription_en: { type: Type.STRING },
              keywords_en: { type: Type.STRING }
            },
            required: ['name_en', 'slug_en', 'description_en', 'seoarticle_en', 'seotitle_en', 'seodescription_en', 'keywords_en']
          }
        }
      });

      const text = res.text || '{}';
      return JSON.parse(text);
    } catch (err) {
      console.error("translateProductAI failed:", err);
      return {
        name_en: name,
        slug_en: (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description_en: description,
        seoarticle_en: seoarticle,
        seotitle_en: seoTitle || '',
        seodescription_en: seoDescription || '',
        keywords_en: keywords || ''
      };
    }
  }

  async function translatePageAI(ai: any, title: string, content: string, seoTitle: string, seoDescription: string) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Translate the following Indonesian custom page content and SEO attributes into natural English.
  CRITICAL: Maintain any lists, HTML tags, and references EXACTLY as in Indonesian.

  ORIGINAL PAGE CONTENT:
  Title: "${title}"
  Content: ${content}
  SEO Title: "${seoTitle || ''}"
  SEO Description: "${seoDescription || ''}"`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title_en: { type: Type.STRING },
              slug_en: { type: Type.STRING },
              content_en: { type: Type.STRING },
              seotitle_en: { type: Type.STRING },
              seodescription_en: { type: Type.STRING }
            },
            required: ['title_en', 'slug_en', 'content_en', 'seotitle_en', 'seodescription_en']
          }
        }
      });

      const text = res.text || '{}';
      return JSON.parse(text);
    } catch (err) {
      console.error("translatePageAI failed:", err);
      return {
        title_en: title,
        slug_en: (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content_en: content,
        seotitle_en: seoTitle || '',
        seodescription_en: seoDescription || ''
      };
    }
  }

  async function runDatabaseTranslationMigration() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("Translation migration skipped: GEMINI_API_KEY not configured.");
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    try {
      // 1. Migrate posts
      const { rows: unmigratedPosts } = await pool.query(
        "SELECT * FROM posts WHERE title_en IS NULL OR title_en = '' OR title_en = ' '"
      );
      if (unmigratedPosts.length > 0) {
        console.log(`Found ${unmigratedPosts.length} posts without English translation. Migrating via Gemini...`);
        for (const post of unmigratedPosts) {
          try {
            console.log(`Translating post: ${post.title}`);
            const trans = await translatePostAI(ai, post.title, post.content || '', post.seotitle || '', post.seodescription || '', post.keywords || '');
            if (trans) {
              await pool.query(
                `UPDATE posts SET title_en = $2, slug_en = $3, content_en = $4, seotitle_en = $5, seodescription_en = $6, keywords_en = $7 WHERE id = $1`,
                [post.id, trans.title_en, trans.slug_en, trans.content_en, trans.seotitle_en, trans.seodescription_en, trans.keywords_en]
              );
            }
          } catch (err) {
            console.error(`Failed to migrate post ${post.id}:`, err);
          }
        }
      }

      // 2. Migrate products
      const { rows: unmigratedProducts } = await pool.query(
        "SELECT * FROM products WHERE name_en IS NULL OR name_en = '' OR name_en = ' '"
      );
      if (unmigratedProducts.length > 0) {
        console.log(`Found ${unmigratedProducts.length} products without English translation. Migrating via Gemini...`);
        for (const prod of unmigratedProducts) {
          try {
            console.log(`Translating product: ${prod.name}`);
            const trans = await translateProductAI(ai, prod.name, prod.description || '', prod.seoarticle || '', prod.seotitle || '', prod.seodescription || '', prod.keywords || '');
            if (trans) {
              await pool.query(
                `UPDATE products SET name_en = $2, slug_en = $3, description_en = $4, seoarticle_en = $5, seotitle_en = $6, seodescription_en = $7, keywords_en = $8 WHERE id = $1`,
                [prod.id, trans.name_en, trans.slug_en, trans.description_en, trans.seoarticle_en, trans.seotitle_en, trans.seodescription_en, trans.keywords_en]
              );
            }
          } catch (err) {
            console.error(`Failed to migrate product ${prod.id}:`, err);
          }
        }
      }

      // 3. Migrate pages
      const { rows: unmigratedPages } = await pool.query(
        "SELECT * FROM pages WHERE title_en IS NULL OR title_en = '' OR title_en = ' '"
      );
      if (unmigratedPages.length > 0) {
        console.log(`Found ${unmigratedPages.length} pages without English translation. Migrating via Gemini...`);
        for (const page of unmigratedPages) {
          try {
            console.log(`Translating page: ${page.title}`);
            const trans = await translatePageAI(ai, page.title, page.content || '', page.seotitle || '', page.seodescription || '');
            if (trans) {
              await pool.query(
                `UPDATE pages SET title_en = $2, slug_en = $3, content_en = $4, seotitle_en = $5, seodescription_en = $6 WHERE id = $1`,
                [page.id, trans.title_en, trans.slug_en, trans.content_en, trans.seotitle_en, trans.seodescription_en]
              );
            }
          } catch (err) {
            console.error(`Failed to migrate page ${page.id}:`, err);
          }
        }
      }

      console.log("Bilingual dataset migration check complete.");
    } catch (err) {
      console.error("Database translation migration failed:", err);
    }
  }

  app.use(express.json());

  // AI Article Generator using Gemini API
  app.post('/api/posts/generate-ai', async (req, res) => {
    try {
      const { keyword, companyName, whatsappUrl } = req.body;
      if (!keyword) {
        return res.status(400).json({ error: 'Keyword utama harus diisi.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Server tidak terkonfigurasi dengan GEMINI_API_KEY.' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `Anda adalah penulis SEO profesional dan editor konten Google Search yang memahami SEO modern (2026), EEAT, Semantic SEO, Helpful Content, dan Search Intent.
Anda harus menggenerasi artikel berbahasa Indonesia yang matang, komprehensif, natural, menarik pembaca, dan sempurna untuk mesin pencari Google.`;

      const prompt = `Buat artikel komprehensif dengan rincian berikut:

KEYWORD UTAMA:
"${keyword}"

NAMA PERUSAHAAN:
"${companyName || 'PT Panca Prima Wijaya'}"

LINK WHATSAPP:
"${whatsappUrl || 'https://wa.me/6221xxxxxx'}"

PANJANG ARTIKEL:
- Minimal 2.000 kata (ideal 2.000-3.000 kata)
- Konten harus berbobot, detail, mengulas topik secara mendalam, informatif, natural, dan tidak ada kalimat yang bertele-tele atau pengulangan kata yang tidak perlu.

STRUKTUR SEO & HTML:
1. title (H1): Harus mengandung keyword utama, diletakkan sedekat mungkin ke awal judul (maksimal 60 karakter). Judul harus sangat menarik untuk meningkatkan CTR klik pencarian.
2. seoTitle (Meta Title): 50-60 karakter, mengandung keyword utama, persuasif untuk diklik.
3. seoDescription (Meta Description): 140-160 karakter, mengandung keyword utama dan menyertakan Call to Action (CTA) yang menarik.
4. slug (URL Slug): Slug URL yang pendek dan deskriptif, maksimal 8 kata, huruf kecil semua (lowercase), mengandung keyword utama, dipisahkan dengan tanda hubung (-) saja tanpa karakter khusus.
5. keywords (Focus Keyword): Tulis focus keyword utama secara tepat.
6. fullContent (Artikel Lengkap):
   - Artikel harus diawali dengan paragraf pembuka yang menarik (kurang dari 3 paragraf, keyword utama harus muncul dalam 100 kata pertama).
   - Minimal memiliki 6 Heading 2 (tag <h2>), yang tersebar merata di seluruh artikel. Salah satu Heading 2 harus menyertakan kata kunci utama.
   - Gunakan Heading 3 (tag <h3>) untuk rincian atau sublevel pembahasan di bawah H2.
   - Tulis secara mendalam dengan membaginya ke dalam paragraf pendek (maksimal 3 kalimat per paragraf) untuk kenyamanan baca (keterbacaan pengguna ponsel/mobile).
   - Gunakan bullet points (<ul> & <li>) atau numbering (<ol> & <li>) untuk list informasi yang relevan.
   - Buat minimal 1 TABEL DATA (tag <table>, <thead>, <tbody>, dll.) dengan visualisasi data numerik atau spesifikasi teknis industri yang relevan dengan topik ini.
   - Selipkan Call to Action (CTA) yang natural dan menarik untuk menghubungi Perusahaan ("${companyName || 'PT Panca Prima Wijaya'}") melalui link WhatsApp ("${whatsappUrl || 'https://wa.me/6221xxxxxx'}") di dua tempat:
     * 1) Di tengah-tengah pembahasan artikel (misalnya setelah H2 kedua atau ketiga).
     * 2) Di bagian penutup artikel sebagai paragraf penutup (yang berisi keyword utama secara alami).
   - EEAT (Experience, Expertise, Authoritativeness, Trustworthiness):
     * [Experience]: Berikan contoh proyek atau simulasi kasus operasional nyata di lapangan oleh tim teknisi profesional PT Panca Prima Wijaya yang relevan dengan keyword utama.
     * [Expertise]: Gunakan terminologi industri atau penjelasan metode teknis yang mendalam dan berbobot ilmiah.
     * [Authoritativeness]: Cantumkan fakta standar industri (seperti pedoman EPA, WHO, Kementerian Pertanian, dsb).
     * [Trustworthiness]: Hindari klaim bombastis yang berlebihan; sampaikan informasi secara transparan dan akurat.
   - SEMANTIC SEO: Sertakan kata kunci turunan, sinonim, istilah industri terkait, serta konsep-konsep seputar keyword utama guna membangun konteks yang komprehensif bagi mesin bot Google.
   - INTERNAL LINKING: Berikan minimal 5 rekomendasi internal link yang relevan dengan format tautan HTML lengkap (misal link ke layanan, produk, atau blog lain seperti: <a href="/layanan">Layanan Kami</a>, <a href="/tentang-kami">Tentang Kami</a>, <a href="/blog">Blog Utama</a>, atau slug produk/blog yang logis). Pastikan disisipkan secara natural ke dalam jalannya kalimat artikel.
   - EXTERNAL LINKING: Sediakan minimal 2 referensi eksternal otoritatif (misalnya link ke lembaga standar internasional/nasional, WHO atau jurnal akademis, dalam format tautan <a href="https://example.org" target="_blank" rel="noopener noreferrer">) untuk meningkatkan kredibilitas artikel di mata Google.
   - FAQ: Sisipkan minimal 5 daftar FAQ (Frequently Asked Questions) di bagian akhir artikel, menggunakan struktur heading <h3> untuk pertanyaan dan paragraf untuk jawaban yang komprehensif.

Keluaran atau output dari model HARUS berupa objek JSON utuh yang bersih sesuai dengan skema JSON berikut (tidak mengandung teks pendahuluan atau penutup di luar blok JSON, murni JSON):
{
  "title": "...",
  "seoTitle": "...",
  "seoDescription": "...",
  "slug": "...",
  "keywords": "...",
  "fullContent": "..."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              seoTitle: { type: Type.STRING },
              seoDescription: { type: Type.STRING },
              slug: { type: Type.STRING },
              keywords: { type: Type.STRING },
              fullContent: { type: Type.STRING }
            },
            required: ['title', 'seoTitle', 'seoDescription', 'slug', 'keywords', 'fullContent']
          }
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error('Tidak ada respon teks dari model AI.');
      }

      const articleData = JSON.parse(resultText);
      res.json(articleData);
    } catch (e: any) {
      console.error('Error generating AI article:', e);
      res.status(500).json({ error: e.message || 'Gagal menghasilkan artikel dengan AI.' });
    }
  });

  // Dynamic Translation API powered by Gemini Flash
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, targetLang } = req.body;
      if (!text || text.trim() === '') {
        return res.json({ translatedText: '' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ translatedText: text, notice: 'No API key configured' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert content translator. Translate the following text into natural, professional ${targetLang || 'English'} suitable for web display.
CRITICAL:
1. Preserve all HTML structure, inline styles, IDs, anchor attributes (<a href="...">), and tags EXACTLY.
2. Only translate the human-readable text contents. Do not translate URL coordinates or path parameters (e.g. keep "/sensor" as "/sensor" or change according to local language path if it matches custom routes).
3. Do not wrap the output in markdown code blocks like \`\`\`html. Return ONLY the translated content.
4. Maintain exact formatting, line breaks, and whitespace.

Text to translate:
${text}`
      });

      const resultText = response.text || '';
      res.json({ translatedText: resultText.trim() });
    } catch (e: any) {
      console.error('Error in translate API:', e);
      res.status(500).json({ error: e.message || 'Translation failed' });
    }
  });

  // API Settings & Page Builder
  app.get('/api/settings/home', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT value FROM settings WHERE key = $1', ['home']);
      if (rows.length > 0) {
        res.json(rows[0].value);
      } else {
        // Fallback default
        res.json({ 
          seoTitle: 'PT Panca Prima Wijaya | Pest Control & EWS Monitoring', 
          seoDescription: '', 
          seoImage: '', 
          blocks: [] 
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.put('/api/settings/home', async (req, res) => {
    try {
      const { rows } = await pool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2 RETURNING value',
        ['home', req.body]
      );
      res.json(rows[0].value);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.get('/api/settings/:key', async (req, res) => {
    try {
      if (req.params.key === 'home') return;
      const { rows } = await pool.query('SELECT value FROM settings WHERE key = $1', [req.params.key]);
      if (rows.length > 0) {
        res.json(rows[0].value);
      } else {
        res.json({});
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.put('/api/settings/:key', async (req, res) => {
    try {
      if (req.params.key === 'home') return;
      const { rows } = await pool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2 RETURNING value',
        [req.params.key, req.body]
      );
      res.json(rows[0].value);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // API Categoriess
  app.get('/api/categories/:type', async (req, res) => {
    try {
      const type = req.params.type;
      let query = '';
      if (type === 'posts') query = "SELECT DISTINCT category FROM posts WHERE category IS NOT NULL AND category != ''";
      else if (type === 'products') query = "SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != ''";
      else if (type === 'pages') query = "SELECT DISTINCT category FROM pages WHERE category IS NOT NULL AND category != ''";
      else return res.status(400).json({ error: 'Invalid type' });
      
      const { rows } = await pool.query(query);
      const allCats = new Set<string>();
      rows.forEach(r => {
        if (r.category) {
            r.category.split(',').forEach((c: string) => {
                const trimmed = c.trim();
                if(trimmed) allCats.add(trimmed);
            });
        }
      });
      res.json(Array.from(allCats));
    } catch(e) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  // API Routes Posts
  app.get('/api/posts', async (req, res) => {
    try {
      const site = req.query.site;
      let query = 'SELECT * FROM posts ORDER BY "createdat" DESC';
      let values: any[] = [];
      if (site) {
        query = 'SELECT * FROM posts WHERE site = $1 ORDER BY "createdat" DESC';
        values = [site];
      }
      const { rows } = await pool.query(query, values);
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.get('/api/posts/:identifier', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 OR slug_en = $1 OR id = $1', [req.params.identifier]);
      rows.length > 0 ? res.json(rows[0]) : res.status(404).json({ error: 'Post Not found' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.post('/api/posts', async (req, res) => {
    try {
      const id = 'P-' + Date.now().toString();
      const b = req.body;

      let title_en = '';
      let slug_en = '';
      let content_en = '';
      let seotitle_en = '';
      let seodescription_en = '';
      let keywords_en = '';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });
          const trans = await translatePostAI(ai, b.title, b.content || '', b.seoTitle || b.seotitle || '', b.seoDescription || b.seodescription || '', b.keywords || '');
          title_en = trans.title_en;
          slug_en = trans.slug_en;
          content_en = trans.content_en;
          seotitle_en = trans.seotitle_en;
          seodescription_en = trans.seodescription_en;
          keywords_en = trans.keywords_en;
        } catch (err) {
          console.error("Write-time post translation failed:", err);
        }
      }

      const { rows } = await pool.query(
        'INSERT INTO posts (id, title, slug, content, seotitle, seodescription, keywords, featuredimage, site, canonical, robots, ogtitle, ogdescription, ogimage, twittercard, category, status, title_en, slug_en, content_en, seotitle_en, seodescription_en, keywords_en) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *',
        [id, b.title, b.slug, b.content, b.seoTitle, b.seoDescription, b.keywords, b.featuredImage, b.site, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish', title_en, slug_en, content_en, seotitle_en, seodescription_en, keywords_en]
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.put('/api/posts/:id', async (req, res) => {
    try {
      const b = req.body;

      let title_en = b.title_en || '';
      let slug_en = b.slug_en || '';
      let content_en = b.content_en || '';
      let seotitle_en = b.seotitle_en || '';
      let seodescription_en = b.seodescription_en || '';
      let keywords_en = b.keywords_en || '';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && !title_en) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });
          const trans = await translatePostAI(ai, b.title, b.content || '', b.seoTitle || b.seotitle || '', b.seoDescription || b.seodescription || '', b.keywords || '');
          title_en = trans.title_en;
          slug_en = trans.slug_en;
          content_en = trans.content_en;
          seotitle_en = trans.seotitle_en;
          seodescription_en = trans.seodescription_en;
          keywords_en = trans.keywords_en;
        } catch (err) {
          console.error("Write-time post update translation failed:", err);
        }
      }

      const { rows } = await pool.query(
        'UPDATE posts SET title = $2, slug = $3, content = $4, seotitle = $5, seodescription = $6, keywords = $7, featuredimage = $8, site = $9, canonical = $10, robots = $11, ogtitle = $12, ogdescription = $13, ogimage = $14, twittercard = $15, category = $16, status = $17, title_en = $18, slug_en = $19, content_en = $20, seotitle_en = $21, seodescription_en = $22, keywords_en = $23, updatedat = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [req.params.id, b.title, b.slug, b.content, b.seoTitle, b.seoDescription, b.keywords, b.featuredImage, b.site, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish', title_en, slug_en, content_en, seotitle_en, seodescription_en, keywords_en]
      );
      rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.delete('/api/posts/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // Pages API
  app.get('/api/pages', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM pages ORDER BY createdat DESC');
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.get('/api/pages/:identifier', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM pages WHERE id = $1 OR slug = $1 OR slug_en = $1 LIMIT 1', [req.params.identifier]);
      rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.post('/api/pages', async (req, res) => {
    try {
      const id = 'PG-' + Date.now().toString();
      const b = req.body;

      let title_en = '';
      let slug_en = '';
      let content_en = '';
      let seotitle_en = '';
      let seodescription_en = '';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });
          const trans = await translatePageAI(ai, b.title, b.content || '', b.seotitle || '', b.seodescription || '');
          title_en = trans.title_en;
          slug_en = trans.slug_en;
          content_en = trans.content_en;
          seotitle_en = trans.seotitle_en;
          seodescription_en = trans.seodescription_en;
        } catch (err) {
          console.error("Write-time page translation failed:", err);
        }
      }

      const { rows } = await pool.query(
        'INSERT INTO pages (id, title, slug, content, seotitle, seodescription, image, canonical, robots, ogtitle, ogdescription, ogimage, twittercard, category, status, title_en, slug_en, content_en, seotitle_en, seodescription_en) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *',
        [id, b.title, b.slug, b.content, b.seotitle, b.seodescription, b.image, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish', title_en, slug_en, content_en, seotitle_en, seodescription_en]
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.put('/api/pages/:id', async (req, res) => {
    try {
      const b = req.body;

      let title_en = b.title_en || '';
      let slug_en = b.slug_en || '';
      let content_en = b.content_en || '';
      let seotitle_en = b.seotitle_en || '';
      let seodescription_en = b.seodescription_en || '';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && !title_en) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });
          const trans = await translatePageAI(ai, b.title, b.content || '', b.seotitle || '', b.seodescription || '');
          title_en = trans.title_en;
          slug_en = trans.slug_en;
          content_en = trans.content_en;
          seotitle_en = trans.seotitle_en;
          seodescription_en = trans.seodescription_en;
        } catch (err) {
          console.error("Write-time page update translation failed:", err);
        }
      }

      const { rows } = await pool.query(
        'UPDATE pages SET title = $2, slug = $3, content = $4, seotitle = $5, seodescription = $6, image = $7, canonical = $8, robots = $9, ogtitle = $10, ogdescription = $11, ogimage = $12, twittercard = $13, category = $14, status = $15, title_en = $16, slug_en = $17, content_en = $18, seotitle_en = $19, seodescription_en = $20, updatedat = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [req.params.id, b.title, b.slug, b.content, b.seotitle, b.seodescription, b.image, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish', title_en, slug_en, content_en, seotitle_en, seodescription_en]
      );
      rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.delete('/api/pages/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM pages WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // API Routes Products
  app.get('/api/products', async (req, res) => {
    try {
      const site = req.query.site;
      let query = 'SELECT * FROM products ORDER BY "createdat" DESC';
      let values: any[] = [];
      if (site) {
        query = 'SELECT * FROM products WHERE site = $1 ORDER BY "createdat" DESC';
        values = [site];
      }
      const { rows } = await pool.query(query, values);
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.get('/api/products/:identifier', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM products WHERE slug = $1 OR slug_en = $1 OR id = $1', [req.params.identifier]);
      rows.length > 0 ? res.json(rows[0]) : res.status(404).json({ error: 'Product Not found' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const id = 'PROD-' + Date.now().toString();
      const b = req.body;

      let name_en = '';
      let slug_en = '';
      let description_en = '';
      let seoarticle_en = '';
      let seotitle_en = '';
      let seodescription_en = '';
      let keywords_en = '';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });
          const trans = await translateProductAI(ai, b.name, b.description || '', b.seoArticle || b.seoarticle || '', b.seoTitle || b.seotitle || '', b.seoDescription || b.seodescription || '', b.keywords || '');
          name_en = trans.name_en;
          slug_en = trans.slug_en;
          description_en = trans.description_en;
          seoarticle_en = trans.seoarticle_en;
          seotitle_en = trans.seotitle_en;
          seodescription_en = trans.seodescription_en;
          keywords_en = trans.keywords_en;
        } catch (err) {
          console.error("Write-time product translation failed:", err);
        }
      }

      const { rows } = await pool.query(
        'INSERT INTO products (id, name, slug, price, category, image, gallery, description, seoarticle, seotitle, seodescription, keywords, site, name_en, slug_en, description_en, seoarticle_en, seotitle_en, seodescription_en, keywords_en, gtin, mpn, brand, condition) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING *',
        [id, b.name, b.slug, b.price, b.category, b.image, JSON.stringify(b.gallery || []), b.description, b.seoArticle, b.seoTitle, b.seoDescription, b.keywords, b.site, name_en, slug_en, description_en, seoarticle_en, seotitle_en, seodescription_en, keywords_en, b.gtin || '', b.mpn || '', b.brand || 'PT Panca Prima Wijaya', b.condition || 'new']
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.put('/api/products/:id', async (req, res) => {
    try {
      const b = req.body;

      let name_en = b.name_en || '';
      let slug_en = b.slug_en || '';
      let description_en = b.description_en || '';
      let seoarticle_en = b.seoarticle_en || '';
      let seotitle_en = b.seotitle_en || '';
      let seodescription_en = b.seodescription_en || '';
      let keywords_en = b.keywords_en || '';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && !name_en) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });
          const trans = await translateProductAI(ai, b.name, b.description || '', b.seoArticle || b.seoarticle || '', b.seoTitle || b.seotitle || '', b.seoDescription || b.seodescription || '', b.keywords || '');
          name_en = trans.name_en;
          slug_en = trans.slug_en;
          description_en = trans.description_en;
          seoarticle_en = trans.seoarticle_en;
          seotitle_en = trans.seotitle_en;
          seodescription_en = trans.seodescription_en;
          keywords_en = trans.keywords_en;
        } catch (err) {
          console.error("Write-time product update translation failed:", err);
        }
      }

      const { rows } = await pool.query(
        'UPDATE products SET name = $2, slug = $3, price = $4, category = $5, image = $6, gallery = $7, description = $8, seoarticle = $9, seotitle = $10, seodescription = $11, keywords = $12, site = $13, name_en = $14, slug_en = $15, description_en = $16, seoarticle_en = $17, seotitle_en = $18, seodescription_en = $19, keywords_en = $20, gtin = $21, mpn = $22, brand = $23, condition = $24, updatedat = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [req.params.id, b.name, b.slug, b.price, b.category, b.image, JSON.stringify(b.gallery || []), b.description, b.seoArticle, b.seoTitle, b.seoDescription, b.keywords, b.site, name_en, slug_en, description_en, seoarticle_en, seotitle_en, seodescription_en, keywords_en, b.gtin || '', b.mpn || '', b.brand || 'PT Panca Prima Wijaya', b.condition || 'new']
      );
      rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Not found' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.delete('/api/products/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // GET all orders mapped robustly
  app.get('/api/orders', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM orders ORDER BY "createdat" DESC');
      const mappedOrders = rows.map(r => ({
        id: r.id,
        date: r.createdat,
        total: parseFloat(r.total),
        status: r.status,
        customer: typeof r.customer === 'string' ? JSON.parse(r.customer) : r.customer,
        items: typeof r.items === 'string' ? JSON.parse(r.items) : r.items
      }));
      res.json(mappedOrders);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // GET single order details
  app.get('/api/orders/:id', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const order = rows[0];
      res.json({
        id: order.id,
        total: parseFloat(order.total),
        status: order.status,
        customer: typeof order.customer === 'string' ? JSON.parse(order.customer) : order.customer,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
        date: order.createdat
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // POST new order with DOKU redirection / simulation logic
  app.post('/api/orders', async (req, res) => {
    try {
      const id = 'ORD-' + Date.now().toString();
      const b = req.body;
      const amount = Math.round(Number(b.total) || 0);

      const clientId = process.env.DOKU_CLIENT_ID;
      const secretKey = process.env.DOKU_SECRET_KEY;
      const isProduction = process.env.DOKU_IS_PRODUCTION === 'true';
      const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;

      let redirectUrl = `${baseUrl}/checkout/simulated-doku/${id}`;
      let isSimulated = true;
      let dbStatus = 'Awaiting Payment - DOKU Sandbox';

      // If DOKU keys are configured, make a real API request to Jokul Checkout API
      if (clientId && secretKey) {
        try {
          const endpoint = isProduction 
            ? 'https://api.doku.com/checkout/v1/payment'
            : 'https://api-sandbox.doku.com/checkout/v1/payment';
          
          const requestTarget = '/checkout/v1/payment';
          const invoiceNumber = `INV-${id}`;

          const requestBody = {
            order: {
              amount: amount,
              invoice_number: invoiceNumber,
              currency: 'IDR',
              callback_url: `${baseUrl}/api/doku/callback`,
              line_items: b.items.map((i: any) => ({
                name: `Product ID: ${i.productId}`,
                price: Math.round(amount / (b.items.length || 1)),
                quantity: Number(i.quantity) || 1
              }))
            },
            customer: {
              name: b.customer?.name || 'Customer',
              email: b.customer?.email || 'customer@example.com'
            }
          };

          const rawBody = JSON.stringify(requestBody);
          const digest = crypto.createHash('sha256').update(rawBody).digest('base64');
          
          const requestId = 'REQ-' + Date.now().toString() + '-' + Math.floor(Math.random() * 1000);
          const requestTimestamp = new Date().toISOString().slice(0, 19) + 'Z'; // YYYY-MM-DDTHH:mm:ssZ
          
          const stringToSign = `Client-Id:${clientId}\n` +
                               `Request-Id:${requestId}\n` +
                               `Request-Timestamp:${requestTimestamp}\n` +
                               `Request-Target:${requestTarget}\n` +
                               `Digest:${digest}`;
                               
          const signatureVal = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('base64');

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Client-Id': clientId,
              'Request-Id': requestId,
              'Request-Timestamp': requestTimestamp,
              'Signature': `HMACSHA256=${signatureVal}`,
              'Content-Type': 'application/json'
            },
            body: rawBody
          });

          if (response.ok) {
            const resData: any = await response.json();
            if (resData?.response?.payment?.url) {
              redirectUrl = resData.response.payment.url;
              isSimulated = false;
              dbStatus = 'Awaiting Payment - DOKU Real Gateway';
              console.log(`[DOKU API SUCCESS] Redirect URL generated for ${id}: ${redirectUrl}`);
            } else {
              console.error('DOKU response parsing failed or omitted payment URL:', resData);
            }
          } else {
            const errText = await response.text();
            console.error('DOKU API Error response status:', response.status, 'Body:', errText);
          }
        } catch (apiErr) {
          console.error('Critical warning: Failing communication with external DOKU API, falling back to simulator:', apiErr);
        }
      }

      // Save order to Postgres DB
      const { rows } = await pool.query(
        'INSERT INTO orders (id, customer, items, total, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, JSON.stringify(b.customer), JSON.stringify(b.items), amount, dbStatus]
      );

      console.log(`[PUSH NOTIF] New order ${id} logged with status: ${dbStatus}`);
      res.status(201).json({
        ...rows[0],
        paymentUrl: redirectUrl,
        isSimulated: isSimulated
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // POST DOKU simulating success pay
  app.post('/api/doku/simulate-success', async (req, res) => {
    try {
      const { orderId } = req.body;
      const { rowCount } = await pool.query(
        "UPDATE orders SET status = 'Paid - Verified via DOKU' WHERE id = $1",
        [orderId]
      );
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      console.log(`[PUSH NOTIF] Automated simulation webhook processed successfully for order ${orderId}`);
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB / Simulator Error' });
    }
  });

  // POST DOKU real webhook callback listener
  app.post('/api/doku/callback', async (req, res) => {
    try {
      const notification = req.body;
      console.log('Received authentic DOKU payment notification webhook:', notification);

      // Verify the signature if DOKU Secret Key is present
      const secretKey = process.env.DOKU_SECRET_KEY;
      const merchantSignature = req.headers['signature'];
      
      let isValidSignature = true;

      if (secretKey && merchantSignature) {
        // Construct notification signature validation string style
        const notifyBodyRaw = JSON.stringify(notification);
        const digest = crypto.createHash('sha256').update(notifyBodyRaw).digest('base64');
        
        const timestampHeader = req.headers['request-timestamp'];
        const idHeader = req.headers['request-id'];
        const clientIdHeader = req.headers['client-id'];
        
        const stringToSign = `Client-Id:${clientIdHeader}\n` +
                             `Request-Id:${idHeader}\n` +
                             `Request-Timestamp:${timestampHeader}\n` +
                             `Request-Target:/api/doku/callback\n` +
                             `Digest:${digest}`;
                             
        const computedSig = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('base64');
        const expectedSignature = `HMACSHA256=${computedSig}`;
        
        if (merchantSignature !== expectedSignature) {
          console.warn('DOKU signature validation mismatch! Received:', merchantSignature, 'Expected:', expectedSignature);
          isValidSignature = false;
        }
      }

      if (!isValidSignature) {
        return res.status(400).send('Invalid Signature');
      }

      // Process payment details
      const invoiceNumber = notification?.order?.invoice_number;
      const transactionStatus = notification?.transaction?.status;

      if (invoiceNumber && (transactionStatus === 'SUCCESS' || transactionStatus === 'Paid')) {
        // Find corresponding Order ID
        // invoiceNumber matches our format `INV-${id}` where id starts with `ORD-`
        const orderId = invoiceNumber.substring(4); // trim 'INV-' prefix
        
        const { rowCount } = await pool.query(
          "UPDATE orders SET status = 'Paid - Verified via DOKU' WHERE id = $1",
          [orderId]
        );
        if (rowCount > 0) {
          console.log(`[DOKU SUCCESS WEBHOOK] Marked order ${orderId} as successfully paid!`);
        }
      }

      res.status(200).send('OK');
    } catch (e) {
      console.error('DOKU webhook engine caught an issue:', e);
      res.status(500).send('Notification processing failed');
    }
  });

  app.get('/api/analytics', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT SUM(pageviews) as views FROM analytics'); // basic placeholder
      res.json({ 
        pageViews: parseInt(rows[0]?.views || '0'), 
        uniqueVisitors: 0, 
        recentTraffic: [],
        topProducts: []
      });
    } catch (e) {
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.get('/api/scripts', async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      const query = activeOnly 
        ? 'SELECT * FROM scripts WHERE is_active = true ORDER BY createdat ASC'
        : 'SELECT * FROM scripts ORDER BY createdat DESC';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.post('/api/scripts', async (req, res) => {
    try {
      const { name, code, location, is_active } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO scripts (name, code, location, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, code, location, is_active !== false]
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.put('/api/scripts/:id', async (req, res) => {
    try {
      const { name, code, location, is_active } = req.body;
      const { rows } = await pool.query(
        'UPDATE scripts SET name=$1, code=$2, location=$3, is_active=$4, updatedat=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *',
        [name, code, location, is_active !== false, req.params.id]
      );
      res.json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.delete('/api/scripts/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM scripts WHERE id = $1', [req.params.id]);
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  // Image Upload Setup
  const uploadDir = path.join(process.cwd(), 'img');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  // Serve the img directory statically
  app.use('/img', express.static(uploadDir));

  const upload = multer({ storage: multer.memoryStorage() });

  app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }

      const fileNameWithoutExt = path.parse(req.file.originalname).name;
      const safeFileName = fileNameWithoutExt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const newFileName = `${safeFileName}-${Date.now()}.webp`;
      const outputPath = path.join(uploadDir, newFileName);

      await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath);

      res.json({ 
        success: true, 
        message: 'Image uploaded and converted to WebP', 
        url: `/img/${newFileName}` 
      });
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  });

  app.get('/api/media', (req, res) => {
    try {
      if (!fs.existsSync(uploadDir)) {
        return res.json([]);
      }
      const files = fs.readdirSync(uploadDir);
      const images = files.filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')).map(f => `/img/${f}`);
      res.json(images);
    } catch (error) {
      console.error('Error reading media:', error);
      res.status(500).json({ error: 'Failed to read media' });
    }
  });

  app.get('/sitemap.xsl', (req, res) => {
    res.header('Content-Type', 'text/xsl');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:custom="http://pancaprimawijaya.com/custom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size: 14px; margin: 0; color: #333; background-color: #f5f6f8; }
          #header { background-color: #0d1b2a; color: #fff; padding: 40px; }
          #header h1 { margin: 0 0 15px 0; font-size: 24px; font-weight: 700; }
          #header p { margin: 0 0 10px 0; font-size: 13px; color: #e1e1e1; font-weight: 400; }
          #header a { color: #fff; text-decoration: underline; }
          #content { padding: 40px; background-color: #fff; margin: 0 auto; min-height: 500px; }
          .breadcrumb { font-size: 14px; font-weight: 500; margin-bottom: 25px; color: #222; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th { text-align: left; padding: 15px 10px; font-weight: 600; color: #222; border-bottom: 1px solid #e2e8f0; }
          td { padding: 15px 10px; border-bottom: 1px solid #e2e8f0; color: #475569; }
          tr:nth-child(even) td { background-color: #f8fafc; }
          td a { color: #2563eb; text-decoration: underline; }
          td a:hover { color: #1d4ed8; }
        </style>
      </head>
      <body>
        <div id="header">
          <h1>Sitemap</h1>
          <p>Dibuat oleh <strong>PT Panca Prima Wijaya atau SensorGempa</strong>, ini adalah Sitemap XML, dimaksudkan untuk dikonsumsi oleh mesin pencari seperti Google atau Bing.</p>
          <p>Anda dapat menemukan informasi lebih lanjut tentang sitemap XML di <a href="https://sitemaps.org" target="_blank">sitemaps.org</a>.</p>
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <p>Indeks sitemap berisi <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong> sitemap dan dibuat pada <script>document.write(new Date().toLocaleString('id-ID', {day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}));</script></p>
            </xsl:when>
            <xsl:otherwise>
              <p>Sitemap berisi <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URL dan dibuat pada <script>document.write(new Date().toLocaleString('id-ID', {day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}));</script></p>
            </xsl:otherwise>
          </xsl:choose>
        </div>
        <div id="content">
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <div class="breadcrumb">Beranda &#8250; <strong>Sitemap Index</strong></div>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>URL Count</th>
                    <th>Terakhir Diperbarui</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td>
                        <xsl:variable name="itemURL"><xsl:value-of select="sitemap:loc"/></xsl:variable>
                        <a href="{$itemURL}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td><xsl:value-of select="custom:count"/></td>
                      <td>
                        <xsl:value-of select="substring-before(sitemap:lastmod, 'T')"/> <xsl:text> </xsl:text> <xsl:value-of select="substring(substring-after(sitemap:lastmod, 'T'), 1, 5)"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
            <xsl:otherwise>
              <div class="breadcrumb">Beranda &#8250; Sitemap Index &#8250; <strong>Sitemap</strong></div>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Terakhir Diperbarui</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <xsl:variable name="itemURL"><xsl:value-of select="sitemap:loc"/></xsl:variable>
                        <a href="{$itemURL}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td>
                        <xsl:if test="sitemap:lastmod">
                          <xsl:value-of select="substring-before(sitemap:lastmod, 'T')"/> <xsl:text> </xsl:text> <xsl:value-of select="substring(substring-after(sitemap:lastmod, 'T'), 1, 5)"/>
                        </xsl:if>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:otherwise>
          </xsl:choose>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`);
  });

  const generateUrlset = (urls: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('')}
</urlset>`.trim();

  // --- SENSOR SITEMAPS ---
  app.get(['/sensor/page-sitemap.xml', '/en/sensor/page-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    const urls = [
      `${baseUrl}${pfx}/sensor`,
      `${baseUrl}${pfx}/sensor/produk`,
      `${baseUrl}${pfx}/sensor/building-management-system`,
      `${baseUrl}${pfx}/sensor/early-warning-system`,
      `${baseUrl}${pfx}/sensor/real-time-monitoring-system-rtms`,
      `${baseUrl}${pfx}/sensor/sensor-gempa`,
      `${baseUrl}${pfx}/sensor/sparepart-lift-terlengkap`
    ];
    try {
      const { rows } = await pool.query('SELECT slug, slug_en FROM pages');
      urls.push(...rows.map(r => `${baseUrl}${pfx}/${isEn && r.slug_en ? r.slug_en : r.slug}`));
    } catch (e) {}
    res.header('Content-Type', 'application/xml');
    res.send(generateUrlset(urls));
  });

  app.get(['/sensor/produk-sitemap.xml', '/en/sensor/produk-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    try {
      const { rows } = await pool.query("SELECT slug, slug_en FROM products WHERE site = 'sensor' OR category ILIKE '%sensor%'");
      const urls = rows.map(r => `${baseUrl}${pfx}/sensor/produk/${isEn && r.slug_en ? r.slug_en : r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get(['/sensor/blog-sitemap.xml', '/en/sensor/blog-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    try {
      const { rows } = await pool.query('SELECT slug, slug_en FROM posts');
      const urls = rows.map(r => `${baseUrl}${pfx}/blog/${isEn && r.slug_en ? r.slug_en : r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get(['/sensor/kategori-sitemap.xml', '/en/sensor/kategori-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    try {
      const { rows: postCats } = await pool.query("SELECT category FROM posts WHERE category IS NOT NULL AND category != ''");
      const { rows: pageCats } = await pool.query("SELECT category FROM pages WHERE category IS NOT NULL AND category != ''");
      const { rows: prodCats } = await pool.query("SELECT category FROM products WHERE category IS NOT NULL AND category != '' AND (site = 'sensor' OR category ILIKE '%sensor%')");
      
      const allCats = new Set();
      [...postCats, ...pageCats, ...prodCats].forEach(r => {
        if (r.category) r.category.split(',').forEach((c: string) => allCats.add(c.trim()));
      });
      allCats.delete('');
      
      const urls = Array.from(allCats).map(c => `${baseUrl}${pfx}/sensor/kategori/${encodeURIComponent(c as string)}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  // --- PANCA SITEMAPS ---
  app.get(['/panca/page-sitemap.xml', '/en/panca/page-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    const urls = [
      `${baseUrl}${pfx === '' ? '/' : pfx}`,
      `${baseUrl}${pfx}/panca`,
      `${baseUrl}${pfx}/panca/produk`,
      `${baseUrl}${pfx}/katalog`,
      `${baseUrl}${pfx}/blog`,
      `${baseUrl}${pfx}/layanan`,
      `${baseUrl}${pfx}/tentang-kami`
    ];
    try {
      const { rows } = await pool.query('SELECT slug, slug_en FROM pages');
      urls.push(...rows.map(r => `${baseUrl}${pfx}/${isEn && r.slug_en ? r.slug_en : r.slug}`));
    } catch (e) {}
    res.header('Content-Type', 'application/xml');
    res.send(generateUrlset(urls));
  });

  app.get(['/panca/produk-sitemap.xml', '/en/panca/produk-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    try {
      const { rows } = await pool.query("SELECT slug, slug_en FROM products WHERE site = 'panca' OR site IS NULL");
      const urls = rows.map(r => `${baseUrl}${pfx}/panca/produk/${isEn && r.slug_en ? r.slug_en : r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get(['/panca/blog-sitemap.xml', '/en/panca/blog-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    try {
      const { rows } = await pool.query('SELECT slug, slug_en FROM posts');
      const urls = rows.map(r => `${baseUrl}${pfx}/blog/${isEn && r.slug_en ? r.slug_en : r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get(['/panca/kategori-sitemap.xml', '/en/panca/kategori-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    try {
      const { rows: postCats } = await pool.query("SELECT category FROM posts WHERE category IS NOT NULL AND category != ''");
      const { rows: pageCats } = await pool.query("SELECT category FROM pages WHERE category IS NOT NULL AND category != ''");
      const { rows: prodCats } = await pool.query("SELECT category FROM products WHERE category IS NOT NULL AND category != '' AND (site = 'panca' OR site IS NULL)");
      
      const allCats = new Set();
      [...postCats, ...pageCats, ...prodCats].forEach(r => {
        if (r.category) r.category.split(',').forEach((c: string) => allCats.add(c.trim()));
      });
      allCats.delete('');
      
      const urls = Array.from(allCats).map(c => `${baseUrl}${pfx}/panca/kategori/${encodeURIComponent(c as string)}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  // --- INDEX SITEMAPS ---
  app.get(['/sensor-sitemap.xml', '/en/sensor-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    let productCount = 0;
    let postCount = 0;
    let pageCount = 0;
    let catCount = 0;
    
    try {
      const [{rows: pC}, {rows: pR}, {rows: pgR}] = await Promise.all([
         pool.query("SELECT count(*) as c FROM products WHERE site = 'sensor' OR category ILIKE '%sensor%'"),
         pool.query('SELECT count(*) as c FROM posts'),
         pool.query('SELECT count(*) as c FROM pages')
      ]);
      productCount = parseInt(pC[0].c, 10);
      postCount = parseInt(pR[0].c, 10);
      pageCount = parseInt(pgR[0].c, 10);

      const { rows: postCats } = await pool.query("SELECT category FROM posts WHERE category IS NOT NULL AND category != ''");
      const { rows: pageCats } = await pool.query("SELECT category FROM pages WHERE category IS NOT NULL AND category != ''");
      const { rows: prodCats } = await pool.query("SELECT category FROM products WHERE category IS NOT NULL AND category != '' AND (site = 'sensor' OR category ILIKE '%sensor%')");
      const allCats = new Set();
      [...postCats, ...pageCats, ...prodCats].forEach(r => {
        if (r.category) r.category.split(',').forEach((c: string) => allCats.add(c.trim()));
      });
      allCats.delete('');
      catCount = allCats.size;
    } catch(e) {}

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:custom="http://pancaprimawijaya.com/custom">
        <sitemap>
          <loc>${baseUrl}${pfx}/sensor/page-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${7 + pageCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}${pfx}/sensor/blog-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${postCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}${pfx}/sensor/produk-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${productCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}${pfx}/sensor/kategori-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${catCount}</custom:count>
        </sitemap>
      </sitemapindex>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
  });

  app.get(['/panca-sitemap.xml', '/en/panca-sitemap.xml'], async (req, res) => {
    const isEn = req.path.startsWith('/en');
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const pfx = isEn ? '/en' : '';
    let productCount = 0;
    let postCount = 0;
    let pageCount = 0;
    let catCount = 0;
    
    try {
      const [{rows: pC}, {rows: pR}, {rows: pgR}] = await Promise.all([
         pool.query("SELECT count(*) as c FROM products WHERE site = 'panca' OR site IS NULL"),
         pool.query('SELECT count(*) as c FROM posts'),
         pool.query('SELECT count(*) as c FROM pages')
      ]);
      productCount = parseInt(pC[0].c, 10);
      postCount = parseInt(pR[0].c, 10);
      pageCount = parseInt(pgR[0].c, 10);

      const { rows: postCats } = await pool.query("SELECT category FROM posts WHERE category IS NOT NULL AND category != ''");
      const { rows: pageCats } = await pool.query("SELECT category FROM pages WHERE category IS NOT NULL AND category != ''");
      const { rows: prodCats } = await pool.query("SELECT category FROM products WHERE category IS NOT NULL AND category != '' AND (site = 'panca' OR site IS NULL)");
      const allCats = new Set();
      [...postCats, ...pageCats, ...prodCats].forEach(r => {
        if (r.category) r.category.split(',').forEach((c: string) => allCats.add(c.trim()));
      });
      allCats.delete('');
      catCount = allCats.size;
    } catch(e) {}

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:custom="http://pancaprimawijaya.com/custom">
        <sitemap>
          <loc>${baseUrl}${pfx}/panca/page-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${7 + pageCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}${pfx}/panca/blog-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${postCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}${pfx}/panca/produk-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${productCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}${pfx}/panca/kategori-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${catCount}</custom:count>
        </sitemap>
      </sitemapindex>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
  });
  
  app.get('/google-merchant.xsl', (req, res) => {
    res.header('Content-Type', 'text/xsl');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:g="http://base.google.com/ns/1.0">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Google Merchant XML Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; color: #333; background-color: #f8fafc; }
          #header { background-color: #1e293b; color: #fff; padding: 40px; border-bottom: 4px solid #f97316; }
          #header h1 { margin: 0 0 10px 0; font-size: 26px; font-weight: 850; letter-spacing: -0.025em; display: flex; align-items: center; gap: 10px; }
          #header p { margin: 0 0 10px 0; font-size: 14px; color: #cbd5e1; line-height: 1.5; }
          #header a { color: #f97316; text-decoration: none; font-weight: 600; }
          #header a:hover { text-decoration: underline; }
          #content { padding: 40px; background-color: #fff; max-w: 1450px; margin: 0 auto; min-height: 500px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
          .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
          .badge-orange { background-color: #ffedd5; color: #ea580c; border: 1px solid #fed7aa; }
          .badge-blue { background-color: #dbeafe; color: #2563eb; border: 1px solid #bfdbfe; }
          .badge-green { background-color: #dcfce7; color: #16a34a; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 20px; }
          th { text-align: left; padding: 14px 12px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #e2e8f0; background-color: #f1f5f9; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
          td { padding: 16px 12px; border-bottom: 1px solid #cbd5e1; color: #334155; vertical-align: top; }
          tr:hover td { background-color: #f8fafc; }
          .prod-img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; }
          .prod-title { font-weight: 800; color: #1e293b; font-size: 14px; text-decoration: none; display: block; margin-bottom: 4px; }
          .prod-title:hover { color: #2563eb; text-decoration: underline; }
          .prod-desc { font-size: 11px; color: #64748b; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
          .price-tag { font-family: monospace; font-weight: 700; color: #0f172a; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: inline-block; }
        </style>
      </head>
      <body>
        <div id="header">
          <h1>🛍️ Google Merchant Feed</h1>
          <p>Dibuat secara dinamis untuk mendeteksi toko yang berbeda (<strong>PT Panca Prima Wijaya atau SensorGempa</strong>). XML feed ini memenuhi aturan Google Merchant Center (Mandatory Fields, Structured Data, Identifikasi GTIN/MPN).</p>
          <p>Feed ini berisi <strong style="color: #ff9f1c;"><xsl:value-of select="count(rss/channel/item)"/></strong> produk aktif.</p>
        </div>
        <div id="content">
          <div class="breadcrumb" style="display: flex; gap: 8px; align-items: center; margin-bottom: 15px; color: #64748b; font-weight: 600; font-size: 13px;">
            <span>Situs Utama</span> &#8250; 
            <span class="badge badge-orange"><xsl:value-of select="rss/channel/title"/></span>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 70px;">Gambar</th>
                <th>ID &amp; Informasi Produk</th>
                <th>Merek (Brand)</th>
                <th>Kondisi</th>
                <th>GTIN (Barcode)</th>
                <th>MPN (Part No.)</th>
                <th>Harga (Price)</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="rss/channel/item">
                <tr>
                  <td>
                    <xsl:variable name="imgURL"><xsl:value-of select="g:image_link"/></xsl:variable>
                    <a href="{g:link}" target="_blank">
                      <img src="{$imgURL}" class="prod-img" alt="Product Image" />
                    </a>
                  </td>
                  <td>
                    <a href="{g:link}" class="prod-title" target="_blank"><xsl:value-of select="g:title"/></a>
                    <span class="prod-desc"><xsl:value-of select="g:description"/></span>
                  </td>
                  <td>
                    <strong><xsl:value-of select="g:brand"/></strong>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="g:condition = 'new'">
                        <span class="badge badge-blue">Baru (New)</span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge badge-orange"><xsl:value-of select="g:condition"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td style="font-family: monospace; font-weight: bold;">
                    <xsl:value-of select="g:gtin"/>
                  </td>
                  <td style="font-family: monospace;">
                    <xsl:value-of select="g:mpn"/>
                  </td>
                  <td>
                    <span class="price-tag"><xsl:value-of select="g:price"/></span>
                  </td>
                  <td>
                    <span class="badge" style="background-color: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;">
                      <xsl:value-of select="g:availability"/>
                    </span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`);
  });

  const generateGoogleMerchantFeed = (products: any[], baseUrl: string, siteName: string) => {
    let itemsXml = '';
    for (const prod of products) {
      const descClean = (prod.description || '')
        .replace(/<[^>]*>/g, '') // remove HTML tags
        .replace(/[&<>'"]/g, (c: string) => {
          switch (c) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
          }
        })
        .substring(0, 4500)
        .trim();

      const titleEscaped = (prod.name || '')
        .replace(/[&<>'"]/g, (c: string) => {
          switch (c) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
          }
        });

      const brandEscaped = (prod.brand || (prod.site === 'sensor' ? 'Toyo Automation' : 'PT Panca Prima Wijaya'))
        .replace(/[&<>'"]/g, (c: string) => {
          switch (c) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
          }
        });

      // Determine link based on site
      const sitePath = prod.site === 'sensor' ? '/sensor/produk/' : '/panca/produk/';
      const link = `${baseUrl}${sitePath}${prod.slug}`;

      // Build image url
      let imageUrl = prod.image || '';
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }

      const priceNum = Number(prod.price) || 0;
      const formattedPrice = `${priceNum} IDR`;

      const conditionVal = prod.condition || 'new';

      const gtinTag = prod.gtin ? `<g:gtin>${prod.gtin}</g:gtin>` : '';
      const mpnTag = prod.mpn ? `<g:mpn>${prod.mpn}</g:mpn>` : '';

      itemsXml += `
    <item>
      <g:id>${prod.id}</g:id>
      <g:title>${titleEscaped}</g:title>
      <g:description>${descClean || titleEscaped}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageUrl || 'https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png'}</g:image_link>
      <g:price>${formattedPrice}</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>${conditionVal}</g:condition>
      <g:brand>${brandEscaped}</g:brand>
      ${gtinTag}
      ${mpnTag}
      <g:google_product_category>Business &amp; Industrial &gt; Agriculture</g:google_product_category>
    </item>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/google-merchant.xsl"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${siteName}</title>
    <link>${baseUrl}</link>
    <description>Dynamic Google Merchant Center Product Feed for ${siteName}</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;
  };

  app.get('/google-merchant.xml', async (req, res) => {
    try {
      const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
      const { rows: products } = await pool.query('SELECT * FROM products ORDER BY "createdat" DESC');
      const feedXml = generateGoogleMerchantFeed(products, baseUrl, 'Gabungan PT Panca Prima &amp; Sensor');
      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.send(feedXml.trim());
    } catch (e) {
      console.error('Error generating general google-merchant.xml:', e);
      res.status(500).send('Error generating Google Merchant Feed');
    }
  });

  app.get(['/sensor/google-merchant.xml', '/en/sensor/google-merchant.xml'], async (req, res) => {
    try {
      const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
      const { rows: products } = await pool.query("SELECT * FROM products WHERE site = 'sensor' ORDER BY 'createdat' DESC");
      const feedXml = generateGoogleMerchantFeed(products, baseUrl, 'SensorGempa / Toyo Automation');
      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.send(feedXml.trim());
    } catch (e) {
      console.error('Error generating sensor google-merchant.xml:', e);
      res.status(500).send('Error');
    }
  });

  app.get(['/panca/google-merchant.xml', '/en/panca/google-merchant.xml'], async (req, res) => {
    try {
      const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
      const { rows: products } = await pool.query("SELECT * FROM products WHERE site = 'panca' OR site IS NULL ORDER BY 'createdat' DESC");
      const feedXml = generateGoogleMerchantFeed(products, baseUrl, 'PT Panca Prima Wijaya');
      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.send(feedXml.trim());
    } catch (e) {
      console.error('Error generating panca google-merchant.xml:', e);
      res.status(500).send('Error');
    }
  });

  app.get('/sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:custom="http://pancaprimawijaya.com/custom">
        <sitemap>
          <loc>${baseUrl}/sensor-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>4</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/panca-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>4</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/en/sensor-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>4</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/en/panca-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>4</custom:count>
        </sitemap>
      </sitemapindex>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
  });

  // Dynamic robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`);
  });

  // Serve llms.txt containing structured AI agent markdown directly
  app.get('/llms.txt', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/llms.txt'));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false })); // Disable default index.html serving
    
    // Express 4 wildcard catch-all for SPA routing with SEO Injection
    app.get('*', async (req, res) => {
      try {
        let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
        let title = 'PT Panca Prima Wijaya | Pest Control & Sensor Monitoring';
        let description = 'Menyediakan layanan pest control, fumigasi profesional dan solusi sensor monitoring system terbaik di Indonesia.';
        let image = 'https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png';
        let canonical = `https://${req.get('host') || 'www.pancaprimawijaya.com'}${req.path}`;
        let robots = 'index, follow';
        let keywords = 'pest control, fumigasi, sensor monitoring, gas monitoring, fosfin, silofit, sensor';
        let ogType = 'website';
        let status = 200;
        let schemaJson: string | null = null;

        const isEn = req.path.startsWith('/en/') || req.path === '/en';
        if (isEn) {
          title = 'PT Panca Prima Wijaya | Pest Control & Sensor Monitoring';
          description = 'Providing professional pest control, fumigation, and gas sensor monitoring systems in Indonesia.';
          keywords = 'pest control, fumigation, sensor monitoring, gas monitoring, phosphine, silofit, sensor';
        }

        // Detect route and fetch data
        if (req.path.includes('/blog/')) {
          const slug = req.path.split('/').pop();
          if (slug) {
            const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 OR slug_en = $1', [slug]);
            if (rows.length > 0) {
              const post = rows[0];
              if (isEn && post.title_en) {
                title = post.seotitle_en || post.title_en;
                description = post.seodescription_en || post.content_en?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
                keywords = post.keywords_en || post.keywords || keywords;
              } else {
                title = post.seotitle || post.title;
                description = post.seodescription || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
                keywords = post.keywords || keywords;
              }
              image = post.ogimage || post.featuredimage || image;
              canonical = post.canonical || canonical;
              robots = post.robots || robots;
              ogType = 'article';
              
              // Article Schema
              schemaJson = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "image": [image],
                "datePublished": post.createdat || new Date().toISOString(),
                "dateModified": post.updatedat || post.createdat || new Date().toISOString(),
                "description": description.substring(0, 150),
                "publisher": {
                  "@type": "Organization",
                  "name": "PT Panca Prima Wijaya",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png"
                  }
                }
              });
            } else {
              status = 404;
              title = isEn ? 'Page Not Found - PT Panca Prima Wijaya' : 'Halaman Tidak Ditemukan - PT Panca Prima Wijaya';
              description = isEn ? 'Sorry, the requested article could not be found.' : 'Maaf, artikel atau halaman yang Anda cari tidak dapat ditemukan di server kami.';
            }
          }
        } else if (req.path.includes('/produk/')) {
          const slug = req.path.split('/').pop();
          if (slug) {
            const { rows } = await pool.query('SELECT * FROM products WHERE slug = $1 OR slug_en = $1', [slug]);
            if (rows.length > 0) {
              const prod = rows[0];
              if (isEn && prod.name_en) {
                title = prod.seotitle_en || prod.name_en;
                description = prod.seodescription_en || prod.description_en?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
                keywords = prod.keywords_en || prod.keywords || keywords;
              } else {
                title = prod.seotitle || prod.name;
                description = prod.seodescription || prod.description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
                keywords = prod.keywords || keywords;
              }
              image = prod.image || image;
              ogType = 'product';
              
              // Product Schema
              schemaJson = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": isEn && prod.name_en ? prod.name_en : prod.name,
                "image": [image],
                "description": description.substring(0, 150),
                "offers": {
                  "@type": "Offer",
                  "price": prod.price || "0",
                  "priceCurrency": "IDR",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "PT Panca Prima Wijaya"
                  }
                }
              });
            } else {
              status = 404;
              title = isEn ? 'Product Not Found - PT Panca Prima Wijaya' : 'Produk Tidak Ditemukan - PT Panca Prima Wijaya';
              description = isEn ? 'Sorry, the requested product could not be found.' : 'Maaf, produk yang Anda cari tidak dapat ditemukan di server kami.';
            }
          }
        } else {
          // Try page
          let slug = req.path.split('/').filter(Boolean).pop() || '';
          const knownStaticRoutes = [
            '', 'en', 'panca', 'sensor', 'layanan', 'blog', 'tentang-kami', 'sensor/produk', 'panca/produk', 'admin-login', 'admin', 'orders', 'cart', 'bms'
          ];
          const normalizedPath = req.path.replace(/^\/|\/$/g, '');
          
          if (slug && !knownStaticRoutes.includes(normalizedPath)) {
            const { rows } = await pool.query('SELECT * FROM pages WHERE slug = $1 OR slug_en = $1', [slug]);
            if (rows.length > 0) {
              const page = rows[0];
              if (isEn && page.title_en) {
                title = page.seotitle_en || page.title_en;
                description = page.seodescription_en || page.content_en?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
              } else {
                title = page.seotitle || page.title;
                description = page.seodescription || page.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
              }
              image = page.ogimage || page.image || image;
              canonical = page.canonical || canonical;
              robots = page.robots || robots;
              
              // WebPage Schema
              schemaJson = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": title,
                "description": description.substring(0, 150),
                "url": canonical
              });
            } else {
              status = 404;
              title = isEn ? 'Page Not Found - PT Panca Prima Wijaya' : 'Halaman Tidak Ditemukan - PT Panca Prima Wijaya';
              description = isEn ? 'Sorry, the requested page could not be found.' : 'Maaf, halaman yang Anda cari tidak dapat ditemukan di server kami.';
            }
          } else {
            // Default Organization Schema
            schemaJson = JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PT Panca Prima Wijaya",
              "alternateName": "SensorGempa",
              "url": "http://pancaprimawijaya.web.id",
              "logo": "https://ik.imagekit.io/cej2dcwlx/PT%20Panca%20Prima%20Wijaya%20Logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-21-xxxxxx",
                "contactType": "customer service"
              }
            });
          }
        }

        // Clean string from possible issues
        description = description.replace(/"/g, '&quot;');

        html = html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
        let metaTags = `
          <meta name="description" content="${description}" />
          <meta name="keywords" content="${keywords}" />
          <link rel="canonical" href="${canonical}" />
          <meta name="robots" content="${robots}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${canonical}" />
          <meta property="og:type" content="${ogType}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
        `;
        if (schemaJson) {
          metaTags += `
          <script type="application/ld+json">
            ${schemaJson}
          </script>
          `;
        }
        html = html.replace('</head>', `${metaTags}</head>`);
        
        res.status(status).send(html);
      } catch (e) {
        // Fallback
        res.status(500).sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
