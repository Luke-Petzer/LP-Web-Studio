// Project data structure for Cafe Crave and other projects

export interface ProjectData {
  id: string;
  hero: {
    title: string;
    tagline: string;
    image: string;
    category: string;
    date: string;
  };
  overview: {
    description: string;
    purpose: string;
    targetAudience: string;
    keyFeatures: string[];
    scope: string;
  };
  techStack: {
    frontend: string[];
    backend: string[];
    libraries: string[];
    tools: string[];
    apis: string[];
  };
  timeline: {
    duration: string;
    phases: Array<{
      phase: string;
      description: string;
    }>;
  };
  challenges: Array<{
    challenge: string;
    solution: string;
  }>;
  learnings: string[];
  gallery: Array<{
    src: string;
    alt: string;
    description: string;
  }>;
  colors: Array<{
    name: string;
    hex: string;
    usage: string;
  }>;
  // Additional fields for compatibility with existing structure
  link?: string;
  client?: string;
  role?: string;
}

export const cafeCraveData: ProjectData = {
  id: 'cafe-client',
  hero: {
    title: 'Cafe Crave Website',
    tagline: 'A full-stack, retro-inspired website for a local café, featuring a secure API for live Google Reviews',
    image: '/CC-card.png',
    category: 'Full-Stack Web Application',
    date: 'November 2025'
  },
  overview: {
    description: 'Cafe Crave is a modern, responsive website for a retro-inspired, halal-friendly café in Claremont, Cape Town. The site is designed to capture the cafe\'s unique vibe, blending coffee culture, classic vinyl, and community. It features a full menu, an interactive vinyl collection browser, and event information.',
    purpose: 'The primary goal was to create a professional online presence that reflects the cafe\'s unique brand. Key objectives included driving foot traffic via clear location/contact info, showcasing their full menu, and building social proof by integrating live Google Reviews via a custom API.',
    targetAudience: 'Local residents and students in Cape Town, tourists, coffee enthusiasts, vinyl collectors, and anyone seeking a halal-friendly café with a unique, community-focused atmosphere.',
    keyFeatures: [
      'Full-Stack Google Reviews API: A custom Node.js backend that securely fetches and caches live Google Reviews, protecting the client\'s API key',
      'Interactive Vinyl Collection: A filterable gallery of the cafe\'s vinyl collection, complete with album details and descriptions',
      'Dynamic Menu Page: A filterable menu page with a sticky navigation bar that "spy-scrolls" to the active category using an IntersectionObserver',
      'Complete SEO Implementation: Per-page meta tags (react-helmet-async), JSON-LD schema for local business, sitemap.xml, and robots.txt',
      'Accessibility Focused: Fully responsive design with accessibility features like "Skip to Content" links and aria-label attributes'
    ],
    scope: 'A 6-page responsive website with a separate backend API. The project included development, deployment, and configuration of a split-hosting environment.'
  },
  techStack: {
    frontend: ['React', 'TypeScript', 'Vite', 'React Router v6', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'dotenv', 'cors'],
    libraries: ['lucide-react (icons)', 'react-helmet-async (SEO management)'],
    tools: ['Hostinger (Frontend)', 'Railway (Backend)', 'Git & GitHub', 'npm', 'Vite', 'ESLint', 'PostCSS'],
    apis: ['Google Places API - Integrated securely by proxying all requests through the custom Node.js backend, preventing API key exposure on the frontend']
  },
  timeline: {
    duration: 'Completed November 2025',
    phases: [
      {
        phase: 'Phase 1: Design & Stack Selection',
        description: 'Chose the React/Vite/Node.js stack. Defined the brand\'s color palette and fonts in tailwind.config.js'
      },
      {
        phase: 'Phase 2: Frontend Component Development',
        description: 'Built all 6 pages and over 20 reusable React components using TypeScript'
      },
      {
        phase: 'Phase 3: Backend API Development',
        description: 'Created the secure Node.js/Express server to handle Google Reviews API requests, including CORS and environment variable management'
      },
      {
        phase: 'Phase 4: Deployment & Configuration',
        description: 'Engineered a split-hosting solution. Deployed the backend to Railway and configured Hostinger with a custom .htaccess file to support the React Router SPA'
      },
      {
        phase: 'Phase 5: Performance Optimization',
        description: 'Diagnosed and fixed Core Web Vitals based on performance reports. Implemented lazy loading, fetchpriority, and explicit image dimensions to resolve LCP and CLS issues'
      }
    ]
  },
  challenges: [
    {
      challenge: 'The client wanted to display live Google Reviews without exposing their private Google API key in the frontend JavaScript, which is a major security vulnerability.',
      solution: 'I architected a "Backend-for-Frontend" (BFF) solution. A lightweight Node.js server was built and deployed to Railway. This server securely stores the API key as an environment variable and exposes a single custom endpoint (/api/reviews). The frontend only ever communicates with this secure endpoint, which is locked down with a CORS whitelist to only accept requests from the cafe\'s domain.'
    },
    {
      challenge: 'The client\'s hosting (Hostinger) is a traditional shared server not designed for Single Page Applications (SPAs). Refreshing any page other than the homepage would result in a 404 error.',
      solution: 'I wrote a custom .htaccess configuration file for the Apache server. This file uses mod_rewrite to intercept all incoming requests for pages and redirect them to index.html. This allows the React Router to take over and handle the routing on the client-side, making the app function perfectly on shared hosting.'
    },
    {
      challenge: 'The sticky navigation bar on the menu page needed to accurately highlight the user\'s current section while scrolling. An initial implementation using onScroll event listeners was laggy and inaccurate.',
      solution: 'I refactored the component to use the modern IntersectionObserver API. This allowed me to define a precise "trigger zone" (e.g., "40% from the bottom of the screen"), making the active state switch performant, efficient, and perfectly in-sync with the user\'s scroll position.'
    }
  ],
  learnings: [
    'Value of Split-Hosting: Learned the significant benefits of a split-hosting architecture. Using Railway for a lightweight Node.js backend and Hostinger for static file hosting is both cost-effective and provides superior performance and security.',
    'Performance is a Feature: Gained deep experience in diagnosing and fixing Core Web Vitals. Implementing width/height attributes, fetchpriority, and loading="lazy" has a massive impact on performance scores.',
    'IntersectionObserver is Superior: For any scroll-based UI, IntersectionObserver is the modern, correct solution. It is far more performant and reliable than traditional scroll event listeners.',
    'Security by Design: Building the secure API proxy from day one is the correct professional workflow for handling any private client credentials.',
    'Documentation is Key: Writing comprehensive deployment and troubleshooting guides solidified the entire process, making the project easily maintainable.'
  ],
  gallery: [
    {
      src: '/CC-card.png',
      alt: 'Cafe Crave Homepage',
      description: 'The homepage featuring the cafe\'s unique retro vibe and welcoming atmosphere'
    },
    {
      src: '/CC-card.png',
      alt: 'Menu Page',
      description: 'Dynamic menu page with sticky navigation and category filtering'
    },
    {
      src: '/CC-card.png',
      alt: 'Vinyl Collection',
      description: 'Interactive vinyl gallery showcasing the cafe\'s music collection'
    },
    {
      src: '/CC-card.png',
      alt: 'Google Reviews Integration',
      description: 'Live Google Reviews displayed securely via custom API'
    }
  ],
  colors: [
    { name: 'Primary Dark', hex: '#322C2B', usage: 'Main text and dark backgrounds' },
    { name: 'Secondary Brown', hex: '#83513F', usage: 'Secondary elements and accents' },
    { name: 'Accent Red', hex: '#803D3B', usage: 'Call-to-action buttons and highlights' },
    { name: 'Light Cream', hex: '#F7F3EE', usage: 'Light backgrounds and cards' },
    { name: 'Subtext on Light', hex: '#5A372B', usage: 'Secondary text on light backgrounds' },
    { name: 'Subtext on Dark', hex: '#BFA6A0', usage: 'Secondary text on dark backgrounds' }
  ],
  link: 'https://cafecrave.co.za',
  client: 'Cafe Crave',
  role: 'Full-Stack Developer'
};

// Export a map of all projects for easy lookup
export const projectsDataMap: Record<string, ProjectData> = {
  'cafe-client': cafeCraveData
};

