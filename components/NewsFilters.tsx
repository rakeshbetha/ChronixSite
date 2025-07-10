'use client';

import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { NewsCategory, Sentiment } from '@/types/news';

interface NewsFiltersProps {
  selectedCategory: NewsCategory | 'all';
  selectedSentiment: Sentiment | 'all';
  searchQuery: string;
  onCategoryChange: (category: NewsCategory | 'all') => void;
  onSentimentChange: (sentiment: Sentiment | 'all') => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

const categories = [
  { value: 'all', label: 'All Categories', icon: '🌐' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'world', label: 'World', icon: '🌍' },
  { value: 'health', label: 'Health', icon: '🏥' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'politics', label: 'Politics', icon: '🏛️' },
] as const;

const sentiments = [
  { value: 'all', label: 'All Moods', icon: '😐' },
  { value: 'positive', label: 'Positive', icon: '😊' },
  { value: 'neutral', label: 'Neutral', icon: '😐' },
  { value: 'negative', label: 'Negative', icon: '😔' },
] as const;

export default function NewsFilters({
  selectedCategory,
  selectedSentiment,
  searchQuery,
  onCategoryChange,
  onSentimentChange,
  onSearchChange,
  onClearFilters,
}: NewsFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = selectedCategory !== 'all' || selectedSentiment !== 'all' || searchQuery;

  return (
    <div className="bg-chronix-card border border-chronix-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-chronix-textSecondary" />
          <h3 className="text-lg font-semibold text-chronix-text">Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-chronix-textSecondary hover:text-chronix-text transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-chronix-textSecondary" />
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-chronix-bg border border-chronix-border rounded-md text-chronix-text placeholder-chronix-textSecondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-chronix-textSecondary mb-2">Category</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-chronix-bg text-chronix-text hover:bg-chronix-border'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sentiment Filter */}
          <div>
            <h4 className="text-sm font-medium text-chronix-textSecondary mb-2">Mood</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {sentiments.map((sentiment) => (
                <button
                  key={sentiment.value}
                  onClick={() => onSentimentChange(sentiment.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedSentiment === sentiment.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-chronix-bg text-chronix-text hover:bg-chronix-border'
                  }`}
                >
                  <span>{sentiment.icon}</span>
                  <span className="hidden sm:inline">{sentiment.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClearFilters}
          className="flex items-center space-x-2 text-chronix-textSecondary hover:text-chronix-text transition-colors mt-4"
        >
          <X className="h-4 w-4" />
          <span>Clear all filters</span>
        </motion.button>
      )}
    </div>
  );
} 