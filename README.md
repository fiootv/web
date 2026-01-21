# FiooTV - Best IPTV Service Provider

Modern web application for FiooTV, the #1 Best IPTV Service Provider offering 4000+ live TV channels from around the world.

## About FiooTV

FiooTV is a premium IPTV (Internet Protocol Television) service that delivers television services over the Internet. Unlike traditional cable or satellite TV, FiooTV offers:

- **4000+ Live Channels** - Access to channels from around the world
- **Multi-Device Support** - Watch on TV, smartphones, laptops, and handheld devices
- **Affordable Pricing** - Starting at $15.99/month
- **Simultaneous Access** - One subscription works on multiple devices
- **24/7 Customer Support** - Dedicated support team to help with setup
- **No Hidden Costs** - One subscription, no additional fees

## Features

- 🎬 **Unlimited Entertainment** - Premium TV shows, movies, sports events, and more
- 📱 **Cross-Platform** - Works on Android, iOS, Smart TVs, PC, Mac, and more
- ⚡ **Fast & Secure Servers** - 59 different servers for optimal performance
- 📺 **Live TV Guide** - Free TV program guide included
- 🔒 **Secure Authentication** - User authentication and protected routes
- 🌙 **Dark Mode** - Theme switcher for comfortable viewing

## Tech Stack

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Supabase** - Authentication and backend services

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tv-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   ```

   - You can find Supabase values in your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api).
   - Get your TMDB API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api). The API key is used to display real movie posters on the home page.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tv-web/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── protected/         # Protected routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
└── lib/                  # Utility functions
    └── supabase/         # Supabase client configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

The application uses Supabase for authentication. Users can:
- Sign up for a new account
- Sign in to existing account
- Reset forgotten password
- Update password
- Access protected routes

## Deployment

The application can be deployed to Vercel, Netlify, or any platform that supports Next.js.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy

## Support

For support, contact FiooTV:
- Phone: +1-855-561-4578
- Website: https://www.fiootv.com

## License

Copyright © 2025 Fioo TV. All rights reserved.
