// Tipos para Liturgia Diária

export interface LiturgicalReading {
  title: string;
  text: string;
  reference?: string;
  type: 'entrance' | 'first-reading' | 'psalm' | 'second-reading' | 'gospel' | 'communion';
}

export interface LiturgicalDay {
  date: string;
  weekday: string;
  season: string;
  seasonWeek: number;
  readings: LiturgicalReading[];
  celebration: string;
  colour: string;
}

export interface TheologicalAnalysis {
  id: string;
  date: string;
  generalCommentary: string;
  readingAnalysis: {
    reading: string;
    historicalContext: string;
    theologicalMeaning: string;
    churchTradition: string;
    practicalApplication: string;
  }[];
  liturgicalConnections: string;
  meditationPoints: string[];
  createdAt: string;
  source: 'ai-generated' | 'cached';
}

export interface FavoriteLiturgy {
  id: string;
  date: string;
  weekday: string;
  season: string;
  celebration: string;
  savedAt: string;
  hasAnalysis: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'normal' | 'large';
  language: 'pt-BR' | 'pt-PT' | 'la';
  notificationsEnabled: boolean;
  notificationTime: string; // HH:mm format
  lastUpdated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
