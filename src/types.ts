export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  seotitle: string;
  seodescription: string;
  image?: string;
  canonical?: string;
  robots?: string;
  ogtitle?: string;
  ogdescription?: string;
  ogimage?: string;
  twittercard?: string;
  category?: string;
  status?: string;
  createdat: string;
  title_en?: string;
  slug_en?: string;
  content_en?: string;
  seotitle_en?: string;
  seodescription_en?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  featuredImage?: string;
  canonical?: string;
  robots?: string;
  ogtitle?: string;
  ogdescription?: string;
  ogimage?: string;
  twittercard?: string;
  category?: string;
  status?: string;
  createdat: string;
  site?: 'panca' | 'sensor';
  title_en?: string;
  slug_en?: string;
  content_en?: string;
  seotitle_en?: string;
  seodescription_en?: string;
  keywords_en?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  gallery?: string[];
  description: string;
  seoArticle?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  site?: 'panca' | 'sensor';
  name_en?: string;
  slug_en?: string;
  description_en?: string;
  seoarticle_en?: string;
  seotitle_en?: string;
  seodescription_en?: string;
  keywords_en?: string;
  gtin?: string;
  mpn?: string;
  brand?: string;
  condition?: string;
}

export interface BlockStyle {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: string;
  borderRadius?: string;
  minHeight?: string;
  width?: string;
  display?: string;
  flexDirection?: 'row' | 'column';
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
}

export interface Block {
  id: string;
  type: string;
  data: any;
  styles?: BlockStyle;
  children?: Block[];
}

export interface HomeSettings {
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
  blocks: Block[];
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Array<{ productId: string; quantity: number }>;
}

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  recentTraffic: Array<{ name: string; views: number }>;
  topProducts: string[];
}

