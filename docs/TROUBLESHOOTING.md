# Troubleshooting Guide

## Common Issues and Solutions

### 1. Backend API Returns 404 for Readings

**Error**: `"Error fetching readings: Client error '404 Not Found'"`

**Cause**: The Portuguese scraper was using `liturgia.up.railway.app` which only has readings for current/past dates, not future dates.

**Solution**: Updated to use `oraetlabora.com.br/api/liturgia` which provides readings for any date.

**Files Changed**:
- `backend/app/services/scrapers/pt_scraper.py`
- `backend/app/config.py`

---

### 2. Tailwind CSS Not Loading (Unstyled UI)

**Error**: Page shows raw HTML without styling, icons appear as text.

**Cause**: Tailwind CSS v4 requires explicit PostCSS configuration and doesn't support `@apply` directive in the same way as v3.

**Solution**:
1. Created `frontend/postcss.config.js` with `@tailwindcss/postcss` plugin
2. Rewrote `globals.css` using CSS variables instead of `@apply`
3. Added dark mode variables manually

**Files Changed**:
- `frontend/postcss.config.js` (created)
- `frontend/styles/globals.css` (rewritten)

---

### 3. Next.js Build Fails - "params is Promise"

**Error**: `Type error: Conversion of type 'Promise<{ lang: string; }>' to type '{ lang: string; }' may be a mistake`

**Cause**: Next.js 15 changed `params` to be a Promise in server components.

**Solution**: Added `await params` before accessing properties.

**Files Changed**:
- `frontend/app/[lang]/page.tsx`

---

### 4. Lucide React Icon Not Found

**Error**: `Module '"lucide-react"' has no exported member 'Bible'`

**Cause**: The `Bible` icon doesn't exist in lucide-react library.

**Solution**: Replaced with `BookText` icon which has similar meaning.

**Files Changed**:
- `frontend/components/header.tsx`
- `frontend/app/[lang]/bible/page.tsx`
- `frontend/app/[lang]/page.tsx`

---

### 5. Vercel Deploy Fails - i18n Config Error

**Error**: `Invalid literal value, expected false at "i18n.localeDetection"`

**Cause**: The `i18n` configuration in `next.config.ts` is not supported in Next.js App Router.

**Solution**: Removed the entire `i18n` block from `next.config.ts`. Language routing is handled manually via `[lang]` dynamic routes.

**Files Changed**:
- `frontend/next.config.ts`

---

### 6. Vercel Deploy Fails - vercel.json Version

**Error**: `The "version" property inside your vercel.json file must be a number`

**Cause**: Vercel expects `version` to be a number (2), not a string.

**Solution**: Changed `"version": "0.1.0"` to `"version": 2`.

**Files Changed**:
- `backend/vercel.json`

---

### 7. PWA Icon 404 Error

**Error**: `Failed to load resource: /icons/icon-144x144.png 404 (Not Found)`

**Cause**: The `manifest.json` referenced icon files that don't exist in the `public/icons/` directory.

**Solution**: Simplified manifest to only reference existing `favicon.ico`.

**Files Changed**:
- `frontend/public/manifest.json`

---

### 8. CORS Errors

**Error**: Frontend can't fetch from backend due to CORS policy.

**Cause**: Backend CORS middleware wasn't exposing headers properly.

**Solution**: Added `expose_headers=["*"]` to CORS configuration.

**Files Changed**:
- `backend/app/main.py`

---

## Debugging Tips

### Check Backend API

```bash
# Test health endpoint
curl https://backend-eta-olive-23.vercel.app/health

# Test readings API
curl "https://backend-eta-olive-23.vercel.app/api/readings/?lang=pt"

# Check API docs
open https://backend-eta-olive-23.vercel.app/docs
```

### Check Frontend

1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Verify `NEXT_PUBLIC_API_URL` is set correctly

### Check Environment Variables

```bash
# List backend env vars
cd backend && npx vercel env ls production

# List frontend env vars
cd frontend && npx vercel env ls production
```

### Redeploy

```bash
# Backend
cd backend && npx vercel --prod --yes

# Frontend
cd frontend && npx vercel --prod --yes
```

---

## API Status

| API | Status | Last Checked |
|-----|--------|--------------|
| oraetlabora.com.br | ✅ Working | 2026-05-18 |
| bible.usccb.org | ✅ Working | 2026-05-18 |
| ewtn.com/es | ✅ Working | 2026-05-18 |
| dailyreadings.eu | ✅ Working | 2026-05-18 |
| litcal.johnromanodorazio.com | ✅ Working | 2026-05-18 |

---

## Contact

For issues not covered here, please:
1. Check [GitHub Issues](https://github.com/cleiton-negreiros/liturgia-diaria-ia/issues)
2. Create a new issue with detailed error information
3. Include browser console logs and network requests
