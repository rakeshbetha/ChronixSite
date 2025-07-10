'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import Header from '@/components/Header';
import NewsFilters from '@/components/NewsFilters';
import NewsCard from '@/components/NewsCard';
import { NewsArticle, NewsCategory, Sentiment, FilterState } from '@/types/news';
import { fetchAllNews, filterArticles } from '@/utils/newsApi';

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    sentiment: 'all',
    searchQuery: ''
  });

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchNews();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Update next refresh time
  useEffect(() => {
    if (autoRefresh) {
      const next = new Date(Date.now() + 30 * 60 * 1000);
      setNextUpdate(next.toLocaleTimeString());
    }
  }, [lastUpdated, autoRefresh]);

  // Filter articles when filters change
  useEffect(() => {
    const filtered = filterArticles(
      articles,
      filters.category,
      filters.sentiment,
      filters.searchQuery
    );
    setFilteredArticles(filtered);
  }, [articles, filters]);

  // Log filter changes
  useEffect(() => {
    console.log('[Chronix] Filters changed:', filters);
  }, [filters]);

  // Log filtered article count
  useEffect(() => {
    console.log(`[Chronix] Filtered articles count: ${filteredArticles.length}`);
  }, [filteredArticles]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[Chronix] Fetching all news...');
      const newsData = await fetchAllNews();
      setArticles(newsData);
      setLastUpdated(new Date().toLocaleString());
      console.log(`[Chronix] News fetched. Total articles: ${newsData.length}`);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('[Chronix] Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: NewsCategory | 'all') => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSentimentChange = (sentiment: Sentiment | 'all') => {
    setFilters(prev => ({ ...prev, sentiment }));
  };

  const handleSearchChange = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      sentiment: 'all',
      searchQuery: ''
    });
  };

  const getStats = () => {
    const totalArticles = articles.length;
    const positiveArticles = articles.filter(a => a.sentiment === 'positive').length;
    const negativeArticles = articles.filter(a => a.sentiment === 'negative').length;
    const neutralArticles = articles.filter(a => a.sentiment === 'neutral').length;

    return { totalArticles, positiveArticles, negativeArticles, neutralArticles };
  };

  const stats = getStats();

  // Add this helper to determine active sentiment
  const isSentimentActive = (sentiment: Sentiment | 'all') => filters.sentiment === sentiment;

  return (
    <div className="min-h-screen bg-chronix-bg">
      <Header selectedCategory={filters.category} onCategoryChange={handleCategoryChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-section"
        >
          <h1 className="hero-heading">
            Real-time. Bias-free. <span className="background-gradient">AI-curated.</span>
          </h1>
          <p className="hero-sub">
            Stay informed with AI-curated news from around the world.<br />
            Filter by category and mood to get the news that matters to you.
          </p>
        </motion.section>

        {/* Stats, Controls, Update Info */}
        <div>
          {/* Stats - now clickable */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              className={`bg-chronix-card border border-chronix-border rounded-lg p-4 focus:outline-none transition-all duration-150 ${isSentimentActive('all') ? 'ring-2 ring-primary-500 scale-105' : ''}`}
              onClick={() => setFilters(f => ({ ...f, sentiment: 'all' }))}
              aria-label="Show all articles"
            >
              <div className="text-2xl font-bold text-chronix-text">{stats.totalArticles}</div>
              <div className="text-sm text-chronix-textSecondary font-semibold">Total Articles</div>
            </button>
            <button
              className={`bg-chronix-card border border-chronix-border rounded-lg p-4 focus:outline-none transition-all duration-150 ${isSentimentActive('positive') ? 'ring-2 ring-green-500 scale-105' : ''}`}
              onClick={() => setFilters(f => ({ ...f, sentiment: 'positive' }))}
              aria-label="Show positive articles"
            >
              <div className="text-2xl font-bold text-green-500">{stats.positiveArticles}</div>
              <div className="text-sm text-chronix-textSecondary font-semibold">Positive</div>
            </button>
            <button
              className={`bg-chronix-card border border-chronix-border rounded-lg p-4 focus:outline-none transition-all duration-150 ${isSentimentActive('neutral') ? 'ring-2 ring-gray-500 scale-105' : ''}`}
              onClick={() => setFilters(f => ({ ...f, sentiment: 'neutral' }))}
              aria-label="Show neutral articles"
            >
              <div className="text-2xl font-bold text-gray-500">{stats.neutralArticles}</div>
              <div className="text-sm text-chronix-textSecondary font-semibold">Neutral</div>
            </button>
            <button
              className={`bg-chronix-card border border-chronix-border rounded-lg p-4 focus:outline-none transition-all duration-150 ${isSentimentActive('negative') ? 'ring-2 ring-red-500 scale-105' : ''}`}
              onClick={() => setFilters(f => ({ ...f, sentiment: 'negative' }))}
              aria-label="Show negative articles"
            >
              <div className="text-2xl font-bold text-red-500">{stats.negativeArticles}</div>
              <div className="text-sm text-chronix-textSecondary font-semibold">Negative</div>
            </button>
          </div>

          {/* Auto-refresh Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <button
              onClick={fetchNews}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Refreshing...' : 'Refresh News'}</span>
            </button>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
            </button>
          </div>

          {/* Update Info */}
          <div className="text-sm text-chronix-textSecondary space-y-1">
            {lastUpdated && (
              <p>Last updated: {lastUpdated}</p>
            )}
            {autoRefresh && nextUpdate && (
              <p>Next auto-refresh: {nextUpdate}</p>
            )}
          </div>
        </div>

        {/* Filters */}
        <NewsFilters
          selectedCategory={filters.category}
          selectedSentiment={filters.sentiment}
          searchQuery={filters.searchQuery}
          onCategoryChange={handleCategoryChange}
          onSentimentChange={handleSentimentChange}
          onSearchChange={handleSearchChange}
          onClearFilters={handleClearFilters}
        />

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center space-x-3"
          >
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-500">{error}</span>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <RefreshCw className="h-6 w-6 animate-spin text-primary-500" />
              <span className="text-chronix-textSecondary">Loading latest news...</span>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <>
            {filteredArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <TrendingUp className="h-12 w-12 text-chronix-textSecondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-chronix-text mb-2">No articles found</h3>
                <p className="text-chronix-textSecondary">
                  Try adjusting your filters or search terms to find more articles.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <NewsCard key={article.id} article={article} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-chronix-card border-t border-chronix-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="logo-text mb-2">Chronix</h3>
            <p className="text-chronix-textSecondary">
              AI-powered news aggregation platform. Stay informed with curated content from around the world.
            </p>
            <p className="text-xs text-chronix-textSecondary mt-4">
              Powered by GNews • Built with Next.js • Sentiment analysis by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 