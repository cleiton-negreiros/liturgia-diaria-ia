import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '@/lib/types';

const SETTINGS_KEY = 'app_settings';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  fontSize: 'normal',
  language: 'pt-BR',
  notificationsEnabled: true,
  notificationTime: '08:00',
  lastUpdated: new Date().toISOString(),
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Load settings from storage
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        // Save default settings
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Update settings
  const updateSettings = useCallback(
    async (updates: Partial<AppSettings>) => {
      try {
        const updated: AppSettings = {
          ...settings,
          ...updates,
          lastUpdated: new Date().toISOString(),
        };

        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
        setSettings(updated);
        return true;
      } catch (err) {
        console.error('Error updating settings:', err);
        return false;
      }
    },
    [settings]
  );

  // Reset to defaults
  const resetSettings = useCallback(async () => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      setSettings(DEFAULT_SETTINGS);
      return true;
    } catch (err) {
      console.error('Error resetting settings:', err);
      return false;
    }
  }, []);

  return {
    settings,
    loading,
    updateSettings,
    resetSettings,
  };
}
