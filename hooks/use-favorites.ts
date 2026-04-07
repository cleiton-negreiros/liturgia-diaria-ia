import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteLiturgy } from '@/lib/types';

const FAVORITES_KEY = 'liturgy_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLiturgy[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from storage
  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Add to favorites
  const addFavorite = useCallback(
    async (favorite: FavoriteLiturgy) => {
      try {
        const updated = [...favorites];
        const exists = updated.findIndex((f) => f.date === favorite.date);

        if (exists >= 0) {
          updated[exists] = favorite;
        } else {
          updated.push(favorite);
        }

        // Sort by date descending
        updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        setFavorites(updated);
        return true;
      } catch (err) {
        console.error('Error adding favorite:', err);
        return false;
      }
    },
    [favorites]
  );

  // Remove from favorites
  const removeFavorite = useCallback(
    async (date: string) => {
      try {
        const updated = favorites.filter((f) => f.date !== date);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        setFavorites(updated);
        return true;
      } catch (err) {
        console.error('Error removing favorite:', err);
        return false;
      }
    },
    [favorites]
  );

  // Check if date is favorite
  const isFavorite = useCallback(
    (date: string) => {
      return favorites.some((f) => f.date === date);
    },
    [favorites]
  );

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: loadFavorites,
  };
}
