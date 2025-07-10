export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  category: NewsCategory;
  sentiment: Sentiment;
}

export type NewsCategory = 
  | 'technology'
  | 'world'
  | 'health'
  | 'finance'
  | 'sports'
  | 'politics'
  | 'general';

export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface FilterState {
  category: NewsCategory | 'all';
  sentiment: Sentiment | 'all';
  searchQuery: string;
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
} 