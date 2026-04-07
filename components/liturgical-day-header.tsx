import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LiturgicalDay } from '@/lib/types';

interface LiturgicalDayHeaderProps {
  day: LiturgicalDay;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  onSharePress?: () => void;
}

const seasonLabels: Record<string, string> = {
  'advent': 'Advento',
  'christmas': 'Natal',
  'ordinary': 'Tempo Comum',
  'lent': 'Quaresma',
  'easter': 'Páscoa',
};

const weekdayLabels: Record<string, string> = {
  'monday': 'Segunda-feira',
  'tuesday': 'Terça-feira',
  'wednesday': 'Quarta-feira',
  'thursday': 'Quinta-feira',
  'friday': 'Sexta-feira',
  'saturday': 'Sábado',
  'sunday': 'Domingo',
};

const colourLabels: Record<string, { pt: string; hex: string }> = {
  'white': { pt: 'Branco', hex: '#FFFFFF' },
  'red': { pt: 'Vermelho', hex: '#C41E3A' },
  'green': { pt: 'Verde', hex: '#2D7A3E' },
  'violet': { pt: 'Roxo', hex: '#5B4B8A' },
  'gold': { pt: 'Ouro', hex: '#D4AF37' },
};

export function LiturgicalDayHeader({
  day,
  isFavorite = false,
  onFavoritePress,
  onSharePress,
}: LiturgicalDayHeaderProps) {
  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const seasonLabel = seasonLabels[day.season] || day.season;
  const colourInfo = colourLabels[day.colour] || { pt: day.colour, hex: '#000000' };

  return (
    <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
      {/* Date */}
      <Text className="text-2xl font-bold text-foreground mb-1 capitalize">
        {formattedDate}
      </Text>

      {/* Celebration */}
      {day.celebration && (
        <Text className="text-lg font-semibold text-primary mb-3">
          {day.celebration}
        </Text>
      )}

      {/* Season Info */}
      <View className="flex-row items-center gap-3 mb-3">
        <View
          className="w-6 h-6 rounded-full border-2 border-foreground"
          style={{ backgroundColor: colourInfo.hex }}
        />
        <Text className="text-sm text-muted">
          {seasonLabel}
          {day.seasonWeek > 0 && ` - Semana ${day.seasonWeek}`}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-2 pt-3 border-t border-border">
        <Pressable
          onPress={onFavoritePress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 6,
              backgroundColor: isFavorite ? '#D4AF37' : '#F3F4F6',
            },
          ]}
        >
          <Text
            className={`text-center text-sm font-medium ${
              isFavorite ? 'text-foreground' : 'text-foreground'
            }`}
          >
            {isFavorite ? '★ Favorito' : '☆ Favoritar'}
          </Text>
        </Pressable>

        <Pressable
          onPress={onSharePress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 6,
              backgroundColor: '#F3F4F6',
            },
          ]}
        >
          <Text className="text-center text-sm font-medium text-foreground">
            Compartilhar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
