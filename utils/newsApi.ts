import axios from 'axios';
import { NewsArticle, NewsCategory, Sentiment } from '@/types/news';

const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || 'demo';
const GNEWS_API_BASE_URL = 'https://gnews.io/api/v4/top-headlines';

const ALLOWED_IMAGE_DOMAINS = [
  'images.unsplash.com',
  'via.placeholder.com',
  'platform.theverge.com',
  'cdn1.miragenews.com',
  'img.us.news.samsung.com',
  'cdn.mos.cms.futurecdn.net',
  'mma.prnewswire.com',
  'img.global.news.samsung.com',
  'imageio.forbes.com',
  'i.pcmag.com',
  'www.fipp.com',
  'www.mei.edu',
  'i.guim.co.uk',
  'i2-prod.mirror.co.uk',
  'static.toiimg.com',
  'img2.thejournal.ie',
  'dims.apnews.com',
  'media.mehrnews.com',
  'www.rte.ie',
];

function isAllowedImage(url: string): boolean {
  try {
    return ALLOWED_IMAGE_DOMAINS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

function getFallbackImage(category: NewsCategory | 'all'): string {
  // You can customize per category if you want
  return 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop';
}

export async function fetchNewsByCategory(category: NewsCategory | 'all'): Promise<NewsArticle[]> {
  try {
    const params: any = {
      token: GNEWS_API_KEY,
      lang: 'en',
      max: 10,
    };
    if (category !== 'all') {
      params.topic = category;
    }
    console.log(`[Chronix] Fetching GNews for category: ${category}`);
    const response = await axios.get(GNEWS_API_BASE_URL, { params });
    if (response.data.articles && response.data.articles.length > 0) {
      const articles = response.data.articles.map((article: any) => processGNewsArticle(article, category));
      console.log(`[Chronix] GNews fetched ${articles.length} articles for category: ${category}`);
      return articles;
    }
    console.warn(`[Chronix] GNews returned 0 articles for category: ${category}`);
    return [];
  } catch (error) {
    console.error(`[Chronix] Error fetching GNews for category ${category}:`, error);
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const categories: (NewsCategory | 'all')[] = ['technology', 'world', 'health', 'finance', 'sports', 'politics'];
  let allArticles: NewsArticle[] = [];
  for (const category of categories) {
    const articles = await fetchNewsByCategory(category);
    allArticles = allArticles.concat(articles);
  }
  console.log(`[Chronix] All GNews fetched. Total articles: ${allArticles.length}`);
  return allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function processGNewsArticle(apiArticle: any, category: NewsCategory | 'all'): NewsArticle {
  // Use fallback image if not allowed
  const imageUrl = isAllowedImage(apiArticle.image)
    ? apiArticle.image
    : getFallbackImage(category);
  return {
    id: apiArticle.url,
    title: apiArticle.title,
    description: apiArticle.description,
    content: apiArticle.content,
    url: apiArticle.url,
    urlToImage: imageUrl,
    publishedAt: apiArticle.publishedAt,
    source: {
      id: null,
      name: apiArticle.source?.name || 'Unknown Source',
    },
    author: null,
    category: category === 'all' ? 'general' : category,
    sentiment: 'neutral', // You can run your sentiment analysis here
  };
}

export function filterArticles(
  articles: NewsArticle[],
  category: NewsCategory | 'all',
  sentiment: Sentiment | 'all',
  searchQuery: string
): NewsArticle[] {
  return articles.filter(article => {
    const matchesCategory = category === 'all' || article.category === category;
    const matchesSentiment = sentiment === 'all' || article.sentiment === sentiment;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSentiment && matchesSearch;
  });
} 