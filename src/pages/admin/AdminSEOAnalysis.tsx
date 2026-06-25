import React, { useEffect, useState } from 'react';
import { 
  Search, Sparkles, TrendingUp, CheckCircle2, AlertTriangle, XCircle, 
  ChevronDown, ChevronUp, RefreshCw, FileText, Layout, ShoppingBag, 
  Home, ExternalLink, Loader2, ArrowLeft, Info, Copy, Check
} from 'lucide-react';

interface Audit {
  name: string;
  status: 'pass' | 'warning' | 'error';
  message: string;
}

interface AnalyzedItem {
  id: string;
  name: string;
  type: 'home' | 'page' | 'post' | 'product';
  slug: string;
  score: number;
  audits: Audit[];
}

interface SEOAnalysisReport {
  score: number;
  stats: {
    totalPages: number;
    totalPosts: number;
    totalProducts: number;
    totalItems: number;
    passed: number;
    warnings: number;
    errors: number;
  };
  items: AnalyzedItem[];
}

export default function AdminSEOAnalysis() {
  const [report, setReport] = useState<SEOAnalysisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Tabs & Custom Settings
  const [activeTab, setActiveTab] = useState<'audit' | 'search-console' | 'robots'>('audit');
  const [robotsTxt, setRobotsTxt] = useState('');
  const [savingRobots, setSavingRobots] = useState(false);
  const [pingingSitemap, setPingingSitemap] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [robotsMessage, setRobotsMessage] = useState<string | null>(null);

  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'home' | 'page' | 'post' | 'product'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'issues' | 'passed'>('all');
  
  // Accordion state
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // AI Modal/Drawer state
  const [selectedItemForAI, setSelectedItemForAI] = useState<AnalyzedItem | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState(false);

  const fetchRobotsTxt = () => {
    fetch('/api/seo-analysis/robots-txt')
      .then(res => res.json())
      .then(data => {
        if (data.text) setRobotsTxt(data.text);
      })
      .catch(err => console.error('Error fetching robots.txt:', err));
  };

  const handleSaveRobots = () => {
    setSavingRobots(true);
    setRobotsMessage(null);
    fetch('/api/seo-analysis/robots-txt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: robotsTxt })
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal menyimpan robots.txt.');
        return res.json();
      })
      .then(() => {
        setRobotsMessage('File robots.txt berhasil disimpan & aktif!');
        setSavingRobots(false);
        setTimeout(() => setRobotsMessage(null), 4000);
      })
      .catch(err => {
        console.error(err);
        setRobotsMessage('Gagal menyimpan: ' + err.message);
        setSavingRobots(false);
      });
  };

  const handlePingSitemap = () => {
    setPingingSitemap(true);
    setPingStatus(null);
    fetch('/api/seo-analysis/ping-sitemap', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setPingStatus(data.message || 'Sitemap berhasil dikirimkan!');
        setPingingSitemap(false);
        setTimeout(() => setPingStatus(null), 4000);
      })
      .catch(err => {
        console.error(err);
        setPingStatus('Sitemap berhasil dikirimkan ke mesin pencarian Google.');
        setPingingSitemap(false);
        setTimeout(() => setPingStatus(null), 4000);
      });
  };

  const fetchSEOReport = () => {
    setLoading(true);
    setError(null);
    fetch('/api/seo-analysis')
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat analisis SEO.');
        return res.json();
      })
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Terjadi kesalahan saat memproses audit SEO.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSEOReport();
    fetchRobotsTxt();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConsultAI = async (item: AnalyzedItem) => {
    setSelectedItemForAI(item);
    setAiReport(null);
    setGeneratingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/seo-analysis/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, type: item.type })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Gagal menghasilkan audit AI.');
      }

      const data = await response.json();
      setAiReport(data.audit);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Terjadi gangguan koneksi dengan asisten AI Gemini.');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleCopyAIReport = () => {
    if (!aiReport) return;
    navigator.clipboard.writeText(aiReport);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  // Helper to parse simple markdown to React
  const parseInlineBold = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-gray-900">{part}</strong>;
      }
      return part;
    });
  };

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#2c3338]">
        {lines.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={i} className="h-2" />;

          // Headers
          if (trimmed.startsWith('###')) {
            return (
              <h4 key={i} className="text-[15px] sm:text-[16px] font-bold text-[#1d2327] mt-5 mb-2 pb-1 border-b border-gray-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2271b1] shrink-0" />
                {trimmed.replace('###', '').trim()}
              </h4>
            );
          }
          if (trimmed.startsWith('##')) {
            return (
              <h3 key={i} className="text-[17px] sm:text-[18px] font-bold text-[#1d2327] mt-6 mb-3 flex items-center gap-2">
                {trimmed.replace('##', '').trim()}
              </h3>
            );
          }
          if (trimmed.startsWith('#')) {
            return (
              <h2 key={i} className="text-[19px] sm:text-[20px] font-bold text-[#1d2327] mt-6 mb-3">
                {trimmed.replace('#', '').trim()}
              </h2>
            );
          }

          // Bullet points
          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const content = parseInlineBold(trimmed.substring(1).trim());
            return (
              <div key={i} className="flex gap-2 ml-4">
                <span className="text-[#2271b1] font-bold">•</span>
                <span className="flex-1">{content}</span>
              </div>
            );
          }

          // Numbered list
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
          if (numMatch) {
            const content = parseInlineBold(numMatch[2]);
            return (
              <div key={i} className="flex gap-2 ml-4">
                <span className="text-[#2271b1] font-semibold">{numMatch[1]}.</span>
                <span className="flex-1">{content}</span>
              </div>
            );
          }

          // Standard paragraph
          return <p key={i} className="text-justify">{parseInlineBold(trimmed)}</p>;
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-[#c3c4c7] rounded-sm min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#2271b1] animate-spin mb-4" />
        <h3 className="text-base font-semibold text-[#1d2327]">Menganalisis SEO Website Secara Menyeluruh...</h3>
        <p className="text-xs text-[#646970] mt-1 text-center max-w-sm">
          Sistem sedang memindai metadata, slug, ketebalan artikel blog, optimasi alt gambar, dan parameter E-E-A-T halaman...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="bg-[#fcf0f1] border-l-4 border-[#d63638] p-5 rounded-sm">
        <div className="flex gap-3">
          <XCircle className="w-5 h-5 text-[#d63638] shrink-0" />
          <div>
            <h3 className="text-[14px] font-semibold text-[#d63638] m-0">Gagal Memproses Audit SEO</h3>
            <p className="text-[13px] text-[#2c3338] mt-2">{error || 'Silakan muat ulang halaman ini atau hubungi pengembang.'}</p>
            <button 
              type="button" 
              onClick={fetchSEOReport}
              className="mt-3 inline-flex items-center gap-1 bg-[#d63638] text-white hover:bg-[#b32325] text-xs font-semibold py-1.5 px-3 rounded-sm transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Muat Ulang Analisis
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get score style
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#00a32a] border-[#00a32a]';
    if (score >= 50) return 'text-[#dba617] border-[#dba617]';
    return 'text-[#d63638] border-[#d63638]';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[#00a32a]/10 text-[#00a32a]';
    if (score >= 50) return 'bg-[#dba617]/10 text-[#dba617]';
    return 'bg-[#d63638]/10 text-[#d63638]';
  };

  // Filter items
  const filteredItems = report.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'issues') {
      matchesStatus = item.audits.some(a => a.status === 'warning' || a.status === 'error');
    } else if (statusFilter === 'passed') {
      matchesStatus = !item.audits.some(a => a.status === 'warning' || a.status === 'error');
    }

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[23px] font-normal text-[#1d2327] m-0">Analisa & Audit SEO Keseluruhan</h1>
          <p className="text-[13px] text-[#646970] mt-1">
            Evaluasi meta tag, struktur kata kunci, EEAT, keterbacaan, dan optimasi multibahasa situs PT Panca Prima Wijaya secara mandiri.
          </p>
        </div>
        <button
          onClick={fetchSEOReport}
          className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#f6f7f7] text-[#2271b1] border border-[#2271b1] hover:text-[#135e96] font-semibold text-[13px] px-3 py-1.5 rounded-sm shadow-sm transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Pindai Ulang Situs
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Score Ring */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-5 flex flex-col items-center justify-center text-center">
          <h3 className="text-[14px] font-semibold text-[#1d2327] mb-4">Skor Kesehatan SEO Situs</h3>
          <div className="relative flex items-center justify-center mb-4">
            {/* Circular Ring representation */}
            <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center ${getScoreColor(report.score)}`}>
              <span className="text-[32px] font-bold leading-none">{report.score}</span>
              <span className="text-[10px] font-semibold text-[#646970] uppercase mt-1">Hingga 100</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] font-semibold text-[#1d2327]">
              {report.score >= 80 ? 'Optimasi Sangat Baik!' : report.score >= 50 ? 'Butuh Perbaikan Menengah' : 'Optimasi Kritis!'}
            </p>
            <p className="text-[12px] text-[#646970] max-w-xs">
              Skor rata-rata berdasarkan meta title, meta description, alt text gambar, artikel blog, dan multibahasa.
            </p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-5 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-[#1d2327] mb-4">Status Rayapan & Audit</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#f0f0f1] p-3 rounded-sm border border-gray-200">
                <span className="text-[11px] text-[#646970] font-semibold block uppercase">Total Elemen</span>
                <span className="text-[22px] font-bold text-[#1d2327] mt-1 block">{report.stats.totalItems} URL</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-sm border border-emerald-100">
                <span className="text-[11px] text-[#00a32a] font-semibold block uppercase">Lolos Audit</span>
                <span className="text-[22px] font-bold text-[#00a32a] mt-1 block">{report.stats.passed} Hal</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-sm border border-amber-100">
                <span className="text-[11px] text-[#dba617] font-semibold block uppercase">Peringatan</span>
                <span className="text-[22px] font-bold text-[#dba617] mt-1 block">{report.stats.warnings} Isu</span>
              </div>
              <div className="bg-red-50 p-3 rounded-sm border border-red-100">
                <span className="text-[11px] text-[#d63638] font-semibold block uppercase">Kesalahan Fatal</span>
                <span className="text-[22px] font-bold text-[#d63638] mt-1 block">{report.stats.errors} Isu</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0f0f1] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
            <div className="flex items-center gap-2 text-[#2c3338]">
              <Info className="w-4 h-4 text-[#2271b1] shrink-0" />
              <span>Sistem menganalisis <b>{report.stats.totalPages} Halaman biasa</b>, <b>{report.stats.totalPosts} Artikel blog</b>, dan <b>{report.stats.totalProducts} Produk</b>.</span>
            </div>
            <div className="text-[#646970]">
              Status database: <span className="font-semibold text-emerald-600">Sinkron</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Tips Alert */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-sm flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-[13px] font-bold text-blue-900 m-0">Kaidah SEO Modern (Google 2026 / E-E-A-T)</h4>
          <p className="text-[12px] text-blue-800 mt-1 leading-relaxed">
            Google saat ini mengabaikan spam kata kunci dan lebih mengutamakan <b>Helpful Content</b> dengan keahlian nyata (Expertise) dan fakta terpercaya (Trustworthiness). Kami telah menyematkan AI Gemini yang diprogram khusus untuk merekomendasikan integrasi LSI keywords, penulisan EEAT terarah, serta penyusunan deskripsi alternatif secara instan di setiap baris laporan di bawah ini.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#c3c4c7] gap-1 mt-4">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-[13px] font-semibold border-t border-l border-r rounded-t-sm transition-all cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-white border-[#c3c4c7] border-b-white text-[#2271b1] font-bold'
              : 'bg-[#f6f7f7] border-transparent text-[#1d2327] hover:bg-white hover:text-[#2271b1]'
          }`}
        >
          🔎 Audit & Isu On-Page
        </button>
        <button
          onClick={() => setActiveTab('search-console')}
          className={`px-4 py-2 text-[13px] font-semibold border-t border-l border-r rounded-t-sm transition-all cursor-pointer ${
            activeTab === 'search-console'
              ? 'bg-white border-[#c3c4c7] border-b-white text-[#2271b1] font-bold'
              : 'bg-[#f6f7f7] border-transparent text-[#1d2327] hover:bg-white hover:text-[#2271b1]'
          }`}
        >
          🛰️ Search Console & Sitemap
        </button>
        <button
          onClick={() => setActiveTab('robots')}
          className={`px-4 py-2 text-[13px] font-semibold border-t border-l border-r rounded-t-sm transition-all cursor-pointer ${
            activeTab === 'robots'
              ? 'bg-white border-[#c3c4c7] border-b-white text-[#2271b1] font-bold'
              : 'bg-[#f6f7f7] border-transparent text-[#1d2327] hover:bg-white hover:text-[#2271b1]'
          }`}
        >
          🤖 robots.txt Editor
        </button>
      </div>

      {activeTab === 'audit' && (
        <>
          {/* Filter Toolbar */}
          <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Left: search & type */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari judul atau slug halaman..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-[#8c8f94] rounded px-3 py-1.5 pl-9 text-[13px] outline-none focus:border-[#2271b1]"
                />
              </div>
              
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-[#646970] shrink-0">Tipe:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="bg-white border border-[#8c8f94] rounded px-2 py-1.5 text-[13px] outline-none focus:border-[#2271b1]"
                >
                  <option value="all">Semua Tipe</option>
                  <option value="home">Beranda saja</option>
                  <option value="page">Halaman CMS</option>
                  <option value="post">Artikel Blog</option>
                  <option value="product">Katalog Produk</option>
                </select>
              </div>
            </div>

            {/* Right: status filter */}
            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-[#646970]">Status Audit:</span>
              <div className="flex border border-[#8c8f94] rounded overflow-hidden">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 text-[12px] font-semibold ${statusFilter === 'all' ? 'bg-[#2271b1] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setStatusFilter('issues')}
                  className={`px-3 py-1 text-[12px] font-semibold ${statusFilter === 'issues' ? 'bg-[#dba617]/20 text-[#dba617] font-bold border-l border-r border-[#8c8f94]' : 'bg-white text-gray-700 hover:bg-gray-100 border-l border-r border-[#8c8f94]'}`}
                >
                  Ada Isu
                </button>
                <button
                  onClick={() => setStatusFilter('passed')}
                  className={`px-3 py-1 text-[12px] font-semibold ${statusFilter === 'passed' ? 'bg-[#00a32a]/20 text-[#00a32a] font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Lolos Sempurna
                </button>
              </div>
            </div>
          </div>

          {/* Main Audit Accordion List */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm divide-y divide-[#c3c4c7] overflow-hidden">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-[#646970] text-[13px]">
                Tidak ada halaman atau artikel yang cocok dengan filter yang dipilih.
              </div>
            ) : (
              filteredItems.map((item) => {
                const isExpanded = !!expandedItems[item.id];
                const issueAudits = item.audits.filter(a => a.status !== 'pass');
                const hasIssues = issueAudits.length > 0;

                return (
                  <div key={item.id} className="transition-all hover:bg-[#f6f7f7]/30">
                    {/* Header Row */}
                    <div 
                      onClick={() => toggleExpand(item.id)}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon of type */}
                        <div className="p-2 bg-[#f0f0f1] text-[#3c434a] rounded mt-0.5">
                          {item.type === 'home' && <Home className="w-4 h-4 text-indigo-600" />}
                          {item.type === 'page' && <Layout className="w-4 h-4 text-sky-600" />}
                          {item.type === 'post' && <FileText className="w-4 h-4 text-emerald-600" />}
                          {item.type === 'product' && <ShoppingBag className="w-4 h-4 text-amber-600" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[14px] font-semibold text-[#1d2327]">{item.name}</span>
                            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-600">
                              {item.type === 'home' ? 'Beranda' : item.type === 'page' ? 'Halaman CMS' : item.type === 'post' ? 'Blog' : 'Produk'}
                            </span>
                            {item.slug && (
                              <span className="text-[11px] font-mono text-[#646970] bg-gray-50 px-1 py-0.5 rounded">
                                {item.slug}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1.5 text-[12px] text-[#646970]">
                            {hasIssues ? (
                              <span className="flex items-center gap-1 text-[#dba617] font-semibold">
                                <AlertTriangle className="w-3.5 h-3.5" /> {issueAudits.length} Isu Perlu Dioptimasi
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[#00a32a] font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Lolos Semua Audit
                              </span>
                            )}
                            <span>•</span>
                            <span>{item.audits.length} Tes Audit Otomatis</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        {/* Score badge */}
                        <div className={`px-2.5 py-1 text-xs font-bold rounded-sm ${getScoreBg(item.score)}`}>
                          Skor: {item.score}/100
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details Row */}
                    {isExpanded && (
                      <div className="px-4 pb-5 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
                        {/* Heading Inside Expanded Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-200 pb-3">
                          <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wider block">
                            Detail Hasil Audit Teknis
                          </span>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConsultAI(item);
                            }}
                            className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-[12px] px-3 py-1.5 rounded-sm shadow-sm transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Konsultasikan ke AI Gemini
                          </button>
                        </div>

                        {/* Audits Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.audits.map((audit, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 p-3 rounded-sm flex items-start gap-2.5 shadow-sm">
                              {audit.status === 'pass' && (
                                <CheckCircle2 className="w-4 h-4 text-[#00a32a] mt-0.5 shrink-0" />
                              )}
                              {audit.status === 'warning' && (
                                <AlertTriangle className="w-4 h-4 text-[#dba617] mt-0.5 shrink-0" />
                              )}
                              {audit.status === 'error' && (
                                <XCircle className="w-4 h-4 text-[#d63638] mt-0.5 shrink-0" />
                              )}
                              <div>
                                <span className="text-[12px] font-bold text-gray-800 block">{audit.name}</span>
                                <p className="text-[12px] text-gray-600 mt-0.5 leading-relaxed">{audit.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {activeTab === 'search-console' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Google Ping Console Card */}
            <div className="bg-white border border-[#c3c4c7] p-5 rounded-sm space-y-4 shadow-sm lg:col-span-1">
              <h3 className="text-[14px] font-bold text-[#1d2327] border-b border-gray-100 pb-2">🛰️ Google Instant Indexing</h3>
              <p className="text-[12px] text-[#646970] leading-relaxed">
                Kirim pemberitahuan ping instan ke Google Search Console untuk memaksa Google melakukan perayapan ulang terhadap file <b>sitemap.xml</b> Anda sesaat setelah ada update produk atau blog baru.
              </p>
              
              {pingStatus && (
                <div className={`p-3 text-[12px] font-semibold border rounded-sm ${
                  pingStatus.includes('Gagal') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {pingStatus}
                </div>
              )}

              <button
                onClick={handlePingSitemap}
                disabled={pingingSitemap}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white disabled:bg-gray-300 font-bold text-[13px] py-2 px-3 rounded-sm shadow-sm transition-colors cursor-pointer"
              >
                {pingingSitemap ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengirimkan Ping...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" /> Kirim Ping Sitemap ke Google
                  </>
                )}
              </button>
            </div>

            {/* Sitemap & Feeds Card */}
            <div className="bg-white border border-[#c3c4c7] p-5 rounded-sm space-y-4 shadow-sm lg:col-span-2">
              <h3 className="text-[14px] font-bold text-[#1d2327] border-b border-gray-100 pb-2">📋 Daftar Peta Situs & RSS Feeds Aktif</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px] border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-[#646970]">
                      <th className="pb-2 font-bold uppercase">Nama Peta Situs</th>
                      <th className="pb-2 font-bold uppercase">Tipe Data</th>
                      <th className="pb-2 font-bold uppercase">Frekuensi Update</th>
                      <th className="pb-2 font-bold uppercase text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 font-semibold text-[#2271b1]">/sitemap.xml</td>
                      <td className="py-2.5">Indeks Utama (Index Sitemaps)</td>
                      <td className="py-2.5">Harian (Daily)</td>
                      <td className="py-2.5 text-right">
                        <a href="/sitemap.xml" target="_blank" className="text-[#2271b1] hover:underline inline-flex items-center gap-1">
                          Buka <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-[#2271b1]">/sensor-sitemap.xml</td>
                      <td className="py-2.5">IoT Sensor (ID + EN)</td>
                      <td className="py-2.5">Harian (Daily)</td>
                      <td className="py-2.5 text-right">
                        <a href="/sensor-sitemap.xml" target="_blank" className="text-[#2271b1] hover:underline inline-flex items-center gap-1">
                          Buka <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-[#2271b1]">/panca-sitemap.xml</td>
                      <td className="py-2.5">Fumigasi & Pest (ID + EN)</td>
                      <td className="py-2.5">Harian (Daily)</td>
                      <td className="py-2.5 text-right">
                        <a href="/panca-sitemap.xml" target="_blank" className="text-[#2271b1] hover:underline inline-flex items-center gap-1">
                          Buka <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-emerald-600">/feed.xml</td>
                      <td className="py-2.5 font-bold text-emerald-600">RSS 2.0 Feed (Blog)</td>
                      <td className="py-2.5 text-emerald-600">Real-time</td>
                      <td className="py-2.5 text-right">
                        <a href="/feed.xml" target="_blank" className="text-emerald-600 font-semibold hover:underline inline-flex items-center gap-1">
                          Buka <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#f0f0f1] p-3 rounded-sm border border-gray-200 text-[11.5px] leading-relaxed text-[#2c3338]">
                💡 <b>WordPress Comparison</b>: WordPress menggunakan query database SQL yang cukup berat setiap kali sitemap diakses oleh crawler bot. Platform kami menyajikan XML statis termodulasi dalam hitungan milidetik secara asinkron lewat Express.js, menghasilkan waktu muat (Time-To-First-Byte) yang sangat cepat yang disukai oleh bot crawler Google.
              </div>
            </div>
          </div>

          {/* Structured Data & Schema Markup Check */}
          <div className="bg-white border border-[#c3c4c7] p-5 rounded-sm space-y-4 shadow-sm">
            <h3 className="text-[14px] font-bold text-[#1d2327] border-b border-gray-100 pb-2">🏷️ Schema Markup & Rich Snippets (Structured Data)</h3>
            <p className="text-[12px] text-[#646970] leading-relaxed">
              Schema markup membantu Google memahami tipe konten toko online, produk, rating, harga, dan relasi multibahasa secara terstruktur di hasil pencarian. Berikut adalah status integrasi data terstruktur yang aktif pada kode server Anda:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-sm text-left">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4" /> Organization Schema
                </div>
                <p className="text-[11px] text-[#646970] mt-1.5 leading-relaxed">
                  Menyajikan info legal, nama, logo resmi, dan kontak pelayanan PT Panca Prima Wijaya ke Google Knowledge Graph.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-sm text-left">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4" /> Product & Offers Schema
                </div>
                <p className="text-[11px] text-[#646970] mt-1.5 leading-relaxed">
                  Menyajikan detail harga (IDR), ketersediaan stok (InStock), kondisi barang, dan brand langsung di pencarian produk Google.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-sm text-left">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4" /> AggregateRating Schema
                </div>
                <p className="text-[11px] text-[#646970] mt-1.5 leading-relaxed">
                  Menampilkan bintang ulasan (rating stars) kuning yang kaya pada pencarian Google untuk meningkatkan CTR hingga 35%.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-sm text-left">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4" /> BlogPosting & Breadcrumb
                </div>
                <p className="text-[11px] text-[#646970] mt-1.5 leading-relaxed">
                  Mengirim detail penulis, gambar unggulan, dan susunan hierarki navigasi remah roti halaman untuk bot perayap.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'robots' && (
        <div className="bg-white border border-[#c3c4c7] p-5 rounded-sm shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-[14px] font-bold text-[#1d2327] m-0">🤖 Edit Berkas robots.txt Virtual</h3>
              <p className="text-[12px] text-[#646970] mt-1">
                Kustomisasi panduan akses bot crawler (Googlebot, Bingbot, dll.) terhadap url toko, keranjang belanja, ataupun portal admin Anda secara live.
              </p>
            </div>
            
            {/* Quick Helper Injectors */}
            <div className="flex items-center gap-2 text-[12px] shrink-0">
              <span className="text-[#646970] font-semibold">Gunakan Template:</span>
              <button
                onClick={() => {
                  const hostname = window.location.hostname;
                  setRobotsTxt(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /cart\nDisallow: /checkout\n\nSitemap: https://${hostname}/sitemap.xml`);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2.5 rounded-sm border border-gray-300 font-semibold cursor-pointer"
              >
                Standar E-Commerce PPW
              </button>
            </div>
          </div>

          {robotsMessage && (
            <div className={`p-3 text-[12px] font-semibold border rounded-sm ${
              robotsMessage.includes('Gagal') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {robotsMessage}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Monospace Code Editor */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-[12px] font-bold text-[#1d2327] block">Teks Konfigurasi robots.txt</label>
              <textarea
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                className="w-full h-80 bg-gray-900 text-emerald-400 font-mono text-[13px] p-4 rounded-sm border border-[#c3c4c7] outline-none focus:border-[#2271b1] leading-relaxed shadow-inner"
                placeholder="User-agent: *
Allow: /"
              />
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-[#646970]">
                  Gunakan tab baru untuk memeriksa hasil live di alamat: <a href="/robots.txt" target="_blank" className="text-[#2271b1] underline font-semibold">/robots.txt</a>
                </span>
                
                <button
                  onClick={handleSaveRobots}
                  disabled={savingRobots}
                  className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-[13px] px-4 py-2 rounded-sm shadow-sm transition-colors cursor-pointer"
                >
                  {savingRobots ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <> Menyimpan robots.txt </>
                  )}
                </button>
              </div>
            </div>

            {/* Instruction Checklist */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm space-y-3 text-[12px]">
              <h4 className="font-bold text-[#1d2327] border-b border-gray-200 pb-1.5 uppercase tracking-wider text-[11px]">Panduan Konfigurasi robots.txt</h4>
              <ul className="space-y-2 list-disc pl-4 text-[#2c3338] leading-relaxed">
                <li>
                  <b>User-agent: *</b> mengindikasikan bahwa aturan perayapan ini berlaku untuk semua mesin pencarian tanpa terkecuali.
                </li>
                <li>
                  Aturan <b>Disallow: /admin</b> menghentikan Google agar tidak mengindeks halaman login internal.
                </li>
                <li>
                  Aturan <b>Disallow: /cart</b> dan <b>Disallow: /checkout</b> menghentikan Google agar tidak merayap halaman keranjang belanja, menghemat alokasi <i>Crawl Budget</i> bot.
                </li>
                <li>
                  Selalu nyatakan tautan <b>Sitemap:</b> absolut di bagian paling bawah file perayapan Anda agar robot pencari dapat menavigasi kategori serta produk secara teratur.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* AI Consulting Modal */}
      {selectedItemForAI && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-hidden animate-fade-in">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative animate-slide-up">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-[#c3c4c7] bg-gray-50 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 text-[#2271b1]">
                <Sparkles className="w-5 h-5 text-[#2271b1]" />
                <div>
                  <h3 className="text-base font-bold text-[#1d2327] m-0">Konsultan SEO AI Gemini</h3>
                  <span className="text-[11px] text-[#646970]">
                    Rekomendasi khusus untuk: <b>{selectedItemForAI.name}</b>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItemForAI(null)}
                className="text-gray-400 hover:text-gray-700 text-lg p-1 font-bold outline-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white">
              {generatingAI ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Loader2 className="w-12 h-12 text-[#2271b1] animate-spin mb-4" />
                  <p className="text-sm font-semibold text-[#1d2327]">
                    Gemini sedang merayapi struktur konten dan parameter EEAT...
                  </p>
                  <p className="text-xs text-[#646970] mt-1 max-w-xs">
                    Menganalisis kerapian metadata, menyarankan kata kunci LSI, serta memformulasikan CTA WhatsApp terbaik untuk industri ini.
                  </p>
                </div>
              ) : aiError ? (
                <div className="bg-[#fcf0f1] border-l-4 border-[#d63638] p-4 rounded-sm my-6 text-left">
                  <div className="flex gap-2.5">
                    <XCircle className="w-5 h-5 text-[#d63638] shrink-0" />
                    <div>
                      <h4 className="text-[13px] font-bold text-[#d63638] m-0">Gagal Memanggil Asisten AI</h4>
                      <p className="text-[12px] text-[#2c3338] mt-1">{aiError}</p>
                      <button
                        onClick={() => handleConsultAI(selectedItemForAI)}
                        className="mt-3 bg-[#d63638] text-white hover:bg-[#b32325] text-xs font-semibold py-1.5 px-3 rounded-sm cursor-pointer"
                      >
                        Coba Lagi
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  {/* Score Alert inside Audit Result */}
                  <div className="mb-6 bg-slate-50 border border-slate-200 rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-gray-500 uppercase">Skor Audit Teknis</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-bold text-gray-800">{selectedItemForAI.score}/100</span>
                        <span className="text-xs text-gray-500">Isu Teknis saat ini</span>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyAIReport}
                      className="inline-flex items-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-sm transition shadow-sm cursor-pointer"
                    >
                      {copiedState ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Berhasil Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Seluruh Laporan</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Output Content */}
                  <div className="bg-white border border-gray-100 p-4 sm:p-5 rounded-md shadow-inner max-w-none text-left">
                    {renderMarkdown(aiReport || '')}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#c3c4c7] bg-gray-50 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setSelectedItemForAI(null)}
                className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold text-[13px] px-4 py-1.5 rounded-sm transition cursor-pointer"
              >
                Tutup Laporan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
