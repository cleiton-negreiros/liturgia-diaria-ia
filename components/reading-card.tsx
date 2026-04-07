import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LiturgicalReading } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ReadingCardProps {
  reading: LiturgicalReading;
  onShare?: () => void;
  onCopy?: () => void;
}

const readingTypeLabels: Record<LiturgicalReading['type'], string> = {
  'entrance': 'Antífona de Entrada',
  'first-reading': '1ª Leitura',
  'psalm': 'Salmo Responsorial',
  'second-reading': '2ª Leitura',
  'gospel': 'Evangelho',
  'communion': 'Antífona de Comunhão',
};

export function ReadingCard({ reading, onShare, onCopy }: ReadingCardProps) {
  return (
    <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-primary">
          {readingTypeLabels[reading.type]}
        </Text>
      </View>

      {/* Reference */}
      {reading.reference && (
        <Text className="text-sm text-muted mb-2 font-medium">
          {reading.reference}
        </Text>
      )}

      {/* Reading Text */}
      <ScrollView
        scrollEnabled={false}
        className="max-h-64 mb-3"
      >
        <Text className="text-base text-foreground leading-relaxed">
          {reading.text}
        </Text>
      </ScrollView>

      {/* Action Buttons */}
      {(onShare || onCopy) && (
        <View className="flex-row gap-2 pt-3 border-t border-border">
          {onCopy && (
            <Pressable
              onPress={onCopy}
              className="flex-1"
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#E5E7EB' : '#F3F4F6',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                },
              ]}
            >
              <Text className="text-center text-sm font-medium text-foreground">
                Copiar
              </Text>
            </Pressable>
          )}
          {onShare && (
            <Pressable
              onPress={onShare}
              className="flex-1"
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#E5E7EB' : '#F3F4F6',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                },
              ]}
            >
              <Text className="text-center text-sm font-medium text-foreground">
                Compartilhar
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
