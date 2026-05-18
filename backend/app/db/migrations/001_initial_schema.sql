-- Supabase SQL migrations
-- Create readings table
CREATE TABLE IF NOT EXISTS readings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    language VARCHAR(2) NOT NULL CHECK (language IN ('pt', 'en', 'es', 'it')),
    title TEXT NOT NULL,
    reading_type VARCHAR(50) NOT NULL,
    reference TEXT,
    text TEXT NOT NULL,
    responsorial TEXT,
    source VARCHAR(100),
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, language, reading_type)
);

-- Create liturgical_days table
CREATE TABLE IF NOT EXISTS liturgical_days (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    name TEXT NOT NULL,
    color VARCHAR(20) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    season TEXT,
    week INTEGER,
    cycle VARCHAR(1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prayers table
CREATE TABLE IF NOT EXISTS prayers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prayer_id VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,
    language VARCHAR(2) NOT NULL CHECK (language IN ('pt', 'en', 'es', 'it')),
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(prayer_id, language)
);

-- Create cache table for API responses
CREATE TABLE IF NOT EXISTS api_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cache_key VARCHAR(255) NOT NULL UNIQUE,
    response_data JSONB NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_readings_date ON readings(date);
CREATE INDEX idx_readings_language ON readings(language);
CREATE INDEX idx_readings_date_language ON readings(date, language);
CREATE INDEX idx_liturgical_days_date ON liturgical_days(date);
CREATE INDEX idx_prayers_language ON prayers(language);
CREATE INDEX idx_prayers_category ON prayers(category);
CREATE INDEX idx_api_cache_expires ON api_cache(expires_at);

-- Row Level Security (RLS)
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE liturgical_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_cache ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access on readings" ON readings FOR SELECT USING (true);
CREATE POLICY "Public read access on liturgical_days" ON liturgical_days FOR SELECT USING (true);
CREATE POLICY "Public read access on prayers" ON prayers FOR SELECT USING (true);

-- Service role write access (handled by service role key)
