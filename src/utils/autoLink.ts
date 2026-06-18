export const KEYWORDS = [
  { text: 'jasa fumigasi beras', url: '/panca/jasa-fumigasi-beras' },
  { text: 'jasa fumigasi gudang', url: '/panca/sanitasi-gudang-pangan-profesional' },
  { text: 'sanitasi gudang pangan profesional', url: '/panca/sanitasi-gudang-pangan-profesional' },
  { text: 'sanitasi gudang pangan', url: '/panca/sanitasi-gudang-pangan-profesional' },
  { text: 'sanitasi gudang', url: '/panca/sanitasi-gudang-pangan-profesional' },
  { text: 'jasa fumigasi kapal', url: '/panca/jasa-fumigasi-kapal' },
  { text: 'jasa fumigasi kontainer', url: '/panca/jasa-fumigasi-kapal' },
  { text: 'fumigasi kapal', url: '/panca/jasa-fumigasi-kapal' },
  { text: 'fumigasi kontainer', url: '/panca/jasa-fumigasi-kapal' },
  { text: 'fumigasi fosfin', url: '/panca/produk/fumiphos' },
  { text: 'fumigasi jagung', url: '/panca/jasa-fumigasi-beras' },
  { text: 'fumigasi biji kopi', url: '/panca/jasa-fumigasi-beras' },
  { text: 'fumigasi pakan ternak', url: '/panca/jasa-fumigasi-beras' },
  { text: 'kutu beras', url: '/panca/produk/fumiphos' },
  { text: 'kumbang gudang', url: '/panca/produk/silogud' },
  { text: 'silo', url: '/panca/produk' },
  { text: 'hama gudang', url: '/panca' },
  { text: 'pengendalian hama', url: '/panca' },
  { text: 'sensor gempa', url: '/sensor/sensor-gempa' },
  { text: 'building management system', url: '/sensor/building-management-system' },
  { text: 'early warning system', url: '/sensor/early-warning-system' },
  { text: 'real time monitoring', url: '/sensor/real-time-monitoring-system-rtms' },
  { text: 'sparepart lift', url: '/sensor/sparepart-lift-terlengkap' },
  { text: 'fumiphos', url: '/panca/produk/fumiphos' },
  { text: 'silogud', url: '/panca/produk/silogud' }
].sort((a, b) => b.text.length - a.text.length);

export const BASE_URL = 'https://pancaprimawijaya.web.id';

export const usedKeywordsTracker = new Set<string>();

export function resetAutoLinkTracker() {
  usedKeywordsTracker.clear();
}

export function applyAutoLinkHtml(html: string): string {
  if (typeof window === 'undefined') return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
  
  const textsToProcess: Text[] = [];
  let node;
  while ((node = walker.nextNode())) {
    let parent = node.parentElement;
    let isInsideLink = false;
    // Don't process inside specific tags like A, BUTTON, SCRIPT, STYLE, H1, H2, H3
    while (parent) {
      if (['A', 'BUTTON', 'SCRIPT', 'STYLE', 'H1', 'H2', 'H3'].includes(parent.tagName)) {
        isInsideLink = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (!isInsideLink && node.nodeValue?.trim() !== '') {
      textsToProcess.push(node as Text);
    }
  }

  for (const kw of KEYWORDS) {
    if (usedKeywordsTracker.has(kw.text)) continue;
    
    const escapedKw = kw.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escapedKw})\\b`, 'i');
    let matched = false;

    for (let i = 0; i < textsToProcess.length; i++) {
      const textNode = textsToProcess[i];
      if (matched) break;

      const match = textNode.nodeValue?.match(regex);
      if (match && match.index !== undefined) {
        matched = true;
        usedKeywordsTracker.add(kw.text);
        
        const matchedText = match[0];
        const before = textNode.nodeValue!.substring(0, match.index);
        const after = textNode.nodeValue!.substring(match.index + matchedText.length);
        
        const isEn = typeof window !== 'undefined' && (window.location.pathname.startsWith('/en') || window.location.pathname === '/en');
        const targetUrl = isEn ? `/en${kw.url}` : kw.url;

        const a = document.createElement('a');
        a.href = `${BASE_URL}${targetUrl}`;
        a.textContent = matchedText;
        a.className = 'text-[#16a34a] hover:text-[#15803d] underline decoration-dotted underline-offset-2 font-semibold transition-colors';
        
        const parent = textNode.parentNode;
        if (parent) {
          const beforeNode = document.createTextNode(before);
          const afterNode = document.createTextNode(after);
          
          parent.insertBefore(beforeNode, textNode);
          parent.insertBefore(a, textNode);
          parent.insertBefore(afterNode, textNode);
          parent.removeChild(textNode);
          
          textsToProcess[i] = afterNode;
        }
      }
    }
  }

  // Auto-enrich image alt attributes with target keywords
  const imgs = doc.querySelectorAll('img');
  const fallbackKws = [
    'Jasa Fumigasi Beras',
    'Sanitasi Gudang Pangan',
    'Jasa Fumigasi Kapal',
    'Fumigasi Kontainer',
    'Fumigasi Fosfin PT Panca Prima Wijaya',
    'Sanitasi Gudang Pangan Profesional',
    'Pembasmi Kutu Beras Terbaik',
    'Fumiphos dan Silogud Obat Kutu Beras',
    'Pengendalian Hama Gudang Beras'
  ];
  
  imgs.forEach((img, idx) => {
    let currentAlt = img.getAttribute('alt') || '';
    const kw = fallbackKws[idx % fallbackKws.length];
    
    if (!currentAlt || currentAlt.trim() === '') {
      img.setAttribute('alt', `${kw} - PT Panca Prima Wijaya`);
    } else {
      const lower = currentAlt.toLowerCase();
      const hasBrand = lower.includes('panca') || lower.includes('wijaya');
      const hasKeywords = lower.includes('fumigasi') || lower.includes('sanitasi') || lower.includes('hama');
      
      let newAlt = currentAlt;
      if (!hasKeywords) {
        newAlt = `${newAlt} | ${kw}`;
      }
      if (!hasBrand) {
        newAlt = `${newAlt} - PT Panca Prima Wijaya`;
      }
      img.setAttribute('alt', newAlt.trim().replace(/\s+/g, ' '));
    }
    
    // Add loading="lazy" for good web vitals and SEO performance!
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  return doc.body.innerHTML;
}
