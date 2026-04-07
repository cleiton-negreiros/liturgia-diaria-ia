import { ScrollView, View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useFavorites } from '@/hooks/use-favorites';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, removeFavorite } = useFavorites();
  const [searchText, setSearchText] = useState('');

  const filteredFavorites = favorites.filter((fav) =>
    fav.date.includes(searchText) || fav.celebration.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRemoveFavorite = async (date: string) => {
    await removeFavorite(date);
  };

  const handleViewLiturgy = (date: string) => {
    // Navigate to home with date parameter
    router.push({
      pathname: '/',
      params: { date },
    });
  };

  return (
    <ScreenContainer className="p-4">
      <View className="flex-1">
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-4">Liturgias Favoritas</Text>

        {/* Loading State */}
        {loading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text className="text-muted mt-4">Carregando favoritos...</Text>
          </View>
        )}

        {/* Empty State */}
        {!loading && favorites.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl mb-4">📖</Text>
            <Text className="text-lg font-semibold text-foreground mb-2">Nenhum favorito</Text>
            <Text className="text-muted text-center">
              Marque liturgias como favorito para acessá-las rapidamente
            </Text>
          </View>
        )}

        {/* Favorites List */}
        {!loading && favorites.length > 0 && (
          <FlatList
            scrollEnabled={false}
            data={filteredFavorites}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View className="bg-surface rounded-lg p-4 mb-3 border border-border flex-row items-center justify-between">
                <Pressable
                  onPress={() => handleViewLiturgy(item.date)}
                  className="flex-1"
                >
                  <Text className="text-lg font-semibold text-primary mb-1">
                    {new Date(item.date).toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text className="text-sm text-muted mb-1">{item.celebration}</Text>
                  <Text className="text-xs text-muted">{item.season}</Text>
                </Pressable>

                <Pressable
                  onPress={() => handleRemoveFavorite(item.date)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  className="ml-2 px-3 py-2 bg-error/10 rounded-lg"
                >
                  <Text className="text-error text-lg">✕</Text>
                </Pressable>
              </View>
            )}
            ListEmptyComponent={
              searchText.length > 0 ? (
                <View className="items-center justify-center py-8">
                  <Text className="text-muted">Nenhum resultado para "{searchText}"</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
}
