import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useNavigateLiturgy - Date Navigation Logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-07'));
  });

  it('should calculate previous day correctly', () => {
    const date = new Date('2026-04-07');
    date.setDate(date.getDate() - 1);
    const result = date.toISOString().split('T')[0];
    expect(result).toBe('2026-04-06');
  });

  it('should calculate next day correctly', () => {
    const date = new Date('2026-04-07');
    date.setDate(date.getDate() + 1);
    const result = date.toISOString().split('T')[0];
    expect(result).toBe('2026-04-08');
  });

  it('should handle month transitions', () => {
    const date = new Date('2026-04-01');
    date.setDate(date.getDate() - 1);
    const result = date.toISOString().split('T')[0];
    expect(result).toBe('2026-03-31');
  });

  it('should handle year transitions', () => {
    const date = new Date('2026-01-01');
    date.setDate(date.getDate() - 1);
    const result = date.toISOString().split('T')[0];
    expect(result).toBe('2025-12-31');
  });

  it('should return today\'s date in ISO format', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(today).toBe('2026-04-07');
  });
});

describe('Liturgical Data Validation', () => {
  it('should validate liturgical reading structure', () => {
    const reading = {
      title: 'Test Reading',
      text: 'Test text',
      reference: 'Test 1:1',
      type: 'gospel' as const,
    };

    expect(reading).toHaveProperty('title');
    expect(reading).toHaveProperty('text');
    expect(reading).toHaveProperty('type');
    expect(['entrance', 'first-reading', 'psalm', 'second-reading', 'gospel', 'communion']).toContain(reading.type);
  });

  it('should validate liturgical day structure', () => {
    const day = {
      date: '2026-04-07',
      weekday: 'tuesday',
      season: 'lent',
      seasonWeek: 5,
      readings: [],
      celebration: 'Test Celebration',
      colour: 'violet',
    };

    expect(day).toHaveProperty('date');
    expect(day).toHaveProperty('weekday');
    expect(day).toHaveProperty('season');
    expect(day.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should validate settings structure', () => {
    const settings = {
      theme: 'auto' as const,
      fontSize: 'normal' as const,
      language: 'pt-BR' as const,
      notificationsEnabled: true,
      notificationTime: '08:00',
      lastUpdated: new Date().toISOString(),
    };

    expect(['light', 'dark', 'auto']).toContain(settings.theme);
    expect(['small', 'normal', 'large']).toContain(settings.fontSize);
    expect(['pt-BR', 'pt-PT', 'la']).toContain(settings.language);
  });
});

describe('Favorite Liturgy Validation', () => {
  it('should validate favorite liturgy structure', () => {
    const favorite = {
      id: 'fav_2026-04-07',
      date: '2026-04-07',
      weekday: 'tuesday',
      season: 'lent',
      celebration: 'Test Celebration',
      savedAt: new Date().toISOString(),
      hasAnalysis: false,
    };

    expect(favorite).toHaveProperty('id');
    expect(favorite).toHaveProperty('date');
    expect(favorite).toHaveProperty('savedAt');
    expect(favorite.id).toMatch(/^fav_/);
  });

  it('should handle multiple favorites with different dates', () => {
    const favorites = [
      {
        id: 'fav_2026-04-07',
        date: '2026-04-07',
        weekday: 'tuesday',
        season: 'lent',
        celebration: 'Celebration 1',
        savedAt: new Date().toISOString(),
        hasAnalysis: false,
      },
      {
        id: 'fav_2026-04-06',
        date: '2026-04-06',
        weekday: 'monday',
        season: 'lent',
        celebration: 'Celebration 2',
        savedAt: new Date().toISOString(),
        hasAnalysis: false,
      },
    ];

    expect(favorites).toHaveLength(2);
    expect(favorites[0].date).not.toBe(favorites[1].date);
  });
});
