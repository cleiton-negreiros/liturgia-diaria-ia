from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.api import readings, calendar, prayers, bible


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup/shutdown events."""
    # Startup
    settings = get_settings()
    print(f"\n{'='*50}")
    print(f"  {settings.app_name} v{settings.app_version}")
    print(f"  Languages: {', '.join(settings.supported_languages)}")
    print(f"{'='*50}\n")
    yield
    # Shutdown


app = FastAPI(
    title="Liturgia Diaria IA",
    description="API for Catholic daily liturgy readings in 4 languages (PT, EN, ES, IT)",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(readings.router)
app.include_router(calendar.router)
app.include_router(prayers.router)
app.include_router(bible.router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    settings = get_settings()
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "languages": settings.supported_languages,
        "endpoints": {
            "readings": "/api/readings/",
            "readings_today": "/api/readings/today",
            "readings_all_languages": "/api/readings/all-languages",
            "calendar": "/api/calendar/",
            "calendar_today": "/api/calendar/today",
            "prayers": "/api/prayers/",
            "bible_books": "/api/bible/books",
            "bible_passage": "/api/bible/passage",
        },
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    """Generic exception handler."""
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "message": str(exc),
        },
    )
