from supabase import create_client, Client
from app.config import get_settings


def get_supabase() -> Client:
    """Get Supabase client instance."""
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise ValueError("Supabase URL and Service Role Key must be configured")
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def get_supabase_anon() -> Client:
    """Get Supabase client with anon key (for client-side operations)."""
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise ValueError("Supabase URL and Anon Key must be configured")
    return create_client(settings.supabase_url, settings.supabase_anon_key)
