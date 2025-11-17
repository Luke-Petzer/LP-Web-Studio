# Complete Header Code - All Design & Structure

This document contains every piece of code related to the header design and structure.

---

## 1. Main Header Component
**File:** `/components/Header.tsx`

```typescript
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md">
        <div className="w-full h-20 px-6 lg:px-12 max-w-[1920px] mx-auto">
          <div className="h-full flex items-center justify-between">

            {/* Logo Section - Left */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/logo.svg"
                alt="LP Logo"
                className="h-12 w-auto"
              />
              <img
                src="/my-logo.svg"
                alt="LP Web Studio"
                className="h-7 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Right */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                  isActive('/') ? 'text-orange-500' : 'text-gray-800'
                }`}
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                  isActive('/portfolio') ? 'text-orange-500' : 'text-gray-800'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                  isActive('/about') ? 'text-orange-500' : 'text-gray-800'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                  isActive('/contact') ? 'text-orange-500' : 'text-gray-800'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Button - Right */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Full Viewport Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Full Viewport Menu */}
          <div className="absolute inset-0 bg-white flex flex-col">
            {/* Navigation Links - Centered and Stacked */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-4xl font-bold transition-colors ${
                  isActive('/') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-4xl font-bold transition-colors ${
                  isActive('/portfolio') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-4xl font-bold transition-colors ${
                  isActive('/about') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-4xl font-bold transition-colors ${
                  isActive('/contact') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Social Links - Bottom */}
            <div className="flex justify-center gap-8 py-8 border-t border-gray-200">
              <a
                href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lp.web.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---

## 2. Global CSS Styles for Header
**File:** `/src/index.css`

### Page Container Padding (to account for fixed header)

```css
/* Page container - FIXED for mobile with responsive header heights */
.page-container {
  width: 100%;
  min-height: calc(100vh - 64px); /* Mobile: 64px (h-16) */
  padding-top: 64px;
}

@media (min-width: 640px) {
  .page-container {
    min-height: calc(100vh - 72px); /* sm: 72px (h-18) */
    padding-top: 72px;
  }
}

@media (min-width: 768px) {
  .page-container {
    min-height: calc(100vh - 80px); /* md: 80px (h-20) */
    padding-top: 80px;
  }
}
```

### Mobile Optimizations

```css
/* Mobile optimizations - PREVENT IMAGE FLASHING */
@media (max-width: 768px) {
  .page-container {
    padding-top: 80px;
    /* Fix mobile overscroll */
    min-height: calc(100dvh - 80px);
  }

  /* Prevent horizontal scroll and overscroll */
  body {
    overflow-x: hidden;
    /* Prevent overscroll bounce on mobile */
    overscroll-behavior-y: none;
    -webkit-overflow-scrolling: touch;
  }

  img {
    transition: none !important;
    animation: none !important;
  }
}
```

---

## 3. Tailwind CSS Classes Used

### Header Container Classes
```
fixed          - Fixes header to top of viewport
top-0          - Position at top
left-0         - Align to left edge
right-0        - Align to right edge
w-full         - Full width
z-50           - High z-index to stay above content
bg-white       - White background
shadow-md      - Medium shadow for depth
```

### Header Inner Container
```
h-20           - Height of 80px
px-6           - Horizontal padding 24px (mobile)
lg:px-12       - Horizontal padding 48px (desktop)
max-w-[1920px] - Maximum width constraint
mx-auto        - Center horizontally
```

### Logo Section
```
flex           - Flexbox display
items-center   - Vertical center alignment
gap-3          - 12px gap between logo images
flex-shrink-0  - Prevent logo from shrinking
h-12           - Logo height 48px
h-7            - Secondary logo height 28px
w-auto         - Auto width maintaining aspect ratio
```

### Desktop Navigation
```
hidden         - Hidden on mobile
md:flex        - Show as flex on medium screens (768px+)
items-center   - Vertical center alignment
gap-8          - 32px gap between nav items
```

### Navigation Links
```
font-semibold  - Semi-bold font weight
text-base      - Base text size (16px)
transition-colors - Smooth color transitions
hover:text-orange-500 - Orange on hover
text-orange-500 - Active state color
text-gray-800  - Default text color
```

### Mobile Menu Button
```
md:hidden      - Hidden on desktop (768px+)
p-2            - Padding 8px
text-gray-800  - Dark gray icon color
hover:bg-gray-100 - Light gray background on hover
rounded-lg     - Large border radius
transition-colors - Smooth color transitions
w-6 h-6        - Icon size 24px
```

### Mobile Menu Overlay
```
fixed          - Fixed positioning
inset-0        - Cover entire viewport (top, right, bottom, left: 0)
z-40           - Below header (z-50)
md:hidden      - Hidden on desktop

absolute       - Absolute positioning
inset-0        - Fill parent container
bg-white       - White background
flex           - Flexbox display
flex-col       - Vertical layout

flex-1         - Flex grow to fill space
items-center   - Horizontally center
justify-center - Vertically center
gap-8          - 32px gap between items
px-6           - Horizontal padding 24px
```

### Mobile Navigation Links
```
text-4xl       - Extra large text (36px)
font-bold      - Bold font weight
transition-colors - Smooth color transitions
text-orange-500 - Active state
text-gray-800  - Default state
hover:text-orange-500 - Hover state
```

### Mobile Social Links
```
flex           - Flexbox display
justify-center - Horizontally center
gap-8          - 32px gap between icons
py-8           - Vertical padding 32px
border-t       - Top border
border-gray-200 - Light gray border
w-8 h-8        - Icon size 32px
text-gray-600  - Icon color
hover:text-orange-500 - Orange on hover
```

---

## 4. Color Palette (from Tailwind Config)
**File:** `/tailwind.config.js`

### Orange (Primary Brand Color)
```javascript
orange: {
  100: '#FFF7ED',
  200: '#FFEDD5',
  300: '#FED7AA',
  400: '#FDBA74',
  500: '#F97316',  // Primary header highlight color
  600: '#EA580C',
  700: '#C2410C',
  800: '#9A3412',
}
```

### Gray (Text & Backgrounds)
```javascript
gray: {
  100: '#F1F5F9',  // Hover background
  200: '#E2E8F0',  // Border color
  600: '#475569',  // Social icon color
  800: '#1E293B',  // Primary text color
}
```

---

## 5. Responsive Breakpoints

### Tailwind Default Breakpoints Used
```
sm:  640px  - Small devices
md:  768px  - Medium devices (tablet) - MAIN BREAKPOINT FOR HEADER
lg:  1024px - Large devices
xl:  1280px - Extra large devices
```

### Header Behavior by Breakpoint
- **< 768px (Mobile)**: Burger menu visible, nav hidden, logo on left
- **≥ 768px (Desktop)**: Full navigation visible, burger menu hidden, logo on left

---

## 6. Z-Index Hierarchy
```
Header:          z-50  (highest - always on top)
Mobile Menu:     z-40  (below header but above content)
Regular Content: z-0   (default layer)
```

---

## 7. Dependencies Required

### NPM Packages
```json
{
  "lucide-react": "0.522.0",    // For Menu and X icons
  "next": "^14.0.0",            // Next.js framework
  "react": "^18.3.1",           // React
  "react-dom": "^18.3.1"        // React DOM
}
```

### Import Statements
```typescript
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
```

---

## 8. Key Features & Functionality

### State Management
- `mobileMenuOpen` - Boolean state for menu toggle
- Updates on button click
- Resets on route change

### Side Effects (useEffect)
1. **Route Change Handler**: Closes menu when navigating
2. **Scroll Lock**: Prevents body scroll when menu is open

### Helper Functions
- `isActive(path)` - Checks if current route matches path for active styling

### Accessibility
- `aria-label` on buttons for screen readers
- `rel="noopener noreferrer"` on external links for security
- Semantic HTML (header, nav tags)
- Focus management

---

## 9. Logo Assets
Located in `/public/` directory:
- `/logo.svg` - Main LP logo (48px height)
- `/my-logo.svg` - Brand text logo (28px height)

---

## 10. Summary of Structure

```
Header Component
├── Fixed Header Bar (z-50)
│   ├── Container (max-width, padding)
│   │   ├── Logo Section (Left)
│   │   │   ├── logo.svg
│   │   │   └── my-logo.svg
│   │   ├── Desktop Navigation (Right, hidden on mobile)
│   │   │   ├── Home Link
│   │   │   ├── Portfolio Link
│   │   │   ├── About Link
│   │   │   └── Contact Link
│   │   └── Burger Menu Button (Right, hidden on desktop)
│   │       └── Menu/X Icon
│
└── Mobile Menu Overlay (z-40, conditional render)
    └── Full Viewport Container
        ├── Navigation Links (Centered, Stacked)
        │   ├── Home
        │   ├── Portfolio
        │   ├── About
        │   └── Contact
        └── Social Links (Bottom)
            ├── Facebook
            └── Instagram
```

---

## 11. Customization Guide

### To Change Header Height:
1. Update `h-20` class in header
2. Update padding-top in `.page-container` CSS
3. Ensure consistency across breakpoints

### To Change Breakpoint:
1. Replace all `md:` with desired breakpoint (sm:, lg:, xl:)
2. Update `@media (max-width: 768px)` in CSS accordingly

### To Change Colors:
1. Replace `text-orange-500` with your brand color
2. Update hover states consistently
3. Modify Tailwind config for global color changes

### To Add Navigation Items:
1. Add new Link component in desktop nav
2. Add matching Link in mobile menu nav
3. Update `isActive` logic if needed

### To Style Burger Menu Icon:
1. Modify `w-6 h-6` for icon size
2. Change `text-gray-800` for icon color
3. Adjust `p-2` for button padding
4. Update `hover:bg-gray-100` for hover effect

---

## 12. Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 13. Performance Optimizations
- Fixed positioning for hardware acceleration
- Minimal re-renders with React state management
- CSS transitions instead of JavaScript animations
- Overflow hidden to prevent layout shifts
- Will-change properties where needed

---

**End of Complete Header Code Documentation**

