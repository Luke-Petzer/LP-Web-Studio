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
    image: '/cc-home.png',
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
    'Live Google Reviews Feed: Instantly displays 5-star customer reviews to new visitors, building trust and credibility that increases bookings and walk-ins.',
    'Mobile-Optimized Menu: Customers can easily browse the full menu on their phones, with smooth filtering by category—no more squinting at paper menus or asking staff for details.',
    'One-Click Contact & Directions: WhatsApp button and integrated Google Maps make it effortless for customers to reach out or find the café, reducing friction and increasing foot traffic.'
  ],
  gallery: [
    {
      src: '/cc-home.png',
      alt: 'Cafe Crave Homepage',
      description: 'The homepage featuring the cafe\'s unique retro vibe and welcoming atmosphere'
    },
    {
      src: '/cc-menu.png',
      alt: 'Menu Page',
      description: 'Dynamic menu page with sticky navigation and category filtering'
    },
    {
      src: '/cc-music.png',
      alt: 'Vinyl Collection',
      description: 'Interactive vinyl gallery showcasing the cafe\'s music collection'
    },
    {
      src: '/cc-reviews.png',
      alt: 'Google Reviews Integration',
      description: 'Live Google Reviews displayed securely via custom API'
    },
    {
      src: '/cc-instagram.png',
      alt: 'Instagram Showcase',
      description: 'Fully custom instagram post section to highlight on the best'
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
  link: '/project/cafe-client',
  client: 'Cafe Crave',
  role: 'Full-Stack Developer'
};

// Loruki Showcase Project
export const lorukiData: ProjectData = {
  id: 'loruki',
  hero: {
    title: 'Loruki Cloud Hosting',
    tagline: 'A demo cloud-hosting website showcasing modern responsive design and clean layout structure',
    image: '/L-card.png',
    category: 'Showcase Website',
    date: 'September 2024'
  },
  overview: {
    description: 'Loruki is a fictional cloud hosting platform website created as a learning project to experiment with responsive design, modern CSS layouts, and web development best practices. The site features a clean, professional design with multiple pages showcasing different aspects of a cloud hosting service.',
    purpose: 'This project was created to practice and demonstrate proficiency in HTML, CSS, and responsive web design. The goal was to build a multi-page website that looks professional, functions well across all devices, and follows modern web design principles.',
    targetAudience: 'Developers and potential clients looking to see examples of clean, responsive web design and modern layout techniques.',
    keyFeatures: [
      'Fully Responsive Design: Mobile-first approach ensuring perfect display on all screen sizes',
      'Modern CSS Grid & Flexbox: Utilized advanced CSS layout techniques for flexible, maintainable code',
      'Multi-Page Structure: Home, Features, and Docs pages demonstrating different layout patterns',
      'Contact Form Integration: Google Sheets integration for form submissions',
      'Clean UI/UX: Professional color scheme and intuitive navigation'
    ],
    scope: 'A 3-page responsive showcase website demonstrating modern web development fundamentals and responsive design principles.'
  },
  techStack: {
    frontend: ['HTML5', 'CSS3', 'JavaScript'],
    backend: [],
    libraries: ['Font Awesome (icons)'],
    tools: ['VS Code', 'Git & GitHub', 'Chrome DevTools'],
    apis: ['Google Sheets API - For contact form submissions']
  },
  timeline: {
    duration: 'Completed September 2024',
    phases: [
      {
        phase: 'Phase 1: Planning & Wireframing',
        description: 'Planned the site structure, created wireframes, and defined the color scheme and typography'
      },
      {
        phase: 'Phase 2: HTML Structure',
        description: 'Built semantic HTML structure for all three pages (Home, Features, Docs)'
      },
      {
        phase: 'Phase 3: CSS Styling',
        description: 'Implemented responsive CSS with Grid and Flexbox, created reusable utility classes'
      },
      {
        phase: 'Phase 4: JavaScript Functionality',
        description: 'Added interactive elements, mobile menu toggle, and form validation'
      },
      {
        phase: 'Phase 5: Testing & Deployment',
        description: 'Tested across multiple devices and browsers, deployed to hosting platform'
      }
    ]
  },
  challenges: [
    {
      challenge: 'Creating a consistent responsive layout that works seamlessly from mobile (320px) to large desktop screens (1920px+).',
      solution: 'Implemented a mobile-first approach using CSS Grid and Flexbox. Created breakpoints at key viewport sizes and used relative units (rem, em, %) to ensure scalability. Tested extensively using Chrome DevTools device emulator.'
    },
    {
      challenge: 'Making the navigation menu work smoothly on mobile devices while maintaining a clean desktop layout.',
      solution: 'Created a hamburger menu for mobile that transforms into a horizontal navigation bar on larger screens. Used CSS transitions for smooth animations and JavaScript for toggle functionality.'
    },
    {
      challenge: 'Integrating a functional contact form without a backend server.',
      solution: 'Connected the form to Google Sheets using their API, allowing form submissions to be collected in a spreadsheet without requiring a database or server-side code.'
    }
  ],
  learnings: [
    '100% Mobile Optimized: Website loads instantly and looks perfect on every phone, tablet, and desktop—ensuring no potential customer is lost due to poor mobile experience.',
    'Clear Call-to-Actions: Strategic placement of contact forms and buttons guide visitors to take action, making it easy for them to get in touch or sign up.',
    'Fast Loading Speed: Optimized images and clean code mean the site loads in under 2 seconds, keeping visitors engaged instead of bouncing to competitors.'
  ],
  gallery: [
    {
      src: '/L-card.png',
      alt: 'Loruki Homepage',
      description: 'Clean, modern homepage with hero section and feature showcase'
    },
    {
      src: '/L-Features.png',
      alt: 'Features Page',
      description: 'Detailed features page highlighting cloud hosting capabilities'
    },
    {
      src: '/L-Docs.png',
      alt: 'Documentation Page',
      description: 'Documentation page with sidebar navigation and code examples'
    }
  ],
  colors: [
    { name: 'Primary Blue', hex: '#047aed', usage: 'Primary brand color, buttons, and accents' },
    { name: 'Secondary Dark', hex: '#1c3fa8', usage: 'Secondary elements and hover states' },
    { name: 'Dark Background', hex: '#002240', usage: 'Footer and dark sections' },
    { name: 'Light Gray', hex: '#f4f4f4', usage: 'Light backgrounds and subtle sections' },
    { name: 'Success Green', hex: '#5cb85c', usage: 'Success messages and positive indicators' },
    { name: 'Error Red', hex: '#d9534f', usage: 'Error messages and warnings' }
  ],
  link: '/showcase/loruki',
  client: 'Personal Showcase',
  role: 'Web Developer'
};

// Granite & Marble Design Concept
export const graniteMarbleData: ProjectData = {
  id: 'granite-marble',
  hero: {
    title: 'Granite & Marble Design',
    tagline: 'A comprehensive website design concept for a stone and marble business',
    image: '/CM-card.png',
    category: 'Design Concept',
    date: 'October 2024'
  },
  overview: {
    description: 'A complete website design concept created for a fictional granite and marble stone supplier. The design showcases modern UI/UX principles tailored for the construction and home improvement industry, featuring a professional aesthetic that highlights the elegance and durability of natural stone products.',
    purpose: 'This design concept was created to demonstrate the ability to create cohesive, industry-specific web designs that balance aesthetics with functionality. The goal was to create a visual identity that communicates luxury, quality, and professionalism while making it easy for customers to browse products and contact the business.',
    targetAudience: 'Homeowners planning renovations, contractors, interior designers, architects, and property developers looking for premium stone materials.',
    keyFeatures: [
      'Visual Hierarchy: Clear content structure guiding users from hero section to products to contact',
      'Product Showcase Gallery: Grid-based layout for displaying different stone types and finishes',
      'Service Pages: Dedicated pages for installation, custom work, and maintenance services',
      'Professional Color Palette: Earthy tones and neutral colors reflecting natural stone aesthetics',
      'Mobile-Responsive Layouts: All pages designed with mobile users in mind'
    ],
    scope: 'A complete multi-page design concept including homepage, about, services, gallery, and contact pages with full UI/UX mockups.'
  },
  techStack: {
    frontend: ['Design concept only - intended for HTML5, CSS3, JavaScript implementation'],
    backend: [],
    libraries: ['Would use: Tailwind CSS, React (for final implementation)'],
    tools: ['Figma', 'Adobe Photoshop', 'Color palette generators'],
    apis: ['Proposed: Google Maps API for location, Contact form backend']
  },
  timeline: {
    duration: 'Completed October 2024',
    phases: [
      {
        phase: 'Phase 1: Research & Discovery',
        description: 'Researched competitor websites, identified industry trends, and defined target audience needs'
      },
      {
        phase: 'Phase 2: Wireframing',
        description: 'Created low-fidelity wireframes for all major pages to establish layout structure'
      },
      {
        phase: 'Phase 3: Visual Design',
        description: 'Developed high-fidelity mockups with chosen color palette, typography, and imagery'
      },
      {
        phase: 'Phase 4: Design System Creation',
        description: 'Established reusable components, button styles, form elements, and spacing guidelines'
      },
      {
        phase: 'Phase 5: Presentation & Documentation',
        description: 'Created design specifications and style guide for developer handoff'
      }
    ]
  },
  challenges: [
    {
      challenge: 'Creating a design that feels both luxurious and approachable, avoiding an overly formal or cold aesthetic.',
      solution: 'Used warm, earthy tones alongside crisp whites and grays. Incorporated high-quality stone imagery with natural lighting to create warmth while maintaining a professional appearance.'
    },
    {
      challenge: 'Organizing a large product catalog in a way that\'s easy to navigate without overwhelming users.',
      solution: 'Implemented a category-based navigation system with filters. Created a grid gallery with hover effects to preview products, and included detailed product pages accessible via clear call-to-action buttons.'
    },
    {
      challenge: 'Balancing visual appeal with practical information delivery for a B2B and B2C audience.',
      solution: 'Designed separate content sections for homeowners (focusing on aesthetics and inspiration) and contractors (emphasizing technical specs, bulk pricing, and efficiency). Used tabbed interfaces to organize information.'
    }
  ],
  learnings: [
    'Professional Portfolio Showcase: High-quality image galleries display past projects, helping customers visualize the quality of work and build confidence before making contact.',
    'Easy Quote Requests: Simple contact forms and clear pricing information make it effortless for customers to request quotes, increasing conversion rates.',
    'Service Page Clarity: Well-organized service pages explain what\'s offered in plain language, reducing customer confusion and phone calls with basic questions.'
  ],
  gallery: [
    {
      src: '/CM-card.png',
      alt: 'Granite & Marble Homepage Design',
      description: 'Homepage design featuring hero section with stone imagery and service overview'
    },
    {
      src: '/Home-Page.png',
      alt: 'Full Homepage Layout',
      description: 'Complete homepage layout showing navigation, hero, services, and footer sections'
    },
    {
      src: '/About-Us-Page.png',
      alt: 'About Us Page',
      description: 'About page design highlighting company values and team expertise'
    },
    {
      src: '/Services-Page.png',
      alt: 'Services Page',
      description: 'Services page layout showcasing installation, custom work, and maintenance offerings'
    },
    {
      src: '/Portfolio-Page.png',
      alt: 'Portfolio Gallery',
      description: 'Portfolio page with grid-based gallery of completed projects'
    },
    {
      src: '/Contact-Us-Page.png',
      alt: 'Contact Page',
      description: 'Contact page design with form, location map, and contact information'
    }
  ],
  colors: [
    { name: 'Charcoal Gray', hex: '#2C3E50', usage: 'Primary text and headers' },
    { name: 'Stone Gray', hex: '#7F8C8D', usage: 'Secondary text and subtle elements' },
    { name: 'Warm Beige', hex: '#D4A574', usage: 'Accent color and call-to-action elements' },
    { name: 'Pure White', hex: '#FFFFFF', usage: 'Backgrounds and negative space' },
    { name: 'Soft Cream', hex: '#F8F5F2', usage: 'Alternate section backgrounds' },
    { name: 'Deep Brown', hex: '#3E2723', usage: 'Footer and dark accent areas' }
  ],
  link: '/design/granite-marble',
  client: 'Design Concept',
  role: 'UI/UX Designer'
};

// Green Scape Gardeners Design Concept
export const greenScapeData: ProjectData = {
  id: 'green-scape-gardeners',
  hero: {
    title: 'Green Scape Gardeners',
    tagline: 'A nature-inspired website design for a landscaping and gardening business',
    image: '/GSG-card.png',
    category: 'Design Concept',
    date: 'October 2024'
  },
  overview: {
    description: 'Green Scape Gardeners is a comprehensive website design concept for a landscaping and garden maintenance company. The design embraces organic shapes, natural imagery, and earthy color palettes to create a visual identity that reflects the beauty and tranquility of well-maintained outdoor spaces.',
    purpose: 'This project demonstrates the ability to create industry-appropriate designs that connect emotionally with the target audience. The design aims to inspire potential customers by showcasing beautiful landscapes while making it easy to understand services and book consultations.',
    targetAudience: 'Homeowners seeking garden maintenance, property managers, estate agents, and anyone looking to improve their outdoor spaces through professional landscaping services.',
    keyFeatures: [
      'Nature-Inspired Design: Organic shapes, green color palette, and nature photography create a cohesive theme',
      'Service Breakdown: Clear categorization of gardening, landscaping, and maintenance services',
      'Project Gallery: Stunning before-and-after gallery showcasing transformations',
      'Seasonal Tips Blog: Content section for gardening tips and seasonal advice',
      'Easy Booking Flow: Streamlined contact and quote request process'
    ],
    scope: 'Complete multi-page design concept including home, about, services, gallery, contact, and blog template pages.'
  },
  techStack: {
    frontend: ['Design concept only - intended for HTML5, CSS3, JavaScript, React implementation'],
    backend: [],
    libraries: ['Proposed: React, Tailwind CSS, Framer Motion for animations'],
    tools: ['Figma', 'Adobe Illustrator', 'Unsplash for stock imagery'],
    apis: ['Proposed: Google Maps, Weather API for seasonal recommendations, Booking system integration']
  },
  timeline: {
    duration: 'Completed October 2024',
    phases: [
      {
        phase: 'Phase 1: Brand & Mood Board Creation',
        description: 'Established brand personality, created mood boards with nature themes, and selected visual direction'
      },
      {
        phase: 'Phase 2: Information Architecture',
        description: 'Mapped out site structure, user flows, and content organization'
      },
      {
        phase: 'Phase 3: Low-Fidelity Wireframes',
        description: 'Created basic wireframes to establish layout hierarchy and content placement'
      },
      {
        phase: 'Phase 4: High-Fidelity Design',
        description: 'Developed full-color, detailed mockups for all pages with final imagery and content'
      },
      {
        phase: 'Phase 5: Component Library',
        description: 'Created reusable UI components and design documentation for implementation'
      }
    ]
  },
  challenges: [
    {
      challenge: 'Standing out in a crowded market where many landscaping websites look similar with generic stock photos.',
      solution: 'Created a unique visual language using custom illustrations mixed with authentic project photos. Implemented organic, flowing layouts that mirror natural forms rather than strict grid systems.'
    },
    {
      challenge: 'Showcasing the wide range of services (from simple lawn mowing to complete landscape design) without overwhelming visitors.',
      solution: 'Organized services into clear categories with icon-based navigation. Created dedicated landing pages for each major service category with progressive disclosure of detailed information.'
    },
    {
      challenge: 'Building trust with potential customers who are inviting service providers onto their property.',
      solution: 'Prominently featured team photos, customer testimonials, certifications, and before-and-after galleries. Included transparent pricing guides and detailed service descriptions to build credibility.'
    }
  ],
  learnings: [
    'Emotional Design: Using design elements that evoke feelings (tranquility, growth, nature) can be more effective than purely functional layouts.',
    'Stunning Visual Galleries: Before-and-after project photos let potential customers see the transformation, making it easier for them to imagine their own space.',
    'Service Area & Pricing: Clear information about service areas and transparent pricing helps customers self-qualify, attracting serious inquiries.',
    'Seasonal Service Highlights: Featured sections for seasonal services (spring planting, winter prep) keep the website relevant year-round and encourage repeat business.'
  ],
  gallery: [
    {
      src: '/GSG-card.png',
      alt: 'Green Scape Gardeners Brand Card',
      description: 'Brand identity card showing logo and color palette'
    },
    {
      src: '/GSG-Home-Page.png',
      alt: 'Homepage Design',
      description: 'Homepage featuring hero section with nature photography and service overview'
    },
    {
      src: '/GSG-About-Us-Page.png',
      alt: 'About Us Page',
      description: 'About page with team introduction and company values'
    },
    {
      src: '/GSG-Services-Page.png',
      alt: 'Services Page',
      description: 'Comprehensive services page with categorized offerings'
    },
    {
      src: '/GSG-Gallery-Page.png',
      alt: 'Project Gallery',
      description: 'Before-and-after gallery showcasing completed landscaping projects'
    },
    {
      src: '/GSG-Contact-Page.png',
      alt: 'Contact Page',
      description: 'Contact page with quote request form and service area map'
    }
  ],
  colors: [
    { name: 'Forest Green', hex: '#2D5016', usage: 'Primary brand color, headers, and navigation' },
    { name: 'Sage Green', hex: '#88AB75', usage: 'Secondary elements and accents' },
    { name: 'Earth Brown', hex: '#6B4E3D', usage: 'Grounding elements and text' },
    { name: 'Sky Blue', hex: '#87CEEB', usage: 'Accent color for water features and freshness' },
    { name: 'Cream', hex: '#F5F5DC', usage: 'Light backgrounds and card elements' },
    { name: 'Bark Brown', hex: '#3E2723', usage: 'Footer and dark sections' }
  ],
  link: '/design/green-scape-gardeners',
  client: 'Design Concept',
  role: 'UI/UX Designer'
};

// Export a map of all projects for easy lookup
export const projectsDataMap: Record<string, ProjectData> = {
  'cafe-client': cafeCraveData,
  'loruki': lorukiData,
  'granite-marble': graniteMarbleData,
  'green-scape-gardeners': greenScapeData
};

// Export array of all projects for easy iteration
export const allProjects: ProjectData[] = [
  cafeCraveData,
  lorukiData,
  graniteMarbleData,
  greenScapeData
];

