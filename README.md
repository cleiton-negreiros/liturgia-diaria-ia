# ✝️ Liturgia Diária IA

> Catholic Daily Liturgy App - Multilingual (PT, EN, ES, IT)

A modern, lightweight, responsive Progressive Web App (PWA) for Catholic daily liturgy with mass readings, prayers, and Bible references in 4 languages: **Portuguese**, **English**, **Spanish**, and **Italian**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5B9BD5.svg)](https://web.dev/progressive-web-apps/)

## ✨ Features

- **Daily Mass Readings** - First Reading, Psalm, Second Reading, Gospel Acclamation, and Gospel
- **4 Languages** - Portuguese, English, Spanish, Italian
- **Dark Mode** - Automatic system preference detection with manual toggle
- **PWA Support** - Install on mobile, works offline
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Responsive Design** - Mobile-first, works on all devices
- **Catholic Prayers** - Guardian Angel, Our Father, Hail Mary, Novenas, and more
- **Catholic Bible** - Complete book listing with 73 books (including Deuterocanonical)
- **Liturgical Calendar** - Seasons, colors, cycles, and solemnities
- **Auto-Deploy** - GitHub Actions + Vercel CI/CD pipeline

## 📱 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light](docs/screenshots/light.png) | ![Dark](docs/screenshots/dark.png) |

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- Python 3.12+
- Supabase account (free tier works)
- Vercel account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/liturgia-diaria-ia.git
cd liturgia-diaria-ia
```

### 2. Set up the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your Supabase credentials

# Run the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

### 3. Set up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Edit with your API URL

# Run the development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

### Readings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/readings/?lang=pt` | Get daily readings for a language |
| GET | `/api/readings/today?lang=en` | Get today's readings |
| GET | `/api/readings/all-languages` | Get readings in all languages |

### Prayers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prayers/?lang=pt` | Get all prayers in a language |
| GET | `/api/prayers/{id}?lang=en` | Get specific prayer |
| GET | `/api/prayers/categories` | Get prayer categories |

### Bible

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bible/books?lang=pt` | Get Bible books list |
| GET | `/api/bible/passage?book=Jo&chapter=3` | Get Bible passage |

### Calendar

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calendar/` | Get liturgical calendar |
| GET | `/api/calendar/today` | Get today's liturgy |

## 🌐 Data Sources

### Portuguese (PT)
- **Liturgia Diária API** - https://liturgia.up.railway.app/v2/
- Source: CNBB (Conferência Nacional dos Bispos do Brasil)

### English (EN)
- **USCCB** - https://bible.usccb.org/bible/readings/
- Source: United States Conference of Catholic Bishops

### Spanish (ES)
- **EWTN Español** - https://www.ewtn.com/es/catolicismo/lecturas
- Source: Eternal Word Television Network

### Italian (IT)
- **Daily Readings EU** - https://www.dailyreadings.eu/it
- Source: Multiple liturgical rites

### Liturgical Calendar
- **Liturgical Calendar API** - https://litcal.johnromanodorazio.com/
- Source: General Roman Calendar

## 🗄️ Database Schema

The app uses Supabase (PostgreSQL) with the following tables:

- `readings` - Daily mass readings
- `liturgical_days` - Liturgical calendar data
- `prayers` - Catholic prayers in all languages
- `api_cache` - Cached API responses

See `backend/app/db/migrations/001_initial_schema.sql` for full schema.

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Push to `main` branch - auto-deploy triggers

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### GitHub Actions

The workflow in `.github/workflows/deploy.yml` automatically:
1. Runs lint checks
2. Builds frontend and backend
3. Deploys to Vercel on push to `main`

## 📱 PWA Features

- **Installable** - Add to home screen on mobile
- **Offline Support** - Cached readings available offline
- **Background Sync** - Syncs when connection restored
- **Push Notifications** - (Future) Daily reading reminders

## 🎨 Tech Stack

### Backend
- **Python 3.12+** - Main language
- **FastAPI** - High-performance web framework
- **httpx** - Async HTTP client
- **BeautifulSoup4** - HTML parsing
- **Supabase** - PostgreSQL database
- **Pydantic** - Data validation

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **next-themes** - Dark mode
- **Zustand** - State management
- **Lucide Icons** - Beautiful icons

### Infrastructure
- **Vercel** - Hosting and serverless functions
- **GitHub Actions** - CI/CD
- **Supabase** - Database and auth

## 📖 Available Prayers

| Prayer | PT | EN | ES | IT |
|--------|----|----|----|----|
| Holy Guardian Angel | ✅ | ✅ | ✅ | ✅ |
| Our Father | ✅ | ✅ | ✅ | ✅ |
| Hail Mary | ✅ | ✅ | ✅ | ✅ |
| Glory Be | ✅ | ✅ | ✅ | ✅ |
| St. Joseph Novena | ✅ | ✅ | ✅ | ✅ |
| Immaculate Conception | ✅ | ✅ | ✅ | ✅ |
| Act of Contrition | ✅ | ✅ | ✅ | ✅ |
| Angelus | ✅ | ✅ | ✅ | ✅ |

## 📚 Catholic Bible

Complete listing of 73 books:
- **Old Testament**: 46 books (including Deuterocanonical)
- **New Testament**: 27 books

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- CNBB for Portuguese readings
- USCCB for English readings
- EWTN for Spanish readings
- Daily Readings EU for Italian readings
- Liturgical Calendar API project
- All contributors and translators

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/liturgia-diaria-ia/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/liturgia-diaria-ia/discussions)

---

*Ad Maiorem Dei Gloriam* ✝️
