import { ScrollView, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { TheologicalAnalysis } from '@/lib/types';

export default function AnalysisScreen() {
  const router = useRouter();
  const { date } = useLocalSearchParams<{ date: string }>();
  const [analysis, setAnalysis] = useState<TheologicalAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) {
      setError('Data não fornecida');
      setLoading(false);
      return;
    }

    // TODO: Implementar chamada para backend com OpenAI
    // Por enquanto, mostrar placeholder
    setTimeout(() => {
      setAnalysis({
        id: `analysis_${date}`,
        date,
        generalCommentary: 'Análise teológica será gerada aqui...',
        readingAnalysis: [],
        liturgicalConnections: 'Conexões litúrgicas serão exibidas aqui...',
        meditationPoints: ['Ponto 1', 'Ponto 2', 'Ponto 3'],
        createdAt: new Date().toISOString(),
        source: 'ai-generated',
      });
      setLoading(false);
    }, 2000);
  }, [date]);

  return (
    <ScreenContainer className="p-4">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-foreground">Análise Teológica</Text>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="px-3 py-2 bg-surface rounded-lg border border-border"
          >
            <Text className="text-lg font-semibold text-primary">✕</Text>
          </Pressable>
        </View>

        {/* Loading State */}
        {loading && (
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text className="text-muted mt-4">Gerando análise com IA...</Text>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View className="bg-error/10 border border-error rounded-lg p-4 mb-4">
            <Text className="text-error font-semibold mb-2">Erro</Text>
            <Text className="text-error text-sm">{error}</Text>
          </View>
        )}

        {/* Analysis Content */}
        {analysis && !loading && (
          <>
            {/* General Commentary */}
            <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
              <Text className="text-lg font-semibold text-primary mb-2">Comentário Geral</Text>
              <Text className="text-base text-foreground leading-relaxed">
                {analysis.generalCommentary}
              </Text>
            </View>

            {/* Liturgical Connections */}
            <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
              <Text className="text-lg font-semibold text-primary mb-2">Conexões Litúrgicas</Text>
              <Text className="text-base text-foreground leading-relaxed">
                {analysis.liturgicalConnections}
              </Text>
            </View>

            {/* Meditation Points */}
            {analysis.meditationPoints.length > 0 && (
              <View className="bg-surface rounded-lg p-4 mb-4 border border-border">
                <Text className="text-lg font-semibold text-primary mb-3">Pontos para Meditação</Text>
                {analysis.meditationPoints.map((point, index) => (
                  <View key={index} className="flex-row mb-2">
                    <Text className="text-primary font-semibold mr-2">{index + 1}.</Text>
                    <Text className="text-base text-foreground flex-1">{point}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Source */}
            <View className="bg-surface rounded-lg p-4 mb-8 border border-border">
              <Text className="text-xs text-muted">
                Análise gerada por IA em {new Date(analysis.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
