const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'demo';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const DATA_FILE = path.join(__dirname, '../data/news-cache.json');
const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Categories to fetch
const categories = ['technology', 'world', 'health', 'finance', 'sports', 'politics'];

// Simple sentiment analysis
const SENTIMENT_KEYWORDS = {
  positive: [
    'breakthrough', 'success', 'win', 'victory', 'growth', 'profit', 'recovery',
    'improve', 'better', 'positive', 'good', 'great', 'excellent', 'amazing',
    'innovation', 'discovery', 'achievement', 'milestone', 'record', 'high'
  ],
  negative: [
    'crisis', 'disaster', 'crash', 'fall', 'decline', 'loss', 'failure',
    'negative', 'bad', 'terrible', 'awful', 'worst', 'deadly', 'fatal',
    'attack', 'war', 'conflict', 'protest', 'strike', 'bankruptcy'
  ]
};

function analyzeSentiment(text) {
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;

  SENTIMENT_KEYWORDS.positive.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      positiveScore += matches.length;
    }
  });

  SENTIMENT_KEYWORDS.negative.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      negativeScore += matches.length;
    }
  });

  if (positiveScore > negativeScore) {
    return 'positive';
  } else if (negativeScore > positiveScore) {
    return 'negative';
  } else {
    return 'neutral';
  }
}

function generateId(url) {
  return Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
}

function getDefaultImage(category) {
  const categoryImages = {
    technology: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    world: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    finance: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    politics: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    general: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop'
  };
  
  return categoryImages[category] || categoryImages.general;
}

async function fetchNewsByCategory(category) {
  try {
    const queries = {
      technology: ['technology', 'tech', 'artificial intelligence'],
      world: ['world', 'international', 'global'],
      health: ['health', 'medical', 'healthcare'],
      finance: ['finance', 'economy', 'business'],
      sports: ['sports', 'football', 'basketball'],
      politics: ['politics', 'government', 'election']
    };

    const categoryQueries = queries[category] || [category];
    const articles = [];

    for (const query of categoryQueries.slice(0, 2)) {
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        params: {
          q: query,
          apiKey: NEWS_API_KEY,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 10,
        },
      });

      if (response.data.status === 'ok') {
        const processedArticles = response.data.articles
          .filter(article => article.title && article.description)
          .map(article => ({
            id: generateId(article.url),
            title: article.title || 'No title available',
            description: article.description || 'No description available',
            content: article.content || article.description || 'No content available',
            url: article.url,
            urlToImage: article.urlToImage || getDefaultImage(category),
            publishedAt: article.publishedAt,
            source: {
              id: article.source?.id || null,
              name: article.source?.name || 'Unknown Source'
            },
            author: article.author,
            category,
            sentiment: analyzeSentiment(article.title + ' ' + article.description)
          }));
        
        articles.push(...processedArticles);
      }
    }

    return articles.slice(0, 20);
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error);
    return [];
  }
}

async function fetchAllNews() {
  console.log('🔄 Starting news refresh...');
  const allArticles = [];

  for (const category of categories) {
    console.log(`📰 Fetching ${category} news...`);
    const articles = await fetchNewsByCategory(category);
    allArticles.push(...articles);
  }

  const sortedArticles = allArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const newsData = {
    articles: sortedArticles,
    lastUpdated: new Date().toISOString(),
    totalArticles: sortedArticles.length,
    categories: categories.reduce((acc, cat) => {
      acc[cat] = sortedArticles.filter(a => a.category === cat).length;
      return acc;
    }, {}),
    sentiments: {
      positive: sortedArticles.filter(a => a.sentiment === 'positive').length,
      neutral: sortedArticles.filter(a => a.sentiment === 'neutral').length,
      negative: sortedArticles.filter(a => a.sentiment === 'negative').length
    }
  };

  // Save to file
  fs.writeFileSync(DATA_FILE, JSON.stringify(newsData, null, 2));
  
  console.log(`✅ News refresh complete! Fetched ${sortedArticles.length} articles`);
  console.log(`📊 Categories:`, newsData.categories);
  console.log(`😊 Sentiments:`, newsData.sentiments);
  console.log(`💾 Data saved to: ${DATA_FILE}`);
  
  return newsData;
}

// Initial fetch
fetchAllNews();

// Set up interval
setInterval(fetchAllNews, REFRESH_INTERVAL);

console.log(`🤖 Chronix Auto-Refresh Service Started`);
console.log(`⏰ Refresh interval: ${REFRESH_INTERVAL / 60000} minutes`);
console.log(`📁 Data file: ${DATA_FILE}`);
console.log(`🔑 API Key: ${NEWS_API_KEY === 'demo' ? 'DEMO MODE' : 'CONFIGURED'}`);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down auto-refresh service...');
  process.exit(0);
}); 