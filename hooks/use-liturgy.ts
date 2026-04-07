import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LiturgicalDay, ApiResponse } from '@/lib/types';
import { getMockLiturgicalDay } from '@/lib/mock-data';

const CACHE_KEY_PREFIX = 'liturgy_';
const CACHE_EXPIRY_HOURS = 24;

export function useLiturgy(date?: string) {
  const [liturgy, setLiturgy] = useState<LiturgicalDay | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiturgy = useCallback(async (targetDate?: string) => {
    try {
      setLoading(true);
      setError(null);

      const dateStr = targetDate || new Date().toISOString().split('T')[0];
      const cacheKey = `${CACHE_KEY_PREFIX}${dateStr}`;

      // Check cache first
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        if (Date.now() - cachedData.timestamp < CACHE_EXPIRY_HOURS * 60 * 60 * 1000) {
          setLiturgy(cachedData.data);
          setLoading(false);
          return cachedData.data;
        }
      }

      // Fetch from API - Lectionary API
      // TODO: Replace with actual API call when available
      // For now, use mock data for development
      const liturgyData = getMockLiturgicalDay(dateStr);

      // Uncomment below when Lectionary API is ready
      // const response = await fetch(
      //   `https://lectio-api.org/api/v1/readings?date=${dateStr}&tradition=catholic`
      // );
      // if (!response.ok) {
      //   throw new Error('Failed to fetch liturgy data');
      // }
      // const data = await response.json();
      // const liturgyData: LiturgicalDay = { ... };

      // Cache the result
      try {
        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: liturgyData,
            timestamp: Date.now(),
          })
        );
      } catch (storageErr) {
        console.warn('Failed to cache liturgy data:', storageErr);
      }

      setLiturgy(liturgyData);
      return liturgyData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching liturgy:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiturgy(date);
  }, [date, fetchLiturgy]);

  return { liturgy, loading, error, refetch: fetchLiturgy };
}

export function useNavigateLiturgy() {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const goToPreviousDay = useCallback(() => {
    const current = new Date(currentDate);
    current.setDate(current.getDate() - 1);
    setCurrentDate(current.toISOString().split('T')[0]);
  }, [currentDate]);

  const goToNextDay = useCallback(() => {
    const current = new Date(currentDate);
    current.setDate(current.getDate() + 1);
    setCurrentDate(current.toISOString().split('T')[0]);
  }, [currentDate]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
  }, []);

  return {
    currentDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
  };
}
