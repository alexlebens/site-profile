# Alex Lebens Personal Site

Personal site used for information about myself and blog.

## Features

- 🚀 **Maximum Performance** - Built with Astro.js for lightning-fast static sites
- 🎨 **Minimalist Design** - Clean UI that focuses on content
- 🌓 **Light/Dark Mode** - Smooth theme switching
- 📱 **Responsive** - Perfect experience on all devices
- ⚡ **SPA Transitions** - Smooth page navigation with transition effects
- 📝 **Markdown & MDX** - Write posts with Markdown and extend with MDX
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- 📊 **Analytics** - Reading time, views, and statistics
- 🔖 **Categorization** - Tags and categories system
- 🔄 **RSS Feed** - Automatically generated RSS feed
- 🌐 **Internationalization Ready** - Prepared for multiple languages
- 🔒 **Secure** - No unnecessary client-side JavaScript

## Getting Started

### Requirements

- Node.js 16+ and pnpm/yarn

### Installation

```bash
# Clone repository
git clone https://gitea.alexlebens.dev/alexlebens/site-profile

# Navigate to project directory
cd astro-blog

# Install dependencies
pnpm install

# Create .env file from template
cp .env.example .env

# Edit .env with your information
```

### Development

```bash
# Start development server
pnpm run dev

# Open browser at http://localhost:4321
```

### Build

```bash
# Create production build
pnpm run build

# Preview production build
pnpm run preview
```

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Blog content (Markdown/MDX)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Pages and routes
│   ├── styles/         # CSS and Tailwind
│   └── utils/          # Utilities and helpers
├── astro.config.mjs    # Astro configuration
├── tailwind.config.js  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```
