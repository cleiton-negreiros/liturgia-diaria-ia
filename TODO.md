# Liturgia Diária IA - TODO

> Catholic Daily Liturgy App - Multilingual (PT, EN, ES, IT)
> Last updated: 2026-05-18

## Session Progress

### Session 1 - 2026-05-18 ✅
- [x] Initial project planning and research
- [x] API research for all 4 languages
- [x] Create TODO.md and project documentation structure
- [x] Set up project structure with Python FastAPI backend
- [x] Create Pydantic models for all data types
- [x] Create Supabase client and database schema
- [x] Build Portuguese scraper (liturgia.up.railway.app)
- [x] Build English scraper (USCCB)
- [x] Build Spanish scraper (EWTN)
- [x] Build Italian scraper (dailyreadings.eu)
- [x] Create API routes (readings, prayers, bible, calendar)
- [x] Create main FastAPI application
- [x] Build Next.js frontend with App Router
- [x] Create responsive layout with Header component
- [x] Implement dark mode with next-themes
- [x] Create language provider and switcher
- [x] Build readings page with liturgical info
- [x] Build prayers page with expandable cards
- [x] Build Bible page with book listings
- [x] Build calendar page with liturgical seasons
- [x] Create PWA manifest and service worker
- [x] Add SEO optimization (metadata, robots.txt)
- [x] Set up GitHub Actions for auto-deploy
- [x] Create comprehensive README documentation
- [x] Create Supabase database migrations
- [x] Write 8 Catholic prayers in 4 languages
- [x] Create Bible books reference data (Portuguese)

---

## Completed Tasks

### Phase 1: Research & Planning ✅
- [x] Research reference repository (cleiton-negreiros/liturgia-do-dia)
- [x] Identify available APIs for all 4 languages
- [x] Define tech stack architecture

### Phase 2: APIs Discovered ✅

#### Portuguese (PT)
| API | URL | Status | Notes |
|-----|-----|--------|-------|
| Liturgia Diária v2 | https://liturgia.up.railway.app/v2/ | ✅ Active | 181 stars, best option |
| API Liturgia Diária | https://api-liturgia-diaria.vercel.app/ | ✅ Active | Scrapes Canção Nova |

#### English (EN)
| API | URL | Status | Notes |
|-----|-----|--------|-------|
| USCCB | https://bible.usccb.org/bible/readings/ | ✅ Active | Official US bishops |
| catholic-mass-readings | PyPI package | ✅ Active | Python scraper for USCCB |

#### Spanish (ES)
| API | URL | Status | Notes |
|-----|-----|--------|-------|
| EWTN Español | https://www.ewtn.com/es/catolicismo/lecturas | ✅ Active | Daily readings |
| evangeli.net | https://evangeli.net/evangelio/ | ✅ Active | Gospel commentary |

#### Italian (IT)
| API | URL | Status | Notes |
|-----|-----|--------|-------|
| Daily Readings EU | https://www.dailyreadings.eu/it | ✅ Active | 17 languages |
| evangeli.net | https://evangeli.net/vangelo/ | ✅ Active | Gospel commentary |

#### Multilingual
| API | URL | Status | Notes |
|-----|-----|--------|-------|
| Liturgical Calendar | https://litcal.johnromanodorazio.com/ | ✅ Active | Calendar + seasons |
| evangeli.net | 9 languages | ✅ Active | Gospel commentary |

### Phase 3: Backend Setup ✅
- [x] Initialize Python project with requirements.txt
- [x] Create FastAPI application structure
- [x] Set up Supabase client and connection
- [x] Create database schema and migrations
- [x] Create configuration with pydantic-settings
- [x] Create Pydantic models for all data types

### Phase 4: Reading Scrapers ✅
- [x] Portuguese scraper (liturgia.up.railway.app)
- [x] English scraper (USCCB via BeautifulSoup)
- [x] Spanish scraper (EWTN)
- [x] Italian scraper (dailyreadings.eu)
- [x] Unified reading model and API endpoint
- [x] All-languages endpoint

### Phase 5: Liturgical Calendar ✅
- [x] Integrate liturgical calendar API
- [x] Create calendar endpoint
- [x] Support for seasons and colors

