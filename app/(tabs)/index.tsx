// app/(tabs)/index.tsx
import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  ScrollView, 
  Share, 
  RefreshControl,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Seus componentes existentes (mantenha os imports originais)
import { LiturgicalDayHeader } from '@/components/liturgical-day-header';
import { ReadingCard } from '@/components/reading-card';
import { useLiturgy, useNavigateLiturgy } from '@/hooks/use-liturgy';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

export default function HomeScreen() {
  const router = useRouter();
  const { currentDate, goToPreviousDay, goToNextDay, goToToday } = useNavigateLiturgy();
  const { liturgy, loading, error, refetch } = useLiturgy(currentDate);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isCurrentDay, setIsCurrentDay] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setIsCurrentDay(currentDate === today);
  }, [currentDate]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(currentDate);
    setRefreshing(false);
  };

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
      await Share.share({ 
        message: `📖 ${liturgy.celebration} - ${liturgy.date}`,
        title: 'Liturgia Diária'
      });
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  // 🎨 Cores litúrgicas dinâmicas (mantenha sua lógica original)
  const seasonColors: Record<string, string> = {
    'ordinary': 'bg-green-600',
    'lent': 'bg-purple-700',
    'easter': 'bg-yellow-500',
    'advent': 'bg-blue-700',
    'default': 'bg-primary',
  };
  const headerColor = seasonColors[liturgy?.season || 'default'];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-24"
      >
        {/* 🔘 Navegação de datas - simplificada */}
        <View className="flex-row items-center justify-center gap-3 p-3 bg-surface border-b border-border">
          <Pressable 
            onPress={goToPreviousDay}
            className="px-4 py-2 rounded-lg bg-muted active:opacity-70"
          >
            <Text className="font-medium text-foreground">←</Text>
          </Pressable>
          
          <Pressable onPress={goToToday} className="px-3 py-2">
            <Text className="font-semibold text-foreground">
              {new Date(currentDate).toLocaleDateString('pt-BR', { 
                weekday: 'short', 
                day: '2-digit', 
                month: 'short' 
              })}
            </Text>
          </Pressable>
          
          <Pressable 
            onPress={goToNextDay}
            className="px-4 py-2 rounded-lg bg-muted active:opacity-70"
          >
            <Text className="font-medium text-foreground">→</Text>
          </Pressable>
        </View>

        {/* 📋 Loading State */}
        {loading && (
          <View className="p-4 space-y-4">
            <View className={cn("h-24 rounded-xl animate-pulse", headerColor)} />
            {[1, 2, 3].map(i => (
              <View key={i} className="h-32 bg-surface rounded-xl animate-pulse" />
            ))}
          </View>
        )}

        {/* ❌ Error State */}
        {error && !loading && (
          <View className="p-4 m-4 bg-error/10 border border-error rounded-xl">
            <Text className="text-error font-medium">⚠️ {error}</Text>
            <Pressable 
              onPress={() => refetch(currentDate)}
              className="mt-3 px-4 py-2 bg-error rounded-lg"
            >
              <Text className="text-white">Tentar Novamente</Text>
            </Pressable>
          </View>
        )}

        {/* ✅ Conteúdo da Liturgia */}
        {liturgy && !loading && (
          <>
            {/* Header com cor litúrgica */}
            <View className={cn("p-4", headerColor)}>
              <LiturgicalDayHeader 
                day={liturgy}
                isFavorite={isFavorite(liturgy.date)}
                onFavoritePress={handleFavoritePress}
                onSharePress={handleSharePress}
              />
            </View>

            {/* Leituras */}
            <View className="p-4 space-y-3">
              {liturgy.readings?.map((reading, index) => (
                <ReadingCard 
                  key={`${reading.type}-${index}`} 
                  reading={reading} 
                />
              ))}
            </View>

            {/* Botão de Análise */}
            <Pressable 
              onPress={() => router.push({ pathname: '/analysis', params: { date: liturgy.date } })}
              className="mx-4 mt-2 mb-6 p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl active:opacity-90"
            >
              <Text className="text-white font-bold text-center">
                ✨ Gerar Análise com IA
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}