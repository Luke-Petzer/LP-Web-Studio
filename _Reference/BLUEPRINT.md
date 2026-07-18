# LP Web Studio — Brand Blueprint
*Design reference document for Stitch and Claude Code*
*Extracted from live site screenshots — April 2026*

---

## 1. BRAND IDENTITY

**Studio name:** LP Web Studio  
**Logotype:** `LP WEB` (bold, condensed, all-caps) with `— STUDIO —` as a small subtitle beneath, tracked wide  
**Positioning line:** Performance-first web engineering studio, Cape Town  
**Voice:** Technical, direct, no-agency fluff. Speaks like an engineer, not a marketer.  
**Aesthetic direction:** Industrial-technical meets premium editorial. Dark, fast, confident.

---

## 2. COLOUR SYSTEM

### Primary Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0A0A0A` | Page background, base dark |
| `--bg-secondary` | `#111111` | Card backgrounds, elevated surfaces |
| `--bg-tertiary` | `#1A1A1A` | Borders, subtle dividers |
| `--accent-primary` | `#FF4500` | Primary orange-red accent, CTAs, highlights |
| `--accent-gradient-start` | `#FF5500` | Hero gradient top-left |
| `--accent-gradient-end` | `#CC1500` | Hero gradient bottom-right |
| `--text-primary` | `#FFFFFF` | Primary text |
| `--text-secondary` | `#999999` | Body text, descriptions |
| `--text-muted` | `#555555` | Labels, metadata, placeholders |
| `--border` | `#222222` | Card borders, dividers |

### Accent Usage Rules
- Orange-red (`#FF4500`) is used **sparingly** — one or two elements per section maximum
- Never use orange on orange backgrounds
- Ghost/faded text uses white at 8–12% opacity as background watermarks
- Section labels use orange at full opacity in small uppercase tracking style

---

## 3. TYPOGRAPHY

### Font Stack
| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display / Hero | Condensed sans-serif (heavy) | 800–900 | All-caps, tight tracking |
| Body headings | Same condensed sans | 600–700 | Mixed case or all-caps |
| Body text | Clean sans-serif | 400 | Normal tracking |
| Labels / metadata | Same or mono | 400–500 | All-caps, wide tracking (0.15–0.2em) |
| Terminal/code UI | Monospace | 400 | Normal |

### Type Scale (Desktop)
| Level | Size | Usage |
|-------|------|-------|
| Display XL | 80–120px | Hero titles ("FORGING THE FUTURE OF") |
| Display L | 48–64px | Section titles, page titles |
| Display M | 32–40px | Sub-headings |
| Body L | 18–20px | Lead paragraphs |
| Body | 15–16px | Standard body copy |
| Label | 11–12px | All-caps tracking labels, breadcrumbs, metadata |
| Micro | 10–11px | Footer text, legal |

### Typography Rules
- Hero display text: all-caps, letter-spacing `-0.02em` to `-0.04em` (tight)
- Label text: all-caps, letter-spacing `0.12em` to `0.2em` (wide)
- Ghost/watermark text: same display font, opacity 8–12%, no pointer events
- The last word of hero headlines gets a faded treatment (40–50% opacity) for depth
- Never use italic in hero contexts — this is an engineering brand, not editorial

---

## 4. LAYOUT SYSTEM

### Page Structure
```
[Dark page background #0A0A0A]
  [Navbar — sits outside all containers, full width]
  [Content containers — sit inside dark page with margin]
  [Sections — full width or contained]
[Footer]
```

### Hero Container (Homepage)
- Full viewport width minus `24px` margins each side on desktop
- `16px` margins each side on mobile
- Border radius: `16px–20px`
- Background: orange-red gradient (see colour system)
- Min-height: `100vh` on homepage, `45–50vh` on subpages
- Navbar floats above the container, not inside it

### Grid
- Max content width: `1280px`
- Gutter: `32px` desktop, `16px` mobile
- Column system: 12-column
- Section padding: `80–120px` vertical desktop, `48–64px` mobile

