from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    app_name: str = "Liturgia Diaria IA"
    app_version: str = "1.0.0"
    debug: bool = False

    # Supabase
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    # Cache
    cache_ttl_seconds: int = 3600  # 1 hour default

    # Supported languages
    supported_languages: list[str] = ["pt", "en", "es", "it"]

    # API URLs
    liturgia_diaria_url: str = "https://liturgia.up.railway.app/v2"
    usccb_url: str = "https://bible.usccb.org/bible/readings"
    ewtn_url: str = "https://www.ewtn.com/es/catolicismo/lecturas"
    dailyreadings_url: str = "https://www.dailyreadings.eu"
    liturgical_calendar_url: str = "https://litcal.johnromanodorazio.com"
    evangeli_url: str = "https://evangeli.net"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