### Phase 6: Frontend ✅
- [x] Initialize Next.js project with App Router
- [x] Create responsive layout components
- [x] Implement dark mode with Tailwind CSS
- [x] Build daily readings page
- [x] Build calendar view
- [x] Add language switcher
- [x] Create prayer section pages
- [x] Create Bible section pages
- [x] Create home page with feature cards

### Phase 7: PWA ✅
- [x] Create manifest.json
- [x] Implement service worker
- [x] Add offline support strategy
- [x] Add robots.txt for SEO

### Phase 8: SEO ✅
- [x] Add meta tags (title, description, OG, Twitter)
- [x] Add robots.txt
- [x] Configure viewport
- [x] Add structured data ready

### Phase 9: Catholic Prayers ✅
- [x] Holy Guardian Angel prayer (4 languages)
- [x] Our Father (4 languages)
- [x] Hail Mary (4 languages)
- [x] Glory Be (4 languages)
- [x] St. Joseph Novena (4 languages)
- [x] Office of the Immaculate Conception (4 languages)
- [x] Act of Contrition (4 languages)
- [x] Angelus (4 languages)

### Phase 10: Catholic Bible ✅
- [x] Create Bible book reference data (Portuguese)
- [x] Create Bible API endpoint
- [x] Support for 73 Catholic books

### Phase 11: Deployment ✅
- [x] Set up GitHub Actions workflow
- [x] Configure Vercel deployment
- [x] Create environment variable templates
- [x] Create vercel.json for backend

---

## Pending Tasks

### Remaining Work

- [ ] Add English, Spanish, Italian Bible book data
- [ ] Integrate full Bible text API (API.Bible or similar)
- [ ] Add more Catholic prayers (Rosary, Divine Mercy, etc.)
- [ ] Add search functionality for prayers and Bible
- [ ] Create favicon and app icons
- [ ] Add structured data (JSON-LD) for SEO
- [ ] Generate sitemap.xml dynamically
- [ ] Add unit tests for scrapers
- [ ] Add integration tests for API
- [ ] Set up actual Supabase project
- [ ] Configure Vercel project in dashboard
- [ ] Add error boundary components
- [ ] Add loading states and skeletons
- [ ] Add i18n translations for all UI text
- [ ] Optimize images and assets
- [ ] Add analytics (privacy-friendly)
- [ ] Create contributing guidelines
- [ ] Add API documentation (OpenAPI/Swagger)

---

## Tech Stack

### Backend
- **Python 3.12+** - Main language
- **FastAPI** - Web framework
- **httpx** - Async HTTP client
- **BeautifulSoup4** - HTML parsing
- **Supabase Python Client** - Database
- **Pydantic** - Data validation

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **next-themes** - Dark mode
- **Zustand** - State management
- **Lucide Icons** - Icons

### Database
- **Supabase** - PostgreSQL + Auth + Storage

### Deployment
- **Vercel** - Frontend + Serverless functions
- **GitHub Actions** - CI/CD

---

## Project Structure

```
liturgia-diaria-ia/
├── backend/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── db/            # Database
│   │   │   └── migrations/
│   │   ├── models/        # Pydantic models
│   │   ├── services/
│   │   │   └── scrapers/  # Reading scrapers
│   │   ├── config.py
│   │   └── main.py
│   ├── tests/
│   ├── requirements.txt
│   └── vercel.json
├── frontend/
│   ├── app/               # Next.js App Router
│   │   ├── [lang]/        # Language routes
│   │   └── api/           # API routes
│   ├── components/
│   ├── lib/
│   ├── public/
│   │   ├── manifest.json
│   │   └── sw.js
│   └── styles/
├── .github/workflows/
│   └── deploy.yml
├── docs/
├── TODO.md
└── README.md
```

---

## Environment Variables

```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App
NEXT_PUBLIC_API_URL=
NODE_ENV=development
```

---

## Next Session

Continue with:
1. Add Bible data for EN, ES, IT
2. Create app icons and favicon
3. Add more prayers
4. Set up Supabase project
5. Deploy to Vercel
6. Add tests