### Spacing Tokens
| Token | Value |
|-------|-------|
| `--space-xs` | `8px` |
| `--space-sm` | `16px` |
| `--space-md` | `32px` |
| `--space-lg` | `64px` |
| `--space-xl` | `96px` |
| `--space-2xl` | `128px` |

---

## 5. COMPONENT PATTERNS

### Navbar
- Background: transparent, sits on dark page background
- Logo: `LP WEB` bold + `— STUDIO —` subtitle
- Nav links: small all-caps tracking text, white 70% opacity, active state white 100% with underline
- CTA button: white background, black text, rounded rectangle, bold uppercase
- No border or shadow on navbar — it floats

### Buttons
| Variant | Background | Text | Border | Radius |
|---------|------------|------|--------|--------|
| Primary | `#FFFFFF` | `#000000` | none | `4–6px` |
| Secondary / Ghost | transparent | `#FFFFFF` | `1px solid #FFFFFF` | `4–6px` |
| Accent | `#FF4500` | `#FFFFFF` | none | `4–6px` |
| Text link | transparent | `#FFFFFF` | none | none |

Button text: bold, all-caps, tracking `0.08em`  
Hover states: subtle opacity shift or background change — no dramatic transforms

### Cards (Dark)
- Background: `#111111` or `#161616`
- Border: `1px solid #222222`
- Border radius: `8–12px`
- Padding: `24–32px`
- No box shadow — depth is created through border contrast against dark bg

### Cards (Light — Contact form)
- Background: `#F5F5F5` or `#EEEEEE`
- Border radius: `16–20px`
- Text: dark `#111111`
- Used sparingly for contrast moments

### Tech Stack Tags / Pills
- Border: `1px solid #333333`
- Background: transparent
- Text: `#999999`, small, uppercase, tracking
- Border radius: `4px` (subtle, not fully rounded)
- Padding: `4px 10px`

### UI Corner Brackets
- Thin `2px` lines in accent orange or white 30% opacity
- Form L-shapes at corners of containers
- CSS only using `::before` and `::after`
- Used on: video containers, terminal blocks, key metric displays

### Terminal / Code Block
- Background: `#0D0D0D`
- Top bar: 3 dots (red/amber/green) + path label in monospace
- Border: `1px solid #222222`
- Border radius: `8px`
- Font: monospace, `#FF4500` for `$` prompt, white for content

### Stats / Metrics
- Large number: display font, white, 48–64px
- Unit or denominator: same font, muted colour, smaller
- Label below: small all-caps tracking label
- No background — sits directly on page

### Section Labels
- Small orange text, all-caps, tracking `0.15em`
- Sits above section headings
- Example: `ABOUT`, `FAQ`, `PORTFOLIO_SYS`

### Scroll-reveal Animations
- Fade up: `opacity 0 → 1`, `translateY 24px → 0`
- Duration: `0.6s`, easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger between elements: `150ms`
- Triggered by Intersection Observer
- Must respect `prefers-reduced-motion`

### Navigation Active State
- Active nav link gets an underline `2px solid currentColor`
- No background highlight — just the underline

---

## 6. THE CONTACT DRAWER

### Concept
- Replaces the dedicated `/contact` page entirely
- Triggered by: "Get Started", "Deploy System", "Run Free Audit", any CTA
- Slides in from the right on desktop (400–480px wide)
- On mobile: bottom sheet, near-fullscreen, visible margin behind (16px) showing page underneath
- Backdrop: dark overlay, 60% opacity, blur `4px`

