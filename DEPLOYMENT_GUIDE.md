# 🚀 Quick Command Reference

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Opens at http://localhost:3000
- Hot reload enabled
- See changes instantly

### Build for Production
```bash
npm run build
```
- Creates `out/` folder with static files
- All pages pre-rendered as HTML
- Ready for deployment

### Lint Code
```bash
npm run lint
```
- Checks for code issues
- Uses Next.js ESLint config

---

## Deployment to Hostinger

### 1. Build the Site
```bash
npm run build
```

### 2. What Gets Created
The `out/` folder contains:
```
out/
├── index.html              # Homepage
├── portfolio.html          # Portfolio page
├── about.html              # About page
├── contact.html            # Contact page
├── project/
│   └── cafe-client.html   # Project pages
├── _next/                  # JavaScript & CSS
├── images/                 # Optimized images
└── ...all static assets
```

### 3. Upload to Hostinger
Upload **contents of `out/` folder** to:
```
public_html/
```

**Important:** Don't upload the `out/` folder itself, upload what's INSIDE it.

### 4. Verify _redirects File
Ensure this file exists in `public_html/`:
```
_redirects
```
Content:
```
/*    /index.html   200
```

---

## Testing Checklist

### Local Testing
- [ ] `npm run dev` starts without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] Portfolio page works with filtering
- [ ] Cafe Crave project detail page loads
- [ ] About page displays correctly
- [ ] Contact form is visible
- [ ] All images load
- [ ] Mobile menu works

### Build Testing
- [ ] `npm run build` completes successfully
- [ ] `out/` folder is created
- [ ] All HTML files are in `out/`
- [ ] _next folder contains JS/CSS
- [ ] Static assets are present

### Production Testing (After Upload)
- [ ] Homepage loads on live domain
- [ ] All navigation links work
- [ ] Direct URLs work (e.g., /portfolio)
- [ ] Project detail pages load
- [ ] Contact form submits (PHP)
- [ ] Images display correctly
- [ ] Mobile responsive
- [ ] No console errors

---

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Run `npm install` to reinstall dependencies

### Issue: Page shows 404 on Hostinger
**Solution:** Check `_redirects` file is in `public_html/`

### Issue: Images not loading
**Solution:** Verify image paths start with `/` (e.g., `/Hero.jpg`)

### Issue: Contact form not working
**Solution:** Ensure `contact-form.php` is in `public_html/`

### Issue: Styles not loading
**Solution:** Clear browser cache and check `_next/` folder uploaded

---

## File Locations

### Source Files (Don't Upload)
- `components/` - React components
- `pages/` - Next.js page files
- `src/` - Additional source files
- `node_modules/` - Dependencies

### Build Output (Upload This)
- `out/` - Static HTML, CSS, JS

### Configuration Files (Don't Upload)
- `next.config.js`
- `tsconfig.json`
- `package.json`
- `.gitignore`

---

## SEO Verification

After deployment, test SEO:

### Google Rich Results Test
https://search.google.com/test/rich-results

Enter your URL to verify:
- Meta tags are present
- Structured data is valid
- Images are accessible

### Check Page Source
Right-click on your live site → View Page Source

Look for:
```html
<title>Your Page Title</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<script type="application/ld+json">{...}</script>
```

All should be in the HTML (not loaded by JavaScript).

---

## Performance

### Build Size
- Homepage: ~92 KB (First Load)
- Portfolio: ~100 KB (First Load)
- Contact: ~93 KB (First Load)

These are excellent sizes for fast loading!

### Optimization Tips
1. Keep images in WebP format when possible
2. Use lazy loading for images below fold
3. Minimize custom fonts
4. Enable Hostinger caching if available

---

## Support Resources

### Next.js Documentation
https://nextjs.org/docs

### Static Export Guide
https://nextjs.org/docs/app/building-your-application/deploying/static-exports

### Hostinger Support
Contact if issues with file uploads or .htaccess

---

**You're all set! Happy deploying! 🚀**

