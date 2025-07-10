
# 📰 Chronix — AI-Curated News Platform

**Chronix** is a modern, AI-powered news website that delivers **real-time, bias-free headlines** across the globe. Built for speed, clarity, and trust — powered by Framer and deployed with Vercel.

---

## 🚀 Live Site

🌐 [https://chronix-site.vercel.app](https://chronix-site.)

# Chronix - AI-Powered News Website

A fully automated, dark-themed AI-powered news website that aggregates and categorizes news from around the world with sentiment analysis.

## 🌟 Features

- **Automated News Fetching**: Automatically fetches news using NewsAPI
- **Category Filtering**: Filter by Technology, World, Health, Finance, Sports, and Politics
- **Mood-Based Filtering**: Filter by Positive, Neutral, or Negative sentiment
- **Dark Theme**: Beautiful dark-themed UI with modern design
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Updates**: Live news updates with refresh functionality
- **AI Sentiment Analysis**: Built-in sentiment analysis for mood filtering
- **Search Functionality**: Search through articles by keywords

## 🚀 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **News API**: NewsAPI (free tier)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chronix-news-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your NewsAPI key:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   ```

4. **Get a free NewsAPI key**
   - Visit [NewsAPI](https://newsapi.org/)
   - Sign up for a free account
   - Copy your API key
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Viewing News
- The homepage displays all available news articles
- Articles are automatically categorized and sentiment-analyzed
- Each article shows category, sentiment, source, and publication time

### Filtering
- **Category Filter**: Click on category buttons to filter by news type
- **Mood Filter**: Filter articles by positive, neutral, or negative sentiment
- **Search**: Use the search bar to find specific articles
- **Clear Filters**: Reset all filters to view all articles

### Refreshing News
- Click the "Refresh News" button to fetch the latest articles
- The last update time is displayed below the refresh button

## 🏗️ Project Structure

```
chronix-news-ai/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── NewsCard.tsx         # Individual news article card
│   └── NewsFilters.tsx      # Filter controls
├── types/
│   └── news.ts              # TypeScript type definitions
├── utils/
│   └── newsApi.ts           # News API utilities and sentiment analysis
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
└── README.md                # Project documentation
```

## 🎨 Customization

### Colors and Theme
The dark theme colors are defined in `tailwind.config.js`:
- `chronix-bg`: Main background color
- `chronix-card`: Card background color
- `chronix-border`: Border colors
- `chronix-text`: Primary text color
- `chronix-textSecondary`: Secondary text color

### Categories
Add or modify categories in `utils/newsApi.ts`:
```typescript
const CATEGORY_QUERIES: Record<NewsCategory, string[]> = {
  technology: ['technology', 'tech', 'artificial intelligence'],
  // Add your custom categories here
};
```

### Sentiment Analysis
Modify sentiment keywords in `utils/newsApi.ts`:
```typescript
const SENTIMENT_KEYWORDS = {
  positive: ['success', 'growth', 'innovation'],
  negative: ['crisis', 'disaster', 'failure'],
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features
1. Create new components in the `components/` directory
2. Add new types in `types/news.ts`
3. Extend API utilities in `utils/newsApi.ts`
4. Update the main page in `app/page.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing free news data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your environment and steps to reproduce

---

**Built with ❤️ using Next.js and AI** 

