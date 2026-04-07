import { ScrollView, View, Text, Pressable, ActivityIndicator, Share } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { LiturgicalDayHeader } from '@/components/liturgical-day-header';
import { ReadingCard } from '@/components/reading-card';
import { useLiturgy, useNavigateLiturgy } from '@/hooks/use-liturgy';
import { useFavorites } from '@/hooks/use-favorites';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { currentDate, goToPreviousDay, goToNextDay, goToToday } = useNavigateLiturgy();
  const { liturgy, loading, error, refetch } = useLiturgy(currentDate);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isCurrentDay, setIsCurrentDay] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setIsCurrentDay(currentDate === today);
  }, [currentDate]);

  const handleFavoritePress = async () => {
    if (!liturgy) return;

    if (isFavorite(liturgy.date)) {
      await removeFavorite(liturgy.date);
    } else {
      await addFavorite({
        id: `fav_${liturgy.date}`,
        date: liturgy.date,
        weekday: liturgy.weekday,
        season: liturgy.season,
        celebration: liturgy.celebration,
        savedAt: new Date().toISOString(),
        hasAnalysis: false,
      });
    }
  };

  const handleSharePress = async () => {
    if (!liturgy) return;

    try {
      const message = `Liturgia de ${liturgy.date}\n${liturgy.celebration}\n\nCompartilhado via Liturgia Diária com IA`;
      await Share.share({
        message,
        title: 'Liturgia Diária',
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleAnalysisPress = () => {
    if (!liturgy) return;
    router.push({
      pathname: '/analysis',
      params: { date: liturgy.date },
    });
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        {/* Date Navigation */}
        <View className="flex-row items-center justify-between mb-4">
          <Pressable
            onPress={goToPreviousDay}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="px-3 py-2 bg-surface rounded-lg border border-border"
          >
            <Text className="text-lg font-semibold text-primary">← Anterior</Text>
          </Pressable>

          {!isCurrentDay && (
            <Pressable
              onPress={goToToday}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className="px-3 py-2 bg-primary rounded-lg"
            >
              <Text className="text-sm font-semibold text-foreground">Hoje</Text>
            </Pressable>
          )}

          <Pressable
            onPress={goToNextDay}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="px-3 py-2 bg-surface rounded-lg border border-border"
          >
            <Text className="text-lg font-semibold text-primary">Próximo →</Text>
          </Pressable>
        </View>

        {/* Loading State */}
        {loading && (
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text className="text-muted mt-4">Carregando liturgia...</Text>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View className="bg-error/10 border border-error rounded-lg p-4 mb-4">
            <Text className="text-error font-semibold mb-2">Erro ao carregar</Text>
            <Text className="text-error text-sm mb-3">{error}</Text>
            <Pressable
              onPress={() => refetch(currentDate)}
              className="bg-error px-4 py-2 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">Tentar Novamente</Text>
            </Pressable>
          </View>
        )}

        {/* Liturgy Content */}
        {liturgy && !loading && (
          <>
            {/* Day Header */}
            <LiturgicalDayHeader
              day={liturgy}
              isFavorite={isFavorite(liturgy.date)}
              onFavoritePress={handleFavoritePress}
              onSharePress={handleSharePress}
            />

            {/* Readings */}
            {liturgy.readings && liturgy.readings.length > 0 ? (
              <>
                {liturgy.readings.map((reading, index) => (
                  <ReadingCard key={index} reading={reading} />
                ))}
              </>
            ) : (
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-muted text-center">Nenhuma leitura disponível</Text>
              </View>
            )}

            {/* Analysis Button */}
            <Pressable
              onPress={handleAnalysisPress}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              className="bg-primary rounded-lg py-3 px-4 mt-6 mb-8"
            >
              <Text className="text-center text-base font-semibold text-foreground">
                📖 Gerar Análise Teológica
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
