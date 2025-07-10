'use client';

import Link from 'next/link';
import { NewsCategory } from '@/types/news';
import Image from 'next/image';

const categories: { value: NewsCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'technology', label: 'Technology' },
  { value: 'world', label: 'World' },
  { value: 'health', label: 'Health' },
  { value: 'finance', label: 'Finance' },
  { value: 'sports', label: 'Sports' },
  { value: 'politics', label: 'Politics' },
];

interface HeaderProps {
  selectedCategory: NewsCategory | 'all';
  onCategoryChange: (category: NewsCategory | 'all') => void;
}

export default function Header({ selectedCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className="bg-chronix-bg border-b border-chronix-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Chronix Logo"
            width={48}
            height={48}
            priority
          />
          <span
            className="logo-text text-3xl font-extrabold tracking-tight uppercase"
            style={{ letterSpacing: '-0.02em' }}
          >
            CHRONIX
          </span>
        </div>
        {/* Navigation - categories */}
        <nav className="flex space-x-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`nav-link text-lg ${selectedCategory === cat.value ? 'text-chronix-primary font-bold underline underline-offset-8' : 'text-chronix-menuInactive font-normal'} hover:font-bold`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
} 