### Drawer Anatomy (Desktop)
```
[Page content — slightly dimmed behind]
[Drawer — right side, full height]
  Close button (×) top right
  Heading: "LET'S BUILD." (display font, large)
  Subheading: small tracking label
  
  Selector tabs: WEBSITE | AUTOMATION | BOTH | OTHER
  
  Form fields (underline style, dark bg):
    Full name
    Email
    Business / company
    Tell us what you're building (textarea)
  
  Corner bracket around submit button area
  Submit: "SEND MESSAGE" — with corner brackets
  
  Direct contact below form:
    WhatsApp link
    Email link
```

### Drawer Anatomy (Mobile)
- Bottom sheet, slides up
- `border-radius: 20px 20px 0 0`
- 16px margin visible on sides so page background shows
- Same content as desktop but single column
- Swipe down or tap backdrop to close

### Drawer Style
- Background: `#0F0F0F`
- Border left (desktop): `1px solid #222222`
- Form field style: no box, just bottom border `1px solid #333333`, focus state `#FF4500`
- Submit button: primary white button with corner bracket decoration

---

## 7. PAGE-SPECIFIC NOTES

### Homepage (`/`)
- Hero: full viewport, orange-red gradient container
- Sections: metrics bar, core infrastructure, architectural method, testimonial, B2B case preview, founder quote, FAQ, final CTA
- Final CTA: "STOP MANAGING. START BUILDING." — large display text, orange accent button

### Infrastructure / About (`/about` or `/infrastructure`)
- Different aesthetic from homepage — dark only, no orange hero
- Terminal block showing founder profile
- Tech stack cards (white cards on dark background — contrast moment)
- Philosophy quote with left orange border
- "Why Work With Me" — three columns

### Contact (`/contact`)
- **TO BE REMOVED** — replaced by drawer
- Existing contact page content migrates into the drawer

### Work (`/work`)
- Uses subpage hero component (orange container, 45vh, left-aligned)
- Storybook scroll format
- Chapter hooks between projects
- Project sections: split layout, video left, metadata right

---

## 8. SUBPAGE HERO COMPONENT

### Spec
- Same orange-red gradient container as homepage
- Same rounded corners, same dark margins around it
- Height: `45–50vh`
- Navbar above it, outside the container

### Content Layout
```
[top-left] LP WEB / {PAGE_NAME}     [small tracking label, white 50% opacity]

[center-left] {PAGE_TITLE}.         [display XL, white, left-aligned]
              [ghost watermark]      [same text, 400% larger, 10% opacity, behind]

[below title] {PAGE_SUBTITLE}       [small tracking label, white 60% opacity]

[bottom-right] corner bracket       [CSS UI element]
```

### Props (reusable component)
```typescript
interface SubpageHeroProps {
  breadcrumb: string      // e.g. "LP WEB / WORK"
  title: string           // e.g. "WORK"
  subtitle: string        // e.g. "SELECTED CLIENT ENGAGEMENTS"
}
```

---

## 9. FOOTER

### Layout
- Dark background, full width
- Left: copyright + studio name
- Center: nav links (WORK, ABOUT, CONTACT, PRIVACY)
- Right: `● SYSTEMS ONLINE` status indicator + social icons
- All text: micro size, muted colour

### Status Indicator
- Green dot `●` + "SYSTEMS ONLINE" text
- Indicates site/business is active
- Subtle pulse animation on the dot

---

## 10. STITCH GENERATION NOTES

When generating designs with Stitch, reference these constraints:

**Always:**
- Dark `#0A0A0A` page background
- Condensed heavy sans-serif for display text
- All-caps for headings and labels
- Orange `#FF4500` used sparingly as accent only
- Corner bracket UI elements on key containers
- Wide tracking on label text
- Tight tracking on display text

**Never:**
- Light backgrounds except for deliberate contrast moments (contact form card)
- Rounded fully-circular pill shapes for tags — use subtle radius `4px`
- Drop shadows — depth via borders and contrast only
- Purple, blue, or green accents — orange-red only
- Italic text
- Decorative dividers — use whitespace for section separation

---

*Document version: 1.0 | Last updated: April 2026*
*Source: lpwebstudio.co.za live site + Stitch design files*