'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Clock, User } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '@/types/news';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const sentimentConfig = {
  positive: {
    color: 'text-chronix-green',
    bgColor: 'bg-chronix-green/10',
    borderColor: 'border-chronix-green/20',
    icon: '😊',
    label: 'Positive'
  },
  neutral: {
    color: 'text-chronix-menuInactive',
    bgColor: 'bg-chronix-menuInactive/10',
    borderColor: 'border-chronix-menuInactive/20',
    icon: '😐',
    label: 'Neutral'
  },
  negative: {
    color: 'text-chronix-red',
    bgColor: 'bg-chronix-red/10',
    borderColor: 'border-chronix-red/20',
    icon: '😔',
    label: 'Negative'
  }
};

const categoryConfig = {
  technology: { color: 'text-chronix-primary', bgColor: 'bg-chronix-primary/10' },
  world: { color: 'text-chronix-green', bgColor: 'bg-chronix-green/10' },
  health: { color: 'text-chronix-red', bgColor: 'bg-chronix-red/10' },
  finance: { color: 'text-chronix-accent', bgColor: 'bg-chronix-accent/10' },
  sports: { color: 'text-chronix-accent', bgColor: 'bg-chronix-accent/10' },
  politics: { color: 'text-chronix-red', bgColor: 'bg-chronix-red/10' },
  general: { color: 'text-chronix-menuInactive', bgColor: 'bg-chronix-menuInactive/10' }
};

export default function NewsCard({ article, index }: NewsCardProps) {
  const sentiment = sentimentConfig[article.sentiment];
  const category = categoryConfig[article.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-chronix-card border border-chronix-border rounded-lg overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.urlToImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.color}`}>
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>

        {/* Sentiment Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${sentiment.bgColor} ${sentiment.color} flex items-center space-x-1`}>
            <span>{sentiment.icon}</span>
            <span className="hidden sm:inline">{sentiment.label}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-chronix-text mb-2 line-clamp-2 hover:text-chronix-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-chronix-textSecondary text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-chronix-textSecondary mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{article.author || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
            </div>
          </div>
          <span className="font-medium">{article.source.name}</span>
        </div>

        {/* Action Button */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-chronix-primary text-white rounded-md hover:bg-chronix-accent transition-colors text-sm font-medium"
        >
          <span>Read More</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
} 