// components/reading-card.tsx
import React from 'react';
import { View, Text, Pressable, Share } from 'react-native';
import { LiturgicalReading } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSettings } from '@/hooks/use-settings';

interface ReadingCardProps {
  reading: LiturgicalReading;
}

const typeLabels: Record<string, string> = {
  'gospel': 'Evangelho',
  'first-reading': '1ª Leitura',
  'psalm': 'Salmo',
  'second-reading': '2ª Leitura',
};

export function ReadingCard({ reading }: ReadingCardProps) {
  const { settings } = useSettings();
  
  const fontSize = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg',
  }[settings.fontSize];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${typeLabels[reading.type]} - ${reading.reference}\n\n${reading.text}`,
        title: 'Liturgia Diária',
      });
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  return (
    <Pressable 
      className={cn(
        "p-4 rounded-xl border bg-surface",
        reading.type === 'gospel' ? "border-primary border-2" : "border-border",
        "active:opacity-90"
      )}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className={cn("font-semibold text-foreground", fontSize)}>
            {typeLabels[reading.type]}
          </Text>
          {reading.reference && (
            <Text className="text-muted text-sm mt-0.5">{reading.reference}</Text>
          )}
        </View>
        <Pressable 
          onPress={handleShare}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-xl">📤</Text>
        </Pressable>
      </View>
      
      <Text className={cn("text-foreground leading-relaxed", fontSize)}>
        {reading.text}
      </Text>
    </Pressable>
  );
}