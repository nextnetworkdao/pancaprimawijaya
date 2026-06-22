<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:custom="http://pancaprimawijaya.com/custom"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="id">
      <head>
        <title>XML Sitemap | PT Panca Prima Wijaya &amp; SensorGempa</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            margin: 0;
            color: #1e293b;
            background-color: #f8fafc;
          }
          #header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 40px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          #header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          #header p {
            margin: 0 0 15px 0;
            font-size: 14px;
            color: #94a3b8;
            line-height: 1.6;
          }
          #header a {
            color: #38bdf8;
            text-decoration: none;
            font-weight: 500;
          }
          #header a:hover {
            text-decoration: underline;
          }
          #content {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
          }
          .breadcrumb {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 25px;
            color: #64748b;
          }
          .breadcrumb strong {
            color: #0f172a;
          }
          .card {
            background-color: #ffffff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
            overflow: hidden;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background-color: #f1f5f9;
            padding: 16px 20px;
            font-weight: 600;
            color: #334155;
            border-bottom: 1px solid #e2e8f0;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            color: #475569;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          td a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          td a:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 600;
            background-color: #f1f5f9;
            color: #475569;
          }
          .badge-high {
            background-color: #dcfce7;
            color: #15803d;
          }
          .badge-med {
            background-color: #fef9c3;
            color: #a16207;
          }
          .badge-count {
            background-color: #e0f2fe;
            color: #0369a1;
            font-weight: 700;
            font-family: monospace;
          }
          .info-count {
            display: inline-block;
            background-color: #38bdf8;
            color: #0f172a;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 12px;
            margin-left: 5px;
          }
        </style>
      </head>
      <body>
        <div id="header">
          <div class="container">
            <h1>Peta Situs XML (XML Sitemap)</h1>
            <p>Dibuat secara profesional untuk <strong>PT Panca Prima Wijaya</strong> &amp; <strong>SensorGempa</strong>. Sitemap ini membantu mesin pencari (seperti Google, Bing, Yahoo) menemukan, merayap (crawl), dan mengindeks seluruh halaman web ini dengan lebih efisien guna mengoptimalkan kinerja SEO.</p>
            <p>Membaca info sitemap XML selengkapnya di <a href="https://sitemaps.org" target="_blank" rel="noopener noreferrer">sitemaps.org</a>.</p>
            
            <xsl:choose>
              <xsl:when test="sitemap:sitemapindex">
                <p>Indeks sitemap ini berisi <span class="info-count"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></span> sub-sitemap.</p>
              </xsl:when>
              <xsl:otherwise>
                <p>Sitemap ini berisi <span class="info-count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span> URL terdaftar.</p>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>
        
        <div id="content">
          <div class="breadcrumb">
            Beranda &#8250; 
            <xsl:choose>
              <xsl:when test="sitemap:sitemapindex">
                <strong>Index Sitemap Utama</strong>
              </xsl:when>
              <xsl:otherwise>
                <a href="/sitemap.xml">Sitemap Utama</a> &#8250; <strong>Daftar URL Halaman</strong>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          
          <div class="card">
            <xsl:choose>
              <!-- SITEMAP INDEX TEMPLATE -->
              <xsl:when test="sitemap:sitemapindex">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 55%;">Sitemap URL</th>
                      <th style="width: 20%; text-align: center;">URL Count</th>
                      <th style="width: 25%;">Pembaruan Terakhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td>
                          <xsl:variable name="itemURL"><xsl:value-of select="sitemap:loc"/></xsl:variable>
                          <a href="{$itemURL}"><xsl:value-of select="sitemap:loc"/></a>
                        </td>
                        <td style="text-align: center;">
                          <span class="badge badge-count">
                            <xsl:value-of select="custom:count"/>
                          </span>
                        </td>
                        <td>
                          <xsl:choose>
                            <xsl:when test="contains(sitemap:lastmod, 'T')">
                              <xsl:value-of select="substring-before(sitemap:lastmod, 'T')"/>
                              <xsl:text> </xsl:text>
                              <xsl:value-of select="substring(substring-after(sitemap:lastmod, 'T'), 1, 5)"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="sitemap:lastmod"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>
              
              <!-- URLSET TEMPLATE -->
              <xsl:otherwise>
                <table>
                  <thead>
                    <tr>
                      <th style="width: 50%;">Lokasi URL</th>
                      <th style="width: 15%; text-align: center;">Frekuensi</th>
                      <th style="width: 15%; text-align: center;">Prioritas</th>
                      <th style="width: 20%;">Pembaruan Terakhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td>
                          <xsl:variable name="itemURL"><xsl:value-of select="sitemap:loc"/></xsl:variable>
                          <a href="{$itemURL}"><xsl:value-of select="sitemap:loc"/></a>
                        </td>
                        <td style="text-align: center;">
                          <span class="badge">
                            <xsl:value-of select="sitemap:changefreq"/>
                          </span>
                        </td>
                        <td style="text-align: center;">
                          <xsl:variable name="prio"><xsl:value-of select="sitemap:priority"/></xsl:variable>
                          <xsl:choose>
                            <xsl:when test="$prio &gt;= 0.8">
                              <span class="badge badge-high"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:when test="$prio &gt;= 0.5">
                              <span class="badge badge-med"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:otherwise>
                              <span class="badge"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                        <td>
                          <xsl:choose>
                            <xsl:when test="contains(sitemap:lastmod, 'T')">
                              <xsl:value-of select="substring-before(sitemap:lastmod, 'T')"/>
                              <xsl:text> </xsl:text>
                              <xsl:value-of select="substring(substring-after(sitemap:lastmod, 'T'), 1, 5)"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="sitemap:lastmod"/>
                            </xsl:otherwise>
                          </xsl:choose>
                          <xsl:if test="not(sitemap:lastmod)">
                            <span style="color: #cbd5e1;">-</span>
                          </xsl:if>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
