import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_KXPcOL8yei6r@ep-restless-waterfall-aocnkn4e-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
});

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
          seotitle VARCHAR(255),
          seodescription TEXT,
          keywords TEXT,
          site VARCHAR(100),
          createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery JSONB;

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
  } catch (err) {
    console.error("Failed to verify tables:", err);
  }

  app.use(express.json());

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
      const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 OR id = $1', [req.params.identifier]);
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
      const { rows } = await pool.query(
        'INSERT INTO posts (id, title, slug, content, seotitle, seodescription, keywords, featuredimage, site, canonical, robots, ogtitle, ogdescription, ogimage, twittercard, category, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
        [id, b.title, b.slug, b.content, b.seoTitle, b.seoDescription, b.keywords, b.featuredImage, b.site, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish']
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
      const { rows } = await pool.query(
        'UPDATE posts SET title = $2, slug = $3, content = $4, seotitle = $5, seodescription = $6, keywords = $7, featuredimage = $8, site = $9, canonical = $10, robots = $11, ogtitle = $12, ogdescription = $13, ogimage = $14, twittercard = $15, category = $16, status = $17, updatedat = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [req.params.id, b.title, b.slug, b.content, b.seoTitle, b.seoDescription, b.keywords, b.featuredImage, b.site, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish']
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
      const { rows } = await pool.query('SELECT * FROM pages WHERE id = $1 OR slug = $1 LIMIT 1', [req.params.identifier]);
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
      const { rows } = await pool.query(
        'INSERT INTO pages (id, title, slug, content, seotitle, seodescription, image, canonical, robots, ogtitle, ogdescription, ogimage, twittercard, category, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
        [id, b.title, b.slug, b.content, b.seotitle, b.seodescription, b.image, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish']
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
      const { rows } = await pool.query(
        'UPDATE pages SET title = $2, slug = $3, content = $4, seotitle = $5, seodescription = $6, image = $7, canonical = $8, robots = $9, ogtitle = $10, ogdescription = $11, ogimage = $12, twittercard = $13, category = $14, status = $15, updatedat = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [req.params.id, b.title, b.slug, b.content, b.seotitle, b.seodescription, b.image, b.canonical, b.robots, b.ogtitle, b.ogdescription, b.ogimage, b.twittercard, b.category, b.status || 'publish']
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
      const { rows } = await pool.query('SELECT * FROM products WHERE slug = $1 OR id = $1', [req.params.identifier]);
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
      const { rows } = await pool.query(
        'INSERT INTO products (id, name, slug, price, category, image, gallery, description, seotitle, seodescription, keywords, site) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
        [id, b.name, b.slug, b.price, b.category, b.image, JSON.stringify(b.gallery || []), b.description, b.seoTitle, b.seoDescription, b.keywords, b.site]
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
      const { rows } = await pool.query(
        'UPDATE products SET name = $2, slug = $3, price = $4, category = $5, image = $6, gallery = $7, description = $8, seotitle = $9, seodescription = $10, keywords = $11, site = $12, updatedat = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
        [req.params.id, b.name, b.slug, b.price, b.category, b.image, JSON.stringify(b.gallery || []), b.description, b.seoTitle, b.seoDescription, b.keywords, b.site]
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

  app.get('/api/orders', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM orders ORDER BY "createdat" DESC');
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
    }
  });

  app.post('/api/orders', async (req, res) => {
    try {
      const id = 'ORD-' + Date.now().toString();
      const status = 'Paid - Gateway Verified';
      const b = req.body;
      const { rows } = await pool.query(
        'INSERT INTO orders (id, customer, items, total, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, b.customer, b.items, b.total || 0, status]
      );
      console.log(`[PUSH NOTIF] New order ${id} received!`);
      res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB Error' });
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
  app.get('/sensor/page-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const urls = [
      `${baseUrl}/sensor`,
      `${baseUrl}/sensor/produk`,
      `${baseUrl}/sensor/building-management-system`,
      `${baseUrl}/sensor/early-warning-system`,
      `${baseUrl}/sensor/real-time-monitoring-system-rtms`,
      `${baseUrl}/sensor/sensor-gempa`,
      `${baseUrl}/sensor/sparepart-lift-terlengkap`
    ];
    try {
      const { rows } = await pool.query('SELECT slug FROM pages');
      urls.push(...rows.map(r => `${baseUrl}/${r.slug}`));
    } catch (e) {}
    res.header('Content-Type', 'application/xml');
    res.send(generateUrlset(urls));
  });

  app.get('/sensor/produk-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    try {
      const { rows } = await pool.query("SELECT slug FROM products WHERE site = 'sensor' OR category ILIKE '%sensor%'");
      const urls = rows.map(r => `${baseUrl}/sensor/produk/${r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get('/sensor/blog-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    try {
      const { rows } = await pool.query('SELECT slug FROM posts');
      const urls = rows.map(r => `${baseUrl}/blog/${r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get('/sensor/kategori-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    try {
      const { rows: postCats } = await pool.query("SELECT category FROM posts WHERE category IS NOT NULL AND category != ''");
      const { rows: pageCats } = await pool.query("SELECT category FROM pages WHERE category IS NOT NULL AND category != ''");
      const { rows: prodCats } = await pool.query("SELECT category FROM products WHERE category IS NOT NULL AND category != '' AND (site = 'sensor' OR category ILIKE '%sensor%')");
      
      const allCats = new Set();
      [...postCats, ...pageCats, ...prodCats].forEach(r => {
        if (r.category) r.category.split(',').forEach((c: string) => allCats.add(c.trim()));
      });
      allCats.delete('');
      
      const urls = Array.from(allCats).map(c => `${baseUrl}/sensor/kategori/${encodeURIComponent(c as string)}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  // --- PANCA SITEMAPS ---
  app.get('/panca/page-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    const urls = [
      `${baseUrl}/`,
      `${baseUrl}/panca`,
      `${baseUrl}/panca/produk`,
      `${baseUrl}/katalog`,
      `${baseUrl}/blog`,
      `${baseUrl}/layanan`,
      `${baseUrl}/tentang-kami`
    ];
    try {
      const { rows } = await pool.query('SELECT slug FROM pages');
      urls.push(...rows.map(r => `${baseUrl}/${r.slug}`));
    } catch (e) {}
    res.header('Content-Type', 'application/xml');
    res.send(generateUrlset(urls));
  });

  app.get('/panca/produk-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    try {
      const { rows } = await pool.query("SELECT slug FROM products WHERE site = 'panca' OR site IS NULL");
      const urls = rows.map(r => `${baseUrl}/panca/produk/${r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get('/panca/blog-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    try {
      const { rows } = await pool.query('SELECT slug FROM posts');
      const urls = rows.map(r => `${baseUrl}/blog/${r.slug}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  app.get('/panca/kategori-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
    try {
      const { rows: postCats } = await pool.query("SELECT category FROM posts WHERE category IS NOT NULL AND category != ''");
      const { rows: pageCats } = await pool.query("SELECT category FROM pages WHERE category IS NOT NULL AND category != ''");
      const { rows: prodCats } = await pool.query("SELECT category FROM products WHERE category IS NOT NULL AND category != '' AND (site = 'panca' OR site IS NULL)");
      
      const allCats = new Set();
      [...postCats, ...pageCats, ...prodCats].forEach(r => {
        if (r.category) r.category.split(',').forEach((c: string) => allCats.add(c.trim()));
      });
      allCats.delete('');
      
      const urls = Array.from(allCats).map(c => `${baseUrl}/panca/kategori/${encodeURIComponent(c as string)}`);
      res.header('Content-Type', 'application/xml');
      res.send(generateUrlset(urls));
    } catch(e) { res.status(500).send(''); }
  });

  // --- INDEX SITEMAPS ---
  app.get('/sensor-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
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
          <loc>${baseUrl}/sensor/page-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${7 + pageCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/sensor/blog-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${postCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/sensor/produk-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${productCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/sensor/kategori-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${catCount}</custom:count>
        </sitemap>
      </sitemapindex>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
  });

  app.get('/panca-sitemap.xml', async (req, res) => {
    const baseUrl = process.env.APP_URL || `https://${req.get('host') || 'www.pancaprimawijaya.com'}`;
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
          <loc>${baseUrl}/panca/page-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${7 + pageCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/panca/blog-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${postCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/panca/produk-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${productCount}</custom:count>
        </sitemap>
        <sitemap>
          <loc>${baseUrl}/panca/kategori-sitemap.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <custom:count>${catCount}</custom:count>
        </sitemap>
      </sitemapindex>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
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
      </sitemapindex>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
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

        // Detect route and fetch data
        if (req.path.includes('/blog/')) {
          const slug = req.path.split('/').pop();
          if (slug) {
            const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1', [slug]);
            if (rows.length > 0) {
              title = rows[0].seotitle || rows[0].title;
              description = rows[0].seodescription || rows[0].content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
              image = rows[0].ogimage || rows[0].featuredimage || image;
            }
          }
        } else if (req.path.includes('/produk/')) {
          const slug = req.path.split('/').pop();
          if (slug) {
            const { rows } = await pool.query('SELECT * FROM products WHERE slug = $1', [slug]);
            if (rows.length > 0) {
              title = rows[0].seotitle || rows[0].name;
              description = rows[0].seodescription || rows[0].description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
              image = rows[0].image || image;
            }
          }
        } else {
          // Try page
          let slug = req.path.split('/').filter(Boolean).pop() || '';
          if (slug) {
            const { rows } = await pool.query('SELECT * FROM pages WHERE slug = $1', [slug]);
            if (rows.length > 0) {
              title = rows[0].seotitle || rows[0].title;
              description = rows[0].seodescription || rows[0].content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
              image = rows[0].ogimage || rows[0].image || image;
            }
          }
        }

        // Clean string from possible issues
        description = description.replace(/"/g, '&quot;');

        html = html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
        const metaTags = `
          <meta name="description" content="${description}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
        `;
        html = html.replace('</head>', `${metaTags}</head>`);
        
        res.send(html);
      } catch (e) {
        // Fallback
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
